import Image from "next/image";
import maximeVideoImg from "@/public/testimonial-video-maxime.png";
import marieVideoImg from "@/public/testimonial-video-marie.png";
import marcusAvatarImg from "@/public/testimonial-avatar-marcus.png";
import logoMarkImg from "@/public/testimonial-logo-mark.svg";
import logoWordImg from "@/public/testimonial-logo-word.svg";

/** Centered dark play badge — video testimonial cards. Caller passes the display utility (`flex` / `hidden lg:flex`) plus position. */
function PlayButton({ className }: { className: string }) {
  return (
    <button
      type="button"
      aria-label="Play video testimonial"
      className={`absolute size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cta-fill ${className}`}
    >
      <svg className="size-[1.3125rem]" viewBox="0 0 21 21" fill="none" aria-hidden="true">
        <path
          d="M4.375 2.625L16.625 10.5L4.375 18.375V2.625Z"
          stroke="white"
          strokeWidth="1.667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default function Testimonials() {
  return (
    <section className="mx-auto w-full max-w-section flex flex-col gap-6 bg-surface-base px-section-x-sm py-section-y-sm md:px-section-x-md md:py-section-y-md lg:gap-12 lg:px-section-x-lg lg:py-section-y-lg">
      {/* Heading row — stacked on mobile/tablet, heading left + G2 rating right on desktop */}
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="font-display text-heading-sm text-ink md:text-heading-md lg:max-w-[48.1875rem] lg:text-heading-lg">
          Hear from our customers about their experience
        </h2>
        {/* Rating — G2 */}
        <div className="flex items-end gap-[1.375rem] text-grey-700">
          <p className="font-display text-[2rem] leading-[2.375rem] tracking-[-0.02rem] lg:leading-10 lg:tracking-[-0.01563rem] lg:text-ink">
            4.8
          </p>
          <div className="flex flex-col">
            <p aria-label="5 out of 5 stars" className="font-sans text-label">
              &#9733;&#9733;&#9733;&#9733;&#9733;
            </p>
            <p className="font-sans text-body-md lg:text-ink">
              on G2 from 1,515 reviews
            </p>
          </div>
        </div>
      </div>

      {/* Cards — stacked on mobile/tablet (hero, quote, Marie); desktop: hero left, [Marie, quote] right */}
      <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-end">
        {/* Hero video testimonial — Maxime */}
        <div className="relative flex h-[23.75rem] w-full flex-col justify-end overflow-hidden rounded-card p-6 md:h-[26.25rem] md:p-8 lg:h-auto lg:w-[66%] lg:max-w-[49.5rem] lg:self-stretch lg:p-6">
          <Image
            src={maximeVideoImg}
            alt="Maxime Bascon video testimonial"
            fill
            sizes="(min-width: 64rem) 49.5rem, (min-width: 48rem) 42rem, 100vw"
            className="object-cover"
          />
          {/* Bottom scrim */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[rgba(32,32,32,0.8)] via-[rgba(32,32,32,0.35)] via-45% to-[rgba(32,32,32,0)]"
          />
          <PlayButton className="hidden lg:flex left-1/2 top-[calc(50%-2.1875rem)]" />
          <div className="relative flex w-full flex-col gap-3 md:gap-2.5 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
            <div className="flex flex-col gap-3 md:gap-2.5 lg:max-w-[28.3125rem] lg:gap-8">
              <p className="font-sans text-body-md text-white md:leading-[1.625rem] lg:leading-6">
                &ldquo;What sets Stadium apart is their ability to deliver a
                solution and empower you, no matter the challenges.&rdquo;
              </p>
              <div className="flex flex-col gap-0.5">
                <p className="font-display text-[1.125rem] leading-[1.625rem] text-white lg:text-callout-md">
                  Maxime Bascon
                </p>
                <p className="font-sans text-small text-white/75 lg:text-white">
                  Chief of Staff @Elktech
                </p>
              </div>
            </div>
            {/* Stadium logotype — desktop only */}
            <span className="hidden items-center gap-[0.41875rem] lg:flex">
              <Image
                src={logoMarkImg}
                alt=""
                aria-hidden="true"
                className="h-[1.28125rem] w-[0.725rem]"
              />
              <Image
                src={logoWordImg}
                alt="Stadium"
                className="h-[1.28125rem] w-[5.79375rem]"
              />
            </span>
          </div>
        </div>

        {/* Right column — quote first on mobile/tablet, Marie video first on desktop */}
        <div className="flex w-full flex-col gap-6 lg:min-w-0 lg:flex-1">
          {/* Video testimonial — Marie */}
          <div className="relative order-2 h-[15.1875rem] w-full overflow-hidden rounded-card lg:order-1">
            <Image
              src={marieVideoImg}
              alt="Marie Belingard video testimonial"
              fill
              sizes="(min-width: 64rem) 24rem, (min-width: 48rem) 42rem, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-[9.9375rem] bg-gradient-to-t from-[#202020] to-[rgba(32,32,32,0)]"
            />
            <PlayButton className="left-1/2 top-1/2" />
            <div className="absolute left-6 top-[11.375rem] flex flex-col gap-0.5 md:left-8 lg:left-6">
              <p className="font-sans text-[1rem] font-semibold leading-[1.375rem] text-white">
                Marie Belingard
              </p>
              <p className="font-sans text-[0.8125rem] leading-[1.125rem] text-white/70">
                Marketing Director @TSE
              </p>
            </div>
          </div>

          {/* Quote — Marcus Chen */}
          <figure className="order-1 flex w-full flex-col gap-3 rounded-card bg-surface-subtle p-6 lg:order-2 lg:gap-8">
            <blockquote className="flex flex-col gap-3 text-ink lg:gap-4">
              <p
                aria-hidden="true"
                className="font-display text-[1.75rem] leading-[2.125rem] md:text-[1.5rem] md:leading-[1.875rem] lg:h-4 lg:text-[2rem] lg:leading-[2.375rem] lg:tracking-[-0.02rem]"
              >
                &ldquo;
              </p>
              <p className="font-sans text-body-md text-grey-700 lg:text-ink">
                The catalog depth is unmatched. Every culture, every preference
                &mdash; they&rsquo;ve got it covered.
              </p>
            </blockquote>
            <figcaption className="flex w-full items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={marcusAvatarImg}
                  alt="Marcus Chen"
                  width={32}
                  height={32}
                  className="hidden size-8 rounded-full lg:block"
                />
                <div className="flex flex-col gap-0.5 text-ink">
                  <p className="font-display text-[1.125rem] leading-[1.625rem] lg:text-callout-md">
                    Marcus Chen
                  </p>
                  <p className="font-sans text-small text-grey-500 lg:text-ink">
                    Ops Director &middot; Figma
                  </p>
                </div>
              </div>
              {/* Carousel controls — desktop only (single quote in design) */}
              <div className="hidden items-center gap-2 lg:flex">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  className="flex size-10 items-center justify-center rounded-full border border-grey-300 bg-surface-base"
                >
                  <svg className="size-[1.125rem]" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path
                      d="M11.25 4.5L6.75 9L11.25 13.5"
                      stroke="#2C2D2E"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  className="flex size-10 items-center justify-center rounded-full bg-cta-fill"
                >
                  <svg className="size-[1.125rem]" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path
                      d="M6.75 4.5L11.25 9L6.75 13.5"
                      stroke="white"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
