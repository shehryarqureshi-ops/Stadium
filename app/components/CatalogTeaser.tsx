"use client";

import Link from "next/link";
import { useId, useState } from "react";

import { BRAND_LOGOS } from "./catalog/brandLogos";
import { logoSize } from "./catalog/logoSize";
import {
  EXPERIENCES_PRODUCTS,
  GIFTS_PRODUCTS,
  SNACKS_PRODUCTS,
  SWAG_PRODUCTS,
} from "./catalog/products";
import { thumb } from "./catalog/thumb";

/* "Things people actually keep." — the /new-home catalog teaser (Figma 6525:12451,
   "v2 colour wall"). A pill filter over a five-column masonry of product photos
   that fades to white, a top-brands row and a catalog CTA. It reuses the /catalog
   page's data end to end: photos + pre-sized thumbs (products.ts, thumb.ts) and the
   brand marks (brandLogos.ts, white → inked here). "All" is the board's exact 15
   tiles; each category fills the same slots with its own first 15 products.
   Tablet shows 3 columns, mobile 2. */

type Tab = "all" | "swag" | "gifts" | "snacks" | "experiences";

const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "swag", label: "Swag" },
  { id: "gifts", label: "Gifts" },
  { id: "snacks", label: "Snacks" },
  { id: "experiences", label: "Experiences" },
];

/* the board's tiles, column by column (top → bottom) */
const ALL_WALL = [
  ["snacks/03", "experiences/121", "snacks/18"],
  ["gifts/02", "gifts/05", "experiences/106"],
  ["swag/01", "swag/15", "swag/30"],
  ["snacks/27", "experiences/105", "snacks/40"],
  ["experiences/107", "gifts/18", "snacks/52"],
].map((col) => col.map((id) => `/catalog-page/${id}.jpg`));

/* per-column tile heights (as 232-wide aspect ratios) and marquee: loop time, direction, phase.
   Every column is an endless vertical loop on the /catalog hero's `.catalog-track`, so the
   columns drift against each other and never move in lockstep. */
const SLOTS = [
  { h: [300, 269, 320], dur: 84, reverse: false, phase: 4 },
  { h: [321, 300, 300], dur: 96, reverse: true, phase: 0 },
  { h: [269, 340, 300], dur: 78, reverse: false, phase: 11 },
  { h: [320, 257, 320], dur: 104, reverse: true, phase: 6 },
  { h: [287, 294, 287], dur: 90, reverse: false, phase: 15 },
];

const CATEGORY: Record<Exclude<Tab, "all">, { image: string }[]> = {
  swag: SWAG_PRODUCTS,
  gifts: GIFTS_PRODUCTS,
  snacks: SNACKS_PRODUCTS,
  experiences: EXPERIENCES_PRODUCTS,
};

function wallFor(tab: Tab): string[][] {
  if (tab === "all") return ALL_WALL;
  const imgs = CATEGORY[tab].slice(0, 15).map((p) => p.image);
  return SLOTS.map((_, c) => [0, 1, 2].map((r) => imgs[(r * 5 + c) % imgs.length]));
}

/* brands: logos only — the real marks from the catalog's own brand set, per tab. Experiences has
   no brand marks in the catalog data, so it shows the "All" set. */
const ALL_LOGOS = [...BRAND_LOGOS.swag, ...BRAND_LOGOS.gifts, ...BRAND_LOGOS.snacks];
const logosNamed = (names: string[]) =>
  names.flatMap((n) => {
    const l = ALL_LOGOS.find((b) => b.name === n);
    return l ? [l] : [];
  });

const BRANDS_BY_TAB: Record<Tab, ReturnType<typeof logosNamed>> = {
  all: logosNamed(["The North Face", "Carhartt", "Yeti", "Peter Millar"]),
  swag: logosNamed(["Nike", "The North Face", "Carhartt", "Yeti", "Peter Millar", "Stanley"]),
  gifts: logosNamed(["Apple", "Sony", "Logitech", "Ray-Ban", "Casio", "Crayola"]),
  snacks: logosNamed(["Hippeas", "Garrett Popcorn", "Milk Bar", "Pipcorn", "Tate's Bake Shop", "Hu Chocolate"]),
  experiences: logosNamed(["The North Face", "Carhartt", "Yeti", "Peter Millar"]),
};

