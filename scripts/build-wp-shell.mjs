/* Generates the WordPress header + footer from the Next.js site.

   Usage:   node scripts/build-wp-shell.mjs [options]
     --asset-base <url>   where images/fonts are served from
                          (default https://www.bystadium.com/wp-shell)
     --site-base  <url>   prefix for site links, "" = relative links
                          (default https://www.bystadium.com)
     --skip-build         reuse the existing .next build
     --port <n>           port for the temporary server (default 3199)
     --rem                keep rem units (default converts to px so a WordPress
                          html{font-size:…} rule cannot resize the header/footer)
     --chrome <path>      Chrome/Chromium executable (or set CHROME_PATH)

   Output (wp-shell/dist/): header.html, footer.html (+ .php copies, identical),
   preview.html. Assets are copied to public/wp-shell/ so the Next site serves them.
   Full explanation: wp-shell/README.md

   How it works, in short:
     1. build + start the real site, open it in headless Chrome
     2. capture the rendered <header> and <footer> markup (so it can never drift
        from the React components), strip React/Next artefacts, rewrite images and
        links to stable absolute URLs
     3. capture the signed-in account menu by mocking the session endpoint
     4. cut the compiled Tailwind CSS down to the classes those pieces use
        (+ the classes wp-shell/header.js toggles) and wrap everything in a
        declarative Shadow DOM, so the WordPress page and the shell cannot affect
        each other's CSS
     5. inline the behaviour scripts (wp-shell/header.js, footer.js) */

import { spawn, execSync } from "node:child_process";
import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, extname, join, resolve } from "node:path";
import { chromium } from "playwright-core";
import postcss from "postcss";

const ROOT = resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] !== undefined && !args[i + 1].startsWith("--") ? args[i + 1] : fallback;
};
const flag = (name) => args.includes(name);

const ASSET_BASE = opt("--asset-base", "https://www.bystadium.com/wp-shell").replace(/\/$/, "");
const SITE_BASE = opt("--site-base", "https://www.bystadium.com").replace(/\/$/, "");
const PORT = Number(opt("--port", "3199"));
const PX = !flag("--rem"); // px by default: immune to WordPress changing the root font size
const ORIGIN = `http://localhost:${PORT}`;
const OUT = join(ROOT, "wp-shell", "dist");
const PUBLIC_OUT = join(ROOT, "public", "wp-shell");
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.bystadium.com";
const PROD_HOSTS = (process.env.NEXT_PUBLIC_PRODUCTION_HOSTS ?? "www.bystadium.com,bystadium.com")
  .split(",").map((h) => h.trim().toLowerCase()).filter(Boolean);
const MOCK = { first: "Zzfirst", last: "Zzlast", email: "zzemail@example.invalid" };

const NAV_KEYS = { "Ways to Engage": "engage", "Impact by Team": "impact", "The Proof": "proof", Catalog: "catalog" };

mkdirSync(OUT, { recursive: true });
mkdirSync(join(PUBLIC_OUT, "img"), { recursive: true });
mkdirSync(join(PUBLIC_OUT, "fonts"), { recursive: true });

/* ---------------------------------------------------------------- build + serve */
if (!flag("--skip-build")) {
  console.log("› building the site (npm run build)…");
  // development mode: no analytics, no consent banner script in the captured markup
  execSync("npm run build", { cwd: ROOT, stdio: "inherit", env: { ...process.env, NEXT_PUBLIC_APP_ENV: "development" } });
}
console.log(`› starting the site on ${ORIGIN}`);
const server = spawn(process.execPath, [join(ROOT, "node_modules/next/dist/bin/next"), "start", "-p", String(PORT)], {
  cwd: ROOT,
  env: { ...process.env, NEXT_PUBLIC_APP_ENV: "development" },
  stdio: "ignore",
});
const stopServer = () => { try { server.kill(); } catch { /* already stopped */ } };
process.on("exit", stopServer);
for (let i = 0; ; i++) {
  try { if ((await fetch(ORIGIN)).ok) break; } catch { /* not up yet */ }
  if (i > 60) throw new Error("site did not start");
  await new Promise((r) => setTimeout(r, 500));
}

