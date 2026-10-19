import Image from "next/image";
import heroBg from "@/public/exp2/xp-hero-bg.jpg";
import EventsHeroGraphic from "./EventsHeroGraphic";
import { HeroLogoWall } from "./common/HeroLogoWall";

/* trust band stats (2673:3448) */
const STATS = [
  { value: "25,000+", label: "Teams" },
  { value: "52,000+", label: "Experiences Hosted" },
  { value: "500+", label: "Experience Formats" },
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

export default function ExpHeroTwo() {
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
                href="/book-a-call"
                className="inline-flex h-button-h items-center justify-center rounded-[100px] bg-[#ff5b77] px-[1.375rem] font-sans text-button-primary uppercase text-ink transition-all duration-200 hover:brightness-110 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white pb-0.75"
              >
                <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                  Talk to sales
                </span>
              </a>
              <a
                href="/catalog#gifts"
                className="inline-flex h-button-h items-center justify-center rounded-[100px] border border-white bg-transparent px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white pb-0.75"
              >
                <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                  Browse gifts
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
          <div
            data-animation="reveal"
            data-reveal-delay="240"
            className="mx-auto max-w-content"
          >
            <div className="pt-12">
              {/* Figma 5892:11404 — live UI (text/icons stay vector-crisp),
                  only the webcam photos are raster. */}
              <EventsHeroGraphic />
            </div>
          </div>
        </div>

        {/* trust band (2673:3446): pt 100 → heading → 40 → stats → pb 100 */}
        <div className="px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
          <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10 pt-16 md:pt-20 lg:pt-[4rem]">
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
                  <p className="font-[family-name:var(--font-satoshi)] text-[1.5rem] font-black leading-[1.02] tracking-[-0.0625rem] md:text-[2.5rem] lg:text-[2.875rem]">
                    {s.value}
                  </p>
                  <p className="font-sans text-[0.75rem] font-semibold leading-[1.4]">
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
