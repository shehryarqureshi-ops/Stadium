"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../lib/motion";

/* Twinkling starfield behind the globe beat — ported from the cobe.html
   prototype. Sizes to its parent, pauses when off-screen, and never captures
   pointer events so the globe drag + CTA stay interactive. */

type Star = {
  x: number;
  y: number;
  r: number;
  a: number;
  speed: number;
  dir: 1 | -1;
  tw: number;
};

const STAR_COUNT = 220;
const MAX_SPEED = 0.4;

export default function Starfield({ className = "", count = STAR_COUNT }: { className?: string; count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let visible = false;

    const makeStar = (): Star => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4,
      a: Math.random(),
      speed: Math.random() * MAX_SPEED + 0.08,
      dir: Math.random() < 0.5 ? -1 : 1,
      tw: Math.random() * 0.05 + 0.008,
    });

    const resize = () => {
      w = canvas.width = parent.offsetWidth;
      h = canvas.height = parent.offsetHeight;
      stars = Array.from({ length: count }, makeStar);
    };
    resize();

    /* Runs only while on-screen and the tab is visible; the rAF is cancelled
       otherwise (not just skipped). */
    let raf = 0;
    /* Phones get one static frame: 220 arcs repainted at 60 fps behind a full
       section is pure heat for a decorative effect. */
    const still =
      window.matchMedia("(max-width: 767px)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.y += s.speed;
        if (s.y > h) {
          s.y = 0;
          s.x = Math.random() * w;
        }
        s.a += s.tw * s.dir;
        if (s.a > 1) {
          s.a = 1;
          s.dir = -1;
        } else if (s.a < 0.2) {
          s.a = 0.2;
          s.dir = 1;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.a})`;
        ctx.fill();
      }
      if (!reduced) raf = requestAnimationFrame(animate);
    };
    const sync = () => {
      const run = visible && !document.hidden && !reduced;
      if (run && !raf) raf = requestAnimationFrame(animate);
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
    /* reduced motion / paused: one static frame, no loop */
    if (reduced) animate();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none ${className}`}
    />
  );
}
