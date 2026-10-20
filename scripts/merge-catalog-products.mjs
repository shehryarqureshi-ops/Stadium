/* One-off merge: folds the sourced photo manifests (swag/gifts/snacks/experiences "-new" lists and the
   swag/snacks "-existing" enrichments) into app/components/catalog/products.ts.
   Usage: node scripts/merge-catalog-products.mjs <manifestDir> */
import fs from "node:fs";
import path from "node:path";

const dir = process.argv[2];
const read = (f) => (fs.existsSync(path.join(dir, f)) ? JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) : []);
const P = "app/components/catalog/products.ts";
let src = fs.readFileSync(P, "utf8");

const DESC = {
  swag: {
    Apparel: "Premium-brand apparel your people actually wear — ready for your logo.",
    Bags: "Carry-everywhere bags in brand-name quality, ready to personalize.",
    Drinkware: "Built-to-last drinkware people carry every day — a quiet brand moment on every desk, trail and commute.",
    Technology: "Everyday tech that earns a permanent spot on the desk and in the bag.",
    "Office Supplies": "Desk and workday essentials that keep your brand in sight.",
    "Health & Wellness": "Gear for movement and recovery that supports your team's wellbeing, inside or outside work.",
    "Events & Tradeshows": "Show-floor standouts that stop the crowd and carry your brand home.",
    "Outdoor & Leisure": "Weekend-ready gear for the park, the beach and the backyard — a branded excuse to get outside.",
    "Auto, Home & Tools": "A thoughtful home gift that's as useful as it is giftable, ready to personalize.",
    "Swag Kits": "Curated kits, packaged and ready to ship to your team anywhere in the world.",
    Baby: "Soft, giftable essentials for the littlest members of the team.",
  },
  snacks: {
    Chocolates: "Indulgent small-batch chocolate, packed for sharing and gifting.",
    "Cookies & Confections": "Bakery-style cookies and sweets with a homemade bite — delivered fresh and crumb-free.",
    "Bars & Bites": "Better-for-you bars and bites that keep desk drawers well stocked.",
    "Chips, Puffs & Crunch": "Crunchy, craveable chips and puffs from makers you won't find in the average snack aisle.",
    Jerky: "Protein-packed jerky, meat and plant-based, with bold flavor.",
    "Nuts, Seeds & Granola": "Roasted, seasoned and sweetened nuts, seeds and granola for grazing.",
    "Wellness & Functional": "Functional sips and wellness shots with real ingredients and less sugar.",
    "Seltzer & Sparkling": "Uncommon, better-for-you sparkling drinks worth the fridge space.",
    "Cold Brew & Coffee": "Smooth cold brew and coffee to power the workday.",
    Tea: "Premium teas and tea drinks for a calmer afternoon.",
    "Energy & Shots": "Clean energy in a can or a shot — no jitters, no fuss.",
    Mixers: "Single-serve cocktail and mocktail mixers — low sugar, full flavor.",
    "Sauces & Seasonings": "Pantry staples and sauces from small makers — a flavor upgrade for every desk drawer and home kitchen.",
    "Dips & Salsas": "Craveable dips and salsas made for sharing.",
    "Spreads & Condiments": "Jams, honeys and spreads that make any breakfast better.",
    "Coffee, Tea & Cocoa": "Specialty coffee, tea and cocoa for the perfect hot cup.",
    "Broths & Soups": "Sippable broths and easy soups for a cozy desk lunch.",
    "Specialty Staples": "Specialty pantry finds that make any kitchen more interesting.",
  },
  gifts: {
    "Desk & Office": "Desk upgrades that make the workday feel a little nicer.",
    "Beauty & Care": "Feel-good self-care picks, thoughtfully packaged.",
    Home: "Home favorites that are as useful as they are giftable.",
  },
};
const FALLBACK = {
  swag: "Premium swag your people will actually use, ready for your logo.",
  gifts: "A thoughtful gift people will love, delivered anywhere.",
  snacks: "Standout snacks from makers you won't find in the average snack aisle.",
  experiences: "A live, hosted experience with everything shipped to every attendee — remote, hybrid or in person.",
};

const STR = '"((?:[^"\\\\]|\\\\.)*)"';
const lineRe = new RegExp(`^\\s*\\{ name: ${STR}, category: ${STR}, description: ${STR}, image: ${STR}[^}]*\\},?\\s*$`);
const un = (s) => JSON.parse(`"${s}"`);

function rewrite(exportName, sec, news, existing) {
  const a = src.indexOf(`export const ${exportName}`);
  const open = src.indexOf("[\n", a) + 2;
  const close = src.indexOf("\n];", open);
  const body = src.slice(open, close).split("\n");
  const objs = [];
  const tail = [];
  for (const ln of body) {
    const m = ln.match(lineRe);
    if (m) objs.push({ name: un(m[1]), category: un(m[2]), description: un(m[3]), image: un(m[4]) });
    else if (ln.trim()) tail.push(ln);
  }
  const byFile = new Map(existing.map((e) => [e.file, e]));
  const descByCat = new Map();
  const out = [];
  for (const o of objs) {
    const f = o.image.split("/").pop();
    const e = byFile.get(f);
    const category = e?.category ?? o.category;
    if (!descByCat.has(category)) descByCat.set(category, DESC[sec]?.[category] ?? o.description);
    const p = { name: o.name, category, description: DESC[sec]?.[category] ?? o.description, image: o.image };
    if (e?.brand) p.brand = e.brand;
    if (e?.deco?.length) p.decoMethods = e.deco;
    if (e?.dietary?.length) p.dietary = e.dietary;
    out.push(p);
  }
  const have = new Set(objs.map((o) => o.image));
  for (const n of news) {
    if (have.has(`/catalog-page/${sec}/${n.file}`)) continue;
    const category = n.category;
    const p = {
      name: n.name,
      category,
      description: DESC[sec]?.[category] ?? descByCat.get(category) ?? FALLBACK[sec],
      image: `/catalog-page/${sec}/${n.file}`,
    };
    if (n.brand && n.brand !== "Snackmagic") p.brand = n.brand;
    if (n.deco?.length) p.decoMethods = n.deco;
    if (n.dietary?.length) p.dietary = n.dietary;
    out.push(p);
  }
  const lines = out.map((p) => `  ${JSON.stringify(p).replace(/^\{/, "{ ").replace(/\}$/, " }").replace(/"(\w+)":/g, "$1: ").replace(/,(?=\w+: )/g, ", ")},`);
  src = src.slice(0, open) + lines.join("\n") + (tail.length ? "\n" + tail.join("\n") : "") + src.slice(close);
  return out.length;
}

const counts = {
  swag: rewrite("SWAG_PRODUCTS", "swag", read("swag-new.json"), read("swag-existing.json")),
  gifts: rewrite("GIFTS_PRODUCTS", "gifts", read("gifts-new.json"), []),
  snacks: rewrite("SNACKS_PRODUCTS", "snacks", read("snacks-new.json"), read("snacks-existing.json")),
  experiences: rewrite("EXPERIENCES_PRODUCTS", "experiences", read("experiences-new.json"), []),
};
fs.writeFileSync(P, src);
console.log(counts);
