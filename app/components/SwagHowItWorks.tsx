/* How it works — Figma /swag 2:25161 ("From design to delivery, handled").
   A #f2f2f2 tray of three white step cards; step 01 is wider and carries a
   design-editor visual (green frame + toolbar + t-shirt mockup + Approved
   notification). Left-aligned header. Stacks on mobile. */

function ToolIcon({ name }: { name: string }) {
  const p = {
    className: "size-3.5 text-white/90",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "scan")
    return (
      <svg {...p}>
        <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
      </svg>
    );
  if (name === "type")
    return (
      <svg {...p}>
        <path d="M4 7V4h16v3M9 20h6M12 4v16" />
      </svg>
    );
  return (
    <svg {...p}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
    </svg>
  );
}

const STEPS = [
  {
    n: "02",
    title: ["We warehouse", "& manage"],
    desc: "Your inventory lives in our warehouse, with live counts. No closets, no spreadsheets.",
  },
  {
    n: "03",
    title: ["Send", "anywhere"],
    desc: "Open a store, send a kit, or bulk-ship to 170+ countries. People add their own size and address.",
  },
];

function StepText({ n, title, desc }: { n: string; title: string[]; desc: string }) {
  return (
    <>
      <p className="font-sans text-[1rem] tracking-[0.025rem] text-[#828282]">{n}</p>
      <div className="flex flex-col gap-5">
        <h3 className="font-display text-[1.5625rem] leading-[1.04] tracking-[-0.01875rem] text-swag-ink">
          {title.map((t, i) => (
            <span key={i} className="block">
              {t}
            </span>
          ))}
        </h3>
        <p className="font-sans text-[0.9375rem] leading-[1.5] text-swag-grey">
          {desc}
        </p>
      </div>
    </>
  );
}

export default function SwagHowItWorks() {
  return (
    <section className="bg-white px-section-x-sm py-20 md:px-section-x-md md:py-24 lg:px-section-x-lg lg:py-28">
      <div className="mx-auto flex w-full max-w-content flex-col gap-10">
        {/* header (left-aligned) */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-swag-green-deep md:text-eyebrow-md"
            >
              HOW IT WORKS
            </p>
            <h2
              data-animation="reveal"
              className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem] lg:text-[2.75rem]"
            >
              From design to delivery, handled
            </h2>
          </div>
          <p
            data-animation="reveal"
            className="font-sans text-body-md text-swag-grey lg:text-[1.125rem] lg:leading-[1.48]"
          >
            Three steps from idea to someone&rsquo;s doorstep. No minimums, no
            guesswork.
          </p>
        </div>

        {/* steps tray */}
        <div
          data-animation="reveal"
          className="flex flex-col gap-2.5 rounded-3xl bg-[#f2f2f2] p-2.5 lg:flex-row lg:items-stretch"
        >
          {/* step 01 — with visual */}
          <div className="flex flex-col gap-6 rounded-xl bg-white p-7 shadow-[0_0.1875rem_0.375rem_rgba(0,0,0,0.06)] sm:flex-row sm:items-end lg:w-[38.125rem] lg:shrink-0">
            <div className="flex flex-1 flex-col justify-between gap-8">
              <StepText n="01" title={["Design", "& approve"]} desc="Pick products, drop in your logo, approve a free mockup — within 48 hours." />
            </div>
            {/* design-editor visual */}
            <div className="relative h-[20.75rem] w-full shrink-0 overflow-hidden rounded-3xl bg-[radial-gradient(120%_100%_at_100%_0%,#0d4531_0%,transparent_55%),linear-gradient(150deg,#0a3d2a_0%,#05231a_45%,#6bad8f_120%)] sm:w-[16.5rem]">
              {/* toolbar */}
              <div className="absolute left-1/2 top-4 flex -translate-x-1/2 items-center gap-0.5 rounded-2xl bg-black/50 p-1.5">
                {["scan", "type", "image"].map((n) => (
                  <span key={n} className="flex size-8 items-center justify-center">
                    <ToolIcon name={n} />
                  </span>
                ))}
                <span className="flex size-8 items-center justify-center">
                  <span className="size-4 rounded-md bg-[#f2f2f2]" />
                </span>
              </div>
              {/* shirt */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[rgba(255,252,240,0.2)] p-4 shadow-[0.1875rem_0.375rem_2rem_rgba(0,0,0,0.33)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/swag/swag-shirt.png"
                  alt="Custom t-shirt design preview"
                  className="h-[11.875rem] w-[11.0625rem] object-contain"
                />
              </div>
              {/* approved notif */}
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/80 py-1.5 pl-1.5 pr-4 backdrop-blur">
                <span className="flex items-center rounded-full bg-black p-1">
                  <svg className="size-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <span className="font-sans text-[0.9375rem] text-[#121212]">
                  Approved!
                </span>
              </div>
            </div>
          </div>

          {/* steps 02, 03 */}
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="flex flex-1 flex-col justify-between gap-16 rounded-xl bg-white p-7 shadow-[0_0.1875rem_0.375rem_rgba(0,0,0,0.06)]"
            >
              <StepText {...s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
