"use client";

import giftingImg from "@/public/oneplatform/gifting.jpg";
import hostedImg from "@/public/oneplatform/hosted.jpg";
import danielImg from "@/public/oneplatform/kudos-daniel.jpg";
import mayaImg from "@/public/oneplatform/kudos-maya.jpg";
import recognitionImg from "@/public/oneplatform/recognition.jpg";
import snacksImg from "@/public/oneplatform/snacks.jpg";
import swagImg from "@/public/oneplatform/swag.jpg";
import v2Recognition from "@/public/oneplatform/v2/recognition.jpg";
import v2Swag from "@/public/oneplatform/v2/swag.jpg";
import v2Gifting from "@/public/oneplatform/v2/gifting.jpg";
import v2Snacks from "@/public/oneplatform/v2/snacks.jpg";
import v2Hosted from "@/public/oneplatform/v2/hosted.jpg";
import v2Stores from "@/public/oneplatform/v2/company-stores.jpg";
import v2Kits from "@/public/oneplatform/v2/bundled-kits.jpg";
import v2Automations from "@/public/oneplatform/v2/automations.jpg";
import v2Sender from "@/public/oneplatform/v2/sender-choice.jpg";
import v2Recipient from "@/public/oneplatform/v2/recipient-choice.jpg";
import v2Employees from "@/public/oneplatform/v2/employees.jpg";
import v2Partners from "@/public/oneplatform/v2/partners.jpg";
import v2Prospects from "@/public/oneplatform/v2/prospects.jpg";
import v2Customers from "@/public/oneplatform/v2/customers.jpg";
import v2Attendees from "@/public/oneplatform/v2/event-attendees.jpg";
import v2Onboarding from "@/public/oneplatform/v2/onboarding.jpg";
import v2Milestones from "@/public/oneplatform/v2/milestones.jpg";
import v2Events from "@/public/oneplatform/v2/events.jpg";
import v2Holidays from "@/public/oneplatform/v2/holidays.jpg";
import v2Thanks from "@/public/oneplatform/v2/thank-yous.jpg";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/app/lib/motion";
import { useAutoAdvance } from "@/hooks/useAutoAdvance";

/* "One platform." — synced to the behavior spec (Figma 50:725). The headline is
   FOUR clickable lines that highlight one at a time (active = ink, rest = grey),
   auto-advancing ~4s and looping; the card row slides to the active line's own
   deck. Line 1 ("One platform.") shows the five real product cards (photos in
   public/ewysu-*.jpg); lines 2–4 are empty "PENDING ASSET" placeholders until
   their assets land. Every card = photo/box then label BELOW (uniform set). */

/** A kudos note overlaid on the photo — Recognition only, per the board. */
type Quote = {
  text: string;
  from: string;
  avatars: [StaticImageData, StaticImageData];
};

type Card = { label: string; image?: StaticImageData; quote?: Quote };
type Segment = { label: string; cards: Card[] };

const SEGMENTS_V1: Segment[] = [
  {
    label: "One platform.",
    cards: [
      {
        label: "Recognition",
        image: recognitionImg,
        quote: {
          text: "“You stepped in and saved the launch.”",
          from: "Daniel to Maya",
          avatars: [danielImg, mayaImg],
        },
      },
      { label: "Swag", image: swagImg },
      { label: "Gifting", image: giftingImg },
      { label: "Snack Boxes", image: snacksImg },
      { label: "Hosted Experience", image: hostedImg },
    ],
  },
  {
    label: "Every way to send.",
    cards: [
      { label: "Company Stores" },
      { label: "Bundled Kits" },
      { label: "Automations" },
      { label: "Sender Choice" },
      { label: "Recipient Choice" },
    ],
  },
  {
    label: "For the people who matter.",
    cards: [
      { label: "Employees" },
      { label: "Customers" },
      { label: "Partners" },
      { label: "Prospects" },
      { label: "Event Attendees" },
    ],
  },
  {
    label: "At the moments that count.",
    cards: [
      { label: "Onboarding" },
      { label: "Milestones" },
      { label: "Events" },
      { label: "Holidays" },
      { label: "Thank Yous" },
    ],
  },
];

