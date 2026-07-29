/* Recognition · ROI + proof — Figma /recognition 312:5463 ("Recognition that
   pays for itself"). A white section with a centered header, a bespoke stat
   grid (a tall photo-stat + a line-chart card + an area-chart card + a
   dot-field card), and a two-panel ROI comparison (a "before" input card → an
   "after" savings card with floating pills). The recognition vertical is
   lilac-accented (accent-lilac #8d12e7, deep-plum #2a0845 stat numerals,
   #f4e7fd/#f8f1fe/#f0defc tints) rather than the Swag green. Decorative charts,
   the dot field and the background glows are drawn inline (SVG/CSS) — only the
   photo is a downloaded asset — so the section stays crisp and responsive.

   Content is lifted into a typed, exported default const so this section can be
   reused with a different `content` prop; layout/style/colors stay hardcoded. */

export type RecognitionStat = {
  value: string;
  /** One line per array entry (rendered as stacked lines). */
  label: string[];
};

export type RecognitionRoiField = {
  label: string;
  value: string;
  suffix: string;
};

export type RecognitionContent = {
  heading: string;
  subheading: string;
  /** Exactly four stats: [photo stat, line-chart stat, area-chart stat, dot stat]. */
  stats: RecognitionStat[];
  /** Photo behind the first (tall) stat card. Public-path string. */
  photoSrc: string;
  roi: {
    title: string;
    body: string;
    fields: RecognitionRoiField[];
    /** Floating "before → after" pills on the results card. */
    pills: { caption: string; from: string; to: string; delta: string }[];
    savingsValue: string;
    savingsLabel: string[];
    ctaLabel: string;
  };
};

export const RECOGNITION_CONTENT: RecognitionContent = {
  heading: "Recognition that pays for itself",
  subheading: "What teams using Stadium see.",
  stats: [
    { value: "2.7x", label: ["more employee-to-employee", "recognition"] },
    { value: "+18", label: ["eNPS lift, first 12 months"] },
    { value: "31%", label: ["lower turnover,", "first year median"] },
    { value: "96%", label: ["reward redemption", "vs ~62% points-only"] },
  ],
  photoSrc: "/recognition/recognition-photo.jpg",
  roi: {
    title: "See your potential ROI",
    body: "Plug in your team's numbers to estimate what a switch to Stadium could save you each year.",
    fields: [
      { label: "EMPLOYEES", value: "850", suffix: "people" },
      { label: "CURRENT REC. SPEND", value: "$72K", suffix: "/year" },
      { label: "AVG GIFT VALUE", value: "$45", suffix: "USD" },
      { label: "HR ADMIN HOURS", value: "12", suffix: "hrs/wk" },
    ],
    pills: [
      { caption: "Gift value", from: "$45", to: "$58", delta: "+29%" },
      { caption: "Platform spend", from: "$72k", to: "$48k", delta: "-24K" },
    ],
    savingsValue: "$48,600",
    savingsLabel: ["Estimated annual savings", "with Stadium"],
    ctaLabel: "Book a demo",
  },
};

/* ---- inline icons (Lucide geometry, matching the codebase convention) ---- */
function IconChartSpline() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-6" aria-hidden>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <path d="M7 15c.9-2.4 1.9-6 4-6 2.2 0 2 4 4 4 2.3 0 3.4-5 5-7" />
    </svg>
  );
}
function IconArrowRight({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
function IconArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden>
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}
function IconMoveRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden>
      <path d="M18 8l4 4-4 4M2 12h20" />
    </svg>
  );
}
function IconGift() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="size-[1.125rem] text-swag-ink" aria-hidden>
      <path d="M20 12v10H4V12" />
      <path d="M2 7h20v5H2z" />
      <path d="M12 22V7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  );
}
function IconDollar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="size-[1.125rem] text-swag-ink" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M16 8.5h-5a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H8" />
      <path d="M12 6v2m0 8v2" />
    </svg>
  );
}

