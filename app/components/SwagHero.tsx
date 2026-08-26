import { HeroLogoWall } from "./common/HeroLogoWall";
import { type ShaderChroma } from "./SwagHeroShader";

/* Hero · Swag — Figma "Stadium-Enterprise" /swag (344:11903). Dark-green
   SwagMagic hero: mint eyebrow, Satoshi headline, green/white CTA pair, a
   floating frosted "Embroidered hoodie" product card (size pill S/M/L/XL) over
   a warehouse photo, and a white logo marquee. Background is now an animated
   WebGL shader (<SwagHeroShader>, dark blue/violet chroma + fluted glass),
   replacing the original static Figma mesh-gradient photo. Desktop frame is
   1440; tablet/mobile derived (stack the product cluster under the copy).
   SiteHeader is rendered by the page and auto-themes white over this dark
   hero. */

/* Content is lifted into a typed, exported default const so this hero can be
   reused on other pages by passing a different `content` prop. Layout, style,
   colors, and structure stay hardcoded in the JSX. All image fields are plain
   string paths (this hero renders <img>, not next/image), so any static
   next/image import would need to be referenced as `import.src`. The hero
   background image is a Tailwind class (bg-[image:url(...)]) and intentionally
   stays hardcoded. */

type SwagHeroLogo = {
  src: string;
  alt: string;
  w: number;
  h: number;
};

type SwagHeroImage = {
  src: string;
  alt: string;
};

type SwagHeroCta = {
  label: string;
  href: string;
};

export type SwagHeroContent = {
  eyebrow: string;
  heading: string;
  body: string;
  primaryCta: SwagHeroCta;
  secondaryCta: SwagHeroCta;
  socialProof: string;
  product: {
    warehouseImage: SwagHeroImage;
    hoodieImage: SwagHeroImage;
    sizeLabel: string;
    sizes: string[];
    selectedSize: string;
    title: string;
    description: string;
    addToCartLabel: string;
  };
  logos: SwagHeroLogo[];
};

export const SWAG_HERO: SwagHeroContent = {
  eyebrow: "SWAG · SWAGMAGIC",
  heading: "The infrastructure behind every swag program",
  body: "Stop coordinating vendors separately. Run your entire swag program, one platform, one PO.",
  primaryCta: { label: "Book a demo", href: "#" },
  secondaryCta: { label: "Browse the catalog", href: "#" },
  socialProof: "5,000+ teams ship swag this way, to 170+ countries",
  product: {
    warehouseImage: {
      src: "/swag/swag-warehouse.jpg",
      alt: "Warehouse racking with kitted swag boxes",
    },
    hoodieImage: {
      src: "/swag/swag-hoodie.png",
      alt: "Embroidered green hoodie",
    },
    sizeLabel: "SIZE",
    sizes: ["S", "M", "L", "XL"],
    selectedSize: "L",
    title: "Embroidered hoodie",
    description:
      "Ultra-soft 400gms cotton fleece with a modern relaxed drop-shoulder fit.",
    addToCartLabel: "ADD TO CART",
  },
  /* Design social-proof strip (no Spotify): 9 logos evenly distributed across the
     full content width, exactly as the Figma frame — amazon, Pinterest, accenture,
     Bloomberg, salesforce, NETFLIX, Google, amazon, Pinterest. */
  logos: [
    { src: "/trust-amazon.svg", alt: "Amazon", w: 77, h: 20 },
    { src: "/trust-pinterest.svg", alt: "Pinterest", w: 87, h: 25 },
    { src: "/trust-accenture.svg", alt: "Accenture", w: 91, h: 24 },
    { src: "/trust-bloomberg.svg", alt: "Bloomberg", w: 90, h: 19 },
    { src: "/trust-salesforce.svg", alt: "Salesforce", w: 37, h: 27 },
    { src: "/trust-netflix.svg", alt: "Netflix", w: 75, h: 25 },
    { src: "/trust-google.svg", alt: "Google", w: 80, h: 25 },
    { src: "/trust-amazon.svg", alt: "Amazon", w: 77, h: 20 },
    { src: "/trust-pinterest.svg", alt: "Pinterest", w: 87, h: 25 },
  ],
};

