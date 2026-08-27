import prob1 from "@/public/gifting/problem/vendor.png";
import prob2 from "@/public/gifting/problem/choosing.png";
import prob3 from "@/public/gifting/problem/impact.png";
import ProblemSection from "./common/ProblemSection";

const items = [
  {
    image: prob1,
    title: "Vendor & Tool Sprawl",
    description:
      "Every new gifting program adds another vendor, contract, or workflow.",
  },
  {
    image: prob2,
    title: "Gifting Becomes Someone’s Job",
    description:
      "Addresses, preferences, orders, and follow-ups become someone’s manual workload.",
  },
  {
    image: prob3,
    title: "Choosing for everyone",
    description:
      "One person guessing what employees, clients, and partners actually want.",
  },
];

export default function GiftingProblem() {
  return (
    <ProblemSection
      caption="The problem"
      captionColor="#996b00"
      title="Every team gifts differently, and the gaps are obvious"
      description="Sales runs its own platform, HR defaults to gift cards, and Marketing uses an agency. Budgets, vendors, and reporting never line up."
      items={items}
    />
  );
}
