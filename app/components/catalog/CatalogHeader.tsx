"use client";

import { useId, useState } from "react";

import type { SectionData } from "./data";
import { SECTION_HEADERS } from "./headerData";

/* Section header — Figma "H3 — tabs: one block at a time": huge Satoshi Light
   name, Satoshi Bold stat line, a dark tab pill, and one bordered block of
   chips per tab. Phones: smaller type, the tab pill scrolls sideways, chips
   wrap in a tighter block. */

export default function CatalogHeader({ section }: { section: SectionData }) {
  const { stat, tabs } = SECTION_HEADERS[section.id];
  const [tabId, setTabId] = useState(tabs[0].id);
  const uid = useId();
  const current = tabs.find((t) => t.id === tabId) ?? tabs[0];

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
    setTabId(next.id);
    document.getElementById(`${uid}-tab-${next.id}`)?.focus();
  };

  return (
    <>
      <h2
        id={`${section.id}-title`}
        data-animation="reveal"
        className="text-balance text-[17vw] tracking-[-0.03em] text-white md:whitespace-nowrap md:text-[8rem]"
        style={{
          fontFamily: "var(--font-satoshi-light), var(--font-satoshi), sans-serif",
          fontWeight: 300,
          lineHeight: 1,
        }}
      >
        {section.title}
      </h2>
      <p className="font-display text-[1.25rem] leading-[1.2] tracking-[-0.0375rem] text-white md:text-[2rem]">{stat}</p>

      <div className="mt-1 max-w-full md:mt-0">
        <div
          role="tablist"
          aria-label={`${section.title} details`}
          className="flex max-w-full gap-1.5 overflow-x-auto rounded-full bg-catalog-tile p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map((t, i) => {
            const on = t.id === current.id;
            return (
              <button
                key={t.id}
                id={`${uid}-tab-${t.id}`}
                role="tab"
                type="button"
                aria-selected={on}
                aria-controls={`${uid}-panel`}
                tabIndex={on ? 0 : -1}
                onClick={() => setTabId(t.id)}
                onKeyDown={(e) => onKey(e, i)}
                className={`shrink-0 cursor-pointer whitespace-nowrap rounded-full px-4 py-2.5 font-sans text-[0.875rem] font-semibold leading-[0.9375rem] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:px-[1.375rem] md:py-3 md:text-[0.9375rem] ${
                  on ? "bg-white text-black" : "text-white/70 hover:text-white"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${current.id}`}
        className="w-full max-w-[68.75rem] p-4 md:p-8"
      >
        <ul
          key={current.id}
          className={`catalog-hero-in flex flex-wrap items-center justify-center ${current.logos ? "gap-x-8 gap-y-6 md:gap-x-14 md:gap-y-8" : "gap-2 md:gap-2.5"}`}
        >
          {current.chips.map((c) => (
            <li
              key={c.label}
              className={current.logos ? "inline-flex" : "inline-flex items-center gap-2 rounded-full border border-white/30 px-3.5 py-2 font-sans text-[0.8125rem] font-semibold leading-[1] text-white md:px-4 md:py-[0.5625rem] md:text-[0.875rem]"}
            >
              {c.icon && (
                <span className="relative inline-flex size-[1.3125rem] shrink-0 items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/catalog-page/diet/${c.icon}.svg`} alt="" className="size-[2.625rem] max-w-none shrink-0" />
                </span>
              )}
              {c.logo ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={c.logo} alt={c.label} className={current.logos ? "h-8 w-auto max-w-[7rem] object-contain md:h-10 md:max-w-[9rem]" : "h-[1.375rem] w-auto max-w-[6.5rem] object-contain md:h-6"} loading="lazy" />
              ) : (
                <span>{c.label}</span>
              )}
              {c.count && <span className="text-white/55">{c.count}</span>}
            </li>
          ))}
        </ul>
        {current.more && (
          <p className="catalog-hero-in mt-6 font-sans text-xs font-bold uppercase leading-[0.9375rem] tracking-[0.1rem] text-white/60 md:mt-8">
            {current.more}
          </p>
        )}
      </div>
    </>
  );
}
