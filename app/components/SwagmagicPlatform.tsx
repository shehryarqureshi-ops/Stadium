import VariableCardGrid, {
  type VariableCardGridItem,
} from "@/app/components/common/VariableCardGrid";

import PlatformStores from "@/app/components/cards/swag/PlatformStores";
import PlatformInventory from "@/app/components/cards/swag/PlatformInventory";
import PlatformFulfillment from "@/app/components/cards/swag/PlatformFulfillment";
import PlatformGifting from "@/app/components/cards/swag/PlatformGifting";
import PlatformIntegrations from "@/app/components/cards/swag/PlatformIntegrations";
import PlatformBudgets from "@/app/components/cards/swag/PlatformBudgets";

const ITEMS: VariableCardGridItem[] = [
  {
    graphic: <PlatformStores />,
    title: "Branded Stores",
    description: "Branded storefronts with budgets, approvals, and SSO.",
  },
  {
    graphic: <PlatformInventory />,
    title: "Inventory & Storage",
    description: "Live inventory, warehouse storage, and kitting in one place.",
  },
  {
    graphic: <PlatformFulfillment />,
    title: "Global Fulfillment",
    description: "Ship to 170+ countries, with customs and duties handled.",
  },
  {
    graphic: <PlatformGifting />,
    title: "Automated Gifting",
    description:
      "Automatically send swag for new hires, milestones, or API-triggered events.",
  },
  {
    graphic: <PlatformIntegrations />,
    title: "Integrations",
    description:
      "Integrate with 100+ tools, including your HRIS, Slack, and CRM, to automate sends.",
  },
  {
    graphic: <PlatformBudgets />,
    title: "Budgets & Reporting",
    description: "Get a complete view of spend, inventory, and redemption.",
  },
];

export default function SwagmagicPlatform() {
  return (
    <VariableCardGrid
      caption="The platform"
      captionColor="#0e8850"
      title="The stack behind every send"
      description="Everything you need to run swag at scale, from storefronts and inventory to automation and reporting."
      gridColumns={3}
      items={ITEMS}
    />
  );
}
