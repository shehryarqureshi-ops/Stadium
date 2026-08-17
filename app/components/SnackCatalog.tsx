"use client";

/* /snacks · THE CATALOG (Figma 2208:2997). "Find everyone's favorite, from 2,000+
   snacks" — filter pills + a horizontal card carousel with prev/next arrows. */

import { useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import chips from "@/public/snacks/sn2-cat-chips.png";
import coldbrew from "@/public/snacks/sn2-cat-coldbrew.png";
import coffee from "@/public/snacks/sn2-cat-coffee.png";
import selfcare from "@/public/snacks/sn2-cat-selfcare.png";

const FILTERS = ["All", "Snacks", "Beverages", "Pantry", "Work & Play"];
const CARDS: { img: StaticImageData; label: string }[] = [
  { img: chips, label: "Potato Chips" },
  { img: coldbrew, label: "Cold Brew" },
  { img: coffee, label: "Coffee, Tea, & Cocoa" },
  { img: selfcare, label: "Self Care" },
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
  const scroll = (d: number) => track.current?.scrollBy({ left: d * 320, behavior: "smooth" });

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
          className="w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex w-max items-center gap-1 rounded-full bg-[#f2f2f2] p-1.5">
            {FILTERS.map((f, i) => (
              <button
                key={f}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 font-sans text-[0.75rem] font-bold uppercase tracking-[0.0625rem] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                  i === active ? "bg-[#16171b] text-white" : "text-[#6b6c71] hover:text-[#16171b]"
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
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {CARDS.map((c) => (
            <div
              key={c.label}
              className="relative aspect-[276/422] w-[17.5rem] shrink-0 snap-start overflow-hidden rounded-[1.25rem]"
            >
              <Image src={c.img} alt={c.label} fill className="object-cover" sizes="280px" />
            </div>
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
