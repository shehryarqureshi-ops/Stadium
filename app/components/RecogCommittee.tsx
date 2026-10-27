import VariableCardGrid, {
  VariableCardGridItem,
} from "./common/VariableCardGrid";

import hr from "@/public/recognition/signoff/hr.png";
import leadership from "@/public/recognition/signoff/leadership.png";
import it from "@/public/recognition/signoff/it.png";
import finance from "@/public/recognition/signoff/finance.png";

const ITEMS: VariableCardGridItem[] = [
  {
    image: hr,
    title: "HR & People Ops",
    description:
      "Kudos tied to company values, with visibility into who’s recognized.",
  },
  {
    image: leadership,
    title: "Leadership",
    description:
      "Recognition that reinforces your values and helps build culture.",
  },
  {
    image: it,
    title: "IT & Security",
    description:
      "Enterprise-ready with SSO, SCIM, SOC 2, and HRIS integrations.",
  },
  {
    image: finance,
    title: "Finance",
    description:
      "Predictable budgets, controlled spend, and clear reporting.",
  },
];

export default function RecogCommittee() {
  return (
    <VariableCardGrid
      caption="Built for sign-off"
      captionColor="#8d12e7"
      title="Win over every stakeholder"
      description="Recognition touches every team. Here’s what each stakeholder wants to know."
      gridColumns={2}
      narrow
      items={ITEMS}
    />
  );
}
