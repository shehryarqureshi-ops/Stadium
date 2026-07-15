import Image from "next/image";
import heroBg from "@/public/hero-bg.png";

export default function Hero() {
  return (
    /* Fixed-height frame (min-h tokens), content vertically CENTERED
       (2026-06-11 Figma rev); mobile padding-y is hero-specific 48px.
       +4rem on min-height and padding-top compensates for the fixed
       transparent nav overlaying the hero (shopify.com pattern) — content
       positions stay identical to the Figma frame. */
    <section className="relative flex min-h-[calc(var(--spacing-hero-sm)+4rem)] flex-col items-start justify-center overflow-hidden px-section-x-sm pb-12 pt-[7rem] md:min-h-[calc(var(--spacing-hero-md)+4rem)] md:px-section-x-md md:pb-section-y-md md:pt-[8rem] lg:min-h-[calc(var(--spacing-hero-lg)+4rem)] lg:px-section-x-lg lg:pb-section-y-lg lg:pt-[10rem]">
      {/* slow settle-in drift (interim until a brand video exists —
          Shopify's hero is live video; a static photo reads dead).
          Compositor-only transform, one-shot, reduced-motion disables. */}
      <style>{`
        .hero-kenburns { animation: hero-kenburns 24s cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes hero-kenburns {
          from { transform: scale(1.06); }
          to { transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-kenburns { animation: none; }
        }
      `}</style>
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <Image
          src={heroBg}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-kenburns object-cover"
        />
        <div className="absolute inset-0 bg-[image:var(--gradient-hero-base-scrim)]" />
        <div className="absolute inset-0 bg-[image:var(--gradient-hero-scrim)]" />
        {/* contrast scrim for the transparent fixed nav — the photo's sky
            and clouds are near-white at the top, where the nav's white
            links would otherwise fail WCAG contrast */}
        <div className="absolute inset-x-0 top-0 h-40 bg-[image:var(--gradient-hero-top-scrim)]" />
        {/* below-lg contrast floor (2026-06-12 audit): narrow crops put
            the photo's white wall behind full-width text where the 90deg
            scrim has faded — pixel-sampled mins hit 1.51:1. A flat 60%
            ink overlay floors white text at ≥4.5:1 over pure white
            (Shopify's mobile heroes are uniformly dark by construction). */}
        <div className="absolute inset-0 bg-ink/60 lg:hidden" />
      </div>

      {/* content row caps at 1200 and centers above 1380 (background stays full-bleed) */}
      <div className="relative mx-auto flex w-full max-w-content flex-col items-start gap-5 md:gap-9 lg:gap-8">
        {/* Header: title (eyebrow + headline) + supporting copy */}
        <div className="flex w-full flex-col items-start gap-3 md:gap-6">
          <div className="flex w-full flex-col items-start gap-2 text-white">
            <p className="font-sans text-eyebrow-sm uppercase md:text-eyebrow-md lg:text-eyebrow-lg lg:leading-6">
              Global engagement infrastructure
            </p>
            <h1 className="w-full font-display text-ds-h4 md:text-ds-h2 lg:text-ds-hero">
              Show up for your people.{" "}
              {/* hard line break on desktop only (per Figma) */}
              <br aria-hidden className="hidden lg:block" />
              Everywhere, every time.
            </h1>
          </div>
          <p className="font-sans text-body-sm text-hero-body md:max-w-[30rem] md:text-body-md lg:max-w-[42.5rem] lg:text-body-lg lg:tracking-[0.0156rem]">
            The platform behind recognition, swag, and gifting worldwide.
          </p>
        </div>

        {/* CTAs — system pills (h-button-h = 40px since the 2026-06-12
            user decision moved the whole system to 40; no hero exception).
            Hover + focus-visible per the quality bar. */}
        <div className="flex w-full flex-col items-start gap-2 md:w-auto md:flex-row md:items-center md:gap-3 lg:gap-4">
          <a
            href="#"
            className="inline-flex h-button-h w-full items-center justify-center rounded-button bg-white px-button-x font-sans text-button-primary uppercase text-brand-hero shadow-button inset-shadow-button transition-all duration-200 hover:bg-grey-100 active:scale-[0.98] focus-visible:outline-white md:w-auto"
          >
            <span className="[text-box-trim:trim-both] [text-box-edge:cap_alphabetic]">
              Get started
            </span>
          </a>
          <a
            href="#"
            className="inline-flex h-button-h w-full items-center justify-center rounded-button border border-white px-button-x font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-white md:w-auto"
          >
            <span className="[text-box-trim:trim-both] [text-box-edge:cap_alphabetic]">
              Talk to sales
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
