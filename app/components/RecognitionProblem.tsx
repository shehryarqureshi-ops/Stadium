/* Recognition · "THE PROBLEM" (Figma /recognition 312:5229, nested in the hero
   frame 312:5063). Same peek-bars + white-card shell as SwagProblem, but the
   three cards use lilac lucide icon tiles (shuffle / package / earth) instead
   of photos. Sits directly under the hero, continuing its dark mesh and fading
   to white. Accent (bg-swag-green-deep / text-swag-green-deep) inherits the
   page's --color-swag-* override, so it renders lilac on /recognition. */

type Card = {
  icon: "shuffle" | "package" | "earth";
  title: string;
  desc: string;
};

const CARDS: Card[] = [
  {
    icon: "shuffle",
    title: "Points Go Unredeemed",
    desc: "Points accumulate in dashboards, and some expire before they're ever used.",
  },
  {
    icon: "package",
    title: "Rewards Feels Generic",
    desc: "Gift cards and points rarely feel memorable or meaningful.",
  },
  {
    icon: "earth",
    title: "Impact Stays Unclear",
    desc: "Without measurable impact, recognition becomes a nice-to-have that's easy to cut.",
  },
];

/* Inline lucide paths (lucide-react isn't a dependency) — rendered white via
   currentColor inside the accent tile. */
function Icon({ name }: { name: Card["icon"] }) {
  if (name === "shuffle")
    return (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" />
        <path d="m18 2 4 4-4 4" />
        <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
        <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
        <path d="m18 14 4 4-4 4" />
      </svg>
    );
  if (name === "package")
    return (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
        <path d="M12 22V12" />
        <polyline points="3.29 7 12 12 20.71 7" />
        <path d="m7.5 4.27 9 5.15" />
      </svg>
    );
  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
      <path d="M7 3.34V5a3 3 0 0 0 3 3 2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
      <path d="M11 21.95V18a2 2 0 0 0-2-2 2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

export default function RecognitionProblem() {
  return (
    <section className="relative overflow-hidden bg-white px-section-x-sm pb-16 md:px-section-x-md md:pb-24 lg:px-section-x-lg lg:pb-28">
      {/* continue the hero's dark mesh, fading to white behind the peek bars */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] bg-[linear-gradient(to_bottom,#160a26,#ffffff)]"
      />

      <div className="relative mx-auto flex w-full max-w-content flex-col items-center">
        {/* peek-behind bars (312:472 / 312:471) */}
        <div className="flex w-full flex-col items-center">
          <div className="h-[0.875rem] w-[92%] rounded-t-[0.4375rem] bg-white/50" />
          <div className="h-[1.125rem] w-[96%] rounded-t-[0.625rem] bg-white/75" />
        </div>

        {/* white card */}
        <div className="w-full rounded-2xl bg-white px-5 pb-10 pt-14 sm:px-8 lg:px-20 lg:pb-20 lg:pt-[8.75rem]">
          <div className="flex flex-col items-center gap-10">
            {/* header */}
            <div className="flex w-full max-w-[53.75rem] flex-col items-center gap-5 text-center">
              <div className="flex flex-col items-center gap-2">
                <p
                  data-animation="reveal"
                  className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-swag-green-deep md:text-eyebrow-md"
                >
                  THE PROBLEM
                </p>
                <h2
                  data-animation="reveal"
                  className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem] lg:text-[2.75rem]"
                >
                  Recognition fades faster than it should
                </h2>
              </div>
              <p
                data-animation="reveal"
                className="font-sans text-body-md text-swag-grey lg:text-[1.125rem] lg:leading-[1.48]"
              >
                You send recognition in seconds. People read it, react, and move
                on. Without a tangible follow-up, the moment rarely lasts.
              </p>
            </div>

            {/* 3-card grid on a tray */}
            <div
              data-animation="reveal"
              className="grid w-full grid-cols-1 gap-4 rounded-[2rem] bg-[#f2f2f2] p-4 md:grid-cols-3"
            >
              {CARDS.map((c) => (
                <div
                  key={c.title}
                  className="flex flex-col justify-between gap-14 rounded-[1.25rem] bg-white px-7 pb-[1.875rem] pt-7 shadow-[0_0.1875rem_0.375rem_rgba(0,0,0,0.06)]"
                >
                  <span className="flex size-[2.875rem] shrink-0 items-center justify-center rounded-[0.625rem] bg-swag-green-deep text-white">
                    <Icon name={c.icon} />
                  </span>
                  <div className="flex flex-col gap-3">
                    <h3 className="font-display text-[1.3125rem] leading-[1.04] tracking-[-0.01875rem] text-swag-ink">
                      {c.title}
                    </h3>
                    <p className="font-sans text-[0.9375rem] leading-[1.5] text-swag-grey">
                      {c.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
