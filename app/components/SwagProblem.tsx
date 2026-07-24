/* Problem · Swag — Figma /swag 344:11965 ("Swag becomes your second job").
   A white card (with two peek-behind "bars" above it for stacked depth) that
   overlaps the green hero via a green→white top gradient. Holds the THE PROBLEM
   eyebrow, heading + intro, and a 3-card grid on a #f2f2f2 tray. Desktop 3-up,
   stacks on mobile. */

const CARDS = [
  {
    img: "/swag/swag-problem-1.jpg",
    alt: "Branded store dashboard scattered around a laptop",
    title: "One vendor becomes three",
    desc: "Swag, kits, and fulfillment each come from a different vendor: separate logins, invoices, and coordination.",
  },
  {
    img: "/swag/swag-problem-2.jpg",
    alt: "An overflowing swag closet full of boxes and apparel",
    title: "The swag closet keeps growing",
    desc: "Boxes pile up, inventory goes stale, and no one knows what's left. Reorders are a guess.",
  },
  {
    img: "/swag/swag-problem-3.jpg",
    alt: "A laptop showing a global shipment tracking map",
    title: "Then come the logistics",
    desc: "You track shipments, organize sizes, and manage customs and duties.",
  },
];

function ProblemCard({ img, alt, title, desc }: (typeof CARDS)[number]) {
  return (
    <div className="flex flex-1 flex-col rounded-xl border-8 border-white bg-white p-2 shadow-[0_0.1875rem_0.375rem_0_rgba(0,0,0,0.06)]">
      <div className="overflow-hidden rounded-bl-3xl rounded-br-3xl rounded-tl-lg rounded-tr-lg drop-shadow-[0_0.75rem_0.5rem_rgba(0,0,0,0.12)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt={alt}
          className="aspect-[333/250] w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 px-6 pb-8 pt-10 lg:px-8">
        <h3 className="font-display text-[1.5rem] leading-[1.1] tracking-[-0.01875rem] text-swag-ink lg:text-[1.6875rem]">
          {title}
        </h3>
        <p className="font-sans text-body-md leading-[1.5] text-swag-grey">
          {desc}
        </p>
      </div>
    </div>
  );
}

export default function SwagProblem() {
  return (
    <section className="relative overflow-hidden bg-white px-section-x-sm pb-16 md:px-section-x-md md:pb-24 lg:px-section-x-lg lg:pb-28">
      {/* overlaps the hero and continues its green (no seam), fading to white
          behind the peek bars + card */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] bg-[linear-gradient(to_bottom,#0a0a0a,#ffffff)]"
      />

      <div className="relative mx-auto flex w-full max-w-content flex-col items-center">
        {/* peek-behind bars (344:11966) */}
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
                  Swag becomes your second job.
                </h2>
              </div>
              <p
                data-animation="reveal"
                className="font-sans text-body-md text-swag-grey lg:text-[1.125rem] lg:leading-[1.48]"
              >
                Swag starts as one task: choosing what to send. Before long,
                you&rsquo;re managing vendors, boxes, and spreadsheets full of
                addresses.
              </p>
            </div>

            {/* 3-card grid on a tray */}
            <div
              data-animation="reveal"
              className="grid w-full grid-cols-1 gap-2.5 rounded-3xl bg-[#f2f2f2] p-2.5 md:grid-cols-3"
            >
              {CARDS.map((c) => (
                <ProblemCard key={c.title} {...c} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
