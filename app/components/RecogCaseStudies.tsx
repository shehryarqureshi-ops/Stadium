"use client";

/* /recognition · CASE STUDIES (Figma n9SjmDjzB1PeZAYJ5w43fr → 2504:8615
   "Case Studies", page frame 2504:6746, rev 2026-08-19). A centered 860-wide
   title + subhead, then a horizontally-scrolling carousel of quote cards with
   prev/next arrow buttons bottom-right. Each card is a #f2f2f2 tray (610×390,
   r24, p24, gap24) holding a 72×72 fluted thumbnail and a white content panel
   that pushes a lilac stat pill to the top and the pull-quote + attribution to
   the bottom (justify-between → Figma's 9px slack between them).

   The thumbnail is Figma's own crop: the source raster is rotated 90° AND
   y-flipped inside a 72×72 clip, which object-position cannot reproduce, so
   per design.md "Image quality" the IMAGE NODE (2504:8623) is exported at
   defaultScale 4 → 288×288 PNG (4× the 72px render).

   Figma stack (1440, y relative to the section frame at abs 9373.5; the frame
   is 685 tall and content-tight — no internal top/bottom space — so the
   section renders lg:py-20 and, with the Committee frame above contributing
   its own 80, the visible gap stays 160):
     header       y=0    h=143  (title frame 860 wide, centered, gap 20)
       h2         y=0    h=96   (44 Satoshi Bold / 1.08 / -0.5, 2 lines)
       gap 20
       subhead    y=116  h=27   (18 Overpass / 1.48, #6b6c71)
     gap 80
     carousel     y=223  h=462  (gap 32)
       items      y=0    h=390  → card 610×390
         thumb 72×72 r12 · content panel flex-1 h-full white r12
              px28 pt28 pb30, shadow 0 3 6 rgba(0,0,0,.06)
              pill  h32 (#f0defc, r8, px12 py6, 14 Overpass Bold, #8d12e7)
              [9 slack from justify-between]
              quote h204 (25 Satoshi Medium / 34 / -0.3, 6 lines) → 16 →
              attr  h23  (15 Overpass / 1.5, #6b6c71)
       gap 32
       nav        y=422  h=40   → 2× 40 circle #f2f5f5, 24 lucide arrow,
                                  right-aligned, gap 10 (prev disabled)
     end          y=685
   Figma also gives the frame an 80px top radius; kept as rounded-t-[5rem]
   (invisible while the section above is white). */

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import thumb from "@/public/recog2/rc-case-thumb.png";

type Study = { stat: string; quote: string; attribution: string };

/* Figma 2504:8620 contains exactly ONE card — see contentGaps. */
const STUDIES: Study[] = [
  {
    stat: "Record-breaking 1,000 posts of praise",
    quote:
      "“Our kudos program turned recognition into something you want to check. You scroll through, see what other teams are celebrating, and it makes you want to get in there too.”",
    attribution: "Erin P. ·  Everflow",
  },
];

/* card 610 + gap 24 */
const STEP = 634;

function Arrow({
  dir,
  disabled,
  onClick,
}: {
  dir: "l" | "r";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "l" ? "Previous case study" : "Next case study"}
      className="flex size-10 items-center justify-center rounded-full bg-[#f2f5f5] text-black transition-all duration-200 hover:bg-[#e6ebeb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink active:scale-[0.98] disabled:pointer-events-none disabled:opacity-25"
    >
      {/* lucide/arrow-left · lucide/arrow-right — paths from Figma svgAssets
         (2504:8633 / 2504:8636) */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-6"
        aria-hidden
      >
        {dir === "l" ? (
          <path d="M12 5L5 12L12 19M5 12H19" />
        ) : (
          <path d="M5 12H19M12 19L19 12L12 5" />
        )}
      </svg>
    </button>
  );
}

export default function RecogCaseStudies() {
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = () => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };
  useEffect(sync, []);

  const scroll = (d: number) =>
    track.current?.scrollBy({ left: d * STEP, behavior: "smooth" });

  return (
    <section
      aria-labelledby="recog-case-studies-title"
      className="rounded-t-[5rem] bg-white px-section-x-sm md:px-section-x-md lg:px-section-x-lg"
    >
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10 md:gap-16 lg:gap-20">
        {/* header — 860 wide, centered */}
        <div className="flex w-full max-w-[53.75rem] flex-col items-center gap-5 text-center">
          <h2
            id="recog-case-studies-title"
            data-animation="reveal"
            className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
          >
            How recognition became more widespread and rewarding at Everflow
          </h2>
          <p
            data-animation="reveal"
            className="font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]"
          >
            Kudos went from occasional to everyday, with real rewards and
            recognition shared across teams.
          </p>
        </div>

        {/* carousel */}
        <div className="flex w-full flex-col gap-6 lg:gap-8">
          <div
            ref={track}
            onScroll={sync}
            data-animation="reveal"
            className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {STUDIES.map((s) => (
              <figure
                key={s.attribution}
                className="flex w-[min(38.125rem,calc(100vw-2rem))] shrink-0 snap-start flex-col gap-4 rounded-[1.5rem] bg-[#f2f2f2] p-4 md:h-[24.375rem] md:flex-row md:items-start md:gap-6 md:p-6"
              >
                <Image
                  src={thumb}
                  alt=""
                  aria-hidden
                  quality={100}
                  sizes="72px"
                  className="size-[4.5rem] shrink-0 rounded-[0.75rem] object-cover"
                />
                <div className="flex flex-1 flex-col justify-between gap-6 rounded-[0.75rem] bg-white px-5 pb-6 pt-6 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)] md:h-full md:gap-0 md:px-7 md:pb-[1.875rem] md:pt-7">
                  <span className="inline-flex self-start rounded-[0.5rem] bg-[#f0defc] px-3 py-1.5 font-sans text-[0.875rem] font-bold leading-[1.4] text-[#8d12e7]">
                    {s.stat}
                  </span>
                  <div className="flex flex-col gap-4">
                    <blockquote className="font-[family-name:var(--font-satoshi-medium)] text-[1.25rem] leading-[1.36] tracking-[-0.01875rem] text-[#16171b] md:text-[1.5625rem]">
                      {s.quote}
                    </blockquote>
                    <figcaption className="whitespace-pre-wrap font-sans text-[0.9375rem] leading-[1.5] text-[#6b6c71]">
                      {s.attribution}
                    </figcaption>
                  </div>
                </div>
              </figure>
            ))}
          </div>

          {/* nav arrows */}
          <div className="flex items-center justify-end gap-2.5">
            <Arrow dir="l" disabled={atStart} onClick={() => scroll(-1)} />
            <Arrow dir="r" disabled={atEnd} onClick={() => scroll(1)} />
          </div>
        </div>
      </div>
    </section>
  );
}
