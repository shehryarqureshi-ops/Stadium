"use client";

import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { useState } from "react";

export type StepCardItem = {
  title: ReactNode;
  description?: string;
  image?: StaticImageData;
  imageAlt?: string;
  content?: ReactNode;

  /**
   * Optional desktop-only visual width in pixels.
   *
   * Example:
   * desktopVisualWidth: 420
   *
   * If omitted, the visual uses the default width.
   */
  desktopVisualWidth?: number;
};

type StepCardsProps = {
  caption: string;
  captionColor?: string;
  title: string;
  description: string;
  items: StepCardItem[];

  /**
   * Default desktop visual width used when an individual
   * item does not specify desktopVisualWidth.
   */
  defaultDesktopVisualWidth?: number;
};

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const ACTIVE_RATIO = 3.125;

const GRID_GAP = 16;
const CARD_PADDING = 10;
const CONTENT_GAP = 10;

export default function StepCards({
  caption,
  captionColor = "#2178f5",
  title,
  description,
  items,
  defaultDesktopVisualWidth = 320,
}: StepCardsProps) {
  const [active, setActive] = useState(0);

  if (!items.length) return null;

  const gridTemplateColumns = items
    .map((_, index) => (index === active ? `${ACTIVE_RATIO}fr` : "1fr"))
    .join(" ");

  const sizingGridTemplateColumns = [
    `${ACTIVE_RATIO}fr`,
    ...items.slice(1).map(() => "1fr"),
  ].join(" ");

  const expandedFraction = ACTIVE_RATIO / (ACTIVE_RATIO + items.length - 1);

  const totalGridGap = (items.length - 1) * GRID_GAP;

  /**
   * Width of one fully expanded card.
   *
   * 100cqw refers to the full animated accordion width.
   */
  const expandedCardWidth = `calc((100cqw - ${totalGridGap}px) * ${expandedFraction})`;

  return (
    <section className="bg-white px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
      <div className="mx-auto flex w-full max-w-content flex-col gap-10">
        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}

        <div className="flex flex-col gap-2">
          <p
            data-animation="reveal"
            style={{ color: captionColor }}
            className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem]"
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
            className="mt-3 max-w-[42rem] font-sans text-[1.125rem] leading-[1.48] text-[#6b6c71]"
          >
            {description}
          </p>
        </div>

        {/* ========================================= */}
        {/* DESKTOP */}
        {/* ========================================= */}

        <div
          data-animation="reveal"
          className="relative hidden rounded-[1.5rem] bg-[#f2f2f2] p-4 lg:block"
          style={{
            containerType: "inline-size",
          }}
        >
          {/* ======================================= */}
          {/* INVISIBLE HEIGHT SIZER */}
          {/* ======================================= */}

          <div
            aria-hidden="true"
            className="pointer-events-none invisible grid gap-4"
            style={{
              gridTemplateColumns: sizingGridTemplateColumns,
            }}
          >
            <div className="col-start-1 grid">
              {items.map((item, index) => {
                const visualWidth =
                  item.desktopVisualWidth ?? defaultDesktopVisualWidth;

                return (
                  <div
                    key={`sizer-${index}`}
                    className="col-start-1 row-start-1 min-w-0"
                  >
                    <SizerCard item={item} visualWidth={visualWidth} />
                  </div>
                );
              })}
            </div>

            {items.slice(1).map((_, index) => (
              <div key={`sizer-spacer-${index}`} />
            ))}
          </div>

          {/* ======================================= */}
          {/* ANIMATED ACCORDION */}
          {/* ======================================= */}

          <div
            role="tablist"
            aria-label={title}
            className="absolute inset-4 grid gap-4"
            style={
              {
                gridTemplateColumns,
                transition: `grid-template-columns 750ms ${EASE}`,
                containerType: "inline-size",
              } as CSSProperties
            }
          >
            {items.map((item, index) => {
              const isActive = index === active;

              const number = String(index + 1).padStart(2, "0");

              const panelId = `step-card-panel-${index}`;

              const visualWidth =
                item.desktopVisualWidth ?? defaultDesktopVisualWidth;

              /**
               * Width of the grey/text area when fully expanded.
               *
               * Expanded card width
               * - left/right card padding
               * - gap between text and visual
               * - chosen visual width
               */
              const expandedTextWidth = `calc(
                ${expandedCardWidth}
                - ${CARD_PADDING * 2}px
                - ${CONTENT_GAP}px
                - ${visualWidth}px
              )`;

              return (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={panelId}
                  onClick={() => setActive(index)}
                  className={`
                    relative
                    h-full
                    min-w-0
                    overflow-hidden
                    cursor-pointer
                    rounded-[1rem]
                    bg-white
                    p-2.5
                    text-left
                    outline-none
                    transition-[box-shadow]
                    duration-500
                    focus-visible:ring-2
                    focus-visible:ring-[#16171b]
                    focus-visible:ring-offset-2
                    ${
                      isActive
                        ? "shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
                        : "shadow-[0_1px_2px_rgba(0,0,0,0.025)]"
                    }
                  `}
                  style={{
                    transitionTimingFunction: EASE,
                  }}
                >
                  <div className="relative flex h-full min-w-0">
                    {/* ================================= */}
                    {/* TEXT / GREY AREA */}
                    {/* ================================= */}

                    <div
                      className={`
                        relative
                        z-10
                        flex
                        h-full
                        min-w-0
                        shrink-0
                        flex-col
                        justify-between
                        transition-[width]
                        duration-[750ms]
                      `}
                      style={{
                        width: isActive ? expandedTextWidth : "100%",
                        transitionTimingFunction: EASE,
                      }}
                    >
                      <span className="shrink-0 p-4 font-sans text-[1rem] leading-5 text-[#a9a9ad]">
                        {number}
                      </span>

                      <div className="relative overflow-hidden rounded-2xl bg-[#f4f4f5]">
                        {/*
                         * The inner content is permanently sized
                         * to its FINAL expanded width.
                         *
                         * This prevents text reflow during the
                         * accordion animation.
                         */}
                        <div
                          className="p-6"
                          style={{
                            width: expandedTextWidth,
                          }}
                        >
                          <h3 className="font-[family-name:var(--font-satoshi)] text-[1.25rem] font-bold leading-[1.25] tracking-[-0.02em] text-[#16171b]">
                            {item.title}
                          </h3>

                          {item.description && (
                            <div
                              className={`
                                overflow-hidden
                                transition-[max-height,opacity,transform,margin]
                                duration-500
                                ${
                                  isActive
                                    ? "mt-4 max-h-40 translate-y-0 opacity-100"
                                    : "mt-0 max-h-0 translate-y-2 opacity-0"
                                }
                              `}
                              style={{
                                transitionTimingFunction: EASE,
                                transitionDelay: isActive ? "220ms" : "0ms",
                              }}
                            >
                              <p className="font-sans text-[0.9375rem] leading-[1.5] text-[#6b6c71]">
                                {item.description}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* ================================= */}
                    {/* VISUAL VIEWPORT */}
                    {/* ================================= */}

                    {(item.content || item.image) && (
                      <div
                        id={panelId}
                        role="tabpanel"
                        aria-hidden={!isActive}
                        className={`
                          relative
                          min-w-0
                          flex-1
                          overflow-hidden
                          rounded-2xl
                          transition-[margin]
                          duration-[750ms]
                          ${isActive ? "ml-2.5" : "ml-0"}
                        `}
                        style={{
                          transitionTimingFunction: EASE,
                        }}
                      >
                        {/*
                         * The visual ALWAYS has its final chosen
                         * width.
                         *
                         * It never scales during animation.
                         *
                         * The outer viewport simply reveals it.
                         */}
                        <div
                          className="absolute left-0 top-0 max-w-none"
                          style={{
                            width: visualWidth,
                          }}
                        >
                          {item.content ? (
                            <div
                              style={{
                                width: visualWidth,
                              }}
                            >
                              {item.content}
                            </div>
                          ) : item.image ? (
                            <Image
                              src={item.image}
                              alt={item.imageAlt ?? ""}
                              quality={100}
                              className="block h-auto w-full max-w-none"
                            />
                          ) : null}
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================= */}
        {/* MOBILE */}
        {/* ========================================= */}

        <div className="flex flex-col gap-4 rounded-[1.5rem] bg-[#f2f2f2] p-4 lg:hidden">
          {items.map((item, index) => {
            const number = String(index + 1).padStart(2, "0");

            return (
              <article
                key={index}
                className="overflow-hidden rounded-[1rem] bg-white p-2.5"
              >
                <div className="flex flex-col gap-2.5">
                  <div className="flex flex-col gap-6">
                    <span className="p-4 font-sans text-[1rem] leading-5 text-[#a9a9ad]">
                      {number}
                    </span>

                    <div className="rounded-2xl bg-[#f4f4f5] p-6">
                      <h3 className="font-[family-name:var(--font-satoshi)] text-2xl font-bold leading-[1.3] tracking-[-0.01em] text-[#16171b]">
                        {item.title}
                      </h3>

                      {item.description && (
                        <p className="mt-4 font-sans text-[0.9375rem] leading-[1.5] text-[#6b6c71]">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {(item.content || item.image) && (
                    <div className="overflow-hidden rounded-2xl">
                      {item.content ? (
                        item.content
                      ) : item.image ? (
                        <Image
                          src={item.image}
                          alt={item.imageAlt ?? ""}
                          quality={100}
                          className="block h-auto w-full"
                        />
                      ) : null}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =============================================== */
/* INVISIBLE SIZING CARD */
/* =============================================== */

function SizerCard({
  item,
  visualWidth,
}: {
  item: StepCardItem;
  visualWidth: number;
}) {
  return (
    <div className="min-w-0 rounded-[1rem] bg-white p-2.5">
      <div className="flex min-w-0">
        {/* Grey/text area takes ALL remaining space */}
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <span className="p-4 font-sans text-[1rem] leading-5">00</span>

          <div className="rounded-2xl p-6">
            <h3 className="font-[family-name:var(--font-satoshi)] text-[1.5rem] font-bold leading-[1.25] tracking-[-0.02em]">
              {item.title}
            </h3>

            {item.description && (
              <p className="mt-4 font-sans text-[0.9375rem] leading-[1.5]">
                {item.description}
              </p>
            )}
          </div>
        </div>

        {/* Fixed desktop visual width */}
        {(item.content || item.image) && (
          <div
            className="ml-2.5 shrink-0 overflow-hidden rounded-2xl"
            style={{
              width: visualWidth,
            }}
          >
            {item.content ? (
              <div
                style={{
                  width: visualWidth,
                }}
              >
                {item.content}
              </div>
            ) : item.image ? (
              <Image
                src={item.image}
                alt=""
                quality={100}
                className="block h-auto w-full"
              />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
