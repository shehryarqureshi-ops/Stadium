import photoVendors from "@/public/swag2/sw2-problem-vendors.webp";
import photoCloset from "@/public/swag2/sw2-problem-closet.webp";
import photoLogistics from "@/public/swag2/sw2-problem-logistics.webp";

import ProblemSection, {
  type ProblemSectionItem,
} from "@/app/components/common/ProblemSection";

const items: ProblemSectionItem[] = [
  {
    image: photoVendors,
    imageAlt:
      "A man resting his chin on his hand over a table of separate vendor boxes and invoices from four different carriers",
    title: "One vendor becomes four",
    description:
      "Swag, kits, and fulfillment each need their own vendor, login, and invoice.",
  },
  {
    image: photoCloset,
    imageAlt:
      "A woman reaching up to restock a shelf crowded with folded apparel and swag cartons",
    title: "The swag closet keeps growing",
    description:
      "Boxes pile up, inventory becomes outdated, and reorders end up being a guess.",
  },
  {
    image: photoLogistics,
    imageAlt:
      "A person on the phone holding a ship-to city checklist beside size-labelled stacks of folded apparel",
    title: "Logistics adds up fast",
    description:
      "Sizes, shipments, invoices, and customs paperwork for every country your team lives in.",
  },
];

export default function SwagmagicProblem() {
  return (
    <ProblemSection
      caption="The problem"
      captionColor="#0e8850"
      title="Swag becomes its own supply chain"
      description="Swag starts as one task: choosing what to send. Before long, you’re managing vendors, boxes, and spreadsheets full of addresses."
      items={items}
    />
  );
}
