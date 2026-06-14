"use client";

import { useEffect, useRef, useState } from "react";
import { useAutoAdvance } from "./useAutoAdvance";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import recognitionImg from "@/public/ewysu-recognition.jpg";
import swagImg from "@/public/ewysu-swag.jpg";
import giftingImg from "@/public/ewysu-gifting.jpg";
import snacksImg from "@/public/ewysu-snacks.jpg";
import eventsImg from "@/public/ewysu-events.jpg";

type Pillar = {
  name: string;
  image: StaticImageData | null;
  /** Focal-point tweak for object-position (matches Figma crop) */
  imagePosition?: string;
  /** Shorter copy — mobile horizontal tiles */
  mobileDesc: string;
};

const pillars: Pillar[] = [
  {
    name: "Recognition",
    image: recognitionImg,
    mobileDesc: "Points, kudos, and rewards for every win.",
  },
  {
    name: "Swag",
    image: swagImg,
    mobileDesc: "Branded merch your team is proud to wear.",
  },
  {
    name: "Gifting",
    image: giftingImg,
    mobileDesc: "The right gift, delivered anywhere.",
  },
  {
    name: "Snack Boxes",
    image: snacksImg,
    mobileDesc: "Curated snacks to every desk or door.",
  },
  {
    name: "Events",
    image: eventsImg,
    mobileDesc: "Standout moments, in person or virtual.",
  },
];

/**
 * Headline-driven section states (Figma 141:84860). Each sentence of the
 * heading activates its own card row; "show-up" renders the pillars.
 * States 2–4 use dashed "PENDING ASSET" placeholder tiles per the design
 * (no photos exist in Figma yet).
 *
 * The four rows live in ONE horizontal track (2026-06-14): switching states
 * SLIDES the track like a carousel instead of re-rendering the cards, and the
 * surface morphs height to the active row. All rows share the same five-fluid-
 * column geometry, so the slide reads as one continuous surface.
 */
const states = [
  { key: "show-up", sentence: "Every way you show up.", cards: null },
  {
    key: "however",
    sentence: "However you want.",
    cards: [
      "Company Stores",
      "Bundled Kits",
      "Automations",
      "Sender Choice",
      "Recipient Choice",
    ],
  },
  {
    key: "everyone",
    sentence: "For everyone you care about.",
    cards: ["Employees", "Customers", "Partners", "Prospects", "Candidates"],
  },
  {
    key: "whenever",
    sentence: "Whenever it matters.",
    cards: ["Onboarding", "Milestones", "Events", "Holidays", "Life Moments"],
  },
] as const;

type StateKey = (typeof states)[number]["key"];

