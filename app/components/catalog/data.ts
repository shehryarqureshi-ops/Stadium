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
};

/** A brand logo tile — or, when `logo` is omitted, a text tile (name + `stat`). */
export type Brand = { name: string; logo?: string; /** taller box for square / stacked marks */ tall?: boolean; stat?: string };

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
  brands: Brand[];
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
    brands: [
      { name: "Nike", logo: "/catalog-page/logos/nike.svg" },
      { name: "Carhartt", logo: "/catalog-page/logos/carhartt.svg", tall: true },
      { name: "The North Face", logo: "/catalog-page/logos/thenorthface.svg", tall: true },
      { name: "TravisMathew", logo: "/catalog-page/logos/travismathew.svg" },
      { name: "New Era", logo: "/catalog-page/logos/newera.svg", tall: true },
      { name: "adidas", logo: "/catalog-page/logos/adidas.svg", tall: true },
    ],
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
    brands: [
      { name: "Apple", logo: "/catalog-page/logos/apple.svg", tall: true },
      { name: "Rubik's", logo: "/catalog-page/logos/rubiks.svg" },
      { name: "Logitech", logo: "/catalog-page/logos/logitech.svg" },
      { name: "Sony", logo: "/catalog-page/logos/sony.svg" },
      { name: "Ray-Ban", logo: "/catalog-page/logos/rayban.svg" },
      { name: "JBL", logo: "/catalog-page/logos/jbl.svg", tall: true },
    ],
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
    noun: "snacks",
    blurb: "Snacks, drinks, pantry staples and work-and-play finds — curated boxes your team will fight over, delivered across 170+ countries.",
    catalogHref: "https://www.snackmagic.com/our-snacks",
    products: SNACKS_PRODUCTS,
    brands: [
      { name: "Hal's New York", logo: "/catalog-page/logos/hals.svg", tall: true },
      { name: "Hu", logo: "/catalog-page/logos/hu.svg", tall: true },
      { name: "SmartSweets", logo: "/catalog-page/logos/smartsweets.svg", tall: true },
      { name: "Tate's Bake Shop", logo: "/catalog-page/logos/tates.svg", tall: true },
      { name: "Poppi", logo: "/catalog-page/logos/poppi.svg" },
      { name: "Hippeas", logo: "/catalog-page/logos/hippeas.svg" },
    ],
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
    brands: [
      { name: "Escape Quest", stat: "6.6K+ bookings" },
      { name: "Coworker Clash", stat: "6.1K+ bookings" },
      { name: "Team Trivia", stat: "1.6K+ bookings" },
      { name: "Puzzles", stat: "1.3K+ bookings" },
      { name: "Terrarium Workshop", stat: "800+ bookings" },
    ],
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

/* 20 columns × 15 cards = 300 slots over all 202 photos. Snacks alone are 97, so
   every photo is used once and the repeats land only in non-adjacent columns (see the parity split below). Then each
   column is ordered greedily: always pull from the section with the most cards left
   that differs from the previous card — and prefer a different category — so a
   column reads as a mix instead of one family. */
/* 20 columns: the wall is ~100px short of the page width each side, so wider
   screens reveal more columns (CatalogHero shows 10 / 13 / 15 / 17 / 20). */
const HERO_COLS = 20;
/* cards per column from each section, in SECTION_ORDER (swag, gifts, snacks, experiences) = 15 */
const HERO_QUOTA = [3, 3, 6, 3];
/* One constant pace for every column (px/s on the 75px-wide Figma tile) —
   matches the Swag mosaic's average pace; direction alternates by column. */
const HERO_SPEED = 9.8;
const SECTION_ORDER = ["swag", "gifts", "snacks", "experiences"] as const;

