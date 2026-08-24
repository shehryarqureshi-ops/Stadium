"use client";

import swagKits from '@/public/swag/everything/swag-kits.png'
import brandedStores from '@/public/swag/everything/branded-stores.png'
import onDemand from '@/public/swag/everything/on-demand.png'
import bulkSwag from '@/public/swag/everything/bulk-swag.png'
import selfServe from '@/public/swag/everything/self-serve.png'
import swagStorage from '@/public/swag/everything/swag-storage.png'

import PillTabs from "./common/PillTabs";

const items = [
  {
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
    cta: 'Build a kit',
    image: swagKits,
    href: "#",
  },
  {
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
    cta: 'See stores',
    image: brandedStores,
    href: "#",
  },
  {
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
    cta: 'Order on demand',
    image: onDemand,
    href: "#",
  },
  {
    name: "Bulk Swag",
    tab: "Bulk Swag",
    title: "Bulk Swag",
    description:
      "Order swag in bulk–the more you order, the less each piece costs. We'll store your swag until you’re ready.",
    bullets: [
      "Volume discounts based on quantities ordered",
      "Storage for events, gifting, and more",
      "Ship to one or multiple locations",
    ],
    cta: 'Get bulk pricing',
    image: bulkSwag,
    href: "#",
  },
  {
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
    cta: 'Start designing',
    image: selfServe,
    href: "#",
  },
  {
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
    cta: 'See storage',
    image: swagStorage,
    href: "#",
  },
];

export default function SwagmagicOfferings() {
  return (
    <PillTabs
      caption="Everything swag"
      captionColor="#10995a"
      title="Every fulfillment model, one setup"
      description="Whether you print swag on demand, buy in bulk, or pull from stock, Stadium's does all three. Most vendors only do one."
      autoAdvance={false}
      glowColor="#00C036"
      items={items}
    />
  );
}
