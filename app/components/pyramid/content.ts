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
      desc: "Screen print, embroidery, DTG, laser and emboss, done in-region.",
      video: "/videos/infrastructure/printing.mp4",
      poster: "/videos/infrastructure/printing.webp",
    },
    {
      title: "Warehousing & Storage",
      video: "/videos/infrastructure/warehousing.mp4",
      poster: "/videos/infrastructure/warehousing.webp",
    },
    {
      title: "Shipping & Delivery",
      video: "/videos/infrastructure/shipping.mp4",
      poster: "/videos/infrastructure/shipping.webp",
    },
    { title: "Customs, Tax, & Compliance" },
  ] satisfies InfraTab[],
};

export const DIGITAL = {
  title: "Digital Infrastructure",
  heading: "Centralized control. Decentralized execution.",
  body: "Set the rules once. Let every team move. Recognition, storefronts and automations run on one platform, governed for every team and region.",
  tabs: [
    {
      title: "Recognition",
      desc: "Kudos in Slack and Teams, milestones, leaderboards and company values.",
    },
    { title: "Global Storefronts" },
    { title: "Integrations & Automated Gifting" },
    { title: "Platform Controls" },
    { title: "Brand Controls" },
    { title: "Security & Reliability" },
  ] satisfies InfraTab[],
};

export const PEOPLE = {
  title: "People Infrastructure",
  heading: "The team you’d never get to hire. Included.",
  body: "A dedicated success lead, backed by experts in strategy, creative, merchandising, logistics and data. For less than the cost of one hire.",
  specialists: [
    { name: "Success lead", desc: "Your one point of contact, from kickoff to QBR." },
    { name: "Program strategy", desc: "Plans your program around the moments that matter." },
    { name: "Creative & brand", desc: "Designs on-brand kits, packaging and stores." },
    { name: "Merchandising", desc: "Picks the right items from 30,000+ options." },
    { name: "Global logistics", desc: "Runs production, storage and delivery in 170+ countries." },
    { name: "Data & insights", desc: "Reporting on every program, team and region." },
  ],
};
