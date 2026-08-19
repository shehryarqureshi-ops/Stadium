import type { Metadata } from "next";
import ExpCaseStudy from "../components/ExpCaseStudy";
import ExpCategories from "../components/ExpCategories";
import ExpClosing from "../components/ExpClosing";
import ExpHero from "../components/ExpHero";
import ExpHowItWorks from "../components/ExpHowItWorks";
import ExpPlatform from "../components/ExpPlatform";
import ExpProblem from "../components/ExpProblem";
import ExpSolution from "../components/ExpSolution";
import PageClose from "../components/PageClose";
import SiteHeader from "../components/SiteHeader";

/* /events — the bespoke "Hosted Experiences · Confetti" page, rebuilt
   2026-08-19 from Figma n9SjmDjzB1PeZAYJ5w43fr frame 2504:9060.

   Section order = the Figma frame order:
     hero 2504:9061 (ExpHero + ExpProblem) → six ways 2504:9222 (ExpSolution)
     → How it works 2504:9358 → six ways #2 2504:9385 (ExpCategories)
     → Platform 2504:9461 → Case study 2504:9499 → closing 2504:9571.

   ExpHero owns the pink Confetti raster and sizes its bg box 693px taller
   than itself so ExpProblem (transparent, relative z-10) scrolls over it —
   do NOT wrap them in a shared <section> and do NOT add SwagHeroShader.

   ExpClosing hosts BOTH the "STEAL OUR IDEAS" resources block and the final
   CTA card (they share one raster), so it must stay last before PageClose.

   The older Events* components are still in the tree but are no longer used
   by this route. */

export const metadata: Metadata = {
  title: "Hosted Experiences — Bring your team together | Stadium",
  description:
    "Book real hosts for virtual, in-person, or hybrid events in minutes. 500+ experience formats, 52,000+ events hosted, rated 4.8 — team building that people actually turn up for.",
};

export default function EventsPage() {
  return (
    <>
      <SiteHeader />
      <main
        id="main"
        tabIndex={-1}
        className="flex flex-1 flex-col outline-none overflow-x-clip"
      >
        <ExpHero />
        <ExpProblem />
        <ExpSolution />
        <ExpHowItWorks />
        <ExpCategories />
        <ExpPlatform />
        <ExpCaseStudy />
        <ExpClosing />
      </main>
      <PageClose showCta={false} />
    </>
  );
}