export default function CatalogTeaser() {
  const [tab, setTab] = useState<Tab>("all");
  const uid = useId();
  const wall = wallFor(tab);
  const brands = BRANDS_BY_TAB[tab];

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = TABS[(i + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length];
    setTab(next.id);
    document.getElementById(`${uid}-${next.id}`)?.focus();
  };

  return (
    <section
      aria-labelledby="catalog-teaser-title"
      className="mx-auto flex w-full min-w-0 max-w-section flex-col items-center gap-8 px-section-x-sm md:gap-10 md:px-section-x-md lg:px-section-x-lg"
    >
      <header className="flex flex-col items-center gap-4 text-center">
        <p className="font-sans text-eyebrow-sm uppercase leading-4 text-swag-ink">The Stadium catalog</p>
        <h2
          id="catalog-teaser-title"
          className="font-display text-display-sm text-ink md:text-heading-xl lg:text-section-title"
        >
          Things people actually keep.
        </h2>
        <p className="max-w-[38.75rem] font-sans text-body-md text-grey-600 lg:text-[1.125rem] lg:leading-7">
          Swag, gifts, snacks and experiences from the brands your people already love, delivered in 170+ countries.
        </p>
      </header>

      <div
        role="tablist"
        aria-label="Catalog categories"
        className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-modal-border bg-white/75 p-2.5 shadow-node [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {TABS.map((t, i) => {
          const on = t.id === tab;
          return (
            <button
              key={t.id}
              id={`${uid}-${t.id}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={`${uid}-wall`}
              tabIndex={on ? 0 : -1}
              onClick={() => setTab(t.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`shrink-0 cursor-pointer whitespace-nowrap rounded-full px-5 py-3 font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-water md:px-6 ${
                on ? "bg-swag-ink text-white" : "text-swag-ink hover:bg-tray"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* colour wall — clipped, fades to white */}
      <div
        id={`${uid}-wall`}
        role="tabpanel"
        aria-labelledby={`${uid}-${tab}`}
        className="relative h-[30rem] w-full max-w-content overflow-hidden md:h-[38rem] lg:h-[47.5rem]"
      >
        <div key={tab} className="catalog-hero-in grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-5">
          {wall.map((col, c) => (
            <div
              key={c}
              className={`relative h-[30rem] overflow-hidden md:h-[38rem] lg:h-[47.5rem] ${c === 2 ? "max-md:hidden" : ""} ${c > 2 ? "max-lg:hidden" : ""}`}
            >
              <div
                className="catalog-track flex flex-col"
                style={
                  {
                    "--catalog-dur": `${SLOTS[c].dur}s`,
                    "--catalog-dir": SLOTS[c].reverse ? "reverse" : "normal",
                    animationDelay: `-${SLOTS[c].phase}s`,
                  } as React.CSSProperties
                }
              >
                {[0, 1].map((half) => (
                  <div key={half} aria-hidden={half === 1 || undefined} className="flex flex-col gap-2.5 pb-2.5">
                    {col.map((src, r) => (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        key={src}
                        src={thumb(src, "m")}
                        alt=""
                        loading="lazy"
                        style={{ aspectRatio: `232 / ${SLOTS[c].h[r]}` }}
                        className="w-full shrink-0 rounded-2xl bg-grey-100 object-cover"
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-white to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-b from-transparent to-white"
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-9 gap-y-4">
        <p className="font-sans text-[0.6875rem] font-bold uppercase leading-[0.875rem] tracking-[0.055rem] text-ink/45">
          Top brands, sourced locally
        </p>
        <ul key={tab} className="catalog-hero-in flex flex-wrap items-center justify-center gap-x-9 gap-y-3">
          {brands.map((b) => {
            const size = logoSize(b.ratio, { area: 9, maxW: 4, maxH: 1.75 });
            return (
              <li key={b.name} className="inline-flex items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.logo}
                  alt={b.name}
                  loading="lazy"
                  style={{ width: `${size.w}rem`, height: `${size.h}rem` }}
                  className="max-w-none object-contain brightness-0 opacity-55"
                />
              </li>
            );
          })}
        </ul>
      </div>

      <Link
        href="/catalog"
        className="inline-flex min-w-56 items-center justify-center rounded-full bg-cta-fill px-7 py-4 font-sans text-[0.8125rem] font-semibold uppercase leading-4 tracking-[0.065rem] text-cta-on transition-all duration-200 hover:bg-grey-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-water focus-visible:ring-offset-2"
      >
        Explore the catalog
      </Link>
    </section>
  );
}