/* Updated photos + card order (Figma 6924:9749, /new-home), all four lines. Recognition's new photo
   carries its own emoji bubble, so the kudos note is dropped there. */
const V2_CARDS: Card[][] = [
  [
    { label: "Recognition", image: v2Recognition },
    { label: "Swag", image: v2Swag },
    { label: "Gifting", image: v2Gifting },
    { label: "Snack Boxes", image: v2Snacks },
    { label: "Hosted Experience", image: v2Hosted },
  ],
  [
    { label: "Company Stores", image: v2Stores },
    { label: "Bundled Kits", image: v2Kits },
    { label: "Automations", image: v2Automations },
    { label: "Sender Choice", image: v2Sender },
    { label: "Recipient Choice", image: v2Recipient },
  ],
  [
    { label: "Employees", image: v2Employees },
    { label: "Partners", image: v2Partners },
    { label: "Prospects", image: v2Prospects },
    { label: "Customers", image: v2Customers },
    { label: "Event Attendees", image: v2Attendees },
  ],
  [
    { label: "Onboarding", image: v2Onboarding },
    { label: "Milestones", image: v2Milestones },
    { label: "Events", image: v2Events },
    { label: "Holidays", image: v2Holidays },
    { label: "Thank Yous", image: v2Thanks },
  ],
];
const SEGMENTS_V2: Segment[] = SEGMENTS_V1.map((seg, i) => ({ ...seg, cards: V2_CARDS[i] }));

/* The quote note is drawn to the board's own numbers, which are set against a
   221x320 photo. The card is fluid, so `u()` turns one of those design pixels
   into a share of the card's width and every value below stays the number the
   board actually specifies. The note is 100 tall at y=231, so its last 11px
   fall past the photo — Figma clips it there and so does overflow-hidden,
   which is why the bottom corners read square. */
const u = (n: number) => `calc(${n} * (100cqw / 221))`;

function QuoteNote({ quote }: { quote: Quote }) {
  return (
    <div
      className="absolute bg-white"
      style={{
        left: u(13),
        top: u(231),
        width: u(197),
        height: u(100),
        borderRadius: u(12),
        boxShadow: `0 ${u(2)} ${u(6)} rgba(0,0,0,0.10), 0 ${u(12)} ${u(32)} rgba(0,0,0,0.16)`,
      }}
    >
      <p
        className="absolute font-display text-[#0f0821]"
        style={{
          left: u(14),
          top: u(14),
          width: u(169),
          fontSize: u(14),
          lineHeight: u(19),
        }}
      >
        {quote.text}
      </p>

      <div
        className="absolute flex items-center"
        style={{ left: u(14), top: u(62), width: u(169), height: u(24) }}
      >
        {quote.avatars.map((avatar, i) => (
          <span
            key={i}
            className="absolute overflow-hidden rounded-full bg-white ring-white"
            style={{
              left: u(i * 21),
              width: u(24),
              height: u(24),
              boxShadow: `0 0 0 ${u(2)} #fff`,
            }}
          >
            <Image src={avatar} alt="" width={48} height={48} quality={90} />
          </span>
        ))}

        <span
          className="absolute font-sans text-[#6b7280]"
          style={{ left: u(49), fontSize: u(10), lineHeight: u(13) }}
        >
          {quote.from}
        </span>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          loading="lazy"
          decoding="async"
          src="/oneplatform/slack.svg"
          alt=""
          width={18}
          height={18}
          className="absolute"
          style={{ left: u(151), top: u(3), width: u(18), height: u(18) }}
        />
      </div>
    </div>
  );
}

function PhotoCard({ card }: { card: Card }) {
  /* real product card — label BELOW the photo */
  return (
    <div className="group flex flex-col gap-4">
      <div
        className="relative aspect-[221/320] w-full overflow-hidden rounded-card bg-grey-200"
        style={{ containerType: "inline-size" }}
      >
        <Image
          src={card.image!}
          alt=""
          width={440}
          quality={90}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {card.quote && <QuoteNote quote={card.quote} />}
      </div>
      <h3 className="font-display text-heading-sm text-ink">{card.label}</h3>
    </div>
  );
}

