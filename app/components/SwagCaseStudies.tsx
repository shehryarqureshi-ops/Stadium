/* Case studies — Figma /swag 602:677 ("Teams that ended the swag chaos"). A
   centered header over three testimonial cards: a photo, a Satoshi-bold pull-
   quote, and the company. 3-up desktop → stacked mobile. */

export type SwagCaseStudiesContent = {
  heading: string;
  body: string;
  quotes: {
    /** Image src string (public asset path, e.g. "/swag/swag-impact.jpg"),
        rendered via a raw <img> — not a next/image static import. */
    image: string;
    quote: string;
    company: string;
  }[];
};

export const SWAG_CASESTUDIES: SwagCaseStudiesContent = {
  heading: "Teams that ended the swag chaos",
  body: "Real results that answer the question that matters: can Stadium handle a team like mine?",
  quotes: [
    {
      image: "/swag/swag-impact.jpg",
      quote:
        "Letting employees pick what they actually want made it something people look forward to.",
      company: "ConstructConnect",
    },
    {
      image: "/swag/swag-impact.jpg",
      quote:
        "On-demand is the killer feature–no inventory we don’t need or can’t use.",
      company: "Kentro",
    },
    {
      image: "/swag/swag-impact.jpg",
      quote:
        "Before Stadium, including every global employee felt impossible. Now we reach everyone.",
      company: "Workato",
    },
  ],
};

export default function SwagCaseStudies({
  content = SWAG_CASESTUDIES,
}: {
  content?: SwagCaseStudiesContent;
}) {
  return (
    <section className="bg-white px-section-x-sm py-20 md:px-section-x-md md:py-24 lg:px-section-x-lg lg:py-28">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        <div className="flex max-w-[53.75rem] flex-col items-center gap-5 text-center">
          <h2
            data-animation="reveal"
            className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem] lg:text-[2.75rem]"
          >
            {content.heading}
          </h2>
          <p
            data-animation="reveal"
            className="font-sans text-body-md leading-[1.48] text-swag-grey lg:text-[1.125rem]"
          >
            {content.body}
          </p>
        </div>

        <div
          data-animation="reveal"
          className="grid w-full grid-cols-1 gap-6 md:grid-cols-3"
        >
          {content.quotes.map((q, i) => (
            <article key={i} className="flex flex-col gap-6">
              <div className="overflow-hidden rounded-2xl border border-[#f5f5f5]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={q.image}
                  alt=""
                  aria-hidden
                  className="aspect-[384/272] w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-display text-[1.25rem] leading-[1.04] tracking-[-0.01875rem] text-swag-ink">
                  &ldquo;{q.quote}&rdquo;
                </p>
                <p className="font-sans text-[0.9375rem] leading-[1.5] text-swag-grey">
                  {q.company}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
