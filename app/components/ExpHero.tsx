/* /events · Experiences (Confetti) — Hero (Figma n9SjmDjzB1PeZAYJ5w43fr →
   hero 2673:3312; copy row 2673:3336, graphic 2673:3349, trust band
   2673:3446). A CENTRED hero (unlike the left-split swag/recognition heroes)
   on the pink/red Confetti mesh raster ("image 13752", 1440×1958, shipped at
   2× as xp-hero-bg.jpg). Under the copy sits a video-call mockup: a translucent
   black 1160×799 panel holding four participant tiles, an "Event Agenda"
   checklist, the host's stage tile with its call-control bar and a live
   transcript card. The panel is CLIPPED to 601 and faded out by an alpha
   gradient (Figma masks it with a rounded rect whose gradient fill runs
   white → 85% → 0), so the agenda card is cut mid-list and the transcript card
   sits entirely under the fade — that is the design, not an accident. Only the
   four photos are rasters; every glyph, icon and control is HTML/SVG.
   Trust band = a headline + 4 stats (NOT the logo marquee the other pages use).

   The raster is 1958 tall while this section ends at 1459, so the bg box runs
   499px (31.1875rem) PAST the section bottom and ExpProblem's white card
   scrolls over it — render <ExpHero/> then <ExpProblem/> directly (Problem is
   `relative z-10` on a transparent bg). No SwagHeroShader here.

   Figma stack (absolute y at 1440):
     0..84      nav (fixed SiteHeader overlays; section pt = 156 = 84 + 72)
     156        eyebrow 12/1.4 (17)          → 8
     181        h1 58/1.02 ×2 (118)          → 20
     319        subhead 19/1.52 ×2 (58)      → 32
     409        CTA row (40)                 → copy ends 449, pb 60
     509..1110  graphic 1160×601 (x 140 — centred inside the 1200 content box,
                which is exactly where Figma puts it; authored 1160×799 and
                clipped/faded at 601, scaled as one unit below 1360)
     1110       trust band: pt 100 → heading 32/1.02 (33) → 40 → stats 76 → pb 100
     1459       section ends; bg raster continues to 1958 (fades to white). */

import Image, { type StaticImageData } from "next/image";
import heroBg from "@/public/exp2/xp-hero-bg.jpg";
import tile1 from "@/public/exp2/xp-hero-tile-1.jpg";
import tile2 from "@/public/exp2/xp-hero-tile-2.jpg";
import tile3 from "@/public/exp2/xp-hero-tile-3.jpg";
import host from "@/public/exp2/xp-hero-host.jpg";
import { HeroLogoWall } from "./common/HeroLogoWall";

/* trust band stats (2673:3448) */
const STATS = [
  { value: "25,000+", label: "Teams" },
  { value: "52,000+", label: "Experiences Hosted" },
  { value: "500+", label: "Experience Formats" },
] as const;

/* agenda checklist (2673:3398) — only the first row is ticked in Figma */
const AGENDA = [
  { label: "Welcome & introductions", done: true },
  { label: "Team challenge", done: false },
  { label: "Breakout activity", done: false },
  { label: "Group share", done: false },
  { label: "Wrap-up", done: false },
] as const;

/* ── icons — exact paths from the Figma svgAssets ───────────────────── */

