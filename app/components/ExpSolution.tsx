"use client";

/* /events (Experiences · Confetti) · THE SOLUTION — layout from Figma
   n9SjmDjzB1PeZAYJ5w43fr → 2504:9222 "six ways" (page frame 2504:9060); card
   CONTENT from the Imagery System board F7rDHYd3n5nwRtrlv1F6dO → 2241:12807
   "CONFETTI — cards behind each tab".

   "Team building that gets people talking" — a centred header, a six-pill
   filter bar and a #f2f2f2 tray holding a horizontal rail of experience cards
   (274×250 r20 tile with a drop shadow, title, then a #f7f7f7 stat strip),
   with a left/right arrow pair under the tray.

   The 2241 board replaced the eight placeholder experiences this shipped with
   — four of which had no artwork and fell back to a blank #e0e0e0 slot — with
   48 real Confetti experiences, eight per tab, every one with real artwork
   and a real collection behind it. Three things changed with it:

     · Cards no longer belong to several tabs at once. The board is explicit
       that the six tabs hold 48 DISTINCT experiences with no repeats, so
       `cats: FilterKey[]` became a single `tab`.
     · The first stat was a star rating (4.9) invented for the placeholders;
       the board's first stat is the FORMAT (virtual / in-person / hybrid).
     · The stat strip lost its star/clock/users glyphs — the board draws three
       plain value-over-label columns.

   Its VIRTUAL tab is named SMALL GROUPS here, which is the board's own note:
   every tab maps to a real Confetti collection, and small-groups is the one
   that exists. Collections, for reference: all → /collection/popular-
   experiences, in-person → /in-person-experiences, hybrid →
   /hybrid-experiences, under-60 → /30-mins-or-less, small-groups →
   /small-groups, big-groups → /large-groups.

   Sources are 900×562 and the slot is 274×250, so each card is a centred
   cover crop (Figma's own FILL), shipped at 548×500 = 2× the CSS slot. The
   photo-to-card mapping was VERIFIED rather than assumed: every source in a
   row is the same size, so each was matched against its slot in the row's own
   render and the assignment proofed side by side.

   Figma stack (y relative to the section frame, which is content-tight — no
   internal top/bottom space — so with the neighbours' 80 this section is py-20):
     intro 2504:9223   y=0    h220
       header 2504:9224  y=0   h118  (eyebrow 15 → 8 → title 48 → 20 → sub 27)
       gap                        40
       subnav 2504:9229  y=158 h62   (pill p-10, gap-10, tabs px-20 py-13 lh16)
     band  2504:9241   y=220  h583
       gap (band pt)              45
       grid   2504:9242  y=265 h458  (tray p-16, gap-16, 4×290 cards r24 p-8)
       gap                        40
       nav    2504:9351  y=763 h40   (two 40×40 r100 #f2f5f5 buttons, gap 10)
     content end 803 (abs 3066) · next section starts abs 3226 → 160 gap.
   Container: Figma draws 1240 @ x=100; the site's 1200 max-w-content wins, so
   the tray's inner proportions (p-16 / gap-16 / 4 columns) are matched at 1200
   → 280-wide cards (17.5rem) instead of 290. */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import Image from "next/image";

type FilterKey =
  | "all"
  | "in-person"
  | "hybrid"
  | "under-60"
  | "small-groups"
  | "big-groups";

/* The older 2504 frame typed this "hybird" and the typo was shipped verbatim.
   The 2241 board spells it HYBRID, so the corrected spelling wins. */
const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "all" },
  { key: "in-person", label: "in-person" },
  { key: "hybrid", label: "hybrid" },
  { key: "under-60", label: "under 60 min" },
  { key: "small-groups", label: "small groups" },
  { key: "big-groups", label: "big groups" },
];

type Experience = {
  /** each experience belongs to exactly ONE tab — the board has no repeats */
  tab: FilterKey;
  title: string;
  slug: string;
  format: string;
  minutes: string;
  capacity: string;
};

/* All 48 experiences from the Confetti board (2241:12807): six tabs, eight
   cards each, no repeats — an experience belongs to exactly one tab, unlike
   the previous eight cards which carried a `cats` array. Every slug has an
   encoded 548x500 card in /public/exp2/cards. */
