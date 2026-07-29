/* Events · format explainer (Figma /events 602:2026). "Wherever your team is" —
   three cards (Virtual / In-Person / Hybrid), each a 272px photo slot + title +
   blurb. The Figma reuses one swag-hoodie stock photo across all three cards (a
   draft placeholder); we match the Figma card frame exactly and fill it with a
   themed image slot rather than reproduce the wrong-vertical photo — awaiting
   real event photography. Eyebrow inherits the page's pink --color-swag-* accent. */

const CARDS = [
  {
    title: "Virtual",
    desc: "Everyone joins from wherever they’re working. All you need is a Wi-Fi connection.",
    glyph: (
      <>
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
      </>
    ),
  },
  {
    title: "In-Person",
    desc: "Give people a reason to come into the office. We’ll handle the rest.",
    glyph: (
      <>
        <path d="M18 21a8 8 0 0 0-16 0" />
        <circle cx="10" cy="8" r="5" />
        <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
      </>
    ),
  },
  {
    title: "Hybrid",
    desc: "One experience for everyone, whether they’re at home, in the office, or somewhere in between.",
    glyph: (
      <>
        <path d="M12 7v14" />
        <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
      </>
    ),
  },
];

function FormatVisual({ glyph }: { glyph: React.ReactNode }) {
  return (
    <div className="flex h-[17rem] w-full items-center justify-center overflow-hidden rounded-[1rem] border border-[#f5f5f5] bg-[linear-gradient(150deg,var(--color-swag-grad-1,#fdeef1),var(--color-swag-grad-2,#f9cdd6))]">
      <svg
        className="size-12 text-swag-green/30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {glyph}
      </svg>
    </div>
  );
}

export default function EventsFormats() {
  return (
    <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-24">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        <div className="flex max-w-[47.5rem] flex-col items-center gap-5 text-center">
          <div className="flex flex-col items-center gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-swag-green-deep md:text-eyebrow-md"
            >
              THE PROBLEM
            </p>
            <h2
              data-animation="reveal"
              className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem] lg:text-[2.75rem]"
            >
              Wherever your team is
            </h2>
          </div>
          <p
            data-animation="reveal"
            className="font-sans text-body-md text-swag-grey lg:text-[1.125rem] lg:leading-[1.48]"
          >
            The same hosted experiences, designed for remote, in-person, and
            hybrid teams.
          </p>
        </div>

        <div
          data-animation="reveal"
          className="grid w-full grid-cols-1 gap-6 md:grid-cols-3"
        >
          {CARDS.map((c) => (
            <div key={c.title} className="flex flex-col gap-6">
              <FormatVisual glyph={c.glyph} />
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-[1.5rem] leading-[1.1] tracking-[-0.01875rem] text-swag-ink">
                  {c.title}
                </h3>
                <p className="font-sans text-[0.9375rem] leading-[1.5] text-swag-grey">
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
