import Image from "next/image";
import heroBg from "@/public/swag2/sw2-hero-bg.jpg";
import hoodie from "@/public/swag2/sw2-hero-hoodie.png";
import warehouse from "@/public/swag2/sw2-hero-warehouse.jpg";
import { HeroLogoWall } from "./common/HeroLogoWall";

const LOGOS = [
  { src: "/trust-google.svg", alt: "Google", w: 74, h: 24 },
  { src: "/trust-amazon.svg", alt: "Amazon", w: 80, h: 24 },
  { src: "/trust-pinterest.svg", alt: "Pinterest", w: 87, h: 22 },
  { src: "/trust-accenture.svg", alt: "Accenture", w: 84, h: 24 },
  { src: "/trust-bloomberg.svg", alt: "Bloomberg", w: 90, h: 16 },
  { src: "/trust-salesforce.svg", alt: "Salesforce", w: 37, h: 26 },
  { src: "/trust-netflix.svg", alt: "Netflix", w: 75, h: 20 },
  { src: "/trust-google.svg", alt: "Google", w: 74, h: 24 },
  { src: "/trust-amazon.svg", alt: "Amazon", w: 80, h: 24 },
  { src: "/trust-pinterest.svg", alt: "Pinterest", w: 87, h: 22 },
];

const SIZES = ["S", "M", "L", "XL"];
const ACTIVE_SIZE = "L";

/* Product cluster (2673:2797, 558×557) authored at the Figma pixel positions
   (÷16 = rem) inside a fixed box; below `sm` it scales down as one unit and
   the wrapper's box shrinks with it so layout stays honest. */
