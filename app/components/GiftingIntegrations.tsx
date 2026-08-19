/* /gifting · WORKS WITH YOUR STACK (Figma n9SjmDjzB1PeZAYJ5w43fr → 2504:12606
   "Stores admin", page frame 2504:12118, 1440 wide, abs y 4540..5511).
   Narrow CENTRED header + one full-width browser-window mockup of the Stadium
   admin "Integrations" screen (window chrome dots, Stadium logotype, Company
   Space rail, "Your Connections" / "Available Connections" panels, the ADP ·
   AlexisHR · Altera · BambooHR · Breathe · Charlie logo tiles, "SEE ALL (104)"
   and the start of "MORE WAYS TO INTEGRATE WITH STADIUM" — the frame clips its
   1385-tall content at 767, so the panel really is cut off mid-row in the
   design, and the mouse cursor is part of the artwork).

   The mockup ships as ONE image: Figma node 2504:12613 exported at defaultScale
   4 (5104×3220 incl. drop-shadow bleed) then cropped with sharp to the node's
   real bounds — left 72 / top 0 / 4960×3068 = 1240×767 @4× — so the brand logos
   are Figma's own vectors, never redrawn. Lossless PNG, rendered quality={100}
   (baked UI text). The cropped-away drop shadow (0 · +20 · blur 18, derived
   from the export's 18px side / 38px bottom bleed) is reapplied in CSS.

   Figma stack (y = offset inside 2504:12606; section frame is content-tight):
     header frame 2504:12607   y=0    h=168  (x=340 w=760 → centred, 61.29% of
                                              the 1240 content ⇒ max-w 735px @1200)
       eyebrow 2504:12610      y=0    h=17   (12 Overpass Bold, lh 1.4,
                                              tracking 1.6 → 0.1rem, #996b00)
       gap 8
       h2 44/1.08 Satoshi Bold y=25   h=96   (2 lines, box w=611 → 591px @1200,
                                              tracking -0.5, #16171b, centred)
       gap 20
       subhead 18/26.1 #707075 y=141  h=27   (full 760 width, centred)
     gap 36
     integration 2504:12613    y=204  h=767  (x=100 w=1240, r8, drop shadow)
     end                       y=971
   Neighbours sit 160 away with content-tight edges (Catalog ends 4380, this
   starts 4540; this ends 5511, Comparison starts 5671) → white section
   py 80/80 (lg:py-20) so the visible gap to both neighbours is 160. */

import Image from "next/image";
import adminIntegrations from "@/public/gift2/gf-integrations-admin.png";

export default function GiftingIntegrations() {
  return (
    <section
      aria-labelledby="gifting-integrations-heading"
      className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-20"
    >
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-8 lg:gap-9">
        {/* header — Figma 760 of 1240 → 735px at the site's 1200 container */}
        <div className="flex w-full max-w-[45.9375rem] flex-col items-center gap-4 text-center lg:gap-5">
          <div className="flex flex-col items-center gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#996b00]"
            >
              Works with your stack
            </p>
            <h2
              id="gifting-integrations-heading"
              data-animation="reveal"
              className="max-w-[36.9375rem] font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
            >
              Send gifts from the tools you already use
            </h2>
          </div>
          <p
            data-animation="reveal"
            className="font-sans text-[1.0625rem] leading-[1.45] text-[#707075] lg:text-[1.125rem]"
          >
            Trigger gifts from your HRIS, CRM, or workflows without changing how your team works.
          </p>
        </div>

        {/* admin window mockup — 1240×767 in Figma, full content width here */}
        <div
          data-animation="reveal"
          data-reveal-delay="120"
          className="w-full overflow-hidden rounded-[0.5rem] shadow-[0_1.25rem_1.125rem_rgba(0,0,0,0.28)]"
        >
          <Image
            src={adminIntegrations}
            alt="Stadium admin, Integrations screen: BambooHR live under Your Connections, and available HRIS, ATS and CRM connections including ADP Workforce Now, AlexisHR, Altera Payroll, BambooHR, Breathe and Charlie"
            quality={100}
            sizes="(min-width: 1024px) 75rem, 100vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