const EXPERIENCES: Experience[] = [
  { tab: "all", title: "Escape Quest", slug: "escape-quest", format: "virtual", minutes: "75-90", capacity: "max 500" },
  { tab: "all", title: "Coworker Clash", slug: "coworker-clash", format: "virtual", minutes: "60", capacity: "4-200" },
  { tab: "all", title: "Traitorous Trivia", slug: "traitorous-trivia", format: "virtual", minutes: "30-45", capacity: "4-50" },
  { tab: "all", title: "Taboo", slug: "taboo", format: "virtual", minutes: "60", capacity: "4-995" },
  { tab: "all", title: "Mini Games", slug: "mini-games", format: "virtual", minutes: "45-60", capacity: "max 500" },
  { tab: "all", title: "Leader of the Pack", slug: "leader-of-the-pack", format: "virtual", minutes: "60", capacity: "max 80" },
  { tab: "all", title: "Classic Trivia", slug: "classic-trivia", format: "virtual", minutes: "60", capacity: "2-500" },
  { tab: "all", title: "Terrarium Workshop", slug: "terrarium-workshop", format: "virtual", minutes: "60", capacity: "max 300" },
  { tab: "in-person", title: "Jeoparty", slug: "jeoparty", format: "in-person", minutes: "45-60", capacity: "2-180" },
  { tab: "in-person", title: "Drag Queen Bingo", slug: "drag-queen-bingo", format: "in-person", minutes: "60", capacity: "max 300" },
  { tab: "in-person", title: "Murder Mystery Party", slug: "murder-mystery-party", format: "in-person", minutes: "90", capacity: "max 300" },
  { tab: "in-person", title: "Wine Tasting", slug: "wine-tasting", format: "in-person", minutes: "30-60", capacity: "max 495" },
  { tab: "in-person", title: "Museum Storytelling Tour", slug: "museum-storytelling-tour", format: "in-person", minutes: "60", capacity: "max 495" },
  { tab: "in-person", title: "Laughter Yoga", slug: "laughter-yoga", format: "in-person", minutes: "30-60", capacity: "max 495" },
  { tab: "in-person", title: "Magic & Mentalism Show", slug: "magic-and-mentalism-show", format: "in-person", minutes: "30-60", capacity: "max 495" },
  { tab: "in-person", title: "Boom Box", slug: "boom-box", format: "in-person", minutes: "60", capacity: "2-500" },
  { tab: "hybrid", title: "Live Aquarium Tour", slug: "live-aquarium-tour", format: "hybrid", minutes: "60", capacity: "max 350" },
  { tab: "hybrid", title: "Winter Mixology Class", slug: "winter-mixology-class", format: "hybrid", minutes: "30-60", capacity: "max 495" },
  { tab: "hybrid", title: "Mixology Class", slug: "mixology-class", format: "hybrid", minutes: "30-60", capacity: "max 495" },
  { tab: "hybrid", title: "BYO Fall Mixology Class", slug: "byo-fall-mixology-class", format: "hybrid", minutes: "60", capacity: "max 495" },
  { tab: "hybrid", title: "Smartphone Photography", slug: "smartphone-photography", format: "hybrid", minutes: "45-60", capacity: "max 250" },
  { tab: "hybrid", title: "Tie Dye Workshop", slug: "tie-dye-workshop", format: "hybrid", minutes: "60", capacity: "max 495" },
  { tab: "hybrid", title: "Live World Tour", slug: "live-world-tour", format: "hybrid", minutes: "60", capacity: "max 995" },
  { tab: "hybrid", title: "Communication Skills Workshop", slug: "communication-skills-workshop", format: "hybrid", minutes: "30-60", capacity: "3-99" },
  { tab: "under-60", title: "Speed Leader of the Pack", slug: "speed-leader-of-the-pack", format: "virtual", minutes: "30", capacity: "2-80" },
  { tab: "under-60", title: "Slime Making Class", slug: "slime-making-class", format: "virtual", minutes: "30", capacity: "2-495" },
  { tab: "under-60", title: "Buzzer Beater Trivia", slug: "buzzer-beater-trivia", format: "virtual", minutes: "15", capacity: "2-500" },
  { tab: "under-60", title: "Water Cooler", slug: "water-cooler", format: "virtual", minutes: "30-45", capacity: "4-200" },
  { tab: "under-60", title: "Buzzer Beater Wednesday", slug: "buzzer-beater-wednesday", format: "virtual", minutes: "15", capacity: "2-500" },
  { tab: "under-60", title: "Candle Making Class", slug: "candle-making-class", format: "virtual", minutes: "30-45", capacity: "max 300" },
  { tab: "under-60", title: "Chocolate Tasting", slug: "chocolate-tasting", format: "virtual", minutes: "30-60", capacity: "max 495" },
  { tab: "under-60", title: "Origami Class", slug: "origami-class", format: "virtual", minutes: "30-60", capacity: "max 495" },
  { tab: "small-groups", title: "Totem: Strength Recognition", slug: "totem-strength-recognition", format: "virtual", minutes: "60", capacity: "4-95" },
  { tab: "small-groups", title: "Guess Who", slug: "guess-who", format: "virtual", minutes: "60", capacity: "6-15" },
  { tab: "small-groups", title: "Werewolf", slug: "werewolf", format: "virtual", minutes: "45-60", capacity: "8-100" },
  { tab: "small-groups", title: "Mini Murder Mystery", slug: "mini-murder-mystery", format: "virtual", minutes: "75", capacity: "max 27" },
  { tab: "small-groups", title: "Tarot Card Reading", slug: "tarot-card-reading", format: "virtual", minutes: "90", capacity: "max 20" },
  { tab: "small-groups", title: "Codeword", slug: "codeword", format: "virtual", minutes: "60", capacity: "4-40" },
  { tab: "small-groups", title: "Two Truths and a Lie", slug: "two-truths-and-a-lie", format: "virtual", minutes: "45", capacity: "6-15" },
  { tab: "small-groups", title: "Empathy Water Cooler", slug: "empathy-water-cooler", format: "virtual", minutes: "45-60", capacity: "4-75" },
  { tab: "big-groups", title: "Mash-Up", slug: "mash-up", format: "virtual", minutes: "60-90", capacity: "4-200" },
  { tab: "big-groups", title: "Sher-Locked Escape Quest", slug: "sher-locked-escape-quest", format: "virtual", minutes: "75-90", capacity: "max 500" },
  { tab: "big-groups", title: "Pictionary", slug: "pictionary", format: "virtual", minutes: "60", capacity: "4-995" },
  { tab: "big-groups", title: "Charades", slug: "charades", format: "virtual", minutes: "60", capacity: "4-995" },
  { tab: "big-groups", title: "Office Olympics", slug: "office-olympics", format: "virtual", minutes: "90-120", capacity: "4-488" },
  { tab: "big-groups", title: "Confetti Pub", slug: "confetti-pub", format: "virtual", minutes: "60-120", capacity: "max 975" },
  { tab: "big-groups", title: "Pasta Making Class", slug: "pasta-making-class", format: "virtual", minutes: "60", capacity: "max 495" },
  { tab: "big-groups", title: "Pizza Making Class", slug: "pizza-making-class", format: "virtual", minutes: "90", capacity: "max 495" },
];

