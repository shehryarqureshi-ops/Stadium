/* /recognition · THE PROBLEM (Figma n9SjmDjzB1PeZAYJ5w43fr → card 2504:6882 /
   2504:6883, content 2504:6884, tray 2504:6890 + the following "divider"
   section 2504:6912). A white rounded-16 card (1240 in Figma → the site's 1200
   content width) that scrolls OVER the hero raster (RecogHero paints its bg
   934px past its own bottom; this section is transparent + z-10). Header
   (eyebrow #8d12e7 → 44px Satoshi title → 18px subhead, 860 max) → 40 → a
   #f2f2f2 rounded-24 tray (p10, gap10) with three white rounded-12 cards, each
   a 46px #8d12e7 icon badge (lucide shuffle / package / earth, white stroke 2)
   → 80 → title 21 + desc 15. The card carries its own 160 bottom padding, so
   the 2px #f2f2f2 divider line sits flush on the card's bottom edge (Figma
   puts it at y=1692 with 0 gap, unlike /swag's 160); the section then supplies
   80 of the 160 below it and the next section supplies the other 80.

   Figma stack (absolute y at 1440):
     785       RecogHero section ends → 60 (this section's lg:pt)
     845       card top (rounded 16, pt 160, px 80, pb 160)
     1005      eyebrow 12/1.4 (17)        → 8
     1030      h2 44/1.08 ×2 (96)         → 20
     1146      subhead 18/1.48 ×2 (54)    → 40
     1240      tray p10 gap10 (292): cards 346.67×272
     1532      tray ends → card pb 160
     1692      card ends; 2px #f2f2f2 divider line, flush (x 100..1340 → 1200)
     1854      next section. Figma's divider frame carries a FULL 160 below the
                    rule and RecogSolution then adds its own 40, so this section
                    owns the whole 160 (lg:pb-40) — it is NOT the usual 80/80. */

import type { ReactNode } from "react";

/* lucide 24px icons, exact paths from Figma's svgAssets (2504:6893 shuffle,
   2504:6900 package, 2504:6907 earth) — white stroke 2, round caps/joins. */
function LucideIcon({ path }: { path: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="size-6"
    >
      <path
        d={path}
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const SHUFFLE =
  "M18 22L22 18L18 14M22 18H15.959C15.3036 17.9933 14.6598 17.8257 14.0844 17.5118C13.509 17.1979 13.0195 16.7474 12.659 16.2L12.3 15.75M18 10L22 6L18 2M22 6L16.027 6C15.3805 5.99558 14.7426 6.14794 14.1679 6.44401C13.5931 6.74008 13.0987 7.17105 12.727 7.7L7.273 16.3C6.90127 16.829 6.40687 17.2599 5.83215 17.556C5.25742 17.8521 4.61949 18.0044 3.973 18H2M2 6H3.972C4.71746 5.99481 5.44953 6.19805 6.08564 6.58678C6.72174 6.9755 7.23655 7.53426 7.572 8.2";
const PACKAGE =
  "M12 22V12M12 12L3.29 7M12 12L20.71 7M7.5 4.27L16.5 9.42M11 21.73C11.304 21.9055 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69752 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69752 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73Z";
const EARTH =
  "M21.54 15H17C16.4696 15 15.9609 15.2107 15.5858 15.5858C15.2107 15.9609 15 16.4696 15 17V21.54M7 3.34V5C7 5.79565 7.31607 6.55871 7.87868 7.12132C8.44129 7.68393 9.20435 8 10 8C10.5304 8 11.0391 8.21071 11.4142 8.58579C11.7893 8.96086 12 9.46957 12 10C12 11.1 12.9 12 14 12C14.5304 12 15.0391 11.7893 15.4142 11.4142C15.7893 11.0391 16 10.5304 16 10C16 8.9 16.9 8 18 8H21.17M11 21.95V18C11 17.4696 10.7893 16.9609 10.4142 16.5858C10.0391 16.2107 9.53043 16 9 16C8.46957 16 7.96086 15.7893 7.58579 15.4142C7.21071 15.0391 7 14.5304 7 14V13C7 12.4696 6.78929 11.9609 6.41421 11.5858C6.03914 11.2107 5.53043 11 5 11H2.05M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z";

const CARDS: { icon: ReactNode; title: string; desc: string }[] = [
  {
    icon: <LucideIcon path={SHUFFLE} />,
    title: "Points Go Unredeemed",
    desc: "Points accumulate in dashboards, and expire before they're ever used.",
  },
  {
    icon: <LucideIcon path={PACKAGE} />,
    title: "Rewards Feel Generic",
    desc: "Gift cards and points get forgotten fast, buried in an inbox or drawer.",
  },
  {
    icon: <LucideIcon path={EARTH} />,
    title: "Impact Stays Unclear",
    desc: "Without measurable impact, recognition becomes easy to cut.",
  },
];

export default function RecogProblem() {
  return (
    <section className="relative z-10 px-section-x-sm pb-16 pt-10 md:px-section-x-md md:pb-20 lg:px-section-x-lg lg:pb-40 lg:pt-[3.75rem]">
      <div className="mx-auto flex w-full max-w-content flex-col">
        {/* white card (2504:6883): rounded 16, px 80, pt 160, pb 160 */}
        <div className="flex w-full flex-col items-center rounded-[1rem] bg-white px-6 py-16 md:px-12 md:py-20 lg:px-20 lg:py-40">
          <div className="flex w-full max-w-[53.75rem] flex-col items-center gap-5 text-center">
            <div className="flex flex-col items-center gap-2">
              <p
                data-animation="reveal"
                className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#8d12e7]"
              >
                THE PROBLEM
              </p>
              <h2
                data-animation="reveal"
                className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
              >
                Employee recognition fades faster than it should
              </h2>
            </div>
            <p
              data-animation="reveal"
              data-reveal-delay="120"
              className="font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]"
            >
              You send recognition in seconds. People read it, react, and move
              on.
              <br className="hidden lg:inline" /> Without a tangible follow-up,
              the moment rarely lasts.
            </p>
          </div>

          {/* grey tray (2504:6890): p10, gap10, rounded 24; cards rounded 12 */}
          <div
            data-animation="reveal"
            data-reveal-stagger="90"
            className="mt-8 grid w-full grid-cols-1 gap-2.5 rounded-[1.5rem] bg-[#f2f2f2] p-2.5 md:grid-cols-3 lg:mt-10"
          >
            {CARDS.map((c) => (
              <article
                key={c.title}
                data-animation="reveal"
                className="flex flex-col items-start gap-10 overflow-hidden rounded-[0.75rem] bg-white px-6 pb-7 pt-6 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)] md:gap-16 lg:gap-20 lg:px-7 lg:pb-[1.875rem] lg:pt-7"
              >
                <span className="flex size-[2.875rem] shrink-0 items-center justify-center rounded-[0.625rem] bg-[#8d12e7]">
                  {c.icon}
                </span>
                <div className="flex w-full flex-col gap-5">
                  <h3 className="font-[family-name:var(--font-satoshi)] text-[1.3125rem] font-bold leading-[1.04] tracking-[-0.01875rem] text-[#16171b]">
                    {c.title}
                  </h3>
                  <p className="font-sans text-[0.9375rem] leading-[1.5] text-[#6b6c71]">
                    {c.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* divider (2504:6912): 2px #f2f2f2 line flush on the card's bottom
            edge, across the 1200 content width, then 80 (+ the next section's
            80 = 160) */}
        <div
          data-animation="reveal"
          className="h-[2px] w-full shrink-0 bg-[#f2f2f2]"
        />
      </div>
    </section>
  );
}
