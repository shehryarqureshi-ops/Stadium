import prob1 from "@/public/exp2/problem/one-person.png";
import prob2 from "@/public/exp2/problem/generic.png";
import prob3 from "@/public/exp2/problem/remote.png";

import ProblemSection from "./common/ProblemSection";

const items = [
  {
    image: prob1,
    title: "One person does all the work",
    description:
      "Managers and executive assistants become accidental event planners, on top of their packed schedules.",
  },
  {
    image: prob2,
    title: "Generic events don't stick",
    description:
      "Nobody remembers the icebreaker they shared, but a well-run event still comes up months later. ",
  },
  {
    image: prob3,
    title: "Remote teams miss out on connection",
    description:
      "Meetings are just status updates, with no room left for bonding.",
  },
];

export default function ExpProblem() {
  return (
    <ProblemSection
      caption="The problem"
      captionColor="#FF5B77"
      title="Planning a team event takes hours you don't have"
      description="No agenda, no structure, and no way to know who'll stick around."
      items={items}
    />
  );
}
