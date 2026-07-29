/* Feature icon grid (Figma /recognition Platform 312:5489). A centered header +
   a 3×2 grid of white cards on a grey tray, each with a 128px icon illustration,
   a title, and a short description — all centre-aligned. Reusable across pages;
   pass icon paths + copy via `content`. Accent (text-swag-green-deep eyebrow)
   inherits the page's --color-swag-* override. */

export type FeatureIconGridContent = {
  eyebrow: string;
  heading: string;
  body: string;
  /** Each card's `icon` is a /public path string, rendered at 128px. `badge` is
     an optional pill in the card's top-right corner (e.g. "Primary"). */
  cards: { icon: string; title: string; desc: string; badge?: string }[];
};

export default function FeatureIconGrid({
  content,
  columns = 3,
  titleWeight = "bold",
}: {
  content: FeatureIconGridContent;
  /** 3 = full-width Platform grid; 2 = narrower Committee grid. */
  columns?: 2 | 3;
  /** Card title weight — Platform uses bold, Committee uses medium. */
  titleWeight?: "bold" | "medium";
}) {
  return (
    <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-24">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        {/* header */}
        <div className="flex max-w-[55rem] flex-col items-center gap-5 text-center">
          <div className="flex flex-col items-center gap-2">
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
            {content.body}
          </p>
        </div>

        {/* 3×2 icon-card grid on a tray */}
        <div
          data-animation="reveal"
          className={`grid grid-cols-1 gap-2.5 rounded-[1.5rem] bg-[#f2f2f2] p-2.5 ${
            columns === 2
              ? "mx-auto w-full max-w-[55rem] sm:grid-cols-2"
              : "w-full sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {content.cards.map((c) => (
            <div
              key={c.title}
              className="relative flex flex-col items-center gap-6 rounded-xl bg-white px-8 pb-[2.8125rem] pt-[3.75rem] text-center shadow-[0_0.1875rem_0.375rem_rgba(0,0,0,0.06)]"
            >
              {c.badge && (
                <span className="absolute right-[1.875rem] top-[1.875rem] rounded-full bg-swag-ink px-2 py-1 font-sans text-[0.6875rem] font-bold tracking-[0.025rem] text-white">
                  {c.badge}
                </span>
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.icon}
                alt=""
                aria-hidden
                width={128}
                height={128}
                className="size-32 object-contain"
              />
              <div className="flex flex-col items-center gap-2.5">
                <h3
                  className={`text-[1.5625rem] leading-[1.04] tracking-[-0.01875rem] text-swag-ink ${
                    titleWeight === "medium"
                      ? "font-[family-name:var(--font-satoshi-medium)]"
                      : "font-display"
                  }`}
                >
                  {c.title}
                </h3>
                <p className="font-sans text-[0.9375rem] leading-[1.5] text-swag-grey">
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
