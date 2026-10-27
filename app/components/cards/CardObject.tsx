"use client";

import { useEffect, useRef, useState } from "react";

/** A card graphic served as a standalone .svg and shown through <object>, the one
 *  embedding that lets the SVG pull in its photo files (an <img> blocks them) while
 *  keeping the markup out of the HTML. It mounts just before it scrolls into view;
 *  the wrapper reserves the box up front so nothing shifts. */
export default function CardObject({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const object = (
    <object
      data={src}
      type="image/svg+xml"
      aria-hidden="true"
      tabIndex={-1}
      className="pointer-events-none absolute inset-0 block h-full w-full"
    />
  );

  return (
    <div
      ref={ref}
      role="img"
      aria-label={alt}
      className="relative block w-full"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {show && object}
      <noscript>{object}</noscript>
    </div>
  );
}
