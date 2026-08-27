"use client";

import StepCardsCarousel, {
  type StepCardsCarouselStep,
} from "@/app/components/common/StepCardsCarousel";
import InviteTeamLoop from "./InviteTeamLoop";
import RolesPermissionsLoop from "./RolesPermissionsLoop";
import WalletSetupLoop from "./WalletSetupLoop";
import IntegrationsLoop from "./IntegrationsLoop";
import SlackTeamsLoop from "./SlackTeamsLoop";
import SsoDomainLoop from "./SsoDomainLoop";
import ShopsLoop from "./ShopsLoop";
import KitsLoop from "./KitsLoop";
import KudosLoop from "./KudosLoop";
import AutomationsLoop from "./AutomationsLoop";
import BulkSwagLoop from "./BulkSwagLoop";
import SendPointsLoop from "./SendPointsLoop";
import RedemptionLoop from "./RedemptionLoop";

const STILL = "/motion/still";

const steps: StepCardsCarouselStep[] = [
  {
    title: "Set up your workspace",
    description:
      "Connect Slack and Teams so recognition and rewards reach people in the tools they already use and celebrate each win.",
    cards: [
      {
        caption: "Setup · Team",
        title: "Invite Your Team",
        description: "Add members and assign who does what.",
        content: <InviteTeamLoop />,
      },
      {
        caption: "Setup · Permissions",
        title: "Roles & Permissions",
        description: "Scope send, approve, and spend per person.",
        content: <RolesPermissionsLoop />,
      },
      {
        caption: "Setup · Wallet",
        title: "Fund Your Wallet",
        description: "One balance for every send, topped up your way.",
        content: <WalletSetupLoop />,
      },
      {
        caption: "Setup · Integrations",
        title: "Connect Your Stack",
        description: "Sync your HRIS, CRM, and the tools you run.",
        content: <IntegrationsLoop />,
      },
      {
        caption: "Setup · Slack",
        title: "Install in Slack",
        description: "Bring Stadium into the tools your team lives in.",
        content: <SlackTeamsLoop />,
      },
      {
        caption: "Setup · SSO",
        title: "Single Sign-On",
        description: "Secure access through your identity provider.",
        content: <SsoDomainLoop />,
      },
    ],
  },
  {
    title: "Assembly",
    description:
      "What can be given, how it is bundled, who gives it, and when it fires.",
    cards: [
      {
        caption: "Assembly · Week 1",
        title: "Shops",
        description:
          "Start from a template or a blank shop, curate it, and publish. Then watch people shop it.",
        content: <ShopsLoop />,
      },
      {
        caption: "Assembly · Week 2",
        title: "Kits",
        description:
          "Pick the kind, choose what goes in, and the kit is made and held ready to send.",
        content: <KitsLoop />,
      },
      {
        caption: "Assembly · Week 3",
        title: "Kudos programs",
        description:
          "Name it, pick who is in, set the monthly allowance, and watch the first kudo land.",
        content: <KudosLoop />,
      },
      {
        caption: "Assembly · Week 4",
        title: "Automations",
        description:
          "Set the trigger, the gift and the message, and it sends itself. Nothing to pay today.",
        content: <AutomationsLoop />,
      },
    ],
  },
  /* Tabs 3 and 4 of the board are not animated yet, so each card shows the one
     board frame that carries its argument on its own. The captions are the tab
     heading's own clauses: ENGAGE reads STOCK IT, SPEND IT, THEY CHOOSE, THEY
     RECOGNISE, IT RUNS ITSELF, which is one clause per bundle. Exported at 2x
     from Figma 1911:19134, then JPEG at 4:4:4 so the small type stays sharp. */
  {
    title: "Engage",
    description:
      "Stock it, spend it, and then let the people it is for do the choosing.",
    cards: [
      {
        caption: "Engage · Stock it",
        title: "Bulk swag",
        description:
          "Order in volume and the unit price falls as the quantity rises. What arrives goes into your locker.",
        content: <BulkSwagLoop />,
      },
      {
        caption: "Engage · Spend it",
        title: "Send points",
        description:
          "Pick an amount and an audience, and the points are theirs to spend the moment they land.",
        content: <SendPointsLoop />,
      },
      {
        caption: "Engage · They choose",
        title: "Redemption",
        description:
          "They open the shop you curated, pick the thing they actually want, and it ships to them.",
        content: <RedemptionLoop />,
      },
      {
        caption: "Engage · They recognise",
        title: "Kudos in use",
        description:
          "One person thanks another in front of everybody, and the feed fills up with the reasons.",
        image: `${STILL}/still-kudos-in-use.jpg`,
        imageAlt: "A recognition feed showing a thank you worth 50 kudos",
      },
      {
        caption: "Engage · It runs itself",
        title: "New hire kits",
        description:
          "The rule fires on the start date, they pick their own size, and the kit lands on day one.",
        image: `${STILL}/still-new-hire-kits.jpg`,
        imageAlt: "A kit landed on day one for Alex, size M, in Berlin",
      },
    ],
  },
  {
    title: "90 Day World",
    description:
      "Evidence, then judgement, then the change that follows from it.",
    cards: [
      {
        caption: "90 Day World · Evidence",
        title: "Quarterly reporting",
        description:
          "What was delivered, what was never redeemed, and what people said once it landed.",
        image: `${STILL}/still-reporting.jpg`,
        imageAlt:
          "A quarterly report showing 1,204 gifts delivered and 94% redeemed in 30 days",
      },
      {
        caption: "90 Day World · Judgement",
        title: "Best practices",
        description:
          "It reads your own quarter and names the one change worth making, with the reason.",
        image: `${STILL}/still-best-practices.jpg`,
        imageAlt:
          "A card advising a reminder at day 7 rather than day 14, because unredeemed gifts went quiet in week one",
      },
      {
        caption: "90 Day World · Refresh",
        title: "Catalog refreshes",
        description:
          "New drops go into the shop you chose, and never into a catalog everybody shares.",
        image: `${STILL}/still-catalog-refresh.jpg`,
        imageAlt:
          "A shop gone live with 3 items added, noting they were added to this shop and not to a global catalog",
      },
      {
        caption: "90 Day World · Growth",
        title: "Experiences",
        description:
          "A class, a dinner or a day out, added to a shop and paid for in the same points.",
        image: `${STILL}/still-experiences.jpg`,
        imageAlt:
          "A toggle adding experiences to the Branded Shop, where recipients spend points on a class or a dinner",
      },
    ],
  },
];

