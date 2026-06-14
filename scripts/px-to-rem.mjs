// One-shot px → rem conversion for the proportional-scaling refactor.
// Converts every `<number>px` to `<number/16>rem` in app/ source files,
// EXCEPT exactly `1px` and `0px` (hairline borders / zero offsets stay px).
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const files = [
  "app/globals.css",
  "app/page.tsx",
  "app/layout.tsx",
  ...readdirSync("app/components").map((f) => join("app/components", f)),
];

const toRem = (n) => {
  const rem = n / 16;
  // trim to at most 5 decimals, drop trailing zeros
  return `${parseFloat(rem.toFixed(5))}rem`;
};

let total = 0;
for (const file of files) {
  const before = readFileSync(file, "utf8");
  let count = 0;
  const after = before.replace(/(-?\d*\.?\d+)px/g, (m, num) => {
    const n = parseFloat(num);
    if (n === 0 || Math.abs(n) === 1) return m; // keep 0px / ±1px
    count++;
    return toRem(n);
  });
  if (count > 0) {
    writeFileSync(file, after);
    console.log(`${file}: ${count} values converted`);
    total += count;
  }
}
console.log(`total: ${total}`);
