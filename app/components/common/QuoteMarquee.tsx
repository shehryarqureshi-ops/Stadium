/* Continuous vertical card carousel shared by the testimonial sections
   (home, /reviews, /the-proof, /book-a-call): cards loop upward forever,
   pause on hover, and fade out at the top and bottom edge.

   Height rule: the column is at least 650px (40.625rem), or as tall as the
   left column beside it when that is taller. The track is absolutely
   positioned inside the wrapper so it never stretches the row itself — the
   parent flex/grid row must therefore be `lg:min-h-[40.625rem]` (see
   QUOTE_ROW_MIN_H) and the wrapper stretches to the row's height. Below lg
   the wrapper is a fixed 650px window. */

import type { ReactNode } from "react";

export const QUOTE_ROW_MIN_H = "lg:min-h-[40.625rem]";

const FADE = "linear-gradient(to bottom, transparent, #000 6%, #000 94%, transparent)";

export default function QuoteMarquee({
  items,
}: {
  /* keyed card nodes — rendered twice for a seamless loop */
  items: ReactNode[];
}) {
  return (
    <div className="relative h-[40.625rem] min-w-0 shrink-0 lg:h-auto lg:flex-1 lg:shrink">
      <style>{`
        @keyframes testimonial-scroll {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        .testimonial-marquee { animation: testimonial-scroll 44s linear infinite; }
        .testimonial-viewport:hover .testimonial-marquee { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .testimonial-marquee { animation: none; }
        }
      `}</style>

      <div
        className="testimonial-viewport absolute inset-0 overflow-hidden"
        style={{ maskImage: FADE, WebkitMaskImage: FADE }}
      >
        <div className="testimonial-marquee flex flex-col">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex flex-col gap-4 pb-4"
            >
              {items}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
