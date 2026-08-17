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
  { label: "Recipient’s Choice · 25K+ Gifts", vals: ["check", "minus", "minus", "check", "Visa"] },
  { label: "No Subscription", vals: ["check", "minus", "check", "check", "check"] },
  { label: "Global With Local Fulfillment", vals: ["170+", "U.S. only", "U.S. only", "550 intl", "Cards"] },
  { label: "2,000+ Snacks", vals: ["check", "minus", "minus", "Only Gifts", "minus"] },
  { label: "Dietary Filters", vals: ["check", "minus", "minus", "check", "minus"] },
  { label: "Swag, Recognition, Snacks, Gifting, & Hosted Experiences", vals: ["check", "minus", "minus", "minus", "minus"] },
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

export default function SnackComparison() {
  return (
    <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-24">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        <div className="flex max-w-[46rem] flex-col items-center gap-2 text-center">
          <p
            data-animation="reveal"
            className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-[#2178f5] md:text-eyebrow-md"
          >
            Why teams choose us
          </p>
          <h2
            data-animation="reveal"
            className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
          >
            The comparison speaks for itself
          </h2>
          <p data-animation="reveal" className="mt-2 font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]">
            Subscriptions, DIY, generic boxes, stacked up against Snackmagic.
          </p>
        </div>

        <div data-animation="reveal" className="w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="grid min-w-[52rem] grid-cols-[1.7fr_1fr_1fr_1fr_1fr_1fr] gap-2">
            <div />
            {COLS.map((c) => (
              <div
                key={c.name}
                className={`flex flex-col items-center justify-center gap-0.5 rounded-t-[0.75rem] px-2 py-4 text-center ${c.hi ? "bg-[#eaf1fd]" : ""}`}
              >
                <span className="font-[family-name:var(--font-satoshi)] text-[1rem] font-bold text-[#16171b]">{c.name}</span>
                <span className="font-sans text-[0.75rem] text-[#8a8a90]">{c.sub}</span>
              </div>
            ))}

            {ROWS.map((r) => (
              <div key={r.label} className="contents">
                <div className="flex items-center rounded-[0.75rem] bg-[#f2f2f2] px-6 py-5">
                  <span className="font-sans text-[0.9375rem] text-[#16171b]">{r.label}</span>
                </div>
                {r.vals.map((v, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-center rounded-[0.75rem] px-2 py-5 ${COLS[i].hi ? "bg-[#eaf1fd]" : "bg-[#f2f2f2]"}`}
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
