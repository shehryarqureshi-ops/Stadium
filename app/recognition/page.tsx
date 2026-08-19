import type { Metadata } from "next";
import PageClose from "../components/PageClose";
import RecogCaseStudies from "../components/RecogCaseStudies";
import RecogClosing from "../components/RecogClosing";
import RecogCommittee from "../components/RecogCommittee";
import RecogComparison from "../components/RecogComparison";
import RecogContact from "../components/RecogContact";
import RecogExplore from "../components/RecogExplore";
import RecogHero from "../components/RecogHero";
import RecogImpact from "../components/RecogImpact";
import RecogOfferings from "../components/RecogOfferings";
import RecogPackages from "../components/RecogPackages";
import RecogPlatform from "../components/RecogPlatform";
import RecogProblem from "../components/RecogProblem";
import RecogSolution from "../components/RecogSolution";
import SiteHeader from "../components/SiteHeader";

/* /recognition — bespoke page rebuilt 2026-08-19 from Figma
   n9SjmDjzB1PeZAYJ5w43fr frame 2504:6746. Replaces the previous build that
   composed the shared Swag* template with lilac theming; the older
   Recognition* components stay in the tree but are no longer used here.

   Section order = the Figma frame order:
     Hero 2504:6749 (RecogHero + RecogProblem, incl. the divider 2504:6912)
     → Offerings · two doors 2504:6914 (RecogSolution)
     → six ways 2504:8107 (RecogOfferings) → Platform 2504:8186
     → Recognition 2504:8298 (RecogImpact) → Comparison 2504:8409
     → Committee 2504:8531 → Case Studies 2504:8615
     → Packages 2504:8638 → closing 2504:8672
        (RecogContact + RecogExplore + RecogClosing).

   LAYERING: RecogHero owns the purple hero raster and extends it 934px past
   itself so RecogProblem scrolls over it. At the foot of the page RecogClosing
   owns Figma's second raster (2504:8673), which starts ~51px inside the
   Talk-to-sales panel and runs behind Resources — it is bottom-anchored and
   deliberately un-clipped, which is why RecogContact and RecogExplore both
   carry `relative z-10`. Keep this order and those z-indices. */

export const metadata: Metadata = {
  title: "Recognition — Recognition that shows up at the door | Stadium",
  description:
    "Recognition stalls in a Slack channel. Stadium turns a thank-you into a real reward at someone's door, anywhere — you set the rules, we ship the rest. Global fulfillment to 170+ countries.",
};

export default function RecognitionPage() {
  return (
    <>
      <SiteHeader />
      <main
        id="main"
        tabIndex={-1}
        className="flex flex-1 flex-col outline-none overflow-x-clip"
      >
        <RecogHero />
        <RecogProblem />
        <RecogSolution />
        <RecogOfferings />
        <RecogPlatform />
        <RecogImpact />
        <RecogComparison />
        <RecogCommittee />
        <RecogCaseStudies />
        <RecogPackages />
        <RecogContact />
        <RecogExplore />
        <RecogClosing />
      </main>
      <PageClose showCta={false} />
    </>
  );
}
