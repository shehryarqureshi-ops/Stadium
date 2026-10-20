"use client";

import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useAutoAdvance } from "@/hooks/useAutoAdvance";

export type TabsShowcaseItem = {
  /** url-hash slug (e.g. "onboarding" → /impact/hr#onboarding). When any item
   *  has one, the active tab is synced to the hash and deep-linkable. */
  id?: string;
  name: string;
  tab: string;
  title: string;
  description: string;
  bullets?: string[];
  /** a string src is used for vector artwork; omit for a grey placeholder */
  image?: StaticImageData | string;
  /** overrides `image` for alt text; falls back to `name` */
  imageAlt?: string;
  /** floating UI pinned over the image (e.g. a notification toast) */
  overlay?: ReactNode;
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
  /** id of the <section>, so the block can also be linked to as a whole */
  sectionId?: string;
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

const glowVariantFor = (c?: string) =>
  !c ? "default" : c.toLowerCase() === "#8d12e7" ? "purple" : "green";

export default function PillTabs({
  caption,
  title,
  description,
  items,
  autoAdvance = true,
  captionColor: accent,
  glowColor,
  sectionId = "journey",
}: TabsShowcaseProps) {
  const [active, setActive] = useState(0);
  const glowVariant = glowVariantFor(glowColor);

  const item = items[active];

  const { sectionRef, takeOver } = useAutoAdvance(() => {
    if (!autoAdvance || items.length <= 1) return;

    setActive((i) => (i + 1) % items.length);
  });

  /* set once a pill is clicked: pills never scroll, and must cancel the
     late re-scroll of a deep link */
  const clicked = useRef(false);
  const hashEnabled = items.some((i) => i.id);

  /* Deep links: `#<item.id>` selects that tab and scrolls the block into
     view — on load, and on later hash changes (header menu, back/forward).
     Mount-only on purpose: takeOver/items change identity across renders, and
     re-running this after a pill click would re-scroll to the section. */
  const latest = useRef({ items, takeOver, sectionRef });
  useEffect(() => {
    latest.current = { items, takeOver, sectionRef };
  });

  useEffect(() => {
    if (!hashEnabled) return;
    const apply = (scroll: boolean) => {
      const { items: list, sectionRef: ref } = latest.current;
      const hash = decodeURIComponent(window.location.hash.slice(1));
      const index = hash ? list.findIndex((i) => i.id === hash) : -1;
      if (index < 0) return;
      setActive(index);
      if (scroll) {
        /* wait a frame so layout (and the tab swap) has settled */
        requestAnimationFrame(() =>
          ref.current?.scrollIntoView({ behavior: "auto", block: "start" }),
        );
      }
    };
    const onHash = () => {
      latest.current.takeOver();
      apply(true);
    };
    /* initial load: images above may still shift layout, so re-scroll once */
    const t0 = window.setTimeout(() => apply(true), 0);
    const t1 = window.setTimeout(() => {
      if (!clicked.current) apply(true);
    }, 400);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      window.removeEventListener("hashchange", onHash);
    };
  }, [hashEnabled]);

  const select = (index: number) => {
    if (index === active) return;

    takeOver();
    clicked.current = true;
    setActive(index);
    const id = items[index]?.id;
    /* Bypass Next's patched history.replaceState: its router treats a hash
       change as a navigation and scrolls (to top when no element has that id). */
    if (id)
      History.prototype.replaceState.call(window.history, window.history.state, "", `#${id}`);
  };

  if (!items.length) return null;

  return (
    <section
      ref={sectionRef}
      id={hashEnabled ? sectionId : undefined}
      className="relative min-w-0 scroll-mt-[11.5rem] bg-white px-section-x-sm md:px-section-x-md lg:px-section-x-lg"
    >
      {/* Background glow: the brand mark at 33% opacity under a 400px blur.
          A live blur-[400px] on a section-sized layer is extremely expensive
          for Safari to rasterise, so it is baked into a ~12 KB webp (pad 1200px
          around the 983×554 mark; the soft image upscales cleanly). Variants:
          default multicolour, purple, green. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex justify-center-safe">
        <div className="relative h-[34.625rem] w-[61.4375rem] shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/pilltabs-glow-${glowVariant}.webp`}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute -left-[75rem] -top-[75rem] h-[184.625rem] max-w-none w-[211.4375rem]"
          />
        </div>
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
              className="mt-3 max-w-[44rem] font-sans text-[1.125rem] leading-[1.48] text-[#6b6c71]"
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
                  id={item.id ? `tab-${item.id}` : undefined}
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
        <div className="flex flex-col gap-6 overflow-hidden rounded-[2rem] border border-[#e0e0e0] bg-white p-2.5 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)] lg:flex-row lg:gap-[3.75rem]">
          {/* Active image */}
          <div className="w-full shrink-0 lg:w-1/2">
            <div
              key={`image-${item.name}`}
              className="teams-panel-in relative w-full"
              /* reserve the image's height up front: width/height={0} below
                 collapses the card until the new image loads, shifting the page */
              style={
                typeof item.image === "object"
                  ? { aspectRatio: `${item.image.width} / ${item.image.height}` }
                  : undefined
              }
            >
              {item.image ? (
              <Image
                src={item.image}
                alt={item.imageAlt ?? item.name}
                quality={100}
                width={0}
                height={0}
                className="h-auto w-full rounded-3xl object-top-left"
                sizes="(min-width: 1024px) 50vw, 92vw"
              />
              ) : (
                <div aria-hidden className="aspect-[580/394] w-full rounded-3xl bg-[#e0e0e0]" />
              )}
              {item.overlay}
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

              <p className="max-w-[34rem] font-sans text-[1rem] leading-6 text-[#757575]">
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
