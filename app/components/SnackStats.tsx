import GradientBand from "@/app/components/common/GradientBand";
import StatsGrid from "@/app/components/common/StatsGrid";
import avatar from "@/public/snacks/sn2-avatar-butcherbox.jpg";
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
            text: "“A snack box lets people pick what they actually want, so the gift feels personal, not just branded.”",
            authorImage: avatar,
            authorName: "Philo-Marie White",
            authorTitle: "Sr. Specialist of Events & Experience",
            authorCompany: "ButcherBox",
            link: "https://www.bystadium.com/case-overview/butcherbox",
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
