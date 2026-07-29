/* Events hero (Figma /events 602:1627). Dark green→plum mesh, centered copy,
   pink CTA (accent via --color-swag-*), a phone mockup, and a 4-stat "calendar
   invite" band — no logo marquee (unlike the other verticals). SiteHeader is
   rendered by the page and auto-themes white over this dark hero. */

const STATS = [
  { value: "25,000+", label: "teams" },
  { value: "52,000+", label: "events hosted" },
  { value: "500+", label: "experiences to pick from" },
  { value: "4.8", label: "Capterra rating", star: true },
];

function Star() {
  return (
    <svg
      className="size-7 lg:size-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M11.5 2.6a.5.5 0 0 1 .9 0l2.6 5.3 5.8.8a.5.5 0 0 1 .3.9l-4.2 4.1 1 5.8a.5.5 0 0 1-.7.5L12 17.8l-5.2 2.7a.5.5 0 0 1-.7-.5l1-5.8-4.2-4.1a.5.5 0 0 1 .3-.9l5.8-.8z" />
    </svg>
  );
}

export default function EventsHero() {
  return (
    <section
      style={{ backgroundImage: "url('/events/hero-bg.jpg')" }}
      className="relative overflow-hidden bg-swag-hero-bg bg-cover bg-top bg-no-repeat px-section-x-sm pb-16 pt-[7rem] md:px-section-x-md md:pb-20 md:pt-[8rem] lg:px-section-x-lg lg:pb-24 lg:pt-[10rem]"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-content flex-col items-center gap-14 lg:gap-16">
        {/* copy */}
        <div className="flex max-w-[47rem] flex-col items-center gap-8 text-center">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p
                data-animation="reveal"
                className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-swag-mint md:text-eyebrow-md"
              >
                EVENTS · CONFETTI
              </p>
              <h1
                data-animation="reveal"
                className="font-display text-[2rem] leading-[1.05] tracking-[-0.045rem] text-white md:text-[2.75rem] lg:text-[3.625rem] lg:leading-[1.02] lg:tracking-[-0.09375rem]"
              >
                Bring your team together with hosted experiences
              </h1>
            </div>
            <p
              data-animation="reveal"
              className="font-sans text-body-md text-[#fbfeff] lg:text-[1.1875rem] lg:leading-[1.52]"
            >
              Real hosts. Hundreds of virtual, in-person, and hybrid events. Book
              in minutes from the same platform you use for recognition and
              gifting.
            </p>
          </div>

          <div data-animation="reveal" className="flex flex-col items-center gap-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#"
                className="inline-flex h-button-h items-center justify-center rounded-full bg-swag-green px-button-x font-sans text-button-primary uppercase text-[var(--color-swag-on-accent,#ffffff)] transition-all duration-200 hover:brightness-95 active:scale-[0.98] focus-visible:outline-white"
              >
                <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                  Book a demo
                </span>
              </a>
              <a
                href="#"
                className="inline-flex h-button-h items-center justify-center rounded-full border border-white bg-transparent px-button-x font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-white"
              >
                <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                  Browse the catalog
                </span>
              </a>
            </div>
            <p className="font-sans text-[0.8125rem] font-semibold leading-[1.4] text-[#fbfeff]">
              4.8 on Capterra · 25,000+ teams · 52,000+ events hosted
            </p>
          </div>
        </div>

        {/* phone mockup (rises from below the copy) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/events/hero-phone.png"
          alt=""
          aria-hidden
          width={419}
          height={364}
          className="h-auto w-[20rem] max-w-full sm:w-[24rem]"
        />

        {/* 4-stat band */}
        <div className="flex w-full flex-col items-center gap-10">
          <h2
            data-animation="reveal"
            className="font-display text-[1.75rem] leading-[1.1] text-white md:text-[2rem]"
          >
            The calendar invite people accept
          </h2>
          <div className="grid w-full grid-cols-2 gap-y-10 sm:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-2 px-3 text-center text-white"
              >
                <span className="flex items-center gap-1.5 font-display text-[2.5rem] leading-[1.02] tracking-[-0.0625rem] lg:text-[2.875rem]">
                  {s.value}
                  {s.star && <Star />}
                </span>
                <span className="font-sans text-[0.9375rem] font-semibold">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
