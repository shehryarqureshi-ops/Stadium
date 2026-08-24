import byo from "@/public/snacks/sn2-byo.png";
import curated from "@/public/snacks/sn2-occ-2.jpg";

import PillTabs, {
  type TabsShowcaseItem,
} from "@/app/components/common/PillTabs";

const items: TabsShowcaseItem[] = [
  {
    name: "Build-Your-Own Boxes",
    tab: "Build-Your-Own Boxes",
    title: "Build-Your-Own Boxes",
    description:
      "Set a budget, and let everyone build their own box from 2,000+ snacks — chips, candy, coffee, and healthy picks included.",
    bullets: ["Zero guesswork", "Dietary filters built in", "Ships worldwide"],
    image: byo,
    href: "#",
    cta: "Start a box",
  },
  {
    name: "Curated Boxes",
    tab: "Curated Boxes",
    title: "Curated Boxes",
    description:
      "Hand-picked snack boxes, ready to send in minutes. Pick a theme and we handle the rest.",
    bullets: [
      "Curated by our snack experts",
      "Themed boxes for every occasion",
      "Add your branding to the box",
    ],
    image: curated,
    href: "#",
    cta: "Browse boxes",
  },
];

export default function SnackSolution() {
  return (
    <PillTabs
      caption="The solution"
      title="Your choice, or theirs"
      description="Send a snack box you choose, or let recipients build their own from the catalog."
      items={items}
      autoAdvance={false}
    />
  );
}
