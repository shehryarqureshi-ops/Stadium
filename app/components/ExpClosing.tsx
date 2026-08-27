import guideImage from "@/public/recog2/rc-solution-catalog.png";
import reportImage from "@/public/recog2/rc-solution-insights.png";
import templateImage from "@/public/recog2/rc-solution-logistics.png";

import ClosingCTA from "./common/ClosingCTA";
import Resources from "./common/Resources";

const ITEMS = [
  {
    caption: "GUIDE",
    captionColor: "#FF5B77",
    title: "Self-Guided Toolkits",
    description:
      "Access practical resources and insights to help you build a stronger workplace culture.",
    url: "https://toolkits.withconfetti.com/",
    image: guideImage,
  },
  {
    caption: "Playbook",
    captionColor: "#FF5B77",
    title: "Employee Engagement Calendars",
    description:
      "Plan ahead with key dates and ideas to engage employees throughout the year.",
    url: "https://www.withconfetti.com/employee-engagement-calendar",
    image: reportImage,
  },
  {
    caption: "Checklist",
    captionColor: "#FF5B77",
    title: "Culture Knowledge Hub",
    description:
      "Get step-by-step guidance to plan and run employee programs on your own.",
    url: "https://www.withconfetti.com/resources/knowledge-hub",
    image: templateImage,
  },
];

export default function ExpClosing() {
  return (
    <>
      <div className="bg-linear-to-b from-white via-[#FF5B77] to-[#181818]">
        <Resources
          caption="Steal our ideas"
          captionColor="#FF5B77"
          title="Resources for better team events"
          description=""
          items={ITEMS}
        />
        <div className="bg-white p-10 max-w-content mx-auto rounded-b-4xl" />
      </div>

      <ClosingCTA
        title="Bring your team together, in minutes"
        description="Browse 350+ hosted experiences, or tell us what you're planning, and we'll handle the rest."
        ctaOneLabel="Browse experiences"
        ctaOneLink="#"
        ctaOneVariant="pink"
        ctaTwoLabel="Talk to sales"
        ctaTwoLink="#"
        ctaTwoVariant="secondary"
        backgroundColor="#181818"
      />
    </>
  );
}
