/* /gifting · WHY TEAMS SWITCH (Figma 1113:2624). "The catalog you want. The
   logistics you need." — a 4-column comparison table with the Stadium column
   highlighted in cream. Scrolls horizontally on small screens. */

type Cell = "check" | "minus" | string;

const COLS = [
  { name: "Stadium", sub: "Gifting + More", hi: true },
  { name: "Gifting Tools", sub: "Sendoso · Reachdesk" },
  { name: "Lightweight", sub: "Snappy · Goody · Open" },
  { name: "DIY", sub: "Gift Cards" },
];

const ROWS: { label: string; vals: [Cell, Cell, Cell, Cell] }[] = [
  { label: "Recipient Choice · 25K+ Gifts", vals: ["check", "Limited", "check", "minus"] },
  { label: "Automation & CRM Triggers", vals: ["check", "check", "Limited", "minus"] },
  { label: "Employee, Client, & Partner Gifting", vals: ["check", "Some", "Some", "Manual"] },
  { label: "Global Delivery", vals: ["check", "check", "Limited", "minus"] },
  { label: "Spend Control & Budgets", vals: ["check", "Limited", "minus", "minus"] },
  { label: "Swag, Snacks, & Recognition", vals: ["check", "Limited", "minus", "minus"] },
  { label: "One Platform", vals: ["check", "minus", "minus", "minus"] },
];

function Value({ v }: { v: Cell }) {
  if (v === "check")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="#16171b" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" className="size-[1.15rem]" aria-label="Yes">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    );
  if (v === "minus") return <span className="text-[1.1rem] text-[#b4b4b8]" aria-label="No">—</span>;
  return <span className="font-sans text-[0.9375rem] text-[#6b6c71]">{v}</span>;
}

export default function GiftComparison() {
  return (
    <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-24">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        <div className="flex max-w-[46rem] flex-col items-center gap-2 text-center">
          <p
            data-animation="reveal"
            className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-[#996b00] md:text-eyebrow-md"
          >
            Why teams switch
          </p>
          <h2
            data-animation="reveal"
            className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
          >
            The catalog you want. The logistics you need.
          </h2>
          <p data-animation="reveal" className="mt-2 font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]">
            Premium gifts, backed by the infrastructure to send them across 170+ countries.
          </p>
        </div>

        <div data-animation="reveal" className="w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="grid min-w-[46rem] grid-cols-[1.6fr_1fr_1fr_1fr_1fr] gap-2">
            {/* header row */}
            <div />
            {COLS.map((c) => (
              <div
                key={c.name}
                className={`flex flex-col items-center justify-center gap-0.5 rounded-t-[0.75rem] px-2 py-4 text-center ${
                  c.hi ? "bg-[#fdf8ef]" : ""
                }`}
              >
                <span className="font-[family-name:var(--font-satoshi)] text-[1rem] font-bold text-[#16171b]">{c.name}</span>
                <span className="font-sans text-[0.75rem] text-[#8a8a90]">{c.sub}</span>
              </div>
            ))}

            {/* body rows */}
            {ROWS.map((r) => (
              <div key={r.label} className="contents">
                <div className="flex items-center rounded-[0.75rem] bg-[#f2f2f2] px-6 py-5">
                  <span className="font-sans text-[0.9375rem] text-[#16171b]">{r.label}</span>
                </div>
                {r.vals.map((v, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-center rounded-[0.75rem] px-2 py-5 ${
                      COLS[i].hi ? "bg-[#fdf8ef]" : "bg-[#f2f2f2]"
                    }`}
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
