import type { Metadata } from "next";
import JsonLd from "@/app/components/seo/JsonLd";
import { seoMetadata } from "@/app/lib/seo/metadata";

import FeatureDetails from "@/app/components/common/FeatureDetails";
import ImageShowcase from "@/app/components/common/ImageShowcase";
import ImpactClosing from "@/app/components/common/ImpactClosing";
import LogoBridge from "@/app/components/common/LogoBridge";
import NumberedOfferings from "@/app/components/common/NumberedOfferings";
import PillTabs from "@/app/components/common/PillTabs";
import StickyStepCards from "@/app/components/common/StickyStepCards";
import TeamHero from "@/app/components/common/TeamHero";
import VariableCardGrid from "@/app/components/common/VariableCardGrid";
import ImpactPageShell, { TeamDivider } from "@/app/components/impact/ImpactPageShell";
import { CASE_STUDY_CAPTION, ENGAGE_OFFERINGS, HR_TOOLS, LINKS } from "@/app/components/impact/shared";

import problem1 from "@/public/impact/hr/problem-1.png";
import problem2 from "@/public/impact/hr/problem-2.png";
import problem3 from "@/public/impact/hr/problem-3.png";
import problem4 from "@/public/impact/hr/problem-4.png";
import recogSlack from "@/public/impact/hr/recognition-slack.png";
import recogFeed from "@/public/impact/hr/recognition-feed.png";
import recogPoints from "@/public/impact/hr/recognition-points.png";
import tabOnboarding from "@/public/impact/hr/tab-onboarding.jpg";
import workspace from "@/public/impact/hr/workspace.png";

export const metadata: Metadata = seoMetadata("/impact/hr");

/* /impact/hr — Figma n9SjmDjzB1PeZAYJ5w43fr → 3998:9271. Tabs other than
   "Onboarding" have no Figma content: their copy comes from the HR use cases
   in the Impact by Team menu (ImpactMenu.tsx) with placeholder imagery. */

const HRIS_LEFT = [
  { src: "/impact/hr/logos/gusto.svg", alt: "Gusto", width: 114, height: 44 },
  { src: "/impact/hr/logos/adp.svg", alt: "ADP", width: 85, height: 40 },
  { src: "/impact/hr/logos/ukg.svg", alt: "UKG", width: 99, height: 40 },
  { src: "/impact/hr/logos/zelt.svg", alt: "Zelt", width: 102, height: 42 },
];
const HRIS_RIGHT = [
  {
    src: "/impact/hr/logos/hris-right-group.svg",
    alt: "Sage, Ashby, HR Cloud, and Lano",
    width: 534,
    height: 60,
  },
];

