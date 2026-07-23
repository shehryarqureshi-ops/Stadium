"use client";

import { useState } from "react";

/* Six ways — Figma /swag 2:25010 ("Built to run every swag workflow"). A pill
   tab bar over a content band (image + heading/desc/checklist/link). Figma
   ships the active "Bulk Swag" tab in full; the other five tabs carry concise
   on-brand placeholder copy (swap for real Figma copy when available). One
   green abstract image is shared across tabs. Default tab = Bulk Swag. */

type Tab = {
  label: string;
  heading: string;
  desc: string[];
  features: string[];
  cta: string;
};

const TABS: Tab[] = [
  {
    label: "Swag Kits",
    heading: "Swag Kits",
    desc: [
      "Curated kits, assembled and shipped as one.",
      "Pick the pieces; we handle kitting and delivery.",
    ],
    features: [
      "Custom kits for onboarding, events, and milestones.",
      "We assemble, pack, and ship to every recipient.",
      "Track every kit from warehouse to doorstep.",
    ],
    cta: "Build a kit",
  },
  {
    label: "Branded Stores",
    heading: "Branded Stores",
    desc: [
      "A branded store your whole team can order from.",
      "Budgets and approvals keep spend in control.",
    ],
    features: [
      "Your logo, your catalog, your rules.",
      "Per-team budgets, approvals, and SSO.",
      "Orders ship from inventory automatically.",
    ],
    cta: "See stores",
  },
  {
    label: "On-Demand Swag",
    heading: "On-Demand Swag",
    desc: [
      "Order what you need, when you need it.",
      "No minimums, no warehouse required.",
    ],
    features: [
      "Print-on-demand across the full catalog.",
      "Ship a single item or a thousand.",
      "Reorder favorites in a click.",
    ],
    cta: "Order on demand",
  },
  {
    label: "Bulk Swag",
    heading: "Bulk Swag",
    desc: [
      "Order swag in bulk–the more you order, the less each piece costs.",
      "We’ll store your swag until you’re ready.",
    ],
    features: [
      "Unlock volume discounts based on quantities ordered.",
      "Store swag with us for events, gifting, and more.",
      "Ship swag to one or multiple locations.",
    ],
    cta: "Get bulk pricing",
  },
  {
    label: "Self-serve Swag",
    heading: "Self-serve Swag",
    desc: [
      "Design it, order it, send it — yourself.",
      "Everything you need in one simple flow.",
    ],
    features: [
      "Design online with live previews.",
      "Send to addresses you already have.",
      "Pay as you go, no contract.",
    ],
    cta: "Start designing",
  },
  {
    label: "Swag storage",
    heading: "Swag Storage",
    desc: [
      "We warehouse your swag until it’s needed.",
      "Kitting and fulfillment included.",
    ],
    features: [
      "Free up your office and closets.",
      "Real-time inventory across every SKU.",
      "Ship from storage on demand.",
    ],
    cta: "See storage",
  },
];

function Check() {
  return (
    <svg
      className="mt-0.5 size-3.5 shrink-0 text-swag-ink"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function SwagWorkflow() {
  const [active, setActive] = useState(3);
  const tab = TABS[active];

  return (
    <section className="relative overflow-hidden bg-white px-section-x-sm py-20 md:px-section-x-md md:py-24 lg:px-section-x-lg lg:py-[8.75rem]">
      {/* subtle symbol glow (Figma symbol-gradient backdrop) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[62rem] max-w-[92%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(16,153,90,0.09),transparent_66%)]"
      />

      <div className="relative mx-auto flex w-full max-w-content flex-col items-center gap-10">
        {/* intro */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p
            data-animation="reveal"
            className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-swag-green-deep md:text-eyebrow-md"
          >
            EVERYTHING SWAG
          </p>
          <h2
            data-animation="reveal"
            className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem] lg:text-[2.75rem]"
          >
            Built to run every swag workflow
          </h2>
        </div>

        {/* tab bar (scrolls horizontally on narrow screens) */}
        <div
          data-animation="reveal"
          className="flex w-full justify-start overflow-x-auto pb-1 lg:justify-center"
        >
          <div className="mx-auto flex shrink-0 items-center gap-1.5 rounded-full border border-[#e0e0e0] bg-white/75 p-2.5 shadow-[0_0.1875rem_0.375rem_rgba(0,0,0,0.06)] backdrop-blur md:gap-2.5">
            {TABS.map((t, i) => (
              <button
                key={t.label}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`whitespace-nowrap rounded-full px-4 py-[0.8125rem] font-sans text-[0.75rem] font-bold uppercase tracking-[0.0625rem] transition-colors duration-200 md:px-5 ${
                  i === active
                    ? "bg-swag-ink text-white"
                    : "text-swag-ink hover:bg-black/5"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* content band */}
        <div
          data-animation="reveal"
          className="flex w-full flex-col gap-2.5 rounded-[2rem] border border-[#e0e0e0] bg-white/75 p-2.5 shadow-[0_0.1875rem_0.375rem_rgba(0,0,0,0.06)] backdrop-blur lg:flex-row lg:items-stretch lg:gap-[3.75rem]">
          <div className="h-56 overflow-hidden rounded-3xl sm:h-72 lg:h-[24.4375rem] lg:w-[36.25rem] lg:shrink-0 lg:self-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/swag/swag-ribbon.jpg"
              alt=""
              aria-hidden
              className="size-full object-cover"
            />
          </div>

          <div className="flex flex-1 flex-col justify-center gap-8 px-6 pb-8 pt-2 lg:py-[3.75rem] lg:pr-10 lg:pl-0">
            <div className="flex flex-col gap-[1.125rem]">
              <h3 className="font-display text-[1.75rem] leading-10 text-swag-ink lg:text-[2rem]">
                {tab.heading}
              </h3>
              <p className="font-sans text-body-md leading-[1.5] text-[#828282]">
                {tab.desc.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
            <ul className="flex flex-col gap-3">
              {tab.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check />
                  <span className="font-sans text-[0.9375rem] leading-[1.4] text-swag-ink">
                    {f}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="inline-flex w-fit items-center border-b border-swag-ink pb-0.5 font-sans text-[0.75rem] font-bold uppercase tracking-[0.0625rem] text-swag-ink transition-opacity hover:opacity-70"
            >
              {tab.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
