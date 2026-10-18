import G2Reviews from "./G2Reviews";

/* /reviews · Hero. Same light, centred hero as /ways-to-engage (plain white,
   eyebrow + display headline, 575-wide column in the 1200 content box), with the
   live G2 widget directly underneath. */
export default function ReviewsHero() {
  return (
    <section className="relative bg-surface-base pt-[6rem] md:pt-[7rem] lg:pt-[12.75rem]">
      <div className="px-section-x-sm md:px-section-x-md lg:px-section-x-lg">
        <div className="mx-auto w-full max-w-content">
          <div
            data-animation="reveal"
            className="mx-auto flex max-w-[35.9375rem] flex-col gap-2 text-center"
          >
            <p className="font-sans text-[0.75rem] font-bold uppercase leading-[1.4] tracking-[0.1rem] text-[#777777]">
              Discover why customers love us
            </p>
            <h1 className="font-[family-name:var(--font-satoshi)] text-[2.5rem] font-black leading-[1.02] tracking-[-0.0625rem] text-[#1b1b1b] md:text-[3rem] lg:text-[3.625rem] lg:tracking-[-0.09375rem]">
              Customer Testimonials &amp; Reviews
            </h1>
          </div>
        </div>
      </div>
      <G2Reviews />
    </section>
  );
}
