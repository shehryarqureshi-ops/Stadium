/* /snacks · hero (Figma n9SjmDjzB1PeZAYJ5w43fr → page frame 2500:5942
   "hero - snacks"; hero row 2673:2978, split row 2673:2979, text col
   2673:2980, photo 2673:2994). Re-laid-out 2026-08-21: the hero blue moved
   #0034ae → #0437a5 and the text column is now TOP-aligned with a 120px
   inset (it used to be vertically centred).

   A royal-blue hero SPLIT left/right: text column (eyebrow, Satoshi Black
   headline, subhead, two CTAs, trust line) on the left, its left edge on the
   1200 content edge (x=120 at 1440, via .carousel-bleed); the hand-and-
   Snackmagic-box photo (804×713.28 at 1440) on the right, flush to the
   viewport edge (636 + 804 = 1440). The photo is a transparent cut-out
   composited over the hero blue in Figma, so sn3-hero.png has #0437a5 baked
   in — the section bg MUST stay #0437a5 or a seam appears.

   No background raster here (flat colour), so there is no
   `h-[calc(100%_+_XXrem)]` overhang contract to keep in sync.

   The Figma hero frame also contains the trust-logo marquee (2673:2995,
   1200 wide at page y=857..1017.28). On the live page that band is rendered
   as the first block inside SnackProblem's rounded "glass" sleeve, whose top
   edge lands at exactly the same y=857 — the Figma "glass" rect (2500:5945)
   starts at 857 too, so the logos sit on the gradient, not on flat blue.
   Do NOT duplicate the marquee here.

   Figma stack (absolute y at 1440):
     0..84      navbar (fixed SiteHeader overlays; section pt = 84)
     84..797.28 split row — photo 804×713.28, x=636, flush right
     204        eyebrow 12/1.4 (17)              → 8
     229        h1 54/1.02 ×2 (110)              → 24
     363        subhead 19/1.52 ×3, w=516 (87)   → 32
     482        CTA row (38 Figma / 40 site h-button-h) → 32
     552        trust line 13/1.4 (18) — text col ends 570
     797.28     row ends                          → 60
     857        SnackProblem's glass sleeve + trust band begin
                (section = 84 + 713.28 + 60 = 857.28) */

import Image from "next/image";
import heroProduct from "@/public/snacks/sn3-hero.png";

export default function SnackHero() {
  return (
    <section className="relative overflow-hidden bg-[#0437a5] pb-10 pt-[6rem] md:pt-[7rem] lg:pb-[3.75rem] lg:pt-[5.25rem]">
      {/* split row: text (left, top-aligned + 120 inset) + photo (right, bleeds off-edge) */}
      <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-0">
        {/* ≤1440 the split is proportional; above it the column locks to
            padLeft + 516 = calc(50% - 84px) so the text keeps its Figma 516
            width while the photo keeps bleeding to the viewport edge. Both
            formulas give 636 at exactly 1440, so the crossover is seamless. */}
        <div className="carousel-bleed flex w-full flex-col gap-8 md:pr-section-x-md lg:w-[44.2%] lg:shrink-0 lg:pr-0! lg:pt-[7.5rem] min-[90rem]:w-[calc(50%_-_5.25rem)]">
          <div className="flex flex-col gap-6">
            <div data-animation="reveal" className="flex flex-col gap-2">
              <p className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#d8e7fd]">
                SNACKS • SNACKMAGIC
              </p>
              <h1 className="font-[family-name:var(--font-satoshi)] text-[2.75rem] font-black leading-[1.02] tracking-[-0.09375rem] text-white md:text-[3.25rem] lg:text-[3.375rem]">
                Snacks people
                <br className="hidden lg:block" /> can’t wait to open
              </h1>
            </div>

            <p
              data-animation="reveal"
              data-reveal-delay="120"
              className="max-w-[32.25rem] font-sans text-[1.0625rem] leading-[1.52] text-[#fbfeff] lg:text-[1.1875rem]"
            >
              Choose from curated snack boxes or let recipients build their own
              from 2,000+ snacks, with dietary filters and delivery to 170+
              countries.
            </p>
          </div>

          <div
            data-animation="reveal"
            data-reveal-delay="200"
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <a
                href="#"
                className="inline-flex h-button-h items-center justify-center rounded-[100px] bg-[#2178f5] px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] focus-visible:outline-white"
              >
                <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                  Browse the catalog
                </span>
              </a>
              <a
                href="#"
                className="inline-flex h-button-h items-center justify-center rounded-[100px] border border-white bg-transparent px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-white"
              >
                <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                  Build a box
                </span>
              </a>
            </div>
            {/* Figma 2673:2993 sets a double space after each middot; HTML
                collapses it (whitespace-pre would break the mobile wrap). */}
            <p className="font-sans text-[0.8125rem] font-semibold leading-[1.4] text-[#cccccc]">
              {"4.9 on Capterra ·  19.7M+ snacks delivered ·  170+ countries"}
            </p>
          </div>
        </div>

        {/* photo (2673:2994) — 804×713.28, flush right; blue baked in */}
        <div
          data-animation="reveal"
          data-reveal-delay="240"
          className="relative aspect-[804/713.28] w-full lg:ml-auto lg:w-[55.8%] min-[90rem]:w-[calc(50%_+_5.25rem)]"
        >
          <Image
            src={heroProduct}
            alt="A hand dropping premium snacks into a Snackmagic box"
            priority
            fill
            quality={90}
            className="select-none object-cover object-left"
            sizes="(min-width:1024px) 56vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
