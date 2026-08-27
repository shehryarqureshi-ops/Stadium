import type { StaticImageData } from "next/image";

import solutionOne from "@/public/recognition/solutionOne.png";
import solutionTwo from "@/public/recognition/solutionTwo.png";
import solutionThree from "@/public/recognition/solutionThree.png";
import solutionFour from "@/public/recognition/solutionFour.png";

import StickyStepCards from "@/app/components/common/StickyStepCards";

type Row = {
  n: string;
  id: string;
  title: string;
  desc: string;
  img: StaticImageData;
  alt: string;
};

const ROWS: Row[] = [
  {
    n: "01",
    id: "recognize",
    title: "Recognize where work happens",
    desc: "Give kudos in Slack, Teams, or Stadium in real time.",
    img: solutionOne,
    alt: "A Slack-style workspace with a Dash Kudos Program channel: Maya posts “Huge kudos to Daniel for shipping the client launch two days early.” with +150 points, #teamwork and #ownership tags and emoji reactions.",
  },
  {
    n: "02",
    id: "catalog",
    title: "They choose their reward",
    desc: "Employees redeem points for swag, snacks, gifts, gift cards, and experiences they actually want.",
    img: solutionTwo,
    alt: "A rewards catalog with a 1,250 points balance: a branded hoodie at 450 points, selected headphones at 1,100 points and a Snackmagic box at 700 points, above a REDEEM POINTS button.",
  },
  {
    n: "03",
    id: "logistics",
    title: "We handle the delivery",
    desc: "Stadium manages fulfillment, tracking, customs, duties, and delivery across 170+ countries.",
    img: solutionThree,
    alt: "A world map with delivery routes to flagged destinations and a 170+ countries badge, beside a tracking timeline reading Ordered, Packed, Shipped, Delivered.",
  },
  {
    n: "04",
    id: "insights",
    title: "You see what’s working",
    desc: "See recognition, participation, redemption, budgets, and program performance in one platform.",
    img: solutionFour,
    alt: "A Recognition insights dashboard: 87% participation up 12% versus Q1, $42.6k budget delivered across 1,240 rewards, a recognitions-per-month bar chart peaking at 640, plus most-redeemed items and a most-recognized leaderboard.",
  },
];

export default function RecogSolution() {
  return (
    <StickyStepCards
      caption="How it works"
      captionColor="#8d12e7"
      title="From recognition to a reward they choose"
      description="Make recognition easy for your team and meaningful for the person receiving it. Stadium handles everything in between."
      blockquote="Recognition that lasts, backed by a reward people keep."
      quoteAuthor=""
      steps={ROWS.map((row) => ({
        stepLabel: row.n,
        image: row.img,
        imageAlt: row.alt,
        title: row.title,
        content: row.desc,
      }))}
    />
  );
}
