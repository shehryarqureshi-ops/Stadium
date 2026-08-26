"use client";

/* /events (Experiences · Confetti) · THE SOLUTION — Figma
   n9SjmDjzB1PeZAYJ5w43fr → 2504:9222 "six ways", inside page frame 2504:9060.
   "Team building that gets people talking" — a centred header, a 5-pill filter
   bar (ALL / IN-PERSON / HYBIRD / UNDER 60 MIN / BIG GROUPS — Figma's spelling
   of "hybird" is shipped verbatim) and a #f2f2f2 tray holding a horizontal rail
   of experience cards (illustrated tile 274×250 r20 with a drop shadow, title,
   then a #f7f7f7 stat strip: star/rating · clock/minutes · users/capacity),
   with a left/right arrow pair under the tray. Figma draws the "all" state and
   four cards; the arrows (left one at 25% opacity = start-of-rail) imply more,
   so the four remaining approved experiences from the OLD EventsExperiences.tsx
   are appended. They have no artwork in this Figma, so they use the same neutral
   #e0e0e0 blank slot Figma itself uses for a missing image (see ExpHowItWorks).

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
  type ReactNode,
} from "react";
import Image, { type StaticImageData } from "next/image";
import murderMystery from "@/public/exp2/xp-solution-murder-mystery.png";
import tacoThrowdown from "@/public/exp2/xp-solution-taco-throwdown.jpg";
import candleMaking from "@/public/exp2/xp-solution-candle-making.jpg";
import triviaRoyale from "@/public/exp2/xp-solution-trivia-royale.jpg";

type FilterKey = "all" | "in-person" | "hybrid" | "under-60" | "big-groups";

/* Labels exactly as Figma types them (2504:9232–9240). "hybird" is Figma's
   spelling — shipped verbatim per the copy rule. */
const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "all" },
  { key: "in-person", label: "in-person" },
  { key: "hybrid", label: "hybird" },
  { key: "under-60", label: "under 60 min" },
  { key: "big-groups", label: "big groups" },
];

type Experience = {
  title: string;
  cats: FilterKey[];
  rating: string;
  minutes: string;
  /** third stat — Figma alternates between a capacity and a "where" value */
  third: string;
  thirdLabel: string;
  img?: StaticImageData;
  alt?: string;
};

/* Cards 1–4 = exact Figma copy (2504:9243 / 9270 / 9297 / 9324).
   Cards 5–8 = approved copy carried over from the old EventsExperiences.tsx;
   they have no artwork in this Figma. */
const EXPERIENCES: Experience[] = [
  {
    title: "Murder Mystery",
    cats: ["under-60", "big-groups"],
    rating: "4.9",
    minutes: "60",
    third: "10-500",
    thirdLabel: "Capacity",
    img: murderMystery,
    alt: "Murder Mystery — a clay-style skull and crossbones on a golden yellow tile",
  },
  {
    title: "Taco Throwdown",
    cats: ["in-person"],
    rating: "4.8",
    minutes: "75",
    third: "In-person",
    thirdLabel: "Where",
    img: tacoThrowdown,
    alt: "Taco Throwdown — a plate of loaded tacos with lime and pickled onion on a lime-green background",
  },
  {
    title: "Candle Making",
    cats: ["hybrid", "under-60"],
    rating: "5.0",
    minutes: "60",
    third: "Ship-to-home",
    thirdLabel: "Where",
    img: candleMaking,
    alt: "Candle Making — a flat lay of candle supplies: pink wax pearls, poured candles, wick, scissors and dried flowers",
  },
  {
    title: "Trivia Royale",
    cats: ["under-60", "big-groups"],
    rating: "4.9",
    minutes: "45",
    third: "Up to 1,000",
    thirdLabel: "Capacity",
    img: triviaRoyale,
    alt: "Trivia Royale — a 3D illustration of a person at a desk raising their hand to answer",
  },
  {
    title: "Wine & Paint Night",
    cats: ["hybrid", "under-60"],
    rating: "4.8",
    minutes: "60",
    third: "Ship-to-home",
    thirdLabel: "Where",
  },
  {
    title: "Escape Room",
    cats: ["under-60"],
    rating: "4.9",
    minutes: "50",
    third: "Teams of 6",
    thirdLabel: "Capacity",
  },
  {
    title: "Comedy Hour",
    cats: ["under-60", "big-groups"],
    rating: "4.7",
    minutes: "45",
    third: "Up to 500",
    thirdLabel: "Capacity",
  },
  {
    title: "Chef’s Table",
    cats: ["in-person"],
    rating: "5.0",
    minutes: "90",
    third: "10–40",
    thirdLabel: "Capacity",
  },
];

/* Figma "grid-card-active-shadow" (4 stacked drop shadows) sits on the image
   block inside each card; the card itself carries the resting 0 3 6 / 6%. */
const SHADOW_IMAGE =
  "shadow-[0px_20px_20px_-2px_rgba(0,0,0,0.15),0px_6.383px_6.383px_-1.5px_rgba(0,0,0,0.12),0px_2.415px_2.415px_-1px_rgba(0,0,0,0.11),0px_0.796px_0.796px_-0.5px_rgba(0,0,0,0.1)]";
const SHADOW_CARD = "shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]";

/* lucide icons exactly as exported from Figma (12×12 stat glyphs 2504:9251 /
   9258 / 9265, 24×24 nav arrows 2504:9353 / 9356). */
