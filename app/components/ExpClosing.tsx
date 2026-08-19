/* /events (Experiences · Confetti) · RESOURCES + CLOSING CTA
   (Figma n9SjmDjzB1PeZAYJ5w43fr → "closing" 2504:9571, inside the wrapper
   2504:10153; children: "Resources" 2504:9573, "Closing" 2504:9608,
   "divider" 2504:9617. The `footer` 2504:9619 below it is PageClose — not here.)

   ONE component, not two: Figma's raster "image 13695" (2880×2890, white →
   pink glow → #181818) is a single 1440×1445 box anchored to the TOP of the
   closing frame, and it is *visible* in the 20px side strips beside the white
   Resources sleeve (sampled #ffe3e8 → #e88294 at the sleeve's bottom edge), so
   the resources list and the CTA card cannot be split into separate sections
   without breaking the vertical colour mapping. Same idiom as SnackClosing /
   SwagmagicClosing otherwise: exported raster (never a CSS gradient — the glow
   is asymmetric/radial), a white rounded-60 sleeve over it, a near-black CTA
   card, and the 2px 1160-wide divider flush on the footer's top edge.

   Unlike /swag the card is FLUSH with the footer (rounded top corners only,
   no 160px of dark below it).

   Figma stack (y relative to the closing frame 2504:9571 at page y 7409):
     raster  y0    h1445  (image 13695, 1440 wide, clipped by the 1207-tall frame)
     sleeve  y0    h607   white, 1400 wide (px-20), rounded-60, px-80 pb-160
       eyebrow  y0   h15  "STEAL OUR IDEAS" Overpass SemiBold 12 / 0.72 #ff5b77
       title    y23  h48  Satoshi Bold 44 / 1.08 / -0.5 #16171b        (gap 8)
       row      y111 h336 items 678 · gap 80 · image 482×336 r24       (gap 40)
                     item 82 / 22 / hairline #eee / 22 / item 82 / 22 / 1 / 22 / 82
     (pb-20 of raster showing) → y627
     card    y747  h458   1240 wide, px-60 py-140, rounded-t-32, 1px #969696,
                          linear-gradient(0deg,#16171b,#000)
       title y887 h52 (Satoshi Black 50/1.04/-1.5) → 20 → sub y959 h27
       (18/1.5 #b8a8c7) → 20 + pt-12 → pills y1006 h47 → card ends 1205
     divider y1205 h2 (x140 w1160, #171717→#959595→#171717) → footer y1207
   Site rendering: the section adds lg:pt-20 (80) of white above the sleeve so
   the visible gap from ExpCaseStudy (lg:pb-20) is Figma's 160; the raster box
   is offset by that same 80 so the colour mapping stays exact at 1440. The
   sleeve keeps Figma's 20px side strips; content inside it is the site's
   1200 max-w-content (Figma 1240) with 90px sleeve padding → x=120 at 1440. */

import Image from "next/image";
import gradient from "@/public/exp2/xp-closing-gradient.jpg";
import abstract from "@/public/exp2/xp-closing-abstract.jpg";

const ITEMS = [
  {
    kicker: "GUIDE",
    title: "Self-Guided Toolkits",
    desc: "Access practical resources and insights to help you build a stronger workplace culture.",
  },
  {
    kicker: "PLAYBOOK",
    title: "Employee Engagement Calendars",
    desc: "Plan ahead with key dates and ideas to engage employees throughout the year.",
  },
  {
    kicker: "CHECKLIST",
    title: "Culture Knowledge Hub",
    desc: "Get step-by-step guidance to plan and run employee programs on your own.",
  },
];

