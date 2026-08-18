"use client";

/* /snacks · HOW IT WORKS (Figma 2208:2945 + expanded states 2208:15861 /
   2208:15907 / 2229:16353). "From order to their door in four steps" — an
   INTERACTIVE stepper in a grey tray: the active step is wide and shows its
   blue-gradient product mockup; the other three collapse to a number + a grey
   title panel. Click (or focus + Enter/Space) any step to expand it. Only
   step 01 has approved description copy — the 02–04 descriptions are hidden
   placeholder text in Figma, so those expand title-only. */

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import pickBox from "@/public/snacks/sn2-step-pickbox.png";
import recipients from "@/public/snacks/sn2-step-recipients.png";
import send from "@/public/snacks/sn2-step-send.png";
import redeem from "@/public/snacks/sn2-step-redeem.png";

type Step = { n: string; title: string; desc?: string; img: StaticImageData; alt: string };

const STEPS: Step[] = [
  {
    n: "01",
    title: "Pick a Box",
    desc: "Let them build their own box or send a curated one.",
    img: pickBox,
    alt: "Pick a Box — Crowd Pleasers snack box selected in Snackmagic",
  },
  {
    n: "02",
    title: "Add Recipients",
    img: recipients,
    alt: "Add Recipients — a list of teammates with checkboxes and a Confirm Order button",
  },
  {
    n: "03",
    title: "Hit Send",
    img: send,
    alt: "Hit Send — order details for Crowd Pleasers going to 15 people",
  },
  {
    n: "04",
    title: "Recipients Redeem",
    img: redeem,
    alt: "Recipients Redeem — a phone showing 'James has sent you a snack box' with a Redeem button",
  },
];

export default function SnackHowItWorks() {
  const [active, setActive] = useState(0);

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
          role="tablist"
          aria-label="How it works steps"
          className="flex flex-col gap-4 rounded-[1.5rem] bg-[#f2f2f2] p-4 lg:flex-row lg:items-stretch"
        >
          {STEPS.map((s, i) => {
            const isActive = i === active;
            return (
              <div
                key={s.n}
                data-animation="reveal"
                role="tab"
                tabIndex={0}
                aria-selected={isActive}
                aria-controls={`snack-step-panel-${s.n}`}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(i);
                  }
                }}
                className={`group flex min-h-[9rem] cursor-pointer flex-col overflow-hidden rounded-[1rem] bg-white p-4 transition-[flex-grow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:min-h-[21.5rem] ${
                  isActive ? "lg:flex-[3]" : "lg:flex-1 lg:hover:bg-[#fafafa]"
                }`}
              >
                <div className="flex h-full flex-col gap-6 lg:flex-row lg:items-stretch lg:justify-between lg:gap-6">
                  {/* left column: number + bottom-anchored grey title panel */}
                  <div className={`flex flex-col justify-between gap-6 ${isActive ? "lg:w-[48%]" : "lg:w-full"}`}>
                    <span className="pl-2 pt-2 font-sans text-[1rem] text-[#a9a9ad]">{s.n}</span>
                    <div className="flex flex-col gap-2 rounded-[1rem] bg-[#f4f4f5] p-6">
                      <h3 className="font-[family-name:var(--font-satoshi)] text-[1.25rem] font-bold leading-[1.15] tracking-[-0.01em] text-[#16171b]">
                        {s.title}
                      </h3>
                      {isActive && s.desc && (
                        <p className="font-sans text-[0.875rem] leading-[1.5] text-[#6b6c71]">{s.desc}</p>
                      )}
                    </div>
                  </div>

                  {/* mockup — only rendered on the active step */}
                  {isActive && (
                    <div
                      id={`snack-step-panel-${s.n}`}
                      role="tabpanel"
                      className="snack-step-in relative mx-auto h-[16rem] w-full max-w-[20rem] lg:mx-0 lg:h-auto lg:w-[46%] lg:max-w-none lg:self-stretch"
                    >
                      <Image
                        key={s.img.src}
                        src={s.img}
                        alt={s.alt}
                        fill
                        quality={100}
                        className="object-contain"
                        sizes="(min-width:1024px) 15rem, 20rem"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
