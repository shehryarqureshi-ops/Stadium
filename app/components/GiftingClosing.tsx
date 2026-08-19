/* /gifting (bespoke rebuild) · the whole closing block (Figma
   n9SjmDjzB1PeZAYJ5w43fr → 2504:12929 "closing", inside the `footer` wrapper
   2504:12928, page frame 2504:12118, abs y 6610..8049).

   ONE component on purpose. Figma draws a single raster — "image 13702"
   (2504:12930, 2880×2890 native, placed 1440×1445 at y −5.5) — behind the
   ENTIRE block: white at the top, amber/gold through the middle, #181818 at
   the bottom. Sampling the raster shows it is already tinted (#f9d472 at the
   right edge) level with the BOTTOM of the impact-stat cards, so the stats,
   the pricing banner and the dark CTA card all sit on one continuous
   gradient. Splitting them into separate components would either cut the
   raster (hard colour seam) or force each piece to re-derive the same
   vertical colour mapping, so the three Figma sub-frames are rendered here as
   three nested <section>s over one bottom-anchored raster box — the same
   idiom SwagmagicClosing uses, extended to cover the stats.

   Sub-frames: 2504:12906 "Impact stats" · 2504:12931 "Resources" (the white
   pricing banner) · 2504:13012 "Closing" (dark CTA card) · 2504:13021
   "divider" (2px, 1160 wide, #171717→#959595→#171717, flush on the footer's
   top edge — PageClose follows).

   Figma stack (y relative to 2504:12929; the component adds 80px of white
   above it so the visible gap to GiftingComparison, which ends 160 earlier,
   is 160 — the raster's top 80px are pure white, so covering them is a no-op):
     [-80]  section top (pt-20)
     0      stats title   h=48   (Satoshi Bold 44 / lh 1.08 / -0.5px)
     68     stats subhead h=27   (Overpass 18 / lh 1.45, #707075)   gap 20
     135    stat cards    h=356  (3 cols, gap 16: 406.67 / 406.67 / 394.67)
     491    ── gap 160
     651    pricing banner h=168 (white card, 1200 @ x=120, radius 24, p 60)
     819    ── gap 160
     979    dark CTA card h=458  (1240 → 1200, radius 32, px 60 / py 140,
                                  title 140→192, +20 subhead, +20 buttons)
     1437   divider h=2
     1439   end → PageClose footer
   Section total at 1440 = 80 + 1439 = 1519; the raster box is 1445 tall and
   bottom-anchored, so image y0 lands exactly on frame y0. */

import Image from "next/image";
import gradient from "@/public/gift2/gf-closing-gradient.jpg";
import statsPhoto from "@/public/gift2/gf-closing-stats-photo.jpg";
import avatar from "@/public/gift2/gf-closing-avatar-charlene.png";

