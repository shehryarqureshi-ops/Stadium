import type { Metadata } from "next";
import type { CSSProperties } from "react";

import GiftHero from "../components/GiftHero";
import GiftProblem from "../components/GiftProblem";
import GiftSolution from "../components/GiftSolution";
import GiftHowItWorks from "../components/GiftHowItWorks";
import GiftIntegrations from "../components/GiftIntegrations";
import GiftComparison from "../components/GiftComparison";
import GiftStats from "../components/GiftStats";
import GiftContact from "../components/GiftContact";
import PageClose from "../components/PageClose";
import SiteHeader from "../components/SiteHeader";

/* /gifting — the "new gifting page" (Figma n9SjmDjzB1PeZAYJ5w43fr, frame
   1113:2116). Bespoke amber-themed page built from dedicated Gift* components:
   Hero + Problem → Solution tabs → How-it-works stepper → Integrations →
   Comparison → Impact stats → Form + Closing → footer. */

export const metadata: Metadata = {
  title: "Gifting — Corporate gifting without the busywork | Stadium",
  description:
    "Client, employee, partner, and holiday gifts from one platform. Recipients choose their gift and enter their address — you set the budget, and Stadium delivers to 170+ countries.",
};

/* Amber re-theme (Figma /gifting: CTA #ffb800, cream accent #fef3d7). */
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
      <SiteHeader />
      <main
        id="main"
        tabIndex={-1}
        style={theme}
        className="flex flex-1 flex-col bg-white outline-none overflow-x-clip"
      >
        <GiftHero />
        <GiftProblem />
        <GiftSolution />
        <GiftHowItWorks />
        <GiftIntegrations />
        <GiftComparison />
        <GiftStats />
        <GiftContact />
      </main>
      <PageClose showCta={false} />
    </>
  );
}
