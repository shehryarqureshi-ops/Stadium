import type { Metadata } from "next";
import type { CSSProperties } from "react";
import FeatureIconGrid, {
  type FeatureIconGridContent,
} from "../components/FeatureIconGrid";
import MigrationRoadmap from "../components/MigrationRoadmap";
import PageClose from "../components/PageClose";
import Recognition from "../components/Recognition";
import RecognitionCaseStudies from "../components/RecognitionCaseStudies";
import RecognitionLoop from "../components/RecognitionLoop";
import RecognitionProblem from "../components/RecognitionProblem";
import SiteHeader from "../components/SiteHeader";
import SwagClosing, {
  type SwagClosingContent,
} from "../components/SwagClosing";
import SwagComparison, {
  type SwagComparisonContent,
} from "../components/SwagComparison";
import SwagHero, { type SwagHeroContent } from "../components/SwagHero";
import SwagHeroShader from "../components/SwagHeroShader";
import SwagPricing, {
  type SwagPricingContent,
} from "../components/SwagPricing";
import SwagWorkflow, {
  type SwagWorkflowContent,
} from "../components/SwagWorkflow";

export const metadata: Metadata = {
  title: "Recognition — Recognition that shows up at the door | Stadium",
  description:
    "Turn kudos into rewards people actually want. Run recognition, milestones, incentives, and service awards on one platform — with global fulfillment to 170+ countries.",
};

/* ── Hero (312:5063). The recognition hero is white/lilac in Figma with no
   product cluster, but the shared SwagHero owns a fixed dark-green shader bg +
   product card; we pass the recognition copy and reuse the generic /swag
   product visual + trust logos. */
const heroContent: SwagHeroContent = {
  eyebrow: "RECOGNITION · STADIUM PLATFORM",
  heading: "Recognition that shows up at the door",
  body: "Stores, kits, on-demand, bulk, warehousing, shipping anywhere — one platform, one PO. Your brand shows up everywhere; you stop running the logistics.",
  primaryCta: { label: "Book a demo", href: "#" },
  secondaryCta: { label: "Browse the catalog", href: "#" },
  socialProof: "5,000+ teams ship swag this way, to 170+ countries",
  product: {
    warehouseImage: {
      src: "/swag/swag-warehouse.jpg",
      alt: "Warehouse racking with kitted reward boxes",
    },
    hoodieImage: {
      src: "/swag/swag-hoodie.png",
      alt: "Embroidered green hoodie",
    },
    sizeLabel: "SIZE",
    sizes: ["S", "M", "L", "XL"],
    selectedSize: "L",
    title: "Embroidered hoodie",
    description:
      "Ultra-soft 400gms cotton fleece with a modern relaxed drop-shoulder fit.",
    addToCartLabel: "ADD TO CART",
  },
  logos: [
    { src: "/trust-google.svg", alt: "Google", w: 80, h: 25 },
    { src: "/trust-amazon.svg", alt: "Amazon", w: 77, h: 20 },
    { src: "/trust-pinterest.svg", alt: "Pinterest", w: 87, h: 25 },
    { src: "/trust-accenture.svg", alt: "Accenture", w: 91, h: 24 },
    { src: "/trust-bloomberg.svg", alt: "Bloomberg", w: 90, h: 19 },
    { src: "/trust-salesforce.svg", alt: "Salesforce", w: 37, h: 27 },
    { src: "/trust-netflix.svg", alt: "Netflix", w: 75, h: 25 },
    { src: "/trust-google.svg", alt: "Google", w: 80, h: 25 },
    { src: "/trust-amazon.svg", alt: "Amazon", w: 77, h: 20 },
  ],
};

/* ── Offerings (312:5259) is the 4-step "THE LOOP" stepper — its own component
   now (RecognitionLoop), not the 2-door SwagOfferings layout. */

/* ── Workflow (312:5315). Active tab = "Kudos & Employee Recognition" (index 0)
   is the only tab detailed in Figma; the other three carry on-brand copy. */
