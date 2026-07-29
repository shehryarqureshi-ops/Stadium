/* Offerings — Figma /swag 490:6165 ("One catalog. Two ways to order."). Two
   offer cards on a grey #f2f2f2 tray. Each card is white with a nested grey
   (#f7f7f7) header block (title + kicker) over a white body block (copy,
   3-item checklist, CTA). The "Run a swag program" card is emphasised: black
   border, heavy directional shadow, and a black "Popular" pill. Desktop side-
   by-side, stacks on mobile. */

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

export type Offer = {
  variant: "primary" | "secondary";
  title: string;
  kicker: string;
  desc: string[];
  features: string[];
  cta: string;
  popular?: boolean;
};

export type SwagOfferingsContent = {
  eyebrow: string;
  heading: string;
  body: string;
  offers: Offer[];
};

export const SWAG_OFFERINGS: SwagOfferingsContent = {
  eyebrow: "TWO WAYS IN",
  heading: "One catalog. Two ways to order.",
  body: "The same products and quality, whether you work with our team or order on your own.",
  offers: [
    {
      variant: "primary",
      title: "Run a swag program",
      kicker: "STADIUM PLATFORM · SALES-ASSISTED",
      desc: [
        "We build your stores, hold your inventory, and ship on autopilot. We set it up. Finance keeps spend in control.",
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
        "Design it, order it, send it.",
        "No contract, no minimums.",
        "Opens in a new tab.",
      ],
      features: [
        "On-demand & bulk ordering",
        "No minimums, no setup call",
        "Pay as you go",
      ],
      cta: "Shop SwagMagic",
    },
  ],
};

function OfferCard({ variant, title, kicker, desc, features, cta, popular }: Offer) {
  const primary = variant === "primary";
  return (
    <div
      className={`relative flex flex-1 rounded-3xl bg-white p-2.5 ${
        primary
          ? "border border-[#1b1b1b] shadow-[2.5rem_2.5rem_1.77rem_rgba(0,0,0,0.11),0.8rem_0.8rem_0.56rem_rgba(0,0,0,0.06),0.18rem_0.18rem_0.13rem_rgba(0,0,0,0.05)]"
          : "shadow-[0_0.1875rem_0.375rem_0_rgba(0,0,0,0.06)]"
      }`}
    >
      {popular && (
        <span className="absolute -top-[0.65rem] right-[2.4375rem] z-10 rounded-full bg-[#1b1b1b] px-3 pb-[0.1875rem] pt-1 font-sans text-[0.6875rem] font-bold tracking-[0.025rem] text-white">
          Popular
        </span>
      )}
      <div className="flex flex-1 flex-col gap-2.5">
        {/* grey header block */}
        <div className="flex flex-col gap-4 rounded-2xl bg-[#f7f7f7] p-6">
          <h3 className="font-display text-[1.75rem] leading-[1.1] text-swag-ink lg:text-[2rem] lg:leading-10">
            {title}
          </h3>
          <p className="font-sans text-[0.6875rem] font-bold uppercase tracking-[0.025rem] text-[#828282]">
            {kicker}
          </p>
        </div>

        {/* white body block */}
        <div className="flex flex-1 flex-col gap-8 rounded-2xl bg-white p-6">
          <p className="font-sans text-body-md leading-[1.5] text-[#828282]">
            {desc.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </p>
          <ul className="flex flex-col gap-3 pb-2">
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
            className={`mt-auto inline-flex w-full items-center justify-center rounded-full px-[1.375rem] py-[1.125rem] font-sans text-button-primary uppercase transition-all duration-200 active:scale-[0.98] focus-visible:outline-ink ${
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

export default function SwagOfferings({
  content = SWAG_OFFERINGS,
}: {
  content?: SwagOfferingsContent;
}) {
  return (
    <section className="rounded-b-[3.75rem] bg-white px-section-x-sm pb-20 md:px-section-x-md md:pb-24 lg:px-section-x-lg lg:pb-28">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        <div className="flex max-w-[46rem] flex-col items-center gap-5 text-center">
          <div className="flex flex-col items-center gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-swag-green-deep md:text-eyebrow-md"
            >
              {content.eyebrow}
            </p>
            <h2
              data-animation="reveal"
              className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem] lg:text-[2.75rem]"
            >
              {content.heading}
            </h2>
          </div>
          <p
            data-animation="reveal"
            className="font-sans text-body-md text-swag-grey lg:text-[1.125rem] lg:leading-[1.48]"
          >
            {content.body}
          </p>
        </div>

        <div
          data-animation="reveal"
          className="flex w-full max-w-[54.625rem] flex-col gap-4 rounded-[2rem] bg-[#f2f2f2] p-4 md:flex-row md:items-stretch"
        >
          {content.offers.map((o) => (
            <OfferCard key={o.title} {...o} />
          ))}
        </div>
      </div>
    </section>
  );
}