/* lucide/star (2673:3461), 32px, stroke white */
function StarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      fill="none"
      className="size-6 shrink-0 md:size-7 lg:size-8"
    >
      <path
        d="M15.3665 3.05921C15.4249 2.94116 15.5152 2.84178 15.6271 2.77231C15.739 2.70283 15.8681 2.66602 15.9998 2.66602C16.1315 2.66602 16.2606 2.70283 16.3725 2.77231C16.4844 2.84178 16.5747 2.94116 16.6331 3.05921L19.7131 9.29787C19.916 9.7085 20.2155 10.0638 20.586 10.3331C20.9564 10.6025 21.3866 10.778 21.8398 10.8445L28.7278 11.8525C28.8583 11.8715 28.9809 11.9265 29.0818 12.0115C29.1826 12.0964 29.2577 12.2079 29.2985 12.3333C29.3393 12.4588 29.3442 12.5931 29.3126 12.7211C29.281 12.8492 29.2142 12.9658 29.1198 13.0579L24.1385 17.9085C23.81 18.2287 23.5642 18.6238 23.4222 19.06C23.2803 19.4962 23.2465 19.9604 23.3238 20.4125L24.4998 27.2659C24.5228 27.3963 24.5087 27.5306 24.4591 27.6535C24.4095 27.7763 24.3264 27.8827 24.2192 27.9605C24.112 28.0384 23.9851 28.0845 23.853 28.0937C23.7208 28.1029 23.5887 28.0748 23.4718 28.0125L17.3145 24.7752C16.9088 24.5622 16.4574 24.4509 15.9991 24.4509C15.5409 24.4509 15.0895 24.5622 14.6838 24.7752L8.5278 28.0125C8.4109 28.0744 8.27899 28.1023 8.14706 28.0929C8.01514 28.0835 7.88849 28.0373 7.78152 27.9595C7.67456 27.8817 7.59157 27.7755 7.542 27.6528C7.49243 27.5302 7.47827 27.3961 7.50113 27.2659L8.6758 20.4139C8.75339 19.9615 8.71977 19.4971 8.57785 19.0606C8.43592 18.6241 8.18994 18.2287 7.86113 17.9085L2.8798 13.0592C2.78459 12.9672 2.71712 12.8504 2.68508 12.722C2.65304 12.5935 2.65771 12.4587 2.69857 12.3328C2.73942 12.2069 2.81482 12.095 2.91616 12.0099C3.01751 11.9247 3.14073 11.8697 3.2718 11.8512L10.1585 10.8445C10.6121 10.7785 11.043 10.6033 11.4139 10.3339C11.7848 10.0644 12.0847 9.7089 12.2878 9.29787L15.3665 3.05921Z"
        stroke="white"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* the 18px tile badges (2673:3362 / 3370 / 3379 / 3389 / 3391) */
const TILE_ICON = "size-[1.125rem] shrink-0";

