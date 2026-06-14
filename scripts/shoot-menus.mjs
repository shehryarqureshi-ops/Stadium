// Capture both mega-menus open, drawer only, 2x. Usage: node scripts/shoot-menus.mjs
import { chromium } from "playwright-core";

const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

const drawer = page.locator("#engage-menu .engage-body");

await page.hover('button:has-text("Ways to Engage")');
await page.waitForTimeout(600);
await drawer.screenshot({ path: "shots/now-engage.png" });
console.log("engage captured");

await page.hover('button:has-text("Impact by Team")');
await page.waitForTimeout(600);
await drawer.screenshot({ path: "shots/now-impact.png" });
console.log("impact captured");

await browser.close();
