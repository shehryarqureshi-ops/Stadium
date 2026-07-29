/* How it works — Figma /swag 2:25161 ("From design to delivery, handled").
   A #f2f2f2 tray of three white step cards. Each card floats its step number at
   the top and holds the title (+ desc on step 01) in a nested #f7f7f7 sub-card
   at the bottom. Step 01 is wider and carries a DARK design-editor visual
   (black gradient + toolbar + t-shirt mockup + green "Approved!" pill). */

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

/* Themed product glyph shown in the editor's product card when no real photo
   exists yet (snacks/gifting Figma reuse a swag t-shirt mockup as placeholder). */
function ProductGlyph({ name }: { name?: "snack" | "gift" | "shirt" }) {
  const p = {
    className: "size-16 text-swag-green-deep/60",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "gift")
    return (
      <svg {...p}>
        <rect x="3" y="8" width="18" height="4" rx="1" />
        <path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
        <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
      </svg>
    );
  // snack (default) — a treat box
  return (
    <svg {...p}>
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
    </svg>
  );
}

export type SwagHowItWorksStep = {
  n: string;
  title: string[];
  desc?: string;
};

export type SwagHowItWorksContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  /** Wide first card (step 01) that carries the dark design-editor visual. */
  featuredStep: SwagHowItWorksStep;
  /** Remaining plain step cards (02, 03, …). */
  steps: SwagHowItWorksStep[];
  /** Content for the dark design-editor illustration inside the featured card.
     Omit to render a plain themed image slot instead (e.g. /events, /snacks —
     whose Figma step 01 shows a plain image placeholder, not the swag editor). */
  visual?: {
    /** Toolbar icon names — recognized values: "scan", "type"; anything else renders the image icon. */
    tools: string[];
    /** Image path string (e.g. "/swag/swag-shirt.png"). Omit to show a themed
       product glyph instead — used where no real product photo exists yet. */
    imageSrc?: string;
    imageAlt?: string;
    badgeLabel: string;
    /** Glyph rendered in the product card when imageSrc is omitted. */
    productGlyph?: "snack" | "gift" | "shirt";
  };
};

export const SWAG_HOWITWORKS: SwagHowItWorksContent = {
  eyebrow: "HOW IT WORKS",
  heading: "From design to delivery, handled",
  intro:
    "Three steps from idea to someone’s doorstep. No minimums, no guesswork.",
  featuredStep: {
    n: "01",
    title: ["Design", "& approve"],
    desc: "Pick products, drop in your logo, approve a free mockup — within 48 hours.",
  },
  steps: [
    { n: "02", title: ["We warehouse", "& manage"] },
    { n: "03", title: ["Send", "anywhere"] },
  ],
  visual: {
    tools: ["scan", "type", "image"],
    imageSrc: "/swag/swag-shirt.png",
    imageAlt: "Custom t-shirt design preview",
    badgeLabel: "Approved!",
  },
};

function StepBlock({ n, title, desc }: { n: string; title: string[]; desc?: string }) {
  return (
    <>
      <div className="p-4">
        <p className="font-sans text-[1rem] tracking-[0.025rem] text-[#828282]">{n}</p>
      </div>
      <div className="flex w-full flex-col gap-4 rounded-3xl bg-[#f7f7f7] p-6">
        <h3 className="font-display text-[1.5625rem] leading-[1.04] tracking-[-0.01875rem] text-swag-ink">
          {title.map((t, i) => (
            <span key={i} className="block">
              {t}
            </span>
          ))}
        </h3>
        {desc && (
          <p className="font-sans text-[0.9375rem] leading-[1.5] text-swag-grey">
            {desc}
          </p>
        )}
      </div>
    </>
  );
}

export default function SwagHowItWorks({ content = SWAG_HOWITWORKS }: { content?: SwagHowItWorksContent }) {
  const v = content.visual;
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
              {content.eyebrow}
            </p>
            <h2
              data-animation="reveal"
              className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem] lg:text-[2.75rem]"
            >
              {content.heading}
            </h2>
          </div>
          <p
            data-animation="reveal"
            className="font-sans text-body-md text-swag-grey lg:text-[1.125rem] lg:leading-[1.48]"
          >
            {content.intro}
          </p>
        </div>

        {/* steps tray */}
        <div
          data-animation="reveal"
          className="flex flex-col gap-4 rounded-[2rem] bg-[#f2f2f2] p-4 lg:flex-row lg:items-stretch"
        >
          {/* step 01 — with dark design-editor visual */}
          <div className="flex flex-col gap-2.5 rounded-3xl bg-white p-2.5 shadow-[0_1.25rem_1.25rem_-0.125rem_rgba(0,0,0,0.15),0_0.375rem_0.375rem_-0.0625rem_rgba(0,0,0,0.11)] sm:flex-row sm:items-end lg:w-[36.75rem] lg:shrink-0">
            <div className="flex flex-1 flex-col justify-between self-stretch">
              <StepBlock
                n={content.featuredStep.n}
                title={content.featuredStep.title}
                desc={content.featuredStep.desc}
              />
            </div>
            {v ? (
              /* dark design-editor visual (swag) */
              <div className="relative h-[20.75rem] w-full shrink-0 overflow-hidden rounded-2xl bg-gradient-to-b from-[#1a1a1a] to-[#333] sm:w-[16.5625rem]">
                {/* toolbar */}
                <div className="absolute left-1/2 top-4 flex -translate-x-1/2 items-center gap-0.5 rounded-2xl bg-white/10 p-1.5">
                  {v.tools.map((n) => (
                    <span key={n} className="flex size-8 items-center justify-center">
                      <ToolIcon name={n} />
                    </span>
                  ))}
                  <span className="flex size-8 items-center justify-center">
                    <span className="size-4 rounded-md bg-[#f2f2f2]" />
                  </span>
                </div>
                {/* product card */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[rgba(255,255,255,0.2)] p-4 shadow-[0.1875rem_0.375rem_2rem_rgba(0,0,0,0.33)]">
                  {v.imageSrc ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={v.imageSrc}
                        alt={v.imageAlt ?? ""}
                        className="h-[11.875rem] w-[11.0625rem] object-contain"
                      />
                    </>
                  ) : (
                    <div className="flex h-[11.875rem] w-[11.0625rem] items-center justify-center rounded-xl bg-white/85">
                      <ProductGlyph name={v.productGlyph} />
                    </div>
                  )}
                </div>
                {/* approved notif */}
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/80 py-1.5 pl-1.5 pr-4 backdrop-blur">
                  <span className="flex items-center rounded-full bg-swag-green-deep p-1">
                    <svg className="size-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="font-sans text-[0.9375rem] text-[#121212]">
                    {v.badgeLabel}
                  </span>
                </div>
              </div>
            ) : (
              /* plain themed image slot — matches Figma's grey step-01 placeholder */
              <div className="flex min-h-[20.5rem] w-full flex-1 items-center justify-center self-stretch overflow-hidden rounded-[1.25rem] bg-[linear-gradient(150deg,var(--color-swag-grad-1,#f2f2f2),var(--color-swag-grad-2,#e0e0e0))]">
                <svg
                  className="size-14 text-swag-green/25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M8 2v4M16 2v4M3 10h18" />
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="m9 16 2 2 4-4" />
                </svg>
              </div>
            )}
          </div>

          {/* steps 02, 03 */}
          {content.steps.map((s) => (
            <div
              key={s.n}
              className="flex flex-1 flex-col justify-between rounded-3xl bg-white p-2.5 shadow-[0_0.1875rem_0.375rem_rgba(0,0,0,0.06)]"
            >
              <StepBlock {...s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
