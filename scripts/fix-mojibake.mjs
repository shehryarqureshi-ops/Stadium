// Repair UTF-8-as-ANSI mojibake introduced by PowerShell Get/Set-Content
// round-trips (e.g. "â€”" is the em dash's UTF-8 bytes read as cp1252).
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const MAP = [
  ["â€”", "—"], // â€” -> em dash
  ["â€“", "–"], // â€“ -> en dash
  ["â†’", "→"], // â†’ -> right arrow
  ["Ã—", "×"], // Ã— -> multiplication sign
  ["Â·", "·"], // Â· -> middle dot
  ["â€™", "’"], // â€™ -> right single quote
  ["â€œ", "“"], // â€œ -> left double quote
  ["âˆ’", "−"], // âˆ’ -> minus sign
];

const files = readdirSync("app/components").map((f) => join("app/components", f));
let total = 0;
for (const f of files) {
  const before = readFileSync(f, "utf8");
  let c = before;
  for (const [bad, good] of MAP) c = c.split(bad).join(good);
  if (c !== before) {
    writeFileSync(f, c);
    const n = before.length - c.length;
    console.log(`${f}: ~${n} chars repaired`);
    total += n;
  }
}
console.log(`done (${total})`);

// report anything still suspicious
for (const f of files) {
  const c = readFileSync(f, "utf8");
  const m = c.match(/[ÂÃâ][-¿€‘’“”†ˆ‰Š‹ŒŽ™š›œžŸ˜—–]/g);
  if (m) console.log(`STILL SUSPICIOUS ${f}: ${JSON.stringify([...new Set(m)])}`);
}
