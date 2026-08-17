/* /snacks · closing CTA (Figma 2208:3223). The section bg runs bright blue at
   the top (under a white rounded-bottom curve from the section above) and fades
   to the footer's #181818 so the two blend seamlessly. A near-black rounded card
   sits low in the section, close to the footer: "Snacks that work for everyone"
   + two CTAs. The footer itself is rendered by PageClose (showCta=false). */

export default function SnackClosing() {
  return (
    <section
      className="relative"
      style={{
        backgroundImage:
          "linear-gradient(180deg, #2e6ae8 0%, #2154c8 30%, #142c66 62%, #101625 82%, #181818 100%)",
      }}
    >
      {/* rounded-bottom curve of the white section above, over the blue */}
      <div aria-hidden className="h-8 rounded-b-[2rem] bg-white md:h-10 md:rounded-b-[2.5rem]" />

      <div className="px-section-x-sm pb-3 pt-14 md:px-section-x-md md:pt-24 lg:px-section-x-lg lg:pb-4 lg:pt-36">
        <div className="mx-auto w-full max-w-content">
          <div
            className="flex flex-col items-center gap-6 rounded-[2rem] px-6 py-16 text-center md:py-24 lg:py-[7.5rem]"
            style={{ background: "linear-gradient(160deg, #171b22 0%, #0d0f13 55%, #10141b 100%)" }}
          >
            <div className="flex max-w-[46rem] flex-col items-center gap-4">
              <h2
                data-animation="reveal"
                className="font-[family-name:var(--font-satoshi)] text-[1.875rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-white md:text-[2.5rem] lg:text-[2.75rem]"
              >
                Snacks that work for everyone
              </h2>
              <p data-animation="reveal" className="font-sans text-[1.0625rem] leading-[1.5] text-white/75">
                Flexible enough for any team, occasion, or dietary preference — curated or built from scratch.
              </p>
            </div>
            <div data-animation="reveal" className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#"
                className="inline-flex h-button-h items-center justify-center rounded-[100px] bg-[#2178f5] px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] focus-visible:outline-white"
              >
                <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">Build a box</span>
              </a>
              <a
                href="#"
                className="inline-flex h-button-h items-center justify-center rounded-[100px] bg-[#26292f] px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-[#31353c] active:scale-[0.98] focus-visible:outline-white"
              >
                <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">Browse the catalog</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
