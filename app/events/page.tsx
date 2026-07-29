import type { Metadata } from "next";
import type { CSSProperties } from "react";

import PageClose from "../components/PageClose";
import SiteHeader from "../components/SiteHeader";
import EventsHero from "../components/EventsHero";
import ProblemBlock, { type ProblemBlockContent } from "../components/ProblemBlock";
import EventsExperiences from "../components/EventsExperiences";
import EventsCategories from "../components/EventsCategories";
import SwagAdminView, { type SwagAdminViewContent } from "../components/SwagAdminView";
import SwagHowItWorks, { type SwagHowItWorksContent } from "../components/SwagHowItWorks";
import EventsHosts from "../components/EventsHosts";
import EventsFormats from "../components/EventsFormats";
import SwagPlatform, { type SwagPlatformContent } from "../components/SwagPlatform";
import ReviewsBlock, { type ReviewsBlockContent } from "../components/ReviewsBlock";
import SwagClosing, { type SwagClosingContent } from "../components/SwagClosing";

/* Static image imports for SwagPlatform (cards[].img must be StaticImageData).
   The events "Any moment" bento (Figma 608:4742) reuses the platform UI mockups
   PINK-tinted to match Figma (which re-tints the same swag mockups pink) — see
   public/events/plat-*.png, hue-rotated from the /swag originals. */
import platStores from "@/public/events/plat-stores.png";
import platInventory from "@/public/events/plat-inventory.png";
import platFulfillment from "@/public/events/plat-fulfillment.png";
import platGifting from "@/public/events/plat-gifting.png";
import platIntegrations from "@/public/events/plat-integrations.png";
import platBudgets from "@/public/events/plat-budgets.png";

export const metadata: Metadata = {
  title: "Team Events & Experiences — Bring your team together | Stadium",
  description:
    "Hosted virtual, in-person, and hybrid team events led by real experts. Browse 500+ experiences and book in minutes — on the same platform you use for recognition, gifting, and swag.",
};

/* ── 2 · Hero (602:1627) is a custom centered hero — EventsHero (phone mockup +
   4-stat band). ── 3 · The nested "THE USUAL WAY" problem block: */
const problemContent: ProblemBlockContent = {
  eyebrow: "THE USUAL WAY",
  heading: "Team building involves a Zoom link and crossed fingers",
  body: "Planning takes time. Coordinating schedules is a headache. And after all that, there’s no guarantee people will have fun.",
  overlapColor: "#1f0a14",
  cards: [
    { title: "One person does all the work", desc: "Managers and EAs become accidental event planners (on top of their packed schedules)." },
    { title: "Generic events don’t connect", desc: "People don’t remember last-minute icebreakers. But they do remember experiences they enjoyed." },
    { title: "Remote teams drift apart", desc: "The best conversations rarely happen on a status call, squeezed between agenda items." },
  ],
};

/* Pink re-theme (Figma /events · Confetti: CTA #ff5b77, deeper rose #e11d48 for
   readable eyebrows/fills on white, light pink #ffd6dd on the dark hero). */
const theme = {
  "--color-swag-green": "#ff5b77",
  "--color-swag-green-deep": "#e11d48",
  "--color-swag-green-alt": "#e11d48",
  "--color-swag-mint": "#ffd6dd",
  "--color-swag-tint": "#fff1f4",
  "--color-swag-hero-bg": "#1f0a14",
  "--color-swag-grad-1": "#fdeef1",
  "--color-swag-grad-2": "#f9cdd6",
  "--color-swag-grad-3": "#ec6b85",
  "--color-swag-grad-4": "#5e1526",
  "--color-swag-glow": "rgba(255, 91, 119, 0.09)",
} as CSSProperties;

/* ── 5 · Admin view — Figma 608:3438 ───────────────────────────────────────
   The Figma mockup is the same "Stadium Gift Shop" admin dashboard used on
   /swag, so that asset is reused as-is. */
const adminViewContent: SwagAdminViewContent = {
  eyebrow: "BROWSE 500+ EXPERIENCES",
  heading: "Book the right event, faster",
  body: "Filter by format, group size, length, and vibe. Pick what fits, then book it in minutes.",
  image: {
    src: "/swag/admin-view.png",
    alt: "Stadium admin dashboard for browsing and booking team experiences",
  },
};

/* ── 7 · How it works — Figma 608:3878 ─────────────────────────────────────
   Step 01 is a wide card with a plain image placeholder (no swag design-editor
   chrome), so `visual` is omitted → SwagHowItWorks renders the plain themed
   image slot. */
const howItWorksContent: SwagHowItWorksContent = {
  eyebrow: "HOW IT WORKS",
  heading: "Pick your event, and we’ll take it from there",
  intro: "Faster than the meeting you’d need to plan this yourself.",
  featuredStep: {
    n: "01",
    title: ["Pick Your Event"],
    desc: "Browse hundreds of experiences, filtered to fit your team.",
  },
  steps: [
    { n: "02", title: ["Book in Minutes"] },
    { n: "03", title: ["Show Up"] },
  ],
};

