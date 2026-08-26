import prob1 from "@/public/snacks/sn2-problem-1.jpg";
import prob2 from "@/public/snacks/sn2-problem-2.jpg";
import prob3 from "@/public/snacks/sn2-problem-3.jpg";

import ProblemSection from "./common/ProblemSection";

const items = [
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

export default function ExpProblem() {
  return (
    <ProblemSection
      caption="The problem"
      captionColor="#FF5B77"
      title="Team building takes work"
      description="No agenda, no structure, and no way to know who'll stick around."
      items={items}
    />
  );
}
