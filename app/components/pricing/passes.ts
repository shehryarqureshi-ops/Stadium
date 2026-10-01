/* /pricing — shared pass + feature data. Drives both the comparison table
   (PricingComparison.tsx) and the "Explore our packages" modal
   (PackagesModal.tsx), so a feature added here shows up in both.

   `details` is the modal's right-hand pane. PLACEHOLDER COPY: written from
   the table's popover text and Figma 3401:2352's sample (which only fills in
   the Shops feature). Swap in the real copy and images when they land. */

export type Cell = "check" | "minus" | { check?: boolean; text: string };

export type Include = string | { text: string; sub: string[] };

export type Feature = {
  label: string;
  vals: [Cell, Cell, Cell, Cell];
  /* dotted-underline popover in the table (Figma 3998:4917); "Read more"
     opens the modal on this feature */
  hint?: string;
  details: { summary: string; includes: Include[] };
};

export const PASSES = ["Shops Pass", "Swag Pass", "Engagement Pass", "Enterprise Pass"] as const;

export const FEATURES: Feature[] = [
  {
    label: "Unlimited Global Print-On-Demand Swag & Gift Shops",
    vals: ["check", "minus", "minus", "check"],
    details: {
      summary:
        "Take recognition, gifting, and swag to the next level — globally, at scale, and all in one platform.",
      includes: [
        "Unlimited Global Print-On-Demand Swag & Gift Shops",
        {
          text: "Includes Access To:",
          sub: ["Snack Boxes (Snackmagic)", "Bulk Swag (Swagmagic)", "Gifting Catalog (25K Items)"],
        },
      ],
    },
  },
  {
    label: "Snack Boxes (Snackmagic)",
    vals: ["check", "minus", "check", "check"],
    details: {
      summary:
        "Build-your-own snack boxes from Snackmagic, shipped to every desk and doorstep, so teams can pick what they actually love.",
      includes: ["Build-your-own snack boxes", "Curated and themed boxes", "Global delivery"],
    },
  },
  {
    label: "Bulk Swag (Swagmagic)",
    vals: [
      { check: true, text: "170+" },
      { text: "US only" },
      { text: "US only" },
      { text: "550 intl" },
    ],
    details: {
      summary:
        "Order branded swag in bulk with Swagmagic: design, produce, and ship merch your team will actually wear.",
      includes: [
        "Bulk branded merchandise",
        "Design and mockup support",
        "Delivery to offices and homes",
      ],
    },
  },
  {
    label: "Gifting Catalog (25K items)",
    vals: ["check", "minus", "minus", { text: "Gifts only" }],
    details: {
      summary:
        "Send gifts from a catalog of 25K items, from gourmet treats to experiences, without managing a single vendor.",
      includes: ["25K-item gifting catalog", "Recipient-choice gifting", "Global fulfillment"],
    },
  },
  {
    label: "Swag Storage",
    vals: ["check", "minus", "minus", "check"],
    details: {
      summary:
        "Store your swag in Stadium's warehouses and ship it on demand, so nothing piles up in an office closet.",
      includes: ["Warehousing for your swag", "On-demand shipping"],
    },
  },
  {
    label: "Inventory Management",
    vals: ["check", "check", "minus", "minus"],
    details: {
      summary:
        "Track stock levels across every item and location, and get alerted before your bestsellers run out.",
      includes: ["Real-time stock levels", "Low-stock alerts"],
    },
  },
  {
    label: "Swag Kits",
    vals: ["check", "check", "minus", "minus"],
    details: {
      summary:
        "Bundle items into ready-to-send kits for onboarding, events, and milestones, then ship them in a click.",
      includes: ["Pre-built kit bundles", "One-click sends"],
    },
  },
  {
    label: "Automated Gifting",
    vals: ["check", "check", "minus", "minus"],
    details: {
      summary:
        "Set gifts to send automatically on birthdays, work anniversaries, and onboarding so no moment slips through.",
      includes: ["Birthday and anniversary triggers", "Onboarding sends"],
    },
  },
  {
    label: "HRIS/ATS/CRM Integrations",
    vals: ["check", "check", "minus", "minus"],
    details: {
      summary:
        "Connect Stadium to your HRIS, ATS, and CRM so recipients, dates, and triggers stay in sync automatically.",
      includes: ["HRIS sync", "ATS triggers", "CRM workflows"],
    },
  },
  {
    label: "Kudos Programs",
    vals: ["check", "check", "minus", "minus"],
    hint: "Peer-to-peer recognition where employees send kudos with points they can redeem across the full Stadium catalog.",
    details: {
      summary:
        "Peer-to-peer recognition where employees send kudos with points they can redeem across the full Stadium catalog.",
      includes: ["Peer-to-peer kudos", "Redeemable points", "Full Stadium catalog for redemption"],
    },
  },
  {
    label: "SSO",
    vals: ["check", "check", "minus", "minus"],
    details: {
      summary: "Let your team sign in with your identity provider for secure, one-click access.",
      includes: ["Single sign-on", "Identity-provider login"],
    },
  },
  {
    label: "Custom Shops Domain",
    vals: ["check", "check", "minus", "minus"],
    hint: "Host your branded swag shop on your own domain, like swag.yourcompany.com, for a fully on-brand experience.",
    details: {
      summary:
        "Host your branded swag shop on your own domain, like swag.yourcompany.com, for a fully on-brand experience.",
      includes: ["Your own shop domain", "Fully branded storefront"],
    },
  },
  {
    label: "Stadium API",
    vals: ["check", "check", "minus", "minus"],
    details: {
      summary:
        "Build Stadium sends, shops, and rewards into your own tools and workflows with the Stadium API.",
      includes: ["REST API access", "Programmatic sends"],
    },
  },
  {
    label: "Net Terms",
    vals: ["check", "check", "minus", "minus"],
    hint: "Pay by invoice on agreed payment terms instead of by card at checkout.",
    details: {
      summary: "Pay by invoice on agreed payment terms instead of by card at checkout.",
      includes: ["Invoice billing", "Agreed payment terms"],
    },
  },
  {
    label: "Customer Success Manager",
    vals: ["check", "minus", "minus", "minus"],
    details: {
      summary:
        "Get a dedicated Customer Success Manager who plans your programs with you and keeps every launch on track.",
      includes: ["Dedicated CSM", "Program planning and rollout support"],
    },
  },
];

export const isIncluded = (c: Cell) => c !== "minus";
