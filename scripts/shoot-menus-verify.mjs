// Verify sidebar switch behavior after restyle.
import { chromium } from "playwright-core";

const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

await page.hover('button:has-text("Impact by Team")');
await page.waitForTimeout(600);
await page.hover('#engage-menu button:has-text("Finance")');
await page.waitForTimeout(500);
const drawer = page.locator("#engage-menu .engage-body");
await drawer.screenshot({ path: "shots/now-impact-finance.png" });
console.log("finance captured, drawer height:", await drawer.evaluate((el) => el.offsetHeight));

await browser.close();