export default function HrPage() {
  return (
    <>
      <JsonLd path="/impact/hr" />
    <ImpactPageShell
      hero={
        <TeamHero
          eyebrow="Stadium for HR"
          title="Everything you do to engage your people, on one platform"
          description="Recognition, onboarding, milestones, swag, gifting, and more–connected to your HR tools and easier to run at scale."
          primaryCta={{ label: "Talk to sales", href: LINKS.sales }}
          secondaryCta={{ label: "Explore the platform", href: LINKS.platform }}
        />
      }
      closing={
        <ImpactClosing
          cta={{
            caption: "Get started",
            title: "Build a better employee experience–without more admin",
            description:
              "See how Stadium simplifies recognition, milestones, gifting, swag, and more across the employee journey.",
            primary: { label: "Talk to sales", href: LINKS.sales },
            secondary: { label: "See the platform", href: LINKS.platform },
          }}
        >
          <VariableCardGrid
            background="transparent"
            caption={CASE_STUDY_CAPTION}
            captionColor="#16171b"
            title="See how HR teams use Stadium"
            items={[
              { title: "Everflow", description: "Made recognition more visible and rewarding while cutting hours of manual HR work." },
              { title: "Keyfactor", description: "Scaled recognition across its global workforce, reaching a record 1,000 recognition posts in a single month." },
              { title: "Octus", description: "Built a global swag and gifting program that scaled employee engagement with less manual work." },
            ]}
          />
        </ImpactClosing>
      }
    >
      <VariableCardGrid
        caption="The problem"
        captionColor="#16171b"
        title={
          <>
            You own the employee experience.
            <br className="hidden md:block" /> The work behind it is everywhere.
          </>
        }
        description="Managing programs across disconnected tools, vendors, and workflows means more manual work–and less visibility into what’s happening."
        gridColumns={4}
        imageStyle="panel"
        items={[
          { image: problem1, imageAlt: "Kudos by week chart showing the last kudos 23 days ago", description: "Recognition isn’t happening consistently." },
          { image: problem2, imageAlt: "Programs spread across a spreadsheet, a swag portal, a gift card site, and a kudos app", description: "Programs are fragmented." },
          { image: problem3, imageAlt: "A to-do list of manual HR tasks worth 11 hours", description: "Manual work eats up HR’s time." },
          { image: problem4, imageAlt: "Engagement score falling 14% as headcount grows", description: "More and engagement are harder to maintain at scale." },
        ]}
        footnote="You don’t need another point solution. You need the infrastructure to run employee engagement–and see how it’s working."
      />

      <TeamDivider />

      <LogoBridge
        caption="Simplify your tech stack"
        title="Do more with fewer tools"
        description="Bring employee engagement programs together to reduce vendors, manual workflows, and the costs that come with managing them separately."
        logos={HR_TOOLS}
      />

      <StickyStepCards
        caption="Everyday recognition"
        captionColor="#16171b"
        title="Make recognition part of your culture"
        description="Give people an easy way to celebrate great work, reinforce company values, and build morale through everyday recognition."
        steps={[
          {
            image: recogSlack,
            imageAlt: "Giving kudos with the Stadium command in a Slack channel",
            title: "Where your team already talks",
            content: (
              <FeatureDetails
                description="Give kudos without leaving Slack or Teams, making recognition easy to fit into the workday."
                bullets={["Native Slack & Teams integration", "Employee-to-employee kudos", "Tied to company values"]}
                link={{ label: "Powered by recognition", href: LINKS.recognition }}
              />
            ),
          },
          {
            image: recogFeed,
            imageAlt: "Recognition insights: 1,284 kudos this month and top company values",
            title: "See recognition in real time",
            content: (
              <FeatureDetails
                description="A live feed makes recognition visible across the company, while program activity gives HR a clearer view of participation."
                bullets={["Real-time recognition feed", "Company-wide visibility", "Tied to company values"]}
                link={{ label: "Powered by recognition", href: LINKS.recognition }}
              />
            ),
          },
          {
            image: recogPoints,
            imageAlt: "Kudos turning into 3,250 points redeemed for tech accessories",
            title: "Make recognition more rewarding",
            content: (
              <FeatureDetails
                description="Kudos turn into points that employees redeem for rewards they want."
                bullets={["25,000+ reward options", "Options for every interest", "Hands-off fulfillment"]}
                link={{ label: "Powered by recognition", href: LINKS.recognition }}
              />
            ),
          },
        ]}
      />

      <PillTabs
        caption="Across the employee journey"
        captionColor="#16171b"
        title="Every employee moment, easier to manage"
        description="Automate recurring milestones from your HRIS, so important employee moments happen without adding more work for HR."
        autoAdvance={false}
        items={[
          {
            name: "Onboarding",
            tab: "Onboarding",
            title: "Welcome them from day one",
            description: "Set up the experience once, and Stadium handles each new hire from there.",
            bullets: ["Triggered from your HRIS", "Branded welcome kits", "Ships to 170+ countries"],
            image: tabOnboarding,
            imageAlt: "A new hire unboxing a branded welcome kit",
          },
          { name: "Anniversaries", tab: "Anniversaries", title: "Work Anniversaries", description: "Gifts and recognition for years of service." },
          { name: "Birthdays", tab: "Birthdays", title: "Birthdays & Life Moments", description: "Gifts for birthdays, weddings, new babies, and more." },
          { name: "Wellness", tab: "Wellness", title: "Wellness Programs", description: "Wellness gifts, snack boxes, and care packages." },
          { name: "Holidays", tab: "Holidays", title: "Holiday & Year-End Gifting", description: "Holiday gifts for teams around the world." },
          { name: "All-hands", tab: "All-hands", title: "All-Hands & Team Events", description: "Swag, snacks, and event kits for company gatherings." },
          { name: "Offboarding", tab: "Offboarding", title: "Offboarding & Farewells", description: "Thoughtful gifts for departures and retirements." },
        ]}
      />

      <LogoBridge
        caption="HRIS + ATS integrations"
        title="Built into how you already work"
        description="Connect Stadium with your HRIS, ATS, and workplace tools to keep employee data and programs in sync."
        logos={HRIS_LEFT}
        rightLogos={HRIS_RIGHT}
        logoOpacity={1}
      />

      <ImageShowcase
        caption="Company workspace"
        title="See your employee programs in one place"
        description="Manage programs, activity, and spending from one Workspace, with visibility across the employee experience."
        image={workspace}
        imageAlt="Stadium People programs workspace showing onboarding kits, recognition, work anniversaries, wellness boxes, and recent activity"
        framed={false}
        footnote="See Team Activity. Track Company Spending. Keep Programs Visible."
      />

      <NumberedOfferings
        caption="Employee engagement"
        title="One platform. More ways to engage your people."
        description="Use Stadium across recognition, swag, snacks, and gifting as your employee programs evolve."
        items={ENGAGE_OFFERINGS}
      />
    </ImpactPageShell>
    </>
  );
}
