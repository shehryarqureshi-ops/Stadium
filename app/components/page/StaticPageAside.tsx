/* Cards for StaticPage's `aside` slot — the sticky right column on pages without
   a TOC (lg+), or the closing block under the article everywhere else.
   Registered in /mdx-components.tsx, so MDX pages use them with no import:

     <StaticPage title="…" aside={<>
       <CtaCard title="Need help?" body="…" action={{ label: "Book a call", href: "/book-a-call" }} />
       <RelatedLinks links={[{ label: "Terms of Use", href: "/terms-of-use" }]} />
     </>}>

   Cards size themselves with a CSS container query: stacked in the narrow
   sticky column, side-by-side when they span the article width. */

import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export type AsideLink = { label: string; href: string };

/** Vertical stack for several cards (StaticPage wraps `aside` in one already). */
export function AsideStack({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

/* ---------- dark call-to-action card ---------- */

export function CtaCard({
  title,
  body,
  action,
}: {
  title: string;
  body?: string;
  action: AsideLink;
}) {
  return (
    <div className="@container">
      <div className="flex flex-col gap-5 rounded-3xl bg-impact-hero-night p-7 @lg:flex-row @lg:items-center @lg:justify-between @lg:p-8">
        <div className="flex flex-col gap-1.5">
          <p className="font-display text-heading-sm text-white">{title}</p>
          {body && <p className="font-sans text-body-md text-hero-body">{body}</p>}
        </div>
        <a
          href={action.href}
          className="inline-flex h-button-h items-center justify-center rounded-button bg-white px-button-x text-center font-sans text-button-primary uppercase text-brand-hero shadow-button inset-shadow-button transition-all duration-200 hover:bg-grey-100 active:scale-[0.98] focus-visible:outline-white"
        >
          <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">{action.label}</span>
        </a>
      </div>
    </div>
  );
}

/* ---------- light cards ---------- */

function LightCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-grey-100 p-6">
      <p className="font-sans text-eyebrow-sm uppercase text-grey-500">{title}</p>
      {children}
    </div>
  );
}

/** Links to sibling documents. */
export function RelatedLinks({
  title = "Related documents",
  links,
}: {
  title?: string;
  links: AsideLink[];
}) {
  return (
    <LightCard title={title}>
      <ul className="flex flex-col">
        {links.map((link) => (
          <li key={link.href} className="border-t border-grey-200 first:border-t-0">
            <a
              href={link.href}
              className="group flex items-center justify-between gap-3 py-3 font-sans text-body-md font-semibold text-grey-800"
            >
              {link.label}
              <ArrowRight
                aria-hidden
                className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </a>
          </li>
        ))}
      </ul>
    </LightCard>
  );
}

/** Label / value facts (version, effective date, applies to…). */
export function AtAGlance({
  title = "At a glance",
  items,
}: {
  title?: string;
  items: { label: string; value: string }[];
}) {
  return (
    <LightCard title={title}>
      <dl className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col gap-0.5">
            <dt className="font-sans text-body-sm text-grey-500">{item.label}</dt>
            <dd className="font-sans text-body-md font-semibold text-grey-800">{item.value}</dd>
          </div>
        ))}
      </dl>
    </LightCard>
  );
}
