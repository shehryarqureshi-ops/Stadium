import { readFileSync } from "node:fs";
const p = process.argv[2];
const j = JSON.parse(readFileSync(p, "utf8"));
const xml = j[0].text;
for (const l of xml.split("\n")) {
  if (/^( {2}| {4})<frame/.test(l)) {
    console.log(l.replace(/\s+x="[^"]*"/, "").slice(0, 150));
  }
}
