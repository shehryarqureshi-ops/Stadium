/* /pricing — shared pass + feature data. Drives both the comparison table
   (PricingComparison.tsx) and the "Explore our packages" modal
   (PackagesModal.tsx), so a feature added here shows up in both.

   Table layout follows Figma n9SjmDjzB1PeZAYJ5w43fr → 3442:16733: five pass
   columns (Pay-as-you-go → Enterprise) and rows grouped under section labels.

   `details` is the modal's right-hand pane. PLACEHOLDER COPY: written from
   the table's popover text and Figma 3401:2352's sample (which only fills in
   the Shops feature). Swap in the real copy and images when they land. */

export type Cell = "check" | "minus" | { check?: boolean; text: string };

export type Include = string | { text: string; sub: string[] };

export type Feature = {
  /* section label rendered above the first row of each group */
  section: string;
  label: string;
  vals: [Cell, Cell, Cell, Cell, Cell];
  /* dotted-underline popover in the table (Figma 3998:4917); "Read more"
     opens the modal on this feature */
  hint?: string;
  details: { summary: string; includes: Include[] };
};

export const PASSES = [
  "Pay-as-you-go",
  "Shops Pass",
  "Swag Pass",
  "Engagement Pass",
  "Enterprise Pass",
] as const;

const ALL: Feature["vals"] = ["check", "check", "check", "check", "check"];
const FROM_SHOPS: Feature["vals"] = ["minus", "check", "check", "check", "check"];
const FROM_SWAG: Feature["vals"] = ["minus", "minus", "check", "check", "check"];
const FROM_ENGAGEMENT: Feature["vals"] = ["minus", "minus", "minus", "check", "check"];
const ADD_ON: Feature["vals"] = [
  "minus",
  "minus",
  "minus",
  { text: "Add-on" },
  { text: "Add-on" },
];
const ENTERPRISE_ONLY: Feature["vals"] = ["minus", "minus", "minus", "minus", "check"];

