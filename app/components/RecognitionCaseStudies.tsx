"use client";

/* Recognition · Case Studies (Figma /recognition 312:5984). A centered title,
   a 3-up row of article cards (photo + title + blurb), and a horizontal
   testimonial carousel (fluted thumb + white quote card with a lilac stat pill)
   with prev/next arrows. Accent (stat pill text) inherits the page's lilac
   --color-swag-* override. */

import { useRef, useState } from "react";

const ARTICLES = [
  {
    title: "1,000 posts of praise in a single month",
    desc: "Keyfactor traded a Teams channel for a branded kudos program tied to real rewards.",
  },
  {
    title: "From nine vendors to one platform",
    desc: "One branded shop simplified ordering, branding, and fulfillment across the company.",
  },
  {
    title: "Scaling beyond everyday recognition",
    desc: "Expanded from everyday kudos to milestone awards, executive gifts, and more.",
  },
];

const TESTIMONIALS = [
  {
    stat: "850+ recipients",
    quote:
      "“This all-in-one platform has been huge and has taken recognition to the next level…”",
    company: "ConstructConnect",
  },
  {
    stat: "850+ recipients",
    quote:
      "“We truly cherish our partnership with Stadium. There’s been a value-add for employees, customers, and clients…”",
    company: "ConstructConnect",
  },
  {
    stat: "850+ recipients",
    quote:
      "“Letting employees pick what they actually want made it something people look forward to.”",
    company: "ConstructConnect",
  },
];

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      className="size-6 text-swag-ink"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {dir === "left" ? (
        <>
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </>
      ) : (
        <>
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </>
      )}
    </svg>
  );
}

export default function RecognitionCaseStudies() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  };
  const nudge = (d: number) =>
    trackRef.current?.scrollBy({ left: d, behavior: "smooth" });

  return (
    <section className="overflow-clip rounded-t-[5rem] bg-white px-section-x-sm pb-20 pt-16 md:px-section-x-md md:pb-24 md:pt-20 lg:px-section-x-lg lg:pb-28">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-14 lg:gap-20">
        {/* title + article cards */}
        <div className="flex w-full flex-col items-center gap-10">
          <div className="flex max-w-[54rem] flex-col items-center gap-5 text-center">
            <h2
              data-animation="reveal"
              className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem] lg:text-[2.75rem]"
            >
              How real teams run recognition on Stadium
            </h2>
            <p
              data-animation="reveal"
              className="font-sans text-body-md text-swag-grey lg:text-[1.125rem] lg:leading-[1.48]"
            >
              Global rollouts, adoption lifts, and rewards leadership trusts,
              set up by the teams who own engagement.
            </p>
          </div>
          <div
            data-animation="reveal"
            className="grid w-full grid-cols-1 gap-6 md:grid-cols-3"
          >
            {ARTICLES.map((a) => (
              <div key={a.title} className="flex flex-col gap-6">
                <div className="overflow-hidden rounded-2xl border border-[#f5f5f5]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/recognition/casestudy.jpg"
                    alt=""
                    aria-hidden
                    className="aspect-[382/272] w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="font-display text-[1.25rem] leading-[1.04] tracking-[-0.01875rem] text-swag-ink">
                    {a.title}
                  </h3>
                  <p className="font-sans text-[0.9375rem] leading-[1.5] text-swag-grey">
                    {a.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* testimonial carousel */}
        <div className="flex w-full flex-col gap-8">
          <div
            ref={trackRef}
            onScroll={onScroll}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="flex h-[24rem] w-[min(38rem,88vw)] shrink-0 snap-start gap-6 rounded-3xl bg-[#f2f2f2] p-6"
              >
                <div className="size-[4.5rem] shrink-0 overflow-hidden rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/swag/swag-workflow.jpg"
                    alt=""
                    aria-hidden
                    className="size-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between overflow-hidden rounded-xl bg-white px-7 pb-[1.875rem] pt-7 shadow-[0_0.1875rem_0.375rem_rgba(0,0,0,0.06)]">
                  <span className="w-fit rounded-lg bg-[#f0defc] px-3 py-1.5 font-sans text-[0.875rem] font-bold text-swag-green-deep">
                    {t.stat}
                  </span>
                  <div className="flex flex-col gap-4">
                    <p className="font-[family-name:var(--font-satoshi-medium)] text-[1.5625rem] leading-[1.2] tracking-[-0.01875rem] text-swag-ink">
                      {t.quote}
                    </p>
                    <p className="font-sans text-[0.9375rem] leading-[1.5] text-swag-grey">
                      {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => nudge(-620)}
              disabled={atStart}
              aria-label="Previous testimonials"
              className="flex size-10 items-center justify-center rounded-full bg-[#f2f5f5] transition-all hover:bg-grey-200 active:scale-95 disabled:opacity-25"
            >
              <Arrow dir="left" />
            </button>
            <button
              type="button"
              onClick={() => nudge(620)}
              disabled={atEnd}
              aria-label="Next testimonials"
              className="flex size-10 items-center justify-center rounded-full bg-[#f2f5f5] transition-all hover:bg-grey-200 active:scale-95 disabled:opacity-25"
            >
              <Arrow dir="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
