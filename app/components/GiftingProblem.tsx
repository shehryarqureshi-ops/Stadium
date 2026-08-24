import prob1 from "@/public/gifting/problem/vendor.png";
import prob2 from "@/public/gifting/problem/choosing.png";
import prob3 from "@/public/gifting/problem/impact.png";
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

export default function GiftingProblem() {
  return (
    <ProblemSection
      caption="The problem"
      captionColor="#996b00"
      title="Every team gifts differently, and the gaps are obvious"
      description=" Sales runs its own platform, HR defaults to gift cards, and Marketing uses an agency. Budgets, vendors, and reporting never line up."
      items={items}
    />
  );
}