const chromePath =
  opt("--chrome", process.env.CHROME_PATH) ??
  ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"].find(existsSync);
if (!chromePath) throw new Error("Chrome not found: pass --chrome <path> or set CHROME_PATH");
const browser = await chromium.launch({ executablePath: chromePath, headless: true });

/* ---------------------------------------------------------------- in-page capture */
/* Runs in the browser. Defines window.__sdm.clean(): clones a node, strips
   React/Next artefacts and records the images it references. */
function installHelpers() {
  const imgs = [];
  window.__sdm = {
    imgs,
    clean(node) {
      const c = node.cloneNode(true);
      for (const img of c.querySelectorAll("img")) {
        let src = img.getAttribute("src") || "";
        const m = src.match(/[?&]url=([^&]+)/);
        if (m) src = decodeURIComponent(m[1]);
        if (src.startsWith("/")) { imgs.push(src); img.setAttribute("src", `{{IMG:${src}}}`); }
        for (const a of ["srcset", "sizes", "data-nimg", "fetchpriority", "style"]) img.removeAttribute(a);
      }
      for (const a of c.querySelectorAll("a[href]")) {
        const h = a.getAttribute("href");
        if (h && h.startsWith("/") && !h.startsWith("//")) a.setAttribute("href", `{{SITE}}${h}`);
      }
      const walker = document.createTreeWalker(c, NodeFilter.SHOW_COMMENT);
      const comments = [];
      while (walker.nextNode()) comments.push(walker.currentNode);
      comments.forEach((n) => n.remove());
      return c.outerHTML;
    },
  };
}

/* Serialises the header / footer / account menu. `variants` = { paneIndex: [html per rail item] }
   for the mega-menus whose content swaps on hover (React state): every state is embedded and
   header.js shows the right one. */
function capturePage([kind, variants]) {
  const { clean, imgs } = window.__sdm;

  if (kind === "header") {
    const header = document.querySelector("header");
    const scrim = header.previousElementSibling;
    scrim.setAttribute("data-sdm", "scrim");
    header.setAttribute("data-sdm", "header");
    const nav = header.querySelector('nav[aria-label="Main"]');
    const found = [];
    for (const el of nav.children) {
      if (el.getAttribute("aria-haspopup")) {
        const label = el.textContent.trim();
        found.push(label);
        el.setAttribute("data-sdm-trigger", label);
      } else el.setAttribute("data-sdm-plain", "");
    }
    const logins = [...header.querySelectorAll('a[href$="/shops/login"]')];
    logins.forEach((a, i) => a.setAttribute("data-sdm-login", i === 0 ? "desktop" : "mobile"));
    // embed every hover state of the stateful mega-menus
    const panes = header.querySelectorAll(".menu-pane");
    for (const [idx, htmls] of Object.entries(variants)) {
      panes[idx].innerHTML =
        `<div data-sdm-variants>${htmls.map((h, i) => `<div data-sdm-variant="${i}"${i ? " hidden" : ""}>${h}</div>`).join("")}</div>`;
      panes[idx].querySelectorAll("[data-sdm-variant]").forEach((v) =>
        v.querySelectorAll("nav[aria-label] > *").forEach((item, i) => item.setAttribute("data-sdm-tab", String(i))),
      );
    }
    return {
      html: clean(scrim) + clean(header),
      imgs: [...imgs], triggers: found, logins: logins.length,
      panes: panes.length,
      hasMobile: !!header.querySelector("#site-menu"),
      hasScrim: scrim.tagName === "DIV",
    };
  }
  if (kind === "footer") {
    const footer = document.querySelector("footer");
    const section = footer.closest("section") ?? footer;
    section.setAttribute("data-sdm", "footer");
    return { html: clean(section), imgs: [...imgs] };
  }
  if (kind === "account") {
    const roots = [...document.querySelectorAll("header button[aria-expanded][aria-controls]")]
      .filter((b) => b.querySelector("span.rounded-full"))
      .map((b) => b.parentElement);
    return { desktop: roots[0] ? clean(roots[0]) : null, mobile: roots[1] ? clean(roots[1]) : null, imgs: [...imgs] };
  }
}

