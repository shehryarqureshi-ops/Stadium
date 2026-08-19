/* /swag · IMPACT STATS (Figma n9SjmDjzB1PeZAYJ5w43fr → 2500:5651, page frame
   2500:4706). "Swag at scale, backed by numbers" — a bento of four stat cards:
   a photo card with a white "120K+ / Kits Shipped Globally" tile overlaid
   bottom-left (tile rebuilt in HTML — it is text in Figma), a light-green
   quote card (Avg Reorder Rate 38% + quote + Felicia W. · Kentro), and a right
   column stacking a grey "48 hrs / To First Mockup" card over a dark
   "Countries 170+" card. Mirrors SnackStats.tsx (same design system).

   Figma stack (1440, y relative to the section frame; frame top = 10832):
     title      y=0    h=48   (Satoshi Bold 44 / 1.08 / -0.5)
     subhead    y=68   h=27   (gap 20; Overpass 18 / 26.1px, #707075)
     grid       y=135  h=356  (gap 40; cols 406.67 | 406.67 | 394.67, gap 16)
       photo card  p-16, tile p-24 gap-12 (120K+ 60/1.04/-1, label 16/1.4)
       quote card  p-24: label 16 → 6 → 38% 48 … quote 18/1.4 w294 → 16 →
                   avatar 54 + 8 + name/company 12/1.4
       right col   242 (48 hrs 48 + 10 + label 16, p-24 bottom-aligned)
                   + 16 + 98 (Countries / 170+ centered, p-24)
     frame end  651  (160 of internal bottom space → our lg:pb-20 (80) +
                     the next section's lg:pt-20 (80) = 160)
   Container: site 1200 (Figma 1240) → grid columns scale by fr. */

import Image from "next/image";
import impactPhoto from "@/public/swag2/sw2-impact-photo.jpg";
import avatar from "@/public/swag2/sw2-impact-avatar.png";

const NUM = "font-[family-name:var(--font-satoshi-medium)] leading-[1.04] tracking-[-0.0625rem]";

export default function SwagmagicImpact() {
  return (
    <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-20">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        <div className="flex max-w-[53.75rem] flex-col items-center gap-5 text-center">
          <h2
            data-animation="reveal"
            className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
          >
            Swag at scale, backed by numbers
          </h2>
          <p data-animation="reveal" className="font-sans text-[1.0625rem] leading-[1.45] text-[#707075] lg:text-[1.125rem]">
            What teams see when they run swag through Stadium.
          </p>
        </div>

        <div data-animation="reveal" className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[407fr_407fr_395fr]">
          {/* photo · 120K+ tile (HTML, bottom-left) */}
          <div className="relative flex min-h-[22.25rem] flex-col justify-end overflow-hidden rounded-[1.5rem] border border-[#f5f5f5] p-4">
            <Image
              src={impactPhoto}
              alt="A team member unboxing a black branded hoodie, cap and tumbler from a swag kit"
              fill
              quality={90}
              className="object-cover"
              sizes="(min-width:1024px) 25rem, (min-width:768px) 45vw, 92vw"
            />
            <div className="relative flex w-full flex-col gap-3 rounded-[1rem] bg-white p-6 text-[#16171b]">
              <p className={`${NUM} text-[3.75rem]`}>120K+</p>
              <p className="font-sans text-[1rem] leading-[1.4]">Kits Shipped Globally</p>
            </div>
          </div>

          {/* light-green · 38% + quote */}
          <figure className="flex min-h-[22.25rem] flex-col justify-between gap-6 rounded-[1.5rem] bg-[#f0fef8] p-6 text-[#16171b]">
            <div className="flex flex-col gap-1.5">
              <p className="font-sans text-[1rem] leading-[1.4]">Avg Reorder Rate</p>
              <p className={`${NUM} text-[3rem]`}>38%</p>
            </div>
            <div className="flex flex-col gap-4">
              <blockquote className="max-w-[18.375rem] font-sans text-[1.125rem] leading-[1.4]">
                “Stadium isn’t just a swag platform. It’s a scalable engagement tool that grows with you.”
              </blockquote>
              <figcaption className="flex items-center gap-2">
                <Image src={avatar} alt="" aria-hidden quality={100} className="size-[3.375rem] shrink-0 rounded-full" sizes="3.375rem" />
                <div className="flex min-w-0 flex-col font-sans text-[0.75rem] leading-[1.4]">
                  <p className="font-medium text-[#16171b]">Felicia W.</p>
                  <p className="text-[#5b6071]">Kentro</p>
                </div>
              </figcaption>
            </div>
          </figure>

          {/* stacked: 48 hrs + 170+ */}
          <div className="flex min-h-[22.25rem] flex-col gap-4">
            <div className="flex flex-1 flex-col justify-end gap-2.5 rounded-[1.5rem] bg-[#f2f2f2] p-6 text-[#1b1b1b]">
              <p className={`${NUM} text-[3rem]`}>48 hrs</p>
              <p className="font-sans text-[1rem] leading-[1.4]">To First Mockup</p>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-[1.5rem] bg-[#16171b] p-6 text-white">
              <p className="font-sans text-[1rem] leading-[1.4]">Countries</p>
              <p className={`${NUM} text-[3rem]`}>170+</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
