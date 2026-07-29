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

function Select({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="flex flex-col gap-[0.4375rem]">
      <span className={LABEL}>{label}</span>
      <div className="relative">
        <input className={`${FIELD} appearance-none pr-9`} placeholder={placeholder} />
        <svg className="pointer-events-none absolute right-3.5 top-1/2 size-3.5 -translate-y-1/2 text-[#9999a3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </label>
  );
}

export type SwagClosingContent = {
  /* Block 1 — "Book a demo" card. Optional: omit for pages whose closing has no
     demo form (e.g. /snacks renders only the final CTA). */
  bookDemo?: {
    eyebrow: string;
    /* Headline is split into two lines separated by a hard <br />. */
    headingLine1: string;
    headingLine2: string;
    /* Body copy inside the grey detail block. */
    detailBody: string;
    /* Checklist rows under the detail block. */
    features: string[];
    /* Glossy dark backdrop behind the form. Plain /public string path. */
    formBgSrc: string;
    /* Copy for the demo request form. Field structure/layout is fixed; only
       the user-facing labels, placeholders, submit label and legal line vary. */
    form: {
      fullNameLabel: string;
      fullNamePlaceholder: string;
      workEmailLabel: string;
      workEmailPlaceholder: string;
      companyLabel: string;
      teamLabel: string;
      companySizeLabel: string;
      /* Shared placeholder for every <Select> control. */
      selectPlaceholder: string;
      exploringLabel: string;
      exploringPlaceholder: string;
      submit: string;
      /* Legal line rendered with two inline underlined links. */
      disclaimer: {
        before: string;
        terms: string;
        between: string;
        privacy: string;
        after: string;
      };
    };
  };
  /* Block 2 — "Keep exploring" resource list beside the fluted image. Optional:
     omit it (e.g. /gifting) to render only book-a-demo + the final CTA. */
  keepExploring?: {
    eyebrow: string;
    heading: string;
    links: { tag: string; title: string; desc: string }[];
    /* Fluted resource image. Plain /public string path. */
    imageSrc: string;
  };
  /* Block 3 — dark final CTA. */
  finalCta: {
    heading: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
    footnote: string;
  };
};

export const SWAG_CLOSING: SwagClosingContent = {
  bookDemo: {
    eyebrow: "BOOK A DEMO",
    headingLine1: "Let’s build your",
    headingLine2: "swag program.",
    detailBody:
      "One 30-minute call. We’ll map your swag program, recommend the right setup, and show how Stadium fits your team. Mockups included. No commitment.",
    features: [
      "Set up around your team–Marketing, HR, or Procurement.",
      "Every send in one place, to 170+ countries.",
      "Do it yourself or let us guide you. No lock-in.",
    ],
    formBgSrc: "/swag/swag-form-bg.jpg",
    form: {
      fullNameLabel: "Full name",
      fullNamePlaceholder: "John Doe",
      workEmailLabel: "Work email",
      workEmailPlaceholder: "john@doe.com",
      companyLabel: "Company",
      teamLabel: "Team",
      companySizeLabel: "Company size",
      selectPlaceholder: "Select",
      exploringLabel: "What are you exploring?",
      exploringPlaceholder: "What do you need — stores, kits, bulk, storage…",
      submit: "Book a demo",
      disclaimer: {
        before: "By booking, you agree to Stadium’s ",
        terms: "Terms",
        between: " and ",
        privacy: "Privacy Notice",
        after: ".",
      },
    },
  },
  keepExploring: {
    eyebrow: "KEEP EXPLORING",
    heading: "More on getting swag right.",
    links: [
      { tag: "GUIDE", title: "No-Minimums Swag Playbook", desc: "Run a swag program without storing inventory." },
      { tag: "TEMPLATE", title: "Onboarding Kit Checklist", desc: "What goes in a new-hire kit, by role." },
      { tag: "STORY", title: "Fintech Branded Stores", desc: "How multi-office stores, budgets, and approvals work." },
    ],
    imageSrc: "/swag/swag-workflow.jpg",
  },
  finalCta: {
    heading: "Make swag run itself",
    body: "Talk to our team and leave with a plan built around your brand, budget, and goals. Mockups included.",
    primaryCta: "Book a demo",
    secondaryCta: "Browse the catalog",
    footnote: "or ship it yourself — SwagMagic ↗",
  },
};