/* ── 8 · Case studies (608:3927) → EventsHosts (4-up host-profile grid). ──
   9 · Comparison (602:2026) → EventsFormats (Virtual / In-Person / Hybrid
   explainer, not a table). Both are their own components now. */

/* ── 10 · Platform — Figma 608:4742 ────────────────────────────────────────
   Figma is an "Any moment" bento of occasion cards. Mapped onto SwagPlatform's
   6-card grid; card visuals reuse the /swag platform mockups (see import note). */
const platformContent: SwagPlatformContent = {
  eyebrow: "ANY MOMENT",
  heading: "There’s always a reason to get together",
  body: "From onboarding to holidays and everything in between, make gathering a habit, not a once-a-year event.",
  cards: [
    {
      img: platStores,
      title: "Milestones & Birthdays",
      desc: "Make personal moments a reason for everyone to gather.",
    },
    {
      img: platInventory,
      title: "Team Wins",
      desc: "Mark the wins as they happen, not months later.",
    },
    {
      img: platFulfillment,
      title: "All-Hands & Kickoffs",
      desc: "Make the all-hands feel like an event, not a meeting.",
    },
    {
      img: platGifting,
      title: "Offsites & Retreats",
      desc: "Host an offsite worth flying in for.",
    },
    {
      img: platIntegrations,
      title: "Quarterly Socials",
      desc: "A regular chance to catch up, no shop talk.",
    },
    {
      img: platBudgets,
      title: "Just Because",
      desc: "Break up the week — no reason needed.",
    },
  ],
};

/* ── 11 · Paperchase slot (608:5038) is a testimonials block → ReviewsBlock. */
const reviewsContent: ReviewsBlockContent = {
  heading: "The best part is what people say after",
  ratingValue: "4.8",
  rating: "4.8 on G2 from 1,515 reviews",
  pullQuote:
    "What sets Stadium apart is their ability to deliver a complete solution and empower our team — no matter the challenge.",
  pullAttribution: "Maxime Bascon · Chief of Staff, Elktech",
  cards: [
    { quote: "“Our remote team finally feels like a team. People ask when the next one is.”", who: "Marcus Chen · Ops Director, Figma" },
    { quote: "“I booked it in five minutes and the host was incredible. Zero planning stress.”", who: "Marie Belingard · Marketing Director, TSE" },
    { quote: "“The DEI heritage series was moving and genuinely fun — not a box-tick.”", who: "People team · ConstructConnect" },
  ],
};

/* ── 12 · Closing — Figma 602:2479 ─────────────────────────────────────────
   Figma has the "Resources" list (keepExploring) and the dark final CTA, but no
   book-a-demo form block; the bookDemo block is filled with events-appropriate
   copy. The Figma final-CTA copy was recognition-page placeholder text and is
   replaced with events copy. Generic glass/fluted backdrops reuse /swag assets. */
const closingContent: SwagClosingContent = {
  /* Figma events closing has no book-a-demo form — just Resources + final CTA. */
  keepExploring: {
    eyebrow: "STEAL OUR IDEAS",
    heading: "Resources for better team events",
    links: [
      {
        tag: "GUIDE",
        title: "50 virtual team-building ideas",
        desc: "Find the right activity for every team, budget, and group size.",
      },
      {
        tag: "PLAYBOOK",
        title: "The remote connection playbook",
        desc: "Build stronger habits that keep distributed teams connected.",
      },
      {
        tag: "CHECKLIST",
        title: "Holiday party planning guide",
        desc: "Plan a celebration people will remember.",
      },
    ],
    imageSrc: "/swag/swag-workflow.jpg",
  },
  finalCta: {
    heading: "Make team time the best part of the week",
    body: "Book 30 minutes and leave with a plan built around your team, your calendar, and your goals. Real hosts, zero planning stress.",
    primaryCta: "Book a demo",
    secondaryCta: "Browse the catalog",
    footnote: "Trusted by 25,000+ teams · 52,000+ events hosted",
  },
};

export default function EventsPage() {
  return (
    <>
      <SiteHeader banner="500+ hosted experiences · Virtual, in-person & hybrid · Book in minutes" />

      <main
        id="main"
        tabIndex={-1}
        style={theme}
        className="flex flex-1 flex-col outline-none overflow-x-clip"
      >
        <EventsHero />

        <ProblemBlock content={problemContent} />

        {/* divider — Figma 602:1728. A thin full-width rule with generous space
            below, separating the problem block from the experiences band. */}
        <div className="bg-white px-section-x-sm pb-16 md:px-section-x-md md:pb-24 lg:px-section-x-lg lg:pb-40">
          <div className="mx-auto h-[0.125rem] w-full max-w-content bg-[#f2f2f2]" />
        </div>

        <EventsExperiences />
        <SwagAdminView content={adminViewContent} />
        <EventsCategories />
        <SwagHowItWorks content={howItWorksContent} />
        <EventsHosts />
        <EventsFormats />
        <SwagPlatform content={platformContent} />
        <ReviewsBlock content={reviewsContent} />
        <SwagClosing content={closingContent} />
      </main>

      <PageClose showCta={false} />
    </>
  );
}
