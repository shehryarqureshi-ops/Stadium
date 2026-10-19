# Stadium — Performance Audit (iPhone 12+ target)

Audit date: 2026-10-19 · Next.js 16.2.9 production build (`next build` + `next start`), measured on the home page in a 375×812 emulated viewport. Numbers marked *measured* come from that run; everything else is from reading the code.

## TL;DR

The site is slow and hot for one dominant reason: **the home page downloads and decodes ~52 MB of video on a phone** and then **keeps three canvas/WebGL animations running at 60 fps forever**. Images are *not* the problem on the home page (23 optimized images = 0.57 MB). JavaScript is moderate (1.06 MB raw / 296 KB gzip). Fix the videos and the always-on canvases and the page should drop from ~52 MB to under 2 MB and stop heating the phone.

| Measured, home page, mobile viewport | Value |
|---|---|
| Total transfer after scrolling to the bottom | **51.8 MB** |
| Hero videos (5 clips, all fetched at load) | **37.6 MB** in the first 6 s |
| Infrastructure `printing.mp4` (fetched on scroll) | **14.3 MB** |
| All images combined (23 files, next/image) | 0.57 MB |
| JS (14 chunks) | 1,062 KB raw / 296 KB gzip |
| HTML document | 466 KB |
| DOM nodes | 2,956 |
| Canvases running continuously | 3 (one is a 686×686 WebGL globe) |

## Findings, ranked by impact

### P0 — Fix first (these cause the load time and the heat)

**1. Five full-HD hero videos, all preloaded at once** — `app/components/HeroBackgroundVideo.tsx`
- All five `<video>` elements mount together with `preload="auto"`: People 6.9 MB, Partners 6.8, Customers 5.8, Employee 8.7, Community 9.4 MB. Source files are 1928×1072 at 9–15 Mbps, 5 s each. A 375 pt-wide phone never needs more than ~720 px.
- The `poster` line is commented out, so there is a black flash and no image for LCP.
- During each crossfade two videos decode simultaneously, and `object-cover` plus 3–4 gradient scrims over a video forces extra compositing every frame.
- **Fix:**
  - Ship a poster image (WebP/AVIF, ≤60 KB) as the LCP element, always.
  - On mobile / `Save-Data` / reduced motion: poster only, or one short 540p clip.
  - On desktop: load only the active clip; set `preload="none"` on the rest and start fetching clip N+1 only after clip N is playing.
  - Re-encode to 720p (mobile) and 1080p max (desktop) at ~1–1.5 Mbps, H.264 High + `-movflags +faststart` (HEVC/AV1 as `<source>` where supported). Target ≤500 KB per clip. 5 clips drop from 37.6 MB to ~2.5 MB.
  - Start loading video after `load`/idle so it never competes with fonts, HTML and the poster.

**2. Infrastructure videos are 11–23 MB each, at 29–37 Mbps** — `app/components/Infrastructure.tsx`
- `printing.mp4` 17 MB, `warehousing.mp4` 23 MB, `shipping.mp4` 11 MB, 1080p. *Measured:* `printing.mp4` pulled 14.3 MB on mobile as soon as the section was scrolled to. There is no poster/`preload` strategy; the `<video>` is keyed by `src`, so each tab click starts another large download.
- **Fix:** re-encode to 720p ~1.5 Mbps (≤1.5 MB each), `preload="none"` + poster, load on first tap or when 50% in view, use `<source>` for WebM/MP4, skip on `Save-Data`.

**3. Three canvas animations run flat out and never pause** — main source of battery drain and heating
- `Globe.tsx` (cobe WebGL): `devicePixelRatio: 2` hard-coded, `mapSamples: 16000`, `mix-blend-luminosity` (forces the compositor to blend a full-size WebGL layer every frame). The visibility/scroll gate is **commented out** (`// if (visible && !scrolling)`), so it renders at 60 fps even when off-screen. *Measured:* 686×686 canvas on a 375 px viewport. `RedactedPoster` mounts **two** Globe instances (desktop + mobile, one `display:none`), and the hidden one keeps running its rAF loop too.
- `Starfield.tsx`: 220 stars drawn with `beginPath/arc/fill` per frame, same commented-out gate, so it always runs. It is a full-section canvas stacked behind the globe.
- `ScaleMapParticles.tsx`: 2,500 particles at `dpr = 2` with a `mask-image: radial-gradient` over the canvas. It stops drawing when off-screen, but the rAF loop itself never stops.
- **Fix:**
  - Re-enable the visibility gate and cancel the rAF (not just skip drawing) when off-screen or tab hidden.
  - Cap DPR at 1–1.5 on phones, and lower `mapSamples` (try 4000–6000).
  - Mount only one Globe instance (choose by breakpoint in JS, or `matchMedia`).
  - Replace the Starfield with a static tiled dot image or a CSS opacity-only animation.
  - On mobile / reduced-motion, swap the globe for a pre-rendered poster, or a ~300 KB looping video of the rotation, which costs far less than live WebGL.
  - Remove `mix-blend-luminosity` (bake the blue tint into the globe colours instead).

