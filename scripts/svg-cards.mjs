// Turn a Figma SVG export (download_assets, format svg) into a crisp, lightweight
// card graphic for the site.
//
//   node scripts/svg-cards.mjs <export.svg> <group/Name> "<alt text>"
//
// - Embedded base64 rasters are pulled out into public/cards/img-<hash>.webp
//   (deduped by content, capped at MAX_IMG px) and re-linked by URL.
// - A pure-vector export is written to public/cards/<group>/<Name>.svg and
//   rendered with a plain <img> (no raster inside, so the sandbox is no issue).
// - An export with rasters is written to the same public/cards/<group>/<Name>.svg
//   (photos linked by URL) plus a tiny wrapper component
//   app/components/cards/<group>/<Name>.tsx that shows it through <object>
//   (CardObject) — the only embedding that lets an SVG load its photo files.
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MAX_IMG = 2048;

const [, , input, target, alt = "", vbArg = ""] = process.argv;
// optional 5th arg "x y w h": crop the export to that viewBox (e.g. drop shadow bleed)
const readInput = () => {
  const raw = readFileSync(input, "utf8");
  if (!vbArg) return raw;
  const [, , w, h] = vbArg.split(" ");
  return raw.replace(/<svg\b[^>]*>/, (m) =>
    m.replace(/\swidth="[^"]*"/, ` width="${w}"`).replace(/\sheight="[^"]*"/, ` height="${h}"`).replace(/viewBox="[^"]*"/, `viewBox="${vbArg}"`),
  );
};
if (!input || !target) {
  console.error('usage: svg-cards.mjs <export.svg> <group/Name> "<alt>"');
  process.exit(1);
}
const [group, name] = target.split("/");
const prefix = `${group}-${name}`.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

let svg = readInput().replace(/<\?xml[^>]*\?>\s*/, "");

// 1. extract rasters
mkdirSync(join(ROOT, "public/cards"), { recursive: true });
let imgCount = 0;
const imgRe = /(<image\b[^>]*?)(?:xlink:)?href="data:image\/\w+;base64,([^"]+)"([^>]*\/?>)/g;
const jobs = [];
svg = svg.replace(imgRe, (_, pre, b64, post) => {
  const buf = Buffer.from(b64, "base64");
  const hash = createHash("sha1").update(buf).digest("hex").slice(0, 8);
  const file = `img-${hash}.webp`;
  jobs.push(
    (async () => {
      const out = join(ROOT, "public/cards", file);
      if (existsSync(out)) return;
      const img = sharp(buf);
      const { width } = await img.metadata();
      await (width > MAX_IMG ? img.resize({ width: MAX_IMG }) : img)
        .webp({ quality: 90, alphaQuality: 100 })
        .toFile(out);
    })(),
  );
  imgCount++;
  return `${pre}href="/cards/${file}"${post}`;
});
await Promise.all(jobs);

