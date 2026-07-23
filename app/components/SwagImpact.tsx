/* Impact stats — Figma /swag 2:25697 ("Swag at scale, backed by numbers"). A
   bento of stat cards: a photo with a floating stat, a grey stat + pull-quote,
   and a green + a dark stat card. */

export default function SwagImpact() {
  return (
    <section className="bg-white px-section-x-sm py-20 md:px-section-x-md md:py-24 lg:px-section-x-lg lg:py-28">
      <div className="mx-auto flex w-full max-w-content flex-col gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 data-animation="reveal" className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem] lg:text-[2.5rem]">
            Swag at scale, backed by numbers
          </h2>
          <p data-animation="reveal" className="font-sans text-body-md text-swag-grey">
            What teams see when they run swag through Stadium.
          </p>
        </div>

        <div data-animation="reveal" className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* photo + floating stat */}
          <div className="relative flex min-h-[18rem] items-end overflow-hidden rounded-2xl md:min-h-[17.5rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/swag/swag-impact.jpg" alt="" aria-hidden className="absolute inset-0 size-full object-cover" />
            <div className="relative m-3 flex flex-col gap-1 rounded-xl bg-white p-5">
              <p className="font-display text-[2.5rem] leading-none text-swag-ink">120K+</p>
              <p className="font-sans text-[0.875rem] text-swag-grey">kits shipped globally</p>
            </div>
          </div>

          {/* grey stat + quote */}
          <div className="flex flex-col justify-between gap-8 rounded-2xl bg-[#f2f2f2] p-7">
            <div className="flex flex-col gap-1">
              <p className="font-sans text-[0.875rem] text-swag-grey">avg reorder rate</p>
              <p className="font-display text-[2.75rem] leading-none text-swag-ink">38%</p>
            </div>
            <p className="font-sans text-body-md leading-[1.5] text-swag-grey">
              &ldquo;Letting employees pick what they actually want made it
              something people look forward to.&rdquo;
            </p>
          </div>

          {/* two stacked stats */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-1 flex-col justify-center gap-1 rounded-2xl bg-[#eaf6ee] p-7">
              <p className="font-display text-[2.5rem] leading-none text-swag-ink">48 hrs</p>
              <p className="font-sans text-[0.875rem] text-swag-grey">to first mockup</p>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-swag-ink p-7">
              <p className="font-sans text-[0.875rem] text-[#c9cbcf]">Countries</p>
              <p className="font-display text-[2.5rem] leading-none text-white">170+</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
