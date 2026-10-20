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
  /** set on decoration-method cards (Swag) — opens the deco methods modal at this method */
  deco?: string;
  /** set on dietary / taste cards (Snacks) — opens the dietary modal */
  diet?: string;
  /** brand shown in the modal ("Stanley") */
  brand?: string;
  /** Swag: decoration methods the product supports — outlined chips in the modal */
  decoMethods?: string[];
  /** Snacks: dietary tags — dark chips in the modal */
  dietary?: string[];
};

/** A brand logo tile — or, when `logo` is omitted, a text tile (name + `stat`). */
export type Brand = { name: string; logo?: string; /** logo viewBox width ÷ height (sizes the mark) */ ratio?: number; stat?: string };

export type Country = { code: FlagCode; name: string; stat: string };

/** A big-number card ("26,000+" / "styles to choose from"). */
export type Stat = { value: string; label: string };

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
  /** logo brand cards (Swag / Gifts / Snacks) — Experiences has none */
  brands: Brand[];
  /** Hosted Experiences' event cards (name + bookings / collection) */
  events: Brand[];
  stats: Stat[];
  countries: Country[];
};

import type { FlagCode } from "../CircleFlag";
import { BRAND_LOGOS } from "./brandLogos";

/* Country cards: 15 flags, each with its own line. A section shows 9 of them (one per column),
   rotated by section so the four sections open with different countries. */
const COUNTRY_POOL: Country[] = [
  { code: "us", name: "USA", stat: "Delivering coast to coast, duties handled" },
  { code: "gb", name: "United Kingdom", stat: "2,400+ teams reached across the UK" },
  { code: "de", name: "Germany", stat: "1,800+ teams reached across the EU" },
  { code: "ca", name: "Canada", stat: "Coast-to-coast coverage, duties handled" },
  { code: "au", name: "Australia", stat: "Same-week delivery in major cities" },
  { code: "jp", name: "Japan", stat: "Next-day delivery across Tokyo & Osaka" },
  { code: "in", name: "India", stat: "1,300+ teams from Mumbai to Bengaluru" },
  { code: "br", name: "Brazil", stat: "900+ teams reached across Brazil" },
  { code: "mx", name: "Mexico", stat: "700+ teams reached across Mexico" },
  { code: "fr", name: "France", stat: "1,100+ teams reached in France" },
  { code: "it", name: "Italy", stat: "Delivered to every region in Italy" },
  { code: "nl", name: "Netherlands", stat: "Delivered to every Dutch province" },
  { code: "se", name: "Sweden", stat: "Fast delivery across the Nordics" },
  { code: "sg", name: "Singapore", stat: "Hosts and kits across Southeast Asia" },
  { code: "ae", name: "United Arab Emirates", stat: "Doorstep delivery across the Gulf" },
];
const countriesFor = (sectionIndex: number): Country[] =>
  Array.from({ length: 9 }, (_, k) => COUNTRY_POOL[(sectionIndex * 4 + k) % COUNTRY_POOL.length]);

/* Big-number cards — at most one per column ("where applicable"). */
const STATS: Record<SectionId, Stat[]> = {
  swag: [
    { value: "26,000+", label: "styles to choose from" },
    { value: "760", label: "brands, 93,000+ colorways" },
    { value: "100+", label: "decoration methods in ~12 families" },
    { value: "11", label: "categories, from apparel to baby" },
    { value: "170+", label: "countries delivered, duties handled" },
  ],
  gifts: [
    { value: "8,900+", label: "gifts worldwide, 3,758 in the US" },
    { value: "~300", label: "brands in the US gift shop" },
    { value: "7 in 10", label: "physical gifts are $100 or less" },
    { value: "290", label: "gift cards, digital and instant" },
    { value: "170+", label: "countries delivered, duties handled" },
  ],
  snacks: [
    { value: "2,000+", label: "snacks & sips to choose from" },
    { value: "80", label: "brands, 23% from emerging makers" },
    { value: "18", label: "snack, sip and pantry categories" },
    { value: "47%", label: "of snacks are vegetarian" },
    { value: "170+", label: "countries delivered, duties handled" },
  ],
  experiences: [
    { value: "350+", label: "experiences in 140 themed collections" },
    { value: "52,000+", label: "events hosted for 11,000+ companies" },
    { value: "25,000+", label: "teams who love it" },
    { value: "106", label: "experiences bookable as gifts" },
    { value: "170+", label: "countries, hosts on every continent" },
  ],
};

