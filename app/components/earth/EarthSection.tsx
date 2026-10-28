import Starfield from "../Starfield";
import { InfraChapters } from "../pyramid/InfraPyramid";
import ResponsiveEarthGlobe from "./ResponsiveEarthGlobe";

/* "One system. Three layers." — the dotted-earth version of "The Stadium Infrastructure"
   (Figma 7133:9894). Left: eyebrow, headline, one-liner and the three layers (Physical, Digital,
   People) as a hairline list. Right: the interactive globe bleeding off the top-right with five
   event pills and a "live order" card. Same navy sky, rounded top edge and starfield as the
   pyramid section, so the two are drop-in swaps (see INFRA_SECTION in app/page.tsx).
   Desktop is a proportional 1440×960 canvas (percent placement, like the old globe section),
   capped and centred above 1440; below lg the copy stacks over a smaller globe. */

const LAYERS = [
  { num: "01", name: "Physical", note: "Made and delivered in-country." },
  { num: "02", name: "Digital", note: "One platform, every team." },
  { num: "03", name: "People", note: "The team, included." },
];

const STEPS = [
  { text: "Decorated in-country", color: "bg-accent-water" },
  { text: "Duties and taxes paid", color: "bg-accent-water" },
  { text: "Delivered to Aiko M.", color: "bg-accent-lime" },
];

function Copy() {
  return (
    <>
      <div className="flex flex-col gap-3 lg:gap-6">
        <p className="font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem] text-pyramid-ice">
          Global Engagement Infrastructure
        </p>
        <h2 className="font-display text-display-sm text-white md:text-heading-xl lg:text-display-md xl:text-earth-title">
          One system.
          <br />
          Three layers.
        </h2>
      </div>
      <p className="mt-6 max-w-[27.5rem] font-sans text-body-lg text-white/65">
        Everything it takes to show up for anyone, anywhere, in 170+ countries.
      </p>
      <ol className="mt-10 border-t border-white/15">
        {LAYERS.map((l) => (
          <li
            key={l.num}
            className="grid min-h-earth-row-h grid-cols-[1.75rem_1fr] items-center gap-x-4 gap-y-1 border-b border-white/15 py-3 md:flex md:py-0"
          >
            <span className="font-sans text-[0.75rem] font-bold leading-4 tracking-[0.0625rem] text-pyramid-ice">
              {l.num}
            </span>
            <span className="shrink-0 font-display text-earth-layer text-white md:w-[5.625rem]">
              {l.name}
            </span>
            <span className="col-start-2 font-sans text-earth-note text-white/[0.62] md:col-auto">
              {l.note}
            </span>
          </li>
        ))}
      </ol>
    </>
  );
}

/* the "New hire kit • Tokyo" card is hidden for now — set to true to bring it back */
const SHOW_LIVE_ORDER = false;

function LiveOrder({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`flex w-[10.8125rem] flex-col gap-2.5 rounded-2xl bg-white p-4 shadow-earth-card ${className}`}
    >
      <p className="font-sans text-[0.875rem] font-semibold leading-[1.1875rem] text-swag-ink">
        New hire kit • Tokyo
      </p>
      <ul className="flex flex-col gap-2.5">
        {STEPS.map((s) => (
          <li key={s.text} className="flex items-center gap-2">
            <span className={`size-2 shrink-0 rounded-full ${s.color}`} />
            <span className="font-sans text-[0.8125rem] leading-[1.125rem] text-swag-ink/75">
              {s.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function EarthSection() {
  return (
    <section
      aria-label="The Stadium infrastructure"
      className="relative overflow-clip rounded-t-[2.5rem] bg-black text-white"
    >
      <div className="relative overflow-hidden bg-[radial-gradient(115%_105%_at_74%_16%,#011c3d_0%,#020a14_45%,#000000_78%)]">
        <Starfield className="absolute inset-0 h-full w-full" />

        {/* DESKTOP — 1440×960 proportional canvas */}
        <div className="relative mx-auto hidden aspect-[1440/960] w-full max-w-[90rem] lg:block">
          {/* globe — 1097² box, top-right bleed (calibrated so the dotted continents match the Figma frame) */}
          <div className="absolute left-[37.71%] top-[-11.46%] aspect-square w-[76.18%]">
            <ResponsiveEarthGlobe slot="desktop" />
          </div>
          {/* copy at frame coords (x120 / y238 / w440) */}
          <div className="absolute left-[max(1.875rem,calc((100%-var(--container-content))/2))] top-[24.79%] flex w-[36%] flex-col xl:w-[30.56%]">
            <Copy />
          </div>
          {/* lg: tucked bottom-centre so it clears the Singapore pill; xl+: Figma position (x1073 / y520) */}
          {SHOW_LIVE_ORDER && <LiveOrder className="absolute left-[62%] top-[68%] xl:left-[74.51%] xl:top-[54.17%]" />}
        </div>

        {/* TABLET + PHONE — stacked */}
        <div className="relative z-10 flex flex-col gap-10 px-section-x-sm py-section-y-md md:px-section-x-md lg:hidden">
          <div className="flex flex-col">
            <Copy />
          </div>
          <div className="relative aspect-square w-full max-w-[26rem] self-center">
            {/* blue bloom so the luminosity-blended globe reads navy-blue, not grey */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-[20%] bg-[radial-gradient(closest-side,rgba(11,122,252,0.5)_0%,rgba(11,122,252,0.25)_55%,rgba(11,122,252,0)_100%)]"
            />
            <ResponsiveEarthGlobe slot="stacked" />
          </div>
          {SHOW_LIVE_ORDER && <LiveOrder className="self-center" />}
        </div>
      </div>

      {/* Physical · Digital · People continue underneath, on the same starfield sky */}
      <InfraChapters />
    </section>
  );
}
