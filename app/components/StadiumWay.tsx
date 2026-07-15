"use client";

import { useState } from "react";
import { useAutoAdvance } from "./useAutoAdvance";

/* "We build your program in four phases" — synced to Figma 2:33499
   ("The Stadium Way — Double Tab"). A phase accordion on the LEFT (active card =
   white + shadow, number/title in Satoshi 20; inactive = greyed, vertically
   centered); each phase owns a DECK shown as a coverflow on the RIGHT (active
   card prominent, neighbors scaled + frosted, ‹ › arrows, dots). A 5-band
   rainbow divider closes the section (Figma node 2:33647). Auto-advances the
   deck then the next phase (5s, pause on hover, click takes over).

   NOTE: Figma sets the accordion number/title in Satoshi *Medium* 20; the app
   ships a single Satoshi weight (Bold), so these render Bold at the matched
   size/colors. Add Satoshi-Medium.woff2 + a font token to close that last gap. */

type MockItem = {
  icon?: string;
  label: string;
  sub?: string;
  badge?: string;
  active?: boolean;
};
type Mock = { header: string; meta: string; accent: string; items: MockItem[] };
type Card = {
  tag: string;
  mockTitle: string;
  desc: string;
  mock?: Mock;
  image?: string;
};
type Phase = { num: string; title: string; desc: string; cards: Card[] };

