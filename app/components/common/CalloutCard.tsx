/* White callout card on the closing gradient — Figma /integrations "Need help
   getting connected?" (4293:31957), /csr "Modern Slavery Statement"
   (3883:3170) and /integrations/sso "Need help?" (4301:32863). White r24
   p100, 0/3/3 6% drop shadow.
   - default: copy column (eyebrow #707075 · 44 title · 18/1.5 #6b6c71, CTAs
     pinned to the foot) → 80 gap → media panel (#f2f2f2 r16, or an exported
     graphic). `video` adds the "Watch video" play link beside the pill.
   - `inline`: title + copy on the left, a large pill (px32 py24, 16px label)
     on the right; no media. */

import Image, { type StaticImageData } from "next/image";

import PillLink from "./PillLink";

export type CalloutCardProps = {
  caption?: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
  video?: { label: string; href: string };
  image?: StaticImageData;
  imageAlt?: string;
  inline?: boolean;
};

function PlayIcon() {
  return (
    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-pricing-ink">
      <svg aria-hidden viewBox="0 0 10 12" className="ml-0.5 h-3 w-2.5 fill-white">
        <path d="M0 0v12l10-6z" />
      </svg>
    </span>
  );
}

export default function CalloutCard({
  caption,
  title,
  description,
  cta,
  video,
  image,
  imageAlt = "",
  inline = false,
}: CalloutCardProps) {
  return (
    <section className="px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
      <div
        data-animation="reveal"
        className={`mx-auto flex w-full max-w-content flex-col gap-10 rounded-3xl bg-white p-6 drop-shadow-[0px_3px_3px_rgba(0,0,0,0.06)] md:p-14 lg:p-25 ${
          inline ? "md:flex-row md:items-center md:gap-8" : "lg:flex-row lg:gap-20"
        }`}
      >
        <div className={`flex min-w-0 flex-1 flex-col gap-8 ${inline ? "" : "justify-between lg:gap-12"}`}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              {caption && (
                <p className="font-sans text-eyebrow-sm uppercase leading-[1.4] tracking-[0.1rem] text-[#707075]">
                  {caption}
                </p>
              )}
              <h2 className="text-balance font-display text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-pricing-ink md:text-[2.25rem] lg:text-heading-xl">
                {title}
              </h2>
            </div>
            <p className="font-sans text-body-lg leading-[1.5] text-swag-grey">{description}</p>
          </div>

          {!inline && (
            <div className="flex flex-wrap items-center gap-6">
              <PillLink {...cta} />
              {video && (
                <a
                  href={video.href}
                  className="flex items-center gap-2 font-sans text-eyebrow-sm uppercase leading-4 text-pricing-ink transition-opacity hover:opacity-70"
                >
                  <PlayIcon />
                  {video.label}
                </a>
              )}
            </div>
          )}
        </div>

        {inline ? (
          <a
            href={cta.href}
            className="inline-flex w-fit shrink-0 items-center justify-center rounded-full bg-pricing-ink px-8 py-6 font-sans text-[1rem] font-semibold uppercase leading-4 tracking-[0.0725rem] text-white transition-all duration-200 hover:bg-[#2a2b30] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pricing-ink"
          >
            <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">{cta.label}</span>
          </a>
        ) : (
          <div
            style={{ aspectRatio: image ? `${image.width} / ${image.height}` : "480 / 324" }}
            className="relative w-full self-center overflow-hidden rounded-2xl bg-pricing-cell lg:w-[30rem] lg:shrink-0"
          >
            {image && (
              <Image
                src={image}
                alt={imageAlt}
                fill
                quality={100}
                sizes="(min-width: 1024px) 30rem, 92vw"
                className="object-cover"
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
