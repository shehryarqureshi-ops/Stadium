import type { Metadata } from "next";

import HelpCard from "@/app/components/common/HelpCard";
import ImpactClosing from "@/app/components/common/ImpactClosing";
import IntegrationsDirectory from "@/app/components/common/IntegrationsDirectory";
import QuoteSplit from "@/app/components/common/QuoteSplit";
import TeamHero from "@/app/components/common/TeamHero";
import VariableCardGrid from "@/app/components/common/VariableCardGrid";
import ImpactPageShell from "@/app/components/impact/ImpactPageShell";
import { LINKS, PLATFORM_ROUTES } from "@/app/components/impact/shared";

import workExtension from "@/public/integrations/work-extension.png";
import workSlack from "@/public/integrations/work-slack.png";
import workflow from "@/public/integrations/workflow.png";

export const metadata: Metadata = {
  title: "Integrations — Connect Stadium to your tech stack | Stadium",
  description: "Stadium automates programs, reduces manual work, and keeps your teams and systems in sync.",
};

/* /integrations — Figma n9SjmDjzB1PeZAYJ5w43fr → 3866:1921. */

const TOOLS = [
  { name: "LinkedIn", logo: { src: "/impact/hr/logos/linkedin.svg", width: 45, height: 45 } },
  { name: "Slack", logo: { src: "/impact/hr/logos/slack.svg", width: 45, height: 45 } },
  { name: "Gmail", logo: { src: "/impact/hr/logos/gmail.svg", width: 58.5, height: 45 } },
];

export default function IntegrationsPage() {
  return (
    <ImpactPageShell
      hero={
        <TeamHero
          eyebrow="Integrations"
          title="Connect Stadium to your tech stack, your way"
          description="Stadium automates programs, reduces manual work, and keeps your teams and systems in sync."
          primaryCta={{ label: "Explore integrations", href: "#directory" }}
          secondaryCta={{ label: "Talk to sales", href: LINKS.sales }}
          background="green"
        />
      }
      closing={
        <ImpactClosing
          cta={{
            caption: "Get connected",
            title: "Ready to automate more with Stadium?",
            description: "Share what you want to integrate. We’ll build the plan together.",
            primary: { label: "Talk to sales", href: LINKS.sales },
          }}
        >
          <VariableCardGrid
            background="transparent"
            media={false}
            caption="Flexible connections"
            captionColor="#16171b"
            title="Build the connections your business needs"
            description="APIs, webhooks, and Zapier go beyond out-of-the-box integrations."
            gridColumns={3}
            items={[
              { title: "API", description: "Build Stadium into your own systems and experiences.", link: { label: "Learn more", href: PLATFORM_ROUTES.api } },
              { title: "Webhooks", description: "Trigger custom workflows between Stadium and your systems.", link: { label: "Learn more", href: PLATFORM_ROUTES.webhooks } },
              { title: "Zapier", description: "Connect Stadium with other apps and automate workflows without custom development.", link: { label: "Learn more", href: PLATFORM_ROUTES.zapier } },
            ]}
          />
          <HelpCard
            caption="See integrations in action"
            title="Need help getting connected?"
            description="Our team can help you choose and set up the right integration for your needs."
            cta={{ label: "Contact us", href: LINKS.sales }}
          />
        </ImpactClosing>
      }
    >
      <div id="directory" className="scroll-mt-24">
        <IntegrationsDirectory
          caption="100+ integrations"
          title="Connect the tools you already rely on"
          description="Every team can find the right integrations for how they work."
          filters={[
            { label: "All integrations", value: "all" },
            { label: "HRIS", value: "hris" },
            { label: "ATS", value: "ats" },
            { label: "CRM", value: "crm" },
          ]}
          items={TOOLS.map((t) => ({ ...t, categories: ["all"] }))}
          cta={{ label: "Explore all integrations", href: PLATFORM_ROUTES.hris }}
        />
      </div>

      <QuoteSplit
        caption="Workflow automations"
        title="Turn everyday triggers into action"
        description="Connected triggers keep programs moving on their own."
        quote="“Integrating our HRIS has been a huge help–all of the addresses are already loaded there. As soon as employees are added to UKG, they get an email to redeem their new hire kit. Automating onboarding gifting has been a huge win.”"
        attribution="Communications Manager, Keyfactor"
        cta={{ label: "Read case study", href: PLATFORM_ROUTES.proof }}
        image={workflow}
        imageAlt="Automation flow: a new hire is added in UKG, a welcome kit is sent, and it is delivered before day one"
      />

      <VariableCardGrid
        caption="Built into your workday"
        captionColor="#16171b"
        title="Do more without switching tools"
        description="Recognize teammates and send gifts with fewer steps—right from the tools you already use."
        gridColumns={2}
        narrow
        items={[
          { image: workSlack, imageAlt: "A Stadium kudos message in a Slack channel", title: "Kudos in Slack & Microsoft Teams", description: "Great work gets recognized the moment it happens." },
          { image: workExtension, imageAlt: "The Stadium browser extension sending a gift from a meeting page", title: "Stadium Browser Extension", description: "Gifts go out from any webpage, no need to open Stadium.", link: { label: "Learn more", href: PLATFORM_ROUTES.browserExtension } },
        ]}
      />
    </ImpactPageShell>
  );
}
