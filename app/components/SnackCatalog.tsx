"use client";

/* /snacks · THE CATALOG — "Find everyone's favorite, from 2,000+ snacks".

   Card imagery restaged 2026-08-26 from the Imagery System file
   F7rDHYd3n5nwRtrlv1F6dO → "02 CATEGORY CARDS · restaged by us, 32 cards"
   (1579:11074). That board replaces the four cards this section shipped with
   (sn3-cat-*.jpg) with 32 — eight per tab — of real SnackMagic product
   photography, one colour field per tab.

   The card treatment changed with it. It used to be a grey #f7f7f7 tile with
   dark text ABOVE a separate photo; Figma now makes the photo the card (348×460,
   r20) with the label overlaid on it in white at 24,24. The label is a live
   text layer in Figma, not baked into the export, so it stays real text here —
   the same rule the previous version already followed.

   Only 6 of the 32 sources needed a crop: those cards use a CROP fill whose
   imageTransform names the visible window. The other 26 are FILL, and their
   sources (1792×2369 and 1024×1354) already sit at 0.756 against the card's
   348/460 = 0.7565, so a cover crop takes essentially the whole frame. Each
   encoded card was diffed against its own Figma slot to confirm the label maps
   to the right photo — worst 6.6/255 across the tab whose sources were all
   identically sized.

   The filter pills previously set `active` but the carousel always rendered
   every card, so clicking a pill did nothing. They filter for real now.

   Figma card: 348×460 r20, photo fill, text block at 24,24 —
   eyebrow Overpass Bold 12 white, title Satoshi Bold 24 white. */

import { useRef, useState } from "react";
import Image from "next/image";

type Tab = "Snacks" | "Beverages" | "Pantry" | "Work & Play";

const FILTERS = ["All", "Snacks", "Beverages", "Pantry", "Work & Play"] as const;

/* Figma card order, tab by tab. `slug` is the encoded asset in
   /public/snacks/cat/sn-cat-<slug>.jpg (696×920 = 2× the 348 CSS card). */
const CARDS: { tab: Tab; label: string; slug: string }[] = [
  { tab: "Snacks", label: "Chocolate", slug: "chocolate" },
  { tab: "Snacks", label: "Cookies", slug: "cookies" },
  { tab: "Snacks", label: "Potato Chips", slug: "potato-chips" },
  { tab: "Snacks", label: "Popcorn & Pretzels", slug: "popcorn-and-pretzels" },
  { tab: "Snacks", label: "Snack Bars", slug: "snack-bars" },
  { tab: "Snacks", label: "Nuts, Seeds & Legumes", slug: "nuts-seeds-and-legumes" },
  { tab: "Snacks", label: "Candies", slug: "candies" },
  { tab: "Snacks", label: "Jerky", slug: "jerky" },

  { tab: "Beverages", label: "Cold Brew", slug: "cold-brew" },
  { tab: "Beverages", label: "Tea", slug: "tea" },
  { tab: "Beverages", label: "Seltzer & Sparkling", slug: "seltzer-and-sparkling" },
  { tab: "Beverages", label: "Energy", slug: "energy" },
  { tab: "Beverages", label: "Soda", slug: "soda" },
  { tab: "Beverages", label: "Wellness & Functional", slug: "wellness-and-functional" },
  { tab: "Beverages", label: "Shots & Smoothies", slug: "shots-and-smoothies" },
  { tab: "Beverages", label: "Electrolytes", slug: "electrolytes" },

  { tab: "Pantry", label: "Coffee, Tea & Cocoa", slug: "coffee-tea-and-cocoa" },
  { tab: "Pantry", label: "Dips & Salsas", slug: "dips-and-salsas" },
  { tab: "Pantry", label: "Sauces & Seasonings", slug: "sauces-and-seasonings" },
  { tab: "Pantry", label: "Spreads", slug: "spreads" },
  { tab: "Pantry", label: "Condiments", slug: "condiments" },
  { tab: "Pantry", label: "Broths & Soups", slug: "broths-and-soups" },
  { tab: "Pantry", label: "Specialty Staples", slug: "specialty-staples" },
  { tab: "Pantry", label: "Mixers", slug: "mixers" },

  { tab: "Work & Play", label: "Self Care", slug: "self-care" },
  { tab: "Work & Play", label: "Kitchen", slug: "kitchen" },
  { tab: "Work & Play", label: "Plants", slug: "plants" },
  { tab: "Work & Play", label: "Fitness", slug: "fitness" },
  { tab: "Work & Play", label: "Everyday Carry", slug: "everyday-carry" },
  { tab: "Work & Play", label: "Entertainment & Games", slug: "entertainment-and-games" },
  { tab: "Work & Play", label: "Bath & Body", slug: "bath-and-body" },
  { tab: "Work & Play", label: "Electronics", slug: "electronics" },
];

