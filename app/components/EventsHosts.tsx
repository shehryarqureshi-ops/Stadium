/* Events · host profiles (Figma /events 608:3927). "The host makes all the
   difference" — a 4-up grid of host profiles (photo + name + role). Figma ships
   blank placeholder photos. Eyebrow inherits the page's pink accent. */

const HOSTS = [
  { name: "Maya R.", role: "Trivia & game-show host" },
  { name: "Diego S.", role: "Chef & culinary host" },
  { name: "Aisha K.", role: "Yoga & mindfulness" },
  { name: "Tom B.", role: "Improv & team games" },
];

export default function EventsHosts() {
  return (
    <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-24">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        <div className="flex max-w-[47.5rem] flex-col items-center gap-5 text-center">
          <div className="flex flex-col items-center gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-swag-green-deep md:text-eyebrow-md"
            >
              THE SECRET SAUCE
            </p>
            <h2
              data-animation="reveal"
              className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem] lg:text-[2.75rem]"
            >
              The host makes all the difference
            </h2>
          </div>
          <p
            data-animation="reveal"
            className="font-sans text-body-md text-swag-grey lg:text-[1.125rem] lg:leading-[1.48]"
          >
            Every experience is led by a vetted expert who knows how to read the
            room, keep conversations flowing, and make sure everyone feels
            involved.
          </p>
        </div>

        <div
          data-animation="reveal"
          className="grid w-full grid-cols-2 gap-6 lg:grid-cols-4"
        >
          {HOSTS.map((h) => (
            <div key={h.name} className="flex flex-col gap-4">
              <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-grey-200">
                <svg
                  className="size-10 text-grey-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-[1.25rem] leading-[1.1] tracking-[-0.01875rem] text-swag-ink">
                  {h.name}
                </h3>
                <p className="font-sans text-[0.9375rem] leading-[1.5] text-swag-grey">
                  {h.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
