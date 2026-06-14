/**
 * Redacted / Poster (V12 — flagship dot-globe, full-bleed, WHITE bg). 2026-06-13:
 * cobe's dotted ball read "nowhere close to Shopify", so the globe is now a
 * custom Canvas-2D dot-globe (see ChaosGlobe): REAL continents (from
 * public/map-dot-mask.svg) wrapping a sphere that rotates on a tilted axis,
 * Stadium-blue dots, city-anchored pills that sweep with the spin and duck
 * behind the globe, drag-to-rotate. White background per the user's call.
 * Container removed (full-bleed band, capped content). Left typography on
 * system tokens. Show-don't-tell: DIY-logistics overwhelm is the living globe
 * with artifacts swirling around it; the calm Stadium answer sits on the left.
 */

import ChaosGlobe from "./ChaosGlobe";

export default function RedactedPoster() {
  return (
    <section className="bg-white px-section-x-sm py-section-y-sm md:px-section-x-md md:py-section-y-md lg:px-section-x-lg lg:py-section-y-lg">
      <div className="mx-auto grid w-full max-w-content items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* LEFT — problem block, then the calm answer block (system tokens) */}
        <div className="flex flex-col gap-8 lg:gap-10">
          {/* the problem */}
          <div className="flex flex-col gap-3.5">
            <p className="font-sans text-eyebrow-sm uppercase text-accent-water md:text-eyebrow-md">
              What it takes
            </p>
            <p className="max-w-[30rem] text-pretty font-sans text-body-md text-grey-600 md:text-body-lg">
              To gift{" "}
              <strong className="font-semibold text-ink">
                1,000 employees
              </strong>{" "}
              across{" "}
              <strong className="font-semibold text-ink">23 countries</strong>,
              your team has to coordinate vendors, addresses, budgets,
              currencies, taxes, duties, timelines, and regional requirements.
            </p>
          </div>
          {/* the answer */}
          <div className="flex flex-col gap-4">
            <h2 className="text-balance font-display text-heading-md text-ink lg:text-heading-lg">
              Or just use <span className="text-accent-water">Stadium</span>.
            </h2>
            <p className="font-sans text-body-md text-grey-700 md:text-body-lg">
              One platform to centralize global gifting, automate fulfillment,
              and manage delivery across every market.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex h-button-h w-full shrink-0 items-center justify-center rounded-button bg-cta-fill px-button-x font-sans text-button-primary uppercase text-cta-on shadow-button inset-shadow-[0_1px_0_0_rgba(255,255,255,0.08)] md:w-auto md:self-start"
          >
            See Stadium in action
          </a>
        </div>

        {/* RIGHT — the chaos, shown as a living, draggable globe.
            Fills its grid track on desktop (aligns to the grid, no float);
            capped + centered when it stacks below lg. */}
        <div className="mx-auto w-full max-w-[30rem] lg:max-w-none">
          <ChaosGlobe />
        </div>
      </div>
    </section>
  );
}
