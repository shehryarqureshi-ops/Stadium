import occ1 from "@/public/snacks/sn2-occ-1.jpg";
import occ2 from "@/public/snacks/sn2-occ-2.jpg";
import occ3 from "@/public/snacks/sn2-occ-3.jpg";
import occ4 from "@/public/snacks/sn2-occ-4.jpg";
import occ5 from "@/public/snacks/sn2-occ-5.jpg";
import occ6 from "@/public/snacks/sn2-occ-6.jpg";
import VariableCardGrid from "./common/VariableCardGrid";

const ITEMS = [
  {
    image: occ1,
    title: "New Hires",
    description: "Welcome employees with a box they build themselves.",
  },
  {
    image: occ2,
    title: "Milestones",
    description: "Celebrate birthdays, anniversaries, and achievements.",
  },
  {
    image: occ3,
    title: "Client & Prospect Gifts",
    description:
      "Send something thoughtful without guessing what they’ll like.",
  },
  {
    image: occ4,
    title: "Events",
    description:
      "Treat attendees before, during, or after virtual and in-person events.",
  },
  {
    image: occ5,
    title: "Team Appreciation",
    description: "Send something personal to distributed teams.",
  },
  {
    image: occ6,
    title: "Just Because",
    description: "Make an unexpected moment feel thoughtful.",
  },
];

export default function SnackPlatform() {
  return (
    <VariableCardGrid
      caption="Use cases"
      captionColor="#2178F5"
      title="Snacks for every kind of send"
      description="Hire dates, anniversaries, and the occasional random Tuesday all call for snacks."
      gridColumns={3}
      items={ITEMS}
    />
  );
}
