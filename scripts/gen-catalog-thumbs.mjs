/* Pre-sized WebP thumbnails for the /catalog marquees, served as plain static files (no
   on-demand image optimizer, so hundreds of tiles never queue behind each other):
     -s  160 px wide  (hero wall tiles, ~80 px on screen @2x)
     -m  400 px wide  (section mosaic tiles, ~176 px on screen @2x)
     -l  1200 px wide (product modal photo, 600 px on screen @2x)
   Output: public/catalog-page/thumbs/<section>/<name>-{s,m}.webp
   Run: node scripts/gen-catalog-thumbs.mjs  (skips thumbs that are newer than their source) */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = "public/catalog-page";
const SIZES = { s: [160, 72], m: [400, 78], l: [1200, 80] };
let made = 0;
for (const sec of ["swag", "gifts", "snacks", "experiences", "deco"]) {
  const dir = path.join(root, sec);
  if (!fs.existsSync(dir)) continue;
  const out = path.join(root, "thumbs", sec);
  fs.mkdirSync(out, { recursive: true });
  for (const f of fs.readdirSync(dir).filter((n) => /\.(jpe?g|png)$/i.test(n))) {
    const base = f.replace(/\.[^.]+$/, "");
    for (const [k, [w, q]] of Object.entries(SIZES)) {
      const dest = path.join(out, `${base}-${k}.webp`);
      if (fs.existsSync(dest) && fs.statSync(dest).mtimeMs > fs.statSync(path.join(dir, f)).mtimeMs) continue;
      await sharp(path.join(dir, f)).resize({ width: w, withoutEnlargement: true }).webp({ quality: q }).toFile(dest);
      made++;
    }
  }
}
console.log("thumbs written:", made);
