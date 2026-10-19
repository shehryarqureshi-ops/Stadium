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

type CatalogLink = { label: string; href: string };
type Group = { label: string; items: CatalogLink[] };
type Tab = {
  name: string;
  explore: CatalogLink[];
  groups: [Group, Group];
  featured: { title: string; body: string; cta: string; href: string; image: StaticImageData };
};

/* Link sources (extracted 2026-10-16): Swag / Lifestyle from swagmagic.com,
   Snacks from snackmagic.com (linked from the Swagmagic header), Events from
   withconfetti.com. Every link opens in a new tab. */
const SWAG = "https://www.swagmagic.com/us-en";
const SWAG_CATALOG = `${SWAG}/s/promotional-products`;
const SNACK = "https://www.snackmagic.com";
const CONFETTI = "https://www.withconfetti.com";

/* Exported for the mobile nav accordion */
export const CATALOG_TABS: Tab[] = [
  {
    name: "Swag",
    explore: [
      { label: "Apparel", href: `${SWAG_CATALOG}/catalog/apparel` },
      { label: "Drinkware", href: `${SWAG_CATALOG}/catalog/drinkware` },
      { label: "Bags", href: `${SWAG_CATALOG}/catalog/bags` },
      { label: "Office Supplies", href: `${SWAG_CATALOG}/catalog/office-supplies` },
      { label: "Technology", href: `${SWAG_CATALOG}/catalog/technology` },
      { label: "Events & Tradeshows", href: `${SWAG_CATALOG}/catalog/events-tradeshows` },
      { label: "Auto, Home & Tools", href: `${SWAG_CATALOG}/catalog/auto-home-tools` },
      { label: "View All Categories", href: `${SWAG_CATALOG}/catalog` },
    ],
    groups: [
      {
        label: "Popular",
        items: [
          { label: "T-Shirts", href: `${SWAG_CATALOG}/t-shirts` },
          { label: "Bags", href: `${SWAG_CATALOG}/bags` },
          { label: "Headphones", href: `${SWAG_CATALOG}/headphones-earbuds` },
          { label: "Water Bottles", href: `${SWAG_CATALOG}/water-bottles` },
        ],
      },
      {
        label: "Quick Links",
        items: [
          { label: "All Products", href: `${SWAG_CATALOG}/all-products` },
          { label: "On-Demand", href: `${SWAG_CATALOG}/all-products?item-type%5B%5D=on-demand%2Ccore-demand%2Cadditional-on-demand&syncFilter=true` },
          { label: "Sustainable", href: `${SWAG_CATALOG}/all-products?itemFeatures%5B%5D=sustainable&syncFilter=true` },
          { label: "Swag Kits", href: `${SWAG_CATALOG}/swag-kits` },
          { label: "Best Under $25", href: `${SWAG_CATALOG}/all-products?price=lowest-price-range&syncFilter=true` },
          { label: "New Arrivals", href: `${SWAG_CATALOG}/all-products?sort=created_at%3Adesc&syncFilter=true` },
        ],
      },
    ],
    featured: {
      title: "Branded swag that doesn't sit in a drawer.",
      body: "Premium brands, print-on-demand, and global fulfillment — built for teams that actually want to wear it.",
      cta: "Shop swag",
      href: `${SWAG_CATALOG}/catalog`,
      image: brandedImg,
    },
  },
  {
    name: "Snacks",
    explore: [
      { label: "Our Snacks", href: `${SNACK}/our-snacks` },
      { label: "Themed Boxes", href: `${SNACK}/themed-boxes` },
      { label: "Build Your Own", href: `${SNACK}/build-your-own` },
      { label: "Add-Ons", href: `${SNACK}/add-ons` },
      { label: "Global Gifting", href: `${SNACK}/global-gifting` },
      { label: "For Brand Partners", href: `${SNACK}/for-brand-partners` },
    ],
    groups: [
      {
        label: "Popular in Snacks",
        items: [
          { label: "Our Snacks", href: `${SNACK}/our-snacks` },
          { label: "Themed Boxes", href: `${SNACK}/themed-boxes` },
          { label: "Build Your Own", href: `${SNACK}/build-your-own` },
        ],
      },
      {
        label: "Quick Links",
        items: [
          { label: "Snackmagic Home", href: `${SNACK}/` },
          { label: "Features", href: `${SNACK}/features` },
          { label: "Pricing", href: `${SNACK}/pricing` },
          { label: "Talk to Us", href: `${SNACK}/talk-to-us` },
        ],
      },
    ],
    featured: {
      title: "Snacks teams actually fight over.",
      body: "Curated assortments, dietary-aware boxes, and same-day delivery across 30+ countries.",
      cta: "Shop snacks",
      href: `${SNACK}/our-snacks`,
      image: snacksImg,
    },
  },
  {
    name: "Lifestyle",
    explore: [
      { label: "Pride Month", href: `${SWAG}/occasion/pride-month` },
      { label: "Employee Appreciation Day", href: `${SWAG}/occasion/employee-appreciation-day` },
      { label: "Employee Anniversary", href: `${SWAG}/occasion/employee-anniversary` },
      { label: "Graduation", href: `${SWAG}/occasion/graduation` },
      { label: "Corporate Retreats", href: `${SWAG}/occasion/corporate-retreats` },
      { label: "Conference Season", href: `${SWAG}/occasion/conference-season` },
      { label: "Earth Day", href: `${SWAG}/occasion/earth-day` },
      { label: "Company Anniversary", href: `${SWAG}/occasion/company-anniversary` },
    ],
    groups: [
      {
        label: "By Industry",
        items: [
          { label: "Education", href: `${SWAG}/industry/education` },
          { label: "Food & Beverage", href: `${SWAG}/industry/food-and-beverage` },
          { label: "IT & Technology", href: `${SWAG}/industry/it-and-technology` },
          { label: "Financial Services", href: `${SWAG}/industry/financial-services` },
        ],
      },
      {
        label: "More Industries",
        items: [
          { label: "Real Estate", href: `${SWAG}/industry/real-estate` },
          { label: "Advertising", href: `${SWAG}/industry/advertising` },
          { label: "Non-Profit Organization", href: `${SWAG}/industry/non-profit-organization` },
          { label: "Hospitality", href: `${SWAG}/industry/hospitality` },
        ],
      },
    ],
    featured: {
      title: "Gifts that say you paid attention.",
      body: "Curated picks across luxury, lifestyle, and experiences — sent anywhere, with controls built in.",
      cta: "Shop lifestyle",
      href: `${SWAG_CATALOG}/catalog`,
      image: lifestyleImg,
    },
  },
  {
    name: "Events",
    explore: [
      { label: "Seasonal Celebrations", href: `${CONFETTI}/explore#seasonal-collections` },
      { label: "Team Building", href: `${CONFETTI}/collection/virtual-team-building` },
      { label: "Health & Wellness", href: `${CONFETTI}/collection/health-and-wellness` },
      { label: "Employee Onboarding", href: `${CONFETTI}/collection/employee-onboarding` },
      { label: "Learning & Development", href: `${CONFETTI}/collection/learning-and-development` },
      { label: "Diversity, Equity & Inclusion", href: `${CONFETTI}/collection/diversity-equity-and-inclusion` },
    ],
    groups: [
      {
        label: "New to Confetti?",
        items: [
          { label: "All-Time Favorites", href: `${CONFETTI}/collection/popular-experiences` },
          { label: "Getting Started", href: `${CONFETTI}/collection/getting-started` },
          { label: "Why Confetti", href: `${CONFETTI}/why-confetti` },
          { label: "Explore Experiences", href: `${CONFETTI}/explore` },
        ],
      },
      {
        label: "Resources",
        items: [
          { label: "FAQs", href: `${CONFETTI}/faqs` },
          { label: "Case Studies", href: `${CONFETTI}/confetti-customers-case-studies-testimonials` },
          { label: "Blog", href: `${CONFETTI}/blog` },
          { label: "Engagement Calendar", href: `${CONFETTI}/employee-engagement-calendar` },
          { label: "Plans", href: `${CONFETTI}/pages/plans` },
        ],
      },
    ],
    featured: {
      title: "Live experiences that bring teams closer.",
      body: "Virtual, hybrid, and in-person experiences — booked and managed in one place.",
      cta: "Book events",
      href: `${CONFETTI}/explore`,
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
  return <img loading="lazy" decoding="async" src="/flag-us.svg" alt="" className={className} />;
}

function LinkRow({ label, href, active = false }: { label: string; href: string; active?: boolean }) {
  /* items are grey #4f5052; the active/first item is black with a persistent arrow */
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`engage-row flex h-7 items-start gap-2 font-sans text-[0.875rem] font-normal leading-5 ${active ? "text-black" : "text-[#4f5052]"
          }`}
      >
        <span>{label}</span>
        <ArrowRight className={`size-3 shrink-0 mt-0.75 ${active ? "text-black" : "engage-arrow text-[#4f5052]"}`} />
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
          <img loading="lazy" decoding="async" src={brand.src} alt={tab.name} height={22} className="h-[1.375rem] w-auto" />
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
              {tab.explore.map((c) => (
                <LinkRow key={c.label} label={c.label} href={c.href} />
              ))}
            </ul>
          </div>
          <div className="flex w-[15.8125rem] shrink-0 flex-col gap-11">
            {tab.groups.map((g) => (
              <div key={g.label} className="group/col flex flex-col gap-4">
                <GroupHeading label={g.label} />
                <ul className="engage-group flex flex-col gap-2">
                  {g.items.map((it) => (
                    <LinkRow key={it.label} label={it.label} href={it.href} />
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
          href={tab.featured.href}
          external
        />
      </div>
    </div>
  );
}
