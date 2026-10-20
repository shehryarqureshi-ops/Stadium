"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import CircleFlag from "../CircleFlag";
import CatalogProductModal from "./CatalogProductModal";
import DecoMethodsModal from "./DecoMethodsModal";
import CatalogHeader from "./CatalogHeader";
import DietModal from "./DietModal";
import { DIET_ENTRIES } from "./dietData";
import { logoSize } from "./logoSize";
import { thumb } from "./thumb";
import {
  BOOK_A_CALL_HREF,
  SECTIONS,
  buildMosaicColumns,
  mosaicHeightRem,
  type MosaicItem,
  type Product,
  type SectionData,
  type SectionId,
} from "./data";

/* /catalog · tabs + sections (Figma 5291:19092 category-nav, 5633:24820
   secondary nav, mosaics 5299:6294 / 5301:6154 / 5301:6270 / 5340:27624).

   Sticky choreography:
   · Hero zone  → white 4-tab pill docked to the viewport bottom (jumps to a section).
   · A section crosses the viewport's upper band → the tab pill slides away and
     that section's dark "Book a call / View … catalog" pill rises from the bottom.
   · Each pill lives INSIDE its parent as a zero-height `sticky bottom-0` dock,
     so it pins while the parent is on screen and scrolls away with it. */

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

/* ------------------------------------------------------------------ Pills */

function Dock({ children, raised = false }: { children: ReactNode; raised?: boolean }) {
  /* `raised` docks (the CTA pill) float above the tab pill, which stays pinned. */
  return (
    <div className={`pointer-events-none sticky bottom-0 ${raised ? "z-20" : "z-30"} h-0`}>
      <div
        className={`absolute inset-x-0 flex justify-center px-3 md:px-4 ${
          raised
            ? "bottom-[calc(max(1rem,env(safe-area-inset-bottom))+4.75rem)] md:bottom-[6.25rem]"
            : "bottom-[max(1rem,env(safe-area-inset-bottom))] md:bottom-6"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function PillShell({
  show,
  ended = false,
  className = "",
  children,
}: {
  show: boolean;
  /** past the last section — same fade / zoom / blur out */
  ended?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      inert={!show || ended}
      aria-hidden={!show || ended}
      className={`pointer-events-auto origin-bottom transition-[opacity,transform,filter] duration-[900ms] ${EASE} motion-reduce:transition-none ${
        show && !ended
          ? "translate-y-0 scale-100 opacity-100 blur-0"
          : "pointer-events-none translate-y-3 scale-90 opacity-0 blur-[0.5rem]"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function TabsPill({
  activeId,
  ended,
  onJump,
}: {
  activeId: SectionId | null;
  ended: boolean;
  onJump: (id: SectionId) => void;
}) {
  return (
    <PillShell
      show
      ended={ended}
      className="w-full max-w-catalog-pill rounded-full bg-white p-2.5 shadow-catalog-pill"
    >
      <nav aria-label="Catalog categories" className="flex justify-between gap-1 md:gap-2.5">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onJump(s.id)}
            aria-current={activeId === s.id ? "true" : undefined}
            className={`cursor-pointer rounded-full py-3.5 md:flex-1 text-center font-sans text-catalog-tab-sm uppercase transition-colors duration-200 md:px-5 md:py-[0.8125rem] md:text-catalog-tab focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-catalog-ink ${
              activeId === s.id ? "bg-catalog-ink px-5 text-white" : "px-2 text-catalog-ink hover:bg-grey-200 md:px-5"
            }`}
          >
            <span className="lg:hidden">{s.tabShort}</span>
            <span className="hidden lg:inline">{s.tab}</span>
          </button>
        ))}
      </nav>
    </PillShell>
  );
}

function CtaPill({ section, show, ended }: { section: SectionData; show: boolean; ended: boolean }) {
  const btn =
    "flex whitespace-nowrap items-center justify-center rounded-full border border-white px-3 py-3.5 text-center font-sans text-catalog-tab-sm uppercase text-white transition-colors duration-200 hover:bg-white hover:text-catalog-ink md:px-5 md:py-[0.8125rem] md:text-catalog-tab focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
  return (
    <PillShell
      show={show}
      ended={ended}
      className="inline-grid auto-cols-fr grid-flow-col gap-2.5 rounded-full bg-catalog-ink p-2.5 shadow-catalog-pill"
    >
      <a href={BOOK_A_CALL_HREF} className={btn}>
        Book a call
      </a>
      <a
        href={section.catalogHref}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
      >
        View {section.noun}
        <span className="hidden md:inline">&nbsp;catalog</span>
      </a>
    </PillShell>
  );
}

