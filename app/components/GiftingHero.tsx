/* /gifting · Hero (Figma n9SjmDjzB1PeZAYJ5w43fr → "hero idea 26" 2673:3537 —
   the designer's 2026-08-21 re-do; supersedes "hero idea 25" 2504:14132, whose
   nodes no longer exist). Three layers:

     · bg raster "image 13782" 2673:3538 (1440×1719, unchanged from the previous
       hero — pixel-identical to the shipped gf-hero-bg.jpg, shipped at 2×). A
       warm amber/brown mesh gradient that owns the whole dark top of the page:
       the box is 795px TALLER than this section so GiftingProblem's card
       scrolls over it — render <GiftingHero/> then <GiftingProblem/> directly
       (Problem is transparent + `relative z-10`). `mask-b-from-75%` keeps the
       raster's own fade-to-white honest above 1440 where object-cover crops it.
     · "glass" 2673:3539 — a full-bleed white/20 panel, rounded-t-32, that
       starts at the trust band (y=772) and, like the raster, runs 838px past
       its own start (686 past this section) so the Problem card overlaps it.
     · "text" 2673:3560 — left copy column, right photo collage.

   The 2504 hero's two-row bleeding product carousel is GONE, and so is its
   snacks copy: the H1/subhead/CTAs are now real gifting copy and the primary
   CTA is turmeric (#ffb800 / --color-accent-turmeric) on black, not white.

   The right column is a real photo grid, NOT the flattened raster it used to
   ship as. The live design lives in a different Figma file —
   F7rDHYd3n5nwRtrlv1F6dO, container 1220:3626 (444×688 at x=856) → 1244:4746 →
   1261:5189 "photo grid · two tracks, opposite directions · translateY loop"
   (444×1378). The old flattened PNG is node 1220:3628, literally named
   "image 13871 · flattened (backup)" and hidden. Geometry (Figma px):

     · fade mask 1261:5121 — 444×688 vertical alpha gradient, stops
       0 → 14% → 86% → 100% (opaque through the middle). Figma applies it as a
       per-photo mask; one CSS mask-image on the 444×688 window is equivalent.
     · LEFT track  x=0,   first photo y=4,  8 photos 211×152, pitch 167
     · RIGHT track x=233, first photo y=57, 8 photos 211×152, pitch 167
       (22px gutter; the right track is deliberately offset ~half a step)
     · every photo rounded-[12px] = rounded-card

   All 16 slots are absolute px in Figma but authored here as percentages of
   the window so the whole grid scales below lg, where the column narrows:
   211/444 = 47.5225% wide, 233/444 = 52.4775% left, 4/688 = 0.5814% and
   57/688 = 8.2849% top, and the 15px gap as a 7.109% (15/211) bottom margin —
   percentage margins resolve against the containing block's WIDTH, so the gap
   tracks the photo width exactly where a percentage row-gap would collapse.
   Each track renders its 8 photos twice; one group is exactly 8×167 = 1336
   tall, so the -50% translate in `gift-photo-track` loops seamlessly (see
   globals.css). Left drifts up, right drifts down.

   Assets: gf-hero-grid-<slot>.jpg. The 4× node exports are clipped by the
   444×688 ancestor, so only the 7 slots that fall inside the window rendered
   (844×608); the 9 below it export 1×1. Those 9 are plain scaleMode=FILL
   fills, so they were rebuilt from their original uploads with the same
   centre cover-crop to 211:152 (1024×738, notebooks 633×456 — its source
   ceiling). All JPEG q90 mozjpeg 4:4:4, ≥3× the 211px slot.

   Figma draws the text row at px-140; the site's 1200 content edge (x=120)
   wins per the container rule — the trust band below is drawn at x=120, so
   140 is the outlier. Buttons are 38 in Figma, 40 on the site (h-button-h).

   Figma stack (absolute y at 1440):
     0..84    navbar (fixed SiteHeader overlays; section pt = 84)
     84       text row 688 tall (px-140, gap 32, items-start)
     204      eyebrow 12/1.4 (17)      [left column pt 120]     → 8
     229      h1 58/1.02 ×2 (118)                               → 24
     371      subhead 19/1.52 ×2 (58)                           → 32
     461      CTA row (38 Figma / 40 site) → left column ends 499
     84       right photo grid 444×688, top-aligned, ends 772
     772      glass panel starts (1440×838, white/20, rounded-t-32)
     772      trust band 1200 @ x=120, pt 56
     828      logo marquee (40)                                 → 56
     924      section ends; raster runs to 1719 (795 = 49.6875rem past),
              glass runs to 1610 (686 = 42.875rem past). */

