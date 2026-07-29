"use client";

import { useRef, useState } from "react";

/* ── Events · Workflow #1 — Figma 607:3364 "six ways" ──────────────────────
   A filter-by-attribute experience carousel: a pill row (All / Virtual /
   In-person / Hybrid / Under 60 min / Big groups) over a scrollable rail of
   experience cards, each with an image, title, and a rating / duration /
   capacity stat footer, plus left/right nav arrows. Built as its own component
   (not the SwagWorkflow pill-tab band) to match the Figma composition. */

type Filter =
  | "all"
  | "virtual"
  | "in-person"
  | "hybrid"
  | "under-60"
  | "big-groups";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "virtual", label: "Virtual" },
  { key: "in-person", label: "In-person" },
  { key: "hybrid", label: "Hybrid" },
  { key: "under-60", label: "Under 60 min" },
  { key: "big-groups", label: "Big groups" },
];

type Experience = {
  title: string;
  cats: Filter[];
  rating: string;
  minutes: string;
  where: string;
  whereLabel: string;
  /** soft placeholder gradient + a category glyph, matching Figma's grey image slot */
  grad: string;
  glyph: "masks" | "utensils" | "flame" | "brain" | "wine" | "puzzle" | "mic" | "chef";
};

const EXPERIENCES: Experience[] = [
  { title: "Murder Mystery", cats: ["virtual", "under-60", "big-groups"], rating: "4.9", minutes: "60", where: "10–500", whereLabel: "capacity", grad: "linear-gradient(150deg,#efe4ee,#e2d2e3)", glyph: "masks" },
  { title: "Taco Throwdown", cats: ["in-person"], rating: "4.8", minutes: "75", where: "In-person", whereLabel: "where", grad: "linear-gradient(150deg,#f6e7dc,#efd6c4)", glyph: "utensils" },
  { title: "Candle Making", cats: ["hybrid", "under-60"], rating: "5.0", minutes: "60", where: "Ship-to-home", whereLabel: "where", grad: "linear-gradient(150deg,#f2ecdf,#e8dcc4)", glyph: "flame" },
  { title: "Trivia Royale", cats: ["virtual", "under-60", "big-groups"], rating: "4.9", minutes: "45", where: "Up to 1000", whereLabel: "capacity", grad: "linear-gradient(150deg,#e3e9f0,#d3dcea)", glyph: "brain" },
  { title: "Wine & Paint Night", cats: ["hybrid", "under-60"], rating: "4.8", minutes: "60", where: "Ship-to-home", whereLabel: "where", grad: "linear-gradient(150deg,#efe1e6,#e3cdd6)", glyph: "wine" },
  { title: "Escape Room", cats: ["virtual", "under-60"], rating: "4.9", minutes: "50", where: "Teams of 6", whereLabel: "capacity", grad: "linear-gradient(150deg,#e2ece7,#cfe2d6)", glyph: "puzzle" },
  { title: "Comedy Hour", cats: ["virtual", "under-60", "big-groups"], rating: "4.7", minutes: "45", where: "Up to 500", whereLabel: "capacity", grad: "linear-gradient(150deg,#f1e6dc,#e7d3bf)", glyph: "mic" },
  { title: "Chef’s Table", cats: ["in-person"], rating: "5.0", minutes: "90", where: "10–40", whereLabel: "capacity", grad: "linear-gradient(150deg,#efe6e0,#e2d0c6)", glyph: "chef" },
];

/* ── lucide icons (12px stat glyphs + 24px nav arrows), real SVG per convention ── */
function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3">
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function ArrowIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6">
      {dir === "left" ? (
        <>
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </>
      ) : (
        <>
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </>
      )}
    </svg>
  );
}

/* Faint category glyph watermarked into each placeholder image slot. */
function GlyphMark({ glyph }: { glyph: Experience["glyph"] }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className: "size-14 text-[#16171b]/15" };
  switch (glyph) {
    case "utensils":
      return <svg {...common}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></svg>;
    case "flame":
      return <svg {...common}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>;
    case "brain":
      return <svg {...common}><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Zm0 0a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" /></svg>;
    case "wine":
      return <svg {...common}><path d="M8 22h8M7 10h10M12 15v7M7 2h10l-1 8a4 4 0 0 1-8 0Z" /></svg>;
    case "puzzle":
      return <svg {...common}><path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 19.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0" /></svg>;
    case "mic":
      return <svg {...common}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3ZM19 10v2a7 7 0 0 1-14 0v-2M12 19v3" /></svg>;
    case "chef":
      return <svg {...common}><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Zm0 3.13h12" /></svg>;
    default: // masks
      return <svg {...common}><path d="M4 5h16v6a8 8 0 0 1-16 0Zm4 3.5h.01M15.99 8.5H16M9 13a3 3 0 0 0 6 0" /></svg>;
  }
}

