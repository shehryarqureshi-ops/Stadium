/* /pricing · HERO (Figma n9SjmDjzB1PeZAYJ5w43fr → 3998:4515 "hero").
   Sits on the page-wide navy→night gradient painted by app/pricing/page.tsx.
   Eyebrow + 58px headline + truck "free delivery" line, then five Pass cards
   (Pay-as-you-go → Shops → Swag → Engagement [Most Popular, elevated] → Enterprise) and a
   "compare all features" anchor down to the comparison table.

   Figma stack (desktop 1440, nav band 84 above):
     text      pt 120   eyebrow 12 → 8 → headline 58/1.02 (w 726) → 32 → truck row
     gap 80
     cards     h 470    5 × flex-1, gap 16; card p-10 r24 → title block (#f7f7f7,
                        r16, px16 py24) → 10 → body (px16 py24: rows gap 12, pb 8 →
                        32 → pill CTA)
     gap 40
     compare   12 Bold uppercase +1px, white underline (pb 2)
   Five passes (Pay-as-you-go → Enterprise); card row is Figma 1360 @ 40px from
   `wide` (max-w-pricing-cards), site max-w-content inside section-x below that.
   Cards: h 470 (wide), feature rows 12px (text-feature-sm).

   Each "Talk to sales" sets ?interestedPackage=<pass> and jumps to the Book a
   Demo form — BookACallForm already reads that param on submit and forwards it
   to sales as `interested_package`. */

import Link from "next/link";
import { Check, Plus, Star, Truck, Wallet } from "lucide-react";

type Pass = {
  title: string;
  tagline: string;
  lead: string;
  features: string[];
  addOns?: string[];
  popular?: boolean;
  cta?: string;
};

/* The CTA pins to the card bottom so uneven lists still align. */
const PASSES: Pass[] = [
  {
    title: "Pay-as-you-go",
    tagline: "Order what you need, when you need it.",
    lead: "No pass needed",
    cta: "Get started",
    features: ["Snack Boxes (Snackmagic)", "Bulk Swag (Swagmagic)", "Hosted Experiences (Confetti)"],
  },
  {
    title: "Shops Pass",
    tagline: "Launch branded swag and gift shops.",
    lead: "Pay-as-you-go, plus",
    features: ["Unlimited Swag & Gift Shops", "Free Domestic Delivery"],
  },
  {
    title: "Swag Pass",
    tagline: "Store, manage, and ship swag at scale.",
    lead: "All of Shops, plus",
    features: ["Swag Storage", "Inventory Management", "Swag Kits"],
  },
  {
    title: "Engagement Pass",
    tagline: "Automate gifting and recognition.",
    lead: "All of Swag, plus",
    popular: true,
    features: ["Automated Gifting", "HRIS, ATS, & CRM Integrations", "Kudos Programs"],
    addOns: ["Hosted Event Refundable Attendance", "Self-Guided Engagement Toolkits"],
  },
  {
    title: "Enterprise Pass",
    tagline: "Security, scale, and a dedicated partner.",
    lead: "All of Engagement, plus",
    features: [
      "SSO",
      "Stadium API",
      "Custom Contracts",
      "Custom Domain & White-Labeled Shops",
      "Customer Success",
    ],
  },
];

