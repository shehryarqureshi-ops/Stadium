"use client";

/* /events (Experiences · Confetti) · HOW IT WORKS — Figma
   n9SjmDjzB1PeZAYJ5w43fr → 2504:9358, inside page frame 2504:9060.
   "From planning to done" — the same INTERACTIVE 3-step stepper as
   SwagmagicHowItWorks: a #f2f2f2 tray where the active step is twice as wide
   (Figma 588 : 294 : 294) and reveals its visual, while the other two collapse
   to a number + a #f7f7f7 title panel. Click (or focus + Enter/Space) any step
   to expand it.

   Figma draws step 01 expanded. Its visual (2504:9372) is a BLANK #e0e0e0
   placeholder — there is no artwork in this file — so it ships as the same flat
   #e0e0e0 panel rather than an invented image, and steps 02/03 reuse it. Only
   step 01 has a description; the description layers under 02/03 are Figma
   HIDDEN layers carrying leftover /swag copy ("Your inventory lives in our
   warehouse…", "Open a store, send a kit…"), so per the copy rule they are
   ignored and 02/03 expand to title + visual only.

   Figma stack (y relative to the section frame, which is content-tight — no
   internal top/bottom space — so with the neighbours' 80 this section is py-20):
     header 2504:9359  y=0    h120  (eyebrow 17 → 8 → title 48 → 20 → sub 27)
     gap                        40
     tray   2504:9364  y=160  h380  (p-16, gap-16; cards 348 = 10 + 328 + 10)
     content end 540 (abs 3766) · previous section ends abs 3066 → 160 gap.
   Tray inner at Figma 1240: 588 | 16 | 294 | 16 | 294 (= 2 : 1 : 1 grow).
   Step-01 card: p-10, row gap-10 items-end → left col 279 (number block 49×52
   top, #f7f7f7 panel 159 bottom-anchored, p-24 gap-16) + visual 279×328 r20. */

import { useState } from "react";

type Step = { n: string; title: string; desc?: string };

const STEPS: Step[] = [
  {
    n: "01",
    title: "Pick Your Event",
    desc: "Browse hundreds of events, narrowed to your team's preferences.",
  },
  { n: "02", title: "Book in Minutes" },
  { n: "03", title: "Show Up " },
];

/* Active card = Figma grid-card-active-shadow (4 stacked drop shadows);
   collapsed cards = the resting 0 3 6 / 6% shadow. */
const SHADOW_ACTIVE =
  "shadow-[0px_20px_20px_-2px_rgba(0,0,0,0.15),0px_6.383px_6.383px_-1.5px_rgba(0,0,0,0.12),0px_2.415px_2.415px_-1px_rgba(0,0,0,0.11),0px_0.796px_0.796px_-0.5px_rgba(0,0,0,0.1)]";
const SHADOW_REST = "shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]";

export default function ExpHowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-20">
      <div className="mx-auto flex w-full max-w-content flex-col gap-10">
        {/* header: eyebrow → 8 → title → 20 → subhead */}
        <div className="flex flex-col gap-2">
          <p
            data-animation="reveal"
            className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#ff5b77]"
          >
            How it works
          </p>
          <h2
            data-animation="reveal"
            className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
          >
            From planning to done
          </h2>
          <p
            data-animation="reveal"
            className="mt-3 font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]"
          >
            Faster than the back-and-forth of planning one yourself.
          </p>
        </div>

        {/* stepper tray */}
        <div
          data-animation="reveal"
          data-reveal-stagger="90"
          role="tablist"
          aria-label="How it works steps"
          className="flex flex-col gap-4 rounded-[2rem] bg-[#f2f2f2] p-4 lg:flex-row lg:items-stretch"
        >
          {STEPS.map((s, i) => {
            const isActive = i === active;
            return (
              <div
                key={s.n}
                data-animation="reveal"
                role="tab"
                tabIndex={0}
                aria-selected={isActive}
                aria-controls={`exp-step-panel-${s.n}`}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(i);
                  }
                }}
                className={`group flex min-h-[9rem] cursor-pointer flex-col overflow-hidden rounded-[1.5rem] bg-white p-2.5 transition-[flex-grow,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:min-h-[21.75rem] lg:basis-0 ${
                  isActive ? `lg:grow-[2] ${SHADOW_ACTIVE}` : `lg:grow hover:bg-[#fafafa] ${SHADOW_REST}`
                }`}
              >
                <div className="flex h-full flex-col gap-2.5 md:flex-row md:items-end">
                  {/* left column: number (top) + bottom-anchored grey title panel */}
                  <div className="flex h-full min-w-0 flex-1 flex-col justify-between gap-6 self-stretch">
                    <span className="p-4 font-sans text-[1rem] leading-normal tracking-[0.025rem] text-[#828282]">
                      {s.n}
                    </span>
                    <div className="flex w-full flex-col gap-4 rounded-[1.5rem] bg-[#f7f7f7] p-6">
                      <h3 className="font-[family-name:var(--font-satoshi)] text-[1.5625rem] font-bold leading-[1.04] tracking-[-0.01875rem] text-[#16171b]">
                        {s.title}
                      </h3>
                      {isActive && s.desc && (
                        <p className="font-sans text-[0.9375rem] leading-[1.5] text-[#6b6c71]">{s.desc}</p>
                      )}
                    </div>
                  </div>

                  {/* visual — only on the active step. Figma's slot (2504:9372)
                      is a blank #e0e0e0 panel, 279×328 r20, growing 1:1 with the
                      copy column inside the 588-wide card. */}
                  {isActive && (
                    <div
                      id={`exp-step-panel-${s.n}`}
                      role="tabpanel"
                      aria-label={`${s.title.trim()} illustration`}
                      className="snack-step-in h-[20.5rem] w-full shrink-0 rounded-[1.25rem] bg-[#e0e0e0] md:min-w-0 md:flex-1 md:basis-0"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
