"use client";

/* /gifting · Hero (Figma n9SjmDjzB1PeZAYJ5w43fr → "hero idea 25" 2504:14132:
   bg raster "image 13782" 2504:14133, split text row 2504:14156, full-bleed
   "carousel and brands" 2504:15121 = hero carousel 2504:15086 + trust band
   2504:14198). A warm amber/brown mesh-gradient raster (1440×1719, shipped at
   2× as gf-hero-bg.jpg) owns the whole dark top of the page: the box is 710px
   TALLER than this section so GiftingProblem's white card scrolls over it —
   render <GiftingHero/> then <GiftingProblem/> directly (Problem is
   transparent + `relative z-10`). No SwagHeroShader here (that one is
   hard-coded to the swag green and owned by /swag); the raster already fades
   to pure white by its own y≈1600, and `mask-b-from-75%` keeps that fade
   honest at viewports wider than 1440 where object-cover crops it.

   Text row is SPLIT: eyebrow + 54px Satoshi Black h1 on the left, subhead +
   two CTAs on the right. Figma draws the row at px-140; the site's 1200
   content edge (x=120) wins per the container rule — the trust band below is
   already drawn at x=120, so 140 was the outlier.

   Below it a full-bleed two-row photo band that bleeds past BOTH viewport
   edges (Figma gives the frame x=-130 w=1700). It is built as a strip whose
   overflow scrolls INSIDE itself (never the page): at lg the rows carry the
   Figma negative offsets (-66 / -130) so the rest state is pixel-exact; below
   lg they sit flush and the strip is a normal touch/arrow scroller.

   Figma stack (absolute y at 1440):
     0..84    navbar (fixed SiteHeader overlays; section pt = 184 = 84 + 100)
     184      eyebrow 12/1.4 (17)          → 8
     209      h1 54/1.02 ×2 (110)          → left column ends 319
     184      subhead 19/1.52 ×3 (87)      → 32          [right column, 519 wide]
     303      CTA row (38 Figma / 40 site h-button-h) → right column ends 341
     341      → 100 (text frame pb)
     441      carousel header (32) — label frame is empty, arrows only
     473      → 24
     497      row 1 (144), x -66 … 1570
     641      → 12
     653      row 2 (144), x -130 … 1526
     797      → 86
     883      trust marquee (40)
     923      → 86
     1009     section ends; bg raster continues to 1719 (710 = 44.375rem). */

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import heroBg from "@/public/gift2/gf-hero-bg.jpg";
import c01 from "@/public/gift2/gf-hero-01-snackbox-blue.jpg";
import c02 from "@/public/gift2/gf-hero-02-team-unboxing.jpg";
import c03 from "@/public/gift2/gf-hero-03-box-overflowing.jpg";
import c04 from "@/public/gift2/gf-hero-04-chips.jpg";
import c05 from "@/public/gift2/gf-hero-05-flatlay-cream.jpg";
import c06 from "@/public/gift2/gf-hero-06-packing.jpg";
import c07 from "@/public/gift2/gf-hero-07-chip-handoff.jpg";
import c08 from "@/public/gift2/gf-hero-08-golden-hour.jpg";
import c09 from "@/public/gift2/gf-hero-09-snackbox-delivered.jpg";
import c10 from "@/public/gift2/gf-hero-10-doorstep.jpg";
import c11 from "@/public/gift2/gf-hero-11-coffee.jpg";
import c12 from "@/public/gift2/gf-hero-12-desk-moment.jpg";
import c13 from "@/public/gift2/gf-hero-13-snack-in-hand.jpg";
import c14 from "@/public/gift2/gf-hero-14-box-delivered.jpg";
import c15 from "@/public/gift2/gf-hero-15-coldbrew.jpg";
import c16 from "@/public/gift2/gf-hero-16-cookies.jpg";
import c17 from "@/public/gift2/gf-hero-17-moment.jpg";
import c18 from "@/public/gift2/gf-hero-18-desk-spread.jpg";

type Tile = { img: StaticImageData; alt: string; w: string; px: number };

