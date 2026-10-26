# Stadium — Design Specification

Single source of truth for design values pulled from Figma. Every value here is
mirrored as a Tailwind v4 `@theme` token in `app/globals.css` — **always style
through these tokens, never hardcode values in components.**

Figma file: `XsE6IHFveJRTAuTS6kp87m` ("Untitled")

## Component quality bar (defined 2026-06-12)

A section is **SIGNED** only when it passes all four lenses, verified on
the live build (computed styles / real interaction, not eyeballing) and
mirrored in the WIP Figma pages. Exceptions must be named (e.g.
launch-gated `#` links). Shopify's equivalent is measured first whenever
one exists — numbers, not vibes.

### 1. Semantic — structure & meaning

- One `h1` per page; sections head with `h2`, no level skips
- Right element for the job: links navigate (real `href`), buttons act;
  no clickable divs; no fake controls — a control that does nothing
  doesn't ship
- Landmarks complete & named (`header`/`main`/`footer`, labeled `nav`s)
- Decorative media `alt=""` + `aria-hidden`; informative media described
- UI state in markup: `aria-expanded` / `aria-current` / `aria-pressed`
  wherever the visual implies state

### 2. Accessible — WCAG 2.2 AA, measured

- Contrast: text ≥4.5:1 (≥3:1 for ≥24px/18.66px-bold); UI parts + focus
  indicators ≥3:1 — measured WORST-CASE (over photos, compute the scrim
  floor like the nav top-scrim: ≥0.62 alpha band ⇒ ~5:1)
- Keyboard: everything reachable/operable; logical order; no traps; Esc
  closes overlays; **skip-to-content link** first in tab order
- Focus: custom `:focus-visible` ring on every interactive element —
  ≥2px, ≥3:1 against its backdrop, offset so it never clips
- Touch targets: WCAG 2.5.8 AA floor (≥24px with spacing) always met;
  system pills are 40px tall by brand decision (2026-06-12) with wide
  padded hit areas — note this sits below the 44px AAA/platform-HIG
  guideline, accepted deliberately; dense full-width list links ≥40px
- Motion: every animation honors `prefers-reduced-motion`; anything
  auto-moving >5s (marquees, auto-advance) needs a pause/stop mechanism
  (WCAG 2.2.2) — reduced-motion alone is not the mechanism
- Reflow: survives 200% zoom / 320px width; screen-reader pass on
  stateful widgets (accordions, tabs, carousels announce state)

### 3. Aesthetic — system fidelity

- Tokens only — every value traceable here; no rogue hexes (the old
  ScaleMap heading / #C7BCB3 hairline class of bug)
- One rhythm: 48px heading→content desktop / 24 below; section padding
  tokens; 8px grid
- Radius rule: 12px cards / 16px dark media panels — constant across
  breakpoints
- **Media aspect rule (added 2026-06-12, EveryWay lesson): every media
  slot locks ONE aspect ratio across all breakpoints AND viewport widths
  (`aspect-[…]`, never fixed heights on fluid tiles).** Fixed heights
  silently re-crop fluid cards at every window size (221:320 became
  147×320 needles at 1024) and breakpoint-specific heights turn one
  upload into three unrelated pictures. One asset + one `object-position`
  per slot must read identically everywhere; asset specs follow the
  ratio (pillar images: portrait-safe, center-weighted, ~700×1000+)
- **Display is SINGLE-WEIGHT Satoshi Bold 700** (decided 2026-06-12). A
  two-weight system (Bold + Medium) was trialed and REVERTED — Bold fits
  Stadium's confident/energetic personality.
- **Headings follow the Figma Universal scale (migrated 2026-06-17): a clean
  4 sizes — 64 Hero / 42 Section / 32 Secondary / 24 Card-Element** (Satoshi
  Bold, tracking 0). `text-heading-*` = **24/32/42** (lg was 48, retuned to
  the Universal 42 SectionHead; heading-md tracking −0.48→0; heading-sm lh
  32→28).
  - ALL section titles — including EveryWay's long headline — now use
    `text-heading-*` at 42. The earlier approach of a larger
    `text-narrative-*` (26/38/54) for EveryWay was REVERTED to match the
    Universal scale; every section head reads at 42.
  - `text-narrative-*`, `text-display-*`, `text-ds-body-big`, `text-subtitle`
    are now UNUSED (superseded by the Universal scale) — prune when convenient.
    NOTE: scattered per-section notes below still cite the old 48/54 sizes —
    the Universal scale above supersedes them.
- Type from the scale (incl. eyebrow/tracking tokens); margin grid
  16/30/90 shared by nav + sections; container rules per Spacing section
- Imagery: no placeholders/watermarks in signed sections; sane
  `next/image` `sizes`

### 4. Experiential — alive and honest

- Every interactive element: hover + active + focus-visible states;
  feedback <100ms; zero layout shift on state change (fixed-height
  drawer lesson)
- **Hover is an enhancement, never the only path** — every capability
  reachable on touch/keyboard (this rule is what caught the
  unreachable-on-mobile mega menus)
- Motion with physics and purpose (UI 150–400ms; measured patterns like
  the 300/350ms drawer); sections carry life where appropriate
  (auto-advance, drift) but never fake it (no decorative progress bars
  pretending to play)
- **Coupled transitions sequence correctly** (added 2026-06-12, user-
  caught): when two elements animate as a unit, neither releases its
  state while the other is still in flight — e.g. the nav must stay
  solid until the drawer's retract completes, a tab stays active until
  its panel has swapped. Audit every open/close pair in both directions
- Overlays manage focus: trapped while modal, returned to the trigger on
  close (applies to the future video lightbox; menu/accordion patterns
  keep focus on their trigger)
- Each breakpoint deliberately designed (reviewed in WIP), not an
  accident of stacking

### 5. Performance — felt speed (added 2026-06-12)

- LCP element identified per page; its image `priority` (hero ✓), the
  rest lazy; `sizes` attrs match rendered widths
- Animations compositor-only (`transform`/`opacity` — never width/top
  /margin); long-running loops (marquees) must not jank scroll
- Load CLS ≈ 0: fonts via `next/font` with metric fallbacks (✓), media
  always in sized containers; no hydration flash (SSR renders the
  resting state)
- Weight discipline: photography through `next/image` formats; no
  multi-MB assets in signed sections

### 6. Content & resilience (added 2026-06-12)

- **Signed sections contain approved copy only** — INVENTED/PROPOSED
  flags block signing (or ride as a named ledger exception)
- Long-string tolerance: layouts wrap rather than clip/overflow (~+30%
  string growth, the i18n floor); voice consistency (uppercase CTA
  convention, sentence-case headings)
- Link text descriptive on its own ("Explore HR", `aria-label="View all
Recognition"` — never bare "Learn more" ×5)
- Degrades gracefully: content readable and navigable pre-hydration/no-JS;
  every photo sits on a surface fallback (`bg-grey-200` pattern); iOS
  quirks owned (`100dvh` ✓, no hover-only paths)

### Page-level gates (tracked once, not per section)

- Skip-to-content link · custom `:focus-visible` system — **DONE
  2026-06-12** (global base rule: 2px solid ink ring, offset 2; dark/photo
  contexts override with `focus-visible:outline-white`; skip link =
  plain-CSS `.skip-link` slide-in pill, fixed top-left, first tab stop)
- SEO/meta: per-page title+description (✓), **og/twitter card image,
  canonical, Organization JSON-LD — all currently MISSING → launch
  gate** alongside the `#` links
- Out-of-scope by decision (recorded, not forgotten): dark mode, RTL,
  analytics events (launch-gate list item)
- Launch enhancements (tied to assets, not bugs): hero brand-video swap +
  Shopify-style sticky corner mini-player on hero exit (deferred
  2026-06-12 — both need the video asset; a corner player for a still
  photo would be a fake player)
- **Known bug found mid-EveryWay (2026-06-12) — RESOLVED 2026-06-13:**
  ScaleMap overflowed the page horizontally across ~1024–1300px (1164px
  content in a 1009px viewport at 1024). Root cause was NOT the map canvas
  (that is `overflow-hidden`) but the two-column header: the 486+588px
  fixed `lg:shrink-0` columns pack to 1074px and, with the 2×90px desktop
  margins, need ~1254px before they clear the viewport — yet the desktop
  treatment activated at `lg` (1024). Fixed by gating the whole desktop
  treatment (two-column header + 1200×512 reach map + 1M+-Lives highlight)
  on a new `wide` (1300px) breakpoint and holding the stacked coverage
  treatment through the 1024–1300 band (capped/centred at `max-w-band`
  960px). Verified document scrollWidth ≤ clientWidth at
  320/375/768/1024/1200/1280/1300/1440/1600 (was 155px over at 1024). NOT
  an EveryWay regression (EveryWay verified clean).

### Sign-off ledger

Each round ends with a **regression sweep of previously-signed sections**
(shared tokens ripple). Ledger rows note the verification evidence
(computed-style audit, interaction test, breakpoint check).

**Hard rule added 2026-06-12 (after the hero contrast miss): a signature
requires evidence at ALL THREE breakpoints for every lens — a missing
cell means no signature, full stop.** Contrast over imagery must come
from the pixel-sampler (canvas-composited photo + scrim math, worst-case
min across text bounds) — never from zone math or desktop
generalization. The hero was signed on desktop-only evidence and had to
be reopened; that failure mode is now structurally blocked.

| Section                      | Status                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Exceptions                                                                                                                                                                                                                    |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Navigation (all breakpoints) | ✅ SIGNED 2026-06-12                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `#` links launch-gated (focus rings + skip link landed with Hero)                                                                                                                                                             |
| Hero                         | ✅ RE-SIGNED 2026-06-12 with FULL matrix — glyph-accurate contrast at 375/768/1024/1440/1880 all pass (h1 ≥4.21 vs 3 needed; small text ≥5.69 vs 4.5; CTAs ≥7.83); fixes: below-lg `bg-ink/60` floor + recomputed 90deg scrim stops; 40px CTAs, 2px outline, drift, rings, skip link verified; WIP heroes synced (scrim rect + flat overlays)                                                                                                                                                                                                                                                  | `#` CTAs launch-gated; drift interim until brand video. History: signed desktop-only, REOPENED when the matrix caught mobile 1.51:1 — and the matrix then caught the unverified "desktop passes" claim too (1024 h1 was 1.58) |
| Every Way                    | 🟡 IN REVIEW 2026-06-12 — geometry + aspect-lock matrix GREEN at 320/375/768/1024/1440 (5 cards every state; 0.691 every card type every width; no orphan headline; descs surfaced; mobile thumb 64px; no page overflow — confirmed EveryWay clean, the 1024 overflow is ScaleMap's). Viewport decision: LEAVE AS-IS (fits standard phones). WIP synced (mobile thumbs 64, headline line-breaks, captions present via accordion component). ONE CELL OPEN: 5s rotation + hover/focus pause needs a 20-second user eyeball in a visible window (occluded remote window keeps it correctly idle) | Pending assets (states 2–4 tiles); "Candidates"/"Life Moments" PROPOSED copy; sub-lg patterns designed in code (no Figma frames)                                                                                              |
| Trust band                   | ✅ SIGNED 2026-06-12 (rev 2) — invisible 2.2.2 mechanism verified per modality: hover pause/resume (real mouse), focus-revealed keyboard control (transition-off probe), coarse-pointer tap toggle; matrix at 375/768/1024/1440; h2, dupes aria-hidden, eyebrow 4.66:1; WIP synced (buttons removed)                                                                                                                                                                                                                                                                                           | none — copy real, hrefs n/a, no imagery text                                                                                                                                                                                  |
| Scale Map                    | 🔴 REBUILT 2026-07-16 — the `wide`-breakpoint two-column/reach-map layout this row previously tracked is gone; component rewritten to a single light layout with a decorative particle canvas (see section above). **Sign-off not yet run against the new build** — this row's prior overflow/contrast findings are void, need a fresh full-matrix pass                                                                                                                                                                                                                                        | Particle visualization is code-designed with no Figma frame at all (approved one-off exception, not an extrapolation like EveryWay's sub-lg patterns)                                                                         |
| (remaining sections)         | pending                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | —                                                                                                                                                                                                                             |

## Units (2026-06-11)

**Every design value is authored in rem** (Figma px ÷ 16) so user browser
font-size preferences are respected. At default settings rem renders
identically to the Figma px values. Exceptions kept in px: 1px hairline
borders and 1px shadow offsets/inset highlights — these stay crisp.

**No viewport-based root scaling.** A proportional-zoom clamp
(`html { font-size: clamp(...vw...) }`) was tried and rejected (2026-06-11)
— do not reintroduce it.

**Above 1440: Shopify-style centered container** (reference:
shopify.com — approved 2026-06-11). Section _backgrounds_ run full-bleed;
_content_ caps and centers. Tokens (`--container-*` namespace → `max-w-*`
classes):

- `max-w-content` (88.75rem / 1420px — Shopify's measured content cap, hit
  at a 1600px viewport). Used on inner wrappers inside full-bleed sections
  (Hero, Infrastructure, ScaleMap, footer).
- `max-w-section` (100rem / 1600px) — content cap + 2×90px margin. Used
  with `mx-auto w-full` directly on white-background sections that carry
  their own side padding (EveryWay, Poster, StadiumWay, Catalog, TeamsTabs,
  Occasions, Testimonials) and the header nav row.
- `max-w-band` (60rem / 960px, added 2026-06-13) — single-column cap for the
  1024–1300 "narrow desktop" band. When a section holds its stacked
  (sub-`wide`) treatment across desktop-width viewports, this keeps the
  content from sprawling; it centres via the section's `items-center` (full
  width below ~1140px, then capped). Used by ScaleMap's band (header row +
  coverage map).
- TrustBand marquee stays full-bleed (Shopify treats logo strips the same).
- Footer link columns `lg:flex-wrap` so they drop below the brand column on
  narrow desktop (1024–1300px) instead of overflowing.

Rules: never hardcode px in components (except the hairline exceptions);
size images with rem classes/styles, never bare width/height attributes;
letter-spacing in rem like everything else.

## Image quality (2026-08-18)

Crispness is decided by two things — NOT the on-disk format (next/image
re-encodes everything to WebP anyway):