/* /swag runs this same section on a different dataset — the decoration-methods
   board, Figma 2262:13635 — so the content is props with the homepage copy as
   the default. Same component, two datasets; the homepage is untouched.

   Twelve methods across six outcomes, 23 placements. Several methods appear in
   more than one outcome, and three of them are a DIFFERENT photo each time
   (Embossing, Embroidery, DTF), so those ship a second file with a `-b` suffix
   rather than being deduped by name. Card images are the exact fill each card
   node carries: FILL = centred cover, CROP = the node's own imageTransform
   window. Sources are transparent PNGs sitting on a white card, so they are
   flattened onto white — flattening to black is what put a black box behind
   the DTF shirt. Shipped at 548x500 = 2x the 274x250 slot, and every card was
   checked against Figma's own render of its row (worst MAE 5.7/255). */
const DECO = "/swag2/deco";

const decorationSteps: StepCardsCarouselStep[] = [
  {
    title: "Looks expensive",
    description:
      "Pressed or foiled into the surface, never ink sitting on top.",
    cards: [
      {
        title: "Debossing",
        description: "Blind · 50 pc · 12 day",
        image: `${DECO}/debossing.jpg`,
        imageAlt: "",
      },
      {
        title: "Embossing",
        description: "Raised · 50 pc · 12 day",
        image: `${DECO}/embossing.jpg`,
        imageAlt: "",
      },
      {
        title: "Foil Printing",
        description: "Metallic · 50 pc · 10 day",
        image: `${DECO}/foil-printing.jpg`,
        imageAlt: "",
      },
      {
        title: "Laser Engraving",
        description: "Permanent · 24 pc · 10 day",
        image: `${DECO}/laser-engraving.jpg`,
        imageAlt: "",
      },
    ],
  },
  {
    title: "Survives everything",
    description:
      "The mark outlives the product. Nothing to crack, peel or wash off.",
    cards: [
      {
        title: "Laser Engraving",
        description: "Permanent · 24 pc · 10 day",
        image: `${DECO}/laser-engraving.jpg`,
        imageAlt: "",
      },
      {
        title: "Laser Etching",
        description: "Metal finish · 24 pc · 10 day",
        image: `${DECO}/laser-etching.jpg`,
        imageAlt: "",
      },
      {
        title: "Embroidery",
        description: "12 threads · 24 pc · 10 day",
        image: `${DECO}/embroidery.jpg`,
        imageAlt: "",
      },
      {
        title: "Debossing",
        description: "Blind · 50 pc · 12 day",
        image: `${DECO}/debossing.jpg`,
        imageAlt: "",
      },
    ],
  },
  {
    title: "Full colour artwork",
    description:
      "Gradients, photographs and unlimited colours, with no per-colour cost.",
    cards: [
      {
        title: "DTG",
        description: "Full colour · 1 pc · 5 day",
        image: `${DECO}/dtg.jpg`,
        imageAlt: "",
      },
      {
        title: "DTF",
        description: "Full colour · 12 pc · 5 day",
        image: `${DECO}/dtf.jpg`,
        imageAlt: "",
      },
      {
        title: "Sublimation",
        description: "All-over · 24 pc · 12 day",
        image: `${DECO}/sublimation.jpg`,
        imageAlt: "",
      },
      {
        title: "Rotary Printing",
        description: "Full colour · 12 pc · 8 day",
        image: `${DECO}/rotary-printing.jpg`,
        imageAlt: "",
      },
    ],
  },
  {
    title: "Small runs, no setup",
    description: "No screens, no dies. Sensible from a single piece.",
    cards: [
      {
        title: "DTG",
        description: "Full colour · 1 pc · 5 day",
        image: `${DECO}/dtg.jpg`,
        imageAlt: "",
      },
      {
        title: "Vinyl Cut",
        description: "1-3 colours · 1 pc · 4 day",
        image: `${DECO}/vinyl-cut.jpg`,
        imageAlt: "",
      },
      {
        title: "Laser Etching",
        description: "Metal finish · 24 pc · 10 day",
        image: `${DECO}/laser-etching.jpg`,
        imageAlt: "",
      },
    ],
  },
  {
    title: "Big runs, low unit cost",
    description: "Setup is paid once, then the per-piece price keeps falling.",
    cards: [
      {
        title: "Screen Print",
        description: "6 colours · 24 pc · 7 day",
        image: `${DECO}/screen-print.jpg`,
        imageAlt: "",
      },
      {
        title: "Embroidery",
        description: "12 threads · 24 pc · 10 day",
        image: `${DECO}/embroidery-b.jpg`,
        imageAlt: "",
      },
      {
        title: "Embossing",
        description: "Raised · 50 pc · 12 day",
        image: `${DECO}/embossing-b.jpg`,
        imageAlt: "",
      },
      {
        title: "Foil Printing",
        description: "Metallic · 50 pc · 10 day",
        image: `${DECO}/foil-printing.jpg`,
        imageAlt: "",
      },
    ],
  },
  {
    title: "Edge-to-edge coverage",
    description:
      "Coverage past the usual print area, seam to seam or all the way round.",
    cards: [
      {
        title: "Sublimation",
        description: "All-over · 24 pc · 12 day",
        image: `${DECO}/sublimation.jpg`,
        imageAlt: "",
      },
      {
        title: "DTF",
        description: "Full colour · 12 pc · 5 day",
        image: `${DECO}/dtf-b.jpg`,
        imageAlt: "",
      },
      {
        title: "Rotary Printing",
        description: "Full colour · 12 pc · 8 day",
        image: `${DECO}/rotary-printing.jpg`,
        imageAlt: "",
      },
      {
        title: "Vinyl Cut",
        description: "1-3 colours · 1 pc · 4 day",
        image: `${DECO}/vinyl-cut.jpg`,
        imageAlt: "",
      },
    ],
  },
];

