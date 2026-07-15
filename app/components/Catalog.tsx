"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import { useRef } from "react";
import snackBoxesImg from "@/public/catalog-snack-boxes.jpg";
import brandedMerchImg from "@/public/catalog-branded-merch.jpg";
import giftCardsImg from "@/public/catalog-gift-cards.jpg";
import luxuryGoodsImg from "@/public/catalog-luxury-goods.jpg";

/* "Every recipient covered" — synced to Figma 2:33654. White section, 55px
   heading, then a horizontal card carousel with prev/next arrows. Each 348×460
   r16 card is label-top: eyebrow + title over the product photo. */

type Category = { name: string; eyebrow: string; image: StaticImageData };

const categories: Category[] = [
  { name: "Snack Boxes", eyebrow: "10K+ Top Brands", image: snackBoxesImg },
  { name: "Branded Merch", eyebrow: "25,000 Items", image: brandedMerchImg },
  { name: "Gift Cards", eyebrow: "500+ Retailers", image: giftCardsImg },
  { name: "Luxury Goods", eyebrow: "Premium Brands", image: luxuryGoodsImg },
];

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" className="size-4 text-ink" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {dir === "prev" ? <path d="M19 12H5M12 19l-7-7 7-7" /> : <path d="M5 12h14M12 5l7 7-7 7" />}
    </svg>
  );
}

export default function Catalog() {
  const trackRef = useRef<HTMLUListElement>(null);
  const scroll = (dir: number) =>
    trackRef.current?.scrollBy({ left: dir * 372, behavior: "smooth" });

  return (
    <section className="bg-white">
      <div className="mx-auto flex w-full max-w-section flex-col gap-10 py-16 md:py-24 lg:py-[7.5rem]">
        {/* header */}
        <div className="flex max-w-[52.5rem] flex-col gap-6 px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
          <div className="flex flex-col gap-2">
            <p className="font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem] text-[#1b1b1b]/60">
              The Stadium Catalog
            </p>
            <h2 className="font-display text-heading-sm text-ink md:text-heading-md lg:text-[3.4375rem] lg:leading-[3.75rem] lg:tracking-[-0.075rem]">
              Every recipient covered
            </h2>
          </div>
          <p className="font-sans text-[1rem] font-semibold leading-6 text-ink">
            30K+ items from leading brands, with locally relevant options wherever you&rsquo;re sending.
          </p>
        </div>

        {/* cards + nav */}
        <div className="flex flex-col gap-8">
          <ul
            ref={trackRef}
            className="flex gap-6 overflow-x-auto px-section-x-sm pb-1 [scrollbar-width:none] md:px-section-x-md lg:px-section-x-lg [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((c) => (
              <li
                key={c.name}
                className="group flex aspect-[348/460] w-[17rem] shrink-0 flex-col overflow-hidden rounded-2xl bg-[#f9f7f8] lg:w-[21.75rem]"
              >
                <div className="flex flex-col gap-1 px-6 pb-4 pt-6">
                  <span className="font-sans text-[0.75rem] font-bold uppercase tracking-[0.0625rem] text-ink">
                    {c.eyebrow}
                  </span>
                  <span className="font-display text-heading-sm text-ink">{c.name}</span>
                </div>
                <div className="relative min-h-0 flex-1">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(min-width: 64rem) 21.75rem, 17rem"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
              </li>
            ))}
          </ul>

          {/* prev / next */}
          <div className="flex justify-end gap-2.5 px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => scroll(-1)}
              className="flex size-10 items-center justify-center rounded-full bg-[#f2f5f5] transition-colors hover:bg-grey-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <Arrow dir="prev" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => scroll(1)}
              className="flex size-10 items-center justify-center rounded-full bg-[#e8e9ed] transition-colors hover:bg-grey-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <Arrow dir="next" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
