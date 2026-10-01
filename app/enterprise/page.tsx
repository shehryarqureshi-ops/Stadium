import type { Metadata } from "next";

import ImpactClosing from "@/app/components/common/ImpactClosing";
import LogoBridge from "@/app/components/common/LogoBridge";
import NumberedCardGrid from "@/app/components/common/NumberedCardGrid";
import TeamHero from "@/app/components/common/TeamHero";
import VariableCardGrid from "@/app/components/common/VariableCardGrid";
import ImpactPageShell from "@/app/components/impact/ImpactPageShell";
import { HR_TOOLS, LINKS, PLATFORM_ROUTES } from "@/app/components/impact/shared";

export const metadata: Metadata = {
  title: "Enterprise — The infrastructure enterprises run on | Stadium",
  description: "Teams get the flexibility to run their programs. Your company keeps the oversight it needs.",
};

/* /enterprise — Figma n9SjmDjzB1PeZAYJ5w43fr → 3816:6904. Graphics are
   product mockups with no exported art: image-less cards render placeholders. */

export default function EnterprisePage() {
  return (
    <ImpactPageShell
      hero={
        <TeamHero
          eyebrow="Enterprise-ready"
          title="The infrastructure enterprises run on"
          description="Teams get the flexibility to run their programs. Your company keeps the oversight it needs."
          primaryCta={{ label: "Get started", href: LINKS.sales }}
          secondaryCta={{ label: "Explore the platform", href: LINKS.platform }}
          background="green"
        />
      }
      closing={
        <ImpactClosing
          cta={{
            caption: "Get started",
            title: "Run your programs on infrastructure built for scale",
            description: "Give teams flexibility and keep the oversight your company needs.",
            primary: { label: "Talk to sales", href: LINKS.sales },
            secondary: { label: "Explore the platform", href: LINKS.platform },
          }}
        >
          <VariableCardGrid
            background="transparent"
            caption="Built for trust"
            captionColor="#16171b"
            title="Security built into everything we do"
            gridColumns={2}
            narrow
            cta={{ label: "Explore Security", href: PLATFORM_ROUTES.security }}
            items={[
              { title: "SOC 2 Type 2", description: "Controls for security, confidentiality, and availability." },
              { title: "Encryption", description: "TLS 1.2/1.3 in transit and AES-256 at rest." },
            ]}
          />
        </ImpactClosing>
      }
    >
      <VariableCardGrid
        caption="Centralized control"
        captionColor="#16171b"
        title="Organize your company with Workspaces"
        description="Give teams room to operate independently—while keeping everything organized in one place."
        gridColumns={3}
        items={[
          { title: "Company-Wide Visibility", description: "See activity across every team from one view." },
          { title: "Roles & Permissions", description: "Give users the access they need based on their role and responsibilities." },
          { title: "Brand Control", description: "Keep teams on-brand with approved assets without reviewing every request." },
        ]}
      />

      <NumberedCardGrid
        caption="Budget control"
        title="Control budgets across your organization"
        description="Give teams access to funds while keeping company spend visible and organized."
        cta={{ label: "How it works", href: PLATFORM_ROUTES.wallets }}
        cards={[
          { title: "Allocate Funds", description: "Distribute funds across teams and initiatives." },
          { title: "Organize Budgets", description: "Your inventory lives in our warehouse, with live counts. No closets, no spreadsheets." },
          { title: "Corporate Billing", description: "Open a store, send a kit, or bulk-ship to 170+ countries. People add their own size and address." },
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
        gridColumns={4}
        items={[
          { title: "SSO", description: "Support centralized identity and secure access." },
          { title: "SOC 2 Type 2", description: "Controls for security, confidentiality, and availability." },
          { title: "Encryption", description: "TLS 1.2/1.3 in transit and AES-256 at rest." },
          { title: "24/7 Monitoring", description: "Continuous monitoring and incident response." },
        ]}
      />
    </ImpactPageShell>
  );
}
