"use client";

import { useEffect, useRef, useState } from "react";

/* Catalog — Figma /swag 2:25059 ("25,000+ products. Hundreds of brands."). A
   horizontal carousel of category cards (category · count · brands + a product
   flat-lay), with prev/next arrows. Card is #f7f7f7, radius 24, pad 24; big
   count is Satoshi Bold 24. Five varied product flat-lays exported from Figma
   (apparel/drinkware/bag/backpacks/headwear); counts/brands are placeholders. */

const APPAREL = "/swag/swag-cat-apparel.jpg";
const DRINK = "/swag/swag-cat-drinkware.jpg";
const BAG = "/swag/swag-cat-bag.jpg";
const BACKPACKS = "/swag/swag-cat-backpacks.jpg";
const HEADWEAR = "/swag/swag-cat-headwear.jpg";

export type SwagCatalogContent = {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  body: string;
  categories: {
    cat: string;
    count: string;
    brands: string;
    img: string;
  }[];
  /** Optional category filter pills (first = active). Snacks uses these. */
  filters?: string[];
  /** Optional "browse all" link shown top-right of the header. */
  browseLabel?: string;
};

export const SWAG_CATALOG: SwagCatalogContent = {
  eyebrow: "THE CATALOG",
  headingLine1: "25,000+ products.",
  headingLine2: "Hundreds of brands. One catalog.",
  body:
    "Not your generic promo catalog. Browse premium brands across every category, all ready to customize with your logo.",
  categories: [
    { cat: "Apparel", count: "4,200+", brands: "The North Face · Nike · Carhartt", img: APPAREL },
    { cat: "Drinkware", count: "2,400+", brands: "Stanley · Hydro Flask · YETI", img: DRINK },
    { cat: "Tech & Audio", count: "1,800+", brands: "JBL · Anker · Belkin", img: BAG },
    { cat: "Bags & Travel", count: "1,500+", brands: "Herschel · Away · Patagonia", img: BACKPACKS },
    { cat: "Headwear", count: "1,100+", brands: "Richardson · New Era · '47", img: HEADWEAR },
    { cat: "Notebooks", count: "900+", brands: "Moleskine · Leuchtturm · Rhodia", img: APPAREL },
    { cat: "Office", count: "1,300+", brands: "Fellowes · Logitech · Moft", img: DRINK },
  ],
};

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {dir === "left" ? <path d="M19 12H5m0 0 7 7m-7-7 7-7" /> : <path d="M5 12h14m0 0-7-7m7 7-7 7" />}
    </svg>
  );
}

export default function SwagCatalog({ content = SWAG_CATALOG }: { content?: SwagCatalogContent }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };
  useEffect(sync, []);

  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="bg-white px-section-x-sm pb-20 pt-4 md:px-section-x-md md:pb-24 lg:px-section-x-lg lg:pb-28">
      <div className="mx-auto flex w-full max-w-content flex-col gap-11">
        {/* header */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-2">
              <p
                data-animation="reveal"
                className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.045rem] text-swag-green-alt"
              >
                {content.eyebrow}
              </p>
              <h2
                data-animation="reveal"
                className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem] lg:text-[2.75rem]"
              >
                {content.headingLine1}
                <br />
                {content.headingLine2}
              </h2>
            </div>
            {content.browseLabel && (
              <a
                href="#"
                className="shrink-0 font-sans text-[0.75rem] font-bold uppercase tracking-[0.06rem] text-swag-ink underline underline-offset-4 transition-opacity hover:opacity-70"
              >
                {content.browseLabel}
              </a>
            )}
          </div>
          <p
            data-animation="reveal"
            className="font-sans text-body-md leading-[1.48] text-swag-grey lg:text-[1.125rem]"
          >
            {content.body}
          </p>
          {content.filters && (
            <div data-animation="reveal" className="flex flex-wrap gap-2">
              {content.filters.map((f, i) => (
                <span
                  key={f}
                  className={`rounded-full px-4 py-2 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.03rem] ${
                    i === 0 ? "bg-swag-ink text-white" : "bg-[#f2f2f2] text-swag-ink"
                  }`}
                >
                  {f}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* carousel */}
        <div data-animation="reveal" className="flex flex-col gap-8">
          <div
            ref={trackRef}
            onScroll={sync}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {content.categories.map((c, i) => (
              <article
                key={i}
                className="flex h-[28.65rem] w-[17.25rem] shrink-0 snap-start flex-col overflow-hidden rounded-3xl bg-[#f7f7f7]"
              >
                <div className="flex flex-col gap-1.5 p-6">
                  <p className="font-sans text-[0.875rem] font-semibold text-swag-ink">
                    {c.cat}
                  </p>
                  <p className="font-display text-2xl text-swag-ink">{c.count}</p>
                  <p className="font-sans text-[0.6875rem] leading-[1.4] text-[#707075]">
                    {c.brands}
                  </p>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.img}
                  alt={`${c.cat} products`}
                  className="w-full flex-1 object-cover"
                />
              </article>
            ))}
          </div>

          {/* nav arrows */}
          <div className="flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => scroll(-1)}
              disabled={atStart}
              aria-label="Previous"
              className="flex size-10 items-center justify-center rounded-full bg-[#f2f5f5] text-swag-ink transition-all duration-200 hover:bg-grey-200 disabled:opacity-25 active:scale-95 focus-visible:outline-ink"
            >
              <Arrow dir="left" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              disabled={atEnd}
              aria-label="Next"
              className="flex size-10 items-center justify-center rounded-full bg-[#f2f5f5] text-swag-ink transition-all duration-200 hover:bg-grey-200 disabled:opacity-25 active:scale-95 focus-visible:outline-ink"
            >
              <Arrow dir="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
