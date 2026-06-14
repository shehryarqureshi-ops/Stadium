const LINK_COLUMNS: { heading: string; links: string[] }[] = [
  {
    heading: "Platform Features",
    links: [
      "Integrations",
      "API",
      "Wallet",
      "Kudos Program",
      "Single Sign-On",
      "Giftable Moments",
      "Custom Domain",
    ],
  },
  {
    heading: "Resources",
    links: [
      "Learning Center",
      "Partnerships",
      "RFP / RFI",
      "Help Center",
      "Videos",
      "Accessibility",
      "Contact Us",
    ],
  },
  {
    heading: "About Us",
    links: [
      "Company",
      "Careers",
      "CSR",
      "Reviews & Testimonials",
      "Partner With Us",
    ],
  },
  {
    heading: "Other",
    links: [
      "Privacy",
      "Terms",
      "Safelist",
      "Points Terms",
      "Security",
      "Cookie Preferences",
      "Need Help?",
    ],
  },
];

export default function PageClose() {
  return (
    <section>
      {/* ===== Final CTA ===== */}
      <div className="flex w-full flex-col items-center gap-6 bg-surface-subtle px-section-x-sm py-[3.5rem] md:px-section-x-md md:py-[4.5rem] lg:gap-8 lg:px-section-x-lg lg:py-section-y-md">
        <div className="flex w-full flex-col items-center gap-4 text-center">
          <h2 className="w-full font-display text-heading-sm text-ink md:text-heading-md lg:max-w-[45.125rem] lg:text-heading-lg">
            Ready to send something unforgettable?
          </h2>
          <p className="w-full font-sans text-body-md text-grey-600 md:text-body-lg lg:max-w-[42.5rem] lg:text-ink">
            <span className="lg:hidden">
              Get a 15-minute walkthrough — see live campaigns, sample kits,
              and how Stadium fits your stack.
            </span>
            <span className="hidden lg:inline">
              Get a 15-minute walkthrough — see live campaigns, sample boxes,
              and how teams ship at scale.
            </span>
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-4 md:w-auto md:flex-row">
          <a
            href="#"
            className="inline-flex h-button-h w-full items-center justify-center rounded-button bg-cta-fill px-button-x font-sans text-button-primary uppercase text-cta-on shadow-button inset-shadow-button-dark md:w-auto"
          >
            Book a demo
          </a>
          <a
            href="#"
            className="inline-flex h-button-h w-full items-center justify-center rounded-button border border-cta-fill px-button-x font-sans text-button-primary uppercase text-ink md:w-auto"
          >
            Talk to sales
          </a>
        </div>
      </div>

      {/* ===== Footer ===== */}
      <footer className="bg-grey-800 px-section-x-sm py-12 md:px-section-x-md md:py-section-y-md lg:px-section-x-lg lg:py-20">
        {/* content caps + centers above 1440; bg stays full-bleed */}
        <div className="mx-auto flex w-full max-w-content flex-col gap-8 lg:gap-12">
        {/* lg:flex-wrap lets the link columns drop below the brand column on
            narrow desktop widths (1024–1300) instead of overflowing */}
        <div className="flex w-full flex-col gap-8 lg:flex-row lg:flex-wrap lg:items-stretch lg:gap-[4.9375rem]">
          {/* Brand column: logo lockup + tagline + social, OUR BRANDS pinned to bottom on desktop */}
          <div className="flex flex-col gap-6 lg:w-[25.5625rem] lg:shrink-0 lg:justify-between">
            <div className="flex flex-col gap-4">
              <a href="#" className="inline-flex">
                <img
                  src="/footer-logo-lockup.svg"
                  alt="Stadium"
                  width={203.675}
                  height={36.278}
                  className="h-[1.25rem] w-auto md:h-[1.5rem] lg:h-[2.25rem]"
                />
              </a>
              <p className="font-sans text-[0.75rem] font-bold uppercase leading-5 tracking-[0.045rem] text-white md:text-[1rem] md:tracking-[0.06rem]">
                Limitless engagement. One platform.
              </p>
              <div className="flex items-center gap-2 lg:gap-2.5">
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="flex size-[1.4375rem] items-center justify-center rounded-full bg-white md:size-[1.53125rem] lg:size-[1.90625rem]"
                >
                  <img
                    src="/footer-social-linkedin.svg"
                    alt=""
                    width={12.763}
                    height={12.206}
                    className="w-[42%]"
                  />
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="block size-[1.4375rem] md:size-[1.53125rem] lg:size-[1.90625rem]"
                >
                  <img
                    src="/footer-social-youtube.svg"
                    alt=""
                    width={30.632}
                    height={30.632}
                    className="size-full"
                  />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex size-[1.4375rem] items-center justify-center rounded-full bg-white md:size-[1.53125rem] lg:size-[1.90625rem]"
                >
                  <img
                    src="/footer-social-instagram.svg"
                    alt=""
                    width={15.316}
                    height={15.316}
                    className="w-1/2"
                  />
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <p className="font-sans text-label uppercase tracking-[0.07rem] text-grey-400">
                  Our Brands
                </p>
                <span
                  aria-hidden
                  className="hidden h-px w-64 bg-white/10 lg:block"
                />
              </div>
              <div className="flex items-center gap-8 lg:gap-[2.1875rem]">
                <a href="#" aria-label="Swagmagic" className="inline-flex">
                  <img
                    src="/footer-brand-swagmagic.svg"
                    alt="Swagmagic"
                    width={134.931}
                    height={20.935}
                    className="h-[1rem] w-auto md:h-[1.125rem] lg:h-[1.3125rem]"
                  />
                </a>
                <a
                  href="#"
                  aria-label="Snackmagic"
                  className="inline-flex items-center gap-[0.1875rem]"
                >
                  <img
                    src="/footer-brand-snackmagic-mark.svg"
                    alt=""
                    width={18.324}
                    height={15.707}
                    className="h-[0.75rem] w-auto md:h-[0.8125rem] lg:h-[1rem]"
                  />
                  <img
                    src="/footer-brand-snackmagic-word.svg"
                    alt="Snackmagic"
                    width={112.692}
                    height={20.614}
                    className="h-[1rem] w-auto md:h-[1.09375rem] lg:h-[1.28125rem]"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Link columns: stacked on mobile, 4-up from tablet */}
          <nav
            aria-label="Footer"
            className="flex flex-col gap-12 md:flex-row md:gap-6 lg:gap-10"
          >
            {LINK_COLUMNS.map((column) => (
              <div
                key={column.heading}
                className="flex flex-col gap-5 md:min-w-0 md:flex-1 md:gap-10 lg:flex-none"
              >
                <p className="font-sans text-label uppercase tracking-[0.07rem] text-white">
                  {column.heading}
                </p>
                <ul className="flex flex-col gap-4">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="font-sans text-body-md text-grey-400"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Legal bar */}
        <div className="flex w-full flex-col gap-5">
          <div aria-hidden className="h-px w-full bg-white/10" />
          <div className="flex w-full flex-col items-center gap-3 md:flex-row md:justify-center md:gap-4">
            <p className="whitespace-pre text-center font-sans text-[0.75rem] uppercase leading-none tracking-[0.015rem] text-grey-400">
              {"© Powered by Stadium   |   Accessibility Support"}
            </p>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-[0.375rem] border border-white/20 px-3 py-1.5"
            >
              <span className="font-sans text-[0.8125rem] leading-none text-white">
                English
              </span>
              <img
                src="/footer-chevron-down.svg"
                alt=""
                width={11.5}
                height={6.5}
                className="h-[0.40625rem] w-[0.71875rem]"
              />
            </button>
          </div>
        </div>
        </div>
      </footer>
    </section>
  );
}
