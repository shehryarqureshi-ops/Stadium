"use client";

/* /swag · EVERYTHING SWAG (Figma n9SjmDjzB1PeZAYJ5w43fr → 2500:4981 "six ways",
   inside page frame 2500:4706). "Every fulfillment model, one setup" — a
   centered header, a 6-tab pill switcher (SWAG KITS / BRANDED STORES /
   ON-DEMAND SWAG / BULK SWAG (default) / SELF-SERVE SWAG / SWAG STORAGE) and a
   white/75 band: photo left (580×400 r24), copy + checklist + underlined CTA
   right. Behind it sits Figma's blurred green "symbol gradient" (opacity .11).
   Figma only draws the Bulk Swag state — the other five tabs' copy comes from
   the OLD SwagWorkflow.tsx (approved placeholder copy) and, lacking their own
   photos in Figma, share the Bulk photo (as the old component shared one image).

   Figma stack (absolute y at 1440, frame origin 2783; frame carries 160 top /
   160 bottom internal space, so with the neighbours' 80 this section is py-20):
     eyebrow   y=160 h17   (abs 2943)
     title     y=185 h48   (abs 2968)   gap 8
     subhead   y=273 h54   (abs 3056)   gap 40
     tab bar   y=367 h62   (abs 3150)   gap 40   (pill p-10, tabs px-20 py-13 lh16)
     band card y=474 h420  (abs 3257)   gap 45   (p-10, gap 60, photo 580×400,
                                                  text col py-60: 32/40 → 18 →
                                                  16/1.5 → 32 → list(gap 12,pb 8)
                                                  → 32 → CTA 12/16)
     content end 894 (abs 3677) · frame end 1054 (abs 3837) · glow centred on
     the frame (= tab-bar top row). */

import { useRef, useState, type KeyboardEvent } from "react";
import Image, { type StaticImageData } from "next/image";
import bulk from "@/public/swag2/sw2-offerings-bulk.jpg";

type Tab = {
  label: string;
  title: string;
  desc: string[];
  points: string[];
  cta: string;
  img: StaticImageData;
  alt: string;
};

const BULK_ALT =
  "A smiling woman opening a bulk swag box — green tee, water bottle, cap, notebook and stickers";

/* Bulk Swag = exact Figma copy (2500:5007–5024). The other five tabs = approved
   copy from the old SwagWorkflow.tsx (placeholder until Figma provides them). */
const TABS: Tab[] = [
  {
    label: "swag kits",
    title: "Swag Kits",
    desc: [
      "Curated kits, assembled and shipped as one.",
      "Pick the pieces; we handle kitting and delivery.",
    ],
    points: [
      "Custom kits for onboarding, events, and milestones.",
      "We assemble, pack, and ship to every recipient.",
      "Track every kit from warehouse to doorstep.",
    ],
    cta: "Build a kit",
    img: bulk,
    alt: BULK_ALT,
  },
  {
    label: "Branded Stores",
    title: "Branded Stores",
    desc: [
      "A branded store your whole team can order from.",
      "Budgets and approvals keep spend in control.",
    ],
    points: [
      "Your logo, your catalog, your rules.",
      "Per-team budgets, approvals, and SSO.",
      "Orders ship from inventory automatically.",
    ],
    cta: "See stores",
    img: bulk,
    alt: BULK_ALT,
  },
  {
    label: "On-Demand Swag",
    title: "On-Demand Swag",
    desc: [
      "Order what you need, when you need it.",
      "No minimums, no warehouse required.",
    ],
    points: [
      "Print-on-demand across the full catalog.",
      "Ship a single item or a thousand.",
      "Reorder favorites in a click.",
    ],
    cta: "Order on demand",
    img: bulk,
    alt: BULK_ALT,
  },
  {
    label: "bulk swag",
    title: "Bulk Swag",
    desc: [
      "Order swag in bulk–the more you order, the less each piece costs.",
      "We'll store your swag until you’re ready.",
    ],
    points: [
      "Volume discounts based on quantities ordered",
      "Storage for events, gifting, and more",
      "Ship to one or multiple locations",
    ],
    cta: "GET BULK PRICING",
    img: bulk,
    alt: BULK_ALT,
  },
  {
    label: "Self-serve Swag",
    title: "Self-serve Swag",
    desc: [
      "Design it, order it, send it — yourself.",
      "Everything you need in one simple flow.",
    ],
    points: [
      "Design online with live previews.",
      "Send to addresses you already have.",
      "Pay as you go, no contract.",
    ],
    cta: "Start designing",
    img: bulk,
    alt: BULK_ALT,
  },
  {
    label: "Swag storage",
    title: "Swag Storage",
    desc: [
      "We warehouse your swag until it’s needed.",
      "Kitting and fulfillment included.",
    ],
    points: [
      "Free up your office and closets.",
      "Real-time inventory across every SKU.",
      "Ship from storage on demand.",
    ],
    cta: "See storage",
    img: bulk,
    alt: BULK_ALT,
  },
];

const DEFAULT_TAB = 3; // Bulk Swag — the state Figma draws

