"use client";

/* /snacks · THE SOLUTION (Figma 2208:2903). "Your choice, or theirs" — a 2-tab
   switcher (Build-Your-Own Boxes / Curated Boxes); each tab reveals a mockup +
   copy + checklist + CTA. */

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import byo from "@/public/snacks/sn2-byo.png";
import curated from "@/public/snacks/sn2-occ-2.jpg";

type Tab = {
  label: string;
  title: string;
  desc: string;
  points: string[];
  cta: string;
  img: StaticImageData;
};

const TABS: Tab[] = [
  {
    label: "Build-Your-Own Boxes",
    title: "Build-Your-Own Boxes",
    desc: "Set a budget, and let everyone build their own box from 2,000+ snacks — chips, candy, coffee, and healthy picks included.",
    points: ["Zero guesswork", "Dietary filters built in", "Ships worldwide"],
    cta: "Start a box",
    img: byo,
  },
  {
    label: "Curated Boxes",
    title: "Curated Boxes",
    desc: "Hand-picked snack boxes, ready to send in minutes. Pick a theme and we handle the rest.",
    points: ["Curated by our snack experts", "Themed boxes for every occasion", "Add your branding to the box"],
    cta: "Browse boxes",
    img: curated,
  },
];

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#16171b" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 size-[0.9rem] shrink-0" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function SnackSolution() {
  const [active, setActive] = useState(0);
  const t = TABS[active];
  return (
    <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-24">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10 lg:gap-12">
        <div className="flex max-w-[42rem] flex-col items-center gap-2 text-center">
          <p
            data-animation="reveal"
            className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-[#2178f5] md:text-eyebrow-md"
          >
            The solution
          </p>
          <h2
            data-animation="reveal"
            className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
          >
            Your choice, or theirs
          </h2>
          <p data-animation="reveal" className="mt-2 font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]">
            Send a snack box you choose, or let recipients build their own from the catalog.
          </p>
        </div>

        {/* tab bar */}
        <div data-animation="reveal" className="flex items-center gap-1 rounded-full bg-[#f2f2f2] p-1.5">
          {TABS.map((tab, i) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 font-sans text-[0.75rem] font-bold uppercase tracking-[0.0625rem] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                i === active ? "bg-[#16171b] text-white" : "text-[#6b6c71] hover:text-[#16171b]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* active panel */}
        <div
          data-animation="reveal"
          className="flex w-full flex-col gap-8 rounded-[1.5rem] bg-[#fafbfd] p-4 lg:flex-row lg:items-center lg:gap-12"
        >
          <div className="relative aspect-[580/421] w-full shrink-0 overflow-hidden rounded-[1rem] lg:w-[48%]">
            <Image key={t.img.src} src={t.img} alt={t.title} fill className="object-cover" sizes="(min-width:1024px) 32rem, 92vw" />
          </div>
          <div className="flex flex-1 flex-col justify-center gap-5 px-2 pb-6 lg:px-6">
            <div className="flex flex-col gap-3">
              <h3 className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.1] tracking-[-0.03125rem] text-[#16171b] lg:text-[2.25rem]">
                {t.title}
              </h3>
              <p className="font-sans text-[1rem] leading-[1.5] text-[#6b6c71] lg:text-[1.0625rem]">{t.desc}</p>
            </div>
            <ul className="flex flex-col gap-3">
              {t.points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <Check />
                  <span className="font-sans text-[0.9375rem] leading-[1.4] text-[#16171b]">{p}</span>
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="mt-1 w-fit font-sans text-[0.75rem] font-bold uppercase tracking-[0.0625rem] text-[#16171b]"
            >
              <span className="border-b border-black pb-[2px]">{t.cta}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