/* Satoshi Medium — Figma specs "Satoshi:Medium" on every stat number. */
const NUM = "font-[family-name:var(--font-satoshi-medium)] leading-[1.04] tracking-[-0.0625rem] not-italic";
const STAT_LABEL = "font-sans text-[1rem] leading-[1.4]";
const PILL =
  "inline-flex h-[2.9375rem] items-center justify-center rounded-[100px] px-[1.375rem] font-sans text-[0.9375rem] font-semibold uppercase leading-[1.4] transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function GiftingClosing() {
  return (
    <div
      className="relative overflow-hidden bg-white"
      style={{
        /* fallback under the raster while it loads / if it fails — sampled
           from gf-closing-gradient.jpg at the matching section offsets */
        backgroundImage:
          "linear-gradient(180deg, #ffffff 0%, #ffffff 18%, #ffe8ac 32%, #e0b138 45%, #7b5c0f 58%, #2e2717 70%, #181818 86%, #181818 100%)",
      }}
    >
      {/* Figma raster bg (image 13702) — 1440×1445 box anchored to the bottom
          so image y0 == frame y0 at 1440. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-full lg:h-[90.3125rem]">
        <Image
          src={gradient}
          alt=""
          fill
          quality={90}
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>

      {/* ── Impact stats (2504:12906) ─────────────────────────────────── */}
      <section
        aria-labelledby="gifting-stats-title"
        className="relative px-section-x-sm pt-16 md:px-section-x-md md:pt-20 lg:px-section-x-lg lg:pt-20"
      >
        <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
          <div className="flex w-full max-w-[52rem] flex-col items-center gap-5 text-center">
            <h2
              id="gifting-stats-title"
              data-animation="reveal"
              className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
            >
              The numbers behind Stadium
            </h2>
            <p
              data-animation="reveal"
              className="font-sans text-[1.0625rem] leading-[1.45] text-[#707075] lg:text-[1.125rem]"
            >
              Capacity, reach, and coverage at a glance.
            </p>
          </div>

          <div
            data-animation="reveal"
            data-reveal-stagger="90"
            className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[406.67fr_406.67fr_394.67fr]"
          >
            {/* photo card · 2.25M+ (2504:12911) */}
            <div
              data-animation="reveal"
              className="relative flex min-h-[22.25rem] flex-col justify-end overflow-hidden rounded-[1.5rem] border border-[#f5f5f5] p-4"
            >
              <Image
                src={statsPhoto}
                alt="A recipient unpacking the hoodie, cap and tumbler they chose"
                fill
                quality={90}
                sizes="(min-width:1024px) 25.5rem, (min-width:768px) 45vw, 92vw"
                className="object-cover"
              />
              <div className="relative flex flex-col gap-3 rounded-[1rem] bg-white p-6 text-[#16171b]">
                <p className={`${NUM} text-[3rem] md:text-[3.75rem]`}>2.25M+</p>
                <p className={STAT_LABEL}>Gifts Delivered</p>
              </div>
            </div>

            {/* cream card · 1.5M+ + quote (2504:15136) */}
            <div
              data-animation="reveal"
              className="flex min-h-[22.25rem] flex-col rounded-[1.5rem] bg-[#fefaf0] p-6 text-[#16171b]"
            >
              <div className="flex flex-1 flex-col justify-between gap-6">
                <div className="flex flex-col gap-1.5">
                  <p className={STAT_LABEL}>Recipients Gifted</p>
                  <p className={`${NUM} text-[2.5rem] md:text-[3rem]`}>1.5M+</p>
                </div>
                <figure className="flex flex-col gap-4">
                  <blockquote className="max-w-[18.375rem] font-sans text-[1.0625rem] leading-[1.4] lg:text-[1.125rem]">
                    “People loved being able to choose their own gift. It eliminated the guesswork for me!”
                  </blockquote>
                  <figcaption className="flex items-center gap-2">
                    <span className="relative size-[3.375rem] shrink-0 overflow-hidden rounded-full bg-[#f2f2f2]">
                      <Image
                        src={avatar}
                        alt=""
                        aria-hidden
                        fill
                        quality={90}
                        sizes="3.375rem"
                        className="object-cover"
                      />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col text-[0.75rem] leading-[1.4]">
                      <span className="font-sans font-medium text-[#16171b]">Charlene S.</span>
                      <span className="font-sans text-[#5b6071]">The Standard</span>
                    </span>
                  </figcaption>
                </figure>
              </div>
            </div>

            {/* stacked · 20,000 (2504:12922) + 170+ (2504:12925) */}
            <div data-animation="reveal" className="flex min-h-[22.25rem] flex-col gap-4">
              <div className="flex flex-1 flex-col justify-end gap-2.5 rounded-[1.5rem] bg-[#f2f2f2] p-6 text-[#1b1b1b]">
                <p className={`${NUM} text-[2.5rem] md:text-[3rem]`}>20,000</p>
                <p className={STAT_LABEL}>Companies Sent Gifts</p>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-[1.5rem] bg-[#16171b] p-6 text-white">
                <p className={STAT_LABEL}>Countries</p>
                <p className={`${NUM} text-[2.5rem] md:text-[3rem]`}>170+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing banner (2504:12931 "Resources") ───────────────────── */}
      <section
        aria-labelledby="gifting-closing-banner-title"
        className="relative mt-16 px-section-x-sm md:mt-24 md:px-section-x-md lg:mt-40 lg:px-section-x-lg"
      >
        <div
          data-animation="reveal"
          className="mx-auto flex w-full max-w-content flex-col items-start justify-between gap-6 rounded-[1.5rem] bg-white p-8 md:flex-row md:items-start md:gap-10 md:p-10 lg:p-[3.75rem]"
        >
          <h2
            id="gifting-closing-banner-title"
            className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:whitespace-nowrap lg:text-[2.75rem]"
          >
            Start with swag and expand when ready
          </h2>
          <a
            href="#"
            className="inline-flex h-[2.75rem] shrink-0 items-center justify-center rounded-[100px] bg-[#218554] px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-[#1c7047] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#218554] active:scale-[0.98]"
          >
            <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">Explore pricing</span>
          </a>
        </div>
      </section>

      {/* ── Dark CTA card (2504:13012 "Closing") ──────────────────────── */}
      <section
        aria-labelledby="gifting-closing-title"
        className="relative mt-16 px-section-x-sm md:mt-24 md:px-section-x-md lg:mt-40 lg:px-section-x-lg"
      >
        <div className="mx-auto w-full max-w-content">
          <div
            className="flex flex-col items-center gap-5 rounded-[2rem] border border-[#969696] px-6 py-16 text-center md:py-24 lg:px-[3.75rem] lg:py-[8.75rem]"
            style={{ background: "linear-gradient(0deg, #16171b 0%, #000000 100%)" }}
          >
            <h2
              id="gifting-closing-title"
              data-animation="reveal"
              className="font-[family-name:var(--font-satoshi)] text-[1.875rem] font-black leading-[1.04] tracking-[-0.09375rem] text-white md:text-[2.5rem] lg:text-[3.125rem]"
            >
              Bring your corporate gifting programs together
            </h2>
            <p
              data-animation="reveal"
              data-reveal-delay="80"
              className="max-w-[70rem] font-sans text-[1.0625rem] leading-[1.5] text-[#a8a8b8] lg:text-[1.125rem]"
            >
              Book a call to explore pricing, catalog options, and the right setup for your team.
            </p>
            <div
              data-animation="reveal"
              data-reveal-delay="160"
              className="flex flex-col gap-3.5 pt-3 sm:flex-row sm:items-center"
            >
              <a href="#" className={`${PILL} bg-[#ffb800] text-[#1b1b1b] hover:bg-[#ffc42b] hover:brightness-105`}>
                <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">TALK TO SALES</span>
              </a>
              <a
                href="#"
                className={`${PILL} border border-[#4d4d5c] bg-[#292933] text-white hover:border-[#5c5c6d] hover:bg-[#33333f]`}
              >
                <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">BROWSE THE CATALOG</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2px divider on the footer's top edge (Figma 2504:13021 — 1160 wide,
          x 140→1300, #171717 → #959595 → #171717) */}
      <div
        aria-hidden
        className="relative mx-auto h-[2px] w-[80.5%] max-w-[72.5rem]"
        style={{ backgroundImage: "linear-gradient(90deg, #171717 0%, #959595 50%, #171717 100%)" }}
      />
    </div>
  );
}