const workflowContent: SwagWorkflowContent = {
  eyebrow: "EVERYTHING RECOGNITION",
  heading: "Every recognition moment. One rewards catalog.",
  image: "/swag/swag-workflow.jpg",
  initialTab: 0,
  tabs: [
    {
      label: "Kudos & Employee Recognition",
      heading: "Recognition beyond the top-down",
      desc: [
        "Great work happens everywhere. Recognize teammates in Slack or the Stadium app, turning everyday appreciation into real rewards.",
      ],
      features: [
        "Encourage recognition at every level of the company.",
        "Tie every moment to company values.",
        "Celebrate great work in a live feed the whole team can see.",
      ],
      cta: "Explore Kudos",
    },
    {
      label: "Milestone Programs",
      heading: "Milestones that never slip",
      desc: [
        "Birthdays, work anniversaries, and new hires — celebrated automatically.",
        "Set it once; every milestone ships itself.",
      ],
      features: [
        "Automate anniversaries, birthdays, and onboarding.",
        "Personalized rewards for every milestone.",
        "Never miss a moment across time zones.",
      ],
      cta: "See milestones",
    },
    {
      label: "Incentives",
      heading: "Incentives that move the needle",
      desc: [
        "Reward the behaviors that matter — sales wins, referrals, and goals.",
        "Points and rewards employees actually want.",
      ],
      features: [
        "Run spot bonuses, contests, and SPIFFs.",
        "Reward performance with real, redeemable value.",
        "Track impact against every program.",
      ],
      cta: "Explore incentives",
    },
    {
      label: "Service Awards",
      heading: "Service awards worth the wait",
      desc: [
        "Mark 1, 5, and 10 years with rewards that feel significant.",
        "A premium moment, handled end to end.",
      ],
      features: [
        "Curated award tiers by years of service.",
        "Personalized selection for every recipient.",
        "Global fulfillment with tracking included.",
      ],
      cta: "See service awards",
    },
  ],
};

/* ── Platform (312:5489). Six capability cards (3×2), each a centered 128px 3D
   icon + title + desc (icons exported from Figma → /public/recognition). */
const platformContent: FeatureIconGridContent = {
  eyebrow: "THE PLATFORM",
  heading: "Recognition plugs into the platform you already run",
  body: "The same platform that runs your swag, gifting, and snacks, also runs recognition. With Workspaces, Wallet, HRIS, and SSO, you only have to set up once.",
  cards: [
    {
      icon: "/recognition/plat-icon-1.png",
      title: "Design & approve",
      desc: "Storefronts with per-team budgets, approvals, and SSO.",
    },
    {
      icon: "/recognition/plat-icon-2.png",
      title: "Inventory & storage",
      desc: "Live stock counts. We store and kit it for you.",
    },
    {
      icon: "/recognition/plat-icon-3.png",
      title: "Global fulfillment",
      desc: "Ship to 170+ countries. Customs and duties handled.",
    },
    {
      icon: "/recognition/plat-icon-4.png",
      title: "Automated sends",
      desc: "Fires on hires, milestones, or via API.",
    },
    {
      icon: "/recognition/plat-icon-5.png",
      title: "Integrations",
      desc: "Wire your HRIS, Slack, and CRM. Sends on autopilot.",
    },
    {
      icon: "/recognition/plat-icon-6.png",
      title: "Budgets & reporting",
      desc: "Spend, claim rates, and inventory in one dashboard.",
    },
  ],
};

/* ── Committee (312:5610). Four stakeholder cards (2×2), centered 128px icons
   (same cart/cube/checkbox/gear set as Platform), Satoshi-Medium titles, and a
   "Primary" pill on the HR card. */
const committeeContent: FeatureIconGridContent = {
  eyebrow: "BUILT FOR SIGN-OFF",
  heading: "Win over every stakeholder",
  body: "Recognition touches every team. Here's what each stakeholder wants to know.",
  cards: [
    {
      icon: "/recognition/plat-icon-1.png",
      title: "HR & People Ops",
      desc: "Recognition that runs year-round, with the insights to prove it's working.",
      badge: "Primary",
    },
    {
      icon: "/recognition/plat-icon-2.png",
      title: "Leadership",
      desc: "Recognition that reinforces your values and helps build culture.",
    },
    {
      icon: "/recognition/plat-icon-3.png",
      title: "IT & Security",
      desc: "Enterprise-ready with SSO, SCIM, SOC 2, and HRIS integrations.",
    },
    {
      icon: "/recognition/plat-icon-4.png",
      title: "Finance",
      desc: "Predictable budgets, controlled spend, and clear reporting.",
    },
  ],
};

