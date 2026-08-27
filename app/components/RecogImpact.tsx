/* /recognition · RECOGNITION THAT PAYS FOR ITSELF (Figma
   n9SjmDjzB1PeZAYJ5w43fr → 2504:8298 "Recognition", inside page frame
   2504:6746). A centred title pair, a 3-column stat mosaic (tall photo card
   spanning 2 rows + a wide eNPS spline card spanning 2 columns + two small
   chart/dot cards) and a two-panel ROI block: a white "See your potential ROI"
   panel with four read-only figure fields, a 72px lucide/arrow-right between
   the panels, and a purple gradient panel carrying two floating pills and the
   "$48,600" savings card. Two off-canvas "symbol gradient" blooms (2504:8299
   at x=1470 and 2504:8300 at x=-19, 950×535 each, the S-symbol blurred at 7%)
   bleed in from the right and bottom-left; the section clips them, the same way
   SwagmagicOfferings.tsx handles its glow.

   All charts/blooms are the Figma vectors exported as SVG (never redrawn);
   lucide icons are inlined from the same svgAssets. The four ROI figures are
   STATIC text in Figma, so they ship as read-only display values, not inputs
   (design.md: "no fake controls").

   Figma stack (frame y=5866 h=1497; carries 160 internal top AND bottom space,
   content 2504:8301 y=160 h=1177; x=100/1240 in Figma → the site's 120/1200
   content box, so heights scale by 1200/1240 = 0.9677 where they are driven by
   the column width):
     title block   y=0    h=95    (Satoshi 44/1.08/-0.5 48 · gap 20 · 18/1.48 27)
     gap 40
     stat mosaic   y=135  h=576   (3 cols, gap 16; row = 280 → 271 at 1200;
                                   tall card = 2 rows = 576 → 558 at 1200)
     gap 40
     roi row       y=616  h=426   (584 panel · 72 arrow · 584 panel, no gaps)
     content end   1177 · frame end 1497
   → section = py-16 md:py-20 lg:py-20 (80 + neighbour's 80 = the 160 gap the
     page frames are spaced by), inner column gap 40. */

import Image from "next/image";
import recognitionPhoto from "@/public/recog2/rc-impact-recognition.jpg";

const CARD =
  "relative overflow-hidden rounded-[1rem] bg-white shadow-[0_3px_6px_0_rgba(0,0,0,0.06)]";
const STAT =
  "font-[family-name:var(--font-satoshi)] text-[3rem] font-bold leading-[1.04] tracking-[-0.0625rem] text-[#2a0845]";
const STAT_LABEL = "font-sans text-[0.875rem] leading-[1.48] text-[#6b6c71]";

/* lucide/chart-spline — Figma 2504:8332 (24×24, stroke #8D13E7 2px) */
function ChartSpline() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#8D13E7"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6 shrink-0"
      aria-hidden
    >
      <path d="M3 3V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H21M7 16C7.5 14 8.5 9 11 9C13 9 13 12 15 12C17.5 12 19.5 7 20 5" />
    </svg>
  );
}

/* lucide/gift — Figma 2504:8395 (18×18, stroke #000 1.5) */
function GiftIcon() {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      stroke="#000000"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[1.125rem] shrink-0"
      aria-hidden
    >
      <path d="M9 5.25033V15.7503M9 5.25033C8.72871 4.13238 8.26159 3.17662 7.65955 2.5077C7.05752 1.83877 6.34851 1.48772 5.625 1.50033C5.12772 1.50033 4.65081 1.69787 4.29917 2.0495C3.94754 2.40113 3.75 2.87805 3.75 3.37533C3.75 3.87261 3.94754 4.34952 4.29917 4.70115C4.65081 5.05278 5.12772 5.25033 5.625 5.25033M9 5.25033C9.27129 4.13238 9.73841 3.17662 10.3404 2.5077C10.9425 1.83877 11.6515 1.48772 12.375 1.50033C12.8723 1.50033 13.3492 1.69787 13.7008 2.0495C14.0525 2.40113 14.25 2.87805 14.25 3.37533C14.25 3.87261 14.0525 4.34952 13.7008 4.70115C13.3492 5.05278 12.8723 5.25033 12.375 5.25033M15 8.25033V14.2503C15 14.6482 14.842 15.0297 14.5607 15.311C14.2794 15.5923 13.8978 15.7503 13.5 15.7503H4.5C4.10218 15.7503 3.72064 15.5923 3.43934 15.311C3.15804 15.0297 3 14.6482 3 14.2503V8.25033M15 8.25033C15.4142 8.25033 15.75 7.91454 15.75 7.50033V6.00033C15.75 5.58611 15.4142 5.25033 15 5.25033H3C2.58579 5.25033 2.25 5.58611 2.25 6.00033V7.50033C2.25 7.91454 2.58579 8.25033 3 8.25033M15 8.25033H3" />
    </svg>
  );
}

