/* StaticPage — reusable template for long-form static content: privacy policy,
   terms of use, safelist, cookie notice, …  (Figma n9SjmDjzB1PeZAYJ5w43fr →
   "FINAL · Layout B": desktop + mobile frames.)

     SiteHeader → night hero → rounded white sheet → footer
     lg+   sticky "On this page" rail │ reading column (50rem)
     < lg  sticky section dropdown (with search) above the reading column

   USAGE — create `app/<route>/page.mdx`:

     import StaticPage from "@/app/components/page/StaticPage";

     export const metadata = { title: "Cookie Notice | Stadium", description: "…" };

     <StaticPage title="Cookie Notice" updated="June 17, 2025" summary="One-line hero summary.">

     Intro paragraphs…

     ## 1\. Section title \{#cookies}

     **In Short:** one-sentence summary (renders as a callout).

     Body copy, lists, tables, links…

     ### Sub-heading (anchor only, not in the TOC)

     </StaticPage>

   The TOC, anchor ids and reading time are derived from the content:
     • every `##` becomes a TOC entry (leading "1." is stripped from the label)
     • `\{#id}` after a heading pins its anchor; otherwise it is slugified
   Content styling lives in ./mdx.tsx (wired up by /mdx-components.tsx).
   `.tsx` pages can use <StaticPage> directly, passing JSX headings built from
   the exported H2/H3 components. */

import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

import PageClose from "../PageClose";
import SiteHeader from "../SiteHeader";
import { H2, H3, parseHeading, slugify, textOf } from "./mdx";
import StaticPageHero from "./StaticPageHero";
import { TocDropdown, TocRail, type TocItem } from "./StaticPageToc";

type Contact = { title: string; body: string; email: string };

export type StaticPageProps = {
  title: string;
  /** Small label above the title. */
  eyebrow?: string;
  /** One-line summary under the title. */
  summary?: string;
  /** Last-updated date, shown as a hero pill ("June 17, 2025"). */
  updated?: string;
  /** Override the computed reading time, or `false` to hide it. */
  readTime?: string | false;
  /** Contact card after the content; `false` hides it. */
  contact?: Contact | false;
  /** Label for the rail / dropdown. */
  tocLabel?: string;
  children: ReactNode;
};

const DEFAULT_CONTACT: Contact = {
  title: "Questions?",
  body: "Reach our team any time.",
  email: "hi@bystadium.com",
};

const WORDS_PER_MINUTE = 200;

export default function StaticPage({
  title,
  eyebrow = "Legal",
  summary,
  updated,
  readTime,
  contact = DEFAULT_CONTACT,
  tocLabel = "On this page",
  children,
}: StaticPageProps) {
  /* Pass 1 — give every h2/h3 a unique id and collect the h2s for the TOC. */
  const used = new Set<string>();
  const items: TocItem[] = [];
  const unique = (base: string) => {
    let id = base || "section";
    for (let n = 2; used.has(id); n += 1) id = `${base || "section"}-${n}`;
    used.add(id);
    return id;
  };

  const content = Children.toArray(children).map((node) => {
    if (!isValidElement(node)) return node;
    const el = node as ReactElement<{ children?: ReactNode; id?: string }>;
    if (el.type !== H2 && el.type !== H3) return node;
    const { title: headingTitle, explicitId } = parseHeading(el.props.children);
    const id = unique(explicitId ?? slugify(headingTitle));
    if (el.type === H2) items.push({ id, title: headingTitle });
    return cloneElement(el, { id });
  });

  const minutes = Math.max(1, Math.round(textOf(content).split(/\s+/).filter(Boolean).length / WORDS_PER_MINUTE));
  const meta = [
    updated ? `Updated ${updated}` : null,
    readTime === false ? null : (readTime ?? `${minutes} min read`),
  ].filter((item): item is string => Boolean(item));

  const hasToc = items.length > 1;

  const article = (
    <article className="flex min-w-0 flex-col gap-5 lg:gap-6">
      {content}
      {contact && (
        <aside className="mt-6 flex flex-col gap-5 rounded-3xl bg-impact-hero-night p-7 md:flex-row md:items-center md:justify-between md:p-8 lg:mt-10">
          <div className="flex flex-col gap-1.5">
            <p className="font-display text-heading-sm text-white">{contact.title}</p>
            <p className="font-sans text-body-md text-hero-body">{contact.body}</p>
          </div>
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex h-button-h items-center justify-center rounded-button bg-white px-button-x font-sans text-button-primary uppercase text-brand-hero shadow-button inset-shadow-button transition-all duration-200 hover:bg-grey-100 active:scale-[0.98] focus-visible:outline-white"
          >
            <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">{contact.email}</span>
          </a>
        </aside>
      )}
    </article>
  );

  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex flex-1 flex-col overflow-x-clip bg-white outline-none">
        <StaticPageHero eyebrow={eyebrow} title={title} summary={summary} meta={meta} />

        <div className="relative -mt-8 rounded-t-modal bg-white lg:-mt-16 lg:rounded-t-panel">
          {hasToc && <TocDropdown items={items} label={tocLabel} />}

          <div className="px-section-x-sm pb-24 pt-10 md:px-section-x-md lg:px-section-x-lg lg:pb-40 lg:pt-24">
            <div className="mx-auto w-full max-w-content">
              {hasToc ? (
                <div className="lg:grid lg:grid-cols-[var(--container-rail)_minmax(0,var(--container-article))] lg:gap-x-22">
                  <TocRail items={items} label={tocLabel} />
                  {article}
                </div>
              ) : (
                <div className="mx-auto max-w-article">{article}</div>
              )}
            </div>
          </div>
        </div>
      </main>
      <PageClose />
    </>
  );
}
