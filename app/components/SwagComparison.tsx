/* Comparison · 3 wedges — Figma /swag 2:25431 ("Most platforms do one thing.
   Stadium consolidates the rest."). A feature-comparison table: Stadium
   (highlighted green column) vs Order forms / Swag platforms / Gifting tools,
   with check / minus / short-text cells. Scrolls horizontally on mobile. */

const COLS = [
  { name: "Stadium", sub: "" },
  { name: "Order forms", sub: "Sticker Mule · 4imprint" },
  { name: "Swag platforms", sub: "SwagUp · Printfection" },
  { name: "Gifting tools", sub: "Sendoso · Postal" },
];

const ROWS: { label: string; vals: string[] }[] = [
  { label: "Branded swag & stores", vals: ["check", "Order only", "check", "Add-on"] },
  { label: "Warehousing & kitting", vals: ["check", "minus", "check", "Limited"] },
  { label: "Snacks & food boxes", vals: ["check", "minus", "minus", "Limited"] },
  { label: "Gifts, cards & recognition", vals: ["check", "minus", "minus", "Gifts only"] },
  { label: "Recipient choice • 25K catalog", vals: ["check", "minus", "Limited", "check"] },
  { label: "Global fulfillment • 170+", vals: ["check", "Limited", "Limited", "check"] },
  { label: "One platform, one invoice", vals: ["check", "minus", "minus", "minus"] },
];

function Cell({ v }: { v: string }) {
  if (v === "check")
    return (
      <svg className="size-6 text-swag-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M20 6 9 17l-5-5" />
      </svg>
    );
  if (v === "minus")
    return (
      <svg className="size-6 text-grey-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" aria-hidden>
        <path d="M5 12h14" />
      </svg>
    );
  return (
    <span className="text-center font-sans text-[0.9rem] font-semibold text-swag-ink">
      {v}
    </span>
  );
}

const GRID = "grid grid-cols-[1.7fr_1fr_1fr_1fr_1fr] gap-1";

export default function SwagComparison() {
  return (
    <section className="bg-white px-section-x-sm pb-24 pt-4 md:px-section-x-md lg:px-section-x-lg">
      <div className="mx-auto flex w-full max-w-content flex-col gap-10">
        {/* header */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-swag-green-deep md:text-eyebrow-md"
            >
              HOW WE WIN
            </p>
            <h2
              data-animation="reveal"
              className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem] lg:text-[2.75rem]"
            >
              Most platforms do one thing.
              <br />
              Stadium consolidates the rest.
            </h2>
          </div>
          <p
            data-animation="reveal"
            className="font-sans text-body-md text-swag-grey lg:text-[1.125rem] lg:leading-[1.48]"
          >
            Stores, kits, storage, and fulfillment, without the handoffs.
          </p>
        </div>

        {/* table */}
        <div
          data-animation="reveal"
          className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="min-w-[52rem]">
            {/* header */}
            <div className={`mb-1 ${GRID}`}>
              <div />
              {COLS.map((c, i) => (
                <div
                  key={c.name}
                  className={`flex flex-col items-center justify-center px-4 py-4 text-center ${
                    i === 0 ? "rounded-t-2xl bg-[#f2fbf5]" : ""
                  }`}
                >
                  <span className="font-sans text-[0.9rem] font-semibold text-swag-ink">
                    {c.name}
                  </span>
                  {c.sub && (
                    <span className="font-sans text-[0.6875rem] text-swag-grey">
                      {c.sub}
                    </span>
                  )}
                </div>
              ))}
            </div>
            {/* rows */}
            <div className="flex flex-col gap-1">
              {ROWS.map((row, r) => (
                <div key={row.label} className={GRID}>
                  <div
                    className={`flex items-center bg-[#f2f2f2] p-6 font-sans text-[0.9rem] font-semibold text-swag-ink ${
                      r === 0 ? "rounded-tl-2xl" : r === ROWS.length - 1 ? "rounded-bl-2xl" : "rounded-lg"
                    }`}
                  >
                    {row.label}
                  </div>
                  {row.vals.map((v, c) => (
                    <div
                      key={c}
                      className={`flex items-center justify-center p-6 ${
                        c === 0 ? "bg-[#f2fbf5]" : "bg-[#f2f2f2]"
                      } ${c === 0 && r === 0 ? "" : "rounded-lg"} ${
                        c === 3 && r === 0 ? "rounded-tr-2xl" : ""
                      } ${c === 3 && r === ROWS.length - 1 ? "rounded-br-2xl" : ""}`}
                    >
                      <Cell v={v} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {/* footer CTA under Stadium */}
            <div className={`mt-2 ${GRID}`}>
              <div />
              <a
                href="#"
                className="flex items-center justify-center rounded-2xl bg-swag-ink px-6 py-4 font-sans text-[0.9rem] font-semibold text-white transition-all hover:bg-black active:scale-[0.98]"
              >
                Book a call
              </a>
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
