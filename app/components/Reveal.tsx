"use client";

import { useEffect, useRef, useState } from "react";

/* Apple-style scroll reveal: fades + rises its children into view the first
   time they enter the viewport. Pairs with the [data-reveal] styles in
   globals.css (which handle the reduced-motion + no-JS fallbacks). */
export default function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal
      className={`${shown ? "reveal-in" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
