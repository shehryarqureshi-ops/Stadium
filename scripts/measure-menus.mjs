// Measure shopify.com's Products dropdown metrics, then ours, side by side.
import { chromium } from "playwright-core";

const browser = await chromium.launch({ channel: "msedge" });

async function measureShopify() {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto("https://www.shopify.com/pk", { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForTimeout(2500);
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
  const m = await page.evaluate(() => {
    const get = (txt) => [...document.querySelectorAll("a, p")].find((e) => e.textContent.trim() === txt);
    const wb = get("Website Builder");
    const themes = get("Themes");
    const heading = get("Build your website") ?? [...document.querySelectorAll("p")].find((e) => /build your website/i.test(e.textContent.trim()));
    const wbR = wb.getBoundingClientRect();
    const thR = themes.getBoundingClientRect();
    const hR = heading.getBoundingClientRect();
    const wbCs = getComputedStyle(wb);
    const hCs = getComputedStyle(heading);
    const icon = wb.querySelector("svg, img") ?? wb.parentElement.querySelector("svg, img");
    const iconR = icon ? icon.getBoundingClientRect() : null;
    // panel = ancestor with many links
    let panel = wb;
    while (panel.parentElement && panel.querySelectorAll("a").length < 20) panel = panel.parentElement;
    const pR = panel.getBoundingClientRect();
    // second group heading for group gap
    const run = [...document.querySelectorAll("p")].find((e) => /run your business/i.test(e.textContent.trim()));
    const sidekick = get("Sidekick");
    return {
      panel: { y: Math.round(pR.y), h: Math.round(pR.height), w: Math.round(pR.width) },
      groupHeader: { font: hCs.fontSize + "/" + hCs.lineHeight, weight: hCs.fontWeight, tracking: hCs.letterSpacing, color: hCs.color, x: Math.round(hR.x), y: Math.round(hR.y) },
      headerToFirstItem: Math.round(wbR.y - hR.bottom),
      item: { font: wbCs.fontSize + "/" + wbCs.lineHeight, weight: wbCs.fontWeight, color: wbCs.color, rowH: Math.round(wbR.height), x: Math.round(wbR.x) },
      rowPitch: Math.round(thR.y - wbR.y),
      icon: iconR ? Math.round(iconR.width) : "none",
      groupGap: run && sidekick ? Math.round(run.getBoundingClientRect().y - sidekick.getBoundingClientRect().bottom) : "n/a",
      mainTopPad: Math.round(hR.y - pR.y),
    };
  });
  console.log("SHOPIFY:", JSON.stringify(m, null, 1));
  await page.close();
}

async function measureOurs() {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Ways to Engage" }).hover();
  await page.waitForTimeout(600);
  const m = await page.evaluate(() => {
    const panel = document.getElementById("engage-menu");
    const pR = panel.getBoundingClientRect();
    const get = (txt) => [...panel.querySelectorAll("a, p")].find((e) => e.textContent.trim() === txt);
    const heading = get("Recognition");
    const first = get("Kudos & Peer Recognition");
    const second = get("Milestone Programs");
    const hR = heading.getBoundingClientRect();
    const fR = first.getBoundingClientRect();
    const sR = second.getBoundingClientRect();
    return {
      panel: { y: Math.round(pR.y), h: Math.round(pR.height), w: Math.round(pR.width) },
      groupHeader: { font: getComputedStyle(heading).fontSize + "/" + getComputedStyle(heading).lineHeight, x: Math.round(hR.x), y: Math.round(hR.y) },
      headerToFirstItem: Math.round(fR.y - hR.bottom),
      item: { font: getComputedStyle(first).fontSize, rowH: Math.round(fR.height), x: Math.round(fR.x) },
      rowPitch: Math.round(sR.y - fR.y),
      mainTopPad: Math.round(hR.y - pR.y),
    };
  });
  console.log("OURS:   ", JSON.stringify(m, null, 1));
  await page.close();
}

await measureShopify();
await measureOurs();
await browser.close();
