/* Closing — Figma /swag 2:25751. Three blocks: a Book-a-demo card with a lead
   form, a "Keep exploring" resource list, and a dark final CTA. */

function Check() {
  return (
    <svg className="mt-0.5 size-3.5 shrink-0 text-swag-green-deep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

const FIELD =
  "h-11 w-full rounded-lg border border-grey-200 bg-white px-3 font-sans text-[0.875rem] text-swag-ink placeholder:text-grey-400 focus:border-swag-green-deep focus:outline-none";
const LABEL = "font-sans text-[0.6875rem] font-bold uppercase tracking-[0.06rem] text-swag-grey";

function Select({ label }: { label: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className={LABEL}>{label}</span>
      <div className="relative">
        <input className={`${FIELD} appearance-none pr-9`} placeholder="Select" />
        <svg className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-grey-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
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
        <div className="mx-auto grid w-full max-w-content grid-cols-1 items-start gap-12 rounded-3xl bg-[#f6f6f6] p-8 md:p-12 lg:grid-cols-2 lg:gap-16 lg:p-14">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <p data-animation="reveal" className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-swag-green-deep">
                BOOK A DEMO
              </p>
              <h2 data-animation="reveal" className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem]">
                Let&rsquo;s build your
                <br />
                swag program.
              </h2>
              <p data-animation="reveal" className="font-sans text-body-md leading-[1.5] text-swag-grey">
                One 30-minute call. We&rsquo;ll map your swag program, recommend
                the right setup, and show how Stadium fits your team. Mockups
                included. No commitment.
              </p>
            </div>
            <ul className="flex flex-col gap-3">
              {[
                "Set up around your team — Marketing, HR, or Procurement.",
                "Every send in one place, to 170+ countries.",
                "Do it yourself or let us guide you. No lock-in.",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check />
                  <span className="font-sans text-[0.9375rem] text-swag-grey">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* form */}
          <form data-animation="reveal" className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-[0_0.5rem_1.5rem_-0.5rem_rgba(0,0,0,0.1)]" action="#">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className={LABEL}>Full name</span>
                <input className={FIELD} placeholder="John Doe" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={LABEL}>Work email</span>
                <input className={FIELD} placeholder="john@doe.com" type="email" />
              </label>
            </div>
            <Select label="Company" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Select label="Team" />
              <Select label="Company size" />
            </div>
            <label className="flex flex-col gap-1.5">
              <span className={LABEL}>What are you exploring?</span>
              <textarea className="min-h-[4.5rem] w-full rounded-lg border border-grey-200 bg-white p-3 font-sans text-[0.875rem] text-swag-ink placeholder:text-grey-400 focus:border-swag-green-deep focus:outline-none" placeholder="What do you need — stores, kits, bulk, storage…" />
            </label>
            <button type="button" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-swag-green-deep px-6 font-sans text-[0.875rem] font-semibold text-white transition-all hover:brightness-95 active:scale-[0.99]">
              Book a demo →
            </button>
            <p className="font-sans text-[0.75rem] text-grey-400">
              By booking, you agree to Stadium&rsquo;s Terms and Privacy Notice.
            </p>
          </form>
        </div>
      </section>

      {/* Keep exploring */}
      <section className="bg-white px-section-x-sm pb-16 md:px-section-x-md md:pb-20 lg:px-section-x-lg lg:pb-24">
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
          <div data-animation="reveal" className="overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/swag/swag-ribbon.jpg" alt="" aria-hidden className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Final dark CTA */}
      <section className="bg-white px-section-x-sm pb-16 md:px-section-x-md md:pb-20 lg:px-section-x-lg lg:pb-24">
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
    </>
  );
}
