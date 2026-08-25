import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

export type TwoFeaturedCardsItem = {
  title: string;
  subtitle?: string;

  /**
   * Main visual displayed at the top of the card.
   * Supports both imported Next.js images and regular image URLs.
   */
  image: StaticImageData | string;
  imageAlt?: string;

  isFeatured?: boolean;
  isFeaturedLabel?: string;
  isFeaturedPillColor?: string;

  /**
   * Flexible card body.
   * Use this for description, bullets, etc.
   */
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
        {/* Section header */}
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
            className="max-w-[50rem] font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]"
          >
            {description}
          </p>
        </div>

        {/* Cards tray */}
        <div
          data-animation="reveal"
          data-reveal-stagger="90"
          className="flex w-full max-w-5xl flex-col gap-4 rounded-[2rem] bg-[#f2f2f2] p-4 md:flex-row md:items-stretch"
        >
          {cards.map((card) => (
            <article
              key={card.title}
              data-animation="reveal"
              className={`relative flex min-w-0 flex-1 flex-col rounded-[1.5rem] bg-white p-2.5 ${card.isFeatured
                ? HEAVY_SHADOW
                : "shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)]"
                }`}
            >
              {/* Featured pill */}
              {card.isFeatured && card.isFeaturedLabel && (
                <span
                  style={{
                    backgroundColor:
                      card.isFeaturedPillColor ?? "#1b1b1b",
                  }}
                  className="absolute right-4 top-0 z-20 inline-flex -translate-x-1/2 -translate-y-1/2 items-center justify-center whitespace-nowrap rounded-full px-3 pb-[0.1875rem] pt-1 font-sans text-[0.6875rem] font-bold leading-[1.4] tracking-[0.025rem] text-white uppercase tracking-widest"
                >
                  {card.isFeaturedLabel}
                </span>
              )}

              {/* Image */}
              <div className={`overflow-hidden rounded-2xl ${card.isFeatured
                ? HEAVY_SHADOW
                : ""
                }`}>
                <Image
                  src={card.image}
                  alt={card.imageAlt ?? card.title}
                  width={0}
                  height={0}
                  quality={100}
                  sizes="(min-width: 768px) 50vw, 92vw"
                  className={`h-auto w-full object-cover`}
                />
              </div>

              {/* Card content */}
              <div className="flex flex-1 flex-col px-6 pb-6 pt-8 md:px-7 md:pb-7">
                <div className="flex flex-1 flex-col">
                  <h3 className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.15] tracking-[-0.025rem] text-[#16171b] lg:text-[2rem]">
                    {card.title}
                  </h3>

                  {card.subtitle && (
                    <p className="my-3 font-sans text-[0.6875rem] font-bold uppercase leading-[1.4] tracking-[0.025rem] text-[#828282]">
                      {card.subtitle}
                    </p>
                  )}

                  <div className="mt-4 flex flex-1 flex-col">
                    {card.content}
                  </div>
                </div>

                {/* CTA */}
                <a
                  href={card.ctaLink}
                  className={`mt-8 inline-flex h-[2.75rem] w-full items-center justify-center rounded-full px-[1.375rem] font-sans text-button-primary uppercase transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${card.ctaVariant === "dark"
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