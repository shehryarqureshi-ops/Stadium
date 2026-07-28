/* Case study · Paperchase — Figma /swag 2:25598 ("From nine swag vendors to
   one"). Two columns: a sticky intro + pull-quote on the left, a BEFORE /
   DURING / AFTER timeline on the right (each stage: a grey card with a photo
   and a white detail card of headline + dotted points). Stacks on mobile. */

const STAGES = [
  {
    tag: "BEFORE",
    dark: false,
    img: "/swag/swag-paperchase-1.jpg",
    title: "Nine vendors, one exhausted manager",
    points: ["9 swag vendors", "Inventory aging in a basement", "Marketing doing logistics"],
  },
  {
    tag: "DURING",
    dark: false,
    img: "/swag/swag-paperchase-2.jpg",
    title: "Migrated in 67 days",
    points: ["6 brand stores live", "0 programs paused", "One brand pack"],
  },
  {
    tag: "AFTER",
    dark: true,
    img: "/swag/swag-paperchase-3.jpg",
    title: "One platform, two admins",
    points: ["1 vendor, 1 invoice", "14-country program", "Marketing got their job back"],
  },
];

export default function SwagPaperchase() {
  return (
    <section className="bg-white px-section-x-sm py-20 md:px-section-x-md md:py-24 lg:px-section-x-lg lg:py-28">
      <div className="mx-auto grid w-full max-w-content grid-cols-1 gap-12 lg:grid-cols-[minmax(0,30.75rem)_1fr] lg:gap-20">
        {/* intro (sticky on desktop) */}
        <div className="flex flex-col gap-12 lg:sticky lg:top-28 lg:gap-[7.5rem] lg:self-start">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p
                data-animation="reveal"
                className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.045rem] text-[#218554]"
              >
                CASE STUDY
              </p>
              <h2
                data-animation="reveal"
                className="font-display text-[1.75rem] leading-[1.1] tracking-[-0.01rem] text-swag-ink md:text-[2.25rem]"
              >
                From nine
                <br />
                swag vendors to one
              </h2>
            </div>
            <p
              data-animation="reveal"
              className="font-sans text-[1.125rem] leading-[1.45] text-[#707075]"
            >
              How Paperchase simplified global swag and gave marketing its time
              back.
            </p>
          </div>
          <div data-animation="reveal" className="flex flex-col gap-[3.75rem]">
            <span className="font-display text-[4rem] leading-[0.6] text-grey-300" aria-hidden>
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

        {/* timeline */}
        <div className="relative flex flex-col gap-8">
          <div
            aria-hidden
            className="absolute bottom-10 left-[2.8125rem] top-10 hidden w-px border-l border-dashed border-grey-300 sm:block"
          />
          {STAGES.map((s) => (
            <div key={s.tag} data-animation="reveal" className="flex flex-col gap-3 sm:flex-row sm:gap-6">
              <div className="relative z-10 sm:w-[5.625rem] sm:shrink-0">
                <span
                  className={`flex w-fit items-center justify-center rounded-full px-3 py-1.5 font-sans text-[0.875rem] font-semibold sm:w-full ${
                    s.dark ? "bg-[#212624] text-white" : "bg-[#f2f2f2] text-[#212624]"
                  }`}
                >
                  {s.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2.5 rounded-3xl bg-[#f2f2f2] p-2.5">
                <div className="overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.img}
                    alt=""
                    aria-hidden
                    className="aspect-[478/269] w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-6 rounded-2xl bg-white px-7 pb-[1.875rem] pt-7 shadow-[0_0.1875rem_0.375rem_rgba(0,0,0,0.06)]">
                  <h3 className="font-display text-[1.5rem] leading-[1.04] tracking-[-0.0375rem] text-swag-ink">
                    {s.title}
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5">
                        <span className="size-2 shrink-0 rounded-full bg-grey-300" aria-hidden />
                        <span className="font-sans text-[0.9375rem] leading-[1.4] text-swag-ink">
                          {p}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
