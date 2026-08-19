/* /recognition · BUILT FOR SIGN-OFF (Figma n9SjmDjzB1PeZAYJ5w43fr → 2504:8531
   "Committee", page frame 2504:6746, rev 2026-08-19). "Win over every
   stakeholder" — a centered 880-wide header over an 880-wide #f2f2f2 tray
   holding a 2×2 grid of white stakeholder cards. Unlike /swag's committee
   (photo cards) these cards are CENTERED: a 128×128 greyscale 3-D icon
   (Figma svgAssets, shipped as SVG) over a centered title + one-line pitch.
   Card 1 additionally carries an absolutely-positioned dark "Primary" pill.

   Figma stack (1440, y relative to the section frame at abs 8177.5; the frame
   is 1196 tall = 160 internal top + 876 content + 160 internal bottom → the
   section renders lg:py-20 so the VISIBLE gap to both neighbours is still
   160 once they contribute their own 80):
     [internal pt 160]
     header frame  y=160  h=120  (880 wide, gap 20)
       eyebrow     y=0    h=17   (12 Overpass Bold / 1.4, tracking 1.6, #8d12e7)
       gap 8
       title       y=25   h=48   (44 Satoshi Bold / 1.08 / -0.5, #16171b)
       gap 20
       subhead     y=93   h=27   (18 Overpass / 1.48, #6b6c71)
     gap 40
     grid          y=320  h=716  (880 wide, r24 #f2f2f2, p10 gap10, 2 cols)
       card 425×343 · r12 · shadow 0 3 6 rgba(0,0,0,.06)
            px32 pt60 pb45 gap24 items-center
            icon 128×128 · text block gap14 (title 25/1.04/-0.3 h26,
            desc 15/1.5 h46) · "Primary" pill top 30.5 right 30
     content end   y=1036
     [internal pb 160] → 1196 */

/* eslint-disable @next/next/no-img-element -- SVG assets: next/image needs
   dangerouslyAllowSVG, which the project does not enable. */

type Card = {
  icon: string;
  title: string;
  desc: string;
  primary?: boolean;
};

const CARDS: Card[] = [
  {
    icon: "/recog2/rc-committee-hr.svg",
    title: "HR & People Ops",
    desc: "Kudos tied to company values, with visibility into who’s recognized.",
    primary: true,
  },
  {
    icon: "/recog2/rc-committee-leadership.svg",
    title: "Leadership",
    desc: "Recognition that reinforces your values and helps build culture.",
  },
  {
    icon: "/recog2/rc-committee-it.svg",
    title: "IT & Security",
    desc: "Enterprise-ready with SSO, SCIM, SOC 2, and HRIS integrations.",
  },
  {
    icon: "/recog2/rc-committee-finance.svg",
    title: "Finance",
    desc: "Predictable budgets, controlled spend, and clear reporting.",
  },
];

export default function RecogCommittee() {
  return (
    <section
      aria-labelledby="recog-committee-title"
      className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-20"
    >
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-8 lg:gap-10">
        {/* header — 880 wide, centered */}
        <div className="flex w-full max-w-[55rem] flex-col items-center gap-5 text-center">
          <div className="flex w-full flex-col items-center gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#8d12e7]"
            >
              Built for sign-off
            </p>
            <h2
              id="recog-committee-title"
              data-animation="reveal"
              className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
            >
              Win over every stakeholder
            </h2>
          </div>
          <p
            data-animation="reveal"
            className="font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]"
          >
            Recognition touches every team. Here’s what each stakeholder wants
            to know.
          </p>
        </div>

        {/* grey tray — 880 wide, 2×2 cards (p10 / gap10) */}
        <div
          data-animation="reveal"
          data-reveal-stagger="90"
          className="grid w-full max-w-[55rem] grid-cols-1 gap-2.5 rounded-[1.5rem] bg-[#f2f2f2] p-2.5 md:grid-cols-2"
        >
          {CARDS.map((c) => (
            <article
              key={c.title}
              data-animation="reveal"
              className="relative flex flex-col items-center gap-6 overflow-hidden rounded-[0.75rem] bg-white px-6 pb-10 pt-12 text-center shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)] md:px-8 md:pb-[2.8125rem] md:pt-[3.75rem]"
            >
              <img
                src={c.icon}
                alt=""
                aria-hidden
                width={128}
                height={128}
                className="size-24 shrink-0 select-none md:size-32"
              />
              <div className="flex w-full flex-col gap-3.5">
                <h3 className="font-[family-name:var(--font-satoshi-medium)] text-[1.375rem] leading-[1.04] tracking-[-0.01875rem] text-[#16171b] md:text-[1.5625rem]">
                  {c.title}
                </h3>
                <p className="font-sans text-[0.9375rem] leading-[1.5] text-[#6b6c71]">
                  {c.desc}
                </p>
              </div>

              {c.primary ? (
                <span className="absolute right-6 top-6 inline-flex items-center justify-center rounded-[100px] bg-[#16171b] px-2 py-1 font-sans text-[0.6875rem] font-bold leading-[1.4] tracking-[0.025rem] text-white md:right-[1.875rem] md:top-[1.90625rem]">
                  Primary
                </span>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
