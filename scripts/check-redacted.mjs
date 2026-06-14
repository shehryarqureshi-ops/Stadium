import { chromium } from "playwright-core";

const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

const section = page.locator("section", { has: page.getByRole("heading", { name: "Or just use Stadium." }) });
await section.scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await section.screenshot({ path: "shots/redacted-rest.png" });

// hover the widest bar (420px, "address collection for every person")
const bar = section.locator("span.group\\/redact").nth(5);
await bar.hover();
await page.waitForTimeout(400);
await section.screenshot({ path: "shots/redacted-hover.png" });
console.log("captured rest + hover");
await browser.close();
