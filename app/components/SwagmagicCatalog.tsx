"use client";

import apparel from "@/public/swag/catalog/apparel.png";
import drinkware from "@/public/swag/catalog/drinkware.png";
import bags from "@/public/swag/catalog/bags.png";
import officeSupplies from "@/public/swag/catalog/office.png";
import technology from "@/public/swag/catalog/technology.png";
import events from "@/public/swag/catalog/events.png";
import health from "@/public/swag/catalog/health.png";
import outdoor from "@/public/swag/catalog/outdoor.png";
import auto from "@/public/swag/catalog/auto.png";
import baby from "@/public/swag/catalog/baby.png";

import HorizontalCarousel from "./common/HorizontalCarousel";

const items = [
  {
    title: "Apparel",
    caption: "7,000 ITEMS",
    image: apparel,
  },
  {
    title: "Drinkware",
    caption: "2,522 ITEMS",
    image: drinkware,
  },
  {
    title: "Bags",
    caption: "2,405 ITEMS",
    image: bags,
  },
  {
    title: "Office Supplies",
    caption: "0,000 ITEMS",
    image: officeSupplies,
  },
  {
    title: "Technology",
    caption: "0,000 ITEMS",
    image: technology,
  },
  {
    title: "Events & Tradeshows",
    caption: "0,000 ITEMS",
    image: events,
  },
  {
    title: "Health & Wellness",
    caption: "0,000 ITEMS",
    image: health,
  },
  {
    title: "Outdoor & Leisure",
    caption: "0,000 ITEMS",
    image: outdoor,
  },
  {
    title: "Auto, Home & Tools",
    caption: "0,000 ITEMS",
    image: auto,
  },
  {
    title: "Baby",
    caption: "0,000 ITEMS",
    image: baby,
  },
];

export default function SwagmagicCatalog() {
  return (
    <HorizontalCarousel
      caption="The Catalog"
      captionColor="#10995a"
      title="25,000+ products. Hundreds of brands. One catalog."
      description="Not your generic promo catalog. Browse premium brands across every category, all ready to customize with your logo."
      variant="catalog"
      items={items}
    />
  );
}
