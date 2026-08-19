/* /recognition · closing CTA (Figma n9SjmDjzB1PeZAYJ5w43fr → 2504:8773
   "Closing" + the bottom of 2504:8738 + the divider 2504:8782, all inside the
   "closing" wrapper 2504:8672). Structure mirrors SwagmagicClosing/SnackClosing:
   the white block above (RecogExplore) ends here in a 1400-wide (20px side
   strips) rounded-bottom-60 white sleeve of 160px, over Figma's raster
   "image 13654" (2880×2890, white → purple bloom → #181818, drawn 1440×1445
   bottom-anchored, object-cover — shipped as-is, not a CSS gradient, because
   the bloom is asymmetric/radial). 140px below the curve the near-black card
   (vertical #16171b→#000, 1px #969696 border, rounded 32, py 140, px 60) holds
   "Make recognition more than a notification"; the card sits FLUSH on the 2px
   1160-wide divider (Figma: a #171717→#959595→#171717 horizontal gradient),
   which sits on the footer's top edge. Footer = PageClose (showCta=false).

   Layering contract: the raster is 1445 tall bottom-anchored, i.e. it reaches
   658px ABOVE this section (Figma's raster starts inside the Talk-to-sales
   panel, 51px above the Resources frame). This section is deliberately NOT
   overflow-hidden so those upper 658px still paint behind RecogExplore's 20px
   side strips — which is why RecogExplore and RecogContact both carry
   `relative z-10`. Render order must be
   RecogContact → RecogExplore → RecogClosing → PageClose.

   Figma stack (y relative to the "closing" wrapper 2504:8672 at abs 10837.5):
     848  raster top ("image 13654", 1440×1445 → bottom 2293)
     1506 RecogExplore content bottom → this component starts here
     1506 sleeve (160 white, 1400 wide, rounded-bottom 60) → curve bottom 1666
     1666 +140 gap
     1806 card top     (1240×485; px 60 · py 140; r32; border #969696)
       1946 title  h=52  (50 Satoshi Black / 1.04 / -1.5, centered)
       gap 20
       2018 subhead h=54 (18 Overpass / 1.5, #a8a8b8, 2 lines)
       gap 20 + pt 12
       2092 pills  h=47  (#8d12e7 / #292933 + #4d4d5c border, r100, px 22)
     2291 card bottom = divider top (2px, 1160 wide, x 140…1300)
     2293 footer. */

import Image from "next/image";
import gradient from "@/public/recog2/rc-closing-gradient.jpg";

const PILL =
  "inline-flex h-[2.9375rem] items-center justify-center rounded-[100px] px-[1.375rem] font-sans text-[0.9375rem] font-semibold leading-[1.4] text-white transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function RecogClosing() {
  return (
    <section
      aria-labelledby="recog-closing-title"
      className="relative bg-white"
      style={{
        // fallback under the raster while it loads / if it fails
        backgroundImage:
          "linear-gradient(180deg, #ffffff 0%, #e0c0f8 8%, #af6edf 21%, #7531a6 40%, #3e1959 58%, #211828 71%, #181818 88%, #181818 100%)",
      }}
    >
      {/* Figma raster bg (image 13654): 1440×1445 box anchored to the section bottom,
          intentionally taller than the section so it reaches up behind RecogExplore */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-full lg:h-[90.3125rem]">
        <Image src={gradient} alt="" fill quality={90} sizes="100vw" className="object-cover object-center" />
      </div>

      <div className="relative">
        {/* the white block above ends here: 160 tall, 20px side strips, rounded-bottom 60 */}
        <div
          aria-hidden
          className="mx-auto h-16 w-[calc(100%-1.25rem)] rounded-b-[2rem] bg-white md:h-24 md:rounded-b-[3rem] lg:h-40 lg:w-[calc(100%-2.5rem)] lg:rounded-b-[3.75rem]"
        />

        <div className="px-section-x-sm pt-14 md:px-section-x-md md:pt-24 lg:px-section-x-lg lg:pt-[8.75rem]">
          <div className="mx-auto w-full max-w-content">
            <div
              className="flex flex-col items-center gap-5 rounded-[2rem] border border-[#969696] px-6 py-16 text-center md:py-24 lg:px-[3.75rem] lg:py-[8.75rem]"
              style={{ background: "linear-gradient(0deg, #16171b 0%, #000000 100%)" }}
            >
              <h2
                id="recog-closing-title"
                data-animation="reveal"
                className="font-[family-name:var(--font-satoshi)] text-[1.875rem] font-black leading-[1.04] tracking-[-0.09375rem] text-white md:text-[2.5rem] lg:text-[3.125rem]"
              >
                Make recognition more than a notification
              </h2>
              <p
                data-animation="reveal"
                data-reveal-delay="80"
                className="max-w-[70rem] font-sans text-[1.0625rem] leading-[1.5] text-[#a8a8b8] lg:text-[1.125rem]"
              >
                Book 30 minutes and see how kudos become a reward people choose, receive, and remember.{" "}
                <span className="lg:block">
                  Or browse the catalog to see what&#39;s on its way to someone&#39;s door.
                </span>
              </p>
              <div
                data-animation="reveal"
                data-reveal-delay="160"
                className="flex flex-col gap-3.5 pt-3 sm:flex-row sm:items-center"
              >
                <a href="#" className={`${PILL} bg-[#8d12e7] hover:bg-[#9c22f5] hover:brightness-105`}>
                  <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">TALK TO SALES</span>
                </a>
                <a
                  href="#"
                  className={`${PILL} border border-[#4d4d5c] bg-[#292933] hover:border-[#5c5c6d] hover:bg-[#33333f]`}
                >
                  <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">Browse the catalog</span>
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
