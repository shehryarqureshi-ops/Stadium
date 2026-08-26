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
