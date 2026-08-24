"use client";

/* /gifting · HOW IT WORKS (Figma n9SjmDjzB1PeZAYJ5w43fr → 2504:12514, inside
   the /gifting page frame 2504:12118). "Simple from send to delivery" — an
   INTERACTIVE 3-step stepper in a #f2f2f2 tray (same component as
   SwagmagicHowItWorks): the active step is twice as wide (Figma 588 : 294 :
   294) and shows its amber-gradient product mockup; the other two collapse to
   a number + a #f7f7f7 title panel. Click (or focus + Enter/Space/arrows) any
   step to expand it.

   The tray is named "Send or Automate" after step 01's title — it is NOT a
   two-mode toggle. The only toggle is the Send Once / Automate segmented
   control *inside* step 01's mockup, which Figma draws with Automate selected;
   it is decorative here (the whole mockup is one role="img").

   Step 01's mockup (2504:12528, 265×332) is rebuilt in HTML rather than
   shipped as a raster so its 6–12px UI text stays crisp at any zoom: amber
   gradient frame + white 229px card, three Figma-exported icons inlined and
   the three avatar photos from Figma's rawImages. Steps 02/03 have no expanded
   frame in the new Figma (their descriptions are hidden layers, so they expand
   to title + mockup only); their mockups are the same-system amber-framed
   visuals already shipped on the old /gifting page (g2-step-pick /
   g2-step-arrive, 530×664 = 2× the 265×332 render).

   Figma stack (y relative to the section frame, which is content-tight:
   0 internal top/bottom padding → rendered as lg:py-20 so the visible gap to
   the neighbours stays 160):
     header 2504:12515  y=0    h=120  (eyebrow 17 → 8 → title 48 → 20 → sub 27)
     gap                       40
     tray   2504:12520  y=160  h=384  (p-16; cards 352 = 10 + mockup 332 + 10)
     section end        y=544
   Tray inner at Figma 1240: 588 | 16 | 294 | 16 | 294 (= 2 : 1 : 1 grow).
   Step-01 card: p-10, row gap-10 → left col 293 (number block 52 top, grey
   panel 159 bottom-anchored: p-24, title 25/1.04, gap 16, desc 15/1.5) +
   mockup 265×332 rounded-12. Steps 02/03: number block 52, panel 274×74. */

import { useRef, useState, type KeyboardEvent } from "react";
import Image, { type StaticImageData } from "next/image";
import step02 from "@/public/gift2/gf-how-step02.png";
import step03 from "@/public/gift2/gf-how-step03.png";
import avatarSarah from "@/public/gift2/gf-how-avatar-sarah.jpg";
import avatarMarcus from "@/public/gift2/gf-how-avatar-marcus.jpg";
import avatarErica from "@/public/gift2/gf-how-avatar-erica.png";
import StepCardsCarousel, {
  StepCardsCarouselStep,
} from "./common/StepCardsCarousel";
import TeamPermissionsLoop from "./TeamPermissions";
import StepCards, { StepCardItem } from "./common/StepCards";

import pickBox from "@/public/gifting/how-it-works/send.png";
import recipients from "@/public/gifting/how-it-works/pick.png";
import send from "@/public/gifting/how-it-works/gift.png";

const items: StepCardItem[] = [
  {
    title: "Send or Automate",
    description:
      "Send a one-off in a click, or connect your HR system once and let milestones trigger the gift.",
    image: pickBox,
    imageAlt: "Pick a Box — Crowd Pleasers snack box selected in Snackmagic",
  },
  {
    title: "They Pick",
    description:
      "They open your branded store, choose what they actually want, and add their own size and address.",
    image: recipients,
    imageAlt:
      "They open your branded store, choose what they actually want, and add their own size and address.",
  },
  {
    title: "Gift Arrives",
    description:
      "Tracked from order to doorstep in 170+ countries. Customs, duties and returns are handled by us.",
    image: send,
    imageAlt:
      "Tracked from order to doorstep in 170+ countries. Customs, duties and returns are handled by us.",
  },
];

export default function GiftingHowItWorks() {
  return (
    <StepCards
      caption="How it works"
      captionColor="#996b00"
      title="From order to their door in four steps"
      description="Send globally with local fulfillment, so every snack box arrives with flavors that feel closer to home."
      items={items}
    />
  );
}
