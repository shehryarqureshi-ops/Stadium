const LINK_COLUMNS: {
  heading: string;
  links: {
    label: string;
    href: string;
  }[];
}[] = [
    {
      heading: "Platform Features",
      links: [
        { label: "Integrations", href: "/integrations" },
        { label: "API", href: "/api" },
        { label: "Wallet", href: "/wallet" },
        { label: "Kudos Program", href: "/kudos" },
        { label: "Single Sign-On", href: "/single-sign-on" },
        { label: "Giftable Moments", href: "/giftable-moments" },
        { label: "Custom Domain", href: "/custom-domain" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { label: "Learning Center", href: "/learning-center" },
        { label: "Partnerships", href: "/partnerships" },
        { label: "RFP / RFI", href: "/rfp-rfi" },
        { label: "Help Center", href: "/help-center" },
        { label: "Videos", href: "/videos" },
        { label: "Accessibility", href: "/accessibility" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
    {
      heading: "About Us",
      links: [
        { label: "Company", href: "/company" },
        { label: "Careers", href: "/careers" },
        { label: "CSR", href: "/csr" },
        {
          label: "Reviews & Testimonials",
          href: "/reviews-and-testimonials",
        },
        { label: "Partner With Us", href: "https://by-stadium.typeform.com/Stadiumpartner" },
      ],
    },
    {
      heading: "Other",
      links: [
        { label: "Privacy", href: "/privacy-policy" },
        { label: "Terms", href: "/terms-of-use" },
        { label: "Safelist", href: "/safelist" },
        { label: "Points Terms", href: "/points-terms-of-use" },
        { label: "Security", href: "/security" },
        { label: "Cookie Preferences", href: "#cookie-preferences" },
        { label: "Need Help?", href: "#need-help" },
      ],
    },
  ];

export default function PageClose({
  showCta = true,
  cta,
}: {
  showCta?: boolean;
  /** Optional CTA copy override. Defaults preserve the standard closing. */
  cta?: {
    eyebrow?: string;
    heading?: string;
    body?: string;
    primaryCta?: string;
    secondaryCta?: string;
  };
}) {
  const c = {
    eyebrow: cta?.eyebrow ?? "Get started",
    heading: cta?.heading ?? "Ready to build your program?",
    body:
      cta?.body ??
      "Get a 30-minute walkthrough. We’ll show you live campaigns, sample boxes, and how teams use Stadium at scale.",
    primaryCta: cta?.primaryCta ?? "Book a demo",
    secondaryCta: cta?.secondaryCta ?? "Talk to sales",
  };

  return (
    <section className="bg-[#181818]">
      <footer className="relative overflow-hidden bg-[#181818] pt-12 md:pt-section-y-md lg:pt-20 px-6 md:px-0">
        <div className="mx-auto flex w-full max-w-content flex-col gap-8 lg:gap-12">
          <div className="flex w-full flex-col justify-between gap-8 lg:flex-row lg:gap-24">
            <div className="flex flex-col gap-6 lg:w-[24rem] lg:shrink-0 lg:justify-between">
              <div className="flex flex-col gap-4">
                <a
                  href="#"
                  className="inline-flex transition-opacity hover:opacity-80"
                >
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
                  <a
                    href="#"
                    aria-label="Swagmagic"
                    className="inline-flex transition-opacity hover:opacity-70"
                  >
                    <img
                      src="/footer-brand-swagmagic.svg"
                      alt="Swagmagic"
                      height={24}
                      className="h-[1rem] w-auto md:h-[1.125rem] lg:h-[1.3125rem]"
                    />
                  </a>

                  <a
                    href="#"
                    aria-label="Snackmagic"
                    className="inline-flex items-center gap-[0.1875rem] transition-opacity hover:opacity-70"
                  >
                    <img
                      src="/footer-brand-snackmagic.svg"
                      alt="Snackmagic"
                      height={24}
                      className="h-[1rem] w-auto md:h-[1.125rem] lg:h-[1.3125rem]"
                    />
                  </a>

                  <a
                    href="#"
                    aria-label="Confetti"
                    className="inline-flex items-center gap-[0.1875rem] transition-opacity hover:opacity-70"
                  >
                    <img
                      src="/footer-brand-confetti-mark.svg"
                      alt="Confetti"
                      width={112.692}
                      height={20.614}
                      className="h-[1rem] w-auto md:h-[1.09375rem] lg:h-[1.28125rem]"
                    />
                  </a>
                </div>
              </div>
            </div>

            <nav
              aria-label="Footer"
              className="flex flex-col gap-12 md:flex-row md:gap-6 lg:gap-10"
            >
              {LINK_COLUMNS.map((column) => (
                <div
                  key={column.heading}
                  className="flex flex-col gap-5 md:min-w-0 md:gap-10"
                >
                  <p className="font-sans text-[1rem] font-semibold text-white">
                    {column.heading}
                  </p>

                  <ul className="flex flex-col gap-4">
                    {column.links.map(({ label, href }) => (
                      <li key={href}>
                        <a
                          href={href}
                          className="whitespace-nowrap font-sans text-body-md text-grey-400 transition-colors hover:text-white"
                        >
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

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
          className="pointer-events-none -mb-6 mt-8 block select-none text-center font-display text-[19vw] font-bold leading-none text-white/[0.04] lg:-mb-30 lg:mt-4"
        >
          Stadium
        </span>
      </footer>
    </section>
  );
}