/* ── Comparison (312:5731). 4 columns × 7 rows. */
const comparisonContent: SwagComparisonContent = {
  eyebrow: "HOW WE WIN",
  headingLines: ["Recognition that shows up"],
  body: "Other platforms stop at the notification or the gift card. Stadium delivers a reward they can hold.",
  cols: [
    { name: "Stadium", sub: "" },
    { name: "Point tools", sub: "Bonusly · Nectar" },
    { name: "Enterprise", sub: "Workhuman · Achievers" },
    { name: "DIY", sub: "Slack + gift cards" },
  ],
  rows: [
    {
      label: "Employee-to-employee recognition",
      vals: ["check", "check", "check", "Add-on"],
    },
    {
      label: "Milestone automations",
      vals: ["check", "Limited", "check", "Limited"],
    },
    {
      label: "Rewards: swag · gifts · experiences",
      vals: ["check", "Cards only", "minus", "Limited"],
    },
    {
      label: "Global redemption · Local fulfillment",
      vals: ["check", "Limited", "minus", "Gifts only"],
    },
    {
      label: "Analytics & insights",
      vals: ["check", "Basic", "Limited", "check"],
    },
    {
      label: "Fast rollout (days, not quarters)",
      vals: ["check", "check", "Limited", "check"],
    },
    {
      label: "One platform, one invoice",
      vals: ["check", "minus", "minus", "minus"],
    },
  ],
  cta: { label: "Book a call", href: "#" },
};

/* ── Case studies (312:5984) is its own component now (RecognitionCaseStudies):
   3 article cards + a testimonial carousel. */

/* ── Pricing (602:475). Four progressive passes; Engagement is "Popular". */
const pricingContent: SwagPricingContent = {
  eyebrow: "STADIUM PACKAGES",
  heading: "Simple pricing, per person",
  body: "Start with kudos, then add rewards, automations, and analytics when you're ready. You only pay for active people.",
  ctaLabel: "See full pricing",
  ctaHref: "#",
  popularLabel: "Popular",
  passes: [
    {
      n: "01",
      title: "Shops Pass",
      desc: "Branded stores, on-demand, and the full catalog.",
    },
    {
      n: "02",
      title: "Swag Pass",
      desc: "+ Warehousing, inventory, and kits.",
    },
    {
      n: "03",
      title: "Engagement Pass",
      desc: "+ Automation, integrations, and recognition.",
      popular: true,
    },
    {
      n: "04",
      title: "Enterprise Pass",
      desc: "+ SSO, API, net terms, and a dedicated CSM.",
    },
  ],
};

/* ── Closing (312:6006). Book-a-demo form, keep-exploring resources, final CTA.
   Reuses the generic /swag glass form backdrop; keep-exploring reuses the
   fluted abstract. Figma's resources heading literally reads "…getting swag
   right" — adapted to "recognition" for coherence with its links. */