export default function EventsExperiences() {
  const [active, setActive] = useState<Filter>("all");
  const trackRef = useRef<HTMLDivElement>(null);

  const shown =
    active === "all"
      ? EXPERIENCES
      : EXPERIENCES.filter((e) => e.cats.includes(active));

  function scroll(dir: "left" | "right") {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 16 : 320;
    track.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  }

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-section px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
        {/* intro + subnav */}
        <div className="flex flex-col items-center gap-6 pt-16 md:pt-24 lg:pt-32">
          <div className="flex flex-col items-center gap-2">
            <p className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-swag-green">
              The good stuff
            </p>
            <h2 className="text-center font-[family-name:var(--font-satoshi)] text-[2rem] leading-[1.08] tracking-[-0.02em] text-swag-ink md:text-[2.5rem] lg:text-[2.75rem]">
              Events people look forward to
            </h2>
          </div>
          <p className="max-w-[34rem] text-center font-sans text-[1rem] leading-[1.48] text-[#6b6c71] md:text-[1.125rem]">
            Every experience is hosted by a real person and designed for real
            connection. Here are a few favorites, with 500+ more to explore.
          </p>

          <div className="mt-2 flex max-w-full flex-wrap items-center justify-center gap-2.5 overflow-x-auto rounded-[6.25rem] bg-[#f2f2f2] p-2.5">
            {FILTERS.map((f) => {
              const on = f.key === active;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setActive(f.key)}
                  className={`shrink-0 rounded-[6.25rem] px-5 py-3 font-sans text-[0.75rem] font-bold uppercase tracking-[0.0625em] transition-all active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-swag-ink ${
                    on
                      ? "bg-swag-ink text-white"
                      : "text-swag-ink hover:bg-black/[0.04]"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* card rail */}
        <div className="flex flex-col items-center gap-10 pb-24 pt-11 md:pb-32 lg:pb-40">
          <div className="w-full rounded-[2rem] bg-[#f2f2f2] p-4">
            <div
              ref={trackRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {shown.map((e) => (
                <article
                  key={e.title}
                  data-card
                  className="flex shrink-0 basis-[80%] snap-start flex-col items-center rounded-[1.5rem] border-8 border-white bg-white p-2 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)] sm:basis-[46%] lg:basis-[calc((100%-3rem)/4)]"
                >
                  {/* image slot — Figma grey placeholder, softened with a themed wash + category glyph */}
                  <div className="flex h-[15.625rem] w-full items-center justify-center rounded-tl-[0.5rem] rounded-tr-[0.5rem] rounded-br-[1.5rem] rounded-bl-[1.5rem] shadow-[0px_20px_10px_rgba(0,0,0,0.10),0px_2px_1px_rgba(0,0,0,0.10)]" style={{ background: e.grad }}>
                    <GlyphMark glyph={e.glyph} />
                  </div>
                  <div className="w-full px-4 pb-8 pt-10">
                    <p className="font-[family-name:var(--font-satoshi)] text-[1.25rem] leading-[1.04] tracking-[-0.019em] text-swag-ink">
                      {e.title}
                    </p>
                  </div>
                  {/* stat footer */}
                  <div className="flex w-full items-start gap-2 rounded-[1rem] bg-[#f7f7f7] p-4">
                    <Stat icon={<StarIcon />} value={e.rating} label="rating" />
                    <Stat icon={<ClockIcon />} value={e.minutes} label="minutes" />
                    <Stat icon={<UsersIcon />} value={e.where} label={e.whereLabel} grow />
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* nav arrows */}
          <div className="flex items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Previous experiences"
              className="flex size-10 items-center justify-center rounded-full bg-[#f2f5f5] text-swag-ink transition-all hover:bg-[#e6ebeb] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-swag-ink"
            >
              <ArrowIcon dir="left" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Next experiences"
              className="flex size-10 items-center justify-center rounded-full bg-[#f2f5f5] text-swag-ink transition-all hover:bg-[#e6ebeb] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-swag-ink"
            >
              <ArrowIcon dir="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  icon,
  value,
  label,
  grow,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  grow?: boolean;
}) {
  return (
    <div className={`flex items-start gap-1.5 ${grow ? "min-w-0 flex-1" : ""}`}>
      <span className="pt-0.5 text-swag-ink">{icon}</span>
      <div className="flex flex-col gap-0.5">
        <p className="font-sans text-[0.875rem] font-bold leading-none text-[#1b1b1b]">
          {value}
        </p>
        <p className="font-sans text-[0.75rem] leading-[1.5] text-[#6b6c71]">
          {label}
        </p>
      </div>
    </div>
  );
}
