/* StaticPage hero — the Stadium night hero (Figma "Hero · Swag", same raster
   backdrop + type as TeamHero on /csr, /enterprise, /integrations/*), minus the
   CTA pair: eyebrow → title → optional summary → outlined meta pills
   (Updated … / n min read). The white content sheet overlaps the bottom
   (-mt-8 / lg:-mt-16 in StaticPage), hence the generous bottom padding. */

import Image from "next/image";

import heroBg from "@/public/impact/overview/hero-canvas-bg.jpg";

export default function StaticPageHero({
  eyebrow,
  title,
  summary,
  meta,
}: {
  eyebrow: string;
  title: string;
  summary?: string;
  meta: string[];
}) {
  return (
    <section
      aria-labelledby="static-page-title"
      className="relative overflow-hidden bg-impact-hero-night px-section-x-sm pb-24 pt-32 md:px-section-x-md md:pb-28 md:pt-40 lg:px-section-x-lg lg:pb-40 lg:pt-44"
    >
      <Image
        src={heroBg}
        alt=""
        fill
        loading="eager"
        fetchPriority="high"
        quality={90}
        sizes="100vw"
        className="pointer-events-none object-cover object-top"
      />

      <div className="relative mx-auto flex w-full max-w-content flex-col gap-6 lg:gap-8">
        <div className="flex max-w-3xl flex-col gap-2">
          <p
            data-animation="reveal"
            className="font-sans text-eyebrow-md uppercase leading-6 text-white md:text-eyebrow-lg md:leading-6"
          >
            {eyebrow}
          </p>
          <h1
            id="static-page-title"
            data-animation="reveal"
            className="text-balance font-display text-display-sm text-white md:text-display-md lg:text-display-pricing"
          >
            {title}
          </h1>
        </div>

        {summary && (
          <p data-animation="reveal" className="max-w-2xl font-sans text-body-lg text-white md:text-body-xl">
            {summary}
          </p>
        )}

        {meta.length > 0 && (
          <ul data-animation="reveal" className="flex flex-wrap gap-2.5">
            {meta.map((item) => (
              <li
                key={item}
                className="inline-flex h-button-h items-center rounded-full border border-white px-[1.125rem] font-sans text-button-primary uppercase text-white"
              >
                <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
