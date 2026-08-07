"use client";

/* /gifting · "Let's map out your program" form + closing CTA (Figma 1650:3194).
   Left copy + a multi-field contact form on white, then the dark "Bring your
   corporate gifting programs together" CTA on an amber gradient. The footer
   itself is rendered by PageClose (showCta=false) after this. */

const CHECKS = [
  "One setup for HR, Marketing, Sales, and CX",
  "Automated gifting workflows in action",
  "A replacement for gift cards and agency-managed gifting",
];

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#16171b" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 size-[0.9rem] shrink-0" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-sans text-[0.6875rem] font-bold uppercase tracking-[0.0625rem] text-[#16171b]">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="h-11 rounded-[0.625rem] border border-[#e4e4e7] bg-white px-3.5 font-sans text-[0.9375rem] text-[#16171b] placeholder:text-[#b4b4b8] focus:border-[#ffb800] focus:outline-none"
      />
    </label>
  );
}

function Select({ label }: { label: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-sans text-[0.6875rem] font-bold uppercase tracking-[0.0625rem] text-[#16171b]">{label}</span>
      <div className="relative">
        <select
          defaultValue=""
          className="h-11 w-full appearance-none rounded-[0.625rem] border border-[#e4e4e7] bg-white px-3.5 pr-9 font-sans text-[0.9375rem] text-[#6b6c71] focus:border-[#ffb800] focus:outline-none"
        >
          <option value="" disabled>
            Select
          </option>
          <option>Option one</option>
          <option>Option two</option>
        </select>
        <svg viewBox="0 0 24 24" fill="none" stroke="#8a8a90" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2" aria-hidden>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </label>
  );
}

export default function GiftContact() {
  return (
    <>
      {/* form section */}
      <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-24">
        <div className="mx-auto grid w-full max-w-content grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* left copy */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p
                data-animation="reveal"
                className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-[#996b00] md:text-eyebrow-md"
              >
                Talk to sales
              </p>
              <h2
                data-animation="reveal"
                className="font-[family-name:var(--font-satoshi)] text-[1.75rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-[#16171b] md:text-[2.25rem] lg:text-[2.75rem]"
              >
                Let’s map out your corporate gifting program
              </h2>
            </div>
            <div data-animation="reveal" className="rounded-[1rem] bg-[#f2f2f2] p-6">
              <p className="font-sans text-[1rem] leading-[1.5] text-[#6b6c71]">
                In 30 minutes, we’ll build a gifting strategy around your teams, workflows, and goals.
              </p>
            </div>
            <ul data-animation="reveal" className="flex flex-col gap-3">
              {CHECKS.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <Check />
                  <span className="font-sans text-[0.9375rem] leading-[1.4] text-[#16171b]">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* form card */}
          <form
            data-animation="reveal"
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-4 rounded-[1.25rem] bg-white p-6 shadow-[0px_24px_60px_-20px_rgba(0,0,0,0.2),0px_2px_8px_rgba(0,0,0,0.06)] md:p-8"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Full name" placeholder="John Doe" />
              <Field label="Work email" placeholder="john@doe.com" type="email" />
              <Field label="Company" placeholder="John Doe" />
              <Field label="Phone number" placeholder="XXX XXX XXX" type="tel" />
              <Select label="Team" />
              <Select label="Company size" />
            </div>
            <Select label="Customize your demo" />
            <Select label="How often would you like to use Stadium?" />
            <label className="flex flex-col gap-1.5">
              <span className="font-sans text-[0.6875rem] font-bold uppercase tracking-[0.0625rem] text-[#16171b]">What do you want to solve?</span>
              <textarea
                rows={3}
                placeholder="What do you need — stores, kits, bulk, storage…"
                className="resize-none rounded-[0.625rem] border border-[#e4e4e7] bg-white px-3.5 py-2.5 font-sans text-[0.9375rem] text-[#16171b] placeholder:text-[#b4b4b8] focus:border-[#ffb800] focus:outline-none"
              />
            </label>
            <button
              type="submit"
              className="mt-1 inline-flex h-button-h items-center justify-center gap-2 rounded-[0.625rem] bg-[#ffb800] px-button-x font-sans text-button-primary uppercase text-[#1b1b1b] transition-all duration-200 hover:brightness-105 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffb800]"
            >
              <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">Talk to sales</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <p className="font-sans text-[0.75rem] leading-[1.4] text-[#8a8a90]">
              By booking, you agree to Stadium’s{" "}
              <a href="#" className="underline">Terms</a> and{" "}
              <a href="#" className="underline">Privacy Notice</a>.
            </p>
          </form>
        </div>
      </section>

      {/* closing CTA on amber gradient */}
      <section
        className="px-section-x-sm pb-16 pt-4 md:px-section-x-md md:pb-20 lg:px-section-x-lg lg:pb-24"
        style={{ backgroundImage: "linear-gradient(180deg, #ffffff 0%, #f7dfa6 55%, #d99b2c 100%)" }}
      >
        <div className="mx-auto w-full max-w-content">
          <div className="flex flex-col items-center gap-6 rounded-[2rem] bg-[#16171b] px-6 py-16 text-center md:py-20">
            <div className="flex max-w-[46rem] flex-col items-center gap-4">
              <h2
                data-animation="reveal"
                className="font-[family-name:var(--font-satoshi)] text-[1.875rem] font-bold leading-[1.08] tracking-[-0.03125rem] text-white md:text-[2.5rem] lg:text-[2.75rem]"
              >
                Bring your corporate gifting programs together
              </h2>
              <p data-animation="reveal" className="font-sans text-[1.0625rem] leading-[1.5] text-white/80">
                Book a call to explore pricing, catalog options, and the right setup for your team.
              </p>
            </div>
            <div data-animation="reveal" className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#"
                className="inline-flex h-button-h items-center justify-center rounded-[100px] bg-[#ffb800] px-[1.375rem] font-sans text-button-primary uppercase text-[#1b1b1b] transition-all duration-200 hover:brightness-105 active:scale-[0.98] focus-visible:outline-white"
              >
                <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">Talk to sales</span>
              </a>
              <a
                href="#"
                className="inline-flex h-button-h items-center justify-center rounded-[100px] border border-white/40 bg-transparent px-[1.375rem] font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-white"
              >
                <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">Browse the catalog</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
