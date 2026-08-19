"use client";

/* /events (Experiences · Confetti) · BROWSE BY CATEGORY — Figma
   n9SjmDjzB1PeZAYJ5w43fr → 2504:9385 "six ways", inside page frame 2504:9060
   (section y 3926..4783 at 1440). Despite the reused frame name this is NOT the
   pill-tab band: it is a compact centred header (2504:9386) over a grey
   "Phase Detail Card" tray (2504:9392 → 2504:9393, #f2f2f2, r24, p10) split into
     · a LEFT RAIL vertical category list (377 wide): the open category is a
       200-tall white card with its description + a 2px progress rule; the five
       closed ones are 85-tall white cards with a 1px #f2f2f2 border and a grey
       lucide/plus disc, and
     · a RIGHT PEEK CAROUSEL (753 wide, 609-tall stage): the centre experience
       card is 330×473, its two neighbours are 290-wide cards pushed 100px off
       each edge and washed out by #f2f2f2→transparent edge gradients, with a
       3-dot pagination row underneath.

   Figma stack (y relative to the section frame, 1440):
     eyebrow "BROWSE BY CATEGORY"  y=0    h=15   (12 / normal, #ff5b77, +0.72px)
     gap 8
     h2 (44 / 1.06, −0.5, #1f1a24) y=23   h=47
     gap 20
     subhead (18 / 1.48, #6b6c71)  y=90   h=27   → intro block 0..117
     gap 45   (the band frame's own pt-45)
     tray                          y=162  h=695
       rail  10,10 377×675   (card 200 · gap 10 · 5 × 85)
       right 467,10 753×675  (py 24 · stage 609 · gap 10 · dots 8)
         stage: card C 330×473 centred · side cards 290 at left/right −100 ·
                edge fades 230 and 211 wide, 586 tall
     frame end 857 — the frame carries NO internal top/bottom space and the
     neighbours sit 160 away, so the site section is py-20 (80 + 80).

   Container: site 1200 (Figma draws 1240 @ x=100). The tray's inner split is
   kept proportional (rail 377/1220 = 30.9016%, gap 80/1220 = 6.5574%); the
   carousel cards keep their exact Figma pixel sizes and peek offsets, so the
   only difference at 1200 is ~15px less stage width on each side.

   Copy: Figma only draws the "Team Building" state (its three experience cards,
   two of which carry images — "Candle Making" is a bare #e0e0e0 placeholder in
   Figma and is reproduced as such). The other five categories reuse the
   approved copy + card gradients from the old EventsCategories.tsx. */

import { useRef, useState, type KeyboardEvent } from "react";
import Image, { type StaticImageData } from "next/image";
import imgMurderMystery from "@/public/exp2/xp-categories-murder-mystery.jpg";
import imgTacoThrowdown from "@/public/exp2/xp-categories-taco-throwdown.jpg";

type Exp = {
  title: string;
  meta: string;
  img?: StaticImageData;
  alt?: string;
  /* Fallback fill for the states Figma does not draw (and for Candle Making,
     which Figma draws as a flat #e0e0e0 block). */
  fill?: string;
};

type Category = { name: string; desc: string; exps: Exp[] };