/* Event cards (Hosted Experiences): the most-booked events. */
const EXPERIENCE_EVENTS: Brand[] = [
  { name: "Escape Quest", stat: "6.6K+ bookings" },
  { name: "Coworker Clash", stat: "6.1K+ bookings" },
  { name: "Team Trivia", stat: "1.6K+ bookings" },
  { name: "Puzzles", stat: "1.3K+ bookings" },
  { name: "Terrarium Workshop", stat: "800+ bookings" },
  { name: "Bollywood Virtual Dance Class", stat: "DEI & heritage" },
  { name: "Virtual Boba Tea Making Class", stat: "Cooking" },
  { name: "Bread Making Class", stat: "Cooking" },
  { name: "Essential Oils Virtual Class", stat: "Wellness" },
];

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
    brands: BRAND_LOGOS.swag,
    events: [],
    stats: STATS.swag,
    countries: countriesFor(0),
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
    brands: BRAND_LOGOS.gifts,
    events: [],
    stats: STATS.gifts,
    countries: countriesFor(1),
  },
  {
    id: "snacks",
    tab: "Snacks",
    tabShort: "Snacks",
    title: "Snacks",
    noun: "snacks",
    blurb: "Snacks, drinks, pantry staples and work-and-play finds — curated boxes your team will fight over, delivered across 170+ countries.",
    catalogHref: "https://www.snackmagic.com/our-snacks",
    products: SNACKS_PRODUCTS,
    brands: BRAND_LOGOS.snacks,
    events: [],
    stats: STATS.snacks,
    countries: countriesFor(2),
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
    brands: [],
    events: EXPERIENCE_EVENTS,
    stats: STATS.experiences,
    countries: countriesFor(3),
  },
];

/* ---------------------------------------------------------------- Hero tiles */

/* Every photo from every section, tagged with its "family" (section + category)
   so the ordering below can keep look-alikes apart. */
