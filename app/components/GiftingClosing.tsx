import gradient from "@/public/recog2/rc-closing-gradient.jpg";

import Image from "next/image";
import statsPhoto from "@/public/gifting/stats/statLeftBg.png";
import avatar from "@/public/gift2/gf-closing-avatar-charlene.png";
import ClosingCTA from "./common/ClosingCTA";
import StatsGrid from "./common/StatsGrid";

/* Satoshi Medium — Figma specs "Satoshi:Medium" on every stat number. */
const NUM =
  "font-[family-name:var(--font-satoshi-medium)] leading-[1.04] tracking-[-0.0625rem] not-italic";
const STAT_LABEL = "font-sans text-[1rem] leading-[1.4]";
const PILL =
  "inline-flex h-[2.9375rem] items-center justify-center rounded-[100px] px-[1.375rem] font-sans text-[0.9375rem] font-semibold uppercase leading-[1.4] transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function GiftingClosing() {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(180deg, #ffffff 0%, #ffffff 18%, #ffe8ac 32%, #e0b138 45%, #7b5c0f 58%, #2e2717 70%, #181818 86%, #181818 100%)",
      }}
    >
      <StatsGrid
        title="The numbers behind Stadium"
        description="Capacity, reach, and coverage at a glance."
        statLeft={{
          image: statsPhoto,
          title: "1.5M",
          text: "Recipients gifted",
        }}
        statCenter={{
          caption: "Companies sent gifts",
          title: "20K+",
          backgroundColor: "#FEFAF0",
          text: "“Stadium stood out to me because it made global gifting simple, inclusive, scalable, and cost-effective.”",
          authorImage: avatar,
          authorName: "Michelle Diefenderfer.",
          authorTitle: "Workato",
          link: "https://www.bystadium.com/case-overview/workato",
        }}
        rightTopStat={{
          title: "450+",
          text: "Brands",
        }}
        rightBottomStat={{
          title: "170+",
          text: "Countries",
        }}
      />

      <ClosingCTA
        title={
          <>
            Bring your corporate gifting
            <br className="hidden md:block" /> programs together
          </>
        }
        description="See how Stadium can bring your gifting programs, budgets, fulfillment, and reporting into one place."
        ctaOneLabel="Talk to sales"
        ctaOneLink="#"
        ctaOneVariant="yellow"
        ctaTwoLabel="Browse the catalog"
        ctaTwoLink="#"
        ctaTwoVariant="secondary"
        backgroundColor="transparent"
      />
    </div>
  );
}
