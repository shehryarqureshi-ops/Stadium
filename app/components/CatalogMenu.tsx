"use client";

import { useState } from "react";
import type { StaticImageData } from "next/image";
import { MenuSwitcher, MenuFeaturePanel } from "@/app/components/MegaMenu";
import brandedImg from "@/public/catalog-branded-merch.jpg";
import snacksImg from "@/public/catalog-snack-boxes.jpg";
import lifestyleImg from "@/public/catalog-lifestyle-hobbies.jpg";
import experiencesImg from "@/public/catalog-experiences.jpg";

/* "Catalog" mega-menu — synced to Figma 1350:36111 (2026-06-20). Tabbed
   storefront: a white-pill switcher (Swag / Snacks / Lifestyle / Events), a
   clean-text EXPLORE list + two secondary link groups, a connected region
   selector, and a featured image card. Shares the hover choreography
   (.engage-row / .engage-group / .engage-arrow) from SiteHeader. */

type Group = { label: string; items: string[] };
type Tab = {
  name: string;
  explore: string[];
  groups: [Group, Group];
  featured: { title: string; body: string; cta: string; image: StaticImageData };
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
      image: brandedImg,
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
      image: snacksImg,
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
      image: lifestyleImg,
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
      image: experiencesImg,
    },
  },
];

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3 4.5 3 3 3-3" />
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

/* US flag — exact export from the Figma region selector (instance 1583:970):
   a 16×16 round flag. Lives at public/flag-us.svg. */
function FlagUS({ className = "" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/flag-us.svg" alt="" className={className} />;
}

function LinkRow({ label, active = false }: { label: string; active?: boolean }) {
  /* items are grey #4f5052; the active/first item is black with a persistent arrow */
  return (
    <li>
      <a
        href="#"
        className={`engage-row flex h-7 items-center gap-2 font-sans text-[0.875rem] font-normal leading-5 ${
          active ? "text-black" : "text-[#4f5052]"
        }`}
      >
        <span>{label}</span>
        <ArrowRight className={`size-3 shrink-0 ${active ? "text-black" : "engage-arrow text-[#4f5052]"}`} />
      </a>
    </li>
  );
}

function GroupHeading({ label }: { label: string }) {
  /* header + 1px divider rule — grey at rest; Stadium gradient wipes in on column hover */
  return (
    <div className="flex flex-col gap-4">
      <p className="font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem] text-[rgba(27,27,27,0.6)] transition-colors duration-200 group-hover/col:text-[#181818]">
        {label}
      </p>
      <span aria-hidden className="relative block h-px w-full bg-[#d9d9d9]">
        <span className="absolute inset-0 origin-left scale-x-0 bg-[linear-gradient(270deg,#8d12e7,#0b7afc,#ffb800,#ff5b77,#00c036)] transition-transform duration-500 ease-out group-hover/col:scale-x-100" />
      </span>
    </div>
  );
}

/* Per-category brand logo shown at the right of the top band (Figma 91:597).
   Extracted from the file; Lifestyle has no sub-brand logo so it falls back to a
   wordmark. */
const BRAND_LOGOS: ({ src: string; w: number } | null)[] = [
  { src: "/catalog-brand-swagmagic.svg", w: 138 },
  null, // Snackmagic — Figma export nested the wordmark differently; wordmark fallback for now
  null, // Lifestyle — no sub-brand logo in the export
  { src: "/catalog-brand-events.svg", w: 100 },
];

export default function CatalogMenu() {
  const [active, setActive] = useState(0);
  const tab = CATALOG_TABS[active];
  const brand = BRAND_LOGOS[active];

  return (
    <div className="mx-auto w-full max-w-section">
      {/* Top band — region selector (left) + the category's brand logo (right),
          under a hairline divider (Figma 91:597 / node 99:570). */}
      <div className="flex items-center justify-between border-b border-grey-200 px-section-x-lg py-3">
        <button
          type="button"
          className="flex h-10 items-center gap-2 rounded-button border border-grey-200 px-3.5 shadow-[0_3px_6px_rgba(0,0,0,0.06)] transition-colors hover:bg-grey-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-grey-300"
        >
          <FlagUS className="size-4" />
          <span className="font-sans text-[0.875rem] text-ink">United States</span>
          <ChevronDown className="size-3 text-grey-500" />
        </button>
        {brand ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={brand.src} alt={tab.name} height={22} className="h-[1.375rem] w-auto" />
        ) : (
          <span className="font-display text-[1.25rem] font-bold text-ink">{tab.name}</span>
        )}
      </div>

      {/* Content — category rail + Explore + For/Quick Links + featured */}
      <div className="flex items-stretch gap-[2.8125rem] px-section-x-lg pt-8 pb-[5.25rem]">
        <MenuSwitcher
          label="Catalog categories"
          items={CATALOG_TABS.map((t) => t.name)}
          active={active}
          onSelect={setActive}
        />
        <div className="flex min-w-0 flex-1 items-stretch gap-[2.8125rem]">
          <div className="group/col flex w-[15.8125rem] shrink-0 flex-col gap-4">
            <GroupHeading label="Explore the Catalog" />
            <ul className="engage-group flex flex-col gap-2">
              {tab.explore.map((c, idx) => (
                <LinkRow key={c} label={c} active={idx === 0} />
              ))}
            </ul>
          </div>
          <div className="flex w-[15.8125rem] shrink-0 flex-col gap-11">
            {tab.groups.map((g) => (
              <div key={g.label} className="group/col flex flex-col gap-4">
                <GroupHeading label={g.label} />
                <ul className="engage-group flex flex-col gap-2">
                  {g.items.map((it) => (
                    <LinkRow key={it} label={it} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <MenuFeaturePanel
          eyebrow="Featured"
          image={tab.featured.image}
          aspect="384 / 432"
          title={tab.featured.title.replace(/\.$/, "")}
          cta={tab.featured.cta}
        />
      </div>
    </div>
  );
}
