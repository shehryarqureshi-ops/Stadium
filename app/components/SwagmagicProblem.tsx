import photoVendors from "@/public/swag2/sw2-problem-vendors.jpg";
import photoCloset from "@/public/swag2/sw2-problem-closet.jpg";
import photoLogistics from "@/public/swag2/sw2-problem-logistics.jpg";

import ProblemSection, {
  type ProblemSectionItem,
} from "@/app/components/common/ProblemSection";

const items: ProblemSectionItem[] = [
  {
    image: photoVendors,
    imageAlt:
      "A stockroom manager checking paperwork over a packed swag box, apparel rail behind",
    title: "One vendor becomes four",
    description:
      "Swag, kits, and fulfillment each need their own vendor, login, and invoice.",
  },
  {
    image: photoCloset,
    imageAlt:
      "Someone packing a box beside shelves crowded with overflowing swag cartons",
    title: "The swag closet keeps growing",
    description:
      "Boxes pile up, inventory becomes outdated, and reorders end up being a guess.",
  },
  {
    image: photoLogistics,
    imageAlt:
      "A person on the phone sorting stacks of folded apparel across a work table",
    title: "Logistics adds up fast",
    description:
      "Sizes, shipments, invoices, and customs paperwork for every country your team lives in.",
  },
];

export default function SwagmagicProblem() {
  return (
    <ProblemSection
      caption="The problem"
      captionColor="#10995a"
      title="Swag becomes its own supply chain"
      description="Swag starts as one task: choosing what to send. Before long, you’re managing vendors, boxes, and spreadsheets full of addresses."
      items={items}
    />
  );
}
