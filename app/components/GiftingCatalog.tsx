"use client";

import experiences from "@/public/gifting/catalog/experiences.jpg";
import luxury from "@/public/gifting/catalog/luxury.jpg";
import food from "@/public/gifting/catalog/food.jpg";
import life from "@/public/gifting/catalog/life.jpg";
import wellness from "@/public/gifting/catalog/wellness.jpg";
import merch from "@/public/gifting/catalog/merch.jpg";
import work from "@/public/gifting/catalog/work.jpg";
import giftCards from "@/public/gifting/catalog/gift.jpg";

import HorizontalCarousel, {
  CatalogCarouselItem,
} from "./common/HorizontalCarousel";

/* The eight catalog categories, in the board's order — Figma 2548:11602.
   Card two read "428 Products", a count that had got in among the category
   names, and every photo but Food & Beverages and Gift Cards was paired with
   the wrong title. Each entry now carries the image whose card it names. */
const items: CatalogCarouselItem[] = [
  {
    title: "Experiences",
    image: experiences,
  },
  {
    title: "Luxury",
    image: luxury,
  },
  {
    title: "Food & Beverages",
    image: food,
  },
  {
    title: "Life & Hobbies",
    image: life,
  },
  {
    title: "Wellness",
    image: wellness,
  },
  {
    title: "Merch",
    image: merch,
  },
  {
    title: "Work Essentials",
    image: work,
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
      title={<>Something for every recipient</>}
      description="Thousands of gifts across brands, categories, and price points—with branded options, local choices, experiences, gift cards, and snacks."
      variant="catalog"
      items={items}
    />
  );
}
