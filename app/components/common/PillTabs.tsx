"use client";

import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useState } from "react";
import { useAutoAdvance } from "@/hooks/useAutoAdvance";

export type TabsShowcaseItem = {
  name: string;
  tab: string;
  title: string;
  description: string;
  bullets?: string[];
  /** a string src is used for vector artwork (rendered as a plain <img>) */
  image: StaticImageData | string | null;
  /** overrides `image` for alt text; falls back to `name` */
  imageAlt?: string;
  /** this panel's own Figma aspect, e.g. "602/332". Falls back to the
   *  variant default. Panels in one set may legitimately differ. */
  aspect?: string;
  href?: string;
  cta?: string;
};

type TabsShowcaseProps = {
  caption: string;
  title: string;
  description?: string;
  items: TabsShowcaseItem[];
  autoAdvance?: boolean;
  /** "teams" = the original recognition/teams look (default, unchanged).
   *  "band"  = the vertical-page band: amber-ish caption, 44px heading,
   *  borderless white/75 card, no aurora. */
  variant?: "teams" | "band";
  /** caption colour for the "band" variant (each vertical has its own accent) */
  accent?: string;
  /** optional decorative glow behind the band, e.g. the gifting symbol gradient */
  glow?: { src: string; className: string };
};

function CheckIcon() {
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

export default function TabsShowcase({
  caption,
  title,
  description,
  items,
  autoAdvance = true,
  variant = "teams",
  accent,
  glow,
}: TabsShowcaseProps) {
  const band = variant === "band";
  const [active, setActive] = useState(0);

  const item = items[active];

  const { sectionRef, takeOver } = useAutoAdvance(() => {
    if (!autoAdvance || items.length <= 1) return;

    setActive((i) => (i + 1) % items.length);
  });

  const select = (index: number) => {
    takeOver();
    setActive(index);
  };

  if (!items.length) return null;

  return (
    <section
      ref={sectionRef}
      className={
        band
          ? "relative overflow-hidden bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-20"
          : "relative bg-white px-section-x-sm md:px-section-x-md lg:px-[6.25rem]"
      }
    >
      {/* Background */}
      {band ? (
        glow && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={glow.src} alt="" aria-hidden className={glow.className} />
        )
      ) : (
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[46%] z-0 aspect-[2880/2708] w-[95rem] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-75"
          style={{
            backgroundImage: "url(/teams-aurora.png)",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}

      <div
        className={`relative z-10 mx-auto flex w-full flex-col gap-10 ${
          band ? "max-w-content" : "max-w-[77.5rem]"
        }`}
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p
            data-animation="reveal"
            className={
              band
                ? "font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem]"
                : "font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem] text-[#1b1b1b]/60"
            }
            style={band && accent ? { color: accent } : undefined}
          >
            {caption}
          </p>

          <h2
            data-animation="reveal"
            className={
              band
                ? "font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
                : "font-display text-heading-sm text-[#16171b] md:text-heading-md lg:text-[3.4375rem] lg:leading-[3.75rem] lg:tracking-[-0.075rem]"
            }
          >
            {title}
          </h2>

          {description && (
            <p
              data-animation="reveal"
              className={
                band
                  ? "mt-3 max-w-[42rem] font-sans text-[1.125rem] leading-[1.48] text-[#6b6c71]"
                  : "mt-3 max-w-[42rem] font-sans text-lg leading-6 text-[#6e7380]"
              }
            >
              {description}
            </p>
          )}
        </div>

        {/* Tabs */}
        <div data-animation="reveal" className="flex justify-center">
          <ul
            className={`flex max-w-full gap-2.5 overflow-x-auto rounded-full bg-white/75 p-2.5 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
              band ? "" : "border border-[#e0e0e0]"
            }`}
          >
            {items.map((item, index) => (
              <li key={item.name} className="shrink-0">
                <button
                  type="button"
                  onClick={() => select(index)}
                  aria-pressed={index === active}
                  className={`cursor-pointer whitespace-nowrap rounded-full px-5 py-[0.8125rem] font-sans text-[0.75rem] font-bold uppercase tracking-[0.0625rem] transition-colors duration-200 ${
                    index === active
                      ? "bg-[#16171b] text-white"
                      : "text-[#16171b] hover:bg-grey-100"
                  }`}
                >
                  {item.tab}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Content card */}
        <div
          data-animation="reveal"
          className={`flex flex-col gap-6 overflow-hidden rounded-[2rem] p-2.5 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)] lg:flex-row lg:gap-[3.75rem] ${
            band ? "bg-white/75 lg:items-start" : "border border-[#e0e0e0] bg-white"
          }`}
        >
          {/* Images — the slot is a fixed share of the card with a CONSTANT
              aspect, so the visible proportion never drifts with the viewport
              (pinning height and flexing width made it swing 1.03→1.51). */}
          <div
            className={`relative w-full shrink-0 overflow-hidden ${
              band ? "rounded-[1.5rem] lg:w-[47.54%]" : "rounded-xl lg:w-[48%]"
            }`}
            style={{
              aspectRatio: (item.aspect ?? (band ? "580/370" : "580/481")).replace("/", " / "),
            }}
          >
            {items.map((tabItem, index) =>
              typeof tabItem.image === "string" ? (
                /* vector artwork — keep it crisp, never re-encoded */
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={tabItem.name}
                  src={tabItem.image}
                  alt={tabItem.imageAlt ?? tabItem.name}
                  className={`absolute inset-0 h-full w-full select-none object-contain transition-opacity duration-500 ease-out motion-reduce:transition-none ${
                    index === active ? "opacity-100" : "opacity-0"
                  }`}
                />
              ) : tabItem.image ? (
                <Image
                  key={tabItem.name}
                  src={tabItem.image}
                  alt={tabItem.imageAlt ?? tabItem.name}
                  fill
                  quality={band ? 100 : undefined}
                  sizes="(min-width: 64rem) 36rem, 100vw"
                  className={`object-cover overflow-hidden transition-opacity duration-500 ease-out motion-reduce:transition-none ${
                    band ? "" : "rounded-3xl"
                  } ${index === active ? "opacity-100" : "opacity-0"}`}
                />
              ) : (
                <div
                  key={tabItem.name}
                  className={`absolute inset-0 flex items-center justify-center bg-grey-100 transition-opacity duration-500 ease-out ${
                    index === active ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className="font-display text-[1.25rem] font-bold text-grey-400">
                    {tabItem.name}
                  </span>
                </div>
              ),
            )}
          </div>

          {/* Active content */}
          <div
            key={`content-${item.name}`}
            className={`teams-panel-in flex flex-col gap-8 pb-6 pr-2 lg:py-[3.75rem] lg:pr-10 ${
              band ? "" : "justify-center"
            }`}
          >
            <div className="flex flex-col gap-5">
              <h3 className="whitespace-pre-line font-display text-[2rem] font-bold leading-[2.375rem] text-[#16171b]">
                {item.title}
              </h3>

              <p className="max-w-[34rem] font-sans text-[1rem] leading-6 text-[#828282]">
                {item.description}
              </p>
            </div>

            {!!item.bullets?.length && (
              <ul className="flex flex-col gap-3">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-3">
                    <CheckIcon />

                    <span
                      className={
                        band
                          ? "font-sans text-[0.9375rem] leading-[1.2] text-[#16171b]"
                          : "font-sans text-[1rem] font-semibold text-ink"
                      }
                    >
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {item.href && (
              <a
                href={item.href}
                className="font-sans text-[0.75rem] font-bold uppercase tracking-[0.0625rem] text-[#16171b] underline underline-offset-4 transition-opacity hover:opacity-70"
              >
                {item.cta ?? `Explore ${item.name}`}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
