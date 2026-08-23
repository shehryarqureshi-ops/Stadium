/* /recognition · THE SOLUTION (Figma n9SjmDjzB1PeZAYJ5w43fr → 2504:6914
   "Offerings · two doors", 1440 wide, abs y 1854..4159.5; inner frame
   2504:6915 at x=100 w=1240 h=2145.5).

   NOT a stepper — Figma draws all four rows expanded, so this ships STATIC.
   Two columns: a left header block (492) and a right rail+cards block (668 =
   90 numbered rail + 24 + 554 cards). A 1px dashed #cccccc line (dasharray
   3/5) runs down the centre of the rail for the full section height. Each row
   is a #f2f2f2 tray (r24, p10) holding a 16:9 UI mockup (r16) + a 28px Satoshi
   title, then a white desc card (r12, 0/3/6 6% shadow).

   Figma stack (y = offset inside the 2305.5-tall section frame; the frame has
   NO top padding of its own — the three columns each carry pt-40 — and 160 of
   bottom padding before the next frame, which starts at 0):
     section top                      y=0
     (columns' own 40 top pad)
     left col 2504:6916               y=40    h=150
       eyebrow 12/normal +0.72px #8d12e7      h=15
       gap 8
       h2 36/39.6 Satoshi Bold #16171b        h=80  (wraps to 2 lines at 492)
       gap 20
       subhead 18/26.1 #707075                h=27
     rail 2504:6923 · 4 pills 90×34, dashed line x=45 running y=0..2272
     row 01 2504:6938                 y=40    h=502.875
     gap 40
     row 02 2504:7071                 y=582.875  h=502.875
     gap 40
     row 03 2504:7114                 y=1125.75  h=476.875 (1-line desc)
     gap 40
     row 04 2504:8019                 y=1642.625 h=502.875
     content ends                     y=2145.5
     bottom pad 160                → y=2305.5
   Row internals (554 wide tray): p10 → gap 10 → [visual block: px28 py20
   gap24 → mockup 478×268.875 r16 · title 28/1.04 -0.6px] + [desc card: r12,
   pt28 px28 pb30, 18/26.1 #707075].
   Rendered at the site's 1200 content cap: columns keep the Figma ratio via
   grid `fr` (492 : 80 : 668, then 90 : 24 : 554); paddings/radii/type stay at
   their raw Figma px, as in SwagmagicSolution. */

import Image, { type StaticImageData } from "next/image";
import recognize from "@/public/recog2/rc-solution-recognize.png";
import catalog from "@/public/recog2/rc-solution-catalog.png";
import logistics from "@/public/recog2/rc-solution-logistics.png";
import insights from "@/public/recog2/rc-solution-insights.png";

type Row = { n: string; id: string; title: string; desc: string; img: StaticImageData; alt: string };

const ROWS: Row[] = [
  {
    n: "01",
    id: "recognize",
    title: "Recognize, where work happens",
    desc: "A teammate gives kudos in Slack or the Stadium app, without breaking their workflow.",
    img: recognize,
    alt: "A Slack-style workspace with a Dash Kudos Program channel: Maya posts “Huge kudos to Daniel for shipping the client launch two days early.” with +150 points, #teamwork and #ownership tags and emoji reactions.",
  },
  {
    n: "02",
    id: "catalog",
    title: "Recipients choose what they love",
    desc: "Recipients redeem points from a catalog of 25,000+ items, from branded swag to premium gifts.",
    img: catalog,
    alt: "A rewards catalog with a 1,250 points balance: a branded hoodie at 450 points, selected headphones at 1,100 points and a Snackmagic box at 700 points, above a REDEEM POINTS button.",
  },
  {
    n: "03",
    id: "logistics",
    title: "We handle the logistics",
    desc: "Rewards ship to 170+ countries, with tracking included.",
    img: logistics,
    alt: "A world map with delivery routes to flagged destinations and a 170+ countries badge, beside a tracking timeline reading Ordered, Packed, Shipped, Delivered.",
  },
  {
    n: "04",
    id: "insights",
    title: "Every moment becomes insight",
    desc: "Track participation and redemption. HR sees what people value, while Finance sees where budgets deliver impact.",
    img: insights,
    alt: "A Recognition insights dashboard: 87% participation up 12% versus Q1, $42.6k budget delivered across 1,240 rewards, a recognitions-per-month bar chart peaking at 640, plus most-redeemed items and a most-recognized leaderboard.",
  },
];

