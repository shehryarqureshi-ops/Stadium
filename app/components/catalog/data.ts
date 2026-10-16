/* /catalog content — images are the Figma frame's own photography
   (public/catalog-page, 1200w JPEG), grouped by backdrop colour the way the
   design groups its mosaics: green = Swag, yellow = Gifts, red = Snacks,
   blue + tasting kits = Hosted Experiences. */

export type SectionId = "swag" | "gifts" | "snacks" | "experiences";

export type Product = {
  name: string;
  /** subcategory shown in the modal pill (e.g. "Apparel") */
  category: string;
  description: string;
  image: string;
};

export type Country = { code: FlagCode; name: string; stat: string };

export type SectionData = {
  id: SectionId;
  /** Tab label (desktop) */
  tab: string;
  /** Short tab label (mobile) */
  tabShort: string;
  /** Large heading in the black panel + modal pill */
  title: string;
  /** Pill + CTA noun: "view {noun} catalog" */
  noun: string;
  blurb: string;
  catalogHref: string;
  products: Product[];
  brands: { name: string; logo: string }[];
  countries: Country[];
};

import type { FlagCode } from "../CircleFlag";
import { EXPERIENCES_PRODUCTS, GIFTS_PRODUCTS, SNACKS_PRODUCTS, SWAG_PRODUCTS } from "./products";

export const BOOK_A_CALL_HREF = "/book-a-call";

export const SECTIONS: SectionData[] = [
  {
    id: "swag",
    tab: "Swag",
    tabShort: "Swag",
    title: "Swag",
    noun: "swag",
    blurb: "Premium brands, print-on-demand and global fulfillment — merch your people actually keep.",
    catalogHref: "https://www.swagmagic.com/us-en/s/promotional-products/catalog",
    products: SWAG_PRODUCTS,
    brands: [{ name: "Airbnb", logo: "/catalog-page/logos/airbnb.svg" }, { name: "Slack", logo: "/catalog-page/logos/slack.svg" }, { name: "Amazon", logo: "/catalog-page/logos/amazon.svg" }, { name: "Spotify", logo: "/catalog-page/logos/spotify.svg" }, { name: "Nike", logo: "/catalog-page/logos/nike.svg" }],
    countries: [
      { code: "de", name: "Germany", stat: "1,800+ teams reached across the EU" },
      { code: "ae", name: "United Arab Emirates", stat: "Delivering worldwide to 170+ countries" },
      { code: "au", name: "Australia", stat: "Same-week delivery in major cities" },
      { code: "gb", name: "United Kingdom", stat: "2,400+ teams gifted across the UK" },
      { code: "ca", name: "Canada", stat: "Coast-to-coast coverage, duties handled" },
    ],
  },
  {
    id: "gifts",
    tab: "Gifts",
    tabShort: "Gifts",
    title: "Gifts",
    noun: "gifts",
    blurb: "Curated pantry, drinks and keepsakes — thoughtful gifts that land anywhere, with controls built in.",
    catalogHref: "/gifting",
    products: GIFTS_PRODUCTS,
    brands: [{ name: "Stripe", logo: "/catalog-page/logos/stripe.svg" }, { name: "Notion", logo: "/catalog-page/logos/notion.svg" }, { name: "Salesforce", logo: "/catalog-page/logos/salesforce.svg" }, { name: "Adidas", logo: "/catalog-page/logos/adidas.svg" }, { name: "Figma", logo: "/catalog-page/logos/figma.svg" }],
    countries: [
      { code: "mx", name: "Mexico", stat: "700+ teams reached across Mexico" },
      { code: "au", name: "Australia", stat: "Delivering worldwide to 170+ countries" },
      { code: "se", name: "Sweden", stat: "Fast delivery across the Nordics" },
      { code: "in", name: "India", stat: "1,300+ teams gifted from Mumbai to Bengaluru" },
      { code: "nl", name: "Netherlands", stat: "Delivered to every Dutch province" },
    ],
  },
  {
    id: "snacks",
    tab: "Snacks",
    tabShort: "Snacks",
    title: "Snacks",
    noun: "snack",
    blurb: "Snacks, drinks, pantry staples and work-and-play finds — curated boxes your team will fight over, delivered across 170+ countries.",
    catalogHref: "https://www.snackmagic.com/our-snacks",
    products: SNACKS_PRODUCTS,
    brands: [{ name: "Northface", logo: "/catalog-page/logos/thenorthface.svg" }, { name: "Adidas", logo: "/catalog-page/logos/adidas.svg" }, { name: "Nike", logo: "/catalog-page/logos/nike.svg" }, { name: "Shopify", logo: "/catalog-page/logos/shopify.svg" }, { name: "Google", logo: "/catalog-page/logos/google.svg" }],
    countries: [
      { code: "us", name: "USA", stat: "Delivering worldwide to 170+ countries" },
      { code: "jp", name: "Japan", stat: "Next-day delivery across Tokyo & Osaka" },
      { code: "br", name: "Brazil", stat: "900+ teams gifted across Brazil" },
      { code: "fr", name: "France", stat: "Swag delivered to 1,100+ teams in France" },
      { code: "it", name: "Italy", stat: "Delivered to every region in Italy" },
    ],
  },
  {
    id: "experiences",
    tab: "Hosted Experiences",
    tabShort: "Experiences",
    title: "Hosted Experiences",
    noun: "experiences",
    blurb: "Live, hosted tastings and classes with the kit shipped to every attendee — remote, hybrid or in person.",
    catalogHref: "https://www.withconfetti.com/explore",
    products: EXPERIENCES_PRODUCTS,
    brands: [{ name: "Airbnb", logo: "/catalog-page/logos/airbnb.svg" }, { name: "Slack", logo: "/catalog-page/logos/slack.svg" }, { name: "Amazon", logo: "/catalog-page/logos/amazon.svg" }, { name: "Spotify", logo: "/catalog-page/logos/spotify.svg" }, { name: "Notion", logo: "/catalog-page/logos/notion.svg" }],
    countries: [
      { code: "de", name: "Germany", stat: "1,800+ teams reached across the EU" },
      { code: "ae", name: "United Arab Emirates", stat: "Delivering worldwide to 170+ countries" },
      { code: "au", name: "Australia", stat: "Same-week delivery in major cities" },
      { code: "gb", name: "United Kingdom", stat: "2,400+ teams gifted across the UK" },
      { code: "sg", name: "Singapore", stat: "Hosts and kits across Southeast Asia" },
    ],
  },
];

