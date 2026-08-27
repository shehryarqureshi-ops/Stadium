import prob1 from "@/public/snacks/sn2-problem-1.jpg";
import prob2 from "@/public/snacks/sn2-problem-2.jpg";
import prob3 from "@/public/snacks/sn2-problem-3.jpg";

import ProblemSection, {
  type ProblemSectionItem,
} from "@/app/components//common/ProblemSection";

const items: ProblemSectionItem[] = [
  {
    image: prob1,
    title: "Collecting details ruins the surprise",
    description:
      "You shouldn't have to chase addresses, preferences, and dietary needs before sending a gift.",
  },
  {
    image: prob2,
    title: "One person ends up running it",
    description:
      "One person manages recipient lists, follow-ups, orders, and delivery.",
  },
  {
    image: prob3,
    title: "Gift cards are easy–but forgettable",
    description:
      "They're easy to send, but lack the personal touch and impact of a physical gift.",
  },
];

export default function SnackProblem() {
  return (
    <ProblemSection
      caption="The problem"
      title="Corporate gifting gets complicated fast"
      description="Sending to a large or global group means addresses, preferences, dietary needs, and fulfillment — before you’ve even picked the gift."
      items={items}
    />
  );
}
