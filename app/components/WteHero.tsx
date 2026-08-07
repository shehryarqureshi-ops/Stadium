/* Ways to Engage · hero (Figma 1113:1561, "G06" photo format). A dark lifestyle
   photo with a left→right scrim, left-aligned copy, two CTAs, and a trust line.
   SiteHeader is rendered by the page and auto-themes white over this dark hero. */

export default function WteHero() {
  return (
    <section
      style={{ backgroundImage: "url('/ways-to-engage/hero.jpg')" }}
      className="relative overflow-hidden bg-[#141013] bg-cover bg-center bg-no-repeat px-section-x-sm pb-20 pt-[8rem] md:px-section-x-md md:pb-28 md:pt-[9rem] lg:px-section-x-lg lg:pb-32 lg:pt-[12rem]"
    >
      {/* left→right legibility scrim + top nav-contrast scrim (Figma 1113:1564/1575) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(24,24,24,0.89)_0%,rgba(24,24,24,0.77)_40%,rgba(24,24,24,0.62)_66%,rgba(24,24,24,0.32)_88%,rgba(24,24,24,0.11)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(24,24,24,0.7)_0%,rgba(24,24,24,0.62)_40%,rgba(24,24,24,0)_100%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-content">
        <div className="flex max-w-[46rem] flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-[1rem] font-bold uppercase leading-6 tracking-[0.0625rem] text-white"
            >
              Ways to Engage
            </p>
            <h1
              data-animation="reveal"
              className="font-display text-[2.75rem] leading-[1.02] tracking-[-0.06rem] text-white md:text-[3.5rem] lg:text-[4.5rem] lg:leading-[5.125rem] lg:tracking-[-0.1875rem]"
            >
              Every way to show up for your people
            </h1>
          </div>
          <p
            data-animation="reveal"
            className="max-w-[42.5rem] font-sans text-body-md tracking-[0.25px] text-[#ccc] lg:text-[1.125rem] lg:leading-[1.75rem]"
          >
            One platform for everyday appreciation and life&rsquo;s biggest
            milestones.
          </p>

          <div
            data-animation="reveal"
            className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href="#"
              className="inline-flex h-button-h items-center justify-center rounded-button bg-white px-button-x font-sans text-button-primary uppercase text-ink shadow-[0px_1px_1px_rgba(0,0,0,0.04),inset_0px_1px_0px_0px_rgba(255,255,255,0.6)] transition-all duration-200 hover:bg-grey-100 active:scale-[0.98] focus-visible:outline-white"
            >
              <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                View the catalog
              </span>
            </a>
            <a
              href="#"
              className="inline-flex h-button-h items-center justify-center rounded-button border border-white bg-transparent px-button-x font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-white"
            >
              <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                Talk to sales
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
