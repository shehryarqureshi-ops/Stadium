import Packages from "./common/Packages";

const ITEMS = [
  {
    title: "Shops Pass",
    description:
      "Branded stores, on-demand, and the full catalog.",
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
    featuredColor: "#0e8850",
  },
  {
    title: "Enterprise Pass",
    description:
      "Plus SSO, API, net terms, and a dedicated CSM.",
  },
];

export default function SwagmagicPackages() {
  return (
    <Packages
      caption="STADIUM PASSES"
      captionColor="#0e8850"
      title={"Start with swag and expand when ready"}
      description="Add new capabilities over time without changing platforms."
      showCta
      ctaBelowText
      ctaLabel="Explore pricing"
      ctaLink="/pricing"
      items={ITEMS}
    />
  );
}