function ArrowIcon() {
  return (
    <svg
      className="size-5 shrink-0 text-ink"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4.167 10h11.666M10 4.167 15.833 10l-5.833 5.833"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---- pillar tiles (state 1) ---- */
function PillarRow({ pillar }: { pillar: Pillar }) {
  return (
    <li className="flex items-center overflow-hidden rounded-xl border border-grey-200">
      <div className="relative aspect-[221/320] w-16 shrink-0 bg-grey-200">
        {pillar.image && (
          <Image
            src={pillar.image}
            alt=""
            fill
            sizes="12rem"
            className={`object-cover ${pillar.imagePosition ?? ""}`}
          />
        )}
      </div>
      <div className="flex flex-1 items-center gap-3 p-4">
        <div className="flex flex-1 flex-col gap-[0.125rem]">
          <h3 className="font-display text-[1rem] leading-[1.375rem] font-bold text-ink">
            {pillar.name}
          </h3>
          <p className="line-clamp-2 font-sans text-small text-ink">
            {pillar.mobileDesc}
          </p>
        </div>
        <ArrowIcon />
      </div>
    </li>
  );
}

function PillarCard({ pillar }: { pillar: Pillar }) {
  return (
    <li className="relative flex min-w-0 flex-1 flex-col gap-3 overflow-hidden lg:gap-2">
      <div className="relative aspect-[221/320] w-full overflow-hidden rounded-lg bg-grey-200 lg:rounded-xl">
        {pillar.image && (
          <Image
            src={pillar.image}
            alt=""
            fill
            sizes="(min-width: 64rem) 32rem, (min-width: 48rem) 18rem, 12rem"
            className={`object-cover ${pillar.imagePosition ?? ""}`}
          />
        )}
      </div>
      <h3 className="font-display text-[1.0625rem] leading-6 font-bold text-ink lg:text-[1.25rem] lg:leading-7">
        {pillar.name}
      </h3>
    </li>
  );
}

/* ---- pending tiles (states 2–4) ---- */
function PendingCard({ name }: { name: string }) {
  return (
    <li className="flex min-w-0 flex-1 flex-col gap-3 lg:gap-2">
      <div className="relative aspect-[221/320] w-full rounded-lg border border-dashed border-[#8c94a6] bg-[#f0f0f7] lg:rounded-card">
        <span className="absolute left-[0.6875rem] top-[0.6875rem] inline-flex items-center gap-1.5 rounded-full bg-accent-turmeric px-2 py-1">
          <span className="size-[0.3125rem] rounded-full bg-[#04050b]" aria-hidden />
          <span className="font-display text-[0.5625rem] font-bold tracking-[0.045rem] text-[#04050b]">
            PENDING ASSET
          </span>
        </span>
      </div>
      <h3 className="font-display text-[1.0625rem] leading-6 font-bold text-ink lg:text-[1.25rem] lg:leading-7">
        {name}
      </h3>
    </li>
  );
}

function PendingRow({ name }: { name: string }) {
  return (
    <li className="flex items-center overflow-hidden rounded-xl border border-grey-200">
      <div className="relative aspect-[221/320] w-16 shrink-0 self-stretch border-r border-dashed border-[#8c94a6] bg-[#f0f0f7]">
        <span
          className="absolute left-2 top-2 size-[0.3125rem] rounded-full bg-accent-turmeric"
          aria-hidden
        />
      </div>
      <div className="flex flex-1 items-center gap-3 p-4">
        <h3 className="flex-1 font-display text-[1rem] leading-[1.375rem] font-bold text-ink">
          {name}
        </h3>
        <ArrowIcon />
      </div>
    </li>
  );
}

export default function EveryWay() {
  const [active, setActive] = useState<StateKey>("show-up");
  const activeIndex = states.findIndex((s) => s.key === active);

  const { sectionRef, takeOver } = useAutoAdvance(() =>
    setActive((cur) => {
      const i = states.findIndex((s) => s.key === cur);
      return states[(i + 1) % states.length].key;
    }),
  );

  const select = (key: StateKey) => {
    takeOver();
    setActive(key);
  };

  /* Morph the carousel height to the active row as it slides. */
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [trackHeight, setTrackHeight] = useState<number | undefined>(undefined);
  useEffect(() => {
    const measure = () => {
      const el = panelRefs.current[activeIndex];
      if (el) setTrackHeight(el.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full max-w-section flex flex-col gap-6 bg-surface-base px-section-x-sm py-section-y-sm md:px-section-x-md md:py-section-y-md lg:gap-12 lg:px-section-x-lg lg:py-section-y-lg"
    >
      {/* Each sentence is a state trigger (Figma 141:84860): active sentence
          ink, the rest grey-400 */}
      <h2 className="font-display text-narrative-sm md:text-narrative-md lg:text-narrative-lg">
        {states.map((s) => (
          <span key={s.key}>
            <button
              type="button"
              onClick={() => select(s.key)}
              aria-pressed={active === s.key}
              className={`block cursor-pointer text-left transition-colors duration-200 md:inline md:whitespace-nowrap ${
                active === s.key
                  ? "text-ink"
                  : "text-grey-400 hover:text-grey-600"
              }`}
            >
              {s.sentence}
            </button>{" "}
          </span>
        ))}
      </h2>

      {/* Carousel: one horizontal track of four equal-width rows. Switching
          states slides the track (no re-render) and morphs the height. */}
      <div
        className="overflow-hidden transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        style={{ height: trackHeight }}
      >
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {states.map((s, i) => (
            <div
              key={s.key}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              aria-hidden={i !== activeIndex}
              className="w-full shrink-0"
            >
              {s.cards ? (
                <>
                  <ul className="flex flex-col gap-3 md:hidden">
                    {s.cards.map((name) => (
                      <PendingRow key={name} name={name} />
                    ))}
                  </ul>
                  <ul className="hidden gap-4 md:flex lg:gap-6">
                    {s.cards.map((name) => (
                      <PendingCard key={name} name={name} />
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <ul className="flex flex-col gap-3 md:hidden">
                    {pillars.map((pillar) => (
                      <PillarRow key={pillar.name} pillar={pillar} />
                    ))}
                  </ul>
                  <ul className="hidden gap-4 md:flex lg:gap-6">
                    {pillars.map((pillar) => (
                      <PillarCard key={pillar.name} pillar={pillar} />
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
