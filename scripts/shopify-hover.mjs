// Characterize Shopify's Products-menu item hover behavior.
import { chromium } from "playwright-core";

const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto("https://www.shopify.com/pk", { waitUntil: "domcontentloaded", timeout: 45000 });
await page.waitForTimeout(2500);

// open the menu
const pos = await page.evaluate(() => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (node.textContent.trim() === "Products") {
      const r = node.parentElement.getBoundingClientRect();
      if (r.y < 80 && r.width > 0) return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    }
  }
  return null;
});
await page.mouse.move(pos.x, pos.y);
await page.waitForTimeout(1000);

const snap = (label) =>
  page.evaluate((lbl) => {
    const find = (t) => [...document.querySelectorAll("header a")].find((a) => a.textContent.trim() === t);
    const report = (t) => {
      const a = find(t);
      if (!a) return null;
      const li = a.closest("li") ?? a;
      const cs = getComputedStyle(a);
      const liCs = getComputedStyle(li);
      const svgs = [...a.querySelectorAll("svg")].map((s) => {
        const sc = getComputedStyle(s);
        const r = s.getBoundingClientRect();
        return { w: Math.round(r.width), opacity: sc.opacity, transform: sc.transform, visible: r.width > 0 && sc.opacity !== "0" };
      });
      return {
        item: t,
        color: cs.color,
        opacity: liCs.opacity !== "1" ? `li:${liCs.opacity}` : cs.opacity,
        transform: cs.transform,
        textDecoration: cs.textDecorationLine,
        svgCount: svgs.length,
        svgs,
      };
    };
    return { label: lbl, hovered: report("Themes"), sibling: report("Website Builder"), otherCol: report("Checkout") };
  }, label);

const before = await snap("before");
// hover "Themes"
const themes = page.locator("header a", { hasText: "Themes" }).first();
await themes.hover();
await page.waitForTimeout(500);
const after = await snap("after hover Themes");

console.log("BEFORE:", JSON.stringify(before, null, 1));
console.log("AFTER: ", JSON.stringify(after, null, 1));

await page.screenshot({ path: "shots/shopify-item-hover.png", clip: { x: 60, y: 90, width: 700, height: 320 } });
await browser.close();
