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
    title: "Milestones & Birthdays",
    description:
      "Personal milestones give the whole team a reason to come together.",
  },
  {
    image: teamWins,
    title: "Team Wins",
    description:
      "A win deserves attention the same week, while it's still fresh.",
  },
  {
    image: allHands,
    title: "All-Hands & Kickoffs",
    description: "An all-hands the whole company actually pays attention to.",
  },
  {
    image: offsites,
    title: "Offsites & Retreats",
    description: "Fill the trip with activities worth leaving the office for.",
  },
  {
    image: socials,
    title: "Quarterly Socials",
    description: "Keep the team connected with a hosted event each quarter.",
  },
  {
    image: justBecause,
    title: "Just Because",
    description: "No milestone required to get the team together.",
  },
];

export default function ExpPlatform() {
  return (
    <VariableCardGrid
      caption="Any moment"
      captionColor="#FF5B77"
      title={<>The calendar is full of reasons to gather</>}
      description="From onboarding to holidays and the dozens of occasions between, regular events keep teams close."
      gridColumns={3}
      items={ITEMS}
    />
  );
}
