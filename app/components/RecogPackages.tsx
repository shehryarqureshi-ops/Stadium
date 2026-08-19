/* /recognition · STADIUM PACKAGES → pricing (Figma n9SjmDjzB1PeZAYJ5w43fr →
   2504:8638 "Packages → pricing", inside page frame 2504:6746). Same idiom as
   SwagmagicPackages.tsx: an intro column (eyebrow / 2-line title / subhead with
   a black SEE FULL PRICING pill pinned to the bottom) beside a #f2f2f2 tray of
   four numbered white "Pass" cards, 2×2. Card 03 (Engagement) carries Figma's
   4-layer "grid-card-active-shadow" plus the purple Popular pill. Unlike /swag
   the outer container here is WHITE (rounded-60 on white → invisible), so the
   only tinted surface is the card tray.

   Container maths: Figma draws a 1240 container at x=100 with px-100, i.e. the
   inner row runs 200…1240 at 1440. The site's content box is 1200 (x=120), so
   an 80px inner padding lands the row on exactly the same absolute pixels —
   405 text + 40 gap + 595 tray, cards 273.5 wide, all identical to Figma.

   Figma stack (y relative to the section frame at abs 10058.5, h 779; the frame
   carries its OWN 160 top + 160 bottom padding — rendered as lg:py-20 (80) so
   the visible gap to CaseStudies above (content-tight, its own lg:py-20) and to
   RecogContact below (lg:pt-20) stays the site's 160):
     frame pt 160
     row            y=160  h=459   (items-center, gap 40)
       text col     y=160  h=459   (405 wide, justify-between)
         eyebrow    y=160  h=15    (12 Overpass SemiBold, #6b33db, +0.72)
         gap 8
         title      y=183  h=96    (44 Satoshi Bold / 1.08 / -0.5, 2 lines)
         gap 20
         subhead    y=299  h=79    (18 Overpass / 26.1, #707075, w 399)
         slack 203  (justify-between)
         CTA pill   y=581  h=38    (black, r100, px 22, 12/600 +1.16 uppercase)
       tray         y=160  h=459   (595 wide, #f2f2f2, r32, p16, gap 16)
         card 01    y=176  h=217   (3-line desc)  card 02 y=176 h=194
         card 03    y=409  h=194   (Popular)      card 04 y=409 h=194
     frame pb 160
     frame end 10837.5 → the "closing" wrapper (RecogContact) starts here. */

const PASSES: { n: string; title: string; desc: string; popular?: boolean }[] = [
  {
    n: "01",
    title: "Shops Pass",
    desc: "Branded stores, on-demand, and 25,000+ items in the catalog. and the full catalog.",
  },
  { n: "02", title: "Swag Pass", desc: "Plus warehousing, inventory, and kits." },
  {
    n: "03",
    title: "Engagement Pass",
    desc: "+ Automation, integrations, and recognition.",
    popular: true,
  },
  { n: "04", title: "Enterprise Pass", desc: "Plus SSO, API, net terms, and a dedicated CSM." },
];

const CARD_SHADOW = "shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]";
/* Figma "grid-card-active-shadow" (4 layers) — the elevated Popular card */
const CARD_SHADOW_ACTIVE =
  "shadow-[0px_20px_20px_-2px_rgba(0,0,0,0.15),0px_6.383px_6.383px_-1.5px_rgba(0,0,0,0.12),0px_2.415px_2.415px_-1px_rgba(0,0,0,0.11),0px_0.796px_0.796px_-0.5px_rgba(0,0,0,0.1)]";

export default function RecogPackages() {
  return (
    <section
      aria-labelledby="recog-packages-title"
      className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-20"
    >
      <div className="mx-auto w-full max-w-content">
        <div className="flex flex-col gap-10 xl:flex-row xl:items-stretch xl:gap-10 xl:px-20">
          {/* left — intro + CTA (bottom-aligned with the tray on desktop) */}
          <div className="flex flex-col gap-8 xl:w-[25.3125rem] xl:shrink-0 xl:justify-between xl:gap-0">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <p
                  data-animation="reveal"
                  className="font-sans text-[0.75rem] font-semibold uppercase leading-[1.25] tracking-[0.045rem] text-[#6b33db]"
                >
                  Stadium packages
                </p>
                <h2
                  id="recog-packages-title"
                  data-animation="reveal"
                  className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
                >
                  Simple pricing,
                  <br className="hidden xl:inline" /> per person
                </h2>
              </div>
              <p
                data-animation="reveal"
                className="max-w-[24.9375rem] font-sans text-[1.0625rem] leading-[1.45] text-[#707075] lg:text-[1.125rem]"
              >
                Start with kudos, then add rewards, automations, and analytics when you&#39;re ready. You only pay for
                active people.
              </p>
            </div>
            <a
              href="#"
              data-animation="reveal"
              className="inline-flex h-button-h w-fit items-center justify-center rounded-[100px] bg-black px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-[#2a2a2a] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">See full pricing</span>
            </a>
          </div>

          {/* right — 2×2 tray of pass cards */}
          <ul
            data-animation="reveal"
            data-reveal-stagger="90"
            className="grid min-w-0 flex-1 grid-cols-1 items-start gap-4 rounded-[2rem] bg-[#f2f2f2] p-4 sm:grid-cols-2"
          >
            {PASSES.map((p) => (
              <li
                key={p.n}
                data-animation="reveal"
                className={`relative flex flex-col gap-10 rounded-[1.5rem] bg-white p-6 ${
                  p.popular ? CARD_SHADOW_ACTIVE : CARD_SHADOW
                }`}
              >
                <p className="font-sans text-[1rem] leading-[1.25] tracking-[0.025rem] text-[#828282]">{p.n}</p>
                <div className="flex flex-col gap-3.5">
                  <h3 className="font-[family-name:var(--font-satoshi)] text-[1.5625rem] font-bold leading-[1.04] tracking-[-0.01875rem] text-[#16171b]">
                    {p.title}
                  </h3>
                  <p className="font-sans text-[0.9375rem] leading-[1.5] text-[#6b6c71]">{p.desc}</p>
                </div>
                {p.popular && (
                  <span className="absolute right-[1.21875rem] top-5 rounded-[100px] bg-[#6b33db] px-3 pb-[0.1875rem] pt-1 font-sans text-[0.75rem] font-bold leading-[1.4] tracking-[0.025rem] text-white">
                    Popular
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