const closingContent: SwagClosingContent = {
  bookDemo: {
    eyebrow: "BOOK A DEMO",
    headingLine1: "Watch Stadium",
    headingLine2: "in action",
    detailBody:
      "Give us 30 minutes. We'll walk through kudos programs, points, milestones, and rewards, then sketch a rollout around your team, budget, and HRIS.",
    features: [
      "The real product, live on screen.",
      "HR, IT, and Finance covered in one go.",
      "Rolled out in days, start to finish.",
    ],
    formBgSrc: "/swag/swag-form-bg.jpg",
    form: {
      fullNameLabel: "Full name",
      fullNamePlaceholder: "John Doe",
      workEmailLabel: "Work email",
      workEmailPlaceholder: "john@doe.com",
      companyLabel: "Company",
      teamLabel: "Company size",
      companySizeLabel: "HRIS / tools",
      selectPlaceholder: "Select",
      exploringLabel: "What do you want to solve?",
      exploringPlaceholder: "What do you need — stores, kits, bulk, storage…",
      submit: "Book a demo",
      disclaimer: {
        before: "By booking, you agree to Stadium's ",
        terms: "Terms",
        between: " and ",
        privacy: "Privacy Notice",
        after: ".",
      },
    },
  },
  keepExploring: {
    eyebrow: "KEEP EXPLORING",
    heading: "More on getting recognition right.",
    links: [
      {
        tag: "GUIDE",
        title: "Build your recognition playbook",
        desc: "A step-by-step guide to launch successfully.",
      },
      {
        tag: "REPORT",
        title: "The business case for recognition",
        desc: "See why recognized employees are more likely to stay.",
      },
      {
        tag: "TEMPLATE",
        title: "Turn company values into tags",
        desc: "Make every kudos reflect your company values.",
      },
    ],
    imageSrc: "/swag/swag-workflow.jpg",
  },
  finalCta: {
    heading: "Make recognition stop being a notification",
    body: "Book 30 minutes and see how kudos become a reward people choose, receive, and remember. Or browse the catalog to see what's on its way to someone's door.",
    primaryCta: "Book a demo",
    secondaryCta: "Browse the catalog",
    footnote: "",
  },
};

/* Lilac/plum re-theme (Figma /recognition: eyebrow #8d12e7, accents #6b33db).
   Overrides the swag-green tokens for this page's scope only — every shared
   Swag* section reads these vars, so the whole page renders lilac. */
const theme = {
  "--color-swag-green": "#8d12e7",
  "--color-swag-green-deep": "#8d12e7",
  "--color-swag-green-alt": "#8d12e7",
  "--color-swag-mint": "#ead9ff",
  "--color-swag-tint": "#faf5ff",
  "--color-swag-hero-bg": "#1c0a33",
  "--color-swag-grad-1": "#f3e9fb",
  "--color-swag-grad-2": "#d9bff0",
  "--color-swag-grad-3": "#8b4fc0",
  "--color-swag-grad-4": "#341552",
  "--color-swag-glow": "rgba(141, 18, 231, 0.08)",
} as CSSProperties;

export default function RecognitionPage() {
  return (
    <>
      <SiteHeader banner="No minimums on branded stores · Warehousing & kitting included · Global fulfillment to 170+ countries" />
      <main
        id="main"
        tabIndex={-1}
        style={theme}
        className="flex flex-1 flex-col outline-none overflow-x-clip"
      >
        <section className="relative">
          <div className="absolute w-full h-[72%] top-0 left-0 mask-b-from-75%">
            <SwagHeroShader
              chroma={{
                base: "#1a1024",
                down: "#7c2fd6",
                left: "#8d12e7",
                right: "#4c1d95",
                up: "#c084fc",
              }}
            />
          </div>
          <SwagHero
            content={heroContent}
            showProduct={false}
            align="left"
            bgImageSrc="/recognition/hero-bg.jpg"
            secondaryCtaStyle="outline"
          />

          <RecognitionProblem />
        </section>

        {/* divider (312:5257) — thin rule with generous space below */}
        <div className="bg-white px-section-x-sm pb-16 pt-4 md:px-section-x-md md:pb-24 lg:px-section-x-lg lg:pb-[8.75rem]">
          <div
            data-animation="reveal"
            className="mx-auto h-0.5 w-full max-w-content rounded-full bg-[#f2f2f2]"
          />
        </div>

        <RecognitionLoop />
        <SwagWorkflow content={workflowContent} />
        <FeatureIconGrid content={platformContent} />
        <FeatureIconGrid
          content={committeeContent}
          columns={2}
          titleWeight="medium"
        />
        <SwagComparison content={comparisonContent} />
        <MigrationRoadmap />
        <Recognition />
        <RecognitionCaseStudies />
        <SwagPricing content={pricingContent} />
        <SwagClosing content={closingContent} />
      </main>
      <PageClose showCta={false} />
    </>
  );
}
