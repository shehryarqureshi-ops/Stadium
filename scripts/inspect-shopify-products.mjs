// Open shopify.com's "Products" nav dropdown and characterize it.
import { chromium } from "playwright-core";

const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://www.shopify.com/pk", { waitUntil: "domcontentloaded", timeout: 45000 });
await page.waitForTimeout(2500);

const trigger = page.locator('header button', { hasText: "Products" }).first();
await trigger.hover();
await page.waitForTimeout(400);
await trigger.click().catch(() => {});
await page.waitForTimeout(800);
await page.screenshot({ path: "shots/shopify-products-menu.png", clip: { x: 0, y: 0, width: 1440, height: 760 } });

const structure = await page.evaluate(() => {
  // find the visible expanded panel
  const panels = [...document.querySelectorAll('header [aria-expanded="true"] ~ *, header [role="menu"], header [data-state="open"], header div')]
    .filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 800 && r.height > 200 && r.top > 40 && r.top < 120;
    })
    .sort((a, b) => b.getBoundingClientRect().height - a.getBoundingClientRect().height);
  const panel = panels[0];
  if (!panel) return "no panel found";
  const r = panel.getBoundingClientRect();
  const headings = [...panel.querySelectorAll("h2, h3, h4, [class*=heading], strong, b")].slice(0, 14).map((h) => h.textContent.trim().slice(0, 40));
  const links = [...panel.querySelectorAll("a")].slice(0, 30).map((a) => {
    const t = a.textContent.trim().replace(/\s+/g, " ");
    return t.slice(0, 70);
  });
  const cs = getComputedStyle(panel);
  return {
    box: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
    bg: cs.backgroundColor,
    radius: cs.borderRadius,
    shadow: cs.boxShadow.slice(0, 80),
    headings,
    linkCount: panel.querySelectorAll("a").length,
    links,
  };
});
console.log(JSON.stringify(structure, null, 1));
await browser.close();
