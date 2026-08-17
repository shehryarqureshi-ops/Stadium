/* /snacks · closing CTA (Figma 2208:3223). A dark rounded CTA card on a blue→dark
   gradient: "Snacks that work for everyone" + two CTAs. The footer itself is
   rendered by PageClose (showCta=false) after this. */

export default function SnackClosing() {
  return (
    <section
      className="px-section-x-sm pb-16 pt-4 md:px-section-x-md md:pb-20 lg:px-section-x-lg lg:pb-24"
      style={{ backgroundImage: "linear-gradient(180deg, #ffffff 0%, #2f66d6 46%, #0a1f3d 100%)" }}
    >
      <div className="mx-auto w-full max-w-content">
        <div className="flex flex-col items-center gap-6 rounded-[2rem] px-6 py-16 text-center md:py-24 lg:mb-12" style={{ background: "linear-gradient(90deg, #0d1e32 0%, #1a3f6e 100%)" }}>
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
              className="inline-flex h-button-h items-center justify-center rounded-[100px] border border-white/40 bg-transparent px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-white"
            >
              <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">Browse the catalog</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
