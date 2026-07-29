/* Packages → pricing — Figma /swag 2:25395 ("Start with swag and expand when
   ready"). A light #f7f7f7 card split left/right: intro + green "Explore
   pricing" CTA on the left, a #f2f2f2 tray of four progressive "Pass" cards on
   the right (Shops → Swag → Engagement [Popular, elevated] → Enterprise). */

export type SwagPricingContent = {
  eyebrow: string;
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  popularLabel: string;
  passes: {
    n: string;
    title: string;
    desc: string;
    popular?: boolean;
  }[];
};

export const SWAG_PRICING: SwagPricingContent = {
  eyebrow: "STADIUM PACKAGES",
  heading: "Start with swag and expand when ready",
  body: "Add new capabilities over time without changing platforms.",
  ctaLabel: "Explore pricing",
  ctaHref: "#",
  popularLabel: "Popular",
  passes: [
    { n: "01", title: "Shops Pass", desc: "Branded stores, on-demand, and the full catalog." },
    { n: "02", title: "Swag Pass", desc: "+ Warehousing, inventory, and kits." },
    { n: "03", title: "Engagement Pass", desc: "+ Automation, integrations, and recognition.", popular: true },
    { n: "04", title: "Enterprise Pass", desc: "+ SSO, API, net terms, and a dedicated CSM." },
  ],
};

export default function SwagPricing({ content = SWAG_PRICING }: { content?: SwagPricingContent }) {
  return (
    <section className="bg-white px-section-x-sm py-12 md:px-section-x-md md:py-16 lg:px-section-x-lg lg:py-20">
      <div className="mx-auto w-full max-w-content">
        <div className="flex flex-col gap-10 rounded-[3.75rem] bg-[#f7f7f7] px-6 py-12 md:px-12 md:py-16 lg:flex-row lg:items-stretch lg:gap-10 lg:px-24 lg:py-24">
          {/* left — intro + CTA */}
          <div className="flex flex-col gap-8 lg:w-[25.3125rem] lg:shrink-0 lg:justify-between">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <p
                  data-animation="reveal"
                  className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.045rem] text-swag-green-alt"
                >
                  {content.eyebrow}
                </p>
                <h2
                  data-animation="reveal"
                  className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem] lg:text-[2.75rem]"
                >
                  {content.heading}
                </h2>
              </div>
              <p
                data-animation="reveal"
                className="font-sans text-body-md leading-[1.45] text-[#707075] lg:text-[1.125rem]"
              >
                {content.body}
              </p>
            </div>
            <a
              href={content.ctaHref}
              className="inline-flex h-11 w-fit items-center justify-center rounded-full bg-swag-ink px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-black active:scale-[0.98] focus-visible:outline-ink"
            >
              <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                {content.ctaLabel}
              </span>
            </a>
          </div>

          {/* right — pass cards tray */}
          <div className="grid flex-1 grid-cols-1 gap-4 rounded-[2rem] bg-[#f2f2f2] p-4 sm:grid-cols-2">
            {content.passes.map((p) => (
              <div
                key={p.title}
                className={`relative flex flex-col gap-10 rounded-3xl bg-white p-6 ${
                  p.popular
                    ? "shadow-[0_1.25rem_1.25rem_-0.125rem_rgba(0,0,0,0.15),0_0.375rem_0.375rem_-0.0625rem_rgba(0,0,0,0.11)]"
                    : "shadow-[0_0.1875rem_0.375rem_rgba(0,0,0,0.06)]"
                }`}
              >
                {p.popular && (
                  <span className="absolute right-5 top-5 rounded-full bg-swag-green-deep px-3 pb-[0.1875rem] pt-1 font-sans text-[0.75rem] font-bold tracking-[0.025rem] text-white">
                    {content.popularLabel}
                  </span>
                )}
                <p className="font-sans text-[1rem] tracking-[0.025rem] text-[#828282]">
                  {p.n}
                </p>
                <div className="flex flex-col gap-3.5">
                  <h3 className="font-display text-[1.5625rem] leading-[1.04] tracking-[-0.01875rem] text-swag-ink">
                    {p.title}
                  </h3>
                  <p className="font-sans text-[0.9375rem] leading-[1.5] text-swag-grey">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
