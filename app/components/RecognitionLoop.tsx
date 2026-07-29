/* Recognition · "THE LOOP" (Figma /recognition 312:5259). A sticky left intro +
   pull-quote beside a numbered 01–04 timeline of step cards (each: a grey tray
   holding a placeholder visual + title, then a white detail sub-card). Mirrors
   the /swag Paperchase timeline pattern. The scroll card-stacking in Figma is
   deferred (motion to confirm) — cards render as a static timeline. Accent
   (text-swag-green-deep) inherits the page's lilac --color-swag-* override. */

const STEPS = [
  {
    n: "01",
    title: "Recognize, where work happens",
    desc: "A teammate gives kudos in Slack. Kudos become points, which recipients can redeem for rewards. Rewards arrive, and someone else earns the next one.",
  },
  {
    n: "02",
    title: "Recipients choose what they love",
    desc: "Recipients redeem points for rewards they'll enjoy, from branded swag and snack boxes to premium gifts and experiences.",
  },
  {
    n: "03",
    title: "We handle the logistics",
    desc: "Every reward is picked, packed, and delivered through Stadium's global fulfillment network in 170+ countries, with tracking included.",
  },
  {
    n: "04",
    title: "Every moment becomes insight",
    desc: "Track participation, redemption, and recognition trends. HR sees what people value, while Finance sees where budgets deliver impact.",
  },
];

function PlaceholderVisual() {
  return (
    <div className="flex aspect-[478/269] w-full items-center justify-center overflow-hidden rounded-2xl bg-grey-100">
      <svg
        className="size-10 text-grey-300"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
    </div>
  );
}

export default function RecognitionLoop() {
  return (
    <section className="bg-white px-section-x-sm pb-20 pt-2 md:px-section-x-md md:pb-24 lg:px-section-x-lg lg:pb-[10rem]">
      <div className="mx-auto grid w-full max-w-content grid-cols-1 gap-12 lg:grid-cols-[minmax(0,30.75rem)_1fr] lg:gap-20">
        {/* left intro + pull-quote (sticky on desktop) */}
        <div className="flex flex-col gap-12 lg:sticky lg:top-28 lg:gap-[7.5rem] lg:self-start">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p
                data-animation="reveal"
                className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.045rem] text-swag-green-deep"
              >
                THE LOOP
              </p>
              <h2
                data-animation="reveal"
                className="font-display text-[1.75rem] leading-[1.1] tracking-[-0.01rem] text-swag-ink md:text-[2.25rem]"
              >
                From kudos to a
                <br />
                reward, delivered
              </h2>
            </div>
            <p
              data-animation="reveal"
              className="font-sans text-[1.125rem] leading-[1.45] text-[#707075]"
            >
              A teammate gives kudos in Slack. Kudos become points, which
              recipients can redeem for rewards. Rewards arrive, and someone else
              earns the next one.
            </p>
          </div>
          <div data-animation="reveal" className="flex flex-col gap-[3.75rem]">
            <span
              className="font-display text-[4rem] leading-[0.6] text-grey-300"
              aria-hidden
            >
              &ldquo;
            </span>
            <div className="flex flex-col gap-6">
              <p className="font-[family-name:var(--font-satoshi-medium)] text-[1.5625rem] leading-[1.3] tracking-[-0.01875rem] text-swag-ink">
                We were juggling nine swag vendors, and marketing was stuck
                managing logistics. Now the program runs itself, and our vendor
                list is just one.
              </p>
              <p className="font-sans text-[0.9375rem] leading-[1.5] text-swag-grey">
                Nish Patel · CEO, Paperchase
              </p>
            </div>
          </div>
        </div>

        {/* right: numbered 01–04 timeline of step cards */}
        <div className="relative flex flex-col gap-8">
          <div
            aria-hidden
            className="absolute bottom-10 left-[2.8125rem] top-10 hidden w-px border-l border-dashed border-grey-300 sm:block"
          />
          {STEPS.map((s) => (
            <div
              key={s.n}
              data-animation="reveal"
              className="flex flex-col gap-3 sm:flex-row sm:gap-6"
            >
              <div className="relative z-10 sm:w-[5.625rem] sm:shrink-0 sm:pt-5">
                <span className="flex w-fit items-center justify-center rounded-full bg-[#f2f2f2] px-3.5 py-2 font-sans text-[0.875rem] font-semibold text-[#212624] sm:w-full">
                  {s.n}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2.5 rounded-3xl bg-[#f2f2f2] p-2.5">
                <div className="flex flex-col gap-6 px-7 pb-2 pt-5">
                  <PlaceholderVisual />
                  <h3 className="font-display text-[1.75rem] leading-[1.04] tracking-[-0.0375rem] text-swag-ink">
                    {s.title}
                  </h3>
                </div>
                <div className="rounded-2xl bg-white px-7 pb-[1.875rem] pt-7 shadow-[0_0.1875rem_0.375rem_rgba(0,0,0,0.06)]">
                  <p className="font-sans text-[1.125rem] leading-[1.45] text-[#707075]">
                    {s.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
