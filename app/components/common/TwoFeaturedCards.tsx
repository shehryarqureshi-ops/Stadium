import type { ReactNode } from "react";

export type TwoFeaturedCardsItem = {
  title: string;
  subtitle?: string;
  logo?: ReactNode;
  isFeatured?: boolean;
  isFeaturedLabel?: string;
  isFeaturedPillColor?: string;
  content: ReactNode;
  ctaLabel: string;
  ctaVariant?: "dark" | "light";
  ctaLink: string;
};

type TwoFeaturedCardsProps = {
  caption: string;
  captionColor?: string;
  title: string;
  description: string;
  cards: [TwoFeaturedCardsItem, TwoFeaturedCardsItem];
};

const HEAVY_SHADOW =
  "shadow-[0.672px_0.672px_0.95px_-0.1875px_rgba(0,0,0,0.05),1.592px_1.592px_2.252px_-0.375px_rgba(0,0,0,0.05),2.905px_2.905px_4.108px_-0.5625px_rgba(0,0,0,0.05),4.829px_4.829px_6.829px_-0.75px_rgba(0,0,0,0.05),7.798px_7.798px_11.029px_-0.9375px_rgba(0,0,0,0.06),12.765px_12.765px_18.053px_-1.125px_rgba(0,0,0,0.06),21.981px_21.981px_31.086px_-1.3125px_rgba(0,0,0,0.08),40px_40px_56.569px_-1.5px_rgba(0,0,0,0.11),inset_0_0_0_1px_#1b1b1b]";

export default function TwoFeaturedCards({
  caption,
  captionColor = "#10995a",
  title,
  description,
  cards,
}: TwoFeaturedCardsProps) {
  return (
    <section className="bg-white px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        <div className="flex w-full flex-col items-center gap-5 text-center">
          <div className="flex flex-col items-center gap-2">
            <p
              data-animation="reveal"
              style={{ color: captionColor }}
              className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem]"
            >
              {caption}
            </p>

            <h2
              data-animation="reveal"
              className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
            >
              {title}
            </h2>
          </div>

          <p
            data-animation="reveal"
            data-reveal-delay="120"
            className="font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]"
          >
            {description}
          </p>
        </div>

        <div
          data-animation="reveal"
          data-reveal-stagger="90"
          className="flex w-full max-w-[54.625rem] flex-col gap-4 rounded-[2rem] bg-[#f2f2f2] p-4 md:flex-row md:items-center"
        >
          {cards.map((card) => (
            <article
              key={card.title}
              data-animation="reveal"
              className={`relative flex min-w-0 flex-1 flex-col gap-2.5 rounded-[1.5rem] bg-white p-2.5 ${card.isFeatured
                ? HEAVY_SHADOW
                : "shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]"
                }`}
            >
              {card.isFeatured && card.isFeaturedLabel && (
                <span
                  style={{
                    backgroundColor:
                      card.isFeaturedPillColor ?? "#1b1b1b",
                  }}
                  className="absolute right-[2.4375rem] -top-[0.65rem] z-10 inline-flex items-center justify-center rounded-full px-3 pb-[0.1875rem] pt-1 font-sans text-[0.6875rem] font-bold leading-[1.4] tracking-[0.025rem] text-white"
                >
                  {card.isFeaturedLabel}
                </span>
              )}

              <div className="flex flex-col gap-4 rounded-[1rem] bg-[#f7f7f7] p-6">
                {card.logo && <div>{card.logo}</div>}

                <h3 className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.25] text-[#16171b] lg:text-[2rem]">
                  {card.title}
                </h3>

                {card.subtitle && (
                  <p className="font-sans text-[0.6875rem] font-bold uppercase leading-[1.4] tracking-[0.025rem] text-[#828282]">
                    {card.subtitle}
                  </p>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-8 rounded-[1rem] bg-white p-6">
                <div className="flex-1">{card.content}</div>

                <a
                  href={card.ctaLink}
                  className={`inline-flex h-[2.75rem] w-full items-center justify-center rounded-full px-[1.375rem] font-sans text-button-primary uppercase transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${card.ctaVariant === "dark"
                    ? "bg-[#111111] text-white hover:bg-[#2b2b2b]"
                    : "bg-[#f2f2f2] text-ink hover:bg-[#e6e6e6]"
                    }`}
                >
                  <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                    {card.ctaLabel}
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}