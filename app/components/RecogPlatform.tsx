import VariableCardGrid from "./common/VariableCardGrid";

import one from '@/public/recognition/platformOne.png'
import two from '@/public/recognition/platformTwo.png'
import three from '@/public/recognition/platformThree.png'
import four from '@/public/recognition/platformFour.png'
import five from '@/public/recognition/platformFive.png'
import six from '@/public/recognition/platformSix.png'

const ITEMS = [
  {
    image: one,
    title: "Integrations",
    description:
      "Connect to 100+ tools, including HRIS, Slack, and Teams, so recognition happens where work does.",
  },
  {
    image: two,
    title: "SSO & SCIM",
    description:
      "Enterprise authentication with automatic user provisioning from day one.",
  },
  {
    image: three,
    title: "Analytics & Insights",
    description:
      "See who's recognized, who's participating, and what's working.",
  },
  {
    image: four,
    title: "Admin & Governance",
    description:
      "Manage permissions, approvals, and budgets across every program.",
  },
  {
    image: five,
    title: "Global Rewards",
    description:
      "Recipients redeem worldwide. We handle fulfillment, customs, duties, and tax.",
  },
  {
    image: six,
    title: "Points & Budgets",
    description: "Allocate, cap, and track point budgets by team.",
  },
];

export default function RecogPlatform() {
  return (
    <VariableCardGrid
      caption="Control"
      captionColor="#996b00"
      title={
        <>
          Gifting your finance team will
          <br />
          actually sign off on
        </>
      }
      description="Budgets set per team, approvals routed before anything ships, and a record of what every program returned."
      gridColumns={3}
      items={ITEMS}
    />
  );
}
