"use client";

import Image from "next/image";
import { useState } from "react";
import doorstepImg from "@/public/infra-doorstep.png";

/* "From the platform to the doorstep" — doorstep beat of the dark block, synced
   to Figma 2:33443. Centered blue eyebrow + 55px heading, then a frosted
   near-black r24 card (black/90 + #4d4d4d hairline + backdrop-blur) floating over
   a bright #0b7afc bloom: an 8-step pill list (03 active = frosted glass) beside
   a video with a bottom scrim + scrub timeline. */

type Step = { num: string; label: string };

const steps: Step[] = [
  { num: "01", label: "Printing & Production" },
  { num: "02", label: "Warehousing & Storage" },
  { num: "03", label: "Shipping & Delivery" },
  { num: "04", label: "Customs, Tax, & Compliance" },
  { num: "05", label: "Integrations & Automated Gifting" },
  { num: "06", label: "Platform Controls" },
  { num: "07", label: "Brand Controls" },
  { num: "08", label: "Security & Reliability" },
];

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[1.625rem] translate-x-px text-white" fill="currentColor" aria-hidden>
      <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.4-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}

function FullscreenIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5 shrink-0 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 6V2.5A.5.5 0 0 1 2.5 2H6M14 6V2.5a.5.5 0 0 0-.5-.5H10M2 10v3.5a.5.5 0 0 0 .5.5H6M14 10v3.5a.5.5 0 0 1-.5.5H10" />
    </svg>
  );
}

export default function Infrastructure() {
  const [active, setActive] = useState(2); // 03 — Shipping & Delivery

  return (
    <section className="relative overflow-hidden bg-[#040405] px-section-x-sm py-section-y-sm md:px-section-x-md md:py-section-y-md lg:px-section-x-lg lg:py-section-y-lg">
      <div className="relative mx-auto flex w-full max-w-content flex-col gap-10 lg:gap-20">
        {/* centered header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem] text-[#a4cefe]">
            The Stadium Infrastructure
          </p>
          <h2 className="font-display text-heading-sm text-white md:text-heading-md lg:text-[3.4375rem] lg:leading-[3.75rem] lg:tracking-[-0.075rem]">
            From the platform to the doorstep
          </h2>
        </div>

        {/* card zone — bright blue bloom behind a frosted dark card (Figma) */}
        <div className="relative">
          {/* #0b7afc glow, bottom-weighted behind the card (Ellipse 22) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[68%] z-0 h-[24rem] w-[68.5rem] max-w-[105%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#0b7afc] opacity-70 blur-[170px]"
          />
          {/* card — step pills + video */}
          <div className="relative z-10 grid grid-cols-1 gap-2.5 rounded-[1.5rem] border-t border-[#4d4d4d] bg-black/90 p-2.5 backdrop-blur-[30px] lg:grid-cols-[26.25rem_minmax(0,1fr)]">
            {/* step pills */}
            <div className="flex flex-col gap-2.5">
              {steps.map((s, i) => {
                const on = i === active;
                return (
                  <button
                    key={s.num}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={on}
                    className={`flex h-[3.75rem] w-full items-center gap-3.5 rounded-lg px-3.5 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                      on ? "bg-white/20 backdrop-blur-[18px]" : "bg-[#1a1a1a] hover:bg-white/[0.08]"
                    }`}
                  >
                    <span
                      className={`font-sans text-[0.75rem] font-semibold tabular-nums tracking-[0.0725rem] ${
                        on ? "text-[#a4cefe]" : "text-white/40"
                      }`}
                    >
                      {s.num}
                    </span>
                    <span
                      className={`font-sans text-[1.125rem] font-normal leading-7 tracking-[0.0156rem] ${
                        on ? "text-white" : "text-white/55"
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* video + scrub timeline */}
            <div className="group relative min-h-[20rem] overflow-hidden rounded-lg lg:min-h-0">
              <Image
                src={doorstepImg}
                alt="Stadium fulfillment"
                fill
                sizes="(min-width: 64rem) 47rem, 100vw"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0 flex items-center justify-center">
                <span className="flex size-14 items-center justify-center rounded-full border-[1.5px] border-white/55 bg-white/[0.18] backdrop-blur-[10px] transition duration-200 group-hover:scale-110 group-hover:bg-white/25">
                  <PlayIcon />
                </span>
              </div>
              {/* bottom scrim — transparent → black (Figma 2:33477) */}
              <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[6.125rem] bg-gradient-to-b from-transparent to-black" />
              {/* timeline: 1:24 · segmented scrubber · 3:30 · fullscreen */}
              <div className="absolute inset-x-4 bottom-3.5 flex items-center gap-3 font-sans text-[0.75rem] font-semibold">
                <span className="shrink-0 text-white">1:24</span>
                <div className="flex flex-1 items-center gap-1.5">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <span key={`p${i}`} className="h-1 flex-1 rounded-full bg-white" />
                  ))}
                  <span className="size-3 shrink-0 rounded-full bg-white shadow-[0_0_0_3px_rgba(0,0,0,0.25)]" />
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span key={`u${i}`} className="h-1 flex-1 rounded-full bg-white/25" />
                  ))}
                </div>
                <span className="shrink-0 text-white/70">3:30</span>
                <FullscreenIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
