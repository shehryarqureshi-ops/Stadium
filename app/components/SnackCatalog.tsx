"use client";

/* /snacks · THE CATALOG (Figma 2208:2997, cards revised 2026-08-18 → 2389:4738).
   "Find everyone's favorite, from 2,000+ snacks" — filter pills + a horizontal
   card carousel with prev/next arrows. Each card is a grey #f7f7f7 rounded tile:
   eyebrow + Satoshi title as REAL TEXT on top, then a rounded product photo
   (302×414 at 1440) below — text is no longer baked into the image. */

import { useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import chips from "@/public/snacks/sn3-cat-chips.png";
import coldbrew from "@/public/snacks/sn3-cat-coldbrew.png";
import coffee from "@/public/snacks/sn3-cat-coffee.png";
import selfcare from "@/public/snacks/sn3-cat-selfcare.png";

const FILTERS = ["All", "Snacks", "Beverages", "Pantry", "Work & Play"];
const CARDS: { img: StaticImageData; category: string; label: string }[] = [
  { img: chips, category: "Snacks", label: "Potato Chips" },
  { img: coldbrew, category: "Beverages", label: "Cold Brew" },
  { img: coffee, category: "Pantry", label: "Coffee, Tea, & Cocoa" },
  { img: selfcare, category: "Work & Play", label: "Self Care" },
];

function Arrow({ dir, onClick }: { dir: "l" | "r"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "l" ? "Previous" : "Next"}
      className="flex size-11 items-center justify-center rounded-full border border-[#e4e4e7] bg-white text-[#16171b] transition-all duration-200 hover:border-[#16171b] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden>
        {dir === "l" ? <path d="M19 12H5M12 19l-7-7 7-7" /> : <path d="M5 12h14M12 5l7 7-7 7" />}
      </svg>
    </button>
  );
}

export default function SnackCatalog() {
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => track.current?.scrollBy({ left: d * 342, behavior: "smooth" });

  return (
    <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-24">
      <div className="mx-auto flex w-full max-w-content flex-col gap-8">
        {/* header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-[34rem] flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p
                data-animation="reveal"
                className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.0625rem] text-[#2178f5]"
              >
                The catalog
              </p>
              <h2
                data-animation="reveal"
                className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
              >
                Find everyone’s favorite, from 2,000+ snacks
              </h2>
            </div>
            <p data-animation="reveal" className="font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71]">
              Snacks for any craving or diet, plus new brands to discover.
            </p>
          </div>
          <a
            href="#"
            data-animation="reveal"
            className="w-fit font-sans text-[0.75rem] font-bold uppercase tracking-[0.0625rem] text-[#16171b]"
          >
            <span className="border-b border-black pb-[2px]">Browse all 2,000+ snacks</span>
          </a>
        </div>

        {/* filter pills */}
        <div
          data-animation="reveal"
          className="-mx-4 -mb-12 w-[calc(100%+2rem)] overflow-x-auto px-4 pb-12 [scrollbar-width:none] lg:mx-0 lg:mb-0 lg:w-full lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex w-max items-center gap-1 rounded-full bg-white p-2 shadow-[0px_16px_36px_-10px_rgba(0,0,0,0.12)]">
            {FILTERS.map((f, i) => (
              <button
                key={f}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`whitespace-nowrap rounded-full px-7 py-3.5 font-sans text-[0.9375rem] font-bold uppercase tracking-[0.125rem] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                  i === active ? "bg-[#16171b] text-white" : "text-[#3a3b40] hover:text-[#16171b]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* carousel */}
        <div
          ref={track}
          data-animation="reveal"
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {CARDS.map((c) => (
            <article
              key={c.label}
              className="flex w-[19.875rem] shrink-0 snap-start flex-col gap-6 overflow-hidden rounded-[1.5rem] bg-[#f7f7f7] p-2"
            >
              <div className="flex flex-col gap-1 px-6 pt-6">
                <p className="font-sans text-[0.875rem] uppercase leading-[1rem] tracking-[0.01rem] text-[#6b6c71]">
                  {c.category}
                </p>
                <h3 className="font-[family-name:var(--font-satoshi)] text-[1.5rem] font-bold leading-[1.2] text-[#16171b]">
                  {c.label}
                </h3>
              </div>
              <div className="relative aspect-[302/414] w-full overflow-hidden rounded-[1.25rem]">
                <Image src={c.img} alt={`${c.category} — ${c.label}`} fill quality={90} className="object-cover" sizes="302px" />
              </div>
            </article>
          ))}
        </div>

        {/* nav arrows */}
        <div className="flex items-center justify-end gap-3">
          <Arrow dir="l" onClick={() => scroll(-1)} />
          <Arrow dir="r" onClick={() => scroll(1)} />
        </div>
      </div>
    </section>
  );
}
