/* Platform — Figma /swag 2:25186 ("The stack behind every send"). A 3×2 grid
   of feature cards, each with a mini UI mockup + title + description. Figma
   ships richly-detailed mockups; these are faithful-but-simplified CSS
   recreations (headings/descriptions are exact). 3-up desktop → 1-up mobile. */

const dot =
  "bg-[radial-gradient(rgba(16,153,90,0.14)_1px,transparent_1px)] [background-size:0.75rem_0.75rem]";

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`relative flex h-[13.5rem] items-center justify-center overflow-hidden rounded-xl border border-grey-200 bg-[#f6faf7] ${dot}`}
    >
      {/* soft brand-green ambient wash bleeding across the mockup region */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(115%_95%_at_50%_112%,rgba(16,153,90,0.20),transparent_66%)]"
      />
      <span className="relative z-10 flex w-full items-center justify-center">
        {children}
      </span>
    </div>
  );
}

function StoresMock() {
  return (
    <div className="w-[62%] rounded-lg bg-white p-3 shadow-[0_0.5rem_1.25rem_rgba(0,0,0,0.1)]">
      <div className="mb-2 flex items-center gap-1 rounded bg-grey-100 px-2 py-1 text-[0.5rem] text-grey-500">
        <span className="size-1.5 rounded-full bg-grey-300" /> yourbrand.com
      </div>
      <div className="mb-1 h-4 rounded bg-grey-100" />
      <div className="mb-2 h-4 rounded bg-grey-100" />
      <div className="flex items-center justify-between">
        <span className="size-4 rounded-full bg-grey-200" />
        <span className="rounded bg-swag-ink px-2 py-1 text-[0.5rem] font-bold text-white">
          LOG IN
        </span>
      </div>
    </div>
  );
}

function InventoryMock() {
  return (
    <div className="w-[68%] rounded-lg bg-white p-2 shadow-[0_0.5rem_1.25rem_rgba(0,0,0,0.1)]">
      {[
        ["T-Shirt", "1,250"],
        ["Hoodie", "820"],
        ["Tote bag", "540"],
        ["Mug", "320"],
      ].map(([a, b]) => (
        <div key={a} className="flex items-center justify-between border-b border-grey-100 px-1.5 py-1.5 text-[0.625rem] last:border-0">
          <span className="flex items-center gap-1.5 text-swag-ink">
            <span className="size-3 rounded bg-grey-200" />
            {a}
          </span>
          <span className="font-semibold text-swag-grey">{b}</span>
        </div>
      ))}
    </div>
  );
}

function FulfillMock() {
  return (
    <div className="relative flex size-full items-center justify-center">
      <svg viewBox="0 0 200 90" className="w-[70%] text-swag-green-deep/50" fill="currentColor" aria-hidden>
        {Array.from({ length: 120 }).map((_, i) => (
          <circle key={i} cx={(i % 20) * 10 + 5} cy={Math.floor(i / 20) * 15 + 8} r="1.1" opacity={((i * 7) % 5) > 2 ? 0.8 : 0.15} />
        ))}
      </svg>
      <span className="absolute right-3 top-3 rounded-lg bg-white px-2 py-1 text-[0.5rem] font-semibold text-swag-ink shadow-sm">
        170+ Destinations
      </span>
      <span className="absolute bottom-3 left-3 rounded-lg bg-white px-2 py-1 text-[0.5rem] font-semibold text-swag-green-deep shadow-sm">
        ✓ Customs Handled
      </span>
    </div>
  );
}

function GiftingMock() {
  return (
    <div className="flex w-[82%] flex-col gap-3 rounded-lg bg-white px-3 py-3 shadow-[0_0.5rem_1.25rem_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between text-[0.4375rem] font-bold uppercase tracking-[0.03em] text-swag-grey">
        <span>New hire</span>
        <span>Gift delivered</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="size-6 rounded-full bg-gradient-to-br from-swag-green to-swag-green-deep" />
        <span className="mx-1 h-px flex-1 border-t border-dashed border-grey-300" />
        <span className="flex size-6 items-center justify-center rounded-full bg-swag-green-deep text-white">
          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="3" y="8" width="18" height="4" rx="1" />
            <path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M12 8H7.5a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8ZM12 8h4.5a2.5 2.5 0 0 0 0-5C13 3 12 8 12 8Z" />
          </svg>
        </span>
        <span className="mx-1 h-px flex-1 border-t border-dashed border-grey-300" />
        <span className="flex size-6 items-center justify-center rounded-full bg-swag-green-deep text-white">
          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
      </div>
    </div>
  );
}

