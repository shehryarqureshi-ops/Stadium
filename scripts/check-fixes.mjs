import { chromium } from "playwright-core";

const browser = await chromium.launch({ channel: "msedge" });
// deviceScaleFactor 2 simulates a retina display
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

const section = page.locator("section", { has: page.getByRole("button", { name: "However you want." }) });
await section.scrollIntoViewIfNeeded();
await page.waitForTimeout(800);

const src = await section.locator("ul img").first().evaluate((img) => img.currentSrc);
console.log("pillar image served:", decodeURIComponent(src.split("?")[1] || src));

await page.getByRole("button", { name: "However you want." }).hover();
await page.waitForTimeout(300);
await section.locator("h2").screenshot({ path: "shots/hover-heading.png" });
console.log("hover capture done");
await browser.close();
