/* Impact stats — Figma /swag 2:25697 ("Swag at scale, backed by numbers"). A
   bento of stat cards: a photo with a full-width white stat card, a grey stat +
   pull-quote, and a grey + a dark stat card. Big numbers are Satoshi Medium
   (48–60px); labels are Overpass 16px. */

export type SwagImpactContent = {
  /** Section heading (display type). */
  heading: string;
  /** Sub-heading / body copy under the heading. */
  body: string;
  /** Photo card with a full-width floating white stat. */
  photoStat: {
    /** Background image — a string src path (e.g. "/swag/swag-impact.jpg"),
        rendered by a plain <img>, NOT a next/image static import. */
    image: string;
    value: string;
    label: string;
  };
  /** Grey card: stat + pull-quote (quote should include its own curly quotes). */
  quoteStat: {
    label: string;
    value: string;
    quote: string;
  };
  /** Two stacked stat cards: grey (value over label) then dark (label + value). */
  stackedStats: {
    top: { value: string; label: string };
    bottom: { label: string; value: string };
  };
};

export const SWAG_IMPACT: SwagImpactContent = {
  heading: "Swag at scale, backed by numbers",
  body: "What teams see when they run swag through Stadium.",
  photoStat: {
    image: "/swag/swag-impact.jpg",
    value: "120K+",
    label: "kits shipped globally",
  },
  quoteStat: {
    label: "avg reorder rate",
    value: "38%",
    quote:
      "“Letting employees pick what they actually want made it something people look forward to.”",
  },
  stackedStats: {
    top: { value: "48 hrs", label: "to first mockup" },
    bottom: { label: "Countries", value: "170+" },
  },
};

export default function SwagImpact({ content = SWAG_IMPACT }: { content?: SwagImpactContent }) {
  return (
    <section className="bg-white px-section-x-sm py-20 md:px-section-x-md md:py-24 lg:px-section-x-lg lg:py-28">
      <div className="mx-auto flex w-full max-w-content flex-col gap-10">
        <div className="flex flex-col items-center gap-5 text-center">
          <h2 data-animation="reveal" className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem] lg:text-[2.75rem]">
            {content.heading}
          </h2>
          <p data-animation="reveal" className="font-sans text-[1.125rem] leading-[1.45] text-[#707075]">
            {content.body}
          </p>
        </div>

        <div data-animation="reveal" className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* photo + full-width floating stat */}
          <div className="relative flex min-h-[20rem] items-end overflow-hidden rounded-3xl border border-[#f5f5f5] p-4 md:h-[22.25rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={content.photoStat.image} alt="" aria-hidden className="absolute inset-0 size-full rounded-3xl object-cover" />
            <div className="relative flex w-full flex-col gap-3 rounded-2xl bg-white p-6">
              <p className="font-[family-name:var(--font-satoshi-medium)] text-[3.75rem] leading-[1.04] tracking-[-0.0625rem] text-swag-ink">{content.photoStat.value}</p>
              <p className="font-sans text-[1rem] leading-[1.4] text-swag-ink">{content.photoStat.label}</p>
            </div>
          </div>

          {/* grey stat + quote */}
          <div className="flex min-h-[20rem] flex-col justify-between rounded-3xl bg-[#f7f7f7] p-6 md:h-[22.25rem]">
            <div className="flex flex-col gap-1.5">
              <p className="font-sans text-[1rem] leading-[1.4] text-swag-ink">{content.quoteStat.label}</p>
              <p className="font-[family-name:var(--font-satoshi-medium)] text-[3rem] leading-[1.04] tracking-[-0.0625rem] text-swag-ink">{content.quoteStat.value}</p>
            </div>
            <p className="max-w-[16.75rem] font-sans text-[1.0625rem] leading-[1.4] text-swag-ink">
              {content.quoteStat.quote}
            </p>
          </div>

          {/* two stacked stats */}
          <div className="flex min-h-[20rem] flex-col gap-4 md:h-[22.25rem]">
            <div className="flex flex-1 flex-col justify-end gap-2.5 rounded-3xl bg-[#f2f2f2] p-6">
              <p className="font-[family-name:var(--font-satoshi-medium)] text-[3rem] leading-[1.04] tracking-[-0.0625rem] text-[#1b1b1b]">{content.stackedStats.top.value}</p>
              <p className="font-sans text-[1rem] leading-[1.4] text-[#1b1b1b]">{content.stackedStats.top.label}</p>
            </div>
            <div className="flex items-center justify-between rounded-3xl bg-swag-ink p-6">
              <p className="font-sans text-[1rem] leading-[1.4] text-white">{content.stackedStats.bottom.label}</p>
              <p className="font-[family-name:var(--font-satoshi-medium)] text-[3rem] leading-[1.04] tracking-[-0.0625rem] text-white">{content.stackedStats.bottom.value}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