/* Figma "grid-card-active-shadow" (4 stacked drop shadows) sits on the image
   block inside each card; the card itself carries the resting 0 3 6 / 6%. */
const SHADOW_IMAGE =
  "shadow-[0px_20px_20px_-2px_rgba(0,0,0,0.15),0px_6.383px_6.383px_-1.5px_rgba(0,0,0,0.12),0px_2.415px_2.415px_-1px_rgba(0,0,0,0.11),0px_0.796px_0.796px_-0.5px_rgba(0,0,0,0.1)]";
const SHADOW_CARD = "shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]";

/* lucide icons exactly as exported from Figma (12×12 stat glyphs 2504:9251 /
   9258 / 9265, 24×24 nav arrows 2504:9353 / 9356). */
function ArrowIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6"
      aria-hidden
    >
      <path
        d={
          dir === "left"
            ? "M12 5L5 12L12 19M5 12H19"
            : "M5 12H19M12 19L19 12L12 5"
        }
      />
    </svg>
  );
}

function Stat({
  value,
  label,
  grow,
}: {
  value: string;
  label: string;
  grow?: boolean;
}) {
  return (
    <div className={grow ? "min-w-0 flex-1" : "shrink-0"}>
      <span className="flex flex-col gap-0.5">
        <span className="font-sans text-[0.875rem] font-bold leading-[0.9375rem] text-[#1b1b1b]">
          {value}
        </span>
        <span className="whitespace-nowrap font-sans text-[0.75rem] leading-[1.5] text-[#6b6c71]">
          {label}
        </span>
      </span>
    </div>
  );
}

