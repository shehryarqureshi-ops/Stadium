// Find and characterize tab components on shopify.com/pk:
// markup roles, indicator styling, click transitions, auto-advance.
import { chromium } from "playwright-core";

const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://www.shopify.com/pk", { waitUntil: "domcontentloaded", timeout: 45000 });
await page.waitForTimeout(3000);

const tablists = await page.evaluate(() => {
  const lists = [...document.querySelectorAll('[role="tablist"]')];
  return lists.map((tl, i) => {
    const tabs = [...tl.querySelectorAll('[role="tab"]')];
    const r = tl.getBoundingClientRect();
    return {
      index: i,
      y: Math.round(r.y + scrollY),
      tabCount: tabs.length,
      labels: tabs.map((t) => t.textContent.trim().slice(0, 40)),
      selected: tabs.findIndex((t) => t.getAttribute("aria-selected") === "true"),
    };
  });
});
console.log("tablists found:", JSON.stringify(tablists, null, 1));

if (tablists.length) {
  const target = tablists.find((t) => t.tabCount >= 3) ?? tablists[0];
  await page.evaluate((y) => window.scrollTo(0, y - 300), target.y);
  await page.waitForTimeout(1500);

  // auto-advance? watch aria-selected for 9s without touching anything
  const before = await page.evaluate((i) => {
    const tl = document.querySelectorAll('[role="tablist"]')[i];
    return [...tl.querySelectorAll('[role="tab"]')].findIndex((t) => t.getAttribute("aria-selected") === "true");
  }, target.index);
  await page.waitForTimeout(9000);
  const after = await page.evaluate((i) => {
    const tl = document.querySelectorAll('[role="tablist"]')[i];
    return [...tl.querySelectorAll('[role="tab"]')].findIndex((t) => t.getAttribute("aria-selected") === "true");
  }, target.index);
  console.log(`auto-advance: selected ${before} -> ${after} after 9s idle ${before !== after ? "(YES, rotates)" : "(no)"}`);

  // inspect active vs inactive tab styling + panel transition
  const styling = await page.evaluate((i) => {
    const tl = document.querySelectorAll('[role="tablist"]')[i];
    const tabs = [...tl.querySelectorAll('[role="tab"]')];
    const pick = (el) => {
      const cs = getComputedStyle(el);
      return { color: cs.color, bg: cs.backgroundColor, border: cs.borderBottom !== "0px none rgb(0, 0, 0)" ? cs.borderBottom : cs.border, radius: cs.borderRadius, transition: cs.transitionProperty + " " + cs.transitionDuration };
    };
    const active = tabs.find((t) => t.getAttribute("aria-selected") === "true");
    const inactive = tabs.find((t) => t.getAttribute("aria-selected") !== "true");
    const panel = document.querySelector('[role="tabpanel"]:not([hidden])');
    const panelCs = panel ? getComputedStyle(panel) : null;
    return {
      active: pick(active),
      inactive: pick(inactive),
      panelTransition: panelCs ? panelCs.transitionProperty + " " + panelCs.transitionDuration : "n/a",
      panelAnimation: panelCs ? panelCs.animationName + " " + panelCs.animationDuration : "n/a",
    };
  }, target.index);
  console.log("styling:", JSON.stringify(styling, null, 1));

  // click an inactive tab and observe what changes
  await page.screenshot({ path: "shots/shopify-tabs-before.png", clip: { x: 0, y: 200, width: 1440, height: 700 } });
  const tl = page.locator('[role="tablist"]').nth(target.index);
  await tl.locator('[role="tab"]').nth((target.selected + 1) % target.tabCount).click();
  await page.waitForTimeout(250);
  await page.screenshot({ path: "shots/shopify-tabs-mid.png", clip: { x: 0, y: 200, width: 1440, height: 700 } });
  await page.waitForTimeout(800);
  await page.screenshot({ path: "shots/shopify-tabs-after.png", clip: { x: 0, y: 200, width: 1440, height: 700 } });
  console.log("click captures saved");
}
await browser.close();