/* ------------------------------------------------------------ Mosaic cards */

const COLUMN_GAP = "gap-catalog-gap";

/* Columns revealed as the page widens (grid-cols above): 2 → 5 (md) → 6 (1280) → 7 (1440) → 8 (1680) → 9 (1920). */
const MOSAIC_COL_VISIBILITY = [
  "",
  "",
  "hidden md:block",
  "hidden md:block",
  "hidden md:block",
  "hidden min-[80rem]:block",
  "hidden min-[90rem]:block",
  "hidden min-[105rem]:block",
  "hidden min-[120rem]:block",
];

/* Column count the mosaic grid shows at a given viewport width — mirrors the Tailwind
   breakpoints on the grid (2 → 5 → 6 → 7 → 8 → 9). */
function mosaicColumnCount(width: number) {
  if (width >= 1920) return 9;
  if (width >= 1680) return 8;
  if (width >= 1440) return 7;
  if (width >= 1280) return 6;
  if (width >= 768) return 5;
  return 2;
}

/* The mosaic is ~850 DOM nodes per section — hydrating four of them (plus the CSS-hidden
   columns) at load blocked every post-hydration effect on the page (header scroll state,
   reveals, auth) for seconds. So it is client-mounted only when its section is within 1.5
   viewport of the screen, and only the columns that are visible at the current width are
   rendered. The wrapper (fixed height + edge fades) is always in the HTML, so nothing shifts. */
