"use client";

import eventsImg from "@/public/oneplatform/events.jpg";
import giftingImg from "@/public/oneplatform/gifting.jpg";
import danielImg from "@/public/oneplatform/kudos-daniel.jpg";
import mayaImg from "@/public/oneplatform/kudos-maya.jpg";
import recognitionImg from "@/public/oneplatform/recognition.jpg";
import snacksImg from "@/public/oneplatform/snacks.jpg";
import swagImg from "@/public/oneplatform/swag.jpg";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useState } from "react";
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

const SEGMENTS: Segment[] = [
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
      { label: "Hosted Experience", image: eventsImg },
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

export default function EveryWay() {
  const [active, setActive] = useState(0);
  const { sectionRef, takeOver } = useAutoAdvance<HTMLDivElement>(
    () => setActive((i) => (i + 1) % SEGMENTS.length),
    4000,
  );

  const select = (i: number) => {
    takeOver();
    setActive(i);
  };

  return (
    <section className="bg-surface-base">
      <div
        ref={sectionRef}
        className="mx-auto flex w-full max-w-section flex-col gap-10 bg-surface-base px-section-x-sm pt-16 pb-20 md:px-section-x-md md:pt-20 md:pb-28 lg:gap-14 lg:px-section-x-lg lg:pt-[7.5rem] lg:pb-[11.25rem]"
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
                    : "text-[#c9c9c9] hover:text-[#9a9a9a]"
                }`}
              >
                {seg.label}
              </button>{" "}
            </span>
          ))}
        </h2>

        {/* Card row — slides to the active line's deck */}
        <div className="overflow-hidden">
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
