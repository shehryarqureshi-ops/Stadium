/* Numbered step list beside a media panel — Figma /integrations/zapier "Build
   your first Zap in a few steps" (4293:32443). Left-aligned intro (eyebrow ·
   44 title, max 587) → 80 → row: steps column (80px #f2f2f2 r16 number tile
   25 Satoshi Bold → 24 → title 24/30 Satoshi Bold + 14px #6b6c71 desc; rows
   gap 32) + dark pill (45 below) → 80 → media panel (#f8f8f8, #f2f2f2
   hairline, r24, grid-card-active shadow). Omit `image` for the Figma
   "[how_it_works_video]" placeholder. */

import Image, { type StaticImageData } from "next/image";

import PillLink from "./PillLink";
import SectionIntro from "./SectionIntro";

export type StepListItem = { title: string; description: string };

export type StepListMediaProps = {
  caption?: string;
  title: string;
  description?: string;
  steps: StepListItem[];
  cta?: { label: string; href: string };
  image?: StaticImageData;
  imageAlt?: string;
};

const ACTIVE_SHADOW =
  "shadow-[0px_20px_20px_-2px_rgba(0,0,0,0.15),0px_6.383px_6.383px_-1.5px_rgba(0,0,0,0.12),0px_2.415px_2.415px_-1px_rgba(0,0,0,0.11),0px_0.796px_0.796px_-0.5px_rgba(0,0,0,0.1)]";

export default function StepListMedia({
  caption,
  title,
  description,
  steps,
  cta,
  image,
  imageAlt = "",
}: StepListMediaProps) {
  return (
    <section className="px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
      <div className="mx-auto flex w-full max-w-content flex-col gap-10 lg:gap-20">
        <div className="max-w-[36.6875rem]">
          <SectionIntro caption={caption} title={title} description={description} align="left" />
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
          <div data-animation="reveal" className="flex shrink-0 flex-col items-start gap-[2.8125rem]">
            <ol className="flex flex-col gap-8">
              {steps.map((step, i) => (
                <li key={step.title} className="flex items-center gap-6">
                  <span className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-pricing-cell font-display text-[1.5625rem] font-bold leading-[1.04] tracking-[-0.01875rem] text-pricing-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-[1.5rem] font-bold leading-[1.875rem] tracking-[-0.01875rem] text-pricing-ink">
                      {step.title}
                    </h3>
                    <p className="font-sans text-small text-swag-grey">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            {cta && <PillLink {...cta} />}
          </div>

          <div
            data-animation="reveal"
            className={`relative aspect-[16/10] min-w-0 flex-1 overflow-hidden rounded-3xl border border-pricing-cell bg-[#f8f8f8] lg:aspect-auto ${ACTIVE_SHADOW}`}
          >
            {image && (
              <Image
                src={image}
                alt={imageAlt}
                fill
                quality={100}
                sizes="(min-width: 1024px) 35rem, 92vw"
                className="object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
