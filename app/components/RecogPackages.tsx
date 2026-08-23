import Packages from "@/app/components/common/Packages";

const ITEMS = [
  {
    title: "Shops Pass",
    description:
      "Branded stores, on-demand, and 25,000+ items in the catalog. and the full catalog.",
  },
  {
    title: "Swag Pass",
    description: "Plus warehousing, inventory, and kits.",
  },
  {
    title: "Engagement Pass",
    description: "+ Automation, integrations, and recognition.",
    isFeatured: true,
    featuredLabel: "Popular",
    featuredColor: "#6b33db",
  },
  {
    title: "Enterprise Pass",
    description:
      "Plus SSO, API, net terms, and a dedicated CSM.",
  },
];

export default function RecogPackages() {
  return (
    <Packages
      caption="Stadium packages"
      captionColor="#6b33db"
      title={"Simple pricing,\nper person"}
      description="Start with kudos, then add rewards, automations, and analytics when you're ready. You only pay for active people."
      showCta
      ctaLabel="See full pricing"
      ctaLink="#"
      items={ITEMS}
    />
  );
}