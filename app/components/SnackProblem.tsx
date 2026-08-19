/* /snacks · THE PROBLEM (Figma 2208:2876, revised 2026-08-18). A rounded
   "sleeve" panel (Figma "glass": medium blue at the logo wall fading to white)
   sits on the hero blue and holds the trust logos (60px above/below), then a
   plain white rounded card with the "Nice gestures don't scale"
   header and a grey tray of three photo cards. The old stacked "page" peek bars
   behind the card were REMOVED in this revision. */

import Image, { type StaticImageData } from "next/image";
import prob1 from "@/public/snacks/sn2-problem-1.jpg";
import prob2 from "@/public/snacks/sn2-problem-2.jpg";
import prob3 from "@/public/snacks/sn2-problem-3.jpg";

const LOGOS = [
  { src: "/trust-amazon.svg", alt: "Amazon", w: 80, h: 24 },
  { src: "/trust-pinterest.svg", alt: "Pinterest", w: 87, h: 22 },
  { src: "/trust-accenture.svg", alt: "Accenture", w: 84, h: 24 },
  { src: "/trust-bloomberg.svg", alt: "Bloomberg", w: 90, h: 16 },
  { src: "/trust-salesforce.svg", alt: "Salesforce", w: 37, h: 26 },
  { src: "/trust-netflix.svg", alt: "Netflix", w: 75, h: 20 },
  { src: "/trust-google.svg", alt: "Google", w: 74, h: 24 },
  { src: "/trust-amazon.svg", alt: "Amazon", w: 80, h: 24 },
  { src: "/trust-pinterest.svg", alt: "Pinterest", w: 87, h: 22 },
];

const CARDS: { img: StaticImageData; title: string; desc: string }[] = [
  {
    img: prob1,
    title: "Asking ruins the surprise",
    desc:
      "You can’t send something unexpected to someone you just emailed for their address. The moment you start collecting details, the gift announces itself.",
  },
  {
    img: prob2,
    title: "One person ends up running it",
    desc:
      "Someone chases every address, every diet and every “mine never arrived”—then hopes the picks landed.",
  },
  {
    img: prob3,
    title: "Nothing happens unless someone remembers",
    desc:
      "There’s no trigger, no schedule, nothing running in the background. Every anniversary and every new hire gets marked only if a human catches it in time.",
  },
];

export default function SnackProblem() {
  return (
    <section className="relative z-10 bg-[#0034ae]">
      {/* rounded "sleeve" panel: medium blue at the logos fading to white */}
      <div
        className="rounded-t-[1.5rem] md:rounded-t-[2rem] lg:rounded-t-[2.5rem]"
        style={{ backgroundImage: "linear-gradient(180deg, #2f63d0 0%, #9bc3f5 42%, #ffffff 82%)" }}
      >
        {/* logo wall */}
        <div
          data-animation="reveal"
          className="px-section-x-sm py-10 md:px-section-x-md lg:py-[3.75rem]"
        >
          <div className="mx-auto flex min-h-[2.5rem] w-full max-w-content flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-90 md:gap-x-14">
            {LOGOS.map((l, i) => (
              <img
                key={`${l.alt}-${i}`}
                src={l.src}
                alt={l.alt}
                width={l.w}
                height={l.h}
                className="h-[1.4rem] w-auto brightness-0 invert"
              />
            ))}
          </div>
        </div>

        <div className="px-section-x-sm md:px-section-x-md lg:px-section-x-lg lg:pb-20">
          <div className="mx-auto flex w-full max-w-content flex-col items-center">
        {/* white card */}
        <div className="flex w-full flex-col items-center rounded-[1rem] bg-white px-6 pt-16 md:px-12 md:pt-20 lg:px-20 lg:pt-[10rem]">
          <div className="flex max-w-[53.75rem] flex-col items-center gap-5 text-center">
            <div className="flex flex-col items-center gap-2">
              <p
                data-animation="reveal"
                className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#2178f5]"
              >
                The problem
              </p>
              <h2
                data-animation="reveal"
                className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
              >
                Nice gestures don’t scale
              </h2>
            </div>
            <p
              data-animation="reveal"
              className="font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]"
            >
              The best sends feel personal—something they’d never have picked up
              for themselves and show up out of nowhere. But then you realize you
              need forty addresses, and you’re emailing people to ask.
            </p>
          </div>

          <div
            data-animation="reveal"
            data-reveal-stagger="90"
            className="mt-8 grid w-full grid-cols-1 gap-4 rounded-[2rem] bg-[#f2f2f2] p-4 md:grid-cols-3 lg:mt-10"
          >
            {CARDS.map((c) => (
              <article
                key={c.title}
                data-animation="reveal"
                className="flex flex-col overflow-hidden rounded-[1.5rem] bg-white p-2 shadow-[0px_3px_3px_0px_rgba(0,0,0,0.06)]"
              >
                <div className="overflow-hidden rounded-[1.25rem]">
                  <Image
                    src={c.img}
                    alt={c.title}
                    quality={90}
                    className="aspect-[376/250] w-full object-cover lg:aspect-auto lg:h-[15.625rem]"
                    sizes="(min-width:1024px) 24rem, (min-width:768px) 31vw, 92vw"
                  />
                </div>
                <div className="flex flex-col gap-4 px-8 pb-8 pt-[2.625rem] lg:px-6">
                  <h3 className="font-[family-name:var(--font-satoshi)] text-[1.6875rem] font-bold leading-[1.875rem] tracking-[-0.01875rem] text-[#16171b]">
                    {c.title}
                  </h3>
                  <p className="font-sans text-[1rem] leading-[1.5] text-[#6b6c71]">
                    {c.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
          </div>
        </div>
      </div>
    </section>
  );
}
