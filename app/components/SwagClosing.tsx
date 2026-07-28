/* Closing — Figma /swag 2:25751. Three blocks: a Book-a-demo card (left copy +
   white detail card, right a dark #16171b "device" form with pill fields on a
   glossy dark backdrop), a "Keep exploring" resource list beside the fluted
   image, and a dark final CTA. */

function Check() {
  return (
    <svg className="size-3.5 shrink-0 text-swag-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const FIELD =
  "h-11 w-full rounded-full border border-[#e2e2de] bg-white px-3.5 font-sans text-[0.8125rem] text-swag-ink placeholder:text-[#9999a3] focus:border-swag-green-deep focus:outline-none";
const LABEL = "font-sans text-[0.78125rem] font-bold uppercase tracking-[0.01875rem] text-swag-ink";

function Select({ label }: { label: string }) {
  return (
    <label className="flex flex-col gap-[0.4375rem]">
      <span className={LABEL}>{label}</span>
      <div className="relative">
        <input className={`${FIELD} appearance-none pr-9`} placeholder="Select" />
        <svg className="pointer-events-none absolute right-3.5 top-1/2 size-3.5 -translate-y-1/2 text-[#9999a3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </label>
  );
}

const LINKS = [
  { tag: "GUIDE", title: "No-Minimums Swag Playbook", desc: "Run a swag program without storing inventory." },
  { tag: "TEMPLATE", title: "Onboarding Kit Checklist", desc: "What goes in a new-hire kit, by role." },
  { tag: "STORY", title: "Fintech Branded Stores", desc: "How multi-office stores, budgets, and approvals work." },
];

export default function SwagClosing() {
  return (
    <>
      {/* Book a demo */}
      <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-24">
        <div className="mx-auto flex w-full max-w-content flex-col gap-10 rounded-[3.75rem] bg-[#f7f7f7] px-6 py-12 md:px-12 md:py-16 lg:flex-row lg:items-stretch lg:gap-8 lg:px-[5rem] lg:py-[6.25rem]">
          {/* left — copy + detail card, spread top-to-bottom */}
          <div className="flex flex-1 flex-col gap-10 lg:justify-between">
            <div className="flex flex-col gap-2">
              <p data-animation="reveal" className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-swag-green-deep">
                BOOK A DEMO
              </p>
              <h2 data-animation="reveal" className="font-display text-[2rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem] lg:text-[2.75rem]">
                Let&rsquo;s build your
                <br />
                swag program.
              </h2>
            </div>

            {/* white detail card: grey desc block + white checklist block */}
            <div data-animation="reveal" className="flex flex-col rounded-3xl bg-white p-2.5 shadow-[0_0.1875rem_0.375rem_0_rgba(0,0,0,0.06)]">
              <div className="rounded-3xl bg-[#f7f7f7] p-6">
                <p className="font-sans text-[1.0625rem] leading-[1.5] text-swag-grey">
                  One 30-minute call. We&rsquo;ll map your swag program, recommend
                  the right setup, and show how Stadium fits your team. Mockups
                  included. No commitment.
                </p>
              </div>
              <ul className="flex flex-col gap-3 rounded-2xl bg-white px-6 pb-6 pt-[2.125rem]">
                {[
                  "Set up around your team–Marketing, HR, or Procurement.",
                  "Every send in one place, to 170+ countries.",
                  "Do it yourself or let us guide you. No lock-in.",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <Check />
                    <span className="font-sans text-[0.9375rem] leading-[1.4] text-swag-ink">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* right — dark device form */}
          <div className="relative flex flex-col overflow-hidden rounded-3xl bg-swag-ink px-4 pt-12 md:px-[2.8125rem] md:pt-[4.5rem] lg:w-[32.875rem] lg:shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/swag/swag-form-bg.jpg" alt="" aria-hidden className="pointer-events-none absolute inset-0 size-full object-cover" />
            <form data-animation="reveal" className="relative flex flex-1 flex-col gap-4 rounded-t-3xl bg-white p-8" action="#">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-[0.4375rem]">
                  <span className={LABEL}>Full name</span>
                  <input className={FIELD} placeholder="John Doe" />
                </label>
                <label className="flex flex-col gap-[0.4375rem]">
                  <span className={LABEL}>Work email</span>
                  <input className={FIELD} placeholder="john@doe.com" type="email" />
                </label>
              </div>
              <Select label="Company" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Select label="Team" />
                <Select label="Company size" />
              </div>
              <label className="flex flex-col gap-[0.4375rem]">
                <span className={LABEL}>What are you exploring?</span>
                <textarea className="min-h-[4.5rem] w-full rounded-[0.625rem] border border-[#e2e2de] bg-white px-3.5 pb-10 pt-3.5 font-sans text-[0.8125rem] text-swag-ink placeholder:text-[#9999a3] focus:border-swag-green-deep focus:outline-none" placeholder="What do you need — stores, kits, bulk, storage…" />
              </label>
              <button type="button" className="inline-flex h-[3.25rem] w-full items-center justify-center gap-1.5 rounded-full bg-swag-green-deep px-[1.375rem] font-sans text-[0.9375rem] font-semibold text-white transition-all hover:brightness-95 active:scale-[0.99]">
                Book a demo
                <ArrowRight />
              </button>
              <p className="font-sans text-[0.75rem] leading-[1.4] text-[#9999a3]">
                By booking, you agree to Stadium&rsquo;s <span className="underline">Terms</span> and <span className="underline">Privacy Notice</span>.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Keep exploring (white, rounded bottom) + final CTA. A soft green accent
          glows up from the CTA block under the resources panel and fades to
          near-black so it meets the dark footer. */}
      <div className="bg-[#181818]">
        {/* Keep exploring — white panel with a rounded bottom */}
        <section className="relative z-10 rounded-b-[3.75rem] bg-white px-section-x-sm pt-16 pb-16 md:px-section-x-md md:pt-20 md:pb-20 lg:px-section-x-lg lg:pt-24 lg:pb-24">
        <div className="mx-auto grid w-full max-w-content grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <p data-animation="reveal" className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-swag-green-deep">
                KEEP EXPLORING
              </p>
              <h2 data-animation="reveal" className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem]">
                More on getting swag right.
              </h2>
            </div>
            <div className="flex flex-col">
              {LINKS.map((l) => (
                <a key={l.title} href="#" className="group flex items-center justify-between gap-4 border-t border-grey-200 py-5 last:border-b">
                  <div className="flex flex-col gap-1">
                    <span className="font-sans text-[0.6875rem] font-bold uppercase tracking-[0.06rem] text-swag-green-deep">
                      {l.tag}
                    </span>
                    <span className="font-display text-[1.25rem] text-swag-ink">{l.title}</span>
                    <span className="font-sans text-[0.875rem] text-swag-grey">{l.desc}</span>
                  </div>
                  <svg className="size-6 shrink-0 text-swag-ink transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M7 17 17 7M7 7h10v10" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div data-animation="reveal" className="overflow-hidden rounded-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/swag/swag-workflow.jpg" alt="" aria-hidden className="aspect-[3/2] w-full object-cover" />
          </div>
        </div>
      </section>

        {/* Final dark CTA — soft green accent glows up under the resources panel,
            fading to near-black into the footer */}
        <section className="relative -mt-[3.75rem] bg-[linear-gradient(to_bottom,#e9f5ef_0%,#bfe0cd_16%,#63a582_34%,#264c39_54%,#181818_76%)] px-section-x-sm pt-[6.5rem] pb-16 md:px-section-x-md md:pt-[7.5rem] md:pb-20 lg:px-section-x-lg lg:pt-[8.5rem] lg:pb-24">
          <div className="mx-auto flex max-w-content flex-col items-center gap-6 rounded-[2.5rem] bg-swag-ink px-6 py-20 text-center md:py-24">
          <h2 data-animation="reveal" className="max-w-[36rem] font-display text-[2rem] leading-[1.06] tracking-[-0.03125rem] text-white md:text-[2.75rem]">
            Make swag run itself
          </h2>
          <p data-animation="reveal" className="max-w-[34rem] font-sans text-body-md text-[#c6c6c4] lg:text-[1.125rem]">
            Talk to our team and leave with a plan built around your brand,
            budget, and goals. Mockups included.
          </p>
          <div data-animation="reveal" className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
            <a href="#" className="inline-flex h-12 items-center justify-center rounded-full bg-swag-green-deep px-7 font-sans text-button-primary text-white transition-all hover:brightness-95 active:scale-[0.98] focus-visible:outline-white">
              <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">Book a demo</span>
            </a>
            <a href="#" className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 px-7 font-sans text-button-primary text-white transition-all hover:bg-white/10 active:scale-[0.98] focus-visible:outline-white">
              <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">Browse the catalog</span>
            </a>
          </div>
          <p className="font-sans text-[0.8125rem] text-[#9a9da3]">
            or ship it yourself — SwagMagic ↗
          </p>
          </div>
        </section>
      </div>
    </>
  );
}