const CATEGORIES: Category[] = [
  {
    name: "Team Building",
    desc: "Build stronger teams with games, mysteries, and challenges that pull people into the conversation.",
    exps: [
      { title: "Candle Making", meta: "60 min · ship-to-home · ★ 5.0", fill: "#e0e0e0" },
      {
        title: "Murder Mystery",
        meta: "60 min · 10–500 · ★ 4.9",
        img: imgMurderMystery,
        alt: "A skull-and-crossbones illustration on a bright yellow background",
      },
      {
        title: "Taco Throwdown",
        meta: "75 min · in-person · ★ 4.8",
        img: imgTacoThrowdown,
        alt: "Three loaded tacos on a dark plate against a lime-green background",
      },
    ],
  },
  {
    name: "Learning & Development",
    desc: "Skill-building sessions people actually enjoy — no slide decks required.",
    exps: [
      { title: "Storytelling Masterclass", meta: "75 min · virtual · ★ 4.9", fill: "linear-gradient(150deg,#e3e9f0,#d3dcea)" },
      { title: "Improv for Teams", meta: "60 min · virtual · ★ 4.8", fill: "linear-gradient(150deg,#efe1e6,#e3cdd6)" },
      { title: "Negotiation Lab", meta: "90 min · hybrid · ★ 4.7", fill: "linear-gradient(150deg,#e2ece7,#cfe2d6)" },
    ],
  },
  {
    name: "Health & Wellness",
    desc: "Give your team a reset that isn’t another meeting on the calendar.",
    exps: [
      { title: "Guided Meditation", meta: "30 min · virtual · ★ 4.9", fill: "linear-gradient(150deg,#e2ece7,#cfe2d6)" },
      { title: "Desk Yoga", meta: "45 min · virtual · ★ 4.8", fill: "linear-gradient(150deg,#e3e9f0,#d3dcea)" },
      { title: "Nutrition Workshop", meta: "60 min · virtual · ★ 4.7", fill: "linear-gradient(150deg,#f1e6dc,#e7d3bf)" },
    ],
  },
  {
    name: "Seasonal Celebrations",
    desc: "Mark the moments that make the year — together, wherever people are.",
    exps: [
      { title: "Holiday Cook-Along", meta: "75 min · ship-to-home · ★ 5.0", fill: "linear-gradient(150deg,#f2ecdf,#e8dcc4)" },
      { title: "Ugly Sweater Trivia", meta: "45 min · virtual · ★ 4.8", fill: "linear-gradient(150deg,#efe4ee,#e2d2e3)" },
      { title: "Year-End Awards", meta: "60 min · hybrid · ★ 4.9", fill: "linear-gradient(150deg,#f6e7dc,#efd6c4)" },
    ],
  },
  {
    name: "Employee Onboarding",
    desc: "Make week one feel like a welcome, not a to-do list.",
    exps: [
      { title: "New-Hire Mixer", meta: "45 min · virtual · ★ 4.8", fill: "linear-gradient(150deg,#e3e9f0,#d3dcea)" },
      { title: "Culture Trivia", meta: "30 min · virtual · ★ 4.7", fill: "linear-gradient(150deg,#efe1e6,#e3cdd6)" },
      { title: "Welcome Kit Reveal", meta: "30 min · ship-to-home · ★ 5.0", fill: "linear-gradient(150deg,#f2ecdf,#e8dcc4)" },
    ],
  },
  {
    name: "Diversity, Equity, & Inclusion",
    desc: "Celebrate your team in a way that actually means something.",
    exps: [
      { title: "Heritage Cook-Along", meta: "75 min · ship-to-home · ★ 4.9", fill: "linear-gradient(150deg,#f6e7dc,#efd6c4)" },
      { title: "Inclusive Trivia", meta: "45 min · virtual · ★ 4.8", fill: "linear-gradient(150deg,#efe4ee,#e2d2e3)" },
      { title: "Storyteller Series", meta: "60 min · virtual · ★ 5.0", fill: "linear-gradient(150deg,#e2ece7,#cfe2d6)" },
    ],
  },
];

/* lucide/plus exactly as exported from Figma (2504:9409 — 18.667 box,
   1.55556 stroke, #6F7690). */
function Plus() {
  return (
    <svg
      viewBox="0 0 18.6667 18.6667"
      fill="none"
      stroke="#6F7690"
      strokeWidth={1.55556}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[1.1667rem]"
      aria-hidden
    >
      <path d="M3.88889 9.33333H14.7778M9.33333 3.88889V14.7778" />
    </svg>
  );
}

/* Experience card — 8px sleeve, 250-tall media with Figma's stacked drop
   shadow, then title (Satoshi 25/1.04, −0.3) + meta (Overpass 15/1.5). */
