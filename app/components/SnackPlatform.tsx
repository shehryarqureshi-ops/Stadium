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
    title: "Onboarding",
    description:
      "Give new hires a stocked snack drawer before their first day starts.",
  },
  {
    image: occ2,
    title: "Milestones",
    description:
      "Mark birthdays and anniversaries with snacks picked from 2,000+ options.",
  },
  {
    image: occ3,
    title: "All-Hands & Events",
    description: "A well-timed snack break can save a three hour all-hands.",
  },
  {
    image: occ4,
    title: "Thank-Yous",
    description: "Send a treat to say thanks, big or small, no card required.",
  },
  {
    image: occ5,
    title: "Remote Check-Ins",
    description: "Ship snacks to remote desks before their next call.",
  },
  {
    image: occ6,
    title: "Just Because",
    description:
      "Brighten someone's day with a surprise snack, delivered right to their desk.",
  },
];

export default function SnackPlatform() {
  return (
    <VariableCardGrid
      caption="ANY MOMENT"
      captionColor="#2178F5"
      title="The calendar fills up fast"
      description="Hire dates, anniversaries, and the occasional random Tuesday all call for snacks."
      gridColumns={3}
      items={ITEMS}
    />
  );
}
