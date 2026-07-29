"use client";

import { useState } from "react";

/* ── Events · Workflow #2 — Figma 608:3544 "six ways" (browse by category) ──
   A left-rail accordion (Team Building expanded, others collapsed) paired with a
   peek carousel of the active category's experiences (centre card emphasised,
   siblings peeking behind edge-blur), with pagination dots. Its own component,
   not the SwagWorkflow pill-tab band. */

type Exp = { title: string; meta: string; grad: string };
type Category = { name: string; desc: string; exps: Exp[] };

const CATEGORIES: Category[] = [
  {
    name: "Team Building",
    desc: "Build stronger teams with games, mysteries, and challenges that get people talking.",
    exps: [
      { title: "Candle Making", meta: "60 min · ship-to-home · ★ 5.0", grad: "linear-gradient(150deg,#f2ecdf,#e8dcc4)" },
      { title: "Murder Mystery", meta: "60 min · 10–500 · ★ 4.9", grad: "linear-gradient(150deg,#efe4ee,#e2d2e3)" },
      { title: "Taco Throwdown", meta: "75 min · in-person · ★ 4.8", grad: "linear-gradient(150deg,#f6e7dc,#efd6c4)" },
    ],
  },
  {
    name: "Learning & Development",
    desc: "Skill-building sessions people actually enjoy — no slide decks required.",
    exps: [
      { title: "Storytelling Masterclass", meta: "75 min · virtual · ★ 4.9", grad: "linear-gradient(150deg,#e3e9f0,#d3dcea)" },
      { title: "Improv for Teams", meta: "60 min · virtual · ★ 4.8", grad: "linear-gradient(150deg,#efe1e6,#e3cdd6)" },
      { title: "Negotiation Lab", meta: "90 min · hybrid · ★ 4.7", grad: "linear-gradient(150deg,#e2ece7,#cfe2d6)" },
    ],
  },
  {
    name: "Health & Wellness",
    desc: "Give your team a reset that isn’t another meeting on the calendar.",
    exps: [
      { title: "Guided Meditation", meta: "30 min · virtual · ★ 4.9", grad: "linear-gradient(150deg,#e2ece7,#cfe2d6)" },
      { title: "Desk Yoga", meta: "45 min · virtual · ★ 4.8", grad: "linear-gradient(150deg,#e3e9f0,#d3dcea)" },
      { title: "Nutrition Workshop", meta: "60 min · virtual · ★ 4.7", grad: "linear-gradient(150deg,#f1e6dc,#e7d3bf)" },
    ],
  },
  {
    name: "Seasonal Celebrations",
    desc: "Mark the moments that make the year — together, wherever people are.",
    exps: [
      { title: "Holiday Cook-Along", meta: "75 min · ship-to-home · ★ 5.0", grad: "linear-gradient(150deg,#f2ecdf,#e8dcc4)" },
      { title: "Ugly Sweater Trivia", meta: "45 min · virtual · ★ 4.8", grad: "linear-gradient(150deg,#efe4ee,#e2d2e3)" },
      { title: "Year-End Awards", meta: "60 min · hybrid · ★ 4.9", grad: "linear-gradient(150deg,#f6e7dc,#efd6c4)" },
    ],
  },
  {
    name: "Employee Onboarding",
    desc: "Make week one feel like a welcome, not a to-do list.",
    exps: [
      { title: "New-Hire Mixer", meta: "45 min · virtual · ★ 4.8", grad: "linear-gradient(150deg,#e3e9f0,#d3dcea)" },
      { title: "Culture Trivia", meta: "30 min · virtual · ★ 4.7", grad: "linear-gradient(150deg,#efe1e6,#e3cdd6)" },
      { title: "Welcome Kit Reveal", meta: "30 min · ship-to-home · ★ 5.0", grad: "linear-gradient(150deg,#f2ecdf,#e8dcc4)" },
    ],
  },
  {
    name: "Diversity, Equity, & Inclusion",
    desc: "Celebrate your team in a way that actually means something.",
    exps: [
      { title: "Heritage Cook-Along", meta: "75 min · ship-to-home · ★ 4.9", grad: "linear-gradient(150deg,#f6e7dc,#efd6c4)" },
      { title: "Inclusive Trivia", meta: "45 min · virtual · ★ 4.8", grad: "linear-gradient(150deg,#efe4ee,#e2d2e3)" },
      { title: "Storyteller Series", meta: "60 min · virtual · ★ 5.0", grad: "linear-gradient(150deg,#e2ece7,#cfe2d6)" },
    ],
  },
];

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[1.1rem]">
      <path d="M5 12h14M12 5v14" />
    </svg>
  );
}

function ExpCard({ exp, emphasis }: { exp: Exp; emphasis?: boolean }) {
  return (
    <div className="flex w-full flex-col items-center rounded-[1.5rem] border-8 border-white bg-white p-2 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]">
      <div
        className="h-[13rem] w-full rounded-tl-[0.5rem] rounded-tr-[0.5rem] rounded-br-[1.5rem] rounded-bl-[1.5rem] shadow-[0px_20px_10px_rgba(0,0,0,0.10),0px_2px_1px_rgba(0,0,0,0.10)] lg:h-[15.625rem]"
        style={{ background: exp.grad }}
      />
      <div className="flex w-full flex-col gap-2 px-4 pb-6 pt-8 lg:px-8 lg:pt-10">
        <p className={`font-[family-name:var(--font-satoshi)] leading-[1.04] tracking-[-0.012em] text-swag-ink ${emphasis ? "text-[1.375rem] lg:text-[1.5625rem]" : "text-[1.25rem]"}`}>
          {exp.title}
        </p>
        <p className="font-sans text-[0.9375rem] leading-[1.5] text-[#6b6c71]">
          {exp.meta}
        </p>
      </div>
    </div>
  );
}

