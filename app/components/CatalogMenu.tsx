"use client";

import { useState } from "react";

/* "Catalog" mega-menu — Figma 249:20269 ("Col 6 — 05 / Catalog"). A tabbed
   storefront menu: a left sidebar switches between Swag / Snacks / Lifestyle /
   Events; each tab shows an EXPLORE category list, two secondary link groups, a
   featured card, and a brands row. Shares the hover choreography
   (.engage-row / .engage-group / .engage-arrow) from SiteHeader. Featured-card
   art + per-tab brand logos are pending — dark gradient + placeholder marks. */

type Group = { label: string; items: string[] };
type Tab = {
  name: string;
  explore: string[];
  groups: [Group, Group];
  featured: { title: string; body: string; cta: string };
};

/* Exported for the mobile nav accordion */
export const CATALOG_TABS: Tab[] = [
  {
    name: "Swag",
    explore: ["Apparel", "Bags", "Drinkware", "Technology", "Office Supplies", "Health & Wellness", "Events & Tradeshows", "Outdoor & Leisure", "Auto, Home & Tools", "Swag Kits", "Baby"],
    groups: [
      { label: "For", items: ["Women", "Men", "Youth"] },
      { label: "Quick Links", items: ["View All Apparel", "Sustainable", "Recommended", "New Arrivals", "No Minimum"] },
    ],
    featured: {
      title: "Branded swag that doesn't sit in a drawer.",
      body: "Premium brands, print-on-demand, and global fulfillment — built for teams that actually want to wear it.",
      cta: "Shop swag",
    },
  },
  {
    name: "Snacks",
    explore: ["Beverages", "Pantry", "Work & Play", "Superior Dishes", "Cold Brew", "Coffee, Tea & Cocoa", "Specialty Cheese", "Gift Baskets", "Chocolate", "Protein Bars", "Nuts & Trail Mix"],
    groups: [
      { label: "Popular in Snacks", items: ["Jerky", "Crackers & Crisps", "Nuts & Trail Mix"] },
      { label: "Quick Links", items: ["View All Snacks", "Bestsellers", "Curated Boxes", "Build-Your-Own", "Same-Day Ship"] },
    ],
    featured: {
      title: "Snacks teams actually fight over.",
      body: "Curated assortments, dietary-aware boxes, and same-day delivery across 30+ countries.",
      cta: "Shop snacks",
    },
  },
  {
    name: "Lifestyle",
    explore: ["Work Essentials", "Life & Hobbies", "Food & Beverages", "Wellness", "Gift Cards", "Merch", "Luxury"],
    groups: [
      { label: "Popular Gifts", items: ["Sweets & Desserts", "Cheese & Charcuterie", "Drinkware"] },
      { label: "Curated", items: ["Seasonal & Holiday", "Curated Boxes", "In-Person Experiences", "Gift Cards", "Self-Care & Beauty"] },
    ],
    featured: {
      title: "Gifts that say you paid attention.",
      body: "Curated picks across luxury, lifestyle, and experiences — sent anywhere, with controls built in.",
      cta: "Shop lifestyle",
    },
  },
  {
    name: "Events",
    explore: ["Virtual Team Building", "Workshops & Classes", "Wellness & DEI", "Games & Trivia", "Hybrid Experiences", "Global Experiences"],
    groups: [
      { label: "Popular Experiences", items: ["Virtual Jeoparty", "Escape Rooms", "Coworker Clash", "Cocktail Making"] },
      { label: "Curated", items: ["Holiday Party Series", "Mental Wellness Bundle", "New Hire Welcome", "Quarterly Kickoff"] },
    ],
    featured: {
      title: "Live experiences that bring teams closer.",
      body: "Virtual, hybrid, and in-person experiences — booked and managed in one place.",
      cta: "Book events",
    },
  },
];

/* Placeholder brand marks (Figma's per-tab logos are flagged WIP). width:height
   gives each SVG its aspect ratio so the rem height constrains it. */
const BRANDS = [
  { src: "/trust-google.svg", alt: "Google", width: 80, height: 26 },
  { src: "/trust-amazon.svg", alt: "Amazon", width: 77, height: 23 },
  { src: "/trust-netflix.svg", alt: "Netflix", width: 75, height: 20 },
  { src: "/trust-spotify.svg", alt: "Spotify", width: 81, height: 24 },
  { src: "/trust-pinterest.svg", alt: "Pinterest", width: 87, height: 22 },
  { src: "/trust-bloomberg.svg", alt: "Bloomberg", width: 90, height: 16 },
];

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3 4.5 3 3 3-3" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg className="size-2.5 shrink-0 text-ink" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3 1.5 4 3.5-4 3.5" />
    </svg>
  );
}

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function LinkRow({ label }: { label: string }) {
  return (
    <li>
      <a href="#" className="engage-row flex h-8 items-center gap-2 font-sans text-[0.875rem] font-medium leading-5 text-ink">
        <span className="-translate-y-px">{label}</span>
        <ArrowRight className="engage-arrow size-3 shrink-0 text-ink" />
      </a>
    </li>
  );
}

