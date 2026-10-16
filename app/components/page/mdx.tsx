/* MDX element styling for StaticPage content (privacy, terms, safelist, …).
   Wired up in the root mdx-components.tsx, so plain Markdown renders on the
   Stadium type scale with no per-page classes.

   Authoring conventions (see design.md → "Static content pages"):
     ## 1\. Section title \{#optional-id}   → a TOC entry + anchor
     ### Sub-heading                         → anchor only, not in the TOC
     **In Short:** summary sentence.         → rendered as a grey "In short" callout
   The trailing `\{#id}` marker pins a stable anchor (for links such as
   /privacy-policy#rights); without it the id is slugified from the title. */

import {
  Children,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

/* ---------- helpers shared with StaticPage ---------- */

const ID_MARKER = /\s*\{#([a-z0-9][a-z0-9-]*)\}\s*$/i;
const LEADING_NUMBER = /^\s*\d+\s*[.)]\s*/;

export function textOf(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Heading text → { title (no `{#id}` marker, no "1." prefix), explicit id }. */
export function parseHeading(children: ReactNode): { title: string; label: string; explicitId?: string } {
  const raw = textOf(children).replace(/‍/g, "");
  const match = raw.match(ID_MARKER);
  const label = raw.replace(ID_MARKER, "").trim();
  return { label, title: label.replace(LEADING_NUMBER, ""), explicitId: match?.[1] };
}

function withoutIdMarker(children: ReactNode): ReactNode {
  const parts = Children.toArray(children);
  const last = parts[parts.length - 1];
  if (typeof last === "string") parts[parts.length - 1] = last.replace(ID_MARKER, "");
  return parts;
}

/* ---------- headings ---------- */

/* scroll-mt clears the fixed header + (below lg) the sticky section dropdown. */
const ANCHOR_OFFSET = "scroll-mt-40 lg:scroll-mt-28";

export function H2({ children, ...rest }: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      {...rest}
      className={`${ANCHOR_OFFSET} mt-4 border-t border-grey-200 pt-8 font-display text-heading-sm text-grey-800 first:mt-0 first:border-t-0 first:pt-0 md:text-heading-md lg:mt-6 lg:pt-12`}
    >
      {withoutIdMarker(children)}
    </h2>
  );
}

export function H3({ children, ...rest }: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3 {...rest} className={`${ANCHOR_OFFSET} mt-2 font-display text-xl text-grey-800 md:text-2xl`}>
      {withoutIdMarker(children)}
    </h3>
  );
}

export function H4({ children, ...rest }: ComponentPropsWithoutRef<"h4">) {
  return (
    <h4 {...rest} className={`${ANCHOR_OFFSET} mt-1 font-display text-lg text-grey-800`}>
      {children}
    </h4>
  );
}

/* ---------- body ---------- */

const BODY = "font-sans text-body-md leading-[1.6] text-grey-700 lg:text-legal";

function Callout({ children }: { children: ReactNode }) {
  return (
    <div role="note" className="flex flex-col gap-1.5 rounded-2xl bg-grey-100 px-5 py-4 lg:px-6">
      <p className="font-sans text-eyebrow-sm uppercase text-grey-500">In short</p>
      <p className="font-sans text-body-md font-semibold leading-[1.55] text-grey-800 lg:text-[1.0625rem]">
        {children}
      </p>
    </div>
  );
}

export function P({ children, ...rest }: ComponentPropsWithoutRef<"p">) {
  const parts = Children.toArray(children);
  const first = parts[0];
  if (isValidElement(first) && /^in short:?$/i.test(textOf(first).trim())) {
    const tail = parts.slice(1);
    if (typeof tail[0] === "string") tail[0] = tail[0].replace(/^\s*:?\s*/, "");
    return <Callout>{tail}</Callout>;
  }
  return (
    <p {...rest} className={BODY}>
      {children}
    </p>
  );
}

export function UL({ ...rest }: ComponentPropsWithoutRef<"ul">) {
  return <ul {...rest} className="flex list-disc flex-col gap-3 pl-6 marker:text-grey-800" />;
}

export function OL({ ...rest }: ComponentPropsWithoutRef<"ol">) {
  return <ol {...rest} className="flex list-decimal flex-col gap-3 pl-6 marker:font-semibold marker:text-grey-800" />;
}

export function LI({ ...rest }: ComponentPropsWithoutRef<"li">) {
  return <li {...rest} className={`${BODY} pl-1 [&>ol]:mt-3 [&>ul]:mt-3`} />;
}

export function Strong({ ...rest }: ComponentPropsWithoutRef<"strong">) {
  return <strong {...rest} className="font-semibold text-grey-800" />;
}

export function A({ href = "", ...rest }: ComponentPropsWithoutRef<"a">) {
  const external = /^https?:\/\//i.test(href) && !/^https?:\/\/(www\.)?bystadium\.com/i.test(href);
  return (
    <a
      {...rest}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="break-words font-semibold text-accent-water underline underline-offset-4 transition-colors hover:text-grey-800"
    />
  );
}

export function Blockquote({ ...rest }: ComponentPropsWithoutRef<"blockquote">) {
  return <blockquote {...rest} className="border-l-2 border-grey-800 pl-5 [&>p]:text-grey-600" />;
}

export function HR() {
  return <hr className="my-2 border-grey-200" />;
}

export function Table({ ...rest }: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-grey-200">
      <table {...rest} className="w-full min-w-[32rem] border-collapse text-left font-sans text-body-sm text-grey-700" />
    </div>
  );
}

export function TH({ ...rest }: ComponentPropsWithoutRef<"th">) {
  return <th {...rest} className="bg-grey-100 px-4 py-3 font-semibold text-grey-800" />;
}

export function TD({ ...rest }: ComponentPropsWithoutRef<"td">) {
  return <td {...rest} className="border-t border-grey-200 px-4 py-3 align-top" />;
}

export function Code({ ...rest }: ComponentPropsWithoutRef<"code">) {
  return <code {...rest} className="rounded bg-grey-100 px-1.5 py-0.5 font-mono text-[0.9em] text-grey-800" />;
}

/* <ColumnTable columns={[{ title: "Domains", items: ["@a.com", …] }, …]} />
   Header row + one list per column — for allow-lists and other side-by-side
   reference data (e.g. /safelist). Available in every StaticPage MDX file
   without an import (registered in /mdx-components.tsx). Scrolls sideways
   below sm instead of squashing the entries. */
export function ColumnTable({ columns }: { columns: { title: string; items: string[] }[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-grey-200">
      <table className="w-full min-w-[34rem] border-collapse text-left font-sans text-body-sm text-grey-700">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.title}
                scope="col"
                className="border-l border-grey-200 bg-grey-100 px-5 py-4 font-display text-lg text-grey-800 first:border-l-0"
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {columns.map((column) => (
              <td key={column.title} className="border-l border-t border-grey-200 px-5 py-4 align-top first:border-l-0">
                <ul className="flex flex-col gap-1.5">
                  {column.items.map((item) => (
                    <li key={item} className="break-all">
                      {item}
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
