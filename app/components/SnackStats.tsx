import GradientBand from "@/app/components/common/GradientBand";
import StatsGrid from "@/app/components/common/StatsGrid";
import avatar from "@/public/snacks/sn2-avatar-amazon.jpg";
import statsPhoto from "@/public/snacks/sn2-stats-photo.jpg";

export default function SnackStats() {
  return (
    <GradientBand via="#2178F5">
      <div className="max-w-content mx-auto bg-white">
        <StatsGrid
          flush
          caption="The proof"
          captionColor="#1f71e7"
          title={<>Built to send snacks at scale</>}
          description="Real numbers from teams sending snacks on Snackmagic."
          statLeft={{
            image: statsPhoto,
            title: "10M+",
            text: "Snacks Delivered Globally",
          }}
          statCenter={{
            caption: "Snacks Sent",
            title: "1.7M+",
            backgroundColor: "#eaf1fd",
            text: "“It was so easy. All I had to do was add the email addresses, and pick my budget. The group put their own shipping addresses in & chose the snacks that they liked. I think they were all appreciative of the variety of snacks, and the fact that it was different.”",
            authorImage: avatar,
            authorName: "Jennifer R.",
            authorTitle: "Executive Administrative Assistant",
            link: "https://www.snackmagic.com/",
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
      </div>
    </GradientBand>
  );
}
