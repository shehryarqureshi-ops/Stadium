import type { Metadata } from "next";

import seoData from "./seo-data.json";

/* Per-page SEO copy (meta title, description, keywords, JSON-LD) from the
   marketing sheet, imported by `node scripts/import-seo-sheet.mjs` into
   ./seo-data.json (keyed by route). Do not edit the JSON by hand — re-run the
   importer so the sheet stays the source of truth.

   Usage in a page:
     export const metadata = seoMetadata("/swag");
     …
     <JsonLd path="/swag" />            (app/components/seo/JsonLd.tsx)

   Canonicals are always the production URL (SITE_URL), also on staging, so a
   staging copy never competes with the live page. */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bystadium.com"
).replace(/\/$/, "");

type SeoEntry = {
  title: string;
  description: string;
  keywords: string[];
  jsonLd: Record<string, unknown> | null;
};

const entries = seoData as unknown as Record<string, SeoEntry>;

function entry(path: string): SeoEntry {
  const found = entries[path];
  if (!found) {
    throw new Error(
      `No SEO entry for "${path}". Add the page to scripts/import-seo-sheet.mjs and re-run it.`,
    );
  }
  return found;
}

export function seoMetadata(path: string): Metadata {
  const { title, description, keywords } = entry(path);
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Stadium",
      locale: "en_US",
      url: path,
      title,
      description,
    },
    twitter: { card: "summary", site: "@bystadium", title, description },
  };
}

export function seoJsonLd(path: string): Record<string, unknown> | null {
  return entry(path).jsonLd;
}
