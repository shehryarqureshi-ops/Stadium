"use client";

import { useState } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import teamPhoto from "@/public/teams-marketing.png";
import { useAutoAdvance } from "./useAutoAdvance";

/* Marketing content is from Figma; the other six teams' content is INVENTED
   (only the tab pills exist in Figma) and their photos use the design
   system's PENDING ASSET placeholder. Replace when designed. */

type Team = {
  name: string;
  /** Desktop intro title */
  title: string;
  /** Desktop intro body */
  body: string;
  /** Shorter mobile/tablet body */
  mobileBody: string;
  features: { title: string; desc: string }[];
  cta: string;
  photo: StaticImageData | null;
  photoAlt: string;
};

const teams: Team[] = [
  {
    name: "Marketing",
    title: "Run brand at scale.",
    body: "Launch campaigns, gift prospects, and amplify brand moments at scale. Everything a marketing team needs to turn audiences into customers.",
    mobileBody:
      "Launch campaigns, gift prospects, and amplify brand moments at scale. Everything on-brand, shipped worldwide.",
    features: [
      {
        title: "Gift prospects at scale",
        desc: "Branded boxes, bulk sends, and personalized touches that turn leads into conversations.",
      },
      {
        title: "Run employer brand moments",
        desc: "Conference swag, candidate welcome kits, and campaign merch — all on-brand, all on time.",
      },
      {
        title: "Campaigns with tangible assets",
        desc: "Event activations, webinar incentives, and field marketing shipped globally.",
      },
      {
        title: "Track ROI on every send",
        desc: "Spend by campaign, team, and region with clean reporting built into the platform.",
      },
    ],
    cta: "Explore marketing",
    photo: teamPhoto,
    photoAlt: "Marketing team presenting branded merchandise at an event booth",
  },
  {
    name: "Human Resources",
    title: "Run people programs at scale.",
    body: "Onboarding, milestones, and recognition for every employee — automated from the systems you already run.",
    mobileBody:
      "Onboarding, milestones, and recognition for every employee — automated end to end.",
    features: [
      {
        title: "Automate onboarding kits",
        desc: "New hires welcomed on day one, in any country.",
      },
      {
        title: "Celebrate every milestone",
        desc: "Birthdays and anniversaries triggered from your HRIS — never missed.",
      },
      {
        title: "Run recognition programs",
        desc: "Kudos and rewards tied to your company values.",
      },
      {
        title: "Prove engagement impact",
        desc: "Participation and redemption reporting in one view.",
      },
    ],
    cta: "Explore HR",
    photo: null,
    photoAlt: "",
  },
  {
    name: "Operations",
    title: "Keep the machine running.",
    body: "Vendors, inventory, and shipping consolidated into one pipeline you don't have to babysit.",
    mobileBody:
      "Vendors, inventory, and shipping consolidated into one pipeline.",
    features: [
      {
        title: "Consolidate your vendors",
        desc: "One contract and one invoice replace dozens.",
      },
      {
        title: "Track inventory live",
        desc: "Warehouse counts without the spreadsheets.",
      },
      {
        title: "Ship anywhere",
        desc: "170+ countries with duties and customs handled.",
      },
      {
        title: "Cut fulfillment tickets",
        desc: "Address issues and re-ships resolved automatically.",
      },
    ],
    cta: "Explore operations",
    photo: null,
    photoAlt: "",
  },
  {
    name: "Team Leaders",
    title: "Celebrate your team without the admin.",
    body: "Budgets, approvals, and sends scoped to your team — no procurement queue in the way.",
    mobileBody: "Budgets, approvals, and sends for your team — no queue.",
    features: [
      {
        title: "Send in minutes",
        desc: "Pick, personalize, and ship without a ticket.",
      },
      {
        title: "Stay inside budget",
        desc: "Team allowances with approvals built in.",
      },
      {
        title: "Let recipients choose",
        desc: "Send choice, not guesses — they pick what lands.",
      },
      {
        title: "See what landed",
        desc: "Delivery and reactions, visible at a glance.",
      },
    ],
    cta: "Explore team leaders",
    photo: null,
    photoAlt: "",
  },
  {
    name: "Finance",
    title: "Control every dollar of engagement spend.",
    body: "One wallet, clean reporting, and no surprise invoices — engagement spend that closes cleanly every month.",
    mobileBody: "One wallet, clean reporting, no surprise invoices.",
    features: [
      {
        title: "One company wallet",
        desc: "Every send drawn from a single funded balance.",
      },
      {
        title: "Budget by team and region",
        desc: "Allocations and caps without spreadsheet policing.",
      },
      {
        title: "Clean tax handling",
        desc: "Duties, VAT, and import taxes calculated for you.",
      },
      {
        title: "Audit-ready reporting",
        desc: "Line-item visibility across every program.",
      },
    ],
    cta: "Explore finance",
    photo: null,
    photoAlt: "",
  },
  {
    name: "Sales",
    title: "Open doors with memorable sends.",
    body: "Gifts and experiences that get prospects to reply — triggered straight from your CRM.",
    mobileBody: "Gifts and experiences that get prospects to reply.",
    features: [
      {
        title: "Break into target accounts",
        desc: "Memorable sends that earn the first meeting.",
      },
      {
        title: "Trigger sends from your CRM",
        desc: "Stage changes launch gifts automatically.",
      },
      {
        title: "Stand out at events",
        desc: "Booth swag and follow-ups that keep momentum.",
      },
      {
        title: "Tie sends to pipeline",
        desc: "Influence tracked against revenue, not vibes.",
      },
    ],
    cta: "Explore sales",
    photo: null,
    photoAlt: "",
  },
  {
    name: "C-Suite",
    title: "One platform, global leverage.",
    body: "Engagement infrastructure that scales with headcount — instead of headcount scaling with it.",
    mobileBody: "Engagement infrastructure that scales with headcount.",
    features: [
      {
        title: "Consolidate spend",
        desc: "Every team's engagement budget under one roof.",
      },
      {
        title: "Scale culture globally",
        desc: "The same moments, delivered in 170+ countries.",
      },
      {
        title: "De-risk compliance",
        desc: "Tax, customs, and data handled by the platform.",
      },
      {
        title: "Measure the return",
        desc: "Engagement outcomes reported like any other KPI.",
      },
    ],
    cta: "Explore for c-suite",
    photo: null,
    photoAlt: "",
  },
];

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 10.5 8.5 14 15 6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TeamsTabs() {
  const [active, setActive] = useState(0);
  const team = teams[active];

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
      className="mx-auto w-full max-w-section flex flex-col gap-6 bg-surface-base px-section-x-sm py-section-y-sm md:px-section-x-md md:py-section-y-md lg:gap-8 lg:px-section-x-lg lg:py-section-y-lg"
    >
      <style>{`
        .teams-panel-in { animation: teams-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes teams-in {
          from { opacity: 0; transform: translateY(0.5rem); }
          to { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .teams-panel-in { animation: none; }
        }
      `}</style>

      {/* Eyebrow + heading — lg:pb-4 widens heading→tabs to 48 (normalization
          2026-06-12) while the section gap keeps tabs→panel at 32 */}
      <div className="flex flex-col gap-2 text-ink lg:pb-4">
        <p className="font-sans text-eyebrow-sm uppercase tracking-[0.045rem] md:text-eyebrow-lg md:tracking-[0.06rem] lg:tracking-[0.1rem]">
          Built for every team
        </p>
        <h2 className="font-display text-heading-sm md:text-heading-md lg:max-w-[40.625rem] lg:text-heading-lg">
          One solution for all your teams
        </h2>
      </div>

      {/* Tab row */}
      <ul className="flex w-full gap-2 overflow-x-auto [scrollbar-width:none] md:gap-[0.625rem] lg:gap-4 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
        {teams.map((t, i) => (
          <li key={t.name} className="shrink-0">
            <button
              type="button"
              onClick={() => select(i)}
              aria-pressed={i === active}
              className={`flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-4 py-3 font-sans text-label transition-colors duration-200 md:px-6 md:py-2 ${
                i === active
                  ? "bg-grey-200 text-ink"
                  : "text-grey-500 hover:text-ink"
              }`}
            >
              {t.name}
            </button>
          </li>
        ))}
      </ul>

      {/* Active panel — bordered card: photo flush-left, content padded-right
          (structure per Figma 813:48731; feature list as a checklist). */}
      <div
        key={team.name}
        className="teams-panel-in flex flex-col overflow-hidden rounded-card border border-grey-200 bg-surface-base shadow-card-soft lg:flex-row lg:items-stretch"
      >
        {/* Photo — flush to the card edges (PENDING placeholder when undesigned) */}
        <div className="relative h-[12.5rem] w-full shrink-0 bg-grey-200 md:h-[20rem] lg:h-auto lg:w-2/5 lg:self-stretch">
          {team.photo ? (
            <Image
              src={team.photo}
              alt={team.photoAlt}
              fill
              sizes="(min-width: 64rem) 30rem, (min-width: 48rem) calc(100vw - 6rem), calc(100vw - 3rem)"
              className="object-cover"
            />
          ) : (
            <div className="relative h-full w-full border border-dashed border-[#8c94a6] bg-[#f0f0f7]">
              <span className="absolute left-[0.6875rem] top-[0.6875rem] inline-flex items-center gap-1.5 rounded-full bg-accent-turmeric px-2 py-1">
                <span
                  className="size-[0.3125rem] rounded-full bg-[#04050b]"
                  aria-hidden
                />
                <span className="font-display text-[0.5625rem] font-bold tracking-[0.045rem] text-[#04050b]">
                  PENDING ASSET
                </span>
              </span>
            </div>
          )}
        </div>

        {/* Content — eyebrow + title + body + checklist + CTA */}
        <div className="flex flex-1 flex-col gap-4 p-6 md:gap-5 md:p-8 lg:gap-6 lg:p-10">
          <div className="flex flex-col gap-2">
            <p className="font-sans text-eyebrow-sm uppercase tracking-[0.1rem] text-accent-water">
              {team.name}
            </p>
            <h3 className="font-display text-heading-sm text-ink lg:text-heading-md">
              {team.title}
            </h3>
          </div>

          {/* Body — short on mobile/tablet, full on desktop */}
          <p className="font-sans text-body-md text-grey-600 md:text-statement-md lg:hidden">
            {team.mobileBody}
          </p>
          <p className="hidden font-sans text-body-md text-ink lg:block">
            {team.body}
          </p>

          {/* Feature checklist — check + label (Figma 813:48731) */}
          <ul className="flex flex-col gap-3">
            {team.features.map((feature) => (
              <li key={feature.title} className="flex items-center gap-3">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-water text-cta-on">
                  <CheckIcon className="size-3" />
                </span>
                <span className="font-sans text-body-md font-medium text-ink">
                  {feature.title}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#"
            className="inline-flex h-button-h w-full items-center justify-center self-start rounded-button bg-cta-fill px-button-x font-sans text-button-primary uppercase text-cta-on shadow-button md:w-fit"
          >
            {team.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
