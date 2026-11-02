/* /pricing · HERO — content unchanged; styling follows bystadium.com/go/pricing.
   Light #eff0f2 page ground (set by app/pricing/page.tsx), dark Satoshi headline,
   a cream "included with every pass" strip, then five white r16 Pass cards. Each
   pass owns one accent family (Pay-as-you-go grey · Shops Punch · Swag Lime ·
   Engagement Water · Enterprise Lilac): solid icon tile, tinted lead-in pill,
   tinted check discs, tinted add-on box. Engagement ([Most Popular]) is lifted.
   The CTA is a white outline pill.

   Layout is the existing one: card row is max-w-content inside section-x, widening
   to max-w-pricing-cards (1540) with 40px gutters from `wide`; 1-up mobile, 2-up
   tablet/narrow desktop (last card centred), 5-up from `wide`.

   Each "Talk to sales" sets ?interestedPackage=<pass> and jumps to the Book a
   Demo form — BookACallForm already reads that param on submit and forwards it
   to sales as `interested_package`. */

import Link from "next/link";
import { Building2, Check, Gift, Handshake, Plus, ShoppingBag, Shirt, Star, Truck, Wallet, type LucideIcon } from "lucide-react";

type Tier = "payg" | "shops" | "swag" | "engagement" | "enterprise";

/* full class strings so Tailwind can see them */
const TIER: Record<
  Tier,
  { icon: LucideIcon; tile: string; tint: string; ink: string; disc: string; glyph: string }
> = {
  payg: { icon: ShoppingBag, tile: "bg-tier-payg", tint: "bg-tier-payg-tint", ink: "text-tier-payg", disc: "bg-tier-payg-tint", glyph: "text-tier-payg" },
  shops: { icon: Gift, tile: "bg-tier-shops", tint: "bg-tier-shops-tint", ink: "text-tier-shops-ink", disc: "bg-tier-shops-tint", glyph: "text-tier-shops" },
  swag: { icon: Shirt, tile: "bg-tier-swag", tint: "bg-tier-swag-tint", ink: "text-tier-swag-ink", disc: "bg-tier-swag-tint", glyph: "text-tier-swag" },
  engagement: { icon: Handshake, tile: "bg-tier-engagement", tint: "bg-tier-engagement-tint", ink: "text-tier-engagement-ink", disc: "bg-tier-engagement-tint", glyph: "text-tier-engagement" },
  enterprise: { icon: Building2, tile: "bg-tier-enterprise", tint: "bg-tier-enterprise-tint", ink: "text-tier-enterprise-ink", disc: "bg-tier-enterprise-tint", glyph: "text-tier-enterprise" },
};

