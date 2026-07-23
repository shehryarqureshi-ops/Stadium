/* Hero · Swag — Figma "Stadium-Enterprise" /swag (344:11903). Dark-green
   SwagMagic hero: mint eyebrow, Satoshi headline, green/white CTA pair, a
   floating frosted "Embroidered hoodie" product card (size pill S/M/L/XL) over
   a warehouse photo, and a white logo marquee. Background is the exact Figma
   mesh-gradient (public/swag/swag-hero-bg.jpg). Desktop frame is 1440; tablet/
   mobile derived (stack the product cluster under the copy). SiteHeader is
   rendered by the page and auto-themes white over this dark hero. */

/* Design social-proof strip (no Spotify): 9 logos evenly distributed across the
   full content width, exactly as the Figma frame — amazon, Pinterest, accenture,
   Bloomberg, salesforce, NETFLIX, Google, amazon, Pinterest. */
const LOGOS = [
  { src: "/trust-amazon.svg", alt: "Amazon", w: 77, h: 20 },
  { src: "/trust-pinterest.svg", alt: "Pinterest", w: 87, h: 25 },
  { src: "/trust-accenture.svg", alt: "Accenture", w: 91, h: 24 },
  { src: "/trust-bloomberg.svg", alt: "Bloomberg", w: 90, h: 19 },
  { src: "/trust-salesforce.svg", alt: "Salesforce", w: 37, h: 27 },
  { src: "/trust-netflix.svg", alt: "Netflix", w: 75, h: 25 },
  { src: "/trust-google.svg", alt: "Google", w: 80, h: 25 },
  { src: "/trust-amazon.svg", alt: "Amazon", w: 77, h: 20 },
  { src: "/trust-pinterest.svg", alt: "Pinterest", w: 87, h: 25 },
];

/* Frosted product card + warehouse photo cluster (Figma 344:11932, 558×557).
   Authored at the Figma pixel positions (÷16 = rem) inside a fixed-size box so
   it scales as one unit on tablet/mobile. */
