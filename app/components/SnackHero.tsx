import Image from "next/image";
import heroProduct from "@/public/snacks/sn3-hero.png";
import { HeroLogoWall } from "./common/HeroLogoWall";

export default function SnackHero() {
  return (
    <section className="relative overflow-hidden bg-[#0437a5] pt-[6rem] md:pt-[7rem]">
      <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-0">
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

      {/* logo wall */}
      <div className="mt-12 lg:mt-24">
        <HeroLogoWall />
      </div>
    </section>
  );
}
