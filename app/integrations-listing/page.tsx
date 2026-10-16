import type { Metadata } from "next";

import ImpactClosing from "@/app/components/common/ImpactClosing";
import IntegrationsDirectory from "@/app/components/common/IntegrationsDirectory";
import TeamHero from "@/app/components/common/TeamHero";
import ImpactPageShell from "@/app/components/impact/ImpactPageShell";
import { LINKS } from "@/app/components/impact/shared";
import { INTEGRATION_FILTERS, INTEGRATIONS } from "@/app/data/integrationsDirectory";

/* /integrations-listing — mirrors the live bystadium.com/integrations-listing
   (hero → All / HRIS / ATS / CRM directory → "Have a question?"), built from
   the shared TeamHero + IntegrationsDirectory + ImpactClosing. Not in the SEO
   sheet, so metadata is set inline. */
export const metadata: Metadata = {
  title: "Stadium Integrations: HRIS, ATS & CRM Directory",
  description:
    "Browse every HRIS, ATS, and CRM integration Stadium connects to, from Workday and BambooHR to Greenhouse and Salesforce.",
  alternates: { canonical: "/integrations-listing" },
};

export default function IntegrationsListingPage() {
  return (
    <ImpactPageShell
      hero={
        <TeamHero
          eyebrow="Integrations"
          title="Explore our integrations"
          description="Connect Stadium to the HRIS, ATS, and CRM your teams already use."
          primaryCta={{ label: "Browse integrations", href: "#directory" }}
          secondaryCta={{ label: "Talk to sales", href: LINKS.sales }}
          background="canvas"
        />
      }
      closing={
        <ImpactClosing
          cta={{
            caption: "Get connected",
            title: "Have a question?",
            description: "We’re here to help! Reach out, and we’ll help you get set up.",
            primary: { label: "Talk to sales", href: LINKS.sales },
            secondary: { label: "Contact us", href: "https://help.bystadium.com/hc/en-us/requests/new?ticket_form_id=25244730714391" },
          }}
        >
          {null}
        </ImpactClosing>
      }
    >
      <div id="directory" className="scroll-mt-24">
        <IntegrationsDirectory
          caption={`${INTEGRATIONS.length} integrations`}
          title="Connect the tools you already rely on"
          description="Filter by HRIS, ATS, or CRM, or search for your system by name."
          filters={INTEGRATION_FILTERS}
          items={INTEGRATIONS}
        />
      </div>
    </ImpactPageShell>
  );
}
