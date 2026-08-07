/* /gifting · hero (Figma 1113:2142 + 1650:3437). A dark warm-lit photo hero with
   left copy (cream eyebrow, Satoshi-Black headline, amber CTA), a floating glass
   "category" card + a "Popular Picks" product row over the photo, and a logo
   marquee. SiteHeader is rendered by the page and auto-themes white over this. */

import Image, { type StaticImageData } from "next/image";
import sony from "@/public/gifting/g2-sony.png";
import calpak from "@/public/gifting/g2-calpak.png";
import yeti from "@/public/gifting/g2-yeti.png";
import sephora from "@/public/gifting/g2-sephora.png";
import lelabo from "@/public/gifting/g2-lelabo.png";

const svg = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

const Gift = () => (
  <svg {...svg} className="size-5">
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
    <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
  </svg>
);
const Monitor = () => (
  <svg {...svg} className="size-5">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);
const Chair = () => (
  <svg {...svg} className="size-5">
    <path d="M5 11a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3H5zM5 14v4M19 14v4M6 18h12" />
    <path d="M7 9V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" />
  </svg>
);
const Leaf = () => (
  <svg {...svg} className="size-5">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6" />
  </svg>
);
const Cup = () => (
  <svg {...svg} className="size-5">
    <path d="M10 2v2M14 2v2M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1Z" />
    <path d="M6 2v2M16 11h3a2 2 0 0 1 0 4h-3" />
  </svg>
);
const Card = () => (
  <svg {...svg} className="size-5">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20" />
  </svg>
);
const Chevron = () => (
  <svg {...svg} className="size-4 text-white/50">
    <path d="m9 18 6-6-6-6" />
  </svg>
);
const Heart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#9a9ba0" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-[0.8rem]" aria-hidden>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const CATS: { label: string; icon: React.ReactNode; active?: boolean }[] = [
  { label: "All Gifts", icon: <Gift />, active: true },
  { label: "Tech", icon: <Monitor /> },
  { label: "Lifestyle", icon: <Chair /> },
  { label: "Wellness", icon: <Leaf /> },
  { label: "Food & Drink", icon: <Cup /> },
  { label: "Gift Cards", icon: <Card /> },
];

const PICKS: { img: StaticImageData; name: string; sub: string }[] = [
  { img: sony, name: "Sony", sub: "WH-1000XM5" },
  { img: calpak, name: "Calpak", sub: "Luka Duffel" },
  { img: yeti, name: "YETI", sub: "Rambler 20oz" },
  { img: sephora, name: "Sephora", sub: "Gift Card" },
  { img: lelabo, name: "Le Labo", sub: "Santal 26" },
];

function CategoryCard() {
  return (
    <div className="w-[18.4375rem] rounded-[1rem] border border-white/[0.12] bg-[#11221a]/25 p-6 shadow-[0px_18px_22px_rgba(0,0,0,0.45)] backdrop-blur-md">
      <p className="font-[family-name:var(--font-satoshi)] text-[1.1875rem] leading-[1.625rem] text-white">
        Choose from thousands
        <br />
        of premium gifts
      </p>
      <div className="mt-[1.3125rem] flex flex-col gap-[0.6875rem]">
        {CATS.map((c) => (
          <div
            key={c.label}
            className={
              c.active
                ? "flex h-[2.625rem] items-center justify-between rounded-[0.625rem] border border-[#f1c33f]/[0.28] bg-[#f1c33f]/[0.14] py-[0.6875rem] pl-4 pr-2"
                : "flex items-center justify-between pl-4 pr-2"
            }
          >
            <div className="flex items-center gap-3">
              <span className={c.active ? "text-[#f1c33f]" : "text-white/90"}>{c.icon}</span>
              <span
                className={
                  c.active
                    ? "font-sans text-[0.9375rem] font-semibold text-[#f1c33f]"
                    : "font-sans text-[0.9375rem] text-white/90"
                }
              >
                {c.label}
              </span>
            </div>
            <Chevron />
          </div>
        ))}
      </div>
    </div>
  );
}

