import StatsGrid from "@/app/components/common/StatsGrid";
import statsPhoto from "@/public/swag/statCardBg.png";
import avatar from "@/public/the-proof/customers/felicia-kentro.jpg";

export default function SwagmagicImpact() {
  return (
    <StatsGrid
      title="Swag at scale, backed by numbers"
      description="What teams see when they run swag through Stadium."
      statLeft={{
        image: statsPhoto,
        title: "120K+",
        text: "Kits Shipped Globally",
      }}
      statCenter={{
        caption: "Avg Reorder Rate",
        title: "38%",
        backgroundColor: "#F0FEF8",
        text: "“On-demand is the best feature. It doesn’t lock us into inventory we don’t need or can’t use. It gives people the freedom to pick what they want and how they want it.”",
        authorImage: avatar,
        authorName: "Felicia Weigel",
        authorTitle: "Communications Manager, Kentro",
        link: "https://www.bystadium.com/case-overview/kentro",
      }}
      rightTopStat={{
        title: "48 hrs",
        text: "To first mockup",
      }}
      rightBottomStat={{
        title: "170+",
        text: "Countries",
      }}
    />
  );
}
