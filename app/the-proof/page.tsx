import type { Metadata } from "next";

import JsonLd from "@/app/components/seo/JsonLd";
import { seoMetadata } from "@/app/lib/seo/metadata";

import ImageShowcase from "@/app/components/common/ImageShowcase";
import NumberedCardGrid from "@/app/components/common/NumberedCardGrid";
import QuoteSplit from "@/app/components/common/QuoteSplit";
import SplitFeature from "@/app/components/common/SplitFeature";
import StatsGrid from "@/app/components/common/StatsGrid";
import ImpactClosing from "@/app/components/common/ImpactClosing";
import TeamHero from "@/app/components/common/TeamHero";
import TheProofGrowth from "@/app/components/impact/batch3/TheProofGrowth";
import VerticalTestimonials from "@/app/components/common/VerticalTestimonials";
import { BRANDS } from "@/app/components/common/customerBrands";
import WhiteBox from "@/app/components/common/WhiteBox";
import VariableCardGrid from "@/app/components/common/VariableCardGrid";
import ImpactPageShell, { TeamDivider } from "@/app/components/impact/ImpactPageShell";
import { CUSTOMER_RESULTS, LINKS, PLATFORM_ROUTES } from "@/app/components/impact/shared";

export const metadata: Metadata = seoMetadata("/the-proof");

import caseTime from "@/public/the-proof/case-time.png";
import caseMoney from "@/public/the-proof/case-money.png";
import casePeace from "@/public/the-proof/case-peace.png";
import caseControl from "@/public/the-proof/case-control.png";
import swagProject from "@/public/the-proof/swag-project.jpg";
import michellePhoto from "@/public/the-proof/customers/michelle-workato.jpg";
import feliciaPhoto from "@/public/the-proof/customers/felicia-kentro.jpg";
import nataliePhoto from "@/public/testimonials/natalie.png";
import YourStadiumTeam from "@/app/components/cards/the-proof/YourStadiumTeam";
import VectorCard from "@/app/components/cards/VectorCard";

/* /the-proof — Figma n9SjmDjzB1PeZAYJ5w43fr → 3815:4571. Mockups are 2×
   exports of the Figma frames (public/the-proof/). Customer-result image
   slots and the global-network visual are grey placeholders in Figma too. */

const PROOF_LOGOS = [
  { src: "/impact/overview/logos/google.svg", alt: "Google", width: 74, height: 24 },
  { src: "/impact/overview/logos/amazon.svg", alt: "Amazon", width: 80, height: 24 },
  { src: "/impact/overview/logos/pinterest.svg", alt: "Pinterest", width: 87, height: 22 },
  { src: "/impact/overview/logos/accenture.svg", alt: "Accenture", width: 84, height: 24 },
  { src: "/impact/overview/logos/bloomberg.svg", alt: "Bloomberg", width: 90, height: 16 },
  { src: "/impact/overview/logos/salesforce.svg", alt: "Salesforce", width: 37, height: 26 },
  { src: "/impact/overview/logos/netflix.svg", alt: "Netflix", width: 75, height: 20 },
];

