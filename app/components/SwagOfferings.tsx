/* Offerings — Figma /swag 399:748 ("One catalog. Two ways to order."). Two
   offer cards: a green-gradient "Run a swag program" (Popular, sales-assisted)
   and a grey "Ship it yourself today" (SwagMagic self-serve). Each wraps a
   white inner card with copy, a 3-item checklist, and a CTA. Desktop side-by-
   side, stacks on mobile. */

function Check() {
  return (
    <svg
      className="size-3.5 shrink-0 text-swag-ink"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

type Offer = {
  variant: "primary" | "secondary";
  title: string;
  kicker: string;
  desc: string[];
  features: string[];
  cta: string;
  popular?: boolean;
};

const OFFERS: Offer[] = [
  {
    variant: "primary",
    title: "Run a swag program",
    kicker: "STADIUM PLATFORM · SALES-ASSISTED",
    desc: [
      "We build your stores, hold your inventory, and ship on autopilot.",
      "We set it up. Finance keeps spend in control.",
    ],
    features: [
      "Branded stores & kitting",
      "Inventory + global fulfillment",
      "Budgets, approvals & SSO",
    ],
    cta: "Book a demo",
    popular: true,
  },
  {
    variant: "secondary",
    title: "Ship it yourself today",
    kicker: "SWAGMAGIC · SELF-SERVE",
    desc: [
      "Design it, order it, send it. No contract, no minimums.",
      "Opens in a new tab.",
    ],
    features: [
      "On-demand & bulk ordering",
      "No minimums, no setup call",
      "Pay as you go",
    ],
    cta: "Shop SwagMagic",
  },
];

function OfferCard({ variant, title, kicker, desc, features, cta, popular }: Offer) {
  const primary = variant === "primary";
  return (
    <div
      className={`relative flex flex-1 rounded-3xl ${
        primary
          ? "bg-[linear-gradient(220deg,#0e5e38_0%,#2a9a5d_48%,#83d9a3_100%)] shadow-[1.25rem_1.25rem_2.5rem_-0.5rem_rgba(0,0,0,0.14)]"
          : "bg-[#f2f2f2]"
      }`}
    >
      {popular && (
        <span className="absolute -top-3 right-8 z-10 rounded-full bg-swag-green-deep px-2 pb-0.5 pt-1 font-sans text-[0.75rem] font-bold tracking-[0.025rem] text-white">
          Popular
        </span>
      )}
      <div className="flex flex-1 flex-col gap-7 p-7">
        <div className="flex flex-col gap-4">
          <h3
            className={`font-display text-[1.75rem] leading-[1.1] tracking-[-0.01rem] lg:text-[2rem] lg:leading-10 ${
              primary ? "text-white" : "text-swag-ink"
            }`}
          >
            {title}
          </h3>
          <p
            className={`font-sans text-[0.6875rem] font-bold uppercase tracking-[0.025rem] ${
              primary ? "text-[#f7f7f7]" : "text-[#828282]"
            }`}
          >
            {kicker}
          </p>
        </div>

        {/* white inner card */}
        <div className="flex flex-col gap-8 rounded-2xl bg-white px-7 pb-[1.875rem] pt-7 shadow-[0_0.1875rem_0.375rem_0_rgba(0,0,0,0.06)]">
          <p className="font-sans text-body-md leading-[1.5] text-[#828282]">
            {desc.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </p>
          <ul className="flex flex-col gap-3">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2.5">
                <Check />
                <span className="font-sans text-[0.9375rem] leading-[1.4] text-swag-ink">
                  {f}
                </span>
              </li>
            ))}
          </ul>
          <a
            href="#"
            className={`inline-flex h-12 items-center justify-center rounded-full px-[1.375rem] font-sans text-button-primary uppercase transition-all duration-200 active:scale-[0.98] focus-visible:outline-ink ${
              primary
                ? "bg-[#111111] text-white hover:bg-black"
                : "bg-[#f2f2f2] text-ink hover:bg-grey-200"
            }`}
          >
            <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
              {cta}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SwagOfferings() {
  return (
    <section className="rounded-b-[3.75rem] bg-white px-section-x-sm pb-20 md:px-section-x-md md:pb-24 lg:px-section-x-lg lg:pb-28">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        <div className="flex max-w-[46rem] flex-col items-center gap-5 text-center">
          <div className="flex flex-col items-center gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-swag-green-deep md:text-eyebrow-md"
            >
              TWO WAYS IN
            </p>
            <h2
              data-animation="reveal"
              className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem] lg:text-[2.75rem]"
            >
              One catalog. Two ways to order.
            </h2>
          </div>
          <p
            data-animation="reveal"
            className="font-sans text-body-md text-swag-grey lg:text-[1.125rem] lg:leading-[1.48]"
          >
            The same products and quality, whether you work with our team or
            order on your own.
          </p>
        </div>

        <div
          data-animation="reveal"
          className="flex w-full max-w-[54.625rem] flex-col gap-4 md:flex-row md:items-stretch"
        >
          {OFFERS.map((o) => (
            <OfferCard key={o.title} {...o} />
          ))}
        </div>
      </div>
    </section>
  );
}
