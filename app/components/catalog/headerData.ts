import type { SectionId } from "./data";

/* Section headers — Figma "H3 — tabs: one block at a time" (swag 6036:8674,
   snacks 6036:9262, gifts 6075:9607, experiences 6075:9665). Each section
   has a stat line and 3–4 tabs; each tab is a block of chips (label + muted
   count, optional dietary / taste icon from public/catalog-page/diet). */

export type HeaderChip = { label: string; count?: string; icon?: string; /** white brand mark (public/catalog-page/logos) — replaces the text label */ logo?: string };
export type HeaderTab = { id: string; label: string; chips: HeaderChip[]; /** brand tabs: bare logos, no pills */ logos?: boolean; /** eyebrow line under the logos */ more?: string };
export type SectionHeader = { stat: string; tabs: HeaderTab[] };

export const SECTION_HEADERS: Record<SectionId, SectionHeader> = {
  swag: {
    stat: "26,000 styles. 760 brands. 100+ decoration methods.",
    tabs: [
      {
        id: "methods",
        label: "Decoration Methods",
        chips: [
          { label: "Embroidery", count: "7,390 styles" },
          { label: "Screen printing" },
          { label: "DTF / heat transfer" },
          { label: "Patches" },
          { label: "Digital full-color" },
          { label: "Laser engraving" },
          { label: "Pad printing" },
          { label: "Deboss" },
          { label: "Sublimation" },
          { label: "Foil" },
          { label: "Epoxy dome" },
          { label: "+ 100 more" },
        ],
      },
      {
        id: "categories",
        label: "Categories",
        chips: [
          { label: "Apparel", count: "7,000+" },
          { label: "Bags", count: "2,600+" },
          { label: "Drinkware", count: "2,300+" },
          { label: "Office & writing", count: "1,300+" },
          { label: "Home & outdoor", count: "1,200+" },
          { label: "Tech", count: "1,100+" },
          { label: "Headwear", count: "1,000+" },
          { label: "Signage & print", count: "800+" },
        ],
      },
      {
        id: "brands",
        label: "Brands",
        logos: true,
        more: "+100 more",
        chips: [
          { label: "Nike", logo: "/catalog-page/logos/nike.svg" },
          { label: "Carhartt", logo: "/catalog-page/logos/carhartt.svg" },
          { label: "The North Face", logo: "/catalog-page/logos/thenorthface.svg" },
          { label: "TravisMathew", logo: "/catalog-page/logos/travismathew.svg" },
          { label: "New Era", logo: "/catalog-page/logos/newera.svg" },
          { label: "adidas", logo: "/catalog-page/logos/adidas.svg" },
        ],
      },
    ],
  },
  gifts: {
    stat: "8,900+ gifts. ~300 brands. 170+ countries.",
    tabs: [
      {
        id: "shop",
        label: "Gift Shop",
        chips: [
          { label: "Physical gifts", count: "1,800+" },
          { label: "Food & drink", count: "~1,500" },
          { label: "Gift cards", count: "290" },
          { label: "Bookable experiences", count: "106" },
          { label: "Charities", count: "47" },
        ],
      },
      {
        id: "prices",
        label: "Price Points",
        chips: [
          { label: "Physical gifts $100 or less", count: "7 in 10" },
          { label: "Median", count: "~$62" },
          { label: "Per person", count: "$50" },
        ],
      },
      {
        id: "brands",
        label: "Brands",
        logos: true,
        more: "+100 more",
        chips: [
          { label: "Apple", logo: "/catalog-page/logos/apple.svg" },
          { label: "Rubik’s", logo: "/catalog-page/logos/rubiks.svg" },
          { label: "Logitech", logo: "/catalog-page/logos/logitech.svg" },
          { label: "Sony", logo: "/catalog-page/logos/sony.svg" },
          { label: "Ray-Ban", logo: "/catalog-page/logos/rayban.svg" },
          { label: "JBL", logo: "/catalog-page/logos/jbl.svg" },
        ],
      },
    ],
  },
  snacks: {
    stat: "2,000+ snacks & sips. 80 brands. 170+ countries.",
    tabs: [
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
      {
        id: "categories",
        label: "Categories",
        chips: [
          { label: "Chocolate" },
          { label: "Cookies" },
          { label: "Chips" },
          { label: "Popcorn & pretzels" },
          { label: "Snack bars" },
          { label: "Jerky" },
          { label: "Cold brew" },
          { label: "Tea" },
          { label: "+ 16 more" },
        ],
      },
      {
        id: "brands",
        label: "Brands",
        logos: true,
        more: "+100 more",
        chips: [
          { label: "Hal’s New York", logo: "/catalog-page/logos/hals.svg" },
          { label: "Hu", logo: "/catalog-page/logos/hu.svg" },
          { label: "SmartSweets", logo: "/catalog-page/logos/smartsweets.svg" },
          { label: "Tate’s Bake Shop", logo: "/catalog-page/logos/tates.svg" },
          { label: "Poppi", logo: "/catalog-page/logos/poppi.svg" },
          { label: "Hippeas", logo: "/catalog-page/logos/hippeas.svg" },
        ],
      },
    ],
  },
  experiences: {
    stat: "350+ experiences. 140 collections. 52,000+ events hosted.",
    tabs: [
      {
        id: "collections",
        label: "Collections",
        chips: ["Cooking", "Mixology", "Trivia", "Escape rooms", "Wellness", "DEI & heritage", "Onboarding", "Holidays"].map((label) => ({ label })),
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
