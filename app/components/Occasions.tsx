type Occasion = {
  label: string;
  /** /public/occasion-*.svg — 2.75rem circle tile + blue duotone glyph, exported from Figma */
  icon: string;
};

const OCCASIONS: Occasion[] = [
  { label: "Employee Appreciation", icon: "/occasion-employee-appreciation.svg" },
  { label: "Rewards Redemption", icon: "/occasion-rewards-redemption.svg" },
  { label: "Swag Distribution", icon: "/occasion-swag-distribution.svg" },
  { label: "Client Gifting", icon: "/occasion-client-gifting.svg" },
  { label: "Incentives", icon: "/occasion-incentives.svg" },
  { label: "Employee Birthday Treats", icon: "/occasion-employee-birthday-treats.svg" },
  { label: "Snack Perks", icon: "/occasion-snack-perks.svg" },
  { label: "Prospecting", icon: "/occasion-prospecting.svg" },
  { label: "Work Anniversaries", icon: "/occasion-work-anniversaries.svg" },
  { label: "Swag Store Redemption", icon: "/occasion-swag-store-redemption.svg" },
  { label: "Recurring Perks", icon: "/occasion-recurring-perks.svg" },
  { label: "Celebration Shops", icon: "/occasion-celebration-shops.svg" },
  { label: "Awards", icon: "/occasion-awards.svg" },
  { label: "Boosting Morale", icon: "/occasion-boosting-morale.svg" },
  { label: "Boosting Attendance", icon: "/occasion-boosting-attendance.svg" },
  { label: "Boosting Response Rates", icon: "/occasion-boosting-response-rates.svg" },
  { label: "Work From Home Stipend", icon: "/occasion-work-from-home-stipend.svg" },
  { label: "Peer-to-Peer Recognition", icon: "/occasion-peer-to-peer-recognition.svg" },
  { label: "New Hire Welcome", icon: "/occasion-new-hire-welcome.svg" },
  { label: "Recognizing DEI Events", icon: "/occasion-recognizing-dei-events.svg" },
];

/** Four use-case families (Figma 803:48505). Dots are a single muted grey in the
    Figma (no color-coding yet); kept as a labeled key — easy to color later. */
const CATEGORIES = [
  "Employee Recognition",
  "Gifting & Distribution",
  "Incentives & Performance",
  "Lifecycle & Programs",
];

function OccasionPill({ occasion }: { occasion: Occasion }) {
  return (
    <li className="flex shrink-0 items-center gap-2.5 rounded-full bg-grey-100 py-2 pl-2 pr-5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={occasion.icon}
        alt=""
        width={44}
        height={44}
        loading="lazy"
        className="size-8 shrink-0"
      />
      <span className="whitespace-nowrap font-sans text-label font-semibold text-ink">
        {occasion.label}
      </span>
    </li>
  );
}

export default function Occasions() {
  // Three distinct rows (Figma 803:48505); each scrolls horizontally.
  const rows = [
    OCCASIONS.slice(0, 7),
    OCCASIONS.slice(7, 14),
    OCCASIONS.slice(14, 20),
  ];

  return (
    <section className="flex w-full flex-col items-center gap-8 overflow-hidden bg-surface-base py-section-y-sm md:gap-10 md:py-section-y-md lg:gap-12 lg:py-section-y-lg">
      <style>{`
        @keyframes occ-ltr { from { transform: translateX(0); } to { transform: translateX(-25%); } }
        @keyframes occ-rtl { from { transform: translateX(-25%); } to { transform: translateX(0); } }
        .occ-ltr { animation: occ-ltr 72s linear infinite; }
        .occ-rtl { animation: occ-rtl 88s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .occ-ltr, .occ-rtl { animation: none; }
        }
      `}</style>

      {/* Header — centered */}
      <div className="flex w-full max-w-content flex-col items-center gap-4 px-section-x-sm text-center md:px-section-x-md lg:px-section-x-lg">
        <div className="flex flex-col items-center gap-2">
          <p className="font-sans text-eyebrow-sm uppercase tracking-[0.1rem] text-grey-500 md:text-eyebrow-lg">
            Use cases
          </p>
          <h2 className="font-display text-heading-sm text-ink md:text-heading-md lg:text-heading-lg">
            Count on Stadium for every occasion
          </h2>
        </div>
        <p className="font-sans text-body-md text-grey-600 md:text-body-lg">
          There&rsquo;s no moment too big or too small.
        </p>

        {/* Category legend */}
        <ul className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {CATEGORIES.map((cat) => (
            <li key={cat} className="flex items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-full bg-grey-400"
                aria-hidden
              />
              <span className="font-sans text-label uppercase tracking-[0.06rem] text-grey-500">
                {cat}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Scrolling rows — full-bleed with edge fades; 4 copies per track keep the
          loop seamless across wide viewports (translateX(-25%) advances one copy). */}
      <div className="relative w-full">
        <div className="flex w-full flex-col gap-3 lg:gap-4">
          {rows.map((items, r) => (
            <div key={r} className="flex w-full overflow-hidden">
              <div className={`flex w-max ${r % 2 === 1 ? "occ-rtl" : "occ-ltr"}`}>
                {[0, 1, 2, 3].map((copy) => (
                  <ul
                    key={copy}
                    aria-hidden={copy !== 0 || undefined}
                    className="flex shrink-0 items-center gap-3 pr-3 lg:gap-4 lg:pr-4"
                  >
                    {items.map((o) => (
                      <OccasionPill key={o.label} occasion={o} />
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Edges dissolve into the section instead of hard-cutting */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-linear-to-r from-surface-base to-transparent md:w-20 lg:w-32"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-surface-base to-transparent md:w-20 lg:w-32"
        />
      </div>

      {/* Stat */}
      <div className="flex items-baseline gap-3 px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
        <span className="font-display text-heading-sm font-bold text-ink md:text-heading-md">
          100+
        </span>
        <span className="font-sans text-body-md text-grey-600">
          use cases covered &mdash; every occasion handled
        </span>
      </div>
    </section>
  );
}