/* menu index -> trigger index in the desktop nav; these two swap content on hover */
const STATEFUL_PANES = { 1: "impact", 3: "catalog" };

async function capture(path, kind, { auth = false } = {}) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  if (auth) {
    await page.route("**/api/auth/session", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        headers: { "access-control-allow-origin": ORIGIN, "access-control-allow-credentials": "true" },
        body: JSON.stringify({ user: { email: MOCK.email, firstName: MOCK.first, lastName: MOCK.last } }),
      }),
    );
  }
  await page.goto(`${ORIGIN}${path}`, { waitUntil: "networkidle" });
  if (auth) await page.waitForSelector("header button[aria-expanded] span.rounded-full", { timeout: 15000 });
  await page.evaluate(installHelpers);

  const variants = {};
  if (kind === "header") {
    // open each stateful mega-menu and hover every rail item to capture each state
    for (const idx of Object.keys(STATEFUL_PANES)) {
      await page.locator('header nav[aria-label="Main"] [aria-haspopup="true"]').nth(Number(idx)).hover();
      await page.waitForTimeout(500);
      const rail = page.locator(".menu-pane").nth(Number(idx)).locator("nav[aria-label] > *");
      const count = await rail.count();
      if (count < 2) throw new Error(`Mega-menu ${STATEFUL_PANES[idx]}: expected a rail of items, found ${count}`);
      variants[idx] = [];
      for (let i = 0; i < count; i++) {
        await rail.nth(i).hover();
        await page.waitForTimeout(350);
        variants[idx].push(
          await page.evaluate((n) => [...document.querySelectorAll("header .menu-pane")[n].children].map((c) => window.__sdm.clean(c)).join(""), Number(idx)),
        );
      }
      await page.mouse.move(700, 600);
      await page.waitForTimeout(400);
    }
  }
  const css = await page.evaluate(() => [...document.querySelectorAll('link[rel="stylesheet"]')].map((l) => l.href));
  const result = await page.evaluate(capturePage, [kind, variants]);
  await page.close();
  return { ...result, css };
}

// /ways-to-engage forces the solid (white) header: that is the state WordPress pages get
const header = await capture("/ways-to-engage", "header");
const footer = await capture("/swag", "footer");
const account = await capture("/ways-to-engage", "account", { auth: true });
await browser.close();
stopServer();

/* sanity checks: fail loudly if the components changed shape */
const triggerKeys = header.triggers.map((l) => NAV_KEYS[l]);
if (header.triggers.length !== 4 || triggerKeys.includes(undefined) || triggerKeys.join() !== "engage,impact,proof,catalog")
  throw new Error(`Header mega-menu triggers changed: ${JSON.stringify(header.triggers)}. Update NAV_KEYS in this script and KEYS in wp-shell/header.js.`);
if (header.panes !== 4 || !header.hasMobile || !header.hasScrim || header.logins !== 2)
  throw new Error(`Header structure changed: ${JSON.stringify({ panes: header.panes, mobile: header.hasMobile, scrim: header.hasScrim, logins: header.logins })}`);
if (!account.desktop || !account.mobile) throw new Error("Could not capture the signed-in account menu");