import Image, { type StaticImageData } from "next/image";
import heroBg from "@/public/gift2/gf-hero-bg.jpg";

import gridGiftBox from "@/public/gift2/gf-hero-grid-gift-box.jpg";
import gridBoxLineup from "@/public/gift2/gf-hero-grid-box-lineup.jpg";
import gridBoxInLight from "@/public/gift2/gf-hero-grid-box-in-light.jpg";
import gridOpenBox from "@/public/gift2/gf-hero-grid-open-box.jpg";
import gridCandleSet from "@/public/gift2/gf-hero-grid-candle-set.jpg";
import gridSilkScarf from "@/public/gift2/gf-hero-grid-silk-scarf.jpg";
import gridWatchBox from "@/public/gift2/gf-hero-grid-watch-box.jpg";
import gridTeaSet from "@/public/gift2/gf-hero-grid-tea-set.jpg";
import gridKnitwear from "@/public/gift2/gf-hero-grid-knitwear.jpg";
import gridCoffeeSet from "@/public/gift2/gf-hero-grid-coffee-set.jpg";
import gridNotecards from "@/public/gift2/gf-hero-grid-notecards.jpg";
import gridNotebooks from "@/public/gift2/gf-hero-grid-notebooks.jpg";
import gridSunglasses from "@/public/gift2/gf-hero-grid-sunglasses.jpg";
import gridJewelryBox from "@/public/gift2/gf-hero-grid-jewelry-box.jpg";
import gridFlowers from "@/public/gift2/gf-hero-grid-flowers.jpg";
import gridLeatherWallet from "@/public/gift2/gf-hero-grid-leather-wallet.jpg";
import { HeroLogoWall } from "./common/HeroLogoWall";

/* Hero photo grid (1261:5189). Slot order = Figma top-to-bottom; the layer
   names are the designer's, kept verbatim as the keys. */
const GRID_LEFT: StaticImageData[] = [
  gridGiftBox, // 1261:5148
  gridBoxLineup, // 1261:5149
  gridBoxInLight, // 1261:5151
  gridOpenBox, // 1261:5153
  gridCandleSet, // 1261:5155
  gridSilkScarf, // 1261:5156
  gridWatchBox, // 1261:5157
  gridTeaSet, // 1261:5158
];

const GRID_RIGHT: StaticImageData[] = [
  gridKnitwear, // 1261:5171
  gridCoffeeSet, // 1261:5173
  gridNotecards, // 1261:5174
  gridNotebooks, // 1261:5175
  gridSunglasses, // 1261:5176
  gridJewelryBox, // 1261:5177
  gridFlowers, // 1261:5178
  gridLeatherWallet, // 1261:5179
];

/* One vertical track: its 8 photos rendered twice so the -50% translate in
   `gift-photo-track` (globals.css) wraps seamlessly. `mb-[7.109%]` is the
   Figma 15px gap expressed against the track width (15/211) — including on
   the last photo, which is what makes one group exactly one loop pitch
   (8 × 167 = 1336) tall and the two groups exactly 2672. The track is a flex
   column purely so that trailing margin is guaranteed to count toward the
   auto height (flex items never margin-collapse), which is what -50% measures. */
function PhotoTrack({
  photos,
  direction,
  className,
}: {
  photos: StaticImageData[];
  direction: "up" | "down";
  className: string;
}) {
  return (
    <div
      className={`absolute flex w-[47.5225%] flex-col ${
        direction === "up" ? "gift-photo-track-up" : "gift-photo-track-down"
      } ${className}`}
    >
      {[0, 1].map((group) =>
        photos.map((photo, i) => (
          <div
            key={`${group}-${i}`}
            className="relative mb-[7.109%] aspect-[211/152] w-full shrink-0 overflow-hidden rounded-card bg-white/10"
          >
            {/* the first four of each track are the ones inside the 688 window
                at rest, i.e. above the fold — the rest lazy-load */}
            <Image
              src={photo}
              alt=""
              fill
              quality={90}
              loading={group === 0 && i < 4 ? "eager" : "lazy"}
              sizes="(min-width: 640px) 211px, 45vw"
              className="select-none object-cover"
            />
          </div>
        )),
      )}
    </div>
  );
}

