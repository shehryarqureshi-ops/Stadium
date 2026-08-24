import VariableCardGrid, {
  type VariableCardGridItem,
} from "@/app/components/common/VariableCardGrid";

import mockStores from "@/public/swag2/sw2-platform-stores.png";
import mockInventory from "@/public/swag2/sw2-platform-inventory.png";
import mockFulfillment from "@/public/swag2/sw2-platform-fulfillment.png";
import mockGifting from "@/public/swag2/sw2-platform-gifting.png";
import mockIntegrations from "@/public/swag2/sw2-platform-integrations.png";
import mockBudgets from "@/public/swag2/sw2-platform-budgets.png";

const ITEMS: VariableCardGridItem[] = [
  {
    image: mockStores,
    title: "Branded Stores",
    description: "Branded storefronts with budgets, approvals, and SSO.",
  },
  {
    image: mockInventory,
    title: "Inventory & Storage",
    description: "Live inventory, warehouse storage, and kitting in one place.",
  },
  {
    image: mockFulfillment,
    title: "Global Fulfillment",
    description: "Ship to 170+ countries, with customs and duties handled.",
  },
  {
    image: mockGifting,
    title: "Automated Gifting",
    description:
      "Automatically send swag for new hires, milestones, or API-triggered events.",
  },
  {
    image: mockIntegrations,
    title: "Integrations",
    description:
      "Integrate with 100+ tools, including your HRIS, Slack, and CRM, to automate sends.",
  },
  {
    image: mockBudgets,
    title: "Budgets & Reporting",
    description: "Get a complete view of spend, inventory, and redemption.",
  },
];

export default function SwagmagicPlatform() {
  return (
    <VariableCardGrid
      caption="The platform"
      captionColor="#10995a"
      title="The stack behind every send"
      description="Everything you need to run swag at scale, from storefronts and inventory to automation and reporting."
      gridColumns={3}
      items={ITEMS}
    />
  );
}
