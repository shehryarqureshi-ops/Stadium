import type { Metadata } from "next";

import BookACallHero from "../components/BookACallHero";
import ClosingCTA from "../components/common/ClosingCTA";
import ProblemSection, { type ProblemSectionItem } from "../components/common/ProblemSection";
import VerticalTestimonials, {
  type TestimonialItem,
} from "../components/common/VerticalTestimonials";
import PageClose from "../components/PageClose";
import SiteHeader from "../components/SiteHeader";

import fulfillmentImg from "@/public/infra-operations.jpg";
import scaleImg from "@/public/map-faces.jpg";
import catalogImg from "@/public/catalog-gift-cards.jpg";
import flutedThumb from "@/public/recog2/rc-case-thumb.png";

export const metadata: Metadata = {
  title: "Book a Call — See how Stadium can work for your team | Stadium",
  description:
    "Tell us what you’re looking for and we’ll tailor a demo to your team: engage people in 170+ countries, automate programs, and manage gifting, swag, and recognition in one place.",
};

/* /book-a-call (Figma n9SjmDjzB1PeZAYJ5w43fr → 3998:4026).
   Same navy→night page gradient as /pricing (Figma: #011C3D → #000 across
   the frame). Stack at desktop:
     hero (form)                                    BookACallHero
     glass panel — starts 52 above the hero's proof block (342 above the
       hero's bottom edge) and runs to the foot of "Why Stadium?";
       white 20% → 0, r32 top                       ProblemSection tone=dark
     160 → testimonials (stack layout) → 120        VerticalTestimonials
     160 → closing CTA                              ClosingCTA (own lg:pt-40)
     footer                                         PageClose
   "Why Stadium?" images are placeholders in Figma — existing site photography
   stands in (fulfillment floor, crowd, gift cards). */

const WHY_STADIUM: ProblemSectionItem[] = [
  {
    image: fulfillmentImg,
    imageAlt: "Branded Stadium boxes moving along a fulfillment-center conveyor",
    title: "Local Fulfillment",
    description: "We fulfill locally in 170+ countries, so everyone feels valued.",
  },
  {
    image: scaleImg,
    imageAlt: "A large group of smiling coworkers",
    title: "Scalable",
    description: "We make gifting a breeze, whether you’re gifting to 1 or 1,000+.",
  },
  {
    image: catalogImg,
    imageAlt: "Gift cards from popular brands",
    title: "Robust Catalog",
    description: "From snacks to gift cards to swag—we’ve got it all.",
  },
];

const TESTIMONIALS: TestimonialItem[] = [
  {
    image: flutedThumb,
    text: "Stadium isn’t just a swag platform. It’s a scalable engagement tool that grows with you.",
    title: "Felicia W.",
    subtitle: "Communications Manager ·\u00a0 Kentro",
  },
  {
    image: flutedThumb,
    text: "Typically, gifting globally would take a day. Now I can do it in 15 minutes, even for 500+ people.",
    title: "Shaira J.",
    subtitle: "People Experience Manager ·\u00a0 Apollo",
  },
  {
    image: flutedThumb,
    text: "I’m full of ideas on how to use Stadium. What Stadium offers goes way beyond what I expected.",
    title: "Johnny S.",
    subtitle: "Customer Support Manager ·\u00a0 PlanSource",
  },
];

export default function BookACallPage() {
  return (
    <>
      <SiteHeader />
      <main
        id="main"
        tabIndex={-1}
        className="flex flex-1 flex-col overflow-x-clip bg-linear-to-b from-pricing-navy to-pricing-night outline-none"
      >
        <BookACallHero />

        {/* glass panel (Figma 3998:4028) — tucks up under the hero's proof
            block at lg; the hero is z-10 so its content stays on top */}
        <div className="rounded-t-[2rem] bg-linear-to-b from-white/20 to-white/0 px-section-x-sm pt-12 md:px-section-x-md md:pt-16 lg:-mt-[21.375rem] lg:px-section-x-lg lg:pt-[21.375rem]">
          <ProblemSection tone="dark" title="Why Stadium?" items={WHY_STADIUM} />
        </div>

        <div className="pb-16 pt-16 md:pb-20 md:pt-24 lg:pb-[7.5rem] lg:pt-40">
          <VerticalTestimonials
            theme="dark"
            layout="stack"
            caption="Hear it from our customers"
            showRating={false}
            title={
              <>
                What keeps
                <br />
                ‘em coming
              </>
            }
            blockquote="“Stadium stood out to me because it made global gifting simple, inclusive, scalable, and cost-effective.”"
            citation={"Michelle D. ·\u00a0 Director, Administrative Operations ·\u00a0 Workato"}
            items={TESTIMONIALS}
          />
        </div>

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
          ctaOneLink="#main"
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
