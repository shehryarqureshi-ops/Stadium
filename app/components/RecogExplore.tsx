import GradientBand from "./common/GradientBand";
import Resources, {
  type ResourcesItem,
} from "@/app/components/common/Resources";

import everflowImage from "@/public/recognition/resources/everflow.jpg";
import businessCaseImage from "@/public/recognition/resources/business-case.jpg";
import completeGuideImage from "@/public/recognition/resources/complete-guide.jpg";

const ITEMS: ResourcesItem[] = [
  {
    caption: "CASE STUDY",
    captionColor: "#6b33db",
    title: "How Everflow scaled recognition",
    description:
      "See how they cut admin time 80% while making recognition visible company-wide.",
    url: "https://www.bystadium.com/case-overview/everflow",
    image: everflowImage,
    imageAlt:
      "Everflow’s Stadium kudos program: a recognition post with hashtags and a points summary",
  },
  {
    caption: "ARTICLE",
    captionColor: "#6b33db",
    title: "The business case for recognition",
    description:
      "See why recognized employees are 56% less likely to look for a new job.",
    url: "https://www.bystadium.com/blog/benefits-of-employee-recognition",
    image: businessCaseImage,
    imageAlt:
      "Illustration of an employee holding a phone showing a 10 kudos message, with a heart, star and thumbs-up",
  },
  {
    caption: "ARTICLE",
    captionColor: "#6b33db",
    title: "The complete guide to employee recognition",
    description: "Best practices, real examples, and tools to get it right.",
    url: "https://www.bystadium.com/blog/employee-recognition",
    image: completeGuideImage,
    imageAlt:
      "Illustration of three teammates exchanging kudos, gifts and reactions on their phones and laptops",
  },
];

export default function RecogExplore() {
  return (
    <GradientBand via="#6b33db">
      <Resources
        flush
        caption="Resources"
        captionColor="#6b33db"
        title="More on getting employee recognition right"
        description=""
        items={ITEMS}
      />
    </GradientBand>
  );
}