function IntegrationsMock() {
  // full-color wordmarks; the wall runs wider than the panel so outer logos
  // bleed past the (clipped) card edges, matching the design's overflow treatment
  const logos: [string, string][] = [
    ["ORACLE", "#C74634"], ["factorial", "#FF365E"], ["Sage", "#00A63E"], ["Justworks", "#1B3B6F"],
    ["fountain", "#2F6BFF"], ["Humaans", "#111827"], ["UKG", "#005151"], ["Greenhouse", "#1F9E5A"],
    ["HR Cloud", "#2AA8E0"], ["Ashby", "#6B4CE6"], ["ADP", "#D0271D"], ["zelt", "#111111"],
  ];
  return (
    <div className="grid w-[118%] grid-cols-4 gap-1.5">
      {logos.map(([n, color]) => (
        <span
          key={n}
          style={{ color }}
          className="truncate rounded-md bg-white px-2 py-1.5 text-center text-[0.5rem] font-bold shadow-[0_0.125rem_0.375rem_rgba(0,0,0,0.06)]"
        >
          {n}
        </span>
      ))}
    </div>
  );
}

function ReportingMock() {
  return (
    <div className="relative w-[72%] rounded-lg bg-white p-3 shadow-[0_0.5rem_1.25rem_rgba(0,0,0,0.1)]">
      <p className="text-[0.75rem] font-bold text-swag-ink">2.7x</p>
      <p className="mb-2 text-[0.5rem] text-swag-grey">more employee recognition</p>
      <svg viewBox="0 0 120 40" className="w-full" fill="none" aria-hidden>
        <path d="M2 36 C25 34 40 26 60 22 S100 8 118 4" stroke="#10995a" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="absolute -bottom-1 right-2 flex items-center gap-1.5 rounded-lg bg-white px-2 py-1 shadow-[0_0.125rem_0.5rem_rgba(0,0,0,0.12)]">
        <svg className="size-3 text-swag-green-deep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="m3 17 6-6 4 4 8-8" />
        </svg>
        <span className="flex flex-col leading-tight">
          <span className="text-[0.4375rem] font-bold text-swag-ink">On track</span>
          <span className="text-[0.375rem] text-swag-grey">18% under budget</span>
        </span>
      </span>
    </div>
  );
}

const CARDS = [
  { mock: <StoresMock />, title: "Branded Stores", desc: "Branded storefronts with budgets, approvals, and SSO." },
  { mock: <InventoryMock />, title: "Inventory & Storage", desc: "Live inventory, warehouse storage, and kitting in one place." },
  { mock: <FulfillMock />, title: "Global Fulfillment", desc: "Ship to 170+ countries, with customs and duties handled." },
  { mock: <GiftingMock />, title: "Automated Gifting", desc: "Automatically send swag for new hires, milestones, or API-triggered events." },
  { mock: <IntegrationsMock />, title: "Integrations", desc: "Integrate with 100+ tools, including your HRIS, Slack, and CRM, to automate sends." },
  { mock: <ReportingMock />, title: "Budgets & Reporting", desc: "Get a complete view of spend, inventory, and redemption." },
];

export default function SwagPlatform() {
  return (
    <section className="bg-white px-section-x-sm py-20 md:px-section-x-md md:py-24 lg:px-section-x-lg lg:py-28">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-12">
        <div className="flex max-w-[40rem] flex-col items-center gap-5 text-center">
          <div className="flex flex-col items-center gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-swag-green-deep md:text-eyebrow-md"
            >
              THE PLATFORM
            </p>
            <h2
              data-animation="reveal"
              className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem] lg:text-[2.75rem]"
            >
              The stack behind every send
            </h2>
          </div>
          <p
            data-animation="reveal"
            className="font-sans text-body-md text-swag-grey lg:text-[1.125rem] lg:leading-[1.45]"
          >
            Everything you need to run swag at scale, from storefronts and
            inventory to automation and reporting.
          </p>
        </div>

        <div
          data-animation="reveal"
          className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CARDS.map((c) => (
            <article
              key={c.title}
              className="flex flex-col gap-5 rounded-2xl border border-grey-200 bg-white p-4 lg:p-5"
            >
              <Panel>{c.mock}</Panel>
              <div className="flex flex-col gap-2 px-1 pb-2">
                <h3 className="font-display text-[1.375rem] text-swag-ink">
                  {c.title}
                </h3>
                <p className="font-sans text-body-md leading-[1.5] text-swag-grey">
                  {c.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
