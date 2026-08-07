/* Ways to Engage · "sprawl" (Figma 1113:1882). THE PROOF — a grey panel holding
   one testimonial card: a solid blank portrait slot (blank in Figma) beside a
   large Satoshi-Medium pull-quote and an attribution chip. */

export default function WteProof() {
  return (
    <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-24">
      <div className="mx-auto flex w-full max-w-content flex-col gap-[3.75rem] rounded-[3.75rem] bg-[#f7f7f7] p-8 md:p-16 lg:px-[6.25rem] lg:py-[7.5rem]">
        {/* header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-2">
            <p
              data-animation="reveal"
              className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.0625rem] text-[rgba(27,27,27,0.6)]"
            >
              The proof
            </p>
            <h2
              data-animation="reveal"
              className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
            >
              Built for every use case
            </h2>
          </div>
          <a
            href="#"
            className="font-sans text-[0.75rem] font-bold uppercase tracking-[0.0625rem] text-[#16171b] transition-colors hover:text-[#6b6c71]"
          >
            <span className="border-b border-black pb-[2px]">View case study</span>
          </a>
        </div>

        {/* testimonial card */}
        <div
          data-animation="reveal"
          className="flex flex-col gap-8 rounded-[1.5rem] bg-white p-6 md:flex-row md:items-stretch md:p-8"
        >
          {/* portrait image slot — blank in Figma; solid neutral fill */}
          <div className="aspect-[299/349] w-full shrink-0 overflow-hidden rounded-[1rem] bg-[#e0e0e0] md:w-[18.6875rem]" />

          {/* quote + attribution */}
          <div className="flex flex-1 flex-col justify-between gap-8">
            <blockquote className="font-[family-name:var(--font-satoshi-medium)] text-[1.5625rem] leading-normal tracking-[-0.01875rem] text-[#16171b]">
              &ldquo;What really set Stadium apart was the breadth of options.
              Stadium supports everything from internal brand-building
              initiatives to external customer gifting to bulk event
              swag&mdash;all without needing multiple vendors.&rdquo;
            </blockquote>
            <div className="rounded-[1rem] bg-[#f7f7f7] p-6">
              <p className="font-[family-name:var(--font-satoshi)] text-[1.5625rem] leading-[1.04] tracking-[-0.01875rem] text-[#16171b]">
                Kate Wenzel
              </p>
              <p className="mt-3 font-sans text-[0.9375rem] leading-[1.5] text-[#6b6c71]">
                Director of Brand &amp; Marketing | ConstructConnect
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
