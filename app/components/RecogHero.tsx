import Image from "next/image";
import heroBg from "@/public/rec-hero-bg.png";
import heroPhoto from "@/public/recog2/rc-hero-photo.png";
import toastAvatar from "@/public/recog2/rc-hero-avatar.png";
import { HeroLogoWall } from "./common/HeroLogoWall";
import RecognitionTween from "./special/RecognitionTween";

export default function RecogHero() {
  return (
    <section className="relative">
      <div className="absolute inset-0 z-0 h-full w-full pt-130 lg:pt-0">
        <video
          src="/girlBg.mp4"
          autoPlay
          muted
          playsInline
          className="object-cover h-full w-full girlBg"
        />
      </div>
      {/* <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-[calc(100%)] w-full overflow-hidden bg-[#5a3172]"
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
      </div> */}

      <div className="relative z-20 px-section-x-sm pt-[6rem] md:px-section-x-md md:pt-[7rem] lg:px-section-x-lg lg:pt-[5.25rem] lg:aspect-[16/8] recogHeroTextBg">
        <div className="mx-auto flex w-full max-w-content flex-col gap-12 lg:flex-row lg:justify-between lg:gap-24">
          {/* left */}
          <div className="flex w-full flex-col gap-8 lg:w-full lg:pt-[7.5rem] flex-[1]">
            <div className="flex flex-col gap-5">
              <div data-animation="reveal" className="flex flex-col gap-2">
                <p className="whitespace-pre font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#edd9fc]">
                  {"EMPLOYEE RECOGNITION"}
                </p>
                <h1 className="font-[family-name:var(--font-satoshi)] text-[2.5rem] font-black leading-[1.02] tracking-[-0.0625rem] text-white md:text-[3rem] lg:text-[3.625rem] lg:tracking-[-0.09375rem]">
                  Recognition that
                  <br className="hidden min-[84rem]:inline" />
                  {" shows up at the door"}
                </h1>
              </div>
              <p
                data-animation="reveal"
                data-reveal-delay="120"
                className="w-full font-sans text-[1.0625rem] leading-[1.52] text-[#fbfeff] lg:text-[1.1875rem]"
              >
                Run employee recognition, rewards, milestones, and incentives in
                one platform. Your team recognizes great work. Employees choose
                their reward. Stadium delivers it worldwide.
              </p>
            </div>

            <div
              data-animation="reveal"
              data-reveal-delay="200"
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <a
                  href="#"
                  className="inline-flex h-button-h items-center justify-center rounded-[100px] bg-[#8d12e7] px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                    Talk to sales
                  </span>
                </a>
                <a
                  href="#"
                  className="inline-flex h-button-h items-center justify-center rounded-[100px] border border-white bg-transparent px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                    Explore rewards
                  </span>
                </a>
              </div>
              <p className="font-sans text-[0.8125rem] font-semibold leading-[1.4] text-[#fbfeff]">
                5,000+ teams ship gifts this way. In 170+ countries.
              </p>
            </div>
          </div>

          {/* right */}
          {/* <RecognitionTween /> */}
          <div className="w-full flex-1 lg:pt-66">
            <video src="/transBgVideo.webm" autoPlay muted playsInline />
            {/* <Image
              src={"/recognition/recogHero.png"}
              width={0}
              height={0}
              quality={100}
              className="w-full h-auto"
              sizes="630px"
              alt="yeah"
            /> */}
          </div>

          <div
            data-animation="reveal"
            data-reveal-delay="240"
            className="hidden relative w-full max-w-[21.5rem] self-center sm:max-w-[24rem] md:max-w-[26rem] lg:w-[49.5833%] lg:max-w-none lg:self-start"
          >
            <Image
              src={heroPhoto}
              alt="An employee smiling at a recognition notification on her phone"
              priority
              quality={90}
              sizes="(min-width: 1380px) 37.1875rem, (min-width: 1024px) 50vw, (min-width: 768px) 26rem, (min-width: 640px) 24rem, 100vw"
              className="h-auto w-full select-none"
            />

            <div className="absolute right-[-3.3613%] top-[36.9347%] flex items-center gap-8 overflow-hidden rounded-[1.125rem] bg-[rgba(255,255,255,0.97)] px-[1.125rem] py-[0.9375rem] shadow-[0_0.875rem_2.25rem_0_rgba(26,0,51,0.28)]">
              <div className="flex items-center gap-[0.8125rem]">
                <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-[rgba(173,173,173,0.2)]">
                  <Image
                    src={toastAvatar}
                    alt=""
                    quality={90}
                    sizes="2.5rem"
                    className="size-full select-none object-cover"
                  />
                </div>
                <div className="flex flex-col gap-[0.1875rem]">
                  <p className="whitespace-nowrap font-[family-name:var(--font-satoshi)] text-[1rem] font-bold leading-normal text-[#1a1030]">
                    You&#8217;ve been recognised
                  </p>
                  <div className="flex items-center gap-2 font-sans text-[0.875rem] leading-normal">
                    <span className="whitespace-nowrap text-[#6b6480]">
                      From Alex Kim
                    </span>
                    <span className="whitespace-pre text-[#a09ab0]">
                      {"·  2m ago"}
                    </span>
                  </div>
                </div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/recog2/rc-hero-slack.svg"
                alt=""
                width={30}
                height={30}
                className="size-[1.875rem] shrink-0 select-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-30">
        <HeroLogoWall />
      </div>
    </section>
  );
}
