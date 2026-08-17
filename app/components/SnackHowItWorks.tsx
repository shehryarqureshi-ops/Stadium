/* /snacks · HOW IT WORKS (Figma 2208:2945). "From order to their door in four
   steps" — a stepper with step 01 "Pick a Box" expanded (its product mockup)
   and steps 02–04 collapsed to a number + title, in a grey tray. */

import Image from "next/image";
import pickBox from "@/public/snacks/sn2-step-pickbox.png";

const REST = [
  { n: "02", title: "Add Recipients" },
  { n: "03", title: "Hit Send" },
  { n: "04", title: "Recipients Redeem" },
];

export default function SnackHowItWorks() {
  return (
    <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-24">
      <div className="mx-auto flex w-full max-w-content flex-col gap-10">
        <div className="flex flex-col gap-2">
          <p
            data-animation="reveal"
            className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-[#2178f5] md:text-eyebrow-md"
          >
            How it works
          </p>
          <h2
            data-animation="reveal"
            className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
          >
            From order to their door in four steps
          </h2>
          <p data-animation="reveal" className="font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]">
            Send globally with local fulfillment, so every snack box arrives with flavors that feel closer to home.
          </p>
        </div>

        <div
          data-animation="reveal"
          data-reveal-stagger="90"
          className="flex flex-col gap-4 rounded-[1.5rem] bg-[#f2f2f2] p-4 lg:flex-row lg:items-stretch"
        >
          {/* step 01 — active */}
          <div
            data-animation="reveal"
            className="flex min-h-[9rem] flex-col rounded-[1rem] bg-white p-6 lg:min-h-[22rem] lg:flex-[2.1]"
          >
            <div className="flex h-full flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-4">
              <div className="flex flex-1 flex-col justify-between gap-6">
                <span className="font-sans text-[1rem] text-[#a9a9ad]">01</span>
                <div className="flex flex-col gap-3">
                  <h3 className="font-[family-name:var(--font-satoshi)] text-[1.5rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#16171b]">
                    Pick a Box
                  </h3>
                  <p className="max-w-[16rem] font-sans text-[0.9375rem] leading-[1.5] text-[#6b6c71]">
                    Let them build their own box or send a curated one.
                  </p>
                </div>
              </div>
              <div className="relative mx-auto h-[16rem] w-auto shrink-0 lg:h-auto lg:self-stretch">
                <Image
                  src={pickBox}
                  alt="Pick a Box preview — Crowd Pleasers snack boxes"
                  className="h-full w-auto object-contain"
                  sizes="280px"
                />
              </div>
            </div>
          </div>

          {/* steps 02–04 — collapsed */}
          {REST.map((s) => (
            <div
              key={s.n}
              data-animation="reveal"
              className="flex min-h-[9rem] flex-col justify-between gap-8 rounded-[1rem] bg-white p-6 lg:min-h-[22rem] lg:flex-1"
            >
              <span className="font-sans text-[1rem] text-[#a9a9ad]">{s.n}</span>
              <h3 className="font-[family-name:var(--font-satoshi)] text-[1.5rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#16171b]">
                {s.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
