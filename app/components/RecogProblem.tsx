import ProblemSection, {
  type ProblemSectionItem,
} from "@/app/components/common/ProblemSection";

import pointsUnredeemedImage from "@/public/recognition/probOne.png";
import genericRewardsImage from "@/public/recognition/probTwo.png";
import unclearImpactImage from "@/public/recognition/probThree.png";

const ITEMS: ProblemSectionItem[] = [
  {
    image: pointsUnredeemedImage,
    imageAlt: "An employee scrolling a rewards app on her phone",
    title: "Points Go Unredeemed",
    description:
      "Points accumulate in dashboards, and expire before they’re ever used.",
  },
  {
    image: genericRewardsImage,
    imageAlt: "An employee looking through a drawer of generic gifts",
    title: "Rewards Feel Generic",
    description:
      "Gift cards and points get forgotten fast, buried in an inbox or drawer.",
  },
  {
    image: unclearImpactImage,
    imageAlt: "A manager reviewing recognition results on a laptop",
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
      title={
        <>
          Employee recognition
          <br className="hidden md:block" /> fades faster than it should
        </>
      }
      description="You send recognition in seconds. People read it, react, and move on. Without a tangible follow-up, the moment rarely lasts."
      items={ITEMS}
    />
  );
}