export default function GiftingHero() {
  return (
    <section className="relative overflow-hidden">
      {/* bg (2673:3538 "image 13782", 1440×1719): black ground under the amber
          mesh raster, 795px (49.6875rem) taller than the section so the Problem
          card overlaps it; the bottom 25% is masked for viewports > 1440 where
          object-cover crops the raster's own fade-to-white away. */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-[calc(100%_+_49.6875rem)] w-full overflow-hidden bg-black mask-b-from-75%"
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
        {/* text row (2673:3560): Figma px-140 gap-32 items-start — mapped to
            the 1200 content box (x=120 at 1440); the right column keeps its
            Figma 444 and the copy column takes the rest */}
        <div className="px-section-x-sm pt-24 md:px-section-x-md md:pt-28 lg:px-section-x-lg lg:pt-[5.25rem]">
          <div className="mx-auto flex w-full max-w-content flex-col items-start gap-8 lg:flex-row">
            {/* copy column (2673:3561): pt 120, gap 32 */}
            <div className="flex w-full flex-col gap-8 lg:min-w-0 lg:flex-1 lg:pt-[7.5rem]">
              {/* 2673:3562: gap 24 */}
              <div className="flex flex-col gap-6">
                {/* 2673:3563: gap 8 */}
                <div className="flex flex-col gap-2">
                  <p
                    data-animation="reveal"
                    className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#fef3d7]"
                  >
                    GIFTING • STADIUM
                  </p>
                  <h1
                    data-animation="reveal"
                    data-reveal-delay="80"
                    className="font-[family-name:var(--font-satoshi)] text-[2.5rem] font-black leading-[1.02] tracking-[-0.0625rem] text-white md:text-[3rem] lg:text-[3.625rem] lg:tracking-[-0.09375rem]"
                  >
                    Corporate gifting
                    <br className="hidden lg:inline" /> without the busywork
                  </h1>
                </div>
                <p
                  data-animation="reveal"
                  data-reveal-delay="160"
                  className="font-sans text-[1.0625rem] leading-[1.52] text-[#fbfeff] lg:text-[1.1875rem]"
                >
                  Run employee, client, prospect, partner, and
                  <br className="hidden lg:inline" /> holiday gifting from one
                  platform.
                </p>
              </div>

              {/* CTA row (2673:3567): gap 14 */}
              <div
                data-animation="reveal"
                data-reveal-delay="240"
                className="flex flex-col gap-3.5 sm:flex-row sm:items-center"
              >
                <a
                  href="#"
                  className="inline-flex h-button-h items-center justify-center rounded-[100px] bg-accent-turmeric px-[1.375rem] font-sans text-button-primary uppercase text-black transition-all duration-200 hover:brightness-105 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                    Talk to sales
                  </span>
                </a>
                <a
                  href="#"
                  className="inline-flex h-button-h items-center justify-center rounded-[100px] border border-white bg-transparent px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                    Browse gifts
                  </span>
                </a>
              </div>

              <p
                data-animation="reveal"
                className="font-sans text-[0.8125rem] font-semibold leading-[1.4] text-[#cccccc]"
              >
                Trusted by teams sending gifts across 170+ countries.
              </p>
            </div>

            {/* photo grid (1220:3626 → 1261:5189): a 444×688 window on two
                211-wide tracks that scroll in opposite directions, faded top
                and bottom by the Figma gradient mask (stops 0/14/86/100).
                Purely decorative — the tracks duplicate every photo, so the
                whole window is aria-hidden and each Image carries alt="". */}
            <div
              data-animation="reveal"
              data-reveal-delay="120"
              aria-hidden="true"
              className="relative aspect-[444/688] w-full max-w-[27.75rem] shrink-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,#000_14%,#000_86%,transparent_100%)] lg:w-[27.75rem] lg:max-w-none"
            >
              <PhotoTrack
                photos={GRID_LEFT}
                direction="up"
                className="left-0 top-[0.5814%]"
              />
              <PhotoTrack
                photos={GRID_RIGHT}
                direction="down"
                className="left-[52.4775%] top-[8.2849%]"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 lg:mt-24">
          <HeroLogoWall />
        </div>
      </div>
    </section>
  );
}