function IconMic18() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 18 18"
      fill="none"
      className={TILE_ICON}
    >
      <path
        d="M9 14.25V16.5M9 14.25C10.3924 14.25 11.7277 13.6969 12.7123 12.7123C13.6969 11.7277 14.25 10.3924 14.25 9V7.5M9 14.25C7.60761 14.25 6.27226 13.6969 5.28769 12.7123C4.30312 11.7277 3.75 10.3924 3.75 9V7.5M9 1.5C10.2426 1.5 11.25 2.50736 11.25 3.75V9C11.25 10.2426 10.2426 11.25 9 11.25C7.75736 11.25 6.75 10.2426 6.75 9V3.75C6.75 2.50736 7.75736 1.5 9 1.5Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMicOff18() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 18 18"
      fill="none"
      className={TILE_ICON}
    >
      <path
        d="M9 14.25V16.5M11.25 7.005V3.75C11.247 3.24478 11.074 2.75528 10.7589 2.36034C10.4438 1.9654 10.0049 1.688 9.51301 1.57281C9.02109 1.45763 8.50471 1.51136 8.04704 1.72535C7.58936 1.93935 7.21703 2.30115 6.99 2.7525M12.7125 12.7125C11.9783 13.4468 11.0428 13.9469 10.0243 14.1495C9.00588 14.3521 7.95022 14.2481 6.99086 13.8507C6.0315 13.4533 5.21154 12.7804 4.63466 11.9169C4.05779 11.0535 3.74993 10.0384 3.75 9V7.5M14.1675 9.9225C14.2221 9.61803 14.2497 9.30933 14.25 9V7.5M1.5 1.5L16.5 16.5M6.75 6.75V9C6.75039 9.44472 6.88256 9.87935 7.12982 10.249C7.37708 10.6186 7.72834 10.9067 8.13923 11.0769C8.55012 11.247 9.00221 11.2915 9.43841 11.2049C9.87461 11.1182 10.2753 10.9043 10.59 10.59"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconVolumeOff18() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 18 18"
      fill="none"
      className={TILE_ICON}
    >
      <path
        d="M12 6.75C12.3783 7.25425 12.6233 7.84573 12.7125 8.46975M14.523 4.227C15.4822 5.1857 16.1305 6.41112 16.3832 7.74355C16.6359 9.07599 16.4814 10.4537 15.9398 11.697M1.5 1.5L16.5 16.5M5.25 5.25L4.80975 5.69025C4.7118 5.78878 4.59528 5.8669 4.46692 5.92007C4.33856 5.97324 4.20093 6.00041 4.062 6H2.25C2.05109 6 1.86032 6.07902 1.71967 6.21967C1.57902 6.36032 1.5 6.55109 1.5 6.75V11.25C1.5 11.4489 1.57902 11.6397 1.71967 11.7803C1.86032 11.921 2.05109 12 2.25 12H4.062C4.20093 11.9996 4.33856 12.0268 4.46692 12.0799C4.59528 12.1331 4.7118 12.2112 4.80975 12.3098L7.347 14.8478C7.42095 14.9218 7.51523 14.9723 7.61789 14.9928C7.72056 15.0132 7.82699 15.0028 7.92369 14.9627C8.0204 14.9226 8.10303 14.8547 8.16112 14.7676C8.21921 14.6806 8.25015 14.5782 8.25 14.4735V8.25M7.371 3.129C7.44291 3.05681 7.53464 3.0076 7.63456 2.98761C7.73448 2.96762 7.83808 2.97775 7.93223 3.01671C8.02639 3.05567 8.10685 3.12172 8.16342 3.20646C8.21999 3.29121 8.25013 3.39085 8.25 3.49275V4.00725"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconVideoOff18() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 18 18"
      fill="none"
      className={TILE_ICON}
    >
      <path
        d="M7.995 4.5H10.5C10.8978 4.5 11.2794 4.65804 11.5607 4.93934C11.842 5.22064 12 5.60218 12 6V7.875L15.936 5.5785C15.993 5.54524 16.0577 5.52762 16.1237 5.52739C16.1897 5.52717 16.2546 5.54436 16.3118 5.57722C16.369 5.61009 16.4165 5.65747 16.4496 5.71459C16.4826 5.7717 16.5 5.83652 16.5 5.9025V12.0495M12 12C12 12.3978 11.842 12.7794 11.5607 13.0607C11.2794 13.342 10.8978 13.5 10.5 13.5H3C2.60218 13.5 2.22064 13.342 1.93934 13.0607C1.65804 12.7794 1.5 12.3978 1.5 12V6C1.5 5.60218 1.65804 5.22064 1.93934 4.93934C2.22064 4.65804 2.60218 4.5 3 4.5H4.5M1.5 1.5L16.5 16.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* the 24px call controls + agenda ticks */
const CTRL_ICON = "size-6 shrink-0";