/* Frosted product card + warehouse photo cluster (Figma 344:11932, 558×557).
   Authored at the Figma pixel positions (÷16 = rem) inside a fixed-size box so
   it scales as one unit on tablet/mobile. */
function ProductCluster({ content }: { content: SwagHeroContent["product"] }) {
  return (
    <div className="relative h-[34.8125rem] w-[34.875rem] shrink-0">
      {/* warehouse photo (399:842) — smaller panel offset behind the card */}
      <div className="absolute left-[15.5rem] top-0 h-[25.5rem] w-[16rem] overflow-hidden rounded-2xl shadow-[0.875rem_1.3125rem_2.8125rem_0_rgba(0,0,0,0.33)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={content.warehouseImage.src}
          alt={content.warehouseImage.alt}
          className="size-full object-cover"
        />
      </div>

      {/* frosted hoodie card (344:11935) — black/0.33 + glass blur (Figma glass r39) */}
      <div className="absolute left-[1.6875rem] top-[7.625rem] flex w-[16.75rem] flex-col justify-end gap-3 rounded-[1.25rem] border border-white/[0.08] bg-black/50 px-[1.375rem] pb-8 pt-[17.5rem] backdrop-blur-[16px]">
        {/* hoodie cut-out (344:11938) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={content.hoodieImage.src}
          alt={content.hoodieImage.alt}
          className="pointer-events-none absolute left-[0.125rem] top-[-3.125rem] size-[20.75rem] object-contain"
        />

        {/* size pill (344:11953) — floating vertical selector */}
        <div className="absolute left-[-1.6875rem] top-[1.875rem] flex flex-col items-center gap-2 rounded-[0.9375rem] bg-black/50 p-[0.625rem] backdrop-blur-[12px]">
          <span className="font-sans text-[0.9375rem] tracking-[0.047rem] text-white/60">
            {content.sizeLabel}
          </span>
          <div className="flex flex-col">
            {content.sizes.map((s) => (
              <span
                key={s}
                className={`flex size-8 items-center justify-center rounded-[0.625rem] font-sans text-[0.9375rem] tracking-[0.047rem] ${s === content.selectedSize
                  ? "bg-black/75 text-white"
                  : "text-white/60"
                  }`}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="relative flex flex-col gap-1">
          <p className="font-sans text-[1.09375rem] font-bold leading-[1.38] tracking-[0.02rem] text-[#dddddd]">
            {content.title}
          </p>
          <p className="font-sans text-[0.75rem] leading-4 tracking-[0.0156rem] text-[#cccccc]">
            {content.description}
          </p>
        </div>
        <div className="relative flex items-center justify-center rounded-lg border border-white/25 py-[0.625rem]">
          <span className="font-sans text-[0.75rem] tracking-[0.047rem] text-[#cccccc]">
            {content.addToCartLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SwagHero({
  content = SWAG_HERO,
  showProduct = true,
  showBgImage = false,
  align = "center",
  bgImageSrc = "/swag/swag-hero-bg.jpg",
  secondaryCtaStyle = "solid",
  shaderChroma,
}: {
  content?: SwagHeroContent;
  /** Render the frosted product cluster on the right. When false, the copy
     lays out per `align` (used by pages whose Figma hero has no product card). */
  showProduct?: boolean;
  /** Overlay a mesh photo (see bgImageSrc) over --color-swag-hero-bg. */
  showBgImage?: boolean;
  /** No-product layout: "center" centers the copy; "left" keeps it left with an
     empty right half (matches e.g. the /recognition hero). */
  align?: "left" | "center";
  /** Hero background photo path used when showBgImage is true. */
  bgImageSrc?: string;
  /** Secondary CTA: "solid" = white fill + ink text (/swag); "outline" =
     transparent + white border + white text (/recognition, /gifting). */
  secondaryCtaStyle?: "solid" | "outline";
  /** Animated hero shader chroma — pass the page accent so it doesn't tint green. */
  shaderChroma?: ShaderChroma;
}) {
  return (
    <section
      style={
        showBgImage ? { backgroundImage: `url('${bgImageSrc}')` } : undefined
      }
      className="relative overflow-hidden px-section-x-sm pb-16 pt-[7rem] md:px-section-x-md md:pb-24 md:pt-[8rem] lg:px-section-x-lg lg:pb-28 lg:pt-[10rem]"
    >
      {/* animated shader background; overlays the static Figma mesh-gradient,
          which shows as the fallback when WebGPU/GPU is unavailable */}
      {/* <SwagHeroShader chroma={shaderChroma} /> */}
      <div className="relative z-10 mx-auto flex w-full max-w-content flex-col gap-16 lg:gap-20">
        {/* copy + product cluster */}
        <div
          className={`flex flex-col items-start gap-12 ${showProduct
            ? "lg:flex-row lg:items-start lg:justify-between lg:gap-8"
            : align === "center"
              ? "lg:items-center"
              : ""
            }`}
        >
          {/* copy column */}
          <div
            className={`flex w-full flex-col gap-8 ${showProduct
              ? "lg:w-[33.9375rem] lg:shrink-0"
              : align === "center"
                ? "mx-auto max-w-[47rem] items-center text-center"
                : "lg:w-[33.9375rem]"
              }`}
          >
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <p
                  data-animation="reveal"
                  className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-swag-mint md:text-eyebrow-md"
                >
                  {content.eyebrow}
                </p>
                <h1
                  data-animation="reveal"
                  className="font-display text-[2rem] leading-[1.05] tracking-[-0.045rem] text-white md:text-[2.75rem] lg:text-[3.625rem] lg:leading-[1.02] lg:tracking-[-0.09375rem]"
                >
                  {content.heading}
                </h1>
              </div>
              <p
                data-animation="reveal"
                className="font-sans text-body-md text-[#fbfeff] lg:text-[1.1875rem] lg:leading-[1.52]"
              >
                {content.body}
              </p>
            </div>

            <div data-animation="reveal" className="flex flex-col gap-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={content.primaryCta.href}
                  className="inline-flex h-button-h items-center justify-center rounded-full bg-swag-green px-button-x font-sans text-button-primary uppercase text-[var(--color-swag-on-accent,#ffffff)] transition-all duration-200 hover:brightness-95 active:scale-[0.98] focus-visible:outline-white"
                >
                  <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                    {content.primaryCta.label}
                  </span>
                </a>
                <a
                  href={content.secondaryCta.href}
                  className={`inline-flex h-button-h items-center justify-center rounded-full border px-button-x font-sans text-button-primary uppercase transition-all duration-200 active:scale-[0.98] focus-visible:outline-white ${secondaryCtaStyle === "outline"
                    ? "border-white bg-transparent text-white hover:bg-white/10"
                    : "border-[#e2e2de] bg-white text-ink hover:bg-grey-100"
                    }`}
                >
                  <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                    {content.secondaryCta.label}
                  </span>
                </a>
              </div>
              <p className="font-sans text-[0.8125rem] font-semibold leading-[1.4] text-[#fbfeff]">
                {content.socialProof}
              </p>
            </div>
          </div>

          {/* product cluster — scales as one unit; stacks under copy below lg */}
          {showProduct && (
            <div className="relative w-full max-w-[34.875rem] origin-top-left scale-[0.62] self-center sm:scale-75 md:scale-90 lg:w-auto lg:scale-100 lg:self-start">
              <ProductCluster content={content.product} />
            </div>
          )}
        </div>

        <div className="mt-12 lg:mt-24">
          <HeroLogoWall />
        </div>
      </div>
    </section>
  );
}