export default function TheProofPage() {
  return (
    <>
      <JsonLd path="/the-proof" />
      <ImpactPageShell
        hero={
          <TeamHero
            eyebrow="The Proof"
            title="Proven results, at every scale"
            description="Companies use Stadium to cut manual work, engage employees and customers across every team, and expand into new programs without adding headcount."
            primaryCta={{ label: "Talk to sales", href: LINKS.sales }}
            secondaryCta={{ label: "Explore the platform", href: LINKS.platform }}
            background="canvas"
            visual={<TheProofGrowth />}
            visualLayout="aligned"
            visualMaxWidth="32.8125rem"
          />
        }
        closing={
          <ImpactClosing
            cta={{
              caption: "Get started",
              title: "See what Stadium can do for your company",
              description: "Bring recognition, swag, snacks, gifting, and hosted experiences together with one global partner.",
              primary: { label: "Talk to sales", href: LINKS.sales },
              secondary: { label: "Explore the platform", href: LINKS.platform },
            }}
          >
          <WhiteBox>
            <QuoteSplit
              flush
              reverse
              caption="An extension of your team"
              title="The expertise you need, without the team you’d have to hire"
              description="Program strategy, merchandising, global logistics, and live support all come standard, so your team coordinates less and ships more."
              quote="“I didn’t realize how much mental load came with managing two vendors until it was gone. Now I just go to Stadium.”"
              attribution="Philo-Marie W., Sr. Specialist of Events & Experience"
              graphic={<YourStadiumTeam alt="Your Stadium team: a program strategist, merchandiser, global logistics lead and live support, with a delivery update" />}
              graphicRatio="570 / 586"
            />
            <VerticalTestimonials
              flush
              caption="In good company"
              captionColor="#16171b"
              title="Trusted by 10,000+ companies worldwide"
              logos={PROOF_LOGOS}
              items={[
                { ...BRANDS.workato, image: michellePhoto, title: "Michelle D.", subtitle: "Director of Administrative Operations", text: "Stadium stood out to me because it made global gifting simple, inclusive, scalable, and cost-effective." },
                { ...BRANDS.kentro, image: feliciaPhoto, title: "Felicia W.", subtitle: "Communications Manager", text: "I know I have a trusted partner with Stadium, and I know they’re going to work with me to meet all my needs." },
                { ...BRANDS.isolved, image: nataliePhoto, title: "Natalie A.", subtitle: "Senior Enablement & Engagement Specialist", text: "Stadium is all-encompassing. It’s allowed our team to collaborate. Not just for our internal HR to use, but now we have marketing and sales coming and asking for things to be in our store…" },
              ]}
            />
          </WhiteBox>
          </ImpactClosing>
        }
      >
        <VariableCardGrid
          caption="Why Stadium"
          captionColor="#16171b"
          title="The business case for Stadium"
          description="Bring recognition, swag, snack boxes, gifting, and hosted experiences together with one global partner."
          gridColumns={2}
          narrow
          imageStyle="panel"
          items={[
            { image: caseTime, imageAlt: "Saved this month: 14 hours, with vendor quotes, shipping labels and inventory checks automated", title: "Save Time", description: "Reduce manual work across vendors, tools, and logistics." },
            { image: caseMoney, imageAlt: "Annual vendor spend down from $61,200 to $46,200 with one partner", title: "Save Money", description: "Lower costs by consolidating vendors, contracts, and invoices into one partner." },
            { image: casePeace, imageAlt: "Holiday gifting on track: sourcing, fulfillment, logistics and execution handled by Stadium", title: "Peace of Mind", description: "Rely on Stadium to handle sourcing, fulfillment, logistics, and execution." },
            { image: caseControl, imageAlt: "Company controls set centrally by Admin: team budget, approved brand assets, 3 teams sending", title: "Stay in Control", description: "Centralized control. Decentralized execution." },
          ]}
        />

        <TeamDivider thick />

        <ImageShowcase
          caption="Measurable impact"
          title="$15K Average Customer Savings"
          description="*based on vendor consolidation"
          graphic={<VectorCard src="/cards/the-proof/SavingsReport.svg" alt="Stadium savings report: $15,240 saved, 6 vendors consolidated into 1 partner" width={1276} height={805} />}
        />

        <VariableCardGrid
          caption="Customer results"
          captionColor="#16171b"
          title="See what companies accomplish with Stadium"
          gridColumns={3}
          items={CUSTOMER_RESULTS}
        />

        <ImageShowcase
          caption="Built for complex organizations"
          title="Centralized control. Decentralized execution."
          description="Manage budgets, permissions, and activity centrally while giving teams flexibility to execute."
          graphic={<VectorCard src="/cards/the-proof/CompanyOverview.svg" alt="Stadium company overview: budgets, permissions and brand set centrally, with teams executing within budget" width={1276} height={805} />}
        />

        <SplitFeature
          caption="Real results"
          title="2—4 hours saved per project"
          description="ConstructConnect reduced the time spent manually coordinating pricing and vendors for customer swag projects."
          image={swagProject}
          imageAlt="Customer swag project: instant quote, one partner and live order status, 3.5 hours saved"
        />

        <StatsGrid
          caption="Global infrastructure"
          captionColor="#16171b"
          title="Reach people around the world with less complexity"
          description="Fulfill closer to recipients with less shipping, customs, and logistics to manage."
          statLeft={{}}
          statCenter={{
            caption: "Global Warehousing Network",
            title: "500+",
            text: "“Typically, gifting globally would take a day. Now I can do it in 15 minutes, even for 500+ people.”",
            authorName: "Shaira J.",
            authorTitle: "Apollo",
          }}
          rightTopStat={{ title: "100+", text: "Integrations" }}
          rightBottomStat={{ title: "170+", text: "Countries" }}
        />

        <NumberedCardGrid
          panel
          caption="Built for trust"
          title="Security built into everything we do"
          description="Protect organizational data with enterprise-grade security, privacy, and compliance standards."
          cta={{ label: "Explore Security", href: PLATFORM_ROUTES.security }}
          cards={[
            { title: "SOC 2 TYPE 2", description: "Controls for security, confidentiality, and availability." },
            { title: "Encryption", description: "TLS 1.2/1.3 in transit and AES-256 at rest." },
            { title: "24/7 Monitoring", description: "Continuous monitoring and incident response." },
            { title: "GDPR", description: "Privacy controls designed to support global requirements." },
          ]}
        />
      </ImpactPageShell>
    </>
  );
}