/* Figma "Line 65": 1px #cccccc, stroke-dasharray 3 5 → 3px dash / 5px gap. */
const DASHED_RAIL = "repeating-linear-gradient(to bottom, #cccccc 0 3px, transparent 3px 8px)";

export default function RecogSolution() {
  return (
    <section
      aria-labelledby="recog-solution-title"
      className="bg-white px-section-x-sm md:px-section-x-md lg:px-section-x-lg"
    >
      <div className="mx-auto grid w-full max-w-content grid-cols-1 gap-10 lg:grid-cols-[492fr_80fr_668fr] lg:gap-0">
        {/* left column — eyebrow → 8 → title → 20 → subhead */}
        <div className="flex min-w-0 flex-col gap-5 self-start lg:col-start-1 sticky top-24">
          <div className="flex flex-col gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-[0.75rem] font-semibold uppercase leading-normal tracking-[0.045rem] text-[#8d12e7]"
            >
              The solution
            </p>
            <h2
              id="recog-solution-title"
              data-animation="reveal"
              className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.1] text-[#16171b] md:text-[2rem] lg:text-[2.25rem]"
            >
              From kudos to a tangible reward
            </h2>
          </div>
          <p
            data-animation="reveal"
            data-reveal-delay="120"
            className="font-sans text-[1.0625rem] leading-[1.45] text-[#707075] lg:text-[1.125rem]"
          >
            Recognition that lasts, backed by a reward people keep.
          </p>
        </div>

        {/* right column — dashed rail + the four rows */}
        <div
          className="relative flex min-w-0 flex-col gap-10 lg:col-start-3"
        >
          {/* rail line: Figma runs it from the section top (y=0) to y=2272,
              i.e. 40 above this stack and 126.5 below it. */}
          <span
            aria-hidden="true"
            className="absolute top-0 bottom-0 hidden w-px -translate-x-1/2 lg:block"
            style={{ left: "6.7365%", backgroundImage: DASHED_RAIL }}
          />

          {ROWS.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-1 gap-3 lg:grid-cols-[90fr_24fr_554fr] lg:gap-0 sticky top-24"
            >
              {/* numbered pill (90×34 in Figma; full width of the rail column) */}
              <div className="relative lg:col-start-1">
                <span className="inline-flex w-[5.625rem] items-center justify-center rounded-[100px] lg:w-full bg-[#f2f2f2] px-[0.5625rem] py-2 font-sans text-[0.875rem] font-semibold leading-normal text-[#212624]">
                  {row.n}
                </span>
              </div>

              {/* tray */}
              <article
                aria-labelledby={`recog-solution-${row.id}`}
                className="flex min-w-0 flex-col gap-2.5 rounded-[1.5rem] bg-[#f2f2f2] p-2.5 lg:col-start-3"
              >
                <div className="flex flex-col gap-6 px-4 py-5 md:px-7">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[1rem]">
                    <Image
                      src={row.img}
                      alt={row.alt}
                      fill
                      quality={100}
                      sizes="(min-width: 1024px) 462px, (min-width: 768px) 90vw, 92vw"
                      className="object-cover"
                    />
                  </div>
                  <h3
                    id={`recog-solution-${row.id}`}
                    className="font-[family-name:var(--font-satoshi)] text-[1.5rem] font-bold leading-[1.04] tracking-[-0.0375rem] text-[#16171b] md:text-[1.625rem] lg:text-[1.75rem]"
                  >
                    {row.title}
                  </h3>
                </div>

                <div className="rounded-[0.75rem] bg-white px-4 pb-[1.875rem] pt-7 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)] md:px-7">
                  <p className="font-sans text-[1.0625rem] leading-[1.45] text-[#707075] lg:text-[1.125rem]">
                    {row.desc}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
