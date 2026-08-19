/* /swag · closing CTA (Figma n9SjmDjzB1PeZAYJ5w43fr → 2500:5757 "Closing" + the
   bottom of 2500:5722 + divider 2500:5766, all inside "closing" 2500:5715).
   Structure mirrors SnackClosing: the white block above (SwagmagicExplore) ends
   here in a 1400-wide (20px side strips) rounded-bottom-60 white sleeve of 160px,
   over Figma's raster "image 13599" (2880×2890, white → green glow → #181818,
   drawn 1440×1209 bottom-anchored, object-cover — shipped as-is, not a CSS
   gradient, because the glow is asymmetric/radial). 300px below the curve the
   near-black card (vertical #16171b→#000, 1px #969696 border, rounded 32, py-140,
   px-60) holds "Make swag run itself"; 160px of dark below it, then the 2px
   1160-wide divider (Figma: a #171717→#959595→#171717 horizontal gradient) sits on
   the footer's top edge. Footer = PageClose (showCta=false) after this.

   Figma stack (absolute y in the /swag frame, 1440):
     13176 items bottom (SwagmagicExplore) → 160 white incl. curve → 13336 curve bottom
     13636 card top   (300 below the curve; card 1240×458)
     13776 title (52)  → gap 20 → 13848 subhead (27) → gap 32 → 13907 pills (47) → 13954
     14094 card bottom → 160 dark → 14254 divider (2) → 14256 footer. */

import Image from "next/image";
import gradient from "@/public/swag2/sw2-closing-gradient.jpg";

const PILL =
  "inline-flex h-[2.9375rem] items-center justify-center rounded-[100px] px-[1.375rem] font-sans text-[0.9375rem] font-semibold uppercase leading-[1.4] text-white transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function SwagmagicClosing() {
  return (
    <section
      aria-labelledby="swag-closing-title"
      className="relative overflow-hidden bg-white"
      style={{
        // fallback under the raster while it loads / if it fails
        backgroundImage:
          "linear-gradient(180deg, #ffffff 0%, #ffffff 12%, #a2d6be 40%, #1a5238 62%, #181919 80%, #181818 100%)",
      }}
    >
      {/* Figma raster bg (image 13599): 1440×1209 box anchored to the section bottom */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-full lg:h-[75.5625rem]">
        <Image src={gradient} alt="" fill quality={90} sizes="100vw" className="object-cover object-center" />
      </div>

      <div className="relative">
        {/* the white block above ends here: 160 tall, 20px side strips, rounded-bottom 60 */}
        <div
          aria-hidden
          className="mx-auto h-16 w-[calc(100%-1.25rem)] rounded-b-[2rem] bg-white md:h-24 md:rounded-b-[3rem] lg:h-40 lg:w-[calc(100%-2.5rem)] lg:rounded-b-[3.75rem]"
        />

        <div className="px-section-x-sm pt-14 pb-16 md:px-section-x-md md:pt-24 md:pb-24 lg:px-section-x-lg lg:pt-[18.75rem] lg:pb-40">
          <div className="mx-auto w-full max-w-content">
            <div
              className="flex flex-col items-center gap-5 rounded-[2rem] border border-[#969696] px-6 py-16 text-center md:py-24 lg:px-[3.75rem] lg:py-[8.75rem]"
              style={{ background: "linear-gradient(0deg, #16171b 0%, #000000 100%)" }}
            >
              <h2
                id="swag-closing-title"
                data-animation="reveal"
                className="font-[family-name:var(--font-satoshi)] text-[1.875rem] font-black leading-[1.04] tracking-[-0.09375rem] text-white md:text-[2.5rem] lg:text-[3.125rem]"
              >
                Make swag run itself
              </h2>
              <p
                data-animation="reveal"
                data-reveal-delay="80"
                className="max-w-[70rem] font-sans text-[1.0625rem] leading-[1.5] text-[#a8a8b8] lg:text-[1.125rem]"
              >
                Talk to our team and leave with a plan built around your brand, budget, and goals. Mockups included.
              </p>
              <div
                data-animation="reveal"
                data-reveal-delay="160"
                className="flex flex-col gap-3.5 pt-3 sm:flex-row sm:items-center"
              >
                <a href="#" className={`${PILL} bg-[#10995a] hover:bg-[#12a863] hover:brightness-105`}>
                  <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">Talk to sales</span>
                </a>
                <a
                  href="#"
                  className={`${PILL} border border-[#4d4d5c] bg-[#292933] hover:border-[#5c5c6d] hover:bg-[#33333f]`}
                >
                  <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">Shop swag</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 2px divider on the footer's top edge (Figma "divider" 1160w, x 140→1300) */}
        <div
          aria-hidden
          className="mx-auto h-[2px] w-[80.5%] max-w-[72.5rem]"
          style={{ backgroundImage: "linear-gradient(90deg, #171717 0%, #959595 50%, #171717 100%)" }}
        />
      </div>
    </section>
  );
}
