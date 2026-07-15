"use client";

import { useEffect, useRef } from "react";

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

export default function Starfield({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let visible = true;

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
      stars = Array.from({ length: STAR_COUNT }, makeStar);
    };
    resize();

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), {
      threshold: 0,
    });
    io.observe(canvas);

    // pause during scroll (keeps the dark section scrolling smoothly)
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
    const animate = () => {
      if (visible && !scrolling) {
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
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(scrollTimer);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none ${className}`}
    />
  );
}