export default function EventsCategories() {
  const [cat, setCat] = useState(0);
  const [slide, setSlide] = useState(1); // centre index (start on the 2nd exp, matching Figma)

  const active = CATEGORIES[cat];
  const exps = active.exps;
  const n = exps.length;
  const center = exps[slide % n];
  const left = exps[(slide + n - 1) % n];
  const right = exps[(slide + 1) % n];

  function pick(i: number) {
    setCat(i);
    setSlide(1);
  }

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-section px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
        {/* intro */}
        <div className="flex flex-col items-center gap-5 pt-4 md:pt-6">
          <div className="flex flex-col items-center gap-2">
            <p className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-swag-green">
              Browse by theme
            </p>
            <h2 className="text-center font-[family-name:var(--font-satoshi)] text-[2rem] leading-[1.08] tracking-[-0.02em] text-swag-ink md:text-[2.5rem] lg:text-[2.75rem]">
              Find an event for any occasion
            </h2>
          </div>
          <p className="max-w-[34rem] text-center font-sans text-[1rem] leading-[1.48] text-[#6b6c71] md:text-[1.125rem]">
            Whatever you’re marking — a milestone, a season, a new hire — there’s
            a hosted experience built for it.
          </p>
        </div>

        {/* card */}
        <div className="mt-11 flex flex-col gap-6 rounded-[1.5rem] bg-[#f2f2f2] p-2.5 pb-24 lg:flex-row lg:gap-20 lg:pb-2.5">
          {/* left rail accordion */}
          <div className="flex shrink-0 flex-col gap-2.5 lg:w-[23.5rem]">
            {CATEGORIES.map((c, i) => {
              const on = i === cat;
              return on ? (
                <div
                  key={c.name}
                  className="flex flex-col justify-center gap-7 rounded-[0.75rem] bg-white px-7 pb-[1.875rem] pt-7 shadow-[0px_3px_3px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-[family-name:var(--font-satoshi-medium)] text-[1.25rem] leading-[1.04] text-swag-ink">
                      {c.name}
                    </p>
                    <span className="flex size-7 items-center justify-center rounded-full bg-black text-white">
                      <XIcon />
                    </span>
                  </div>
                  <div className="flex flex-col gap-6">
                    <p className="font-sans text-[0.875rem] leading-[1.43] tracking-[0.011em] text-[#828282]">
                      {c.desc}
                    </p>
                    <div className="w-full rounded-[0.625rem] bg-[#f2f2f2]">
                      <div
                        className="h-[2px] rounded-[0.625rem] bg-swag-ink transition-all"
                        style={{ width: `${((cat + 1) / CATEGORIES.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => pick(i)}
                  className="flex items-center justify-between rounded-[0.75rem] border border-[#f2f2f2] bg-white px-7 pb-[1.875rem] pt-7 text-left transition-all hover:border-[#e0e0e0] active:scale-[0.995] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-swag-ink"
                >
                  <span className="font-[family-name:var(--font-satoshi-medium)] text-[1.25rem] leading-[1.04] text-[#a9adbc]">
                    {c.name}
                  </span>
                  <span className="flex size-7 items-center justify-center rounded-full bg-[#e8e9ed] text-[#16171b]">
                    <PlusIcon />
                  </span>
                </button>
              );
            })}
          </div>

          {/* right peek carousel */}
          <div className="flex min-w-0 flex-1 flex-col items-center gap-4 py-6">
            {/* mobile / tablet: simple horizontal scroll */}
            <div className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
              {exps.map((e) => (
                <div key={e.title} className="w-[72%] shrink-0 snap-center sm:w-[46%]">
                  <ExpCard exp={e} />
                </div>
              ))}
            </div>

            {/* desktop: centre + peeking siblings behind edge blur */}
            <div className="relative hidden h-[30rem] w-full items-center justify-center overflow-hidden lg:flex">
              <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-[14rem] bg-gradient-to-r from-[#f2f2f2] to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-[14rem] bg-gradient-to-l from-[#f2f2f2] to-transparent" />
              <div className="absolute left-[calc(50%-24rem)] w-[18.125rem] scale-90 opacity-80">
                <ExpCard exp={left} />
              </div>
              <div className="absolute left-[calc(50%+5.875rem)] w-[18.125rem] scale-90 opacity-80">
                <ExpCard exp={right} />
              </div>
              <div className="relative z-10 w-[20.625rem]">
                <ExpCard exp={center} emphasis />
              </div>
            </div>

            {/* pagination */}
            <div className="hidden items-center justify-center gap-2 lg:flex">
              {exps.map((e, i) => (
                <button
                  key={e.title}
                  type="button"
                  aria-label={`Show ${e.title}`}
                  onClick={() => setSlide(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === slide % n ? "w-5 bg-swag-ink" : "w-2 bg-[#d4d6da] hover:bg-[#b9bcc2]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
