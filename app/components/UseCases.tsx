import Link from "next/link";

/* "100+ ways teams put it to work" — the /new-home use cases band (Figma 6525:12557).
   Header, three lanes of grey chips drifting in alternating directions with wide
   white edge fades, then an "Explore use cases" pill. Chip copy is the board's.
   Each lane is four copies of its chips; translating -25% advances exactly one copy,
   so the loop is seamless at any width. Reduced motion: lanes sit still. */

const LANES = [
  ["Employee appreciation", "Rewards redemption", "Swag distribution", "Client gifting", "Incentives", "Birthday treats", "Snack perks"],
  ["Prospecting", "Work anniversaries", "Swag store redemption", "Recurring perks", "Celebration shops", "Awards", "Boosting morale"],
  ["Boosting attendance", "Boosting response rates", "Work from home stipends", "Peer-to-peer recognition", "New hire welcome", "Recognizing DEI events"],
];

/* lane speeds + a negative delay so the three lanes start out of step (the board offsets them) */
const MOTION = [
  { cls: "uc-ltr", dur: "80s", delay: "-6s" },
  { cls: "uc-rtl", dur: "96s", delay: "-30s" },
  { cls: "uc-ltr", dur: "88s", delay: "-18s" },
];

export default function UseCases() {
  return (
    <section
      aria-labelledby="use-cases-title"
      className="flex w-full flex-col items-center gap-8 overflow-hidden md:gap-10"
    >
      <style>{`
        @keyframes uc-ltr { from { transform: translateX(0); } to { transform: translateX(-25%); } }
        @keyframes uc-rtl { from { transform: translateX(-25%); } to { transform: translateX(0); } }
        .uc-ltr { animation: uc-ltr linear infinite; }
        .uc-rtl { animation: uc-rtl linear infinite; }
        @media (prefers-reduced-motion: reduce) { .uc-ltr, .uc-rtl { animation: none; } }
      `}</style>

      <header className="flex w-full max-w-content flex-col items-center gap-4 px-section-x-sm text-center md:px-section-x-md lg:px-section-x-lg">
        <p className="font-sans text-eyebrow-sm uppercase leading-4 text-swag-ink">Use cases</p>
        <h2
          id="use-cases-title"
          className="font-display text-display-sm text-swag-ink md:text-heading-xl lg:text-section-title"
        >
          100+ ways teams put it to work
        </h2>
        <p className="max-w-[49rem] font-sans text-[1rem] leading-6 text-swag-grey">
          From a first-day welcome to a closed-won thank you, every moment runs on the same system.
        </p>
      </header>

      <div className="relative flex w-full flex-col gap-3">
        {LANES.map((chips, l) => (
          <div key={l} className="flex w-full overflow-hidden" aria-hidden={l > 0 || undefined}>
            <div
              className={`flex w-max ${MOTION[l].cls}`}
              style={{ animationDuration: MOTION[l].dur, animationDelay: MOTION[l].delay }}
            >
              {[0, 1, 2, 3].map((copy) => (
                <ul key={copy} aria-hidden={copy !== 0 || undefined} className="flex shrink-0 gap-2.5 pr-2.5">
                  {chips.map((c) => (
                    <li
                      key={c}
                      className="whitespace-nowrap rounded-full bg-tray px-[1.125rem] py-[0.6875rem] font-sans text-[0.875rem] font-semibold leading-5 text-swag-ink"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ))}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-linear-to-r from-white to-transparent md:w-48 lg:w-[28rem]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-linear-to-l from-white to-transparent md:w-48 lg:w-[28rem]"
        />
      </div>

      <Link
        href="/impact"
        className="inline-flex min-w-56 items-center justify-center rounded-full bg-cta-fill px-7 py-4 font-sans text-[0.8125rem] font-semibold uppercase leading-4 tracking-[0.065rem] text-cta-on transition-all duration-200 hover:bg-grey-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-water focus-visible:ring-offset-2"
      >
        Explore use cases
      </Link>
    </section>
  );
}
