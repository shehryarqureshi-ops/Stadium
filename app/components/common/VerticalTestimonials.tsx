"use client";

import type { StaticImageData } from "next/image";
import Image from "next/image";

import { HeroLogoWall, type HeroLogo } from "./HeroLogoWall";
import QuoteMarquee, { QUOTE_ROW_MIN_H } from "./QuoteMarquee";

export type TestimonialItem = {
  /* omit for a text-only card (no thumbnail) */
  image?: StaticImageData;
  text: string;
  title: string;
  subtitle?: string;
  /* optional brand name (uppercase, top of the card) and brand logo (top
     right) — /the-proof "In good company" */
  eyebrow?: string;
  logo?: StaticImageData;
  /* makes the whole card an external link (new tab) with a hover shadow */
  href?: string;
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

  /* optional featured quote under the headline (omit both for a quote-less header) */
  blockquote?: string;
  citation?: string;

  items: TestimonialItem[];

  /* "dark": transparent section for dark page backgrounds — white headline,
     quote and light citation. Cards keep their light surfaces. */
  theme?: "light" | "dark";
  /* optional customer-logo marquee pinned to the foot of the left column
     (/the-proof "In good company"); marks follow the theme */
  logos?: HeroLogo[];
  /* true: no section padding / width cap of its own. A parent supplies the gutters
     and the max-w-content container (the inset white box on /reviews). */
  flush?: boolean;
};

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <figure className="flex flex-col lg:flex-row items-start gap-4 rounded-3xl bg-[#f2f2f2] p-6">
      <div
        className={`flex flex-1 flex-col gap-4 rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(16,24,40,0.06)] lg:order-1 ${
          item.href ? "relative transition-shadow duration-200 hover:shadow-[0_0.5rem_1.5rem_rgba(0,0,0,0.12)]" : ""
        }`}
      >
        {(item.eyebrow || item.logo) && (
          <div className="mb-4 flex items-center justify-between gap-4">
            {item.eyebrow && (
              <p className="font-sans text-eyebrow-sm uppercase leading-4 text-pricing-ink">{item.eyebrow}</p>
            )}
            {item.logo && (
              <Image src={item.logo} alt="" className="h-5 w-auto shrink-0 object-contain" />
            )}
          </div>
        )}
        <blockquote className="font-sans text-[1rem] leading-6 text-ink">
          &ldquo;{item.text}&rdquo;
        </blockquote>

        <figcaption className="flex flex-col">
          <span className="font-sans text-[0.875rem] font-bold text-ink">
            {item.title}
          </span>

          {item.subtitle && (
            <span className="font-sans text-[0.8125rem] text-grey-500">
              {item.subtitle}
            </span>
          )}
        </figcaption>

        {item.href && (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Read the ${item.eyebrow ?? item.title} case study`}
            className="absolute inset-0 rounded-2xl"
          />
        )}
      </div>

      {item.image && (
        <Image
          src={item.image}
          alt={item.title}
          width={72}
          height={72}
          className="size-[72px] rounded-2xl object-cover max-lg:order-first lg:order-0"
        />
      )}
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
  logos,
  flush = false,
}: TestimonialsProps) {
  if (!items.length) return null;
  const dark = theme === "dark";

  return (
    <section className={`${flush ? "" : "px-section-x-sm md:px-section-x-md lg:px-[6.25rem]"} ${dark ? "" : "bg-white"}`}>
      <div className={`mx-auto flex w-full ${flush ? "max-w-content" : "max-w-[77.5rem]"} flex-col gap-12 lg:flex-row lg:gap-20 ${QUOTE_ROW_MIN_H}`}>
        {/* Left */}
        <div className="flex shrink-0 flex-col gap-12 lg:w-[31.6875rem] lg:justify-between lg:gap-[7.5rem]">
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
                  loading="lazy"
                  decoding="async"
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

          {blockquote && (
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
          )}
          {logos && (
            <div data-animation="reveal" aria-label="Customers" className="w-full max-w-[32.125rem]">
              <HeroLogoWall variant="inline" logos={logos} tone={dark ? "light" : "dark"} />
            </div>
          )}
        </div>

        {/* Right */}
        <QuoteMarquee items={items.map((item) => <TestimonialCard key={item.title} item={item} />)} />
      </div>
    </section>
  );
}
