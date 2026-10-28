"use client";

import createGlobe from "cobe";
import { useEffect, useId, useRef, useState } from "react";
import CircleFlag, { type FlagCode } from "../CircleFlag";

/* The dotted earth from the earlier home ("We simplify global shipping"), re-staged for
   Figma 7133:9894: the same cobe globe (grey base under mix-blend luminosity so it reads blue),
   now carrying five "something just arrived" event pills instead of the shipping tags.
   Each pill is pinned to a city through cobe's `--cobe-<id>` anchors and fades when its city
   rotates behind the globe. Instead of the old endless spin the globe sways gently around the
   composed pose, so the labels stay on the visible face; dragging still turns it.
   `still` renders one frame (reduced motion); `markers={false}` drops the pills (tablet). */

type EarthEvent = {
  id: string;
  location: [number, number];
  label: string;
  flag: FlagCode;
  /** pill hangs below-left of the dot instead of above-right */
  below?: boolean;
};

const EVENTS: EarthEvent[] = [
  { id: "rome", location: [41.9, 12.5], label: "New hire kit delivered", flag: "it" },
  { id: "london", location: [51.5, -0.12], label: "Kudos sent", flag: "gb" },
  { id: "dubai", location: [25.2, 55.27], label: "Client gift received", flag: "ae" },
  { id: "bengaluru", location: [12.97, 77.59], label: "Offsite booked", flag: "in" },
  { id: "singapore", location: [1.35, 103.82], label: "Snack box arrived", flag: "sg", below: true },
];

/** composed pose: Europe/Africa/Asia face the viewer */
const BASE_PHI = 3.61;
/** ± radians of idle sway (≈ 11°) and its period in ms */
const SWAY = 0.2;
const SWAY_PERIOD = 44000;

export default function EarthGlobe({ still = false, markers = true }: { still?: boolean; markers?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerMovement = useRef(0);
  /* this component is client-only (dynamic ssr:false), so reading CSS support at init is hydration-safe */
  const [anchors] = useState(() => typeof CSS !== "undefined" && CSS.supports("anchor-name", "--a"));
  /* two instances can mount (one hidden per breakpoint); namespace the global --cobe-* vars */
  const instanceId = useId().replace(/[^a-zA-Z0-9]/g, "");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let spring = 0;
    let size = canvas.offsetWidth;
    let visible = false;
    let raf = 0;

    const onResize = () => {
      size = canvas.offsetWidth;
    };
    window.addEventListener("resize", onResize);

    /* capped at 1.5 — 2x quadruples fill cost for a decorative dot globe */
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: size,
      height: size,
      phi: BASE_PHI,
      theta: 0.2,
      dark: 1,
      diffuse: 5,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.2, 0.2, 0.2],
      markerColor: [0.2, 0.2, 0.2],
      glowColor: [0.1, 0.1, 0.1],
      markers: EVENTS.map((e) => ({ location: e.location, size: 0, id: `${instanceId}-${e.id}` })),
      arcs: [],
    });

    const frame = (now: number) => {
      const sway = still ? 0 : Math.sin((now / SWAY_PERIOD) * Math.PI * 2) * SWAY;
      spring += (pointerMovement.current - spring) * 0.1;
      globe.update({ phi: BASE_PHI + sway + spring * 0.01, width: size, height: size });
    };
    const render = (now: number) => {
      frame(now);
      raf = requestAnimationFrame(render);
    };

    /* the loop only exists while the canvas is on-screen AND the tab is visible */
    const sync = () => {
      const run = visible && !document.hidden && !still;
      if (run && !raf) raf = requestAnimationFrame(render);
      else if (!run && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    io.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    if (still) frame(0);

    // fade in once the first frame is painted
    const fade = requestAnimationFrame(() => {
      canvas.style.opacity = "1";
    });

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(fade);
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [instanceId, still]);

  return (
    <div className="relative h-full w-full">
      <canvas
        ref={canvasRef}
        aria-hidden
        onPointerDown={(e) => {
          if (still) return;
          pointerInteracting.current = e.clientX - pointerMovement.current;
          e.currentTarget.style.cursor = "grabbing";
        }}
        onPointerUp={(e) => {
          pointerInteracting.current = null;
          e.currentTarget.style.cursor = still ? "default" : "grab";
        }}
        onPointerOut={(e) => {
          pointerInteracting.current = null;
          e.currentTarget.style.cursor = still ? "default" : "grab";
        }}
        onPointerMove={(e) => {
          if (pointerInteracting.current !== null) {
            pointerMovement.current = e.clientX - pointerInteracting.current;
          }
        }}
        className={`h-full w-full touch-none mix-blend-luminosity ${still ? "" : "cursor-grab"}`}
        style={{ opacity: 0, transition: "opacity 1s ease", aspectRatio: "1 / 1" }}
      />
      {markers &&
        anchors &&
        EVENTS.map((e) => {
          const markerId = `${instanceId}-${e.id}`;
          return (
            <div
              key={e.id}
              className="earth-marker"
              ref={(el) => {
                if (!el) return;
                el.style.setProperty("position-anchor", `--cobe-${markerId}`);
                el.style.setProperty("left", "anchor(center)");
                el.style.setProperty("top", "anchor(center)");
                el.style.setProperty("opacity", `var(--cobe-visible-${markerId}, 0)`);
              }}
            >
              <span className="earth-marker__dot" />
              <span className={`earth-marker__pill ${e.below ? "earth-marker__pill--below" : ""}`}>
                <CircleFlag code={e.flag} size="1.125rem" borderWidth="0.0625rem" borderColor="rgba(255,255,255,0.6)" />
                {e.label}
              </span>
            </div>
          );
        })}
    </div>
  );
}
