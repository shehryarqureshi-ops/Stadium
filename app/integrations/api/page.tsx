import type { Metadata } from "next";

import JsonLd from "@/app/components/seo/JsonLd";
import { seoMetadata } from "@/app/lib/seo/metadata";

import ImageShowcase from "@/app/components/common/ImageShowcase";
import IntegrationDetail from "@/app/components/common/IntegrationDetail";
import NumberedMediaList from "@/app/components/common/NumberedMediaList";
import PillTabs from "@/app/components/common/PillTabs";
import { LINKS } from "@/app/components/impact/shared";

import contactUs from "@/public/integrations/api/contact-us.png";
import endpoints from "@/public/integrations/api/endpoints.png";
import experiences from "@/public/integrations/api/experiences.png";
import technicalSetup from "@/public/integrations/api/technical-setup.png";

export const metadata: Metadata = seoMetadata("/integrations/api");

/* /integrations/api — Figma n9SjmDjzB1PeZAYJ5w43fr → 3867:5113. Tabs other
   than "Embedded gifting" have no Figma content (placeholder copy). */

const DOCS = "#";

export default function ApiPage() {
  return (
    <>
      <JsonLd path="/integrations/api" />
      <IntegrationDetail
        hero={{
          eyebrow: "Stadium API",
          title: "Build gifting into your product, not from scratch",
          description: "Add gifting, rewards, and swag to your products and workflows, backed by Stadium’s fulfillment.",
          primaryCta: { label: "Talk to sales", href: LINKS.sales },
          secondaryCta: { label: "View API docs", href: DOCS },
        }}
        closingSections={
          <NumberedMediaList
            caption="Get connected"
            title="Get started with Stadium’s API"
            description="Our team will help you plan your setup and put it into action."
            cta={{ label: "View API docs", href: DOCS }}
            items={[
              {
                title: "Contact Us",
                description: "Talk to your Customer Success Manager or our Sales team about your goals and what you want to build.",
                image: contactUs,
                imageAlt: "A message to a Customer Success Manager about what you want to build, with a Book a call button",
              },
              {
                title: "Technical Setup",
                description: "Work with our engineering team to set up the API for your needs.",
                image: technicalSetup,
                imageAlt: "A POST /v1/orders API request returning 200 OK, order created",
              },
            ]}
          />
        }
        moreWays={{
          title: "Connect Stadium across your tech stack",
          description: "Explore HRIS, CRM, webhooks, and other integrations for the tools your teams already use.",
        }}
        cta={{
          title: "Build on Stadium’s gifting infrastructure",
          description:
            "Create the gifting and reward experiences you need with Stadium’s catalog, ordering, and fulfillment behind them.",
          primary: { label: "Talk to sales", href: LINKS.sales },
          secondary: { label: "View API docs", href: DOCS },
        }}
      >
        <ImageShowcase
          caption="Stadium infrastructure"
          title="Leave the backend to Stadium"
          description="Access Stadium’s catalog, ordering, recipient experience, and fulfillment through a single API."
          image={endpoints}
          imageAlt="Stadium workspace API page listing endpoints for catalog, orders, and recipients"
          framed={false}
        />

        <PillTabs
          caption="What you can build"
          captionColor="#16171b"
          title="Add gifting and rewards where they matter most"
          description="Shape the API around how your organization works."
          autoAdvance={false}
          items={[
            {
              name: "Embedded gifting",
              tab: "Embedded gifting",
              title: "Make gifting part of your product",
              description: "Let users send or receive gifts and rewards without switching platforms.",
            },
            { name: "Customer advocacy", tab: "Customer advocacy", title: "Reward your advocates", description: "Thank customers for referrals, reviews, and feedback automatically." },
            { name: "Gamification", tab: "Gamification", title: "Make progress rewarding", description: "Unlock rewards as users hit milestones inside your product." },
            { name: "Swag programs", tab: "Swag programs", title: "Power swag programs", description: "Order and ship branded swag from your own tools." },
            { name: "Employee recognition", tab: "Employee recognition", title: "Recognize your people", description: "Connect recognition in your internal tools to real rewards." },
            { name: "Custom workflows", tab: "Custom workflows", title: "Build it your way", description: "Combine catalog, ordering, and fulfillment into any workflow you need." },
          ]}
        />

        <ImageShowcase
          caption="Built to scale"
          title="Connect once. Build from there."
          description="Add new gifting and reward experiences as your needs evolve."
          image={experiences}
          imageAlt="Stadium workspace API page listing the gifting and reward experiences built on one connection"
          framed={false}
        />
      </IntegrationDetail>
    </>
  );
}