function Arrow({ dir, onClick }: { dir: "l" | "r"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "l" ? "Previous" : "Next"}
      className="flex size-10 items-center justify-center rounded-full border border-[#e4e4e7] bg-white text-[#16171b] transition-all duration-200 hover:border-[#16171b] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5"
        aria-hidden
      >
        {dir === "l" ? (
          <path d="M19 12H5M12 19l-7-7 7-7" />
        ) : (
          <path d="M5 12h14M12 5l7 7-7 7" />
        )}
      </svg>
    </button>
  );
}

export default function SnackCatalog() {
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  /* one card (348) + the carousel's own gap (24) */
  const scroll = (d: number) =>
    track.current?.scrollBy({ left: d * 372, behavior: "smooth" });

  const filter = FILTERS[active];
  const visible =
    filter === "All" ? CARDS : CARDS.filter((c) => c.tab === filter);

  return (
    <section className="bg-white min-w-0 px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
      <div className="mx-auto flex w-full max-w-content flex-col gap-8 lg:gap-[2.8125rem]">
        {/* header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-[34rem] flex-col gap-4 lg:gap-6">
            <div className="flex flex-col gap-2">
              <p
                data-animation="reveal"
                className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#2178f5]"
              >
                The catalog
              </p>
              <h2
                data-animation="reveal"
                className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
              >
                Find everyone&#8217;s favorite, from 2,000+ snacks
              </h2>
            </div>
            <p
              data-animation="reveal"
              className="font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]"
            >
              Snacks for any craving or diet, plus new brands to discover.
            </p>
          </div>
          <a
            href="#"
            data-animation="reveal"
            className="w-fit font-sans text-[0.75rem] font-bold uppercase tracking-[0.0625rem] text-[#16171b]"
          >
            <span className="border-b border-black pb-[2px]">
              Browse all 2,000+ snacks
            </span>
          </a>
        </div>

        {/* filter pills */}
        <div
          data-animation="reveal"
          className="-mx-4 -mb-12 w-[calc(100%+2rem)] overflow-x-auto px-4 pb-12 [scrollbar-width:none] lg:mx-0 lg:mb-0 lg:w-full lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex w-max items-center gap-2.5 rounded-full bg-white/75 p-2.5 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]">
            {FILTERS.map((f, i) => (
              <button
                key={f}
                type="button"
                onClick={() => {
                  setActive(i);
                  /* a new set starts at the beginning */
                  track.current?.scrollTo({ left: 0, behavior: "smooth" });
                }}
                aria-pressed={i === active}
                className={`whitespace-nowrap rounded-full px-5 py-[0.8125rem] font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                  i === active
                    ? "bg-[#16171b] text-white"
                    : "text-[#16171b] hover:bg-black/5"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* carousel — Figma card 348×460 r20, photo as the card, label over it */}
        <div
          ref={track}
          data-animation="reveal"
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {visible.map((c) => (
            <article
              key={c.slug}
              className="relative aspect-[348/460] w-[15rem] shrink-0 snap-start overflow-hidden rounded-[1.25rem] sm:w-[18rem] lg:w-[21.75rem]"
            >
              <Image
                src={`/snacks/cat/sn-cat-${c.slug}.jpg`}
                alt={`${c.label} — ${c.tab}`}
                fill
                quality={90}
                className="object-cover"
                sizes="(min-width:1024px) 21.75rem, (min-width:640px) 18rem, 15rem"
              />
              <div className="absolute left-6 top-6 flex flex-col gap-[0.1875rem]">
                <p className="font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem] text-white">
                  {c.tab}
                </p>
                <h3 className="font-[family-name:var(--font-satoshi)] text-[1.5rem] font-bold leading-[1.17] text-white">
                  {c.label}
                </h3>
              </div>
            </article>
          ))}
        </div>

        {/* nav arrows */}
        <div className="flex items-center justify-end gap-2.5 lg:-mt-[0.8125rem]">
          <Arrow dir="l" onClick={() => scroll(-1)} />
          <Arrow dir="r" onClick={() => scroll(1)} />
        </div>
      </div>
    </section>
  );
}
