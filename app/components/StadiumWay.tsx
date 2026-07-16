"use client";

import type { ReactNode } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import TeamPermissionsLoop from "./TeamPermissions";
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
  component?: ReactNode;
};
type Phase = { num: string; title: string; desc: string; cards: Card[] };

const PHASES: Phase[] = [
  {
    num: "01",
    title: "Setup your workspace",
    desc: "Connect Slack and Teams so recognition and rewards reach people in the tools they already use and celebrate each win.",
    cards: [
      {
        component: <TeamPermissionsLoop />,
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

/* Crossfades the +/close circle in place so the accordion toggle never pops —
   both states are always mounted and swap via opacity/scale/rotate. */
function ToggleIcon({ on }: { on: boolean }) {
  return (
    <span className="relative flex size-7 shrink-0 items-center justify-center">
      <span
        className={`absolute inset-0 flex items-center justify-center rounded-full bg-black text-white transition-all duration-300 ease-out ${
          on
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-45 scale-75 opacity-0"
        }`}
      >
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
      <span
        className={`absolute inset-0 flex items-center justify-center rounded-full bg-[#e8e9ed] text-[#9aa0ac] transition-all duration-300 ease-out ${
          on ? "rotate-45 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      >
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
        {card.component ? (
          <div className="aspect-[313/340] w-full overflow-hidden">
            {card.component}
          </div>
        ) : card.image ? (
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

/* Switching phases swaps the whole deck (different card count, different
   content) out from under the coverflow's index-keyed slots — animating the
   slide transition through that swap reads as the new phase's card sliding
   in from behind the old one. Instead, fade the deck out, snap the coverflow
   to the new phase's first card while invisible, then fade back in — the
   coverflow slide stays reserved for navigating cards within one phase. */
const PHASE_FADE_OUT_MS = 180;
const PHASE_FADE_IN_MS = 220;

/* The left rail's 3 idle buttons share leftover height via flex-grow, which
   means the active button's box height is normally left for the browser to
   discover live from its own animating content (the grid-rows desc reveal).
   Flexbox only reflows that pooled space in occasional catch-up jumps
   instead of every frame, so the rail visibly snaps to an even split and
   holds there before the real target heights arrive. Measuring each phase's
   open/closed height up front and driving box height via an explicit
   `flex-basis` transition gives every button its own numeric target from
   the first frame — no pooled value for the browser to "discover" mid-flight. */
const RAIL_CLOSED_FALLBACK_PX = 140;
const RAIL_OPEN_FALLBACK_PX = 174;

export default function StadiumWay() {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [cardIdx, setCardIdx] = useState(0);
  const [deckVisible, setDeckVisible] = useState(true);
  const [skipSlide, setSkipSlide] = useState(false);
  const fadeOutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeInTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deck = PHASES[phaseIdx].cards;

  const [railClosedH, setRailClosedH] = useState(RAIL_CLOSED_FALLBACK_PX);
  const [railOpenHs, setRailOpenHs] = useState<number[]>(() =>
    PHASES.map(() => RAIL_OPEN_FALLBACK_PX),
  );
  const closedMeasureRef = useRef<HTMLDivElement | null>(null);
  const openMeasureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    return () => {
      if (fadeOutTimer.current) clearTimeout(fadeOutTimer.current);
      if (fadeInTimer.current) clearTimeout(fadeInTimer.current);
    };
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      if (closedMeasureRef.current) {
        setRailClosedH(closedMeasureRef.current.getBoundingClientRect().height);
      }
      setRailOpenHs(
        PHASES.map((_, i) => {
          const el = openMeasureRefs.current[i];
          return el
            ? el.getBoundingClientRect().height
            : RAIL_OPEN_FALLBACK_PX;
        }),
      );
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const switchPhase = (i: number) => {
    if (i === phaseIdx) return;
    if (fadeOutTimer.current) clearTimeout(fadeOutTimer.current);
    if (fadeInTimer.current) clearTimeout(fadeInTimer.current);
    setDeckVisible(false);
    fadeOutTimer.current = setTimeout(() => {
      setSkipSlide(true);
      setPhaseIdx(i);
      setCardIdx(0);
      setDeckVisible(true);
      fadeInTimer.current = setTimeout(() => {
        setSkipSlide(false);
      }, PHASE_FADE_IN_MS);
    }, PHASE_FADE_OUT_MS);
  };

  /* Auto-advance: next card in the deck, then roll to the next phase. */
  const advance = () => {
    if (cardIdx < PHASES[phaseIdx].cards.length - 1) {
      setCardIdx(cardIdx + 1);
    } else {
      switchPhase((phaseIdx + 1) % N);
    }
  };
  const { sectionRef, takeOver } = useAutoAdvance(advance);

  const selectPhase = (i: number) => {
    takeOver();
    switchPhase(i);
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
            <div className="relative flex shrink-0 flex-col gap-2.5 lg:w-[23.25rem] lg:self-stretch">
              {/* hidden clones — measure each phase's natural open/closed height so the
                  buttons below can transition `flex-basis` to an explicit number instead
                  of leaving the browser to discover it live off the desc's own animating
                  grid-rows (see RAIL_CLOSED_FALLBACK_PX comment above). */}
              <div
                ref={closedMeasureRef}
                aria-hidden
                className="invisible absolute inset-x-0 top-0 -z-10 px-7 pb-[1.875rem] pt-7"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="flex items-baseline gap-3">
                    <span className="font-[family-name:var(--font-satoshi-medium)] text-[1.25rem] leading-[1.05]">
                      00
                    </span>
                    <span className="font-[family-name:var(--font-satoshi-medium)] text-[1.25rem] leading-[1.05]">
                      Title
                    </span>
                  </span>
                  <span className="size-7 shrink-0" />
                </span>
              </div>
              {PHASES.map((p, i) => (
                <div
                  key={p.num}
                  ref={(el) => {
                    openMeasureRefs.current[i] = el;
                  }}
                  aria-hidden
                  className="invisible absolute inset-x-0 top-0 -z-10 px-7 pb-[1.875rem] pt-7"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="flex items-baseline gap-3">
                      <span className="font-[family-name:var(--font-satoshi-medium)] text-[1.25rem] leading-[1.05]">
                        {p.num}
                      </span>
                      <span className="font-[family-name:var(--font-satoshi-medium)] text-[1.25rem] leading-[1.05]">
                        {p.title}
                      </span>
                    </span>
                    <span className="size-7 shrink-0" />
                  </span>
                  <p className="pt-7 font-sans text-[0.875rem] leading-5 tracking-[0.01em]">
                    {p.desc}
                  </p>
                </div>
              ))}
              {PHASES.map((p, i) => {
                const on = i === phaseIdx;
                return (
                  <button
                    key={p.num}
                    type="button"
                    onClick={() => selectPhase(i)}
                    aria-expanded={on}
                    style={{ flexBasis: `${on ? railOpenHs[i] : railClosedH}px` }}
                    className={`flex grow shrink flex-col justify-center rounded-xl bg-white px-7 pb-[1.875rem] pt-7 text-left transition-[flex-basis,box-shadow] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-water cursor-pointer ${
                      on ? "shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]" : ""
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="flex items-baseline gap-3">
                        <span
                          className={`font-[family-name:var(--font-satoshi-medium)] text-[1.25rem] leading-[1.05] transition-colors duration-300 ${
                            on ? "text-[#8c92a6]" : "text-[#c5c8d3]"
                          }`}
                        >
                          {p.num}
                        </span>
                        <span
                          className={`font-[family-name:var(--font-satoshi-medium)] text-[1.25rem] leading-[1.05] transition-colors duration-300 ${
                            on ? "text-[#16171b]" : "text-[#a9adbc]"
                          }`}
                        >
                          {p.title}
                        </span>
                      </span>
                      <ToggleIcon on={on} />
                    </span>
                    <span
                      className="grid transition-[grid-template-rows] duration-300 ease-out"
                      style={{ gridTemplateRows: on ? "1fr" : "0fr" }}
                    >
                      <span className="overflow-hidden">
                        <span
                          className={`block pt-7 font-sans text-[0.875rem] leading-5 tracking-[0.01em] text-[#828282] transition-opacity duration-300 ${
                            on ? "opacity-100 delay-150" : "opacity-0"
                          }`}
                        >
                          {p.desc}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* coverflow — the ACTIVE phase's deck of cards */}
            <div
              className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-6 py-2 transition-opacity ease-out lg:py-4 ${
                deckVisible
                  ? "opacity-100 duration-220"
                  : "opacity-0 duration-180"
              }`}
            >
              <div className="relative h-[35rem] w-full [clip-path:inset(-200px_0px)] overflow-clips">
                <div className="fade-left absolute top-0 bottom-0 -left-px w-45 bg-linear-to-r from-[#f2f2f2] z-20" />
                <div className="fade-right absolute top-0 bottom-0 right-0 w-72 bg-linear-to-l from-[#f2f2f2] z-20" />
                {deck.map((cardItem, i) => {
                  const len = deck.length;
                  let d = i - cardIdx;
                  if (d > len / 2) d -= len;
                  if (d < -len / 2) d += len;
                  const abs = Math.abs(d);
                  /* Left is a continuous function of d (not just three fixed
                     Tailwind buckets for -1/0/1) so a jump of more than one
                     card still slides through every intermediate position —
                     otherwise every |d|>1 card collapsed to the same "hidden
                     center" spot and a multi-step jump just faded in place
                     instead of sliding across. */
                  const leftPct = 50 + d * 50;
                  const translateX = d === 0 ? -50 : d === -1 ? -54 : d === 1 ? -46 : -50;
                  const scale = d === 0 ? 1 : abs === 1 ? 0.78 : 0.75;
                  const opacity = d === 0 ? 1 : abs === 1 ? 0.55 : 0;
                  return (
                    <div
                      key={i}
                      aria-hidden={d !== 0}
                      style={{
                        left: `${leftPct}%`,
                        transform: `translate(${translateX}%, -50%) scale(${scale})`,
                        opacity,
                        filter: abs === 1 ? "blur(2px)" : "none",
                        zIndex: d === 0 ? 20 : abs === 1 ? 10 : 0,
                      }}
                      className={`absolute top-1/2 w-[21.5rem] ${skipSlide ? "transition-none" : "transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"} ${abs <= 1 ? "" : "pointer-events-none"}`}
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
                      className="absolute left-1 top-1/2 z-30 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-grey-200 bg-white/85 shadow-[0_4px_12px_rgba(16,24,40,0.12)] backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink cursor-pointer hover:scale-105 active:scale-95"
                    >
                      <Chevron dir="left" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next card"
                      onClick={() => selectCard(cardIdx + 1)}
                      className="absolute right-1 top-1/2 z-30 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-grey-200 bg-white/85 shadow-[0_4px_12px_rgba(16,24,40,0.12)] backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink cursor-pointer hover:scale-105 active:scale-95"
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
