import type { ReactNode } from "react";


import SolutionSlack from "@/app/components/cards/recognition/SolutionSlack";
import SolutionCatalog from "@/app/components/cards/recognition/SolutionCatalog";
import VectorCard from "@/app/components/cards/VectorCard";

import StickyStepCards from "@/app/components/common/StickyStepCards";

type Row = {
  n: string;
  id: string;
  title: string;
  desc: string;
  graphic: (alt: string) => ReactNode;
  alt: string;
};

const ROWS: Row[] = [
  {
    n: "01",
    id: "recognize",
    title: "Recognize, where work happens",
    desc: "A teammate gives kudos in Slack or the Stadium app, without breaking their workflow.",
    graphic: (alt) => <SolutionSlack alt={alt} />,
    alt: "A Slack-style workspace with a Dash Kudos Program channel: Maya posts “Huge kudos to Daniel for shipping the client launch two days early.” with +150 points, a #teamwork tag and emoji reactions, and a “Points sent” confirmation.",
  },
  {
    n: "02",
    id: "catalog",
    title: "Recipients choose what they love",
    desc: "Recipients redeem points from a catalog of 30,000+ items, from branded swag to premium gifts.",
    graphic: (alt) => <SolutionCatalog alt={alt} />,
    alt: "A rewards catalog with a 2,500 points balance: an Explorer Backpack at 800 points, selected headphones at 1,500 points and a Matcha Tea Set at 950 points, above a REDEEM button.",
  },
  {
    n: "03",
    id: "logistics",
    title: "We handle the logistics",
    desc: "Rewards ship to 170+ countries, with tracking included.",
    graphic: (alt) => (
      <VectorCard src="/cards/recognition/SolutionLogistics.svg" alt={alt} width={534} height={269} />
    ),
    alt: "A dotted world map with delivery pins marking sent, gift and delivered destinations.",
  },
  {
    n: "04",
    id: "insights",
    title: "Every moment becomes insight",
    desc: "Track participation and redemption. HR sees what people value, while Finance sees where budgets deliver impact.",
    graphic: (alt) => (
      <VectorCard src="/cards/recognition/SolutionInsights.svg" alt={alt} width={534} height={269} />
    ),
    alt: "A Recognition insights dashboard for the last 6 months: 87% participation, $42.6k in rewards delivered, and a recognitions-per-month bar chart rising from March to August.",
  },
];

export default function RecogSolution() {
  return (
    <StickyStepCards
      caption="The solution"
      captionColor="#8d12e7"
      title="From kudos to a tangible reward"
      description="Recognition that lasts, backed by a reward people keep."
      blockquote=""
      quoteAuthor=""
      steps={ROWS.map((row) => ({
        stepLabel: row.n,
        graphic: row.graphic(row.alt),
        title: row.title,
        content: row.desc,
      }))}
    />
  );
}
