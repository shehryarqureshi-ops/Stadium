import type { Metadata } from "next";

import ImpactClosing from "@/app/components/common/ImpactClosing";
import TeamHero from "@/app/components/common/TeamHero";
import VariableCardGrid from "@/app/components/common/VariableCardGrid";
import ImpactPageShell from "@/app/components/impact/ImpactPageShell";
import { LINKS } from "@/app/components/impact/shared";

export const metadata: Metadata = {
  title: "Workspaces — One place to organize how your teams use Stadium",
  description: "Teams use Stadium for their own needs. You keep visibility and control as usage grows.",
};

/* /workspaces — Figma n9SjmDjzB1PeZAYJ5w43fr → 3826:10011. Graphics are
   product mockups with no exported art: image-less cards render placeholders. */

export default function WorkspacesPage() {
  return (
    <ImpactPageShell
      hero={
        <TeamHero
          eyebrow="Workspaces"
          title="One place to organize how your teams use Stadium"
          description="Teams use Stadium for their own needs. You keep visibility and control as usage grows."
          primaryCta={{ label: "Get started", href: LINKS.sales }}
          secondaryCta={{ label: "Explore the platform", href: LINKS.platform }}
          background="green"
        />
      }
      closing={
        <ImpactClosing
          cta={{
            caption: "Built for change",
            title: "Ownership stays clear through every team change",
            description:
              "When people leave or responsibilities shift, company access and resources stay with your organization instead of one individual account.",
            primary: { label: "Talk to sales", href: LINKS.sales },
            secondary: { label: "Explore the platform", href: LINKS.platform },
          }}
        >
          <VariableCardGrid
            background="transparent"
            caption="Personal Workspace"
            captionColor="#16171b"
            title="Your own Workspace for individual work"
            description="Switch to your personal Workspace at any time."
            gridColumns={1}
            items={[{ description: "Personal orders, rewards and saved items stay here, separate from company work." }]}
          />
        </ImpactClosing>
      }
    >
      <VariableCardGrid
        caption="Cross-team collaboration"
        captionColor="#16171b"
        title="One Workspace connects every team"
        description="Multiple teams manage their own programs within the same Workspace."
        gridColumns={3}
        items={[
          { title: "Work Better Together", description: "Collaborate across programs when multiple teams are involved." },
          { title: "Maintain Visibility", description: "Stay up to date on orders, shops, collections, and other activity across teams." },
          { title: "Less Fragmentation", description: "Keep company work connected, even when different people and teams are involved." },
        ]}
      />

      <VariableCardGrid
        caption="Company-wide governance"
        captionColor="#16171b"
        title="Teams get flexibility within company controls"
        description="Access, budgets, and brand standards stay set by the company. Teams get what they need to execute."
        gridColumns={3}
        items={[
          { title: "Roles & Permissions", description: "Each person gets precise access, based on their responsibilities." },
          { title: "Wallets", description: "Funds separate by team or initiative, with full visibility into company spend." },
          { title: "Brand Control", description: "Teams pull approved assets directly from your Asset Library." },
        ]}
      />
    </ImpactPageShell>
  );
}