const PHASES: Phase[] = [
  {
    num: "01",
    title: "Setup your workspace",
    desc: "Connect Slack and Teams so recognition and rewards reach people in the tools they already use and celebrate each win.",
    cards: [
      {
        image: "/sw-card-1-roles.svg",
        tag: "Setup · Team",
        mockTitle: "Invite your team",
        desc: "Add members and assign who does what.",
      },
      {
        image: "/sw-card-2-permissions.svg",
        tag: "Setup · Permissions",
        mockTitle: "Roles & permissions",
        desc: "Scope send, approve, and spend per person.",
      },
      {
        image: "/sw-card-3-wallet.svg",
        tag: "Setup · Wallet",
        mockTitle: "Fund your wallet",
        desc: "One balance for every send, topped up your way.",
      },
      {
        image: "/sw-card-4-integrations.svg",
        tag: "Setup · Integrations",
        mockTitle: "Connect your stack",
        desc: "Sync your HRIS, CRM, and the tools you run.",
      },
      {
        image: "/sw-card-5-slack.svg",
        tag: "Setup · Slack",
        mockTitle: "Install in Slack",
        desc: "Bring Stadium into the tools your team lives in.",
      },
      {
        image: "/sw-card-6-sso.svg",
        tag: "Setup · SSO",
        mockTitle: "Single sign-on",
        desc: "Secure access through your identity provider.",
      },
    ],
  },
  {
    num: "02",
    title: "Assembly",
    desc: "Kitting, warehousing, and carrier routing configured across every market you ship to.",
    cards: [
      {
        tag: "Assembly · Week 1",
        mockTitle: "Global fulfillment",
        desc: "Warehousing and kitting configured across every market you ship to.",
        mock: {
          header: "Shipments",
          meta: "12 in transit",
          accent: "#3ecf8e",
          items: [
            {
              label: "Welcome kits · US",
              sub: "Out for delivery",
              badge: "✓",
              active: true,
            },
            { label: "Branded swag · EU" },
            { label: "Snack boxes · APAC" },
            { label: "Gift cards · LATAM" },
          ],
        },
      },
      {
        tag: "Assembly · Week 2",
        mockTitle: "Carrier routing",
        desc: "Least-cost carrier selection and live tracking on every parcel.",
        mock: {
          header: "Carriers",
          meta: "Auto-routed",
          accent: "#14b8a6",
          items: [
            { label: "DHL Express", sub: "2–4 days", active: true },
            { label: "FedEx" },
            { label: "UPS" },
            { label: "Local last-mile" },
          ],
        },
      },
      {
        tag: "Assembly · Week 3",
        mockTitle: "Customs & duties",
        desc: "HS codes, VAT, and duties calculated so nothing gets stuck at the border.",
        mock: {
          header: "Compliance",
          meta: "170+ countries",
          accent: "#0ea5e9",
          items: [
            { label: "HS codes", sub: "Auto-classified", active: true },
            { label: "VAT & GST" },
            { label: "Import duties" },
            { label: "Restricted items" },
          ],
        },
      },
    ],
  },
  {
    num: "03",
    title: "Engage",
    desc: "Automate recognition, rewards, and every milestone moment.",
    cards: [
      {
        tag: "Engage · Month 2",
        mockTitle: "Automations",
        desc: "Trigger sends on hires, milestones, and moments — the busywork runs itself.",
        mock: {
          header: "Automations",
          meta: "6 active",
          accent: "#8b5cff",
          items: [
            {
              label: "New hire → Welcome kit",
              sub: "Runs on hire date",
              active: true,
            },
            { label: "Anniversary → Gift" },
            { label: "Milestone → Reward" },
            { label: "Event → Swag drop" },
          ],
        },
      },
      {
        tag: "Engage · Month 2",
        mockTitle: "Recognition",
        desc: "Kudos, points, and rewards tied to the values your company already runs.",
        mock: {
          header: "Recognition",
          meta: "This week",
          accent: "#a855f7",
          items: [
            { label: "Kudos sent", sub: "1,204", active: true },
            { label: "Points redeemed", sub: "8,900" },
            { label: "Top value", sub: "Ownership" },
            { label: "Participation", sub: "82%" },
          ],
        },
      },
      {
        tag: "Engage · Month 3",
        mockTitle: "Moments",
        desc: "Birthdays, anniversaries, and life events celebrated — never missed.",
        mock: {
          header: "Upcoming",
          meta: "Next 30 days",
          accent: "#d946ef",
          items: [
            { label: "Birthdays", sub: "18", active: true },
            { label: "Work anniversaries", sub: "7" },
            { label: "New hires", sub: "12" },
            { label: "Holidays", sub: "2" },
          ],
        },
      },
    ],
  },
  {
    num: "04",
    title: "90 Day World",
    desc: "Report, reorder, and refine — continuously.",
    cards: [
      {
        tag: "90 Day World · Day 90",
        mockTitle: "Reporting",
        desc: "See spend, engagement, and reach across every program in one view.",
        mock: {
          header: "Reporting",
          meta: "Last 90 days",
          accent: "#f59e0b",
          items: [
            { label: "Spend", sub: "$142K this quarter", active: true },
            { label: "Engagement", sub: "87% claim rate" },
            { label: "Reach", sub: "18 markets" },
            { label: "Redemptions", sub: "9,240 sent" },
          ],
        },
      },
      {
        tag: "90 Day World · Ongoing",
        mockTitle: "Reorder",
        desc: "Restock and rerun any saved program in a single click.",
        mock: {
          header: "Programs",
          meta: "Saved",
          accent: "#f97316",
          items: [
            {
              label: "Q4 Holiday drop",
              sub: "Ready to rerun",
              badge: "↻",
              active: true,
            },
            { label: "New hire kits" },
            { label: "Anniversary gifts" },
            { label: "Event swag" },
          ],
        },
      },
      {
        tag: "90 Day World · Ongoing",
        mockTitle: "Optimize",
        desc: "Refine with the data and do more of what actually lands.",
        mock: {
          header: "Insights",
          meta: "AI suggestions",
          accent: "#eab308",
          items: [
            { label: "Top gift", sub: "Premium snacks", active: true },
            { label: "Best send window", sub: "Tue 10am" },
            { label: "Top region", sub: "US-West" },
            { label: "Suggested budget", sub: "+12%" },
          ],
        },
      },
    ],
  },
];

const N = PHASES.length;

/* Figma 2:33647 — 5 equal 240×4 bands spanning the 1200px content width. */
const RAINBOW = ["#8d12e7", "#0b7afc", "#ffb800", "#ff5b77", "#00c036"];

function PlusCircle() {
  return (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e8e9ed] text-[#9aa0ac]">
      <svg
        viewBox="0 0 16 16"
        className="size-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        aria-hidden
      >
        <path d="M8 3.5v9M3.5 8h9" />
      </svg>
    </span>
  );
}
function CloseCircle() {
  return (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-black text-white">
      <svg
        viewBox="0 0 16 16"
        className="size-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        aria-hidden
      >
        <path d="m4.5 4.5 7 7M11.5 4.5l-7 7" />
      </svg>
    </span>
  );
}
function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5 text-ink"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={dir === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  );
}

