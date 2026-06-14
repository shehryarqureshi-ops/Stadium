/* "The Proof" mega-menu — Figma 249:20136 ("PROOF — Corrected"). Left: a dark
   "Why Stadium" feature card. Right: a 3-column link grid (Built for Enterprise
   / Social Proof / Trust & Security) over a trusted-by logo row. Shares the
   hover choreography (.engage-row / .engage-group / .engage-arrow) defined in
   SiteHeader's style block. Left-card photo is pending — dark gradient stands in. */

type Item = { title: string; desc: string };
type Column = { label: string; items: Item[] };

/* Exported for the mobile nav accordion */
export const PROOF_COLUMNS: Column[] = [
  {
    label: "Built for Enterprise",
    items: [
      { title: "Workspaces", desc: "Company-first architecture. Roles, permissions, governance." },
      { title: "Roles & Permissions", desc: "5 roles with a configurable permission matrix." },
      { title: "Wallet & Budgets", desc: "Workspace-level funds, allocations, custom team budgets." },
      { title: "HRIS Integration", desc: "Sync employees, trigger gifts, deactivate with resource transfer." },
      { title: "Single Sign-On", desc: "SSO with your IdP. Enterprise security from day one." },
    ],
  },
  {
    label: "Social Proof",
    items: [
      { title: "Case Studies", desc: "Real implementations with measurable business outcomes." },
      { title: "Reviews & Testimonials", desc: "What customers say and why they chose Stadium." },
    ],
  },
  {
    label: "Trust & Security",
    items: [
      { title: "Security & Compliance", desc: "SOC 2, GDPR, CCPA. Data, brand, and people protected." },
    ],
  },
];

/* Reuses the TrustBand marks. width:height gives each SVG its aspect ratio so the
   rem height actually constrains it (without it the SVGs render at full size). */
const LOGOS = [
  { src: "/trust-google.svg", alt: "Google", width: 80, height: 26 },
  { src: "/trust-amazon.svg", alt: "Amazon", width: 77, height: 23 },
  { src: "/trust-netflix.svg", alt: "Netflix", width: 75, height: 20 },
  { src: "/trust-bloomberg.svg", alt: "Bloomberg", width: 90, height: 16 },
  { src: "/trust-pinterest.svg", alt: "Pinterest", width: 87, height: 22 },
  { src: "/trust-spotify.svg", alt: "Spotify", width: 81, height: 24 },
  { src: "/trust-accenture.svg", alt: "Accenture", width: 91, height: 26 },
  { src: "/trust-salesforce.svg", alt: "Salesforce", width: 37, height: 26 },
];

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default function ProofMenu() {
  return (
    <div className="mx-auto w-full max-w-section">
      <div className="flex items-stretch gap-10 px-section-x-lg py-8">
        {/* Left — "Why Stadium" feature card (photo pending; dark gradient stand-in) */}
        <aside className="flex w-[27.5rem] shrink-0 flex-col justify-between gap-8 overflow-hidden rounded-card bg-gradient-to-br from-infra-base-1 to-infra-base-2 p-8">
          <div className="flex flex-col gap-3">
            <p className="font-sans text-[0.75rem] font-semibold uppercase leading-[0.9rem] tracking-[0.1rem] text-accent-water">
              Why Stadium
            </p>
            <h3 className="font-display text-heading-sm text-white">
              Global engagement infrastructure
            </h3>
            <p className="font-sans text-body-md text-white/75">
              Real customer outcomes. Enterprise security posture. Local
              fulfillment in 170+ countries &mdash; built to be the system of
              record for how modern teams engage.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex h-button-h w-fit items-center justify-center gap-2 rounded-button border border-white/30 px-button-x font-sans text-button-primary uppercase text-white transition-colors duration-200 hover:bg-white/10"
          >
            View why Stadium
            <ArrowRight className="size-4" />
          </a>
        </aside>

        {/* Right — link grid over a trusted-by row */}
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-8">
          <div className="grid grid-cols-3 gap-10">
            {PROOF_COLUMNS.map((col) => (
              <div key={col.label} className="flex flex-col gap-5">
                <p className="font-sans text-[0.75rem] font-semibold uppercase leading-[0.9rem] tracking-[0.045rem] text-accent-water">
                  {col.label}
                </p>
                <ul className="engage-group flex flex-col gap-5">
                  {col.items.map(({ title, desc }) => (
                    <li key={title}>
                      <a href="#" className="engage-row flex flex-col gap-1">
                        <span className="flex items-center gap-2 font-sans text-[0.875rem] font-semibold leading-5 text-ink">
                          {title}
                          <ArrowRight className="engage-arrow size-3.5 shrink-0 text-ink" />
                        </span>
                        <span className="font-sans text-[0.8125rem] leading-[1.125rem] text-grey-500">
                          {desc}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Trusted by */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-grey-100 pt-6">
            <p className="font-sans text-[0.75rem] font-semibold uppercase leading-[0.9rem] tracking-[0.045rem] text-grey-500">
              Trusted by
            </p>
            {LOGOS.map((logo) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                loading="lazy"
                style={{ height: `${(logo.height * 0.7) / 16}rem` }}
                className="w-auto max-w-none shrink-0 opacity-70"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
