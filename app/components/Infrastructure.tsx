"use client";

import { useState } from "react";
import Image from "next/image";
import operationsImg from "@/public/infra-operations.jpg";

/* "What we handle" — Figma 780:48429 ("V2 Image-dominant split, Dark").
   Eyebrow + heading top-left; below, a split: the ops image (left) carries the
   live step caption + an 8-segment progress bar, and a dark step-index panel
   (right) lists all 8 steps with the active one highlighted. Caption, progress,
   and active row update on click. */

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
  const [active, setActive] = useState(2); // 03 — Shipping (matches the image)
  const step = steps[active];

  return (
    <section className="bg-[#181818] px-section-x-sm py-section-y-sm md:px-section-x-md md:py-section-y-md lg:px-section-x-lg lg:py-section-y-lg">
      <div className="mx-auto flex w-full max-w-content flex-col gap-6 lg:gap-8">
        {/* Eyebrow + heading */}
        <div className="flex flex-col gap-3">
          <p className="font-sans text-eyebrow-sm uppercase text-accent-water md:text-eyebrow-md">
            End to end
          </p>
          <h2 className="text-balance font-display text-heading-md text-white lg:text-[2.5rem] lg:leading-[2.875rem]">
            Built to manage every step after approval.
          </h2>
        </div>

        {/* Split: image (left) + step panel (right) */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Image with live caption + segmented progress */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-card lg:h-[37.5rem] lg:aspect-auto lg:min-w-0 lg:flex-1">
            <Image
              src={operationsImg}
              alt="Stadium fulfillment operations"
              fill
              sizes="(min-width: 64rem) 56rem, 100vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(6,7,9,0.85)_0%,rgba(6,7,9,0.32)_42%,rgba(6,7,9,0)_72%)]" />
            <div
              aria-live="polite"
              className="absolute bottom-6 left-6 right-6 flex flex-col gap-2 md:bottom-8 md:left-8 md:right-8 lg:bottom-10 lg:left-10 lg:right-10"
            >
              <p className="font-sans text-eyebrow-sm uppercase text-white/80">
                Step {step.num} &middot; {step.short}
              </p>
              <p className="font-display text-callout-md text-white md:text-heading-sm">
                {step.caption}
              </p>
              <div className="mt-2 flex max-w-[36rem] gap-1.5">
                {steps.map((s, i) => (
                  <span
                    key={s.num}
                    className={`h-[0.1875rem] flex-1 rounded-full transition-colors duration-300 ${
                      i <= active ? "bg-accent-water" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Step-index panel */}
          <div className="flex shrink-0 flex-col rounded-card bg-infra-card p-6 lg:w-[18.5rem]">
            <div className="flex items-center justify-between pb-3">
              <span className="font-sans text-eyebrow-sm uppercase text-grey-500">
                What we handle
              </span>
              <span className="font-sans text-eyebrow-sm uppercase text-grey-600">
                08 Steps
              </span>
            </div>
            <ul className="flex flex-col">
              {steps.map((s, i) => {
                const on = i === active;
                return (
                  <li key={s.num}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-current={on}
                      className={`flex w-full items-center gap-3.5 rounded-lg px-3 py-3 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                        on ? "bg-grey-700" : "hover:bg-white/5"
                      }`}
                    >
                      <span
                        className={`font-sans text-[0.8125rem] font-semibold tabular-nums ${
                          on ? "text-accent-water" : "text-grey-600"
                        }`}
                      >
                        {s.num}
                      </span>
                      <span
                        className={`font-sans text-[1rem] leading-[1.375rem] ${
                          on ? "font-medium text-white" : "text-grey-300"
                        }`}
                      >
                        {s.label}
                      </span>
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
