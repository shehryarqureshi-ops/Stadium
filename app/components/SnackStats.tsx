import StatsGrid from "@/app/components/common/StatsGrid";
import statsPhoto from "@/public/snacks/sn2-stats-photo.jpg";
import avatar from "@/public/snacks/sn2-avatar.jpg";

export default function SnackStats() {
  return (
    <StatsGrid
      caption="The proof"
      captionColor="#2178f5"
      title="The infrastructure behind 2M+ snack sends"
      description="Real numbers from teams sending snacks on Snackmagic."
      statLeft={{
        image: statsPhoto,
        title: "19.7M+",
        text: "Snacks Delivered",
      }}
      statCenter={{
        caption: "Snacks Sent",
        title: "1.7M+",
        backgroundColor: "#eaf1fd",
        text: "“The team loved it! Thought it was really cool to choose different items that they normally wouldn’t try or buy in a grocery store.”",
        authorImage: avatar,
        authorName: "Lauren Berry",
        authorTitle: "Trane Technologies",
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
  );
}
