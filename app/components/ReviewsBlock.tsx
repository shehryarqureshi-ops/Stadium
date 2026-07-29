/* Reusable reviews / testimonials block — sticky left heading + G2 rating +
   pull-quote, with review cards on the right (Figma /snacks closing 668:2990,
   /events 608:5038). Content-driven; accent inherits the page's --color-swag-*.
   (Distinct from the homepage's Testimonials.tsx.) */

export type ReviewsBlockContent = {
  heading: string;
  ratingValue: string;
  /** e.g. "4.8 on G2 · 1,515 reviews" */
  rating: string;
  pullQuote: string;
  pullAttribution: string;
  cards: { quote: string; who: string }[];
};

function Stars() {
  return (
    <div className="flex gap-0.5 text-[#ffb800]" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} className="size-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" />
        </svg>
      ))}
    </div>
  );
}

function Thumb() {
  return (
    <div className="flex h-full w-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-grey-200">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/swag/swag-workflow.jpg"
        alt=""
        aria-hidden
        className="size-full object-cover"
      />
    </div>
  );
}

export default function ReviewsBlock({
  content,
}: {
  content: ReviewsBlockContent;
}) {
  return (
    <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-24">
      <div className="mx-auto grid w-full max-w-content grid-cols-1 gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-16">
        {/* left — heading + rating + pull-quote (sticky on desktop) */}
        <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
          <h2
            data-animation="reveal"
            className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem]"
          >
            {content.heading}
          </h2>
          <div className="flex items-center gap-3">
            <span className="font-display text-[2rem] leading-none text-swag-ink">
              {content.ratingValue}
            </span>
            <div className="flex flex-col gap-1">
              <Stars />
              <span className="font-sans text-[0.8125rem] text-swag-grey">
                {content.rating}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <span
              className="font-display text-[4rem] leading-[0.6] text-grey-300"
              aria-hidden
            >
              &ldquo;
            </span>
            <p className="font-[family-name:var(--font-satoshi-medium)] text-[1.5625rem] leading-[1.3] tracking-[-0.01875rem] text-swag-ink">
              {content.pullQuote}
            </p>
            <p className="font-sans text-[0.9375rem] leading-[1.5] text-swag-grey">
              {content.pullAttribution}
            </p>
          </div>
        </div>

        {/* right — review cards */}
        <div className="flex flex-col gap-4">
          {content.cards.map((c) => (
            <div
              key={c.quote}
              data-animation="reveal"
              className="flex gap-6 rounded-3xl bg-[#f2f2f2] p-6"
            >
              <Thumb />
              <div className="flex flex-col justify-center gap-3">
                <p className="font-[family-name:var(--font-satoshi-medium)] text-[1.125rem] leading-[1.35] text-swag-ink">
                  {c.quote}
                </p>
                <p className="font-sans text-[0.875rem] leading-[1.5] text-swag-grey">
                  {c.who}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
