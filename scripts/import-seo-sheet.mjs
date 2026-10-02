/* Imports SEO copy (meta title, description, keywords, JSON-LD) from the
   shared Google Sheet into app/lib/seo/seo-data.json.

   Usage:  node scripts/import-seo-sheet.mjs
   The sheet must be shared as "Anyone with the link can view".

   The sheet was written against the old WordPress URLs, so JSON-LD URLs are
   normalised to this app's real routes (URL_MAP below) and trailing slashes are
   stripped. Every change is printed so it can be reviewed. When a page moves
   (e.g. /events -> /hosted-experiences) update PAGES + URL_MAP and re-run. */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const SHEET_ID = "1MZEtuvPK6zCH7x7hSQlRZ4Z6CqeNHYmGREzuzLhAS38";
const SITE = "https://www.bystadium.com";
const OUT = "app/lib/seo/seo-data.json";

/* tab gid -> column index of "Meta Keywords" (Title, Description, Schema 1, Schema 2 follow) */
const TABS = [
  { gid: 0, name: "Batch 1: Homepage + Pillar Pages" },
  { gid: 573428151, name: "Batch 2: Impact by Team" },
];

/* sheet "Page" cell (trimmed) -> route in this app */
const PAGES = {
  "Stadium Homepage": "/",
  "Swag Pillar Page": "/swag",
  "Recognition Pillar Page": "/recognition",
  "Ways to Engage": "/ways-to-engage",
  "Events (Hosted experiences)": "/events",
  Gifting: "/gifting",
  Snacks: "/snacks",
  "Impact (starter/overview)": "/impact",
  HR: "/impact/hr",
  Marketing: "/impact/marketing",
  Finance: "/impact/finance",
  Sales: "/impact/sales",
  CX: "/impact/cx",
  Leadership: "/impact/leadership",
  Admins: "/impact/office-admins",
};

/* old/typo path in the sheet's JSON-LD -> real route */
const URL_MAP = {
  "/recognition-platform": "/recognition",
  "/snackmagic": "/snacks",
  "/teams/hr": "/impact/hr",
  "/impact/customer-experience": "/impact/cx",
  "/impact/]": "/impact",
};

/* minimal RFC 4180 CSV parser (quoted fields, embedded newlines and quotes) */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else field += c;
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

const changes = [];
function normaliseUrl(value, route) {
  if (typeof value !== "string" || !value.startsWith(SITE)) return value;
  const u = new URL(value);
  let path = URL_MAP[u.pathname.replace(/\/$/, "")] ?? u.pathname;
  if (path.length > 1) path = path.replace(/\/$/, "");
  const next = `${SITE}${path === "/" ? "/" : path}${u.hash}`;
  if (next !== value) changes.push(`${route}: ${value}  ->  ${next}`);
  return next;
}
/* Brand spelling: Snackmagic, Swagmagic (the sheet has SnackMagic / SwagMagic). */
function fixBrand(value, route) {
  if (typeof value !== "string") return value;
  const next = value.replace(/SnackMagic/g, "Snackmagic").replace(/SwagMagic/g, "Swagmagic");
  if (next !== value) changes.push(`${route}: brand spelling "${value.slice(0, 40)}" -> "${next.slice(0, 40)}"`);
  return next;
}
function walk(node, route) {
  if (Array.isArray(node)) return node.map((n) => walk(n, route));
  if (node && typeof node === "object")
    return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, walk(v, route)]));
  return fixBrand(normaliseUrl(node, route), route);
}

const data = {};
const problems = [];

for (const tab of TABS) {
  const res = await fetch(
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${tab.gid}`,
  );
  if (!res.ok) throw new Error(`Tab "${tab.name}": HTTP ${res.status} (is the sheet shared?)`);
  const rows = parseCsv(await res.text());
  const headerIdx = rows.findIndex((r) => r[0] === "Page");
  const header = rows[headerIdx].map((h) => h.replace(/\s+/g, " ").trim());
  const col = (name) => header.indexOf(name);
  const [kw, title, desc, s1, s2] = ["Meta Keywords", "Meta Title", "Meta Description", "Schema 1", "Schema 2"].map(col);
  if ([kw, title, desc, s1].some((i) => i < 0)) throw new Error(`Tab "${tab.name}": missing SEO columns`);

  for (const r of rows.slice(headerIdx + 1)) {
    const pageName = (r[0] ?? "").trim();
    if (!pageName) continue;
    const route = PAGES[pageName];
    if (!route) {
      problems.push(`No route mapped for sheet page "${pageName}" (skipped)`);
      continue;
    }
    // "Schema 1" is a full <script type="application/ld+json"> block. "Schema 2"
    // (only the homepage has one) is a loose property fragment ("subOrganization": [...]),
    // so it is merged into the Organization node of Schema 1's @graph.
    const strip = (t) => t.replace(/^\s*<script[^>]*>/i, "").replace(/<\/script>\s*$/i, "");
    let jsonLd = null;
    try {
      jsonLd = JSON.parse(strip(r[s1] ?? ""));
      const frag = s2 >= 0 ? (r[s2] ?? "").trim().replace(/,\s*$/, "") : "";
      if (frag) {
        const extra = JSON.parse(`{${frag}}`);
        const org = jsonLd["@graph"]?.find((n) => n["@type"] === "Organization");
        if (!org) throw new Error("Schema 2 present but no Organization node to merge it into");
        Object.assign(org, extra);
        changes.push(`${route}: merged Schema 2 (${Object.keys(extra).join(", ")}) into the Organization node`);
      }
      jsonLd = walk(jsonLd, route);
    } catch (e) {
      problems.push(`${route}: JSON-LD problem (${e.message})`);
      jsonLd = null;
    }
    data[route] = {
      sheetPage: pageName,
      title: fixBrand((r[title] ?? "").trim(), route),
      description: fixBrand((r[desc] ?? "").trim(), route),
      keywords: (r[kw] ?? "")
        .split(",")
        .map((k) => fixBrand(k.trim(), route))
        .filter(Boolean),
      jsonLd,
    };
  }
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(data, null, 2) + "\n", "utf8");

console.log(`Wrote ${Object.keys(data).length} pages to ${OUT}`);
console.log(`\nURL normalisations (${changes.length}):`);
changes.forEach((c) => console.log("  " + c));
if (problems.length) {
  console.log("\nProblems:");
  problems.forEach((p) => console.log("  " + p));
  process.exitCode = 1;
}
