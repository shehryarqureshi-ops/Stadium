import Image from "next/image";

import { BOOK_A_CALL_HREF, HERO_COLUMNS } from "./data";

/* /catalog · HERO (Figma n9SjmDjzB1PeZAYJ5w43fr → 5291:18747 + grid 5297:6154).
   Black stage: centered copy, then a 14-column wall of product photography in
   which every column is an endless vertical marquee (15 cards per column, photos
   repeat across different strides). The wall fades to black from the bottom so
   it melts straight into the first section's heading panel. Mobile shows 5
   columns, tablet 9, desktop all 14 — the rest are `hidden` (and, being lazy,
   never fetched). Figma frames only exist at desktop; narrower layouts reuse the
   same tokens. */

const COLUMN_GAP = "gap-[0.6875rem]"; /* 11px — Figma tile gutter */

export default function CatalogHero() {
  return (
    <section aria-labelledby="catalog-hero-title" className="relative bg-black">
      <div className="px-section-x-sm pt-[7.5rem] md:px-section-x-md md:pt-[10rem] lg:px-section-x-lg lg:pt-[12.75rem]">
        <div className="mx-auto flex w-full max-w-content flex-col items-center gap-8 text-center">
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <p
                data-animation="reveal"
                className="font-sans text-eyebrow-sm uppercase tracking-[0.1rem] text-catalog-eyebrow"
              >
                Stadium catalog
              </p>
              <h1
                id="catalog-hero-title"
                data-animation="reveal"
                data-reveal-delay="80"
                className="max-w-[53.625rem] text-balance font-display text-display-sm text-white md:text-display-md lg:text-display-pricing"
              >
                Everything you need to engage anyone, anywhere.
              </h1>
            </div>
            <p
              data-animation="reveal"
              data-reveal-delay="160"
              className="max-w-[38.125rem] text-balance font-sans text-body-md text-catalog-lead lg:text-catalog-body"
            >
              A diverse selection of gifts and swag your people will love—filled with top-tier brands
              and globally sourced goodies.
            </p>
          </div>

          <div
            data-animation="reveal"
            data-reveal-delay="240"
            className="flex flex-col items-center gap-8"
          >
            <div className="flex flex-col gap-3.5 sm:flex-row">
              <a
                href={BOOK_A_CALL_HREF}
                className="inline-flex h-12 items-center justify-center rounded-full bg-catalog-cta px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] focus-visible:outline-white"
              >
                <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">Book a call</span>
              </a>
              <a
                href="#swag"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-white"
              >
                <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                  View full catalog
                </span>
              </a>
            </div>
            <p className="font-sans text-[0.8125rem] font-semibold leading-[1.4] text-catalog-meta">
              4.9 on Capterra · 19.7M+ snacks delivered · 170+ countries
            </p>
          </div>
        </div>
      </div>

      {/* Marquee wall */}
      <div
        aria-hidden
        className="relative mx-auto mt-12 h-[34rem] w-full max-w-catalog-grid overflow-hidden px-section-x-sm md:mt-14 md:h-[46rem] md:px-section-x-md lg:mt-[3.75rem] lg:h-catalog-hero-grid lg:px-0"
      >
        <div className={`grid h-full grid-cols-5 md:grid-cols-9 lg:grid-cols-14 ${COLUMN_GAP}`}>
          {HERO_COLUMNS.map((col, c) => (
            <div
              key={c}
              className={`relative overflow-hidden ${c >= 9 ? "hidden lg:block" : c >= 5 ? "hidden md:block" : ""}`}
            >
              <div
                className="catalog-track flex flex-col"
                style={
                  {
                    "--catalog-dur": `${col.duration}s`,
                    "--catalog-dir": col.reverse ? "reverse" : "normal",
                    animationDelay: `-${col.phase}s`,
                  } as React.CSSProperties
                }
              >
                {[0, 1].map((half) => (
                  <div key={half} className={`flex flex-col pb-[0.6875rem] ${COLUMN_GAP}`}>
                    {col.tiles.map((tile, i) => (
                      <div
                        key={i}
                        className="relative w-full shrink-0 overflow-hidden rounded-catalog-chip bg-grey-800"
                        style={{ aspectRatio: `1 / ${tile.ratio}` }}
                      >
                        <Image
                          src={tile.src}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 5rem, (min-width: 768px) 9vw, 20vw"
                          quality={75}
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* soft top edge + the long bottom fade into the next black panel */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-b from-transparent to-black" />
      </div>
    </section>
  );
}
