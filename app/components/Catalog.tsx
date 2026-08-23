import brandedMerchImg from "@/public/catalog/brandedmerch.png";
import expImg from "@/public/catalog/experiences.png";
import giftCardsImg from "@/public/catalog/giftcards.png";
import lifestyleImg from "@/public/catalog/hobbies.png";
import luxuryGoodsImg from "@/public/catalog/luxurygoods.png";
import snackBoxesImg from "@/public/catalog/snackboxes.png";
import workImg from "@/public/catalog/workessentials.png";

import HorizontalCarousel, { CatalogCarouselItem } from "@/app/components/common/HorizontalCarousel";

const items: CatalogCarouselItem[] = [
  {
    title: "Snack Boxes",
    caption: "10K+ Top Brands",
    image: snackBoxesImg,
  },
  {
    title: "Branded Merch",
    caption: "25,000 Items",
    image: brandedMerchImg,
  },
  {
    title: "Gift Cards",
    caption: "500+ Retailers",
    image: giftCardsImg,
  },
  {
    title: "Luxury Goods",
    caption: "Premium Brands",
    image: luxuryGoodsImg,
  },
  {
    title: "Experiences",
    caption: "50+ Countries",
    image: expImg,
  },
  {
    title: "Work Essentials",
    caption: "Tech & Ergonomics",
    image: workImg,
  },
  {
    title: "Lifestyle & Hobbies",
    caption: "Everyday Living",
    image: lifestyleImg,
  },
];

export default function Catalog() {
  return (
    <HorizontalCarousel
      caption="The Stadium Catalog"
      title="Every recipient covered"
      description="30K+ items from leading brands, with locally relevant options wherever you’re sending."
      variant="catalog"
      items={items}
    />
  );
}
