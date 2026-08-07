"use client";

/* /gifting · HOW IT WORKS (Figma 1113:2441 + 1681:2358). "Simple from send to
   delivery" — a 3-step switcher. The active step expands to show its amber-framed
   product mockup + description; the others collapse to a number + title. */

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import send from "@/public/gifting/g2-step-send.png";
import pick from "@/public/gifting/g2-step-pick.png";
import arrive from "@/public/gifting/g2-step-arrive.png";

type Step = { n: string; title: string; desc: string; img: StaticImageData };

const STEPS: Step[] = [
  {
    n: "01",
    title: "Send or Automate",
    desc: "No guessing the gift. No chasing an address. Automate once, and sends continue without you.",
    img: send,
  },
  {
    n: "02",
    title: "They Pick",
    desc: "Recipients choose the gift they actually want, and add their own address — no back-and-forth.",
    img: pick,
  },
  {
    n: "03",
    title: "Gift Arrives",
    desc: "Open a store, send a kit, or bulk-ship to 170+ countries. We handle delivery.",
    img: arrive,
  },
];

export default function GiftHowItWorks() {
  const [active, setActive] = useState(0);
  return (
    <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-24">
      <div className="mx-auto flex w-full max-w-content flex-col gap-10">
        <div className="flex flex-col gap-2">
          <p
            data-animation="reveal"
            className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-[#996b00] md:text-eyebrow-md"
          >
            How it works
          </p>
          <h2
            data-animation="reveal"
            className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
          >
            Simple from send to delivery
          </h2>
          <p data-animation="reveal" className="font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]">
            Whether you’re sending one gift or one thousand, the process doesn’t change.
          </p>
        </div>

        <div
          data-animation="reveal"
          className="flex flex-col gap-4 rounded-[1.5rem] bg-[#f2f2f2] p-4 lg:flex-row lg:items-stretch"
        >
          {STEPS.map((s, i) => {
            const on = i === active;
            return (
              <button
                key={s.n}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={on}
                className={`group flex min-h-[9rem] flex-col rounded-[1rem] bg-white p-6 text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:min-h-[22rem] ${
                  on ? "lg:flex-[2.1]" : "lg:flex-1"
                }`}
              >
                {on ? (
                  <div className="flex h-full flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-4">
                    <div className="flex flex-1 flex-col justify-between gap-6">
                      <span className="font-sans text-[1rem] text-[#a9a9ad]">{s.n}</span>
                      <div className="flex flex-col gap-3">
                        <h3 className="font-[family-name:var(--font-satoshi)] text-[1.5rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#16171b]">
                          {s.title}
                        </h3>
                        <p className="max-w-[16rem] font-sans text-[0.9375rem] leading-[1.5] text-[#6b6c71]">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                    <div className="relative mx-auto h-[16rem] w-auto shrink-0 lg:h-auto lg:self-stretch">
                      <Image
                        src={s.img}
                        alt={`${s.title} preview`}
                        className="h-full w-auto object-contain"
                        sizes="280px"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full flex-col justify-between gap-8">
                    <span className="font-sans text-[1rem] text-[#a9a9ad]">{s.n}</span>
                    <h3 className="font-[family-name:var(--font-satoshi)] text-[1.5rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#16171b] transition-colors group-hover:text-[#996b00]">
                      {s.title}
                    </h3>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