function Mosaic({
  section,
  onOpen,
}: {
  section: SectionData;
  onOpen: (p: Product, s: SectionData) => void;
}) {
  const columns = useMemo(() => buildMosaicColumns(section), [section]);
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [colCount, setColCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        // Pause the (very slow) column loops while the mosaic is off-screen.
        el.classList.toggle("catalog-paused", !e.isIntersecting);
        if (e.isIntersecting || e.boundingClientRect.top < window.innerHeight * 2) setNear(true);
      },
      { rootMargin: "150% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!near) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      setColCount(mosaicColumnCount(window.innerWidth));
    };
    measure();
    const onResize = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [near]);

  return (
    <div
      ref={ref}
      className="relative mx-auto h-[min(var(--mosaic-h),90rem)] w-full lg:max-w-catalog-grid overflow-hidden px-section-x-sm md:h-[min(var(--mosaic-h),100rem)] md:px-section-x-md lg:h-[var(--mosaic-h)] lg:px-0"
      style={{ "--mosaic-h": `${mosaicHeightRem(columns)}rem` } as React.CSSProperties}
    >
      {colCount > 0 && (
        <div className={`grid h-full grid-cols-2 md:grid-cols-5 min-[80rem]:grid-cols-6 min-[90rem]:grid-cols-7 min-[105rem]:grid-cols-8 min-[120rem]:grid-cols-9 ${COLUMN_GAP}`}>
          {columns.slice(0, colCount).map((col, c) => (
            <div
              key={c}
              className={`relative overflow-hidden ${MOSAIC_COL_VISIBILITY[c]}`}
            >
              <ul
                className="catalog-track flex flex-col"
                style={
                  {
                    "--catalog-dur": `${col.duration}s`,
                    "--catalog-dir": col.reverse ? "reverse" : "normal",
                    animationDelay: `-${col.phase}s`,
                  } as React.CSSProperties
                }
              >
                {[0, 1].map((half) => (
                  <li key={half} aria-hidden={half === 1 ? true : undefined} className="list-none">
                    <ul className={`flex flex-col pb-catalog-gap ${COLUMN_GAP}`}>
                      {col.items.map((item, i) => (
                        <li
                          key={i}
                          data-animation="reveal"
                          data-reveal-delay={item.delay + c * 40}
                          style={{ height: `${item.h}rem` }}
                          className="shrink-0"
                        >
                          <MosaicCard item={item} section={section} onOpen={onOpen} dup={half === 1} />
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      {/* fades — cards emerge from the heading panel above and dissolve into the next one. The next panel overlaps the last 2.5rem / 3.75rem, so the bottom fade is solid there and then matches the top fade (6rem / 8rem). */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent md:h-32" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[8.5rem] bg-gradient-to-t from-black from-[2.5rem] to-transparent md:h-[11.75rem] md:from-[3.75rem]" />
    </div>
  );
}

/* illustration size inside a tile: Figma card art (natural px) scaled 0.85 to suit the narrower tile */
function dietSize(id: string) {
  const d = DIET_ENTRIES.find((e) => e.id === id);
  return { w: Math.round((d?.w ?? 108) * 0.85), h: Math.round((d?.h ?? 108) * 0.85) };
}

function MosaicCard({
  item,
  section,
  onOpen,
  dup = false,
}: {
  item: MosaicItem;
  section: SectionData;
  onOpen: (p: Product, s: SectionData) => void;
  /** second (looping) copy — clickable, but kept out of the tab order */
  dup?: boolean;
}) {
  const tile =
    "flex h-full w-full flex-col items-center justify-center rounded-catalog-card bg-catalog-tile text-center text-white";

  switch (item.kind) {
    case "product":
      return (
        <button
          type="button"
          onClick={() => onOpen(item.product, section)}
          aria-label={`View ${item.product.name}`}
          tabIndex={dup ? -1 : undefined}
          className="group relative block cursor-pointer h-full w-full overflow-hidden rounded-catalog-tile bg-catalog-tile focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-catalog-ink"
        >
          {item.product.diet ? (
            /* dietary / taste card (Figma 6031:15508): black card, white illustration over the name */
            <span className="flex h-full w-full flex-col items-center justify-center gap-1.5 px-3 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.product.image}
                alt=""
                width={dietSize(item.product.diet).w}
                height={dietSize(item.product.diet).h}
                className="max-w-none"
                style={{ width: `${dietSize(item.product.diet).w / 16}rem`, height: `${dietSize(item.product.diet).h / 16}rem` }}
                loading="lazy"
              />
              <span className="font-display text-[1.125rem] leading-[1.1] tracking-[-0.0187rem] text-white">{item.product.name}</span>
            </span>
          ) : (
            /* pre-sized 400 px static WebP (scripts/gen-catalog-thumbs.mjs): no optimizer queue; the
               modal still opens the full-size photo through next/image */
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumb(item.product.image, "m")}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          )}
          {item.product.deco && (
            /* decoration-method card: black fade + name (Figma C1 style) */
            <>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/90 to-transparent" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 px-3.5 pb-3.5 text-left font-display text-[1.125rem] leading-[1.1] tracking-[-0.0187rem] text-white">
                {item.product.name}
              </span>
            </>
          )}
          <span className="pointer-events-none absolute inset-0 rounded-catalog-tile ring-1 ring-inset ring-white/10" />
        </button>
      );
    case "brand": {
      /* white brand mark (public/catalog-page/logos), sized by its aspect ratio */
      const { w, h } = logoSize(item.brand.ratio ?? 3);
      return (
        <div className={tile}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.brand.logo}
            alt={item.brand.name}
            className="max-w-none object-contain"
            style={{ width: `${w}rem`, height: `${h}rem` }}
            loading="lazy"
          />
        </div>
      );
    }
    case "event":
      return (
        <div className={`${tile} gap-2 px-4`}>
          <p className="font-display text-catalog-country">{item.brand.name}</p>
          <p className="font-sans text-catalog-stat text-white/80">{item.brand.stat}</p>
        </div>
      );
    case "country":
      return (
        <div className={`${tile} gap-2 px-4`}>
          <CircleFlag code={item.country.code} size="3.375rem" />
          <p className="font-display text-catalog-country">{item.country.name}</p>
          <p className="font-sans text-catalog-stat text-white/80">{item.country.stat}</p>
        </div>
      );
    case "stat":
      return (
        <div className={`${tile} gap-3 px-4`}>
          <p
            className={`font-display text-white ${
              item.stat.value.length <= 4 ? "text-display-md" : item.stat.value.length <= 6 ? "text-[2.25rem] leading-none" : "text-[1.75rem] leading-none"
            }`}
          >
            {item.stat.value}
          </p>
          <p className="font-sans text-catalog-stat text-white/80">{item.stat.label}</p>
        </div>
      );
  }
}

/* ---------------------------------------------------------------- Sections */

function CatalogSection({
  section,
  index,
  active,
  ended,
  onOpen,
  sectionRef,
}: {
  section: SectionData;
  index: number;
  active: boolean;
  ended: boolean;
  onOpen: (p: Product, s: SectionData) => void;
  sectionRef: (el: HTMLElement | null) => void;
}) {
  return (
    <section
      id={section.id}
      ref={sectionRef}
      aria-labelledby={`${section.id}-title`}
      className="relative scroll-mt-0"
    >
      <div
        className={`relative z-10 flex flex-col items-center justify-start gap-5 rounded-catalog-panel bg-black px-section-x-sm pb-[6.25rem] pt-[6.25rem] text-center md:min-h-catalog-heading md:gap-7 md:px-section-x-md md:pb-[10.625rem] md:pt-[11.25rem] ${
          index > 0 ? "-mt-10 md:-mt-[3.75rem]" : ""
        }`}
      >
        <CatalogHeader section={section} />
      </div>

      <Mosaic section={section} onOpen={onOpen} />

      <Dock raised>
        <CtaPill section={section} show={active} ended={ended} />
      </Dock>
    </section>
  );
}

/* ---------------------------------------------------------------- Explorer */

export default function CatalogExplorer({ hero }: { hero: ReactNode }) {
  const [activeId, setActiveId] = useState<SectionId | null>(null);
  const [shown, setShown] = useState<SectionId[]>([]);
  const [ended, setEnded] = useState(false);
  const [modal, setModal] = useState<{ product: Product; section: SectionData } | null>(null);
  const els = useRef(new Map<SectionId, HTMLElement>());

  /* Scroll-driven state (rAF-throttled):
     · activeId — the section under the viewport's 45% line → highlights its tab.
     · shown    — every section that has started (top above the 50% line) and not
                  fully left (bottom still on screen). A section's CTA pill stays
                  "shown" while its tail scrolls away, so it leaves with its parent
                  instead of sliding down mid-screen; only a section that has not
                  started yet parks its pill below the fold. */
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      let active: SectionId | null = null;
      let last: { id: SectionId; bottom: number } | null = null;
      const nextShown: SectionId[] = [];
      els.current.forEach((el, id) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.5 && r.bottom > 0) nextShown.push(id);
        if (r.top <= vh * 0.45 && r.bottom > vh * 0.45) active = id;
        if (!last || r.bottom > last.bottom) last = { id, bottom: r.bottom };
      });
      // below the last section the tab stays on it (never snaps back to Swag) …
      if (!active && last && (last as { bottom: number }).bottom <= vh * 0.45) {
        active = (last as { id: SectionId }).id;
      }
      // … and once the end of the last section is on screen both pills fade out.
      setEnded(!!last && (last as { bottom: number }).bottom < vh * 0.9);
      setActiveId((cur) => (cur === active ? cur : active));
      setShown((cur) => {
        const key = nextShown.sort().join();
        return cur.sort().join() === key ? cur : nextShown;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const jump = useCallback((id: SectionId) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    els.current.get(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, []);

  const open = useCallback((product: Product, section: SectionData) => setModal({ product, section }), []);
  const close = useCallback(() => setModal(null), []);

  return (
    <>
      <div className="relative bg-black">
        {hero}
        {SECTIONS.map((s, i) => (
          <CatalogSection
            key={s.id}
            section={s}
            index={i}
            active={shown.includes(s.id)}
            ended={ended}
            onOpen={open}
            sectionRef={(el) => {
              if (el) els.current.set(s.id, el);
              else els.current.delete(s.id);
            }}
          />
        ))}
        {/* tab pill: pinned for the whole catalog, released at "Ready to get started?" */}
        <Dock>
          <TabsPill activeId={activeId} ended={ended} onJump={jump} />
        </Dock>
      </div>

      {modal &&
        (modal.product.diet ? (
          <DietModal initialId={modal.product.diet} section={modal.section} onClose={close} />
        ) : modal.product.deco ? (
          <DecoMethodsModal initialId={modal.product.deco} section={modal.section} onClose={close} />
        ) : (
          <CatalogProductModal product={modal.product} section={modal.section} onClose={close} />
        ))}
    </>
  );
}
