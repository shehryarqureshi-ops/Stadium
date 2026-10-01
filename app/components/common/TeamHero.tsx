/* Impact-by-team hero — Figma n9SjmDjzB1PeZAYJ5w43fr "Hero · Swag" frames on
   /impact and every /impact/<team> page (e.g. 3998:9297). Dark navy raster
   backdrop (Figma "image 13990", cropped to the dark band in
   public/impact/hero-bg.jpg) behind the transparent SiteHeader, then:
     eyebrow 16 Bold +1 uppercase → 8 → headline 58/1.02/−1.5 (w 543)
     → 32 → intro 19/1.52 → 32 → CTA pair (white pill · white outline pill)
   Desktop: nav 84 + pt 120 / pb 120. */

import Image from "next/image";

import heroBg from "@/public/impact/hero-bg.jpg";

type Cta = { label: string; href: string };

export type TeamHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
};

export default function TeamHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
}: TeamHeroProps) {
  return (
    <section
      aria-labelledby="team-hero-title"
      className="relative overflow-hidden bg-[#020912] px-section-x-sm pb-16 pt-[7.5rem] md:px-section-x-md md:pb-24 md:pt-[10rem] lg:px-section-x-lg lg:pb-30 lg:pt-[12.75rem]"
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

      <div className="relative mx-auto w-full max-w-content">
        <div className="flex max-w-[33.9375rem] flex-col gap-8">
          <div className="flex flex-col gap-6 lg:gap-8">
            <div className="flex flex-col gap-2">
              <p
                data-animation="reveal"
                className="font-sans text-eyebrow-md uppercase leading-6 text-white md:text-eyebrow-lg md:leading-6"
              >
                {eyebrow}
              </p>
              <h1
                id="team-hero-title"
                data-animation="reveal"
                className="text-balance font-display text-display-sm text-white md:text-display-md lg:text-display-pricing"
              >
                {title}
              </h1>
            </div>
            <p
              data-animation="reveal"
              className="font-sans text-body-lg text-white md:text-body-xl"
            >
              {description}
            </p>
          </div>

          <div data-animation="reveal" className="flex flex-wrap gap-3.5">
            <a
              href={primaryCta.href}
              className="inline-flex h-button-h items-center justify-center rounded-button bg-white px-button-x font-sans text-button-primary uppercase text-brand-hero shadow-button inset-shadow-button transition-all duration-200 hover:bg-grey-100 active:scale-[0.98] focus-visible:outline-white"
            >
              <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                {primaryCta.label}
              </span>
            </a>
            {secondaryCta && (
              <a
                href={secondaryCta.href}
                className="inline-flex h-button-h items-center justify-center rounded-full border border-white px-[1.375rem] font-sans text-button-primary uppercase text-white transition-colors duration-200 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-white"
              >
                <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                  {secondaryCta.label}
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
