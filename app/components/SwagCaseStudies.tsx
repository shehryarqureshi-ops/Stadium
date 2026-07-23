"use client";

import { useEffect, useRef, useState } from "react";

/* Case studies — Figma /swag 2:25554 ("Teams that ended the swag chaos"). A
   carousel of testimonial cards: a green thumbnail + a green stat pill + a
   pull-quote + the company. Figma ships two; extended with a few more on-brand
   quotes. Prev/next arrows; scrolls. */

const QUOTES = [
  { stat: "850+ recipients", quote: "Letting employees pick what they actually want made it something people look forward to.", company: "ConstructConnect" },
  { stat: "67% faster", quote: "On-demand is the killer feature — no inventory we don't need or can't use.", company: "Kentro" },
  { stat: "40+ countries", quote: "One invoice for every market. Finance finally stopped chasing POs.", company: "Northwind" },
  { stat: "3 days to launch", quote: "We had a branded store live before the next all-hands.", company: "Loop" },
  { stat: "0 spreadsheets", quote: "Inventory counts are live now. No more guessing at reorder time.", company: "Cedar" },
];

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {dir === "left" ? <path d="M19 12H5m0 0 7 7m-7-7 7-7" /> : <path d="M5 12h14m0 0-7-7m7 7-7 7" />}
    </svg>
  );
}

export default function SwagCaseStudies() {
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
  const scroll = (d: number) => track.current?.scrollBy({ left: d * (track.current.clientWidth * 0.7), behavior: "smooth" });

  return (
    <section className="bg-white px-section-x-sm py-20 md:px-section-x-md md:py-24 lg:px-section-x-lg lg:py-28">
      <div className="mx-auto flex w-full max-w-content flex-col gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <p data-animation="reveal" className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-swag-green-deep md:text-eyebrow-md">
            PROOF
          </p>
          <h2 data-animation="reveal" className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem] lg:text-[2.75rem]">
            Teams that ended the swag chaos
          </h2>
          <p data-animation="reveal" className="max-w-[38rem] font-sans text-body-md text-swag-grey">
            Real results that answer the question that matters: can Stadium
            handle a team like mine?
          </p>
        </div>

        <div data-animation="reveal" className="flex flex-col gap-8">
          <div ref={track} onScroll={sync} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {QUOTES.map((q, i) => (
              <article key={i} className="relative flex h-[19.5rem] w-[85vw] shrink-0 snap-start rounded-2xl bg-[#f2f2f2] p-5 sm:w-[28rem]">
                <span className="absolute left-5 top-5 z-10 size-14 rounded-lg bg-[linear-gradient(150deg,#0a3d2a,#0b5c37_60%,#6bad8f)]" />
                <div className="flex flex-1 flex-col justify-between rounded-xl bg-white p-7 pl-16">
                  <span className="w-fit rounded-full bg-[#e8f8ee] px-3 py-1 font-sans text-[0.75rem] font-bold text-swag-green-deep">
                    {q.stat}
                  </span>
                  <div className="flex flex-col gap-4">
                    <p className="font-display text-[1.375rem] leading-[1.2] text-swag-ink">
                      &ldquo;{q.quote}&rdquo;
                    </p>
                    <p className="font-sans text-[0.875rem] text-swag-grey">{q.company}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="flex items-center justify-end gap-2.5">
            <button type="button" onClick={() => scroll(-1)} disabled={atStart} aria-label="Previous" className="flex size-10 items-center justify-center rounded-full bg-[#f2f5f5] text-swag-ink transition-all hover:bg-grey-200 disabled:opacity-25 active:scale-95 focus-visible:outline-ink">
              <Arrow dir="left" />
            </button>
            <button type="button" onClick={() => scroll(1)} disabled={atEnd} aria-label="Next" className="flex size-10 items-center justify-center rounded-full bg-[#f2f5f5] text-swag-ink transition-all hover:bg-grey-200 disabled:opacity-25 active:scale-95 focus-visible:outline-ink">
              <Arrow dir="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
