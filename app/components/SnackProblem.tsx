/* /snacks · THE PROBLEM (Figma 2208:2876). A white card peeking over the blue
   hero (two translucent "page" bars for depth) with the "Office snacks become one
   person's job" header and a grey tray of three photo cards. */

import Image, { type StaticImageData } from "next/image";
import prob1 from "@/public/snacks/sn2-problem-1.jpg";
import prob2 from "@/public/snacks/sn2-problem-2.jpg";
import prob3 from "@/public/snacks/sn2-problem-3.jpg";

const CARDS: { img: StaticImageData; title: string; desc: string }[] = [
  {
    img: prob1,
    title: "Ordering lands on one person",
    desc: "Restocking, estimating quantities, and hoping the snacks are a hit.",
  },
  {
    img: prob2,
    title: "Remote folks get overlooked",
    desc: "A stocked office kitchen only works for people who are in the office.",
  },
  {
    img: prob3,
    title: "Dietary needs are a guessing game",
    desc: "One snack box rarely works for everyone.",
  },
];

export default function SnackProblem() {
  return (
    <section className="relative z-10 -mt-10 px-section-x-sm md:px-section-x-md lg:-mt-16 lg:px-section-x-lg">
      <div className="mx-auto flex w-full max-w-content flex-col items-center">
        {/* stacked "page" peek bars */}
        <div aria-hidden className="h-3.5 w-[91.9%] rounded-t-[7px] bg-white/40" />
        <div aria-hidden className="h-[1.125rem] w-[96.1%] rounded-t-[10px] bg-white/70" />

        {/* white card */}
        <div className="flex w-full flex-col items-center rounded-t-[1rem] bg-white px-6 pt-16 md:px-12 md:pt-20 lg:pt-24">
          <div className="flex max-w-[53.75rem] flex-col items-center gap-5 text-center">
            <div className="flex flex-col items-center gap-2">
              <p
                data-animation="reveal"
                className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-[#2178f5] md:text-eyebrow-md"
              >
                The problem
              </p>
              <h2
                data-animation="reveal"
                className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
              >
                Office snacks become one person’s job
              </h2>
            </div>
            <p
              data-animation="reveal"
              className="font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]"
            >
              Remote employees need separate shipping. Dietary needs keep shifting.
              And it’s all one more recurring task to manage.
            </p>
          </div>

          <div
            data-animation="reveal"
            data-reveal-stagger="90"
            className="mt-10 grid w-full grid-cols-1 gap-4 rounded-[2rem] bg-[#f2f2f2] p-4 md:grid-cols-3"
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
                    className="aspect-[376/250] w-full object-cover"
                    sizes="(min-width:1024px) 24rem, (min-width:768px) 31vw, 92vw"
                  />
                </div>
                <div className="flex flex-col gap-4 px-8 pb-8 pt-[2.625rem]">
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
    </section>
  );
}
