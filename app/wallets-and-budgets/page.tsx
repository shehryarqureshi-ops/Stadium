import type { Metadata } from "next";

import ImageShowcase from "@/app/components/common/ImageShowcase";
import ImpactClosing from "@/app/components/common/ImpactClosing";
import StepCards from "@/app/components/common/StepCards";
import TeamHero from "@/app/components/common/TeamHero";
import VariableCardGrid from "@/app/components/common/VariableCardGrid";
import ImpactPageShell from "@/app/components/impact/ImpactPageShell";
import { LINKS, PLATFORM_ROUTES } from "@/app/components/impact/shared";

import autoRefill from "@/public/wallets-and-budgets/auto-refill.png";
import budgetCentral from "@/public/wallets-and-budgets/budget-central.png";
import budgetPoints from "@/public/wallets-and-budgets/budget-points.png";
import budgetShared from "@/public/wallets-and-budgets/budget-shared.png";
import lowFunds from "@/public/wallets-and-budgets/low-funds.png";
import stepLimits from "@/public/wallets-and-budgets/step-limits.png";
import unusedExpiration from "@/public/wallets-and-budgets/unused-expiration.png";
import unusedReclaim from "@/public/wallets-and-budgets/unused-reclaim.png";
import unusedTransfer from "@/public/wallets-and-budgets/unused-transfer.png";
import visBalances from "@/public/wallets-and-budgets/visibility-balances.png";
import visBonus from "@/public/wallets-and-budgets/visibility-bonus.png";
import visFunding from "@/public/wallets-and-budgets/visibility-funding.png";
import visTransactions from "@/public/wallets-and-budgets/visibility-transactions.png";
import workspaceWallet from "@/public/wallets-and-budgets/workspace-wallet.png";

export const metadata: Metadata = {
  title: "Wallets & Budgets — Give teams a budget, not the company card | Stadium",
  description: "Fund programs in advance and set spending limits before money moves.",
};

/* /wallets-and-budgets — Figma n9SjmDjzB1PeZAYJ5w43fr → 3826:18438. */

export default function WalletsAndBudgetsPage() {
  return (
    <ImpactPageShell
      hero={
        <TeamHero
          eyebrow="Wallets & Budgets"
          title="Give teams a budget, not the company card"
          description="Fund programs in advance and set spending limits before money moves."
          primaryCta={{ label: "Talk to sales", href: LINKS.sales }}
          secondaryCta={{ label: "Explore the platform", href: LINKS.platform }}
          background="green"
        />
      }
      closing={
        <ImpactClosing
          cta={{
            caption: "Workspaces",
            title: "Manage teams and budgets within one Workspace",
            description: "Keep access, budgets, and company activity organized as more teams use Stadium.",
            primary: { label: "Talk to sales", href: LINKS.sales },
          }}
        >
          <VariableCardGrid
            background="transparent"
            caption="Budget flexibility"
            captionColor="#16171b"
            title="Put unused funds back to work"
            description="Available funds stay useful as people, budgets, and priorities change."
            gridColumns={3}
            items={[
              { image: unusedExpiration, imageAlt: "Stadium Points that never expire", title: "No Expiration", description: "Funds and Stadium Points don’t expire." },
              { image: unusedTransfer, imageAlt: "Transferring a balance between two Wallets", title: "Transfer Balances", description: "Balances move between eligible Wallets when needs change." },
              { image: unusedReclaim, imageAlt: "Unspent allocation returning to the available pool", title: "Reclaim Allocations", description: "Remaining allocations return to the available pool when someone leaves." },
            ]}
          />
          <VariableCardGrid
            background="transparent"
            caption="Spend visibility"
            captionColor="#16171b"
            title="See where company funds are going"
            description="Finance gets visibility into available balances, allocations, and transactions across Wallets."
            gridColumns={2}
            narrow
            items={[
              { image: visBalances, imageAlt: "Company Wallet showing available, allocated, and spent funds", title: "Track Balances", description: "See how much is available, allocated, and spent." },
              { image: visTransactions, imageAlt: "A list of orders and funds added with invoices", title: "Review Transactions", description: "See how funds have been used and download invoices anytime." },
              { image: visFunding, imageAlt: "Choosing a payment method to add funds", title: "Funding Options", description: "Add funds through supported payment methods." },
              { image: visBonus, imageAlt: "A 5% bonus on a $10,000 ACH deposit", title: "Make your budget go further", description: "Get 5% in bonus funds when you add $10,000+ via ACH." },
            ]}
          />
        </ImpactClosing>
      }
    >
      <VariableCardGrid
        caption="Budget management"
        captionColor="#16171b"
        title="Keep budgets organized and under control"
        description="Manage company funds, give teams access to what they need, and track spending from one place."
        gridColumns={3}
        cta={{ label: "Explore Workspaces", href: PLATFORM_ROUTES.workspaces }}
        items={[
          { image: budgetCentral, imageAlt: "Workspace Wallet with an available balance and owner", title: "Centralized Budgets", description: "Keep company funds in one place, with clear ownership and visibility over available balances." },
          { image: budgetShared, imageAlt: "A shared Wallet with the people and teams who can spend", title: "Flexible Team Access", description: "Give specific people or teams access to designated budgets, with control over who can spend." },
          { image: budgetPoints, imageAlt: "A personal Wallet with Stadium Points and shop points", title: "Points Without Admin", description: "Give employees points they can redeem across Stadium Shops, while balances stay organized automatically." },
        ]}
      />

      <StepCards
        caption="Control before spend"
        captionColor="#16171b"
        title="Set limits, stay in control"
        description="Shared Wallets allocate specific amounts so people can spend within budgets you set:"
        items={[
          {
            title: <>Set Clear<br />Limits</>,
            description: "Set how much each person has available to spend.",
            image: stepLimits,
            imageAlt: "Setting a monthly spending limit for a team member",
            desktopVisualWidth: 265,
          },
          { title: <>Protect Unallocated<br />Funds</> },
          { title: <>Work Within<br />Budget</> },
        ]}
      />

      <ImageShowcase
        caption="Centralized funding"
        title="Fund more from one place"
        description="Use Wallet funds wherever they’re needed across Stadium."
        image={workspaceWallet}
        imageAlt="Workspace Wallet with one balance and a breakdown of where funds are used"
      />

      <VariableCardGrid
        caption="Automated funding"
        captionColor="#16171b"
        title="Programs stay funded without constant monitoring"
        description="Auto-refill and low funds alerts keep recurring and automated programs running."
        gridColumns={2}
        narrow
        items={[
          { image: autoRefill, imageAlt: "Auto-refill settings that add funds when a balance drops", title: "Auto-Refill", description: "Automatically replenishes funds based on your configured settings." },
          { image: lowFunds, imageAlt: "A low funds alert for a nearly spent budget", title: "Low Funds Alerts", description: "A notification when a balance is running low, before funds run out." },
        ]}
      />
    </ImpactPageShell>
  );
}
