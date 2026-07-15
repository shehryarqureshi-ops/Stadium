"use client";

import type { COBEOptions } from "cobe";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";

/* Interactive cobe globe for the "We simplify global shipping" beat.
   Config ported from the cobe.html prototype: a grey base rendered with
   mix-blend luminosity over the navy→black gradient (so it reads as a blue
   globe), blue network arcs, slow auto-rotate + drag with spring physics.
   Sizing tracks the container so it stays crisp; rAF pauses when off-screen. */

const ARCS: COBEOptions["arcs"] = [
  { from: [37.78, -122.44], to: [40.71, -74.01] }, // San Francisco → New York — exactly as cobe.html
];

/* rotation-tracked markers (from the cobe.html prototype) — cobe exposes a
   CSS anchor `--cobe-<id>` and a `--cobe-visible-<id>` var per marker; the
   label divs attach to those via anchor positioning + fade with visibility. */
const MARKERS = [
  {
    id: "sf",
    location: [37.78, -122.44] as [number, number],
    label: "San Francisco",
  },
  {
    id: "nyc",
    location: [40.71, -74.01] as [number, number],
    label: "New York",
  },
  { id: "dxb", location: [25.2, 55.27] as [number, number], label: "Dubai" },
];

export default function Globe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerMovement = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phi = 0;
    let spring = 0;
    let size = canvas.offsetWidth;
    let visible = true;

    const onResize = () => {
      size = canvas.offsetWidth;
    };
    window.addEventListener("resize", onResize);

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), {
      threshold: 0,
    });
    io.observe(canvas);

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: size,
      height: size,
      phi: 0,
      theta: 0.2,
      dark: 1,
      diffuse: 5,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.2, 0.2, 0.2],
      markerColor: [0.2, 0.2, 0.2],
      glowColor: [0.1, 0.1, 0.1],
      markers: MARKERS.map((m) => ({
        location: m.location,
        size: 0,
        id: m.id,
      })),
      arcs: ARCS,
      arcColor: [0.3, 0.5, 1],
      arcWidth: 0.3,
      arcHeight: 0.3,
    });

    // Pause rendering during scroll — recompositing the mix-blend globe on
    // every scroll frame made the dark section scroll sluggishly. Freeze the
    // last frame while scrolling; resume shortly after it stops.
    let scrolling = false;
    let scrollTimer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      scrolling = true;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        scrolling = false;
      }, 120);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf = 0;
    const render = () => {
      if (visible && !scrolling) {
        phi += 0.001; // exact cobe.html rotation (never pauses, even on drag)
        spring += (pointerMovement.current - spring) * 0.1;
        globe.update({ phi: phi + spring * 0.01, width: size, height: size });
      }
      raf = requestAnimationFrame(render);
    };
    render();

    // fade in once the first frame is painted
    const fade = requestAnimationFrame(() => {
      canvas.style.opacity = "1";
    });

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(fade);
      clearTimeout(scrollTimer);
      io.disconnect();
      globe.destroy();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className={`relative h-full w-full ${className}`}>
      <canvas
        ref={canvasRef}
        aria-hidden
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerMovement.current;
          e.currentTarget.style.cursor = "grabbing";
        }}
        onPointerUp={(e) => {
          pointerInteracting.current = null;
          e.currentTarget.style.cursor = "grab";
        }}
        onPointerOut={(e) => {
          pointerInteracting.current = null;
          e.currentTarget.style.cursor = "grab";
        }}
        onPointerMove={(e) => {
          if (pointerInteracting.current !== null) {
            pointerMovement.current = e.clientX - pointerInteracting.current;
          }
        }}
        className="h-full w-full cursor-grab touch-none mix-blend-luminosity"
        style={{
          opacity: 0,
          transition: "opacity 1s ease",
          aspectRatio: "1 / 1",
        }}
      />
      {MARKERS.map((m) => (
        <div
          key={m.id}
          className="cobe-marker"
          ref={(el) => {
            if (!el) return;
            // Experimental anchor-positioning props — set via the browser's own
            // parser (Lightning CSS / React drop these). cobe places an anchor
            // named --cobe-<id> at each marker's projected point + a visibility var.
            el.style.setProperty("position-anchor", `--cobe-${m.id}`);
            el.style.setProperty("bottom", "anchor(top)");
            el.style.setProperty("left", "anchor(center)");
            el.style.setProperty("opacity", `var(--cobe-visible-${m.id}, 0)`);
          }}
        >
          <span className="cobe-marker__dot" />
          <span className="cobe-marker__label">{m.label}</span>
        </div>
      ))}
    </div>
  );
}
