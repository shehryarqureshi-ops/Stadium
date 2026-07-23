/* Fulfillment matrix — Figma /swag 2:25104 ("Every fulfillment model, one
   setup"). A rounded dark-green gradient card holding a 4×3 comparison matrix
   (rows: Stores / Kits / Send Items / In-Person; columns: On-Demand / Bulk /
   Stored) of translucent tiles. Table scrolls horizontally on mobile. */

function Icon({ name }: { name: string }) {
  const common = {
    className: "size-[1.125rem] shrink-0 text-white",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "store")
    return (
      <svg {...common}>
        <path d="M3 9 4.5 4h15L21 9" />
        <path d="M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9" />
        <path d="M9 20v-6h6v6" />
        <path d="M3 9h18" />
      </svg>
    );
  if (name === "box")
    return (
      <svg {...common}>
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    );
  if (name === "send")
    return (
      <svg {...common}>
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M8 8h8v8" />
        <path d="m8 16 8-8" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

const COLS = ["On-Demand", "Bulk", "Stored"];
const ROWS = [
  { icon: "store", label: "Stores", vals: ["Print per order", "Pre-buy inventory", "Ship from Locker"] },
  { icon: "box", label: "Kits", vals: ["Assemble on order", "Pre-knitted runs", "Kits in Locker"] },
  { icon: "send", label: "Send Items", vals: ["One-off sends", "Batch campaigns", "Pull from stock"] },
  { icon: "users", label: "In-Person", vals: ["Ever print", "Event bulk order", "Staged & shipped"] },
];

function corner(r: number, c: number) {
  if (r === 0 && c === 0) return "rounded-xl rounded-tl-2xl";
  if (r === 0 && c === 3) return "rounded-xl rounded-tr-2xl";
  if (r === 3 && c === 0) return "rounded-xl rounded-bl-2xl";
  if (r === 3 && c === 3) return "rounded-xl rounded-br-2xl";
  return "rounded-xl";
}

export default function SwagFulfillment() {
  return (
    <section className="bg-white px-section-x-sm py-3 md:px-section-x-md lg:px-section-x-lg">
      <div className="relative mx-auto flex max-w-content flex-col items-center gap-10 overflow-hidden rounded-[3rem] bg-[radial-gradient(90%_120%_at_100%_-10%,#0d4531_0%,transparent_55%),radial-gradient(95%_110%_at_-10%_115%,#1d6b5b_0%,transparent_58%),linear-gradient(155deg,#07291d_0%,#03130d_55%,#062b21_100%)] px-6 py-16 md:rounded-[3.75rem] md:px-16 md:py-24 lg:px-24 lg:py-[8.75rem]">
        {/* header */}
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="flex flex-col items-center gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-[#a7b5af] md:text-eyebrow-md"
            >
              FULFILLMENT, YOUR WAY
            </p>
            <h2
              data-animation="reveal"
              className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.01rem] text-white md:text-[2.25rem] lg:text-[2.75rem]"
            >
              Every fulfillment model, one setup
            </h2>
          </div>
          <p
            data-animation="reveal"
            className="font-sans text-body-md text-[#e8f0ec] lg:text-[1.125rem] lg:leading-[1.45]"
          >
            Whether you print swag on demand, buy in bulk, or pull from stock,
            Stadium does all three. Most vendors only do one.
          </p>
        </div>

        {/* matrix (scrolls horizontally on mobile) */}
        <div
          data-animation="reveal"
          className="w-full max-w-[62.75rem] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="min-w-[46rem]">
            {/* column headers */}
            <div className="mb-2 grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-2">
              <div />
              {COLS.map((c) => (
                <div key={c} className="px-6 py-3 text-center font-sans text-[0.9rem] text-[#a7b5af]">
                  {c}
                </div>
              ))}
            </div>
            {/* rows */}
            <div className="flex flex-col gap-2">
              {ROWS.map((row, r) => (
                <div key={row.label} className="grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-2">
                  <div className={`flex items-center gap-2.5 bg-[#02120b]/50 p-6 ${corner(r, 0)}`}>
                    <Icon name={row.icon} />
                    <span className="font-sans text-[0.9rem] font-semibold text-white">
                      {row.label}
                    </span>
                  </div>
                  {row.vals.map((v, c) => (
                    <div
                      key={v}
                      className={`flex items-center justify-center bg-[#02120b]/50 p-6 text-center font-sans text-[0.9rem] font-semibold text-white ${corner(r, c + 1)}`}
                    >
                      {v}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