### P1 — Big wins

**4. Heavy blur / backdrop effects (Safari GPU cost)** — `Infrastructure.tsx`, `PillTabs.tsx`, `SwagHero.tsx`, header menus
- `blur-[170px]` on a 68 rem ellipse and `blur-[400px]` in PillTabs. Safari re-rasterises huge Gaussian blurs on every repaint; `backdrop-blur-[30px]` over a playing video repeats that every video frame. 16 `backdrop-blur` usages across the app.
- **Fix:** replace big `blur()` glows with a pre-baked `radial-gradient` (identical look, near-zero cost); drop `backdrop-blur` on mobile (`md:backdrop-blur-*` only) or use a solid `bg-black/90`.

**5. Scroll-reveal uses `filter: blur()` + `will-change` on every reveal element** — `app/layout.tsx` inline CSS, `RevealOnScroll.tsx`
- 86 elements on the home page start with `opacity:0; transform; filter: blur(0.5rem)` and `will-change: opacity, transform, filter` all at once. Each becomes its own compositor layer (memory), and animating `filter` is the most expensive of the three properties. Transitions are 2.5 s, so many layers stay live for a long time. A `MutationObserver` on `document.body` with `subtree: true` also re-runs `querySelectorAll` on every DOM mutation, including every GSAP/React update.
- **Fix:** animate only `opacity` + `transform`; drop the blur (or keep it on `lg:` only); apply `will-change` only for the moment of the transition (or not at all); shorten to ~0.6–0.8 s; replace the `MutationObserver` with a one-off scan after hydration.

**6. Thirteen GSAP loop animations hydrate together** — `StadiumWay.tsx` (`InviteTeamLoop`, `RolesPermissionsLoop`, … ×13)
- All 13 loops are imported eagerly into one client component and each builds its GSAP timeline at hydration. They are paused when not visible, but they still cost JS parse/execute and memory up front. These also pull in `gsap` for the home page.
- **Fix:** `next/dynamic` each loop (or the whole `StadiumWay`) and mount it on an IntersectionObserver with a ~1 viewport rootMargin; build timelines lazily.

**7. Home HTML is 466 KB and the whole page is client-hydrated**
- 105 `"use client"` files. The Globe's marker SVGs are inlined in JSX and serialised into the HTML and the RSC payload. 189 `<img>` tags are in the initial HTML.
- **Fix:** make static sections server components (many are pure markup with only `data-animation` attrs); move inline SVGs to files; lazy-render below-the-fold sections (`content-visibility: auto` + `contain-intrinsic-size`) to cut initial style/layout cost.

### P2 — Cleanups

**8. Preload noise delaying the hero**
- `PillTabs.tsx` has a "Preload all images" block that renders 7 `<Image priority width=1 height=1>`. This emits 7 `<link rel=preload as=image imagesrcset="…w=32…">` in `<head>` at high priority. The preload URL (w=32) never matches the real request (w=750, q=100), so it wastes 7 high-priority requests and does not warm the cache. Remove it.
- ~40 `<link rel=preload as=image>` for small SVGs (footer, integration marks, loop assets, flags) sit in the head of every page and compete with the LCP image and fonts. Remove these; they are tiny and lazy-load fine.
- All four `woff2` files are preloaded on every page (112 KB). Satoshi Light and Medium are used only in a few places; drop their `preload` (`preload: false` in `next/font/local`). Overpass loads 5 static weights from Google (`400–800`); trim to the 2–3 actually used or use the variable font.

**9. Image quality settings**
- `PillTabs` active image uses `quality={100}` (marketing tab: 202 KB at 750 w vs ~60 KB at q75). Use 80 for photographic/screens, 100 only for text-heavy UI shots. Next already serves WebP/AVIF; keep `formats: ['image/avif','image/webp']`.
- 68 raw `<img>` tags and 7 `unoptimized` images bypass the optimizer; audit for any >100 KB source.

**10. Third-party scripts**
- Osano loads with `strategy="beforeInteractive"` (synchronous, render-blocking in `<head>`) on staging and production. GTM, Clarity, HubSpot, Zendesk follow after consent. Move Osano to `afterInteractive` with the consent-default stub already inline, and load Zendesk/HubSpot on idle or on first interaction. (Not measurable on the local build; analytics are disabled outside production.)

