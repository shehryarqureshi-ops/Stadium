/* /snacks · hero (Figma 2208:2743). A centered royal-blue hero: eyebrow, big
   Satoshi headline, a hero product image (hand dropping snacks into a SnackMagic
   box, blue baked in so it blends), subhead, two CTAs, a trust line, then a white
   logo wall. The blue is #0034ae to match the product image's background. */

import Image from "next/image";
import heroProduct from "@/public/snacks/sn2-hero-product.png";

export default function SnackHero() {
  return (
    <section className="relative overflow-hidden bg-[#0034ae] px-section-x-sm pb-14 pt-[7rem] md:px-section-x-md md:pt-[8rem] lg:px-section-x-lg lg:pt-[7.5rem]">
      <div className="relative z-10 mx-auto flex w-full max-w-content flex-col items-center">
        {/* eyebrow + headline */}
        <div
          data-animation="reveal"
          className="flex flex-col items-center gap-2 text-center"
        >
          <p className="font-sans text-[0.75rem] font-bold uppercase tracking-[0.1rem] text-[#a9c6f7]">
            Snacks · SnackMagic
          </p>
          <h1 className="max-w-[46rem] font-[family-name:var(--font-satoshi)] text-[2.75rem] font-black leading-[1.02] tracking-[-0.09375rem] text-white md:text-[3.5rem] lg:text-[4rem]">
            Snacks people can’t wait to open
          </h1>
        </div>

        {/* hero product image (blue baked in → blends into the section) */}
        <div
          data-animation="reveal"
          data-reveal-delay="120"
          className="relative mt-4 w-full max-w-[68rem]"
        >
          <Image
            src={heroProduct}
            alt="A hand dropping premium snacks into a SnackMagic box"
            priority
            className="h-auto w-full select-none"
            sizes="(min-width:1024px) 68rem, 100vw"
          />
        </div>

        {/* subhead + CTAs + trust */}
        <div
          data-animation="reveal"
          data-reveal-delay="220"
          className="flex flex-col items-center gap-8 text-center"
        >
          <p className="max-w-[38rem] font-sans text-[1.0625rem] leading-[1.52] text-[#dce8fd] lg:text-[1.1875rem]">
            Choose from curated snack boxes or let recipients build their own from
            2,000+ snacks, with dietary filters and delivery to 170+ countries.
          </p>
          <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <a
              href="#"
              className="inline-flex h-button-h items-center justify-center rounded-[100px] bg-[#2178f5] px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] focus-visible:outline-white"
            >
              <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">Browse the catalog</span>
            </a>
            <a
              href="#"
              className="inline-flex h-button-h items-center justify-center rounded-[100px] border border-[#8fa6db] bg-transparent px-[1.375rem] font-sans text-button-primary uppercase text-[#8fa6db] transition-all duration-200 hover:border-white hover:text-white active:scale-[0.98] focus-visible:outline-white"
            >
              <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">Build a box</span>
            </a>
          </div>
          <p className="font-sans text-[0.8125rem] font-semibold leading-[1.4] text-[#a9c6f7]">
            4.9 on Capterra · 19.7M+ snacks delivered · 170+ countries
          </p>
        </div>
      </div>
    </section>
  );
}
