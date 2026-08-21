"use client";

/* /gifting · THE CATALOG (Figma F7rDHYd3n5nwRtrlv1F6dO — the Imagery System
   file → 1065:14089 "Catalog", 1440 wide). "3,714 gifts. 845 brands. One
   catalog." — left-aligned header, then a horizontal carousel of 8 gifting
   category cards (348×460, r24) with prev/next arrow buttons bottom-right.
   Each card is a light/cream product still-life on an off-white ground (the
   ground is part of the photo) with REAL TEXT overlaid top-left: "99 PRODUCTS"
   eyebrow + Satoshi title in #181818.

   Photos are Figma's ORIGINAL uploads (896–1183 px wide — that is the source
   ceiling, ≈ 2.6–3.4× the 348 css width) with each card's own crop baked in:
   the card fill's imageTransform (scaleMode CROP) / centre-cover (scaleMode
   FILL) was applied with sharp so every file is exactly 348:460, then saved as
   JPEG q90 mozjpeg 4:4:4. Card-node exports come back 1×1 in this file (the
   3624-wide items row is clipped by its 1240 parent), so the raw fills are the
   only route — verified by sha1 against each fill's imageHash and by
   screenshot-diffing all 8 crops against the Figma renders.

   Same section as /swag's SwagmagicCatalog — mechanics mirrored 1:1; the only
   differences are the amber eyebrow (#996b00, Overpass Bold, lh 1.4,
   tracking 1.6px) instead of swag's green, and the header gap ladder below.

   Figma stack (section frame is content-tight; y = offset inside 1065:14089,
   x = 100 → site content edge 120, inner proportions matched at 1200):
     header frame  1065:14090      y=0    h=199 (gap 24 inside)
       eyebrow "THE CATALOG"       y=0    h=17  (12 Overpass Bold, lh 1.4 → 16.8,
                                                 tracking 1.6 → 0.1rem, #996b00)
       gap 8
       title 44/1.08 Satoshi Bold  y=25   h=96  (2 lines, tracking -0.5, #16171b)
       gap 24
       subhead 18/1.48 #6b6c71     y=145  h=54  (2 lines at the full 1240 width)
     gap 45
     carousel 1065:14095           y=244  h=532 (gap 32 inside)
       items row (gap 16, clipped) y=0    h=460 → 8 cards 348×460 r24
         card text at 24/24, gap 4: 12/16 Overpass Bold · 24/28 Satoshi, #181818
       gap 32
       nav (gap 10, right-aligned) y=492  h=40  → 2× 40 circle #f2f5f5, 24 lucide arrow
                                                 (prev at 25% opacity = disabled at start)
     end                           y=776
   Neighbouring frames sit 160 apart with content-tight edges → white section
   py 80/80 (lg:py-20) so the visible gap to neighbours is 160. */

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import experiences from "@/public/gift2/gf-catalog-experiences.jpg";
import luxury from "@/public/gift2/gf-catalog-luxury.jpg";
import foodBeverages from "@/public/gift2/gf-catalog-food-beverages.jpg";
import lifeHobbies from "@/public/gift2/gf-catalog-life-hobbies.jpg";
import wellness from "@/public/gift2/gf-catalog-wellness.jpg";
import merch from "@/public/gift2/gf-catalog-merch.jpg";
import workEssentials from "@/public/gift2/gf-catalog-work-essentials.jpg";
import giftCards from "@/public/gift2/gf-catalog-gift-cards.jpg";

type Card = { img: StaticImageData; count: string; label: string };

/* Copy exactly as in Figma 1073:1256…1073:1291 — every count is real (no
   "0,000" placeholders), and the unit word is PRODUCTS, not swag's ITEMS. */
const CARDS: Card[] = [
  { img: experiences, count: "99 PRODUCTS", label: "Experiences" },
  { img: luxury, count: "428 PRODUCTS", label: "Luxury" },
  { img: foodBeverages, count: "1,485 PRODUCTS", label: "Food & Beverages" },
  { img: lifeHobbies, count: "822 PRODUCTS", label: "Life & Hobbies" },
  { img: wellness, count: "442 PRODUCTS", label: "Wellness" },
  { img: merch, count: "298 PRODUCTS", label: "Merch" },
  { img: workEssentials, count: "252 PRODUCTS", label: "Work Essentials" },
  { img: giftCards, count: "311 PRODUCTS", label: "Gift Cards" },
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
              3,714 gifts.
              <br />
              845 brands. One catalog.
            </h2>
          </div>
          <p data-animation="reveal" className="font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]">
            Not your generic promo catalog. Real brands people already recognise, across eight categories from everyday food to luxury, with experiences and gift cards included.
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
                  className="object-cover"
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
