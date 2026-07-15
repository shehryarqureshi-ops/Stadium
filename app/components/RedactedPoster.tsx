import Globe from "./Globe";
import Starfield from "./Starfield";

/* "We simplify global shipping" — dark globe beat, top of the dark block, synced
   to Figma 2:33247. Navy→black section: left text (blue eyebrow + 55px heading +
   body + white TALK TO SALES), right an interactive cobe globe with rotation-
   tracked city markers (San Francisco / New York / Dubai) over a twinkling
   starfield. Desktop uses a 1440×1000 proportional canvas so the globe stays
   pinned; below lg it stacks. Rounded-top = top of the dark block. */

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
          global shipping.
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
        href="#"
        className="mt-2 inline-flex h-button-h w-fit items-center justify-center rounded-button bg-white px-button-x font-sans text-button-primary uppercase text-brand-hero shadow-button transition-all duration-200 hover:bg-grey-100 active:scale-[0.98] focus-visible:outline-white"
      >
        Talk to sales
      </a>
    </>
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
      <div className="relative z-10 mx-auto hidden aspect-[1440/1000] w-full max-w-[90rem] lg:block">
        {/* interactive cobe globe — Figma placement (3D Globe 2:33352:
            abs x508 / y-351 / 1250², offset off the top-right) */}
        <div className="absolute left-[35.3%] top-[-35.1%] aspect-square w-[86.8%]">
          <Globe />
        </div>
        {/* text block at frame coords (x120 / y~305 / w573) */}
        <div className="absolute left-[8.33%] top-[30.5%] flex w-[41%] flex-col gap-6">
          <Copy />
        </div>
      </div>

      {/* MOBILE / TABLET — stacked */}
      <div className="relative z-10 flex flex-col gap-10 px-section-x-sm py-section-y-sm md:px-section-x-md md:py-section-y-md lg:hidden">
        <div className="flex flex-col gap-6">
          <Copy />
        </div>
        <div className="relative aspect-square w-full max-w-[26rem] self-center">
          <Globe />
        </div>
      </div>
    </section>
  );
}