// 2. namespace ids so several inline SVGs on one page never collide
svg = svg
  .replace(/\bid="([^"]+)"/g, `id="${prefix}-$1"`)
  .replace(/url\(#([^)]+)\)/g, `url(#${prefix}-$1)`)
  .replace(/href="#([^"]+)"/g, `href="#${prefix}-$1"`)
  .replace(/\sdata-name="[^"]*"/g, "");

// Crop the exported viewBox to the intended card frame (export bounds can include
// surrounding page context). target -> [x, y, w, h] in SVG units.
const VIEWBOX_CROP = {
  // integrations: old PNGs were exported without the shadow bleed the SVG includes
  "integrations-hris/HrAdmin": [18, 0, 1240, 767],
  "integrations-hris/AutomatedPrograms": [18, 0, 580, 450],
  "integrations-hris/DataSync": [18, 0, 580, 450],
  "integrations-security/Encryption": [14, 0, 1212, 805],
  "integrations-zapier/ZapZendesk": [8.5, 0, 389, 250],
  "integrations-zapier/ZapTypeform": [8.5, 0, 389, 250],
  "integrations-zapier/ZapAirtable": [8.5, 0, 389, 250],
  "integrations-zapier/ZapCalendly": [8.5, 0, 389, 250],
  "integrations-zapier/ZapPatreon": [8.5, 0, 389, 250],
  "integrations-zapier/ZapCvent": [8.5, 0, 389, 250],
  "impact-leadership/ScaleIntegrations": [8, 0, 389.33, 250],
  // events step cards: export includes 24/16px shadow bleed around the 279x360 frame
  "events/EventPick": [24, 16, 279, 360],
  "events/EventBook": [24, 16, 279, 360],
  "events/EventShowUp": [24, 16, 279, 360],
  // swag platform graphics: sibling 376x260 frames whose shadows/overflow widen the export
  "swag/PlatformStores": [0, 0, 376, 260],
  "swag/PlatformInventory": [8, 0, 376, 260],
  "swag/PlatformFulfillment": [8, 8, 376, 260],
  "swag/PlatformGifting": [0, 8, 376, 260],
  "swag/PlatformIntegrations": [0, 8, 376, 260],
  "swag/PlatformBudgets": [8, 8, 376, 260],
};

if (imgCount === 0) {
  const dir = join(ROOT, "public/cards", group);
  mkdirSync(dir, { recursive: true });
  // plain file: drop the id namespace (single document) and the xlink noise
  const plain = readInput()
    .replace(/<\?xml[^>]*\?>\s*/, "")
    .replace(/\sdata-name="[^"]*"/g, "");
  let out = plain;
  const crop = VIEWBOX_CROP[target];
  if (crop)
    out = out.replace(/(<svg\b[^>]*?)\swidth="[^"]*"\sheight="[^"]*"\sviewBox="[^"]*"/, `$1 width="${crop[2]}" height="${crop[3]}" viewBox="${crop.join(" ")}"`);
  writeFileSync(join(dir, `${name}.svg`), out);
  console.log(`file   public/cards/${group}/${name}.svg  (${plain.length} B)`);
  process.exit(0);
}

// Figma SVG export drops BACKGROUND_BLUR (frosted glass). Per-graphic patches
// re-create it: a blurred <use> copy of what sits behind, clipped to the glass.
const PATCHES = {
  // Figma GLASS effect (refraction + rim light) is not exported: the dashed connector
  // showed through the three glass circles. Cut it out under them and add the rim light.
  "recognition/PlatformBudgets": (x) => {
    const p = prefix;
    const circles = [[66, 173], [188.5, 173], [311, 173]];
    // the exported dashes are a jagged outlined path; redraw the 2px dotted line cleanly
    x = x.replace(
      new RegExp(`<path [^>]*id="${p}-connector"[^>]*/>`),
      `<line x1="48" y1="174" x2="329" y2="174" stroke="#777777" stroke-width="2" stroke-dasharray="2 4" mask="url(#${p}-noglass)"/>`,
    );
    x = x.replace(/(<path d="M[^"]*" fill="#A8A8A8" fill-opacity="0\.2")/g, `$1 stroke="url(#${p}-rim)" stroke-width="1"`);
    x = x.replace(/(<rect x="33\.5" y="29" width="309" height="93" rx="8" fill="black" fill-opacity="0\.3")/, `$1 stroke="url(#${p}-rim)" stroke-opacity="0.5" stroke-width="1"`);
    const holes = circles.map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="31.5" fill="black"/>`).join("");
    return x.replace(
      "<defs>",
      `<defs><mask id="${p}-noglass" maskUnits="userSpaceOnUse" x="0" y="0" width="376" height="260"><rect width="376" height="260" fill="white"/>${holes}</mask><linearGradient id="${p}-rim" x1="0" y1="0" x2="1" y2="1"><stop stop-color="white" stop-opacity="0.55"/><stop offset="0.5" stop-color="white" stop-opacity="0.06"/><stop offset="1" stop-color="white" stop-opacity="0.3"/></linearGradient>`,
    );
  },
  "recognition/PlatformIntegrations": (x) => {
    const p = prefix;
    const m = x.match(/<g mask="url\(#[^)]+\)">/);
    if (!m) throw new Error("PlatformIntegrations: logos group not found");
    // wrap the original so it is hidden under the glass (the blurred copy replaces it there)
    const start = x.indexOf(m[0]);
    let depth = 0, end = start;
    for (const t of x.slice(start).matchAll(/<(\/?)g\b[^>]*?(\/?)>/g)) {
      if (t[1]) depth--; else if (!t[2]) depth++;
      if (depth === 0) { end = start + t.index + t[0].length; break; }
    }
    const orig = x.slice(start, end).replace(m[0], `<g id="${p}-behind" mask="${m[0].match(/mask="([^"]+)"/)[1]}">`);
    x = x.slice(0, start) + `<g mask="url(#${p}-notglass)">` + orig + "</g>" + x.slice(end);
    const blurred = `<g clip-path="url(#${p}-glassclip)"><use href="#${p}-behind" filter="url(#${p}-glassblur)"/></g>`;
    x = x.replace(/(<g id="[^"]*" filter="url\(#[^)]+\)">)\s*(<rect x="128" y="70" width="120" height="120")/, `${blurred}$1$2`);
    return x.replace(
      "<defs>",
      `<defs><mask id="${p}-notglass" maskUnits="userSpaceOnUse" x="0" y="0" width="376" height="260"><rect width="376" height="260" fill="white"/><rect x="128" y="70" width="120" height="120" rx="30" fill="black"/></mask><clipPath id="${p}-glassclip"><rect x="128" y="70" width="120" height="120" rx="30"/></clipPath><filter id="${p}-glassblur" x="100" y="40" width="176" height="180" filterUnits="userSpaceOnUse"><feGaussianBlur stdDeviation="7"/></filter>`,
    );
  },
};
if (PATCHES[target]) svg = PATCHES[target](svg);

// root <svg>: intrinsic size from the (cropped) viewBox, plain SVG2 href
const vb = VIEWBOX_CROP[target]?.join(" ") ?? svg.match(/viewBox="([^"]+)"/)[1];
const [, , vw, vh] = vb.split(" ");
svg = svg
  .replace(/\sxmlns:xlink="[^"]*"/g, "")
  .replace(/\sxlink:href=/g, " href=")
  .replace(/<svg\b[^>]*>/, `<svg width="${vw}" height="${vh}" viewBox="${vb}" fill="none" xmlns="http://www.w3.org/2000/svg">`);

const svgDir = join(ROOT, "public/cards", group);
mkdirSync(svgDir, { recursive: true });
writeFileSync(join(svgDir, `${name}.svg`), svg);

const comp = `// Generated by scripts/svg-cards.mjs from the Figma export — do not hand-edit.
// The graphic is public/cards/${group}/${name}.svg; its photos are separate files in /public/cards.
import CardObject from "@/app/components/cards/CardObject";

export default function ${name}({ alt = ${JSON.stringify(alt)} }: { alt?: string }) {
  return <CardObject src="/cards/${group}/${name}.svg" alt={alt} width={${vw}} height={${vh}} />;
}
`;
const dir = join(ROOT, "app/components/cards", group);
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, `${name}.tsx`), comp);
console.log(`object public/cards/${group}/${name}.svg (${svg.length} B, ${imgCount} raster(s)) + ${name}.tsx`);
