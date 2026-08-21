import prob1 from "@/public/snacks/sn2-problem-1.jpg";
import prob2 from "@/public/snacks/sn2-problem-2.jpg";
import prob3 from "@/public/snacks/sn2-problem-3.jpg";

import ProblemSection, {
  type ProblemSectionItem,
} from "@/app/components//common/ProblemSection";

const items: ProblemSectionItem[] = [
  {
    image: prob1,
    title: "Asking ruins the surprise",
    description:
      "You can’t send something unexpected to someone you just emailed for their address. The moment you start collecting details, the gift announces itself.",
  },
  {
    image: prob2,
    title: "One person ends up running it",
    description:
      "Someone chases every address, every diet and every “mine never arrived”—then hopes the picks landed.",
  },
  {
    image: prob3,
    title: "Nothing happens unless someone remembers",
    description:
      "There’s no trigger, no schedule, nothing running in the background. Every anniversary and every new hire gets marked only if a human catches it in time.",
  },
];

export default function SnackProblem() {
  return (
    <ProblemSection
      caption="The problem"
      title="Nice gestures don’t scale"
      description="The best sends feel personal—something they’d never have picked up for themselves and show up out of nowhere. But then you realize you need forty addresses, and you’re emailing people to ask."
      items={items}
    />
  );
}
