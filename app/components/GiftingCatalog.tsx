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
    image: merch,
  },
  {
    title: "428 Products",
    image: experiences,
  },
  {
    title: "Food & Beverages",
    image: food,
  },
  {
    title: "Life & Hobbies",
    image: wellness,
  },
  {
    title: "Wellness",
    image: luxury,
  },
  {
    title: "Merch",
    image: work,
  },
  {
    title: "Work Essentials",
    image: life,
  },
  {
    title: "Gift Cards",
    image: giftCards,
  },
];

export default function GiftingCatalog() {
  return (
    <HorizontalCarousel
      caption="The Catalog"
      captionColor="#996B00"
      title={
        <>
          3,714 gifts. 845 brands.
          <br className="hidden md:block" /> One catalog
        </>
      }
      description="Recognizable brands across every price point, plus experiences and gift cards."
      variant="catalog"
      items={items}
    />
  );
}
