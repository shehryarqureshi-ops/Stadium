import swagIdeasImage from "@/public/swag/resources/swag-ideas.jpg";
import vendorFitImage from "@/public/swag/resources/vendor-fit.jpg";
import butcherboxImage from "@/public/swag/resources/butcherbox.jpg";
import GradientBand from "./common/GradientBand";
import Resources from "./common/Resources";

const ITEMS = [
  {
    caption: "GUIDE",
    captionColor: "#0e8850",
    title: "Swag they’ll reach for again",
    description:
      "Find ideas for new hires, events, and clients, with a framework for choosing what fits.",
    url: "https://www.bystadium.com/blog/company-swag-ideas",
    image: swagIdeasImage,
    imageAlt:
      "Company swag laid out around a sticker-covered Stadium box: hoodie, tumbler, backpack, cap, socks and snacks",
  },
  {
    caption: "BUYER’S GUIDE",
    captionColor: "#0e8850",
    title: "Find your swag vendor fit",
    description:
      "Compare vendor types, ordering models, and inventory tools before you commit.",
    url: "https://www.bystadium.com/blog/swag-vendors",
    image: vendorFitImage,
    imageAlt:
      "An open Stadium gift box with a hoodie, tumbler, backpack, blanket and snacks spilling out",
  },
  {
    caption: "CUSTOMER STORY",
    captionColor: "#0e8850",
    title: "Fewer vendors. One swag program.",
    description:
      "See how ButcherBox brought swag orders and new-hire kits together, with brand assets in one place.",
    url: "https://www.bystadium.com/case-overview/butcherbox",
    image: butcherboxImage,
    imageAlt: "The ButcherBox swag shop with branded notebook, cap, bottle and apparel",
  },
];

export default function SwagmagicExplore() {
  return (
    <GradientBand via="#10995a">
      <Resources
        flush
        caption="Keep Exploring"
        captionColor="#0e8850"
        title="More on getting swag right"
        description=""
        items={ITEMS}
      />
    </GradientBand>
  );
}
