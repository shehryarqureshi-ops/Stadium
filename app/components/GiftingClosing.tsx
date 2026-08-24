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

      <section
        aria-labelledby="gifting-closing-banner-title"
        className="hidden relative mt-16 px-section-x-sm md:mt-24 md:px-section-x-md lg:mt-40 lg:px-section-x-lg"
      >
        <div
          data-animation="reveal"
          className="mx-auto flex w-full max-w-content flex-col items-start justify-between gap-6 rounded-[1.5rem] bg-white p-8 md:flex-row md:items-start md:gap-10 md:p-10 lg:p-[3.75rem]"
        >
          <h2
            id="gifting-closing-banner-title"
            className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:whitespace-nowrap lg:text-[2.75rem]"
          >
            Start with swag and expand when ready
          </h2>
          <a
            href="#"
            className="inline-flex h-[2.75rem] shrink-0 items-center justify-center rounded-[100px] bg-[#218554] px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-[#1c7047] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#218554] active:scale-[0.98]"
          >
            <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
              Explore pricing
            </span>
          </a>
        </div>
      </section>

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
