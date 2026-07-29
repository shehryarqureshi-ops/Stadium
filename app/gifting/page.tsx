import type { Metadata } from "next";
import type { CSSProperties } from "react";
import PageClose from "../components/PageClose";
import SiteHeader from "../components/SiteHeader";
import SwagAdminView, { type SwagAdminViewContent } from "../components/SwagAdminView";
import SwagClosing, { type SwagClosingContent } from "../components/SwagClosing";
import SwagCommittee, { type SwagCommitteeContent } from "../components/SwagCommittee";
import SwagComparison, { type SwagComparisonContent } from "../components/SwagComparison";
import ProblemBlock, { type ProblemBlockContent } from "../components/ProblemBlock";
import MigrationRoadmap, { type MigrationRoadmapContent } from "../components/MigrationRoadmap";
import SwagHero, { type SwagHeroContent } from "../components/SwagHero";
import SwagHowItWorks, { type SwagHowItWorksContent } from "../components/SwagHowItWorks";
import SwagImpact, { type SwagImpactContent } from "../components/SwagImpact";
import SwagPaperchase, { type SwagPaperchaseContent } from "../components/SwagPaperchase";
import SwagWorkflow, { type SwagWorkflowContent } from "../components/SwagWorkflow";

/* /gifting — composed entirely from the shared /swag section components, each
   fed its own typed `content` object extracted from Figma file
   n9SjmDjzB1PeZAYJ5w43fr (page frame 668:4588). Layout/style/colors live in the
   components; this route only supplies gifting copy + images. The dark-green
   hero background + shader are the shared fixed asset (per SwagHero). */

export const metadata: Metadata = {
  title: "Gifting — Corporate gifting without the busywork | Stadium",
  description:
    "Client, employee, partner, and holiday gifts from one platform. Recipients choose their gift and enter their address — you set the budget, and Stadium delivers to 170+ countries.",
};

/* Hero · 668:4593. The gifting hero has no product cluster in Figma (copy +
   logo marquee only); the SwagHero layout always renders the floating product
   card, so it carries gifting-oriented copy over the shared /swag product
   visuals. Eyebrow/CTA colors are hardcoded in the component (mint/green) — the
   Figma cream eyebrow + amber CTA cannot be expressed through content alone. */
