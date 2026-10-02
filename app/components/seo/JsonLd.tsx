import { seoJsonLd } from "@/app/lib/seo/metadata";

/* Renders a page's JSON-LD (from the SEO sheet, see app/lib/seo/metadata.ts)
   as a <script type="application/ld+json"> tag, as recommended in the Next.js
   JSON-LD guide. "<" is escaped so no string in the data can close the tag. */
export default function JsonLd({ path }: { path: string }) {
  const jsonLd = seoJsonLd(path);
  if (!jsonLd) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
