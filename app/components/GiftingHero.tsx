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

   The right column is one masked raster, not a tile grid: "image 13871"
   2673:3574 is a 444×1062 PNG whose transparent gutters already carve the two
   staggered photo columns (shipped at 2× = 888×2124, the Figma original — a
   4× node export would only upscale it). Its Figma mask is a pure vertical
   alpha gradient (0 → 12.5% → 87.5% → 0 over 444×688), reproduced as a CSS
   mask; the 688 window also clips the raster's bottom 374px.

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
     84       right collage 444×688, top-aligned, ends 772
     772      glass panel starts (1440×838, white/20, rounded-t-32)
     772      trust band 1200 @ x=120, pt 56
     828      logo marquee (40)                                 → 56
     924      section ends; raster runs to 1719 (795 = 49.6875rem past),
              glass runs to 1610 (686 = 42.875rem past). */

import Image from "next/image";
import heroBg from "@/public/gift2/gf-hero-bg.jpg";
import heroCollage from "@/public/gift2/gf-hero-collage.png";

/* Trust band "Logos track" (2673:3577): google, amazon, pinterest, accenture,
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

export default function GiftingHero() {
  return (
    <section className="relative">
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
                  Client, employee, partner, and holiday gifts,
                  <br className="hidden lg:inline" /> all from one platform.
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
                    Browse the catalog
                  </span>
                </a>
                <a
                  href="#"
                  className="inline-flex h-button-h items-center justify-center rounded-[100px] border border-white bg-transparent px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                    talk to sales
                  </span>
                </a>
              </div>
            </div>

            {/* photo collage (2673:3572): a 444×688 window on the 444×1062
                alpha PNG, faded top and bottom by the Figma gradient mask */}
            <div
              data-animation="reveal"
              data-reveal-delay="120"
              className="relative aspect-[444/688] w-full max-w-[27.75rem] shrink-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,#000_12.5%,#000_87.5%,transparent_100%)] lg:w-[27.75rem] lg:max-w-none"
            >
              <Image
                src={heroCollage}
                alt="Black gift boxes tied with ribbon, a knitted throw, coffee and notebooks, arranged in two staggered columns"
                quality={90}
                sizes="(min-width: 640px) 444px, 100vw"
                className="h-auto w-full select-none"
              />
            </div>
          </div>
        </div>

        {/* glass + trust band (2673:3539 + 2673:3575) */}
        <div className="relative">
          {/* glass: full-bleed white/20, rounded-t-32, 838 tall — it runs past
              this section so the Problem card scrolls over it, exactly like
              the raster above */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[52.375rem] rounded-t-[2rem] bg-white/20"
          />

          {/* trust band (2673:3575): 56 / 40 marquee / 56 — seamless CSS
              marquee, logos inverted white, edges soft-masked */}
          <div
            data-animation="reveal"
            data-reveal-delay="200"
            className="relative px-section-x-sm py-14 md:px-section-x-md lg:px-section-x-lg"
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
