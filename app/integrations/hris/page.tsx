import type { Metadata } from "next";

import JsonLd from "@/app/components/seo/JsonLd";
import { seoMetadata } from "@/app/lib/seo/metadata";

import ImageShowcase from "@/app/components/common/ImageShowcase";
import ImpactClosing from "@/app/components/common/ImpactClosing";
import LogoBridge from "@/app/components/common/LogoBridge";
import QuoteSplit from "@/app/components/common/QuoteSplit";
import SplitFeature from "@/app/components/common/SplitFeature";
import StepCards from "@/app/components/common/StepCards";
import TeamHero from "@/app/components/common/TeamHero";
import HrisMoments from "@/app/components/impact/batch3/HrisMoments";
import ImpactPageShell from "@/app/components/impact/ImpactPageShell";
import { HR_TOOLS, LINKS, PLATFORM_ROUTES } from "@/app/components/impact/shared";
import VectorCard from "@/app/components/cards/VectorCard";
import DataSync from "@/app/components/cards/integrations-hris/DataSync";


export const metadata: Metadata = seoMetadata("/integrations/hris");

/* /integrations/hris — Figma n9SjmDjzB1PeZAYJ5w43fr → 3866:2739. */

export default function HrisPage() {
  return (
    <>
      <JsonLd path="/integrations/hris" />
      <ImpactPageShell
        hero={
          <TeamHero
            eyebrow="HRIS & ATS Integrations"
            title="Run employee programs without the manual upkeep"
            description="Use the data already in your HRIS or ATS to run onboarding, birthdays, anniversaries, and more."
            primaryCta={{ label: "Talk to sales", href: LINKS.sales }}
            secondaryCta={{ label: "Explore integrations", href: PLATFORM_ROUTES.integrations }}
            background="canvas"
            visual={<HrisMoments />}
            visualLayout="aligned"
            visualMaxWidth="36.25rem"
          />
        }
        closing={
          <ImpactClosing
            cta={{
              caption: "Get started",
              title: "Put recurring employee programs on autopilot",
              description: "Reduce the tracking, updates, and manual work that comes with running programs at scale.",
              primary: { label: "Talk to sales", href: LINKS.sales },
            }}
          >
            <QuoteSplit
              caption="Customer story"
              title="See how Kentro took the manual work out of employee gifting"
              quote="“It’s been super seamless and hands-off. All I have to do is go in and create a new automation. I don’t have to ask for a distribution list or ask for sizes.”"
              attribution="Communications Manager, Kentro"
              cta={{ label: "Read case study", href: PLATFORM_ROUTES.proof }}
              graphicRatio="570 / 617"
              graphic={<VectorCard src="/cards/integrations-hris/CaseStudy.svg" alt="A November calendar and a Work anniversaries automation synced from the HRIS" width={570} height={617} />}
            />
            <LogoBridge
              caption="More ways to connect"
              title="Explore the broader integration ecosystem"
              description="Use Zapier, webhooks, APIs, and integrations across your tech stack."
              logos={HR_TOOLS}
            />
          </ImpactClosing>
        }
      >
        <ImageShowcase
          caption="Supported platforms"
          title="Connect the HR systems you already use"
          description="Bring employee and candidate data directly into Stadium."
          graphic={<VectorCard src="/cards/integrations-hris/HrAdmin.svg" alt="Stadium Integrations page showing synced employees and candidates and connectable HR platforms" width={1240} height={767} />}
        />

        <SplitFeature
          reverse
          caption="Automated programs"
          title="Spend less time tracking candidate and employee milestones"
          description="Automatically send gifts for interviews, onboarding, birthdays, and work anniversaries, so you never miss a moment."
          graphic={<VectorCard src="/cards/integrations-hris/AutomatedPrograms.svg" alt="An October calendar with welcome kits, birthdays, and anniversaries sent automatically" width={580} height={450} />}
        />

        <SplitFeature
          caption="Data sync"
          title="Stop maintaining employee lists by hand"
          description="Employee data automatically stays current as details change in your HR system."
          graphic={<DataSync alt="An employee record with job title updated from the HRIS" />}
        />

        <StepCards
          caption="How it works"
          captionColor="#16171b"
          title="Get connected in three steps"
          description="Start running programs from your HR data with a straightforward setup."
          items={[
            {
              title: <>Connect your<br />HRIS or ATS</>,
              description: "Select your HR platform and link it to Stadium.",
              content: <VectorCard src="/cards/integrations-hris/StepConnect.svg" alt="Selecting an HR platform to connect" width={265} height={332} />,
              desktopVisualWidth: 265,
            },
            { title: <>Set Up<br />Automation</> },
            { title: <>Customize<br />Details</> },
          ]}
        />
      </ImpactPageShell>
    </>
  );
}
