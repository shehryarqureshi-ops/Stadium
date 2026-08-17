import type { Metadata } from "next";
import type { CSSProperties } from "react";
import PageClose from "../components/PageClose";
import SiteHeader from "../components/SiteHeader";
import SnackCatalog from "../components/SnackCatalog";
import SnackClosing from "../components/SnackClosing";
import SnackComparison from "../components/SnackComparison";
import SnackHero from "../components/SnackHero";
import SnackPlatform from "../components/SnackPlatform";
import SnackProblem from "../components/SnackProblem";
import SnackSolution from "../components/SnackSolution";
import SnackStats from "../components/SnackStats";
import SwagHowItWorks, {
  type SwagHowItWorksContent,
} from "../components/SwagHowItWorks";

export const metadata: Metadata = {
  title: "Snacks — Snacks people can’t wait to open | Stadium",
  description:
    "Choose from curated boxes or let everyone build their own from 2,000+ snacks. Dietary filters built in, global fulfillment to 170+ countries.",
};

/* ── Send a treat · Figma 668:2246 ───────────────────────────────────────
   Four steps; step 01 carries the dark design-editor visual. The Figma reuses a
   swag t-shirt mockup as the editor preview (a placeholder), so imageSrc is
   omitted → the editor shows a themed snack glyph until a real snack photo
   exists (avoids the letterboxed apparel shot). */
const howItWorksContent: SwagHowItWorksContent = {
  eyebrow: "SEND A TREAT",
  heading: "From order to their door in four steps",
  intro:
    "Hit send, and you’re done. No chasing addresses or tracking shipments.",
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
      <SiteHeader />
      <main
        id="main"
        tabIndex={-1}
        style={theme}
        className="flex flex-1 flex-col outline-none overflow-x-clip"
      >
        <SnackHero />
        <SnackProblem />

        <SnackSolution />
        <SwagHowItWorks content={howItWorksContent} />
        <SnackCatalog />
        <SnackPlatform />
        <SnackComparison />
        <SnackStats />
        <SnackClosing />
      </main>
      <PageClose showCta={false} />
    </>
  );
}
