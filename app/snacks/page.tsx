import type { Metadata } from "next";
import type { CSSProperties } from "react";
import PageClose from "../components/PageClose";
import SiteHeader from "../components/SiteHeader";
import SwagCatalog, { type SwagCatalogContent } from "../components/SwagCatalog";
import SwagClosing, { type SwagClosingContent } from "../components/SwagClosing";
import SwagComparison, { type SwagComparisonContent } from "../components/SwagComparison";
import SwagFulfillment, { type SwagFulfillmentContent } from "../components/SwagFulfillment";
import SwagHero, { type SwagHeroContent } from "../components/SwagHero";
import SwagHowItWorks, { type SwagHowItWorksContent } from "../components/SwagHowItWorks";
import SwagPlatform, { type SwagPlatformContent } from "../components/SwagPlatform";
import SwagWorkflow, { type SwagWorkflowContent } from "../components/SwagWorkflow";
import ProblemBlock, { type ProblemBlockContent } from "../components/ProblemBlock";
import SwagImpact, { type SwagImpactContent } from "../components/SwagImpact";
import ReviewsBlock, { type ReviewsBlockContent } from "../components/ReviewsBlock";

export const metadata: Metadata = {
  title: "Snacks — Snacks people can’t wait to open | Stadium",
  description:
    "Choose from curated boxes or let everyone build their own from 2,000+ snacks. Dietary filters built in, global fulfillment to 170+ countries.",
};

/* ── Hero · Figma 668:1493 ────────────────────────────────────────────────
   The snacks Figma hero is copy + logo marquee over a blue/green gradient; it
   has no product cluster, and SwagHero's dark-green background/shader + green
   accents are the fixed shared visuals. The required `product` cluster is
   filled with snacks-box copy over the Figma's placeholder product imagery. */
const heroContent: SwagHeroContent = {
  eyebrow: "SNACKS · SNACKMAGIC",
  heading: "Snacks people can’t wait to open",
  body: "Choose from curated options or let everyone build their perfect box from 2,000+ snacks. Dietary filters built in. Ships to 170+ countries.",
  primaryCta: { label: "Book a demo", href: "#" },
  secondaryCta: { label: "Browse the catalog", href: "#" },
  socialProof: "4.9 on Capterra · 2M+ snacks delivered · 170+ countries",
  product: {
    warehouseImage: {
      src: "/snacks/snacks-cat-2.jpg",
      alt: "Assorted snacks ready to ship",
    },
    hoodieImage: {
      src: "/snacks/snacks-editor.png",
      alt: "Build-your-own snack box preview",
    },
    sizeLabel: "SIZE",
    sizes: ["S", "M", "L", "XL"],
    selectedSize: "L",
    title: "Build-your-own box",
    description:
      "Set a budget and let everyone fill a box from 2,000+ snacks, with dietary filters built in.",
    addToCartLabel: "ADD TO CART",
  },
  /* Trust marquee — Figma 668:1552 order: google, amazon, pinterest, accenture,
     bloomberg, salesforce, netflix, google, amazon, pinterest. Reuses the
     shared /public trust SVGs. */
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
    { src: "/trust-pinterest.svg", alt: "Pinterest", w: 87, h: 25 },
  ],
};

/* ── Two ways to send · Figma 668:2082 ───────────────────────────────────
   Figma shows two tabs (Build-your-own box active, Curated boxes inactive).
   Only the active tab's full copy is in the file; the Curated-boxes tab copy
   below is on-brand placeholder. */
const workflowContent: SwagWorkflowContent = {
  eyebrow: "TWO WAYS TO SEND",
  heading: "Choose how to share snacks",
  subtitle:
    "Whether you’re sending a treat, stocking the office, or planning an event, there’s a snack experience that fits the moment.",
  image: "/swag/swag-workflow.jpg",
  initialTab: 0,
  tabs: [
    {
      label: "Build-your-own box",
      heading: "Build-Your-Own Box",
      desc: ["Set a budget, and everyone builds their own box from 2,000+ snacks."],
      features: [
        "They choose. You stop guessing.",
        "Filter by dietary preferences.",
        "Ships worldwide.",
      ],
      cta: "Start a box",
    },
    {
      label: "Curated boxes",
      heading: "Curated Boxes",
      desc: [
        "Hand-picked snack boxes, ready to send in minutes.",
        "Pick a theme; we handle the rest.",
      ],
      features: [
        "Curated by our snack experts.",
        "Themed boxes for every occasion.",
        "Add your branding to the box.",
      ],
      cta: "Browse boxes",
    },
  ],
};

