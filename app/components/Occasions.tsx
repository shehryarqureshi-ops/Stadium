type Occasion = {
  label: string;
  /** /public/occasion-*.svg — 2.75rem circle tile + blue duotone glyph, exported from Figma */
  icon: string;
};

const OCCASIONS: Occasion[] = [
  {
    label: "Employee Appreciation",
    icon: "/occasion-employee-appreciation.svg",
  },
  { label: "Rewards Redemption", icon: "/occasion-rewards-redemption.svg" },
  { label: "Swag Distribution", icon: "/occasion-swag-distribution.svg" },
  { label: "Client Gifting", icon: "/occasion-client-gifting.svg" },
  { label: "Incentives", icon: "/occasion-incentives.svg" },
  {
    label: "Employee Birthday Treats",
    icon: "/occasion-employee-birthday-treats.svg",
  },
  { label: "Snack Perks", icon: "/occasion-snack-perks.svg" },
  { label: "Prospecting", icon: "/occasion-prospecting.svg" },
  { label: "Work Anniversaries", icon: "/occasion-work-anniversaries.svg" },
  {
    label: "Swag Store Redemption",
    icon: "/occasion-swag-store-redemption.svg",
  },
  { label: "Recurring Perks", icon: "/occasion-recurring-perks.svg" },
  { label: "Celebration Shops", icon: "/occasion-celebration-shops.svg" },
  { label: "Awards", icon: "/occasion-awards.svg" },
  { label: "Boosting Morale", icon: "/occasion-boosting-morale.svg" },
  { label: "Boosting Attendance", icon: "/occasion-boosting-attendance.svg" },
  {
    label: "Boosting Response Rates",
    icon: "/occasion-boosting-response-rates.svg",
  },
  {
    label: "Work From Home Stipend",
    icon: "/occasion-work-from-home-stipend.svg",
  },
  {
    label: "Peer-to-Peer Recognition",
    icon: "/occasion-peer-to-peer-recognition.svg",
  },
  { label: "New Hire Welcome", icon: "/occasion-new-hire-welcome.svg" },
  {
    label: "Recognizing DEI Events",
    icon: "/occasion-recognizing-dei-events.svg",
  },
];

function OccasionPill({ occasion }: { occasion: Occasion }) {
  return (
    <li className="flex shrink-0 items-center gap-3 rounded-full bg-[#f8f8f8] py-1.5 pl-4 pr-5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={occasion.icon}
        alt=""
        width={44}
        height={44}
        loading="lazy"
        className="size-11 shrink-0"
      />
      <span className="whitespace-nowrap font-sans text-[1rem] font-semibold text-ink">
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
      <div className="flex w-full max-w-content flex-col items-center gap-8 px-section-x-sm text-center md:px-section-x-md lg:px-section-x-lg">
        <div className="flex flex-col items-center gap-5">
          <h2
            data-animation="reveal"
            className="font-display text-heading-sm text-ink md:text-heading-md lg:text-[3.4375rem] lg:leading-[3.75rem] lg:tracking-[-0.075rem]"
          >
            100+ use cases and counting
          </h2>
          <p
            data-animation="reveal"
            className="max-w-[38rem] font-sans text-body-md text-[#474b5c] lg:text-[1.125rem] lg:leading-7"
          >
            Get a 15-minute walkthrough. We&rsquo;ll show you live campaigns,
            sample boxes, and how teams use Stadium at scale.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <a
            data-animation="reveal"
            href="#"
            className="inline-flex h-button-h items-center justify-center rounded-button bg-cta-fill px-button-x font-sans text-button-primary uppercase text-cta-on shadow-button transition-all duration-200 hover:bg-grey-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-water focus-visible:ring-offset-2"
          >
            Book a demo
          </a>
          <a
            data-animation="reveal"
            href="#"
            className="inline-flex h-button-h items-center justify-center rounded-button border border-ink px-button-x font-sans text-button-primary uppercase text-ink transition-all duration-200 hover:bg-grey-100 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            Talk to sales
          </a>
        </div>
      </div>

      {/* Scrolling rows — full-bleed with edge fades; 4 copies per track keep the
          loop seamless across wide viewports (translateX(-25%) advances one copy). */}
      <div data-animation="reveal" className="relative w-full">
        <div className="flex w-full flex-col gap-6 lg:gap-[2.8125rem]">
          {rows.map((items, r) => (
            <div key={r} className="flex w-full overflow-hidden">
              <div
                className={`flex w-max ${r % 2 === 1 ? "occ-rtl" : "occ-ltr"}`}
              >
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
    </section>
  );
}
