/* /gifting · WORKS WITH YOUR STACK (Figma n9SjmDjzB1PeZAYJ5w43fr → 2504:12606
   "Stores admin", page frame 2504:12118, 1440 wide, abs y 4540..5511).
   Narrow CENTRED header + one full-width browser-window mockup of the Stadium
   admin "Integrations" screen (window chrome dots, Stadium logotype, Company
   Space rail, "Your Connections" / "Available Connections" panels, the ADP ·
   AlexisHR · Altera · BambooHR · Breathe · Charlie logo tiles, "SEE ALL (104)"
   and the start of "MORE WAYS TO INTEGRATE WITH STADIUM" — the frame clips its
   1385-tall content at 767, so the panel really is cut off mid-row in the
   design, and the mouse cursor is part of the artwork).

   The mockup ships as ONE image: Figma node 2504:12613 exported at defaultScale
   4 (5104×3220 incl. drop-shadow bleed) then cropped with sharp to the node's
   real bounds — left 72 / top 0 / 4960×3068 = 1240×767 @4× — so the brand logos
   are Figma's own vectors, never redrawn. Lossless PNG, rendered quality={100}
   (baked UI text). The cropped-away drop shadow (0 · +20 · blur 18, derived
   from the export's 18px side / 38px bottom bleed) is reapplied in CSS.

   Figma stack (y = offset inside 2504:12606; section frame is content-tight):
     header frame 2504:12607   y=0    h=168  (x=340 w=760 → centred, 61.29% of
                                              the 1240 content ⇒ max-w 735px @1200)
       eyebrow 2504:12610      y=0    h=17   (12 Overpass Bold, lh 1.4,
                                              tracking 1.6 → 0.1rem, #996b00)
       gap 8
       h2 44/1.08 Satoshi Bold y=25   h=96   (2 lines, box w=611 → 591px @1200,
                                              tracking -0.5, #16171b, centred)
       gap 20
       subhead 18/26.1 #707075 y=141  h=27   (full 760 width, centred)
     gap 36
     integration 2504:12613    y=204  h=767  (x=100 w=1240, r8, drop shadow)
     end                       y=971
   Neighbours sit 160 away with content-tight edges (Catalog ends 4380, this
   starts 4540; this ends 5511, Comparison starts 5671) → white section
   py 80/80 (lg:py-20) so the visible gap to both neighbours is 160. */

import SixCards from "./common/SixCards";
import VariableCardGrid, {
  VariableCardGridItem,
} from "./common/VariableCardGrid";

import mockStores from "@/public/gifting/control/approvals.png";
import mockInventory from "@/public/gifting/control/budgets.png";
import mockFulfillment from "@/public/gifting/control/reporting.png";
import mockGifting from "@/public/gifting/control/stack.png";

const ITEMS: VariableCardGridItem[] = [
  {
    image: mockStores,
    title: "Approvals & Permissions",
    description:
      "Route what needs signing off, cap who can send, and keep a clean record of every decision.",
  },
  {
    image: mockInventory,
    title: "Budgets by Team",
    description:
      "Allocate a budget per team, cap it, and watch it draw down in real time.",
  },
  {
    image: mockFulfillment,
    title: "Reporting",
    description:
      "See what shipped, what it cost, and which programs people actually engaged with.",
  },
  {
    image: mockGifting,
    title: "Connected to Your Stack",
    description:
      "Connect to 100+ tools, including HRIS, CRM and Slack, so gifts trigger from systems you already run.",
  },
];

export default function GiftingIntegrations() {
  return (
    <section
      aria-labelledby="gifting-integrations-heading"
      className="bg-white px-section-x-sm md:px-section-x-md lg:px-section-x-lg"
    >
      <VariableCardGrid
        caption="Control"
        captionColor="#996b00"
        title={
          <>
            Gifting your finance team will
            <br />
            actually sign off on
          </>
        }
        description="Budgets set per team, approvals routed before anything ships, and a record of what every program returned."
        gridColumns={2}
        items={ITEMS}
      />
    </section>
  );
}
