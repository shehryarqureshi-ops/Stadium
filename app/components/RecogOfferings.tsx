"use client";

/* /recognition · SIX WAYS (Figma n9SjmDjzB1PeZAYJ5w43fr → 2504:8107 "six ways",
   inside page frame 2504:6746, y 4160..4938 at 1440). "Ways to recognize great
   work" — a centered 44px title (NO eyebrow, NO subhead here), a 4-tab pill
   switcher (KUDOS PROGRAMS (default) / MILESTONE PROGRAMS / INCENTIVES /
   SERVICE AWARDS) on a #f2f2f2 pill, and a #f2f2f2 band: the kudos mockup left
   (580×403, r24), copy + checklist + underlined CTA right.
   Figma only draws the Kudos Programs state — the other three tabs' copy is the
   APPROVED copy already shipped on the old /recognition page (its SwagWorkflow
   `workflowContent.tabs`), and, lacking their own art in Figma, they share the
   kudos mockup (as the old component shared one image).

   Figma stack (y relative to the section frame, 1440):
     title (44 / 1.08 / -0.5)      y=0    h=48   (2504:8110)
     gap 40
     tab pill (p10, gap10, r100)   y=88   h=62   (tabs px20 py13, 12/16 +1px)
     gap 45
     band card (#f2f2f2, r32, p10) y=195  h=423  (2504:8122)
       photo 580×403 r24 · gap 60 · text col py-60 gap-32:
         h3 32/40 → 18 → body 16/1.5 → 32 → list (gap 12, pb 8) → 32 → CTA 12/16
     content end 618 · frame end 778 (= the 160 gap to "Platform" at 4937.5)
   Site: py-20 (80) top/bottom, so the visible gap to both neighbours is 160.
   Container: site 1200 (Figma draws 1240 @ x=100) — inner proportions kept. */

import { useRef, useState, type KeyboardEvent } from "react";
import Image, { type StaticImageData } from "next/image";
import kudos from "@/public/recog2/rc-offerings-kudos.jpg";

type Tab = {
  label: string;
  title: string;
  desc: string[];
  points: string[];
  cta: string;
  img: StaticImageData;
  alt: string;
};

const KUDOS_ALT =
  "A woman working at a sunlit desk, with two Stadium kudos cards floating over the photo — Maya thanking @Daniel for shipping a launch early, and Marcus giving @Vonn G +100 points for the team dashboard";

/* Tab 0 = exact Figma copy (2504:8168–8185). Tabs 1–3 = the approved copy that
   already ships on /recognition (app/recognition/page.tsx → workflowContent). */
const TABS: Tab[] = [
  {
    label: "Kudos PROGRAMS",
    title: "Recognition beyond the top-down",
    desc: [
      "Teammates give real-time kudos that turn into points and rewards, building a culture of appreciation across the team.",
    ],
    points: [
      "Integrate with Slack or Teams",
      "Tied to company values",
      "Recognition in real time",
    ],
    cta: "explore kudos PROGRAMS",
    img: kudos,
    alt: KUDOS_ALT,
  },
  {
    label: "Milestone Programs",
    title: "Milestones that never slip",
    desc: [
      "Birthdays, work anniversaries, and new hires — celebrated automatically.",
      "Set it once; every milestone ships itself.",
    ],
    points: [
      "Automate anniversaries, birthdays, and onboarding.",
      "Personalized rewards for every milestone.",
      "Never miss a moment across time zones.",
    ],
    cta: "See milestones",
    img: kudos,
    alt: KUDOS_ALT,
  },
  {
    label: "Incentives",
    title: "Incentives that move the needle",
    desc: [
      "Reward the behaviors that matter — sales wins, referrals, and goals.",
      "Points and rewards employees actually want.",
    ],
    points: [
      "Run spot bonuses, contests, and SPIFFs.",
      "Reward performance with real, redeemable value.",
      "Track impact against every program.",
    ],
    cta: "Explore incentives",
    img: kudos,
    alt: KUDOS_ALT,
  },
  {
    label: "Service Awards",
    title: "Service awards worth the wait",
    desc: [
      "Mark 1, 5, and 10 years with rewards that feel significant.",
      "A premium moment, handled end to end.",
    ],
    points: [
      "Curated award tiers by years of service.",
      "Personalized selection for every recipient.",
      "Global fulfillment with tracking included.",
    ],
    cta: "See service awards",
    img: kudos,
    alt: KUDOS_ALT,
  },
];

const DEFAULT_TAB = 0; // Kudos Programs — the state Figma draws

/* lucide/check exactly as exported from Figma (2504:8173, 14×14, 1.1667 stroke). */
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

export default function RecogOfferings() {
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
    <section
      aria-labelledby="recog-offerings-heading"
      className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-20"
    >
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        <h2
          id="recog-offerings-heading"
          data-animation="reveal"
          className="text-center font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
        >
          Ways to recognize great work
        </h2>

        {/* tab bar — scrolls horizontally below lg (680px pill), centred at lg.
           The negative margins + padding keep the focus ring unclipped. */}
        <div
          data-animation="reveal"
          className="-mx-section-x-sm -mb-3 -mt-2 w-[calc(100%+2rem)] overflow-x-auto px-section-x-sm pb-3 pt-2 [scrollbar-width:none] md:-mx-section-x-md md:w-[calc(100%+3.75rem)] md:px-section-x-md lg:mx-0 lg:mb-0 lg:mt-0 lg:flex lg:w-full lg:justify-center lg:overflow-visible lg:px-0 lg:pb-0 lg:pt-0 [&::-webkit-scrollbar]:hidden"
        >
          <div
            role="tablist"
            aria-label="Ways to recognize great work"
            className="flex w-max items-center gap-2.5 rounded-[100px] bg-[#f2f2f2] p-2.5"
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
                  id={`recog-offering-tab-${i}`}
                  aria-selected={isActive}
                  aria-controls="recog-offering-panel"
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
          id="recog-offering-panel"
          role="tabpanel"
          aria-labelledby={`recog-offering-tab-${active}`}
          className="flex w-full flex-col gap-6 rounded-[2rem] bg-[#f2f2f2] p-2.5 lg:mt-[0.3125rem] lg:flex-row lg:items-start lg:gap-[3.75rem]"
        >
          <div className="relative aspect-[580/403] w-full shrink-0 overflow-hidden rounded-[1.5rem] lg:aspect-auto lg:h-[25.1875rem] lg:min-w-0 lg:flex-1 lg:basis-0">
            <Image
              key={t.img.src}
              src={t.img}
              alt={t.alt}
              fill
              quality={100}
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
                    <span className="font-sans text-[0.9375rem] leading-[1.4] text-[#16171b]">
                      {p}
                    </span>
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
