"use client";

import type { StaticImageData } from "next/image";
import Image from "next/image";

export type TestimonialItem = {
  image: StaticImageData;
  text: string;
  title: string;
  subtitle: string;
};

type TestimonialsProps = {
  /* optional eyebrow above the title */
  caption?: string;
  captionColor?: string;
  title: React.ReactNode;
  showRating?: boolean;
  rating?: number;
  ratingLabel?: string;
  ratingLogoSrc?: string;

  blockquote: string;
  citation: string;

  items: TestimonialItem[];

  /* "dark": transparent section for dark page backgrounds — white headline,
     quote and light citation. Cards keep their light surfaces. */
  theme?: "light" | "dark";
  /* "marquee" (default): auto-scrolling card column. "stack": the cards render
     once as a static column with larger Satoshi quotes and the left column
     sticks while they scroll past (/book-a-call, Figma 3998:4261). */
  layout?: "marquee" | "stack";
};

/* Stack card — Figma 3998:4276: #f2f2f2 tray p24 gap24 r24, 72px r12 thumb,
   white content r12 pt28 px28 pb30, quote Satoshi Medium 25/−0.3. */
function StackCard({ item }: { item: TestimonialItem }) {
  return (
    <figure className="flex flex-col items-start gap-6 rounded-3xl bg-pricing-cell p-4 md:flex-row md:p-6">
      <Image
        src={item.image}
        alt=""
        width={72}
        height={72}
        className="size-[4.5rem] shrink-0 rounded-xl object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-8 rounded-xl bg-white px-6 pb-[1.875rem] pt-7 shadow-pass md:px-7">
        <blockquote className="font-[family-name:var(--font-satoshi-medium)] text-[1.25rem] leading-[1.35] tracking-[-0.01875rem] text-pricing-ink md:text-[1.5625rem]">
          &ldquo;{item.text}&rdquo;
        </blockquote>
        <figcaption className="flex flex-col gap-1 font-sans text-feature">
          <span className="font-bold text-grey-800">{item.title}</span>
          <span className="leading-[1.5] text-swag-grey">{item.subtitle}</span>
        </figcaption>
      </div>
    </figure>
  );
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <figure className="flex flex-col lg:flex-row items-start gap-4 rounded-3xl bg-[#f2f2f2] p-6">
      <div className="flex flex-1 flex-col gap-4 rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(16,24,40,0.06)] lg:order-1">
        <blockquote className="font-sans text-[1rem] leading-6 text-ink">
          &ldquo;{item.text}&rdquo;
        </blockquote>

        <figcaption className="flex flex-col">
          <span className="font-sans text-[0.875rem] font-bold text-ink">
            {item.title}
          </span>

          <span className="font-sans text-[0.8125rem] text-grey-500">
            {item.subtitle}
          </span>
        </figcaption>
      </div>

      <Image
        src={item.image}
        alt={item.title}
        width={72}
        height={72}
        className="size-[72px] rounded-2xl object-cover lg:order-0"
      />
    </figure>
  );
}