/* The two content sets live here rather than being passed in: this file is a
   client module, and a server page importing a plain object from one gets a
   module reference, not the value — the spread silently did nothing and /swag
   kept rendering the homepage copy. A `variant` string crosses the boundary
   fine, so the picking happens on this side. */
const CONTENT = {
  phases: {
    caption: "The Stadium Way",
    captionColor: undefined,
    title: "We build your program in four phases",
    description:
      "Tell us your goals. We configure the platform, manage the rollout, and support through go-live.",
    steps,
    showNumberInHeading: true,
  },
  decoration: {
    caption: "Make it yours",
    captionColor: "#10995a",
    title: "Your brand, done right",
    description:
      "From embroidery and debossing to laser engraving and full-color UV printing, our swag experts match your logo, artwork, and product with the decoration method that will make it look its best.",
    steps: decorationSteps,
    showNumberInHeading: false,
  },
} satisfies Record<
  string,
  {
    caption: string;
    captionColor?: string;
    title: string;
    description: string;
    steps: StepCardsCarouselStep[];
    showNumberInHeading: boolean;
  }
>;

export default function StadiumWay({
  variant = "phases",
}: {
  /** "phases" = the homepage onboarding set, "decoration" = the /swag methods. */
  variant?: keyof typeof CONTENT;
} = {}) {
  const c = CONTENT[variant];

  return (
    <StepCardsCarousel
      caption={c.caption}
      captionColor={c.captionColor}
      title={c.title}
      description={c.description}
      steps={c.steps}
      showNumberInHeading={c.showNumberInHeading}
    />
  );
}
