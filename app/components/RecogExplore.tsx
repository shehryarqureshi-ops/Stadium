import Resources, {
  type ResourcesItem,
} from "@/app/components/common/Resources";

import guideImage from "@/public/recog2/rc-solution-catalog.png";
import reportImage from "@/public/recog2/rc-solution-insights.png";
import templateImage from "@/public/recog2/rc-solution-logistics.png";

const ITEMS: ResourcesItem[] = [
  {
    caption: "GUIDE",
    captionColor: "#6b33db",
    title: "Build your recognition playbook",
    description: "A step-by-step guide to launch successfully.",
    url: "#",
    image: guideImage,
  },
  {
    caption: "REPORT",
    captionColor: "#6b33db",
    title: "The business case for recognition",
    description:
      "See why recognized employees are more likely to stay.",
    url: "#",
    image: reportImage,
  },
  {
    caption: "TEMPLATE",
    captionColor: "#6b33db",
    title: "Turn company values into tags",
    description: "Make every kudos reflect your company values.",
    url: "#",
    image: templateImage,
  },
];

export default function RecogExplore() {
  return (
    <div className="bg-linear-to-b from-white via-[#6b33db] to-[#181818]">
      <Resources
        caption="Resources"
        captionColor="#6b33db"
        title="More on getting employee recognition right"
        description=""
        items={ITEMS}
      />
      <div className="bg-white p-10 max-w-content mx-auto rounded-b-4xl" />
    </div>
  );
}