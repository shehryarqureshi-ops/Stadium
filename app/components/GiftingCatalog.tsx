"use client";

import experiences from "@/public/gifting/catalog/experiences.png";
import luxury from "@/public/gifting/catalog/luxury.png";
import food from "@/public/gifting/catalog/food.png";
import life from "@/public/gifting/catalog/life.png";
import wellness from "@/public/gifting/catalog/wellness.png";
import merch from "@/public/gifting/catalog/merch.png";
import work from "@/public/gifting/catalog/work.png";
import giftCards from "@/public/gifting/catalog/gift.png";

import HorizontalCarousel, {
  CatalogCarouselItem,
} from "./common/HorizontalCarousel";

const items: CatalogCarouselItem[] = [
  {
    title: "Experiences",
    caption: "99 Products",
    image: merch,
  },
  {
    title: "428 Products",
    caption: "Luxury",
    image: experiences,
  },
  {
    title: "1485 Products",
    caption: "Food & Beverages",
    image: food,
  },
  {
    title: "822",
    caption: "Life & Hobbies",
    image: wellness,
  },
  {
    title: "442 Products",
    caption: "Wellness",
    image: luxury,
  },
  {
    title: "298 Products",
    caption: "Merch",
    image: work,
  },
  {
    title: "252 Products",
    caption: "Work Essentials",
    image: life,
  },
  {
    title: "311 Products",
    caption: "Gift Cards",
    image: giftCards,
  },
];

export default function GiftingCatalog() {
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
