/* Case study · Paperchase — Figma /swag 2:25598 ("From nine swag vendors to
   one"). Two columns: a sticky intro + pull-quote on the left, a BEFORE /
   DURING / AFTER timeline of three cards on the right (each: image + headline +
   checklist). Stacks on mobile. */

function Check() {
  return (
    <svg className="mt-0.5 size-3.5 shrink-0 text-swag-green-deep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

const STAGES = [
  { tag: "BEFORE", dark: false, title: "Nine vendors, one exhausted manager", points: ["9 swag vendors", "Inventory aging in a basement", "Marketing doing logistics"] },
  { tag: "DURING", dark: false, title: "Migrated in 67 days", points: ["6 brand stores live", "0 programs paused", "One brand pack"] },
  { tag: "AFTER", dark: true, title: "One platform, two admins", points: ["1 vendor, 1 invoice", "14-country program", "Marketing got their job back"] },
];

export default function SwagPaperchase() {
  return (
    <section className="bg-white px-section-x-sm py-20 md:px-section-x-md md:py-24 lg:px-section-x-lg lg:py-28">
      <div className="mx-auto grid w-full max-w-content grid-cols-1 gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
        {/* intro (sticky on desktop) */}
        <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
          <div className="flex flex-col gap-3">
            <p
              data-animation="reveal"
              className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-swag-green-deep md:text-eyebrow-md"
            >
              CASE STUDY
            </p>
            <h2
              data-animation="reveal"
              className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem]"
            >
              From nine
              <br />
              swag vendors to one
            </h2>
            <p data-animation="reveal" className="font-sans text-body-md text-swag-grey">
              How Paperchase simplified global swag and gave marketing its time
              back.
            </p>
          </div>
          <div data-animation="reveal" className="flex flex-col gap-4">
            <span className="font-display text-[4rem] leading-[0.6] text-grey-300" aria-hidden>
              &ldquo;
            </span>
            <p className="font-sans text-[1.0625rem] leading-[1.55] text-swag-ink">
              We were juggling nine swag vendors, and marketing was stuck
              managing logistics. Now the program runs itself, and our vendor
              list is just one.
            </p>
            <p className="font-sans text-[0.875rem] text-swag-grey">
              Nish Patel · CEO, Paperchase
            </p>
          </div>
        </div>

        {/* timeline */}
        <div className="relative flex flex-col gap-6">
          <div aria-hidden className="absolute bottom-6 left-[1.375rem] top-6 hidden w-px border-l border-dashed border-grey-300 sm:block" />
          {STAGES.map((s) => (
            <div key={s.tag} data-animation="reveal" className="flex flex-col gap-3 sm:flex-row sm:gap-6">
              <div className="flex sm:w-11 sm:justify-center">
                <span className={`h-fit rounded-full px-3 py-1 font-sans text-[0.6875rem] font-bold tracking-[0.05rem] ${s.dark ? "bg-swag-ink text-white" : "bg-grey-100 text-swag-grey"}`}>
                  {s.tag}
                </span>
              </div>
              <div className="flex-1 overflow-hidden rounded-2xl border border-grey-200 bg-white">
                <div className="flex h-44 items-center justify-center bg-grey-100">
                  <svg className="size-8 text-grey-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
                  </svg>
                </div>
                <div className="flex flex-col gap-4 p-6">
                  <h3 className="font-display text-[1.375rem] text-swag-ink">
                    {s.title}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5">
                        <Check />
                        <span className="font-sans text-[0.875rem] text-swag-grey">
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