export default function ExpSolution() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const railRef = useRef<HTMLDivElement>(null);

  const shown = EXPERIENCES.filter((e) => e.tab === filter);

  const syncArrows = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    setCanLeft(rail.scrollLeft > 4);
    setCanRight(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollTo({ left: 0 });
    syncArrows();
    window.addEventListener("resize", syncArrows);
    return () => window.removeEventListener("resize", syncArrows);
  }, [filter, syncArrows]);

  const scroll = (dir: "left" | "right") => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 16 : 296;
    rail.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  const selectTab = (i: number) => {
    setFilter(FILTERS[i].key);
    tabRefs.current[i]?.focus();
  };

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = FILTERS.length;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      selectTab((i + 1) % n);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      selectTab((i - 1 + n) % n);
    } else if (e.key === "Home") {
      e.preventDefault();
      selectTab(0);
    } else if (e.key === "End") {
      e.preventDefault();
      selectTab(n - 1);
    }
  };

  return (
    <section className="bg-white px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
      <div className="mx-auto flex w-full max-w-content flex-col items-center">
        {/* header — eyebrow → 8 → title → 20 → subhead */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p
            data-animation="reveal"
            className="font-sans text-[0.75rem] font-semibold uppercase leading-normal tracking-[0.045rem] text-[#ff5b77]"
          >
            The solution
          </p>
          <h2
            data-animation="reveal"
            className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
          >
            Team building that gets people talking
          </h2>
        </div>
        <p
          data-animation="reveal"
          className="mt-5 text-center font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]"
        >
          Events led by a real host, with activities that work whether teams are
          remote or in-person.
        </p>

        {/* filter pill bar — 40 below the header; scrolls horizontally below lg */}
        <div
          data-animation="reveal"
          className="-mx-section-x-sm mt-10 w-[calc(100%+2rem)] overflow-x-auto px-section-x-sm [scrollbar-width:none] md:-mx-section-x-md md:w-[calc(100%+3.75rem)] md:px-section-x-md lg:mx-0 lg:flex lg:w-full lg:justify-center lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          <div
            role="tablist"
            aria-label="Filter experiences"
            className="mx-auto flex w-max items-center gap-2.5 rounded-[100px] bg-[#f2f2f2] p-2.5"
          >
            {FILTERS.map((f, i) => {
              const isActive = f.key === filter;
              return (
                <button
                  key={f.key}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`exp-filter-${f.key}`}
                  aria-selected={isActive}
                  aria-controls="exp-experience-rail"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setFilter(f.key)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className={`whitespace-nowrap rounded-[100px] px-5 py-[0.8125rem] font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink active:scale-[0.98] ${
                    isActive
                      ? "bg-[#16171b] text-white"
                      : "text-[#16171b] hover:bg-black/5"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* tray + rail — 45 below the pill bar */}
        <div
          data-animation="reveal"
          className="mt-[2.8125rem] w-full overflow-x-auto rounded-[2rem] bg-[#f2f2f2] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          id="exp-experience-rail"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`exp-filter-${filter}`}
          ref={railRef}
          onScroll={syncArrows}
        >
          <ul
            key={filter}
            className="snack-step-in flex list-none items-stretch gap-4 p-4"
          >
            {shown.map((x) => (
              <li
                key={x.title}
                data-card
                className={`flex w-[16.5rem] shrink-0 flex-col overflow-hidden rounded-[1.5rem] bg-white p-2 md:w-[17.5rem] ${SHADOW_CARD}`}
              >
                <div
                  className={`relative h-[15.625rem] w-full overflow-hidden rounded-b-[1.5rem] rounded-t-[0.5rem] ${SHADOW_IMAGE}`}
                >
                  {/* decorative: the card's own <h3> already names the
                      experience, so an alt would just repeat it */}
                  <Image
                    src={`/exp2/cards/xp-card-${x.slug}.jpg`}
                    alt=""
                    fill
                    quality={90}
                    className="rounded-[1.25rem] object-cover"
                    sizes="(min-width:1024px) 17.5rem, 16.5rem"
                  />
                </div>

                <div className="flex flex-1 flex-col px-4 pb-8 pt-10">
                  <h3 className="font-[family-name:var(--font-satoshi)] text-[1.25rem] font-bold leading-[1.04] tracking-[-0.01875rem] text-[#16171b]">
                    {x.title}
                  </h3>
                </div>

                {/* 2241:12807 drops the star rating and the stat glyphs: three
                    plain value-over-label columns, format first. */}
                <div className="flex items-start gap-2 rounded-[1rem] bg-[#f7f7f7] p-4">
                  <Stat value={x.format} label="format" />
                  <Stat value={x.minutes} label="minutes" />
                  <Stat value={x.capacity} label="capacity" grow />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* rail nav — 40 below the tray */}
        <div
          data-animation="reveal"
          className="mt-10 flex items-center justify-center gap-2.5"
        >
          {(["left", "right"] as const).map((dir) => {
            const enabled = dir === "left" ? canLeft : canRight;
            return (
              <button
                key={dir}
                type="button"
                onClick={() => scroll(dir)}
                disabled={!enabled}
                aria-label={
                  dir === "left" ? "Previous experiences" : "Next experiences"
                }
                className={`flex size-10 items-center justify-center rounded-[100px] bg-[#f2f5f5] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                  enabled
                    ? "hover:bg-[#e4e9e9] active:scale-[0.98]"
                    : "cursor-not-allowed opacity-25"
                }`}
              >
                <ArrowIcon dir={dir} />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
