import type { Metadata } from "next";

import JsonLd from "@/app/components/seo/JsonLd";
import { seoMetadata } from "@/app/lib/seo/metadata";

import TeamsOnStadium from "@/app/components/cards/enterprise/TeamsOnStadium";
import VectorCard from "@/app/components/cards/VectorCard";
import ImageShowcase from "@/app/components/common/ImageShowcase";
import ImpactClosing from "@/app/components/common/ImpactClosing";
import LogoBridge from "@/app/components/common/LogoBridge";
import QuoteSplit from "@/app/components/common/QuoteSplit";
import StatsGrid from "@/app/components/common/StatsGrid";
import StepCards from "@/app/components/common/StepCards";
import TeamHero from "@/app/components/common/TeamHero";
import EnterpriseTiers from "@/app/components/impact/batch3/EnterpriseTiers";
import VariableCardGrid from "@/app/components/common/VariableCardGrid";
import WhiteBox from "@/app/components/common/WhiteBox";
import ImpactPageShell from "@/app/components/impact/ImpactPageShell";
import { HR_TOOLS, LINKS, PLATFORM_ROUTES } from "@/app/components/impact/shared";

import laurenBerry from "@/public/enterprise/lauren.jpg";
import secMonitoring from "@/public/enterprise/security/monitoring.png";
import supportFulfillment from "@/public/enterprise/support/fulfillment.png";
import supportLogistics from "@/public/enterprise/support/logistics.png";
import supportOnboarding from "@/public/enterprise/support/onboarding.png";
import supportSourcing from "@/public/enterprise/support/sourcing.png";
import wsBrand from "@/public/enterprise/workspaces/brand.png";
import wsRoles from "@/public/enterprise/workspaces/roles.png";
import wsVisibility from "@/public/enterprise/workspaces/visibility.png";

export const metadata: Metadata = seoMetadata("/enterprise");

/* /enterprise — Figma n9SjmDjzB1PeZAYJ5w43fr → 3816:6904. Mockups and photos
   are 2× exports of the Figma graphic frames (public/enterprise/). The
   photo cards are cropped to the 250-high image slot (shadow bleed removed). */