1. **Source resolution — ship the MOST pixels Figma actually has, not a node-
   sized export.** Two routes (revised 2026-08-18 after the user zoomed 400% and
   a 660px problem photo fell apart):
   - **Photos:** use the ORIGINAL upload behind the frame — `download_assets`
     → `rawImages` (the /snacks stock photos are 1400–1800px natively) — and
     commit it at native size as JPEG q90 mozjpeg 4:4:4 (~300–450 KB). Only
     when Figma applies its own crop (catalog cards) export the _image node_ at
     `defaultScale: 4` (Figma's max) so the crop is exact.
   - **UI mockups** (vector in Figma): export at `defaultScale: 4` → PNG
     lossless (step cards 1060×1328, byo 2320×1684). Razor-sharp at any zoom.
   - Minimum bar remains 2× the rendered CSS size; a 1× export upscales on any
     HiDPI screen (Windows 125% = 1.25×, Mac = 2×). next/image never upscales,
     so what's on disk is the ceiling — the on-disk format is irrelevant.
   - Audit with the served-width script (Playwright at DPR 2, and 480css@DPR4
     to emulate 400% zoom): min(candidate w, source w) ÷ needed device px ≥ 1.
     Ceilings that remain are the originals themselves (hero box photo 1439px,
     occasion photos ~1450px) — nothing bigger exists in Figma.
2. **WebP quality per image role** — Next 16 allow-lists qualities in
   `next.config.ts` (`images.qualities: [75, 90, 100]`; default is [75] only):
   - **Photos** (product/lifestyle) → `quality={90}`. Measured on a catalog
     photo: q75→q90 cuts encode error ~30% for ~1.8× bytes (34→61 KB); q100
     doubles bytes again for a marginal gain.
   - **UI mockups / anything with baked text or hairlines** (step cards, Emily's
     Snackbox, the 19.7M+ stats photo) → `quality={100}` — near-lossless at
     ~⅕ the bytes of the raw PNG (49 vs 231 KB), text edges stay clean.
   - Logos/icons stay SVG.

Also keep `sizes` honest (≈ the real rendered width) so the srcset candidate
the browser picks actually carries the device pixels needed.

## /snacks bespoke page — vertical rhythm (audited 2026-08-18)

Figma `n9SjmDjzB1PeZAYJ5w43fr` frame 2208:2740. Its section frames are
content-tight and sit **160px apart**, so every white section is `lg:py-20`
(80 + 80) and the problem card's sleeve carries `lg:pb-20`. Inside sections:
eyebrow 12px / lh 1.4 → 8 → title → 20 → subhead → 40 → content (Catalog:
24 / 45 / 45 / 32; Comparison: 60 to the table). Stats → 180 white incl. the
curve → 120 blue → closing card (py-140, flush on the footer + 2px divider).
Container stays the site's 1200/120 (Figma draws 1240/100) — all inner
proportions were matched at that width; the audit script is
`measure-live.js` + `parse-figma.js` (Playwright + metadata XML → absolute y).

## Breakpoints

Figma designs three frame sizes; they map to Tailwind breakpoints as follows:

| Figma frame             | Width  | Tailwind prefix | Token suffix |
| ----------------------- | ------ | --------------- | ------------ |
| Mobile (node `98:871`)  | 375px  | (none, default) | `-sm`        |
| Tablet (node `96:871`)  | 768px  | `md:`           | `-md`        |
| Desktop (node `87:871`) | 1440px | `lg:`           | `-lg`        |

**`wide` (1300px, `--breakpoint-wide`) — code-only, added 2026-06-13.** Not a
Figma frame. The threshold where a desktop layout that needs more room than the
lg content box switches on. ScaleMap's two-column header (486+588px columns) +
1200×512 reach map need ~1254px to clear the 90px desktop margins, so they hold
the stacked treatment until `wide` rather than overflowing the 1024–1300
"narrow desktop" band (the same band the footer link columns wrap in). Use
sparingly — only for layouts genuinely too wide for the lg content box, never
as a routine fourth Figma breakpoint.

## Fonts

| Role    | Family                   | Source                                           | CSS variable      | Tailwind class |
| ------- | ------------------------ | ------------------------------------------------ | ----------------- | -------------- |
| Display | Satoshi Bold (700)       | local `app/fonts/Satoshi-Bold.woff2` (Fontshare) | `--font-satoshi`  | `font-display` |
| Body/UI | Overpass 400/500/600/700 | `next/font/google`                               | `--font-overpass` | `font-sans`    |

Both are loaded in `app/layout.tsx` via `next/font` and exposed as CSS
variables on `<html>`.

## Colors

| Token (Figma name) | Value                    | Tailwind token       | Class                              |
| ------------------ | ------------------------ | -------------------- | ---------------------------------- |
| `color/brand/hero` | `#181818`                | `--color-brand-hero` | `text-brand-hero`, `bg-brand-hero` |
| Hero body text     | `rgba(255,255,255,0.86)` | `--color-hero-body`  | `text-hero-body`                   |
| Hero text / labels | `#ffffff`                | (Tailwind `white`)   | `text-white`                       |

### Infrastructure dark section palette (Figma 205:12251, added 2026-06-12)

| Role                       | Value     | Tailwind token          |
| -------------------------- | --------- | ----------------------- |
| Section gradient start     | `#1c1d1f` | `--color-infra-base-1`  |
| Section gradient end       | `#0e0f11` | `--color-infra-base-2`  |
| Chapter card surface       | `#17181b` | `--color-infra-card`    |
| Card/video hairline border | `#26282c` | `--color-infra-border`  |
| Video panel gradient start | `#202227` | `--color-infra-panel-1` |
| Video panel gradient end   | `#121316` | `--color-infra-panel-2` |
| Desktop card header label  | `#6b6e74` | `--color-infra-eyebrow` |
| Desktop inactive row label | `#c9cbcf` | `--color-infra-row`     |

### Hero background scrim

Left-to-right dark gradient over the hero photo (`--gradient-hero-scrim` in
`:root`, applied with `bg-[image:var(--gradient-hero-scrim)]`):

```
linear-gradient(90deg,
  rgba(24,24,24,0.68) 0%,
  rgba(24,24,24,0.62) 50%,
  rgba(24,24,24,0.54) 66%,
  rgba(24,24,24,0.50) 80%,
  rgba(24,24,24,0.12) 92%,
  rgba(24,24,24,0.06) 100%)
```

Stops recomputed 2026-06-12 after pixel-sampling found the original
(.65/.45/.20/.05 @ 0/30/60/100) under the headline as low as 1.58:1 at
lg widths (white wall behind glyphs). The ≥0.62 hold to 50% floors small
text at 4.5:1 over pure white; the ≥0.5 hold to 80% floors the headline
(large text) at 3:1 out to its 1024-width glyph extent (77%).

**Below-lg contrast floor:** a flat `bg-ink/60 lg:hidden` overlay sits on
the photo under the gradients — narrow crops center the white wall
behind full-width text where the 90deg scrim fades; 60% ink floors white
small text at ≥4.5:1 over pure white. (Shopify's mobile heroes are
uniformly dark by construction — same principle.)

Verified 2026-06-12 by the glyph-accurate pixel sampler (canvas-composited
photo + scrim math, worst-case min over Range line-rects), all cells pass:
375 / 768 / 1024 / 1440 / 1880 × eyebrow ≥5.69 · h1 ≥4.21 · sub ≥6.08 ·
outline-CTA ≥7.83. Nav band: burger ≥14.9 (sm/md), links ≥6.46 (lg).

**Top nav contrast scrim** (`--gradient-hero-top-scrim`, added 2026-06-11
for WCAG AA): the photo's sky/clouds are near-white at the top, where the
transparent fixed nav renders white links — the 90deg scrim doesn't cover
the center/right of the bar. A second top-down overlay (`inset-x-0 top-0
h-40` in Hero.tsx) holds ≥0.62 alpha through the 4rem nav band (white text
≈5:1 over a worst-case #fff background), then fades to 0 by 10rem:

```
linear-gradient(180deg,
  rgba(24,24,24,0.70) 0%,
  rgba(24,24,24,0.62) 4rem,
  rgba(24,24,24,0.00) 10rem)
```

## Spacing

### Section padding

Horizontal margins follow **shopify.com** (measured live 2026-06-11),
superseding Figma's 24/48/120 by user decision. Vertical paddings remain
the Figma values.

| Breakpoint | Margin X (Shopify) | Padding Y (Figma) | Tokens                                              |
| ---------- | ------------------ | ----------------- | --------------------------------------------------- |
| Mobile     | 16px               | 32px              | `--spacing-section-x-sm` / `--spacing-section-y-sm` |
| Tablet     | 30px               | 64px              | `--spacing-section-x-md` / `--spacing-section-y-md` |
| Desktop    | 90px               | 96px              | `--spacing-section-x-lg` / `--spacing-section-y-lg` |

Usage: `px-section-x-sm md:px-section-x-md lg:px-section-x-lg` etc.
Header and footer use the same margin tokens (their Figma-specific 64/80px
side paddings were retired with this change).

### Hero frame (2026-06-11 rev)

Fixed-height frames with content vertically **centered** (`justify-center`).
Implemented as min-heights (`min-h-hero-sm md:min-h-hero-md lg:min-h-hero-lg`):

| Breakpoint | Height | Token               |
| ---------- | ------ | ------------------- |
| Mobile     | 422px  | `--spacing-hero-sm` |
| Tablet     | 398px  | `--spacing-hero-md` |
| Desktop    | 676px  | `--spacing-hero-lg` |

- Mobile hero padding-y is hero-specific **48px** (`py-12`), not the 32px
  section token; tablet/desktop use the section tokens (64/96).
- Stack gaps: title (eyebrow→headline) 8px; title→body 12/16/16px;
  header→CTAs 20/24/24px; CTA row gap 8 (stacked) / 12 / 16px.
- Body copy width: full (mobile) / 480px (tablet) / 680px (desktop).
- Hero CTAs are **40px tall** (`h-10`, hero-specific — the global
  `--spacing-button-h` 44px still applies elsewhere).
- The hero sits directly under the 64px nav (announcement bar removed).

### Content stack

- Gap between eyebrow / headline / body / CTA wrap: **8px** (`gap-2`, Figma `spacing/8`)
- CTA wrap top padding: **16px** (`pt-4`)
- CTA button gap: **16px** side-by-side on tablet/desktop (`gap-4`), **8px** stacked on mobile (`gap-2`)
- Content max width: **660px** desktop, **672px** tablet, full width (327px frame) mobile — implemented as `max-w-[660px]`

## Typography scale

All sizes are tokens in `app/globals.css` (`--text-*` with line-height,
letter-spacing, and weight sub-values baked in).

### Display headline — Satoshi Bold (`font-display`) — 2026-06-11 rev

| Breakpoint | Size | Line height | Tracking | Class             |
| ---------- | ---- | ----------- | -------- | ----------------- |
| Mobile     | 32px | 40px        | -0.5px   | `text-display-sm` |
| Tablet     | 52px | 60px        | -1.25px  | `text-display-md` |
| Desktop    | 64px | 72px        | -1.5px   | `text-display-lg` |

Desktop headline has a hard two-line break after the first sentence (per Figma).

**Homepage hero refresh (Figma `5552:9939`, 2026-06-24):** copy is now "Show up
for your people. Everywhere, every time."; the desktop headline is **72 / 82 /
−3px** — token `--text-ds-hero` (`text-ds-hero`), which replaces `text-ds-h1` at
`lg`. Body copy: "The platform behind recognition, swag, and gifting worldwide.",
with `--color-hero-body` = `#cccccc` and +0.25px tracking. Scrims: a base 90°
scrim (`--gradient-hero-base-scrim`, `.65/.45/.2/.05`) sits under the existing
a11y 90° scrim so the two together match the Figma. `hero-bg.png` (1672×941)
already is the new building photo.

### Eyebrow — Overpass Bold, uppercase (`font-sans uppercase`) — 2026-06-11 rev

Solid leading (line-height = size), 10% tracking:

| Breakpoint | Size | Line height | Tracking | Class             |
| ---------- | ---- | ----------- | -------- | ----------------- |
| Mobile     | 12px | 12px        | 1.2px    | `text-eyebrow-sm` |
| Tablet     | 14px | 14px        | 1.4px    | `text-eyebrow-md` |
| Desktop    | 16px | 16px        | 1.6px    | `text-eyebrow-lg` |

### Body copy — Overpass Regular (`font-sans`), color `text-hero-body`

| Breakpoint | Size | Line height | Class          |
| ---------- | ---- | ----------- | -------------- |
| Mobile     | 14px | 22px        | `text-body-sm` |
| Tablet     | 16px | 24px        | `text-body-md` |
| Desktop    | 18px | 28px        | `text-body-lg` |

### Subtitle — Overpass SemiBold (`font-sans`) — PDL "Big Semi 1.2"

Emphasized supporting line under a headline (e.g. the Catalog subhead).
In the Catalog, card titles use `text-heading-sm` (Satoshi Bold 24/32) and
card eyebrows use `text-eyebrow-sm` — both per the Product Design Library.

| Size | Line height | Weight   | Class           |
| ---- | ----------- | -------- | --------------- |
| 18px | 24px        | SemiBold | `text-subtitle` |

### Button labels — Overpass SemiBold, uppercase

All button variants (filled, white, outline) share one label style
(Figma `Universal/Button/Desktop`):

| Size | Line height | Tracking | Class                 |
| ---- | ----------- | -------- | --------------------- |
| 12px | 16px        | 1.16px   | `text-button-primary` |

(2026-06-11: the hero secondary button was 15/15/+0.5 in an early frame;
corrected in Figma to match the universal 12px label, and the
`text-button-secondary` token was removed.)

## Buttons

Shared geometry (all breakpoints):

- Height: **40px** → `--spacing-button-h` → `h-button-h` (**user decision
  2026-06-12: 40px is the system height — supersedes the 44px recorded
  from Figma**; every pill site-wide rides the token: nav, hero, section
  CTAs, footer, mobile menu, skip link)
- Padding X: **24px** (Figma `spacing/24`) → `--spacing-button-x` → `px-button-x`
- Radius: **22px** (full pill) → `--radius-button` → `rounded-button`
- Mobile: full width, stacked vertically; tablet/desktop: intrinsic width, side by side

### Primary ("Get started")

- Background: white; label color `text-brand-hero`
- Drop shadow: `0 1px 1px rgba(0,0,0,0.04)` → `shadow-button`
- Inner highlight: `inset 0 1px 0 rgba(255,255,255,0.6)` → `inset-shadow-button`

### Secondary ("Talk to sales")

- Transparent background, **1px solid white** border, white label

## Hero section assets

- Background photo: `public/hero-bg.png` (1672×941, exported from Figma),
  rendered with `next/image` `fill` + `object-cover`, `priority`, behind the
  scrim gradient.

### Hero audit package (2026-06-12 — applied to code + all 3 WIP heroes)

- CTAs on the system pill — and the SYSTEM is now 40px: the user moved
  `--spacing-button-h` itself to 40 (2026-06-12), so the hero is no
  exception and every button site-wide matches it
- Outline CTA border **2px** (1.5px was approved but Chrome quantizes
  border widths to whole device px — at DPR 1 it rendered as 1px;
  Shopify's hero secondary is 2px)
- Hover: primary `white → grey-100`, outline fills `white/10`
  (200ms transition-colors)
- **Ken-Burns settle** on the photo: scale 1.06 → 1 over 24s,
  `cubic-bezier(0.16,1,0.3,1)`, one-shot, compositor-only transform,
  reduced-motion disables — interim liveliness until a brand hero video
  exists (Shopify runs autoplay video)
- Focus: CTAs use the white ring override; skip link + global ring system
  shipped alongside (see Page-level gates)
- Measured Shopify hero parity: gutter x=242 vs ours x=243; content zone,
  subcopy measure, and CTA pattern equivalent; headline 96/96-w400 vs our
  64/72 Satoshi Bold = brand voice, not a gap

---

# Homepage sections

Full homepage Figma frames: desktop `1:62043` (1440), tablet `1:66912` (768),
mobile `1:62690` (375). Section order: SiteHeader → Hero → TrustBand →
EveryWay → RedactedPoster → Infrastructure → StadiumWay → Catalog → ScaleMap
→ TeamsTabs → Occasions → Testimonials → PageClose.

## Normalization pass (2026-06-12 — APPLIED to code + WIP proposal)

First staged in the WIP frame `418:10625`, then applied to the live code
the same day per user direction ("local and the design must be
identical"). The CANONICAL Figma section frames remain untouched — the
designer should still bless the 48px rhythm there. Based on shopify.com
measured live
2026-06-12 at 1920: container 1420px (= our `--container-content` ✓),
section paddings 64–128, stacked heading→content gaps 64–72 at their 55px
heading scale, card radius 12 / large-media radius 16, and NO eyebrows on
most sections (kickers are optional — our per-section eyebrow variance is
fine as-is).

- **Heading→content gap: 48px desktop everywhere** (was 32/40/48 mixed;
  matches Shopify's rhythm scaled to our 48px headings/1200 container;
  Infrastructure 205:12251 already used it). Tabbed sections keep
  tabs→panel tight (24) — the 48 applies to heading-block → tabs (done via
  heading-block padding-bottom). Below lg stays 24.
- **Radius rule: 12px cards, 16px reserved for dark full-bleed media
  panels (Infrastructure)** — held constant across breakpoints (fixed:
  Catalog cards + Teams photo were 16 on sm/md, 12 on lg).
- **ScaleMap heading onto heading tokens** (was arbitrary 48/58 −0.72 →
  48/54 −1; mobile 24/30 → 24/32).
- **Footer "OUR BRANDS" hairline** `#C7BCB3` (off-palette, stroke on
  "Line 57") → white 10%, matching the legal-bar divider.
- **Canonical desktop frame carried 3 stacked TeamsTabs layout
  explorations** — the two non-canonical ones were removed from the
  proposed page (1:62043 itself untouched).

SHIPPED 2026-06-12 (all verified via computed styles in the browser):
`lg:gap-12` on EveryWay/StadiumWay/ScaleMap/Testimonials sections;
TeamsTabs keeps section `lg:gap-8` + heading block `lg:pb-4` (heading→tabs
48, tabs→panel 32 — mirrors the Figma heading-pad trick); `rounded-card`
on Catalog cards + Teams photo at ALL breakpoints; ScaleMap heading →
`text-heading-sm/md/lg` tokens; footer hairline → `bg-white/10`.

**WIP desktop page hero/nav (2026-06-12):** converted to match the live
transparent-overlay nav — nav is an absolute transparent layer over the
photo (white logo/links/chevrons, white pill with ink label), hero frame
740px with 160px top padding (= live `lg:pt-[10rem]`), and the 180deg top
contrast scrim added (0.7 → 0.62 @ 40% → 0). Tablet/mobile WIP pages still
show the old white-bar nav — convert when those breakpoints are audited.

**WIP margin grid (2026-06-12, user-flagged):** the WIP page had THREE
grids — nav header at 64 (product-nav spec), sections at 120 (old Figma
margins), live at 90 (Shopify system). Moved the whole WIP desktop page
onto 90: nav header, hero (content row now FILLs pad-to-pad, x=90 like
live), and 9 full-width 120-padded rows; sections' fixed 1200 inner caps
centered — dark sections (Infrastructure/ScaleMap) now match live
EXACTLY (live = 90 pad + 1200 cap centered at x=120). Remaining known
delta: WHITE sections' inner fixed-1200 rows sit centered (content x=120)
while live stretches white-section content to x=90 (1260 wide at 1440) —
true each section's inner rows/columns to FILL during its audit round.
Tablet/mobile WIP pages still on Figma 48/24 margins (live: 30/16) —
align when those breakpoints are audited.

## Site Header (`SiteHeader.tsx`)

Figma: desktop 1:62045, tablet 1:66913+1:66916, mobile 1:62691+1:62694.

**Announcement bar** — REMOVED from the design (2026-06-11 Figma rev); the
sticky nav is now the topmost element.

**Nav bar**

- **Fixed + transparent-to-solid** (Shopify pattern, approved 2026-06-11;
  not in Figma): at the top of the page the bar is transparent over the hero
  photo — white links, white CTA pill, and the standard logo lockup
  recolored white via CSS `brightness-0 invert` (NOT an asset swap — both
  states must keep identical geometry so nothing shifts; verified
  pixel-identical 2026-06-11). Past 8px of scroll it transitions (300ms) to
  the Figma design: white bar, ink text, multicolor logo, dark pill, shadow.
  The open mobile menu forces the solid state. Because the header is `fixed`, Hero.tsx adds 4rem to its
  min-height and top padding so content keeps its Figma position (total
  hero block = 740px at desktop, matching Figma's nav+hero frame).
- `bg-surface-base`, header shadow `0 4px 12px rgba(0,0,0,0.08)`
- Padding: mobile `px-section-x-sm py-4`; tablet `md:px-section-x-md`; desktop `lg:px-section-x-lg lg:h-16` (margins follow the Shopify system)
- **"Ways to Engage" mega-menu** (`EngageMenu.tsx`) — REDESIGNED 2026-06-11
  on the shopify.com "Products" dropdown pattern (user request; supersedes
  the Figma 249:19205 left-photo layout, though its capability groups/items
  are retained). Full-width white panel under the nav, desktop only. Opens
  on hover or click; closes on header mouse-leave, Esc, or hovering another
  nav item; nav forces solid while open; 250ms slide-down, reduced-motion
  disabled. Layout:
  - Densities tightened 2026-06-11 to Shopify's measured metrics ("too big"
    feedback): **40px row pitch**, bare 20px icons (no chips), headers
    12px semibold +0.72px with 6px gap to items, 28px between groups,
    main padding 32px. Panel ≈543px total (Shopify ≈560).
  - **Row labels SemiBold 600** (2026-06-11 weight bump per user — was
    Medium 500; rail "Popular" links bumped too). Unified with Impact's
    use-case titles so both menus share one primary-link weight.
  - **Open/close animation** (Shopify-measured 2026-06-12): state-driven
    TRANSITIONS (not mount keyframes), panel always mounted so motion can
    reverse mid-flight. OPEN: body slides translateY(−100% → 0), 300ms
    `cubic-bezier(0.215,0.61,0.355,1)` in an overflow-hidden wrapper;
    content fades + slides −24px with 50ms opacity delay. CLOSE: pure
    slide-up retract, 350ms, **content stays opaque** (no fade-out; it
    resets via a 0s transition delayed 350ms). Close plays on header
    mouse-leave, Esc, AND hovering another nav tab. While the menu is
    open the nav bg transition is SUPPRESSED so the transparent→white
    switch is instant (no white flash under the panel).
  - **Close is SEQUENCED (user-flagged 2026-06-12): the nav holds solid
    for the full 350ms retract, then fades to transparent** — a 350ms
    `drawerSettling` hold feeds the header's `solid` state, event-driven
    from every close path (mouse-leave, Esc, trigger toggle, plain-link
    hover); opening cancels the hold. Previously the bar went transparent
    over the still-retracting white drawer. Verified: solid at +60ms
    post-Esc mid-retract, transparent after settle.
  - **Main**: 3 balanced columns (Recognition+Swag / Snacks+Gifting /
    Events), reading order flows down each column. Group headers
    `accent-water` uppercase. Items = **16px icon in a 20px alignment
    column** (stroke-2; sized down 2026-06-12 — 20px boxes read oversized
    next to 14px labels) + Overpass Medium 14/20 `ink` in 40px rows.
  - **Figma source of truth**: the dropdown was pushed to Figma 2026-06-12
    as frame "ENGAGE — Code sync (Shopify-style) · dev handoff"
    (node 261:13119, Home page, below 249:19205) for manual design
    iteration — re-sync from there when the designer updates it.
  - **Item hover choreography** (Shopify-measured, adopted 2026-06-11): the
    hovered row keeps full color (no color shift); its SAME-GROUP siblings
    dim to 50% opacity (300ms, via `:has()`); a hidden 14px arrow after the
    label fades in and slides 4px right. Other groups/columns unaffected.
    Disabled under `prefers-reduced-motion`.
  - **Group headings are links** to their category overview pages
    (2026-06-11; carries the function of the old Figma "VIEW X →" CTAs).
    Arrow-reveal + **underline on hover** (3px offset); hovering a heading
    does NOT dim the rows beneath it. `aria-label="View all <category>"`.
  - **Optical alignment** (2026-06-11): icon→text gap is 16px (Shopify
    exact). Overpass glyphs sit ~1px low in their box, so row labels get a
    −1px translate and heading arrows a +1px translate — box-centering
    alone leaves text looking low next to icons. Re-check this nudge if the
    body font ever changes.
  - **Right rail**: inset card (296px, `surface-subtle`, rounded-card,
    p-24): "LATEST AT STADIUM" header, featured card (104px photo,
    14/20 semibold title + 13/18 grey-500 caption), "POPULAR" bullet list
    (6px `accent-water` dots). **Copy INVENTED.**
  - No divider between the nav and the open panel — one continuous white
    surface (Shopify). The "More from Stadium" bottom band was removed as
    redundant (2026-06-11). Panel ≈493px.
  - Content capped by `max-w-section`. The mobile menu keeps plain links.
- **"Impact by Team" mega-menu** (`ImpactMenu.tsx`, Figma **279:13122 =
  CURRENT SOURCE FRAME** — the designer's rev of the code sync, re-synced
  2026-06-11; layout origin 249:19981 + 249:19689 variant copy;
  HARMONIZED 2026-06-12 with EngageMenu's system
  per user feedback — structure kept, surfaces/margins/colors/hovers
  unified): outer = same `px-section-x-lg py-8` + `max-w-section` + 40px
  gaps as Engage. Left sidebar = audience switcher as a PLAIN TEXT RAIL
  (208px, no card surface — "breathing" rev 2026-06-11 per user feedback;
  was a 280px `surface-subtle` inset card with 48px pills): NO header —
  the "TEAMS" label was REMOVED in the 279:13122 re-sync (rail starts
  directly with the rows), 7 rows at a **48px pitch** (2026-06-11 user
  feedback: the frame's 40px read too tight next to Engage's grouped
  rhythm), 14/20; active = semibold ink + chevron; inactive **medium**
  `grey-500` (`hover:text-ink`); switches on hover/click — active style
  IS the hover feedback. Right: headline uses the `text-heading-md` TOKEN
  (the 249 frame specced a near-duplicate arbitrary 32/40 −0.25px;
  279:13122 specs 32/40 −0.48px = the token exactly);
  "USE CASES" header in the SHARED menu header style (12px semibold
  +0.72px `accent-water`); 2-column use-case grid (40px column gap, 28px
  block gap = Engage's group gap — 2026-06-11 consistency pass, supersedes
  the 24px in 279:13122; items use the
  SHARED title+caption block pattern — 14/20 SemiBold ink + 13/18
  `grey-500`, identical to Engage's rail card — plus the SHARED dim+arrow
  hover choreography defined in SiteHeader); 352px team photo in a
  rounded-card (was 384px — slimmed with the rail so the use-case columns
  gain ~140px and descriptions stop hard-wrapping). The Figma "TRUSTED
  BY" band was REMOVED (user decision 2026-06-12; `menu-trustedby.png`
  kept in public/ if it returns). Team switches cross-fade 200ms (the
  fade class moves to the newly-active panel — no remount). PANEL HEIGHT
  IS FIXED to the tallest team (user decision 2026-06-11 — the drawer
  height was jumping while hovering down the rail): all 7 team panels
  stay mounted, stacked in one grid cell, inactive `visibility:hidden`,
  so the cell auto-sizes to the tallest variant with NO hardcoded
  height; photos stretch to the stack (full-height on short teams too);
  short teams (Sales, Finance) show whitespace below their use cases —
  accepted trade-off. All copy from the Figma variant frames; photos are
  node exports (`menu-team-*.png`).
- **Two-menu drawer behavior** (Shopify, 2026-06-12): both triggers share
  one drawer. Hovering between "Ways to Engage" and "Impact by Team" while
  open SWAPS the content inside the drawer (200ms cross-fade, drawer stays
  put — verified no retract); hovering a non-menu nav item retracts it.
  The last menu stays rendered during the close so the retract never shows
  an empty panel. Other nav items have no dropdowns (not designed yet).
- Logo lockup 132×32: `/header-logo-mark.svg` (13×22) + 8px + `/header-logo-wordmark.svg` (101×22)
- Desktop links (lg): gap-10, `text-body-md tracking-[0.25px] text-ink`,
  **uniform weight — no hardcoded active item** (2026-06-12: the bold
  "Ways to Engage" was a static-mockup artifact from the Figma frame's
  active state; Shopify keeps homepage nav uniform. The `active` flag and
  bold style remain in code, reserved for the real current page once
  section pages exist — set from the route, never hardcoded). Items:
  Ways to Engage, Impact by Team, The Proof, Catalog, Pricing
- **Menu-trigger chevrons + hover states (2026-06-12, from the Shopify nav
  audit):** the two mega-menu triggers carry a 12px chevron (gap 6px,
  rotates 180° over 200ms while their drawer is open); ALL nav links +
  triggers hover-dim (`ink → grey-600` solid state, `white → white/75`
  transparent state); the sales pill hovers `cta-fill → grey-700` (solid)
  / `white → grey-100` (transparent). LAUNCH GATE: The Proof / Catalog /
  Pricing are dead `#` links — every nav item must resolve before
  go-live. (Shopify nav measured 2026-06-12: sticky 72px bar, 4 items at
  14px, chevrons on dropdown triggers, one text + one pill CTA — our nav
  matches structurally; deltas were chevrons + hovers, now closed.)
- Desktop actions: text button (`text-button-primary uppercase text-ink`) + dark pill (`bg-cta-fill text-cta-on h-button-h rounded-button px-button-x` + `inset-shadow-button-dark`)
- Below lg: hamburger (24×16, three 2px `bg-ink` bars) opening the mobile
  panel. **Mobile accordion menu (2026-06-12, Shopify mobile pattern):**
  "Ways to Engage" and "Impact by Team" are accordion buttons (chevron
  rotates 180°, `aria-expanded`, single-open — opening one collapses the
  other, fresh-closed on every panel open). Engage expands to its 5
  groups (accent-water 12px labels) with all 22 item links (`text-small`
  40px rows, grey-700); Impact expands to the 7 team links. Content data
  is imported from the menus' exported consts (`COLUMNS` in
  EngageMenu.tsx, `TEAMS` in ImpactMenu.tsx — single source). Height
  animates via the grid-rows trick (300ms, motion-reduce snaps); the
  panel caps at `100dvh−4rem` and scrolls. Before this, the mega-menu
  content was UNREACHABLE on touch devices.
  **WIP pages (tablet+mobile) converted same day:** transparent overlay
  nav over the hero (white logo/burger), heroes +64px with top padding
  compensated, 180deg top scrim added, and all full-width rows moved to
  live margins (tablet 48→30, mobile 24→16). Open-accordion spec frame on
  the WIP board ("SPEC · Mobile nav — open accordion").

## Trust band (`TrustBand.tsx`)

Figma: 107:946 / 110:946 / 113:943.

- White strip; vertical padding 24/40/56, eyebrow→marquee gap 16/24/32
- Eyebrow `text-eyebrow-sm/md/lg`, color `grey-500`, tracking overridden to 10% (1.2/1.4/1.6px) — **is the section's `h2` since 2026-06-12** (`font-normal`, visually unchanged; puts the band in the document outline)
- **Pause mechanism (2026-06-12 rev 2 — user: "no visible button; hover
  pause is smoother"), WCAG 2.2.2 with ZERO visible chrome:**
  - Pointer: hovering the strip pauses (`animation-play-state` via CSS
    `:hover`), leaving resumes — no UI
  - Keyboard: focus-REVEALED 40px control (skip-link pattern: `opacity:0`
    - `pointer-events:none` until `:focus-visible`), `aria-pressed`,
      state-swapped label, toggles via inline style
  - Touch: tapping the strip toggles, gated to `(pointer: coarse)` so
    mouse clicks never freeze it; button click stops propagation
  - Reduced motion: loop off, control `display:none`
- Verified 2026-06-12 (rev 2): real-mouse hover→paused / leave→running;
  button at rest 0/none, focused 1/auto (`:focus-visible` matched,
  transition-off probe), click→paused+pressed; coarse-patched tap
  toggles both ways; h2 in outline; dupes `aria-hidden`; eyebrow 4.66:1
  solid white. Earlier matrix (375/768/1024/1440) unchanged. Shopify
  note: shopify.com ships NO logo band — ours held to their standards
- Marquee: height 28 (mobile/tablet) / 40 (desktop); **4 track copies, keyframes shift exactly one copy (−25%)** so the loop is continuous on any viewport up to ~2600px ((copies−1)×copyWidth must exceed viewport); 45s linear infinite; gap 32/40/56 (= trailing padding per copy); edge fades 56/56/180px; reduced-motion disables
- Logos (single SVGs in public/, same size at ALL breakpoints).
  **OPTICALLY NORMALIZED 2026-06-12** via canvas ink-area audit (dark-pixel
  mass vs set median, not raw Figma px — raw px left Bloomberg at 1.78×
  the median, dominating the strip): trust-google 80×26, trust-spotify
  81×24, trust-amazon 77×23, trust-pinterest 87×22, trust-accenture 91×26,
  trust-bloomberg 90×16, trust-salesforce 37×26, trust-netflix 75×20.
  Result: every mark now 92–107% of median (was 79–178%). Verified by
  re-measuring ink area at rendered sizes.
- **Logo strength `opacity-70`** (2026-06-12): the premium-restraint
  pattern (Stripe/Linear) — softens full-black marks to grey so the band
  sits under the page's grey-toned voice. Logos are brand marks
  (WCAG-exempt); still read clearly at 70%.

## Every way you show up (`EveryWay.tsx`)

Figma: 1:62096 / 1:66950 / 1:62728. **States: 141:84860.**

### Headline states (Figma 141:84860)

The headline is interactive — each sentence is a state trigger (active
sentence `ink`, others `grey-400`; client component):

| Sentence (trigger)                 | Card row                                                                                             |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------- |
| "Every way you show up." (default) | 5 pillars (layout below)                                                                             |
| "However you want."                | Company Stores, Bundled Kits, Automations, Sender Choice, Recipient Choice — 240×320 tiles, 20px gap |
| "For everyone you care about."     | Employees, Customers, Partners, Prospects — 295×320 tiles, 24px gap                                  |
| "Whenever it matters."             | Onboarding, Milestones, Events, Holidays — 295×320 tiles, 24px gap                                   |

States 2–4 tiles are **pending-asset placeholders** per the design: bg
`#f0f0f7`, 1px dashed `#8C94A6` border, `rounded-card`, yellow
`accent-turmeric` "PENDING ASSET" pill (Satoshi Bold 9px +0.72px, `#04050B`
dot + text), title Satoshi Bold 20/28 below. Swap tiles for real photo cards
when assets land in Figma. The states are designed at 1440 only — below `lg`
the card rows horizontally scroll (extrapolated, not in Figma).

**5-card setup + unified geometry (2026-06-12, user-approved):** every
state now shows FIVE cards sharing state 1's geometry — fluid equal
columns at lg (min-w-0 flex-1, ~233px at 1440), gap 24, 320px image,
12px radius, title below; below lg one 240px tile width in the scroll
row. The old special cases (240px/gap-20 "narrow" state, 295px tiles,
5/5/4/4 counts) are deleted. New 5th cards — **"Candidates"** (everyone)
and **"Life Moments"** (whenever) — are PROPOSED copy. WIP states board
mirrors all of it (uniform 221px tiles at the board's 1200 grid, stand-in
photos on the two new cards). WIP radius correction (user-caught
2026-06-12): the desktop page's pillar tiles sat at 4px from the old
canonical frame — fixed to 12 (tablet's 8px is CORRECT: live steps 8→12
at lg); the Events pillar now carries the proposed photo on all three
pages, matching the board.

**Aspect-lock (2026-06-12, user decision — supersedes the Figma fixed
heights):** all EveryWay media is `aspect-[221/320]` at every breakpoint
— pillar tiles (was fixed 320px at lg → ratio drifted with fluid widths;
was a 120px squat strip at md), pending tiles, and the mobile row
thumbnail (64×93 — a miniature of the same crop, narrowed 88→64 so 5
rows + headline fit a phone viewport; row layout unchanged).
Verified 0.691 at 375/768/1024/1440 on both card types. `sizes` retuned
(32rem lg / 18rem md / 12rem sm — portrait slots, landscape sources,
cover scales by height). WIP tablet tiles + mobile thumbnails resized to
match. Single upload per pillar now reads identically everywhere.

**Headline wrapping + card upgrade + viewport fit (user-flagged 2026-06-12):**

- **Orphan fix:** the trailing "For" was unintentional inline wrapping.
  Sentences are now unbreakable units at md+ (`md:inline
md:whitespace-nowrap` — wraps happen BETWEEN sentences only); on mobile
  each sentence is its own `block` line (no orphans, bigger tap targets).
  Verified: no mid-sentence break at 320/375/768/1024/1440.
- **Card design:** desktop/tablet cards now render the `desc` line under
  the title (grey-600 `text-small`). This copy has existed in the Figma
  layers since the start, clipped/unrendered — REAL copy, not invented.
  No arrows/hover-lift on the big cards (not links yet — honesty rule;
  add when they become links). Mobile rows clamp desc to 2 lines.
- **Sticky corner video (user idea, DEFERRED):** a Shopify-style
  pass-the-hero corner mini-player is a launch enhancement tied to the
  brand-video asset — building it for a still photo would be a fake
  player (honesty rule). Logged with the hero-video swap.
- **Card descriptions REMOVED from desktop/tablet (user decision
  2026-06-12: "i dont like text below cards"):** desktop/tablet pillar
  cards are title-only (matches the Figma accordion face); mobile rows
  KEEP their `mobileDesc`. Verified live: 0 visible desc paras at 1440,
  5 at 375.
- **Desktop WIP content-width fix (user-caught 2026-06-12 — "120 vs 90"):**
  the EveryWay instance's headline + Pillars Accordion were FIXED at
  1200 and centered → content sat at x=120 while every sibling + live
  are at 90. Set both to FILL (1260) and the inner cards to FILL (fluid,
  gap 24) → content now at x=90 matching live. Tablet (30) + mobile (16)
  were ALREADY correct (batch content-left audit gave false 0s by
  catching full-bleed card images as leftmost — verify margins via the
  frame's own paddingLeft + a targeted headline-left measure, NOT a
  blind leftmost-descendant scan).
- **WIP synced (2026-06-12):** mobile
  thumbnails resized 88→64px (0.691 held); mobile headline text node
  rewritten with per-sentence line breaks + restored ink/grey coloring
  to match the code's stacked mobile headline (was showing the "For"
  orphan as static text flow).
- **Single-viewport (mobile):** section ≈ 600–650px content (headline ~120
  - 5 rows ~490 + gaps), 754px including py. FITS modern phones (iPhone
    14/15, Pixel — ~700px+ visible); BORDERLINE on iPhone-SE-class
    (~560px visible — last card below fold). 5 stacked tappable rows +
    headline have a ~590px floor; tightening further trades against the
    no-orphan stacked headline. DECISION 2026-06-12 (user: "take the best
    call"): LEAVE AS-IS — content (headline + 5 cards) ≈ 570px fits
    standard phones in one viewport; the original sin (horizontal scroll
    hiding 3.6 cards) is fully solved; cramping for marginal SE-class gain
    would degrade the 99%.

**Sub-lg pattern unification (user-flagged 2026-06-12 — "5 cards off
the viewport defeats the purpose"):** the horizontal scroll rows for
states 2–4 are DELETED. Mobile: states 2–4 use state 1's vertical
row-card list (64×93 mini thumbnail + title + arrow — all five visible
in normal page scroll; pending rows show a dashed mini-thumb +
turmeric dot). Tablet: states 2–4 use state 1's 5-up fluid grid (fits
without scrolling). One pattern per breakpoint across all four states.
Also fixed while verifying: **every animated list now has
overflow-hidden** — the +3rem slide-from transiently widened the page
below lg (400ms horizontal scroll jiggle on phones; pre-existing on
state 1 mobile too). Verified: document scroll width ≤ viewport at
375/768 in all states, worst-case animation frame included.

**Reveal flow (measured 2026-06-12): shopify.com ships NO scroll-reveal**
— their card grids and all ancestors are static pre/post scroll (opacity
1, no transforms/transitions). Their motion answers interaction only —
which is exactly our state-change stagger (0.4s, 50ms/card,
direction-aware). Decision: keep ours, add no scroll-entrance theater.

**Auto-advance pause (2026-06-12, WCAG 2.2.2):** rotation pauses while
the pointer hovers the section or keyboard focus is inside it (native
listeners in the shared `useAutoAdvance` hook — EveryWay, StadiumWay and
TeamsTabs all inherit it); resumes when both clear; first click still
stops permanently; reduced-motion still disables entirely.

Headline trigger hover (not in Figma; approved 2026-06-11): inactive
sentences `grey-400 → grey-600` on hover; active stays `ink`. The pillar
CARDS have no hover state.

State-change animation (not in Figma; approved 2026-06-11): cards slide in
40px + fade, 0.4s `cubic-bezier(0.16,1,0.3,1)`, 50ms stagger per card.
Direction follows the headline reading order — selecting a later sentence
slides cards in from the right, an earlier one from the left. No exit
animation (new row replaces instantly under the incoming slide). Disabled
under `prefers-reduced-motion`; no animation on initial page load.

Auto-advance (shopify.com headline-tabs behavior, measured live and adopted
2026-06-11): rotates to the next sentence every 5s, but ONLY while ≥40% of
the section is in the viewport (IntersectionObserver). The first user click
takes over permanently (rotation never resumes). Disabled entirely under
`prefers-reduced-motion`.

- White bg, section padding tokens; heading→content gap 24 (sm/md), 40 (lg)
- Heading two-tone: active sentence `ink`, rest `grey-400`. **NARRATIVE
  scale `text-narrative-sm/md/lg` (Satoshi BOLD 700: 26/38/54)** — larger
  than the section-heading scale so this long statement headline has
  presence and fills the content width (2026-06-12). Was `text-heading-lg`
  (48). A Medium-weight trial was reverted — Bold fits Stadium's voice;
  the two-tone (active ink / rest grey) keeps the big Bold from reading
  heavy. Per-sentence coloring + md+ nowrap unchanged.
- Desktop: 5 static cards 221px wide, gap 24; image 221×320 rounded-xl; title Satoshi 20/28. **No hover state** — longer descriptions exist in the Figma layers but are clipped/not shown; the section's only interaction is the headline state switching
- Tablet: 5 equal tiles, gap 16, image h-120 rounded-lg, title Satoshi 17/24
- Mobile: vertical list, gap 12; tile = 1px grey-200 border rounded-xl, 88px image column, title Satoshi 16/22, desc `text-small`, 20px arrow icon
- Assets: ewysu-recognition/swag/gifting/snacks.png; Events pillar = grey-200 placeholder (per Figma)

## Redacted / Poster (`RedactedPoster.tsx`)

**CURRENT DIRECTION (2026-06-13): V12 FLAGSHIP — custom Canvas-2D dot-globe.**
LIGHT, WHITE bg, per the user. cobe (V8–V11) was dropped — on a real screen
its dotted ball read "nowhere close to Shopify". Replaced with a CUSTOM
Canvas-2D dot-globe in `ChaosGlobe.tsx`:

- **Real continents** wrap the sphere — dot positions come from
  `public/map-dot-mask.svg` (a dotted equirectangular world map, 3582 dots),
  precomputed by `scripts/gen-globe-dots.js` → `app/data/globeDots.ts`
  (flat [lat,lon] array, ~37KB). Each dot → unit-sphere xyz at module load.
- **Rotation on a tilted axis** (spin around Y, then tilt `TILT=-0.42` rad
  around X), idle auto-spin + **drag-to-rotate**, front-hemisphere culling,
  depth-faded dots, faint blue sphere body + limb ring for 3D read.
- **City-anchored pills** — each DIY-logistics tag is pinned to a city
  (lat/lon, spread across all longitudes + both hemispheres so they don't
  stack); projected each frame, they sweep WITH the spin and fade out as they
  round the limb (duck behind the globe). Glowing markers (alarm one red).
- Stadium-blue (`DOT_RGB 11,122,252`) on white; soft CSS atmosphere glow
  behind the canvas. Tuning knobs are the consts at the top of `ChaosGlobe.tsx`.
  WHY Canvas-2D not WebGL/three.js: full color/bg control, lightweight (no
  heavy dep), and — critically — it RENDERS in the occluded remote browser so
  it's screenshot-verifiable (WebGL throttled to partial frames; see
  [[per-breakpoint-signoff]]). VERIFIED by me via screenshot: continents wrap +
  rotate (two frames 2s apart showed the spin), pills anchored + spread, white
  bg, no overflow, no console errors. PENDING user eyeball: drag feel, exact
  blue/scale/tilt to taste. ONLY step beyond this: a photoreal textured earth
  (three.js + earth texture/normal/emissive maps) — bigger build, offer only if
  the dot-globe isn't enough. This V12 hits the user's 4 asks: map wrapping the
  sphere ✓, pill movement ✓, tilted-axis rotation ✓, white bg ✓.
  Maps the four asks from the user's Shopify "Rock steady. Blazing fast."
  reference (large off-center tilted globe, brand-color grainy continents,
  moving location pills) into our palette.

REFINEMENTS (2026-06-13, after user feedback "some jitter in the rotation /
see what tags to use to show all the things / left typography can be better"):

- **Jitter fixed** — rotation is now TIME-BASED (phi advances by elapsed
  seconds with a 50ms cap), and pills are positioned by `transform` only (no
  `left/top` reflow per frame); sphere gradient cached. These were the two
  jitter sources (fixed-per-frame increment + per-frame layout thrash).
- **Tags expanded 8 → 12**, curated to span the whole cross-border headache:
  Customs, Import duties, VAT & GST, HS codes, Restricted items (compliance),
  14 currencies (finance), 3PL contracts, Carrier SLAs, Failed delivery
  (logistics), Address formats (recipient), Local sourcing, Lead times. Each
  pinned to a spread city; ~5 show on the front face at a time. Alarm marker
  red corrected to accent-punch #ff5b77.
- **Left typography strengthened** — grouped into a "problem" block (eyebrow
  14 + setup now 24 `statement-lg`, bold ink figures) and an "answer" block
  (headline 48 `heading-lg` Satoshi + supporting 18 `statement-md` grey-700),
  with a clear break between; `text-pretty`/`text-balance`, ~30rem measure.
- **Free drag both axes (2026-06-13)** — horizontal drag spins (`phi`, Y),
  vertical drag tilts (`theta`, X) clamped to `[TILT_MIN -1.2, TILT_MAX 1.2]`
  so it can't flip over the poles. Verified: a synthetic 170px down-drag
  visibly re-tilted the globe. (Was X-only before.)
- **Grid placement fixed** — globe was capped at `34rem` and centered in its
  1.1fr track → ~101px dead space each side, right edge short of the container
  (floaty). Now `max-w-[30rem] lg:max-w-none` so at lg it FILLS the track
  (746px @1920 viewport) with its right edge FLUSH to the 1420 content
  container edge (measured globeRightVsContainer = 0); capped + centered when
  it stacks below lg. The grid itself was already correct (1420 centered,
  0.9fr/0.9 + 1.1fr cols, 64px gap) — only the globe's own cap was floating it.

--- earlier (V9–V11, cobe experiments) ---

V9 full-bleed light → user briefly chose DARK (flows into dark Infrastructure
below) → reverted to LIGHT. V11 = saturated cobe "blue marble" on light
(fixed the near-WHITE ghost from earlier via SATURATION) but cobe's dotted
ball still read "nowhere close to Shopify" on a real screen → replaced by the
V12 custom dot-globe. Container removed + left type tokenized since V9.

--- earlier (V8) ---

**V8 FLAGSHIP — animated globe.** The chaos
visual is now an animated WebGL globe (`cobe` ^2.0.1, `ChaosGlobe.tsx`,
client component): a spinning light globe with city markers, the DIY
artifacts (Customs/VAT/HS codes/3PL/Failed delivery…) orbiting it on a
tilted ellipse and fading behind on the far arc; calm Stadium answer left.
Reduced-motion → static; off-screen → paused (IntersectionObserver);
sr-only artifact list for a11y. Globe colors are LIGHT defaults but
**UNVERIFIED — the dev/remote browser throttles WebGL to partial frames
(sphere+markers render, continents+rotation don't), so the globe must be
tuned on a real screen.** Dark globe (dark:1) is the guaranteed-continents
fallback if light washes out. User is verifying on their screen.

--- earlier (V7 static) ---

**V7 "show the chaos" SCENE** — after the
section kept reading "undesigned/wireframe," reframed from telling
(redacted text) to SHOWING (Shopify show-don't-tell): a light treated
gradient panel, calm "Or just use Stadium" answer on the left, the DIY
logistics mess shown on the right (artifact chips — Customs/VAT/HS
codes/3PL/Failed delivery… — scattered over a faint wireframe globe with
tangled connectors). Live in `RedactedPoster.tsx`; Figma scene built into
WIP node **440:1048** (panel `575:887`, chaos field `576:887`) — **FIGMA
IS TEMPORARILY THE SOURCE: the user is tweaking the Figma version and will
hand it back to re-sync into code.** Don't overwrite the live component
from the old versions until the user's Figma tweaks come back. Known gap:
live has a radial edge-fade mask on the chaos field that Figma can't
replicate (chips don't fade at edges in Figma). Constructed in CSS/SVG —
real art assets would take it the last mile (honest ceiling discussed).

--- history below ---

Figma: 1:62097 / 1:66974 / 1:62766. **WIP desktop node 440:1048 REBUILT
2026-06-12 to mirror the live V4** (user: "put the live version here") —
the cloned frame was an older "Bold Statement v3" (light-blue bars,
different copy: "1,000 people… source/file/calculate…"). Rebuilt as
real editable nodes matching live: lead line (Overpass 24/32, "1000
employees" + "23 countries," bold) + redacted body as a WRAPPING
auto-layout (Overpass 24, line-height 48; grey-600 bars rounded-3,
height 30, lg widths 320/180/240/280/360/420/360/280 flowing inline) +
punchline (Satoshi Bold 48/54 −1) + foot card (surface-subtle rounded-12
p-40, callout Satoshi Bold 20/28, outline Talk-to-sales pill). Both-sides
verified at 1440: content-left 90, body 4 lines, section 712px — identical
to live. Tablet/mobile WIP RedactedPoster still the old v3 (rebuild in a
later pass). Hover-reveal can't be shown in a static frame (live-only).

- Bg `surface-base`; section padding tokens; gaps 24 (sm) / 28 (md) / 56 (lg, but lead→body 10px)
- Lead+body: Overpass `text-statement-sm|md|lg` (14/20, 18/26, 24/32) `ink`; desktop bolds "1000 employees" and "23 countries"
- Redacted bars: inline-block spans, radius 3px; heights 16/20/30; widths per bar documented in component; punctuation glued via whitespace-nowrap.
  **POLISHED 2026-06-12 (user: section "read like a wireframe"):** bars
  `bg-grey-700` (was grey-600 — mid-grey reads as a loading skeleton; the
  darker "censored ink" + a soft drop shadow `0 1px 2px rgba(0,0,0,.18)` +
  inner top highlight `inset 0 1px 0 rgba(255,255,255,.12)` makes each a
  tactile redaction object). Hover reveal lifts to `grey-200`, shadow
  removed. Light-mode kept (dark bars on white = ink-on-light, not dark
  mode — user: dark mode is not Stadium's style). Punchline: "Stadium" in
  `accent-water` (one restrained brand spark vs the all-grayscale wireframe
  look). Foot "card" UN-BOXED 2026-06-12 (user: the bordered/shadowed
  card "read like a separate section within a section") — callout + CTA
  are now an integrated row (no fill/border/shadow/padding), so the
  section reads as one cohesive block. Synced to Figma 440:1048 / 550:888.
  NOTE: section still flagged "undesigned" by user — broader composition
  direction TBD (awaiting a reference; light/restrained/non-flagship,
  no dark mode).
- Hover reveal (not in Figma; approved 2026-06-11): on desktop, hovering a bar fades it `grey-600 → grey-200` and reveals underlying copy in `ink` (Overpass 20/30, centered). The reveal copy is invented — Figma bars are empty rectangles; replace when real copy lands. Below `lg` bars stay opaque (too small for text; no hover on touch). Screen readers always get the reveal copy via `sr-only`.
- Punchline "Or just use Stadium.": `text-heading-sm|md|lg` h2
- Foot card: `bg-surface-subtle rounded-card`, p-24 (sm/md) / p-40 (lg); callout `text-callout-sm|md`; outline pill button (border `cta-fill`, `h-button-h rounded-button px-button-x text-button-primary` uppercase)

## Infrastructure dark player (`Infrastructure.tsx`)

Figma: 205:12251 (desktop) / 1:66998 (tablet) / 1:62790 (mobile) —
RE-SYNCED 2026-06-12, supersedes the 1:62135 desktop layout.

- Section gradient `infra-base-1 #1c1d1f → infra-base-2 #0e0f11`; section
  padding tokens (Shopify margins supersede the frames' 24/48/120 px-x);
  heading→player gap 24/24/48
- Heading white `text-heading-sm|md|lg`, desktop max-w 926px (the desktop
  frame's 48/54 −1px = `text-heading-lg` exactly)
- Player max-w 1200: stacks until lg; lg = chapter card 384px (auto
  height — its 8 rows land ≈444px) + video flex-1 fixed 443px, gap 24
- Chapter card (ALL breakpoints): `bg-infra-card #17181b` + 1px
  `infra-border #26282c`, rounded-2xl, p-20 (lg p-24); row gaps 8/4/0
  - Header: "WHAT WE HANDLE" 12/12 Bold +1.6 `grey-400` (tablet 16/16
    Bold +0.96) → desktop 12 SemiBold +1.5 `infra-eyebrow #6b6e74`;
    right side now STATIC "08 STEPS" 12/16 SemiBold `grey-200`
    (desktop `grey-600` +1px); pb 12/10/12
  - Rows: px-8 py-12 gap-12 (tablet p-8 gap-10, desktop p-12 gap-14)
    rounded-lg; number SemiBold 14 (tablet 12/16, desktop 13)
    `grey-400` (desktop `grey-600`); label 14/20 (`text-small`) Regular
    `grey-400` → desktop 16/22 Medium `infra-row #c9cbcf`
  - Active row: white bg; sm/md number+label SemiBold ink; desktop
    number `grey-400`, label Medium ink. The 3px `accent-water` left
    marker was REMOVED in this rev; timecodes/`DURATION` dropped too.
- Video panel: rounded-2xl, `object-cover`, `#0e0f11` fallback bg. The
  bottom scrim + scrub timeline + center play/fullscreen chrome were
  REMOVED 2026-07-16 (user request) — the panel is now just the clip.
- **Video-per-step (2026-07-16):** selecting a step plays that step's clip
  in the right panel. Clips are data-driven — each `Step` carries an
  optional `video` path (`public/videos/infrastructure/<name>.mp4`); steps
  without one fall back to the `infra-doorstep.png` still. Steps 01–03
  (printing / warehousing / shipping) have clips; 04–08 pending. To add a
  video: drop the file in that folder and set the path on the step.
  - Clips are `muted loop playsInline`, poster = doorstep still, keyed by
    src so each select remounts + restarts with a 0.35s opacity fade
    (`.infra-video-in`).
  - Play is gated to on-screen only (IntersectionObserver, threshold 0.25)
    — the files are 11–23MB, so they don't stream off-screen; pauses when
    scrolled away, resumes on return.
  - `prefers-reduced-motion`: no autoplay/fade; the `<video>` shows its
    poster with native `controls` for user-initiated playback.
- Client component: clicking a chapter switches active row + video

## The Stadium Way (`StadiumWay.tsx`)

Figma: 1:62187 / 1:67044 / 1:62836.

**Interactive tabs (Shopify behavior, adopted 2026-06-11):** the three phase
cards are clickable tabs that switch the panel (fade/slide-up 0.4s), with
5s auto-advance while in view via `useAutoAdvance` (first click takes over;
reduced-motion disables). Phase 01 content is from Figma; **phases 02/03
panel content is INVENTED** (titles, bodies, sub-tab rows, icons) and their
media uses PENDING ASSET placeholders — replace when designed. "The 90 Day
World" card is not a tab (no content exists).

- White bg, section padding tokens; header→content 24/24/32, tabs→card 16/16/24
- Heading `text-heading-*`; subcopy hidden mobile, `text-statement-md` tablet, `text-body-lg` desktop (max-w 680)
- Phase tabs: desktop 4 cards gap-24 `rounded-card` border-grey-200 p-24, number+title `text-callout-md`, desc `text-small`; active = white + `shadow-card` + 3px `accent-water` top bar; inactive text `grey-400` + `shadow-card-soft`. Tablet compact row; mobile 2×2 grid
- Active phase card: `bg-surface-subtle` rounded-2xl, p-24/32/40; lg two-column (left 548px)
- Sub-tab rows: `rounded-card` border-grey-200; icon chip circle (active `accent-water` bg + white icon; inactive `grey-200` bg + `accent-water` icon); labels Satoshi, active `ink` / inactive `grey-400`
- Media: white card with `way-designer.png` (flattened Figma vector mockup, 499×435)
- Assets: way-designer.png, way-icon-world.svg

## Catalog (`Catalog.tsx`)

Figma: 1:62312 / 1:67145 / 1:62935.

- White bg; desktop: sticky left column (486px, `lg:top-section-y-lg`) + scrolling card stack (gap 24); mobile/tablet: header + edge-to-edge horizontal shelf (scrollbar hidden)
- Heading `text-heading-*` ink; body `text-body-md grey-700` → `text-statement-md` → `text-body-lg` ink
- Cards: mobile 258×330 rounded-2xl, tablet 300×400, desktop full×380 `rounded-card`; next/image fill + object-cover over `bg-grey-200`
- White pill label: Overpass SemiBold 12/16 uppercase; mobile short name, md+ "NAME · DETAIL"; desktop h-8 px-24 inset 20px
- Assets: catalog-snack-boxes/branded-merch/gift-cards/luxury-goods/experiences/work-essentials/lifestyle-hobbies.png

## Scale Map (`ScaleMap.tsx`, `ScaleMapParticles.tsx`)

Rebuilt 2026-07-16 — the dark two-column layout previously documented here
(Figma `1:62352`/`1:67172`/`1:62961`, `wide`-breakpoint two-column header +
reach-map canvas, `max-w-band` narrow-desktop band) no longer exists; this
section describes the current build. `--breakpoint-wide` / `--container-band`
tokens in `globals.css` are leftover from that prior layout and are unused by
any current component — left in place, not cleaned up as part of this change.

- Single light layout at all breakpoints (`bg-gradient-to-b from-[#fafafb]
to-white`), no `wide:` split: centered heading, a 4-stat row
  (Countries/Items/Integrations/Recipients), and a canvas visualization below.
- **Figma exception:** the visualization is a decorative Canvas-2D particle
  system ported directly from a user-supplied prototype — like EveryWay's
  sub-lg patterns, this is code-designed with no Figma frame, but unlike
  those, it isn't even an extrapolation of a Figma frame; it's an approved
  one-off exception to "all designs come from Figma."
- **Interaction:** the 4 existing stat buttons double as the visualization's
  tab switcher (no separate nav) — clicking/hovering/focusing a stat sets
  `active`, passed to `<ScaleMapParticles activeTab={active} />` as a plain
  prop. Click/hover-only, no auto-advance (no `useAutoAdvance`). Mapping is an
  assumed default, not a confirmed pairing — easy to reorder later: Countries
  → rotating particle globe (procedural continent detection, not real
  marker/coverage data — purely decorative), Items → pulsating flat grid,
  Integrations → flowing "hourglass" wave, Recipients → rotating Milky Way
  spiral.
- **Sizing:** no Figma spec exists for this component, so canvas wrapper
  height is a new bespoke token set (`--spacing-scale-map-sm/md/lg` = 20/26/32
  rem mobile/tablet/desktop; desktop matches the old 512px map height for
  continuity). The canvas's internal particle-space math is authored against
  a fixed 800×900 reference frame and uniformly scaled to the actual rendered
  size via `Math.min(W/REF_W, H/REF_H)` — only the final projected screen
  coordinates are scaled, not the particle system's tuning constants, so
  perspective/depth proportions stay correct at any container size. Edge fade
  via `[mask-image:radial-gradient(circle_at_center,black_40%,transparent_90%)]`.
- **Color reuse:** the 5 particle colors are decimal-RGB transcriptions of
  `--color-accent-water/lime/lilac/punch/turmeric` (`#0b7afc`/`#00c036`/
  `#8d12e7`/`#ff5b77`/`#ffb800`), manually kept in sync in
  `ScaleMapParticles.tsx` (canvas `fillStyle` can't read CSS custom
  properties directly — same convention as `ChaosGlobe.tsx`/`Starfield.tsx`).
  Note these hex values also match the org brand guideline's palette, under
  different names — this repo's `water`/`turmeric` tokens are the guideline's
  `Morocco`/`Tuscany`; pre-existing, intentional naming difference, not a bug.
- **Motion:** one-time `prefers-reduced-motion` check at mount (no live
  listener, matches every other animated component in this repo) gates only
  continuous motion (globe rotation, grid pulsing, wave flow, galaxy
  rotation, float wobble). A tab click still plays its lerp-based
  settle-into-new-arrangement transition even under reduced motion — a
  discrete, user-initiated change, not decorative continuous motion.
- The old dot-matrix SVG map (`map-dots-coverage.svg` + `map-coverage-overlay.svg`)
  and its hardcoded marker pins are gone; those two files are now unreferenced
  in `public/` (left in place — deleting orphaned assets was out of scope).

## TeamsTabs (`TeamsTabs.tsx`)

Figma: 1:62353 / 1:70849 / 1:66638.

**Interactive tabs (Shopify behavior, adopted 2026-06-11):** all 7 team
pills switch the panel (fade/slide-up 0.4s), 5s auto-advance while in view
via `useAutoAdvance` (first click takes over; reduced-motion disables).
Marketing content is from Figma; **the other six teams' content is
INVENTED** (titles, bodies, 4 feature rows each, CTA labels) and their
photos use PENDING ASSET placeholders — replace when designed.

The shared `useAutoAdvance` hook (`app/components/useAutoAdvance.ts`)
implements the measured shopify.com cadence for EveryWay, StadiumWay, and
TeamsTabs: 5s interval, only while ≥40% in viewport, permanent stop on
first user interaction, disabled under `prefers-reduced-motion`.

- White bg, section padding tokens; stack gap 24/24/32
- Eyebrow "BUILT FOR EVERY TEAM" ink, tracking 0.72/0.96/1.6px overrides
- Heading `text-heading-*` (lg max-w 650)
- Tabs: 7 pills (Marketing active), rounded-full, `text-label`; active `bg-grey-200 text-ink`, inactive `text-grey-500`; scrollable below lg
- lg grid 2×588: left photo card (h-297 `rounded-card`) + title Satoshi 24/32 + `text-body-md` + outline pill CTA "EXPLORE MARKETING"; right 4 feature rows `rounded-card` border-grey-200, row 1 active (`bg-surface-subtle` + arrow), titles `text-callout-sm` + desc `text-small`
- Mobile/tablet: photo h-200/320 rounded-2xl, body copy variant, title-only feature rows with arrows
- Asset: teams-marketing.png

## Occasions (`Occasions.tsx`)

Figma: 1:62408 / 1:70885 / 1:66674.

- White bg; two-column at lg (text + 587×456 marquee), stacked below (marquee 376px)
- Eyebrow "USE CASES" ink; heading `text-heading-*`; body `text-body-md grey-600` → 18/26 → `text-body-lg` ink
- 20 occasion pills: `bg-grey-100` rounded-full; icon tile 24/28/44px (`occasion-*.svg`, #EAF2FF circle + blue glyph); label Overpass SemiBold 16/24 (sm/md), `text-label` (lg)
- Vertical CSS marquee: duplicated track, translateY −50%, 50s linear; white fade overlays 64px (sm/md) / 121px (lg); reduced-motion disables

## Testimonials (`Testimonials.tsx`)

Figma: 1:62543 / 1:70997 / 1:66786.

- White bg, section padding tokens; gap 24/24/32
- Heading row: `text-heading-*` + G2 rating ("4.8" Satoshi 32 + ★★★★★ `text-label` + caption `text-body-md`); desktop justify-between items-end
- Desktop: hero video card (66%, max-w 792, stretch) + right col (Marie card h-243 above Marcus quote card), gap 24; mobile/tablet stacked with CSS order swap
- Video cards: `rounded-card`, bottom scrims, 48px `cta-fill` play badge; hero quote `text-body-md` white, names Satoshi
- Quote card: `bg-surface-subtle rounded-card` p-24; quote `text-body-md grey-700` (ink lg); avatar 32px (lg only); carousel buttons (lg): 40px circles — prev `border-grey-300`, next `bg-cta-fill`
- Assets: testimonial-video-maxime.png, testimonial-video-marie.png, testimonial-avatar-marcus.png, testimonial-logo-mark/word.svg

## Page Close (`PageClose.tsx`)

Figma: 1:62590 / 1:71024 / 1:66813.

**Final CTA**

- `bg-surface-subtle`; padding 24/56 → 48/72 → 120/64; centered
- Heading `text-heading-*` (lg max-w 722); body `text-body-md|lg` (copy differs lg vs sm/md per Figma)
- Buttons: primary `bg-cta-fill text-cta-on` pill + `inset-shadow-button-dark`; secondary outline pill; full-width stacked mobile

**Footer**

- `bg-grey-800`; padding 24/48 → 48/64 → 80; gap 32/32/48
- Brand col (lg 409px): white lockup `footer-logo-lockup.svg` h 20/24/36; tagline Overpass Bold uppercase white; social circles 23/24.5/30.5 (footer-social-linkedin/youtube/instagram.svg)
- OUR BRANDS: `text-label` uppercase grey-400 + hairline #C7BCB3 (lg) + Swagmagic/Snackmagic logotypes
- Link columns: headings `text-label` uppercase white +1.12px; links `text-body-md grey-400` gap-16; stacked mobile / 4-up tablet+
- Legal bar: white/10 divider; © line Overpass 12 uppercase grey-400; language pill border white/20 radius 6

---

# /swag — SwagMagic vertical page

Figma: "Stadium-Enterprise" `n9SjmDjzB1PeZAYJ5w43fr`, `/swag` frame `2:24733`
(1440 desktop-only; tablet/mobile derived, 375=default / 768=`md` / 1440=`lg`).
Green SwagMagic brand accent throughout; same Satoshi/Overpass type system and
white rounded content sections as the homepage.

**Tokens (new, globals.css):**

- `--color-swag-green: #03ba4f` — primary CTA / brand green (hero CTA 344:11927)
- `--color-swag-mint: #d7fee7` — eyebrow / light accent on the dark-green hero
- `--gradient-swag-hero` — mesh sampled from the Figma bg image 13674: green
  glow `#317154` top-left, teal glow `#18585f` mid-right, deep base
  `#063018`/`#04180f` (recreated in CSS, not shipped as a raster)

## Hero · Swag (`SwagHero.tsx`, Figma 344:11903)

Background is now an animated WebGL shader (`SwagHeroShader.tsx`), not the Figma
mesh-gradient photo (`swag-hero-bg.jpg`, kept on disk, unused). `SiteHeader`
auto-themes white (scroll ≤ 8).

### Swag hero shader (`SwagHeroShader.tsx`)

Recreation of a Figma shader-playground export the user supplied (import from
`shaders/react`, a composed `<Shader>` wrapper with `Swirl`/`ChromaFlow`/
`FlutedGlass`/`FilmGrain`). That package + wrapper + the `ChromaFlow`/`FilmGrain`
shaders are Figma-internal and unpublished — no build of
`@paper-design/shaders-react` (latest 0.0.77, next, canary, experimental) ships
them, and prop names differ. So the layered look is rebuilt from the real
published shaders. Layer → equivalent → params:

- **Swirl + ChromaFlow → `MeshGradient`** (dark base + electric flow). colors
  `['#050506','#101018','#18181a','#0033ff','#00e1ff','#5500ff','#0059ff']`
  (base anchor `#18181a` + the export's up/down/left/right hues, dark-biased),
  `distortion 1`, `swirl 0.7`, `grainOverlay 0.15` (= the FilmGrain layer),
  `speed 0.4`.
- **FlutedGlass → `FlutedGlass`** ribs, transparent `colorBack #00000000`,
  `shape 'lines'` (published enum has no `'rounded'`), `distortionShape 'prism'`
  (= the export's chromatic `aberration`), `angle 28`, `size 0.13`,
  `distortion 0.7`, `shadows 0.35`, `highlights 0.18`, `blur 0.12`,
  `edges 0.12`, `speed 0.15`; blended `mix-blend-mode: soft-light` over the
  chroma so the ribs refract it.
- **Mood scrim**: radial `transparent → black/0.35 → black/0.6` — keeps the
  field dark/premium and floors white-text contrast.
- Motion halts under `prefers-reduced-motion` (`speed 0` = static first frame,
  still renders); Paper's runtime pauses RAF while the tab is hidden.
  `maxPixelCount 1920×1080` per canvas caps hi-dpi/mobile GPU cost.
- Shader props are library uniforms, not px/tokens, so they live in the
  component (exempt from the "tokens only" rule).
- Eyebrow "SWAG · SWAGMAGIC": `text-eyebrow-sm`→`md`, tracking 1.6px, `text-swag-mint`
- Headline "The infrastructure behind every swag program": Satoshi (font-display)
  32 / 44 / 58px, tracking −1.5px (lg), leading 1.02, white; copy col w 543 (lg)
- Subhead: Overpass 19px/1.52, near-white #fbfeff
- CTAs: `h-button-h rounded-full px-button-x text-button-primary` uppercase;
  primary `bg-swag-green text-white`, secondary `bg-white border-#e2e2de text-ink`
- Teams line: Overpass SemiBold 13px #fbfeff
- Product cluster (344:11932, 558×557): warehouse photo 295×470 rounded-16 shadow
  - frosted hoodie card (bg-black/33, rounded-20, w-259) — hoodie cut-out,
    "Embroidered hoodie" (Overpass Bold 17.5 #ddd) + desc (12 #ccc) + ADD TO CART
    (border white/25) + floating vertical size pill (SIZE / S·M·L·XL, L active bg-black/75)
- Logo marquee: `/trust-*.svg` inverted white (brightness-0 invert), opacity 90,
  CSS marquee, edge mask-fade
- Assets: `public/swag/swag-hoodie.png`, `swag-warehouse.jpg`

## Remaining sections (component · Figma node · notes)

Section headings share one scale: Satoshi 28/36/44 (`text-[1.75rem] md:text-[2.25rem]
lg:text-[2.75rem]`, tracking −0.5); eyebrows `text-eyebrow-sm/md` uppercase
`text-swag-green-deep` (normalized — Figma's per-section eyebrow greens/weights
unified). Body = `text-swag-grey`. Green tiles/gradients recreated in CSS.

- **SwagProblem** · 344:11965 — peek-behind white card over a green→white gradient;
  3-card grid on a `#f2f2f2` tray. Assets: swag-problem-1..3.jpg
- **SwagDivider** · 411:1053 — 5-segment rainbow rule (accent-lilac/water/turmeric/punch/lime)
- **SwagOfferings** · 399:748 — 2 offer cards (green-gradient "Run a swag program"
  [Popular] + grey "Ship it yourself"), each with white inner card + checklist + CTA
- **SwagWorkflow** · 2:25010 — 6-tab client component (Bulk Swag active from Figma;
  other 5 tabs placeholder copy). Asset: swag-workflow.jpg
- **SwagCatalog** · 2:25059 — scroll carousel of category cards (count + brands +
  flat-lay), prev/next arrows. Assets: swag-cat-apparel/drinkware.jpg
- **SwagFulfillment** · 2:25104 — dark-green gradient card, 4×3 comparison matrix
  (translucent `#02120b`/50 tiles). Mint eyebrow (`text-swag-mint`)
- **SwagHowItWorks** · 2:25161 — 3 step cards on a tray; step 01 has a green editor
  visual (toolbar + shirt + Approved). Asset: swag-shirt.png. Left-aligned header
- **SwagPlatform** · 2:25186 — 3×2 feature cards with simplified CSS mockups
  (login/inventory/fulfillment/gifting/integrations/reporting) on a dot-field
- **SwagAdminView** · 2:25303 — centered header + skeleton dashboard mockup (grey blocks)
- **SwagCommittee** · 2:25312 — dark-green card, 2×2 stakeholder photo cards.
  Assets: swag-committee-1..4.jpg
- **SwagPricing** · 2:25395 — grey container: intro+CTA+image + 4 progressive Pass
  cards (Engagement = Popular). Asset: swag-pricing.jpg (Figma's watermarked placeholder)
- **SwagComparison** · 2:25431 — feature table, Stadium col highlighted `#f2fbf5` green;
  check/minus/text cells; Book-a-call CTA
- **SwagCaseStudies** · 2:25554 — quote-card carousel (green thumb + `#e8f8ee` stat pill)
- **SwagPaperchase** · 2:25598 — sticky intro + quote, BEFORE/DURING/AFTER timeline
- **SwagImpact** · 2:25697 — bento: photo+stat / grey stat+quote / green + dark stat.
  Asset: swag-impact.jpg
- **SwagClosing** · 2:25751 — Book-a-demo form + "Keep exploring" links + dark final CTA
- Footer reuses `PageClose`. Verified: 0 horizontal overflow + 0 console errors at
  1440/1280/768/375. Placeholder copy (Workflow tabs 5/6, Catalog cats, Case-study
  quotes) + the Pricing watermark image are the items to swap for real content.

---

# /pricing — pricing page (`app/pricing/page.tsx`)

Figma: n9SjmDjzB1PeZAYJ5w43fr → 3998:4491 "/go/pricing" (desktop 1440 only —
tablet/mobile derived with the standard breakpoint mapping).

**Page shell**

- One gradient behind every section: `bg-linear-to-b from-pricing-navy (#011c3d) to-pricing-night (#000308)` — pixel-sampled across the 4230px content frame (top #001b3b → frame end #000409).
- Rhythm at desktop: hero → 160 → comparison → 160 → Book a Demo → 160 → closing CTA (`pt-16 / md:pt-24 / lg:pt-40`).
- Composition: `SiteHeader` · `PricingHero` · `PricingComparison` · Book a Demo section + `BookACallForm` · `common/ClosingCTA` (transparent bg, `descriptionClassName` widened to 48rem so Figma's 2-line body holds) · `PageClose showCta={false}`.
- Anchors: `#compare` (comparison), `#book-a-demo` (form). Both `scroll-mt-16` for the fixed 4rem header.

**Hero (`PricingHero.tsx`, 3998:4515)**

- Top pad 7.5 / 10 / 12.75rem (= header 4rem + Figma 120 at lg).
- Eyebrow `text-eyebrow-sm` +1.6px `text-pricing-sky`; headline `text-display-sm → md:text-display-md → lg:text-display-pricing` (58/1.02/−1.5, Satoshi — Figma specs Black, site ships Bold only); truck row lucide 20 + eyebrow style.
- Pass cards: `rounded-3xl bg-white p-2.5 shadow-pass`; title block `rounded-2xl bg-pricing-tray px-4 py-6 text-pass-title`; body `px-4 py-6`, rows `text-feature` gap 12 + lucide check 14; CTA `h-button-h` pill `bg-pricing-cell` (featured: `bg-pricing-cta` + `border-pricing-sky shadow-pass-featured`). "Most Popular" pill `bg-pricing-sky text-pill text-pricing-navy`, −10px top / 39px right.
- **Updated to Figma 3338:3171 (/go/pricing):** five passes (Pay-as-you-go → Shops → Swag → Engagement [Most Popular] → Enterprise); Pay-as-you-go CTA reads "Get started". Cards `wide:h-[29.375rem]` (470); feature rows `text-feature-sm` (12/1.4, new token) with lucide check 14; card row is Figma 1360 @ 40px from `wide` (`max-w-pricing-cards` now 96.25rem / 1540px (user 2026-10-18) + `wide:px-10`).
- Grid 1 → `md:` 2 (6-col grid, last card centred) → `wide:` 5. Hover: −0.25rem lift (motion-safe).
- "Talk to sales" → `?interestedPackage=<pass>#book-a-demo`; BookACallForm forwards it as `interested_package`.

**Comparison (`PricingComparison.tsx`, 3998:4666)**

- Panel `bg-white rounded-[2.5rem] md:rounded-panel (60)`, py 16 / 24 / 40 (160), header → table gap 60.
- Title `text-heading-xl` (44/1.08/−0.5); subhead `text-body-lg text-swag-grey`.
- Table: gap 4; header cells white `rounded-3xl`; body cells `bg-pricing-cell rounded-lg`, outer corners `rounded-*-3xl`; `text-table` (14.5/1.4); lucide check 24 / minus 16. Label col 2.31fr (= 400/1280) at lg, five 1fr pass columns. Rows grouped under section labels (`h-10`, `text-table-label` 12/1.4 +0.72 SemiBold, `text-pricing-ink/55`): Pay-as-you-go products · Every pass · Swag management · Engagement · Enterprise. Text cells ("Add-on") `font-semibold`. The old "Explore all features" dark cell is gone in Figma 3442:16733 (the modal is still reachable via popover "Read more").
- Below lg: horizontal scroll, label column `sticky left-0` with a 4px white ring.
- Popovers (3998:4917): 280w, `rounded-lg p-3 shadow-popover text-popover` (12px — Figma specs 10, bumped for legibility), above the label, open on hover/focus-within. "Read more" opens the packages modal on that feature.
- Row data lives in `components/pricing/passes.ts` (shared with the modal).

**Packages modal (`pricing/PackagesModal.tsx`, 3401:2352)** — opened by popover "Read more" (on that feature, first pass that includes it) and by the "Explore all features" cell (first pass + feature)

- Native `<dialog>` + `showModal()` (focus trap, Escape, inert page); scrim `backdrop:bg-modal-scrim` (black 50%) closes on click; page scroll locked while open. `.modal-in` = fade + 1rem rise, 0.32s ease-out-expo.
- Card `max-w-content` (1200) `rounded-modal` (32) `bg-white shadow-form` (card-xh-shadow), p 5 / 8 / 10 (40). Height capped at `min(1178px, 100dvh − 4rem)` (2rem gutter on mobile); the sidebar list and the content pane scroll inside it.
- Header: title `text-display-demo` (54) + 40 black close circle (lucide x 20) → 32 → `text-body-xl` (19/1.52) → 32 → pass tabs. Tabs: pill bar `border-modal-border` (#e0e0e0) `bg-white/75 p-2.5 gap-2.5 shadow-pass`; tab `px-5 py-[0.8125rem] text-eyebrow-sm leading-4` (12/16 +1px Bold), active `bg-pricing-ink text-white`. WAI-ARIA tabs (arrows/Home/End).
- Body (lg): sidebar `w-modal-sidebar` (414) `rounded-2xl border p-2.5 shadow-pass`; items `min-h-12 px-6 rounded-lg text-modal-item` (14/16 +0.16), active `bg-grey-100 text-grey-700`, rest `text-grey-600`. Lists only the features the pass includes. "Talk to sales" pill pinned to its bottom: `bg-pricing-ink px-10 py-6 text-eyebrow-lg`, lucide phone 20 → `?interestedPackage=<pass>#book-a-demo`.
- Content: 32 from sidebar, `lg:pr-8` before the scrollbar. Image block `h-modal-media` (276) `rounded-modal-media` (20) `bg-pricing-cell` (placeholder) → 32 → "Full access to:" eyebrow (+ a `text-pill` badge when the table cell is a text limit, e.g. "US only") → 32 → checklist `text-feature` gap 12 (lucide check 14; sub-items `pl-6` circle-small) → 32 → summary `text-body-xl`.
- Scrollbar `.modal-scroll`: 8w, thumb `modal-scroll-thumb` #ebebeb on `pricing-tray` #f7f7f7, r10.
- Below lg (no Figma frame): sidebar becomes a horizontal chip row (bordered chips, active `border-pricing-ink`), content scrolls under it, "Talk to sales" drops to the bottom (`py-4`). The active item is centred in the list/chip row on open.
- Copy is placeholder (table popover text + Figma's Shops sample); swap in real copy/images in `passes.ts`.

**Book a Demo form (`BookACallForm.tsx`, 3998:4924)** — styling only; business logic untouched

- Card `max-w-[40.375rem] rounded-3xl bg-white p-6 md:p-10 shadow-form`; grid 1 → `md:` 2 cols, gap 24.
- Label `text-field-label` uppercase (12.5/1.4/+0.3 Bold); label → control `gap-field-gap` (7).
- Control `h-field-h` (46) `rounded-lg border-field-border px-3.5 text-field`, placeholder `text-field-placeholder`; hover `border-field-border-hover`; focus/open `border-pricing-ink shadow-field-focus` (global outline suppressed on text fields — the ink border is the indicator); error `border-field-error bg-field-error-tint` + `text-field-hint` message with CircleAlert. Textarea `rounded-[0.625rem] min-h-28`.
- Menus (not in Figma): `rounded-xl border-field-border shadow-dropdown`, `.field-menu-in` 160ms entrance, options `rounded-lg px-3 py-2.5`, hover `bg-grey-100`, selected `bg-pricing-cell font-semibold` + check. Close on outside press / Escape.
- Phone: country trigger (flag + ISO + chevron, searchable menu) · field with dial-code prefix. Offerings: accordion groups with count badge, custom checkboxes (`bg-pricing-ink` when checked), "N selected" + Apply footer.
- Personal-email notice `bg-field-warning-bg border-field-warning-border`, icon `text-field-warning-icon`.
- Submit `h-button-h rounded-full bg-grey-800 text-button-primary`, spinner while submitting.

---

# /thank-you — post-booking confirmation (`app/thank-you/page.tsx`)

No Figma frame — recreated from https://www.bystadium.com/thank-you, measured live at 1440 (2026-10-01).
BookACallForm redirects here after a ChiliPiper booking (`THANK_YOU_PAGE_URL` fallback `/thank-you`; `NEXT_PUBLIC_THANK_YOU_PAGE_URL` still overrides). `noindex`.

- `SiteHeader lightHero` (white page) + `PageClose showCta={false}`.
- Row capped `max-w-[60rem]` (960, centred): illustration `public/thank-you/call-booked.png` 300w (mobile 240) · gap 160 · copy column 500, top-aligned. Stacks centred below `lg`.
- Section pad: top 7 / 9 / 14rem (incl. 4rem header), bottom 4 / 6 / 10rem.
- Eyebrow `text-eyebrow-sm leading-4 text-accent-water` → 16 → heading `text-heading-md text-grey-700` → 12 → body `text-body-lg` +0.25 `text-grey-700` → 28 → CTA `h-button-h rounded-button bg-grey-700 text-grey-100 text-button-primary` → https://app.bystadium.com/dashboard.

---

# /book-a-call — demo request page (`app/book-a-call/page.tsx`)

Figma: n9SjmDjzB1PeZAYJ5w43fr → 3998:4026 (desktop 1440 only).

**Page shell** — same `from-pricing-navy to-pricing-night` gradient as /pricing (Figma #011C3D → #000).
Stack: `BookACallHero` → glass panel + `ProblemSection tone="dark"` → 160 → `VerticalTestimonials theme="dark" layout="stack"` → 120 → `ClosingCTA` (transparent, 48rem body) → `PageClose showCta={false}`.

**Hero (`BookACallHero.tsx`, 3998:4049)**

- Top pad 7.5 / 9 / 12.75rem; bottom 3 / 4 / 7.5rem. Grid `max-w-[72.5rem]` (Figma 1160 @ px140), `lg:grid-cols-2 gap-x-[3.75rem]`.
- Headline `text-display-sm → md:text-display-md → lg:text-display-demo` (54/1.02/−1.5 — shared with /pricing "Book a Demo"); intro `text-body-lg → md:text-body-xl` (19/1.52), max 439; eyebrow `text-eyebrow-sm leading-4`; checks lucide 14 + `text-feature`.
- Proof block (lg: row 2, `self-end`, min `mt-[6.875rem]`, fixed 170 tall): stars 180w · "2700+ Reviews" `text-body-sm` · G2 (`/g2-logo.svg`) / Capterra / Google 40h (`public/book-a-call/`) → 40 → `HeroLogoWall variant="inline"` (max 514) → 32 → Help Center line `text-field text-grey-200`.
- Form column: shared `BookACallForm` (550 wide here). Mobile order: copy → form → proof.

**Glass panel (3998:4028)** — `rounded-t-[2rem] bg-linear-to-b from-white/20 to-white/0`; at lg `-mt/pt-[21.375rem]` (= hero pb 120 + proof 170 + 52) so it starts 52 above the rating row; below lg it simply starts at "Why Stadium?".

**Why Stadium? (3998:4237)** — `ProblemSection tone="dark"` title only; images are Figma placeholders → existing photos (`infra-operations.jpg`, `map-faces.jpg`, `catalog-gift-cards.jpg`).

**Testimonials (3998:4261)** — `VerticalTestimonials` (the single testimonial component — home card style everywhere; the old stack layout was removed): eyebrow #a4cefe, left column no longer sticky — cards scroll as a QuoteMarquee (continuous, pause on hover, 6% top/bottom fade, column height = max(650px / 40.625rem, left column)); cards `bg-pricing-cell p-6 gap-6 rounded-3xl`, 72px `rounded-xl` fluted thumb (`recog2/rc-case-thumb.png`), white content `rounded-xl px-7 pt-7 pb-[1.875rem] shadow-pass`, quote Satoshi Medium 25/−0.3, name/role `text-feature`.

**Shared-component options added (all opt-in, defaults unchanged):** `HeroLogoWall variant="inline"`, `ProblemSection tone="dark"` + optional caption/description, `VerticalTestimonials caption / theme / layout`.

---

# /impact — Impact by Team (overview + 7 team pages)

Figma n9SjmDjzB1PeZAYJ5w43fr: /impact 3998:14569 · /impact/hr 3998:9271 · /impact/marketing 3998:18002 · /impact/sales 3998:18764 · /impact/cx 3998:19461 · /impact/leadership 3998:20107 · /impact/office-admins 3998:20924 · /impact/finance 3998:17233 (desktop 1440 only).
Routes live in `TEAM_ROUTES` (`app/components/impact/shared.ts`) and drive the header's Impact by Team menu (desktop rows, mobile accordion + "All teams"; the top-level item links to /impact). Footer unchanged (user decision).

**Page frame** — `impact/ImpactPageShell`: transparent `SiteHeader` over `TeamHero`, sections on the 160 desktop rhythm (`grid gap-16 / md:gap-24 / lg:gap-40`, same py), then `ImpactClosing`, `PageClose showCta={false}`.

**Shared section components (app/components/common/)**
| Component | Figma pattern | Notes |
|---|---|---|
| `TeamHero` | "Hero · Swag" text | `public/impact/hero-bg.jpg` = Figma "image 13990" cropped to the dark band (cover/top). Eyebrow `text-eyebrow-lg` · title `text-display-pricing` (58) · intro `text-body-xl` · white pill + outline pill. |
| `TeamHero` + `visual` | /impact canvas hero (5152:23461) | `background="canvas"` = `public/impact/overview/hero-canvas-bg.jpg` (Figma "image 13989", 2× export, top 808 only). `visual` slot: copy left edge = the header logo's (user decision 2026-10-06, supersedes Figma's 140: `lg:ml-[max(section-x-md,(100% − max-w-content)/2)]`, identical to the header's own rule), visual flush right of a `max-w-hero` (1440) row, starts under the 84 header band (`lg:pt-hero-nav`); stacks under the copy below lg. |
| `TeamHero` + `visual` + `visualLayout="aligned"` | /impact/marketing hero (5195:17478) | Same canvas backdrop; visual right-aligned to the header's Talk-to-sales edge, top-aligned with the copy, equal padding; `visualMaxWidth` = stage width in rem. See "/impact/marketing hero — Brand kit applied". |
| `TeamHero` + `visual` + `visualLayout="aligned"` | /impact/sales hero (5205:17055) | Same grid as /impact/marketing; `visual={<DealRail />}`, `visualMaxWidth="37rem"` (592 stage). See "/impact/sales hero — Deal rail". |
| `TeamHero` + `visual` + `visualLayout="aligned"` | /impact/cx hero (5212:17243) | Same grid; `visual={<GrowthSteps />}`, `visualMaxWidth="37rem"` (592 stage). See "/impact/cx hero — Growth steps". |
| `TeamHero` + `visual` + `visualLayout="aligned"` | /impact/hr hero (5388:21262) | Same grid; `visual={<MomentsBento />}`, `visualMaxWidth="35rem"` (560 stage). See "/impact/hr hero — Moments bento". |
| `TeamHero` + `visual` + `visualLayout="aligned"` | /impact/leadership hero (5401:23861) | Same grid; `visual={<GuardrailsTray />}`, `visualMaxWidth="36.25rem"` (580 stage). See "/impact/leadership hero — Guardrails tray". |
| `TeamHero` + `visual` + `visualLayout="aligned"` | /impact/office-admins hero (5422:22465) | Same grid; `visual={<OfficeNeedsBoard />}`, `visualMaxWidth="36.25rem"` (580 stage). See "/impact/office-admins hero — Needs board". |
| `TeamHero` + `visual` + `visualLayout="aligned"` | /impact/finance hero (5434:22890) | Same grid; `visual={<FinanceBudgetBar />}`, `visualMaxWidth="36.25rem"` (580 stage). See "/impact/finance hero — Budget bar". |
| `SectionIntro` | every centered/left intro | eyebrow 12 Bold +1.6 · 44/1.08/−0.5 (`lg:text-heading-xl`) · 18/1.48 `text-swag-grey`; max 860 centered. |
| `VariableCardGrid` (extended) | problem / case-study / 2×2 trays | opt-in: `imageStyle="panel"` (lifted mockup, layered shadow, rounded-t-lg/b-3xl), item `title`/`image` optional (no image = #f2f2f2 placeholder 250h), `footnote`, `background="transparent"`, `narrow` (tray max 880). |
| `LogoBridge` | "icons"/"Integrations" strip | two 50s marquees (`swag-marquee`) toward a white r42 tile (`impact/stadium-tile-mark.svg` 158² with its own inner tile + shadow, inset −4.69/−11.72/−18.75%) on `stadium-tile-glow.png`; `logoOpacity` 0.33 (mid-grey marks) or 1 (pre-tinted); `rightLogos` when sides differ. |
| `StickyStepCards` (extended) | "across the employee journey" stacks | steps without `stepLabel` hide the pill timeline; quote optional; per-step `eyebrow`. Card body = `FeatureDetails` (16/1.5 #828282 · checks 15/1.4 · underlined 12px link). |
| `PillTabs` (extended) | "six ways" tabs + band | `image` optional → #e0e0e0 580/394 placeholder; team pages use `autoAdvance={false}`. |
| `ImageShowcase` | dashboards / big graphics | `framed={false}` when the 2× export already carries Figma's shadow margin. |
| `StepCards` (extended) | numbered 01/02/03 expanders | `align="center"`. |
| `ChecklistCards` | two titled checklist cards | tray #f2f2f2 r32 p16 max 1000; #f7f7f7 r16 p24 title (32/40). |
| `NumberedOfferings` | "five ways" | sticky intro + #f2f2f2 tray of numbered cards (active shadow), 243×216 r20 image or #e0e0e0 placeholder. |
| `SplitFeature` | /impact workspace + budgets rows | exports include panel frame + shadow (612×482) → rendered unframed. |
| `ImpactProof` | /impact "The proof" | G2 4.8 row (`/g2-logo.svg`, lucide stars #ff9c00), white logos on the closing gradient, 3 result cards with 159-wide placeholders. |
| `ImpactClosing` | closing band | `--gradient-impact-closing` (white → #ddebfe → … → #181818, pixel-sampled from 3998:13969) behind the section above the CTA + `ClosingCTA`. |

**Assets** — `public/impact/<team>/` (overview = `/impact/overview/`): product mockups exported from Figma at 2× (`download_assets defaultScale 2`, PNG), photos JPEG q86, logos as Figma SVGs.
**Content decisions** — Figma grey placeholders kept as placeholders (case studies, five-ways images, proof cards). Undesigned PillTabs tabs use that team's Impact menu use-case copy with placeholder imagery.

## /impact hero — Open Spatial Canvas (added 2026-10-06)

Figma n9SjmDjzB1PeZAYJ5w43fr **5152:23461** (desktop 1440 × 808; no tablet/mobile frames — the visual scales, the copy reuses TeamHero's responsive type). Copy, CTAs and type are unchanged from TeamHero; what's new is the backdrop and the right-hand visual.

**Tokens added (globals.css)** — colours `canvas-muted #919295`, `canvas-pink #fdceda`, `canvas-lilac #e8d0fa`, `canvas-blue #cee4fe`, `canvas-green #d8f1cc`, `canvas-check #267337`, `canvas-seg-pink #f6a3b8` / `-lilac #c99af0` / `-blue #8fbffa`, `impact-hero-night #020912`; spacing `hero-nav` 84; container `hero` 1440 · `hero-visual` 647. Greys reuse `grey-100/200/300/800` and `swag-grey`.

**Visual** — `impact/OpenSpatialCanvasScene.tsx` (a Remotion composition, 647 × 724, 30 fps) hosted by `impact/OpenSpatialCanvas.tsx` (`@remotion/player`). Stage geometry/shadows are Figma values **in stage units** (bare numbers in style objects): the Player scales the whole stage to its container like an exported image, so these are not CSS px and the rem rule does not apply inside the stage. Colours/fonts still use tokens. Shadows: toolbar `0 12 28 .34` · cards `0 16 40 .38` · toast `0 14 32 .36` · cursor pills `0 3 10 .28`.

**Timeline** — 0–96 intro (springs, recipients 0→1,200, $0→$186,400, budget segments, cursors fly in, Alex selects); 96–396 idle loop. Frame 96 = the Figma frame exactly (also the reduced-motion still). Loop values start and end at the Figma rest pose, so `ended` seeks 396 → 96 seamlessly (intro plays once). Always moving: every card floats on its own slow whole-cycle sine (±2.5–4, 1–3 cycles per loop, ramped in over frames 56–96) and the cursors drift continuously. Visits: Maya → Summit card, Grace → Anniversaries (click), Arun → budget (target card lifts), Alex drags Closed-won gifts, "Kit delivered" toast leaves/returns.

**No crop** — Player `overflowVisible`; every moving element (fly-ins, visits, drift, drag) stays inside 0…647 with margin (Grace's 136-wide pill is the binding one).

**Header gutter** — SiteHeader's inner row is now full-width with `md:px-[max(section-x-md,(100% − max-w-content)/2)]` (same 1260 content box and 90px at 1440 as before) so the logo never hugs the viewport edge between 768 and 1320 (it did, at x=0) — hero copy uses the identical rule, so they share one left edge at every width.

**Behaviour** — aria-hidden + non-interactive; pauses off-screen (IntersectionObserver); `prefers-reduced-motion` → still at frame 96; aspect ratio reserves the space (no CLS).

**Assets** (`public/impact/overview/hero/`) — avatars (28 → 56px PNG, + ring variants for the toolbar), thumbs re-cropped square 240px JPEG q90 (hoodie 900², anniversary 633×456, gift 1600×1068 originals were far larger than the 48–60 they render at). Spain flag drawn as 1:2:1 stripes (Figma's flag is a 267 KB sprite).

**Licence note** — Remotion's licence requires a company licence for teams of 4+ (applies to the Player too). Confirm before shipping.

## /impact/marketing hero — Brand kit applied (added 2026-10-06)

Figma n9SjmDjzB1PeZAYJ5w43fr **5195:17478** (desktop 1440 × 808; visual frame 5195:19010, 596 × 375 = the graphic cluster; no tablet/mobile frames). Backdrop (`background="canvas"`) and the 84px header band are the /impact ones (see above).

**Alignment grid (hero-visual-design v2.3)** — `TeamHero visualLayout="aligned" visualMaxWidth="37.25rem"`: one content box = the header's (logo left → Talk-to-sales right, `max(section-x-md, (100% − content)/2)` each side). Copy on the left edge; the visual's **right edge on the Talk-to-sales edge** (gap flexes, ≥ 3.5rem, 7.6rem at 1440); row layout from **`xl` (1280)** — below it the visual stacks under the copy at its natural 596 (never scaled down; the `lg` row of the first pass squeezed it to ~59% at 1024); both columns **top-aligned** (grid `items-start`); the row is centred in a ≥ 45.25rem area with ≥ 7.5rem padding (`xl:min-h-[45.25rem] xl:content-center xl:py-30`) so the blue above and below is equal. The row is a full-width grid whose 1260 box comes only from the percentage padding (no `max-w-hero` wrapper — that capped the percentage base and collapsed the visual above 1440). Verified at 1280 / 1440 / 1900: logo-left = copy-left, button-right = visual-right, copy top = visual top, 174/174 above/below. /impact keeps the legacy `edge` layout. Copy from the frame: eyebrow "Stadium for Marketing" · "Branded experiences for every campaign" · "Create and send on-brand experiences across campaigns, audiences, and regions from one platform." · CTAs "Book a demo" (`LINKS.sales`) / "See the brand store" (`LINKS.swag`).

**Tokens added (globals.css)** — `arcade-purple #3b1fbf` (fictional ARCADE brand kit: wordmark tile, first swatch), `arcade-well #f3f3f5` (product photo well). Everything else reuses existing tokens: `grey-800` (#181818), `grey-200` (swatch border), `swag-grey` (#6b6c71), `canvas-green` / `canvas-check` ("Applied" chip).

**Visual** — `impact/BrandKitAppliedScene.tsx` (Remotion composition, 596 × 375, 30 fps) hosted by `impact/BrandKitApplied.tsx` (`@remotion/player`, same host behaviour as OpenSpatialCanvas). Stage-unit numbers (not CSS px). Layout (stage 596 × 375, origin top-left): banner (white r18, pad 14/18, shadow `0 14 34 .36`) · three product tiles 192 wide, gap 10, y 81 (white r20, pad 10, photo well 172² r14, shadow `0 18 44 .4`) · caption pill y 333 (white r100, pad 10/16, shadow `0 10 24 .3`, 5 overlapping 22 flags). Flags are drawn as inline SVG (Germany, Japan, Brazil, India, USA).

**Timeline** — 0–96 intro: banner drops in, swatches + "Applied" chip pop, hoodie → cap → tee spring in (frames 20/28/36), each logo "applied" (check draws, label fades in; chip counts 1 → 3), caption + flags pop last (62+). 96–396 loop (frame 96 = the Figma frame, also the reduced-motion still): a soft sheen sweeps each product photo in turn while its tile lifts, swatches pulse in sequence, flags ripple, and every surface floats on its own whole-cycle sine (±2–3 units, 1–3 cycles). All loop values are 0 at both ends → seamless 396 → 96.

**No crop** — Player `overflowVisible`; nothing leaves 0…647. **Behaviour** — aria-hidden, non-interactive, pauses off-screen, `prefers-reduced-motion` → still at frame 96.

**Assets** (`public/impact/marketing/hero/`) — `thumb-hoodie.png` (360², transparent cut-out), `thumb-cap.jpg`, `thumb-tee.jpg` (360², q92, white background, multiplied onto the grey well; the tee is shifted 13px left so the shirt is centred; ≈ 2× their 172 render size).

**Licence note** — Remotion's licence requires a company licence for teams of 4+ (Player included); already flagged for /impact.

## /impact/sales hero — Deal rail (added 2026-10-06)

Figma n9SjmDjzB1PeZAYJ5w43fr **5205:17055** (chosen of three: V1 Deal rail · V2 Twin sources converge 5205:17768 · V3 Deal ledger 5205:18481; desktop 1440 × 808, visual frame 5205:17767 = 592 × 346, the graphic cluster; no tablet/mobile frames). `TeamHero background="canvas" visualLayout="aligned" visualMaxWidth="37rem"` — same alignment grid as /impact/marketing (copy on the header logo edge, visual right edge on the Talk-to-sales edge, both top-aligned, equal 189/189 padding at 1440, row from `xl`, stacked at natural size below). Copy from the frame: eyebrow "Stadium for Sales" · "Gifting that keeps deals moving" · "Automate gifts from your sales workflows or let reps send on demand, with every touchpoint connected back to sales activity." · CTAs "Talk to sales" (`LINKS.sales`) / "Explore the platform" (`LINKS.platform`).

**Tokens added (globals.css)** — `chip-surface #f3f3f5` (source chips, recipient pill — same value as `arcade-well`), `signal-green #2fa64f` (active-stage dot, gift packet). Reuses `canvas-blue` / `canvas-lilac` (path tags), `grey-200/400/800`, `swag-grey`.

**Visual** — `impact/DealRailScene.tsx` (Remotion, 592 × 346, 30 fps) hosted by `impact/DealRail.tsx` (same host behaviour as OpenSpatialCanvas). Stage-unit numbers. Layout: Automated lane card (x 0, y 0, 416 × 126, white r18, pad 14, shadow `0 14 34 .36`) — tag + "Deal moves to Proposal", sources (Salesforce, Webhook; chips 140 wide, `chip-surface` r10) → arrow → Stadium disc (40, white) → arrow → recipient pill (Grace Adeyemi, avatar 28, pad 4/12/4/4); stage rail at y 158 (Discovery · Proposal · Negotiation · Closed-won, pills 26 high, active = white + green dot, rail line white 35%); stems 32 high (white 55%) from Proposal up to the Automated card and from Negotiation down to the Rep-led card (x 176, y 216, 416 × 130: Jordan Lee, Chrome extension → Stadium → Arun Mehta). Icons (zap, chrome, arrow-right) are inline feather paths; Salesforce mark = `public/motion/marks/salesforce.svg`.

**Timeline** — 0–96 intro: rail draws, stage pills pop and light up (Proposal 18, Negotiation 40), Automated lane drops in (20) and a green gift packet runs sources → Stadium (pulse) → Grace while "Gift on its way" crossfades to "Gift delivered" (30–68); Rep-led lane rises in (44) and the same plays for Arun (52–92). Frame 96 = the Figma frame (also the reduced-motion still). 96–396 loop: both lanes send again (Automated +20, Rep-led +150): stage pill + card lift, packet, hub pulse, status flips back and forth; every value is at rest at both loop ends; each card floats on a whole-cycle sine (±2.5, 1 and 2 cycles), stems follow the floating cards.

**No crop** — Player `overflowVisible`; everything stays inside 0…592. **Behaviour** — aria-hidden, non-interactive, pauses off-screen, reduced motion → still at frame 96. **Assets** (`public/impact/sales/hero/`) — `avatar-jordan.png` (56², from the Figma portrait), `stadium-mark.svg` (the sprinkle); avatars for Grace/Arun reuse `public/impact/overview/hero/`.

**Licence note** — Remotion company-licence caveat as for /impact and /impact/marketing.

## /impact/cx hero — Growth steps (added 2026-10-06)

Figma n9SjmDjzB1PeZAYJ5w43fr **5212:17243** (C1 of three static variations in "final designs": C2 alternating timeline 5212:17956, C3 journey canvas 5212:18669; desktop 1440 × 808, visual frame 5212:17955 = 592 × 441, the graphic cluster). `TeamHero background="canvas" visualLayout="aligned" visualMaxWidth="37rem"` — same alignment grid as /impact/marketing and /impact/sales (copy on the header logo edge, visual right edge on the Talk-to-sales edge, both top-aligned, equal padding around the 459-tall copy: 132 above / 133 below the row at 1440; row from `xl`, stacked at natural size below). Copy is unchanged from the Figma frame (eyebrow "Stadium for Customer Experience", "Build stronger customer relationships at every stage", …, CTAs "Talk to sales" / "Explore the platform").

**Tokens** — nothing new: `chip-surface`, `signal-green`, `canvas-green` / `canvas-check`, `canvas-muted` (#919295, timing labels), `grey-800`, `swag-grey`.

**Visual** — `impact/GrowthStepsScene.tsx` (Remotion, 592 × 441, 30 fps) hosted by `impact/GrowthSteps.tsx` (same host behaviour as OpenSpatialCanvas). Stage-unit numbers. Five white tiles, 108 wide, gap 13, standing on y 368 with heights 176 / 224 / 272 / 320 / 368 (pad 8, r18, shadow `0 14 34 .36`): grey photo well (92 × h−74, r12, photo `cover`, `mix-blend-mode: multiply`) + a 50-high label block (timing caps 10 bold `canvas-muted`, name 12 semibold, caption 10 `swag-grey`). Stems 2 × 16 (white 55%) from each tile to the Stadium bar (y 384, 592 × 57, white r18, disc 32 with the sprinkle, "Stadium / Every moment on one customer record", green chip "Renewals up 12%").

**Timeline** — 0–96 intro: the bar pops, the five tiles rise out from behind it one after another (frames 10/20/30/40/50, spring), photos settle, stems grow, the chip counts 0 → 12%. Frame 96 = the Figma frame (also the reduced-motion still). 96–396 loop: a green gift packet climbs each stem in turn (pulse i at loop frame 20 + 50·i, 44 frames): the Stadium disc pulses, the tile lifts and its photo breathes, the chip pulses with Renewal; values are at rest at both loop ends; each tile floats on a whole-cycle sine (±2).

**No crop** — Player `overflowVisible`; nothing leaves 0…592. **Behaviour** — aria-hidden, non-interactive, pauses off-screen, reduced motion → still at frame 96. **Assets** (`public/impact/cx/hero/`) — `photo-{onboarding,milestone,thankyou,renewal,loyalty}.jpg` (the Figma photos, q88, ≤ 900px on the long side so the narrow portrait crops stay sharp) and `stadium-mark.svg`.

**Licence note** — Remotion company-licence caveat as for /impact, /impact/marketing and /impact/sales.

## /impact/hr hero — Moments bento (added 2026-10-12)

Figma n9SjmDjzB1PeZAYJ5w43fr **5388:21262** (V2 of the HR hero variations; desktop 1440 × 808, visual frame 5391:22411 = 560 × 423, the graphic cluster). `TeamHero background="canvas" visualLayout="aligned" visualMaxWidth="35rem"` — same alignment grid as /impact/marketing, /sales and /cx. Hero copy taken from the Figma frame: the description now ends "…connected to your HR tools and automated to run at scale." (was "easier to run at scale"); eyebrow, headline and CTAs unchanged.

**Tokens** — new: `canvas-yellow` #fcefc2 ("Scheduled" label). Reused: `chip-surface` (photo wells, avatar pills), `canvas-{blue,green,lilac,pink,muted,check}`, `grey-200/600/700/800`, `swag-grey`.

**Visual** — `impact/MomentsBentoScene.tsx` (Remotion, 560 × 423, 30 fps) hosted by `impact/MomentsBento.tsx` (same host behaviour as OpenSpatialCanvas). Stage-unit numbers. Three white r22 cards (shadow `0 16 40 .38`): Welcome kit 300 × 423 at (0, 0) — 276 × 268 photo well (hoodie 230², multiply), Onboarding / Delivered labels, title, hairline, UKG "New hire synced" + Spain · Madrid; Recognition 244 × 204 at (316, 0); Milestone 244 × 205 at (316, 218) with Jordan Lee pill, "5 years" (Satoshi 30), 84² gift photo, "Gift ships Friday".

**Timeline** — 0–96 intro: cards spring in at frames 0 / 10 / 20, the hoodie settles, "Delivered" pops, "+50 pts" counts 0 → 50, "5 years" counts 0 → 5, the gift photo settles. Frame 96 = the Figma frame (also the reduced-motion still). 96–396 loop: the three moments take turns — Welcome kit lifts and "Delivered" pulses (loop frame 20–70), Recognition lifts and "+50 pts" pulses (105–155), Milestone lifts and the gift photo breathes (190–240); values are at rest at both loop ends; each card floats on a whole-cycle sine (±2).

**No crop** — Player `overflowVisible`; nothing leaves 0…560. **Behaviour** — aria-hidden, non-interactive, pauses off-screen, reduced motion → still at frame 96. **Assets** (`public/impact/hr/hero/`) — `photo-welcome-kit.jpg` (600²), `photo-anniversary-gift.jpg` (320 wide), `avatar-{arun,jordan}.png` (56²), `logo-ukg.svg` (teal, from Figma; the shared `logos/ukg.svg` is grey-tinted for the logo strip). Spain flag drawn in CSS; calendar icon inline SVG.

# **Licence note** — Remotion company-licence caveat as for /impact, /impact/marketing, /sales and /cx.

## /impact/leadership hero — Guardrails tray (added 2026-10-12)

Figma n9SjmDjzB1PeZAYJ5w43fr **5401:23861** (V4, "tray + strip"; desktop 1440 × 808, visual frame 5405:22662 = 580 × 357, the graphic cluster). `TeamHero background="canvas" visualLayout="aligned" visualMaxWidth="36.25rem"` — same alignment grid as /impact/marketing, /sales and /cx. Page copy kept as shipped ("Talk to sales" primary; the Figma frame labels it "Book a demo").

**Tokens** — new: `canvas-yellow` #fcefc2 (Finance label). Reused: `chip-surface`, `grey-300/800`, `canvas-{lilac,pink,blue,green,muted}`, `signal-green`, `swag-grey`.

**Visual** — `impact/GuardrailsTrayScene.tsx` (Remotion, 580 × 357, 30 fps) hosted by `impact/GuardrailsTray.tsx`. Stage-unit numbers. Tray 580 × 285 (`chip-surface`, pad 14, gap 8, r22, shadow `0 16 40 .38`): header (shield chip 28 r10 + "Company guardrails" 15 bold; Arun Mehta · COO avatar pill) and three white r16 rules 63 high (budget cap `$25,000 / qtr` pill; two dark toggles 40 × 24). Connector 2 × 22 at x 289, y 285 with two 9px nodes; strip 580 × 50 at y 307 (white r18, shadow `0 12 28 .34`) "Applies to" + HR / Marketing / Sales / CX / Finance labels.

**Timeline** — 0–96 intro: tray springs in, rules at 10/18/26, cap counts $0 → $25,000, toggles flip on, connector draws, strip and labels pop. Frame 96 = the Figma frame (also the reduced-motion still). 96–396 loop: rules light in turn, the approval toggle goes off and back on, a green policy packet runs the connector at loop frames 150 and 250 and the team labels light left → right; rest pose at both loop ends, whole stage floats ±2.5 on one whole cycle.

**No crop** — Player `overflowVisible`; nothing leaves 0…580. **Behaviour** — aria-hidden, non-interactive, pauses off-screen, reduced motion → still at frame 96. **Assets** (`public/impact/leadership/hero/`) — `avatar-arun.png` (copy of the /impact one).

**Licence note** — Remotion company-licence caveat as for /impact, /impact/marketing, /impact/sales and /impact/cx.

## /impact/office-admins hero — Needs board (added 2026-10-12)

Figma n9SjmDjzB1PeZAYJ5w43fr **5422:22465** (V1 of the Office Admins hero variations in the frame "STADIUM FOR OFFICE ADMINS"; desktop 1440 × 808, visual frame = 580 × 440, the graphic cluster). `TeamHero background="canvas" visualLayout="aligned" visualMaxWidth="36.25rem"` — same alignment grid as /impact/marketing, /sales, /cx, /hr and /leadership. Hero copy is unchanged (it already matched the Figma frame).

**Tokens** — none added. Reused: `chip-surface` (photo wells, "This month" pill), `canvas-muted` (secondary text), `canvas-check` (status check stroke), `grey-200` (hairlines), `grey-300` (connectors), `grey-800` (text, node strokes), `swag-grey` (avatar-pill role).

**Visual** — `impact/OfficeNeedsBoardScene.tsx` (Remotion, 580 × 440, 30 fps) hosted by `impact/OfficeNeedsBoard.tsx` (same host behaviour as OpenSpatialCanvas). Stage-unit numbers. Admin pill (Maya Chen, Office admin; 28 avatar, padding 4/12/4/4, shadow `0 3 10 .28`) at the top centre, a 40-unit connector down into the Stadium card (580 × 186 at y 76, r16, padding 16, shadow `0 8 24 .2`): header (30 Stadium mark disc, "Stadium" Satoshi 16, "This month" pill) and five 100-wide need tiles (72-high `chip-surface` r12 wells — Snacks / Swag photos at 72² multiply, Gifts photo cover, Events calendar "FRI 14", Employee needs "STIPEND $50" in Satoshi 28 — each with a name and a count). Four bezier connectors (grey-300 1.75, 9-unit end nodes) fall to four 136 × 100 location cards at y 326, pitch 148: New York HQ (USA), London (UK), Berlin (Germany), Remote (Canada / India / Brazil), each with a people count and a green-check status line. Flags are drawn as SVG (the Figma flags are sprites).

**Timeline** — 0–96 intro: admin pill pops, the line to Stadium draws, the card springs in (frame 8), the five tiles settle at 24 / 29 / 34 / 39 / 44 while their counts run (128 / 46 / 74 / 9 / 31), the four connectors draw at 40 / 45 / 50 / 55, the location cards land at 52 / 57 / 62 / 67 and their checks draw. Frame 96 = the Figma frame (also the reduced-motion still). 96–396 loop: the admin sends one request at a time (loop frames 16 / 76 / 136 / 196): a packet drops from the admin into Stadium, the matching tile lifts (Snacks → New York HQ, Swag → London, Events → Berlin, Gifts → Remote), a packet runs down its connector (the line lights behind it) and the destination lifts while its check pulses. Admin pill, Stadium card and the four location cards float on whole-cycle sines (±1.5–2); the connectors follow the floating cards. Everything is at rest at both loop ends (seam delta ≤ 0.1 unit).

**No crop** — Player `overflowVisible`; nothing leaves 0…580. **Behaviour** — aria-hidden, non-interactive, pauses off-screen, reduced motion → still at frame 96. **Responsive** — verified 1100 / 1280 / 1440 / 1900: visual width 580, right edge on the Talk-to-sales edge, copy on the logo edge, equal padding above/below; below `xl` it stacks under the copy and scales (343 wide at 375, no horizontal scroll). **Assets** (`public/impact/office-admins/hero/`) — `photo-snacks.jpg` (240², from Figma), `photo-gifts.jpg` (300 × 216, from Figma), `photo-swag.jpg` (240², same hoodie shot as `overview/hero/thumb-hoodie.jpg`), `avatar-maya.png` (56², same as `overview/hero/avatar-maya.png`), `stadium-mark.svg` (same as `sales/hero/`).

**Licence note** — Remotion company-licence caveat as for /impact, /impact/marketing, /sales, /cx, /hr and /leadership.

## /impact/finance hero — Budget bar (added 2026-10-12)

Figma n9SjmDjzB1PeZAYJ5w43fr **5434:22890** (V1 of the Finance hero variations in the frame "STADIUM FOR FINANCE"; desktop 1440 × 808, visual frame = 580 × 437, the graphic cluster). `TeamHero background="canvas" visualLayout="aligned" visualMaxWidth="36.25rem"` — same alignment grid as /impact/marketing, /sales, /cx, /hr, /leadership and /office-admins. Hero copy is unchanged (it already matched the Figma frame).

**Tokens** — none added. Reused: `chip-surface` (Finance pill, quarter pill, average pill), `canvas-{lilac,pink,blue,green}` (team labels, saving disc), `canvas-muted`, `canvas-check` (savings), `grey-200/300/600/800` (hairlines, connectors, split-bar shades, text), `swag-grey` (lead names, role).

**Visual** — `impact/FinanceBudgetBarScene.tsx` (Remotion, 580 × 437, 30 fps) hosted by `impact/FinanceBudgetBar.tsx` (same host behaviour as OpenSpatialCanvas). Stage-unit numbers. Finance card 580 × 136 (r16, shadow `0 8 24 .2`, clipped): Arun Mehta pill (28 avatar, 4/12/4/4) + "Q4 2026" pill, "$480,000" Satoshi 38, "engagement budget" caption, "Finance reserve $40K", and a 12-high split bar flush with the card's bottom edge (HR 131.1 · Marketing 166.8 · Sales 119.2 · CX 107.3 · Reserve 47.7, shades grey-800 / grey-600 / canvas-muted / grey-300 / grey-200, 2 gaps). Four bezier connectors (grey-300 1.75, 9-unit nodes) drop from the segment centres to four 136 × 171 columns at y 182, pitch 148: team label with a swatch matching its segment, amount (Satoshi 26), spent bar + %, "Saved $…" with a green trend-down icon, and the team lead (20 avatar). Strip 580 × 70 at y 367: green disc, "Teams save on average with Stadium", "$15,000" (Satoshi 28), "Average across 4 teams" pill. Savings 12.4 + 17.8 + 14.1 + 15.7 average exactly $15.0K.

**Timeline** — 0–96 intro: card springs in (frame 0), $480,000 counts up (10–56), the split bar grows segment by segment (18 / 24 / 30 / 36 / 42), connectors draw (44 / 49 / 54 / 59), columns land at 48 / 53 / 58 / 63 while their amounts, spent bars and savings count up, the strip lands at 70 and $15,000 counts up (72–94). Frame 96 = the Figma frame (also the reduced-motion still). 96–396 loop: the budget is allocated team by team (loop frames 14 / 64 / 114 / 164): the team's segment lightens, a packet runs down its connector (the line lights behind it), the column lifts and its amount, saving and swatch pulse; at 220 the strip lifts and $15,000 pulses. Everything is at rest at both loop ends (seam delta ≤ 0.1 unit). The Finance card, columns and strip float on whole-cycle sines (±1–2); connectors follow them.

**No crop** — Player `overflowVisible`; nothing leaves 0…580. **Behaviour** — aria-hidden, non-interactive, pauses off-screen, reduced motion → still at frame 96. **Responsive** — verified 1280 / 1440 / 1900: visual width 580, right edge on the Talk-to-sales edge, copy on the logo edge, equal padding above/below (143.5); below `xl` it stacks under the copy and scales (343 wide at 375, no horizontal scroll). **Assets** (`public/impact/finance/hero/`) — `avatar-{arun,grace,maya,alex,jordan}.png` (56², copies of the existing hero avatars). No photos.

**Licence note** — Remotion company-licence caveat as for /impact, /impact/marketing, /sales, /cx, /hr, /leadership and /office-admins.

## Batch 3 hero visuals — animated (added 2026-10-12)

Figma n9SjmDjzB1PeZAYJ5w43fr, frame **Batch 3** `5443:23009` on "🧪 Final Hero Sections" (14 approved heroes; read from the *current, hand-tweaked* frames — where a visual frame no longer hugged its content, the stage is the bounding box of the visible content, hidden layers ignored). One Remotion scene per page in `app/components/impact/batch3/` (default export = host built on `SceneHost` in `batch3/shared.tsx`: play-once intro, loop 96 → 396, pause off-screen, reduced motion = still at frame 96, `aria-hidden`). Pages: `/the-proof`, `/enterprise`, `/workspaces`, `/roles-and-permissions`, `/wallets-and-budgets`, `/integrations`, `/integrations/{hris,browser-extension,api,zapier,webhooks,sso,security}`, `/csr` — all `TeamHero background="canvas" visualLayout="aligned"` (the blue Impact-by-team backdrop; the green backdrop is no longer used by these pages); the `/integrations/*` detail pages pass `heroVisual` + `heroVisualWidth` through `IntegrationDetail` (new optional props).

| Page | Scene | Stage (W×H) | `visualMaxWidth` | Story / loop |
|---|---|---|---|---|
| /the-proof | `TheProofGrowth` | 525×411 | 32.8125rem | 3 cards: 100 → 350 → 800 employees, one admin; years light in turn |
| /enterprise | `EnterpriseTiers` | 580×390 | 36.25rem | programs on controls on infrastructure; pulse runs down the tiers |
| /workspaces | `WorkspaceTree` | 580×321 | 36.25rem | company → regions tree; packet runs each branch |
| /roles-and-permissions | `AccessSheet` | 560×423 (visible content; 2 hidden "Cannot" rows omitted) | 35rem | role selector slides Manager → Contributor → Manager, toggles respond |
| /wallets-and-budgets | `WalletLimits` | 441×413 | 27.5625rem | wallet + approved / held orders; limit check cycle |
| /integrations | `IntegrationsWays` | 580×377 | 36.25rem | tabs over connected systems; sync dots pulse |
| /integrations/hris | `HrisMoments` | 580×329 | 36.25rem | record fields → three automatic moments |
| /integrations/browser-extension | `ExtensionPopup` | 564×364 | 35.25rem | popup over profile; amount steps, send, toast |
| /integrations/api | `ApiOverCode` | 412×482 | 25.75rem | request card above app UI; request cycle |
| /integrations/zapier | `ZapStack` | 580×363 | 36.25rem | run cycle down the expanded Zap |
| /integrations/webhooks | `WebhookSequence` | 580×384 | 36.25rem | sequence diagram replayed as packets |
| /integrations/sso | `SsoSignIn` | 610×508 | 37.5rem (scaled ×0.98) | packet IdP → sign-in; button press |
| /integrations/security | `SecurityTrack` | 580×283 | 36.25rem | shield passes the four stages; scanner sweeps the day ticks |
| /csr | `CsrImpact` | 580×324 | 36.25rem | impact cards lift in turn; stat counts to 62% |

**Timeline** (all scenes, 30 fps): 0–96 intro (frame 96 = the Figma frame), 96–396 loop; every loop value is at its rest pose at both ends (verified: all 14 scenes have rect/opacity/text deltas ≤ 0.13 stage units between frames 96 and 395). **No crop** — Player `overflowVisible`; nothing leaves the stage. **Tokens** — none added; stage-internal inline values are rgba glows/shadows and a few documented hex mixes. **Assets** (`public/impact/batch3/`) — avatars (56²), photos (hoodie, hoodie-big, cap, tee, snacks, gift, anniv), logos (UKG svg; ADP/Gusto/Paylocity small PNGs at 1×), `stadium-mark.svg`. **Copy** — `/the-proof` and `/enterprise` CTAs changed to "Talk to sales" + "Explore the platform" to match Figma. **Known caveats** — Gusto/Paylocity logos are 1× PNGs (soft on high-DPI); hero visuals on the pages were verified at 1280/1440 only.

**Licence note** — Remotion company-licence caveat as for the earlier hero visuals; these are the first Player visuals on these 14 pages.


# Static content pages — `StaticPage` (added 2026-10-16)

Reusable template for long-form static content: `/privacy-policy`,
`/terms-of-use`, `/points-terms-of-use`, `/safelist`, and any future legal /
policy page. Figma `n9SjmDjzB1PeZAYJ5w43fr` → frame "static content page
template" (`5706:6693`) → **FINAL · Layout B** (desktop 1440 + mobile 390 closed /
dropdown open / dropdown search). Replaces the old `PageLayout` + `PageHero`.

Files (`app/components/page/`):

| File | Role |
| --- | --- |
| `StaticPage.tsx` | Server template: SiteHeader → hero → sheet (TOC + article) → PageClose. Derives TOC, anchor ids and reading time from its children. |
| `StaticPageHero.tsx` | Night hero (same raster + type as `TeamHero`, `hero-canvas-bg.jpg`), eyebrow → title → summary → outlined meta pills. |
| `StaticPageToc.tsx` | Client. `TocRail` (lg+, sticky) and `TocDropdown` (< lg, sticky bar + search panel). One scroll-spy (`useActiveId`). |
| `StaticPageAside.tsx` | Cards for the `aside` slot: `CtaCard`, `RelatedLinks`, `AtAGlance`, `AsideStack`. |
| `mdx.tsx` | Markdown element styling (h2/h3/h4, p + "In short" callout, lists, links, table…), wired in `/mdx-components.tsx`. |

## Adding a page

Create `app/<route>/page.mdx` (nothing else to register):

```mdx
import StaticPage from "@/app/components/page/StaticPage";

export const metadata = { title: "Cookie Notice | Stadium", description: "…" };

<StaticPage title="Cookie Notice" updated="June 17, 2025" summary="One-line hero summary.">

Intro paragraphs…

## 1\. What we use cookies for \{#use}

**In Short:** one-sentence summary (renders as the grey callout).

Body, lists, tables, links…

### Sub-heading (anchor only)

</StaticPage>
```

Props: `title` (required), `eyebrow` (default "Legal"), `summary`, `updated`,
`readTime` (auto from word count at 200 wpm; `false` hides), `contact`
(`{title, body, email}` or `false` — shorthand for the default aside), `aside`
(JSX that replaces the default aside, see below), `tocLabel` (default "On this page").

Authoring rules:
- Every `##` is a TOC entry; a leading "1\." is stripped from the TOC label but
  kept in the heading. `###` / `####` get anchors but are **not** in the TOC.
- `\{#id}` after a heading pins a stable anchor (needed when other pages link
  to `/privacy-policy#rights`). Without it the id is slugified from the title.
  Duplicate ids get `-2`, `-3`. The marker is stripped from the rendered text.
- Pages with ≤ 1 `##` render without a TOC: the 50rem reading column is pinned to
  the content box's left edge (same edge as the hero copy and header logo — a
  centered column looked misaligned against the left-aligned hero) and, at lg+,
  the `contact` card moves into a **sticky right column** (`--container-rail`
  wide, `sticky top-28`, flush with the header's right edge). Below lg that card
  closes the article instead, so it is never shown twice. With `contact={false}`
  (and no `aside`) the right column is simply empty.
- Write headings in sentence case (`## 3\. Will your information be shared?`).
- Always spell brands Stadium / Snackmagic / Swagmagic.

## Layout spec (tokens only — no new colours)

| Part | Desktop (lg+) | Below lg |
| --- | --- | --- |
| Hero | `px-section-x-lg`, `pt-44 pb-40`, title `text-display-pricing`, summary `text-body-xl`, pills `h-button-h` outlined white | `pt-32 pb-24` (md: `pt-40 pb-28`), title `text-display-sm` / `md:text-display-md` |
| Sheet | white, `rounded-t-panel` (60), overlaps hero `-mt-16` | `rounded-t-modal` (32), `-mt-8` |
| Grid | `[var(--container-rail)=18.5rem] / minmax(0, var(--container-article)=50rem)`, `gap-x-22` (5.5rem), inside `max-w-content` so the rail aligns with the header logo | single column, `px-section-x-sm` / `md:px-section-x-md` |
| TOC | `TocRail`: `sticky top-28`, `border-l-2` items, active = `border-grey-800` + semibold, `text-body-sm` | `TocDropdown`: bar `sticky top-16` (= SiteHeader's 4rem scrolled height), trigger shows "On this page / 03 Section title", panel = search + list |
| Body | `text-legal` (17 / 1.62, `--text-legal`), `text-grey-700`, column gap `gap-6` | `text-body-md` / 1.6, `gap-5` |
| h2 | `text-heading-md`, `border-t border-grey-200 pt-12 mt-6` (rule between sections), `scroll-mt-28` | `text-heading-sm`, `pt-8`, `scroll-mt-40` (clears header + dropdown bar) |
| Callout | `bg-grey-100 rounded-2xl`, eyebrow "In short" (`text-eyebrow-sm`, grey-500) + `font-semibold` text | same |
| Contact card | `bg-impact-hero-night rounded-3xl`, white pill CTA (`mailto:`). With a TOC: closes the article (row layout from md). Without a TOC: sticky right column at lg+, stacked layout | stacked, closes the article |

Tokens added to `globals.css`: `--container-rail` 18.5rem, `--container-article`
50rem, `--text-legal` 1.0625rem / 1.62.

## The `aside` slot (sticky CTA / extra cards)

`aside` takes any JSX. Where it lands:
- no TOC, lg+ → sticky right column (`--container-rail` wide, `top-28`, flush with
  the header's right edge); below lg → closes the article
- with a TOC → closes the article (the rail occupies the left column)
Default (nothing passed) = the dark `contact` CtaCard, so existing pages are unchanged.
Several cards are stacked with `gap-4` automatically.

Ready-made cards — registered in `/mdx-components.tsx`, **no import needed in MDX**:

| Component | Props | Look |
| --- | --- | --- |
| `<CtaCard>` | `title`, `body?`, `action: {label, href}` | dark night card, white pill button; row layout when it spans the article, stacked in the column (CSS container query) |
| `<RelatedLinks>` | `title?` ("Related documents"), `links: [{label, href}]` | light grey card, hairline-separated rows with an arrow |
| `<AtAGlance>` | `title?` ("At a glance"), `items: [{label, value}]` | light grey card, label / value pairs |

```mdx
<StaticPage title="Cookie Notice" aside={<>
  <CtaCard title="Need help?" body="Talk to our team." action={{ label: "Book a call", href: "/book-a-call" }} />
  <AtAGlance items={[{ label: "Last updated", value: "June 17, 2025" }]} />
  <RelatedLinks links={[{ label: "Privacy Policy", href: "/privacy-policy" }]} />
</>}>
```

Adding a new card type: export a component from `StaticPageAside.tsx` (use
`LightCard` for the grey style, or wrap in `@container` for width-aware layouts)
and add it to `/mdx-components.tsx`. In `.tsx` pages import it directly.

## Mobile dropdown behaviour (`TocDropdown`)

- Sticky under the fixed header; trigger is a `button[aria-expanded][aria-controls]`.
- Opening focuses the search field, dims the page (`bg-ink/45` scrim, closes on
  tap), `Esc` closes and returns focus to the trigger, ↓/↑ move between the
  field and the options.
- Search filters section titles (case-insensitive substring), highlights the
  match in `accent-water`, announces "n results" via `aria-live="polite"`, and
  shows "No sections match “…”" when empty. Clear (×) button resets.
- Selecting an option is a normal `#id` link: the page jumps, the dropdown
  closes and the trigger label updates. Works without JS (anchors only).
- Current section: scroll-spy picks the last heading above the 30% viewport line.

## Notes / known limits

- TOC extraction runs on the **top-level** children of `<StaticPage>` (what
  Markdown produces). Headings nested inside custom JSX wrappers are styled but
  not added to the TOC.
- `/safelist` follows the original bystadium.com page: one "Email & Web" section
  (so no TOC rail — single left-aligned column) followed by a 3-column
  Domains | Emails | Web table. It uses `<ColumnTable>`, available in any
  StaticPage MDX file without an import:
  `<ColumnTable columns={[{ title: "Domains", items: ["@a.com", …] }, …]} />`
  (header row + one list per column; scrolls sideways below `sm`). GFM
  `| pipe |` tables are not enabled in the MDX config — use `ColumnTable`, or
  plain `<table>` JSX (styled by the `table/th/td` mappings).

---

# /catalog — product catalog page (`app/catalog/page.tsx`, added 2026-10-16)

Figma `n9SjmDjzB1PeZAYJ5w43fr` frame **5291:18726** (desktop only — narrower
layouts reuse the same tokens). Components live in `app/components/catalog/`;
all copy, links and card data in `data.ts`. Every value below is a token in the
`/catalog` `@theme` block at the bottom of `globals.css`.

## Structure

`CatalogHero` (black) → `CatalogExplorer` (client: four sections, tab pill, CTA
pills, modal) → `ClosingCTA` → `PageClose`.

| Part | Figma | Notes |
| --- | --- | --- |
| Hero copy | 5291:18747 | eyebrow `text-eyebrow-sm` `catalog-eyebrow`; h1 58/1.02 (`text-display-pricing`); lead 19/1.52 (`text-catalog-body`); CTAs `catalog-cta` blue + white outline |
| Marquee wall | 5297:6154 | 14 columns × 15 cards (≈210 slots over all 178 section photos — each used at least once; shuffled so every column mixes sections, see `buildHeroColumns`), 75-wide tiles (ratio 1 : 1–1.44, r8 `rounded-catalog-chip`), gutter 11 (0.6875rem); 5 cols mobile / 9 tablet / 14 desktop; viewport 1140 (`h-catalog-hero-grid`); bottom fade 62% to black |
| Tab pill | 5291:19092 | white pill, p10, 4 × 190 tabs, active `catalog-ink`; label 12/16 +1px bold (`text-catalog-tab`) — mobile 11px `text-catalog-tab-sm`, short labels below `lg` |
| CTA pill | 5633:24820 | `catalog-ink` pill, two 190-wide white-outline buttons; mobile = flex-1, "View {noun}" |
| Heading panel | 5291:18798 | black, r60 (`rounded-catalog-panel`), min-h 539 (`min-h-catalog-heading`); overlaps previous mosaic by 60 |
| Mosaic | 5299:6294 … 5340:27624 | 7 cols (tablet 5, phone 2), 160 tile, gutter 13.33 (`catalog-gap`); product r20, brand/country r24 on `catalog-tile` #202020 spanning 2 cols |
| Modal | 3693:8077 | 1200 card r32, 16px well + 600×691 r24 photo, 40px copy column; shadow `shadow-catalog-modal` |

## Behaviour

- **Marquee**: pure CSS (`.catalog-track`, `@keyframes catalog-marquee`). Two
  identical halves → translate −50%; per-column duration 70–109s, alternating
  direction, negative-delay phase. Static under `prefers-reduced-motion`.
- **Page + panels**: the whole page is `#000` (hero, mosaics, closing). Each
  category intro panel is `min-h-svh` (full height); mosaic fades run to black.
- **Sticky docks**: the white tab pill is pinned for the whole catalog (one
  zero-height `sticky bottom-0` dock as the last child of the hero + sections
  wrapper, so it releases at "Ready to get started?"); the active tab follows the
  section under the viewport's 45% line (Swag in the hero). Each
  section's dark CTA pill sits in its own raised dock *inside the section* — it
  slides up above the tab pill (transform only — no fade) once its section's top crosses the viewport's 50% line, and stays "shown" until the section has left the screen so it scrolls away with its
  parent. Both CTAs share one width (`inline-grid auto-cols-fr`, nowrap) so the
  longest label ("View experiences catalog") is never trimmed. Tab click → smooth
  `scrollIntoView` (instant when reduced).
- **Mosaic marquee**: `buildMosaicColumns()` (data.ts) deals every photo in the
  section exactly once — 35 swag · 35 gifts · 73 snacks · 35 experiences, from the
  Figma tab frames, products in `products.ts` — plus 5 brand cards, 5 country
  cards and 1 "170+ countries" coverage card into 7 independent columns (tablet
  shows 5, phone 2). Every column is an endless vertical marquee — the same
  two-identical-halves `.catalog-track` as the hero but slower (≈6.5–13px/s vs
  ≈10–23px/s in the hero): every column gets its own speed — evenly spread over
  the range then shuffled per section (`spreadSpeeds`) — a random direction and a
  random negative-delay phase; duration = loop height ÷ speed. A half must be taller than the viewport
  (`MIN_LOOP_REM` 100) or the loop shows a gap, so short columns (gifts has only
  9 photos) repeat their cards inside the loop. Loops pause while the mosaic is
  off-screen (`.catalog-paused`) and are static under reduced motion. Cards are
  single-column width with fixed rem heights (photos 3:4 → ≈13.3rem); the mosaic
  viewport is tall to show catalog scale (`h-catalog-mosaic` 120rem lg, 100rem tablet,
  90rem phone; `MIN_LOOP_REM` 140 keeps loops taller than it) with black fades. The looping second half is clickable but `tabIndex=-1` / `aria-hidden`.
- **Page end**: the active tab never snaps back to Swag — below the last section
  it stays on Hosted Experiences. Once the last section's bottom is above 90% of
  the viewport both pills fade out in place (`ended`, opacity only, 0.5s).
- **Reveal**: cards use the global `data-animation="reveal"` (fade + rise +
  de-blur) with explicit `data-reveal-delay` (0–280ms by column) so a whole
  mosaic does not cascade by sibling index.
- **Modal**: card click opens `CatalogProductModal` — Esc / scrim / ✕ close,
  focus moves to ✕ and returns, Tab trapped, body scroll locked. "Book a call"
  → `/book-a-call`; "View {noun} catalog ↗" opens `section.catalogHref` in a new tab.

## Content notes (not in Figma)

- Product names/descriptions, the four blurbs and the coverage card copy are
  written for this build; "Seedly Peppermint Bark" and the brand/country cards
  come straight from the Figma frames. Brand cards show each brand's own mark in white —
  Simple Icons SVGs (simple-icons@13.21.0, CC0 icon files; the marks remain the
  owners' trademarks), viewBox cropped to the glyph and `fill="#fff"`, in
  `public/catalog-page/logos/`.
- Photos and product names come from the Figma tab frames (5747:6964 swag,
  5781:15841 gifts, 5727:7488 snacks, 5772:6917 hosted experiences), exported as
  1200w JPEG q88 into `public/catalog-page/{swag,gifts,snacks,experiences}/NN.jpg`
  (the 14 hero tiles stay at the folder root). The modal pill shows the item's
  subcategory ("Apparel", "Team Games" …; "Gifts" for gifts). Descriptions are
  written per subcategory (gifts: per item) — Figma has none. Gift photos are
  named by type only ("coffee set", "watch box" …), so those titles are descriptive.
- Catalog links: Swag → swagmagic.com catalog, Snacks → snackmagic.com/our-snacks,
  Experiences → withconfetti.com/explore, Gifts → `/gifting`.

## Circle flags (added 2026-10-16)

Wherever a country flag is shown, use `<CircleFlag code="de" />`
(`app/components/CircleFlag.tsx`) — never an emoji. It mirrors the **Circle flag**
component set on the Figma "Circle flags" page (file `n9SjmDjzB1PeZAYJ5w43fr`,
set `5795:7082`): 15 flags (AE AU BR CA DE FR GB IN IT JP MX NL SE SG US), a
`Country` variant property, `Border` / `Shadow` boolean properties, and the
variables `circle-flag/border-width` (1.5) and `circle-flag/border-color` (#fff)
bound to the border layer, plus the effect style `Circle flag/shadow`. Artwork:
MIT-licensed circle-flags SVGs in `public/flags/{code}.svg`.

Code knobs: `size` (default 1.25rem — the 20px in the Figma design), `border`,
`borderWidth`, `borderColor`, `shadow` (boolean or any CSS shadow), `label`; or
set `--circle-flag-border-width` / `--circle-flag-border-color` /
`--circle-flag-shadow` on any ancestor (defaults in `:root`, globals.css). The
catalog country cards use `size="3.375rem"`. New flag = drop the SVG in
`public/flags/`, add the code to `FLAG_CODES`, add a variant in Figma.

## Catalog content — update 2026-10-16

- **Snacks** now uses the whole SnackMagic taxonomy frame (Figma 5727:7180 "02 ·
  Snacks — by taxonomy"): Snacks 25 + Beverages 24 + Pantry 24 =
  73 photos (`public/catalog-page/snacks/01–73.jpg`; modal pill = subcategory such
  as "Cold Brew"; the Work & Play tab, 74–97, was removed 2026-10-18). Swag (35 / frame 5747:6964) is unchanged.
- **Hero wall** shuffle: all 178 photos (35 + 35 + 73 + 35), 8 spare slots repeat
  swag / gifts / experiences so snacks (55% of the photos) do not dominate. Each
  section's photos are dealt evenly across the 14 columns, then every column is
  ordered greedily — pull from the section with the most cards left that differs
  from the previous card, and prefer a different category.

- **Marquee pacing (2026-10-16)**: hero and mosaic speeds are per-column and seeded-random (not alternating); both ranges are 25% slower than the first pass (hero 10–23px/s on the 75px Figma tile, mosaic 0.4–0.82rem/s).

## Catalog polish — 2026-10-16

- **Section intros**: the black panel holds only the section name — `h2` in **Satoshi
  Light 300** (`app/fonts/Satoshi-Light.woff2` from Fontshare, loaded as
  `--font-satoshi-light`, isolated like Medium; 300 is Satoshi's lightest cut),
  letter-spacing −0.075em, one line, white. Font size:
  one size for every name, `min(16rem, -0.406504rem + 10.5501vw)` (≈ 151px
  at 1440, capped at 16rem from ≈ 1560px wide). The old blurb copy is no
  longer rendered.
- **Pills**: CTA buttons use the tab pill's button height (py-3.5 / md py-0.8125rem →
  42px). All pills appear and leave with the site reveal — opacity + scale .9→1 +
  blur .5rem→0 + 0.75rem rise, 0.9s expo — instead of sliding from below the fold.
  No tab is selected until a section crosses the 45% line (the hero has none); it
  stays on Hosted Experiences below the last section.

## Header "Catalog" link (2026-10-16)

The Catalog mega-menu is parked: `NAV_ITEMS` in `SiteHeader.tsx` renders "Catalog" as
a plain link to `/catalog` (no chevron, no dropdown, plain link on mobile too). To
restore the dropdown set `SHOW_CATALOG_DROPDOWN = true` at the top of that file —
`CatalogMenu.tsx`, its drawer panel and the mobile accordion are untouched.


## /catalog — motion, columns and width (latest)
- **Container**: marquee + mosaic are `page width − 12.5rem` (100px a side) at `lg+` (`--container-catalog-grid: calc(100% - 12.5rem)`); below `lg` the section padding applies as before.
- **Columns reveal with width** so tiles keep their size: hero 5 → 9 (md) → 10 (lg) → 13 (80rem) → 15 (90rem) → 17 (105rem) → 20 (120rem); mosaic 2 → 5 (md) → 6 (80rem) → 7 (90rem) → 8 (105rem) → 9 (120rem).
- **Motion**: one constant pace everywhere (hero 9.8px/s on the 75px tile, mosaic 0.61rem/s — the Swag benchmark), strict alternation (`column index % 2` → up/down), phase 0 (no per-column offset).
- **Logo (brand) tiles removed** from the mosaics; the `/public/catalog-page/logos` files are now unused.
- **Brand tiles (re-added)**: white SVG marks in `public/catalog-page/logos/` — Swag: Nike, Carhartt, The North Face, TravisMathew, New Era, adidas · Gifts: Apple, Rubik's, Logitech, Sony, Ray-Ban, JBL · Snacks: Hal's New York, Hu, SmartSweets, Tate's, Poppi, Hippeas · Experiences (no logos, text tiles with bookings): Escape Quest, Coworker Clash, Team Trivia, Puzzles, Terrarium Workshop. Hu, Hippeas and Tate's were traced from the brands' PNG logos (no SVG published).
- **No repeats in neighbouring columns**: hero photos and mosaic products are split into two halves; even columns draw from half A, odd from half B, and a column never repeats a card. Brand / country / coverage tiles appear once per section.

## /pricing updates (hero parity with bystadium.com/go/pricing)

- Hero: subhead + "included with every pass" row (truck + wallet); each pass card has tagline, "lead" chip (No pass needed / X, plus) and Engagement carries an "Optional add-ons (Confetti)" tray. Card height is `min-h` so the add-ons card grows the row.
- Comparison header row is sticky at lg+ (`top-16`, under the fixed header): white bg always; `shadow-header-stuck` (`0 0.5rem 0.75rem -0.25rem rgba(0,0,0,.14)`) only while pinned (IntersectionObserver in `pricing/StickyHeadRow.tsx`). Below lg the table scrolls horizontally, so sticky-top is not applied there.
- **Section heading panels** are a fixed 720px (45rem, `h-catalog-heading`) so the start of each section is unmistakable.

## /events hero graphic — Confetti design system (2026-10-19)

Figma `n9SjmDjzB1PeZAYJ5w43fr` → **5892:11404** (1160 × 600, r20). Component
`app/components/EventsHeroGraphic.tsx`, used by `ExpHero2` in place of the old
flat `heroGraphic.png`. Live UI: text, icons, cards and tags are real DOM (vector-
crisp at any pixel density); only the webcam photos are raster — 16 tiles
(`public/events/hero/tile-*.webp`, 308 × 220 = 2× the 154 × 110 tile, Lanczos +
light unsharp, ≈ 3 KB each) and the host (`host.webp`, 956 × 928, ≈ 140 KB),
served through `next/image`. Wordmark: `public/events/hero/confetti-logo.svg`.
Tiles are the Zoom-collage crops (Figma 5892:11540); host photo is the original
hero portrait.

**Confetti tokens** (`globals.css` `@theme`): `cf-ink #120E14` (all text/fills are
alpha steps: /80 secondary, /64 tertiary, /8 track, /4 well), `cf-gold #F5BB1D`
(rank 1), `cf-blue #3E97FF` (rank 2), `cf-red #F04561` (rank 3), `cf-violet #8E67FF`,
`cf-coral #FD5565` (game tile), `cf-live #FF2840`; `shadow-cf-card` = 0 4 16 −4
ink@16 %, `shadow-cf-frame` = 0 24 48 −12 black@35 %.
Type: **Nunito** 700/800 via `next/font/google` (scoped to this component).

**Layout** — frame r20 (`1.25rem`), 2px white border, 16px padding, gradient
`135deg #FFE1EA 0 → #FFF0DC 30 → #E9F8E3 55 → #E1F0FF 80 → #EDE6FF 100`. 7-column
grid, gap 8, tiles `aspect 154/110` r12 (2px white border; leaders 3px in their
rank colour); host spans cols 3–5 × 4 rows (r16); lower third spans all 7 cols
(white, r24, h 96, `shadow-cf-card`): zap tile 30 r10 coral · "Friday Team
Showdown" 12/800 + 4 round steps (22 × 6) + "Round 3 of 5" 12/700 · question
24/800 · team score (34/800 "2,340" + "pts") · 1px divider · stats (users,
clock, 12/700). Tags r8 (rank chip white, "Hosted by" + wordmark ink@94 %, "Live ·
47 playing" white@94 %); name tags r6, ink@64 %, 11/800.

**Responsive** (Figma only has desktop, so this is derived, not specced): below
`md` the gap/padding/radii shrink and only photos + question + score show;
`md` adds the rank discs, the meta row, "Hosted by" pill and a bigger question;
`lg` adds name tags, rank percentages, the "Live" pill, divider and stats.

## /ways-to-engage — hub hero (2026-10-19)

Figma `n9SjmDjzB1PeZAYJ5w43fr` → **5714:12422** "V2 · Light editorial" (desktop
only; mobile/tablet derived). `WteHero` is now the hub: eyebrow 12/1.4 bold
caps `#6b6c71` tracking 1.6px · h1 Satoshi 56/1.04 tracking −1.4 `#16171b`,
760 wide. Five cards (`#f8f8f8`, r24, pad 22/12/12, gap 14; title Satoshi 22/1.2,
body Overpass 14/1.46 `#6b6c71`; visual slot 260 tall r18) in a 1240 row, gap 16,
section pt 48 below nav / gap 48 / pb 56. Each card links to its page:
Recognition `/recognition`, Swag `/swag`, Snacks `/snacks`, Gifting `/gifting`,
Hosted Experiences `/events`. Recognition's visual is coded UI (Punch `#ff5b77`
slot, "Kudos redeemed" white chip, three gift options); the others are photos
`public/wte/hub-*.jpg` (800 wide). Responsive: 1 col → `md:` 3 cols → `lg:` 5.

The old in-hero logo marquee is replaced by the shared home-page `TrustBand`
(latest logo set; the Figma frame's logo row is the outdated one). The
"programs" section (`WtePrograms`) is gone — the hero cards replace it. Closing
is `ClosingCTA` "Every program, one platform" (Talk to sales / Browse catalog).

### /ways-to-engage — lower sections (2026-10-19, Figma 5714:12582 → 13193)
All sections: `py-[7.5rem]` (problem `6.25rem`), inner `max-w-[90rem]` + `lg:px-[6.25rem]` = 1240 content. Section
headers: eyebrow 12 caps `#6b6c71` tracking 1.6 · h2 Satoshi 44/1.08 −0.5 (760 wide).
- **Problem** `WteProblem`: plum `#1b002f` r28 card 430 wide (eyebrow `#d8b4fe`, h2 40, chip: white/7 % fill, white/16 % border, five 68px
  pastel discs with 4px `#2a1244` ring overlapping −6px, white "ONE PLATFORM" pill) + `#f2f2f2` r28 tray of five white r18 rows
  (44px pastel disc, Satoshi 19 title, Overpass 15 body). Icons: `public/wte/icons/*.svg`.
- **Solution** `WteSolution`: "Before" `#f2f2f2` / "On Stadium" `#020912` panels r28, rows h92 with top hairline (`#d9d9d9` / white 16 %),
  28px marker disc, caps label (`#6b6c71` / `#9cc3fa`), 16px copy.
- **Journey** `WteOccasions`: six cards, images are Figma renders (`public/wte/journey-*.jpg`, UI overlays baked in); sub-line "Automated for predictable moments, ready for the rest."
- **Proof** `WteProof`: real portrait `public/wte/proof-kate.jpg`, name "Kate W.". The brand-spectrum divider between problem and solution is gone.

**/ways-to-engage hero width (2026-10-19):** the hero card row now uses the /pricing five-card container — `max-w-content` inside
`section-x` below `wide` (1300), then `max-w-pricing-cards` (1540) with 40px gutters (`wide:px-10`). Card design unchanged.

## Catalog — Swag decoration methods (2026-10-19)
- **15 deco-method cards** are part of `SWAG_PRODUCTS` (`app/components/catalog/decoMethods.ts` → `products.ts`, category "Decoration methods", `deco` = method id). They render in the Swag mosaic as product tiles with a bottom black fade + name (Figma C1, node 6031:15507) and, because the hero wall is built from the same lists, in the hero grid too. Images: `public/catalog-page/deco/*.jpg` (12 from the Figma deco frames, 3 swag-photo placeholders: cut-and-sew-sublimation, uv-printing, digital-printing).
- **`DecoMethodsModal`** (Figma 6059:9608, D2 style): left rail of all methods (thumb + name), right panel with header image, title, description, finish / min. order / lead time, "Best for" chips, and a **sticky bottom CTA bar** ("Book a call", "Browse swag ↗" — 60px pills, px 40) over a white fade. Close, rail items and CTAs all have `cursor-pointer`. Info only — nothing filters the grid. Clicking any deco card opens it at that method.

## Catalog — Snacks dietary / taste cards + modal (2026-10-19)

- Figma: cards `6031:15508` (black #202020 card, white illustration over Satoshi Bold name), modal `6046:8983`.
- 15 cards (7 dietary + 8 taste) are appended to `SNACKS_PRODUCTS` (`diet` id on `Product`), data in `catalog/dietData.ts`, icons in `public/catalog-page/diet/<id>.svg` (white, cards) and `<id>-dark.svg` (black, modal). They're excluded from the hero wall (no photo).
- Tile: vertical stack — icon (Figma art size × 0.85) + name `font-display` 1.125rem. Opens `DietModal`.
- Modal: 65rem card, r2rem, padding 2.5/2.75rem, gap 1.625rem; title Satoshi 2.25rem −0.7px; two 28.25rem columns (gap 3rem) of rows (py 0.875rem, gap 1rem, hairline #e3e4e7); name 1.0625rem, % 0.9375rem semibold #737880, desc 0.875rem #4a4f57; CTAs equal-width 3.75rem pills ("Browse snacks" — Figma typo "SNCAKS" corrected). Close + CTAs `cursor-pointer`.

## Catalog — H3 section headers (2026-10-19)

Figma "H3 — tabs: one block at a time" (swag 6036:8674, snacks 6036:9262, gifts 6075:9607, experiences 6075:9665). Implemented in `catalog/CatalogHeader.tsx`, content in `catalog/headerData.ts`.
- Panel: black, padding 6.25rem top / 5.625rem bottom (md), gap 1.75rem, min-height `catalog-heading` (45rem). Mobile: pt 6rem, pb 3.5rem, gap 1.25rem.
- Title Satoshi Light 8rem (md) / 17vw (mobile), tracking −0.03em; stat line Satoshi Bold 2rem −0.6px (mobile 1.25rem, wraps).
- Tab pill: #202020, p 0.375rem, gap 0.375rem, tabs px 1.375rem py 0.75rem Overpass SemiBold 0.9375rem; active white/black, inactive white/70. Mobile: tighter tabs, pill scrolls sideways.
- Block: max 68.75rem, r1.75rem, 1px white/18 border, p 2rem (mobile 1rem); chips centered, gap 0.625rem, border white/30, px 1rem py 0.5625rem, count white/55; dietary/taste chips carry the white diet icon.
- Tabs: Swag (Decoration Methods/Categories/Brands), Gifts (Gift Shop/Price Points/Brands), Snacks (Dietary/Taste/Categories/Brands), Experiences (Collections/Top Events/Proof). Only the first tab of each is designed in Figma; the others are derived from the info cards.

## Catalog — Deco methods modal, S1 layout (2026-10-19)

Figma `6078:9607`. `DecoMethodsModal` replaces the sidebar/detail design with the dietary-modal layout (65rem card, r2rem, two columns, hairline rows, equal-width CTAs) plus 4.5rem (mobile 3.5rem) r1rem photo thumbnails. Copy and column groups: `DECO_SHORT` / `DECO_GROUPS` in `decoMethods.ts`. Info only; the opened method's row starts highlighted until another row is hovered. The old `spec` / `best` fields are no longer shown.

## /catalog — load performance (2026-10-20)

Post-hydration effects (header scroll state, reveals, auth) were delayed ~2s by hydration weight, not by network. Fixes: (1) hero wall renders via `getImageProps` → plain `<img>` on the server (600 `next/image` client components no longer hydrate); (2) section mosaics mount client-side only within 1.5 viewports of the screen and only render the columns visible at the current width (DOM 6.2k → ~3.4k nodes); (3) header "Login/sign up" renders immediately — the cross-origin session check no longer gates it (cached profile still gives returning visitors the account menu instantly). Measured (prod, 4× CPU): effects ran at ~1.0s → ~0.65s; login visible at ~2.0s → ~0.57s. Dev: effects ~2.6s → ~1.3s.

## /catalog — grid composition, headers, modal info (2026-10-20)

- **Grid:** every mosaic column = 10–12 product photos (a photo is used in exactly one column per section) + 1 country + 1 brand logo (Swag/Gifts/Snacks) or event card (Experiences) + 1 dietary card (Snacks) + 1 stat, random order, no two non-photo cards adjacent (`buildMosaicColumns` in `catalog/data.ts`). Each column still loops (marquee) and the window is as tall as the shortest column's loop (`mosaicHeightRem`, ≈170–200rem desktop; capped 90/100rem on phone/tablet) so nothing shows twice at once. Hero wall: 300 distinct photos (quota 4/4/4/3 per column).
- **Photos:** Swag 91 (+15 deco cards), Gifts 98, Snacks 102 (+15 dietary cards), Experiences 131 — sourced from swagmagic / snackmagic / Confetti. Merge script: `scripts/merge-catalog-products.mjs`.
- **Logos:** `scripts/gen-brand-logos.mjs` → `catalog/brandLogos.ts`; sized by aspect ratio (`catalog/logoSize.ts`). Missing (no genuine source reachable): OGIO; The Gilded Nut, Swoon, Jessie's Nutty Cups; Pukka Pad, Patchology, Boogie Board, OXO, Franklin Sports, Burt's Bees, WeatherTech, Solo New York, Kobo.
- **Headers:** Swag = Categories (swagmagic's 11) → Decoration Methods → Brands; Snacks = Categories (snackmagic's 18) → Dietary → Taste → Brands; Gifts = Gift Shop → Price Points → Brands; no numbers/“+more” pills; Brands tabs are logos only.
- **Modals:** product modal shows Brand, plus Decoration methods (Swag) or Dietary (Snacks) chips, from `Product.brand / decoMethods / dietary`.

### /catalog — thumbnails (2026-10-20)
Hero wall and mosaic tiles use pre-sized static WebP thumbnails (`public/catalog-page/thumbs/<section>/<n>-s|m.webp`, generated by `node scripts/gen-catalog-thumbs.mjs` — re-run after adding photos; helper `catalog/thumb.ts`) instead of the on-demand image optimizer: ~600 hero + ~400 mosaic tiles no longer queue behind sharp, and header brand logos load eagerly. The product modal still opens the full photo through `next/image`.

### /catalog — all photos are static (2026-10-20)
Hero, mosaic and product-modal photos now come from `public/catalog-page/thumbs/<section>/<n>-{s,m,l}.webp` (160 / 400 / 1200 px) — no on-demand optimizer, so a replaced source photo can never be served from a stale optimizer cache (that caused wrong/blank modal photos). After adding or replacing any catalog photo run `node scripts/gen-catalog-thumbs.mjs`.

### Homepage hero — Figma `6525:11943` (2026-10-26)

- Desktop (`lg`) hero is **16:9** (`lg:aspect-video`, 1440×810; clips are 16:9
  so `object-cover` no longer crops) with content **bottom-aligned**
  (`lg:justify-end`): pt 160 (`pt-[10rem]`), pb **96** (`--spacing-hero-pb-lg`).
  Below lg the min-height tokens still apply. Text stays on the site's 90px
  gutter (Figma shows 120; nav + all sections use 90).
- Scrims at lg match Figma exactly: one 90° gradient
  `.65/.45/.2/.05 @ 0/30/60/100` (`--gradient-hero-base-scrim`) + the top nav
  scrim (160px: .7 → .62 @ 64px → 0). The stricter a11y 90° scrim
  (`--gradient-hero-scrim`) and `bg-ink/60` floor now apply **below lg only**.
- Type unchanged (already matched): eyebrow 16/24/+1, headline 72/82/−3,
  body 18/28/+0.25 `#ccc`; body copy width 680 (`lg:max-w-[42.5rem]`); copy
  "The platform behind recognition, swag, snacks, gifting, and hosted
  experiences."

## /new-home — infra pyramid scroll section (2026-10-26)

Replaces "The Stadium Infrastructure" on `/new-home` (a noindex copy of the home
page). Source of truth: Figma `n9SjmDjzB1PeZAYJ5w43fr` → scenes board `6749:9694`
(intro · Physical · Digital · People, 1440×1024). Code: `app/components/pyramid/`.

**Stack:** three + `@react-three/fiber` / `drei` / `postprocessing`, GSAP ticker,
Lenis (page smooth-scroll, `/new-home` only). Grain = `<EffectComposer
multisampling={8} autoClear><Noise opacity={0.2} /></EffectComposer>` (user's
snippet; MSAA drops to 4 below 768px).

**Tokens (globals.css `@theme`):** `--color-pyramid-night #060709` (stage + WebGL
clear colour), `--color-pyramid-ice #a4cefe`, `--color-pyramid-tab #1a1a1a`,
`--spacing-pyramid-card 53.25rem` (852), type `text-pyramid-display` 72/76 −2.4,
`-heading` 40/46 −0.8, `-lede` 18/28 +0.25, `-tab` 18/28, `-meta` 15/22.
Collapsed accordion tab width is `4.75rem` (76). Glass card = black/90 +
`#4d4d4d` top hairline + 30px blur, r24, p10 (same as the old block).

**Scroll model (`scroll.ts`):** sticky 100svh stage inside a `100svh × 5.9` section.
`u` = scroll inside the pin in viewport-heights. Stops: intro 0 · Physical 1.5 ·
Digital 3.0 · People 4.5; ±0.25 hold at each, 1.0 transition between. Panels rise
from below / leave upward through their own springs (k120 c17). When scroll goes
quiet (160ms) Lenis glides to the nearest stop on a damped-oscillation ease
(`springEase`, 1.25s) — a soft magnet, only between stop 0 and 3; free above and
below. Pill nav glides (1.6s). Reduced motion / "Pause animations": static stacked
version, no WebGL, no Lenis.

**Pyramid (`geometry.ts`, `PyramidCanvas.tsx`):** one square pyramid, height =
base side, sliced at apex-fractions top 0–0.24 · middle 0.345–0.62 · bottom
0.727–1 (read off the 01a vectors); slices are beveled convex hulls (r 0.045), the
ledge is the dark cap. Camera: straight down −z, 12° lens, group pitched 35.264°.
Poses in Figma px at 1440 (scaled by k = min(W/1440, H/1024), right-anchored):

| stop | apex (x from right, y) | scale | lit |
|---|---|---|---|
| intro | 330, 189 | 1× | all |
| Physical | 225, 85 (Figma 27, dropped to clear the header) | 1.454× | bottom |
| Digital | 225 from **left**, 85 | 1.454× | middle |
| People | 230, 79 | 1× | top |

Each hop spins the pyramid 180° (symmetry hides it at rest); lit slice lifts 0.1;
unlit slices fade to 40% opacity glass with a contour line. Every channel is a
damped spring (k 40–84, ζ ≈ 0.6–0.85) so arrival overshoots and settles. Below
1024px the pyramid sits above a bottom-sheet content panel (apex y 84, width ≈ 0.34W).
Stage scales to `min(1, H/1024)` (floor 0.62) on desktop so the 1024-tall layout fits.

**Content gaps (placeholders):** tab descriptions beyond each chapter's first tab,
Digital screen recordings, Physical "Customs" clip and specialist portraits were
not provided. Physical tabs 1–3 use `public/videos/infrastructure/*`; others run an
8s timer. Tabs auto-advance on `ended`.

**Revision (2026-10-26, round 2):** removed the dot grid, hairline frame, FIG tags,
contour/dashed lines, ledge caps and the top pill nav (each chapter now opens with a
"PHYSICAL / DIGITAL / PEOPLE INFRASTRUCTURE" eyebrow). Slices are hollow open shells;
faded slices are opaque pure grey (lights are white, so no blue cast). Lenis smooth
scroll and the spring snap were removed — page scroll is native; panels use a
critically damped spring, the pyramid keeps its springs. Intro pose moved toward
centre (apex 470 from right, 0.85×) with the copy indented 80px. Tab/video switches
cross-fade (0.7s); the outgoing tab holds its poster while the new one fades in.

**Revision (2026-10-26, round 3):** scroll-driven motion is bound 1:1 to scroll (no
springs on pose or panels). Unlit slices = `#111111` @ 50% glass; slices are sharp
(no bevel), glassy (roughness .05, clearcoat 1, env reflections). Chapter panels are
vertically centred on desktop; "Scroll" cue removed. Intro slices are interactive:
hover lights the slice and a glass pill (PHYSICAL/DIGITAL/PEOPLE) rests on it and
follows the cursor; click glides (1.7s ease-in-out rAF tween — the only smooth scroll
on the page) to that chapter and locks hover/click until the reader is back at the
intro. Media tabs keep every clip mounted and cross-fade opacity (0.9s); accordion
content has a fixed width so resizing never reflows text.
