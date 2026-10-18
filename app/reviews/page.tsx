import type { Metadata } from "next";

import ClosingCTA from "@/app/components/common/ClosingCTA";
import VariableCardGrid from "@/app/components/common/VariableCardGrid";
import Testimonials, { type TestimonialItem } from "@/app/components/common/VerticalTestimonials";
import { LINKS } from "@/app/components/impact/shared";
import Occasions from "@/app/components/Occasions";
import PageClose from "@/app/components/PageClose";
import ReviewsHero from "@/app/components/ReviewsHero";
import SiteHeader from "@/app/components/SiteHeader";

import butcherbox from "@/public/reviews/butcherbox.png";
import everflow from "@/public/reviews/everflow.png";
import riverwoods from "@/public/reviews/riverwoods.png";
import quoteMark from "@/public/reviews/testimonial.svg";

export const metadata: Metadata = {
  title: "Customer Testimonials & Reviews | Stadium",
  description:
    "See why customers love Stadium: live G2 reviews, customer case studies, and what teams say about recognition, swag, snacks, and gifting.",
  alternates: { canonical: "/reviews" },
};

/* /reviews — rebuilt from the live bystadium.com/reviews. Design = the existing
   section components (case-study cards from /the-proof, the homepage testimonials,
   use-case marquee and closing CTA); content = the live page's copy. Order follows
   the homepage so Testimonials' white→blue→dark gradient lands on the dark closing
   band. Case-study pages still live on the WordPress site. */
const WP = "https://www.bystadium.com";

const CASE_STUDIES = [
  { image: riverwoods, imageAlt: "RiverWoods Group", title: "How RiverWoods Group turned gifting into year-round recognition", slug: "riverwoods-group" },
  { image: butcherbox, imageAlt: "ButcherBox", title: "How ButcherBox partnered with Stadium to improve their employee experience", slug: "butcherbox" },
  { image: everflow, imageAlt: "Everflow", title: "How Everflow made recognition more visible across a growing workforce", slug: "everflow" },
].map(({ slug, ...c }) => ({ ...c, link: { label: "Read case study", href: `${WP}/case-overview/${slug}` } }));

const TESTIMONIALS: TestimonialItem[] = [
  {
    title: "Patty L",
    text: "Stadium was a great experience for our company to use for our Wellness Gift Box launch at the beginning of the year. The team delivered incredible gift boxes that the employees were excited about.",
    image: quoteMark,
  },
  {
    title: "Louise L",
    text: "Sending swag to our global members has always been an issue, but finding Stadium was the perfect solution.",
    image: quoteMark,
  },
  {
    title: "Audrey C",
    text: "I shared the store with our CEO this week, and he was super happy with it! His words - Yes! This is exactly what I have been looking to build for our employees’ swag and customer gifts! Thank YOU for helping me hit this request out of the park.",
    image: quoteMark,
  },
];

export default function ReviewsPage() {
  return (
    <>
      <SiteHeader lightHero />
      <main id="main" tabIndex={-1} className="flex flex-1 flex-col overflow-x-clip outline-none">
        <ReviewsHero />

        <div className="grid gap-16 py-16 md:gap-24 md:py-24 lg:gap-40 lg:py-40">
          <VariableCardGrid
            caption="How companies have used us"
            captionColor="#16171b"
            title="Case Studies"
            gridColumns={3}
            items={CASE_STUDIES}
            cta={{ label: "View all case studies", href: `${WP}/case-studies` }}
          />
          <Occasions
            eyebrow="Unlimited use cases"
            title="Summon Stadium for every occasion"
            description=""
            cta={null}
          />
        </div>

        <div className="bg-linear-to-b from-white via-[#2178F5] to-[#181818]">
          <div className="mx-auto max-w-content bg-white">
            <Testimonials
              caption="Hear it from our customers"
              captionColor="#16171b"
              title="What keeps ‘em coming"
              showRating={false}
              blockquote="What sets Stadium apart is their ability to deliver a complete solution and empower our team — no matter the challenge."
              citation="Maxime Bascon • Chief of Staff • Elktech"
              items={TESTIMONIALS}
            />
          </div>
          <div className="mx-auto hidden max-w-content rounded-b-4xl bg-white p-10 lg:block" />
        </div>
      </main>
      <ClosingCTA
        title={
          <>
            Consolidate all your gifting,
            <br className="hidden md:block" /> swag, and recognition resources
          </>
        }
        description="Save big on $ and headaches."
        ctaOneLabel="Book a demo"
        ctaOneLink={LINKS.sales}
        ctaOneVariant="primary"
        ctaTwoLabel="Talk to sales"
        ctaTwoLink={LINKS.sales}
        ctaTwoVariant="secondary"
        backgroundColor="#181818"
      />
      <PageClose />
    </>
  );
}