function ProductCluster() {
  return (
    <div className="relative h-[34.8125rem] w-[34.875rem] shrink-0">
      {/* warehouse photo (399:842) — smaller panel offset behind the card */}
      <div className="absolute left-[15.5rem] top-0 h-[25.5rem] w-[16rem] overflow-hidden rounded-2xl shadow-[0.875rem_1.3125rem_2.8125rem_0_rgba(0,0,0,0.33)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/swag/swag-warehouse.jpg"
          alt="Warehouse racking with kitted swag boxes"
          className="size-full object-cover"
        />
      </div>

      {/* frosted hoodie card (344:11935) — opaque dark foreground */}
      <div className="absolute left-[1.6875rem] top-[7.625rem] flex w-[16.75rem] flex-col justify-end gap-3 rounded-[1.25rem] bg-black/[0.62] px-[1.375rem] pb-8 pt-[17.5rem] backdrop-blur-[7px]">
        {/* hoodie cut-out (344:11938) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/swag/swag-hoodie.png"
          alt="Embroidered green hoodie"
          className="pointer-events-none absolute left-[0.125rem] top-[-3.125rem] size-[20.75rem] object-contain"
        />

        {/* size pill (344:11953) — floating vertical selector */}
        <div className="absolute left-[-1.6875rem] top-[1.875rem] flex flex-col items-center gap-2 rounded-[0.9375rem] bg-black/10 p-[0.625rem] backdrop-blur-[6px]">
          <span className="font-sans text-[0.9375rem] tracking-[0.047rem] text-white/60">
            SIZE
          </span>
          <div className="flex flex-col">
            {["S", "M", "L", "XL"].map((s) => (
              <span
                key={s}
                className={`flex size-8 items-center justify-center rounded-[0.625rem] font-sans text-[0.9375rem] tracking-[0.047rem] ${
                  s === "L" ? "bg-black/75 text-white" : "text-white/60"
                }`}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="relative flex flex-col gap-1">
          <p className="font-sans text-[1.09375rem] font-bold leading-[1.38] tracking-[0.02rem] text-[#dddddd]">
            Embroidered hoodie
          </p>
          <p className="font-sans text-[0.75rem] leading-4 tracking-[0.0156rem] text-[#cccccc]">
            Ultra-soft 400gms cotton fleece with a modern relaxed drop-shoulder
            fit.
          </p>
        </div>
        <div className="relative flex items-center justify-center rounded-lg border border-white/25 py-[0.625rem]">
          <span className="font-sans text-[0.75rem] tracking-[0.047rem] text-[#cccccc]">
            ADD TO CART
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SwagHero() {
  return (
    <section className="relative overflow-hidden bg-[image:var(--gradient-swag-hero)] px-section-x-sm pb-16 pt-[7rem] md:px-section-x-md md:pb-24 md:pt-[8rem] lg:px-section-x-lg lg:pb-28 lg:pt-[10rem]">
      <div className="mx-auto flex w-full max-w-content flex-col gap-16 lg:gap-20">
        {/* copy + product cluster */}
        <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          {/* copy column */}
          <div className="flex w-full flex-col gap-8 lg:w-[33.9375rem] lg:shrink-0">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <p
                  data-animation="reveal"
                  className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-swag-mint md:text-eyebrow-md"
                >
                  SWAG · SWAGMAGIC
                </p>
                <h1
                  data-animation="reveal"
                  className="font-display text-[2rem] leading-[1.05] tracking-[-0.045rem] text-white md:text-[2.75rem] lg:text-[3.625rem] lg:leading-[1.02] lg:tracking-[-0.09375rem]"
                >
                  The infrastructure behind every swag program
                </h1>
              </div>
              <p
                data-animation="reveal"
                className="font-sans text-body-md text-[#fbfeff] lg:text-[1.1875rem] lg:leading-[1.52]"
              >
                Stop coordinating vendors separately. Run your entire swag
                program, one platform, one PO.
              </p>
            </div>

            <div data-animation="reveal" className="flex flex-col gap-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#"
                  className="inline-flex h-button-h items-center justify-center rounded-full bg-swag-green px-button-x font-sans text-button-primary uppercase text-white transition-all duration-200 hover:brightness-95 active:scale-[0.98] focus-visible:outline-white"
                >
                  <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                    Book a demo
                  </span>
                </a>
                <a
                  href="#"
                  className="inline-flex h-button-h items-center justify-center rounded-full border border-[#e2e2de] bg-white px-button-x font-sans text-button-primary uppercase text-ink transition-all duration-200 hover:bg-grey-100 active:scale-[0.98] focus-visible:outline-white"
                >
                  <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                    Browse the catalog
                  </span>
                </a>
              </div>
              <p className="font-sans text-[0.8125rem] font-semibold leading-[1.4] text-[#fbfeff]">
                5,000+ teams ship swag this way, to 170+ countries
              </p>
            </div>
          </div>

          {/* product cluster — scales as one unit; stacks under copy below lg */}
          <div className="relative w-full max-w-[34.875rem] origin-top-left scale-[0.62] self-center sm:scale-75 md:scale-90 lg:w-auto lg:scale-100 lg:self-start">
            <ProductCluster />
          </div>
        </div>

        {/* social-proof strip — 9 white marks evenly spread across the full width */}
        <div
          data-animation="reveal"
          className="flex w-full flex-wrap items-center justify-center gap-x-10 gap-y-6 lg:flex-nowrap lg:justify-between lg:gap-x-6"
        >
          {LOGOS.map((logo, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={logo.src}
              alt={logo.alt}
              width={logo.w}
              height={logo.h}
              style={{ height: `${logo.h / 16}rem` }}
              className="w-auto max-w-none shrink-0 opacity-90 brightness-0 invert"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
