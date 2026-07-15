"use client";

import eventsImg from "@/public/ewysu-events.jpg";
import giftingImg from "@/public/ewysu-gifting.jpg";
import recognitionImg from "@/public/ewysu-recognition.jpg";
import snacksImg from "@/public/ewysu-snacks.jpg";
import swagImg from "@/public/ewysu-swag.jpg";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useState } from "react";
import { useAutoAdvance } from "./useAutoAdvance";

/* "One platform." — synced to the behavior spec (Figma 50:725). The headline is
   FOUR clickable lines that highlight one at a time (active = ink, rest = grey),
   auto-advancing ~4s and looping; the card row slides to the active line's own
   deck. Line 1 ("One platform.") shows the five real product cards (photos in
   public/ewysu-*.jpg); lines 2–4 are empty "PENDING ASSET" placeholders until
   their assets land. Every card = photo/box then label BELOW (uniform set). */

type Card = { label: string; image?: StaticImageData };
type Segment = { label: string; cards: Card[] };

const SEGMENTS: Segment[] = [
  {
    label: "One platform.",
    cards: [
      { label: "Recognition", image: recognitionImg },
      { label: "Swag", image: swagImg },
      { label: "Gifting", image: giftingImg },
      { label: "Snack Boxes", image: snacksImg },
      { label: "Events", image: eventsImg },
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

function PhotoCard({ card }: { card: Card }) {
  /* real product card — label BELOW the photo */
  return (
    <div className="group flex flex-col gap-4">
      <div className="relative aspect-[221/320] w-full overflow-hidden rounded-card bg-grey-200">
        <Image
          src={card.image!}
          alt=""
          fill
          sizes="(min-width: 64rem) 221px, (min-width: 40rem) 30vw, 45vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
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
  const { sectionRef, takeOver } = useAutoAdvance(
    () => setActive((i) => (i + 1) % SEGMENTS.length),
    4000,
  );

  const select = (i: number) => {
    takeOver();
    setActive(i);
  };

  return (
    <section
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
    </section>
  );
}