function ExpCard({ exp, className = "" }: { exp: Exp; className?: string }) {
  return (
    <article
      className={`flex flex-col items-center overflow-hidden rounded-[1.5rem] bg-white p-2 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)] ${className}`}
    >
      <div className="w-full overflow-hidden rounded-[1.25rem] shadow-[0px_20px_10px_0px_rgba(0,0,0,0.15),0px_6.383px_3.191px_0px_rgba(0,0,0,0.12),0px_2.415px_1.207px_0px_rgba(0,0,0,0.11),0px_0.796px_0.398px_0px_rgba(0,0,0,0.1)]">
        {exp.img ? (
          <Image
            src={exp.img}
            alt={exp.alt ?? ""}
            quality={90}
            className="h-[15.625rem] w-full object-cover"
            sizes="(min-width:1024px) 20.625rem, 17.5rem"
          />
        ) : (
          <div
            aria-hidden
            className="h-[15.625rem] w-full"
            style={{ background: exp.fill }}
          />
        )}
      </div>
      <div className="flex w-full flex-col gap-4 px-8 pb-8 pt-10">
        <h3 className="font-[family-name:var(--font-satoshi)] text-[1.5625rem] font-bold leading-[1.04] tracking-[-0.01875rem] text-[#16171b]">
          {exp.title}
        </h3>
        <p className="font-sans text-[0.9375rem] leading-[1.5] text-[#6b6c71]">{exp.meta}</p>
      </div>
    </article>
  );
}

