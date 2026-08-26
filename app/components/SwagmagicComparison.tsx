/* /swag · WHY TEAMS CHOOSE STADIUM — "Most platforms do one thing. Stadium does
   it all." (Figma n9SjmDjzB1PeZAYJ5w43fr → 2500:5420 "Comparison · 3 wedges").
   A 5-column comparison table (Stadium column highlighted #f2fbf5) vs Order
   Forms / Swag Platforms / Gifting Tools, 7 rows, then a dark BOOK A CALL cell
   that sits under the Stadium column (rounded-t 8 / rounded-b 24). Same table
   system as SnackComparison.tsx: gap 4, cells p-24, header py-16 px-24, 24px
   lucide check/minus (stroke #000 2px, from Figma svgAssets), outer 24 corners,
   inner 8. Scrolls horizontally on small screens.

   Figma stack (section frame y=6699, content-tight at top, 160 pad at bottom;
   x=100/1240 in Figma → site's 120/1200 content box, label col stays 360 fixed
   like Figma's `w-[360px] shrink-0`, the 4 value cols flex):
     eyebrow  y=0    h=17    (12px / lh 1.4, #10995a, tracking 1.6px)
     gap 8
     title    y=25   h=96    (Satoshi Bold 44 / lh 1.08 / -0.5px, 2 lines)
     gap 20
     subhead  y=141  h=27    (Overpass 18 / lh 1.48, #6b6c71)
     gap 60
     table    y=228  h=655   header 67 · 7 rows × 72 (gap 4) · footer 52
     bottom   160            → next section (Committee) at y=1043
   → section = lg:py-20 (80 + neighbour's 80 = 160 visible), inner gap 60. */

type Cell = "check" | "minus" | string;

const COLS: { name: string; sub?: string; hi?: boolean }[] = [
  { name: "Stadium", hi: true },
  { name: "Traditional Swag Vendors", sub: "Sticker Mule ·  4imprint" },
  { name: "Swag Platforms", sub: "SwagUp ·  Printfection" },
  { name: "Gifting Platforms", sub: "Sendoso ·  Postal" },
];

const ROWS: { label: string; vals: [Cell, Cell, Cell, Cell] }[] = [
  {
    label: "Branded Swag & Stores",
    vals: ["check", "Order Only", "check", "Add-On"],
  },
  {
    label: "Warehousing & Kitting",
    vals: ["check", "minus", "check", "Limited"],
  },
  // { label: "Snacks & Food", vals: ["check", "minus", "minus", "Limited"] },
  {
    label: "Gift Cards & Recognition",
    vals: ["check", "minus", "minus", "Gifts Only"],
  },
  {
    label: "Recipient’s Choice • 25K Catalog",
    vals: ["check", "minus", "Limited", "check"],
  },
  {
    label: "Global With Local Fulfillment",
    vals: ["check", "Limited", "Limited", "check"],
  },
  { label: "One Platform", vals: ["check", "minus", "minus", "minus"] },
];

const LAST_COL = COLS.length - 1;
const LAST_ROW = ROWS.length - 1;

/* lucide/check + lucide/minus exactly as exported from the Figma node
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

export default function SwagmagicComparison() {
  return (
    <section className="bg-white px-section-x-sm md:px-section-x-md lg:px-section-x-lg overflow-auto lg:overflow-visible">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10 lg:gap-[3.75rem]">
        {/* header — eyebrow → 8 → title → 20 → subhead, centred */}
        <div className="flex w-full flex-col items-center gap-5 text-center">
          <div className="flex w-full flex-col items-center gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#10995a]"
            >
              WHY TEAMS CHOOSE STADIUM
            </p>
            <h2
              data-animation="reveal"
              className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
            >
              Most solutions handle one piece.
              <br />
              Stadium brings it all together.
            </h2>
          </div>
          <p
            data-animation="reveal"
            className="font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]"
          >
            Swag, stores, storage, fulfillment, and more, without the handoffs.
          </p>
        </div>

        {/* table — horizontal scroll below lg, 360 + 4×flex at lg */}
        <div
          data-animation="reveal"
          className="w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div
            role="table"
            aria-label="Stadium compared with order forms, swag platforms and gifting tools"
            className="grid min-w-[58rem] grid-cols-[17.5rem_repeat(4,minmax(0,1fr))] gap-1 lg:grid-cols-[22.5rem_repeat(4,minmax(0,1fr))]"
          >
            {/* header row */}
            <div role="row" className="contents">
              <div
                role="columnheader"
                aria-hidden
                className="rounded-[1.5rem] bg-white"
              />
              {COLS.map((c) => (
                <div
                  key={c.name}
                  role="columnheader"
                  className={`flex flex-col items-center justify-center px-6 py-4 text-center ${
                    c.hi
                      ? "rounded-b-[0.5rem] rounded-t-[1.5rem] bg-[#f2fbf5]"
                      : "rounded-[1.5rem] bg-white"
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
                    <span className="hidden whitespace-pre font-sans text-[0.6875rem] font-normal leading-[1.4] text-[#6b6c71]">
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
                      COLS[ci].hi ? "bg-[#f2fbf5]" : "bg-[#f2f2f2]"
                    } ${ri === 0 && ci === LAST_COL ? "rounded-tr-[1.5rem]" : ""} ${
                      ri === LAST_ROW && ci === LAST_COL
                        ? "rounded-br-[1.5rem]"
                        : ""
                    }`}
                  >
                    <Value v={v} />
                  </div>
                ))}
              </div>
            ))}

            {/* footer row — dark BOOK A CALL cell under the Stadium column */}
            <div role="row" className="contents">
              <div role="cell" className="rounded-[1.5rem] bg-white" />
              <div role="cell" className="flex">
                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-b-[1.5rem] rounded-t-[0.5rem] bg-[#16171b] px-6 py-4 font-sans text-[0.90625rem] font-semibold leading-[1.4] text-white transition-all duration-200 hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16171b] active:scale-[0.98]"
                >
                  <span className="whitespace-nowrap">BOOK A CALL</span>
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