/* lucide/check exactly as exported from Figma (2500:5012, 14×14, 1.1667 stroke). */
function Check() {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      stroke="black"
      strokeWidth={1.16667}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5 shrink-0"
      aria-hidden
    >
      <path d="M11.6667 3.5L5.25 9.91667L2.33333 7" />
    </svg>
  );
}

export default function SwagmagicOfferings() {
  const [active, setActive] = useState(DEFAULT_TAB);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const t = TABS[active];

  const select = (i: number) => {
    setActive(i);
    tabRefs.current[i]?.focus();
  };

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = TABS.length;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      select((i + 1) % n);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      select((i - 1 + n) % n);
    } else if (e.key === "Home") {
      e.preventDefault();
      select(0);
    } else if (e.key === "End") {
      e.preventDefault();
      select(n - 1);
    }
  };

  return (
    <section className="relative overflow-hidden bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-20">
      {/* Figma "symbol gradient" (2500:4982): the S-symbol blurred 200 at 11%
         opacity, rotated 90°, centred on the frame (1354×1783 svg incl. blur
         bleed → 1783 wide × 1354 tall on screen; the section clips it). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/swag2/sw2-offerings-glow.svg"
        alt=""
        aria-hidden
        width={1354}
        height={1783}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[111.4375rem] w-[84.625rem] max-w-none -translate-x-1/2 -translate-y-1/2 rotate-90 select-none"
      />

      <div className="relative mx-auto flex w-full max-w-content flex-col items-center gap-10">
        {/* header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p
            data-animation="reveal"
            className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#10995a]"
          >
            Everything swag
          </p>
          <h2
            data-animation="reveal"
            className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
          >
            Every fulfillment model, one setup
          </h2>
        </div>
        <p
          data-animation="reveal"
          className="text-center font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]"
        >
          Whether you print swag on demand, buy in bulk, or pull from stock,
          <br className="hidden md:inline" /> Stadium&apos;s does all three. Most vendors only do one.
        </p>

        {/* tab bar — scrolls horizontally below lg (925px pill), centred at lg.
           The negative margins + padding keep the pill's shadow unclipped. */}
        <div
          data-animation="reveal"
          className="-mx-section-x-sm -mb-3 -mt-2 w-[calc(100%+2rem)] overflow-x-auto px-section-x-sm pb-3 pt-2 [scrollbar-width:none] md:-mx-section-x-md md:w-[calc(100%+3.75rem)] md:px-section-x-md lg:mx-0 lg:mb-0 lg:mt-0 lg:flex lg:w-full lg:justify-center lg:overflow-visible lg:px-0 lg:pb-0 lg:pt-0 [&::-webkit-scrollbar]:hidden"
        >
          <div
            role="tablist"
            aria-label="Swag fulfillment models"
            className="flex w-max items-center gap-2.5 rounded-[100px] bg-white/75 p-2.5 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]"
          >
            {TABS.map((tab, i) => {
              const isActive = i === active;
              return (
                <button
                  key={tab.label}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`swag-offering-tab-${i}`}
                  aria-selected={isActive}
                  aria-controls="swag-offering-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className={`whitespace-nowrap rounded-[100px] px-5 py-[0.8125rem] font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem] transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                    isActive
                      ? "bg-[#16171b] text-white"
                      : "text-[#16171b] hover:bg-black/5"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* band — Figma sits it 45 below the tab bar (gap 40 + 5) */}
        <div
          data-animation="reveal"
          id="swag-offering-panel"
          role="tabpanel"
          aria-labelledby={`swag-offering-tab-${active}`}
          className="flex w-full flex-col gap-6 rounded-[2rem] bg-white/75 p-2.5 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)] lg:mt-[0.3125rem] lg:flex-row lg:items-start lg:gap-[3.75rem]"
        >
          <div className="relative aspect-[580/400] w-full shrink-0 overflow-hidden rounded-[1.5rem] lg:aspect-auto lg:h-[25rem] lg:min-w-0 lg:flex-1 lg:basis-0">
            <Image
              key={t.img.src}
              src={t.img}
              alt={t.alt}
              fill
              quality={90}
              className="object-cover"
              sizes="(min-width:1024px) 35rem, 92vw"
            />
          </div>

          <div
            key={t.title}
            className="snack-step-in flex flex-col gap-8 px-4 pb-6 pt-2 lg:min-w-0 lg:flex-1 lg:basis-0 lg:px-0 lg:py-[3.75rem]"
          >
            <div className="flex flex-col gap-[1.125rem]">
              <h3 className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.25] text-[#16171b] lg:text-[2rem] lg:leading-[2.5rem]">
                {t.title}
              </h3>
              <p className="font-sans text-[1rem] leading-[1.5] text-[#828282]">
                {t.desc.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
            <div className="flex flex-col gap-8">
              <ul className="flex flex-col gap-3 pb-2">
                {t.points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5">
                    <Check />
                    <span className="font-sans text-[0.9375rem] leading-[1.2] text-[#16171b]">{p}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="w-fit font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem] text-[#16171b] transition-opacity duration-200 hover:opacity-70 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <span className="border-b border-black pb-[2px]">{t.cta}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
