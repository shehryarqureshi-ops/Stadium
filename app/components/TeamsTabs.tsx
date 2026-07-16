"use client";

import teamPhoto from "@/public/teams-marketing.png";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useState } from "react";
import { useAutoAdvance } from "./useAutoAdvance";

/* "Built for every role" — synced to Figma 2:37377. Centered header, a pill
   tab-container (active = dark), and a rounded card with a left photo + right
   content (32px title, +-bulleted list, EXPLORE text link). Marketing copy is
   from the Figma; the other roles keep placeholder copy in the same shape. */

type Team = {
  name: string;
  tab: string;
  title: string;
  body: string;
  bullets: string[];
  photo: StaticImageData | null;
};

const teams: Team[] = [
  {
    name: "Marketing",
    tab: "Marketing",
    title: "Full brand control,\nat any scale",
    body: "Gift prospects, run campaigns, and keep every send on-brand. Logo, colors, and guidelines locked—no matter who’s placing the order.",
    bullets: [
      "Swag and gifts for customers",
      "Campaigns with tangible assets",
      "Run employer brand moments",
      "Trade show & event merchandise",
    ],
    photo: teamPhoto,
  },
  {
    name: "HR",
    tab: "Human Resources",
    title: "Run people programs\nat scale",
    body: "Onboarding, milestones, and recognition for every employee — automated from the systems you already run.",
    bullets: [
      "Automate onboarding kits",
      "Celebrate every milestone",
      "Run recognition programs",
      "Prove engagement impact",
    ],
    photo: null,
  },
  {
    name: "Operations",
    tab: "Operations",
    title: "Keep the machine\nrunning",
    body: "Vendors, inventory, and shipping consolidated into one pipeline you don’t have to babysit.",
    bullets: [
      "Consolidate your vendors",
      "Track inventory live",
      "Ship to 170+ countries",
      "Cut fulfillment tickets",
    ],
    photo: null,
  },
  {
    name: "Team Leaders",
    tab: "Team Leaders",
    title: "Celebrate your team,\nno admin",
    body: "Budgets, approvals, and sends scoped to your team — no procurement queue in the way.",
    bullets: [
      "Send in minutes",
      "Stay inside budget",
      "Let recipients choose",
      "See what landed",
    ],
    photo: null,
  },
  {
    name: "Finance",
    tab: "Finance",
    title: "Control every dollar\nof spend",
    body: "One wallet, clean reporting, and no surprise invoices — engagement spend that closes cleanly every month.",
    bullets: [
      "One company wallet",
      "Budget by team and region",
      "Clean tax handling",
      "Audit-ready reporting",
    ],
    photo: null,
  },
  {
    name: "Sales",
    tab: "Sales",
    title: "Open doors with\nmemorable sends",
    body: "Gifts and experiences that get prospects to reply — triggered straight from your CRM.",
    bullets: [
      "Break into target accounts",
      "Trigger sends from your CRM",
      "Stand out at events",
      "Tie sends to pipeline",
    ],
    photo: null,
  },
  {
    name: "C-Suite",
    tab: "C-Suite",
    title: "One platform,\nglobal leverage",
    body: "Engagement infrastructure that scales with headcount — instead of headcount scaling with it.",
    bullets: [
      "Consolidate spend",
      "Scale culture globally",
      "De-risk compliance",
      "Measure the return",
    ],
    photo: null,
  },
];

function PlusIcon() {
  return (
    <span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.6673 3.5L5.25065 9.91667L2.33398 7"
          stroke="black"
          strokeWidth="1.16667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function TeamsTabs() {
  const [active, setActive] = useState(0);
  const team = teams[active];

  /* Auto-cycle the roles (every 5s in view; pause on hover; click takes over). */
  const { sectionRef, takeOver } = useAutoAdvance(() =>
    setActive((i) => (i + 1) % teams.length),
  );
  const select = (i: number) => {
    takeOver();
    setActive(i);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white px-section-x-sm py-16 md:px-section-x-md md:py-24 lg:px-[6.25rem] lg:pb-[7.5rem] lg:pt-[7.5rem]"
    >
      {/* Stadium brand aurora — soft mesh gradient behind the header + card,
          replacing a flat grey gradient (Figma "symbol gradient" 2:37375 @ 33%). */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[46%] z-0 aspect-[2880/2708] w-[95rem] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-75"
        style={{
          backgroundImage: "url(/teams-aurora.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="relative z-10 mx-auto flex w-full max-w-[77.5rem] flex-col gap-10">
        {/* centered header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p
            data-animation="reveal"
            className="font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem] text-[#1b1b1b]/60"
          >
            Impact by Team
          </p>
          <h2
            data-animation="reveal"
            className="font-display text-heading-sm text-[#16171b] md:text-heading-md lg:text-[3.4375rem] lg:leading-[3.75rem] lg:tracking-[-0.075rem]"
          >
            Built for every role
          </h2>
        </div>

        {/* tab pill container */}
        <div data-animation="reveal" className="flex justify-center">
          <ul className="flex max-w-full gap-2.5 overflow-x-auto rounded-full border border-[#e0e0e0] bg-white/75 p-2.5 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {teams.map((t, i) => (
              <li key={t.name} className="shrink-0">
                <button
                  type="button"
                  onClick={() => select(i)}
                  aria-pressed={i === active}
                  className={`whitespace-nowrap rounded-full px-5 py-[0.8125rem] font-sans text-[0.75rem] font-bold uppercase tracking-[0.0625rem] transition-colors duration-200 cursor-pointer ${
                    i === active
                      ? "bg-[#16171b] text-white"
                      : "text-[#16171b] hover:bg-grey-100"
                  }`}
                >
                  {t.tab}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* card */}
        <div
          data-animation="reveal"
          className="flex flex-col gap-6 overflow-hidden rounded-[2rem] border border-[#e0e0e0] bg-white p-2.5 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)] lg:flex-row lg:gap-[3.75rem]"
        >
          {/* photo */}
          <div className="relative aspect-[580/481] w-full shrink-0 overflow-hidden rounded-xl bg-grey-200 lg:w-[48%]">
            {team.photo ? (
              <Image
                src={team.photo}
                alt=""
                fill
                sizes="(min-width:64rem) 36rem, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-grey-100">
                <span className="font-display text-[1.25rem] font-bold text-grey-400">
                  {team.name}
                </span>
              </div>
            )}
          </div>

          {/* content */}
          <div className="flex flex-col justify-center gap-8 pb-6 pr-2 lg:py-[3.75rem] lg:pr-10">
            <div className="flex flex-col gap-5">
              <h3 className="whitespace-pre-line font-display text-[2rem] font-bold leading-[2.375rem] text-[#16171b]">
                {team.title}
              </h3>
              <p className="max-w-[34rem] font-sans text-[1rem] leading-6 text-[#828282]">
                {team.body}
              </p>
            </div>
            <ul className="flex flex-col gap-3">
              {team.bullets.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <PlusIcon />
                  <span className="font-sans text-[1rem] font-semibold text-ink">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="font-sans text-[0.75rem] font-bold uppercase tracking-[0.0625rem] text-[#16171b] underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              Explore {team.name}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
