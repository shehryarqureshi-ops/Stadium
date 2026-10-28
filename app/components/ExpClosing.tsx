import toolkitsImage from "@/public/events/resources/toolkits.jpg";
import calendarsImage from "@/public/events/resources/calendars.jpg";
import knowledgeHubImage from "@/public/events/resources/knowledge-hub.jpg";

import ClosingCTA from "./common/ClosingCTA";
import GradientBand from "./common/GradientBand";
import Resources from "./common/Resources";

const ITEMS = [
  {
    caption: "GUIDE",
    captionColor: "#CB495F",
    title: "Self-Guided Toolkits",
    description:
      "Access practical resources and insights to help you build a stronger workplace culture.",
    url: "https://toolkits.withconfetti.com/",
    image: toolkitsImage,
    imageAlt: "Confetti Toolkits for engaged, high-performing teams",
  },
  {
    caption: "Playbook",
    captionColor: "#CB495F",
    title: "Employee Engagement Calendars",
    description:
      "Plan ahead with key dates and ideas to engage employees throughout the year.",
    url: "https://www.withconfetti.com/employee-engagement-calendar",
    image: calendarsImage,
    imageAlt: "Confetti team building experiences: a host on a virtual game-show screen",
  },
  {
    caption: "Checklist",
    captionColor: "#CB495F",
    title: "Culture Knowledge Hub",
    description:
      "Get step-by-step guidance to plan and run employee programs on your own.",
    url: "https://www.withconfetti.com/resources/knowledge-hub",
    image: knowledgeHubImage,
    imageAlt: "Confetti #unforgettable team building experiences",
  },
];

export default function ExpClosing() {
  return (
    <>
      <GradientBand via="#FF5B77">
        <Resources
          flush
          caption="Steal our ideas"
          captionColor="#CB495F"
          title="Resources for better team events"
          description=""
          items={ITEMS}
        />
      </GradientBand>

      <ClosingCTA
        title="Bring your team together, in minutes"
        description="Browse 350+ hosted experiences, or tell us what you're planning, and we'll handle the rest."
        ctaOneLabel="Browse experiences"
        ctaOneLink="/catalog#experiences"
        ctaOneVariant="pink"
        ctaTwoLabel="Talk to sales"
        ctaTwoLink="/book-a-call"
        ctaTwoVariant="secondary"
        backgroundColor="#181818"
      />
    </>
  );
}