/* ---------------------------------------------------------------- assets */
const imgMap = new Map();
function hashFile(path) { return createHash("sha1").update(readFileSync(path)).digest("hex").slice(0, 8); }
function stableName(file, outDir) {
  const ext = extname(file);
  const base = basename(file, ext).replace(/\.[a-z0-9_-]{8,}$/i, ""); // drop Next's content hash
  const name = `${base}.${hashFile(file)}${ext}`;
  copyFileSync(file, join(outDir, name));
  return name;
}
function resolveSource(url) {
  if (url.startsWith("/_next/static/media/")) return join(ROOT, ".next/static/media", basename(url));
  return join(ROOT, "public", url.replace(/^\//, ""));
}
function imageUrl(src) {
  if (!imgMap.has(src)) {
    const file = resolveSource(src);
    if (!existsSync(file)) throw new Error(`Image not found for ${src} (${file})`);
    imgMap.set(src, `${ASSET_BASE}/img/${stableName(file, join(PUBLIC_OUT, "img"))}`);
  }
  return imgMap.get(src);
}
const finalise = (html) =>
  html
    .replace(/\{\{IMG:([^}]+)\}\}/g, (_, src) => imageUrl(src))
    .replace(/\{\{SITE\}\}/g, SITE_BASE);

/* mobile "Talk to sales" is href="#" in SiteHeader.tsx (source bug): point it at the booking page */
let headerHtml = finalise(header.html).replace(
  /(<a href=)"#"([^>]*>\s*Talk to sales)/,
  `$1"${SITE_BASE}/book-a-call"$2`,
);
/* menu triggers are tagged with their label in the page; header.js wants the menu key */
headerHtml = headerHtml.replace(/data-sdm-trigger="([^"]+)"/g, (_, label) => `data-sdm-trigger="${NAV_KEYS[label]}"`);
const footerHtml = finalise(footer.html);

/* account menu templates (sentinel values are replaced at runtime by header.js) */
const tpl = (name, html) => `<template data-sdm-tpl="account-${name}">${finalise(html)}</template>`;
const accountTemplates = tpl("desktop", account.desktop) + tpl("mobile", account.mobile);

