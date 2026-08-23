import kudos from "@/public/recog2/rc-offerings-kudos.jpg";

import TabsShowcase, {
  type TabsShowcaseItem,
} from "@/app/components/common/PillTabs";

const KUDOS_ALT =
  "A woman working at a sunlit desk, with two Stadium kudos cards floating over the photo — Maya thanking @Daniel for shipping a launch early, and Marcus giving @Vonn G +100 points for the team dashboard";

const items: TabsShowcaseItem[] = [
  {
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
    href: "#",
  },
  {
    name: "Milestone Programs",
    tab: "Milestone Programs",
    title: "Milestones that never slip",
    description:
      "Birthdays, work anniversaries, and new hires — celebrated automatically. Set it once; every milestone ships itself.",
    bullets: [
      "Automate anniversaries, birthdays, and onboarding.",
      "Personalized rewards for every milestone.",
      "Never miss a moment across time zones.",
    ],
    image: kudos,
    href: "#",
  },
  {
    name: "Incentives",
    tab: "Incentives",
    title: "Incentives that move the needle",
    description:
      "Reward the behaviors that matter — sales wins, referrals, and goals. Points and rewards employees actually want.",
    bullets: [
      "Run spot bonuses, contests, and SPIFFs.",
      "Reward performance with real, redeemable value.",
      "Track impact against every program.",
    ],
    image: kudos,
    href: "#",
  },
  {
    name: "Service Awards",
    tab: "Service Awards",
    title: "Service awards worth the wait",
    description:
      "Mark 1, 5, and 10 years with rewards that feel significant. A premium moment, handled end to end.",
    bullets: [
      "Curated award tiers by years of service.",
      "Personalized selection for every recipient.",
      "Global fulfillment with tracking included.",
    ],
    image: kudos,
    href: "#",
  },
];

export default function RecogOfferings() {
  return (
    <TabsShowcase
      caption=""
      title="Ways to recognize great work"
      description=""
      items={items}
      autoAdvance={false}
      glowColor="#8d12e7"
    />
  );
}
