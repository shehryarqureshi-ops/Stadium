/* /gifting · Impact stats (Figma 1113:2824). "The numbers behind Stadium" — a
   bento of four stat cards: a photo card (2.25M+), an amber-gradient card
   (1.5M+ + quote), a grey card (20,000), and a dark card (170+). */

import Image from "next/image";
import statsPhoto from "@/public/gifting/g2-stats.jpg";

const NUM = "font-[family-name:var(--font-satoshi-medium)] leading-[1.04] tracking-[-0.0625rem]";

export default function GiftStats() {
  return (
    <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-24">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        <div className="flex max-w-[53.75rem] flex-col items-center gap-3 text-center">
          <h2
            data-animation="reveal"
            className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
          >
            The numbers behind Stadium
          </h2>
          <p data-animation="reveal" className="font-sans text-[1.0625rem] leading-[1.45] text-[#707075] lg:text-[1.125rem]">
            Capacity, reach, and coverage at a glance.
          </p>
        </div>

        <div data-animation="reveal" className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* photo · 2.25M+ */}
          <div className="relative flex min-h-[22.25rem] flex-col justify-end overflow-hidden rounded-[1.5rem] border border-[#f5f5f5] p-4">
            <Image src={statsPhoto} alt="A recipient opening their chosen gift" fill className="object-cover" sizes="(min-width:1024px) 25rem, (min-width:768px) 45vw, 92vw" />
            <div className="relative flex flex-col gap-3 rounded-[1rem] bg-white p-6 text-[#16171b]">
              <p className={`${NUM} text-[3.25rem] md:text-[3.75rem]`}>2.25M+</p>
              <p className="font-sans text-[1rem] leading-[1.4]">Gifts Delivered</p>
            </div>
          </div>

          {/* amber · 1.5M+ + quote */}
          <div
            className="flex min-h-[22.25rem] flex-col justify-between gap-6 rounded-[1.5rem] p-6 text-[#16171b]"
            style={{ backgroundImage: "linear-gradient(61.86deg, #fffaec 5.24%, #fcf2d9 59.76%, #ffb800 124.46%)" }}
          >
            <div className="flex flex-col gap-1.5">
              <p className="font-sans text-[1rem] leading-[1.4]">Recipients Gifted</p>
              <p className={`${NUM} text-[3rem]`}>1.5M+</p>
            </div>
            <div className="max-w-[17rem] font-sans text-[1.0625rem] leading-[1.4]">
              <p>“People loved being able to choose their own gift. It eliminated the guesswork for me!”</p>
              <p className="mt-4">Charlene S. | The Standard</p>
            </div>
          </div>

          {/* stacked: 20,000 + 170+ */}
          <div className="flex min-h-[22.25rem] flex-col gap-4">
            <div className="flex flex-1 flex-col justify-end gap-2.5 rounded-[1.5rem] bg-[#f2f2f2] p-6 text-[#1b1b1b]">
              <p className={`${NUM} text-[3rem]`}>20,000</p>
              <p className="font-sans text-[1rem] leading-[1.4]">Companies Sent Gifts</p>
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
