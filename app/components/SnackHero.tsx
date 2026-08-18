/* /snacks · hero (Figma 2208:2768, revised 2026-08-18). A royal-blue hero SPLIT
   left/right: text column (eyebrow, Satoshi Black headline, subhead, two CTAs,
   trust line) on the left, its left edge on the 1200 content edge (x=120 at
   1440, via .carousel-bleed); a big hand-and-Snackmagic-box photo
   (804×713 at 1440) on the right, flush to the viewport edge. The photo has the
   #0034ae blue baked in, so the section bg must stay #0034ae to blend. The logo
   wall lives in the rounded "sleeve" at the top of SnackProblem (Figma "glass"),
   60px below this row. */

import Image from "next/image";
import heroProduct from "@/public/snacks/sn3-hero.png";

export default function SnackHero() {
  return (
    <section className="relative overflow-hidden bg-[#0034ae] pb-10 pt-[6rem] md:pt-[7rem] lg:pb-[3.75rem] lg:pt-[5.25rem]">
      {/* split row: text (left) + photo (right, bleeds off-edge) */}
      <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-0">
        <div className="carousel-bleed flex w-full flex-col md:pr-section-x-md lg:w-[44.2%] lg:shrink-0 lg:pr-0">
          <div data-animation="reveal" className="flex flex-col gap-2">
            <p className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#d8e7fd]">
              Snacks • SnackMagic
            </p>
            <h1 className="font-[family-name:var(--font-satoshi)] text-[2.75rem] font-black leading-[1.02] tracking-[-0.09375rem] text-white md:text-[3.25rem] lg:text-[3.375rem]">
              Snacks people
              <br className="hidden lg:block" /> can’t wait to open
            </h1>
          </div>

          <div
            data-animation="reveal"
            data-reveal-delay="120"
            className="mt-8 flex flex-col gap-8 lg:mt-[2.8125rem]"
          >
            <p className="max-w-[32rem] font-sans text-[1.0625rem] leading-[1.52] text-[#fbfeff] lg:text-[1.1875rem]">
              Choose from curated snack boxes or let recipients build their own from
              2,000+ snacks, with dietary filters and delivery to 170+ countries.
            </p>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <a
                  href="#"
                  className="inline-flex h-button-h items-center justify-center rounded-[100px] bg-[#2178f5] px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] focus-visible:outline-white"
                >
                  <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">Browse the catalog</span>
                </a>
                <a
                  href="#"
                  className="inline-flex h-button-h items-center justify-center rounded-[100px] border border-white bg-transparent px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-white"
                >
                  <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">Build a box</span>
                </a>
              </div>
              <p className="font-sans text-[0.8125rem] font-semibold leading-[1.4] text-[#cccccc]">
                4.9 on Capterra · 19.7M+ snacks delivered · 170+ countries
              </p>
            </div>
          </div>
        </div>

        {/* photo — 804/713 aspect, flush right (blue baked in) */}
        <div
          data-animation="reveal"
          data-reveal-delay="200"
          className="relative aspect-[804/713] w-full lg:ml-auto lg:w-[55.8%]"
        >
          <Image
            src={heroProduct}
            alt="A hand dropping premium snacks into a Snackmagic box"
            priority
            fill
            className="select-none object-cover object-left"
            sizes="(min-width:1024px) 56vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