/* row 1 (2504:15094) — every tile 144 tall, radius 10, gap 12 */
const ROW_1: Tile[] = [
  { img: c01, alt: "A Snackmagic box on a blue backdrop", w: "w-[7.25rem]", px: 116 },
  { img: c02, alt: "A team unboxing snacks together", w: "w-[12.5rem]", px: 200 },
  { img: c03, alt: "A gift box overflowing with treats", w: "w-[10.5rem]", px: 168 },
  { img: c04, alt: "An assortment of chips and crisps", w: "w-[13.25rem]", px: 212 },
  { img: c05, alt: "A cream flat-lay of desk gifts", w: "w-[9.5rem]", px: 152 },
  { img: c06, alt: "Snacks being packed into a box", w: "w-[11.75rem]", px: 188 },
  { img: c07, alt: "A chip bag handed between colleagues", w: "w-[10rem]", px: 160 },
  { img: c08, alt: "A golden-hour desk with a gift box", w: "w-[12.75rem]", px: 204 },
  { img: c09, alt: "A snack box delivered to a doorstep", w: "w-[8.75rem]", px: 140 },
];

/* row 2 (2504:15104) */
const ROW_2: Tile[] = [
  { img: c10, alt: "A parcel handed over at a front door", w: "w-[11rem]", px: 176 },
  { img: c11, alt: "Coffee bags and a brewed cup", w: "w-[9rem]", px: 144 },
  { img: c12, alt: "A desk moment with snacks and a laptop", w: "w-[12.25rem]", px: 196 },
  { img: c13, alt: "A snack held in someone's hand", w: "w-[8.25rem]", px: 132 },
  { img: c14, alt: "A gift box delivered to an office", w: "w-[13rem]", px: 208 },
  { img: c15, alt: "Cold brew bottles in a wooden crate", w: "w-[10.25rem]", px: 164 },
  { img: c16, alt: "A spread of cookies and sweet snacks", w: "w-[11.5rem]", px: 184 },
  { img: c17, alt: "A colleague holding a wrapped gift", w: "w-[9.75rem]", px: 156 },
  { img: c18, alt: "A shared desk spread of snacks", w: "w-[12.5rem]", px: 200 },
];

/* Trust band "Logos track" (2504:14200): google, amazon, pinterest, accenture,
   bloomberg, salesforce, netflix, google, amazon, pinterest — each at its own
   Figma box size, gap 56. */
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
  { src: "/trust-pinterest.svg", alt: "Pinterest", w: 87, h: 22 },
];

function Row({ tiles, className }: { tiles: Tile[]; className: string }) {
  return (
    <ul className={`flex w-max list-none gap-3 ${className}`}>
      {tiles.map((t, i) => (
        <li
          key={`${t.alt}-${i}`}
          className={`relative h-36 shrink-0 overflow-hidden rounded-[0.625rem] ${t.w}`}
        >
          <Image
            src={t.img}
            alt={t.alt}
            fill
            quality={90}
            sizes={`${t.px}px`}
            className="select-none object-cover"
          />
        </li>
      ))}
    </ul>
  );
}

/* prev / next (2504:15090, 2504:15092): 32px circle, white/10 fill, 1.5px
   white/80 chevron — the exact geometry from Figma's svgAssets. */
