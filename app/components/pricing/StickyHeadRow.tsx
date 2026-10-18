"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* Sticky "Compare all features" header row (lg+). A 1px sentinel just above the row
   tells us when it has pinned under the fixed site header (4rem) so the white
   background + bottom shadow only appear while stuck. */
export default function StickyHeadRow({ children }: { children: ReactNode }) {
  const sentinel = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const io = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting), {
      rootMargin: `-${4 * rem}px 0px 0px 0px`,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinel} aria-hidden className="col-span-full -mb-1 h-px" />
      <div
        role="row"
        className={`col-span-full grid grid-cols-subgrid gap-1 lg:sticky lg:top-16 lg:z-20 lg:bg-white lg:transition-shadow lg:duration-200 ${
          stuck ? "lg:shadow-header-stuck" : ""
        }`}
      >
        {children}
      </div>
    </>
  );
}
