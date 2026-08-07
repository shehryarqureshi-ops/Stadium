/* /gifting · WORKS WITH YOUR STACK (Figma 1113:2497). "Send gifts from the tools
   you already use" — header + a realistic Integrations admin UI mockup (exported
   from Figma node 1535:28244, matching the site's admin-mockup pattern). */

import Image from "next/image";
import integrations from "@/public/gifting/g2-integrations.jpg";

export default function GiftIntegrations() {
  return (
    <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-24">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10">
        <div className="flex max-w-[42rem] flex-col items-center gap-2 text-center">
          <p
            data-animation="reveal"
            className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-[#996b00] md:text-eyebrow-md"
          >
            Works with your stack
          </p>
          <h2
            data-animation="reveal"
            className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
          >
            Send gifts from the tools you already use
          </h2>
          <p data-animation="reveal" className="mt-2 font-sans text-[1.0625rem] leading-[1.48] text-[#6b6c71] lg:text-[1.125rem]">
            Trigger gifts from your HRIS, CRM, or workflows without changing how your team works.
          </p>
        </div>

        <div
          data-animation="reveal"
          className="w-full overflow-hidden rounded-[1rem] shadow-[0px_40px_80px_-24px_rgba(0,0,0,0.28),0px_8px_20px_-8px_rgba(0,0,0,0.12)]"
        >
          <Image
            src={integrations}
            alt="Stadium admin — Integrations: connect your HRIS, ATS and CRM to trigger gifts"
            className="w-full"
            sizes="(min-width:1024px) 75rem, 100vw"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
