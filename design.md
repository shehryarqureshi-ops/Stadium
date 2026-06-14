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
  two-weight system (Bold + Medium for long "statement" headlines) was
  trialed and REVERTED — Bold fits Stadium's confident/energetic
  personality; the Medium register read too restrained/corporate. **The
  lesson kept: long narrative headlines get more PRESENCE via SIZE, not
  weight.** So:
  - Short section titles → `text-heading-*` (Bold, 24/32/48).
  - Long multi-sentence narrative headlines (EveryWay) → `text-narrative-*`
    (Bold, **26/38/54** — larger, fills the content width). Same weight as
    headings; size is the only difference. RedactedPoster's narrative lead
    is the other candidate (apply in its round).
  - Why the original EveryWay looked weak vs shopify.com: too SMALL (48)
    with trailing whitespace, NOT too bold. The fix was size + width-fill.
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

| Section | Status | Exceptions |
| --- | --- | --- |
| Navigation (all breakpoints) | ✅ SIGNED 2026-06-12 | `#` links launch-gated (focus rings + skip link landed with Hero) |
| Hero | ✅ RE-SIGNED 2026-06-12 with FULL matrix — glyph-accurate contrast at 375/768/1024/1440/1880 all pass (h1 ≥4.21 vs 3 needed; small text ≥5.69 vs 4.5; CTAs ≥7.83); fixes: below-lg `bg-ink/60` floor + recomputed 90deg scrim stops; 40px CTAs, 2px outline, drift, rings, skip link verified; WIP heroes synced (scrim rect + flat overlays) | `#` CTAs launch-gated; drift interim until brand video. History: signed desktop-only, REOPENED when the matrix caught mobile 1.51:1 — and the matrix then caught the unverified "desktop passes" claim too (1024 h1 was 1.58) |
| Every Way | 🟡 IN REVIEW 2026-06-12 — geometry + aspect-lock matrix GREEN at 320/375/768/1024/1440 (5 cards every state; 0.691 every card type every width; no orphan headline; descs surfaced; mobile thumb 64px; no page overflow — confirmed EveryWay clean, the 1024 overflow is ScaleMap's). Viewport decision: LEAVE AS-IS (fits standard phones). WIP synced (mobile thumbs 64, headline line-breaks, captions present via accordion component). ONE CELL OPEN: 5s rotation + hover/focus pause needs a 20-second user eyeball in a visible window (occluded remote window keeps it correctly idle) | Pending assets (states 2–4 tiles); "Candidates"/"Life Moments" PROPOSED copy; sub-lg patterns designed in code (no Figma frames) |
| Trust band | ✅ SIGNED 2026-06-12 (rev 2) — invisible 2.2.2 mechanism verified per modality: hover pause/resume (real mouse), focus-revealed keyboard control (transition-off probe), coarse-pointer tap toggle; matrix at 375/768/1024/1440; h2, dupes aria-hidden, eyebrow 4.66:1; WIP synced (buttons removed) | none — copy real, hrefs n/a, no imagery text |
| Scale Map | 🟡 OVERFLOW FIXED 2026-06-13 — reflow/aesthetic lens GREEN: document scrollWidth ≤ clientWidth at 320/375/768/1024/1200/1280/1300/1440/1600 (was 155px over at 1024). New `wide` (1300px) breakpoint gates the desktop two-column + reach treatment; the 1024–1300 band holds the stacked coverage treatment capped/centred at `max-w-band` (960px, measured 63/62px symmetric gaps at 1280) with the 170+-Countries highlight matching the coverage state; desktop (≥1300) reproduces the prior `lg` layout (1440 pixel-identical, heading text clears stats by 116px at the 1300 activation). Rogue `#262728` label hex → `text-ink`. **Full multi-lens sign-off still PENDING** — contrast pixel-sampled over the reach-map faces photo, keyboard/motion, and the per-breakpoint WIP review not yet done | Desktop band (1024–1300) is code-designed (extrapolated; no Figma frame), like EveryWay's sub-lg patterns |
| (remaining sections) | pending | — |

## Units (2026-06-11)

**Every design value is authored in rem** (Figma px ÷ 16) so user browser
font-size preferences are respected. At default settings rem renders
identically to the Figma px values. Exceptions kept in px: 1px hairline
borders and 1px shadow offsets/inset highlights — these stay crisp.

**No viewport-based root scaling.** A proportional-zoom clamp
(`html { font-size: clamp(...vw...) }`) was tried and rejected (2026-06-11)
— do not reintroduce it.

**Above 1440: Shopify-style centered container** (reference:
shopify.com — approved 2026-06-11). Section *backgrounds* run full-bleed;
*content* caps and centers. Tokens (`--container-*` namespace → `max-w-*`
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

## Breakpoints

Figma designs three frame sizes; they map to Tailwind breakpoints as follows:

| Figma frame              | Width  | Tailwind prefix | Token suffix |
| ------------------------ | ------ | --------------- | ------------ |
| Mobile (node `98:871`)   | 375px  | (none, default) | `-sm`        |
| Tablet (node `96:871`)   | 768px  | `md:`           | `-md`        |
| Desktop (node `87:871`)  | 1440px | `lg:`           | `-lg`        |

**`wide` (1300px, `--breakpoint-wide`) — code-only, added 2026-06-13.** Not a
Figma frame. The threshold where a desktop layout that needs more room than the
lg content box switches on. ScaleMap's two-column header (486+588px columns) +
1200×512 reach map need ~1254px to clear the 90px desktop margins, so they hold
the stacked treatment until `wide` rather than overflowing the 1024–1300
"narrow desktop" band (the same band the footer link columns wrap in). Use
sparingly — only for layouts genuinely too wide for the lg content box, never
as a routine fourth Figma breakpoint.

## Fonts

| Role     | Family   | Source                                | CSS variable      | Tailwind class |
| -------- | -------- | ------------------------------------- | ----------------- | -------------- |
| Display  | Satoshi Bold (700) | local `app/fonts/Satoshi-Bold.woff2` (Fontshare) | `--font-satoshi`  | `font-display` |
| Body/UI  | Overpass 400/500/600/700 | `next/font/google`          | `--font-overpass` | `font-sans`    |

Both are loaded in `app/layout.tsx` via `next/font` and exposed as CSS
variables on `<html>`.

## Colors

| Token (Figma name)  | Value                      | Tailwind token        | Class            |
| ------------------- | -------------------------- | --------------------- | ---------------- |
| `color/brand/hero`  | `#181818`                  | `--color-brand-hero`  | `text-brand-hero`, `bg-brand-hero` |
| Hero body text      | `rgba(255,255,255,0.86)`   | `--color-hero-body`   | `text-hero-body` |
| Hero text / labels  | `#ffffff`                  | (Tailwind `white`)    | `text-white`     |

### Infrastructure dark section palette (Figma 205:12251, added 2026-06-12)

| Role                        | Value     | Tailwind token           |
| --------------------------- | --------- | ------------------------ |
| Section gradient start      | `#1c1d1f` | `--color-infra-base-1`   |
| Section gradient end        | `#0e0f11` | `--color-infra-base-2`   |
| Chapter card surface        | `#17181b` | `--color-infra-card`     |
| Card/video hairline border  | `#26282c` | `--color-infra-border`   |
| Video panel gradient start  | `#202227` | `--color-infra-panel-1`  |
| Video panel gradient end    | `#121316` | `--color-infra-panel-2`  |
| Desktop card header label   | `#6b6e74` | `--color-infra-eyebrow`  |
| Desktop inactive row label  | `#c9cbcf` | `--color-infra-row`      |

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

| Breakpoint | Margin X (Shopify) | Padding Y (Figma) | Tokens                                          |
| ---------- | ------------------ | ----------------- | ----------------------------------------------- |
| Mobile     | 16px               | 32px              | `--spacing-section-x-sm` / `--spacing-section-y-sm` |
| Tablet     | 30px               | 64px              | `--spacing-section-x-md` / `--spacing-section-y-md` |
| Desktop    | 90px               | 96px              | `--spacing-section-x-lg` / `--spacing-section-y-lg` |

Usage: `px-section-x-sm md:px-section-x-md lg:px-section-x-lg` etc.
Header and footer use the same margin tokens (their Figma-specific 64/80px
side paddings were retired with this change).

### Hero frame (2026-06-11 rev)

Fixed-height frames with content vertically **centered** (`justify-center`).
Implemented as min-heights (`min-h-hero-sm md:min-h-hero-md lg:min-h-hero-lg`):

| Breakpoint | Height | Token              |
| ---------- | ------ | ------------------ |
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

| Breakpoint | Size | Line height | Tracking | Class            |
| ---------- | ---- | ----------- | -------- | ---------------- |
| Mobile     | 32px | 40px        | -0.5px   | `text-display-sm` |
| Tablet     | 52px | 60px        | -1.25px  | `text-display-md` |
| Desktop    | 64px | 72px        | -1.5px   | `text-display-lg` |

Desktop headline has a hard two-line break after "crowd." (per Figma).

### Eyebrow — Overpass Bold, uppercase (`font-sans uppercase`) — 2026-06-11 rev

Solid leading (line-height = size), 10% tracking:

| Breakpoint | Size | Line height | Tracking | Class            |
| ---------- | ---- | ----------- | -------- | ---------------- |
| Mobile     | 12px | 12px        | 1.2px    | `text-eyebrow-sm` |
| Tablet     | 14px | 14px        | 1.4px    | `text-eyebrow-md` |
| Desktop    | 16px | 16px        | 1.6px    | `text-eyebrow-lg` |

### Body copy — Overpass Regular (`font-sans`), color `text-hero-body`

| Breakpoint | Size | Line height | Class          |
| ---------- | ---- | ----------- | -------------- |
| Mobile     | 14px | 22px        | `text-body-sm` |
| Tablet     | 16px | 24px        | `text-body-md` |
| Desktop    | 18px | 28px        | `text-body-lg` |

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
    + `pointer-events:none` until `:focus-visible`), `aria-pressed`,
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

| Sentence (trigger) | Card row |
| --- | --- |
| "Every way you show up." (default) | 5 pillars (layout below) |
| "However you want." | Company Stores, Bundled Kits, Automations, Sender Choice, Recipient Choice — 240×320 tiles, 20px gap |
| "For everyone you care about." | Employees, Customers, Partners, Prospects — 295×320 tiles, 24px gap |
| "Whenever it matters." | Onboarding, Milestones, Events, Holidays — 295×320 tiles, 24px gap |

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
  + 5 rows ~490 + gaps), 754px including py. FITS modern phones (iPhone
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
- Video panel: rounded-2xl, 1px `infra-border`, bg gradient to-r
  `infra-panel-1 #202227 → infra-panel-2 #121316`, heights 200/300/443
  (was 520 desktop); bottom scrim to black/70 heights 120/165/220; no
  shadow (the old lg shadow was dropped)
- Caption (insets 20/24/40): eyebrow "STEP NN · VERB" 12 Bold +0.96
  white/70 uppercase → desktop 12 SemiBold +1.5 `grey-100`; NEW
  "Behind this step:" line on sm (12/16) + md (`text-small`) only;
  title single-line now — 16/24 Overpass SemiBold → 24/30 Overpass
  SemiBold → desktop Satoshi 26/32 −0.5px. Caption bottoms 37/46/59,
  bars bottoms 16/30/40. **Only step 03's verb ("SHIP") is from Figma —
  the other 7 verbs are INVENTED**; captions are the pre-existing
  invented lines joined to one string.
- 8 progress bars: 3px, track white/25, fill white; before active 100%,
  active 52%; gaps 4/6/8
- Client component: clicking a chapter switches active row/caption/progress
- Asset: infra-facility.png (unchanged — the frames use the same photo)

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

## Scale Map (`ScaleMap.tsx`)

Figma: 1:62352 / 1:67172 / 1:62961.

- Dark gradient `grey-700 → grey-800`. Three layouts across the range
  (overflow fix 2026-06-13 — the desktop treatment now gates on `wide`):
  - **Mobile/tablet (< `wide`):** stacked — heading, full-width stats list,
    coverage-state dot map; 170+ Countries highlighted (white card).
  - **Narrow-desktop band (1024–1300, code-designed — no Figma frame):** same
    stacked coverage treatment, on the desktop section chrome (90px margins,
    48px gap), with the content capped/centred at `max-w-band` (960px) and
    the coverage-map height set to auto (`lg:h-auto`) so the aspect-locked
    map grows past the tablet slot instead of overflowing it.
  - **Desktop (≥ `wide` / 1300px):** two-column header (heading
    `wide:w-[30.375rem]` + stats `wide:w-[36.75rem]`, justify-between) +
    1200×512 reach-state map canvas; 1M+ Lives touched highlighted (per
    Figma instance states). Held until `wide` because the 486+588px fixed
    columns need ~1254px to clear the 90px margins; below that they packed
    and overflowed the page (see sign-off ledger).
- Heading `text-heading-sm/md/lg` tokens (normalized 2026-06-12 — the old
  48/58 −0.72px arbitrary value is retired); body Overpass `grey-400`. The
  desktop h2 keeps `lg:w-[32.8125rem]` (525px, breathes into the column
  gutter); its rendered text clears the stats column by 116px at the 1300
  activation, so the box-overflow is never visible.
- Stats rows (170+ Countries, 100K+ Items, 100+ Integrations, 1M+ Lives
  touched): `rounded-card`, dividers white/12 (`wide:white/10`); highlighted
  row = white card, number `accent-water`, label `text-ink` (was a rogue
  `#262728` hex on the lg highlight — fixed to the token 2026-06-13). The
  highlight + stat desktop styling move at `wide`, so the band's highlight
  (170+) matches its coverage map.
- Maps: dot-matrix SVGs + overlays (see public/map-*.svg|jpg); reach-map pins
  = blue halo + glow + white core with tooltip cards (bg grey-700, border
  white/16). The reach map is `overflow-hidden`, so its %-positioned
  pins/cards never push page width; the band deliberately uses the coverage
  map (no fixed-position children) — it scales cleanly where the reach
  tooltips, sized for 1200px, would crowd.

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