function Chevron({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="size-8">
      <path
        d={dir === "prev" ? "M18 11L13 16L18 21" : "M14 11L19 16L14 21"}
        stroke="white"
        strokeOpacity="0.8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function GiftingHero() {
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = () => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };
  useEffect(sync, []);

  const scroll = (d: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: d * Math.round(el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="relative">
      {/* bg (2504:14133 "image 13782", 1440×1719): black ground under the amber
          mesh raster. 710px (44.375rem) taller than the section so the Problem
          card overlaps it; the bottom 25% is masked for viewports > 1440 where
          object-cover crops the raster's own fade-to-white away. */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-[calc(100%_+_44.375rem)] w-full overflow-hidden bg-black mask-b-from-75%"
      >
        <Image
          src={heroBg}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="select-none object-cover object-top"
        />
      </div>

      <div className="relative z-10">
        {/* split text row (2504:14156): Figma px-140 py-100 gap-32 — mapped to
            the 1200 content box (x=120 at 1440), right column 519 fixed */}
        <div className="px-section-x-sm pb-16 pt-[6rem] md:px-section-x-md md:pb-20 md:pt-[7rem] lg:px-section-x-lg lg:pb-[6.25rem] lg:pt-[11.5rem]">
          <div className="mx-auto flex w-full max-w-content flex-col items-start gap-8 lg:flex-row">
            <div
              data-animation="reveal"
              className="flex w-full flex-col gap-2 lg:min-w-0 lg:flex-1"
            >
              <p className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#fef3d7]">
                GIFTING • STADIUM
              </p>
              <h1 className="font-[family-name:var(--font-satoshi)] text-[2.5rem] font-black leading-[1.02] tracking-[-0.0625rem] text-white md:text-[3rem] lg:text-[3.375rem] lg:tracking-[-0.09375rem]">
                Snacks people
                <br />
                can’t wait to open
              </h1>
            </div>

            <div className="flex w-full flex-col gap-8 lg:w-[32.4375rem] lg:shrink-0">
              <p
                data-animation="reveal"
                data-reveal-delay="120"
                className="font-sans text-[1.0625rem] leading-[1.52] text-[#fbfeff] lg:text-[1.1875rem]"
              >
                Choose from curated snack boxes or let recipients build their
                own from 2,000+ snacks, with dietary filters and delivery to
                170+ countries.
              </p>
              <div
                data-animation="reveal"
                data-reveal-delay="200"
                className="flex flex-col gap-3.5 sm:flex-row sm:items-center"
              >
                <a
                  href="#"
                  className="inline-flex h-button-h items-center justify-center rounded-[100px] bg-white px-[1.375rem] font-sans text-button-primary uppercase text-black transition-all duration-200 hover:bg-[#f2f2f2] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                    Browse the catalog
                  </span>
                </a>
                <a
                  href="#"
                  className="inline-flex h-button-h items-center justify-center rounded-[100px] border border-white bg-transparent px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                    Build a box
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* carousel + brands (2504:15121) */}
        <div className="flex flex-col">
          {/* header (2504:15087): the 203×20 "label" frame is empty in Figma,
              so only the arrow pair renders, on the content edge */}
          <div className="px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
            <div className="mx-auto flex h-8 w-full max-w-content items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => scroll(-1)}
                disabled={atStart}
                aria-label="Previous photos"
                className="flex size-8 items-center justify-center rounded-full bg-white/10 transition-all duration-200 hover:bg-white/20 active:scale-[0.98] disabled:opacity-40 disabled:hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Chevron dir="prev" />
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                disabled={atEnd}
                aria-label="Next photos"
                className="flex size-8 items-center justify-center rounded-full bg-white/10 transition-all duration-200 hover:bg-white/20 active:scale-[0.98] disabled:opacity-40 disabled:hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Chevron dir="next" />
              </button>
            </div>
          </div>

          {/* two photo rows. The strip caps at 1440 above the Figma frame
              (Shopify-style centred container) and scrolls INSIDE itself, so
              the page never gains a horizontal scrollbar. At lg the rows carry
              Figma's negative offsets so the rest state bleeds past both
              edges exactly as drawn; below lg they sit flush and stay
              reachable by touch / the arrows. */}
          <div
            ref={track}
            onScroll={sync}
            data-animation="reveal"
            data-reveal-delay="160"
            className="mx-auto mt-6 flex w-full max-w-[90rem] flex-col items-start gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <Row tiles={ROW_1} className="lg:-ml-[4.125rem]" />
            <Row tiles={ROW_2} className="lg:-ml-[8.125rem]" />
          </div>

          {/* trust band (2504:14198): 86 / 40 marquee / 86 — seamless CSS
              marquee, logos inverted white, edges soft-masked */}
          <div
            data-animation="reveal"
            data-reveal-delay="240"
            className="px-section-x-sm py-14 md:px-section-x-md lg:px-section-x-lg lg:py-[5.375rem]"
          >
            <div className="mx-auto w-full max-w-content">
              <div className="relative h-10 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
                <div className="flex h-full w-max animate-[swag-marquee_40s_linear_infinite] motion-reduce:animate-none">
                  {[0, 1].map((group) => (
                    <ul
                      key={group}
                      aria-hidden={group === 1}
                      className="flex h-full shrink-0 list-none items-center gap-x-10 pr-10 md:gap-x-14 md:pr-14"
                    >
                      {LOGOS.map((l, i) => (
                        <li key={`${l.alt}-${i}`} className="flex shrink-0 items-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={l.src}
                            alt={group === 0 ? l.alt : ""}
                            width={l.w}
                            height={l.h}
                            style={{ height: `${l.h / 16}rem` }}
                            className="w-auto max-w-none select-none opacity-90 brightness-0 invert"
                          />
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
