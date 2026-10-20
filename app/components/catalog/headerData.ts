import { BRAND_LOGOS } from "./brandLogos";
import type { SectionId } from "./data";

/* Section headers — Figma "H3 — tabs: one block at a time" (swag 6036:8674,
   snacks 6036:9262, gifts 6075:9607, experiences 6075:9665). Each section
   has a stat line and 3–4 tabs; each tab is a block of chips (label + muted
   count, optional dietary / taste icon from public/catalog-page/diet). */

export type HeaderChip = { label: string; count?: string; icon?: string; /** white brand mark (public/catalog-page/logos) — replaces the text label */ logo?: string; /** logo viewBox ratio */ ratio?: number };
export type HeaderTab = { id: string; label: string; chips: HeaderChip[]; /** brand tabs: bare logos, no pills */ logos?: boolean };
export type SectionHeader = { stat: string; tabs: HeaderTab[] };

const logoChips = (sec: "swag" | "gifts" | "snacks"): HeaderChip[] =>
  BRAND_LOGOS[sec].map((b) => ({ label: b.name, logo: b.logo, ratio: b.ratio }));
const plain = (labels: string[]): HeaderChip[] => labels.map((label) => ({ label }));

export const SECTION_HEADERS: Record<SectionId, SectionHeader> = {
  swag: {
    stat: "26,000 styles. 760 brands. 100+ decoration methods.",
    tabs: [
      {
        id: "categories",
        label: "Categories",
        /* swagmagic.com's 11 top-level categories */
        chips: plain([
          "Apparel",
          "Bags",
          "Drinkware",
          "Technology",
          "Office Supplies",
          "Health & Wellness",
          "Events & Tradeshows",
          "Outdoor & Leisure",
          "Auto, Home & Tools",
          "Swag Kits",
          "Baby",
        ]),
      },
      {
        id: "methods",
        label: "Decoration Methods",
        chips: plain([
          "Embroidery",
          "Screen printing",
          "DTF / heat transfer",
          "Patches",
          "Digital full-color",
          "Laser engraving",
          "Pad printing",
          "Deboss",
          "Sublimation",
          "Foil",
          "Epoxy dome",
        ]),
      },
      { id: "brands", label: "Brands", logos: true, chips: logoChips("swag") },
    ],
  },
  gifts: {
    stat: "8,900+ gifts. ~300 brands. 170+ countries.",
    tabs: [
      {
        id: "shop",
        label: "Gift Shop",
        chips: plain(["Physical gifts", "Food & drink", "Gift cards", "Bookable experiences", "Charities"]),
      },
      {
        id: "prices",
        label: "Price Points",
        chips: plain(["Under $50", "$50 – $100", "$100 – $250", "$250 – $500", "$500 +"]),
      },
      { id: "brands", label: "Brands", logos: true, chips: logoChips("gifts") },
    ],
  },
  snacks: {
    stat: "2,000+ snacks & sips. 80 brands. 170+ countries.",
    tabs: [
      {
        id: "categories",
        label: "Categories",
        /* snackmagic.com — Snacks, Beverages and Pantry */
        chips: plain([
          "Chocolates",
          "Cookies & Confections",
          "Bars & Bites",
          "Chips, Puffs & Crunch",
          "Jerky",
          "Nuts, Seeds & Granola",
          "Wellness & Functional",
          "Seltzer & Sparkling",
          "Cold Brew & Coffee",
          "Tea",
          "Energy & Shots",
          "Mixers",
          "Sauces & Seasonings",
          "Dips & Salsas",
          "Spreads & Condiments",
          "Coffee, Tea & Cocoa",
          "Broths & Soups",
          "Specialty Staples",
        ]),
      },
      {
        id: "dietary",
        label: "Dietary Restrictions",
        chips: [
          { label: "Vegetarian", icon: "vegetarian" },
          { label: "Gluten-free", icon: "gluten-free" },
          { label: "Dairy-free", icon: "dairy-free" },
          { label: "Vegan", icon: "vegan" },
          { label: "Non-GMO" },
          { label: "Nut-free" },
          { label: "Kosher", icon: "kosher" },
          { label: "Keto/Paleo", icon: "keto-paleo" },
        ],
      },
      {
        id: "taste",
        label: "Taste Profiles",
        chips: [
          { label: "Sweet", icon: "sweet" },
          { label: "Savory", icon: "savory" },
          { label: "Spicy", icon: "spicy" },
          { label: "Fruity", icon: "fruity" },
          { label: "Tart", icon: "tart" },
          { label: "Bitter", icon: "bitter" },
          { label: "Herbal", icon: "herbal-earthy" },
          { label: "Floral", icon: "floral-botanical" },
        ],
      },
      { id: "brands", label: "Brands", logos: true, chips: logoChips("snacks") },
    ],
  },
  experiences: {
    stat: "350+ experiences. 140 collections. 52,000+ events hosted.",
    tabs: [
      {
        id: "collections",
        label: "Collections",
        chips: plain(["Cooking", "Mixology", "Trivia", "Escape rooms", "Wellness", "DEI & heritage", "Onboarding", "Holidays"]),
      },
      {
        id: "top",
        label: "Top Events",
        chips: [
          { label: "Escape Quest", count: "6.6K+" },
          { label: "Coworker Clash", count: "6.1K" },
          { label: "Team Trivia", count: "1.6K" },
          { label: "Puzzles", count: "1.3K" },
          { label: "Terrarium Workshop", count: "817" },
        ],
      },
      {
        id: "proof",
        label: "Proof",
        chips: [
          { label: "Events hosted", count: "52,000+" },
          { label: "Companies", count: "11,000+" },
          { label: "Teams who love it", count: "25,000+" },
          { label: "Bookable as gifts", count: "106" },
        ],
      },
    ],
  },
};
