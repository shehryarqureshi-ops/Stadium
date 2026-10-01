/* /pricing · THE COMPARISON — "Our platform covers every category" (Figma
   n9SjmDjzB1PeZAYJ5w43fr → 3998:4666 "Comparison · 3 wedges"). A full-bleed
   white panel (r60 all corners) floating on the page gradient, holding a
   5-column feature table: label column + Shops / Swag / Engagement /
   Enterprise. Same table system as SwagmagicComparison.tsx — gap 4, cells
   py16 px24, #f2f2f2 body cells r8 with r24 on the outer corners, white r24
   header cells, lucide check 24 / minus 16 — plus a dark "Explore all
   features" cell under the label column and hover popovers on the
   dotted-underlined features (Figma 3998:4917).

   Figma stack (desktop): panel py 160 px 80 → eyebrow 12 → 8 → title 44/1.08
   → 20 → subhead 18/1.48 (2 lines) → 60 → table (header 52, 15 rows × 56,
   explore 52, all gap 4). Label column = 500 of 1280 → 2.62fr against four
   1fr value columns so it scales with the site's content box.

   Below lg the table scrolls horizontally with the label column pinned
   (sticky), a 4px white ring masking the cells sliding under it. */

import { Check, Minus } from "lucide-react";

type Cell = "check" | "minus" | { check?: boolean; text: string };
type Row = {
  label: string;
  vals: [Cell, Cell, Cell, Cell];
  /* dotted-underline popover (Figma 3998:4917) */
  hint?: { text: string; href?: string };
};

const PASSES = ["Shops Pass", "Swag Pass", "Engagement Pass", "Enterprise Pass"];

const ROWS: Row[] = [
  { label: "Unlimited Global Print-On-Demand Swag & Gift Shops", vals: ["check", "minus", "minus", "check"] },
  { label: "Snack Boxes (Snackmagic)", vals: ["check", "minus", "check", "check"] },
  {
    label: "Bulk Swag (Swagmagic)",
    vals: [{ check: true, text: "170+" }, { text: "US only" }, { text: "US only" }, { text: "550 intl" }],
  },
  { label: "Gifting Catalog (25K items)", vals: ["check", "minus", "minus", { text: "Gifts only" }] },
  { label: "Swag Storage", vals: ["check", "minus", "minus", "check"] },
  { label: "Inventory Management", vals: ["check", "check", "minus", "minus"] },
  { label: "Swag Kits", vals: ["check", "check", "minus", "minus"] },
  { label: "Automated Gifting", vals: ["check", "check", "minus", "minus"] },
  { label: "HRIS/ATS/CRM Integrations", vals: ["check", "check", "minus", "minus"] },
  {
    label: "Kudos Programs",
    vals: ["check", "check", "minus", "minus"],
    hint: {
      text: "Peer-to-peer recognition where employees send kudos with points they can redeem across the full Stadium catalog.",
      href: "/kudos",
    },
  },
  { label: "SSO", vals: ["check", "check", "minus", "minus"] },
  {
    label: "Custom Shops Domain",
    vals: ["check", "check", "minus", "minus"],
    hint: {
      text: "Host your branded swag shop on your own domain, like swag.yourcompany.com, for a fully on-brand experience.",
      href: "/custom-domain",
    },
  },
  { label: "Stadium API", vals: ["check", "check", "minus", "minus"] },
  {
    label: "Net Terms",
    vals: ["check", "check", "minus", "minus"],
    hint: { text: "Pay by invoice on agreed payment terms instead of by card at checkout." },
  },
  { label: "Customer Success Manager", vals: ["check", "minus", "minus", "minus"] },
];

const LAST_ROW = ROWS.length - 1;
const LAST_COL = PASSES.length - 1;

/* label column pins below lg; the white ring hides cells scrolling beneath */
const STICKY = "sticky left-0 z-10 shadow-[0.25rem_0_0_0_white] lg:static lg:shadow-none";

function Value({ v }: { v: Cell }) {
  if (v === "check")
    return (
      <>
        <Check aria-hidden className="size-6 shrink-0 text-black" strokeWidth={2} />
        <span className="sr-only">Included</span>
      </>
    );
  if (v === "minus")
    return (
      <>
        <Minus aria-hidden className="size-4 shrink-0 text-black" strokeWidth={2} />
        <span className="sr-only">Not included</span>
      </>
    );
  return (
    <span className="inline-flex items-center whitespace-nowrap font-sans text-table font-semibold text-pricing-ink">
      {v.check && <Check aria-hidden className="size-6 shrink-0 text-black" strokeWidth={2} />}
      {v.text}
    </span>
  );
}

