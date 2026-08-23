import ProblemSection, {
  type ProblemSectionItem,
} from "@/app/components/common/ProblemSection";

import pointsUnredeemedImage from "@/public/recognition/plat-1.png";
import genericRewardsImage from "@/public/recognition/plat-2.png";
import unclearImpactImage from "@/public/recognition/plat-3.png";

const ITEMS: ProblemSectionItem[] = [
  {
    image: pointsUnredeemedImage,
    imageAlt: "Points going unredeemed",
    title: "Points Go Unredeemed",
    description:
      "Points accumulate in dashboards, and expire before they're ever used.",
  },
  {
    image: genericRewardsImage,
    imageAlt: "Generic employee rewards",
    title: "Rewards Feel Generic",
    description:
      "Gift cards and points get forgotten fast, buried in an inbox or drawer.",
  },
  {
    image: unclearImpactImage,
    imageAlt: "Unclear recognition impact",
    title: "Impact Stays Unclear",
    description:
      "Without measurable impact, recognition becomes easy to cut.",
  },
];

export default function RecogProblem() {
  return (
    <ProblemSection
      caption="THE PROBLEM"
      captionColor="#8d12e7"
      title="Employee recognition fades faster than it should"
      description="You send recognition in seconds. People read it, react, and move on. Without a tangible follow-up, the moment rarely lasts."
      items={ITEMS}
      showLogoWall={false}
    />
  );
}