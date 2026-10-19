
import statsPhoto from "@/public/gifting/stats/statLeftBg.png";
import avatar from "@/public/gift2/gf-closing-avatar-charlene.png";
import ClosingCTA from "./common/ClosingCTA";
import StatsGrid from "./common/StatsGrid";

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
        ctaOneLink="/book-a-call"
        ctaOneVariant="yellow"
        ctaTwoLabel="Browse the catalog"
        ctaTwoLink="/catalog#gifts"
        ctaTwoVariant="secondary"
        backgroundColor="transparent"
      />
    </div>
  );
}