export default function Testimonials({
  caption,
  captionColor = "#a4cefe",
  title,
  showRating = true,
  rating = 4.8,
  ratingLabel = "on G2 from 1,515 reviews",
  ratingLogoSrc = "/g2-logo.svg",
  blockquote,
  citation,
  items,
  theme = "light",
  layout = "marquee",
}: TestimonialsProps) {
  if (!items.length) return null;
  const dark = theme === "dark";
  const stack = layout === "stack";

  return (
    <section className={`px-section-x-sm md:px-section-x-md lg:px-[6.25rem] ${dark ? "" : "bg-white"}`}>
      <style>{`
        @keyframes testimonial-scroll {
          from {
            transform: translateY(0);
          }

          to {
            transform: translateY(-50%);
          }
        }

        .testimonial-marquee {
          animation: testimonial-scroll 44s linear infinite;
        }

        .testimonial-viewport:hover .testimonial-marquee {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .testimonial-marquee {
            animation: none;
          }
        }
      `}</style>

      <div className="mx-auto flex w-full max-w-[77.5rem] flex-col gap-12 lg:flex-row lg:gap-20">
        {/* Left */}
        <div className={`flex shrink-0 flex-col gap-12 lg:w-[31.6875rem] lg:gap-[7.5rem] ${stack ? "lg:sticky lg:top-28 lg:self-start" : ""}`}>
          <div className="flex flex-col gap-8">
            {caption && (
              <p
                data-animation="reveal"
                style={{ color: captionColor }}
                className="-mb-6 font-sans text-eyebrow-sm leading-4 uppercase"
              >
                {caption}
              </p>
            )}
            <h2
              data-animation="reveal"
              className={`font-display text-heading-sm md:text-heading-md ${dark ? "text-white" : "text-[#16171b]"} lg:text-[3.4375rem] lg:leading-[3.75rem] lg:tracking-[-0.075rem]`}
            >
              {title}
            </h2>

            {showRating && (
              <div data-animation="reveal" className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ratingLogoSrc}
                  alt=""
                  width={32}
                  height={32}
                  className="size-8 shrink-0"
                />

                <span className="font-display text-[2rem] font-bold leading-none text-ink">
                  {rating}
                </span>

                <span className="flex flex-col">
                  <span
                    aria-label={`${rating} out of 5`}
                    className="text-[0.9375rem] leading-none text-[#ff9c00]"
                  >
                    ★★★★★
                  </span>

                  <span className="mt-1 font-sans text-[0.8125rem] text-grey-500">
                    {ratingLabel}
                  </span>
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-8">
            <span
              data-animation="reveal"
              aria-hidden
              className="mb-10 font-display text-[4rem] leading-none text-grey-300"
            >
              <svg
                width="109"
                height="79"
                viewBox="0 0 109 79"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M47.4683 55.9455C47.4683 69.4708 38.2809 79 24.806 79C10.4124 79 0 67.3191 0 48.8755C0 23.0545 17.1498 3.07395 41.6496 0V14.7549C28.481 17.214 19.2936 25.5136 19.2936 36.2724C21.7436 35.3502 24.4998 34.7354 27.8685 34.7354C38.8934 34.7354 47.4683 42.7276 47.4683 55.9455ZM108.105 55.9455C108.105 69.4708 98.9178 79 85.443 79C71.0493 79 60.6369 67.3191 60.6369 48.8755C60.6369 23.0545 77.7868 3.07395 102.287 0V14.7549C89.1179 17.214 79.6243 25.5136 79.6243 36.5798C82.0742 35.3502 84.8305 34.7354 88.1992 34.7354C99.2241 34.7354 108.105 42.7276 108.105 55.9455Z"
                  fill="#F2F2F2"
                />
              </svg>
            </span>

            <blockquote
              data-animation="reveal"
              className={`font-[family-name:var(--font-satoshi-medium)] text-[1.625rem] leading-[2.25rem] lg:text-[2rem] lg:leading-[2.5rem] font-bold ${dark ? "text-white" : "text-[#16171b]"}`}
            >
              {blockquote}
            </blockquote>

            <p
              data-animation="reveal"
              className={`font-sans text-[0.9375rem] ${dark ? "text-hero-body" : "text-[#6b6c71]"}`}
            >
              {citation}
            </p>
          </div>
        </div>

        {/* Right */}
        {stack ? (
          <div data-animation="reveal" className="flex flex-1 flex-col gap-6 lg:gap-10">
            {items.map((item) => (
              <StackCard key={item.title} item={item} />
            ))}
          </div>
        ) : (
        <div
          className="testimonial-viewport relative flex-1 overflow-hidden lg:h-166"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent, #000 6%, #000 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, #000 6%, #000 94%, transparent)",
          }}
        >
          <div className="testimonial-marquee flex flex-col gap-4">
            {[...items, ...items].map((item, index) => (
              <TestimonialCard key={`${item.title}-${index}`} item={item} />
            ))}
          </div>
        </div>
        )}
      </div>
    </section>
  );
}