function IconMic24() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={CTRL_ICON}
    >
      <path
        d="M12 19V22M12 19C13.8565 19 15.637 18.2625 16.9497 16.9497C18.2625 15.637 19 13.8565 19 12V10M12 19C10.1435 19 8.36301 18.2625 7.05025 16.9497C5.7375 15.637 5 13.8565 5 12V10M12 2C13.6569 2 15 3.34315 15 5V12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12V5C9 3.34315 10.3431 2 12 2Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconHeadset24() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={CTRL_ICON}
    >
      <path
        d="M3 11H6C6.53043 11 7.03914 11.2107 7.41421 11.5858C7.78929 11.9609 8 12.4696 8 13V16C8 16.5304 7.78929 17.0391 7.41421 17.4142C7.03914 17.7893 6.53043 18 6 18H5C4.46957 18 3.96086 17.7893 3.58579 17.4142C3.21071 17.0391 3 16.5304 3 16V11ZM3 11C3 9.8181 3.23279 8.64778 3.68508 7.55585C4.13738 6.46392 4.80031 5.47177 5.63604 4.63604C6.47177 3.80031 7.46392 3.13738 8.55585 2.68508C9.64778 2.23279 10.8181 2 12 2C13.1819 2 14.3522 2.23279 15.4442 2.68508C16.5361 3.13738 17.5282 3.80031 18.364 4.63604C19.1997 5.47177 19.8626 6.46392 20.3149 7.55585C20.7672 8.64778 21 9.8181 21 11M21 11V16M21 11H18C17.4696 11 16.9609 11.2107 16.5858 11.5858C16.2107 11.9609 16 12.4696 16 13V16C16 16.5304 16.2107 17.0391 16.5858 17.4142C16.9609 17.7893 17.4696 18 18 18H19C19.5304 18 20.0391 17.7893 20.4142 17.4142C20.7893 17.0391 21 16.5304 21 16M21 16V18C21 19.0609 20.5786 20.0783 19.8284 20.8284C19.0783 21.5786 18.0609 22 17 22H12"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconHand24() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={CTRL_ICON}
    >
      <path
        d="M18 11V6C18 5.46957 17.7893 4.96086 17.4142 4.58579C17.0391 4.21071 16.5304 4 16 4C15.4696 4 14.9609 4.21071 14.5858 4.58579C14.2107 4.96086 14 5.46957 14 6M14 10V4C14 3.46957 13.7893 2.96086 13.4142 2.58579C13.0391 2.21071 12.5304 2 12 2C11.4696 2 10.9609 2.21071 10.5858 2.58579C10.2107 2.96086 10 3.46957 10 4V6M10 6V10.5M10 6C10 5.46957 9.78929 4.96086 9.41421 4.58579C9.03914 4.21071 8.53043 4 8 4C7.46957 4 6.96086 4.21071 6.58579 4.58579C6.21071 4.96086 6 5.46957 6 6V14M18 8C18 7.46957 18.2107 6.96086 18.5858 6.58579C18.9609 6.21071 19.4696 6 20 6C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V14C22 16.1217 21.1571 18.1566 19.6569 19.6569C18.1566 21.1571 16.1217 22 14 22H12C9.2 22 7.5 21.14 6.01 19.66L2.41 16.06C2.06594 15.6789 1.88159 15.1802 1.89512 14.6669C1.90866 14.1537 2.11905 13.6653 2.48272 13.303C2.84639 12.9406 3.3355 12.7319 3.84877 12.7202C4.36204 12.7085 4.86016 12.8946 5.24 13.24L7 15"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconFaceGrinning24() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={CTRL_ICON}
    >
      <path
        d="M15 10V9M9 10V9M7.084 14.302C7.39344 15.3665 8.04005 16.3019 8.92664 16.9675C9.81323 17.633 10.8919 17.9929 12.0005 17.9929C13.1091 17.9929 14.1878 17.633 15.0744 16.9675C15.9609 16.3019 16.6076 15.3665 16.917 14.302C16.9266 14.2662 16.9277 14.2286 16.9204 14.1923C16.913 14.156 16.8973 14.1218 16.8746 14.0926C16.8518 14.0633 16.8226 14.0397 16.7892 14.0237C16.7557 14.0076 16.7191 13.9995 16.682 14H7.32C7.28293 13.9995 7.24626 14.0076 7.21285 14.0237C7.17944 14.0397 7.1502 14.0633 7.12744 14.0926C7.10467 14.1218 7.08899 14.156 7.08163 14.1923C7.07427 14.2286 7.07442 14.2662 7.084 14.302ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPhoneOff24() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={CTRL_ICON}
    >
      <path
        d="M10.1 13.9C11.1888 14.9885 12.4498 15.8899 13.832 16.568C14.0385 16.6628 14.2712 16.6845 14.4917 16.6294C14.7122 16.5744 14.9073 16.4458 15.045 16.265L15.4 15.8C15.5863 15.5516 15.8279 15.35 16.1056 15.2111C16.3833 15.0723 16.6895 15 17 15H20C20.5304 15 21.0391 15.2107 21.4142 15.5858C21.7893 15.9609 22 16.4696 22 17V20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22C17.6362 22 15.2955 21.5345 13.1117 20.6299C10.9278 19.7253 8.94347 18.3995 7.272 16.728M22 2L2 22M4.76 13.582C2.956 10.7116 1.99929 7.39018 2 4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H7C7.53043 2 8.03914 2.21071 8.41421 2.58579C8.78929 2.96086 9 3.46957 9 4V7C9 7.31049 8.92771 7.61672 8.78885 7.89443C8.65 8.17214 8.44839 8.41371 8.2 8.6L7.732 8.951C7.54842 9.09118 7.41902 9.29059 7.36579 9.51535C7.31256 9.74012 7.33878 9.97638 7.44 10.184C7.51833 10.3432 7.59968 10.5009 7.684 10.657"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* lucide/square-check (2673:3402) vs the plain square Figma uses for the
   un-ticked rows (2673:3406) */