const PILL =
  "inline-flex h-[2.9375rem] items-center justify-center rounded-[100px] px-[1.375rem] font-sans text-[0.9375rem] font-semibold uppercase leading-[1.4] text-white transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function ExpClosing() {
  return (
    <div
      className="relative overflow-hidden bg-white"
      style={{
        // fallback under the raster while it loads / if it fails
        backgroundImage:
          "linear-gradient(180deg, #ffffff 0%, #ffffff 27%, #f6a9b6 53%, #b35666 68%, #49262c 84%, #181818 100%)",
      }}
    >
      {/* Figma raster bg (image 13695): 1440×1445 box anchored 80px below the section top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-16 bottom-0 md:top-20 lg:bottom-auto lg:h-[90.3125rem]"
      >
        <Image src={gradient} alt="" fill quality={90} sizes="100vw" className="object-cover object-top" />
      </div>

      <div className="relative pt-16 md:pt-20 lg:pt-20">
        {/* ── Resources · the white sleeve (1400 wide, rounded 60, pb-160) ── */}
        <div className="px-2.5 pb-2.5 md:px-5 md:pb-5">
          <section
            aria-labelledby="exp-explore-title"
            className="rounded-[2rem] bg-white px-section-x-sm pt-8 pb-16 md:rounded-[3rem] md:px-section-x-md md:pt-10 md:pb-24 lg:rounded-[3.75rem] lg:px-section-x-lg lg:pt-0 lg:pb-40"
          >
            <div className="mx-auto flex w-full max-w-content flex-col gap-10">
              <div className="flex flex-col gap-2">
                <p
                  data-animation="reveal"
                  className="font-sans text-[0.75rem] font-semibold uppercase leading-[1.25] tracking-[0.045rem] text-[#ff5b77]"
                >
                  Steal our ideas
                </p>
                <h2
                  id="exp-explore-title"
                  data-animation="reveal"
                  className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
                >
                  Resources for better team events
                </h2>
              </div>

              <div className="flex flex-col gap-10 md:gap-12 lg:flex-row lg:items-stretch lg:gap-20">
                {/* resource list — item 82 / 22 / 1px #eee / 22 / … */}
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
                            <span className="font-sans text-[0.6875rem] font-bold uppercase leading-[1.4] tracking-[0.0625rem] text-[#ff5b77]">
                              {it.kicker}
                            </span>
                            <span className="font-[family-name:var(--font-satoshi)] text-[1.1875rem] font-bold leading-[1.22] tracking-[-0.01875rem] text-[#16171b] transition-colors duration-200 group-hover:text-[#ff5b77] group-active:text-[#e94a65]">
                              {it.title}
                            </span>
                          </span>
                          <span className="font-sans text-[0.875rem] leading-[1.46] text-[#6b6c71]">{it.desc}</span>
                        </span>
                        {/* arrow-up-right (Figma 2504:9587 vector, 26.75 box / 3.75 stroke) */}
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

                {/* Figma 2504:9606 — 482×336, rounded 24, stretches to the list height */}
                <div
                  data-animation="reveal"
                  data-reveal-delay="120"
                  className="relative aspect-[482/336] w-full overflow-hidden rounded-[1.5rem] bg-[#f2f2f2] lg:aspect-auto lg:w-[40.1667%] lg:shrink-0 lg:self-stretch"
                >
                  <Image
                    src={abstract}
                    alt="A teammate joining a hosted virtual experience with colleagues on a laptop video call"
                    fill
                    quality={90}
                    sizes="(min-width:1440px) 30.125rem, (min-width:1024px) 34vw, (min-width:768px) 44rem, 92vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ── Closing CTA card · flush with the footer (rounded top only) ── */}
        <div className="px-section-x-sm pt-14 md:px-section-x-md md:pt-24 lg:px-section-x-lg lg:pt-[7.5rem]">
          <div className="mx-auto w-full max-w-content">
            <section
              aria-labelledby="exp-closing-title"
              className="flex flex-col items-center gap-5 rounded-t-[2rem] border border-[#969696] px-6 py-16 text-center md:py-24 lg:px-[3.75rem] lg:py-[8.75rem]"
              style={{ background: "linear-gradient(0deg, #16171b 0%, #000000 100%)" }}
            >
              <h2
                id="exp-closing-title"
                data-animation="reveal"
                className="font-[family-name:var(--font-satoshi)] text-[1.875rem] font-black leading-[1.04] tracking-[-0.09375rem] text-white md:text-[2.5rem] lg:text-[3.125rem]"
              >
                The easiest team experience you&rsquo;ll ever book
              </h2>
              <p
                data-animation="reveal"
                data-reveal-delay="80"
                className="max-w-[70rem] font-sans text-[1.0625rem] leading-[1.5] text-[#b8a8c7] lg:text-[1.125rem]"
              >
                Browse 500+ hosted experiences, or tell us what you&apos;re planning, and we&apos;ll handle the rest.
              </p>
              <div
                data-animation="reveal"
                data-reveal-delay="160"
                className="flex flex-col gap-3.5 pt-3 sm:flex-row sm:items-center"
              >
                <a href="#" className={`${PILL} bg-[#ff5b77] hover:bg-[#ff7188] hover:brightness-105`}>
                  <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">Browse experiences</span>
                </a>
                <a
                  href="#"
                  className={`${PILL} border border-[#4d4d5c] bg-[#292933] hover:border-[#5c5c6d] hover:bg-[#33333f]`}
                >
                  <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">Talk to sales</span>
                </a>
              </div>
            </section>
          </div>
        </div>

        {/* 2px divider on the footer's top edge (Figma 2504:9618 — 1160w, x 140→1300) */}
        <div
          aria-hidden
          className="mx-auto h-[2px] w-[80.5%] max-w-[72.5rem]"
          style={{ backgroundImage: "linear-gradient(90deg, #171717 0%, #959595 50%, #171717 100%)" }}
        />
      </div>
    </div>
  );
}
