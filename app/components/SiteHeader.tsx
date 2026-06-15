"use client";

import { useEffect, useRef, useState } from "react";
import EngageMenu, { COLUMNS as ENGAGE_COLUMNS } from "./EngageMenu";
import ImpactMenu, { TEAMS as IMPACT_TEAMS } from "./ImpactMenu";
import ProofMenu, { PROOF_COLUMNS } from "./ProofMenu";
import CatalogMenu, { CATALOG_TABS } from "./CatalogMenu";

type MenuKey = "engage" | "impact" | "proof" | "catalog";

/* Order of the mega-menu triggers — drives the horizontal slide track so the
   drawer shifts left/right between sections in nav order (Linear behavior). */
const MENU_KEYS: MenuKey[] = ["engage", "impact", "proof", "catalog"];

/* `active` = current-page marker (bold). Never hardcoded: the homepage is
   none of these pages, and Shopify keeps nav weight uniform until you're
   actually on a section's page (2026-06-12 audit). Set it from the route
   when real pages exist. */
const NAV_ITEMS: { label: string; href: string; active?: boolean; menu?: MenuKey }[] = [
  { label: "Ways to Engage", href: "#", menu: "engage" },
  { label: "Impact by Team", href: "#", menu: "impact" },
  { label: "The Proof", href: "#", menu: "proof" },
  { label: "Catalog", href: "#", menu: "catalog" },
  { label: "Pricing", href: "#" },
];

/* Menu triggers carry a chevron that flips while their drawer is open
   (Shopify affordance, adopted 2026-06-12 — triggers were previously
   indistinguishable from plain links). */
