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
  /** a string src is used for vector artwork */
  image: StaticImageData | string;
  /** overrides `image` for alt text; falls back to `name` */
  imageAlt?: string;
  href?: string;
  cta?: string;
};

type TabsShowcaseProps = {
  caption: string;
  title: string;
  description?: string;
  items: TabsShowcaseItem[];
  autoAdvance?: boolean;
  captionColor?: string;
  glowColor?: string;
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

export default function PillTabs({
  caption,
  title,
  description,
  items,
  autoAdvance = true,
  captionColor: accent,
  glowColor,
}: TabsShowcaseProps) {
  const [active, setActive] = useState(0);

  const item = items[active];

  const { sectionRef, takeOver } = useAutoAdvance(() => {
    if (!autoAdvance || items.length <= 1) return;

    setActive((i) => (i + 1) % items.length);
  });

  const select = (index: number) => {
    if (index === active) return;

    takeOver();
    setActive(index);
  };

  if (!items.length) return null;

  return (
    <section
      ref={sectionRef}
      className="relative min-w-0 bg-white px-section-x-sm md:px-section-x-md lg:px-section-x-lg"
    >
      {/* Background blurred symbol */}
      <div className="absolute inset-0 flex justify-center-safe blur-[400px]">
        <svg
          width="983"
          height="554"
          viewBox="0 0 983 554"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.33">
            {glowColor ? (
              <>
                <path
                  d="M983 553.983L673.231 553.983L597.904 480.36L673.231 406.874L983 406.874L983 553.983Z"
                  fill={glowColor}
                />
                <path
                  d="M597.912 480.381L491.511 376.388L785.882 88.8161L892.282 192.808L597.912 480.381Z"
                  fill={glowColor}
                />
                <path
                  d="M673.234 554L460.431 554L90.8746 192.808L197.274 88.8161L673.234 554Z"
                  fill={glowColor}
                />
                <path
                  d="M491.502 376.379L416.314 302.893L416.314 -2.47706e-05L566.827 -1.81915e-05L566.827 302.893L491.502 376.379Z"
                  fill={glowColor}
                />
                <path
                  d="M460.418 553.983L-3.70809e-05 553.983L-3.06506e-05 406.874L309.906 406.874L460.418 553.983Z"
                  fill={glowColor}
                />
              </>
            ) : (
              <>
                <path
                  d="M983 553.983L673.231 553.983L597.904 480.36L673.231 406.874L983 406.874L983 553.983Z"
                  fill="#8D12E7"
                />
                <path
                  d="M597.912 480.381L491.511 376.388L785.882 88.8161L892.282 192.808L597.912 480.381Z"
                  fill="#0B7AFC"
                />
                <path
                  d="M673.234 554L460.431 554L90.8746 192.808L197.274 88.8161L673.234 554Z"
                  fill="#FF5B77"
                />
                <path
                  d="M491.502 376.379L416.314 302.893L416.314 -2.47706e-05L566.827 -1.81915e-05L566.827 302.893L491.502 376.379Z"
                  fill="#FFB800"
                />
                <path
                  d="M460.418 553.983L-3.70809e-05 553.983L-3.06506e-05 406.874L309.906 406.874L460.418 553.983Z"
                  fill="#00C036"
                />
              </>
            )}
          </g>
        </svg>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-content flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p
            data-animation="reveal"
            className="font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem] text-[#1b1b1b]/60"
            style={accent ? { color: accent } : undefined}
          >
            {caption}
          </p>

          <h2
            data-animation="reveal"
            className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
          >
            {title}
          </h2>

          {description && (
            <p
              data-animation="reveal"
              className="mt-3 max-w-[42rem] font-sans text-[1.125rem] leading-[1.48] text-[#6b6c71]"
            >
              {description}
            </p>
          )}
        </div>

        {/* Tabs */}
        <div data-id="tabs" className="text-center">
          <ul className="inline-flex max-w-full justify-between gap-2.5 overflow-x-auto rounded-full border border-[#e0e0e0] bg-white/75 p-2.5 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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

        {/* Preload all images */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
        >
          {items.map((preloadItem) => (
            <Image
              key={`preload-${preloadItem.name}`}
              src={preloadItem.image}
              alt=""
              width={1}
              height={1}
              priority
            />
          ))}
        </div>

        {/* Content card */}
        <div className="flex flex-col gap-6 overflow-hidden rounded-[2rem] border border-[#e0e0e0] bg-white p-2.5 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)] lg:flex-row lg:gap-[3.75rem]">
          {/* Active image */}
          <div className="w-full shrink-0 lg:w-1/2">
            <div key={`image-${item.name}`} className="teams-panel-in w-full">
              <Image
                src={item.image}
                alt={item.imageAlt ?? item.name}
                quality={100}
                width={0}
                height={0}
                className="h-auto w-full rounded-3xl object-top-left"
                sizes="(min-width: 1024px) 50vw, 92vw"
              />
            </div>
          </div>

          {/* Active content */}
          <div
            key={`content-${item.name}`}
            className="teams-panel-in flex flex-1 flex-col justify-center gap-8 px-6 pb-6 lg:pr-10"
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

                    <span className="font-sans text-[0.9375rem] leading-[1.2] text-[#16171b]">
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