/* ── Send a treat · Figma 668:2246 ───────────────────────────────────────
   Four steps; step 01 carries the dark design-editor visual. The Figma reuses a
   swag t-shirt mockup as the editor preview (a placeholder), so imageSrc is
   omitted → the editor shows a themed snack glyph until a real snack photo
   exists (avoids the letterboxed apparel shot). */
const howItWorksContent: SwagHowItWorksContent = {
  eyebrow: "SEND A TREAT",
  heading: "From order to their door in four steps",
  intro: "Hit send, and you’re done. No chasing addresses or tracking shipments.",
  featuredStep: {
    n: "01",
    title: ["Pick a Box"],
    desc: "Let them build their own box or send a curated one.",
  },
  steps: [
    { n: "02", title: ["Add Recipients"] },
    { n: "03", title: ["Hit", "Send"] },
    { n: "04", title: ["Recipients Redeem"] },
  ],
  visual: {
    tools: ["scan", "type", "image"],
    productGlyph: "snack",
    badgeLabel: "Approved!",
  },
};

/* ── The catalog · Figma 668:2128 ────────────────────────────────────────
   Category names + counts adapted from the Figma filter pills (Sweet, Salty,
   Better-for-you, Drinks, Vegan) and real snack brands; the Figma cards carry
   leftover swag placeholder labels (Apparel/Drinkware) and apparel flat-lay
   photos, so the images are the Figma placeholders (to be swapped for snack
   photography). */
const catalogContent: SwagCatalogContent = {
  eyebrow: "THE CATALOG",
  headingLine1: "Find everyone’s favorite,",
  headingLine2: "from 2,000+ snacks",
  body: "Every craving and diet is covered here, plus brands they’ve never tried before.",
  browseLabel: "Browse all 2,000+ snacks",
  filters: ["All", "Sweet", "Salty", "Better-for-you", "Drinks", "Vegan", "Gluten-free"],
  categories: [
    { cat: "Sweet", count: "520+", brands: "Hu · Tony’s · Sohla", img: "/snacks/snacks-cat-1.jpg" },
    { cat: "Salty", count: "480+", brands: "Siete · Pipcorn · Hippeas", img: "/snacks/snacks-cat-2.jpg" },
    { cat: "Better-for-you", count: "430+", brands: "RXBAR · KIND · GoMacro", img: "/snacks/snacks-cat-3.jpg" },
    { cat: "Drinks", count: "310+", brands: "Olipop · Liquid Death · Waterloo", img: "/snacks/snacks-cat-4.jpg" },
    { cat: "Vegan", count: "260+", brands: "Partake · LesserEvil · Bobo’s", img: "/snacks/snacks-cat-5.jpg" },
  ],
};

/* ── Snacks for every reason · Figma 668:2294 ────────────────────────────
   Occasion grid. The Figma cards use blank grey placeholder images, so the
   snack flat-lays are reused here (SwagPlatform requires a static import). */
const platformContent: SwagPlatformContent = {
  eyebrow: "ANY MOMENT",
  heading: "Snacks for every reason",
  body: "Snacks fit every occasion, whether you’re in the office or remote.",
  cards: [
    { title: "Onboarding", desc: "Welcome new hires from day one, wherever they are." },
    { title: "Milestones", desc: "Celebrate birthdays, anniversaries, and achievements." },
    { title: "All-Hands & Events", desc: "Fuel meetings, offsites, and virtual events." },
    { title: "Thank-Yous", desc: "Send a treat when someone’s earned it." },
    { title: "Remote Check-Ins", desc: "Bring the office experience to remote teams." },
    { title: "Just Because", desc: "Brighten someone’s day with an unexpected snack." },
  ],
};

/* ── Local to local · Figma 668:2184 ─────────────────────────────────────
   A regions table (Region · Local Snacks · Delivery · Status). Mapped to
   SwagFulfillment's label + 3-column shape: the region is the row label and
   the three columns are Local Snacks / Delivery / Status. SwagFulfillment
   forces a per-row icon (the Figma has none) — "box" is used throughout. */