export default function PricingHero() {
  return (
    <section
      aria-labelledby="pricing-hero-title"
      className="px-section-x-sm pt-[7.5rem] md:px-section-x-md md:pt-[10rem] lg:px-section-x-lg lg:pt-[12.75rem] wide:px-10"
    >
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-12 wide:max-w-pricing-cards md:gap-16 lg:gap-20">
        {/* text — eyebrow → 8 → headline → 32 → free-delivery row */}
        <div className="flex flex-col items-center gap-6 text-center lg:gap-8">
          <div className="flex flex-col items-center gap-3 lg:gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-eyebrow-sm uppercase tracking-[0.1rem] text-pricing-sky"
            >
              Pricing
            </p>
            <h1
              id="pricing-hero-title"
              data-animation="reveal"
              className="max-w-[45.375rem] text-balance font-display text-display-sm text-white md:text-display-md lg:text-display-pricing"
            >
              One platform for stronger connections at scale
            </h1>
          </div>
          <p
            data-animation="reveal"
            className="max-w-[30rem] text-balance font-sans text-body-md text-grey-200 md:text-body-lg"
          >
            Pick a pass and unlock free domestic shipping across your engagement needs.
          </p>
          <ul
            data-animation="reveal"
            aria-label="Included with every pass"
            className="flex flex-col items-center gap-2 font-sans text-eyebrow-sm uppercase tracking-[0.1rem] text-white md:flex-row md:gap-6"
          >
            <li className="flex items-center gap-2.5">
              <Truck aria-hidden className="size-5 shrink-0" strokeWidth={1.75} />
              Free delivery on domestic orders
            </li>
            <li className="flex items-center gap-2.5">
              <Wallet aria-hidden className="size-5 shrink-0" strokeWidth={1.75} />
              One Wallet across every Stadium brand
            </li>
          </ul>
        </div>

        <div className="flex w-full flex-col items-center gap-10">
          {/* cards — 1-up mobile, 2-up tablet/narrow desktop (last card centred), 5-up from `wide`
              (five columns need ≥ ~1300) */}
          <ul
            data-animation="reveal"
            className="grid w-full grid-cols-1 gap-4 md:grid-cols-6 md:gap-5 wide:grid-cols-5 wide:gap-4"
          >
            {PASSES.map((p, i) => (
              <li
                key={p.title}
                className={`group relative flex flex-col gap-2.5 rounded-3xl bg-white p-2.5 md:col-span-3 wide:col-span-1 wide:min-h-[29.375rem] ${
                  i === PASSES.length - 1 ? "md:col-start-2 wide:col-start-auto" : ""
                } transition-[translate,box-shadow] duration-300 ease-out motion-safe:hover:-translate-y-1 ${
                  p.popular
                    ? "border border-pricing-sky shadow-pass-featured"
                    : "shadow-pass hover:shadow-card"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-2.5 right-6 inline-flex items-center gap-1.5 rounded-full bg-pricing-sky px-3 py-1.5 font-sans text-pill text-pricing-navy lg:right-[2.4375rem]">
                    <Star aria-hidden className="size-2.5 shrink-0" strokeWidth={2} />
                    Most Popular
                  </span>
                )}

                <div className="rounded-2xl bg-pricing-tray px-4 py-6">
                  <h2 className="font-display text-pass-title text-pricing-ink">{p.title}</h2>
                  <p className="mt-1 font-sans text-feature-sm text-pricing-ink/70">{p.tagline}</p>
                </div>

                <div className="flex flex-1 flex-col gap-8 px-4 py-6">
                  <p className="w-fit rounded-md bg-pricing-tray px-2.5 py-1.5 font-sans text-pill uppercase tracking-[0.0625rem] text-pricing-ink">
                    {p.lead}
                  </p>
                  <ul className="flex flex-col gap-3" aria-label={`${p.title} includes`}>
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check
                          aria-hidden
                          className="mt-[0.0625rem] size-3.5 shrink-0 text-pricing-ink"
                          strokeWidth={2}
                        />
                        <span className="font-sans text-feature-sm text-pricing-ink">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {p.addOns && (
                    <div className="flex flex-col gap-3 rounded-xl bg-pricing-tray p-3">
                      <p className="font-sans text-pill uppercase tracking-[0.0625rem] text-pricing-ink/60">
                        Optional add-ons (Confetti)
                      </p>
                      <ul className="flex flex-col gap-3" aria-label="Optional Confetti add-ons">
                        {p.addOns.map((f) => (
                          <li key={f} className="flex items-start gap-2.5">
                            <Plus
                              aria-hidden
                              className="mt-[0.0625rem] size-3.5 shrink-0 text-pricing-ink"
                              strokeWidth={2}
                            />
                            <span className="font-sans text-feature-sm text-pricing-ink">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Link
                    href={`?interestedPackage=${encodeURIComponent(p.title)}#book-a-demo`}
                    aria-label={`${p.cta ?? "Talk to sales"} — ${p.title}`}
                    className={`mt-auto inline-flex h-button-h w-full items-center justify-center rounded-full px-button-x font-sans text-button-primary uppercase transition-all duration-200 active:scale-[0.98] ${
                      p.popular
                        ? "bg-pricing-cta text-white hover:bg-black"
                        : "bg-pricing-cell text-brand-hero hover:bg-grey-200"
                    }`}
                  >
                    <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                      {p.cta ?? "Talk to sales"}
                    </span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          <a
            href="#compare"
            className="border-b border-white pb-0.5 font-sans text-button-primary font-bold uppercase tracking-[0.0625rem] text-white transition-opacity hover:opacity-80 focus-visible:outline-white"
          >
            Compare all features
          </a>
        </div>
      </div>
    </section>
  );
}
