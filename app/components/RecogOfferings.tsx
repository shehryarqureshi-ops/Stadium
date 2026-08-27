import kudos from "@/public/recog2/rc-offerings-kudos.jpg";

import PillTabs, {
  type TabsShowcaseItem,
} from "@/app/components/common/PillTabs";

const items: TabsShowcaseItem[] = [
  {
    name: "Kudos Programs",
    tab: "Kudos Programs",
    title: "Recognition that doesn’t have to come from the top",
    description:
      "Let employees recognize great work in real time, with kudos tied to your company values and rewards people choose.",
    bullets: [
      "Employee-to-employee recognition",
      "Slack and Teams integrations",
      "Recognition tied to company values",
    ],
    image: kudos,
    href: "#",
    cta: "Explore Kudos",
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