const fulfillmentContent: SwagFulfillmentContent = {
  eyebrow: "LOCAL TO LOCAL",
  heading: "Shipped from nearby. No customs wait.",
  body: "Recipients get snacks stocked for their region, so picks stay locally relevant.",
  rowHeader: "Region",
  labelWidth: "13rem",
  columns: ["Local Snacks", "Delivery", "Status"],
  rows: [
    { label: "North America", vals: ["Trail mix · cold brew · jerky", "3–4 days", "check:Local"] },
    { label: "Europe", vals: ["Stroopwafels · biscuits · crisps", "3–5 days", "check:Local"] },
    { label: "APAC", vals: ["Mochi · matcha kit · rice crackers", "4–5 days", "check:Local"] },
    { label: "LATAM", vals: ["Dulce de leche · plantain chips", "4–5 days", "check:Local"] },
    { label: "Middle East", vals: ["Dates · baklava · mixed nuts", "4–6 days", "check:Local"] },
  ],
};

/* ── Why teams choose SnackMagic · Figma 668:2748 ────────────────────────
   The Figma table has FIVE competitor columns (SnackMagic, Caroo, Goldbelly,
   Goody, Hoppier); SwagComparison's grid is fixed to four, so Hoppier is
   dropped. Cells that were a check icon + text in Figma render as text here
   (e.g. "170+"). The Figma footnote has no slot; the required CTA is added. */
const comparisonContent: SwagComparisonContent = {
  eyebrow: "WHY TEAMS CHOOSE SNACKMAGIC",
  headingLines: ["The comparison speaks for itself"],
  body: "Subscriptions, DIY, generic boxes, stacked up against Snackmagic.",
  cols: [
    { name: "SnackMagic", sub: "by Stadium" },
    { name: "Caroo", sub: "ex-SnackNation" },
    { name: "Goldbelly", sub: "baskets" },
    { name: "Goody", sub: "gifting" },
    { name: "Hoppier", sub: "Visa cards" },
  ],
  rows: [
    { label: "Recipients pick their own", vals: ["check", "minus", "minus", "check", "Visa"] },
    { label: "No subscription or minimums", vals: ["check", "minus", "check", "check", "check"] },
    { label: "Global, local fulfillment", vals: ["170+", "US only", "US only", "550 intl", "cards"] },
    { label: "2,000+ curated snacks", vals: ["check", "minus", "minus", "Gifts only", "minus"] },
    { label: "Dietary filters built in", vals: ["check", "minus", "minus", "check", "minus"] },
    { label: "Recurring office pantry", vals: ["check", "check", "minus", "minus", "minus"] },
    { label: "Swag · Gifts · Recognition", vals: ["check", "minus", "minus", "minus", "minus"] },
  ],
  cta: { label: "Book a demo", href: "#" },
};

/* ── Closing · Figma 668:2990 ────────────────────────────────────────────
   The Figma "closing" node is testimonials + a stats grid + a final CTA.
   SwagClosing models book-a-demo + keep-exploring + final-CTA, so the final
   CTA is mapped faithfully and the book-a-demo/keep-exploring blocks carry
   on-brand snacks copy. Generic backdrops reuse the /swag assets. */
/* Impact stats — middle of the Figma closing ("The platform behind millions of
   snack moments"): photo-stat + snacks count + reorder rate + countries. */
const impactContent: SwagImpactContent = {
  heading: "The platform behind millions of snack moments",
  body: "Real results from teams that made snacking effortless with SnackMagic.",
  photoStat: { image: "/swag/swag-impact.jpg", value: "2M+", label: "Snacks delivered" },
  quoteStat: {
    label: "Snacks in the catalog",
    value: "2,000+",
    quote:
      "“Letting employees pick what they actually want made it something people look forward to.”",
  },
  stackedStats: {
    top: { value: "44%", label: "Reorder within 90 days" },
    bottom: { label: "Countries", value: "170+" },
  },
};

/* Closing final CTA — the Figma snacks closing (668:2990) is testimonials +
   stats + a dark final CTA (no book-a-demo form), so SwagClosing renders only
   the finalCta block here. */
