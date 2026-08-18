/* /snacks · THE PROOF (Figma 2208:3224). "The infrastructure behind 2M+ snack
   sends" — a bento of four stat cards: a photo card (19.7M+, overlay baked in),
   a light-blue card (1.7M+ + quote), a grey card (1,700+), and a dark card (170+). */

import Image from "next/image";
import statsPhoto from "@/public/snacks/sn2-stats-photo.jpg";
import avatar from "@/public/snacks/sn2-avatar.jpg";

const NUM = "font-[family-name:var(--font-satoshi-medium)] leading-[1.04] tracking-[-0.0625rem]";

export default function SnackStats() {
  return (
    <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-20">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        <div className="flex max-w-[53.75rem] flex-col items-center gap-2 text-center">
          <p
            data-animation="reveal"
            className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#2178f5]"
          >
            The proof
          </p>
          <h2
            data-animation="reveal"
            className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
          >
            The infrastructure behind 2M+ snack sends
          </h2>
          <p data-animation="reveal" className="font-sans text-[1.0625rem] leading-[1.45] text-[#707075] lg:text-[1.125rem]">
            Real numbers from teams sending snacks on Snackmagic.
          </p>
        </div>

        <div data-animation="reveal" className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[407fr_407fr_395fr]">
          {/* photo · 19.7M+ (overlay baked in) */}
          <div className="relative min-h-[22.25rem] overflow-hidden rounded-[1.5rem] border border-[#f5f5f5]">
            <Image src={statsPhoto} alt="A SnackMagic box delivered to a doorstep — 19.7M+ snacks delivered" fill quality={100} className="object-cover" sizes="(min-width:1024px) 25rem, (min-width:768px) 45vw, 92vw" />
          </div>

          {/* light-blue · 1.7M+ + quote */}
          <div className="flex min-h-[22.25rem] flex-col justify-between gap-6 rounded-[1.5rem] bg-[#eaf1fd] p-6 text-[#16171b]">
            <div className="flex flex-col gap-1.5">
              <p className="font-sans text-[1rem] leading-[1.4] text-[#5b6470]">Snacks Sent</p>
              <p className={`${NUM} text-[3rem]`}>1.7M+</p>
            </div>
            <div className="flex flex-col gap-5">
              <p className="max-w-[19rem] font-sans text-[1rem] leading-[1.45] text-[#33404f]">
                “The team loved it! Thought it was really cool to choose different items that they normally wouldn’t try or buy in a grocery store.”
              </p>
              <div className="flex items-center gap-3">
                <Image src={avatar} alt="" width={54} height={54} quality={90} className="size-[2.7rem] rounded-full object-cover" />
                <div className="leading-tight">
                  <p className="font-sans text-[0.9375rem] font-semibold text-[#16171b]">Lauren Berry</p>
                  <p className="font-sans text-[0.9375rem] text-[#5b6470]">Trane Technologies</p>
                </div>
              </div>
            </div>
          </div>

          {/* stacked: 1,700+ + 170+ */}
          <div className="flex min-h-[22.25rem] flex-col gap-4">
            <div className="flex flex-1 flex-col justify-end gap-2.5 rounded-[1.5rem] bg-[#f2f2f2] p-6 text-[#1b1b1b]">
              <p className={`${NUM} text-[3rem]`}>1,700+</p>
              <p className="font-sans text-[1rem] leading-[1.4]">Brands</p>
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
