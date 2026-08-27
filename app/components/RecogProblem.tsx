import ProblemSection, {
  type ProblemSectionItem,
} from "@/app/components/common/ProblemSection";

import pointsUnredeemedImage from "@/public/recognition/plat-1.png";
import genericRewardsImage from "@/public/recognition/plat-2.png";
import unclearImpactImage from "@/public/recognition/plat-3.png";

const ITEMS: ProblemSectionItem[] = [
  {
    image: pointsUnredeemedImage,
    imageAlt: "Recognition Gets Lost",
    title: "Recognition Gets Lost",
    description:
      "A thank-you gets posted, read, and quickly disappears into the workday.",
  },
  {
    image: genericRewardsImage,
    imageAlt: "Rewards Feel Forgettable",
    title: "Rewards Feel Forgettable",
    description:
      "Generic rewards and limited choices make recognition feel less personal.",
  },
  {
    image: unclearImpactImage,
    imageAlt: "Impact Isn't Measurable ",
    title: "Impact Isn't Measurable ",
    description:
      "Without clear participation and redemption data, HR can’t tell what’s working.",
  },
];

export default function RecogProblem() {
  return (
    <ProblemSection
      caption="THE PROBLEM"
      captionColor="#8d12e7"
      title="Recognition is easy to send. Harder to make meaningful."
      description="Programs fall flat when recognition gets buried, rewards feel generic, and HR can’t see what’s working."
      items={ITEMS}
    />
  );
}
