"use client";

/* /gifting · THE CATALOG (Figma n9SjmDjzB1PeZAYJ5w43fr → 2504:15249 "Catalog",
   page frame 2504:12118, 1440 wide, abs y 3631..4380). "25,000+ products.
   Hundreds of brands. One catalog." — left-aligned header, then a horizontal
   carousel of 10 category cards (348×460, r24) with prev/next arrow buttons
   bottom-right. Each card is a product flat-lay photo (the light grey studio
   ground is part of the photo) with REAL TEXT overlaid top-left: "7,000 ITEMS"
   eyebrow + Satoshi title in #181818. Photos are Figma's ORIGINAL uploads
   (1792–2098 px wide, ≈ 5× the 348 css width) saved as JPEG q90 mozjpeg 4:4:4;
   Figma's fill mode is cover anchored top-left (verified against every card's
   fill percentages), reproduced with object-cover + object-left-top.

   Same section as /swag's SwagmagicCatalog — mechanics mirrored 1:1; the only
   differences are the amber eyebrow (#996b00, Overpass Bold, lh 1.4,
   tracking 1.6px) instead of swag's green, and the header gap ladder below.

   Figma stack (section frame is content-tight; y = offset inside 2504:15249,
   x = 100 → site content edge 120, inner proportions matched at 1200):
     header frame  2504:15250      y=0    h=172 (gap 24 inside)
       eyebrow "THE CATALOG"       y=0    h=17  (12 Overpass Bold, lh 1.4 → 16.8,
                                                 tracking 1.6 → 0.1rem, #996b00)
       gap 8
       title 44/1.08 Satoshi Bold  y=25   h=96  (2 lines, tracking -0.5, #16171b)
       gap 24
       subhead 18/1.48 #6b6c71     y=145  h=27  (full 1240 width)
     gap 45
     carousel 2504:15255           y=217  h=532 (gap 32 inside)
       items row (gap 16, clipped) y=0    h=460 → 10 cards 348×460 r24
         card text at 24/24, gap 4: 12/16 Overpass Bold tracking 1 · 24/28 Satoshi
       gap 32
       nav (gap 10, right-aligned) y=492  h=40  → 2× 40 circle #f2f5f5, 24 lucide arrow
                                                 (prev at 25% opacity = disabled at start)
     end                           y=749
   Neighbouring frames sit 160 apart with content-tight edges → white section
   py 80/80 (lg:py-20) so the visible gap to neighbours is 160. */

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import apparel from "@/public/gift2/gf-catalog-apparel.jpg";
import drinkware from "@/public/gift2/gf-catalog-drinkware.jpg";
import bags from "@/public/gift2/gf-catalog-bags.jpg";
import office from "@/public/gift2/gf-catalog-office.jpg";
import technology from "@/public/gift2/gf-catalog-technology.jpg";
import events from "@/public/gift2/gf-catalog-events.jpg";
import health from "@/public/gift2/gf-catalog-health.jpg";
import outdoor from "@/public/gift2/gf-catalog-outdoor.jpg";
import auto from "@/public/gift2/gf-catalog-auto.jpg";
import baby from "@/public/gift2/gf-catalog-baby.jpg";

type Card = { img: StaticImageData; count: string; label: string };

/* Copy exactly as in Figma 2504:15256 — cards 4–10 carry the "0,000 ITEMS"
   placeholder count in the design (flagged as a content gap). */
const CARDS: Card[] = [
  { img: apparel, count: "7,000 ITEMS", label: "Apparel" },
  { img: drinkware, count: "2,522 ITEMS", label: "Drinkware" },
  { img: bags, count: "2,405 ITEMS", label: "Bags" },
  { img: office, count: "0,000 ITEMS", label: "Office Supplies" },
  { img: technology, count: "0,000 ITEMS", label: "Technology" },
  { img: events, count: "0,000 ITEMS", label: "Events & Tradeshows" },
  { img: health, count: "0,000 ITEMS", label: "Health & Wellness" },
  { img: outdoor, count: "0,000 ITEMS", label: "Outdoor & Leisure" },
  { img: auto, count: "0,000 ITEMS", label: "Auto, Home & Tools" },
  { img: baby, count: "0,000 ITEMS", label: "Baby" },
];

/* card 348 + gap 16 */
const STEP = 364;

function Arrow({ dir, disabled, onClick }: { dir: "l" | "r"; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "l" ? "Previous categories" : "Next categories"}
      className="flex size-10 items-center justify-center rounded-full bg-[#f2f5f5] text-black transition-all duration-200 hover:bg-[#e6ebeb] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      {/* lucide/arrow-left · lucide/arrow-right — paths from Figma svgAssets (2504:15299 / 2504:15302) */}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-6" aria-hidden>
        {dir === "l" ? <path d="M12 5L5 12L12 19M5 12H19" /> : <path d="M5 12H19M12 19L19 12L12 5" />}
      </svg>
    </button>
  );
}

export default function GiftingCatalog() {
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

  const scroll = (d: number) => track.current?.scrollBy({ left: d * STEP, behavior: "smooth" });

  return (
    <section
      aria-labelledby="gifting-catalog-heading"
      className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-20"
    >
      <div className="mx-auto flex w-full max-w-content flex-col gap-8 lg:gap-[2.8125rem]">
        {/* header */}
        <div className="flex flex-col gap-4 lg:gap-6">
          <div className="flex flex-col gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#996b00]"
            >
              The catalog
            </p>
            <h2
              id="gifting-catalog-heading"
              data-animation="reveal"
              className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
            >
              25,000+ products.
              <br />
              Hundreds of brands. One catalog.
            </h2>
          </div>
          <p data-animation="reveal" className="font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]">
            Not your generic promo catalog. Browse premium brands across every category, all ready to customize with your logo.
          </p>
        </div>

        {/* carousel */}
        <div className="flex flex-col gap-6 lg:gap-8">
          <div
            ref={track}
            onScroll={sync}
            data-animation="reveal"
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {CARDS.map((c) => (
              <article
                key={c.label}
                className="relative h-[28.75rem] w-[min(21.75rem,calc(100vw-2rem))] shrink-0 snap-start overflow-hidden rounded-[1.5rem] bg-[#f2f2f2]"
              >
                <Image
                  src={c.img}
                  alt={`${c.label} products`}
                  fill
                  quality={90}
                  sizes="348px"
                  className="object-cover object-left-top"
                />
                <div className="absolute left-6 top-6 flex flex-col gap-1 text-[#181818]">
                  <p className="font-sans text-[0.75rem] font-bold uppercase leading-[1rem] tracking-[0.0625rem]">
                    {c.count}
                  </p>
                  <h3 className="font-[family-name:var(--font-satoshi)] text-[1.5rem] font-bold leading-[1.75rem]">
                    {c.label}
                  </h3>
                </div>
              </article>
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