function PicksCard() {
  return (
    <div className="w-[38.4375rem] max-w-full rounded-[0.75rem] border-[0.75px] border-white/10 bg-[#0d1a14]/[0.35] p-5 shadow-[0px_13.5px_16.5px_rgba(0,0,0,0.45)] backdrop-blur-md">
      <div className="flex items-end justify-between">
        <p className="font-[family-name:var(--font-satoshi)] text-[0.7rem] text-white">Popular Picks</p>
        <p className="font-sans text-[0.6rem] font-semibold text-[#f1c33f]">View all</p>
      </div>
      <div className="mt-[0.625rem] flex gap-3">
        {PICKS.map((p) => (
          <div
            key={p.name}
            className="flex-1 overflow-hidden rounded-[0.5rem] bg-[#f5f4f0] pb-2"
          >
            <div className="relative h-[5.5rem] w-full">
              <Image src={p.img} alt={p.name} fill className="object-cover object-top" sizes="120px" />
            </div>
            <div className="flex items-start justify-between px-[0.5625rem] pt-1.5">
              <div>
                <p className="font-sans text-[0.5625rem] font-bold leading-tight text-[#16171b]">{p.name}</p>
                <p className="font-sans text-[0.5rem] leading-tight text-[#6b6c71]">{p.sub}</p>
              </div>
              <Heart />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GiftHero() {
  return (
    <section className="relative overflow-hidden bg-[#040909] px-section-x-sm pb-24 pt-[7rem] md:px-section-x-md md:pb-28 md:pt-[8rem] lg:px-section-x-lg lg:pb-32 lg:pt-[7.5rem]">
      {/* photo + legibility scrim */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/gifting/g2-hero.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[70%_center]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,9,9,0.92)_0%,rgba(4,9,9,0.78)_38%,rgba(4,9,9,0.5)_60%,rgba(4,9,9,0.28)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(4,9,9,0.75)_0%,rgba(4,9,9,0)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-content">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          {/* left copy */}
          <div className="flex max-w-[34rem] flex-col gap-8">
            <div className="flex flex-col gap-2">
              <p
                data-animation="reveal"
                className="font-sans text-[0.75rem] font-bold uppercase tracking-[0.1rem] text-[#fef3d7]"
              >
                Gifting · Stadium
              </p>
              <h1
                data-animation="reveal"
                className="font-[family-name:var(--font-satoshi)] text-[2.75rem] font-black leading-[1.02] tracking-[-0.09375rem] text-white md:text-[3.25rem] lg:text-[3.625rem]"
              >
                Corporate gifting without the busywork
              </h1>
            </div>
            <p
              data-animation="reveal"
              className="font-sans text-[1.0625rem] leading-[1.52] text-[#fbfeff] lg:text-[1.1875rem]"
            >
              Client, employee, partner, and holiday gifts, all from one platform.
            </p>
            <div data-animation="reveal" className="flex flex-col gap-8">
              <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <a
                  href="#"
                  className="inline-flex h-button-h items-center justify-center rounded-[100px] bg-[#ffb800] px-[1.375rem] font-sans text-button-primary uppercase text-[#1b1b1b] transition-all duration-200 hover:brightness-105 active:scale-[0.98] focus-visible:outline-white"
                >
                  <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">Browse the catalog</span>
                </a>
                <a
                  href="#"
                  className="inline-flex h-button-h items-center justify-center rounded-[100px] border border-white bg-transparent px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-white"
                >
                  <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">Talk to sales</span>
                </a>
              </div>
              <p className="font-sans text-[0.8125rem] font-semibold leading-[1.4] text-[#ccc]">
                HR, Marketing, Sales and CX at 5,000+ teams gift here
              </p>
            </div>
          </div>

          {/* floating cards (desktop) */}
          <div
            data-animation="reveal"
            className="relative hidden w-[38.4375rem] shrink-0 lg:block"
          >
            <div className="flex justify-end">
              <CategoryCard />
            </div>
            <div className="mt-6">
              <PicksCard />
            </div>
          </div>
        </div>

        {/* logo marquee */}
        <div data-animation="reveal" className="mt-16 lg:mt-24">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-90 md:gap-x-14">
            {LOGOS.map((l, i) => (
              <img key={`${l.alt}-${i}`} src={l.src} alt={l.alt} width={l.w} height={l.h} className="h-[1.4rem] w-auto brightness-0 invert" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const LOGOS = [
  { src: "/trust-google.svg", alt: "Google", w: 74, h: 24 },
  { src: "/trust-amazon.svg", alt: "Amazon", w: 80, h: 24 },
  { src: "/trust-pinterest.svg", alt: "Pinterest", w: 87, h: 22 },
  { src: "/trust-accenture.svg", alt: "Accenture", w: 84, h: 24 },
  { src: "/trust-bloomberg.svg", alt: "Bloomberg", w: 90, h: 16 },
  { src: "/trust-salesforce.svg", alt: "Salesforce", w: 37, h: 26 },
  { src: "/trust-netflix.svg", alt: "Netflix", w: 75, h: 20 },
  { src: "/trust-google.svg", alt: "Google", w: 74, h: 24 },
  { src: "/trust-amazon.svg", alt: "Amazon", w: 80, h: 24 },
];
