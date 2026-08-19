/* /gifting (bespoke rebuild) · WHY TEAMS SWITCH — "The catalog you want. The
   logistics you need." (Figma n9SjmDjzB1PeZAYJ5w43fr → 2504:12781
   "Comparison · 3 wedges", page frame 2504:12118, abs y 5671..6450).

   Same table system as SwagmagicComparison / SnackComparison: 5 columns
   (fixed 360 label col + 4 flexing value cols), grid `gap-1` (Figma gap 4),
   value cells `p-6` (24), header cells `px-6 py-4` (24/16), 24px outer
   corners / 8px inner, 24px inline lucide check + minus (stroke #000, 2px,
   round caps — exactly the SVGs exported from this node), horizontal scroll
   below `lg`. This page's Stadium column is cream `#fbf8f2` (not swag's
   green) and the eyebrow is amber `#996b00`.

   Figma's `footer` row (2504:12899, the "Book a call" cell under the Stadium
   column) is `hidden="true"` in the file — hidden layers are not design, and
   the table's own height (599 = 67 + 7×72 + 6×4) excludes it — so it is NOT
   rendered here. That is the only structural difference from swag's table.

   Figma stack (y relative to the section frame; x=100/1240 in Figma → the
   site's 120/1200 content box, label col stays 360 fixed):
     eyebrow  y=0    h=17    (12 / lh 1.4 / +1.6px, #996b00)
     gap 8
     title    y=25   h=48    (Satoshi Bold 44 / lh 1.08 / -0.5px, 1 line)
     gap 20
     subhead  y=93   h=27    (Overpass 18 / lh 1.48, #6b6c71)
     gap 60
     table    y=180  h=599   header 67 · 7 rows × 72 · gap 4
     end      y=779           → section is content-tight top AND bottom
   Neighbours sit 160 apart (Comparison ends 6450, closing starts 6610), so
   the section is `lg:py-20` (80 + the neighbour's 80 = 160 visible). */

type Cell = "check" | "minus" | string;

const COLS: { name: string; sub: string; hi?: boolean }[] = [
  { name: "Stadium", sub: "Gifting + More", hi: true },
  { name: "Gifting Tools", sub: "Sendoso - Reachdesk" },
  { name: "Lightweight", sub: "Snappy - Goody - Open" },
  { name: "DIY", sub: "Gift Cards" },
];

const ROWS: { label: string; vals: [Cell, Cell, Cell, Cell] }[] = [
  { label: "Recipient’s Choice · 25K+ Gifts", vals: ["check", "Limited", "check", "minus"] },
  { label: "Automation & CRM Triggers", vals: ["check", "check", "Limited", "minus"] },
  { label: "Employee, Client, & Partner Gifting", vals: ["check", "Some", "Some", "Manual"] },
  { label: "Global With Local Fulfillment", vals: ["check", "check", "Limited", "minus"] },
  { label: "Spend Control & Budgets", vals: ["check", "Limited", "minus", "minus"] },
  { label: "Swag, Snacks, & Recognition", vals: ["check", "Limited", "minus", "minus"] },
  { label: "One Platform", vals: ["check", "minus", "minus", "minus"] },
];

const LAST_COL = COLS.length - 1;
const LAST_ROW = ROWS.length - 1;

/* lucide/check + lucide/minus exactly as exported from this node's svgAssets
   (24×24, stroke #000, 2px, round caps/joins). */
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

export default function GiftingComparison() {
  return (
    <section
      aria-labelledby="gifting-comparison-title"
      className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-20"
    >
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10 lg:gap-[3.75rem]">
        {/* header — eyebrow → 8 → title → 20 → subhead, centred */}
        <div className="flex w-full flex-col items-center gap-5 text-center">
          <div className="flex w-full flex-col items-center gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#996b00]"
            >
              WHY TEAMS SWITCH
            </p>
            <h2
              id="gifting-comparison-title"
              data-animation="reveal"
              className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
            >
              The catalog you want. The logistics you need.
            </h2>
          </div>
          <p
            data-animation="reveal"
            className="font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]"
          >
            Premium gifts, backed by the infrastructure to send them across 170+ countries.
          </p>
        </div>

        {/* table — horizontal scroll below lg, 360 + 4×flex at lg */}
        <div
          data-animation="reveal"
          className="w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div
            role="table"
            aria-label="Stadium compared with gifting tools, lightweight gifting apps and DIY gift cards"
            className="grid min-w-[58rem] grid-cols-[17.5rem_repeat(4,minmax(0,1fr))] gap-1 lg:grid-cols-[22.5rem_repeat(4,minmax(0,1fr))]"
          >
            {/* header row */}
            <div role="row" className="contents">
              <div role="columnheader" aria-hidden className="rounded-[1.5rem] bg-white" />
              {COLS.map((c) => (
                <div
                  key={c.name}
                  role="columnheader"
                  className={`flex flex-col items-center justify-center px-6 py-4 text-center ${
                    c.hi ? "rounded-b-[0.5rem] rounded-t-[1.5rem] bg-[#fbf8f2]" : "rounded-[1.5rem] bg-white"
                  }`}
                >
                  <span
                    className={`whitespace-nowrap font-sans text-[0.90625rem] leading-[1.4] text-[#16171b] ${
                      c.hi ? "font-semibold" : "font-normal"
                    }`}
                  >
                    {c.name}
                  </span>
                  <span className="whitespace-nowrap font-sans text-[0.6875rem] font-normal leading-[1.4] text-[#6b6c71]">
                    {c.sub}
                  </span>
                </div>
              ))}
            </div>

            {/* body rows */}
            {ROWS.map((r, ri) => (
              <div key={r.label} role="row" className="contents">
                <div
                  role="rowheader"
                  className={`flex items-center rounded-[0.5rem] bg-[#f2f2f2] p-6 ${
                    ri === 0 ? "rounded-tl-[1.5rem]" : ""
                  } ${ri === LAST_ROW ? "rounded-bl-[1.5rem]" : ""}`}
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
                      COLS[ci].hi ? "bg-[#fbf8f2]" : "bg-[#f2f2f2]"
                    } ${ri === 0 && ci === LAST_COL ? "rounded-tr-[1.5rem]" : ""} ${
                      ri === LAST_ROW && ci === LAST_COL ? "rounded-br-[1.5rem]" : ""
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
