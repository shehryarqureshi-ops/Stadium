/* /events · Experiences (Confetti) — Hero (Figma n9SjmDjzB1PeZAYJ5w43fr →
   hero 2504:9061; copy row 2504:9085, device cluster 2504:9098, trust band
   2504:9180). A CENTRED hero (unlike the left-split swag/recognition heroes)
   on the pink/red Confetti mesh raster ("image 13752", 1440×1958, shipped at
   2× as xp-hero-bg.jpg). Under the copy sits a tablet mockup whose screen
   carries two rebuilt-in-HTML app cards — the LIVE "Escape Quest" card and
   the "UPCOMING EVENTS" list — so every glyph stays crisp; only the device
   shell, its base strip, the banner photo, the 3 event thumbs and the 6
   attendee avatars are rasters. Trust band = a headline + 4 stats (NOT the
   logo marquee the other pages use).

   The raster is 1958 tall while this section ends at 1265, so the bg box runs
   693px (43.3125rem) PAST the section bottom and ExpProblem's white card
   scrolls over it — render <ExpHero/> then <ExpProblem/> directly (Problem is
   `relative z-10` on a transparent bg). No SwagHeroShader here.

   Figma stack (absolute y at 1440):
     0..84     nav (fixed SiteHeader overlays; section pt = 156 = 84 + 72)
     156       eyebrow 12/1.4 (17)          → 8
     181       h1 58/1.02 ×2 (118)          → 20
     319       subhead 19/1.52 (29)         → 32
     380       CTA row (40)                 → copy ends 420, pb 60
     480..956  device cluster 1295×476 (x 72.5 → centred, escapes the 90 pad)
     956       trust band: pt 60 → heading 32/1.02 (33) → 40 → stats 76 → pb 100
     1265      section ends; bg raster continues to 1958 (fades to white). */

import Image from "next/image";
import heroBg from "@/public/exp2/xp-hero-bg.jpg";
import device from "@/public/exp2/xp-hero-device.png";
import deviceBase from "@/public/exp2/xp-hero-device-base.png";
import liveBanner from "@/public/exp2/xp-hero-live-banner.jpg";
import event1 from "@/public/exp2/xp-hero-event-1.jpg";
import event2 from "@/public/exp2/xp-hero-event-2.jpg";
import event3 from "@/public/exp2/xp-hero-event-3.jpg";
import avatar1 from "@/public/exp2/xp-hero-avatar-1.png";
import avatar2 from "@/public/exp2/xp-hero-avatar-2.png";
import avatar3 from "@/public/exp2/xp-hero-avatar-3.png";
import avatar4 from "@/public/exp2/xp-hero-avatar-4.png";
import avatar5 from "@/public/exp2/xp-hero-avatar-5.png";
import avatar6 from "@/public/exp2/xp-hero-avatar-6.png";

/* trust band stats (2504:9182) */
const STATS = [
  { value: "25,000+", label: "Teams" },
  { value: "52,000+", label: "Experiences Hosted" },
  { value: "500+", label: "Experience Formats" },
] as const;

/* upcoming-events rows (2504:9110) */
const EVENTS = [
  {
    img: event1,
    alt: "Four colleagues celebrating on a video call",
    title: "Coworker Clash",
    when: "May 7 - 12:00 PM EST",
  },
  {
    img: event2,
    alt: "A host presenting a trivia round to a virtual audience",
    title: "Traitorous Trivia",
    when: "May 9 · 6:00 PM EST",
  },
  {
    img: event3,
    alt: "A finished glass terrarium planted with moss and succulents",
    title: "Terrarium Workshop",
    when: "May 14 · 10:00 AM EST",
  },
] as const;

const ATTENDEES = [
  { img: avatar1, left: "1.3627rem" },
  { img: avatar2, left: "2.4661rem" },
  { img: avatar3, left: "3.5695rem" },
  { img: avatar4, left: "4.6729rem" },
  { img: avatar5, left: "5.7763rem" },
  { img: avatar6, left: "6.8796rem" },
] as const;

/* lucide/star (2504:9195), 32px, stroke white — exact path from svgAssets */
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

/* 20px round chevron button, top-right of the events card (2504:9107) */
function RowChevronButton() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="size-[1.25rem] shrink-0"
    >
      <rect width="20" height="20" rx="9.99941" fill="white" fillOpacity="0.06" />
      <path
        d="M8.21411 6.42822L11.7855 9.99965L8.21411 13.5711"
        stroke="#B8BABF"
        strokeWidth="1.14279"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* the row chevron (2504:9119) — the exported chevron-down turned -90° */
function RowChevron() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 9 6"
      fill="none"
      className="h-[0.3125rem] w-[0.5rem] shrink-0 -rotate-90"
    >
      <path
        d="M0.500018 0.500018L4.50002 5.50002L8.50002 0.500018"
        stroke="#9FA0A2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* 12px calendar glyph beside VIEW CALENDAR (2504:9139–9143) */
