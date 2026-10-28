"use client";

import swagKits from "@/public/swag/everything/swag-kits.png";
import brandedStores from "@/public/swag/everything/branded-stores.png";
import onDemand from "@/public/swag/everything/on-demand.png";
import bulkSwag from "@/public/swag/everything/bulk-swag.png";
import selfServe from "@/public/swag/everything/self-serve.png";
import swagStorage from "@/public/swag/everything/swag-storage.png";

import PillTabs from "./common/PillTabs";

const items = [
  {
    id: "swag-kits",
    name: "Swag Kits",
    tab: "Swag Kits",
    title: "Swag Kits",
    description:
      "Curated kits, assembled and shipped as one. Pick the pieces; we handle kitting and delivery.",
    bullets: [
      "Custom kits for onboarding, events, and milestones.",
      "We assemble, pack, and ship to every recipient.",
      "Track every kit from warehouse to doorstep.",
    ],
    cta: "Build a kit",
    image: swagKits,
    href: "/catalog#swag",
  },
  {
    id: "branded-stores",
    name: "Branded Stores",
    tab: "Branded Stores",
    title: "Branded Stores",
    description:
      "A branded store your whole team can order from. Budgets and approvals keep spend in control.",
    bullets: [
      "Your logo, your catalog, your rules.",
      "Per-team budgets, approvals, and SSO.",
      "Orders ship from inventory automatically.",
    ],
    cta: "See stores",
    image: brandedStores,
    href: "/book-a-call",
  },
  {
    id: "on-demand-swag",
    name: "On-Demand Swag",
    tab: "On-Demand Swag",
    title: "On-Demand Swag",
    description:
      "Order what you need, when you need it. No minimums, no warehouse required.",
    bullets: [
      "Print-on-demand across the full catalog.",
      "Ship a single item or a thousand.",
      "Reorder favorites in a click.",
    ],
    cta: "Order on demand",
    image: onDemand,
    href: "/catalog#swag",
  },
  {
    id: "bulk-swag",
    name: "Bulk Swag",
    tab: "Bulk Swag",
    title: "Bulk Swag",
    description:
      "Order swag in bulk–the more you order, the less each piece costs. We'll store your swag until you’re ready.",
    bullets: [
      "Volume discounts based on quantities ordered.",
      "Storage for events, gifting, and more.",
      "Ship to one or multiple locations.",
    ],
    cta: "Get bulk pricing",
    image: bulkSwag,
    href: "/book-a-call",
  },
  {
    id: "self-serve-swag",
    name: "Self-Serve Swag",
    tab: "Self-Serve Swag",
    title: "Self-serve Swag",
    description:
      "Design it, order it, send it — yourself. Everything you need in one simple flow.",
    bullets: [
      "Design online with live previews.",
      "Send to addresses you already have.",
      "Pay as you go, no contract.",
    ],
    cta: "Start designing",
    image: selfServe,
    href: "/catalog#swag",
  },
  {
    id: "swag-storage",
    name: "Swag Storage",
    tab: "Swag Storage",
    title: "Swag Storage",
    description:
      "We warehouse your swag until it’s needed. Kitting and fulfillment included.",
    bullets: [
      "Free up your office and closets.",
      "Real-time inventory across every SKU.",
      "Ship from storage on demand.",
    ],
    cta: "See storage",
    image: swagStorage,
    href: "/book-a-call",
  },
];

export default function SwagmagicOfferings() {
  return (
    <PillTabs
      caption="Swag Options"
      captionColor="#0e8850"
      title="Every fulfillment model, one setup"
      description="Whether you print swag on demand, buy in bulk, or pull from stock, Stadium does all three. Most vendors only do one."
      autoAdvance={false}
      glowColor="#00C036"
      items={items}
    />
  );
}