function MockPanel({ mock }: { mock: Mock }) {
  return (
    <div className="flex flex-col gap-2 bg-gradient-to-b from-[#eef2f8] to-white p-4">
      <div className="flex items-center justify-between px-1">
        <span className="font-sans text-[0.9375rem] font-bold text-ink">
          {mock.header}
        </span>
        <span className="font-sans text-[0.75rem] text-grey-400">
          {mock.meta}
        </span>
      </div>
      {mock.items.map((it, i) => (
        <div
          key={i}
          className="flex items-center gap-2.5 rounded-lg px-2 py-2"
          style={it.active ? { background: `${mock.accent}1a` } : undefined}
        >
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-full font-sans text-[0.9375rem] font-bold"
            style={
              it.active
                ? { background: mock.accent, color: "#fff" }
                : { background: "#f1f2f4", color: "#9aa0ac" }
            }
          >
            {it.icon ?? ""}
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span
              className={`font-sans text-[0.875rem] ${it.active ? "font-semibold text-ink" : "text-grey-400"}`}
            >
              {it.label}
            </span>
            {it.sub && (
              <span className="font-sans text-[0.75rem] text-grey-400">
                {it.sub}
              </span>
            )}
          </span>
          {it.badge && (
            <span
              className="flex size-5 shrink-0 items-center justify-center rounded-full font-sans text-[0.625rem] font-bold text-white"
              style={{ background: mock.accent }}
            >
              {it.badge}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/* Card chrome synced to Figma 2:33599 / 2:33545: radius 16, subtle border,
   image area rounded-xl, then eyebrow (Overpass Bold 10 · #1b1b1b/60) / title
   (Satoshi Bold 24) / description (Overpass 16 · #1b1b1b/60). */
function DeckCard({ card }: { card: Card }) {
  return (
    <div className="flex flex-col gap-8 overflow-hidden rounded-2xl border border-[#ededed] bg-white p-4 pb-8 shadow-[0_12px_32px_-10px_rgba(16,24,40,0.18)]">
      <div className="overflow-hidden rounded-xl">
        {card.image ? (
          <div className="aspect-[313/340] w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.image}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          card.mock && <MockPanel mock={card.mock} />
        )}
      </div>
      <div className="flex flex-col gap-2 px-1">
        <p className="font-sans text-[0.625rem] font-bold uppercase leading-3 tracking-[0.0625rem] text-[#1b1b1b]/60">
          {card.tag}
        </p>
        <h3 className="font-display text-2xl leading-7 text-[#1b1b1b]">
          {card.mockTitle}
        </h3>
        <p className="font-sans text-[1rem] leading-6 tracking-[0.015em] text-[#1b1b1b]/60">
          {card.desc}
        </p>
      </div>
    </div>
  );
}

export default function StadiumWay() {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [cardIdx, setCardIdx] = useState(0);
  const deck = PHASES[phaseIdx].cards;

  /* Auto-advance: next card in the deck, then roll to the next phase. */
  const advance = () => {
    if (cardIdx < PHASES[phaseIdx].cards.length - 1) {
      setCardIdx(cardIdx + 1);
    } else {
      setPhaseIdx((phaseIdx + 1) % N);
      setCardIdx(0);
    }
  };
  const { sectionRef, takeOver } = useAutoAdvance(advance);

  const selectPhase = (i: number) => {
    takeOver();
    setPhaseIdx(i);
    setCardIdx(0);
  };
  const selectCard = (c: number) => {
    takeOver();
    setCardIdx(((c % deck.length) + deck.length) % deck.length);
  };

  return (
    <section ref={sectionRef} className="rounded-t-[2.5rem] bg-white">
      <div className="mx-auto w-full max-w-section px-section-x-sm pt-16 md:px-section-x-md md:pt-24 lg:px-section-x-lg lg:pt-[7.5rem]">
        <div className="flex flex-col gap-12">
          {/* centered header (Figma 2:33501) */}
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <p
                data-animation="reveal"
                className="font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem] text-[#1b1b1b]/60"
              >
                The Stadium Way
              </p>
              <h2
                data-animation="reveal"
                className="font-display text-heading-sm text-[#1b1b1b] md:text-heading-md lg:text-[3.4375rem] lg:leading-[3.75rem] lg:tracking-[-0.075rem]"
              >
                We build your program
                <br className="hidden md:block" /> in four phases
              </h2>
            </div>
            <p
              data-animation="reveal"
              className="max-w-[32rem] font-sans text-body-md leading-7 tracking-[0.015em] text-[#1b1b1b]/60 lg:text-[1.125rem]"
            >
              Tell us your goals. We configure the platform, manage the rollout,
              and support through go-live.
            </p>
          </div>

          {/* grey panel — top-aligned columns (Figma 2:33506, counter MIN) */}
          <div
            data-animation="reveal"
            className="flex flex-col gap-8 rounded-[1.5rem] bg-[#f2f2f2] p-2.5 lg:flex-row lg:items-stretch lg:gap-[3.75rem]"
          >
            {/* left rail — phase accordion (372px) */}
            <div className="flex shrink-0 flex-col gap-2.5 lg:w-[23.25rem] lg:self-stretch">
              {PHASES.map((p, i) => {
                const on = i === phaseIdx;
                return (
                  <button
                    key={p.num}
                    type="button"
                    onClick={() => selectPhase(i)}
                    aria-expanded={on}
                    className={`rounded-xl bg-white px-7 pb-[1.875rem] pt-7 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-water ${
                      on
                        ? "shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]"
                        : "lg:flex-1"
                    }`}
                  >
                    {on ? (
                      <span className="flex flex-col gap-7">
                        <span className="flex items-center justify-between gap-3">
                          <span className="flex items-baseline gap-3">
                            <span className="font-[family-name:var(--font-satoshi-medium)] text-[1.25rem] leading-[1.05] text-[#8c92a6]">
                              {p.num}
                            </span>
                            <span className="font-[family-name:var(--font-satoshi-medium)] text-[1.25rem] leading-[1.05] text-[#16171b]">
                              {p.title}
                            </span>
                          </span>
                          <CloseCircle />
                        </span>
                        <span className="font-sans text-[0.875rem] leading-5 tracking-[0.01em] text-[#828282]">
                          {p.desc}
                        </span>
                      </span>
                    ) : (
                      <span className="flex h-full items-center justify-between gap-3">
                        <span className="flex items-baseline gap-3">
                          <span className="font-[family-name:var(--font-satoshi-medium)] text-[1.25rem] leading-[1.05] text-[#c5c8d3]">
                            {p.num}
                          </span>
                          <span className="font-[family-name:var(--font-satoshi-medium)] text-[1.25rem] leading-[1.05] text-[#a9adbc]">
                            {p.title}
                          </span>
                        </span>
                        <PlusCircle />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* coverflow — the ACTIVE phase's deck of cards */}
            <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-6 py-2 lg:py-4">
              <div className="relative h-[35rem] w-full [clip-path:inset(-200px_0px)]">
                {deck.map((cardItem, i) => {
                  const len = deck.length;
                  let d = i - cardIdx;
                  if (d > len / 2) d -= len;
                  if (d < -len / 2) d += len;
                  const cls =
                    d === 0
                      ? "left-1/2 z-20 -translate-x-1/2 scale-100 opacity-100"
                      : d === -1
                        ? "left-0 z-10 -translate-x-[54%] scale-[0.78] opacity-55 blur-[2px]"
                        : d === 1
                          ? "left-full z-10 -translate-x-[46%] scale-[0.78] opacity-55 blur-[2px]"
                          : "left-1/2 z-0 -translate-x-1/2 scale-75 opacity-0";
                  return (
                    <div
                      key={i}
                      aria-hidden={d !== 0}
                      className={`absolute top-1/2 w-[21.5rem] -translate-y-1/2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${cls} ${Math.abs(d) <= 1 ? "" : "pointer-events-none"}`}
                    >
                      <DeckCard card={cardItem} />
                    </div>
                  );
                })}
                {deck.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous card"
                      onClick={() => selectCard(cardIdx - 1)}
                      className="absolute left-1 top-1/2 z-30 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-grey-200 bg-white/85 shadow-[0_4px_12px_rgba(16,24,40,0.12)] backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                    >
                      <Chevron dir="left" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next card"
                      onClick={() => selectCard(cardIdx + 1)}
                      className="absolute right-1 top-1/2 z-30 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-grey-200 bg-white/85 shadow-[0_4px_12px_rgba(16,24,40,0.12)] backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                    >
                      <Chevron dir="right" />
                    </button>
                  </>
                )}
              </div>
              {/* dots = the cards in the active phase (8px · 10px gap · #d9d9d9) */}
              <div className="flex items-center gap-2.5">
                {deck.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Card ${i + 1}`}
                    onClick={() => selectCard(i)}
                    className={`size-2 rounded-full transition-colors ${i === cardIdx ? "bg-ink" : "bg-[#d9d9d9] hover:bg-grey-400"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* rainbow divider — 5 equal bands, 120px above (Figma 2:33647) */}
        <div className="mt-16 flex h-1 w-full md:mt-24 lg:mt-[7.5rem]">
          {RAINBOW.map((c) => (
            <span key={c} className="h-full flex-1" style={{ background: c }} />
          ))}
        </div>
      </div>
    </section>
  );
}
