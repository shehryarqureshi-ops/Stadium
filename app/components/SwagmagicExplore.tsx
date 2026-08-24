import guideImage from "@/public/recog2/rc-solution-catalog.png";
import reportImage from "@/public/recog2/rc-solution-insights.png";
import templateImage from "@/public/recog2/rc-solution-logistics.png";
import Resources from "./common/Resources";

const ITEMS = [
  {
    caption: "GUIDE",
    captionColor: "#10995a",
    title: "No-Minimums Swag Playbook",
    description: "Run a swag program without storing inventory.",
    url: "#",
    image: guideImage,
  },
  {
    caption: "TEMPLATE",
    captionColor: "#10995a",
    title: "Onboarding Kit Checklist",
    description: "What goes in a new-hire kit, by role.",
    url: "#",
    image: reportImage,
  },
  {
    caption: "STORY",
    captionColor: "#10995a",
    title: "Fintech Branded Stores",
    description: "How multi-office stores, budgets, and approvals work.",
    url: "#",
    image: templateImage,
  },
];

export default function SwagmagicExplore() {
  return (
    <Resources
      caption="Keep Exploring"
      captionColor="#10995a"
      title="More on getting swag right"
      description=""
      items={ITEMS}
    />
  );
}
