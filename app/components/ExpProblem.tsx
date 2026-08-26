import prob1 from "@/public/exp2/problem/one-person.png";
import prob2 from "@/public/exp2/problem/generic.png";
import prob3 from "@/public/exp2/problem/remote.png";

import ProblemSection from "./common/ProblemSection";

const items = [
  {
    image: prob1,
    title: "One person does all the work",
    description:
      "Managers and EAs become accidental event planners, on top of their packed schedules.",
  },
  {
    image: prob2,
    title: "Generic events fade fast",
    description:
      "Icebreakers are forgotten fast, but a well-planned event still comes up weeks later.",
  },
  {
    image: prob3,
    title: "Remote teams drift apart",
    description:
      "Status calls squeezed between agenda items don't leave room for real conversation.",
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
