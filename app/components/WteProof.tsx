/* Ways to Engage · "proof" (Figma n9SjmDjzB1PeZAYJ5w43fr → 5714:13193).
   A grey r60 panel (inside the 1240 box, px/py 100/120 at lg) holding one
   testimonial card: portrait (299×349) beside a Satoshi-Medium pull-quote and
   an attribution chip. */

import Image from "next/image";
import portrait from "@/public/wte/proof-kate.jpg";

export default function WteProof() {
  return (
    <section className="bg-white py-16 md:py-20 lg:py-[7.5rem]">
      <div className="mx-auto w-full max-w-[90rem] px-section-x-sm md:px-section-x-md lg:px-[6.25rem]">
        <div className="flex flex-col gap-[3.75rem] rounded-[2.5rem] bg-[#f7f7f7] p-6 md:p-16 lg:rounded-[3.75rem] lg:px-[6.25rem] lg:py-[7.5rem]">
          {/* header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-2">
              <p
                data-animation="reveal"
                className="font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem] text-[rgba(27,27,27,0.6)]"
              >
                The proof
              </p>
              <h2
                data-animation="reveal"
                className="font-[family-name:var(--font-satoshi)] text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
              >
                Built for every use case
              </h2>
            </div>
            <a
              href="/the-proof"
              className="self-start font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem] text-[#16171b] transition-colors hover:text-[#6b6c71] sm:self-auto"
            >
              <span className="border-b border-black pb-[2px]">View case study</span>
            </a>
          </div>

          {/* testimonial card */}
          <div
            data-animation="reveal"
            className="flex flex-col gap-8 rounded-[1.5rem] bg-white p-6 md:flex-row md:items-end md:p-8"
          >
            <div className="relative aspect-[299/349] w-full shrink-0 overflow-hidden rounded-[1rem] md:w-[18.6875rem]">
              <Image
                src={portrait}
                alt="Kate W., Director of Brand & Marketing at ConstructConnect"
                fill
                sizes="(min-width:768px) 18.7rem, 90vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between gap-8 self-stretch">
              <blockquote className="font-[family-name:var(--font-satoshi-medium)] text-[1.25rem] leading-normal tracking-[-0.01875rem] text-[#16171b] lg:text-[1.5625rem]">
                &ldquo;What really set Stadium apart was the breadth of options.
                Stadium supports everything from internal brand-building
                initiatives to external customer gifting to bulk event
                swag&mdash;all without needing multiple vendors.&rdquo;
              </blockquote>
              <div className="flex flex-col gap-3 rounded-[1rem] bg-[#f7f7f7] p-6">
                <p className="font-[family-name:var(--font-satoshi)] text-[1.5625rem] leading-[1.04] tracking-[-0.01875rem] text-[#16171b]">
                  Kate W.
                </p>
                <p className="font-sans text-[0.9375rem] leading-[1.5] text-[#6b6c71]">
                  Director of Brand &amp; Marketing | ConstructConnect
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
