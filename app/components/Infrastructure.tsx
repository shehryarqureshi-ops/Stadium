"use client";

import Image from "next/image";
import { useState } from "react";
import facilityImg from "@/public/infra-facility-exterior.jpg";

/* Infrastructure — "Stadium handles everything between decision and delivery."
   Static (Figma 1236:22527): a dark full-bleed section with the facility exterior
   photo, the heading top-left, the 8-step "what we handle" list (frosted panel)
   lower-left, and the active-step caption bottom-right. No scroll effects. The
   list is clickable; the caption tracks the active step. Photo is clean; all text
   is live. */

type Step = { num: string; label: string; short: string; caption: string };

const steps: Step[] = [
  { num: "01", label: "Printing & Production", short: "Production", caption: "Every piece produced, exactly to spec." },
  { num: "02", label: "Warehousing & Storage", short: "Storage", caption: "Your inventory, racked and ready to go." },
  { num: "03", label: "Shipping & Delivery", short: "Shipping", caption: "From dock to doorstep, in every market." },
  { num: "04", label: "Automations & Integrations", short: "Automation", caption: "Triggers and tools that do the work for you." },
  { num: "05", label: "Budget Controls", short: "Budget", caption: "Spend limits that keep every team on track." },
  { num: "06", label: "Brand Control", short: "Brand", caption: "One brand standard, everywhere you ship." },
  { num: "07", label: "Global Fulfillment", short: "Fulfillment", caption: "Local delivery, on a global scale." },
  { num: "08", label: "Customs, Tax & Compliance", short: "Compliance", caption: "Borders cleared, paperwork handled." },
];

export default function Infrastructure() {
  const [active, setActive] = useState(2); // 03 — Shipping (matches the design)
  const step = steps[active];

  return (
    <section className="bg-[#181818] pt-12 md:pt-14 lg:pt-16">
      <div className="relative mx-auto aspect-[1440/831] min-h-[40rem] w-full max-w-section overflow-hidden rounded-2xl sm:min-h-0">
        <Image
          src={facilityImg}
          alt="Stadium fulfillment facility exterior"
          fill
          sizes="(min-width: 100rem) 1600px, 100vw"
          className="object-cover"
          placeholder="blur"
        />
        {/* scrims for text legibility over the photo */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.62),transparent)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgba(0,0,0,0.72),transparent)]" />

        {/* content */}
        <div className="absolute inset-0 flex flex-col justify-between gap-8 px-section-x-sm py-8 md:px-section-x-md lg:px-section-x-lg lg:py-14">
          <h2 className="max-w-[38rem] text-balance font-display text-[2rem] leading-[2.375rem] tracking-[-0.0625rem] text-white md:text-[2.5rem] md:leading-[3rem] lg:text-[2.75rem] lg:leading-[3.125rem]">
            Stadium handles everything between decision and delivery.
          </h2>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            {/* what-we-handle list */}
            <ul className="flex w-full max-w-[23.75rem] flex-col rounded-2xl border border-white/10 bg-[rgba(13,13,15,0.55)] p-5 backdrop-blur-xl">
              {steps.map((s, i) => {
                const on = i === active;
                return (
                  <li key={s.num}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-current={on}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                        on ? "bg-white/[0.08]" : "hover:bg-white/5"
                      }`}
                    >
                      <span
                        className={`font-sans text-[0.75rem] font-semibold tabular-nums tracking-[0.0625rem] ${
                          on ? "text-white" : "text-white/45"
                        }`}
                      >
                        {s.num}
                      </span>
                      <span
                        className={`font-sans text-[0.875rem] leading-[1.25rem] ${
                          on ? "font-semibold text-white" : "font-medium text-white/70"
                        }`}
                      >
                        {s.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* active-step caption */}
            <div aria-live="polite" className="flex max-w-[24rem] flex-col gap-2 sm:items-end sm:text-right">
              <p className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.09375rem] text-white/85">
                Step {step.num} &middot; {step.short}
              </p>
              <p className="font-display text-[1.75rem] leading-[2.125rem] text-white">
                {step.caption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
