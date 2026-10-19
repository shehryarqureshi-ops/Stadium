import guideImage from "@/public/recog2/rc-solution-catalog.png";
import reportImage from "@/public/recog2/rc-solution-insights.png";
import templateImage from "@/public/recog2/rc-solution-logistics.png";
import GradientBand from "./common/GradientBand";
import Resources from "./common/Resources";

const ITEMS = [
  {
    caption: "GUIDE",
    captionColor: "#0e8850",
    title: "No-Minimums Swag Playbook",
    description: "Run a swag program without storing inventory.",
    url: "https://www.bystadium.com/resources",
    image: guideImage,
  },
  {
    caption: "TEMPLATE",
    captionColor: "#0e8850",
    title: "Onboarding Kit Checklist",
    description: "What goes in a new-hire kit, by role.",
    url: "https://www.bystadium.com/resources",
    image: reportImage,
  },
  {
    caption: "STORY",
    captionColor: "#0e8850",
    title: "Fintech Branded Stores",
    description: "How multi-office stores, budgets, and approvals work.",
    url: "/the-proof",
    image: templateImage,
  },
];

export default function SwagmagicExplore() {
  return (
    <GradientBand via="#10995a">
      <Resources
        flush
        caption="Keep Exploring"
        captionColor="#0e8850"
        title="More on getting swag right"
        description=""
        items={ITEMS}
      />
    </GradientBand>
  );
}
