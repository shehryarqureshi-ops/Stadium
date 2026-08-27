type Cell = "check" | "minus" | string;

const COLS: { name: string; sub?: string; hi?: boolean }[] = [
  { name: "Stadium", hi: true },
  { name: "Recognition Platforms", sub: "Bonusly · Nectar" },
  { name: "Points & Rewards Tools", sub: "Workhuman · Achievers" },
  { name: "DIY Programs", sub: "Slack + Gift Cards" },
];

const ROWS: { label: string; vals: [Cell, Cell, Cell, Cell] }[] = [
  {
    label: "Peer-to-peer recognition",
    vals: ["check", "check", "check", "Add-On"],
  },
  {
    label: "Milestones & automated programs",
    vals: ["check", "Limited", "check", "Limited"],
  },
  {
    label: "Swag, snacks, gifts & experiences",
    vals: ["check", "Cards Only", "minus", "Limited"],
  },
  {
    label: "Global + Local Fulfillment",
    vals: ["check", "Limited", "minus", "Gifts Only"],
  },
  {
    label: "Analytics & budget controls",
    vals: ["check", "Basic", "Limited", "check"],
  },
  // { label: "Thoughtful Rollout", vals: ["check", "check", "Limited", "check"] },
  { label: "One Platform", vals: ["check", "minus", "minus", "minus"] },
];

const LAST_COL = COLS.length - 1;
const LAST_ROW = ROWS.length - 1;

function Value({ v }: { v: Cell }) {
  if (v === "check")
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-6 shrink-0"
        role="img"
        aria-label="Included"
      >
        <path d="M20 6L9 17L4 12" />
      </svg>
    );
  if (v === "minus")
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-6 shrink-0"
        role="img"
        aria-label="Not included"
      >
        <path d="M5 12H19" />
      </svg>
    );
  return (
    <span className="whitespace-nowrap text-center font-sans text-[0.90625rem] font-semibold leading-[1.4] text-[#16171b]">
      {v}
    </span>
  );
}

export default function RecogComparison() {
  return (
    <section className="px-section-x-sm md:px-section-x-md lg:px-section-x-lg overflow-auto lg:overflow-visible">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        <div className="flex w-full max-w-[55rem] flex-col items-center gap-5 text-center">
          <div className="flex w-full flex-col items-center gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#6b33db]"
            >
              WHY STADIUM
            </p>
            <h2
              data-animation="reveal"
              className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
            >
              Recognition software is only part of the program
            </h2>
          </div>
          <p
            data-animation="reveal"
            className="font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]"
          >
            Stadium combines recognition, rewards, global fulfillment, and
            program infrastructure in one platform.
          </p>
        </div>

        {/* table — horizontal scroll below lg, Figma's 540 : 4×171 ratio at lg */}
        <div
          data-animation="reveal"
          className="w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div
            role="table"
            aria-label="Stadium compared with point tools, enterprise platforms and DIY setups"
            className="grid min-w-[75rem] grid-cols-[minmax(0,540fr)_repeat(4,minmax(0,171fr))] gap-1"
          >
            {/* header row */}
            <div role="row" className="contents">
              <div
                role="columnheader"
                aria-hidden
                className="rounded-[1.5rem]"
              />
              {COLS.map((c) => (
                <div
                  key={c.name}
                  role="columnheader"
                  className={`flex flex-col items-center justify-center px-6 py-4 text-center ${
                    c.hi
                      ? "rounded-b-[0.5rem] rounded-t-[1rem] bg-[#f8f1fe]"
                      : "rounded-[1.5rem]"
                  }`}
                >
                  <span
                    className={`whitespace-nowrap font-sans text-[0.90625rem] leading-[1.4] text-[#16171b] ${
                      c.hi ? "font-semibold" : "font-normal"
                    }`}
                  >
                    {c.name}
                  </span>
                  {c.sub && (
                    <span className="hidden whitespace-nowrap font-sans text-[0.6875rem] font-normal leading-[1.4] text-[#6b6c71]">
                      {c.sub}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* body rows */}
            {ROWS.map((r, ri) => (
              <div key={r.label} role="row" className="contents">
                <div
                  role="rowheader"
                  className={`flex items-center rounded-[0.5rem] bg-[#f2f2f2] p-6 ${
                    ri === 0 ? "rounded-tl-[1rem]" : ""
                  } ${ri === LAST_ROW ? "rounded-bl-[1rem]" : ""}`}
                >
                  <span className="whitespace-nowrap font-sans text-[0.90625rem] font-semibold leading-[1.4] text-[#16171b]">
                    {r.label}
                  </span>
                </div>
                {r.vals.map((v, ci) => (
                  <div
                    key={ci}
                    role="cell"
                    className={`flex items-center justify-center rounded-[0.5rem] p-6 ${
                      COLS[ci].hi ? "bg-[#f8f1fe]" : "bg-[#f2f2f2]"
                    } ${ri === 0 && ci === LAST_COL ? "rounded-tr-[1rem]" : ""} ${
                      ri === LAST_ROW && ci === LAST_COL
                        ? "rounded-br-[1rem]"
                        : ""
                    }`}
                  >
                    <Value v={v} />
                  </div>
                ))}
              </div>
            ))}

            {/* footer row — dark TALK TO SALES cell under the Stadium column */}
            <div role="row" className="contents">
              <div role="cell" className="rounded-[1.5rem] bg-white" />
              <div role="cell" className="flex">
                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-b-[1rem] rounded-t-[0.5rem] bg-[#16171b] px-6 py-4 font-sans text-[0.90625rem] font-semibold leading-[1.4] text-white transition-all duration-200 hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16171b] active:scale-[0.98]"
                >
                  <span className="whitespace-nowrap">TALK TO SALES</span>
                </a>
              </div>
              {COLS.slice(1).map((c) => (
                <div
                  key={c.name}
                  role="cell"
                  className="rounded-[1.5rem] bg-white"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
