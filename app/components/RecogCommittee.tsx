import VariableCardGrid, {
  VariableCardGridItem,
} from "./common/VariableCardGrid";

import milestones from "@/public/exp2/xp-platform-milestones.jpg";
import teamWins from "@/public/exp2/xp-platform-team-wins.jpg";
import allHands from "@/public/exp2/xp-platform-all-hands.jpg";
import offsites from "@/public/exp2/xp-platform-offsites.jpg";
import socials from "@/public/exp2/xp-platform-socials.jpg";
import justBecause from "@/public/exp2/xp-platform-just-because.jpg";

const ITEMS: VariableCardGridItem[] = [
  {
    image: milestones,
    title: "HR & People Ops",
    description:
      "Build recognition around your values and see who’s participating, recognized, and engaged.",
  },
  {
    image: milestones,
    title: "Leadership",
    description:
      "Reinforce company values and make great work visible across the organization.",
  },
  {
    image: milestones,
    title: "IT & Security",
    description:
      "Deploy securely with SSO, SCIM, HRIS integrations, and enterprise controls.",
  },
  {
    image: milestones,
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