const heroContent: SwagHeroContent = {
  eyebrow: "GIFTING · STADIUM",
  heading: "Corporate gifting without the busywork",
  body: "Client, employee, partner, and holiday gifts, all from one platform. Recipients choose their gift and enter their addresses. You set the budget, and we’ll handle the delivery.",
  primaryCta: { label: "Book a demo", href: "#" },
  secondaryCta: { label: "Browse the catalog", href: "#" },
  socialProof: "HR, Marketing, Sales and CX at 5,000+ teams gift here",
  product: {
    warehouseImage: {
      src: "/swag/swag-warehouse.jpg",
      alt: "Fulfillment center packing gift boxes",
    },
    hoodieImage: {
      src: "/swag/swag-hoodie.png",
      alt: "Embroidered gift hoodie",
    },
    sizeLabel: "SIZE",
    sizes: ["S", "M", "L", "XL"],
    selectedSize: "L",
    title: "Recipient’s choice",
    description:
      "Recipients pick the gift and size they want — you just set the budget.",
    addToCartLabel: "CLAIM GIFT",
  },
  /* Figma trust band order (668:4652): google, amazon, pinterest, accenture,
     bloomberg, salesforce, netflix, google, amazon — rendered from the shared
     generic brand SVGs. */
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

/* Workflow · 668:5182. Six gifting "moments" as tabs; Partner Gifting (index 3)
   is the active tab specified in Figma. The other five carry concise on-brand
   gifting copy (Figma only fully specifies the active band). */
const workflowContent: SwagWorkflowContent = {
  eyebrow: "EVERYTHING GIFTING",
  heading: "Any moment, already covered",
  subtitle: "Explore how every team uses Stadium to gift.",
  image: "/swag/swag-workflow.jpg",
  initialTab: 3,
  tabs: [
    {
      label: "Holiday gifting",
      heading: "Holiday Gifting",
      desc: [
        "Send seasonal gifts your whole company will love.",
        "One campaign, every recipient, any country.",
      ],
      features: [
        "Curated holiday collections, refreshed every year.",
        "Recipients pick, so nothing goes to waste.",
        "Ship worldwide before the deadline.",
      ],
      cta: "Explore holiday gifting",
    },
    {
      label: "Employee gifting",
      heading: "Employee Gifting",
      desc: [
        "Onboarding, milestones, and the moments that matter.",
        "Automated so no one gets missed.",
      ],
      features: [
        "New-hire kits and work anniversaries on autopilot.",
        "Recipients choose a gift they’ll actually use.",
        "Budgets and approvals per team.",
      ],
      cta: "Explore employee gifting",
    },
    {
      label: "Client & prospect gifting",
      heading: "Client & Prospect Gifting",
      desc: [
        "Break the ice and stay top of mind.",
        "Gifts that move deals forward.",
      ],
      features: [
        "Send straight from your CRM in a click.",
        "The recipient chooses; the address stays private.",
        "Track every send through to ROI.",
      ],
      cta: "Explore client gifting",
    },
    {
      label: "Partner gifting",
      heading: "Partner Gifting",
      desc: [
        "Nurture channel and partner relationships with gifts that land, no matter how fast your partner list grows.",
      ],
      features: [
        "Co-branded–your logo and theirs.",
        "Built for partner and channel programs.",
        "Spend and approvals stay in line.",
      ],
      cta: "Explore partner gifting",
    },
    {
      label: "Automated gifting",
      heading: "Automated Gifting",
      desc: [
        "Set the rule once; gifts send themselves.",
        "Birthdays, milestones, renewals, and more.",
      ],
      features: [
        "Trigger gifts from any date or event.",
        "Connects to your HRIS and CRM.",
        "You approve the budget; we handle the rest.",
      ],
      cta: "Explore automated gifting",
    },
    {
      label: "Gift store",
      heading: "Gift Store",
      desc: [
        "A branded store your recipients redeem from.",
        "You fund it; they choose.",
      ],
      features: [
        "Your brand, your curated catalog.",
        "Redemption by link or code.",
        "Real-time budget and reporting.",
      ],
      cta: "Explore the gift store",
    },
  ],
};

/* Admin view #1 · 668:6402 — "Holiday at scale" full-width Gantt roadmap (Figma
   has no stat row). Rasterized from Figma node 668:6409. */
const holidayRoadmapContent: MigrationRoadmapContent = {
  eyebrow: "HOLIDAY AT SCALE",
  heading: "Run the whole holiday season from one place",
  body: "Holiday programs take months to plan and execute well. Stadium keeps budgets, sending, and tracking connected from start to finish.",
};

/* How it works · 668:5346. Figma reuses a swag t-shirt mockup in the editor
   preview (a placeholder); imageSrc omitted → themed gift glyph in the editor
   until a real gift photo exists (avoids the letterboxed apparel shot). */
const howItWorksContent: SwagHowItWorksContent = {
  eyebrow: "HOW IT WORKS",
  heading: "You send. They choose. We deliver.",
  intro: "Whether it’s one gift or one thousand, the process doesn’t change.",
  featuredStep: {
    n: "01",
    title: ["Send or Automate"],
    desc: "No guessing the gift. No chasing an address. Automate once, and sends continue without you.",
  },
  steps: [
    { n: "02", title: ["They Pick"] },
    { n: "03", title: ["Gift Arrives"] },
  ],
  visual: {
    tools: ["scan", "type", "image"],
    productGlyph: "gift",
    badgeLabel: "Approved!",
  },
};

/* Admin view #2 · 668:5687 — "In your tools" Stadium Gift Shop admin. This is
   the same admin UI already exported for /swag, so it reuses that raster. */
const adminToolsContent: SwagAdminViewContent = {
  eyebrow: "IN YOUR TOOLS",
  heading: "Right where your team works",
  body: "Manage gifting without leaving the tools your team already uses. Send manually or automate sends with the systems you rely on.",
  image: {
    src: "/swag/admin-view.png",
    alt: "Stadium Gift Shop admin: branded gift designs, tabs, and send actions",
  },
};

/* Committee · 668:5782 — teams grid. */
const committeeContent: SwagCommitteeContent = {
  eyebrow: "GIFTING BY TEAM",
  heading: "Built for how every team gifts",
  body: "From HR to Sales, Marketing, and Customer Experience, everyone works from the same platform.",
  cards: [
    {
      img: "/gifting/gifting-team-hr.jpg",
      title: "HR & People Ops",
      desc: "Celebrate milestones, welcome new hires, and automate employee gifting.",
    },
    {
      img: "/gifting/gifting-team-marketing.jpg",
      title: "Marketing",
      desc: "Power events, campaigns, ABM, and branded gifting experiences.",
    },
    {
      img: "/gifting/gifting-team-sales.jpg",
      title: "Sales",
      desc: "Build pipeline, celebrate wins, and strengthen customer relationships.",
    },
    {
      img: "/gifting/gifting-team-cx.jpg",
      title: "Customer Experience",
      desc: "Welcome customers, reward loyalty, and support renewals.",
    },
  ],
};

/* Comparison · 668:5848 — 4 columns × 7 rows. Figma has no footer CTA under the
   Stadium column, so `cta` is omitted (SwagComparison renders no CTA row). */
const comparisonContent: SwagComparisonContent = {
  eyebrow: "WHY TEAMS SWITCH",
  headingLines: ["Logistics and curation,", "finally together"],
  body: "Gifting tools scale. Premium catalogs curate. Stadium does both, without trading one for the other.",
  cols: [
    { name: "Stadium", sub: "All gifting + more" },
    { name: "Gifting tools", sub: "Sendoso · Reachdesk" },
    { name: "Lightweight", sub: "Snappy · Goody · Open" },
    { name: "DIY", sub: "Gift cards" },
  ],
  rows: [
    { label: "Recipient choice · 25K+ gifts", vals: ["check", "Limited", "check", "minus"] },
    { label: "Automation & CRM triggers", vals: ["check", "check", "Limited", "minus"] },
    { label: "Employee · client · partner", vals: ["check", "Some", "Some", "Manual"] },
    { label: "Global delivery · 170+", vals: ["check", "check", "Limited", "minus"] },
    { label: "Spend control & budgets", vals: ["check", "Limited", "minus", "minus"] },
    { label: "Swag · snacks · recognition too", vals: ["check", "Limited", "minus", "minus"] },
    { label: "One platform, one invoice", vals: ["check", "minus", "minus", "minus"] },
  ],
};

/* Case study · 668:5993 — Marqeta before/during/after. */
const paperchaseContent: SwagPaperchaseContent = {
  eyebrow: "CASE STUDY",
  headingLine1: "From four gifting vendors",
  headingLine2: "to one platform",
  body: "Marqeta streamlined client, employee, and partner gifting, reducing address bounces from 12% to 1%.",
  quote:
    "Four teams used to gift four different ways. Now it’s one platform, one invoice, and the recipient always gets something they actually want.",
  attribution: "Patty L. · VP People, Marqeta",
  stages: [
    {
      tag: "BEFORE",
      dark: false,
      img: "/gifting/gifting-case-1.jpg",
      title: "Four vendors, no visibility",
      points: ["4 gifting vendors", "12% address bounce", "Q4 a fire drill"],
    },
    {
      tag: "DURING",
      dark: false,
      img: "/gifting/gifting-case-2.jpg",
      title: "Migrated in 60 days",
      points: ["0 programs paused", "HRIS + Salesforce wired", "Brand pack consolidated"],
    },
    {
      tag: "AFTER",
      dark: true,
      img: "/gifting/gifting-case-3.jpg",
      title: "One platform, all four teams",
      points: ["1% address bounce", "5 programs · 22 countries", "One invoice for Finance"],
    },
  ],
};

/* Impact · 668:6068. */
const impactContent: SwagImpactContent = {
  heading: "All your gifting, on one platform",
  body: "Every team. All occasions. Anywhere in the world.",
  photoStat: {
    image: "/gifting/gifting-impact.jpg",
    value: "25,000+",
    label: "gifts they can choose from",
  },
  quoteStat: {
    label: "addresses you have to chase",
    value: "0",
    quote:
      "“Letting employees pick what they actually want made it something people look forward to.”",
  },
  stackedStats: {
    top: { value: "4 → 1", label: "Four teams, one platform" },
    bottom: { label: "Countries", value: "170+" },
  },
};

/* Closing · 668:6090. Figma has the Book-a-demo block + final CTA but no "Keep
   exploring" resource list; the component requires one, so gifting-themed
   resource links are authored and reuse the fluted workflow image. */
const closingContent: SwagClosingContent = {
  bookDemo: {
    eyebrow: "BOOK A DEMO",
    headingLine1: "Let’s map out your",
    headingLine2: "gifting program",
    detailBody:
      "In 30 minutes, we’ll map your gifting strategy across HR, Marketing, Sales, and CX — including your occasions, recipients, budgets, triggers, and the tools you already use.",
    features: [
      "One setup for HR, Marketing, Sales, and CX.",
      "See automated gifting workflows live.",
      "Replace gift cards and agency-managed gifting with Stadium.",
    ],
    formBgSrc: "/gifting/gifting-form-bg.jpg",
    form: {
      fullNameLabel: "Full name",
      fullNamePlaceholder: "John Doe",
      workEmailLabel: "Work email",
      workEmailPlaceholder: "john@doe.com",
      companyLabel: "Company",
      teamLabel: "Team",
      companySizeLabel: "Company size",
      selectPlaceholder: "Select",
      exploringLabel: "What do you want to solve?",
      exploringPlaceholder:
        "What do you need — employee, client, partner, or holiday gifting…",
      submit: "Book a demo",
      disclaimer: {
        before: "By booking, you agree to Stadium’s ",
        terms: "Terms",
        between: " and ",
        privacy: "Privacy Notice",
        after: ".",
      },
    },
  },
  /* keepExploring omitted — the /gifting Figma closing (668:6090) has no
     resources block, just book-a-demo + the final CTA. */
  finalCta: {
    heading: "Built for every way you gift",
    body: "Whatever you’re sending and whoever’s on the list, Stadium’s ready. Book a call to see how it fits your team.",
    primaryCta: "Book a demo",
    secondaryCta: "Browse the catalog",
    footnote: "Or browse 25,000+ gifts in the catalog",
  },
};

/* Problem · 668:4745 "THE USUAL WAY" — image-card problem block. */
const problemContent: ProblemBlockContent = {
  eyebrow: "THE USUAL WAY",
  heading: "Every team gifts differently, and the gaps are obvious",
  body: "Ask three teams how they handle gifting, and you’ll get three different answers: Sales runs its own platform, HR defaults to gift cards, and Marketing uses an agency. Budgets, vendors, and reporting never line up.",
  overlapColor: "#2a1a05",
  cards: [
    { title: "Vendor & Tool Sprawl", desc: "Each new gifting project adds another vendor, contract, or workflow." },
    { title: "Choosing for Everyone", desc: "You’re guessing what people like, what they need, and what they’ll use." },
    { title: "No Measurable Impact", desc: "Budgets, orders, and reporting live in different places, so no one sees spend or results." },
  ],
};

/* Amber re-theme (Figma /gifting: CTA #ffb800, cream accent #fef3d7). Uses a
   readable dark-amber for fills + eyebrows so white text keeps contrast on
   white sections; cream stays the light accent on the dark hero. */
const theme = {
  "--color-swag-green": "#ffb800",
  "--color-swag-on-accent": "#1b1b1b",
  "--color-swag-green-deep": "#b45309",
  "--color-swag-green-alt": "#b45309",
  "--color-swag-mint": "#fef3d7",
  "--color-swag-tint": "#fdf8ef",
  "--color-swag-hero-bg": "#2a1a05",
  "--color-swag-grad-1": "#fdf3e3",
  "--color-swag-grad-2": "#f3d9a8",
  "--color-swag-grad-3": "#c88a2e",
  "--color-swag-grad-4": "#4a3212",
  "--color-swag-glow": "rgba(180, 83, 9, 0.09)",
} as CSSProperties;

export default function GiftingPage() {
  return (
    <>
      {/* Value bar (668:4591) is hidden in the Figma frame, so it is omitted. */}
      <SiteHeader />
      <main
        id="main"
        tabIndex={-1}
        style={theme}
        className="flex flex-1 flex-col outline-none overflow-x-clip"
      >
        <SwagHero
          content={heroContent}
          showProduct={false}
          align="left"
          bgImageSrc="/gifting/hero-bg.jpg"
          secondaryCtaStyle="outline"
          shaderChroma={{ base: "#1a1206", down: "#c88a2e", left: "#ffb800", right: "#7a4a00", up: "#ffd57a" }}
        />

        <ProblemBlock content={problemContent} />

        {/* Divider · 668:5120 — a simple thin grey rule between the hero and the
            workflow band (adjoining sections carry the larger vertical rhythm). */}
        <div className="bg-white px-section-x-sm py-4 md:px-section-x-md md:py-6 lg:px-section-x-lg lg:py-8">
          <div
            data-animation="reveal"
            className="mx-auto h-1 w-full max-w-content rounded-full bg-[#f2f2f2]"
          />
        </div>

        <SwagWorkflow content={workflowContent} />
        <MigrationRoadmap content={holidayRoadmapContent} />
        <SwagHowItWorks content={howItWorksContent} />
        {/* Fulfillment · 668:6748 — Figma is a header-only callout (no matrix);
            rendered faithfully as a centered statement panel. */}
        <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-24">
          <div className="mx-auto flex w-full max-w-content flex-col items-center gap-5 rounded-[2rem] bg-[#f7f7f7] px-6 py-16 text-center md:py-20 lg:py-24">
            <div className="flex flex-col items-center gap-2">
              <p data-animation="reveal" className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-swag-green-deep md:text-eyebrow-md">
                NO ADDRESSES TO CHASE
              </p>
              <h2 data-animation="reveal" className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem] lg:text-[2.75rem]">
                The address problem, solved
              </h2>
            </div>
            <p data-animation="reveal" className="max-w-[42rem] font-sans text-body-md text-swag-grey lg:text-[1.125rem] lg:leading-[1.48]">
              From your HRIS or the recipient, every gift gets where it needs to go, no back-and-forth.
            </p>
          </div>
        </section>
        <SwagAdminView content={adminToolsContent} />
        <SwagCommittee content={committeeContent} />
        <SwagComparison content={comparisonContent} />
        <SwagPaperchase content={paperchaseContent} />
        <SwagImpact content={impactContent} />
        <SwagClosing content={closingContent} brightCta />
      </main>
      <PageClose showCta={false} />
    </>
  );
}
