"use client";

/* Filterable integrations grid — Figma /integrations "Connect the tools you
   already rely on" (4293:6030). Centered intro → 40 → a row with the pill
   filter bar (white/75 r100 p10, 0/3/6 shadow; active pill #16171b) and a
   443-wide search field (#e2e2de hairline, r8, p14, 14px #9999a3
   placeholder) → 40 → #f2f2f2 r32 p16 tray, 3 columns gap 16, of white r24
   cards (8 white border + p24): name 27/30 Satoshi Bold −0.3 left, logo
   right → 40 → optional dark pill. Filtering is client-side (category tab
   AND name search). */

import Image from "next/image";
import { Search } from "lucide-react";
import { useId, useMemo, useState } from "react";

import PillLink from "./PillLink";
import SectionIntro from "./SectionIntro";

export type Integration = {
  name: string;
  /* matches a filter `value`; an item may sit in several categories */
  categories: string[];
  logo?: { src: string; width: number; height: number };
};

export type IntegrationsDirectoryProps = {
  caption?: string;
  title: string;
  description?: string;
  /* first filter is the "all" tab (value "all") */
  filters: { label: string; value: string }[];
  items: Integration[];
  cta?: { label: string; href: string };
};

export default function IntegrationsDirectory({
  caption,
  title,
  description,
  filters,
  items,
  cta,
}: IntegrationsDirectoryProps) {
  const [filter, setFilter] = useState(filters[0]?.value ?? "all");
  const [query, setQuery] = useState("");
  const searchId = useId();

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (item) =>
        (filter === "all" || item.categories.includes(filter)) &&
        (!q || item.name.toLowerCase().includes(q)),
    );
  }, [items, filter, query]);

  return (
    <section className="px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        <SectionIntro caption={caption} title={title} description={description} />

        <div
          data-animation="reveal"
          className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div
            role="group"
            aria-label="Filter integrations"
            className="flex w-fit max-w-full gap-2.5 overflow-x-auto rounded-full bg-white/75 p-2.5 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)] [scrollbar-width:none]"
          >
            {filters.map((f) => {
              const active = f.value === filter;
              return (
                <button
                  key={f.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f.value)}
                  className={`shrink-0 rounded-full px-5 py-[0.8125rem] font-sans text-eyebrow-sm uppercase leading-4 transition-colors duration-200 ${
                    active ? "bg-pricing-ink text-white" : "text-pricing-ink hover:bg-pricing-cell"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          <label
            htmlFor={searchId}
            className="flex w-full items-center gap-1.5 rounded-lg border border-[#e2e2de] bg-white p-3.5 focus-within:border-pricing-ink md:w-[27.6875rem]"
          >
            <Search aria-hidden className="size-4 shrink-0 text-[#9999a3]" strokeWidth={2} />
            <span className="sr-only">Search integrations</span>
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full bg-transparent font-sans text-small text-pricing-ink placeholder:text-[#9999a3] focus:outline-none!"
            />
          </label>
        </div>

        <div data-animation="reveal" className="w-full rounded-[2rem] bg-pricing-cell p-4">
          {visible.length ? (
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
              {visible.map((item) => (
                <li
                  key={item.name}
                  className="flex min-h-[5.8125rem] items-center justify-between gap-4 rounded-3xl border-8 border-white bg-white p-4 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)] md:p-6"
                >
                  <span className="font-display text-[1.5rem] font-bold leading-[1.875rem] tracking-[-0.01875rem] text-pricing-ink md:text-[1.6875rem]">
                    {item.name}
                  </span>
                  {item.logo && (
                    <Image
                      src={item.logo.src}
                      alt=""
                      width={item.logo.width}
                      height={item.logo.height}
                      style={{ height: `${Math.min(item.logo.height, 45) / 16}rem` }}
                      className="w-auto max-w-[6rem] shrink-0 object-contain"
                    />
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p aria-live="polite" className="px-6 py-10 text-center font-sans text-body-lg text-swag-grey">
              No integrations match “{query}”.
            </p>
          )}
        </div>

        {cta && (
          <div data-animation="reveal">
            <PillLink {...cta} />
          </div>
        )}
      </div>
    </section>
  );
}
