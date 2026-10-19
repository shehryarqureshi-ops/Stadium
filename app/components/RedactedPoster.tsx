import Image from "next/image";
import ResponsiveGlobe from "./ResponsiveGlobe";
import Starfield from "./Starfield";

function Copy() {
  return (
    <>
      <div className="flex flex-col gap-3">
        <p
          data-animation="reveal"
          className="font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem] text-[#a4cefe]"
        >
          Built for global scale
        </p>
        <h2
          data-animation="reveal"
          className="font-display text-heading-md text-white lg:text-[3.4375rem] lg:leading-[3.75rem] lg:tracking-[-0.075rem]"
        >
          We simplify
          <br />
          global shipping
        </h2>
      </div>
      <p
        data-animation="reveal"
        className="max-w-[30rem] font-sans text-body-md text-[#cccccc] lg:max-w-[25rem] lg:text-[1.125rem] lg:leading-7 lg:tracking-[0.0156rem]"
      >
        More countries mean more customs rules, VAT rates, and restricted items.
        Stadium covers all of it across 170+ countries.
      </p>
      <a
        data-animation="reveal"
        href="/book-a-call"
        className="mt-2 inline-flex h-button-h w-fit items-center justify-center rounded-button bg-white px-button-x font-sans text-button-primary uppercase text-brand-hero shadow-button transition-all duration-200 hover:bg-grey-100 active:scale-[0.98] focus-visible:outline-white"
      >
        Talk to sales
      </a>
    </>
  );
}

/* Capability tags floating over the phone globe (Figma variation C). */
const TAGS: { label: string; icon: string; pos: string }[] = [
  { label: "Failed Delivery", icon: "M12 3L2 20h20L12 3z M12 10v4 M12 17h.01", pos: "left-4 top-[4.375rem]" },
  { label: "VAT & GST", icon: "M3 3h8l10 10-8 8L3 11V3z M7.5 7.5h.01", pos: "right-4 top-[7.375rem]" },
  { label: "Address Formats", icon: "M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z M12 12a2 2 0 100-4 2 2 0 000 4z", pos: "left-7 top-[11.875rem]" },
  { label: "HS Codes", icon: "M8 8l-4 4 4 4 M16 8l4 4-4 4", pos: "right-3.5 top-[15.625rem]" },
];

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-display text-[2rem] leading-9 tracking-[-0.03rem] text-white">
        {value}
      </span>
      <span className="font-sans text-[0.8125rem] leading-[1.125rem] text-white/65">
        {label}
      </span>
    </div>
  );
}

/* PHONE (< md) — globe leads, frosted card with copy, proof points and CTA
   slides over it. Static globe frame: no WebGL on phones. */
function PhoneLayout() {
  return (
    <div className="relative z-10 px-4 pb-6 pt-[18.75rem] md:hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[34rem]">
        {/* blue bloom behind the globe so the luminosity blend reads navy */}
        <div className="absolute -left-[5.75rem] -top-10 h-[35rem] w-[35rem] bg-[radial-gradient(closest-side,rgba(11,122,252,0.55)_0%,rgba(11,122,252,0.28)_55%,rgba(11,122,252,0)_100%)]" />
        <Image
          src="/globe-static.webp"
          alt=""
          width={686}
          height={686}
          sizes="35rem"
          priority
          className="absolute -left-[5.75rem] -top-10 h-[35rem] w-[35rem] max-w-none mix-blend-luminosity"
        />
        {TAGS.map((t) => (
          <span
            key={t.label}
            className={`absolute flex items-center gap-1.5 rounded-lg border border-[#4c95f5]/50 bg-[#0b3f8f]/90 py-[0.4375rem] pl-2.5 pr-3 font-sans text-[0.75rem] leading-4 tracking-[0.0063rem] text-white ${t.pos}`}
          >
            <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={t.icon} />
            </svg>
            {t.label}
          </span>
        ))}
      </div>

      <div
        data-animation="reveal"
        className="relative flex flex-col gap-4 rounded-3xl border border-white/15 bg-gradient-to-b from-[#0a1e3f]/70 to-black/80 px-[1.375rem] py-7 backdrop-blur-[1.5rem]"
      >
        <p className="font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem] text-[#a4cefe]">
          Built for global scale
        </p>
        <h2 className="font-display text-[2.125rem] leading-[2.375rem] tracking-[-0.0438rem] text-white">
          We simplify global shipping
        </h2>
        <p className="font-sans text-[0.9375rem] leading-[1.4375rem] text-white/80">
          More countries mean more customs rules, VAT rates, and restricted
          items. Stadium covers all of it across 170+ countries.
        </p>
        <hr className="border-white/15" />
        <div className="flex items-center gap-5">
          <Stat value="170+" label="countries" />
          <span aria-hidden className="h-10 w-px bg-white/20" />
          <Stat value="1,000+" label="local partners" />
        </div>
        <a
          href="/book-a-call"
          className="inline-flex h-[3.25rem] w-full items-center justify-center rounded-button bg-white px-button-x font-sans text-button-primary uppercase text-brand-hero shadow-button transition-all duration-200 hover:bg-grey-100 active:scale-[0.98] focus-visible:outline-white"
        >
          Talk to sales
        </a>
      </div>
    </div>
  );
}

export default function RedactedPoster() {
  return (
    <section
      id="redacted-poster"
      className="relative overflow-hidden rounded-t-[2.5rem] bg-[radial-gradient(115%_105%_at_74%_16%,#011c3d_0%,#020a14_45%,#000000_78%)]"
    >
      {/* twinkling starfield behind everything */}
      <Starfield className="absolute inset-0 h-full w-full" />

      {/* DESKTOP — 1440×1000 proportional canvas */}
      <div className="relative mx-auto hidden aspect-[1440/1000] w-full max-w-[90rem] lg:block">
        {/* interactive cobe globe — Figma placement (3D Globe 2:33352:
            abs x508 / y-351 / 1250², offset off the top-right) */}
        <div className="absolute left-[35.3%] top-[-25.1%] aspect-square w-[86.8%]">
          <ResponsiveGlobe slot="desktop" />
        </div>
        {/* text block at frame coords (x120 / y~305 / w573) */}
        <div className="absolute left-[8.33%] top-[30.5%] flex w-[41%] flex-col gap-6">
          <Copy />
        </div>
      </div>

      <PhoneLayout />

      {/* TABLET — stacked */}
      <div className="relative z-10 hidden flex-col gap-10 px-section-x-md py-section-y-md md:flex lg:hidden">
        <div className="flex flex-col gap-6">
          <Copy />
        </div>
        <div className="relative aspect-square w-full max-w-[26rem] self-center">
          <ResponsiveGlobe slot="stacked" />
        </div>
      </div>
    </section>
  );
}
