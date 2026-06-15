"use client";

import Image from "next/image";
import { useState } from "react";
import demoImg from "@/public/stadiumway-build-demo.jpg";

/* The Stadium Way — Opt 4 (Figma 1236:22560). Dark section that flows seamlessly
   out of Infrastructure (same #181818 bg, wrapped in one Reveal in page.tsx so it
   doesn't re-reveal between the two). Heading + intro, a 4-card phase overview
   (01 Foundation emphasized, 02 Build, 03 Launch, "The 90 Day World"), then the
   Build showcase: the customizer demo + a clickable feature accordion.
   NOTE: feature sub-lines beyond "Custom storefront" are placeholder copy. */

type Phase = { num: string; title: string; desc: string };
const phases: Phase[] = [
  { num: "01", title: "Foundation", desc: "Admins, permissions, wallet, and integrations live." },
  { num: "02", title: "Build", desc: "Swag, kits, store, and automation built once." },
  { num: "03", title: "Launch", desc: "Programs live, first wave sent, comms rolled out." },
];

type Feature = { title: string; sub: string };
const features: Feature[] = [
  { title: "Custom storefront", sub: "Branded store, live in days." },
  { title: "Automated kitting", sub: "Kits assembled and packed for you." },
  { title: "Global warehousing", sub: "Stock held close to every recipient." },
  { title: "One-click reorder", sub: "Restock and rerun in a single click." },
];

function GlobeIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className="size-12 shrink-0 text-grey-400">
      <circle cx="24" cy="24" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="24" cy="24" rx="8" ry="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 24h36M9 14h30M9 34h30" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function StadiumWay() {
  const [active, setActive] = useState(0); // Custom storefront

  return (
    <section className="bg-[#181818] px-section-x-sm py-section-y-sm md:px-section-x-md md:py-section-y-md lg:px-section-x-lg lg:py-section-y-lg">
      <div className="mx-auto flex w-full max-w-content flex-col gap-10 lg:gap-14">
        {/* heading */}
        <div className="flex flex-col gap-3.5">
          <h2 className="font-display text-heading-sm text-white md:text-heading-md lg:text-heading-lg">
            The Stadium Way
          </h2>
          <p className="max-w-[42rem] font-sans text-body-md text-white/80 md:text-body-lg">
            Three phases of setup. Each phase has a clear job. Stadium handles the
            orchestration so your team can focus on the moments that matter.
          </p>
        </div>

        {/* phase cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {phases.map((p, i) => (
            <div
              key={p.num}
              className={`flex flex-col justify-between gap-5 rounded-xl p-6 ${
                i === 0 ? "border-2 border-[#0b7afc] bg-white/[0.06]" : "border border-white/15"
              }`}
            >
              <div className="flex items-baseline gap-3.5">
                <span className="font-display text-[1.25rem] leading-7 text-grey-100">{p.num}</span>
                <span className="font-display text-[1.25rem] leading-7 text-grey-100">{p.title}</span>
              </div>
              <p className="font-sans text-[0.875rem] leading-5 text-white/65">{p.desc}</p>
            </div>
          ))}
          <div className="flex items-center gap-3.5 rounded-xl border border-white/15 p-6">
            <GlobeIcon />
            <span className="font-display text-[1.25rem] leading-7 text-grey-400">The 90 Day World</span>
          </div>
        </div>

        {/* Build showcase */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-10">
          {/* demo */}
          <div className="overflow-hidden rounded-3xl border border-[#66f2b2]/15">
            <Image
              src={demoImg}
              alt="Stadium product customizer — design and preview a branded item"
              sizes="(min-width: 64rem) 40rem, 100vw"
              className="h-auto w-full"
              placeholder="blur"
            />
          </div>

          {/* phase detail + feature accordion */}
          <div className="flex flex-col">
            <p className="font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.125rem] text-accent-water">
              Phase 02 &middot; Build
            </p>
            <h3 className="mt-3 font-display text-heading-md text-white lg:text-heading-lg">
              Your brand, built once.
            </h3>
            <p className="mt-4 max-w-[34rem] font-sans text-body-md text-white/80 md:text-body-lg">
              Swag, kits, store, and automation, all assembled in your brand and ready to ship.
            </p>

            <ul className="mt-8 flex flex-col">
              {features.map((f, i) => {
                const on = i === active;
                return (
                  <li key={f.title} className="border-t border-white/[0.08] first:border-t-0">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-expanded={on}
                      className="w-full py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    >
                      <span
                        className={`font-sans text-[1.125rem] font-semibold transition-colors duration-200 ${
                          on ? "text-white" : "text-grey-600"
                        }`}
                      >
                        {f.title}
                      </span>
                      {on && (
                        <>
                          <p className="mt-1.5 font-sans text-[1rem] text-white/80">{f.sub}</p>
                          <div className="mt-4 h-0.5 w-1/2 rounded-full bg-accent-water" />
                        </>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