function PendingCard({ card }: { card: Card }) {
  /* placeholder card — matches the photo cards: box then label BELOW */
  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[221/320] w-full overflow-hidden rounded-card border border-dashed border-grey-300 bg-grey-50">
        <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-[#ffb800] px-2 py-0.5">
          <span className="size-1 rounded-full bg-black/70" />
          <span className="font-sans text-[0.5rem] font-bold uppercase tracking-[0.05em] text-black/80">
            Pending Asset
          </span>
        </span>
      </div>
      <h3
        data-animation="reveal"
        className="font-display text-heading-sm text-ink"
      >
        {card.label}
      </h3>
    </div>
  );
}

/* PHONE (< md) — one card at a time: big card, label + counter below, then
   prev / dots / next (Figma variation A). Keyed by the active headline line so
   every line starts on its first card. All slides sit in one track that
   translates on change, so the photo AND its title slide together (images are
   eager-loaded, so nothing pops in mid-slide). Swipe works too. */
function PhoneDeck({ cards }: { cards: Card[] }) {
  const [idx, setIdx] = useState(0);
  const touchX = useRef<number | null>(null);
  const go = (d: 1 | -1) => setIdx((i) => (i + d + cards.length) % cards.length);

  return (
    <div className="flex flex-col gap-6 md:hidden">
      <div
        className="overflow-hidden [touch-action:pan-y]"
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        }}
      >
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {cards.map((card, i) => (
            <div
              key={card.label}
              aria-hidden={i !== idx}
              className={`w-full shrink-0 transition-opacity duration-500 motion-reduce:transition-none ${
                i === idx ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="relative aspect-[343/400] w-full overflow-hidden rounded-card bg-grey-200">
                {card.image ? (
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    sizes="100vw"
                    quality={90}
                    loading="eager"
                    className="object-cover"
                  />
                ) : (
                  <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-[#ffb800] px-2 py-0.5">
                    <span className="size-1 rounded-full bg-black/70" />
                    <span className="font-sans text-[0.5rem] font-bold uppercase tracking-[0.05em] text-black/80">
                      Pending Asset
                    </span>
                  </span>
                )}
                {card.quote && (
                  <div className="absolute inset-x-4 bottom-4 flex flex-col gap-3.5 rounded-[0.875rem] bg-white p-[1.125rem] shadow-[0_0.75rem_2rem_rgba(0,0,0,0.16)]">
                    <p className="font-display text-[1.0625rem] leading-[1.375rem] text-[#0f0821]">
                      {card.quote.text}
                    </p>
                    <div className="flex items-center gap-2.5">
                      <span className="flex">
                        {card.quote.avatars.map((a, j) => (
                          <span
                            key={j}
                            className={`size-7 overflow-hidden rounded-full ring-2 ring-white ${j ? "-ml-2" : ""}`}
                          >
                            <Image src={a} alt="" width={56} height={56} quality={90} />
                          </span>
                        ))}
                      </span>
                      <span className="font-sans text-[0.75rem] leading-4 text-[#6b7280]">
                        {card.quote.from}
                      </span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/oneplatform/slack.svg"
                        alt=""
                        loading="lazy"
                        className="ml-auto size-[1.125rem]"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between" aria-live={i === idx ? "polite" : "off"}>
                <h3 className="font-display text-[1.625rem] leading-[1.875rem] tracking-[-0.0188rem] text-ink">
                  {card.label}
                </h3>
                <span className="font-sans text-[0.8125rem] font-semibold tabular-nums leading-4 tracking-[0.0625rem] text-[#8e8e8e]">
                  {String(i + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        {([-1, 1] as const).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => go(d)}
            aria-label={d === 1 ? "Next card" : "Previous card"}
            className={`flex size-12 cursor-pointer items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b7afc]/40 ${
              d === 1 ? "order-3 bg-[#1b1b1b] text-white" : "order-1 border border-[#1b1b1b]/20 text-[#1b1b1b]"
            }`}
          >
            <svg viewBox="0 0 24 24" className="size-[1.375rem]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d={d === 1 ? "M9 18l6-6-6-6" : "M15 18l-6-6 6-6"} />
            </svg>
          </button>
        ))}
        <div className="order-2 flex items-center gap-2">
          {cards.map((c, i) => (
            <button
              key={c.label}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Show ${c.label}`}
              aria-current={i === idx}
              className="flex h-6 cursor-pointer items-center"
            >
              <span
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === idx ? "w-6 bg-[#1b1b1b]" : "w-2 bg-[#1b1b1b]/20"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function EveryWay({ updated = false }: { updated?: boolean } = {}) {
  const SEGMENTS = updated ? SEGMENTS_V2 : SEGMENTS_V1;
  const [active, setActive] = useState(0);
  /* bumped on every click so the 5s timer starts over, even when the same line is clicked again */
  const [timerKey, setTimerKey] = useState(0);
  const reduced = usePrefersReducedMotion();
  const { sectionRef, takeOver } = useAutoAdvance<HTMLDivElement>(
    // the original section's behaviour (hover pause, first click stops it for good); `updated`
    // runs its own timer below
    () => !updated && setActive((i) => (i + 1) % SEGMENTS.length),
    4000,
  );

  /* updated: every 5s the next line, while the section is on screen; clicking a line restarts the
     5s from that click and rotation carries on from there (it is never switched off). Hovering the
     section (mouse only) pauses it; on leave a fresh 5s starts. */
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const node = sectionRef.current;
    if (!updated || !node) return;
    const enter = (e: PointerEvent) => e.pointerType === "mouse" && setHovered(true);
    const leave = () => setHovered(false);
    node.addEventListener("pointerenter", enter);
    node.addEventListener("pointerleave", leave);
    return () => {
      node.removeEventListener("pointerenter", enter);
      node.removeEventListener("pointerleave", leave);
    };
  }, [updated, sectionRef]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!updated || reduced || hovered || !node) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.4 });
    io.observe(node);
    const timer = setInterval(() => {
      if (visible) setActive((i) => (i + 1) % SEGMENTS.length);
    }, 5000);
    return () => {
      clearInterval(timer);
      io.disconnect();
    };
  }, [updated, reduced, hovered, timerKey, sectionRef, SEGMENTS.length]);

  const select = (i: number) => {
    takeOver();
    setActive(i);
    setTimerKey((k) => k + 1);
  };

  return (
    <section className="bg-surface-base">
      <div
        ref={sectionRef}
        className={`flex w-full flex-col gap-10 bg-surface-base pt-16 pb-20 md:pt-20 md:pb-28 lg:gap-14 lg:pt-[7.5rem] lg:pb-[11.25rem] ${
          updated
            ? /* the site header's own side padding, so the cards line up with the logo + Talk to sales */
              "px-4 md:px-[max(var(--spacing-section-x-md),calc((100%_-_var(--container-content))/2))]"
            : "mx-auto max-w-section px-section-x-sm md:px-section-x-md lg:px-section-x-lg"
        }`}
      >
        {/* Four cycling lines — every line is clickable and owns its own deck */}
        <h2
          data-animation="reveal"
          className="font-display text-heading-sm md:text-heading-md lg:text-heading-lg lg:tracking-[-0.075rem] text-balance"
        >
          {SEGMENTS.map((seg, i) => (
            <span key={seg.label}>
              <button
                type="button"
                onClick={() => select(i)}
                aria-pressed={i === active}
                className={`cursor-pointer rounded-sm outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#0b7afc]/40 ${
                  i === active
                    ? "text-[#1b1b1b]"
                    : "text-[#8e8e8e] hover:text-[#6f6f6f]"
                }`}
              >
                {seg.label}
              </button>{" "}
            </span>
          ))}
        </h2>

        {/* Phone: one card at a time */}
        <PhoneDeck key={active} cards={SEGMENTS[active].cards} />

        {/* Card row — slides to the active line's deck */}
        <div className="overflow-hidden max-md:hidden">
          <div
            className="flex transition-transform duration-1000 ease"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {SEGMENTS.map((seg) => (
              <ul
                key={seg.label}
                aria-hidden={SEGMENTS[active] !== seg}
                className="grid w-full shrink-0 grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6"
              >
                {seg.cards.map((card) => (
                  <li data-animation="reveal" key={card.label}>
                    {card.image ? (
                      <PhotoCard card={card} />
                    ) : (
                      <PendingCard card={card} />
                    )}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
