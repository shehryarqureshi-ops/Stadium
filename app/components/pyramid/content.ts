/* Copy for the infra pyramid section — from the Figma content frame
   (Stadium-Enterprise 6696:13594). Tab descriptions beyond the first tab of
   each chapter, the Digital videos and the specialist portraits were not in
   the brief: they fall back to title-only tabs and placeholders. */

export type InfraTab = {
  title: string;
  desc?: string;
  video?: string;
  poster?: string;
};

export const INTRO = {
  eyebrow: "Global engagement infrastructure",
  title: ["One system.", "Three layers."],
  body: "The physical, digital and people infrastructure to show up for anyone, anywhere, in 170+ countries.",
};

export const LAYERS = ["Physical", "Digital", "People"] as const;

export const PHYSICAL = {
  title: "Physical Infrastructure",
  heading: "Local, everywhere",
  body: "Decorated, stored and delivered in-country by 1,000+ vetted partners, with free domestic shipping in 170+ countries.",
  tabs: [
    {
      title: "Printing & Production",
      desc: "1,000+ vetted partners print and decorate your merchandise, locally, every time.",
      video: "/videos/infrastructure/printing.mp4",
      poster: "/videos/infrastructure/printing.webp",
    },
    {
      title: "Warehousing & Storage",
      desc: "Your swag is stored, tracked, and kitted across our warehouse network, ready the moment you need it.",
      video: "/videos/infrastructure/warehousing.mp4",
      poster: "/videos/infrastructure/warehousing.webp",
    },
    {
      title: "Shipping & Delivery",
      desc: "Fulfillment partners and carriers deliver to recipients in 170+ countries.",
      video: "/videos/infrastructure/shipping.mp4",
      poster: "/videos/infrastructure/shipping.webp",
    },
    {
      title: "Customs, Tax & Compliance",
      desc: "Customs, duties, and local requirements are cleared before a single package ships, so your team never has to navigate them, anywhere in the world.",
    },
  ] satisfies InfraTab[],
};

export const DIGITAL = {
  title: "Digital Infrastructure",
  heading: "Centralized control. Decentralized execution.",
  body: "Set the rules once. Let every team move. Recognition, storefronts and automations run on one platform, governed for every team and region.",
  tabs: [
    {
      title: "Recognition",
      desc: "Kudos, milestones, and company values live in one place, synced with Slack and Teams.",
      video: "/videos/infra/Video%2001%20Final.webm", // placeholder clip
    },
    {
      title: "Global Storefronts",
      desc: "Branded storefronts give every recipient a regional catalog, on one platform, in one dashboard.",
      video: "/videos/infra/Video%2002%20Final.webm", // placeholder clip
    },
    {
      title: "Integrations & Automated Gifting",
      desc: "100+ integrations turn moments in your HRIS, ATS, or CRM into scheduled or triggered sends, automatically.",
      video: "/videos/infra/Video%2003%20Final.webm", // placeholder clip
    },
    {
      title: "Platform Controls",
      desc: "Permissions, budgets, and fund allocation are set centrally and enforced across every workspace and shop.",
      video: "/videos/infra/Video%2004.webm", // placeholder clip
    },
    {
      title: "Asset Library",
      desc: "One asset library and storefront branding keep every team on-brand.",
      video: "/videos/infra/Video%2005.webm", // placeholder clip
    },
    {
      title: "Security & Reliability",
      desc: "Security and data protection are built into every layer of the platform, not bolted on after.",
      video: "/videos/infra/Video%2006.webm", // placeholder clip
    },
  ] satisfies InfraTab[],
};

export const PEOPLE = {
  title: "People Infrastructure",
  heading: "The team you’d never get to hire. Included.",
  body: "A dedicated success lead, backed by experts in strategy, creative, merchandising, logistics and data. For less than the cost of one hire.",
};
