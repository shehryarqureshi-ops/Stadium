/* Platform — Figma /swag 2:25186 ("The stack behind every send"). A 3×2 grid
   of feature cards, each with a mini UI mockup + title + description. Figma
   ships richly-detailed mockups; these are faithful-but-simplified CSS
   recreations (headings/descriptions are exact). 3-up desktop → 1-up mobile. */

const dot =
  "bg-[radial-gradient(rgba(16,153,90,0.14)_1px,transparent_1px)] [background-size:0.75rem_0.75rem]";

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`relative flex h-[13.5rem] items-center justify-center overflow-hidden rounded-xl border border-grey-200 bg-[#fafbfa] ${dot}`}
    >
      {children}
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
    <div className="flex w-[78%] items-center justify-between rounded-lg bg-white px-3 py-4 shadow-[0_0.5rem_1.25rem_rgba(0,0,0,0.1)]">
      <span className="size-6 rounded-full bg-grey-200" />
      <span className="mx-1 h-px flex-1 border-t border-dashed border-grey-300" />
      <span className="flex size-6 items-center justify-center rounded-full bg-swag-green-deep text-[0.625rem] text-white">
        ✦
      </span>
      <span className="mx-1 h-px flex-1 border-t border-dashed border-grey-300" />
      <span className="flex size-6 items-center justify-center rounded-full bg-swag-green-deep text-[0.625rem] text-white">
        ✓
      </span>
    </div>
  );
}

function IntegrationsMock() {
  const names = ["Oracle", "factorial", "Sage", "fountain", "Humaans", "HR Cloud", "Ashby", "ADP", "Zelt"];
  return (
    <div className="grid w-[80%] grid-cols-3 gap-1.5">
      {names.map((n) => (
        <span key={n} className="truncate rounded-md bg-white px-1.5 py-1.5 text-center text-[0.5rem] font-semibold text-swag-grey shadow-[0_0.125rem_0.375rem_rgba(0,0,0,0.06)]">
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
      <span className="absolute -bottom-1 right-2 rounded bg-swag-green-deep px-1.5 py-0.5 text-[0.4375rem] font-semibold text-white">
        On track
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
