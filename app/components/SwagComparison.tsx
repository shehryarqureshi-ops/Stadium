/* Comparison · 3 wedges — Figma /swag 2:25431 ("Most platforms do one thing.
   Stadium consolidates the rest."). A feature-comparison table: Stadium
   (highlighted green column) vs Order forms / Swag platforms / Gifting tools,
   with check / minus / short-text cells. Scrolls horizontally on mobile. */

export type SwagComparisonContent = {
  /** Small uppercase label above the heading. */
  eyebrow: string;
  /** Heading text, one entry per visual line (rendered with <br /> between). */
  headingLines: string[];
  /** Sub-heading body copy under the heading. */
  body: string;
  /** Table columns: `name` is the header, `sub` the small caption below (empty = hidden). */
  cols: { name: string; sub: string }[];
  /** Table rows: `label` is the row header; `vals` are one cell per column
   *  — the literal strings "check" / "minus" render icons, anything else is text. */
  rows: { label: string; vals: string[] }[];
  /** Footer call-to-action under the first (Stadium) column. Omit for no CTA row. */
  cta?: { label: string; href: string };
};

export const SWAG_COMPARISON: SwagComparisonContent = {
  eyebrow: "HOW WE WIN",
  headingLines: ["Most platforms do one thing.", "Stadium consolidates the rest."],
  body: "Stores, kits, storage, and fulfillment, without the handoffs.",
  cols: [
    { name: "Stadium", sub: "" },
    { name: "Order forms", sub: "Sticker Mule · 4imprint" },
    { name: "Swag platforms", sub: "SwagUp · Printfection" },
    { name: "Gifting tools", sub: "Sendoso · Postal" },
  ],
  rows: [
    { label: "Branded swag & stores", vals: ["check", "Order only", "check", "Add-on"] },
    { label: "Warehousing & kitting", vals: ["check", "minus", "check", "Limited"] },
    { label: "Snacks & food boxes", vals: ["check", "minus", "minus", "Limited"] },
    { label: "Gifts, cards & recognition", vals: ["check", "minus", "minus", "Gifts only"] },
    { label: "Recipient choice • 25K catalog", vals: ["check", "minus", "Limited", "check"] },
    { label: "Global fulfillment • 170+", vals: ["check", "Limited", "Limited", "check"] },
    { label: "One platform, one invoice", vals: ["check", "minus", "minus", "minus"] },
  ],
  cta: { label: "Book a call", href: "#" },
};

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

const GRID = "grid gap-1";

export default function SwagComparison({ content = SWAG_COMPARISON }: { content?: SwagComparisonContent }) {
  const lastCol = content.cols.length - 1;
  const gridStyle = {
    gridTemplateColumns: `22.5rem repeat(${content.cols.length}, minmax(0,1fr))`,
  };
  return (
    <section className="bg-white px-section-x-sm pb-24 pt-4 md:px-section-x-md lg:px-section-x-lg">
      <div className="mx-auto flex w-full max-w-content flex-col gap-10">
        {/* header (centered) */}
        <div className="flex flex-col gap-5 text-center">
          <div className="flex flex-col gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-swag-green-deep md:text-eyebrow-md"
            >
              {content.eyebrow}
            </p>
            <h2
              data-animation="reveal"
              className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem] lg:text-[2.75rem]"
            >
              {content.headingLines.flatMap((line, i) =>
                i === 0 ? [line] : [<br key={i} />, line],
              )}
            </h2>
          </div>
          <p
            data-animation="reveal"
            className="font-sans text-body-md text-swag-grey lg:text-[1.125rem] lg:leading-[1.48]"
          >
            {content.body}
          </p>
        </div>

        {/* table */}
        <div
          data-animation="reveal"
          className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div style={{ minWidth: `calc(22.5rem + ${content.cols.length} * 8.5rem)` }}>
            {/* header */}
            <div className={`mb-1 ${GRID}`} style={gridStyle}>
              <div />
              {content.cols.map((c, i) => (
                <div
                  key={c.name}
                  className={`flex flex-col items-center justify-center px-6 py-4 text-center ${
                    i === 0 ? "rounded-b-lg rounded-t-[1.5rem] bg-swag-tint" : ""
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
              {content.rows.map((row, r) => (
                <div key={row.label} className={GRID} style={gridStyle}>
                  <div
                    className={`flex items-center rounded-lg bg-[#f2f2f2] p-6 font-sans text-[0.90625rem] font-semibold text-swag-ink ${
                      r === 0 ? "rounded-tl-[1.5rem]" : ""
                    } ${r === content.rows.length - 1 ? "rounded-bl-[1.5rem]" : ""}`}
                  >
                    {row.label}
                  </div>
                  {row.vals.map((v, c) => (
                    <div
                      key={c}
                      className={`flex items-center justify-center rounded-lg p-6 ${
                        c === 0 ? "bg-swag-tint" : "bg-[#f2f2f2]"
                      } ${c === lastCol && r === 0 ? "rounded-tr-[1.5rem]" : ""} ${
                        c === lastCol && r === content.rows.length - 1 ? "rounded-br-[1.5rem]" : ""
                      }`}
                    >
                      <Cell v={v} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {/* footer CTA under Stadium (optional) */}
            {content.cta && (
              <div className={`mt-1 ${GRID}`} style={gridStyle}>
                <div />
                <a
                  href={content.cta.href}
                  className="flex items-center justify-center rounded-b-[1.5rem] rounded-t-lg bg-swag-ink px-6 py-4 font-sans text-[0.90625rem] font-semibold text-white transition-all hover:bg-black active:scale-[0.98]"
                >
                  {content.cta.label}
                </a>
                {Array.from({ length: lastCol }).map((_, i) => (
                  <div key={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
