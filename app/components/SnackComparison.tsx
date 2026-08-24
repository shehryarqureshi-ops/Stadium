/* /snacks · WHY TEAMS CHOOSE US (Figma 2208:3087). A 5-column comparison table
   with the Snackmagic column highlighted in light blue. Scrolls horizontally on
   small screens. */

type Cell = "check" | "minus" | string;

const COLS = [
  { name: "Snackmagic", sub: "by Stadium", hi: true },
  { name: "Caroo", sub: "ex-SnackNation" },
  { name: "Goldbelly", sub: "Baskets" },
  { name: "Goody", sub: "Gifting" },
  { name: "Hoppier", sub: "Visa Cards" },
];

const ROWS: { label: string; vals: [Cell, Cell, Cell, Cell, Cell] }[] = [
  {
    label: "Recipient’s Choice · 25K+ Gifts",
    vals: ["check", "minus", "minus", "check", "Visa"],
  },
  {
    label: "No Subscription",
    vals: ["check", "minus", "check", "check", "check"],
  },
  {
    label: "Global With Local Fulfillment",
    vals: ["check:170+", "U.S. only", "U.S. only", "550 intl", "Cards"],
  },
  {
    label: "2,000+ Snacks",
    vals: ["check", "minus", "minus", "Only Gifts", "minus"],
  },
  {
    label: "Dietary Filters",
    vals: ["check", "minus", "minus", "check", "minus"],
  },
  {
    label: "Swag, Recognition, Snacks, Gifting, & Hosted Experiences",
    vals: ["check", "minus", "minus", "minus", "minus"],
  },
];

function Value({ v }: { v: Cell }) {
  if (v === "check")
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#16171b"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-6"
        aria-label="Yes"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    );
  if (v === "minus")
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#b4b4b8"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-6"
        aria-label="No"
      >
        <path d="M5 12h14" />
      </svg>
    );
  if (v.startsWith("check:"))
    return (
      <span className="flex items-center gap-1.5">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#16171b"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6"
          aria-hidden
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
        <span className="font-sans text-[0.90625rem] font-semibold leading-[1.4] text-[#16171b]">
          {v.slice(6)}
        </span>
      </span>
    );
  return (
    <span className="font-sans text-[0.90625rem] font-semibold leading-[1.4] text-[#16171b]">
      {v}
    </span>
  );
}

export default function SnackComparison() {
  return (
    <section className="bg-white px-section-x-sm md:px-section-x-md lg:px-section-x-lg overflow-auto lg:overflow-visible">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10 lg:gap-[3.75rem]">
        <div className="flex max-w-[46rem] flex-col items-center gap-5 text-center">
          <p
            data-animation="reveal"
            className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#2178f5]"
          >
            Why teams choose us
          </p>
          <h2
            data-animation="reveal"
            className="-mt-3 font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
          >
            The comparison speaks for itself
          </h2>
          <p
            data-animation="reveal"
            className="font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]"
          >
            Subscriptions, DIY, generic boxes, stacked up against Snackmagic.
          </p>
        </div>

        <div
          data-animation="reveal"
          className="w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="grid min-w-[52rem] grid-cols-[2.09fr_1fr_1fr_1fr_1fr_1fr] gap-1">
            <div />
            {COLS.map((c) => (
              <div
                key={c.name}
                className={`flex flex-col items-center justify-center px-2 py-4 text-center ${c.hi ? "rounded-b-[0.5rem] rounded-t-[1.5rem] bg-[#f0f6fe]" : "rounded-[1.5rem]"}`}
              >
                <span
                  className={`font-sans text-[0.90625rem] leading-[1.4] text-[#16171b] ${c.hi ? "font-semibold" : ""}`}
                >
                  {c.name}
                </span>
                <span className="font-sans text-[0.6875rem] leading-[1.4] text-[#6b6c71]">
                  {c.sub}
                </span>
              </div>
            ))}

            {ROWS.map((r, ri) => (
              <div key={r.label} className="contents">
                <div
                  className={`flex items-center rounded-[0.5rem] bg-[#f2f2f2] p-6 ${ri === 0 ? "rounded-tl-[1.5rem]" : ""} ${ri === ROWS.length - 1 ? "rounded-bl-[1.5rem]" : ""}`}
                >
                  <span className="font-sans text-[0.90625rem] font-semibold leading-[1.4] text-[#16171b]">
                    {r.label}
                  </span>
                </div>
                {r.vals.map((v, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-center rounded-[0.5rem] p-6 ${COLS[i].hi ? "bg-[#f0f6fe]" : "bg-[#f2f2f2]"} ${ri === 0 && i === COLS.length - 1 ? "rounded-tr-[1.5rem]" : ""} ${ri === ROWS.length - 1 && i === COLS.length - 1 ? "rounded-br-[1.5rem]" : ""}`}
                  >
                    <Value v={v} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