function Hint({ id, label, hint }: { id: string; label: string; hint: NonNullable<Row["hint"]> }) {
  return (
    <span className="group/hint relative inline-flex">
      <button
        type="button"
        aria-describedby={id}
        className="cursor-help text-left underline decoration-dotted decoration-[0.09em] underline-offset-[0.2em] [text-decoration-skip-ink:none]"
      >
        {label}
      </button>
      {/* hover/focus popover — stays open while the pointer or focus moves
          into it, so "Read more" is reachable */}
      <span
        className="invisible absolute bottom-full left-0 z-30 w-[17.5rem] max-w-[70vw] pb-2 opacity-0 transition-[opacity,visibility,translate] duration-200 ease-out motion-safe:translate-y-1 group-hover/hint:visible group-hover/hint:translate-y-0 group-hover/hint:opacity-100 group-focus-within/hint:visible group-focus-within/hint:translate-y-0 group-focus-within/hint:opacity-100"
      >
        <span className="flex flex-col gap-2.5 rounded-lg bg-white p-3 font-sans text-popover font-normal shadow-popover">
          <span id={id} className="text-pricing-cta">
            {hint.text}
          </span>
          {hint.href && (
            <a href={hint.href} className="w-fit text-grey-500 underline decoration-solid hover:text-pricing-ink">
              Read more
            </a>
          )}
        </span>
      </span>
    </span>
  );
}

export default function PricingComparison() {
  return (
    <section
      id="compare"
      aria-labelledby="pricing-compare-title"
      className="scroll-mt-16 rounded-[2.5rem] bg-white px-section-x-sm py-16 md:rounded-panel md:px-section-x-md md:py-24 lg:px-section-x-lg lg:py-40"
    >
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10 lg:gap-[3.75rem]">
        {/* header — eyebrow → 8 → title → 20 → subhead */}
        <div className="flex w-full flex-col items-center gap-5 text-center">
          <div className="flex flex-col items-center gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-eyebrow-sm uppercase tracking-[0.1rem] text-pricing-ink"
            >
              The comparison
            </p>
            <h2
              id="pricing-compare-title"
              data-animation="reveal"
              className="text-balance font-display text-display-sm text-pricing-ink md:text-heading-xl"
            >
              Our platform covers every category
            </h2>
          </div>
          <p
            data-animation="reveal"
            className="max-w-[30rem] font-sans text-body-md text-swag-grey md:text-body-lg"
          >
            Most tools specialize in sales gifting, recognition, or swag. Stadium runs all three,
            plus fulfillment in 170+ countries.
          </p>
        </div>

        <div
          data-animation="reveal"
          className="w-full overflow-x-auto overscroll-x-contain [scrollbar-width:none] lg:overflow-visible [&::-webkit-scrollbar]:hidden"
        >
          <div
            role="table"
            aria-label="Features included in each Stadium pass"
            className="grid min-w-[42rem] grid-cols-[11rem_repeat(4,minmax(0,1fr))] gap-1 md:grid-cols-[15rem_repeat(4,minmax(0,1fr))] lg:min-w-0 lg:grid-cols-[minmax(0,2.62fr)_repeat(4,minmax(0,1fr))]"
          >
            {/* header row */}
            <div role="row" className="contents">
              <div
                role="columnheader"
                className={`flex items-center rounded-3xl bg-white px-4 py-4 font-sans text-table font-semibold text-pricing-ink md:px-6 ${STICKY}`}
              >
                Compare all features
              </div>
              {PASSES.map((p) => (
                <div
                  key={p}
                  role="columnheader"
                  className="flex items-center justify-center rounded-3xl bg-white px-2 py-4 text-center font-sans text-table font-semibold text-pricing-ink md:px-4 lg:px-6"
                >
                  {p}
                </div>
              ))}
            </div>

            {ROWS.map((r, ri) => (
              <div key={r.label} role="row" className="contents">
                <div
                  role="rowheader"
                  className={`relative flex items-center bg-pricing-cell px-4 py-4 font-sans text-table text-pricing-ink md:px-6 ${STICKY} ${
                    ri === 0 ? "rounded-lg rounded-tl-3xl" : "rounded-lg"
                  }`}
                >
                  {r.hint ? <Hint id={`pricing-hint-${ri}`} label={r.label} hint={r.hint} /> : r.label}
                </div>
                {r.vals.map((v, ci) => (
                  <div
                    key={ci}
                    role="cell"
                    className={`flex min-h-14 items-center justify-center rounded-lg bg-pricing-cell px-2 py-4 md:px-4 lg:px-6 ${
                      ri === 0 && ci === LAST_COL ? "rounded-tr-3xl" : ""
                    } ${ri === LAST_ROW && ci === LAST_COL ? "rounded-br-3xl" : ""}`}
                  >
                    <Value v={v} />
                  </div>
                ))}
              </div>
            ))}

            {/* explore — dark cell under the label column */}
            <div role="row" className="contents">
              <div role="cell" className={`${STICKY} rounded-b-3xl rounded-t-lg`}>
                <a
                  href="/ways-to-engage"
                  className="flex h-13 items-center justify-center rounded-b-3xl rounded-t-lg bg-pricing-ink px-6 font-sans text-table text-white transition-colors duration-200 hover:bg-black focus-visible:outline-offset-2"
                >
                  Explore all features
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