function IconSquareCheck24({ done }: { done: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={CTRL_ICON}
    >
      <path
        d={
          done
            ? "M9 12L11 14L15 10M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z"
            : "M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
        }
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* lucide/users (2673:3394) and lucide/audio-lines (2673:3443), both 54px */
const BIG_ICON = "size-[3.375rem] shrink-0";

function IconUsers54() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 54 54"
      fill="none"
      className={BIG_ICON}
    >
      <path
        d="M36 47.25V42.75C36 40.3631 35.0518 38.0739 33.364 36.386C31.6761 34.6982 29.3869 33.75 27 33.75H13.5C11.1131 33.75 8.82387 34.6982 7.13604 36.386C5.44821 38.0739 4.5 40.3631 4.5 42.75V47.25M36 7.038C37.9299 7.53833 39.6391 8.66534 40.8593 10.2421C42.0794 11.8189 42.7414 13.7563 42.7414 15.75C42.7414 17.7437 42.0794 19.6811 40.8593 21.2579C39.6391 22.8347 37.9299 23.9617 36 24.462M49.5 47.25V42.75C49.4985 40.7559 48.8348 38.8187 47.6131 37.2427C46.3913 35.6667 44.6808 34.541 42.75 34.0425M29.25 15.75C29.25 20.7206 25.2206 24.75 20.25 24.75C15.2794 24.75 11.25 20.7206 11.25 15.75C11.25 10.7794 15.2794 6.75 20.25 6.75C25.2206 6.75 29.25 10.7794 29.25 15.75Z"
        stroke="white"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconAudioLines54() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 54 54"
      fill="none"
      className={BIG_ICON}
    >
      <path
        d="M4.5 22.5V29.25M13.5 13.5V38.25M22.5 6.75V47.25M31.5 18V33.75M40.5 11.25V40.5M49.5 22.5V29.25"
        stroke="white"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* the initial avatar for the camera-off participant (2673:3382) — a 54px white
   disc inside a 16px white/10% ring, so the artwork is 86px overall */
function ChatBubbleAvatar() {
  return (
    <span aria-hidden="true" className="relative size-[3.375rem] shrink-0">
      <svg viewBox="0 0 86 86" fill="none" className="absolute -inset-4">
        <rect x="16" y="16" width="54" height="54" rx="27" fill="white" />
        <rect
          x="8"
          y="8"
          width="70"
          height="70"
          rx="35"
          stroke="white"
          strokeOpacity="0.1"
          strokeWidth="16"
        />
        <path
          d="M36.884 51.4V34.6H39.992V42.64L46.376 34.6H50.048L45.176 40.6L51.116 51.4H47.48L43.064 43.216L39.992 47.032V51.4H36.884Z"
          fill="black"
        />
      </svg>
    </span>
  );
}

/* ── the video-call mockup (2673:3352) ──────────────────────────────── */

/* the name/subtitle pair every participant tile carries (2673:3359 / 3376 /
   3385) — Figma centres both lines on the camera-off tile, only the subtitle
   on the narrow tile, and neither on the two wide tiles */
function TileName({ variant }: { variant: "wide" | "narrow" | "center" }) {
  return (
    <div
      className={
        variant === "wide"
          ? "flex min-w-px flex-1 flex-col items-start font-sans leading-[1.48]"
          : `flex w-full shrink-0 flex-col items-start font-sans leading-[1.48] ${
              variant === "center" ? "text-center" : ""
            }`
      }
    >
      <p className="w-full text-[1.125rem] text-white">Kim Berkeley</p>
      <p
        className={`w-full text-[0.875rem] text-[#ddd] ${
          variant === "narrow" ? "text-center" : ""
        }`}
      >
        Kim Berkeley
      </p>
    </div>
  );
}

/* the black scrim under a tile's caption (2673:3358 / 3366 / 3375) */
const TILE_SCRIM =
  "bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.65)_50%,#000_100%)]";

/* a 270-wide participant tile (2673:3356 / 2673:3364) */
function WideTile({
  img,
  alt,
  imgClassName,
  muted,
}: {
  img: StaticImageData;
  alt: string;
  imgClassName: string;
  muted: boolean;
}) {
  return (
    <div className="relative h-[13.84375rem] w-[16.875rem] shrink-0 overflow-hidden rounded-[1.25rem] bg-white/[0.07]">
      <Image
        src={img}
        alt={alt}
        quality={90}
        sizes="16.875rem"
        className={`absolute left-0 w-full max-w-none select-none ${imgClassName}`}
      />
      <div
        className={`absolute bottom-[-0.03125rem] left-0 flex h-[4.25rem] w-[16.875rem] items-start justify-center gap-8 px-6 ${TILE_SCRIM}`}
      >
        <TileName variant="wide" />
        {muted ? <IconMicOff18 /> : <IconMic18 />}
      </div>
    </div>
  );
}

/* Figma masks the 1160×799 panel with a rounded rect whose gradient fill runs
   white → 85% (at 86.06% of its 799) → 0, offset -198px, so over the panel the
   alpha goes 0.9568 → 0.85 (61.25%) → 0 (75.22% = the 601 clip line). */
const PANEL_FADE =
  "linear-gradient(to bottom, rgba(0,0,0,0.9568) 0%, rgba(0,0,0,0.85) 61.25%, rgba(0,0,0,0) 75.22%)";

function DeviceGraphic() {
  return (
    <div
      className="relative h-[49.9375rem] w-[72.5rem] rounded-[2rem] bg-[rgba(0,0,0,0.33)] p-4"
      style={{ maskImage: PANEL_FADE, WebkitMaskImage: PANEL_FADE }}
    >
      <div className="flex h-[47.9375rem] w-[70.5rem] items-end gap-4">
        {/* left column (2673:3353) */}
        <div className="flex h-full w-[34.75rem] shrink-0 flex-col gap-4">
          <div className="flex h-[28.6875rem] w-full flex-col gap-4">
            {/* row 1 (2673:3355) */}
            <div className="flex h-[13.84375rem] w-full items-center gap-4">
              <WideTile
                img={tile1}
                alt="A teammate listening from a home office on the call"
                imgClassName="h-[152.37%] top-[-8.6146%]"
                muted
              />
              <WideTile
                img={tile2}
                alt="A teammate in a headset talking to the group"
                imgClassName="h-[167.05%] top-[-16.46%]"
                muted={false}
              />
            </div>

            {/* row 2 (2673:3372) */}
            <div className="flex h-[13.84375rem] w-full items-center gap-4">
              {/* narrow photo tile (2673:3373) */}
              <div className="relative h-full w-[9.08333rem] shrink-0 overflow-hidden rounded-[1.25rem] bg-white/[0.07]">
                <Image
                  src={tile3}
                  alt="A teammate smiling at the camera from a bright kitchen"
                  quality={90}
                  sizes="9.08333rem"
                  className="absolute inset-0 size-full max-w-none select-none object-cover"
                />
                <div
                  className={`absolute bottom-[-0.0625rem] left-0 flex h-[6.25rem] w-[9.0625rem] flex-col items-center gap-4 px-4 ${TILE_SCRIM}`}
                >
                  <TileName variant="narrow" />
                  <IconMicOff18 />
                </div>
              </div>

              {/* camera-off participant (2673:3381) */}
              <div className="flex h-full w-[11.83333rem] shrink-0 flex-col items-center justify-end gap-8 rounded-[1.25rem] bg-white/[0.14] px-[1.375rem] pb-[1.125rem]">
                <ChatBubbleAvatar />
                <div className="flex w-full flex-col gap-4">
                  <TileName variant="center" />
                  <div className="flex w-full items-center justify-center gap-4">
                    <IconVolumeOff18 />
                    <IconVideoOff18 />
                  </div>
                </div>
              </div>

              {/* headcount tile (2673:3393) */}
              <div className="flex h-full w-[11.83333rem] shrink-0 flex-col items-center justify-center gap-3 rounded-[1.25rem] bg-white/[0.14] px-[1.375rem]">
                <IconUsers54 />
                <p className="w-full text-center font-sans text-[2rem] leading-[1.48] text-white">
                  50+
                </p>
              </div>
            </div>
          </div>

          {/* agenda card (2673:3398) */}
          <div className="flex h-[18.25rem] w-full flex-col gap-3 rounded-[1.25rem] bg-white/[0.07] p-8">
            <p className="w-full font-sans text-[1.125rem] font-bold leading-[1.48] text-white">
              Event Agenda
            </p>
            {AGENDA.map((row) => (
              <div key={row.label} className="flex w-full items-start gap-2">
                <IconSquareCheck24 done={row.done} />
                <p className="min-w-px flex-1 font-sans text-[1.125rem] leading-[1.48] text-white">
                  {row.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* right column (2673:3421) */}
        <div className="flex h-full w-[34.75rem] shrink-0 flex-col gap-4">
          {/* host stage (2673:3422) */}
          <div className="relative h-[37.875rem] w-full overflow-hidden rounded-[1.25rem] bg-white/[0.07]">
            <Image
              src={host}
              alt="The event host waving to the camera as the session opens"
              priority
              quality={90}
              sizes="34.75rem"
              className="absolute inset-0 size-full max-w-none select-none object-cover"
            />
            {/* call controls (2673:3424) */}
            <div className="absolute left-0 top-[31.625rem] flex h-[6.25rem] w-[34.75rem] items-start justify-center gap-8 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.9)_100%)]">
              <div className="flex items-center gap-1">
                <span className="flex size-[3.5rem] items-center justify-center rounded-lg bg-[rgba(0,0,0,0.75)]">
                  <IconMic24 />
                </span>
                <span className="flex size-[3.5rem] items-center justify-center rounded-lg bg-[rgba(0,0,0,0.75)]">
                  <IconHeadset24 />
                </span>
                <span className="flex size-[3.5rem] items-center justify-center rounded-lg bg-[rgba(0,0,0,0.75)]">
                  <IconHand24 />
                </span>
                <span className="flex size-[3.5rem] items-center justify-center rounded-lg bg-[rgba(0,0,0,0.75)]">
                  <IconFaceGrinning24 />
                </span>
              </div>
              <span className="flex size-[3.5rem] items-center justify-center rounded-lg bg-[rgba(215,0,0,0.75)]">
                <IconPhoneOff24 />
              </span>
            </div>
          </div>

          {/* live transcript (2673:3441) — sits under the fade at 1440 */}
          <div className="flex h-[9.0625rem] w-full flex-col items-start justify-center rounded-[1.25rem] bg-white/[0.07] p-8">
            <div className="flex w-full items-center gap-4">
              <IconAudioLines54 />
              <p className="min-w-px flex-1 font-sans text-[1.125rem] leading-[1.48] text-white">
                Welcome, everyone. We&apos;ll start with a quick warm-up, then
                split into teams for the challenge before coming back together
                to share.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExpHero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-[calc(100%_+_31.1875rem)] w-full overflow-hidden bg-[#1a0510]"
      >
        <Image
          src={heroBg}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="select-none object-cover object-top"
        />
      </div>

      <div className="relative z-10 pt-24 md:pt-28 lg:pt-[9.75rem]">
        {/* copy column (2673:3337) — centred, on the 1200 content width */}
        <div className="px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
          <div className="mx-auto flex w-full max-w-content flex-col items-center gap-8 text-center">
            <div className="flex w-full flex-col gap-5">
              <div className="flex flex-col gap-2">
                <p
                  data-animation="reveal"
                  className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#ffd6dd]"
                >
                  HOSTED EXPERIENCES • CONFETTI
                </p>
                <h1
                  data-animation="reveal"
                  className="font-[family-name:var(--font-satoshi)] text-[2.25rem] font-black leading-[1.02] tracking-[-0.0625rem] text-white md:text-[3rem] lg:text-[3.625rem] lg:tracking-[-0.09375rem]"
                >
                  Bring your team together with
                  <br className="hidden lg:block" /> hosted experiences
                </h1>
              </div>
              <p
                data-animation="reveal"
                data-reveal-delay="120"
                className="font-sans text-[1.0625rem] leading-[1.52] text-[#fbfeff] lg:text-[1.1875rem] max-w-176 mx-auto"
              >
                Discover and book hundreds of virtual, live-hosted activities
                for teams anywhere, right alongside everything else you run on
                Stadium.
              </p>
            </div>

            <div
              data-animation="reveal"
              data-reveal-delay="200"
              className="flex flex-col items-stretch gap-3.5 sm:flex-row sm:items-center"
            >
              <a
                href="#"
                className="inline-flex h-button-h items-center justify-center rounded-[100px] bg-[#ff5b77] px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white pb-0.75"
              >
                <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                  Talk to sales
                </span>
              </a>
              <a
                href="#"
                className="inline-flex h-button-h items-center justify-center rounded-[100px] border border-white bg-transparent px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white pb-0.75"
              >
                <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                  Browse gifts
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* video-call mockup (2673:3349): 60 below the copy, authored at
            1160×601 and scaled as one unit so it never overflows. At ≥1360 it
            renders 1:1 and lands at x=140 — its exact Figma position. */}
        <div className="px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
          <div
            data-animation="reveal"
            data-reveal-delay="240"
            className="mx-auto mt-[3.75rem] h-[10.5175rem] w-[20.3rem] min-[30rem]:h-[14.27375rem] min-[30rem]:w-[27.55rem] md:h-[22.5375rem] md:w-[43.5rem] lg:h-[27.045rem] lg:w-[52.2rem] min-[80rem]:h-[35.30875rem] min-[80rem]:w-[68.15rem] min-[85rem]:h-[37.5625rem] min-[85rem]:w-[72.5rem]"
          >
            <div className="h-[37.5625rem] w-[72.5rem] origin-top-left scale-[0.28] overflow-hidden min-[30rem]:scale-[0.38] md:scale-[0.6] lg:scale-[0.72] min-[80rem]:scale-[0.94] min-[85rem]:scale-100">
              <DeviceGraphic />
            </div>
          </div>
        </div>

        {/* trust band (2673:3446): pt 100 → heading → 40 → stats → pb 100 */}
        <div className="px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
          <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10 pt-16 md:pt-20 lg:pt-[6.25rem]">
            <h2
              data-animation="reveal"
              className="text-center font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.02] tracking-[-0.03125rem] text-white md:text-[2rem]"
            >
              The calendar invite people accept
            </h2>
            <div
              data-animation="reveal"
              data-reveal-stagger="90"
              className="grid w-full grid-cols-2 gap-x-6 gap-y-10 md:flex md:items-center md:justify-between"
            >
              {STATS.map((s) => (
                <div
                  key={s.label}
                  data-animation="reveal"
                  className="flex flex-col items-center justify-center gap-2 whitespace-nowrap text-white"
                >
                  <p className="font-[family-name:var(--font-satoshi)] text-[2rem] font-black leading-[1.02] tracking-[-0.0625rem] md:text-[2.5rem] lg:text-[2.875rem]">
                    {s.value}
                  </p>
                  <p className="font-sans text-[0.9375rem] font-semibold leading-[1.4]">
                    {s.label}
                  </p>
                </div>
              ))}
              <div
                data-animation="reveal"
                className="flex flex-col items-center justify-center gap-2 text-white"
              >
                <div className="flex items-center justify-center gap-1">
                  <p className="whitespace-nowrap font-[family-name:var(--font-satoshi)] text-[2rem] font-black leading-[1.02] tracking-[-0.0625rem] md:text-[2.5rem] lg:text-[2.875rem]">
                    4.8
                  </p>
                  <StarIcon />
                </div>
                <p className="whitespace-nowrap font-sans text-[0.9375rem] font-semibold leading-[1.4]">
                  Capterra Rating
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 lg:mt-24">
        <HeroLogoWall />
      </div>
    </section>
  );
}
