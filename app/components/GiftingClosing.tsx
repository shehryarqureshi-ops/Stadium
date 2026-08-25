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
          title: "19.7M+",
          text: "Snacks Delivered",
        }}
        statCenter={{
          caption: "Snacks Sent",
          title: "1.7M+",
          backgroundColor: "#FEFAF0",
          text: "“The team loved it! Thought it was really cool to choose different items that they normally wouldn’t try or buy in a grocery store.”",
          authorImage: avatar,
          authorName: "Charlene S.",
          authorTitle: "The Standard",
        }}
        rightTopStat={{
          title: "1,700+",
          text: "Brands",
        }}
        rightBottomStat={{
          title: "170+",
          text: "Countries",
        }}
      />

      {/* todo */}
      {/* add cta section which redirects to book a call page */}

      <ClosingCTA
        title="Bring your corporate gifting programs together"
        description="Book a call to explore pricing, catalog options, and the right setup for your team."
        ctaOneLabel="Talk to sales"
        ctaOneLink="#"
        ctaOneVariant="primary"
        ctaTwoLabel="Browse the catalog"
        ctaTwoLink="#"
        ctaTwoVariant="secondary"
        backgroundColor="transparent"
      />
    </div>
  );
}