**11. Repository / asset hygiene (doesn't hit users directly but invites mistakes)**
- `public/` is **558 MB across 1,557 files**: 193 MB of numbered PNG frame sequences (`public/animations/sequence-1/2`, used only by `RecognitionTween`/`FrameSequence`, which swaps a `<img>` via React state at 24 fps), 37 raster files over 1 MB (many 2–4.8 MB `.jpeg` originals in `public/impact/` next to the PNGs actually used), and six `sw-card-*.svg` at 1.8–2.1 MB each with embedded base64 rasters.
- `FrameSequence` re-renders React 24×/s and downloads PNG frames; replace with a single video or an animated WebP/AVIF, and delete unreferenced originals.
- If any of these ship on a page a user visits, they are the next largest costs after the videos. Move originals out of `public/` (keep masters in Figma/Drive).

## What is already fine

- next/image is doing its job: home-page images total 0.57 MB with correct `sizes`.
- JS is 296 KB gzip on the home page, acceptable once the loops are lazy.
- Lenis smooth-scroll is not on the home page. Keep it that way (it fights iOS native momentum).
- Existing reduced-motion handling and IntersectionObserver gating in the GSAP loops, `Infrastructure`, and `ScaleMapParticles` is good; apply the same pattern to Globe and Starfield.

## Suggested order of work

1. **Hero video**: poster + mobile poster-only + lazy next clip + re-encode (biggest single win; ~35 MB saved).
2. **Infrastructure videos**: re-encode, `preload="none"`, poster (~14–30 MB saved).
3. **Globe/Starfield/Particles**: restore pause gate, DPR cap, one instance, static fallback on mobile (fixes the heating).
4. **Replace big blurs and `backdrop-blur`**, trim reveal CSS to opacity+transform.
5. **Lazy-mount `StadiumWay` loops**, remove preload noise, drop unused font preloads.
6. **Server-component pass + asset cleanup.**

## Targets (iPhone 12, mid-tier 4G)

| Metric | Now (estimated/measured) | Target |
|---|---|---|
| Home transfer, first load | ~38 MB (52 MB after scroll) | < 1.5 MB first load, < 4 MB after scroll |
| LCP | Poster-less, behind 37 MB of video | < 2.0 s |
| Main-thread work / jank | 3 continuous canvases + blur layers | idle when nothing is in view |
| Device temperature | Warm in minutes | No sustained GPU load |

Verify after each step with Safari Web Inspector on a real iPhone (Timelines → Network, CPU, Graphics) and Lighthouse mobile in CI.

## Progress tracker (updated 2026-10-19)

Measured after fixes, home page, phone viewport, production build: ~0.37 MB at load (was ~38 MB), JS 196 KB (was ~258 KB), HTML 388 KB (was 466 KB).

**Done:** #1 hero video · #2 infrastructure video · #3 canvases (loop cancelled off-screen, DPR 1.5, one globe, static globe on phones) · #6 StadiumWay loops lazy-mounted (`app/components/common/LazyLoop.tsx`) · #8 preload noise (PillTabs block, SVG preloads via `loading="lazy"`, Satoshi Light/Medium `preload: false`).

**Next:** #4 blurs/backdrop-blur · #5 reveal animation · #9 image quality · trim Overpass weights · verify on a real iPhone.

**Later:** #7 server components + content-visibility · #10 third-party scripts · #11 asset hygiene (558 MB `public/`) · cheaper starfield / globe samples / particles · Lighthouse + page-weight budget in CI.

## Cleanup: unused code and assets (2026-10-19)

Method: traced every import from the app entry points (pages, layouts, MDX), re-running after each pass to catch files kept alive only by other unused files. Every file in `public/` was matched against exact path references in live code; dynamic paths (flags, motion marks, `exp2/cards`, `snacks/cat`, `swag2/deco`, `motion/still`, impact graphics) were checked file by file. Everything removed is recoverable from git history; nothing is committed.

- **Code:** 56 unused components (about 8,600 lines), `testimonials.ts`, `app/data/globeDots.ts`, scripts `gen-globe-dots.js` and `gen-globe-svg.js`. Dead code inside live files: `ProductCluster`, `DeviceGraphic`, unused constants/imports, commented-out blocks, the `PageClose` `cta`/`showCta` props, the `[data-reveal]` and `.bg-particles` CSS.
- **Assets:** 494 files, 292 MB out of `public/` (now 183 MB). Largest: `animations/` (193 MB, only used by a commented-out component), `.jpeg` originals in `impact/`, `recogHero.png` (7 MB, only in a comment), `menu-engage.png`, six `sw-card-*.svg` with embedded rasters, and page images for the replaced Gift / Swag / Events / Exp / Recog sections.
- **Dependencies:** removed `shaders`.
- **Verified:** `tsc` clean, lint 0 errors, build generates 43/43 pages, and a crawl of all 40 routes on the production server checked 8,795 asset URLs with 0 broken.
- **Left alone:** `scripts/` and `wp-shell/` (tooling / WordPress export), `design.md` (design record, still mentions some removed names), unused exports inside live files, unused `@theme` tokens.
