/* /gifting · THE SOLUTION — "One platform for all your gifting".

   Section shell + per-tab content: Imagery System file F7rDHYd3n5nwRtrlv1F6dO,
   section 1065:13949, panel content 1091:3748.

   This used to be ~360 lines of bespoke markup. It now renders through the
   shared tab band, app/components/common/PillTabs.tsx (`TabsShowcase`), the
   same component /recognition, /snacks and the homepage teams section use —
   passed `variant="band"` so it keeps this page's Figma look (amber caption,
   44px heading, borderless white/75 card, the amber symbol glow) rather than
   the recognition/teams look the component defaults to.

   Why it matters that the slot is shared: the bespoke version pinned the
   image height and let its width flex, so the visible aspect drifted from
   1.03 at 1024px to 1.51 at 1440 and object-cover cropped hard at narrow
   widths. The shared slot is a fixed share of the card with a constant
   aspect, so the proportion holds at every width.

   Three of the six panels are drawn at DIFFERENT aspects in Figma, which is
   why items carry their own `aspect`:
     · photos          580×370
     · automated       602×332  (a gradient card that deliberately clips the
                                 542×378 browser window at its bottom edge;
                                 pure vector + text, so it ships as an SVG)
     · gift stores     580×396  (a 580×396 clip of a 592×473 artwork — the
                                 clip is what creates the second row's peek)

   Figma stack (1440): eyebrow 17 → 8 → title 48 → 20 → subhead 53 → 40 →
   pill bar 62 → 45 → band card (p10, gap 60). */

import TabsShowcase, {
  type TabsShowcaseItem,
} from "@/app/components/common/PillTabs";

import holiday from "@/public/gift2/gf-solution-holiday.jpg";
import employee from "@/public/gift2/gf-solution-employee.jpg";
import client from "@/public/gift2/gf-solution-client.jpg";
import partner from "@/public/gift2/gf-solution-partner.jpg";
import stores from "@/public/gift2/gf-solution-stores.jpg";

/* vector artwork — a string src renders as a plain <img> and stays crisp */
const automated = "/gift2/gf-solution-automated.svg";

const items: TabsShowcaseItem[] = [
  {
    name: "Holiday Gifting",
    tab: "holiday gifting",
    title: "Holiday Gifting",
    description:
      "Send thoughtful holiday gifts to recipients without spreadsheets, address collection, or shipping headaches.",
    bullets: [
      "On-brand from day one",
      "Gifts they choose themselves",
      "Reusable every year",
    ],
    image: holiday,
    imageAlt:
      "A kraft-paper gift box tied with a red ribbon and a sprig of pine, left on a sunlit stone doorstep",
    cta: "Explore HOLIDAY gifting",
    href: "#",
  },
  {
    name: "Employee Gifting",
    tab: "employee gifting",
    title: "Employee Gifting",
    description: "Give employees a gift, set up your way.",
    bullets: [
      "Individual or team-wide sends",
      "Project wrap-ups, team wins, or just because",
      "25K+ gifts",
    ],
    image: employee,
    imageAlt:
      "An employee at a sunlit desk lifting the lid off a cream gift box holding a folded knit sweater",
    cta: "Explore EMPLOYEE gifting",
    href: "#",
  },
  {
    name: "Client & Prospect Gifting",
    tab: "client & prospect gifting",
    title: "Client & Prospect Gifting",
    description:
      "Thank a prospect, celebrate a deal won, or send a renewal gift, without stepping outside your sales process.",
    bullets: [
      "Fires straight from your CRM",
      "Prospecting, deals won, or renewals",
      "Budgets and tracking, per team",
    ],
    image: client,
    imageAlt:
      "A handwritten note being signed beside an open gift box and a bottle of red wine on a wooden desk",
    cta: "Explore CLIENT gifting",
    href: "#",
  },
  {
    name: "Partner Gifting",
    tab: "partner gifting",
    title: "Partner Gifting",
    description:
      "Gift channel partners and resellers. Stadium keeps up as the list grows.",
    bullets: [
      "Your logo, theirs, or both",
      "Built for partner and channel programs",
      "Spend and approvals stay in line",
    ],
    image: partner,
    imageAlt:
      "A black partner gift box holding a tumbler, a notebook and a folded scarf, with a thank-you card and a vase of olive leaves",
    cta: "Explore partner gifting",
    href: "#",
  },
  {
    name: "Automated Gifting",
    tab: "automated gifting",
    title: "Automated Gifting",
    description:
      "Automate sends for any milestone, so you never miss a gift.",
    bullets: [
      "Fires from HRIS/ATS or CRM",
      "Onboarding, anniversaries, and birthdays",
      "Set once, runs all year",
    ],
    image: automated,
    imageAlt:
      "The Stadium automations screen: a New hire welcome rule wired from a Workday trigger to a Welcome Kit on day one, above a table of active birthday, anniversary, onboarding and renewal automations",
    aspect: "602/332",
    cta: "Explore AUTOMATED gifting",
    href: "#",
  },
  {
    name: "Gift Stores",
    tab: "gift storeS",
    title: "Gift Stores",
    description:
      "Bring all your gifting into one branded store. You set the budget and branding; they pick a gift they’ll love.",
    bullets: ["25K+ gifts", "No address chasing", "Unredeemed points refunded"],
    image: stores,
    imageAlt:
      "A branded Halden gift shop page with a Featured Picks grid of wine glasses, a leather backpack, a brass tumbler and a steel tumbler, each priced in points",
    aspect: "580/396",
    cta: "Explore gift stores",
    href: "#",
  },
];

export default function GiftingSolution() {
  return (
    <TabsShowcase
      variant="band"
      accent="#996b00"
      caption="The solution"
      title="One platform for all your gifting"
      description="Gifting for different recipients, occasions, and workflows."
      items={items}
      /* Figma's "symbol gradient" 1065:13950 — bleeds off the right edge and
         is clipped by the section. */
      /* Figma draws the Partner state, and the band has no rotation spec. */
      autoAdvance={false}
    />
  );
}
