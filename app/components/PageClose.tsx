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
    <section className="bg-[#181818]">
      {/* ===== Final CTA — centered on the dark block ===== */}
      <div className="relative overflow-hidden px-section-x-sm py-20 text-center md:px-section-x-md md:py-24 lg:px-section-x-lg lg:py-[7.5rem]">
        {/* deep-blue bloom in the lower center (behind the dot dome) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 left-1/2 h-96 w-[85%] -translate-x-1/2 rounded-[50%] bg-[#0b52c0]/40 blur-[120px]"
        />
        {/* dot-field texture masked into a dome in the lower center
            (Figma "image 13611" — /pageclose-dots.png) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70 [mix-blend-mode:screen]"
          style={{
            backgroundImage: "url(/pageclose-dots.png)",
            backgroundSize: "60rem auto",
            backgroundPosition: "center bottom",
            backgroundRepeat: "no-repeat",
            maskImage: "radial-gradient(55% 78% at 50% 102%, #000 18%, transparent 82%)",
            WebkitMaskImage: "radial-gradient(55% 78% at 50% 102%, #000 18%, transparent 82%)",
          }}
        />
        <div className="relative mx-auto flex w-full max-w-content flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-3">
              <p className="font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem] text-[#9fa0a2]">
                Get started
              </p>
              <h2 className="font-display text-heading-sm text-white md:text-heading-md lg:text-[3.4375rem] lg:leading-[3.75rem] lg:tracking-[-0.075rem]">
                Ready to build your program?
              </h2>
            </div>
            <p className="max-w-[38rem] font-sans text-body-md text-[#e6e6e6] lg:text-[1.0625rem] lg:leading-7">
              Get a 15-minute walkthrough. We&rsquo;ll show you live campaigns, sample boxes, and how teams use Stadium at scale.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="#"
              className="inline-flex h-button-h items-center justify-center rounded-button bg-white px-button-x font-sans text-button-primary uppercase text-ink transition-all duration-200 hover:bg-grey-200 active:scale-[0.98] focus-visible:outline-white"
            >
              Book a demo
            </a>
            <a
              href="#"
              className="inline-flex h-button-h items-center justify-center rounded-button border border-white px-button-x font-sans text-button-primary uppercase text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-white"
            >
              Talk to sales
            </a>
          </div>
        </div>
      </div>

      {/* ===== Footer ===== */}
      <footer className="relative overflow-hidden bg-[#181818] px-section-x-sm pb-36 pt-12 md:px-section-x-md md:pt-section-y-md lg:px-section-x-lg lg:pb-56 lg:pt-20">
        {/* content caps + centers above 1440; bg stays full-bleed */}
        <div className="mx-auto flex w-full max-w-content flex-col gap-8 lg:gap-12">
        {/* lg:flex-wrap lets the link columns drop below the brand column on
            narrow desktop widths (1024–1300) instead of overflowing */}
        <div className="flex w-full flex-col gap-8 lg:flex-row lg:flex-wrap lg:items-stretch lg:gap-6">
          {/* Brand column: logo lockup + tagline + social, OUR BRANDS pinned to bottom on desktop */}
          <div className="flex flex-col gap-6 lg:w-[24rem] lg:shrink-0 lg:justify-between">
            <div className="flex flex-col gap-4">
              <a href="#" className="inline-flex transition-opacity hover:opacity-80">
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
                  className="flex size-[1.4375rem] items-center justify-center rounded-full bg-white transition hover:opacity-80 md:size-[1.53125rem] lg:size-[1.90625rem]"
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
                  className="block size-[1.4375rem] transition hover:opacity-80 md:size-[1.53125rem] lg:size-[1.90625rem]"
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
                  className="flex size-[1.4375rem] items-center justify-center rounded-full bg-white transition hover:opacity-80 md:size-[1.53125rem] lg:size-[1.90625rem]"
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
                <p className="whitespace-nowrap font-sans text-[1rem] font-semibold uppercase tracking-[0.07rem] text-grey-400">
                  Our Brands
                </p>
                <span
                  aria-hidden
                  className="hidden h-px w-64 bg-white/10 lg:block"
                />
              </div>
              <div className="flex items-center gap-8 lg:gap-[2.1875rem]">
                <a href="#" aria-label="Swagmagic" className="inline-flex transition-opacity hover:opacity-70">
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
                  className="inline-flex items-center gap-[0.1875rem] transition-opacity hover:opacity-70"
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
            className="flex flex-col gap-12 md:flex-row md:gap-6 lg:gap-6"
          >
            {LINK_COLUMNS.map((column) => (
              <div
                key={column.heading}
                className="flex flex-col gap-5 md:min-w-0 md:flex-1 md:gap-10 lg:w-[11.25rem] lg:flex-none"
              >
                <p className="font-sans text-[1rem] font-semibold text-white">
                  {column.heading}
                </p>
                <ul className="flex flex-col gap-4">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="font-sans text-body-md text-grey-400 transition-colors hover:text-white"
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
              className="flex items-center gap-1.5 rounded-[0.375rem] border border-white/20 px-3 py-1.5 transition-colors hover:border-white/40 hover:bg-white/5"
            >
              <span className="font-sans text-[0.75rem] leading-none text-white">
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
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-[-2.5vw] block select-none text-center font-display text-[19vw] font-bold leading-none text-white/[0.04]"
        >
          Stadium
        </span>
      </footer>
    </section>
  );
}
