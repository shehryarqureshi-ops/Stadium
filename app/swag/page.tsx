import type { Metadata } from "next";
import PageClose from "../components/PageClose";
import SiteHeader from "../components/SiteHeader";
import SwagHero from "../components/SwagHero";

export const metadata: Metadata = {
  title: "Swag — The infrastructure behind every swag program | Stadium",
  description:
    "Stop coordinating vendors separately. Run your entire swag program on one platform, one PO — branded stores, inventory, and global fulfillment to 170+ countries.",
};

export default function SwagPage() {
  return (
    <>
      <SiteHeader />
      <main
        id="main"
        tabIndex={-1}
        className="flex flex-1 flex-col outline-none overflow-x-clip"
      >
        <SwagHero />
      </main>
      <PageClose />
    </>
  );
}