export default function ExpCategories() {
  const [cat, setCat] = useState(0);
  /* `slide` is the active pagination dot. Figma draws dot 0 active with
     Murder Mystery (index 1) centred, so the trio reads
     left = slide, centre = slide+1, right = slide+2. */
  const [slide, setSlide] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const active = CATEGORIES[cat];
  const exps = active.exps;
  const n = exps.length;
  const left = exps[slide % n];
  const centre = exps[(slide + 1) % n];
  const right = exps[(slide + 2) % n];

  const pick = (i: number) => {
    setCat(i);
    setSlide(0);
  };

  const selectTab = (i: number) => {
    pick(i);
    tabRefs.current[i]?.focus();
  };

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const total = CATEGORIES.length;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      selectTab((i + 1) % total);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      selectTab((i - 1 + total) % total);
    } else if (e.key === "Home") {
      e.preventDefault();
      selectTab(0);
    } else if (e.key === "End") {
      e.preventDefault();
      selectTab(total - 1);
    }
  };

  return (
    <section
      aria-labelledby="exp-categories-heading"
      className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-20"
    >
      <div className="mx-auto flex w-full max-w-content flex-col items-center">
        {/* intro — eyebrow 8 title 20 subhead */}
        <div className="flex w-full flex-col items-center gap-5 text-center">
          <div className="flex flex-col items-center gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-[0.75rem] font-semibold uppercase leading-[1.25] tracking-[0.045rem] text-[#ff5b77]"
            >
              Browse by category
            </p>
            <h2
              id="exp-categories-heading"
              data-animation="reveal"
              className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.06] tracking-[-0.03125rem] text-[#1f1a24] md:text-[2.25rem] lg:text-[2.75rem]"
            >
              Find your team’s kind of fun
            </h2>
          </div>
          <p
            data-animation="reveal"
            className="font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]"
          >
            Some teams want to compete. Others want to create, learn, or unwind.
          </p>
        </div>

        {/* tray — Figma sets it 45 below the intro block */}
        <div
          data-animation="reveal"
          className="mt-10 flex w-full flex-col gap-6 overflow-hidden rounded-[1.5rem] bg-[#f2f2f2] p-2.5 lg:mt-[2.8125rem] lg:flex-row lg:items-stretch lg:gap-[6.5574%]"
        >
          {/* left rail — vertical category tablist */}
          <div
            role="tablist"
            aria-label="Experience categories"
            aria-orientation="vertical"
            className="flex flex-col gap-2.5 overflow-hidden rounded-[0.5rem] lg:w-[30.9016%] lg:shrink-0"
          >
            {CATEGORIES.map((c, i) => {
              const isActive = i === cat;
              return (
                <button
                  key={c.name}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`exp-category-tab-${i}`}
                  aria-selected={isActive}
                  aria-controls="exp-category-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => pick(i)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className={`w-full rounded-[0.75rem] bg-white px-7 pb-[1.875rem] pt-7 text-left transition-all duration-200 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16171b] ${
                    isActive
                      ? "flex flex-col justify-center gap-7 shadow-[0px_3px_3px_0px_rgba(0,0,0,0.06)] lg:min-h-[12.5rem] lg:shrink-0"
                      : "flex min-h-[5.3125rem] items-center justify-between gap-4 border border-[#f2f2f2] hover:border-[#e8e9ed] hover:bg-[#fafafa] lg:min-h-0 lg:flex-1 lg:pb-0 lg:pt-0"
                  }`}
                >
                  <span
                    className={`font-[family-name:var(--font-satoshi-medium)] text-[1.25rem] leading-[1.04] ${
                      isActive ? "text-[#16171b]" : "text-[#a9adbc]"
                    }`}
                  >
                    {c.name}
                  </span>

                  {isActive ? (
                    <span className="flex flex-col justify-center gap-6">
                      <span className="font-sans text-[0.875rem] leading-[1.25rem] tracking-[0.01rem] text-[#828282]">
                        {c.desc}
                      </span>
                      {/* 2px rule — Figma draws it at 181/321 of the width */}
                      <span
                        aria-hidden
                        className="block h-[2px] w-full rounded-[0.625rem] bg-[#f2f2f2]"
                      >
                        <span className="block h-[2px] w-[56.386%] rounded-[0.625rem] bg-[#16171b]" />
                      </span>
                    </span>
                  ) : (
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e8e9ed]">
                      <Plus />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* right — peek carousel */}
          <div
            id="exp-category-panel"
            role="tabpanel"
            aria-labelledby={`exp-category-tab-${cat}`}
            tabIndex={-1}
            className="flex min-w-0 flex-1 flex-col items-center gap-2.5 lg:py-6"
          >
            {/* below lg: a plain scroll-snap row (no absolute peek) */}
            <div className="-mx-2.5 flex w-[calc(100%+1.25rem)] snap-x snap-mandatory gap-4 overflow-x-auto px-2.5 pb-2 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
              {exps.map((exp) => (
                <ExpCard
                  key={exp.title}
                  exp={exp}
                  className="w-[17.5rem] shrink-0 snap-center"
                />
              ))}
            </div>

            {/* lg: Figma's 609-tall stage — centre card 330×473, neighbours
                290 wide pushed 100 off each edge, washed by edge gradients */}
            <div className="relative hidden h-[38.0625rem] w-full overflow-hidden lg:block">
              <ExpCard
                key={`l-${left.title}`}
                exp={left}
                className="snack-step-in absolute left-[-6.25rem] top-1/2 w-[18.125rem] -translate-y-1/2"
              />
              <ExpCard
                key={`r-${right.title}`}
                exp={right}
                className="snack-step-in absolute right-[-6.25rem] top-1/2 w-[18.125rem] -translate-y-1/2"
              />
              <ExpCard
                key={`c-${centre.title}`}
                exp={centre}
                className="snack-step-in absolute left-1/2 top-1/2 h-[29.5625rem] w-[20.625rem] -translate-x-1/2 -translate-y-1/2"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 h-[36.625rem] w-[14.375rem] bg-gradient-to-r from-[#f2f2f2] to-[rgba(242,242,242,0)]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute right-0 top-0 h-[36.625rem] w-[13.1875rem] bg-gradient-to-l from-[#f2f2f2] to-[rgba(242,242,242,0)]"
              />
            </div>

            {/* pagination — 3 × 8px dots, 10px apart (Figma 2504:9457) */}
            <div className="hidden items-center gap-2.5 lg:flex">
              {exps.map((exp, i) => (
                <button
                  key={exp.title}
                  type="button"
                  onClick={() => setSlide(i)}
                  aria-label={`Show ${exps[(i + 1) % n].title}`}
                  aria-current={i === slide ? "true" : undefined}
                  className={`relative size-2 rounded-full transition-colors duration-200 before:absolute before:-inset-2 before:content-[''] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#16171b] ${
                    i === slide ? "bg-[#1b1b1b]" : "bg-[#d9d9d9] hover:bg-[#bdbdbd]"
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