function buildHeroColumns(): HeroColumn[] {
  const rand = mulberry32(20261016);
  type Tile = (typeof ALL_TILES)[number];

  /* Photos are split in two halves per section — even columns draw only from half A, odd columns only
     from half B — so two neighbouring columns never share a photo, and a column never repeats one
     (it draws fewer cards per section than the half holds). Every photo is still used. */
  const halves = SECTION_ORDER.map((sec) => {
    const list = shuffled(ALL_TILES.filter((t) => t.section === sec), rand);
    return [list.filter((_, i) => i % 2 === 0), list.filter((_, i) => i % 2 === 1)] as Tile[][];
  });
  const ptr = [0, 1].map(() => SECTION_ORDER.map(() => 0));

  const perCol: Tile[][][] = Array.from({ length: HERO_COLS }, (_, c) => {
    const p = c % 2;
    return SECTION_ORDER.map((_, si) => {
      const pool = halves[si][p];
      return Array.from({ length: HERO_QUOTA[si] }, () => pool[ptr[p][si]++ % pool.length]);
    });
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
const BRAND_H = [10, 10.625, 9.375, 10.625, 10, 9.375];
const COUNTRY_H = [13.125, 11.875, 12.5, 11.875, 13.125];
const GUTTER = 0.8333; /* rem — --spacing-catalog-gap */

/* 9 columns; the explorer shows 2 / 5 / 5 / 6 / 7 / 8 / 9 as the page widens. */
export const MOSAIC_COLUMNS = 9;
const MOSAIC_SPEED = 0.61; /* rem/s ≈ 9.8px/s — one constant pace for every column and section */
/* A half of a column must be taller than the viewport or the loop shows a gap. */
const MIN_LOOP_REM = 140; /* > the tallest mosaic viewport (120rem) */

/* Each column is an endless vertical marquee holding ≥ MIN_LOOP_REM of cards, so no
   card shows twice at once inside a column. Products are split in two halves — even
   columns draw only from half A, odd columns only from half B — so two neighbouring
   columns never show the same product. Every brand / activity, country and the
   coverage card appears exactly once per section (in one column), and every product is
   used. Loop height ÷ the constant pace gives each column's duration. */
export function buildMosaicColumns(section: SectionData): MosaicColumn[] {
  const rand = mulberry32(section.id.split("").reduce((a, ch) => a * 31 + ch.charCodeAt(0), 7));
  const products: MosaicItem[] = section.products.map((product, i) => ({
    kind: "product",
    product,
    h: PRODUCT_H[i % PRODUCT_H.length],
    delay: 0,
  }));
  const shuffledProducts = shuffled(products, rand);
  const halves = [shuffledProducts.filter((_, i) => i % 2 === 0), shuffledProducts.filter((_, i) => i % 2 === 1)];

  const specials: MosaicItem[] = [];
  const n = Math.max(section.brands.length, section.countries.length);
  for (let i = 0; i < n; i++) {
    if (section.brands[i]) specials.push({ kind: "brand", brand: section.brands[i], h: BRAND_H[i % BRAND_H.length], delay: 0 });
    if (section.countries[i]) specials.push({ kind: "country", country: section.countries[i], h: COUNTRY_H[i % COUNTRY_H.length], delay: 0 });
    if (i === 1) specials.push({ kind: "coverage", h: 17, delay: 0 });
  }
  // spread the specials over the columns (4 is coprime to 9, so neighbours rarely both get one)
  const colSpecials: MosaicItem[][] = Array.from({ length: MOSAIC_COLUMNS }, () => []);
  specials.forEach((sp, j) => colSpecials[(j * 4) % MOSAIC_COLUMNS].push(sp));

  const ptr = [0, 0];
  return colSpecials.map((sp, c) => {
    const p = c % 2;
    const pool = halves[p];
    const used = new Set<MosaicItem>();
    let rem = sp.reduce((a, it) => a + it.h + GUTTER, 0);
    const picked: MosaicItem[] = [];
    while (rem < MIN_LOOP_REM && used.size < pool.length) {
      const it = pool[ptr[p]++ % pool.length];
      if (used.has(it)) continue;
      used.add(it);
      picked.push(it);
      rem += it.h + GUTTER;
    }
    // weave the specials evenly through the products
    const gap = Math.max(1, Math.ceil(picked.length / (sp.length + 1)));
    const base: MosaicItem[] = [];
    let sIdx = 0;
    picked.forEach((it, i) => {
      base.push(it);
      if ((i + 1) % gap === 0 && sIdx < sp.length) base.push(sp[sIdx++]);
    });
    while (sIdx < sp.length) base.push(sp[sIdx++]);

    const loopRem = base.reduce((a, it) => a + it.h + GUTTER, 0);
    return {
      items: base.map((it, i) => ({ ...it, delay: (i % 4) * 70 })),
      duration: Math.round(loopRem / MOSAIC_SPEED),
      reverse: c % 2 === 1, // strict up / down alternation
      phase: 0,
    };
  });
}
