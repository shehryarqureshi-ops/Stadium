/* /snacks · closing CTA (Figma 2208:3259 / card 2208:3260). The white stats block
   above ends in a rounded-bottom curve (Figma: 180px of white below the bento incl.
   the curve); under it the section bg runs bright blue and fades to the footer's
   #181818. The near-black card (vertical #16171b→#000 gradient, 1px #969696
   border, rounded 32, py-140) sits 120px below the curve and FLUSH on the footer,
   separated only by a 2px inset divider. Its CTAs are the Figma's larger 15px /
   49px pills (this card only — the rest of the site rides the 40px token). The
   footer itself is rendered by PageClose (showCta=false) after this. */

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
      <div aria-hidden className="h-8 rounded-b-[2rem] bg-white md:h-10 md:rounded-b-[2.5rem] lg:h-[6.25rem]" />

      <div className="px-section-x-sm pt-14 md:px-section-x-md md:pt-24 lg:px-section-x-lg lg:pt-[7.5rem]">
        <div className="mx-auto w-full max-w-content">
          <div
            className="flex flex-col items-center gap-5 rounded-[2rem] border border-[#969696] px-6 py-16 text-center md:py-24 lg:px-[3.75rem] lg:py-[8.75rem]"
            style={{ background: "linear-gradient(0deg, #16171b 0%, #000000 100%)" }}
          >
            <h2
              data-animation="reveal"
              className="font-[family-name:var(--font-satoshi)] text-[1.875rem] font-black leading-[1.04] tracking-[-0.09375rem] text-white md:text-[2.5rem] lg:text-[3.125rem]"
            >
              Snacks that work for everyone
            </h2>
            <p data-animation="reveal" className="max-w-[70rem] font-sans text-[1.0625rem] leading-[1.5] text-[#a8a8b8] lg:text-[1.125rem]">
              Flexible enough for any team, occasion, or dietary preference — curated or built from scratch.
            </p>
            <div data-animation="reveal" className="flex flex-col gap-3.5 pt-3 sm:flex-row sm:items-center">
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-[100px] bg-[#2178f5] px-[1.375rem] py-[0.9375rem] font-sans text-[0.9375rem] font-semibold uppercase leading-[1.25] text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] focus-visible:outline-white"
              >
                Build a box
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-[100px] border border-[#4d4d5c] bg-[#292933] px-[1.375rem] py-[0.9375rem] font-sans text-[0.9375rem] font-semibold uppercase leading-[1.25] text-white transition-all duration-200 hover:bg-[#33333f] active:scale-[0.98] focus-visible:outline-white"
              >
                Browse the catalog
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2px inset divider on the footer's top edge (Figma "divider" 1160w) */}
      <div aria-hidden className="mx-auto h-[2px] w-[80.5%] bg-white/10" />
    </section>
  );
}