/* ---------------------------------------------------------------- CSS */
const cssFiles = [...new Set([...header.css, ...footer.css])].map((u) => new URL(u).pathname);
const sources = cssFiles.map((p) => readFileSync(join(ROOT, ".next", p.replace(/^\/_next\//, "")), "utf8"));

const classesIn = (html) => {
  const set = new Set();
  for (const m of html.matchAll(/class="([^"]*)"/g)) m[1].split(/\s+/).filter(Boolean).forEach((c) => set.add(c));
  return set;
};
const jsClasses = (file) => {
  const src = readFileSync(join(ROOT, "wp-shell", file), "utf8");
  const m = src.match(/@tw-classes[^\n]*\n([\s\S]*?)@end/);
  return new Set(m ? m[1].split(/\s+/).filter(Boolean) : []);
};

function buildCss(htmlParts, jsFile) {
  const used = new Set([...classesIn(htmlParts.join("\n")), ...(jsFile ? jsClasses(jsFile) : [])]);
  const classTokens = (sel) => [...sel.matchAll(/\.((?:\\.|[A-Za-z0-9_-])+)/g)].map((m) => m[1].replace(/\\(.)/g, "$1"));
  const mapRoot = (sel) => sel.replace(/(^|[\s,>+~(])(html|body|:root)(?![\w-])/g, "$1:host");
  const fontFaces = [];
  const fontVars = [];
  const keyframes = new Map();

  const walk = (container) => {
    container.each((node) => {
      if (node.type === "atrule") {
        if (node.name === "font-face") { fontFaces.push(node.clone()); node.remove(); return; }
        if (node.name === "property") { node.remove(); return; }
        if (node.name === "keyframes") { keyframes.set(node.params, node.clone()); node.remove(); return; }
        if (node.name === "import" || node.name === "charset") { node.remove(); return; }
        if (node.nodes) {
          if (node.name === "layer" && node.params === "properties") {
            // Tailwind only applies its --tw-* defaults through @supports for old browsers;
            // @property is ignored inside shadow DOM, so apply them unconditionally.
            node.walkAtRules("supports", (s) => { s.replaceWith(s.nodes); });
          }
          walk(node);
          if (!node.nodes.length) node.remove();
        }
        return;
      }
      if (node.type === "rule") {
        const keep = node.selectors.filter((s) => {
          if (/^(html|body)[.\[:#]/.test(s) || /\.lenis|data-animation|data-reveal/.test(s)) return false;
          return classTokens(s).every((c) => used.has(c));
        });
        // font custom properties declared on next/font classes (e.g. .overpass-module__variable)
        node.walkDecls(/^--font-/, (d) => { if (/__variable/.test(node.selector)) fontVars.push([d.prop, d.value]); });
        if (!keep.length) { node.remove(); return; }
        node.selectors = keep.map(mapRoot);
        if (node.parent === container && !node.nodes.length) node.remove();
      }
    });
  };

  const rootNode = postcss.root();
  for (const s of sources) rootNode.append(postcss.parse(s).nodes.map((n) => n.clone()));
  walk(rootNode);

  // keep only the keyframes that the kept CSS references
  const body = rootNode.toString();
  const kf = [...keyframes.entries()].filter(([name]) => new RegExp(`[:,\\s]${name.replace(/[-]/g, "\\-")}[\\s;,}]`).test(body)).map(([, n]) => n.toString());
  return { css: body + kf.join(""), fontFaces, fontVars };
}

const headerBuild = buildCss([headerHtml, accountTemplates], "header.js");
const footerBuild = buildCss([footerHtml], "footer.js");

/* fonts: re-register under "SDM …" names via the FontFace API (@font-face does not work inside shadow DOM) */
const fontFamilies = new Map(); // original family -> SDM family
const fonts = [];
const seen = new Set();
for (const ff of headerBuild.fontFaces) {
  const d = Object.fromEntries(ff.nodes.filter((n) => n.type === "decl").map((n) => [n.prop, n.value.replace(/^["']|["']$/g, "")]));
  const family = d["font-family"];
  const url = (d.src.match(/url\(([^)]+)\)/) ?? [])[1]?.replace(/["']/g, "");
  if (!family || !url) continue;
  const file = join(ROOT, ".next/static/media", basename(url));
  if (!existsSync(file)) continue;
  const sdm = `SDM ${family}`;
  fontFamilies.set(family, sdm);
  const key = `${sdm}|${basename(url)}|${d["font-style"]}|${d["unicode-range"]}`;
  const existing = fonts.find((f) => f.key === key);
  if (existing) { existing.weights.push(d["font-weight"]); continue; }
  const name = stableName(file, join(PUBLIC_OUT, "fonts"));
  fonts.push({ key, family: sdm, src: `${ASSET_BASE}/fonts/${name}`, style: d["font-style"] ?? "normal", range: d["unicode-range"], weights: [d["font-weight"]] });
  seen.add(key);
}
const fontConfig = fonts.map(({ key, weights, ...f }) => {
  const nums = weights.flatMap((w) => w.split(/\s+/)).map(Number).filter(Boolean);
  return { ...f, weight: nums.length ? (Math.min(...nums) === Math.max(...nums) ? String(nums[0]) : `${Math.min(...nums)} ${Math.max(...nums)}`) : "400" };
});
if (!fontConfig.length) throw new Error("No fonts found in the build output");
const fontVarCss = [...new Map(headerBuild.fontVars).entries()]
  .map(([prop, value]) => {
    let v = value;
    for (const [orig, sdm] of fontFamilies) v = v.replace(new RegExp(`(?<![\\w-])"?${orig}"?(?![\\w-])`, "g"), `'${sdm}'`);
    v = v.split(",").map((s) => s.trim()).filter((s) => !/Fallback/i.test(s)).join(", ");
    return `${prop}: ${v}, system-ui, -apple-system, "Segoe UI", Arial, sans-serif;`;
  })
  .join("\n  ");

const extraCss = readFileSync(join(ROOT, "wp-shell", "extra.css"), "utf8").replaceAll("__FONT_VARS__", fontVarCss);

const finishCss = (css) => {
  let out = css;
  if (PX) {
    // rem -> px in declarations only (media queries keep rem: they follow the browser default, not the root size)
    const root = postcss.parse(out);
    root.walkDecls((d) => {
      d.value = d.value.replace(/(-?\d*\.?\d+)rem(?![\w-])/g, (_, n) => `${+(Number(n) * 16).toFixed(3)}px`);
    });
    out = root.toString();
  }
  if (/url\(/.test(out)) console.warn("! CSS contains url(): check that the referenced files are available");
  return out;
};

/* ---------------------------------------------------------------- assemble */
const cfg = (extra = {}) =>
  JSON.stringify({ units: PX ? "px" : "rem", appUrl: APP_URL, appHost: new URL(APP_URL).host, prodHosts: PROD_HOSTS, fonts: fontConfig, helpUrl: "https://help.bystadium.com", ...extra });
const stamp = `${new Date().toISOString().slice(0, 10)}`;
const noscript = `<noscript><style>[data-sdm-login]{visibility:visible!important}</style></noscript>`;

const headerJs = readFileSync(join(ROOT, "wp-shell", "header.js"), "utf8").replace(
  "__SDM_CONFIG__",
  cfg({ sessionUrl: process.env.NEXT_PUBLIC_AUTH_SESSION_URL ?? `${APP_URL}/api/auth/session`, graphqlUrl: process.env.NEXT_PUBLIC_ACCOUNT_GRAPHQL_URL ?? "https://account.bystadium.com/graphql", appUrl: APP_URL }),
);
const footerJs = readFileSync(join(ROOT, "wp-shell", "footer.js"), "utf8").replace("__SDM_CONFIG__", cfg());

const wrap = (id, kind, css, inner, js) => `<!-- Stadium ${kind}: GENERATED by scripts/build-wp-shell.mjs on ${stamp}. Do not edit by hand; see wp-shell/README.md -->
<div id="${id}" data-sdm-shell="${kind}"><template shadowrootmode="open"><style>${css}</style>${inner}</template></div>
<script>${js.replace(/<\/script/gi, "<\\/script")}</script>
`;

const headerOut = wrap(
  "sdm-header-host", "header",
  finishCss(headerBuild.css + extraCss),
  `<div class="sdm-spacer" aria-hidden="true"></div>${headerHtml}${accountTemplates}${noscript}`,
  headerJs,
);
const footerOut = wrap("sdm-footer-host", "footer", finishCss(footerBuild.css + extraCss), footerHtml, footerJs);

for (const [name, html] of [["header", headerOut], ["footer", footerOut]]) {
  if (html.includes("<?")) throw new Error(`${name}: output contains "<?" and would break as a .php file`);
  writeFileSync(join(OUT, `${name}.html`), html);
  writeFileSync(join(OUT, `${name}.php`), html);
}
writeFileSync(
  join(OUT, "preview.html"),
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>WP shell preview</title>
<style>/* hostile WordPress-like CSS to prove the shell is isolated */
html{font-size:62.5%} body{font:20px/1.2 Georgia,serif;color:#c00;margin:0} a{color:hotpink!important;text-decoration:underline!important} *{letter-spacing:3px} ul,li,nav,header,footer,div,button,p{font-family:Georgia!important;font-size:30px!important;color:red!important;background:#ffe!important}</style>
</head><body>${headerOut}<main style="min-height:100vh;padding:40px"><h1>WordPress page content</h1><p>Filler.</p></main>${footerOut}</body></html>`,
);

const kb = (s) => `${(Buffer.byteLength(s) / 1024).toFixed(0)} KB`;
console.log(`\n✓ header.html ${kb(headerOut)} · footer.html ${kb(footerOut)}`);
console.log(`✓ ${imgMap.size} images + ${fontConfig.length} font files copied to public/wp-shell/`);
console.log(`  asset base: ${ASSET_BASE}   site base: ${SITE_BASE || "(relative)"}   units: ${PX ? "px" : "rem"}`);
console.log(`  output: ${OUT}`);
