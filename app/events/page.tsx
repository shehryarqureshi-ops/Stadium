import type { Metadata } from "next";
import JsonLd from "@/app/components/seo/JsonLd";
import { seoMetadata } from "@/app/lib/seo/metadata";

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
import ExpHeroTwo from "../components/ExpHero2";

export const metadata: Metadata = seoMetadata("/events");

export default function EventsPage() {
  return (
    <>
      <JsonLd path="/events" />
      <SiteHeader />
      <main
        id="main"
        tabIndex={-1}
        className="flex flex-1 flex-col outline-none overflow-x-clip"
      >
        <ExpHeroTwo />
        <div className="grid gap-16 md:gap-24 lg:gap-40 py-16 md:py-24 lg:py-40">
          <ExpProblem />
          <ExpSolution />
          <ExpHowItWorks />
          <ExpCategories />
          <ExpPlatform />
          <ExpCaseStudy />
        </div>
        <ExpClosing />
      </main>
      <PageClose showCta={false} />
    </>
  );
}
