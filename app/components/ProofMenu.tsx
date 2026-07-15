/* "The Proof" mega-menu — synced to Figma 1350:36111 (2026-06-20). Editorial
   layout: a 3-column title+description grid (Built for Enterprise / Social
   Proof / Trust & Security) beside a "Why Stadium" image card. Shares the hover
   choreography (.engage-row / .engage-group / .engage-arrow) from SiteHeader. */

import { MenuShell, MenuRow, MenuContent, MenuFeaturePanel } from "@/app/components/MegaMenu";
import whyImg from "@/public/map-faces.jpg";

type Item = { title: string; desc: string };
type Column = { label: string; items: Item[] };

/* Exported for the mobile nav accordion. Content synced to Figma 2:75894
   (Enterprise-Ready / Social Proof / Resources). Note: the Figma's middle
   column header reads "SNACKS" — a copy-paste typo; its items are proof-side,
   so we use "Social Proof". */
export const PROOF_COLUMNS: Column[] = [
  {
    label: "Enterprise-Ready",
    items: [
      { title: "Workspaces", desc: "Company-wide collaboration, control, and visibility." },
      { title: "Roles & Permissions", desc: "Configurable roles and permissions." },
      { title: "Wallet & Budgets", desc: "Workspace-level funds, allocations, custom team budgets." },
      { title: "Integrations", desc: "100+ integrations across your tech stack." },
      { title: "Single Sign-On", desc: "SSO with your identity provider." },
      { title: "Security & Compliance", desc: "SOC 2, GDPR, CCPA, and enterprise security." },
    ],
  },
  {
    label: "Social Proof",
    items: [
      { title: "Case Studies", desc: "Real customer stories with measurable results." },
      { title: "Reviews & Testimonials", desc: "What customers say about Stadium." },
      { title: "Corporate Social Responsibility", desc: "Sustainability, ethical sourcing, and giving back." },
    ],
  },
  {
    label: "Resources",
    items: [
      { title: "Learning Center", desc: "Articles, videos, webinars, and best practices." },
      { title: "Guides & Templates", desc: "RFP templates, ROI calculators, and planning tools." },
      { title: "Help Center", desc: "Documentation, FAQs, and product support." },
    ],
  },
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
    <MenuShell>
      <MenuRow>
        {/* Editorial link grid — 3 even 248px columns @ 24px gutter, matching the
            Figma grid exactly (1350:36111 cols 36115/36133/36142, w 248 each). */}
        <MenuContent>
          <div className="grid grid-cols-3 gap-[2.8125rem]">
            {PROOF_COLUMNS.map((col) => (
              <div key={col.label} className="group/col flex flex-col gap-4">
                <p className="font-sans text-[0.75rem] font-bold uppercase leading-4 tracking-[0.0625rem] text-[rgba(27,27,27,0.6)] transition-colors duration-200 group-hover/col:text-[#181818]">
                  {col.label}
                </p>
                {/* divider rule — grey at rest; Stadium gradient wipes in on column hover */}
                <span aria-hidden className="relative block h-px w-full bg-[#d9d9d9]">
                  <span className="absolute inset-0 origin-left scale-x-0 bg-[linear-gradient(270deg,#8d12e7,#0b7afc,#ffb800,#ff5b77,#00c036)] transition-transform duration-500 ease-out group-hover/col:scale-x-100" />
                </span>
                <ul className="engage-group flex flex-col gap-6">
                  {col.items.map(({ title, desc }) => (
                    <li key={title}>
                      <a href="#" className="engage-row flex flex-col gap-2">
                        <span className="flex items-center gap-1 font-sans text-[0.875rem] font-normal leading-5 text-black">
                          {title}
                          <ArrowRight className="engage-arrow size-3 shrink-0 text-black" />
                        </span>
                        <span className="font-sans text-[0.75rem] leading-[1.125rem] text-grey-500">
                          {desc}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </MenuContent>

        {/* Light editorial feature panel (Figma 2:75960) */}
        <MenuFeaturePanel
          eyebrow="Global Engagement Infrastructure"
          image={whyImg}
          aspect="384 / 456"
          title="Why teams choose Stadium"
          cta="Learn more"
        />
      </MenuRow>
    </MenuShell>
  );
}
