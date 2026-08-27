import VariableCardGrid from "./common/VariableCardGrid";

import one from "@/public/recognition/platformOne.png";
import two from "@/public/recognition/platformTwo.png";
import three from "@/public/recognition/platformThree.png";
import four from "@/public/recognition/platformFour.png";
import five from "@/public/recognition/platformFive.png";
import six from "@/public/recognition/platformSix.png";

const ITEMS = [
  {
    image: one,
    title: "Integrations",
    description:
      "Connect your HRIS, Slack, Teams, CRM, and the tools your organization already uses.",
  },
  {
    image: two,
    title: "SSO & SCIM",
    description:
      "Enterprise authentication and automated user provisioning from day one.",
  },
  {
    image: three,
    title: "Analytics & Insights",
    description:
      "See who’s recognizing, who’s participating, what’s being redeemed, and how people are engaging.",
  },
  {
    image: four,
    title: "Admin & Governance",
    description:
      "Manage permissions, approvals, program rules, and budgets from one place.",
  },
  {
    image: five,
    title: "Global Rewards",
    description:
      "Give employees worldwide access to locally relevant rewards while Stadium handles fulfillment, customs, duties, and tax.",
  },
  {
    image: six,
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
