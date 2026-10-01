import type { Metadata } from "next";
import Image from "next/image";

import PageClose from "../components/PageClose";
import SiteHeader from "../components/SiteHeader";
import callBooked from "@/public/thank-you/call-booked.png";

/* /thank-you — recreated from https://www.bystadium.com/thank-you (measured
   live 2026-10-01 at 1440; no Figma frame). BookACallForm redirects here
   (ENV_CONFIG.THANK_YOU_PAGE_URL) once a call is booked in ChiliPiper.

   Live desktop stack (white page, centred 960 row):
     illustration 300×270  ·  gap 160  ·  copy column 500
       eyebrow  12 Bold +1px, accent water, uppercase
       → 15 → heading 32/40 Satoshi Bold, grey-700
       → 11 → body 18/28 +0.25, grey-700
       → 27 → GET STARTED pill 40h, grey-700 fill, grey-100 label
   ~165 above / below the row. Below lg it stacks centred, image first. */

export const metadata: Metadata = {
  title: "Thanks for booking your call | Stadium",
  description:
    "Your call is on the calendar. While you wait, get started with recognition, swag, and gifting on Stadium.",
  /* post-conversion page — keep it out of search results */
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <>
      <SiteHeader lightHero />
      <main
        id="main"
        tabIndex={-1}
        className="flex flex-1 flex-col overflow-x-clip bg-white outline-none"
      >
        <section
          aria-labelledby="thank-you-title"
          className="px-section-x-sm pb-16 pt-28 md:px-section-x-md md:pb-24 md:pt-36 lg:px-section-x-lg lg:pb-40 lg:pt-56"
        >
          <div className="mx-auto flex w-full max-w-[60rem] flex-col items-center gap-10 text-center md:gap-12 lg:flex-row lg:items-start lg:gap-40 lg:text-left">
            <Image
              src={callBooked}
              alt="Illustration of three smiling people on a video call"
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 768px) 18.75rem, 15rem"
              quality={90}
              className="h-auto w-60 shrink-0 md:w-[18.75rem]"
            />

            <div className="flex max-w-[31.25rem] flex-col items-center lg:items-start">
              <p
                data-animation="reveal"
                className="font-sans text-eyebrow-sm leading-4 uppercase text-accent-water"
              >
                You’re all set!
              </p>
              <h1
                id="thank-you-title"
                data-animation="reveal"
                className="mt-4 text-balance font-display text-heading-md text-grey-700"
              >
                Thanks for booking your call
              </h1>
              <p
                data-animation="reveal"
                className="mt-3 font-sans text-body-md tracking-[0.015625rem] text-grey-700 md:text-body-lg"
              >
                Your call’s officially on the calendar! While you wait, get started to see how
                effortless recognition, swag, and gifting can be.
              </p>
              <a
                href="https://app.bystadium.com/dashboard"
                data-animation="reveal"
                className="mt-7 inline-flex h-button-h items-center justify-center rounded-button bg-grey-700 px-button-x font-sans text-button-primary uppercase text-grey-100 transition-all duration-200 hover:bg-grey-800 active:scale-[0.98]"
              >
                <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                  Get started
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <PageClose showCta={false} />
    </>
  );
}
