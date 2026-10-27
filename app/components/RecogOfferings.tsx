import kudos from "@/public/recognition/programs/kudos.png";
import milestone from "@/public/recognition/programs/milestone.png";
import incentives from "@/public/recognition/programs/incentives.png";
import service from "@/public/recognition/programs/service.png";

import PillTabs, {
  type TabsShowcaseItem,
} from "@/app/components/common/PillTabs";

const items: TabsShowcaseItem[] = [
  {
    id: "kudos",
    name: "Kudos Programs",
    tab: "Kudos Programs",
    title: "Recognition beyond the top-down",
    description:
      "Teammates give real-time kudos that turn into points and rewards, building a culture of appreciation across the team.",
    bullets: [
      "Integrate with Slack or Teams",
      "Tied to company values",
      "Recognition in real time",
    ],
    image: kudos,
    href: "/pricing",
    cta: "Explore Kudos Programs",
  },
  {
    id: "milestones",
    name: "Milestone Programs",
    tab: "Milestone Programs",
    title: "Milestone Programs",
    description:
      "Celebrate birthdays, anniversaries, and first days with recognition that arrives right on time. Set your program once, and every milestone takes care of itself.",
    bullets: [
      "Pulled automatically from your HRIS",
      "Anniversaries, birthdays, and new hires",
      "Tangible gifts, not just an email",
    ],
    image: milestone,
    href: "/catalog#gifts",
  },
  {
    id: "incentives",
    name: "Incentives",
    tab: "Incentives",
    title: "Incentives",
    description:
      "Turn goals into motivation. Set your program once, then let Stadium automatically reward reps as they reach each milestone.",
    bullets: [
      "Goal and tiers, configured once",
      "A live leaderboard, updated on every close",
      "Kits, shipped automatically when a rep hits a tier",
    ],
    image: incentives,
    href: "/catalog#gifts",
  },
  {
    id: "service-awards",
    name: "Service Awards",
    tab: "Service Awards",
    title: "Service Awards",
    description:
      "Move beyond plaques with premium gifts that make every service anniversary more meaningful.",
    bullets: [
      "Curated collections of premium gifts",
      "Can be engraved",
      "Sent on the employee’s service anniversary",
    ],
    image: service,
    href: "/catalog#gifts",
  },
];

export default function RecogOfferings() {
  return (
    <PillTabs
      caption="RECOGNITION PROGRAMS"
      captionColor="#8d12e7"
      title="One platform for every way you recognize"
      description="Run everyday recognition, milestones, incentives, and service awards from the same program."
      items={items}
      autoAdvance={false}
      glowColor="#8d12e7"
    />
  );
}