/* lucide/circle-dollar-sign — Figma 2504:8370 (18×18, stroke #000 1.5) */
function CircleDollarIcon() {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      stroke="#000000"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[1.125rem] shrink-0"
      aria-hidden
    >
      <path d="M12 6H7.5C7.10218 6 6.72064 6.15804 6.43934 6.43934C6.15804 6.72064 6 7.10218 6 7.5C6 7.89782 6.15804 8.27936 6.43934 8.56066C6.72064 8.84196 7.10218 9 7.5 9H10.5C10.8978 9 11.2794 9.15804 11.5607 9.43934C11.842 9.72064 12 10.1022 12 10.5C12 10.8978 11.842 11.2794 11.5607 11.5607C11.2794 11.842 10.8978 12 10.5 12H6M9 13.5V4.5M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z" />
    </svg>
  );
}

/* lucide/move-right — Figma 2504:8376 (16×16, stroke #fff 1.33333) */
function MoveRightIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="#ffffff"
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0"
      aria-hidden
    >
      <path d="M12 10.6667L14.6667 8L12 5.33333M14.6667 8H1.33333" />
    </svg>
  );
}

/* lucide/arrow-up-right — Figma 2504:8390 (14×14, stroke #000 1.16667) */
function ArrowUpRightIcon() {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.16667}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[0.875rem] shrink-0"
      aria-hidden
    >
      <path d="M9.91667 9.91667V4.08333H4.08333M9.91667 4.08333L4.08333 9.91667" />
    </svg>
  );
}

/* lucide/arrow-right — Figma 2504:8358 (72×72, stroke #fff 6, drop shadow
   0 3 6 rgba(0,0,0,.06) — it reads as a white chevron on the page ground) */
