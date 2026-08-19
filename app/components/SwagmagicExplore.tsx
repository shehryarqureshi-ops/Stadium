/* /swag · KEEP EXPLORING (Figma n9SjmDjzB1PeZAYJ5w43fr → 2500:5722 "Resources",
   inside the "closing" frame 2500:5715). "More on getting swag right": a 3-row
   resource list (kicker / title / one-liner, #eee hairlines, 26.75px arrow-up-right)
   on the left and an abstract black-and-white image (482×336, rounded 24) on the
   right. The white block continues into SwagmagicClosing, which draws the 160px of
   white below (incl. the 60px rounded-bottom curve) over the green→dark raster.

   Figma stack (absolute y in the /swag frame, 1440):
     12727 eyebrow (17)          ← 160 below the pricing banner (12567) → pt-20 + neighbour pb-20
     12752 title   (48)          ← gap 8
     12840 items row (336)       ← gap 40   items 82 / 22 / 1 / 22 / 82 / 22 / 1 / 22 / 82 = 336
     13176 items bottom → SwagmagicClosing draws 160 white (curve bottom 13336). */

import Image from "next/image";
import abstract from "@/public/swag2/sw2-explore-abstract.jpg";

const ITEMS = [
  {
    kicker: "GUIDE",
    title: "No-Minimums Swag Playbook",
    desc: "Run a swag program without storing inventory.",
  },
  {
    kicker: "TEMPLATE",
    title: "Onboarding Kit Checklist",
    desc: "What goes in a new-hire kit, by role.",
  },
  {
    kicker: "STORY",
    title: "Fintech Branded Stores",
    desc: "How multi-office stores, budgets, and approvals work.",
  },
];

export default function SwagmagicExplore() {
  return (
    <section
      aria-labelledby="swag-explore-title"
      className="bg-white px-section-x-sm pt-16 md:px-section-x-md md:pt-20 lg:px-section-x-lg lg:pt-20"
    >
      <div className="mx-auto flex w-full max-w-content flex-col gap-10">
        <div className="flex flex-col gap-2">
          <p
            data-animation="reveal"
            className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#10995a]"
          >
            Keep exploring
          </p>
          <h2
            id="swag-explore-title"
            data-animation="reveal"
            className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
          >
            More on getting swag right
          </h2>
        </div>

        <div className="flex flex-col gap-10 md:gap-12 lg:flex-row lg:items-stretch lg:gap-20">
          {/* resource list */}
          <ul data-animation="reveal" data-reveal-stagger="90" className="flex min-w-0 flex-1 flex-col">
            {ITEMS.map((it) => (
              <li
                key={it.title}
                data-animation="reveal"
                className="border-b border-[#eeeeee] py-[1.375rem] first:pt-0 last:border-b-0 last:pb-0"
              >
                <a
                  href="#"
                  className="group flex items-end gap-2.5 rounded-[0.5rem] outline-none transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                >
                  <span className="flex min-w-0 flex-1 flex-col gap-4">
                    <span className="flex flex-col gap-2">
                      <span className="font-sans text-[0.6875rem] font-bold uppercase leading-[1.4] tracking-[0.0625rem] text-[#10995a]">
                        {it.kicker}
                      </span>
                      <span className="font-[family-name:var(--font-satoshi)] text-[1.1875rem] font-bold leading-[1.22] tracking-[-0.01875rem] text-[#16171b] transition-colors duration-200 group-hover:text-[#10995a] group-active:text-[#0d7d49]">
                        {it.title}
                      </span>
                    </span>
                    <span className="font-sans text-[0.875rem] leading-[1.46] text-[#6b6c71]">{it.desc}</span>
                  </span>
                  {/* arrow-up-right (Figma 2500:5735 vector, 26.75 box / 3.75 stroke) */}
                  <svg
                    aria-hidden
                    viewBox="0 0 26.75 26.75"
                    fill="none"
                    className="size-[1.671875rem] shrink-0 text-black transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-active:scale-[0.96]"
                  >
                    <path
                      d="M22.75 22.75V4H4M22.75 4L4 22.75"
                      stroke="currentColor"
                      strokeWidth="3.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          {/* abstract image · 482×336 at 1440, rounded 24, stretches to the list height */}
          <div
            data-animation="reveal"
            data-reveal-delay="120"
            className="relative aspect-[482/336] w-full overflow-hidden rounded-[1.5rem] bg-[#f2f2f2] lg:aspect-auto lg:w-[30.125rem] lg:shrink-0 lg:self-stretch"
          >
            <Image
              src={abstract}
              alt=""
              aria-hidden
              fill
              quality={90}
              sizes="(min-width:1024px) 30.125rem, (min-width:768px) 44rem, 92vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
