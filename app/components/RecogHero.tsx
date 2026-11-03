import Image from "next/image";
import heroBg from "@/public/recog2/rc-hero-bg.webp";
import { HeroLogoWall } from "./common/HeroLogoWall";

export default function RecogHero() {
  return (
    <section className="relative bg-[#29024e]">
      <div className="absolute inset-x-0 bottom-0 z-0 h-[33rem] w-full overflow-hidden bg-[#29024e] md:h-[45rem] [mask-image:linear-gradient(to_bottom,transparent,#000_18%)] lg:inset-0 lg:h-full lg:[mask-image:none]">
        <Image
          src={heroBg}
          alt=""
          aria-hidden="true"
          priority
          quality={90}
          sizes="100vw"
          className="h-full w-full select-none object-cover object-[72%_top] lg:object-center"
        />
      </div>

      <div className="relative z-20 px-section-x-sm pt-[6rem] md:px-section-x-md md:pt-[7rem] lg:px-section-x-lg lg:pt-[5.25rem] lg:aspect-[16/8]">
        <div className="mx-auto flex w-full max-w-content flex-col gap-12 lg:flex-row lg:justify-between lg:gap-24">
          {/* left */}
          <div className="flex w-full flex-col gap-8 lg:max-w-[35.3125rem] lg:pt-[7.5rem] flex-[1]">
            <div className="flex flex-col gap-5">
              <div data-animation="reveal" className="flex flex-col gap-2">
                <p className="whitespace-pre font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#edd9fc]">
                  {"RECOGNITION"}
                </p>
                <h1 className="font-[family-name:var(--font-satoshi)] text-[2.5rem] font-black leading-[1.02] tracking-[-0.0625rem] text-white md:text-[3rem] lg:text-[3.625rem] lg:tracking-[-0.09375rem]">
                  Recognition that
                  <br className="hidden min-[84rem]:inline" />
                  {" shows up at the door."}
                </h1>
              </div>
              <p
                data-animation="reveal"
                data-reveal-delay="120"
                className="w-full font-sans text-[1.0625rem] leading-[1.52] text-[#fbfeff] lg:max-w-[min(33.5rem,calc(52.19vw-var(--spacing-section-x-lg)-1rem))] lg:text-[1.1875rem]"
              >Turn everyday appreciation into meaningful rewards that your people choose, delivered right to their doors.</p>
            </div>

            <div
              data-animation="reveal"
              data-reveal-delay="200"
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <a
                  href="#how-it-works"
                  className="inline-flex h-button-h items-center justify-center rounded-[100px] bg-[#8d12e7] px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                    See how it works
                  </span>
                </a>
                <a
                  href="/book-a-call"
                  className="inline-flex h-button-h items-center justify-center rounded-[100px] border border-white bg-transparent px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                    Talk to sales
                  </span>
                </a>
              </div>
              <p className="font-sans text-[0.8125rem] font-semibold leading-[1.4] text-[#fbfeff]">
                Trusted by 5,000+ teams across 170+ countries.
              </p>
            </div>
          </div>
          {/* photo room below the copy on mobile/tablet — the woman sits in the bg image here */}
          <div aria-hidden="true" className="h-[22rem] md:h-[32rem] lg:hidden" />
        </div>
      </div>

      {/* Slack kudos notification — Figma 7265:9765 (left 751.6 / top 291.5 of the 1440 × 912 frame).
          Mobile: narrow card in the empty space left of her face so it clears her hands. */}
      <div
        aria-hidden="true"
        data-animation="reveal"
        data-reveal-delay="240"
        className="absolute bottom-[22rem] left-section-x-sm z-20 flex w-[12.75rem] items-start gap-2 rounded-[0.8rem] bg-white p-3 shadow-[0_0.3rem_1.2rem_0_rgba(27,15,38,0.15)] md:bottom-[13rem] md:left-auto md:right-section-x-md md:w-[18.3rem] md:gap-3 lg:bottom-auto lg:right-auto lg:left-[52.19%] lg:top-[32%]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/recog2/rc-hero-slack-mark.svg" alt="" className="size-[1.4rem] shrink-0 select-none" />
        <div className="flex min-w-0 flex-1 flex-col gap-2 font-[family-name:var(--font-satoshi-medium)] text-[#17191d]">
          <div className="flex flex-col gap-[0.1875rem]">
            <div className="flex items-center justify-between leading-normal">
              <span className="text-[0.65rem]">Slack</span>
              <span className="text-[0.6rem] text-[#69666d]">now</span>
            </div>
            <p className="text-[0.75rem] leading-4">
              Stadium · <b className="font-[family-name:var(--font-satoshi)] font-bold">#team-wins</b>
            </p>
            <p className="text-[0.75rem] leading-normal">
              <b className="font-[family-name:var(--font-satoshi)] font-bold">Emily</b> gave{" "}
              <b className="font-[family-name:var(--font-satoshi)] font-bold">You</b> kudos for closing the Acme renewal.
            </p>
          </div>
          <div className="flex w-fit items-center gap-[0.4rem] rounded-full border-[0.05rem] border-[#e4d8f2] bg-[#f3eefa] px-[0.6rem] py-[0.3rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/recog2/rc-hero-coins.svg" alt="" className="size-[0.8rem] select-none" />
            <span className="font-[family-name:var(--font-satoshi)] text-[0.7rem] font-bold leading-normal text-[#5423a8]">
              500 kudos
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-30">
        <HeroLogoWall />
      </div>
    </section>
  );
}
