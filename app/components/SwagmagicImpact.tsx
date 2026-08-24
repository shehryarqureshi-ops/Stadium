import StatsGrid from "@/app/components/common/StatsGrid";
import statsPhoto from "@/public/swag/statCardBg.png";
import avatar from "@/public/snacks/sn2-avatar.jpg";

export default function SwagmagicImpact() {
  return (
    <StatsGrid
      title="Swag at scale, backed by numbers"
      description="What teams see when they run swag through Stadium."
      statLeft={{
        image: statsPhoto,
      }}
      statCenter={{
        caption: "Avg Reorder Rate",
        title: "38%",
        backgroundColor: "#F0FEF8",
        text: "“Stadium isn’t just a swag platform. It’s a scalable engagement tool that grows with you.”",
        authorImage: avatar,
        authorName: "Felicia W.",
        authorTitle: "Kentro",
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
