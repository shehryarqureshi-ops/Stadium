/* /swag · THE SOLUTION (Figma n9SjmDjzB1PeZAYJ5w43fr → 2500:4925 "container",
   1440 wide, abs y 2128..2783). "Guided ordering or self-serve" — centred
   header, then a light grey tray (874 wide, centred, p16, gap16, items-center)
   holding two option cards side by side:
     · "Run a swag program"  — the emphasised card: 1px #1b1b1b inside stroke,
       8-layer "card-heavy-emphasis" shadow, dark "Popular" pill breaking the
       top edge at right 39, dark #111 TALK TO SALES pill CTA. 463 tall.
     · "Order Swag Yourself" — plain white card, 0/3/6 6% shadow, light
       #f2f2f2 SHOP SWAGMAGIC pill CTA. 439 tall (vertically centred → y+12).
   Neither card is rotated in the design; card 1 simply carries the border,
   the deeper shadow and the pill.

   Figma stack (section frame is content-tight; y = offset inside 2500:4925):
     eyebrow "THE SOLUTION"        y=0    h=17   (12/1.4 Overpass Bold #10995a)
     gap 8
     title 44/1.08 Satoshi Bold    y=25   h=48
     gap 20
     subhead 18/1.48 #6b6c71       y=93   h=27
     gap 40
     tray #f2f2f2 r32 p16          y=160  h=495 (x=283 w=874)
       card 1  y=16 h=463 (r24 p10 → header 119 · gap 10 · body 314)
       card 2  y=28 h=439 (r24 p10 → header 119 · gap 10 · body 290)
       header panel #f7f7f7 r16 p24: title 32/40 · gap 16 · label 11/1.4
       body r16 p24 (gap 32): desc 16/1.5 · checklist (3×18, gap 12, pb 8) ·
       pill CTA 44 tall (py 18 + 8 cap-trimmed label 12/16 tracking 1.16)
     end                            y=655
   Neighbouring frames sit 160 apart → white section py 80/80 (lg:py-20). */

type Card = {
  id: string;
  title: string;
  label: string;
  desc: string;
  points: string[];
  cta: string;
  href: string;
  emphasised: boolean;
};

const CARDS: Card[] = [
  {
    id: "program",
    title: "Run a swag program",
    label: "STADIUM PLATFORM · SALES-ASSISTED",
    desc: "We build your stores, hold your inventory, ship on autopilot, and manage setup. Finance keeps spend in control.",
    points: ["Branded stores and kitting", "Inventory + global fulfillment", "Budgets, approvals, and SSO"],
    cta: "TALK TO SALES",
    href: "#",
    emphasised: true,
  },
  {
    id: "self-serve",
    title: "Order Swag Yourself",
    label: "SWAGMAGIC · SELF-SERVE",
    desc: "Design and send swag with no contracts or minimums.",
    points: ["On-demand and bulk ordering", "No minimums, no setup call", "Pay as you go"],
    cta: "SHOP SWAGMAGIC",
    href: "#",
    emphasised: false,
  },
];

/* Figma "card-heavy-emphasis-shadow" (8 layered drop shadows, offset/blur/
   spread as listed in the design context) + the 1px #1b1b1b inside stroke
   rendered as an inset shadow so it does not eat into the 10px padding. */
const HEAVY_SHADOW =
  "shadow-[0.672px_0.672px_0.95px_-0.1875px_rgba(0,0,0,0.05),1.592px_1.592px_2.252px_-0.375px_rgba(0,0,0,0.05),2.905px_2.905px_4.108px_-0.5625px_rgba(0,0,0,0.05),4.829px_4.829px_6.829px_-0.75px_rgba(0,0,0,0.05),7.798px_7.798px_11.029px_-0.9375px_rgba(0,0,0,0.06),12.765px_12.765px_18.053px_-1.125px_rgba(0,0,0,0.06),21.981px_21.981px_31.086px_-1.3125px_rgba(0,0,0,0.08),40px_40px_56.569px_-1.5px_rgba(0,0,0,0.11),inset_0_0_0_1px_#1b1b1b]";

/* lucide/check exactly as exported from Figma (2500:4943 svgAssets), 14×14. */
function Check() {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      className="size-[0.875rem] shrink-0"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M11.6667 3.5L5.25 9.91667L2.33333 7"
        stroke="black"
        strokeWidth={1.16667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SwagmagicSolution() {
  return (
    <section
      aria-labelledby="swag-solution-title"
      className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-20"
    >
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        {/* header: eyebrow → 8 → title → 20 → subhead */}
        <div className="flex w-full flex-col items-center gap-5 text-center">
          <div className="flex flex-col items-center gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#10995a]"
            >
              The solution
            </p>
            <h2
              id="swag-solution-title"
              data-animation="reveal"
              className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
            >
              Guided ordering or self-serve
            </h2>
          </div>
          <p
            data-animation="reveal"
            data-reveal-delay="120"
            className="font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]"
          >
            Both options pull from the same catalog.
          </p>
        </div>

        {/* tray: 874 wide centred, two cards, vertically centred */}
        <div
          data-animation="reveal"
          data-reveal-stagger="90"
          className="flex w-full max-w-[54.625rem] flex-col gap-4 rounded-[2rem] bg-[#f2f2f2] p-4 md:flex-row md:items-center"
        >
          {CARDS.map((c) => (
            <article
              key={c.id}
              data-animation="reveal"
              aria-labelledby={`swag-solution-${c.id}`}
              className={`relative flex min-w-0 flex-1 flex-col gap-2.5 rounded-[1.5rem] bg-white p-2.5 ${
                c.emphasised ? HEAVY_SHADOW : "shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]"
              }`}
            >
              {c.emphasised && (
                <span
                  aria-hidden="true"
                  className="absolute right-[2.4375rem] -top-[0.65rem] inline-flex items-center justify-center rounded-[100px] bg-[#1b1b1b] px-3 pb-[0.1875rem] pt-1 font-sans text-[0.6875rem] font-bold leading-[1.4] tracking-[0.025rem] text-white"
                >
                  Popular
                </span>
              )}

              {/* header panel */}
              <div className="flex flex-col gap-4 rounded-[1rem] bg-[#f7f7f7] p-6">
                <h3
                  id={`swag-solution-${c.id}`}
                  className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.25] text-[#16171b] lg:text-[2rem]"
                >
                  {c.title}
                  {c.emphasised && <span className="sr-only"> (Popular)</span>}
                </h3>
                <p className="font-sans text-[0.6875rem] font-bold leading-[1.4] tracking-[0.025rem] text-[#828282]">
                  {c.label}
                </p>
              </div>

              {/* body */}
              <div className="flex flex-col gap-8 rounded-[1rem] bg-white p-6">
                <p
                  className={`font-sans text-[1rem] leading-[1.5] ${
                    c.emphasised ? "text-[#828282]" : "text-[#6b6c71]"
                  }`}
                >
                  {c.desc}
                </p>
                <ul className="flex flex-col gap-3 pb-2">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5">
                      <Check />
                      <span className="font-sans text-[0.9375rem] leading-[1.2] text-[#16171b]">{p}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={c.href}
                  className={`inline-flex h-[2.75rem] w-full items-center justify-center rounded-[100px] px-[1.375rem] font-sans text-button-primary uppercase transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                    c.emphasised
                      ? "bg-[#111111] text-white hover:bg-[#2b2b2b]"
                      : "bg-[#f2f2f2] text-ink hover:bg-[#e6e6e6]"
                  }`}
                >
                  <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">{c.cta}</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
