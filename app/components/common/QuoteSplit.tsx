/* Intro + pull quote beside a product graphic — Figma "Case study ·
   Paperchase" rows on the platform pages (e.g. /integrations 4293:31732,
   /integrations/hris, /enterprise, /the-proof). Left (570): eyebrow · 36/39.6
   title · 18/26.1 #707075 → 120 → 108×79 quote mark (#f2f2f2) → 60 → quote
   25 Satoshi Medium −0.3 → 24 → attribution 15/1.5 #6b6c71 (+ optional
   logo) → 60 → optional dark pill. Right (570): the exported graphic panel
   (#f2f2f2 r24 bakes into the export); omit `image` for the grey placeholder.
   `reverse` swaps the columns. */

import Image, { type StaticImageData } from "next/image";

import PillLink from "./PillLink";
import SectionIntro from "./SectionIntro";

export type QuoteSplitProps = {
  caption?: string;
  title: string;
  description?: string;
  quote: string;
  attribution: string;
  logo?: { src: string; alt: string; width: number; height: number };
  cta?: { label: string; href: string };
  image?: StaticImageData;
  imageAlt?: string;
  reverse?: boolean;
};

export default function QuoteSplit({
  caption,
  title,
  description,
  quote,
  attribution,
  logo,
  cta,
  image,
  imageAlt = "",
  reverse = false,
}: QuoteSplitProps) {
  return (
    <section className="px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
      <div
        className={`mx-auto flex w-full max-w-content flex-col gap-10 lg:items-stretch lg:gap-25 ${
          reverse ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-12 lg:gap-30">
          <SectionIntro
            caption={caption}
            title={title}
            description={description}
            align="left"
            titleClassName="md:text-[2.25rem] md:leading-[1.1]"
          />

          <figure data-animation="reveal" className="flex flex-col items-start gap-10 lg:gap-15">
            <svg
              aria-hidden
              viewBox="0 0 109 79"
              fill="none"
              className="h-[3.5rem] w-auto md:h-[4.9375rem]"
            >
              <path
                d="M47.4683 55.9455C47.4683 69.4708 38.2809 79 24.806 79C10.4124 79 0 67.3191 0 48.8755C0 23.0545 17.1498 3.07395 41.6496 0V14.7549C28.481 17.214 19.2936 25.5136 19.2936 36.2724C21.7436 35.3502 24.4998 34.7354 27.8685 34.7354C38.8934 34.7354 47.4683 42.7276 47.4683 55.9455ZM108.105 55.9455C108.105 69.4708 98.9178 79 85.443 79C71.0493 79 60.6369 67.3191 60.6369 48.8755C60.6369 23.0545 77.7868 3.07395 102.287 0V14.7549C89.1179 17.214 79.6243 25.5136 79.6243 36.5798C82.0742 35.3502 84.8305 34.7354 88.1992 34.7354C99.2241 34.7354 108.105 42.7276 108.105 55.9455Z"
                fill="#F2F2F2"
              />
            </svg>
            <div className="flex flex-col gap-6">
              <blockquote className="font-[family-name:var(--font-satoshi-medium)] text-[1.25rem] leading-[1.35] tracking-[-0.01875rem] text-pricing-ink md:text-[1.5625rem]">
                {quote}
              </blockquote>
              <figcaption className="flex flex-col items-start gap-6 font-sans text-feature leading-[1.5] text-swag-grey">
                {attribution}
                {logo && (
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    style={{ height: `${logo.height / 16}rem` }}
                    className="w-auto"
                  />
                )}
              </figcaption>
            </div>
            {cta && <PillLink {...cta} />}
          </figure>
        </div>

        <div
          data-animation="reveal"
          style={{ aspectRatio: image ? `${image.width} / ${image.height}` : "570 / 739" }}
          className="relative w-full overflow-hidden rounded-3xl bg-pricing-cell lg:aspect-auto! lg:w-[35.625rem] lg:shrink-0"
        >
          {image && (
            <Image
              src={image}
              alt={imageAlt}
              fill
              quality={100}
              sizes="(min-width: 1024px) 35.625rem, 92vw"
              className="object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
}
