/* Packages → pricing — Figma /swag 2:25395 ("Start with swag. Grow into the
   rest."). A grey container: intro + CTA + image on top, then a row of four
   progressive "Pass" cards (Shops → Swag → Engagement [Popular] → Enterprise).
   4-up desktop, 2-up tablet, stacked mobile. */

const PASSES = [
  { n: "01", title: "Shops Pass", desc: "Branded stores, on-demand, and the full catalog." },
  { n: "02", title: "Swag Pass", desc: "+ Warehousing, inventory, and kits." },
  { n: "03", title: "Engagement Pass", desc: "+ Automation, integrations, and recognition.", popular: true },
  { n: "04", title: "Enterprise Pass", desc: "+ SSO, API, net terms, and a dedicated CSM." },
];

export default function SwagPricing() {
  return (
    <section className="bg-white px-section-x-sm py-20 md:px-section-x-md md:py-24 lg:px-section-x-lg lg:py-28">
      <div className="mx-auto w-full max-w-content">
        <div className="flex flex-col gap-2.5 rounded-3xl bg-[#f2f2f2] p-2.5">
          {/* intro + image */}
          <div className="flex flex-col items-stretch gap-2.5 lg:flex-row">
            <div className="flex flex-1 flex-col justify-between gap-8 p-8 lg:p-[3.375rem]">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <p
                    data-animation="reveal"
                    className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-[#828282] md:text-eyebrow-md"
                  >
                    STADIUM PACKAGES
                  </p>
                  <h2
                    data-animation="reveal"
                    className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem] lg:text-[2.5rem]"
                  >
                    Start with swag.
                    <br />
                    Grow into the rest.
                  </h2>
                </div>
                <p
                  data-animation="reveal"
                  className="font-sans text-body-md leading-[1.4] tracking-[0.025rem] text-[#828282] lg:text-[1.125rem]"
                >
                  Not a swag vendor — the platform your team runs all year. Start
                  with stores. Add automation and recognition when you&rsquo;re
                  ready.
                </p>
              </div>
              <a
                href="#"
                className="inline-flex h-12 w-fit items-center justify-center rounded-full bg-black px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-swag-ink active:scale-[0.98] focus-visible:outline-ink"
              >
                <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                  Explore pricing
                </span>
              </a>
            </div>
            <div className="flex-1 overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/swag/swag-pricing.jpg"
                alt="A team unpacking branded swag"
                className="aspect-[2000/1400] w-full object-cover lg:h-full"
              />
            </div>
          </div>

          {/* pass cards */}
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {PASSES.map((p) => (
              <div
                key={p.title}
                className="relative flex min-h-[14.625rem] flex-col justify-between gap-12 rounded-xl bg-white px-7 pb-[1.875rem] pt-7 shadow-[0_0.1875rem_0.375rem_rgba(0,0,0,0.06)]"
              >
                {p.popular && (
                  <span className="absolute right-5 top-5 rounded-full bg-swag-ink px-2 py-1 font-sans text-[0.6875rem] font-bold tracking-[0.025rem] text-white">
                    Popular
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
