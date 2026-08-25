import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

export type StickyStep = {
  stepLabel: string;
  image: StaticImageData | string;
  title: string;
  content: ReactNode;
  imageAlt?: string;
  dark?: boolean;
};

export type StickyStepCardsProps = {
  caption: string;
  captionColor?: string;
  title: ReactNode;
  description: string;
  blockquote: string;
  quoteAuthor: string;
  steps: StickyStep[];
};

function StepPill({
  label,
  dark = false,
  className = "",
}: {
  label: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`relative inline-flex items-center justify-center rounded-[100px] px-6 py-2 font-sans text-[0.875rem] font-semibold leading-[1.125rem] whitespace-nowrap ${dark
        ? "bg-[#212624] text-white"
        : "bg-[#f2f2f2] text-[#212624]"
        } ${className}`}
    >
      {label}
    </span>
  );
}

export default function StickyStepCards({
  caption,
  captionColor = "#218554",
  title,
  description,
  blockquote,
  quoteAuthor,
  steps,
}: StickyStepCardsProps) {
  return (
    <section className="bg-white px-section-x-sm pb-16 md:px-section-x-md md:pb-20 lg:px-section-x-lg lg:pb-20">
      <div className="mx-auto grid w-full max-w-content grid-cols-1 gap-10 lg:grid-cols-[minmax(0,30.75rem)_1fr] lg:gap-20">
        {/* Left: intro + pull quote */}
        <div className="flex flex-col gap-16 lg:sticky lg:top-26 lg:gap-[7.5rem] lg:self-start">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p
                data-animation="reveal"
                className="font-sans text-[0.75rem] font-semibold uppercase leading-[1.25] tracking-[0.045rem]"
                style={{ color: captionColor }}
              >
                {caption}
              </p>

              <h2
                data-animation="reveal"
                className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.1] text-[#16171b] md:text-[2.25rem]"
              >
                {title}
              </h2>
            </div>

            <p
              data-animation="reveal"
              className="font-sans text-[1.125rem] leading-[1.45] text-[#707075]"
            >
              {description}
            </p>
          </div>

          <figure
            data-animation="reveal"
            className="flex flex-col gap-10 lg:gap-[3.75rem]"
          >
            {/* Quote mark */}
            <svg
              aria-hidden="true"
              className="h-[4.9375rem] w-[6.7566rem] shrink-0"
              viewBox="0 0 108.105 79"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M47.4683 55.9455C47.4683 69.4708 38.2809 79 24.806 79C10.4124 79 0 67.3191 0 48.8755C0 23.0545 17.1498 3.07395 41.6496 0V14.7549C28.481 17.214 19.2936 25.5136 19.2936 36.2724C21.7436 35.3502 24.4998 34.7354 27.8685 34.7354C38.8934 34.7354 47.4683 42.7276 47.4683 55.9455ZM108.105 55.9455C108.105 69.4708 98.9178 79 85.443 79C71.0493 79 60.6369 67.3191 60.6369 48.8755C60.6369 23.0545 77.7868 3.07395 102.287 0V14.7549C89.1179 17.214 79.6243 25.5136 79.6243 36.5798C82.0743 35.3502 84.8305 34.7354 88.1992 34.7354C99.2243 34.7354 108.105 42.7276 108.105 55.9455Z"
                fill="#F2F2F2"
              />
            </svg>

            <div className="flex flex-col gap-6">
              <blockquote className="font-[family-name:var(--font-satoshi-medium)] text-[1.375rem] leading-[1.36] tracking-[-0.01875rem] text-[#16171b] md:text-[1.5625rem]">
                {blockquote}
              </blockquote>

              <figcaption className="font-sans text-[0.9375rem] leading-[1.5] text-[#6b6c71]">
                {quoteAuthor}
              </figcaption>
            </div>
          </figure>
        </div>

        {/* Right: timeline */}
        <div className="flex gap-6">
          {/* Steps column */}
          <div
            aria-hidden="true"
            className="relative hidden w-[5.625rem] shrink-0 flex-col gap-8 md:flex"
          >
            {/* Dotted line */}
            <div className="absolute top-0 bottom-0 left-[2.8125rem] w-px -translate-x-1/2">
              <svg
                className="block h-full w-full overflow-visible"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0.5"
                  y1="0"
                  x2="0.5"
                  y2="100%"
                  stroke="#CCCCCC"
                  strokeLinecap="round"
                  strokeDasharray="3 5"
                />
              </svg>
            </div>

            {steps.map((step) => (
              <div
                key={step.stepLabel}
                className="flex min-h-px flex-1 flex-col md:sticky md:top-26"
              >
                <StepPill
                  label={step.stepLabel}
                  dark={step.dark}
                  className="w-full"
                />
              </div>
            ))}
          </div>

          {/* Cards column */}
          <div className="flex min-w-0 flex-1 flex-col">
            {steps.map((step) => (
              <div
                key={step.stepLabel}
                className="flex flex-col gap-3 md:sticky pt-8 lg:pt-0 md:top-26"
              >
                {/* Mobile-only pill */}
                <StepPill
                  label={step.stepLabel}
                  dark={step.dark}
                  className="w-fit md:hidden"
                />

                <article
                  data-animation="reveal"
                  aria-label={`${step.stepLabel}: ${step.title}`}
                  className="flex flex-col gap-2.5 rounded-[1.5rem] bg-[#f2f2f2] p-2.5"
                >
                  <div className="overflow-hidden rounded-[1.25rem]">
                    <Image
                      src={step.image}
                      alt={step.imageAlt ?? ""}
                      quality={90}
                      className="aspect-[534/300.375] w-full object-cover lg:aspect-auto lg:h-[18.7734rem]"
                      sizes="(min-width:1024px) 33rem, (min-width:768px) 78vw, 92vw"
                    />
                  </div>

                  <div className="flex flex-col gap-6 rounded-[1rem] bg-white px-6 pt-6 pb-7 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.06)] md:px-7 md:pt-7 md:pb-[1.875rem]">
                    <h3 className="font-[family-name:var(--font-satoshi)] text-[1.375rem] font-bold leading-[1.04] tracking-[-0.0375rem] text-[#16171b] md:text-[1.5rem]">
                      {step.title}
                    </h3>

                    <div className="font-sans text-[0.9375rem] leading-[1.45] text-[#16171b]">
                      {step.content}
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}