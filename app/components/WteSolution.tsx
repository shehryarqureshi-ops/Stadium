/* Ways to Engage · "how it works 2" (Figma 1113:1731). THE SOLUTION — a
   "Before Stadium" grey tray (bare circle-x pains in a soft, muted inner panel)
   beside an elevated, overlapping "On Stadium" dark card (bare circle-check wins
   in a lighter #3d3d3d inner panel + a Talk-to-sales CTA). */

const BEFORE = [
  "A separate vendor, invoice, and renewal date for every program",
  "A platform fee stacked on top of every order",
  "A snack subscription with an annual minimum",
  "Customs and duties on every international order",
  "A seat-based fee, whether people use it or not",
];

const ON = [
  "Recognition, swag, snacks, gifting, and hosted experiences in one place",
  "No service fee on paid passes",
  "No annual minimum to send snacks",
  "Local fulfillment — no customs delays or fees",
  "Pricing per user/month for kudos programs",
];

/* Figma renders each marker as a bare Lucide OUTLINE icon (no disc, no fill),
   16px, stroke-width 1.333: circle-x #16171B (1113:1746), circle-check #A4CEFE
   (1113:1774). */
function CircleX() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="#16171B" strokeWidth={1.333} strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 size-4 shrink-0" aria-hidden>
      <path d="M9.99981 5.99926L5.99981 9.99926M5.99981 5.99926L9.99981 9.99926M14.6665 7.99926C14.6665 11.6812 11.6817 14.6659 7.99981 14.6659C4.31792 14.6659 1.33315 11.6812 1.33315 7.99926C1.33315 4.31736 4.31792 1.33259 7.99981 1.33259C11.6817 1.33259 14.6665 4.31736 14.6665 7.99926Z" />
    </svg>
  );
}
function CircleCheck() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="#A4CEFE" strokeWidth={1.333} strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 size-4 shrink-0" aria-hidden>
      <path d="M5.99981 7.99926L7.33315 9.33259L9.99981 6.66592M14.6665 7.99926C14.6665 11.6812 11.6817 14.6659 7.99981 14.6659C4.31792 14.6659 1.33315 11.6812 1.33315 7.99926C1.33315 4.31736 4.31792 1.33259 7.99981 1.33259C11.6817 1.33259 14.6665 4.31736 14.6665 7.99926Z" />
    </svg>
  );
}

/* Figma 1113:1765 — an 8-layer soft diagonal elevation (down-right). */
const ON_SHADOW =
  "shadow-[40px_40px_56.569px_-1px_rgba(0,0,0,0.2),21.981px_21.981px_31.086px_-0.875px_rgba(0,0,0,0.13),12.765px_12.765px_18.053px_-0.75px_rgba(0,0,0,0.1),7.798px_7.798px_11.029px_-0.625px_rgba(0,0,0,0.08),4.829px_4.829px_6.829px_-0.5px_rgba(0,0,0,0.07),2.905px_2.905px_4.108px_-0.375px_rgba(0,0,0,0.06),1.592px_1.592px_2.252px_-0.25px_rgba(0,0,0,0.06),0.672px_0.672px_0.95px_-0.125px_rgba(0,0,0,0.05)]";

export default function WteSolution() {
  return (
    <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-24">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-12 lg:gap-16">
        {/* header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p
            data-animation="reveal"
            className="font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.04875rem] text-[#16171b]"
          >
            The solution
          </p>
          <h2
            data-animation="reveal"
            className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
          >
            One platform for all your appreciation needs
          </h2>
        </div>

        {/* comparison */}
        <div
          data-animation="reveal"
          className="relative flex w-full flex-col items-stretch gap-6 lg:flex-row lg:items-center lg:justify-center lg:gap-0"
        >
          {/* Before Stadium — grey tray, sits behind + overlaps */}
          <div className="rounded-[1.5rem] bg-[#f2f2f2] p-2.5 lg:mr-[-4.625rem] lg:w-[33.875rem] lg:pr-[5.5rem]">
            <p className="px-7 py-5 font-[family-name:var(--font-satoshi)] text-[1.75rem] leading-[1.04] tracking-[-0.0375rem] text-[#16171b]">
              Before Stadium
            </p>
            <div className="w-full rounded-[0.75rem] bg-[#fefefe] px-7 pb-[1.875rem] pt-7 opacity-70 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]">
              <ul className="flex flex-col gap-4">
                {BEFORE.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <CircleX />
                    <span className="font-sans text-[0.9375rem] leading-[1.2] text-[#16171b]">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* On Stadium — dark, elevated, overlaps */}
          <div className={`relative z-10 rounded-[1.5rem] bg-[#1b1b1b] p-4 ${ON_SHADOW} lg:w-[31.75rem]`}>
            <p className="px-7 py-5 font-[family-name:var(--font-satoshi)] text-[1.75rem] leading-[1.04] tracking-[-0.0375rem] text-white">
              On Stadium
            </p>
            <div className="flex w-full flex-col gap-8 rounded-[0.5rem] bg-[#3d3d3d] p-7">
              <ul className="flex flex-col gap-4">
                {ON.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <CircleCheck />
                    <span className="font-sans text-[0.9375rem] leading-[1.2] text-white">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="inline-flex h-button-h items-center justify-center rounded-button border border-white bg-transparent px-button-x font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-white"
              >
                <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                  Talk to sales
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