function GroupHeading({ label }: { label: string }) {
  return (
    <p className="font-sans text-[0.75rem] font-semibold uppercase leading-[0.9rem] tracking-[0.045rem] text-accent-water">
      {label}
    </p>
  );
}

export default function CatalogMenu() {
  const [active, setActive] = useState(0);
  const tab = CATALOG_TABS[active];

  return (
    <div className="mx-auto w-full max-w-section">
      <div className="flex gap-10 px-section-x-lg py-8">
        {/* Sidebar — tab switcher (hover/click) */}
        <nav aria-label="Catalog categories" className="flex w-[11rem] shrink-0 flex-col self-start py-2">
          <ul className="flex flex-col">
            {CATALOG_TABS.map((t, i) => (
              <li key={t.name}>
                <button
                  type="button"
                  aria-pressed={i === active}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`flex h-12 w-full cursor-pointer items-center justify-between text-left font-sans text-[0.875rem] leading-5 transition-colors duration-150 ${
                    i === active ? "font-semibold text-ink" : "font-medium text-grey-500 hover:text-ink"
                  }`}
                >
                  {t.name}
                  {i === active && <ChevronRight />}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content for the active tab */}
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          {/* Region bar */}
          <div className="flex items-center justify-end gap-2.5">
            <button
              type="button"
              className="flex h-9 cursor-pointer items-center gap-2 rounded-button border border-grey-200 px-3.5 font-sans text-[0.8125rem] font-medium text-ink"
            >
              United States
              <ChevronDown className="size-3 text-grey-500" />
            </button>
            <button
              type="button"
              className="flex h-9 cursor-pointer items-center justify-center rounded-button bg-cta-fill px-5 font-sans text-button-primary uppercase text-cta-on shadow-button"
            >
              Go
            </button>
          </div>

          {/* keyed so switching tabs cross-fades the content */}
          <div key={tab.name} className="menu-swap flex items-stretch gap-10">
            {/* EXPLORE */}
            <div className="flex w-[11rem] shrink-0 flex-col gap-3">
              <GroupHeading label="Explore" />
              <ul className="engage-group flex flex-col">
                {tab.explore.map((c) => (
                  <LinkRow key={c} label={c} />
                ))}
              </ul>
            </div>

            {/* Two secondary groups */}
            <div className="flex w-[12rem] shrink-0 flex-col gap-6">
              {tab.groups.map((g) => (
                <div key={g.label} className="flex flex-col gap-3">
                  <GroupHeading label={g.label} />
                  <ul className="engage-group flex flex-col">
                    {g.items.map((it) => (
                      <LinkRow key={it} label={it} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Featured card (art pending; dark gradient stand-in) */}
            <aside className="flex min-w-0 flex-1 flex-col justify-end gap-4 overflow-hidden rounded-card bg-gradient-to-br from-infra-base-1 to-infra-base-2 p-7">
              <div className="flex flex-col gap-2.5">
                <h3 className="font-display text-callout-md text-white md:text-heading-sm">
                  {tab.featured.title}
                </h3>
                <p className="max-w-[24rem] font-sans text-body-sm text-white/75">
                  {tab.featured.body}
                </p>
              </div>
              <a
                href="#"
                className="inline-flex h-button-h w-fit items-center justify-center gap-2 rounded-button border border-white/30 px-button-x font-sans text-button-primary uppercase text-white transition-colors duration-200 hover:bg-white/10"
              >
                {tab.featured.cta}
                <ArrowRight className="size-4" />
              </a>
            </aside>
          </div>

          {/* Featured brands */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-grey-100 pt-5">
            <p className="font-sans text-[0.75rem] font-semibold uppercase leading-[0.9rem] tracking-[0.045rem] text-grey-500">
              Featured brands
            </p>
            {BRANDS.map((logo) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                loading="lazy"
                style={{ height: `${(logo.height * 0.7) / 16}rem` }}
                className="w-auto max-w-none shrink-0 opacity-70"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
