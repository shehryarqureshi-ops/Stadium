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
      "Build recognition around your values and see who’s participating, recognized, and engaged.",
  },
  {
    image: leadership,
    title: "Leadership",
    description:
      "Reinforce company values and make great work visible across the organization.",
  },
  {
    image: it,
    title: "IT & Security",
    description:
      "Deploy securely with SSO, SCIM, HRIS integrations, and enterprise controls.",
  },
  {
    image: finance,
    title: "Finance",
    description:
      "Set budgets, control spend, and see where recognition dollars go.",
  },
];

export default function RecogCommittee() {
  return (
    <VariableCardGrid
      caption="Built for sign-off"
      captionColor="#8d12e7"
      title="A recognition program every stakeholder can get behind"
      description="Give HR the program they want, IT the infrastructure they require, Finance the control they need, and leadership the visibility they expect."
      gridColumns={2}
      items={ITEMS}
    />
  );
}
