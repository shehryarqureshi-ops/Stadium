"use client";

import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { useAutoAdvance } from "@/hooks/useAutoAdvance";
import { CardActiveContext } from "@/app/components/common/cardActive";

export type StepCardsCarouselCard = {
  /** optional: the Confetti cards on /events have no caption line in Figma */
  caption?: string;
  title: string;
  description: string;
  image?: StaticImageData | string;
  imageAlt?: string;
  content?: ReactNode;
};

export type StepCardsCarouselStep = {
  title: string;
  description: string;
  cards: StepCardsCarouselCard[];
};

type StepCardsCarouselProps = {
  caption: string;
  captionColor?: string;
  title: string;
  description: string;
  steps: StepCardsCarouselStep[];
  showNumberInHeading?: boolean;
};

const PHASE_FADE_OUT_MS = 180;
const PHASE_FADE_IN_MS = 220;

function ToggleIcon({ active }: { active: boolean }) {
  return active ? null : (
    <span className="relative flex size-7 shrink-0 items-center justify-center">
      <span
        className={`absolute inset-0 flex items-center justify-center rounded-full bg-black text-white transition-all duration-300 ease-out ${
          active
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
          active
            ? "rotate-45 scale-75 opacity-0"
            : "rotate-0 scale-100 opacity-100"
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

function CarouselCard({
  card,
  active,
}: {
  card: StepCardsCarouselCard;
  /** Every card stays mounted so the neighbours can peek, so animated content
      needs telling which one is actually on screen — see cardActive.tsx. */
  active: boolean;
}) {
  return (
    <div className="flex flex-col gap-8 overflow-hidden rounded-2xl border border-[#ededed] bg-white p-4 pb-8 shadow-[0_12px_32px_-10px_rgba(16,24,40,0.18)]">
      {(card.content || card.image) && (
        <div className="overflow-hidden rounded-xl">
          <div className="relative aspect-[313/340] w-full overflow-hidden">
            {card.content ? (
              <CardActiveContext.Provider value={active}>
                {card.content}
              </CardActiveContext.Provider>
            ) : typeof card.image === "string" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={card.image}
                alt={card.imageAlt ?? card.title}
                className="h-full w-full object-cover"
              />
            ) : card.image ? (
              <Image
                src={card.image}
                alt={card.imageAlt ?? card.title}
                fill
                quality={100}
                className="object-cover"
                sizes="22rem"
              />
            ) : null}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2 px-1">
        {card.caption ? (
          <p className="font-sans text-[0.625rem] font-bold uppercase leading-3 tracking-[0.0625rem] text-[#1b1b1b]/60">
            {card.caption}
          </p>
        ) : null}

        <h3 className="font-display text-2xl leading-7 text-[#1b1b1b]">
          {card.title}
        </h3>

        <p className="font-sans text-[1rem] leading-6 tracking-[0.015em] text-[#1b1b1b]/60">
          {card.description}
        </p>
      </div>
    </div>
  );
}

export default function StepCardsCarousel({
  caption,
  captionColor = "#1b1b1b",
  title,
  description,
  steps,
  showNumberInHeading = true,
}: StepCardsCarouselProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [deckVisible, setDeckVisible] = useState(true);
  const [skipSlide, setSkipSlide] = useState(false);

  const fadeOutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeInTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeStep = steps[stepIndex];
  const deck = activeStep?.cards ?? [];

  useEffect(() => {
    return () => {
      if (fadeOutTimer.current) {
        clearTimeout(fadeOutTimer.current);
      }

      if (fadeInTimer.current) {
        clearTimeout(fadeInTimer.current);
      }
    };
  }, []);

  const switchStep = (index: number) => {
    if (!steps.length || index === stepIndex) return;

    if (fadeOutTimer.current) {
      clearTimeout(fadeOutTimer.current);
    }

    if (fadeInTimer.current) {
      clearTimeout(fadeInTimer.current);
    }

    setDeckVisible(false);

    fadeOutTimer.current = setTimeout(() => {
      setSkipSlide(true);
      setStepIndex(index);
      setCardIndex(0);
      setDeckVisible(true);

      fadeInTimer.current = setTimeout(() => {
        setSkipSlide(false);
      }, PHASE_FADE_IN_MS);
    }, PHASE_FADE_OUT_MS);
  };

  const advance = () => {
    if (!steps.length || !deck.length) return;

    if (cardIndex < deck.length - 1) {
      setCardIndex((current) => current + 1);
      return;
    }

    switchStep((stepIndex + 1) % steps.length);
  };

  // Must always be called before any conditional return.
  const { sectionRef, takeOver } = useAutoAdvance(advance);

  const selectStep = (index: number) => {
    takeOver();
    switchStep(index);
  };

  const selectCard = (index: number) => {
    if (!deck.length) return;

    takeOver();

    setCardIndex(((index % deck.length) + deck.length) % deck.length);
  };

  if (!steps.length) return null;

  return (
    <section ref={sectionRef} className="rounded-t-[2.5rem] bg-white">
      <div className="mx-auto w-full max-w-section px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <p
                data-animation="reveal"
                className="font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem]"
                style={{ color: captionColor }}
              >
                {caption}
              </p>

              <h2
                data-animation="reveal"
                className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
              >
                {title}
              </h2>

              <p
                data-animation="reveal"
                className="mt-3 max-w-[54rem] font-sans text-[1.125rem] leading-[1.48] text-[#6b6c71]"
              >
                {description}
              </p>
            </div>
          </div>

          {/* Steps + carousel */}
          <div
            data-animation="reveal"
            className="flex flex-col gap-8 rounded-[1.5rem] bg-[#f2f2f2] p-2.5 lg:flex-row lg:items-stretch lg:gap-[3.75rem]"
          >
            {/* Step rail */}
            <div className="flex shrink-0 flex-col gap-2.5 lg:w-[23.25rem]">
              {steps.map((step, index) => {
                const active = index === stepIndex;
                const number = String(index + 1).padStart(2, "0");

                return (
                  <button
                    key={`${step.title}-${index}`}
                    type="button"
                    onClick={() => selectStep(index)}
                    aria-expanded={active}
                    className={`flex cursor-pointer flex-col rounded-xl bg-zinc-50 px-7 pb-[1.875rem] pt-7 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-water flex-1 justify-center ${
                      active
                        ? "bg-white! shadow-[0px_3px_18px_0px_rgba(0,0,0,0.13)]"
                        : ""
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="flex items-baseline gap-3">
                        {showNumberInHeading && (
                          <span
                            className={`font-[family-name:var(--font-satoshi-medium)] text-[1.25rem] leading-[1.05] transition-colors duration-300 ${
                              active ? "text-[#8c92a6]" : "text-[#c5c8d3]"
                            }`}
                          >
                            {number}
                          </span>
                        )}

                        <span
                          className={`font-[family-name:var(--font-satoshi-medium)] text-[1.25rem] leading-[1.05] transition-colors duration-300 ${
                            active ? "text-[#16171b]" : "text-[#a9adbc]"
                          }`}
                        >
                          {step.title}
                        </span>
                      </span>

                      <ToggleIcon active={active} />
                    </span>

                    <span
                      className="grid transition-[grid-template-rows] duration-300 ease-out"
                      style={{
                        gridTemplateRows: active ? "1fr" : "0fr",
                      }}
                    >
                      <span className="overflow-hidden">
                        <span
                          className={`block pt-7 font-sans text-[0.875rem] leading-5 tracking-[0.01em] text-[#828282] transition-opacity duration-300 ${
                            active ? "opacity-100 delay-150" : "opacity-0"
                          }`}
                        >
                          {step.description}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Carousel */}
            <div
              className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-3 py-2 transition-opacity ease-out lg:py-4 ${
                deckVisible
                  ? "opacity-100 duration-220"
                  : "opacity-0 duration-180"
              }`}
            >
              <div className="relative h-[35rem] w-full overflow-x-clip [clip-path:inset(-200px_0px)]">
                {/* Edge fades */}
                <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-20 w-45 bg-linear-to-r from-[#f2f2f2]" />

                <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-20 w-72 bg-linear-to-l from-[#f2f2f2]" />

                {deck.map((card, index) => {
                  const length = deck.length;

                  let distance = index - cardIndex;

                  if (distance > length / 2) {
                    distance -= length;
                  }

                  if (distance < -length / 2) {
                    distance += length;
                  }

                  const absoluteDistance = Math.abs(distance);

                  const left = 50 + distance * 50;

                  const translateX =
                    distance === 0
                      ? -50
                      : distance === -1
                        ? -54
                        : distance === 1
                          ? -46
                          : -50;

                  const scale =
                    distance === 0 ? 1 : absoluteDistance === 1 ? 0.78 : 0.75;

                  const opacity =
                    distance === 0 ? 1 : absoluteDistance === 1 ? 0.55 : 0;

                  return (
                    <div
                      key={`${card.title}-${index}`}
                      aria-hidden={distance !== 0}
                      style={{
                        left: `${left}%`,
                        transform: `translate(${translateX}%, -50%) scale(${scale})`,
                        opacity,
                        filter: absoluteDistance === 1 ? "blur(2px)" : "none",
                        zIndex:
                          distance === 0 ? 20 : absoluteDistance === 1 ? 10 : 0,
                      }}
                      className={`absolute top-1/2 w-[21.5rem] ${
                        skipSlide
                          ? "transition-none"
                          : "transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      } ${absoluteDistance <= 1 ? "" : "pointer-events-none"}`}
                    >
                      <CarouselCard card={card} active={distance === 0} />
                    </div>
                  );
                })}

                {deck.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous card"
                      onClick={() => selectCard(cardIndex - 1)}
                      className="absolute left-1 top-1/2 z-30 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-grey-200 bg-white/85 shadow-[0_4px_12px_rgba(16,24,40,0.12)] backdrop-blur transition hover:scale-105 hover:bg-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                    >
                      <Chevron dir="left" />
                    </button>

                    <button
                      type="button"
                      aria-label="Next card"
                      onClick={() => selectCard(cardIndex + 1)}
                      className="absolute right-1 top-1/2 z-30 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-grey-200 bg-white/85 shadow-[0_4px_12px_rgba(16,24,40,0.12)] backdrop-blur transition hover:scale-105 hover:bg-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                    >
                      <Chevron dir="right" />
                    </button>
                  </>
                )}
              </div>

              {/* Dots */}
              {deck.length > 1 && (
                <div className="mb-3 flex items-center gap-2.5">
                  {deck.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      aria-label={`Card ${index + 1}`}
                      onClick={() => selectCard(index)}
                      className={`size-2 cursor-pointer rounded-full transition-colors ${
                        index === cardIndex
                          ? "bg-ink"
                          : "bg-[#d9d9d9] hover:bg-grey-400"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