function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      fill="none"
      className="size-[0.75rem] shrink-0"
    >
      <rect
        x="0.75"
        y="2.25"
        width="10.5"
        height="9"
        rx="1.875"
        stroke="#9EA1A6"
        strokeWidth="1.05"
      />
      <rect x="0.75" y="2.25" width="10.5" height="2.625" rx="1.05" fill="#9EA1A6" />
      <rect x="3" y="0.75" width="1.125" height="2.25" rx="0.525" fill="#9EA1A6" />
      <rect x="7.88" y="0.75" width="1.125" height="2.25" rx="0.525" fill="#9EA1A6" />
    </svg>
  );
}

/* LIVE card (2504:9145) — 357×322, white, rounded 18, authored at the Figma
   pixel positions ÷ 16 */
function LiveCard() {
  return (
    <div className="absolute left-[34.96875rem] top-[11.375rem] h-[20.125rem] w-[22.3125rem] overflow-hidden rounded-[1.125rem] bg-white shadow-[0_0.25rem_1rem_0_rgba(15,15,26,0.12)]">
      {/* banner (2504:9146): radial-gradient plate + the photo inset 9.69% and
          overhanging 29.93% above, exactly as Figma crops it */}
      <div className="absolute left-2 top-2 h-[7.625rem] w-[21.3125rem] overflow-hidden rounded-[0.625rem] bg-[radial-gradient(ellipse_20.75rem_58rem_at_1.84375rem_4.75rem,#171836_0%,#171836_85.7%,#190f31_100%)]">
        <Image
          src={liveBanner}
          alt="Escape-room host lit in neon, mid-puzzle"
          quality={90}
          sizes="17.1712rem"
          className="absolute left-[9.69%] top-[-29.93%] h-[140.59%] w-[80.55%] select-none object-cover"
        />
      </div>

      {/* LIVE pill (2504:9147) */}
      <span className="absolute left-[1.375rem] top-[1.375rem] flex h-[1.5rem] w-[3.5rem] items-center justify-center rounded-[0.75rem] bg-[#7d102e] font-[family-name:var(--font-satoshi)] text-[0.59375rem] font-bold leading-[normal] text-white">
        LIVE
      </span>
      <span className="absolute left-[17.3125rem] top-[1.6875rem] whitespace-nowrap font-[family-name:var(--font-satoshi)] text-[0.625rem] font-bold leading-[normal] text-white">
        Starts in 15m
      </span>

      {/* escape badge (2504:9150/9151/9177) */}
      <span
        aria-hidden="true"
        className="absolute left-[1.3627rem] top-[9.125rem] size-[2.5077rem] rounded-full bg-[#7d102e]"
      />
      <span
        aria-hidden="true"
        className="absolute left-[2.3156rem] top-[9.8271rem] size-[0.6019rem] rounded-full bg-white"
      />
      <span
        aria-hidden="true"
        className="absolute left-[2.5037rem] top-[10.2786rem] h-[0.5015rem] w-[0.2257rem] rounded-[0.0753rem] bg-white"
      />

      <p className="absolute left-[4.5725rem] top-[9.3256rem] whitespace-nowrap font-[family-name:var(--font-satoshi)] text-[1.0533rem] font-bold leading-[normal] text-[#1a1a1d]">
        Escape Quest
      </p>
      <p className="absolute left-[4.5725rem] top-[10.73rem] whitespace-nowrap font-sans text-[0.5768rem] leading-[normal] text-[#6b7280]">
        Hosted by Maya Patel
      </p>

      {/* meta row: people / clock / camera (2504:9154–9165) */}
      <span
        aria-hidden="true"
        className="absolute left-[1.3627rem] top-[13.037rem] size-[0.3009rem] rounded-full bg-[#1a1a1d]"
      />
      <span
        aria-hidden="true"
        className="absolute left-[1.3125rem] top-[13.3881rem] h-[0.2508rem] w-[0.4012rem] rounded-[0.1505rem] bg-[#1a1a1d]"
      />
      <span
        aria-hidden="true"
        className="absolute left-[1.7639rem] top-[12.8866rem] size-[0.3511rem] rounded-full bg-[#1a1a1d]"
      />
      <span
        aria-hidden="true"
        className="absolute left-[1.7137rem] top-[13.2377rem] h-[0.3009rem] w-[0.4514rem] rounded-[0.1505rem] bg-[#1a1a1d]"
      />
      <p className="absolute left-[2.5162rem] top-[12.8866rem] whitespace-nowrap font-sans text-[0.5768rem] leading-[normal] text-[#1a1a1d]">
        42 Attending
      </p>

      <span
        aria-hidden="true"
        className="absolute left-[7.2809rem] top-[12.9368rem] size-[0.652rem] rounded-full border-[0.0803rem] border-[#1a1a1d]"
      />
      <span
        aria-hidden="true"
        className="absolute left-[7.5818rem] top-[13.0872rem] h-[0.2006rem] w-[0.0803rem] bg-[#1a1a1d]"
      />
      <span
        aria-hidden="true"
        className="absolute left-[7.5818rem] top-[13.2627rem] h-[0.0803rem] w-[0.2006rem] bg-[#1a1a1d]"
      />
      <p className="absolute left-[8.2338rem] top-[12.8866rem] whitespace-nowrap font-sans text-[0.5768rem] leading-[normal] text-[#1a1a1d]">
        60 min
      </p>

      <span
        aria-hidden="true"
        className="absolute left-[11.6945rem] top-[13.012rem] h-[0.5015rem] w-[0.7022rem] rounded-[0.1505rem] border-[0.0803rem] border-[#1a1a1d]"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 4.16975 4.21296"
        className="absolute left-[12.375rem] top-[13.0872rem] h-[0.3009rem] w-[0.3511rem] rotate-90 -scale-y-100"
      >
        <path d="M2.08488 0L4.16975 4.21296H0L2.08488 0Z" fill="#1A1A1D" />
      </svg>
      <p className="absolute left-[12.9483rem] top-[12.8866rem] whitespace-nowrap font-sans text-[0.5768rem] leading-[normal] text-[#1a1a1d]">
        Virtual
      </p>

      <p className="absolute left-[1.375rem] top-[14.625rem] w-[15.125rem] font-sans text-[0.5768rem] leading-[0.9529rem] text-[#6b7280]">
        Team up to crack the clues, solve the puzzles and escape before the
        timer runs out. Perfect for all skill levels.
      </p>

      {/* attendee stack (2504:9167–9174) */}
      {ATTENDEES.map((a) => (
        <span
          key={a.left}
          aria-hidden="true"
          className="absolute top-[17.8564rem] size-[1.6049rem] overflow-hidden rounded-full ring-[0.0803rem] ring-white"
          style={{ left: a.left }}
        >
          <Image
            src={a.img}
            alt=""
            quality={90}
            sizes="1.6049rem"
            className="size-full select-none object-cover"
          />
        </span>
      ))}
      <span className="absolute left-[7.8827rem] top-[17.8564rem] flex h-[1.6049rem] w-[2.2068rem] items-center justify-center rounded-[0.8025rem] border-[0.1003rem] border-white bg-[#ededf0] font-[family-name:var(--font-satoshi)] text-[0.5517rem] font-bold leading-[normal] text-[#6b7280]">
        +37
      </span>

      <span className="absolute left-[15.1875rem] top-[17.6875rem] flex h-[1.9375rem] w-[6.625rem] items-center justify-center rounded-[1.1536rem] bg-[rgba(34,97,4,0.515)] font-[family-name:var(--font-satoshi)] text-[0.5768rem] font-bold uppercase leading-[normal] tracking-[0.0301rem] text-white">
        JOIN EVENT
      </span>
    </div>
  );
}