const closingContent: SwagClosingContent = {
  finalCta: {
    heading: "The snacks that keep teams coming back",
    body: "Let recipients choose their own snacks, or send a curated box in minutes. Ships worldwide.",
    primaryCta: "Build a box",
    secondaryCta: "Browse the catalog",
    footnote: "or order it yourself — SnackMagic ↗",
  },
};

/* Problem · 668:1645 "THE USUAL WAY" — image-card problem block. */
const problemContent: ProblemBlockContent = {
  eyebrow: "THE USUAL WAY",
  heading: "Office snacks become one person’s job",
  body: "Remote employees need separate shipping. Dietary needs keep shifting. And it’s all one more recurring task to manage.",
  overlapColor: "#0a1f3d",
  cards: [
    { title: "Ordering lands on one person", desc: "Restocking, estimating quantities, and hoping the snacks are a hit." },
    { title: "Remote folks miss out", desc: "A stocked office kitchen only works for people who show up to the office." },
    { title: "Dietary needs are a guessing game", desc: "Different tastes and dietary needs mean the same snacks for everyone rarely work." },
  ],
};

/* Testimonials — top of the Figma snacks closing ("What teams are saying"). */
const reviewsContent: ReviewsBlockContent = {
  heading: "What teams are saying",
  ratingValue: "4.8",
  rating: "4.8 on G2 · 1,500+ reviews",
  pullQuote:
    "What sets SnackMagic apart is letting everyone pick what they actually want. Our team looks forward to it every month.",
  pullAttribution: "Marina Garcia · Chief of Staff",
  cards: [
    { quote: "Our remote team finally feels included — everyone gets snacks they actually love.", who: "People Team" },
    { quote: "I set it up in five minutes and boxes shipped worldwide. Zero stress.", who: "Operations Lead" },
    { quote: "Dietary filters mean no one gets left out. It’s a hit every single time.", who: "HR Manager" },
  ],
};

/* Blue re-theme (Figma /snacks: CTA #2178f5, light accent #d8e7fd). Overrides
   the swag-green tokens for this page's scope only. */
const theme = {
  "--color-swag-green": "#2178f5",
  "--color-swag-green-deep": "#1f6fe6",
  "--color-swag-green-alt": "#1f6fe6",
  "--color-swag-mint": "#d8e7fd",
  "--color-swag-tint": "#f0f6fe",
  "--color-swag-hero-bg": "#0a1f3d",
  "--color-swag-grad-1": "#e8f1fe",
  "--color-swag-grad-2": "#bcd7fb",
  "--color-swag-grad-3": "#4f8ae8",
  "--color-swag-grad-4": "#173a6b",
  "--color-swag-glow": "rgba(33, 120, 245, 0.09)",
} as CSSProperties;

export default function SnacksPage() {
  return (
    <>
      <SiteHeader banner="No minimums on branded stores · Warehousing & kitting included · Global fulfillment to 170+ countries" />
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
          bgImageSrc="/snacks/hero-bg.jpg"
          secondaryCtaStyle="outline"
          shaderChroma={{ base: "#0e1a2e", down: "#1e5fd0", left: "#2178f5", right: "#173a6b", up: "#7cb0f8" }}
        />

        <ProblemBlock content={problemContent} />

        {/* Divider — Figma 668:2020. A thin 5-segment #f2f2f2 rule. */}
        <div className="bg-white px-section-x-sm py-10 md:px-section-x-md md:py-14 lg:px-section-x-lg lg:py-[4.5rem]">
          <div className="mx-auto flex w-full max-w-content items-center">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-1 flex-1 bg-[#f2f2f2]" />
            ))}
          </div>
        </div>

        <SwagWorkflow content={workflowContent} />
        <SwagHowItWorks content={howItWorksContent} />
        <SwagCatalog content={catalogContent} />
        <SwagPlatform content={platformContent} />
        <SwagFulfillment content={fulfillmentContent} />
        <SwagComparison content={comparisonContent} />
        <ReviewsBlock content={reviewsContent} />
        <SwagImpact content={impactContent} />
        <SwagClosing content={closingContent} />
      </main>
      <PageClose showCta={false} />
    </>
  );
}