function ProductCluster() {
  return (
    <div className="relative h-[34.8125rem] w-[34.875rem]">
      {/* warehouse photo (2673:2798) 295×470 @ (228,0) */}
      <div className="absolute left-[14.25rem] top-0 h-[29.375rem] w-[18.4375rem] overflow-hidden rounded-2xl shadow-[0.875rem_1.3125rem_2.8125rem_0_rgba(0,0,0,0.33)]">
        <Image
          src={warehouse}
          alt="Warehouse racking stacked with kitted swag boxes"
          priority
          fill
          quality={90}
          sizes="18.4375rem"
          className="select-none object-cover"
        />
      </div>

      {/* hoodie card (2673:2799) 259×435 @ (27,122) — black/33, rounded-20 */}
      <div className="absolute left-[1.6875rem] top-[7.625rem] flex w-[16.1875rem] flex-col justify-end gap-3 rounded-[1.25rem] bg-black/33 px-[1.375rem] pb-8 pt-[17.5rem]">
        <div className="flex w-[10.674rem] flex-col gap-1">
          <p className="font-sans text-[1.0973rem] font-bold leading-[1.38] tracking-[0.02rem] text-[#dddddd]">
            Hoodie
          </p>
          <p className="font-sans text-[0.75rem] leading-4 tracking-[0.0156rem] text-[#cccccc]">
            Ultra-soft 400gms cotton fleece with a modern relaxed drop-shoulder
            fit.
          </p>
        </div>
        <span className="flex w-full items-center justify-center rounded-lg border border-white/25 py-[0.625rem] font-sans text-[0.75rem] leading-[0.9375rem] tracking-[0.0474rem] text-[#cccccc]">
          ADD TO BAG
        </span>
      </div>

      {/* floating size pill (2673:2806) 55×175 @ (0,170) — black/10, radius 15 */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-[10.6056rem] flex flex-col items-center gap-2 overflow-hidden rounded-[0.9475rem] bg-black/10 p-[0.6317rem]"
      >
        <span className="font-sans text-[0.9475rem] leading-[1.25] tracking-[0.0474rem] text-[#aaaaaa]">
          SIZE
        </span>
        <div className="flex flex-col">
          {SIZES.map((s) => (
            <span
              key={s}
              className={`flex size-8 items-center justify-center rounded-[0.6317rem] font-sans text-[0.9475rem] leading-[1.25] tracking-[0.0474rem] text-[#aaaaaa] ${
                s === ACTIVE_SIZE ? "bg-black/75" : ""
              }`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* hoodie cut-out (2673:2818) 332×318 @ (28,76) — topmost layer */}
      <div className="pointer-events-none absolute left-[1.75rem] top-[4.75rem] h-[19.875rem] w-[20.75rem]">
        <Image
          src={hoodie}
          alt="Green embroidered hoodie"
          priority
          fill
          quality={90}
          sizes="20.75rem"
          className="select-none object-contain"
        />
      </div>
    </div>
  );
}

export default function SwagmagicHero() {
  return (
    <section className="relative overflow-hidden">
      {/* background: black ground → Figma's mesh raster ("image 13674"). The
          live WebGL shader that used to paint over this was removed
          2026-08-21; the raster is now the background outright. Extends 746px
          (46.625rem) below the section so the Problem card overlaps it, fading
          out over the last 25% (Figma bg ends at y=1719, section at 973). */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-[calc(100%_+_46.625rem)] w-full overflow-hidden bg-black mask-b-from-75%"
      >
        <Image
          src={heroBg}
          alt=""
          fill
          quality={90}
          sizes="100vw"
          className="select-none object-cover object-top"
        />
      </div>

      <div className="relative z-10 px-section-x-sm pt-[6rem] md:px-section-x-md md:pt-[7rem] lg:px-section-x-lg lg:pt-[12.75rem]">
        {/* lg gap = Figma's new 60px between the graphics row (ends 761) and
            the trust band (starts 821) */}
        <div className="mx-auto flex w-full max-w-content flex-col lg:gap-[3.75rem]">
          {/* content row: text (543) + graphics (558), top-aligned */}
          <div className="flex flex-col items-start gap-12 lg:flex-row lg:justify-between lg:gap-8">
            <div className="flex w-full flex-col gap-8 lg:w-[33.9375rem] lg:shrink-0">
              <div className="flex flex-col gap-8">
                <div data-animation="reveal" className="flex flex-col gap-2">
                  {/* Figma 2673:2787 sets a DOUBLE space after the middot
                      (whitespace-pre there); reproduced verbatim. */}
                  <p className="whitespace-pre font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#d7fee7]">
                    {"SWAG ·  SWAGMAGIC"}
                  </p>
                  <h1 className="font-[family-name:var(--font-satoshi)] text-[2.5rem] font-black leading-[1.02] tracking-[-0.0625rem] text-white md:text-[3rem] lg:text-[3.625rem] lg:tracking-[-0.09375rem]">
                    The infrastructure behind every swag program
                  </h1>
                </div>
                <p
                  data-animation="reveal"
                  data-reveal-delay="120"
                  className="max-w-[33.9375rem] font-sans text-[1.0625rem] leading-[1.52] text-[#fbfeff] lg:text-[1.1875rem]"
                >
                  Stop coordinating vendors separately. Run your entire swag
                  program, one platform, one PO.
                </p>
              </div>

              <div
                data-animation="reveal"
                data-reveal-delay="200"
                className="flex flex-col gap-8"
              >
                <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center">
                  <a
                    href="#"
                    className="inline-flex h-button-h items-center justify-center rounded-[100px] bg-[#03ba4f] px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] focus-visible:outline-white"
                  >
                    <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                      Browse the catalog
                    </span>
                  </a>
                  <a
                    href="#"
                    className="inline-flex h-button-h items-center justify-center rounded-[100px] border border-white bg-transparent px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-white"
                  >
                    <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                      Talk to sales
                    </span>
                  </a>
                </div>
                <p className="font-sans text-[0.8125rem] font-semibold leading-[1.4] text-[#cccccc]">
                  5,000+ teams ship swag this way, to 170+ countries.
                </p>
              </div>
            </div>

            {/* product cluster — fixed 558×557 box; scaled as one unit below sm */}
            <div
              data-animation="reveal"
              data-reveal-delay="240"
              className="relative h-[17.40625rem] w-[17.4375rem] self-center min-[24rem]:h-[20.8875rem] min-[24rem]:w-[20.925rem] sm:h-[34.8125rem] sm:w-[34.875rem] lg:shrink-0 lg:self-start"
            >
              <div>
                {/* <ProductCluster /> */}
                <Image
                  alt="Product + Catalog + Infrastructure"
                  src={"/swag/heroGraphic.png"}
                  width={600}
                  height={0}
                  quality={100}
                  priority
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* trust band (2673:2819): 56 / 40 marquee / 56 — seamless CSS marquee,
              logos inverted white, edges soft-masked */}
        </div>
      </div>
      <div className="mt-12 lg:mt-24">
        <HeroLogoWall />
      </div>
    </section>
  );
}
