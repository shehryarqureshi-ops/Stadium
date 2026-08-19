/* /swag · STADIUM PASSES → pricing (Figma n9SjmDjzB1PeZAYJ5w43fr · 2500:5681
   "Packages → pricing" + the slim CTA banner 2500:5717 that opens the "closing"
   frame). A big #f7f7f7 rounded-60 panel: intro + green EXPLORE PRICING pill on
   the left, a #f2f2f2 tray of four progressive white "Pass" cards on the right
   (Shops → Swag → Engagement [Popular, elevated] → Enterprise). 160 below it, the
   slim banner repeats the headline with the same pill on the right.

   Figma stack (absolute y at 1440, section frame starts at 11483):
     panel            y=0     h=756   (px 100 · py 160 · row gap 40 · items-center)
       text col       y=160   h=436   (405 wide; eyebrow 15 → 8 → title 96 → 20 → subhead 53; CTA bottom-aligned)
       card tray      y=160   h=436   (595 wide; p 16, 2×2 cards 273.5×194, gap 16)
     gap                      160     (frame pb 160)
     cta banner       y=916   h=168   (p 60; title 48 / pill 44 top-aligned; closing frame 2500:5717 y=0..168)
   Live: lg:py-20 (80) top+bottom = 160 to the neighbours (Impact carries the
   other 80; Explore carries its own 80). Container = site 1200 (Figma 1240): the
   40 lost px come off the panel's side padding (100 → 80 at xl+) so the inner
   row (405 text + 40 + 595 tray → 273.5×194 cards) stays exactly Figma; the
   banner keeps p 60 and its title/pill row simply has 40 less slack. */

const PASSES: { n: string; title: string; desc: string; popular?: boolean }[] = [
  { n: "01", title: "Shops Pass", desc: "Branded stores, on-demand, and the full catalog." },
  { n: "02", title: "Swag Pass", desc: "+ Warehousing, inventory, and kits." },
  { n: "03", title: "Engagement Pass", desc: "+ Automation, integrations, and recognition.", popular: true },
  { n: "04", title: "Enterprise Pass", desc: "+ SSO, API, net terms, and a dedicated CSM." },
];

const HEADLINE = "Start with swag and expand when ready";

const CTA =
  "inline-flex h-button-h w-fit items-center justify-center rounded-[100px] bg-[#218554] px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-[#1c7448] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#218554]";

const CARD_SHADOW = "shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]";
/* Figma "grid-card-active-shadow" (4 layers) — the elevated Popular card */
const CARD_SHADOW_ACTIVE =
  "shadow-[0px_20px_20px_-2px_rgba(0,0,0,0.15),0px_6.383px_6.383px_-1.5px_rgba(0,0,0,0.12),0px_2.415px_2.415px_-1px_rgba(0,0,0,0.11),0px_0.796px_0.796px_-0.5px_rgba(0,0,0,0.1)]";

export default function SwagmagicPackages() {
  return (
    <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-20">
      <div className="mx-auto flex w-full max-w-content flex-col gap-16 md:gap-24 lg:gap-40">
        {/* ── the passes panel ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-10 rounded-[2rem] bg-[#f7f7f7] px-5 py-10 md:rounded-[3.75rem] md:px-12 md:py-16 lg:px-[3.75rem] lg:py-20 xl:flex-row xl:items-center xl:gap-10 xl:px-20 xl:py-[10rem]">
          {/* left — intro + CTA (bottom-aligned with the tray on desktop) */}
          <div className="flex flex-col gap-8 xl:w-[25.3125rem] xl:shrink-0 xl:self-stretch xl:justify-between">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <p
                  data-animation="reveal"
                  className="font-sans text-[0.75rem] font-semibold uppercase leading-[1.25] tracking-[0.045rem] text-[#218554]"
                >
                  Stadium passes
                </p>
                <h2
                  data-animation="reveal"
                  className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
                >
                  {HEADLINE}
                </h2>
              </div>
              <p
                data-animation="reveal"
                className="max-w-[24.9375rem] font-sans text-[1.0625rem] leading-[1.45] text-[#707075] lg:text-[1.125rem]"
              >
                Add new capabilities over time without changing platforms.
              </p>
            </div>
            <a href="#" data-animation="reveal" className={CTA}>
              <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">Explore pricing</span>
            </a>
          </div>

          {/* right — 2×2 tray of pass cards */}
          <ul
            data-animation="reveal"
            data-reveal-stagger="90"
            className="grid min-w-0 flex-1 grid-cols-1 gap-4 rounded-[2rem] bg-[#f2f2f2] p-4 sm:grid-cols-2"
          >
            {PASSES.map((p) => (
              <li
                key={p.n}
                data-animation="reveal"
                className={`relative flex flex-col gap-10 rounded-[1.5rem] bg-white p-6 ${p.popular ? CARD_SHADOW_ACTIVE : CARD_SHADOW}`}
              >
                <p className="font-sans text-[1rem] leading-[1.25] tracking-[0.025rem] text-[#828282]">{p.n}</p>
                <div className="flex flex-col gap-3.5">
                  <h3 className="font-[family-name:var(--font-satoshi)] text-[1.5625rem] font-bold leading-[1.04] tracking-[-0.01875rem] text-[#16171b]">
                    {p.title}
                  </h3>
                  <p className="font-sans text-[0.9375rem] leading-[1.5] text-[#6b6c71]">{p.desc}</p>
                </div>
                {p.popular && (
                  <span className="absolute right-[1.21875rem] top-5 rounded-[100px] bg-[#10995a] px-3 pb-[0.1875rem] pt-1 font-sans text-[0.75rem] font-bold leading-[1.4] tracking-[0.025rem] text-white">
                    Popular
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* ── slim CTA banner (Figma closing › cta 2500:5717) ────────────── */}
        <div
          data-animation="reveal"
          className="flex flex-col items-start gap-6 rounded-[2rem] bg-[#f7f7f7] p-6 md:flex-row md:justify-between md:gap-10 md:rounded-[3.75rem] md:p-10 lg:p-[3.75rem]"
        >
          <p className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]">
            {HEADLINE}
          </p>
          <a href="#" className={`${CTA} shrink-0`}>
            <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">Explore pricing</span>
          </a>
        </div>
      </div>
    </section>
  );
}