export const FEATURES: Feature[] = [
  {
    section: "Pay-as-you-go products",
    label: "Snack Boxes (Snackmagic)",
    vals: ALL,
    details: {
      summary:
        "Build-your-own snack boxes from Snackmagic, shipped to every desk and doorstep, so teams can pick what they actually love.",
      includes: ["Build-your-own snack boxes", "Curated and themed boxes", "Global delivery"],
    },
  },
  {
    section: "Pay-as-you-go products",
    label: "Bulk Swag (Swagmagic)",
    vals: ALL,
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
    section: "Pay-as-you-go products",
    label: "Hosted Events (Confetti)",
    vals: ALL,
    details: {
      summary:
        "Host virtual and in-person team events with Confetti, from trivia to cooking classes, and let Stadium run the experience.",
      includes: ["Hosted virtual events", "In-person experiences", "Event logistics handled"],
    },
  },
  {
    section: "Every pass",
    label: "Unlimited Swag & Gift Shops",
    vals: FROM_SHOPS,
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
    section: "Every pass",
    label: "Free Domestic Delivery",
    vals: FROM_SHOPS,
    details: {
      summary: "Domestic orders ship free, so sending to every teammate costs what you expect.",
      includes: ["Free delivery on domestic orders"],
    },
  },
  {
    section: "Every pass",
    label: "Pre-fund Your Engagement Wallet",
    vals: FROM_SHOPS,
    details: {
      summary:
        "Load a wallet up front and draw it down as you send, so budgets stay predictable across programs.",
      includes: ["Pre-funded engagement wallet", "Draw-down as you send"],
    },
  },
  {
    section: "Swag management",
    label: "Swag Storage",
    vals: FROM_SWAG,
    details: {
      summary:
        "Store your swag in Stadium's warehouses and ship it on demand, so nothing piles up in an office closet.",
      includes: ["Warehousing for your swag", "On-demand shipping"],
    },
  },
  {
    section: "Swag management",
    label: "Inventory Management",
    vals: FROM_SWAG,
    details: {
      summary:
        "Track stock levels across every item and location, and get alerted before your bestsellers run out.",
      includes: ["Real-time stock levels", "Low-stock alerts"],
    },
  },
  {
    section: "Swag management",
    label: "Swag Kits",
    vals: FROM_SWAG,
    details: {
      summary:
        "Bundle items into ready-to-send kits for onboarding, events, and milestones, then ship them in a click.",
      includes: ["Pre-built kit bundles", "One-click sends"],
    },
  },
  {
    section: "Engagement",
    label: "Automated Gifting",
    vals: FROM_ENGAGEMENT,
    details: {
      summary:
        "Set gifts to send automatically on birthdays, work anniversaries, and onboarding so no moment slips through.",
      includes: ["Birthday and anniversary triggers", "Onboarding sends"],
    },
  },
  {
    section: "Engagement",
    label: "HRIS, ATS, & CRM Integrations",
    vals: FROM_ENGAGEMENT,
    details: {
      summary:
        "Connect Stadium to your HRIS, ATS, and CRM so recipients, dates, and triggers stay in sync automatically.",
      includes: ["HRIS sync", "ATS triggers", "CRM workflows"],
    },
  },
  {
    section: "Engagement",
    label: "Kudos Programs",
    vals: FROM_ENGAGEMENT,
    hint: "Peer-to-peer recognition where employees send kudos with points they can redeem across the full Stadium catalog.",
    details: {
      summary:
        "Peer-to-peer recognition where employees send kudos with points they can redeem across the full Stadium catalog.",
      includes: ["Peer-to-peer kudos", "Redeemable points", "Full Stadium catalog for redemption"],
    },
  },
  {
    section: "Engagement",
    label: "Hosted Event Refundable Attendance (Confetti)",
    vals: ADD_ON,
    details: {
      summary:
        "Get refunded for no-shows on hosted Confetti events, so you only pay for the people who attend.",
      includes: ["Refunds on unused seats", "Available as an add-on"],
    },
  },
  {
    section: "Engagement",
    label: "Self-Guided Engagement Toolkits (Confetti)",
    vals: ADD_ON,
    details: {
      summary:
        "Run engagement activities yourself with ready-made Confetti toolkits, no host required.",
      includes: ["Self-guided activity toolkits", "Available as an add-on"],
    },
  },
  {
    section: "Enterprise",
    label: "SSO",
    vals: ENTERPRISE_ONLY,
    details: {
      summary: "Let your team sign in with your identity provider for secure, one-click access.",
      includes: ["Single sign-on", "Identity-provider login"],
    },
  },
  {
    section: "Enterprise",
    label: "Stadium API",
    vals: ENTERPRISE_ONLY,
    details: {
      summary:
        "Build Stadium sends, shops, and rewards into your own tools and workflows with the Stadium API.",
      includes: ["REST API access", "Programmatic sends"],
    },
  },
  {
    section: "Enterprise",
    label: "Custom Contracts",
    vals: ENTERPRISE_ONLY,
    details: {
      summary: "Agree terms that fit your procurement, legal, and billing requirements.",
      includes: ["Custom contract terms", "Invoice billing"],
    },
  },
  {
    section: "Enterprise",
    label: "Custom Domain & White-Labeled Shops",
    vals: ENTERPRISE_ONLY,
    hint: "Host your branded swag shop on your own domain, like swag.yourcompany.com, for a fully on-brand experience.",
    details: {
      summary:
        "Host your branded swag shop on your own domain, like swag.yourcompany.com, for a fully on-brand experience.",
      includes: ["Your own shop domain", "Fully white-labeled storefront"],
    },
  },
  {
    section: "Enterprise",
    label: "Customer Success",
    vals: ENTERPRISE_ONLY,
    details: {
      summary:
        "Get a dedicated Customer Success team who plans your programs with you and keeps every launch on track.",
      includes: ["Dedicated customer success", "Program planning and rollout support"],
    },
  },
];

export const isIncluded = (c: Cell) => c !== "minus";