/* rising line chart with soft plum area fill (Card B decoration) */
function LineChart() {
  return (
    <svg viewBox="0 0 320 120" preserveAspectRatio="none" className="size-full" aria-hidden>
      <defs>
        <linearGradient id="rec-line-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8d12e7" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#8d12e7" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 104 C40 96 60 84 96 76 C136 67 152 58 196 44 C236 32 268 22 320 10 L320 120 L0 120 Z" fill="url(#rec-line-fill)" />
      <path d="M0 104 C40 96 60 84 96 76 C136 67 152 58 196 44 C236 32 268 22 320 10" fill="none" stroke="#8d12e7" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/* filled area chart (Card C decoration) */
function AreaChart() {
  return (
    <svg viewBox="0 0 280 100" preserveAspectRatio="none" className="size-full" aria-hidden>
      <defs>
        <linearGradient id="rec-area-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8d12e7" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#8d12e7" stopOpacity="0.04" />
        </linearGradient>
      </defs>
      <path d="M0 78 C36 70 54 44 92 44 C130 44 150 66 190 60 C228 54 250 30 280 26 L280 100 L0 100 Z" fill="url(#rec-area-fill)" />
      <path d="M0 78 C36 70 54 44 92 44 C130 44 150 66 190 60 C228 54 250 30 280 26" fill="none" stroke="#8d12e7" strokeWidth="2.25" strokeLinecap="round" />
    </svg>
  );
}

const STAT_NUM = "font-display text-[2.5rem] leading-[1.04] tracking-[-0.0625rem] text-[#2a0845] lg:text-[3rem]";
const STAT_LABEL = "font-sans text-[0.875rem] leading-[1.48] text-swag-grey";

function StatCardText({ stat, className = "" }: { stat: RecognitionStat; className?: string }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <p className={STAT_NUM}>{stat.value}</p>
      <p className={STAT_LABEL}>
        {stat.label.map((l, i) => (
          <span key={i} className="block">
            {l}
          </span>
        ))}
      </p>
    </div>
  );
}

export default function Recognition({
  content = RECOGNITION_CONTENT,
}: {
  content?: RecognitionContent;
}) {
  const { roi } = content;
  return (
    <section className="relative overflow-hidden bg-white px-section-x-sm pb-20 pt-4 md:px-section-x-md md:pb-24 lg:px-section-x-lg lg:pb-28">
      {/* soft plum symbol glows echoing the Figma gradient watermarks */}
      <div aria-hidden className="pointer-events-none absolute -right-40 top-16 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(141,18,231,0.08),transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(141,18,231,0.06),transparent_70%)]" />

      <div className="relative mx-auto flex w-full max-w-content flex-col gap-10">
        {/* header */}
        <div className="flex flex-col items-center gap-5 text-center">
          <h2
            data-animation="reveal"
            className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem] lg:text-[2.75rem]"
          >
            {content.heading}
          </h2>
          <p
            data-animation="reveal"
            className="font-sans text-body-md leading-[1.48] text-swag-grey lg:text-[1.125rem]"
          >
            {content.subheading}
          </p>
        </div>

        {/* stat grid */}
        <div
          data-animation="reveal"
          className="grid grid-cols-1 gap-4 lg:h-[36rem] lg:grid-cols-3 lg:grid-rows-2"
        >
          {/* A — tall photo stat */}
          <article className="relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_0.1875rem_0.375rem_rgba(0,0,0,0.06)] lg:col-start-1 lg:row-span-2 lg:row-start-1">
            <div className="flex flex-col gap-2 p-8">
              <p className={STAT_NUM}>{content.stats[0].value}</p>
              <p className={STAT_LABEL}>
                {content.stats[0].label.map((l, i) => (
                  <span key={i} className="block">
                    {l}
                  </span>
                ))}
              </p>
            </div>
            <div className="relative min-h-[15rem] flex-1 overflow-hidden rounded-t-[2rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={content.photoSrc} alt="" aria-hidden className="size-full object-cover" />
              <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#f4e7fd] to-transparent" />
            </div>
          </article>

          {/* B — line-chart stat (wide) */}
          <article className="relative flex flex-col justify-start overflow-hidden rounded-2xl bg-white p-8 shadow-[0_0.1875rem_0.375rem_rgba(0,0,0,0.06)] lg:col-span-2 lg:col-start-2 lg:row-start-1">
            <div className="pointer-events-none absolute inset-x-8 bottom-0 top-8 opacity-90">
              <LineChart />
            </div>
            <StatCardText stat={content.stats[1]} className="relative" />
          </article>

          {/* C — area-chart stat */}
          <article className="relative flex flex-col overflow-hidden rounded-2xl bg-white p-8 shadow-[0_0.1875rem_0.375rem_rgba(0,0,0,0.06)] lg:col-start-2 lg:row-start-2">
            <StatCardText stat={content.stats[2]} className="relative" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2">
              <AreaChart />
            </div>
          </article>

          {/* D — dot-field stat */}
          <article className="relative flex flex-col overflow-hidden rounded-2xl bg-white p-8 shadow-[0_0.1875rem_0.375rem_rgba(0,0,0,0.06)] lg:col-start-3 lg:row-start-2">
            <StatCardText stat={content.stats[3]} className="relative" />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-16 -right-16 size-64 rounded-full opacity-60 [background-image:radial-gradient(#d9b8f6_1.5px,transparent_1.5px)] [background-size:14px_14px] [mask-image:radial-gradient(circle_at_center,#000,transparent_70%)]"
            />
          </article>
        </div>

        {/* ROI comparison */}
        <div
          data-animation="reveal"
          className="flex flex-col items-stretch gap-6 lg:flex-row lg:items-center lg:gap-4"
        >
          {/* before */}
          <div className="relative flex flex-col gap-11 overflow-hidden rounded-2xl bg-white p-8 shadow-[0_0.1875rem_0.375rem_rgba(0,0,0,0.06)] md:p-11 lg:w-[36.5rem] lg:shrink-0">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-40 size-[24rem] rounded-full bg-[radial-gradient(circle,rgba(141,18,231,0.10),transparent_70%)]" />
            <div className="relative flex flex-col gap-5">
              <span className="text-[#8d12e7]">
                <IconChartSpline />
              </span>
              <h3 className="font-display text-[1.75rem] leading-[1.04] tracking-[-0.0375rem] text-[#2a0845]">
                {roi.title}
              </h3>
              <p className="font-sans text-[0.875rem] leading-[1.48] text-swag-grey">
                {roi.body}
              </p>
            </div>
            <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2">
              {roi.fields.map((f) => (
                <label key={f.label} className="flex flex-col gap-1.5">
                  <span className="font-sans text-[0.6875rem] font-medium tracking-[0.02rem] text-[#707075]">
                    {f.label}
                  </span>
                  <span className="flex items-center justify-between rounded-[0.625rem] border border-[#e5e5eb] bg-white px-3.5 py-2.5">
                    <span className="font-display text-[1.125rem] leading-none text-swag-ink">
                      {f.value}
                    </span>
                    <span className="font-sans text-[0.75rem] text-[#707075]">{f.suffix}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* arrow */}
          <div className="mx-auto flex size-12 shrink-0 rotate-90 items-center justify-center text-[#8d12e7] lg:size-[4.5rem] lg:rotate-0">
            <IconArrowRight className="size-8 lg:size-12" />
          </div>

          {/* after */}
          <div className="relative flex min-h-[26.5rem] flex-1 items-center justify-center overflow-hidden rounded-2xl bg-[linear-gradient(155deg,#8d12e7_0%,#5c1a91_55%,#2a0845_100%)] p-8 shadow-[0_0.1875rem_0.375rem_rgba(0,0,0,0.06)]">
            {/* soft lit shapes for depth on the violet panel (Figma color-shapes) */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-40 -left-24 size-[30rem] rounded-full opacity-45 blur-2xl [background:conic-gradient(from_140deg,#c084fc,#8d12e7,#e9d5ff,#c084fc)]"
            />

            {/* floating pill — gift value (top-left) */}
            <div className="absolute left-6 top-10 hidden items-center gap-2 rounded-xl bg-black/10 p-2 backdrop-blur-sm sm:flex">
              <span className="flex items-center rounded-lg bg-white p-3">
                <IconGift />
              </span>
              <span className="flex flex-col gap-1">
                <span className="font-sans text-[0.75rem] tracking-[0.03rem] text-white">
                  {roi.pills[0].caption}
                </span>
                <span className="flex items-center gap-1.5 text-white">
                  <span className="font-sans text-[0.875rem] font-bold">{roi.pills[0].from}</span>
                  <IconMoveRight />
                  <span className="font-sans text-[0.875rem] font-bold">{roi.pills[0].to}</span>
                </span>
              </span>
              <span className="ml-1 self-start rounded-lg bg-[rgba(240,255,244,0.85)] px-2 py-1 font-sans text-[0.875rem] font-bold text-accent-lime">
                {roi.pills[0].delta}
              </span>
            </div>

            {/* floating pill — platform spend (bottom-right) */}
            <div className="absolute bottom-10 right-6 hidden items-center gap-2 rounded-xl bg-black/10 p-2 backdrop-blur-sm sm:flex">
              <span className="flex items-center rounded-lg bg-white p-3">
                <IconDollar />
              </span>
              <span className="flex flex-col gap-1">
                <span className="font-sans text-[0.75rem] tracking-[0.03rem] text-white">
                  {roi.pills[1].caption}
                </span>
                <span className="flex items-center gap-1.5 text-white">
                  <span className="font-sans text-[0.875rem] font-bold">{roi.pills[1].from}</span>
                  <IconMoveRight />
                  <span className="font-sans text-[0.875rem] font-bold">{roi.pills[1].to}</span>
                </span>
              </span>
              <span className="ml-1 self-start rounded-lg bg-[rgba(240,255,244,0.85)] px-2 py-1 font-sans text-[0.875rem] font-bold text-accent-lime">
                {roi.pills[1].delta}
              </span>
            </div>

            {/* central savings card */}
            <div className="relative flex w-[18rem] max-w-full flex-col gap-4 rounded-2xl bg-white p-8 shadow-[0_0.4375rem_1.3125rem_rgba(0,0,0,0.14)]">
              <div className="flex flex-col gap-3">
                <p className="font-display text-[2.8125rem] leading-[1.04] tracking-[-0.0625rem] text-[#2a0845]">
                  {roi.savingsValue}
                </p>
                <p className="font-sans text-[0.875rem] leading-[1.48] text-swag-grey">
                  {roi.savingsLabel.map((l, i) => (
                    <span key={i} className="block">
                      {l}
                    </span>
                  ))}
                </p>
              </div>
              <a
                href="#"
                className="flex items-center justify-end gap-2 self-end border-b border-swag-ink pb-0.5 font-sans text-[0.75rem] font-bold uppercase tracking-[0.0625rem] text-swag-ink transition-opacity hover:opacity-70"
              >
                {roi.ctaLabel}
                <IconArrowUpRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
