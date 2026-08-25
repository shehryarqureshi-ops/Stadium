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
        <div className="grid gap-16 md:gap-24 lg:gap-40 py-16 md:py-24 lg:py-40">
          <RecogProblem />
          <RecogSolution />
          <RecogOfferings />
          <RecogPlatform />
          <RecogImpact />
          <RecogComparison />
          <RecogCommittee />
          <RecogCaseStudies />
          <RecogPackages />
          <RecogExplore />
        </div>
        <RecogClosing />
      </main>
      <PageClose showCta={false} />
    </>
  );
}