function BigArrowRight() {
  return (
    <svg
      viewBox="0 0 72 72"
      fill="none"
      className="size-[4.5rem] shrink-0"
      aria-hidden
    >
      <g filter="url(#recog-impact-arrow-shadow)">
        <path
          d="M15 36H57M36 57L57 36L36 15"
          stroke="#ffffff"
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="recog-impact-arrow-shadow"
          x="6"
          y="9"
          width="60"
          height="60"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

/* the four read-only ROI figures (Figma 2504:8337) */
const FIELDS: { label: string; value: string; unit: string }[] = [
  { label: "EMPLOYEES", value: "850", unit: "people" },
  { label: "CURRENT REC. SPEND", value: "$72K", unit: "/year" },
  { label: "AVG GIFT VALUE", value: "$45", unit: "USD" },
  { label: "HR ADMIN HOURS", value: "12", unit: "hrs/wk" },
];

/* the two floating pills on the gradient panel (Figma 2504:8367 / 2504:8392) */
function FloatingPill({
  icon,
  label,
  from,
  to,
  delta,
  badgeClass,
}: {
  icon: React.ReactNode;
  label: string;
  from: string;
  to: string;
  delta: string;
  badgeClass: string;
}) {
  return (
    <>
      <div className="absolute left-0 top-[0.875rem] flex items-center gap-2 overflow-hidden rounded-[0.75rem] bg-[rgba(0,0,0,0.1)] p-2">
        <span className="flex items-center rounded-[0.5rem] bg-white p-3">
          {icon}
        </span>
        <span className="flex flex-col gap-1">
          <span className="whitespace-nowrap font-sans text-[0.75rem] font-normal leading-normal tracking-[0.0375rem] text-white">
            {label}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="font-sans text-[0.875rem] font-bold leading-normal text-white">
              {from}
            </span>
            <MoveRightIcon />
            <span className="font-sans text-[0.875rem] font-bold leading-normal text-white">
              {to}
            </span>
          </span>
        </span>
      </div>
      <span
        className={`absolute flex items-center overflow-hidden rounded-[0.5rem] bg-[rgba(240,255,244,0.85)] px-2 py-1 font-sans text-[0.875rem] font-bold leading-normal text-[#00c036] ${badgeClass}`}
      >
        {delta}
      </span>
    </>
  );
}

export default function RecogImpact() {
  return (
    <section className="relative bg-white px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
      <img
        src="/recog2/rc-impact-glow.svg"
        alt=""
        aria-hidden
        width={935}
        height={1350}
        className="pointer-events-none absolute right-[-83.444rem] top-[-5.383rem] h-[47.514rem] w-[103.764rem] max-w-none select-none"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/recog2/rc-impact-glow.svg"
        alt=""
        aria-hidden
        width={935}
        height={1350}
        className="pointer-events-none absolute bottom-[-46.068rem] left-[-23.382rem] h-[47.514rem] w-[103.764rem] max-w-none select-none"
      />

      <div className="relative mx-auto flex w-full max-w-content flex-col gap-10">
        <div className="flex flex-col gap-5 text-center">
          <h2
            data-animation="reveal"
            className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
          >
            See the impact of recognition
          </h2>
          <p
            data-animation="reveal"
            className="font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem] max-w-[44rem] mx-auto"
          >
            Track participation, redemption, budgets, and engagement so you can
            see what employees value–and show leadership where the program is
            working.
          </p>
        </div>

        {/* stat mosaic — 3 cols / gap 16; rows 280 → 271 at the 1200 box */}
        <div
          data-animation="reveal"
          data-reveal-stagger="90"
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[16.9375rem]"
        >
          {/* 2.7x — tall photo card, spans both rows at lg */}
          <article className={`${CARD} flex flex-col md:row-span-2`}>
            <div className="flex shrink-0 flex-col gap-2 p-8">
              <p className={STAT}>2.7x</p>
              <p className={STAT_LABEL}>
                More employee-to-employee
                <br />
                recognition
              </p>
            </div>
            <div className="relative h-[29.75rem] w-full shrink-0 overflow-hidden rounded-t-[2rem]">
              <Image
                src={recognitionPhoto}
                alt="A team member smiling at a recognition message on her phone at a sunlit desk"
                fill
                quality={90}
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[13.5rem] bg-gradient-to-b from-[rgba(244,231,253,0)] to-[#f4e7fd]"
            />
          </article>

          {/* +18 — wide eNPS spline card, spans both value columns at lg */}
          <article
            className={`${CARD} flex min-h-[17.5rem] lg:min-h-0 flex-col gap-2 p-8 lg:col-span-2`}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute left-8 right-8 top-[11.607%] z-0 h-[88.571%]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/recog2/rc-impact-enps-area.svg"
                alt=""
                width={757}
                height={248}
                className="block size-full max-w-none"
              />
            </span>
            <p className={`${STAT} relative z-10`}>+18</p>
            <p className={`${STAT_LABEL} relative z-10`}>
              eNPS lift, first 12 months
            </p>
            <span
              aria-hidden
              className="pointer-events-none absolute left-8 right-8 top-[11.607%] z-20 h-[71.071%]"
            >
              <span className="absolute inset-[-2.68%_-0.7%_-0.57%_-0.15%] block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/recog2/rc-impact-enps-line.svg"
                  alt=""
                  width={763}
                  height={205}
                  className="block size-full max-w-none"
                />
              </span>
            </span>
          </article>

          {/* 31% — turnover spline card */}
          <article
            className={`${CARD} flex min-h-[17.5rem] lg:min-h-0 flex-col gap-2 p-8`}
          >
            <p className={`${STAT} relative z-10`}>31%</p>
            <p className={`${STAT_LABEL} relative z-10`}>
              Lower turnover,
              <br />
              first year median
            </p>
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-[-0.179%] left-8 z-0 h-[43.929%] w-[69.04%]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/recog2/rc-impact-turnover-area.svg"
                alt=""
                width={278}
                height={123}
                className="block size-full max-w-none"
              />
            </span>
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-[11.25%] left-8 z-20 h-[32.5%] w-[69.04%]"
            >
              <span className="absolute inset-[-1.1%_-1.92%_-5.86%_-0.36%] block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/recog2/rc-impact-turnover-line.svg"
                  alt=""
                  width={284}
                  height={97}
                  className="block size-full max-w-none"
                />
              </span>
            </span>
          </article>

          {/* 96% — dot-field card */}
          <article
            className={`${CARD} flex min-h-[17.5rem] lg:min-h-0 flex-col gap-2 p-8 md:col-span-2 lg:col-span-1`}
          >
            <p className={`${STAT} relative z-10`}>96%</p>
            <p className={`${STAT_LABEL} relative z-10`}>
              Reward redemption
              <br />
              vs ~62% points-only
            </p>
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-[-46.527%] right-[-34.711%] z-0 h-[128.134%] w-[89.1%]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/recog2/rc-impact-dots.svg"
                alt=""
                width={359}
                height={359}
                className="block size-full max-w-none"
              />
            </span>
          </article>
        </div>

        {/* ROI row — 584 panel · 72 arrow · 584 panel (no gaps at lg) */}
        <div
          data-animation="reveal"
          className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_4.5rem_minmax(0,1fr)] lg:gap-0"
        >
          {/* roi before — white panel, blurred lilac blob, four figure fields */}
          <article
            className={`${CARD} flex flex-col gap-[2.8125rem] p-[2.8125rem]`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/recog2/rc-impact-blob.svg"
              alt=""
              aria-hidden
              width={780}
              height={780}
              className="pointer-events-none absolute left-[21.233%] top-[-107.864%] h-[183.099%] w-[133.562%] max-w-none select-none"
            />
            <div className="relative flex flex-col gap-5">
              <ChartSpline />
              <h3 className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.04] tracking-[-0.0375rem] text-[#2a0845]">
                Build the business case
              </h3>
              <p className="max-w-[30.875rem] font-sans text-[0.875rem] leading-[1.48] text-[#6b6c71]">
                See how your team size, current reward spend, and admin time
                could translate into program savings.
              </p>
            </div>
            <dl className="relative grid grid-cols-1 gap-6 sm:grid-cols-2">
              {FIELDS.map((f) => (
                <div key={f.label} className="flex flex-col gap-1.5">
                  <dt className="font-sans text-[0.6875rem] font-medium leading-normal text-[#707075]">
                    {f.label}
                  </dt>
                  <dd className="flex items-center rounded-[0.625rem] border border-[#e5e5eb] px-[0.875rem] py-[0.6875rem]">
                    <span className="min-w-0 flex-1 font-[family-name:var(--font-satoshi)] text-[1.125rem] font-bold leading-normal text-[#16171b]">
                      {f.value}
                    </span>
                    <span className="whitespace-nowrap font-sans text-[0.75rem] leading-normal text-[#707075]">
                      {f.unit}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </article>

          {/* the 72px arrow between the two panels */}
          <div
            aria-hidden
            className="hidden items-center justify-center lg:flex"
          >
            <BigArrowRight />
          </div>

          {/* roi after — gradient panel, two floating pills, savings card */}
          <div className={`${CARD} min-h-[26.625rem]`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/recog2/rc-impact-gradient.svg"
              alt=""
              aria-hidden
              width={1140}
              height={1140}
              className="pointer-events-none absolute left-[-61.644%] top-[-96.596%] h-[267.606%] w-[195.206%] max-w-none select-none"
            />

            {/* platform spend pill — sits behind the savings card */}
            <div className="absolute right-0 top-[69.014%] z-10 h-[4.5rem] w-[11.5rem] md:left-[60.959%] md:right-auto">
              <FloatingPill
                icon={<CircleDollarIcon />}
                label="Platform spend"
                from="$72k"
                to="$48k"
                delta="-24K"
                badgeClass="left-[8rem] top-[3.9375rem]"
              />
            </div>

            {/* savings card */}
            <div className="absolute left-1/2 top-1/2 z-20 flex w-[18.125rem] max-w-full -translate-x-1/2 -translate-y-1/2 flex-col gap-4 overflow-hidden rounded-[1rem] bg-white p-8 shadow-[0_7px_21px_0_rgba(0,0,0,0.14)]">
              <div className="flex flex-col gap-3">
                <p className="font-[family-name:var(--font-satoshi)] text-[2.8125rem] font-bold leading-[1.04] tracking-[-0.0625rem] text-[#2a0845]">
                  $48,600
                </p>
                <p className="font-sans text-[0.875rem] leading-[1.48] text-[#6b6c71]">
                  Estimated annual savings
                  <br />
                  with Stadium
                </p>
              </div>
              <div className="flex justify-end">
                <a
                  href="#"
                  className="inline-flex items-start gap-2 border-b border-black pb-0.5 font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem] text-[#16171b] transition-all duration-200 hover:border-[#8d12e7] hover:text-[#8d12e7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16171b] active:scale-[0.98]"
                >
                  <span className="whitespace-nowrap">book a demo</span>
                  <ArrowUpRightIcon />
                </a>
              </div>
            </div>

            {/* gift value pill — sits above the savings card */}
            <div className="absolute left-0 top-[12.324%] z-30 h-[4.5rem] w-[11.5rem] md:left-[10.445%]">
              <FloatingPill
                icon={<GiftIcon />}
                label="Gift value"
                from="$45"
                to="$58"
                delta="+29%"
                badgeClass="left-[8.125rem] top-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
