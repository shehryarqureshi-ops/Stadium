import type { Metadata } from "next";

import CalloutCard from "@/app/components/common/CalloutCard";
import HorizontalCarousel from "@/app/components/common/HorizontalCarousel";
import ImageShowcase from "@/app/components/common/ImageShowcase";
import IntegrationDetail from "@/app/components/common/IntegrationDetail";
import SplitFeature from "@/app/components/common/SplitFeature";
import { LINKS } from "@/app/components/impact/shared";

import catalogFilters from "@/public/csr/catalog-filters.png";
import footprint from "@/public/csr/footprint.png";
import giveBack from "@/public/csr/give-back.png";
import madeToOrder from "@/public/csr/made-to-order.png";
import statement from "@/public/csr/statement.png";

export const metadata: Metadata = {
  title: "Sustainability & Impact — Better choices, built into every send | Stadium",
  description: "Cut waste, simplify sourcing, fulfill locally, and support social impact.",
};

/* /csr — Figma n9SjmDjzB1PeZAYJ5w43fr → 3876:14003. Collection cards have no
   imagery in Figma (grey placeholders). */

export default function CsrPage() {
  return (
    <IntegrationDetail
      hero={{
        eyebrow: "Sustainability & impact",
        title: "Better choices, built into every send",
        description: "Cut waste, simplify sourcing, fulfill locally, and support social impact.",
        primaryCta: { label: "Talk to sales", href: LINKS.sales },
        secondaryCta: { label: "Explore the platform", href: LINKS.platform },
      }}
      closingSections={
        <>
          <HorizontalCarousel
            variant="collection"
            transparent
            caption="Curated collections"
            captionColor="#16171b"
            title="Make sustainable shopping easier"
            description="Choose from curated shops and snack boxes built around sustainability and social impact."
            items={[
              { title: "Recognition", description: "Kudos, points, and rewards." },
              { title: "Swag", description: "Branded shops, kits, and global fulfillment." },
              { title: "Snacks", description: "Curated snack boxes with dietary needs built in." },
              { title: "Gifting", description: "Employee choice, personalized sends, and global delivery." },
            ]}
          />
          <CalloutCard
            caption="Responsible business"
            title="Modern Slavery Statement"
            description="Read Stadium’s statement on modern slavery and responsible business practices."
            cta={{ label: "Download statement", href: "#" }}
            image={statement}
            imageAlt="Modern Slavery Statement 2026 document with a PDF download chip"
          />
        </>
      }
      cta={{
        title: "Ready to rethink how you send at scale?",
        description: "See how Stadium brings sustainability and social impact to global gifting and swag programs.",
        primary: { label: "Talk to sales", href: LINKS.sales },
      }}
    >
      <SplitFeature
        caption="On-demand swag"
        title="Produce swag only after it’s chosen"
        description="Reduce excess inventory by producing items after recipients make their selection."
        image={madeToOrder}
        imageAlt="Made to order: an apparel pack chosen today, in production now, shipping Nov 6, with 0 excess inventory"
      />

      <SplitFeature
        reverse
        caption="Responsible sourcing"
        title="Source products that reflect your company’s values"
        description="Explore sustainable products alongside small, emerging, women-owned, and other diverse brands."
        image={catalogFilters}
        imageAlt="Catalog filters for sustainable, women-owned, small business, and diverse-owned products with matching results"
      />

      <ImageShowcase
        caption="Global fulfillment"
        title="Reduce the footprint of global programs"
        description="Local fulfillment across 170+ countries means fewer miles in transit and lower emissions."
        image={footprint}
        imageAlt="Fulfillment footprint map of local hubs: 92% shipped locally, 340 km average distance, 170+ countries"
        framed={false}
        footnote="Our packaging uses recycled materials and non-toxic colors."
      />

      <SplitFeature
        caption="Snack & Give Back"
        title="Create impact beyond your recipients"
        description={
          <>
            Through <a href={LINKS.snacks}>Snack &amp; Give Back</a>, Stadium donates snacks to organizations in need.
          </>
        }
        cta={{ label: "Nominate an organization", href: LINKS.sales }}
        image={giveBack}
        imageAlt="Snack & Give Back impact: 1,240 snacks donated this year to a community food bank and a youth center"
      />
    </IntegrationDetail>
  );
}
