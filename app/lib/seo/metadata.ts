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
   staging copy never competes with the live page. Share tags (og:url / og:image /
   twitter:image) resolve against SHARE_ORIGIN instead — see ./origin.ts. */

export { SHARE_ORIGIN, SITE_URL } from "./origin";
import { SITE_URL } from "./origin";

/* Default share image (Figma "og image", 1200×630) — used by every page's Open Graph and Twitter card.
   Resolved against metadataBase (SHARE_ORIGIN), so it becomes an absolute URL on the host that was shared. */
export const OG_IMAGE = {
  url: "/og/stadium-og.jpg",
  width: 1200,
  height: 630,
  alt: "Stadium — Celebrate people, wherever they are. Global engagement infrastructure.",
  type: "image/jpeg",
};

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
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: {
      type: "website",
      siteName: "Stadium",
      locale: "en_US",
      url: path,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      site: "@bystadium",
      title,
      description,
      images: [{ url: OG_IMAGE.url, alt: OG_IMAGE.alt }],
    },
  };
}

export function seoJsonLd(path: string): Record<string, unknown> | null {
  return entry(path).jsonLd;
}
