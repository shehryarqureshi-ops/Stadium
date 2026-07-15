import type { ReactNode } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";

/* Shared mega-menu shell — the one skeleton every nav dropdown uses, so the
   four menus stay one system. Built on our 12-col grid: 1440 frame · 90
   margins · 1200 content · 24 gutter. Up to three zones, left -> right:
     - Switcher rail  210px  (white-pill: transparent rail, white active chip)
     - Content        fills; link columns @ 24 gutter
     - Feature card   384px  (MenuCard — one image-card format for all four)
   Synced to Figma 1350:36111 (2026-06-20). */

export function MenuShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-section">
      <div className="menu-trim flex flex-col gap-6 px-section-x-lg pt-8 pb-[5.25rem]">{children}</div>
    </div>
  );
}

/* The 3-zone row. items-stretch so the feature card runs full height; the
   switcher rail opts out with self-start. */
export function MenuRow({ children }: { children: ReactNode }) {
  return <div className="flex items-stretch gap-[2.8125rem]">{children}</div>;
}

export function MenuContent({ children }: { children: ReactNode }) {
  return <div className="flex min-w-0 flex-1 flex-col gap-6">{children}</div>;
}

/* Shared lucide-style right arrow (feature-card CTAs). */
function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

/* Unified feature card — the ONE format every menu's feature zone uses
   (Proof / Catalog / Engage / Impact): full-height image fill + bottom-weighted
   scrim · white uppercase eyebrow + white display title + outlined CTA, all
   bottom-anchored. Stretches to the content height via the row's items-stretch;
   min-h floors it when content is short. */
export function MenuCard({
  image,
  eyebrow,
  title,
  cta,
  href = "#",
  imgClassName = "object-center",
}: {
  image: StaticImageData;
  eyebrow: string;
  title: string;
  cta: string;
  href?: string;
  imgClassName?: string;
}) {
  return (
    <a
      href={href}
      className="group relative flex min-h-[20rem] w-[24rem] shrink-0 flex-col justify-end overflow-hidden rounded-card bg-grey-800"
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="24rem"
        className={`object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105 ${imgClassName}`}
      />
      {/* bottom-weighted scrim — holds white text contrast over photography */}
      <span
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.9),rgba(0,0,0,0.5)_45%,transparent_85%)]"
      />
      <span className="relative flex flex-col gap-5 p-7">
        <span className="flex flex-col gap-4">
          <span className="font-sans text-[0.75rem] font-semibold uppercase leading-[0.9rem] tracking-[0.0156rem] text-white">
            {eyebrow}
          </span>
          <span className="font-display text-heading-sm text-white">{title}</span>
        </span>
        <span className="inline-flex h-button-h w-fit items-center gap-2 rounded-button border border-white/35 px-button-x font-sans text-button-primary uppercase text-white transition-all duration-200 group-hover:border-white/70 group-hover:bg-white/10">
          {cta}
          <ArrowRight className="size-4" />
        </span>
      </span>
    </a>
  );
}

/* Light editorial feature panel — the Figma format for Impact / Proof / Catalog
   (nodes 2:75850 / 75960 / 76220): a grey (#f2f2f2) rail panel with a dark
   eyebrow ABOVE a WHITE card (image on top, dark title + grey text-link CTA
   below). Replaces the dark full-image MenuCard in those three menus. */
export function MenuFeaturePanel({
  eyebrow,
  image,
  aspect,
  title,
  cta,
  href = "#",
}: {
  eyebrow: string;
  image: StaticImageData;
  aspect: string; // e.g. "384 / 336"
  title: string;
  cta: string;
  href?: string;
}) {
  return (
    <div className="-mt-8 -mb-[5.25rem] flex w-[18.75rem] shrink-0 flex-col gap-6 self-stretch bg-[#f2f2f2] px-6 py-8">
      <p className="font-sans text-[0.75rem] font-semibold uppercase leading-4 tracking-[0.0156rem] text-[#1b1b1b]">
        {eyebrow}
      </p>
      <a
        href={href}
        className="group flex flex-col gap-3 rounded-[0.75rem] bg-white p-2.5 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]"
      >
        <span
          className="relative block w-full overflow-hidden rounded-[0.5rem] bg-grey-100"
          style={{ aspectRatio: aspect }}
        >
          <Image
            src={image}
            alt=""
            fill
            sizes="16rem"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </span>
        <span className="flex flex-col gap-1 px-1 pb-1">
          <span className="font-sans text-[0.875rem] font-semibold leading-5 text-[#181818]">{title}</span>
          <span className="flex items-center gap-1 font-sans text-[0.75rem] font-normal leading-[1.125rem] text-[#6f7072]">
            {cta}
            <ArrowRight className="size-3" />
          </span>
        </span>
      </a>
    </div>
  );
}

function ChevronRight() {
  return (
    <svg
      className="size-2.5 shrink-0 text-ink"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m3 1.5 4 3.5-4 3.5" />
    </svg>
  );
}

/* 210px switcher rail — white-pill: transparent rail (no panel fill/border),
   active = white chip + hairline border + soft shadow + ink semibold,
   inactive = grey text. pad-top 0 so the first chip's top aligns with the
   content/region-selector top. Shared by Catalog (categories) and Impact
   (teams). */
export function MenuSwitcher({
  label,
  items,
  active,
  onSelect,
}: {
  label: string;
  items: string[];
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <nav
      aria-label={label}
      className="flex w-[15.9375rem] shrink-0 flex-col gap-2 self-start pb-2"
    >
      {items.map((name, i) => (
        <button
          key={name}
          type="button"
          aria-pressed={i === active}
          onMouseEnter={() => onSelect(i)}
          onClick={() => onSelect(i)}
          className={`flex h-10 w-full cursor-pointer items-center justify-between rounded-xl border px-3.5 text-left font-sans text-[0.875rem] leading-5 transition-all duration-150 ${
            i === active
              ? "border-grey-200 bg-white font-semibold text-ink shadow-card-soft"
              : "border-transparent font-normal text-grey-500 hover:bg-grey-100 hover:text-ink"
          }`}
        >
          <span className="-translate-y-px">{name}</span>
          {i === active && <ChevronRight />}
        </button>
      ))}
    </nav>
  );
}

/* (MenuLogoRow + Logo removed 2026-06-20 — the synced menus dropped logo bands;
   the only consumer was the deleted v2/ProofMenu experiment.) */