/* ---------------------------------------------------------------- Hero tiles */

/* Every photo from every section, tagged with its "family" (section + category)
   so the shuffle below can keep look-alikes apart. */
const ALL_TILES = [
  ["swag", SWAG_PRODUCTS],
  ["gifts", GIFTS_PRODUCTS],
  ["snacks", SNACKS_PRODUCTS],
  ["experiences", EXPERIENCES_PRODUCTS],
].flatMap(([sec, list]) =>
  (list as Product[]).map((p) => ({ src: p.image, family: `${sec}/${p.category}`, section: sec as string })),
);

/* Seeded PRNG + Fisher–Yates: "random" but identical on server and client. */
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function shuffled<T>(list: T[], rand: () => number): T[] {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* n speeds spread evenly over [min, max] and shuffled — every column gets a
   distinct pace, and neighbours are not ordered by speed. */
function spreadSpeeds(n: number, min: number, max: number, rand: () => number): number[] {
  const steps = Array.from({ length: n }, (_, i) => min + ((max - min) * i) / Math.max(1, n - 1));
  return shuffled(steps, rand);
}

/* Tile heights ÷ 75 (Figma: 75–108 on a 75 wide tile) — aspect-ratio sequence. */
const HERO_RATIOS = [1.3067, 1.2, 1.24, 1.16, 1, 1.1067, 1.2, 1.36, 1.36, 1.2, 1, 1.24, 1.1, 1.44, 1.3, 0.96];

export type HeroColumn = {
  tiles: { src: string; ratio: number }[];
  duration: number;
  reverse: boolean;
  phase: number;
};

/* 14 columns × ~15 cards (14–16) = 210 slots over all 176 photos. Snacks alone are 97, so
   every photo is used once and the 34 spare slots repeat swag / gifts / experience
   photos to keep the wall balanced. Each section's photos are shuffled and dealt
   across the columns evenly (every column gets a share of every section), then each
   column is ordered greedily: always pull from the section with the most cards left
   that differs from the previous card — and prefer a different category — so a
   column reads as a mix instead of one family. */
const HERO_COLS = 14;
const SECTION_ORDER = ["swag", "gifts", "snacks", "experiences"] as const;

function buildHeroColumns(): HeroColumn[] {
  const rand = mulberry32(20261016);
  type Tile = (typeof ALL_TILES)[number];
  const bySection = new Map<string, Tile[]>(SECTION_ORDER.map((sec) => [sec, ALL_TILES.filter((t) => t.section === sec)]));

  // spare slots: gifts ×1 (9) + swag (13) + experiences (12) = 34
  const spare: Tile[] = [
    ...bySection.get("gifts")!,
    ...shuffled(bySection.get("swag")!, rand).slice(0, 13),
    ...shuffled(bySection.get("experiences")!, rand).slice(0, 12),
  ];
  const pool = new Map<string, Tile[]>(
    SECTION_ORDER.map((sec) => [
      sec,
      shuffled([...bySection.get(sec)!, ...spare.filter((t) => t.section === sec)], rand),
    ]),
  );

  // deal each section round-robin across columns, starting at a rotating offset
  const perCol: Tile[][][] = Array.from({ length: HERO_COLS }, () => SECTION_ORDER.map(() => [] as Tile[]));
  let offset = 0;
  SECTION_ORDER.forEach((sec, si) => {
    pool.get(sec)!.forEach((t, i) => perCol[(i + offset) % HERO_COLS][si].push(t));
    offset += pool.get(sec)!.length;
  });

  const cols: Tile[][] = perCol.map((groups) => {
    const out: Tile[] = [];
    const total = groups.reduce((n, g) => n + g.length, 0);
    let prev = -1;
    while (out.length < total) {
      const order = groups
        .map((g, si) => ({ si, left: g.length, r: rand() }))
        .filter((x) => x.left > 0)
        .sort((a, b) => b.left - a.left || a.r - b.r);
      const pick = order.find((x) => x.si !== prev) ?? order[0];
      const g = groups[pick.si];
      const prevFamily = out.length ? out[out.length - 1].family : "";
      const k = g.findIndex((t) => t.family !== prevFamily);
      out.push(g.splice(k >= 0 ? k : 0, 1)[0]);
      prev = pick.si;
    }
    return out;
  });

  /* Each column drifts at its own speed: 10–23px/s on the 75px-wide Figma tile
     (≈25% slower than before), so duration = one half's height ÷ speed. */
  const speeds = spreadSpeeds(HERO_COLS, 10, 23, rand);
  return cols.map((col, c) => {
    const tiles = col.map((t, i) => ({ src: t.src, ratio: HERO_RATIOS[(c * 3 + i * 5) % HERO_RATIOS.length] }));
    const loopPx = tiles.reduce((a, t) => a + 75 * t.ratio + 11, 0);
    const duration = Math.round(loopPx / speeds[c]);
    return {
      tiles,
      duration,
      reverse: rand() < 0.5,
      phase: Math.round(rand() * duration),
    };
  });
}

export const HERO_COLUMNS: HeroColumn[] = buildHeroColumns();

/* ------------------------------------------------------------ Mosaic columns */

export type MosaicItem =
  | { kind: "product"; product: Product; h: number; delay: number }
  | { kind: "brand"; name: string; logo: string; h: number; delay: number }
  | { kind: "country"; country: Country; h: number; delay: number }
  | { kind: "coverage"; h: number; delay: number };

export type MosaicColumn = {
  items: MosaicItem[];
  /** seconds for one full loop */
  duration: number;
  reverse: boolean;
  /** negative delay (s) so columns never start in lockstep */
  phase: number;
};

/* Heights in rem. Product photos are 3:4 portraits and a column is ~10rem wide,
   so tiles sit around 13.3rem tall (Figma 520×693) with a little variety. */
const PRODUCT_H = [13.4, 14.6, 12.6, 15.4, 13.4, 16, 12.6, 14];
const BRAND_H = [9.375, 10.625, 10, 9.375, 10.625];
const COUNTRY_H = [13.125, 11.875, 12.5, 11.875, 13.125];
const GUTTER = 0.8333; /* rem — --spacing-catalog-gap */

export const MOSAIC_COLUMNS = 7;
/* Per-column pace in rem/s (×16 = px/s): 0.4–0.82 ≈ 6.5–13px/s, 25% slower than
   before; spread and shuffled per section (see spreadSpeeds). */
const MOSAIC_SPEED_RANGE = [0.4, 0.82] as const;
/* A half of a column must be taller than the viewport or the loop shows a gap. */
const MIN_LOOP_REM = 140; /* > the tallest mosaic viewport (120rem) */

/* Every photo in the section is used exactly once (35 swag, 9 gifts, 25 snacks,
   35 experiences), plus 5 brand cards, 5 country cards and 1 global-coverage
   card, dealt into 7 independent columns. Every column is an endless vertical
   marquee; a column whose cards are shorter than the viewport repeats them
   inside its loop (gifts only has 9 photos), so the loop height — the sum of its
   card heights — decides its duration at constant speed. */
export function buildMosaicColumns(section: SectionData): MosaicColumn[] {
  const products: MosaicItem[] = section.products.map((product, i) => ({
    kind: "product",
    product,
    h: PRODUCT_H[i % PRODUCT_H.length],
    delay: 0,
  }));

  const specials: MosaicItem[] = [];
  for (let i = 0; i < 5; i++) {
    specials.push({ kind: "brand", name: section.brands[i].name, logo: section.brands[i].logo, h: BRAND_H[i], delay: 0 });
    specials.push({ kind: "country", country: section.countries[i], h: COUNTRY_H[i], delay: 0 });
    if (i === 1) specials.push({ kind: "coverage", h: 17, delay: 0 });
  }

  const cols: { products: MosaicItem[]; specials: MosaicItem[] }[] = Array.from(
    { length: MOSAIC_COLUMNS },
    () => ({ products: [], specials: [] }),
  );
  products.forEach((p, i) => cols[i % MOSAIC_COLUMNS].products.push(p));
  specials.forEach((sp, j) => cols[(j * 3) % MOSAIC_COLUMNS].specials.push(sp));

  const rand = mulberry32(section.id.split("").reduce((a, ch) => a * 31 + ch.charCodeAt(0), 7));
  const speeds = spreadSpeeds(MOSAIC_COLUMNS, MOSAIC_SPEED_RANGE[0], MOSAIC_SPEED_RANGE[1], rand);
  const directions = shuffled(Array.from({ length: MOSAIC_COLUMNS }, (_, i) => i % 2 === 1), rand);

  return cols.map((col, c) => {
    // weave specials evenly through the column's products
    const gap = Math.max(1, Math.ceil(col.products.length / (col.specials.length + 1)));
    const base: MosaicItem[] = [];
    let sIdx = 0;
    col.products.forEach((p, i) => {
      base.push(p);
      if ((i + 1) % gap === 0 && sIdx < col.specials.length) base.push(col.specials[sIdx++]);
    });
    while (sIdx < col.specials.length) base.push(col.specials[sIdx++]);

    const baseRem = base.reduce((a, it) => a + it.h + GUTTER, 0);
    const reps = Math.max(1, Math.ceil(MIN_LOOP_REM / baseRem));
    const items = Array.from({ length: reps }, () => base).flat();
    const duration = Math.round((baseRem * reps) / speeds[c]);
    return {
      items: items.map((it, i) => ({ ...it, delay: (i % 4) * 70 })),
      duration,
      reverse: directions[c],
      phase: Math.round(rand() * duration),
    };
  });
}