function StarIcon() {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="#6B6C71"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3 shrink-0"
      aria-hidden
    >
      <path d="M5.76242 1.1472C5.78433 1.10293 5.81818 1.06567 5.86015 1.03962C5.90212 1.01356 5.95053 0.999756 5.99992 0.999756C6.04932 0.999756 6.09773 1.01356 6.1397 1.03962C6.18166 1.06567 6.21551 1.10293 6.23742 1.1472L7.39242 3.4867C7.46851 3.64069 7.58083 3.77391 7.71974 3.87493C7.85864 3.97595 8.01999 4.04176 8.18992 4.0667L10.7729 4.4447C10.8219 4.45179 10.8678 4.47244 10.9057 4.5043C10.9435 4.53617 10.9716 4.57798 10.9869 4.62501C11.0022 4.67204 11.0041 4.72241 10.9922 4.77042C10.9804 4.81844 10.9553 4.86218 10.9199 4.8967L9.05192 6.7157C8.92873 6.83575 8.83656 6.98394 8.78334 7.14752C8.73012 7.31109 8.71745 7.48515 8.74642 7.6547L9.18742 10.2247C9.19606 10.2736 9.19078 10.324 9.17217 10.37C9.15357 10.4161 9.12239 10.456 9.0822 10.4852C9.042 10.5144 8.99441 10.5317 8.94486 10.5352C8.8953 10.5386 8.84577 10.528 8.80192 10.5047L6.49292 9.2907C6.34078 9.21082 6.17151 9.16908 5.99967 9.16908C5.82783 9.16908 5.65856 9.21082 5.50642 9.2907L3.19792 10.5047C3.15409 10.5279 3.10462 10.5383 3.05515 10.5348C3.00568 10.5313 2.95818 10.514 2.91807 10.4848C2.87796 10.4556 2.84684 10.4158 2.82825 10.3698C2.80966 10.3238 2.80435 10.2736 2.81292 10.2247L3.25342 7.6552C3.28252 7.48557 3.26992 7.3114 3.21669 7.14773C3.16347 6.98405 3.07123 6.83578 2.94792 6.7157L1.07992 4.8972C1.04422 4.86272 1.01892 4.8189 1.0069 4.77074C0.994889 4.72258 0.996642 4.67201 1.01196 4.6248C1.02728 4.57758 1.05556 4.53562 1.09356 4.50369C1.13157 4.47177 1.17778 4.45115 1.22692 4.4442L3.80942 4.0667C3.97955 4.04195 4.14112 3.97623 4.28022 3.8752C4.41931 3.77416 4.53178 3.64084 4.60792 3.4867L5.76242 1.1472Z" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="#6B6C71"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3 shrink-0"
      aria-hidden
    >
      <path d="M6 3V6L8 7M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="#6B6C71"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3 shrink-0"
      aria-hidden
    >
      <path d="M8 10.5V9.5C8 8.96957 7.78929 8.46086 7.41421 8.08579C7.03914 7.71071 6.53043 7.5 6 7.5H3C2.46957 7.5 1.96086 7.71071 1.58579 8.08579C1.21071 8.46086 1 8.96957 1 9.5V10.5M8 1.564C8.42888 1.67518 8.8087 1.92563 9.07984 2.27603C9.35098 2.62643 9.4981 3.05694 9.4981 3.5C9.4981 3.94306 9.35098 4.37357 9.07984 4.72397C8.8087 5.07437 8.42888 5.32482 8 5.436M11 10.5V9.5C10.9997 9.05686 10.8522 8.62639 10.5807 8.27616C10.3092 7.92593 9.92906 7.67578 9.5 7.565M6.5 3.5C6.5 4.60457 5.60457 5.5 4.5 5.5C3.39543 5.5 2.5 4.60457 2.5 3.5C2.5 2.39543 3.39543 1.5 4.5 1.5C5.60457 1.5 6.5 2.39543 6.5 3.5Z" />
    </svg>
  );
}
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
  icon,
  value,
  label,
  grow,
}: {
  icon: ReactNode;
  value: string;
  label: string;
  grow?: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-1.5 ${grow ? "min-w-0 flex-1" : "shrink-0"}`}
    >
      <span className="flex items-center pt-[2px]">{icon}</span>
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

  const shown =
    filter === "all"
      ? EXPERIENCES
      : EXPERIENCES.filter((e) => e.cats.includes(filter));

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
                  className={`w-full overflow-hidden rounded-b-[1.5rem] rounded-t-[0.5rem] ${SHADOW_IMAGE}`}
                >
                  {x.img ? (
                    <Image
                      src={x.img}
                      alt={x.alt ?? ""}
                      quality={100}
                      className="h-[15.625rem] w-full rounded-[1.25rem] object-cover"
                      sizes="(min-width:1024px) 17rem, 16.5rem"
                    />
                  ) : (
                    <div
                      className="h-[15.625rem] w-full rounded-[1.25rem] bg-[#e0e0e0]"
                      aria-hidden
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col px-4 pb-8 pt-10">
                  <h3 className="font-[family-name:var(--font-satoshi)] text-[1.25rem] font-bold leading-[1.04] tracking-[-0.01875rem] text-[#16171b]">
                    {x.title}
                  </h3>
                </div>

                <div className="flex items-start gap-2 rounded-[1rem] bg-[#f7f7f7] p-4">
                  <Stat icon={<StarIcon />} value={x.rating} label="Rating" />
                  <Stat
                    icon={<ClockIcon />}
                    value={x.minutes}
                    label="Minutes"
                  />
                  <Stat
                    icon={<UsersIcon />}
                    value={x.third}
                    label={x.thirdLabel}
                    grow
                  />
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