function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      className={`size-3 shrink-0 transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m3 4.5 3 3 3-3" />
    </svg>
  );
}

/* The light (over-hero) state recolors the SAME lockup white via CSS filter
   — identical geometry in both states so nothing shifts on the
   transparent↔solid transition (Shopify behavior). */
function Logo({ light }: { light: boolean }) {
  const filter = light ? "brightness-0 invert" : "";
  return (
    <a
      href="#"
      aria-label="Stadium home"
      className={`flex h-8 w-[8.25rem] items-center gap-2 ${
        light ? "focus-visible:outline-white" : ""
      }`}
    >
      <img
        src="/header-logo-mark.svg"
        alt=""
        className={`h-[1.375rem] w-[0.8125rem] transition-[filter] duration-300 ${filter}`}
        width={13}
        height={22}
      />
      <img
        src="/header-logo-wordmark.svg"
        alt="Stadium"
        className={`h-[1.375rem] w-[6.3125rem] transition-[filter] duration-300 ${filter}`}
        width={101}
        height={22}
      />
    </a>
  );
}

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  /* which accordion section is expanded in the mobile panel (Shopify
     mobile-nav pattern, 2026-06-12 — the mega-menu content was previously
     unreachable on touch) */
  const [openSection, setOpenSection] = useState<MenuKey | null>(null);
  const [scrolled, setScrolled] = useState(false);
  /* which mega-menu is open; hovering between the two triggers swaps the
     content INSIDE the open drawer instead of cycling it (Shopify). The
     last menu stays rendered during the close retract. */
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [lastMenu, setLastMenu] = useState<MenuKey>("engage");
  const shownMenu = activeMenu ?? lastMenu;
  const engageOpen = activeMenu !== null;
  const menuIndex = MENU_KEYS.indexOf(shownMenu);

  /* Fixed-height slide surface: the drawer takes the TALLEST section's height,
     so switching sections only slides horizontally and never animates layout
     — the previous per-section height-morph reflowed the menu content every
     frame and made the open feel laggy. Panels are always mounted so the
     track can slide; measured here. */
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [viewportHeight, setViewportHeight] = useState<number | undefined>(undefined);
  useEffect(() => {
    const measure = () => {
      const h = panelRefs.current.reduce(
        (m, el) => Math.max(m, el ? el.offsetHeight : 0),
        0,
      );
      if (h) setViewportHeight(h);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* Close sequencing (user-flagged 2026-06-12): the drawer retracts over
     350ms — the nav holds solid for the whole retract and only THEN fades
     back to transparent (without the hold, the bar goes transparent over a
     still-white drawer). Event-driven, no effects: closing starts the
     350ms settle hold; opening cancels it. */
  const [drawerSettling, setDrawerSettling] = useState(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openMenu = (menu: MenuKey) => {
    if (settleTimer.current) {
      clearTimeout(settleTimer.current);
      settleTimer.current = null;
    }
    setDrawerSettling(false);
    setActiveMenu(menu);
    setLastMenu(menu);
  };
  const closeMenu = () => {
    if (activeMenu !== null) {
      setDrawerSettling(true);
      if (settleTimer.current) clearTimeout(settleTimer.current);
      settleTimer.current = setTimeout(() => {
        setDrawerSettling(false);
        settleTimer.current = null;
      }, 350);
    }
    setActiveMenu(null);
  };
  /* clear any pending settle timer on unmount */
  useEffect(
    () => () => {
      if (settleTimer.current) clearTimeout(settleTimer.current);
    },
    [],
  );

  /* Transparent over the hero, solid white once scrolled — shopify.com
     behavior (approved 2026-06-11). The header is fixed; Hero.tsx adds 4rem
     of top clearance so its content keeps the Figma positions. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Esc closes the mega-menu (through closeMenu so the nav-solid hold
     sequences with the retract) */
  useEffect(() => {
    if (!engageOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const solid = scrolled || menuOpen || engageOpen || drawerSettling;
  /* hover dims in both states (Shopify: every nav item responds); the
     transparent state swaps the global ink focus ring for white */
  const baseLink = solid
    ? "text-ink hover:text-grey-600"
    : "text-white hover:text-white/75 focus-visible:outline-white";

  return (
    <>
      {/* Page backdrop while a mega-menu is open — a plain dim scrim. NOT a
          backdrop-blur: blurring the whole viewport every frame, over the
          looping marquees (TrustBand/Occasions) behind it, made the dropdown
          stutter. The scrim is free. Desktop only; click anywhere to dismiss. */}
      <div
        aria-hidden
        onClick={closeMenu}
        className={`fixed inset-0 z-40 hidden bg-ink/30 transition-opacity duration-300 motion-reduce:transition-none lg:block ${
          engageOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <header
        onMouseLeave={closeMenu}
        /* the bg transition is suppressed while the mega-menu is open: the
           panel appears instantly, so a lagging 300ms bg fade reads as a
           white flash under a still-transparent nav */
        className={`fixed top-0 z-50 w-full ${
          engageOpen ? "" : "transition-colors duration-300"
        } ${
          solid
            ? "bg-surface-base shadow-[0px_0.25rem_0.75rem_0px_rgba(0,0,0,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-section items-center justify-between px-section-x-sm py-4 md:px-section-x-md lg:h-16 lg:px-section-x-lg lg:py-3">
          <Logo light={!solid} />

          {/* Desktop nav links */}
          <nav aria-label="Main" className="hidden items-center gap-10 lg:flex">
            {NAV_ITEMS.map((item) =>
              item.menu ? (
                /* Mega-menu trigger — hover opens / swaps; click toggles */
                <button
                  key={item.label}
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={activeMenu === item.menu}
                  aria-controls="engage-menu"
                  onMouseEnter={() => openMenu(item.menu!)}
                  onClick={() =>
                    activeMenu === item.menu ? closeMenu() : openMenu(item.menu!)
                  }
                  className={`flex h-6 cursor-pointer items-center gap-1.5 font-sans text-body-md tracking-[0.01563rem] transition-colors duration-300 ${baseLink} ${
                    item.active ? "font-bold" : "font-normal"
                  }`}
                >
                  {item.label}
                  <ChevronDown open={activeMenu === item.menu} />
                </button>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onMouseEnter={closeMenu}
                  className={`flex h-6 items-center font-sans text-body-md tracking-[0.01563rem] transition-colors duration-300 ${baseLink} ${
                    item.active ? "font-bold" : "font-normal"
                  }`}
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-8 lg:flex">
            <a
              href="#"
              className={`flex h-10 items-center justify-center rounded-lg font-sans text-button-primary uppercase transition-colors duration-300 ${baseLink}`}
            >
              Login/sign up
            </a>
            <a
              href="#"
              className={`inline-flex h-button-h items-center justify-center rounded-button px-button-x font-sans text-button-primary uppercase shadow-button transition-colors duration-300 ${
                solid
                  ? "bg-cta-fill text-cta-on inset-shadow-[0_1px_0_0_rgba(255,255,255,0.08)] hover:bg-grey-700"
                  : "bg-white text-brand-hero inset-shadow-button hover:bg-grey-100 focus-visible:outline-white"
              }`}
            >
              Talk to sales
            </a>
          </div>

          {/* Hamburger (mobile + tablet) */}
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => {
              setMenuOpen((open) => !open);
              setOpenSection(null); // fresh panel each open (Shopify resets too)
            }}
            className={`relative flex h-4 w-6 flex-col items-end justify-between lg:hidden ${
              solid ? "" : "focus-visible:outline-white"
            }`}
          >
            {[
              menuOpen ? "translate-y-[0.4375rem] rotate-45" : "",
              menuOpen ? "opacity-0" : "",
              menuOpen ? "-translate-y-[0.4375rem] -rotate-45" : "",
            ].map((cls, i) => (
              <span
                key={i}
                className={`h-0.5 w-full rounded-[1px] transition-[transform,opacity,background-color] duration-300 ${
                  solid ? "bg-ink" : "bg-white"
                } ${cls}`}
              />
            ))}
          </button>
        </div>

        {/* Mega-menu panel — desktop only. OPEN = body slides
            translateY(−100% → 0) over 300ms while content fades in; CLOSE =
            pure slide-up retract. INSIDE, the four sections live in one
            horizontal track that slides left/right between them (Linear) and
            morphs height to the active section — a single continuous surface,
            no cross-fade swap. Always mounted so the transitions can play and
            reverse mid-flight. */}
        <div
          id="engage-menu"
          aria-hidden={!engageOpen}
          className={`absolute inset-x-0 top-full hidden overflow-hidden lg:block ${
            engageOpen ? "" : "pointer-events-none"
          }`}
        >
          <style>{`
            .engage-body {
              transform: translateY(-100%);
              visibility: hidden;
              will-change: transform;
              transition:
                transform 0.35s cubic-bezier(0.215, 0.61, 0.355, 1),
                visibility 0s linear 0.35s;
            }
            .engage-open .engage-body {
              transform: none;
              visibility: visible;
              transition:
                transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1),
                visibility 0s;
            }
            /* content resets instantly AFTER the drawer is fully retracted,
               so the close shows no fade (Shopify: opacity stays 1) */
            .engage-inner {
              opacity: 0;
              transform: translateY(-1.5rem);
              transition: opacity 0s linear 0.35s, transform 0s linear 0.35s;
            }
            .engage-open .engage-inner {
              opacity: 1;
              transform: none;
              transition:
                opacity 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0.05s,
                transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
            }
            /* horizontal slide track (Linear) — fixed-height surface, so the
               slide never animates layout (kept the open snappy) */
            .engage-track { transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
            /* shared item-hover choreography for the mega-menus (Shopify):
               same-group siblings dim to 50%, hidden arrow fades in, hovered
               row keeps full color. */
            .engage-row { transition: opacity 0.3s; }
            .engage-group:has(.engage-row:hover) .engage-row:not(:hover) { opacity: 0.5; }
            .engage-arrow {
              opacity: 0;
              transform: translateX(-0.25rem);
              transition: opacity 0.3s, transform 0.3s;
            }
            .engage-row:hover .engage-arrow,
            .engage-heading:hover .engage-arrow { opacity: 1; transform: none; }
            @media (prefers-reduced-motion: reduce) {
              .engage-body, .engage-inner, .engage-open .engage-body, .engage-open .engage-inner { transition: none; }
              .engage-viewport, .engage-track { transition: none; }
              .engage-row, .engage-arrow { transition: none; }
              .engage-arrow { transform: none; }
            }
          `}</style>
          <div className={engageOpen ? "engage-open" : ""}>
            <div className="engage-body border-t border-grey-300 bg-surface-base shadow-[0px_1.5rem_3rem_-0.75rem_rgba(0,0,0,0.18)]">
              <div className="engage-inner">
                <div className="engage-viewport overflow-hidden" style={{ height: viewportHeight }}>
                  <div
                    className="engage-track flex"
                    style={{ transform: `translateX(-${menuIndex * 100}%)` }}
                  >
                    {MENU_KEYS.map((key, i) => (
                      <div
                        key={key}
                        ref={(el) => {
                          panelRefs.current[i] = el;
                        }}
                        aria-hidden={shownMenu !== key}
                        className="w-full shrink-0"
                      >
                        {key === "engage" ? (
                          <EngageMenu />
                        ) : key === "impact" ? (
                          <ImpactMenu />
                        ) : key === "proof" ? (
                          <ProofMenu />
                        ) : (
                          <CatalogMenu />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / tablet menu panel — the mega-menu items are accordions
            exposing their content (Shopify mobile pattern, 2026-06-12).
            Panel scrolls when an open section exceeds the viewport. */}
        <div
          id="site-menu"
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-grey-200 bg-surface-base shadow-[0px_0.25rem_0.75rem_0px_rgba(0,0,0,0.08)] lg:hidden`}
        >
          <nav
            aria-label="Main mobile"
            className="flex flex-col px-section-x-sm py-2 md:px-section-x-md"
          >
            {NAV_ITEMS.map((item) =>
              item.menu ? (
                <div key={item.label} className="flex flex-col">
                  <button
                    type="button"
                    aria-expanded={openSection === item.menu}
                    aria-controls={`site-menu-${item.menu}`}
                    onClick={() =>
                      setOpenSection((cur) =>
                        cur === item.menu ? null : item.menu!,
                      )
                    }
                    className="flex h-12 cursor-pointer items-center justify-between font-sans text-body-md tracking-[0.01563rem] text-ink"
                  >
                    {item.label}
                    <ChevronDown open={openSection === item.menu} />
                  </button>
                  {/* grid-rows height animation; motion-reduce snaps */}
                  <div
                    id={`site-menu-${item.menu}`}
                    className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${
                      openSection === item.menu
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      {item.menu === "engage" ? (
                        <div className="flex flex-col gap-4 pb-4 pt-1">
                          {ENGAGE_COLUMNS.flat().map((group) => (
                            <div key={group.label} className="flex flex-col gap-1">
                              <p className="font-sans text-[0.75rem] font-semibold uppercase leading-[0.9rem] tracking-[0.045rem] text-accent-water">
                                {group.label}
                              </p>
                              <ul className="flex flex-col">
                                {group.items.map(({ label }) => (
                                  <li key={label}>
                                    <a
                                      href="#"
                                      onClick={() => setMenuOpen(false)}
                                      className="flex h-10 items-center font-sans text-small text-grey-700"
                                    >
                                      {label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : item.menu === "impact" ? (
                        <ul className="flex flex-col pb-4 pt-1">
                          {IMPACT_TEAMS.map((t) => (
                            <li key={t.name}>
                              <a
                                href="#"
                                onClick={() => setMenuOpen(false)}
                                className="flex h-10 items-center font-sans text-small text-grey-700"
                              >
                                {t.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : item.menu === "proof" ? (
                        <div className="flex flex-col gap-4 pb-4 pt-1">
                          {PROOF_COLUMNS.map((col) => (
                            <div key={col.label} className="flex flex-col gap-1">
                              <p className="font-sans text-[0.75rem] font-semibold uppercase leading-[0.9rem] tracking-[0.045rem] text-accent-water">
                                {col.label}
                              </p>
                              <ul className="flex flex-col">
                                {col.items.map(({ title }) => (
                                  <li key={title}>
                                    <a
                                      href="#"
                                      onClick={() => setMenuOpen(false)}
                                      className="flex h-10 items-center font-sans text-small text-grey-700"
                                    >
                                      {title}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col gap-4 pb-4 pt-1">
                          {CATALOG_TABS.map((t) => (
                            <div key={t.name} className="flex flex-col gap-1">
                              <p className="font-sans text-[0.75rem] font-semibold uppercase leading-[0.9rem] tracking-[0.045rem] text-accent-water">
                                {t.name}
                              </p>
                              <ul className="flex flex-col">
                                {t.explore.map((c) => (
                                  <li key={c}>
                                    <a
                                      href="#"
                                      onClick={() => setMenuOpen(false)}
                                      className="flex h-10 items-center font-sans text-small text-grey-700"
                                    >
                                      {c}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex h-12 items-center font-sans text-body-md tracking-[0.01563rem] text-ink ${
                    item.active ? "font-bold" : "font-normal"
                  }`}
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>
          <div className="flex flex-col gap-3 border-t border-grey-200 px-section-x-sm py-4 md:px-section-x-md">
            <a
              href="#"
              onClick={() => setMenuOpen(false)}
              className="inline-flex h-button-h items-center justify-center rounded-button bg-cta-fill px-button-x font-sans text-button-primary uppercase text-cta-on shadow-button inset-shadow-[0_1px_0_0_rgba(255,255,255,0.08)]"
            >
              Talk to sales
            </a>
            <a
              href="#"
              onClick={() => setMenuOpen(false)}
              className="inline-flex h-button-h items-center justify-center rounded-button border border-ink px-button-x font-sans text-button-primary uppercase text-ink"
            >
              Login/sign up
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
