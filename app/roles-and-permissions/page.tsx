import type { Metadata } from "next";

import ImageShowcase from "@/app/components/common/ImageShowcase";
import ImpactClosing from "@/app/components/common/ImpactClosing";
import LogoBridge from "@/app/components/common/LogoBridge";
import NumberedCardGrid from "@/app/components/common/NumberedCardGrid";
import SplitFeature from "@/app/components/common/SplitFeature";
import TeamHero from "@/app/components/common/TeamHero";
import VariableCardGrid from "@/app/components/common/VariableCardGrid";
import ImpactPageShell from "@/app/components/impact/ImpactPageShell";
import { HR_TOOLS, LINKS, PLATFORM_ROUTES } from "@/app/components/impact/shared";

import adjust from "@/public/roles-and-permissions/granular-adjust.png";
import bottlenecks from "@/public/roles-and-permissions/granular-bottlenecks.png";
import precise from "@/public/roles-and-permissions/granular-access.png";
import people from "@/public/roles-and-permissions/people-admin.png";
import walletAccess from "@/public/roles-and-permissions/wallet-access.png";

export const metadata: Metadata = {
  title: "Roles & Permissions — Everyone gets the access they need | Stadium",
  description:
    "Distribute responsibility across your company while controlling what each person can access and manage.",
};

/* /roles-and-permissions — Figma n9SjmDjzB1PeZAYJ5w43fr → 3826:14438. */

export default function RolesAndPermissionsPage() {
  return (
    <ImpactPageShell
      hero={
        <TeamHero
          eyebrow="Roles & Permissions"
          title="Everyone gets the access they need–and nothing more"
          description="Distribute responsibility across your company while controlling what each person can access and manage."
          primaryCta={{ label: "Talk to sales", href: LINKS.sales }}
          secondaryCta={{ label: "Explore the platform", href: LINKS.platform }}
          background="green"
        />
      }
      closing={
        <ImpactClosing
          cta={{
            caption: "Roles & Permissions",
            title: "See how Workspaces support your access needs",
            description: "Talk with our team about roles, permissions, and governance across your company.",
            primary: { label: "Talk to sales", href: LINKS.sales },
          }}
        >
          <LogoBridge
            caption="Connected access"
            title="Connect with the systems your company already uses"
            description="Stadium connects into your existing identity, people, and technology ecosystem."
            logos={HR_TOOLS}
            cta={{ label: "Explore integrations", href: PLATFORM_ROUTES.integrations }}
          >
            <VariableCardGrid
              bare
              background="transparent"
              media={false}
              gridColumns={3}
              items={[
                { title: "SSO", description: "Secure access through your company identity provider." },
                { title: "HRIS + ATS", description: "Employee data, synced through supported integrations." },
                { title: "API Access", description: "A direct line into your existing systems and workflows." },
              ]}
            />
          </LogoBridge>
        </ImpactClosing>
      }
    >
      <NumberedCardGrid
        caption="Access by role"
        title="A role for every way people participate"
        description="Owners, collaborators, members, and guests each have a different level of access to the Workspace."
        cta={{ label: "Explore Workspaces", href: PLATFORM_ROUTES.workspaces }}
        highlight={1}
        cards={[
          { title: "Owner", description: "Full control over the Workspace." },
          { title: "Collaborator", description: "Configurable access based on assigned permissions." },
          { title: "Member", description: "Participate in programs, redeem gifts, and track their own activity." },
          { title: "Guest", description: "Receives gifts. No Workspace access needed." },
        ]}
      />

      <VariableCardGrid
        caption="Granular permissions"
        captionColor="#16171b"
        title="Fine-tune access for each collaborator"
        description="Each collaborator gets defined access to what they can use, create, and manage."
        gridColumns={3}
        items={[
          { image: precise, imageAlt: "A member's access list with Billing & invoices locked", title: "Give Precise Access", description: "Each person accesses exactly what their role requires." },
          { image: adjust, imageAlt: "A role change from Member to Manager adding approval and Wallet access", title: "Adjust As Needed", description: "Permissions update as responsibilities change." },
          { image: bottlenecks, imageAlt: "An order placed within a Wallet limit with no approval needed", title: "Fewer Bottlenecks", description: "Each collaborator acts within their own access. No waiting on approval." },
        ]}
      />

      <SplitFeature
        reverse
        caption="Spending control"
        title="Control who can access company funds"
        description="The right people get Wallet access. Company spend stays visible."
        cta={{ label: "Explore Wallets", href: PLATFORM_ROUTES.wallets }}
        image={walletAccess}
        imageAlt="Marketing Wallet showing who has access and company spend"
      />

      <ImageShowcase
        caption="Members + guests"
        title="Participation stays simple. Access stays limited."
        description="Members participate in the Workspace. Guests receive gifts, with no visibility into company information."
        image={people}
        imageAlt="Stadium People page comparing what members and guests can access"
      />
    </ImpactPageShell>
  );
}
