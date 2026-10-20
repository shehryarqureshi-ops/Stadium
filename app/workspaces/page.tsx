import type { Metadata } from "next";

import JsonLd from "@/app/components/seo/JsonLd";
import { seoMetadata } from "@/app/lib/seo/metadata";

import ImageShowcase from "@/app/components/common/ImageShowcase";
import ImpactClosing from "@/app/components/common/ImpactClosing";
import TeamHero from "@/app/components/common/TeamHero";
import VariableCardGrid from "@/app/components/common/VariableCardGrid";
import WorkspaceTree from "@/app/components/impact/batch3/WorkspaceTree";
import ImpactPageShell from "@/app/components/impact/ImpactPageShell";
import { LINKS } from "@/app/components/impact/shared";

import brand from "@/public/workspaces-page/brand.png";
import fragmentation from "@/public/workspaces-page/fragmentation.png";
import ownership from "@/public/workspaces-page/ownership.png";
import personal from "@/public/workspaces-page/personal.png";
import roles from "@/public/workspaces-page/roles.png";
import together from "@/public/workspaces-page/together.png";
import visibility from "@/public/workspaces-page/visibility.png";
import wallets from "@/public/workspaces-page/wallets.png";

export const metadata: Metadata = seoMetadata("/workspaces");

/* /workspaces — Figma n9SjmDjzB1PeZAYJ5w43fr → 3826:10011. Photos and mockups
   are 2× exports of the Figma graphic frames (public/workspaces-page/). */

export default function WorkspacesPage() {
  return (
    <>
      <JsonLd path="/workspaces" />
      <ImpactPageShell
        hero={
          <TeamHero
            eyebrow="Workspaces"
            title="One place to organize how your teams use Stadium"
            description="Teams use Stadium for their own needs. You keep visibility and control as usage grows."
            primaryCta={{ label: "Get started", href: LINKS.sales }}
            secondaryCta={{ label: "Explore the platform", href: LINKS.platform }}
            background="canvas"
            visual={<WorkspaceTree />}
            visualLayout="aligned"
            visualMaxWidth="36.25rem"
          />
        }
        closing={
          <ImpactClosing
            cta={{
              caption: "Get started with Workspaces",
              title: "See how Workspaces fit your company",
              description: "Talk with our team about your needs and how you work across teams.",
              primary: { label: "Talk to sales", href: LINKS.sales },
            }}
          >
            <ImageShowcase
              caption="Built for change"
              title="Ownership stays clear through every team change"
              description="When people leave or responsibilities shift, company access and resources stay with your organization instead of one individual account."
              image={ownership}
              imageAlt="Workspace ownership transferred from a departed owner to the Head of People, with wallets, shops and the asset library staying company-owned"
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
          imageFit="cover"
          items={[
            { image: together, imageAlt: "Two colleagues working together on a laptop and packing merchandise", title: "Work Better Together", description: "Collaborate across programs when multiple teams are involved." },
            { image: visibility, imageAlt: "A team member reviewing shop activity on a laptop and monitor", title: "Maintain Visibility", description: "Stay up to date on orders, shops, collections, and other activity across teams." },
            { image: fragmentation, imageAlt: "A team member ordering merchandise at a desk in a shared office", title: "Less Fragmentation", description: "Keep company work connected, even when different people and teams are involved." },
          ]}
        />

        <ImageShowcase
          caption="Personal Workspace"
          title="Your own Workspace for individual work"
          description="Switch to your personal Workspace at any time."
          image={personal}
          imageAlt="Switching from the Acme Corp company Workspace to a personal Workspace with Stadium Points and recent orders"
        />

        <VariableCardGrid
          caption="Company-wide governance"
          captionColor="#16171b"
          title="Teams get flexibility within company controls"
          description="Access, budgets, and brand standards stay set by the company. Teams get what they need to execute."
          gridColumns={3}
          items={[
            { image: roles, imageAlt: "A Manager role with toggles for sending gifts, approving team spend and managing billing", title: "Roles & Permissions", description: "Each person gets precise access, based on their responsibilities." },
            { image: wallets, imageAlt: "Company spend of $82,500 split across Sales Kickoff, Onboarding and Brand Events Wallets", title: "Wallets", description: "Funds separate by team or initiative, with full visibility into company spend." },
            { image: brand, imageAlt: "An approved Asset Library with primary, reversed and mono logos", title: "Brand Control", description: "Teams pull approved assets directly from your Asset Library." },
          ]}
        />
      </ImpactPageShell>
    </>
  );
}
