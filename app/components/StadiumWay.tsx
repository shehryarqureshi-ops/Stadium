"use client";

import { useState } from "react";
import Image from "next/image";
import designerImg from "@/public/way-designer.png";
import { useAutoAdvance } from "./useAutoAdvance";

/* "The Stadium Way" — Figma 803:48620 ("Opt 4 · dark, feature accordion").
   Dark section: heading + 3 phase tabs (+ a "90 Day World" summary card), then
   the active phase as a split — the swag-designer mockup in a white card (left)
   and the phase content (right): eyebrow + title + body + a feature accordion
   (active feature expanded with its caption, others collapsed/grey). Phase 02
   copy is from Figma; 01/03 + the collapsed captions are written to match. */

type Feature = { title: string; desc: string };
type Phase = {
  num: string;
  name: string;
  tabDesc: string;
  eyebrow: string;
  title: string;
  body: string;
  features: Feature[];
};

const phases: Phase[] = [
  {
    num: "01",
    name: "Foundation",
    tabDesc: "Admins, permissions, wallet, and integrations live.",
    eyebrow: "Phase 01 · Foundation",
    title: "Your base, set up right.",
    body: "Admins, permissions, wallet, and integrations — configured once so everything downstream just works.",
    features: [
      { title: "Admin roles", desc: "The right people, day one." },
      { title: "Permissions", desc: "Granular access, scoped right." },
      { title: "Company wallet", desc: "One balance, every team." },
      { title: "Integrations", desc: "Plugged into your stack." },
    ],
  },
  {
    num: "02",
    name: "Build",
    tabDesc: "Swag, kits, store, and automation built once.",
    eyebrow: "Phase 02 · Build",
    title: "Your brand, built once.",
    body: "Swag, kits, store, and automation, all assembled in your brand and ready to ship.",
    features: [
      { title: "Custom storefront", desc: "Branded store, live in days." },
      { title: "Automated kitting", desc: "Bundles assembled for you." },
      { title: "Global warehousing", desc: "Stock held close to every team." },
      { title: "One-click reorder", desc: "Restock in a single tap." },
    ],
  },
  {
    num: "03",
    name: "Launch",
    tabDesc: "Programs live, first wave sent, comms rolled out.",
    eyebrow: "Phase 03 · Launch",
    title: "Your programs, live everywhere.",
    body: "Programs switch on, the first wave ships, and comms roll out — tracked from the very first send.",
    features: [
      { title: "Programs live", desc: "Recognition and rewards, switched on." },
      { title: "First wave", desc: "The first sends, out the door." },
      { title: "Comms rollout", desc: "Announced in every channel." },
      { title: "Live tracking", desc: "Delivery and budget, visible." },
    ],
  },
];

export default function StadiumWay() {
  const [active, setActive] = useState(1); // Phase 02 — matches the Figma reference state
  const [feature, setFeature] = useState(0);
  const phase = phases[active];

  const { sectionRef, takeOver } = useAutoAdvance(() => {
    setActive((i) => (i + 1) % phases.length);
    setFeature(0);
  });

  const selectPhase = (i: number) => {
    takeOver();
    setFeature(0);
    setActive(i);
  };
  const selectFeature = (i: number) => {
    takeOver();
    setFeature(i);
  };

  return (
    <section
      ref={sectionRef}
      className="bg-[#181818] px-section-x-sm py-section-y-sm md:px-section-x-md md:py-section-y-md lg:px-section-x-lg lg:py-section-y-lg"
    >
      <style>{`
        .way-in { animation: way-in 0.4s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes way-in { from { opacity:0; transform: translateY(0.5rem); } to { opacity:1; transform:none; } }
        @media (prefers-reduced-motion: reduce) { .way-in { animation:none; } }
      `}</style>

      <div className="mx-auto flex w-full max-w-content flex-col gap-8 lg:gap-12">
        {/* Heading */}
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-heading-sm text-white md:text-heading-md lg:text-heading-lg">
            The Stadium Way
          </h2>
          <p className="max-w-[42.5rem] font-sans text-body-md text-white/70 lg:text-body-lg">
            Three phases of setup. Each phase has a clear job. Stadium handles
            the orchestration so your team can focus on the moments that matter.
          </p>
        </div>

        {/* Phase tabs + summary card */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:gap-6">
          {phases.map((p, i) => {
            const on = i === active;
            return (
              <button
                key={p.num}
                type="button"
                onClick={() => selectPhase(i)}
                aria-pressed={on}
                className={`relative flex cursor-pointer flex-col items-start gap-2 overflow-hidden rounded-card border p-4 text-left transition-colors duration-200 lg:p-6 ${
                  on ? "border-white/25 bg-white/5" : "border-white/10 hover:border-white/20"
                }`}
              >
                <span className={`flex gap-3 font-display text-[1rem] font-bold lg:text-callout-md ${on ? "text-white" : "text-grey-500"}`}>
                  <span>{p.num}</span>
                  <span>{p.name}</span>
                </span>
                <span className={`hidden font-sans text-small lg:block ${on ? "text-white/65" : "text-grey-600"}`}>
                  {p.tabDesc}
                </span>
                {on && <span aria-hidden className="absolute inset-x-0 top-0 h-[0.1875rem] bg-accent-water" />}
              </button>
            );
          })}
          <div className="col-span-2 flex items-center justify-center gap-3 rounded-card border border-white/10 p-4 md:col-span-1 lg:p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/way-icon-world.svg" alt="" width={40} height={40} className="size-10 shrink-0 opacity-50" />
            <span className="font-display text-[1rem] font-bold text-grey-500 lg:text-callout-md">
              The 90 Day World
            </span>
          </div>
        </div>

        {/* Active phase — split */}
        <div key={phase.num} className="way-in flex flex-col gap-6 lg:flex-row lg:items-stretch">
          {/* Mockup (left, white stage) */}
          <div className="flex items-center justify-center overflow-hidden rounded-3xl bg-white p-6 lg:min-w-0 lg:flex-1 lg:p-10">
            <Image
              src={designerImg}
              alt="Stadium swag designer — a t-shirt mockup with logo upload, color swatches, and placement controls"
              width={416}
              height={395}
              className="h-auto w-full max-w-[26rem] object-contain"
            />
          </div>

          {/* Content (right) */}
          <div className="flex flex-col gap-6 lg:min-w-0 lg:flex-1 lg:justify-center">
            <div className="flex flex-col gap-4">
              <p className="font-sans text-eyebrow-sm uppercase text-accent-water">
                {phase.eyebrow}
              </p>
              <h3 className="font-display text-heading-md text-white lg:text-heading-lg">
                {phase.title}
              </h3>
              <p className="max-w-[34rem] font-sans text-body-md text-white/70 lg:text-body-lg">
                {phase.body}
              </p>
            </div>

            {/* Feature accordion */}
            <ul className="flex flex-col">
              {phase.features.map((f, i) => {
                const on = i === feature;
                return (
                  <li key={f.title} className={`border-b transition-colors duration-200 ${on ? "border-accent-water" : "border-white/10"}`}>
                    <button
                      type="button"
                      onClick={() => selectFeature(i)}
                      aria-expanded={on}
                      className="flex w-full cursor-pointer flex-col gap-1 py-4 text-left"
                    >
                      <span className={`font-sans text-[1.125rem] font-semibold leading-6 transition-colors duration-200 ${on ? "text-white" : "text-grey-600"}`}>
                        {f.title}
                      </span>
                      {on && <span className="font-sans text-body-sm text-white/60">{f.desc}</span>}
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