export default function SwagClosing({
  content = SWAG_CLOSING,
  brightCta = false,
}: {
  content?: SwagClosingContent;
  /** Closing CTA fill: false = deep accent + white text (default — /swag,
     /recognition, /snacks, /events); true = bright primary accent + on-accent
     text, matching a bright hero CTA (/gifting's amber). */
  brightCta?: boolean;
}) {
  const ctaBg = brightCta
    ? "bg-swag-green text-[var(--color-swag-on-accent,#ffffff)]"
    : "bg-swag-green-deep text-white";
  return (
    <>
      {/* Book a demo (optional) */}
      {content.bookDemo && (
      <section className="bg-white px-section-x-sm py-16 md:px-section-x-md md:py-20 lg:px-section-x-lg lg:py-24">
        <div className="mx-auto flex w-full max-w-content flex-col gap-10 rounded-[3.75rem] bg-[#f7f7f7] px-6 py-12 md:px-12 md:py-16 lg:flex-row lg:items-stretch lg:gap-8 lg:px-[5rem] lg:py-[6.25rem]">
          {/* left — copy + detail card, spread top-to-bottom */}
          <div className="flex flex-1 flex-col gap-10 lg:justify-between">
            <div className="flex flex-col gap-2">
              <p data-animation="reveal" className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-swag-green-deep">
                {content.bookDemo.eyebrow}
              </p>
              <h2 data-animation="reveal" className="font-display text-[2rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem] lg:text-[2.75rem]">
                {content.bookDemo.headingLine1}
                <br />
                {content.bookDemo.headingLine2}
              </h2>
            </div>

            {/* white detail card: grey desc block + white checklist block */}
            <div data-animation="reveal" className="flex flex-col rounded-3xl bg-white p-2.5 shadow-[0_0.1875rem_0.375rem_0_rgba(0,0,0,0.06)]">
              <div className="rounded-3xl bg-[#f7f7f7] p-6">
                <p className="font-sans text-[1.0625rem] leading-[1.5] text-swag-grey">
                  {content.bookDemo.detailBody}
                </p>
              </div>
              <ul className="flex flex-col gap-3 rounded-2xl bg-white px-6 pb-6 pt-[2.125rem]">
                {content.bookDemo.features.map((f) => (
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
            <img src={content.bookDemo.formBgSrc} alt="" aria-hidden className="pointer-events-none absolute inset-0 size-full object-cover" />
            <form data-animation="reveal" className="relative flex flex-1 flex-col gap-4 rounded-t-3xl bg-white p-8" action="#">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-[0.4375rem]">
                  <span className={LABEL}>{content.bookDemo.form.fullNameLabel}</span>
                  <input className={FIELD} placeholder={content.bookDemo.form.fullNamePlaceholder} />
                </label>
                <label className="flex flex-col gap-[0.4375rem]">
                  <span className={LABEL}>{content.bookDemo.form.workEmailLabel}</span>
                  <input className={FIELD} placeholder={content.bookDemo.form.workEmailPlaceholder} type="email" />
                </label>
              </div>
              <Select label={content.bookDemo.form.companyLabel} placeholder={content.bookDemo.form.selectPlaceholder} />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Select label={content.bookDemo.form.teamLabel} placeholder={content.bookDemo.form.selectPlaceholder} />
                <Select label={content.bookDemo.form.companySizeLabel} placeholder={content.bookDemo.form.selectPlaceholder} />
              </div>
              <label className="flex flex-col gap-[0.4375rem]">
                <span className={LABEL}>{content.bookDemo.form.exploringLabel}</span>
                <textarea className="min-h-[4.5rem] w-full rounded-[0.625rem] border border-[#e2e2de] bg-white px-3.5 pb-10 pt-3.5 font-sans text-[0.8125rem] text-swag-ink placeholder:text-[#9999a3] focus:border-swag-green-deep focus:outline-none" placeholder={content.bookDemo.form.exploringPlaceholder} />
              </label>
              <button type="button" className={`inline-flex h-[3.25rem] w-full items-center justify-center gap-1.5 rounded-full px-[1.375rem] font-sans text-[0.9375rem] font-semibold transition-all hover:brightness-95 active:scale-[0.99] ${ctaBg}`}>
                {content.bookDemo.form.submit}
                <ArrowRight />
              </button>
              <p className="font-sans text-[0.75rem] leading-[1.4] text-[#9999a3]">
                {content.bookDemo.form.disclaimer.before}<span className="underline">{content.bookDemo.form.disclaimer.terms}</span>{content.bookDemo.form.disclaimer.between}<span className="underline">{content.bookDemo.form.disclaimer.privacy}</span>{content.bookDemo.form.disclaimer.after}
              </p>
            </form>
          </div>
        </div>
      </section>
      )}

      {/* Keep exploring (white, rounded bottom) + final CTA. A soft green accent
          glows up from the CTA block under the resources panel and fades to
          near-black so it meets the dark footer. */}
      <div className="bg-[#181818]">
        {/* Keep exploring — white panel with a rounded bottom (optional) */}
        {content.keepExploring && (
        <section className="relative z-10 rounded-b-[3.75rem] bg-white px-section-x-sm pt-16 pb-16 md:px-section-x-md md:pt-20 md:pb-20 lg:px-section-x-lg lg:pt-24 lg:pb-24">
        <div className="mx-auto grid w-full max-w-content grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <p data-animation="reveal" className="font-sans text-eyebrow-sm font-bold uppercase tracking-[0.1rem] text-swag-green-deep">
                {content.keepExploring.eyebrow}
              </p>
              <h2 data-animation="reveal" className="font-display text-[1.75rem] leading-[1.08] tracking-[-0.03125rem] text-swag-ink md:text-[2.25rem]">
                {content.keepExploring.heading}
              </h2>
            </div>
            <div className="flex flex-col">
              {content.keepExploring.links.map((l) => (
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
            <img src={content.keepExploring.imageSrc} alt="" aria-hidden className="aspect-[3/2] w-full object-cover" />
          </div>
        </div>
      </section>
        )}

        {/* Final dark CTA — soft accent glows up (under the resources panel when
            present) and fades to near-black into the footer */}
        <section className={`relative bg-[linear-gradient(to_bottom,var(--color-swag-grad-1)_0%,var(--color-swag-grad-2)_16%,var(--color-swag-grad-3)_34%,var(--color-swag-grad-4)_54%,#181818_76%)] px-section-x-sm pb-16 md:px-section-x-md md:pb-20 lg:px-section-x-lg lg:pb-24 ${content.keepExploring ? "-mt-[3.75rem] pt-[6.5rem] md:pt-[7.5rem] lg:pt-[8.5rem]" : "pt-16 md:pt-20 lg:pt-24"}`}>
          <div className="mx-auto flex max-w-content flex-col items-center gap-6 rounded-[2.5rem] bg-swag-ink px-6 py-20 text-center md:py-24">
          <h2 data-animation="reveal" className="max-w-[36rem] font-display text-[2rem] leading-[1.06] tracking-[-0.03125rem] text-white md:text-[2.75rem]">
            {content.finalCta.heading}
          </h2>
          <p data-animation="reveal" className="max-w-[34rem] font-sans text-body-md text-[#c6c6c4] lg:text-[1.125rem]">
            {content.finalCta.body}
          </p>
          <div data-animation="reveal" className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
            <a href="#" className={`inline-flex h-12 items-center justify-center rounded-full px-7 font-sans text-button-primary transition-all hover:brightness-95 active:scale-[0.98] focus-visible:outline-white ${ctaBg}`}>
              <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">{content.finalCta.primaryCta}</span>
            </a>
            <a href="#" className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 px-7 font-sans text-button-primary text-white transition-all hover:bg-white/10 active:scale-[0.98] focus-visible:outline-white">
              <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">{content.finalCta.secondaryCta}</span>
            </a>
          </div>
          <p className="font-sans text-[0.8125rem] text-[#9a9da3]">
            {content.finalCta.footnote}
          </p>
          </div>
        </section>
      </div>
    </>
  );
}
