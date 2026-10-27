import VariableCardGrid from "./common/VariableCardGrid";

import PlatformIntegrations from "./cards/recognition/PlatformIntegrations";
import PlatformSso from "./cards/recognition/PlatformSso";
import PlatformAnalytics from "./cards/recognition/PlatformAnalytics";
import PlatformAdmin from "./cards/recognition/PlatformAdmin";
import PlatformGlobal from "./cards/recognition/PlatformGlobal";
import PlatformBudgets from "./cards/recognition/PlatformBudgets";


const ITEMS = [
  {
    graphic: <PlatformIntegrations />,
    title: "Integrations",
    description:
      "Connect your HRIS, Slack, Teams, CRM, and the tools your organization already uses.",
  },
  {
    graphic: <PlatformSso />,
    title: "SSO & SCIM",
    description:
      "Enterprise authentication and automated user provisioning from day one.",
  },
  {
    graphic: <PlatformAnalytics />,
    title: "Analytics & Insights",
    description:
      "See who’s recognizing, who’s participating, what’s being redeemed, and how people are engaging.",
  },
  {
    graphic: <PlatformAdmin />,
    title: "Admin & Governance",
    description:
      "Manage permissions, approvals, program rules, and budgets from one place.",
  },
  {
    graphic: <PlatformGlobal />,
    title: "Global Rewards",
    description:
      "Give employees worldwide access to locally relevant rewards while Stadium handles fulfillment, customs, duties, and tax.",
  },
  {
    graphic: <PlatformBudgets />,
    title: "Points & Budgets",
    description:
      "Set point values and budgets by team, program, or occasion–and track spend as you go.",
  },
];

export default function RecogPlatform() {
  return (
    <VariableCardGrid
      caption="Built for enterprise"
      captionColor="#8d12e7"
      title={<>Recognition that works with the systems you already use</>}
      description="Connect Stadium to your HRIS, communication tools, and identity systems while keeping programs, budgets, and reporting under control.
"
      gridColumns={3}
      items={ITEMS}
    />
  );
}
