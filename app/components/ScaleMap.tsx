"use client";

import { useState } from "react";
import ScaleMapParticles from "./ScaleMapParticles";

/* "Scale to wherever your people are" — synced to Figma 2:33685. Interactive:
   a centered 55px header, a 4-stat row where hovering/selecting a stat makes it
   the active one (dark, the rest grey) with a blue gradient line above AND below
   it (Figma). The visualization below is a decorative particle system (NOT
   Figma-sourced — see design.md) with 4 arrangements, one per stat: Countries →
   globe, Items → grid, Integrations → wave, Recipients → galaxy. */

const STATS = [
  { value: "170+", label: "Countries", sub: "with local fulfillment" },
  { value: "100K+", label: "Items", sub: "in the global catalog" },
  {
    value: "100+",
    label: "Integrations",
    sub: "with the tools you already use",
  },
  { value: "1M+", label: "Recipients", sub: "across the globe" },
];

/* one full-width grey rail with a blue gradient highlight that slides under the
   active stat (top and bottom lines of the stats row) */
function StatRule({ active }: { active: number }) {
  return (
    <div className="relative h-px w-full bg-[#e5e6eb]">
      <div
        className="absolute inset-y-0 hidden w-1/4 -translate-x-1/2 bg-[linear-gradient(90deg,transparent_0%,#0b7afc_50%,transparent_100%)] transition-[left] duration-300 ease-out md:block"
        style={{ left: `${(active + 0.5) * 25}%` }}
      />
    </div>
  );
}

export default function ScaleMap() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-[#fafafb] px-section-x-sm pt-16 md:px-section-x-md md:pt-24 lg:px-section-x-lg lg:pt-[7.5rem] rounded-tr-4xl rounded-tl-4xl">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-16 lg:gap-20">
        {/* header */}
        <div className="flex flex-col items-center gap-6 text-center">
          <h2
            data-animation="reveal"
            className="font-display text-heading-sm text-[#181818] md:text-heading-md lg:text-[3.4375rem] lg:leading-[3.75rem] lg:tracking-[-0.075rem]"
          >
            Scale to wherever
            <br className="hidden md:block" /> your people are
          </h2>
          <p
            data-animation="reveal"
            className="font-sans text-body-md text-[#4f5052] lg:text-[1.125rem] lg:leading-7"
          >
            Recognition, swag, and gifting.
            <br className="hidden md:block" /> Delivered to teams around the
            world.
          </p>
        </div>

        {/* stats row — selectable; active stat is dark with a blue line above + below */}
        <div className="w-full">
          <StatRule active={active} />
          <div
            data-animation="reveal"
            className="grid grid-cols-2 md:grid-cols-4"
          >
            {STATS.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className="flex cursor-pointer flex-col items-center gap-4 px-5 pb-8 pt-8 text-center outline-none"
              >
                <div className="flex flex-col items-center gap-1">
                  <p
                    className={`font-display text-[2.75rem] font-bold leading-none tracking-[-0.03em] transition-colors duration-200 lg:text-[3.4375rem] ${
                      i === active ? "text-[#181818]" : "text-[#9499ad]"
                    }`}
                  >
                    {s.value}
                  </p>
                  <p
                    className={`font-sans text-[0.75rem] font-bold uppercase tracking-[0.0625rem] transition-colors duration-200 ${
                      i === active ? "text-[#181818]" : "text-[#9499ad]"
                    }`}
                  >
                    {s.label}
                  </p>
                </div>
                <p
                  className={`font-sans text-[1rem] leading-5 transition-colors duration-200 ${
                    i === active ? "text-[#4f5052]" : "text-[#9da2b4]"
                  }`}
                >
                  {s.sub}
                </p>
              </button>
            ))}
          </div>
          <StatRule active={active} />
        </div>
      </div>

      {/* particle visualization — one arrangement per active stat */}
      <div className="mx-auto w-full max-w-content">
        <div data-animation="reveal" className="w-full max-w-content relative">
          <svg
            className="absolute inset-0"
            width="1200"
            height="512"
            viewBox="0 0 1200 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_199_5250)">
              <rect width="1200" height="512" fill="#FAFAFB" />
              <g filter="url(#filter0_f_199_5250)">
                <ellipse cx="600" cy="476" rx="436" ry="223" fill="#B3C2FF" />
                <circle cx="600" cy="416" r="107" fill="#8099FF" />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_f_199_5250"
                x="-287"
                y="-200"
                width="1774"
                height="1099"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="100"
                  result="effect1_foregroundBlur_199_5250"
                />
              </filter>
              <clipPath id="clip0_199_5250">
                <rect width="1200" height="512" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <ScaleMapParticles activeTab={active} />
        </div>
      </div>
    </section>
  );
}
