"use client";

/* /swag · HOW IT WORKS (Figma n9SjmDjzB1PeZAYJ5w43fr → 2500:5082 inside the
   /swag page frame 2500:4706). "From design to delivery, handled" — an
   INTERACTIVE 3-step stepper in a #f2f2f2 tray (mirrors SnackHowItWorks): the
   active step is twice as wide (Figma 588 : 294 : 294) and shows its dark-green
   product mockup; the other two collapse to a number + a #f7f7f7 title panel.
   Click (or focus + Enter/Space) any step to expand it.

   Only step 01 is expanded in Figma (ARCADE tee editor + "Approved!" chip,
   node 2500:5096 exported at 4×). Steps 02/03 have no expanded frame in the
   new /swag design — their mockups are the same-system dark-green step visuals
   from the earlier /swag exploration (426:1112 "we warehouse and manage" →
   Store & Track, 426:1149 "send anywhere" → Send Anywhere, both 265×332,
   exported at 4×). Their descriptions are hidden layers in Figma, so 02/03
   expand title + mockup only.

   Figma stack (absolute y at 1440, section frame y=4584 h=864, own 160 top /
   160 bottom padding → rendered as lg:py-20 so the visible gap to the
   content-tight neighbours stays 160):
     header 2500:5083   y=4744 h=120  (eyebrow 17 → 8 → title 48 → 20 → sub 27)
     gap                        40
     tray   2500:5088   y=4904 h=384  (p-16; cards 352 = 10 + mockup 332 + 10)
     bottom pad          →   5448 (next section, Platform 2500:5128)
   Tray inner at Figma 1240: 588 | 16 | 294 | 16 | 294 (= 2 : 1 : 1 grow).
   Step-01 card: p-10, row gap-10 items-end → left col 293 (number block 52 top,
   grey panel 179 bottom-anchored) + mockup 265×332 rounded-24. */

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import step01 from "@/public/swag2/sw2-how-step01.png";
import step02 from "@/public/swag2/sw2-how-step02.png";
import step03 from "@/public/swag2/sw2-how-step03.png";

type Step = { n: string; title: string[]; desc?: string; img: StaticImageData; alt: string };

const STEPS: Step[] = [
  {
    n: "01",
    title: ["Design", "& Approve"],
    desc: "Choose products, add your artwork or logo, and approve a free mockup within 48 hours.",
    img: step01,
    alt: "Design & Approve — the swag design editor showing an orange ARCADE t-shirt mockup with an Approved! chip",
  },
  {
    n: "02",
    title: ["Store", "& Track"],
    img: step02,
    alt: "Store & Track — a warehouse inventory panel with live counts: T-Shirt 1,250, Hoodie 820, Tote bag 540, Mug 320",
  },
  {
    n: "03",
    title: ["Send", "Anywhere"],
    img: step03,
    alt: "Send Anywhere — a dotted globe with a hoodie and a mug in transit and a Delivered! chip",
  },
];

/* Active card = Figma grid-card-active-shadow (4 stacked drop shadows);
   collapsed cards = the resting 0 3 6 / 6% shadow. */
const SHADOW_ACTIVE =
  "shadow-[0px_20px_20px_-2px_rgba(0,0,0,0.15),0px_6.383px_6.383px_-1.5px_rgba(0,0,0,0.12),0px_2.415px_2.415px_-1px_rgba(0,0,0,0.11),0px_0.796px_0.796px_-0.5px_rgba(0,0,0,0.1)]";
const SHADOW_REST = "shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]";

export default function SwagmagicHowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-20">
      <div className="mx-auto flex w-full max-w-content flex-col gap-10">
        {/* header: eyebrow → 8 → title → 20 → subhead */}
        <div className="flex flex-col gap-2">
          <p
            data-animation="reveal"
            className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#10995a]"
          >
            How it works
          </p>
          <h2
            data-animation="reveal"
            className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
          >
            From design to delivery, handled
          </h2>
          <p
            data-animation="reveal"
            className="mt-3 font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]"
          >
            Three steps from idea to someone&apos;s doorstep. No minimums, no guesswork.
          </p>
        </div>

        {/* stepper tray */}
        <div
          data-animation="reveal"
          data-reveal-stagger="90"
          role="tablist"
          aria-label="How it works steps"
          className="flex flex-col gap-4 rounded-[2rem] bg-[#f2f2f2] p-4 lg:flex-row lg:items-stretch"
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
                aria-controls={`swag-step-panel-${s.n}`}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(i);
                  }
                }}
                className={`group flex min-h-[9rem] cursor-pointer flex-col overflow-hidden rounded-[1.5rem] bg-white p-2.5 transition-[flex-grow,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:min-h-[22rem] lg:basis-0 ${
                  isActive ? `lg:grow-[2] ${SHADOW_ACTIVE}` : `lg:grow hover:bg-[#fafafa] ${SHADOW_REST}`
                }`}
              >
                <div className="flex h-full flex-col gap-2.5 md:flex-row md:items-end">
                  {/* left column: number (top) + bottom-anchored grey title panel */}
                  <div className="flex h-full min-w-0 flex-1 flex-col justify-between gap-6 self-stretch">
                    <span className="p-4 font-sans text-[1rem] leading-5 tracking-[0.025rem] text-[#828282]">{s.n}</span>
                    <div className="flex w-full flex-col gap-4 rounded-[1.5rem] bg-[#f7f7f7] p-6">
                      <h3 className="font-[family-name:var(--font-satoshi)] text-[1.5625rem] font-bold leading-[1.04] tracking-[-0.01875rem] text-[#16171b]">
                        {s.title.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </h3>
                      {isActive && s.desc && (
                        <p className="font-sans text-[0.90625rem] leading-[1.48] text-[#6b6c71]">{s.desc}</p>
                      )}
                    </div>
                  </div>

                  {/* mockup — only rendered on the active step (265×332, rounded 24) */}
                  {isActive && (
                    <div
                      id={`swag-step-panel-${s.n}`}
                      role="tabpanel"
                      className="snack-step-in relative mx-auto h-[20.75rem] w-full max-w-[16.5625rem] shrink-0 overflow-hidden rounded-[1.5rem] md:mx-0 md:w-[16.5625rem]"
                    >
                      <Image
                        key={s.img.src}
                        src={s.img}
                        alt={s.alt}
                        fill
                        quality={100}
                        className="object-cover"
                        sizes="16.5625rem"
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