type Pass = {
  tier: Tier;
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
    tier: "payg",
    title: "Pay-as-you-go",
    tagline: "Order what you need, when you need it.",
    lead: "No pass needed",
    cta: "Get started",
    features: ["Snack Boxes (Snackmagic)", "Bulk Swag (Swagmagic)", "Hosted Experiences (Confetti)"],
  },
  {
    tier: "shops",
    title: "Shops Pass",
    tagline: "Launch branded swag and gift shops.",
    lead: "Pay-as-you-go, plus",
    features: ["Unlimited Swag & Gift Shops", "Free Domestic Delivery"],
  },
  {
    tier: "swag",
    title: "Swag Pass",
    tagline: "Store, manage, and ship swag at scale.",
    lead: "All of Shops, plus",
    features: ["Swag Storage", "Inventory Management", "Swag Kits"],
  },
  {
    tier: "engagement",
    title: "Engagement Pass",
    tagline: "Automate gifting and recognition.",
    lead: "All of Swag, plus",
    popular: true,
    features: ["Automated Gifting", "HRIS, ATS, & CRM Integrations", "Kudos Programs"],
    addOns: ["Hosted Event Refundable Attendance", "Self-Guided Engagement Toolkits"],
  },
  {
    tier: "enterprise",
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
        {/* text — eyebrow → 8 → headline → 32 → free-delivery strip */}
        <div className="flex flex-col items-center gap-6 text-center lg:gap-8">
          <div className="flex flex-col items-center gap-3 lg:gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-eyebrow-sm uppercase tracking-[0.1rem] text-pricing-faint"
            >
              Pricing
            </p>
            <h1
              id="pricing-hero-title"
              data-animation="reveal"
              className="max-w-[45.375rem] text-balance font-display text-display-sm text-pricing-text md:text-display-md lg:text-display-pricing"
            >
              One platform for stronger connections at scale
            </h1>
          </div>
          <p
            data-animation="reveal"
            className="max-w-[30rem] text-balance font-sans text-body-md text-pricing-muted md:text-body-lg"
          >
            Pick a pass and unlock free domestic shipping across your engagement needs.
          </p>
          <ul
            data-animation="reveal"
            aria-label="Included with every pass"
            className="flex flex-col items-center gap-3 rounded-2xl bg-pricing-cream px-6 py-4 font-sans text-eyebrow-sm uppercase tracking-[0.1rem] text-pricing-text md:flex-row md:gap-8 md:py-3.5"
          >
            <li className="flex items-center gap-2.5">
              <Truck aria-hidden className="size-5 shrink-0 text-pricing-amber" strokeWidth={1.75} />
              Free delivery on domestic orders
            </li>
            <li aria-hidden className="hidden h-5 w-px bg-pricing-text/15 md:block" />
            <li className="flex items-center gap-2.5">
              <Wallet aria-hidden className="size-5 shrink-0 text-pricing-amber" strokeWidth={1.75} />
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
            {PASSES.map((p, i) => {
              const t = TIER[p.tier];
              const Icon = t.icon;
              return (
                <li
                  key={p.title}
                  className={`group relative flex flex-col gap-5 rounded-2xl bg-white p-6 md:col-span-3 wide:col-span-1 wide:min-h-[29.375rem] ${
                    i === PASSES.length - 1 ? "md:col-start-2 wide:col-start-auto" : ""
                  } transition-[translate,box-shadow] duration-300 ease-out motion-safe:hover:-translate-y-1 ${
                    p.popular ? "shadow-card wide:-translate-y-1" : "shadow-pass hover:shadow-card"
                  }`}
                >
                  {p.popular && (
                    <span className="absolute -top-2.5 right-5 inline-flex items-center gap-1.5 rounded-full bg-tier-engagement px-3 py-1.5 font-sans text-pill uppercase text-white">
                      <Star aria-hidden className="size-2.5 shrink-0" strokeWidth={2} />
                      Most Popular
                    </span>
                  )}

                  <div className="flex flex-col gap-3">
                    <span className={`inline-flex size-10 items-center justify-center rounded-lg ${t.tile}`}>
                      <Icon aria-hidden className="size-5 text-white" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h2 className="font-display text-pass-title text-pricing-text">{p.title}</h2>
                      <p className="mt-1 font-sans text-feature-sm text-pricing-muted">{p.tagline}</p>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-5">
                    <p className={`w-full rounded-md px-2.5 py-1.5 font-sans text-pass-pill uppercase ${t.tint} ${t.ink}`}>
                      {p.lead}
                    </p>
                    <ul className="flex flex-col gap-3" aria-label={`${p.title} includes`}>
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <span className={`mt-px inline-flex size-4 shrink-0 items-center justify-center rounded-full ${t.disc}`}>
                            <Check aria-hidden className={`size-2.5 ${t.glyph}`} strokeWidth={3} />
                          </span>
                          <span className="font-sans text-feature-sm text-pricing-text">{f}</span>
                        </li>
                      ))}
                    </ul>

                    {p.addOns && (
                      <div className={`flex flex-col gap-3 rounded-xl p-3 ${t.tint}`}>
                        <p className="font-sans text-pass-pill uppercase text-pricing-faint">
                          Optional add-ons (Confetti)
                        </p>
                        <ul className="flex flex-col gap-3" aria-label="Optional Confetti add-ons">
                          {p.addOns.map((f) => (
                            <li key={f} className="flex items-start gap-2.5">
                              <span className="mt-px inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-white">
                                <Plus aria-hidden className={`size-2.5 ${t.glyph}`} strokeWidth={3} />
                              </span>
                              <span className="font-sans text-feature-sm text-pricing-text">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Link
                      href={`?interestedPackage=${encodeURIComponent(p.title)}#book-a-demo`}
                      aria-label={`${p.cta ?? "Talk to sales"} — ${p.title}`}
                      className="mt-auto inline-flex h-button-h w-full items-center justify-center rounded-full border border-pricing-line bg-white px-button-x font-sans text-button-primary uppercase text-pricing-text transition-all duration-200 hover:bg-pricing-page active:scale-[0.98]"
                    >
                      <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                        {p.cta ?? "Talk to sales"}
                      </span>
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>

          <a
            href="#compare"
            className="border-b border-pricing-text pb-0.5 font-sans text-button-primary font-bold uppercase tracking-[0.0625rem] text-pricing-text transition-opacity hover:opacity-80"
          >
            Compare all features
          </a>
        </div>
      </div>
    </section>
  );
}
