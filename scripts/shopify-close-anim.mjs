// Measure Shopify's menu CLOSE animation: open Products, then hover Pricing
// (a non-dropdown tab) and sample the panel's motion.
import { chromium } from "playwright-core";

const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto("https://www.shopify.com/pk", { waitUntil: "domcontentloaded", timeout: 45000 });
await page.waitForTimeout(2500);

const find = (label) =>
  page.evaluate((lbl) => {
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) {
      if (n.textContent.trim() === lbl) {
        const r = n.parentElement.getBoundingClientRect();
        if (r.y < 80 && r.width > 0) return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
      }
    }
    return null;
  }, label);

const products = await find("Products");
const pricing = await find("Pricing");

// instrument the menu wrapper chain
await page.evaluate(() => {
  const a = [...document.querySelectorAll("header a")].find((e) => e.textContent.trim() === "Website Builder");
  let panel = a;
  while (panel.parentElement && panel.querySelectorAll("a").length < 20) panel = panel.parentElement;
  window.__body = panel.parentElement; // the sliding body (el1 from earlier)
  window.__samples = [];
});

await page.mouse.move(products.x, products.y);
await page.waitForTimeout(900); // fully open

// now move to Pricing and sample for 1s
await page.mouse.move(pricing.x, pricing.y);
for (let i = 0; i < 25; i++) {
  await page.evaluate(() => {
    const el = window.__body;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    window.__samples.push({ t: Math.round(performance.now()), top: Math.round(r.top), h: Math.round(r.height), op: (+cs.opacity).toFixed(2), display: cs.display, vis: cs.visibility });
  });
  await page.waitForTimeout(40);
}
const samples = await page.evaluate(() => window.__samples);
let prev = "";
for (const s of samples) {
  const key = JSON.stringify({ ...s, t: 0 });
  if (key !== prev) console.log(JSON.stringify(s));
  prev = key;
}
await browser.close();
