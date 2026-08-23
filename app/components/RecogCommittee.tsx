import FourCards, {
  type FourCardsItem,
} from "@/app/components/common/FourCards";

const ITEMS: FourCardsItem[] = [
  {
    image: "/recog2/rc-committee-hr.svg",
    isFeatured: true,
    featuredLabel: "Primary",
    title: "HR & People Ops",
    description:
      "Kudos tied to company values, with visibility into who’s recognized.",
  },
  {
    image: "/recog2/rc-committee-leadership.svg",
    title: "Leadership",
    description:
      "Recognition that reinforces your values and helps build culture.",
  },
  {
    image: "/recog2/rc-committee-it.svg",
    title: "IT & Security",
    description:
      "Enterprise-ready with SSO, SCIM, SOC 2, and HRIS integrations.",
  },
  {
    image: "/recog2/rc-committee-finance.svg",
    title: "Finance",
    description:
      "Predictable budgets, controlled spend, and clear reporting.",
  },
];

export default function RecogCommittee() {
  return (
    <FourCards
      caption="Built for sign-off"
      captionColor="#8d12e7"
      title="Win over every stakeholder"
      description="Recognition touches every team. Here’s what each stakeholder wants to know."
      items={ITEMS}
    />
  );
}