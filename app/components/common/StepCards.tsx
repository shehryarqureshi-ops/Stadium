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
};

type StepCardsProps = {
  caption: string;
  captionColor?: string;
  title: string;
  description: string;
  items: StepCardItem[];
};

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const ACTIVE_RATIO = 3.125;

const TEXT_WIDTH = 280;

/**
 * Desktop spacing:
 *
 * Card padding:
 * 10px left
 * 10px right
 *
 * Gap between text + image:
 * 10px
 *
 * Total space outside visual:
 * 280 + 10 + 10 + 10 = 310px
 */
const CARD_HORIZONTAL_SPACE = TEXT_WIDTH + 30;

const GRID_GAP = 16;

export default function StepCards({
  caption,
  captionColor = "#2178f5",
  title,
  description,
  items,
}: StepCardsProps) {
  const [active, setActive] = useState(0);

  if (!items.length) return null;

  const gridTemplateColumns = items
    .map((_, index) =>
      index === active ? `${ACTIVE_RATIO}fr` : "1fr",
    )
    .join(" ");

  const sizingGridTemplateColumns = [
    `${ACTIVE_RATIO}fr`,
    ...items.slice(1).map(() => "1fr"),
  ].join(" ");

  /**
   * Fraction of the available grid width occupied
   * by the expanded card.
   *
   * Example with 3 cards:
   *
   * 3.125 / (3.125 + 1 + 1)
   */
  const expandedFraction =
    ACTIVE_RATIO / (ACTIVE_RATIO + items.length - 1);

  /**
   * Total grid gaps between cards.
   */
  const totalGridGap = (items.length - 1) * GRID_GAP;

  /**
   * The accordion itself is a CSS query container.
   *
   * 100cqw = its full inner width.
   *
   * This expression gives us the exact width of a card
   * once fully expanded.
   */
  const expandedCardWidth = `calc((100cqw - ${totalGridGap}px) * ${expandedFraction})`;

  /**
   * The image area inside an expanded card.
   *
   * This value NEVER changes during the animation.
   */
  const expandedVisualWidth = `calc(${expandedCardWidth} - ${CARD_HORIZONTAL_SPACE}px)`;

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
            className="mt-3 font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]"
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
            {/*
             * All sizing cards occupy the expanded column
             * and are stacked on top of one another.
             *
             * The tallest one determines the natural
             * accordion height.
             */}
            <div className="col-start-1 grid">
              {items.map((item, index) => (
                <div
                  key={`sizer-${index}`}
                  className="col-start-1 row-start-1 min-w-0"
                >
                  <SizerCard item={item} />
                </div>
              ))}
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

                /**
                 * Enables 100cqw inside this container.
                 */
                containerType: "inline-size",
              } as CSSProperties
            }
          >
            {items.map((item, index) => {
              const isActive = index === active;

              const number = String(index + 1).padStart(
                2,
                "0",
              );

              const panelId = `step-card-panel-${index}`;

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

                    ${isActive
                      ? "shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                      : "shadow-[0_1px_2px_rgba(0,0,0,0.025)]"
                    }
                  `}
                  style={{
                    transitionTimingFunction: EASE,
                  }}
                >
                  <div className="relative flex h-full min-w-0">
                    {/* ================================= */}
                    {/* TEXT */}
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

                        ${isActive
                          ? "w-[17.5rem]"
                          : "w-full"
                        }
                      `}
                      style={{
                        transitionTimingFunction: EASE,
                      }}
                    >
                      <span className="shrink-0 p-4 font-sans text-[1rem] leading-5 text-[#a9a9ad]">
                        {number}
                      </span>

                      {/* Bottom information card */}
                      <div className="relative overflow-hidden rounded-2xl bg-[#f4f4f5]">
                        {/*
                         * Fixed inner width means the text does
                         * not continuously re-wrap as the card
                         * changes width.
                         */}
                        <div
                          className="p-6"
                          style={{
                            width: TEXT_WIDTH,
                          }}
                        >
                          <h3 className="font-[family-name:var(--font-satoshi)] text-[1.5rem] font-bold leading-[1.25] tracking-[-0.02em] text-[#16171b]">
                            {item.title}
                          </h3>

                          {item.description && (
                            <div
                              className={`
                                overflow-hidden
                                transition-[max-height,opacity,transform,margin]
                                duration-500

                                ${isActive
                                  ? "mt-4 max-h-40 translate-y-0 opacity-100"
                                  : "mt-0 max-h-0 translate-y-2 opacity-0"
                                }
                              `}
                              style={{
                                transitionTimingFunction: EASE,

                                transitionDelay: isActive
                                  ? "220ms"
                                  : "0ms",
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

                          ${isActive
                            ? "ml-2.5"
                            : "ml-0"
                          }
                        `}
                        style={{
                          transitionTimingFunction: EASE,
                        }}
                      >
                        {/*
                         * This is the important part.
                         *
                         * The visual is ALWAYS rendered at the
                         * exact width it will have when this
                         * card is fully expanded.
                         *
                         * Its width never animates.
                         *
                         * As the card expands, this outer
                         * overflow-hidden viewport simply
                         * reveals more of it.
                         */}
                        <div
                          className="absolute left-0 top-0 max-w-none"
                          style={{
                            width: expandedVisualWidth,
                          }}
                        >
                          {item.content ? (
                            <div
                              style={{
                                width: expandedVisualWidth,
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
            const number = String(index + 1).padStart(
              2,
              "0",
            );

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
}: {
  item: StepCardItem;
}) {
  return (
    <div className="min-w-0 rounded-[1rem] bg-white p-2.5">
      <div className="flex min-w-0">
        {/* Text */}
        <div
          className="flex shrink-0 flex-col justify-between"
          style={{
            width: TEXT_WIDTH,
          }}
        >
          <span className="p-4 font-sans text-[1rem] leading-5">
            00
          </span>

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

        {/* Natural expanded visual */}
        {(item.content || item.image) && (
          <div className="ml-2.5 min-w-0 flex-1 overflow-hidden rounded-2xl">
            {item.content ? (
              item.content
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