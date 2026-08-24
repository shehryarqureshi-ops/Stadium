import VariableFeaturedImageCardGrid, {
  type VariableFeaturedImageCardGridItem,
} from "@/app/components/common/VariableFeaturedImageCardGrid";

import marketing from "@/public/swag2/sw2-committee-marketing.jpg";
import hr from "@/public/swag2/sw2-committee-hr.jpg";
import procurement from "@/public/swag2/sw2-committee-procurement.jpg";
import it from "@/public/swag2/sw2-committee-it.jpg";

const ITEMS: VariableFeaturedImageCardGridItem[] = [
  {
    image: marketing,
    title: "Marketing & Brand",
    description:
      "Every branded moment—stores, kits, events, hiring—on-brand and at scale.",
  },
  {
    image: hr,
    title: "HR & People Ops",
    description:
      "New-hire kits and milestone swag run themselves. Marketing touches zero orders.",
  },
  {
    image: procurement,
    title: "Procurement & Finance",
    description:
      "One vendor. One PO. Budgets and per-team wallets you control.",
  },
  {
    image: it,
    title: "IT & Security",
    description:
      "SSO, SCIM, and SOC 2 out of the box. Nothing breaks identity or audit.",
  },
];

export default function SwagmagicCommittee() {
  return (
    <VariableFeaturedImageCardGrid
      caption="Built for sign-off"
      captionColor="#218554"
      title="Get every stakeholder on board"
      description="Every team has different priorities with swag. Here’s what each one needs to sign off with confidence."
      gridColumnCount={2}
      items={ITEMS}
    />
  );
}