const ALL_TILES = [
  ["swag", SWAG_PRODUCTS],
  ["gifts", GIFTS_PRODUCTS],
  ["snacks", SNACKS_PRODUCTS],
  ["experiences", EXPERIENCES_PRODUCTS],
].flatMap(([sec, list]) =>
  (list as Product[]).filter((p) => !p.diet).map((p) => ({ src: p.image, family: `${sec}/${p.category}`, section: sec as string })),
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

/* Tile heights ÷ 75 (Figma: 75–108 on a 75 wide tile) — aspect-ratio sequence. */
const HERO_RATIOS = [1.3067, 1.2, 1.24, 1.16, 1, 1.1067, 1.2, 1.36, 1.36, 1.2, 1, 1.24, 1.1, 1.44, 1.3, 0.96];

export type HeroColumn = {
  tiles: { src: string; ratio: number }[];
  duration: number;
  reverse: boolean;
  phase: number;
};

/* 20 columns × 15 cards = 300 slots, every one a DIFFERENT photo: each section's photos are
   shuffled once and dealt out column by column, so a photo shows once on the whole wall (the
   per-section quota is sized to what the section holds). Each column is then ordered greedily:
   always pull from the section with the most cards left that differs from the previous card —
   and prefer a different category — so a column reads as a mix instead of one family. */
const HERO_COLS = 20;
/* cards per column from each section, in SECTION_ORDER (swag, gifts, snacks, experiences) = 15 */
const HERO_QUOTA = [4, 4, 4, 3];
/* One constant pace for every column (px/s on the 75px-wide Figma tile) —
   matches the mosaic pace; direction alternates by column. */
const HERO_SPEED = 9.8;
const SECTION_ORDER = ["swag", "gifts", "snacks", "experiences"] as const;

function buildHeroColumns(): HeroColumn[] {
  const rand = mulberry32(20261016);
  type Tile = (typeof ALL_TILES)[number];

  const pools = SECTION_ORDER.map((sec) => shuffled(ALL_TILES.filter((t) => t.section === sec), rand));
  const ptr = SECTION_ORDER.map(() => 0);

  const perCol: Tile[][][] = Array.from({ length: HERO_COLS }, () =>
    SECTION_ORDER.map((_, si) => Array.from({ length: HERO_QUOTA[si] }, () => pools[si][ptr[si]++ % pools[si].length])),
  );

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

  /* Constant pace: duration = one half's height ÷ HERO_SPEED. */
  return cols.map((col, c) => {
    const tiles = col.map((t, i) => ({ src: t.src, ratio: HERO_RATIOS[(c * 3 + i * 5) % HERO_RATIOS.length] }));
    const loopPx = tiles.reduce((a, t) => a + 75 * t.ratio + 11, 0);
    const duration = Math.round(loopPx / HERO_SPEED);
    return {
      tiles,
      duration,
      reverse: c % 2 === 1, // strict up / down alternation
      phase: 0,
    };
  });
}

export const HERO_COLUMNS: HeroColumn[] = buildHeroColumns();

/* ------------------------------------------------------------ Mosaic columns */

export type MosaicItem =
  | { kind: "product"; product: Product; h: number; delay: number }
  | { kind: "brand"; brand: Brand; h: number; delay: number }
  | { kind: "event"; brand: Brand; h: number; delay: number }
  | { kind: "country"; country: Country; h: number; delay: number }
  | { kind: "stat"; stat: Stat; h: number; delay: number };

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
const BRAND_H = [10, 10.625, 9.375, 10.625, 10, 9.375];
const EVENT_H = [11.25, 12.5, 11.875, 12.5];
const COUNTRY_H = [13.125, 11.875, 12.5, 11.875, 13.125];
const STAT_H = [12.5, 13.75, 11.875, 13.125];
const GUTTER = 0.8333; /* rem — --spacing-catalog-gap */

/* 9 columns; the explorer shows 2 / 5 / 5 / 6 / 7 / 8 / 9 as the page widens. */
export const MOSAIC_COLUMNS = 9;
const MOSAIC_SPEED = 0.61; /* rem/s ≈ 9.8px/s — one constant pace for every column and section */
const PRODUCTS_MIN = 10;
const PRODUCTS_MAX = 12;

/* Spread `count` specials over `slots` positions with no two adjacent, at random (seeded). */
function specialSlots(slots: number, count: number, rand: () => number): number[] {
  const out: number[] = [];
  for (let k = 0; k < count; k++) {
    let pos = Math.round(((k + 0.5) * slots) / count + (rand() - 0.5) * (slots / count) * 0.8);
    pos = Math.max(0, Math.min(slots - 1, pos));
    if (out.length && pos <= out[out.length - 1] + 1) pos = out[out.length - 1] + 2;
    out.push(Math.min(pos, slots - 1));
  }
  return out;
}

/* Every column is a finite stack of ONE of each kind — 10–12 product cards (a photo is used
   in exactly one column of the whole section), 1 country, and — where the section has them —
   1 brand logo (or 1 event card for Hosted Experiences), 1 dietary card (Snacks) and 1 stat
   card — in a random order with no two non-photo cards touching. Each column loops
   endlessly (marquee); the grid is exactly as tall as its shortest column's loop, so a card
   can never show twice on screen at once. */
export function buildMosaicColumns(section: SectionData): MosaicColumn[] {
  const seed = section.id.split("").reduce((a, ch) => a * 31 + ch.charCodeAt(0), 7);
  const rand = mulberry32(seed);
  const photos = section.products.filter((p) => !p.diet);
  const dietCards = shuffled(section.products.filter((p) => p.diet), rand);

  const products: MosaicItem[] = shuffled(photos, rand).map((product, i) => ({
    kind: "product",
    product,
    h: PRODUCT_H[i % PRODUCT_H.length],
    delay: 0,
  }));

  /* products per column: as even as possible, clamped to 10–12 (extras beyond 12×9 stay unused) */
  const per = Math.min(PRODUCTS_MAX, Math.max(PRODUCTS_MIN, Math.floor(products.length / MOSAIC_COLUMNS)));
  const extra = Math.max(0, Math.min(MOSAIC_COLUMNS * PRODUCTS_MAX, products.length) - per * MOSAIC_COLUMNS);
  let cursor = 0;

  const brands = shuffled(section.brands, rand);
  const events = shuffled(section.events, rand);
  const countries = shuffled(section.countries, rand);
  const stats = shuffled(section.stats, rand);

  return Array.from({ length: MOSAIC_COLUMNS }, (_, c) => {
    const crand = mulberry32(seed * 131 + c * 7919);
    const n = per + (c < extra ? 1 : 0);
    const picked = products.slice(cursor, cursor + n);
    cursor += n;

    const sp: MosaicItem[] = [];
    if (countries[c]) sp.push({ kind: "country", country: countries[c], h: COUNTRY_H[c % COUNTRY_H.length], delay: 0 });
    if (brands[c]) sp.push({ kind: "brand", brand: brands[c], h: BRAND_H[c % BRAND_H.length], delay: 0 });
    if (events[c]) sp.push({ kind: "event", brand: events[c], h: EVENT_H[c % EVENT_H.length], delay: 0 });
    if (dietCards[c]) sp.push({ kind: "product", product: dietCards[c], h: PRODUCT_H[(c + 3) % PRODUCT_H.length], delay: 0 });
    if (stats[c]) sp.push({ kind: "stat", stat: stats[c], h: STAT_H[c % STAT_H.length], delay: 0 });
    const specials = shuffled(sp, crand);

    const slots = picked.length + specials.length;
    const at = new Set(specialSlots(slots, specials.length, crand));
    const items: MosaicItem[] = [];
    let pi = 0;
    let si = 0;
    for (let k = 0; k < slots; k++) {
      if (at.has(k) && si < specials.length) items.push(specials[si++]);
      else if (pi < picked.length) items.push(picked[pi++]);
      else if (si < specials.length) items.push(specials[si++]);
    }

    const loopRem = items.reduce((a, it) => a + it.h + GUTTER, 0);
    return {
      items: items.map((it, i) => ({ ...it, delay: (i % 4) * 70 })),
      duration: Math.round(loopRem / MOSAIC_SPEED),
      reverse: c % 2 === 1, // strict up / down alternation
      phase: 0,
    };
  });
}

/* Height (rem) of one section's mosaic window: its shortest column's loop, minus a hair, so even
   that column never shows a card twice at once. The rest of the grid is as tall as the data allows. */
export function mosaicHeightRem(columns: MosaicColumn[]): number {
  const loops = columns.map((col) => col.items.reduce((a, it) => a + it.h + GUTTER, 0));
  return Math.floor(Math.min(...loops) - 1);
}
