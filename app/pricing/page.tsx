import type { Metadata } from "next";

import BookACallForm from "../components/BookACallForm";
import ClosingCTA from "../components/common/ClosingCTA";
import PageClose from "../components/PageClose";
import PricingComparison from "../components/PricingComparison";
import PricingHero from "../components/PricingHero";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Pricing — One platform for stronger connections at scale | Stadium",
  description:
    "Compare Stadium's Shops, Swag, Engagement, and Enterprise passes: print-on-demand shops, bulk swag, gifting, recognition, and fulfillment in 170+ countries.",
};

/* /pricing (Figma n9SjmDjzB1PeZAYJ5w43fr → 3998:4491 "/go/pricing").
   One navy→night gradient (#011c3d → #000308, pixel-sampled across the 4230px
   content frame) runs behind every section; the white comparison panel floats
   on it. Sections are separated by Figma's uniform 160 at desktop:
     hero → 160 → comparison → 160 → Book a Demo → 160 → closing CTA
   (ClosingCTA carries its own lg:pt-40, so the form section has no bottom pad). */
export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main
        id="main"
        tabIndex={-1}
        className="flex flex-1 flex-col overflow-x-clip bg-linear-to-b from-pricing-navy to-pricing-night outline-none"
      >
        <PricingHero />

        <div className="pt-16 md:pt-24 lg:pt-40">
          <PricingComparison />
        </div>

        {/* Book a Demo — Figma 3998:4920: title 54 → 24 → body 18/28 → 40 → form card */}
        <section
          id="book-a-demo"
          aria-labelledby="book-a-demo-title"
          className="scroll-mt-16 px-section-x-sm pt-16 md:px-section-x-md md:pt-24 lg:px-section-x-lg lg:pt-40"
        >
          <div className="mx-auto flex w-full max-w-content flex-col items-center gap-8 lg:gap-10">
            <div className="flex flex-col items-center gap-4 text-center lg:gap-6">
              <h2
                id="book-a-demo-title"
                data-animation="reveal"
                className="font-display text-display-sm text-white md:text-display-md lg:text-display-demo"
              >
                Book a Demo
              </h2>
              <p
                data-animation="reveal"
                className="max-w-[40rem] text-balance font-sans text-body-md tracking-[0.015625rem] text-grey-200 md:text-body-lg"
              >
                Tell us your goals. We configure the engagement platform, manage the rollout, and
                guide you through launch.
              </p>
            </div>
            <BookACallForm />
          </div>
        </section>

        <ClosingCTA
          title="Ready to get started?"
          description={
            <>
              One powerful platform for all your engagement needs.
              <br className="hidden md:block" /> Easily send rewards, celebrate milestones, and let
              employees choose what matters most.
            </>
          }
          descriptionClassName="max-w-[44rem] lg:max-w-[48rem]"
          ctaOneLabel="Book a demo"
          ctaOneLink="#book-a-demo"
          ctaOneVariant="primary"
          ctaTwoLabel="Browse the catalog"
          ctaTwoLink="#"
          ctaTwoVariant="secondary"
          backgroundColor="transparent"
        />
      </main>
      <PageClose showCta={false} />
    </>
  );
}
