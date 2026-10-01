import type { Metadata } from "next";

import NumberedCardGrid from "@/app/components/common/NumberedCardGrid";
import NumberedOfferings from "@/app/components/common/NumberedOfferings";
import QuoteSplit from "@/app/components/common/QuoteSplit";
import ImpactClosing from "@/app/components/common/ImpactClosing";
import TeamHero from "@/app/components/common/TeamHero";
import VariableCardGrid from "@/app/components/common/VariableCardGrid";
import ImpactPageShell, { TeamDivider } from "@/app/components/impact/ImpactPageShell";
import { ENGAGE_OFFERINGS, LINKS, PLATFORM_ROUTES } from "@/app/components/impact/shared";

export const metadata: Metadata = {
  title: "The Proof — Proven results, at every scale | Stadium",
  description:
    "Companies use Stadium to cut manual work, engage employees and customers across every team, and expand into new programs without adding headcount.",
};

/* /the-proof — Figma n9SjmDjzB1PeZAYJ5w43fr → 3815:4571. Product mockups
   have no exported art: cards without an image render the placeholder slot. */

export default function TheProofPage() {
  return (
    <ImpactPageShell
      hero={
        <TeamHero
          eyebrow="The Proof"
          title="Proven results, at every scale"
          description="Companies use Stadium to cut manual work, engage employees and customers across every team, and expand into new programs without adding headcount."
          primaryCta={{ label: "Get started", href: LINKS.sales }}
          background="green"
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
          <VariableCardGrid
            background="transparent"
            caption="Customer results"
            captionColor="#16171b"
            title="See what companies accomplish with Stadium"
            gridColumns={3}
            items={[
              { eyebrow: "EVERFLOW", title: "Reduced monthly swag administration from 8–10 hours to 1–2 hours", description: "Expanded recognition without adding administrative overhead." },
              { eyebrow: "KEYFACTOR", title: "Reached 1,000 recognition posts in one month", description: "Recognition scaled globally while automations reduced manual work around onboarding, anniversaries, and other employee moments." },
              { eyebrow: "OCTUS", title: "Turned leadership hesitation into company-wide adoption", description: "Employee swag expanded into onboarding, recognition, learning, customer engagement, VIP gifting, and events." },
            ]}
          />
        </ImpactClosing>
      }
    >
      <NumberedCardGrid
        caption="The business case"
        title="The business case for Stadium"
        description="Bring recognition, swag, snack boxes, gifting, and hosted experiences together with one global partner."
        cards={[
          { title: "Reduce manual work", description: "Reduce manual work across vendors, tools, and logistics." },
          { title: "Lower costs", description: "Lower costs by consolidating vendors, contracts, and invoices into one partner." },
          { title: "Peace of Mind", description: "Rely on Stadium to handle sourcing, fulfillment, logistics, and execution." },
          { title: "Stay in Control", description: "Centralized control. Decentralized execution." },
        ]}
      />

      <TeamDivider thick />

      <VariableCardGrid
        caption="Measurable impact"
        captionColor="#16171b"
        title="Savings you can see"
        description="Consolidate six vendors into one partner and track what you saved in a single report."
        gridColumns={1}
        items={[{ description: "Savings report: 6 vendors consolidated into 1 partner with Stadium." }]}
      />

      <VariableCardGrid
        caption="Customer results"
        captionColor="#16171b"
        title="See what companies accomplish with Stadium"
        gridColumns={3}
        items={[
          { eyebrow: "EVERFLOW", title: "Reduced monthly swag administration from 8–10 hours to 1–2 hours", description: "Expanded recognition without adding administrative overhead." },
          { eyebrow: "KEYFACTOR", title: "Reached 1,000 recognition posts in one month", description: "Recognition scaled globally while automations reduced manual work around onboarding, anniversaries, and other employee moments." },
          { eyebrow: "OCTUS", title: "Turned leadership hesitation into company-wide adoption", description: "Employee swag expanded into onboarding, recognition, learning, customer engagement, VIP gifting, and events." },
        ]}
      />

      <VariableCardGrid
        caption="Built for complex organizations"
        captionColor="#16171b"
        title="Centralized control. Decentralized execution."
        description="Manage budgets, permissions, and activity centrally while giving teams flexibility to execute."
        gridColumns={1}
        items={[{ description: "Company overview: budgets, permissions, and brand set centrally; teams execute within budget." }]}
      />

      <QuoteSplit
        caption="Real results"
        title="One company, one partner"
        quote="ConstructConnect reduced the time spent manually coordinating pricing and vendors for customer swag projects."
        attribution="ConstructConnect"
      />

      <NumberedCardGrid
        caption="Global infrastructure"
        title="Reach people around the world with less complexity"
        description="Fulfill closer to recipients with less shipping, customs, and logistics to manage."
        cards={[
          { title: "500+", description: "Global Warehousing Network" },
          { title: "100+", description: "Integrations" },
          { title: "170+", description: "Countries" },
        ]}
      />

      <NumberedCardGrid
        caption="Built for trust"
        title="Security built into everything we do"
        description="Protect organizational data with enterprise-grade security, privacy, and compliance standards."
        cta={{ label: "Explore Security", href: PLATFORM_ROUTES.security }}
        cards={[
          { title: "SOC 2 Type 2", description: "Controls for security, confidentiality, and availability." },
          { title: "Encryption", description: "TLS 1.2/1.3 in transit and AES-256 at rest." },
          { title: "24/7 Monitoring", description: "Continuous monitoring and incident response." },
          { title: "GDPR", description: "Privacy controls designed to support global requirements." },
        ]}
      />

      <NumberedOfferings
        caption="Employee engagement"
        title="One platform. More ways to engage your people."
        description="Use Stadium across recognition, swag, snacks, and gifting as your employee programs evolve."
        items={ENGAGE_OFFERINGS}
      />
    </ImpactPageShell>
  );
}