/* UPCOMING EVENTS card (2504:9103) — 357×293, #161513, rounded 18 */
function UpcomingCard() {
  return (
    <div className="absolute left-[58.71875rem] top-[13.1875rem] h-[18.3125rem] w-[22.3125rem] overflow-hidden rounded-[1.125rem] bg-[#161513] shadow-[0_0.25rem_1rem_0_rgba(15,15,26,0.12)]">
      <div className="absolute left-[1.125rem] top-[1.125rem] flex w-[20rem] flex-col gap-[0.8125rem]">
        <div className="flex items-center justify-between">
          <span className="font-[family-name:var(--font-satoshi)] text-[0.5625rem] font-bold leading-[normal] tracking-[0.0281rem] text-[#9fa0a2]">
            UPCOMING EVENTS
          </span>
          <RowChevronButton />
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            {EVENTS.map((e) => (
              <div
                key={e.title}
                className="flex h-[3.828125rem] items-center justify-between border-b-[0.25px] border-[#919295]"
              >
                <div className="flex items-center gap-[0.8125rem]">
                  <Image
                    src={e.img}
                    alt={e.alt}
                    quality={90}
                    sizes="2.625rem"
                    className="size-[2.625rem] shrink-0 select-none rounded-[0.5rem] object-cover"
                  />
                  <div className="flex w-[5.5rem] flex-col gap-[0.3125rem]">
                    <div className="flex flex-col gap-[0.125rem] whitespace-nowrap">
                      <span className="font-[family-name:var(--font-satoshi)] text-[0.75rem] font-bold leading-[normal] text-white">
                        {e.title}
                      </span>
                      <span className="font-sans text-[0.5625rem] font-medium leading-[normal] text-[#9fa0a2]">
                        {e.when}
                      </span>
                    </div>
                    <span className="font-sans text-[0.5625rem] font-medium leading-[normal] text-[#9fa0a2]">
                      Virtual
                    </span>
                  </div>
                </div>
                <RowChevron />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2">
            <CalendarIcon />
            <span className="font-[family-name:var(--font-satoshi)] text-[0.5625rem] font-bold leading-[normal] tracking-[0.0281rem] text-[#9fa0a2]">
              VIEW CALENDAR
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* The whole device cluster (2504:9098) authored in a fixed 1295×476 box and
   scaled as one unit below 1360 so it never overflows. Stack, bottom → top:
   scrim gradient → black screen → cards → base strip → device shell (its
   screen area is transparent, so the bezel frames the cards). */
function DeviceCluster() {
  return (
    <div className="relative h-[29.75rem] w-[80.9375rem] overflow-hidden">
      {/* 2504:9100 — black scrim, fades out over the bottom 30% */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,#000_0%,rgba(0,0,0,0.85)_70%,rgba(0,0,0,0)_100%)]"
      />
      {/* 2504:9101 — the screen */}
      <div
        aria-hidden="true"
        className="absolute left-[12.21875rem] top-[2.1875rem] h-[27.5625rem] w-[56.375rem] bg-black"
      />

      <LiveCard />
      <UpcomingCard />

      {/* 2504:9178 — the lit strip below the screen */}
      <Image
        src={deviceBase}
        alt=""
        aria-hidden="true"
        quality={100}
        sizes="51.4375rem"
        className="absolute left-[14.71875rem] top-[27rem] h-[7rem] w-[51.4375rem] select-none"
      />
      {/* 2504:9179 — the device shell (transparent screen cut-out) */}
      <Image
        src={device}
        alt=""
        aria-hidden="true"
        priority
        quality={100}
        sizes="60.875rem"
        className="absolute left-[10rem] top-0 h-[78.6875rem] w-[60.875rem] max-w-none select-none"
      />
    </div>
  );
}

export default function ExpHero() {
  return (
    <section className="relative">
      {/* background: the Confetti mesh raster (1440×1958). It runs 693px
          (43.3125rem) past this section so ExpProblem's card overlaps it; the
          raster itself fades to white at the bottom, so no mask is needed. */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-[calc(100%_+_43.3125rem)] w-full overflow-hidden bg-[#1a0510]"
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
        {/* copy column (2504:9086) — centred, on the 1200 content width */}
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
                  <span className="lg:block">Bring your team together with</span>{" "}
                  <span className="lg:block">hosted experiences</span>
                </h1>
              </div>
              <p
                data-animation="reveal"
                data-reveal-delay="120"
                className="font-sans text-[1.0625rem] leading-[1.52] text-[#fbfeff] lg:text-[1.1875rem]"
              >
                Book real hosts for virtual, in-person, or hybrid events in
                minutes, right alongside your recognition and gifting programs.
              </p>
            </div>

            <div
              data-animation="reveal"
              data-reveal-delay="200"
              className="flex flex-col items-stretch gap-3.5 sm:flex-row sm:items-center"
            >
              <a
                href="#"
                className="inline-flex h-button-h items-center justify-center rounded-[100px] bg-[#ff5b77] px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                  Browse experiences
                </span>
              </a>
              <a
                href="#"
                className="inline-flex h-button-h items-center justify-center rounded-[100px] border border-white bg-transparent px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                  Talk to sales
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* device cluster (2504:9098): 60 below the copy, 1295 wide and centred
            — wider than the 1200 content box, so it sits outside the padding
            and scales down as one unit below 1360 */}
        <div
          data-animation="reveal"
          data-reveal-delay="240"
          className="mx-auto mt-[3.75rem] h-[7.735rem] w-[21.04375rem] min-[30rem]:h-[10.115rem] min-[30rem]:w-[27.51875rem] md:h-[16.66rem] md:w-[45.325rem] lg:h-[22.61rem] lg:w-[61.5125rem] min-[80rem]:h-[28.56rem] min-[80rem]:w-[77.7rem] min-[85rem]:h-[29.75rem] min-[85rem]:w-[80.9375rem]"
        >
          <div className="origin-top-left scale-[0.26] min-[30rem]:scale-[0.34] md:scale-[0.56] lg:scale-[0.76] min-[80rem]:scale-[0.96] min-[85rem]:scale-100">
            <DeviceCluster />
          </div>
        </div>

        {/* trust band (2504:9180): pt 60 → heading → 40 → stats → pb 100 */}
        <div className="px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
          <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10 pb-16 pt-10 md:pb-20 md:pt-14 lg:pb-[6.25rem] lg:pt-[3.75rem]">
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
    </section>
  );
}