export default function EnterprisePage() {
  return (
    <>
      <JsonLd path="/enterprise" />
      <ImpactPageShell
        hero={
          <TeamHero
            eyebrow="Enterprise-ready"
            title="The infrastructure enterprises run on"
            description="Teams get the flexibility to run their programs. Your company keeps the oversight it needs."
            primaryCta={{ label: "Talk to sales", href: LINKS.sales }}
            secondaryCta={{ label: "Explore the platform", href: LINKS.platform }}
            background="canvas"
            visual={<EnterpriseTiers />}
            visualLayout="aligned"
            visualMaxWidth="36.25rem"
          />
        }
        closing={
          <ImpactClosing
            cta={{
              caption: "Talk to our team",
              title: "See how Stadium fits your requirements",
              description: "Talk with our team about what your organization needs from Stadium.",
              primary: { label: "Talk to sales", href: LINKS.sales },
            }}
          >
            <WhiteBox>
              <ImageShowcase
                flush
                caption="Measurable impact"
                title="$15K Average Customer Savings"
                description="One partner for recognition, swag, gifting, and more. Lower costs, less administrative work."
                graphic={<VectorCard src="/cards/enterprise/SavingsReport.svg" alt="Stadium billing: one October invoice of $18,420 across four programs, with 24 hours of admin time saved each month" width={1276} height={805} />}
                footnote="*Based on vendor consolidation"
              />
              <QuoteSplit
                flush
                caption="Company-wide adoption"
                title="Bring more teams onto one platform"
                quote="“Stadium is all-encompassing. It’s allowed our team to collaborate. Not just for our internal HR to use, but now we have marketing and sales coming and asking for things to be in our store…”"
                attribution="Natalie A., Senior Enablement & Engagement Specialist"
                graphic={<TeamsOnStadium />}
                graphicRatio="570 / 547"
              />
            </WhiteBox>
          </ImpactClosing>
        }
      >
        <VariableCardGrid
          caption="Centralized control"
          captionColor="#16171b"
          title="Organize your company with Workspaces"
          description="Give teams room to operate independently—while keeping everything organized in one place."
          gridColumns={3}
          imageFit="cover"
          items={[
            { image: wsVisibility, imageAlt: "A manager presenting an organization dashboard to her team", title: "Company-Wide Visibility", description: "See activity across every team from one view." },
            { image: wsRoles, imageAlt: "Two colleagues reviewing roles and permissions on a laptop", title: "Roles & Permissions", description: "Give users the access they need based on their role and responsibilities." },
            { image: wsBrand, imageAlt: "A team member reviewing approved brand merchandise on a laptop", title: "Brand Control", description: "Keep teams on-brand with approved assets without reviewing every request." },
          ]}
        />

        <StepCards
          caption="Budget control"
          captionColor="#16171b"
          title="Control budgets across your organization"
          description="Give teams access to funds while keeping company spend visible and organized."
          items={[
            { title: "Allocate Funds", description: "Distribute funds across teams and initiatives.", content: <VectorCard src="/cards/enterprise/BudgetAllocate.svg" alt="Allocating a $120,000 Q4 budget across Sales, Marketing and People" width={265} height={332} />, desktopVisualWidth: 265 },
            { title: "Organize Budgets", description: "Create separate Wallets and reallocate funds as needs change.", content: <VectorCard src="/cards/enterprise/BudgetOrganize.svg" alt="Three team Wallets, with $2,000 moved from Events to Onboarding" width={265} height={332} />, desktopVisualWidth: 265 },
            { title: "Corporate Billing", description: "Simplify purchasing with a single, centralized invoice.", content: <VectorCard src="/cards/enterprise/BudgetBilling.svg" alt="A consolidated October invoice of $48,250 across four teams" width={265} height={332} />, desktopVisualWidth: 265 },
          ]}
        />

        <LogoBridge
          caption="Connected systems"
          title="Connect Stadium to the systems you already use"
          description="Keep data current and automate recurring workflows."
          logos={HR_TOOLS}
          cta={{ label: "Explore integrations", href: PLATFORM_ROUTES.integrations }}
        />

        <VariableCardGrid
          caption="Enterprise security"
          captionColor="#16171b"
          title="Meet enterprise security requirements"
          description="Identity, security, privacy, and compliance safeguards protect your data and control access."
          gridColumns={3}
          items={[
            { graphic: <VectorCard src="/cards/enterprise/SecSso.svg" alt="Sign in to a Stadium Workspace with SSO" width={376} height={260} />, title: "SSO", description: "Support centralized identity and secure access." },
            { graphic: <VectorCard src="/cards/enterprise/SecSoc2.svg" alt="SOC 2 Type II audit report: security, confidentiality and availability passed" width={376} height={260} />, title: "SOC 2 Type 2", description: "Controls for security, confidentiality, and availability." },
            { graphic: <VectorCard src="/cards/enterprise/SecEncryption.svg" alt="A secure connection using TLS 1.2 / 1.3 in transit and AES-256 at rest" width={376} height={260} />, title: "Encryption", description: "TLS 1.2/1.3 in transit and AES-256 at rest." },
            { image: secMonitoring, imageAlt: "All systems operational with 99.99% uptime and 24/7 monitoring", title: "24/7 Monitoring", description: "Continuous monitoring and incident response." },
            { graphic: <VectorCard src="/cards/enterprise/SecGdpr.svg" alt="A completed privacy request to delete personal data" width={376} height={260} />, title: "GDPR", description: "Privacy controls designed to support global requirements." },
          ]}
        />

        <StatsGrid
          caption="Global scale"
          captionColor="#16171b"
          title="Support your organization around the world"
          description="Fulfill locally with less international shipping, customs, and logistics to manage."
          statLeft={{ title: "10,000+", text: "Companies Trust Stadium", numberFirst: true }}
          statCenter={{
            caption: "Global Warehousing Network",
            title: "500+",
            text: "“Typically, gifting globally would take a day. Now I can do it in 15 minutes, even for 500+ people.”",
            authorImage: laurenBerry,
            authorName: "Lauren Berry",
            authorTitle: "Apollo",
          }}
          rightTopStat={{ title: "100+", text: "Integrations" }}
          rightBottomStat={{ title: "170+", text: "Countries" }}
        />

        <VariableCardGrid
          caption="Expert support"
          captionColor="#16171b"
          title="The team behind your team"
          description="You get hands-on support from people who know how to execute your programs, start to finish."
          gridColumns={2}
          narrow
          imageFit="cover"
          items={[
            { image: supportSourcing, imageAlt: "Two colleagues choosing a branded bottle", title: "Product Sourcing", description: "Give teams more choice from 25,000+ products without adding more suppliers." },
            { image: supportFulfillment, imageAlt: "A fulfillment specialist checking an order against a packing list", title: "Global Fulfillment", description: "Fulfill globally without coordinating partners across regions." },
            { image: supportLogistics, imageAlt: "Two logistics managers reviewing a shipment on screen", title: "Logistics Management", description: "Let Stadium handle the logistics from fulfillment through delivery." },
            { image: supportOnboarding, imageAlt: "Two colleagues working through onboarding on a laptop", title: "Onboarding & Support", description: "Get expert guidance from onboarding through ongoing execution." },
          ]}
        />
      </ImpactPageShell>
    </>
  );
}
