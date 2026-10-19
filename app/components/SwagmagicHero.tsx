import Image from "next/image";
import heroBg from "@/public/swag2/sw2-hero-bg.jpg";
import { HeroLogoWall } from "./common/HeroLogoWall";

export default function SwagmagicHero() {
  return (
    <section className="relative overflow-hidden">
      {/* background: black ground → Figma's mesh raster ("image 13674"). The
          live WebGL shader that used to paint over this was removed
          2026-08-21; the raster is now the background outright. Extends 746px
          (46.625rem) below the section so the Problem card overlaps it, fading
          out over the last 25% (Figma bg ends at y=1719, section at 973). */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-[calc(100%_+_46.625rem)] w-full overflow-hidden bg-black mask-b-from-75%"
      >
        <Image
          src={heroBg}
          alt=""
          fill
          quality={90}
          sizes="100vw"
          className="select-none object-cover object-top"
        />
      </div>

      <div className="relative z-10 px-section-x-sm pt-24 md:px-section-x-md md:pt-28 lg:px-section-x-lg lg:pt-40 lg:pb-[4rem]">
        <div className="mx-auto flex w-full max-w-content flex-col lg:gap-15">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:justify-between lg:gap-8">
            <div className="flex w-full flex-col gap-8 lg:w-135.75 lg:shrink-0">
              <div className="flex flex-col gap-8">
                <div data-animation="reveal" className="flex flex-col gap-2">
                  <p className="whitespace-pre font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-swag-mint">
                    {"SWAG ·  SWAGMAGIC"}
                  </p>
                  <h1 className="font-[family-name:var(--font-satoshi)] text-[2.5rem] font-black leading-[1.02] tracking-[-0.0625rem] text-white md:text-[3rem] lg:text-[3.625rem] lg:tracking-[-0.09375rem]">
                    The infrastructure behind every swag program
                  </h1>
                </div>
                <p
                  data-animation="reveal"
                  data-reveal-delay="120"
                  className="max-w-[33.9375rem] font-sans text-[1.0625rem] leading-[1.52] text-[#fbfeff] lg:text-[1.1875rem]"
                >
                  Stop coordinating vendors separately. Run your entire swag
                  program, one platform, one PO.
                </p>
              </div>

              <div
                data-animation="reveal"
                data-reveal-delay="200"
                className="flex flex-col gap-8"
              >
                <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center">
                  <a
                    href="/catalog#swag"
                    className="inline-flex h-button-h items-center justify-center rounded-[100px] bg-[#03ba4f] px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] focus-visible:outline-white"
                  >
                    <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                      Browse the catalog
                    </span>
                  </a>
                  <a
                    href="/book-a-call"
                    className="inline-flex h-button-h items-center justify-center rounded-[100px] border border-white bg-transparent px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-white"
                  >
                    <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                      Talk to sales
                    </span>
                  </a>
                </div>
                <p className="font-sans text-[0.8125rem] font-semibold leading-[1.4] text-[#cccccc]">
                  5,000+ teams ship swag this way, to 170+ countries.
                </p>
              </div>
            </div>

            <div
              data-animation="reveal"
              data-reveal-delay="240"
              className="relative h-[17.40625rem] w-[17.4375rem] self-center min-[24rem]:h-[20.8875rem] min-[24rem]:w-[20.925rem] sm:h-[34.8125rem] sm:w-[34.875rem] lg:shrink-0 lg:self-start"
            >
              <div>
                {/* <ProductCluster /> */}
                <Image
                  alt="Product + Catalog + Infrastructure"
                  src={"/swag/heroGraphic.png"}
                  width={600}
                  height={0}
                  quality={100}
                  priority
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 lg:mt-24">
        <HeroLogoWall />
      </div>
    </section>
  );
}
