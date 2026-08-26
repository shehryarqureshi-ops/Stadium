import type { Metadata } from "next";
import type { CSSProperties } from "react";
import PageClose from "../components/PageClose";
import SiteHeader from "../components/SiteHeader";
import SnackCatalog from "../components/SnackCatalog";
import SnackClosing from "../components/SnackClosing";
import SnackComparison from "../components/SnackComparison";
import SnackHero from "../components/SnackHero";
import SnackHowItWorks from "../components/SnackHowItWorks";
import SnackPlatform from "../components/SnackPlatform";
import SnackProblem from "../components/SnackProblem";
import SnackSolution from "../components/SnackSolution";
import SnackStats from "../components/SnackStats";

export const metadata: Metadata = {
  title: "Snacks — Snacks people can’t wait to open | Stadium",
  description:
    "Choose from curated boxes or let everyone build their own from 2,000+ snacks. Dietary filters built in, global fulfillment to 170+ countries.",
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
        <div className="grid gap-16 md:gap-24 lg:gap-40 py-16 md:py-24 lg:py-40">
          <SnackProblem />
          <SnackSolution />
          <SnackHowItWorks />
          <SnackCatalog /> {/* use reusable */}
          <SnackPlatform />
          <SnackComparison />
        </div>
        <SnackStats />
        <SnackClosing />
      </main>
      <PageClose showCta={false} />
    </>
  );
}
