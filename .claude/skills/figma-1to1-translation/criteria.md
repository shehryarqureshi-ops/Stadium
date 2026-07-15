# 1:1 Page Translation Process

How to translate a live Shopify marketing page into the Stadium design system in
Figma at **100% 1:1 fidelity** — repeatably, measurably, and **without over-claiming**.

> **Definition of 1:1.** Every section, sub-block, heading *level*, mockup, control,
> band, and compositional beat of the source is mirrored. The only things that change
> are the **re-skin**: font (→ Satoshi/Overpass), copy (→ Stadium voice), and brand
> logos (→ Stadium-relevant channels). **Structure, layout, levels, geometry, and the
> per-token color scheme are taken from the source — MEASURED from the DOM, never
> guessed, never chosen.**

> **The cardinal law of this document.** No dimension, gap, padding, position, color,
> or aspect ratio in the build may be a number you *chose*. Every one is **measured**
> from the corresponding live element and reproduced within an explicit numeric
> tolerance, proven by a deterministic gate. The live's measured geometry *is* the
> standard; an invented number is a defect even if it "looks close." A criterion that
> says only "match" without a tolerance, a verification method, and the failure it
> prevents is not a criterion — every rule below carries all three.

This document is the source of truth for the process. The values for any specific
page come from its DOM scrape, not from here. Every worked number below is a *Channels*
example showing the **shape** of a passing spec — **re-scrape per page; never reuse.**

> **Scope (for now): DESKTOP (1440), STATIC.** Responsive (tablet 768 / mobile 375)
> and interaction states (hover/focus/active) + motion/animation/video are explicitly
> **deferred** — we certify the static desktop comp first, then add devices. All
> measurements are taken at a **1440×1024 viewport, `deviceScaleFactor:1`**.

---

## The 14 dimensions of a static-desktop 1:1

A page is 1:1 only when **all 14** match the source within tolerance (everything read
from the DOM, every value carrying a numeric tolerance + verification method):

1. **Page skeleton** — section order + count (**exact**, Kendall-tau = 1.0); content
   width (**±2px, single page-wide value**) + gutters (**±2px, L==R ±1px**); container
   alignment (centered ±1px); **section seam treatment** (flat / rounded panel / fade —
   read it, reproduce the luma-step profile within ±2 sample positions).
2. **Nav / header** — logo; exact link set + order + count (**±0**); promo pill; right
   actions; nav height/padding/bg (**height ±1px, padding ±1px, bg ΔE00 < 2**).
3. **Per-section structure** — eyebrow → headline (line count **Δ=0**) → subhead
   (placement); every sub-block + band (**count ±0**); controls; CTAs (**count ±0**).
4. **Composition / layout** — section padding (**±2px**, from a closed set); column
   count (**exact**) + widths (**±2px**); row/grid gaps (**±1px**); alignment (text-align +
   align-items + justify, **exact enum**); **z-order / overlap / exact positions**
   (position ±4px ratio, z-order exact); element rhythm; **hairline dividers** (count ±0,
   weight ±0.5px, color ΔE00 < 2); **whitespace** (gaps ±4px, negative check).
5. **Component properties** — size (**±2px, AR ±1.5%**), padding (**±2px**), margin
   (**±2px**), radius (**±1px / ±0.5px ≤8px**), bg+gradient, border (**±0.5px**),
   **box-shadow** (offset ±1px, blur ±2px, color ΔE00 < 2), opacity (**±0.03**), color
   (**ΔE00 < 2**), gap (**±1px**) — every component.
6. **Typography** — font **size matched exact (±0px)**, weight = Stadium (NOT matched),
   line-height (**±1px**), letter-spacing (**±0.2px**), color (**ΔE00 < 2**),
   text-transform (**exact**), text-align (**exact**), **copy-length / line-count parity
   (Δ=0 headings, ±1 long body)**.
7. **Color scheme** — exact section bgs (**ΔE00 < 2; near-black/off-white < 1.0**);
   eyebrow = heading color (**ΔE00 < 2** unless source accent); body grey (**ΔE00 < 2**);
   icon/button colors; follow source accent usage; keep colored only brand logos +
   product mockups (chroma C* ≤ 6 elsewhere).
8. **Gradients & glows** — type (**exact**), **stops (colors ΔE00 < 2 + positions ±3%)**,
   angle (**±2°**)/origin (**±2%**), glow size (**±5% W**)/blur/opacity (**ΔL* ±1.5**)/
   placement (**±2%**).
9. **Visual treatments** — shadows, borders, blurs, opacities, radii, **textures/noise**
   (presence parity; texture contrast σ within ±20%).
10. **Icons** — **icon shape (SVG geometry)**, stroke vs fill (**exact**), stroke width
    (**±0.5px**), size (**±1px**), color (**ΔE00 < 2**), no tile/square unless source has one.
11. **Imagery / mockups** — placeholder aspect (**±1.5%**)/crop/count (**±0**)/position
    (**±4px**)/rounding (**±1px**); **mockup content structure** (mirror the source's
    mockup UI — inner counts ±0 for ≤8, ±1 for >8; no clipped inner element).
12. **Exact counts** — nav links, cards/row, carousel slides + peek, dots, footer
    columns + links each, social icons, feature columns, stats — all **±0**.
13. **Footer** — brand block (tagline only if source has it), columns + items, legal
    links, privacy toggle, locale, social count, copyright — all counts **±0**, dims
    within component tolerance.
14. **Negative check** — **nothing ADDED that the source doesn't have** (no extra
    tagline/chips/cards/sections/beats; no added fill/gradient/glow/shadow/border/tint;
    no leftover source vocabulary). Added elements break 1:1 as surely as missing ones.

The per-section + per-component checklists, the **Measurement & Proportion Fidelity**
section, and the **Structural Integrity & Robustness** section below operationalize
these 14.

---

## The golden rules

1. **Measure the DOM, don't eyeball, don't choose.** Screenshots under-specify color,
   gradient, weight, spacing, and geometry. Pull exact tokens **and exact dimensions**
   from the live page. No number reaches the build that isn't traceable to a measured
   live element.
2. **Follow the SOURCE's color scheme — do not impose Stadium purple.** If the source
   is monochrome (black/white/grey + navy glows + brand logos), the build is monochrome
   (chroma C* ≤ 6 on every non-logo/non-mockup element). Purple is only kept where the
   source has an accent there. Eyebrow color = heading color (ΔE00 < 2) unless the
   source says otherwise.
3. **No empty placeholder boxes.** Every mockup is a *composed* scene (real chrome,
   fields, prices, shadows, glow), reproduced field-for-field.
4. **Never drop a beat — and never add one.** Sub-blocks, "discover/explore" bands,
   testimonial/stat bands, nested eyebrow+sub-heading levels, carousel controls — all
   present, exact count. The per-section census delta must be 0 in both directions.
5. **Never claim "done" from the build alone, or from a single score.** A page that
   *feels* done is usually ~65% complete. "Done" is a **conjunction** of every gate
   passing over **every** changed section, plus the **user's** sign-off — never the
   agent's call, never from a 2-section sample.
6. **Heading+subhead clusters are auto-layout stacks, always.** Any size change must be
   *structurally impossible* to overlap a sibling or run off-canvas.
7. **Never bulk-resize a frame that holds absolutely-positioned children.** Re-measure
   and re-set each child, then re-run the clip detector — resizing the container clips
   the children.

---

## The pipeline

### Phase 0 — Locate
- Find the page's `cmp-*` frame in board `1865:9319` ("Shopify ↔ Stadium side by side");
  note the **ref** (live capture) column and the **build** column ids.
- Get the live URL (check `.figma-tmp/spec-*.json` — it stores `url` + per-section bg/structure).
- Write `.figma-tmp/<page>-changed.json` listing **every** section node id you will
  touch this session — the gates run over this full list, never a hand-picked subset.

### Phase 1 — Capture + scrape (the SPEC)
Run all of these; never skip the DOM scrape. All scrapes at **1440×1024, ×1**, full
scroll, then `scrollTo(0,0)` so every `getBoundingClientRect` is in one coordinate space.

| Output | Command | Gives you |
|---|---|---|
| Full-page image | `node .figma-tmp/cap.js "<url>" .figma-tmp/<page>-ref.png` | composition reference (1440 wide, ×1) |
| **Exact tokens** | `node .figma-tmp/inspect-ch.js "<url>" > .figma-tmp/<page>-tokens.json` | eyebrow/heading/body **colors**, section **bgs**, **gradients** (`background-image`), svg icon stroke/fill, font sizes/weights/letter-spacing/line-height/transform |
| **Exact layout** | `node .figma-tmp/inspect-layout.js "<url>" > .figma-tmp/<page>-layout.json` | per-section **padding** (T/B/L/R) + **content width** + **gutters**, every flex/grid **row gap + column count + child width + justify + align**, **card** radius/padding, **button** padX/padY/radius/height, **heading rhythm** (margins) |
| **Per-component props** | `node .figma-tmp/inspect-full.js "<url>" > .figma-tmp/<page>-full.json` | for EVERY component variant: **size, padding, margin, radius, bg, gradient, border, box-shadow, opacity, color, font size/weight/line-height/letter-spacing, gap** |
| **Exact dimensions** | `node .figma-tmp/inspect-dims.js "<url>" > .figma-tmp/<page>-dims.json` | per tagged element `{key, sel, section, w, h, ar, wRatio, xRatio, objectFit, naturalAR}` via `getBoundingClientRect` — the **dimension SPEC** that kills eyeballed proportions |
| Section bands | `node .figma-tmp/scan-ch.js "<url>"` | brightness-run section boundaries (`from`/`h` per section) |
| Structure spec | (`spec-*.json` from the scrape) | per-section head / subs / paras / btns / imgs / svgs / **bg** / height |

The SPEC = the source's section list + per-section element checklist + exact **colour,
layout, AND dimension** tokens. Color without spacing is not 1:1; spacing without
measured per-element geometry is not 1:1.

**Coverage assertion (capture gate):** `inspect-dims.js` must produce a record for
**every** section from `scan-ch.js`; a section with 0 dimension records FAILs capture.
→ *Prevents:* building a section with no measured basis (lesson 1).

### Phase 2 — Map (source → Stadium), one row per section
For each source section write down, into `.figma-tmp/<page>-mapping.json`:
- **Every** element + heading **level** + sub-block + mockup + control + band.
- The Stadium **content** via the **canonical re-skin lexicon** (below) — copy, channel
  names, logos — but **not** a new structure or a reframed purpose. Each changed node
  records `{src, tgt, rule, srcPOS, tgtPOS, charLen, lineCount}`; every `rule` ∈
  lexicon-keys ∪ `{identity}` (no `adhoc`).
- The **exact color tokens** from the DOM: eyebrow color, heading color, body color,
  section bg, gradient definition, icon color, button color. Lock these.
- The **measured dimensions** each build node will reproduce, each tagged with the live
  `key` it sources from. **Every build node carries a live `key`** — this is what the
  measurement gate pairs against.

### Phase 3 — MEASURE (the new core step — before any pixel is placed)
Before building a section, resolve **every** number it will use to a measured live value:
- Width/height/AR of every card, image, mockup, panel, button, badge, input, icon →
  from `<page>-dims.json` (M1).
- Content width, gutters, section padT/B, row gaps, column widths, heading rhythm →
  from `<page>-layout.json`.
- Per-component padding/radius/shadow/border/opacity → from `<page>-full.json`.
- Colors/gradients/glows → from `<page>-tokens.json` + pixel samples of `<page>-ref.png`.

**No layout/geometry number may be written into Figma until its measured source exists.**
Derive, never type independently: once width is set and AR is matched, **height is
derived** (`h = w / ar_live`), never independently chosen. → *Verify:* the build spec
table has a `source` column citing a JSON line or a measured crop; grep for any blank /
`"~"` / `"chosen"` cell — any hit FAILs. → *Prevents:* lesson 1 (every eyeballed number).

### Phase 4 — Build, section by section
- Build each section against its checklist: every level, sub-block, mockup, control, band.
- **Heading + subhead clusters are vertical auto-layout frames** (never absolute
  siblings) — so a size change re-flows instead of overlapping (lesson 3).
- **Cards / badges / buttons / chips are auto-layout with HUG** on the hugging axes —
  never a leftover FIXED 100px slab (lesson 6).
- **Mockups are composed scenes** (mini dashboards / terminals / storefronts / phones /
  pickers with real chrome, fields, prices, shadows + glow), every inner element measured
  and contained. Never a grey box with a photo glyph.
- Apply the **exact** section bg + gradient from the DOM (e.g. `#f3f3f1` not `#fff`,
  pure `#000` not `#0b0c10`, navy radial glow not purple), verified by pixel sample.
- Keep colored **only**: real brand logos + product-UI mockups.
- **Never bulk-resize a content frame that holds absolutely-positioned children** — if
  the canonical width changes, re-measure and re-lay-out each mockup individually, then
  re-run the clip detector (lesson 4).

### Phase 5 — Verify EACH section side-by-side (the gates)
Run the full ordered gate set (G0 → G6 below) over **every** section in
`<page>-changed.json` — never a sample:
- `node .figma-tmp/scan-ch.js` → source section boundaries (brightness runs).
- `node .figma-tmp/sbs.js` → composite **source LEFT / build RIGHT** per section, at
  **matched scale** (both resized so content-frame width is identical px), inspected at
  **≥1400px** native section width — never the ~377px full-page thumbnail.
- Run the deterministic gates (`diff.js`, `measure-gate.js`, `robustness.js`,
  `census.js`, `leftover-scan.js`) — each must exit 0 over the full changed-section set.
- Run the **completeness-audit workflow**: honest per-section `pctComplete` + exhaustive
  missing-element list + rebuildSpec. Re-theming is declared expected so it only flags
  real structural gaps.

### Phase 6 — Close gaps worst-first, then re-verify
- Rebuild the lowest-% sections first.
- Re-crop **fresh** side-by-sides (capture mtime > last edit mtime) and re-run all gates.
- A **global** change (width / padding / heading-scale) invalidates prior per-section
  sign-offs — re-run every gate on **every** section.
- **Only claim 100%** when every gate exits 0 over every section AND the user signs off.

---

## Measurement & Proportion Fidelity (the new core)

**Intent.** No element dimension may be *chosen* by the builder. Every width, height,
aspect ratio, gap, column width, and crop in the build is the **measured** value of the
corresponding live element (via `getBoundingClientRect` at the 1440 viewport),
reproduced within an explicit numeric tolerance and proven by a deterministic gate. The
live's measured geometry *is* the standard. This kills lesson 1 (eyeballed proportions)
and its downstream consequences in lessons 2, 4, and 5.

### M0 — The cardinal rule: measure, never choose
- **Every dimension is sourced, not invented.** No element (card, image, mockup, panel,
  button, badge, input, icon, gap, column, divider, glow) may carry a width or height
  not traceable to a measured live element in the SPEC. → *Target:* 100% of build
  leaf/container dimensions have a `liveDim` entry; 0 "builder's-choice" numbers. →
  *Verify:* the measurement gate (M9) refuses any build node whose `key` lacks a matching
  `live[key]` record — an unmeasured node is an automatic FAIL, never a skip. →
  *Prevents:* lesson 1 ("cards 384×368, gaps 24, banner 1200×420" were all self-chosen).
- **"Looks close enough" is not a pass; a number outside tolerance is a fail.** The only
  acceptable evidence is the gate's numeric diff. → *Verify:* M9 emits a per-node table;
  sign-off cites the table, never a screenshot impression. → *Prevents:* lesson 5.

### M1 — Capturing live element dimensions (the dimension SPEC)
`inspect-dims.js` records, per tagged element, the **raw px box and the ratio relative
to 1440** so values survive any later canvas scaling.
- **Each measured element stores:** `{ key, sel, section, w, h, ar, wRatio, xRatio,
  objectFit, naturalAR }` where `w,h = round(rect.width/height)`, `ar = round(w/h, 4)`,
  `wRatio = w/1440`, `xRatio = rect.left/1440`. Repeating elements record one canonical
  box **plus** the count and each instance's box (for M7). → *Target:* every
  card/image/mockup/panel/button/input/icon class present in the section has ≥1 record.
  → *Verify:* `dims.json` parses and covers every `scan-ch.js` section id; a 0-record
  section FAILs. → *Prevents:* lesson 1 (no scrape → guessing).
- **Ratios are the portable standard; px are the working value.** Reproduce the **px**
  value at the 1440 build canvas; the **ratio** is compared if the canvas is ever not
  exactly 1440. → *Verify:* M9 reads `buildCanvasW`; if ≠1440 it switches to ratio mode
  automatically. → *Prevents:* drift when a frame is scaled.
- **Measure the rendered box, not the CSS author value.** Always `getBoundingClientRect`,
  never `style.width` (handles flex/grid/`%`/`aspect-ratio`/`object-fit`). → *Verify:*
  scrape uses `R(el)=el.getBoundingClientRect()` exclusively. → *Prevents:* measuring a
  `max-width` the element never reaches.
- **Selector map recorded so re-scrape is deterministic.** Store the `sel` per `key`. →
  *Verify:* re-running the scrape yields the same `key→box` within ±1px. → *Prevents:* a
  "moving target" where two scrapes disagree.

### M2 — Width fidelity
- **Container / panel / mockup width matches the live box.** → *Tolerance:* **±2px OR
  ±0.3% of live width, whichever is larger** (a 1260 container = 1257–1263; a 1200 banner
  ≠ a 1260 live element). → *Verify:* `abs(buildW − liveW) ≤ max(2, 0.003·liveW)`. →
  *Prevents:* lesson 1 (banner sized 1200 by guess), lesson 2 (1200-vs-1260 split).
- **Content width is one number for the whole page.** → *Tolerance:* every section's
  content width within ±2px of the page-modal content width. → *Verify:* M9 computes the
  mode of all section `contentW`; any section deviating >2px FAILs. → *Prevents:* lesson 2.
- **Card/column width derives from measured child width, not an even split.** A 4-up row's
  card width = live child width, even if it's not `(contentW − 3·gap)/4` to the pixel. →
  *Tolerance:* ±2px to live `childW`. → *Verify:* vs `inspect-layout.js` `rows[].childW`.
  → *Prevents:* inventing a "clean" split the live doesn't use.

### M3 — Height fidelity
- **Element height matches the live box.** → *Tolerance:* **±3px OR ±1% of live height,
  whichever is larger** (looser than width because font-swap text reflow legitimately
  moves it a little; but a 368 vs live 469 card — 27% miss — FAILs hard). → *Verify:*
  `abs(buildH − liveH) ≤ max(3, 0.01·liveH)`. → *Prevents:* lesson 1 (368-tall cards),
  lesson 6 (fixed-height clip — see M8).
- **No FIXED height where the live element hugs its content.** If a live element's height
  is content-determined (text card, list), the Figma node is `layoutSizingVertical: HUG`,
  not a FIXED 100px slab. → *Tolerance:* a HUG node lands within ±3px of live naturally;
  a FIXED node must match exactly (±0). → *Verify:* M8 scans for
  `layoutSizingVertical:"FIXED" && height==100` → FAIL; cross-checks hug-class elements
  are HUG. → *Prevents:* lesson 6 (100px slabs) + the createFrame hug bug.
- **Media/mockup height comes from width × measured AR, not a chosen height.** → *Verify:*
  `abs(h − w/ar_live) ≤ 2px`. → *Prevents:* independently-chosen w and h that distort.

### M4 — Aspect ratio fidelity (the thing that drifts most)
- **Every card/image/media/panel AR matches the live AR.** → *Tolerance:* **±1.5%
  relative** (`abs(buildAR − liveAR)/liveAR ≤ 0.015`). A 384×368 square (AR 1.043) where
  the live card is 405×469 (AR 0.864) is a **20.7% AR error → FAIL**. → *Verify:* M9
  computes `arErr` per element; >1.5% FAILs. → *Prevents:* lesson 1's exact defect.
- **Images match AR *and* crop/object-fit.** Capture live `object-fit`
  (`cover`/`contain`/`fill`) and the **visible crop AR** (frame AR, which may differ from
  the source asset's AR). Figma image fill `scaleMode` must mirror it: `cover→FILL`,
  `contain→FIT`, `fill→CROP`/stretch. → *Tolerance:* frame AR within ±1.5%; `scaleMode`
  exact match to the mapped value. → *Verify:* scrape records `objectFit` + frame `ar`;
  M9 checks both; a spot-check at ≥100% confirms the same region is shown. → *Prevents:*
  stretched/letterboxed/wrong-crop imagery.
- **Photo focal crop matches.** If the live is `object-position: top/center/bottom`,
  mirror it. → *Tolerance:* visible focal region overlaps the live's by eye at 100%. →
  *Verify:* side-by-side crop at full res of the same photo slot. → *Prevents:* a
  face/product cropped differently.
- **Square is only square if the live is square.** Never default to a square. → *Verify:*
  any 1.0 AR build element must map to a live element with AR within ±1.5% of 1.0. →
  *Prevents:* the reflexive "make it a square card" habit.

### M5 — Gap & inter-element spacing fidelity
- **Every row/grid gap = the measured live gap.** → *Tolerance:* **±1px** (a 24 vs 32
  swap is 8px = FAIL). → *Verify:* Figma `itemSpacing` vs `inspect-layout.js`
  `rows[].gap`; M9 gap table, any |Δ|>1 FAILs. → *Prevents:* lesson 1, lesson 2.
- **Heading-stack internal spacing = measured rhythm.** eyebrow→heading and
  heading→subhead spacing from `headingRhythm[].mb`. → *Tolerance:* ±2px. → *Verify:* M9
  reads the auto-layout stack's `itemSpacing` vs live `mb`. → *Prevents:* improvised
  vertical rhythm.
- **Inter-card gap is one value per row type, drawn from a closed set.** Each row's gap
  within ±1px of its measured live gap; the **set** of distinct page gaps must be ⊆ the
  live's distinct-gap set (no invented gap). → *Verify:* M9 collects all build gaps,
  diffs the multiset against live's. → *Prevents:* lesson 2 (gap sprawl).

### M6 — Column count & column-width fidelity
- **Column count is exact.** → *Tolerance:* **exact integer** (a 4-up row is 4-up, never
  3- or 5-up). → *Verify:* Figma row child count == `rows[].cols`. → *Prevents:*
  dropping/adding a card (also a negative-check defect, dim 14).
- **Each column's width matches.** → *Tolerance:* ±2px per column to live `childW`; for
  asymmetric layouts each column matches its own live width, not an even split. →
  *Verify:* M9 per-column width diff. → *Prevents:* an even split where the live is weighted.
- **Grid template fidelity for asymmetric grids.** Reproduce explicit fraction ratios. →
  *Tolerance:* each column's `wRatio` within ±0.5% of live. → *Verify:* vs `rows[].grid`.
  → *Prevents:* flattening a 40/60 split to 50/50.

### M7 — Cross-page consistency (consistency follows from measurement)
- **One element type → one size across the page, iff the live uses one size.** If all
  live primary cards measure 405×469, every build primary card is 405×469; if the live
  uses two sizes, the build uses exactly those two. → *Tolerance:* within a type-group,
  build instances vary by ≤±2px **and** the group's size-set equals the live's size-set
  (same cardinality). → *Verify:* M9 buckets by `type` + section role, asserts the
  size-multiset matches the live's; extra distinct size = FAIL. → *Prevents:* lesson 2.
- **Button height is one value per variant, page-wide.** → *Tolerance:* all primary
  buttons within ±1px of measured primary height (e.g. 56); all nav buttons within ±1px
  of nav height (e.g. 44). → *Verify:* cross-check `inspect-full.js` `buttons[].h`; M9
  flags any height not in the live's button-height set. → *Prevents:* button-size sprawl.
- **Section content width is globally consistent.** → *Tolerance:* 0 sections deviate
  >2px from the page content width. → *Verify:* M9 width-consistency check. → *Prevents:*
  lesson 2's 1200-vs-1260 split.

### M8 — Structural-integrity geometry checks (no slabs, clips, orphans)
(See the dedicated **Structural Integrity & Robustness** section for the full detector
suite; the geometric tolerances are restated here as they belong to measurement.)
- **No unintended FIXED 100px slab.** → *Tolerance:* 0 nodes with
  `layoutSizingVertical/Horizontal == "FIXED"` at exactly 100px unless a live element
  measures 100±2px there. → *Verify:* detector lists `{name, w, h, sizingV, sizingH}` for
  any `h==100 && sizingV=="FIXED"` (or `w==100 && sizingH=="FIXED"`) with no matching
  live box → FAIL. → *Prevents:* lesson 6 / createFrame hug-slab bug.
- **No fixed-height frame clipping its content.** → *Tolerance:* for every FIXED-height
  container, `frameHeight ≥ contentBBoxHeight` (0px overflow allowed). → *Verify:* compare
  each FIXED frame's height to the union bbox of its children; `childBottom > frameBottom`
  → FAIL, named. → *Prevents:* lesson 6 (last row clipped), lesson 4 (admin button cut off).
- **No horizontal clip after any width change.** When a content frame's width is
  set/changed, every absolutely-positioned child must satisfy `child.x ≥ frame.x` and
  `child.x + child.w ≤ frame.x + frame.w`. → *Tolerance:* 0px overflow L and R. →
  *Verify:* M8 overflow detector runs **after every width edit**, reporting `overflowRight
  = (child.x+child.w) − (frame.x+frame.w)` per child. → *Prevents:* lesson 4 exactly.
- **No orphaned / disconnected node.** → *Tolerance:* 0 nodes whose parent is the page
  (not a section) or whose bbox lies entirely outside every section's bbox. → *Verify:* M8
  walks `page.children`; any such node → FAIL. → *Prevents:* lesson 6.
- **No zero-gap header→content seam.** → *Tolerance:* gap between a header block's bottom
  and the first content block's top ≥ measured live gap −1px (never 0 unless the live is
  0). → *Verify:* M8 measures the inter-block gap vs `headingRhythm.mb`. → *Prevents:*
  lesson 6.
- **No unintended bleed.** Content bbox must sit inside its padding box (≥ measured
  padding −1px) unless the live element intentionally full-bleeds. → *Tolerance:* 0px
  unintended overflow past the padding edge. → *Verify:* M8 compares content bbox to
  section frame minus measured padding. → *Prevents:* lesson 6.

### M9 — The deterministic MEASUREMENT GATE (`measure-gate.js`)
A single script is the sign-off authority. It pairs each build node to its live element
by `key`, diffs every geometric property, and **exits non-zero on any violation**. Run
on **every changed section**, never a sample (lesson 5).

**Inputs:** `<page>-dims.json`, `<page>-layout.json`, `<page>-full.json`, and a build
export `build-dims.json` (each Figma node → `{key, name, w, h, x, y, sizingV, sizingH,
scaleMode, itemSpacing}` via `use_figma` tree walk).

**Pairing:** by explicit `key`. An unpaired build node OR an unmatched live key (a
dropped element) is a FAIL — the M0 "unmeasured number" trap and the negative/missing
check (dim 14).

| Property | Tolerance | Source field | Fails lesson |
|---|---|---|---|
| width | ±2px or ±0.3%, larger | `dims.w` | 1, 2 |
| height | ±3px or ±1%, larger | `dims.h` | 1, 6 |
| aspect ratio | ±1.5% relative | `dims.ar` | 1 |
| gap / itemSpacing | ±1px | `layout.rows.gap`, `headingRhythm.mb` | 1, 2 |
| column count | exact | `layout.rows.cols` | 14 |
| column width | ±2px | `layout.rows.childW` | 1, 2 |
| content width (page) | ±2px from page mode | `layout.sections.contentW` | 2 |
| section padding T/B/L/R | ±2px | `layout.sections.padT/B/L/R` | 2, 6 |
| object-fit → scaleMode | exact mapped value | `dims.objectFit` | 1 |
| x-position (absolute children) | ±2px or no clip | `dims.xRatio` | 4 |
| button height per variant | ±1px, in live set | `full.buttons.h` | 2 |

```
load live = dims+layout+full ; build = build-dims
fails = []
// 1. coverage / pairing
for n in build.nodes: if !live.byKey[n.key]: fails += UNPAIRED(n)   // M0: unmeasured/extra
for k in live.keys:   if !build.byKey[k]:    fails += MISSING(k)    // dropped element
// 2. per-property geometry
for (n,L) in pairs:
  if !within(n.w, L.w, max(2, 0.003*L.w)): fails += W(n, n.w, L.w)
  if !within(n.h, L.h, max(3, 0.01*L.h)):  fails += H(n, n.h, L.h)
  if relErr(n.w/n.h, L.ar) > 0.015:        fails += AR(n, n.w/n.h, L.ar)
  if n.isMedia && map(n.scaleMode) != L.objectFit: fails += FIT(n)
// 3. rows: gaps, cols, col-widths
for r in build.rows: Lr = live.rowByKey[r.key]
  if r.cols != Lr.cols:                    fails += COLS(r)
  if abs(r.gap - Lr.gap) > 1:              fails += GAP(r)
  for (c,lc) in zip(r.colW, Lr.colW): if abs(c-lc)>2: fails += COLW(r)
// 4. page-global consistency
mode = modeWithin(build.sections.contentW, 2)
for s in build.sections: if abs(s.contentW-mode) > 2: fails += WIDTHSPLIT(s)
for grp in groupByType(build.nodes):
  if sizeMultiset(grp) != sizeMultiset(live.group(grp), tol=2): fails += SIZEINCONSIST(grp)
// 5. structural integrity (M8)
fails += slabScan(build) + clipScan(build) + orphanScan(build) + seamScan(build, live)
print table(pairs, deltas); print fails
exit(fails.length ? 1 : 0)
```

- **The gate runs on every changed section, every time.** → *Tolerance:* a sign-off is
  valid only if the gate ran over the **full** changed-section set and exited 0. →
  *Verify:* the gate prints the section-id set it covered; sign-off rejects a run whose
  covered-set ⊊ changed-set. → *Prevents:* lesson 5.
- **No "looks close" override.** A non-zero exit cannot be waived by a screenshot. →
  *Verify:* the only pass artifact is `exit 0` + the printed delta table with 0 FAIL rows.

### M10 — Heading-size-change safety under measurement (geometry guard for lesson 3)
- **Heading + subhead are an AUTO-LAYOUT stack, never absolute siblings.** → *Tolerance:*
  one auto-layout frame; 0 absolutely-positioned heading/subhead pairs. → *Verify:* M8
  flags any heading and its subhead that share a `layoutMode:"NONE"` parent with
  overlapping y-ranges → FAIL. → *Prevents:* lesson 3.
- **Any font-size change re-runs overflow + overlap detection on that cluster and its
  section.** → *Tolerance:* post-change, 0 overlap (`headBBox ∩ subBBox = ∅`) and 0
  off-canvas (`bbox ⊆ section padding box`). → *Verify:* M8 overlap+overflow scan re-run
  on the cluster *and* re-screenshot the section at full res. → *Prevents:* lesson 3.
- **Size changes snap only to a token ≤ the element's measured size unless the live
  element is larger.** → *Tolerance:* chosen heading size ≤ measured live heading px (±0);
  upscaling requires a live element that actually measures that size. → *Verify:* M9
  checks heading box height vs live; an up-bump with no live justification FAILs. →
  *Prevents:* lesson 3 (bumping beats to 56 with no source basis).

### M11 — Crop, object-fit & media-content geometry
- **Mockup inner-element geometry is measured too.** Inside a composed mockup, key
  sub-elements (table, "Create order" button, chart) carry measured boxes and live inside
  the mockup frame. → *Tolerance:* each inner element within ±3px and 0px clip against the
  mockup frame. → *Verify:* M8 clip scan descends into mockup frames. → *Prevents:* lesson
  4 at the sub-component level.
- **Image natural-vs-display AR mismatch is intentional and matched.** If the live frame
  AR ≠ source-asset AR (a crop), reproduce the *frame* AR and the crop, not the asset AR.
  → *Tolerance:* frame AR ±1.5%; crop region overlaps live at 100%. → *Verify:* scrape both
  `frame.ar` and `naturalAR`; M9 compares frame AR; visual confirms crop. → *Prevents:*
  fitting the whole uncropped asset where the live shows a crop.
- **Icon box size is measured, not defaulted to 24.** → *Tolerance:* icon frame within
  ±1px of live icon box (16/18/20/24 per `inspect-full.js` `icons[].w`). → *Verify:* M9
  icon-size diff. → *Prevents:* uniformly stamping 24px icons where the live varies.

### M12 — Acceptance for this category (all must hold)
- [ ] `inspect-dims.js` ran at 1440/×1 and produced `<page>-dims.json` covering **every**
      section (0 sections with no records).
- [ ] Every build node carries a live `key`; `measure-gate.js` paired 100% (0 UNPAIRED,
      0 MISSING).
- [ ] `measure-gate.js` exited **0** across the **full** changed-section set (covered-set
      ⊇ changed-set), 0 FAIL rows for width, height, AR, gap, cols, col-width,
      content-width split, padding, object-fit, per-variant button height.
- [ ] M7 consistency: each type's build size-multiset == the live's; content width
      single-valued page-wide (±2px).
- [ ] M8 structural scans clean: 0 100px slabs, 0 clipped frames, 0 orphans, 0 zero-gap
      seams, 0 unintended bleed, 0 horizontal overflow after any width change.
- [ ] M10: every heading/subhead cluster is auto-layout; overlap+overflow scan re-ran
      after each font-size change with 0 overlap / 0 off-canvas.
- [ ] No dimension in the build traces to a builder's choice — every value resolves to a
      measured live box or a value derived from one (width×AR).

---

## Grid, Content Width, Gutters & Section Padding (the spacing system)

**Intent.** The page skeleton — one content-container width, one pair of horizontal
gutters, and a small closed set of section top/bottom padding values — is *measured from
the live DOM, never assumed or improvised*, and is *identical across every section*
unless the source itself deviates. Kills lesson 2 (33 distinct top / 30 bottom padding
values, 1200-vs-1260 width split) and lesson 4 (bulk resize clipping mockups).

### S0 — Prerequisite: the measured spacing spec must exist before any layout work
- **No layout number may be written into Figma until `inspect-layout.js` output exists.**
  → *Target:* `<page>-layout.json` present and non-empty with per-section `padT/padB/
  padL/padR`, `contentWidth`, `gutterL/gutterR`, and every row's `gap`/`columns`/
  `childWidth`. → *Verify:* `test -s <page>-layout.json` AND `sections.length >=
  scanCh.sections.length`. → *Prevents:* lesson 2 (numbers from the head).
- **Every number used must trace to a line in that JSON.** A value with no DOM source is
  a defect even if it "looks right." → *Target:* 100% of `padT/padB/contentWidth/gutter/
  gap/cornerRadius` written to Figma appear in `<page>-layout.json` (±tolerances below).
  → *Verify:* the LAYOUT GATE (S7) cross-references each Figma value against the JSON and
  reports any orphan value. → *Prevents:* lessons 2 & 4.

### S1 — Content-container width — measured, single, page-wide
- **Read the container width from the DOM; do NOT assume 1200 or 1260.** → *Tolerance:*
  build `contentWidth` = measured within **±2px**. → *Verify:* `inspect-layout.js` reports
  the inner content box width of the first content wrapper inside each `<section>`;
  compare to the Figma content frame `width`. → *Prevents:* lesson 2 (Channels measured
  1260/90, not the assumed 1200/120).
- **The container width is ONE value for the whole page.** → *Tolerance:* `max−min ≤ 2px`
  across sections. → *Verify:* detector groups all section content-frame widths; any
  deviating >2px from the modal width is flagged with its node id. → *Prevents:* lesson 2.
- **The canonical width is the DOM *mode*, not the first section's width.** A single
  source outlier is the only license to deviate, and must be cited. → *Verify:* detector
  prints the width histogram; reviewer confirms the chosen value is the mode. →
  *Prevents:* lesson 2.
- **Capping rule (Shopify-style centered container).** Backgrounds full-bleed; content
  capped at `contentWidth`, centered. → *Tolerance:* section frame width = 1440 with
  `counterAxisAlignItems: CENTER`; content frame left offset = `(1440 − contentWidth)/2`
  within **±1px**. → *Verify:* detector computes `(sectionW − contentW)/2` vs the content
  frame's `x`. → *Prevents:* off-center content and bleed.

### S2 — Horizontal gutters — measured, symmetric, page-wide
- **Gutter = `(sectionWidth − contentWidth)/2`, read from the DOM, not assumed 120.** →
  *Tolerance:* build gutter = measured within **±2px**; left gutter = right gutter within
  **±1px** unless the source is deliberately asymmetric (cite the DOM). → *Verify:*
  `inspect-layout.js` reports `padL/padR` of the section wrapper OR `(viewport −
  contentWidth)/2`; detector checks both gutters of every section. → *Prevents:* lesson 2
  (assumed 120 when source was 90).
- **One gutter value across the whole page.** → *Tolerance:* `max−min ≤ 2px`. → *Verify:*
  detector flags any section deviating >2px from the page mode. → *Prevents:* lesson 2.
- **Gutter + content width reconcile to the frame width exactly.** `gutterL + contentWidth
  + gutterR == sectionWidth` (±1px). → *Verify:* detector arithmetic per section. →
  *Prevents:* silent drift where a "fixed" width + stale gutters no longer sum to 1440.

### S3 — Section vertical padding — measured per section, snapped to a small closed set
- **Read each section's `padT`/`padB` from the DOM; never invent them.** → *Tolerance:*
  build = measured within **±4px** (vertical is looser than horizontal because leading
  varies, but never wider). → *Verify:* `inspect-layout.js` reports computed
  `padding-top`/`padding-bottom` (plus any first/last-child margin acting as section
  padding) per `<section>`; detector compares to Figma `paddingTop`/`paddingBottom`. →
  *Prevents:* lesson 2 (33 distinct top values).
- **The live uses a SMALL closed set — the build must too.** After scraping, cluster the
  measured values; the build may only use values from that cluster set. → *Target:*
  **distinct `padT` ≤ 6** and **distinct `padB` ≤ 6** page-wide (matching the source's
  cluster count, typically ≤6); any build value not within ±4px of a *source cluster
  centroid* is a defect. → *Verify:* detector buckets all paddings (cluster width 8px),
  prints the histogram, asserts `distinctBuckets(build) ≤ distinctBuckets(source)` AND
  every build bucket maps to a source bucket. → *Prevents:* lesson 2 (30+ bottom values).

  ```
  src = [ {pT,pB} per section from <page>-layout.json ]
  bld = [ {pT,pB} per Figma section frame ]
  def buckets(vals): round each to nearest 8 -> set
  assert len(buckets(bld.pT)) <= len(buckets(src.pT))   # FAIL lesson 2
  assert len(buckets(bld.pB)) <= len(buckets(src.pB))
  for s,b in zip(src,bld):
      assert abs(s.pT-b.pT) <= 4, f"{b.node}: padT {b.pT} vs src {s.pT}"
      assert abs(s.pB-b.pB) <= 4, f"{b.node}: padB {b.pB} vs src {s.pB}"
  ```

- **Same section *type* → same padding.** → *Tolerance:* within a section-type group,
  `padT`/`padB` variance = 0 (±2px). → *Verify:* detector groups by the source's measured
  padding bucket and asserts intra-group equality. → *Prevents:* lesson 2.
- **Dark sections may run more bottom space — but only if the DOM says so.** → *Tolerance:*
  any `padB` larger than the page's light-section centroid must match a measured
  dark-section `padB` within ±4px (e.g. dark feature 80/192). → *Verify:* detector
  cross-checks oversized paddings against the DOM value for that exact node. → *Prevents:*
  inventing "breathing room" the source doesn't have, and under-padding dark beats.
- **Default values are placeholders, not licenses.** If a measurement is missing, the
  build is blocked — no fallback to a "house" 116/116. → *Target:* zero sections built
  from a default; every section cites a DOM number. → *Verify:* S0 trace check. →
  *Prevents:* lesson 2 (house defaults masquerading as measured).

### S4 — The hard anti-clip rule — never bulk-resize a frame holding absolute children
- **NEVER change a content/mockup frame's width by resizing the frame when it contains
  `layoutPositioning: ABSOLUTE` children (or any child positioned for the old width).**
  Resizing does not reflow absolute children — it clips them. → *Tolerance:* zero clipped
  children after any width change (`x+width ≤ parent.width`, `x ≥ 0`, `y+height ≤
  parent.height`). → *Verify:* the CLIP detector (S7) runs on every frame whose width
  changed this session; it flags any child whose bbox exceeds the parent. → *Prevents:*
  lesson 4 (the 1260→1200 resize that cut off the admin "Create order" button).
- **Width changes are done by re-measuring and re-setting EACH element, not by scaling
  the container.** → *Tolerance:* each absolute child's new `x/y/width/height` is set from
  a fresh DOM measurement (or proportional remap then bbox-verified), not left at its old
  value. → *Verify:* after the change, the CLIP detector AND a per-child bbox diff confirm
  every child was repositioned and none exceed the parent. → *Prevents:* lesson 4.
- **If the canonical width changes mid-build, every mockup frame is re-laid-out
  individually and re-verified — not batch-resized.** → *Target:* 100% of mockup frames
  re-measured; CLIP detector passes on all. → *Verify:* detector run scoped to all
  `mockup-*`/`scene-*` frames, not a sample. → *Prevents:* lessons 4 & 5.
- **Mockup frames clip-test independent of section padding changes.** → *Target:* after
  any padding edit, inner mockup frames still pass the CLIP detector. → *Verify:* detector
  re-run on touched sections. → *Prevents:* lesson 6.

### S5 — Row and column gaps — measured per row TYPE
- **Every flex/grid row's gap is read from the DOM per row type; never reuse a house
  gap.** → *Tolerance:* build `itemSpacing` = measured within **±2px** per row type. →
  *Verify:* `inspect-layout.js` reports `gap`/`column-gap`/`row-gap`; detector matches each
  Figma row's `itemSpacing` to its source row's gap. → *Prevents:* lesson 2.
- **Row gaps come from a small closed set.** → *Target:* distinct build gaps ≤ distinct
  source gaps; every build gap maps to a source bucket (width 4px). → *Verify:*
  gap-histogram assertion. → *Prevents:* lesson 2.
- **Column count + child width per row match the source.** → *Tolerance:* `columns` exact;
  each child width within **±2px** OR **±1.5%**. → *Verify:* detector compares Figma row
  child count and `width` to `columns`/`childWidth`. → *Prevents:* lesson 1 leak.
- **Header rows (headline | subhead) keep the source's distribution.** → *Tolerance:* if
  source is `space-between`, Figma uses `primaryAxisAlignItems: SPACE_BETWEEN`; if fixed,
  gap within ±2px. → *Verify:* detector reads the source row's `justify-content` and
  asserts the Figma `primaryAxisAlignItems` matches. → *Prevents:* collapsing a justified
  header into an arbitrary gap.

### S6 — Structural-integrity guards on every spacing-bearing frame
(Restated from the Robustness section at the bbox level; see there for full detectors.)
- **No fixed-height "slab" frames in the layout chain.** → *Target:* zero frames with
  `height == 100 && layoutSizingVertical == FIXED` that aren't intentionally sized; more
  generally zero auto-layout frames whose FIXED height ≠ measured content height (±2px). →
  *Verify:* SLAB detector. → *Prevents:* lesson 6.
- **No zero-gap header→content seam unless the source has it.** → *Target:* gap between a
  section's last header element and its first content element = measured within ±4px; flag
  any 0px gap not in the DOM. → *Verify:* detector measures the y-gap. → *Prevents:* lesson 6.
- **No fixed-height inner frame clipping its last row.** → *Target:* `frame.height ≥
  Σ(children)+gaps+padding` (±1px). → *Verify:* detector sums children vs frame height. →
  *Prevents:* lesson 6.
- **No orphaned / disconnected nodes off-canvas.** → *Target:* every node's bbox within
  its section frame; zero nodes outside any section. → *Verify:* detector lists nodes whose
  parent is the page or whose bbox falls outside all section frames. → *Prevents:* lesson 6.
- **No unintended full-bleed bleed.** → *Target:* content frame L/R edge ≥ gutter from the
  section edge (±2px); flag content with `x < gutter−2`. → *Verify:* detector checks
  content-frame insets. → *Prevents:* lesson 6.

### S7 — The deterministic LAYOUT GATE — run on EVERY changed section, not a sample

| Check | Pass condition | Tolerance | Prevents |
|---|---|---|---|
| **Width-single** | every section content width == page mode | ≤ 2px | lesson 2 |
| **Gutter-single** | every section gutter == page mode; L==R | ≤ 2px / ≤ 1px | lesson 2 |
| **Reconcile** | gutterL+contentW+gutterR == sectionW | ≤ 1px | drift |
| **Pad-trace** | every padT/padB within ±4 of its DOM value | ≤ 4px | lesson 2 |
| **Pad-cluster** | distinct build padT/padB buckets ≤ source buckets | exact | lesson 2 |
| **Pad-type-consistency** | same source-type sections share padding | ≤ 2px | lesson 2 |
| **Gap-trace** | every row gap within ±2 of its DOM value | ≤ 2px | lesson 2 |
| **Gap-cluster** | distinct build gaps ≤ source gaps | exact | lesson 2 |
| **Cols/childW** | column count exact; child width ±2px / ±1.5% | exact / ±1.5% | lesson 1 |
| **CLIP** | every absolute child bbox ⊆ parent | 0 | lesson 4 |
| **SLAB** | no FIXED frame ≠ content height (esp. h==100) | ±2px | lesson 6 |
| **Sum-fit** | column height ≥ Σ children+gaps+pad | ≤ 1px residual | lesson 6 |
| **Orphan** | no node outside any section bbox | 0 | lesson 6 |
| **Bleed** | content inset ≥ gutter−2 | ≤ 2px | lesson 6 |

```
spec   = load("<page>-layout.json")          # the DOM truth
fig    = dump_figma_frames(boardNode)         # id,x,y,w,h,padT/B/L/R,itemSpacing,
                                              #   layoutSizing*, children[]
modeW  = mode([s.contentW for s in spec]); modeG = mode([s.gutter for s in spec])
viol = []
for sec in fig.sections:
    src = spec.match(sec); cf = sec.contentFrame
    if abs(cf.w - modeW) > 2:  viol+=["width-single", sec.id, cf.w, modeW]
    gL,gR = sec.gutters()
    if abs(gL-modeG)>2 or abs(gR-modeG)>2 or abs(gL-gR)>1: viol+=["gutter-single", sec.id]
    if abs((gL+cf.w+gR) - sec.w) > 1: viol+=["reconcile", sec.id]
    if abs(sec.padT-src.padT)>4 or abs(sec.padB-src.padB)>4: viol+=["pad-trace", sec.id]
    for row in sec.rows:
        sr = src.row(row)
        if abs(row.gap-sr.gap)>2: viol+=["gap-trace", sec.id, row.id]
        if row.cols != sr.cols:   viol+=["cols", sec.id, row.id]
        for c,sc in zip(row.children, sr.children):
            if abs(c.w-sc.w)>2 and abs(c.w-sc.w)/sc.w>0.015: viol+=["childW", c.id]
    for f in sec.allFrames():
        for ch in f.children:
            if ch.x<0 or ch.y<0 or ch.x+ch.w>f.w+0.5 or ch.y+ch.h>f.h+0.5: viol+=["CLIP", f.id, ch.id]
        if f.layoutSizingVertical=="FIXED":
            need = sum(c.h for c in f.children)+f.gap*(len(f.children)-1)+f.padT+f.padB
            if f.h+1 < need or (f.h==100 and f.contentH<100): viol+=["SLAB/sumfit", f.id]
    for n in sec.descendants():
        if not inside(n.bbox, sec.bbox): viol+=["orphan", n.id]
assert buckets(fig.padT)<=buckets(spec.padT) and buckets(fig.padB)<=buckets(spec.padB)
assert buckets(fig.gaps)<=buckets(spec.gaps)
print(histogram(fig.padT), histogram(fig.padB), histogram(fig.gaps))
exit(1 if viol else 0); print(viol)
```

- **The gate runs over the COMPLETE set of changed sections every time; its output is
  pasted into the verification record.** → *Target:* 0 violations AND examined-section
  count == sections changed this session. → *Verify:* compare the gate's examined-count to
  the session's touched-frame list; a shortfall is itself a failure. → *Prevents:* lesson 5.
- **No "looks close enough" override.** A section is spacing-clear only when the gate
  exits 0. → *Verify:* sign-off references the gate run id/output, not a screenshot.

### S8 — Spacing-system worked example (Channels — RE-SCRAPE PER PAGE)
Not defaults to apply — shape only.

| Skeleton element | Channels measured | Tolerance |
|---|---|---|
| Content width | **1260px** (not 1200) | ±2px, page-wide single |
| Gutter (each side) | **90px** (not 120) | ±2px, L==R ±1px |
| Section padT/padB — light | **64 / 64** | ±4px |
| Section padT/padB — hero | **80 / 144** | ±4px |
| Section padT/padB — dark feature | **80 / 192** | ±4px |
| Section padT/padB — "more channels" | **80 / 80** | ±4px |
| Distinct padT / padB across page | small closed set (≤6) | build buckets ≤ source buckets |
| 3–4 card grid gap | **24** | ±2px |
| 4-up feature row gap | **32** | ±2px |
| 2-/3-up content split gap | **40** | ±2px |
| Big 2-col text\|mockup gap | **64–68** | ±2px |
| Header (headline\|subhead) | `space-between`, gap 16 | match `justify`; gap ±2px |

---

## Typography

**Intent.** Type is where the re-skin (Satoshi/Overpass + Stadium copy) collides with
hard 1:1 geometry — so every *non-weight* property (size, line-height, letter-spacing,
transform, align, eyebrow/heading color, line-count) is reproduced from the DOM with zero
or near-zero tolerance. Font **weight is deliberately NOT matched** (Satoshi Bold for
display / Overpass for UI); **everything else IS matched exactly.** Sizes are discrete,
scraped values — never a re-rounded "Stadium scale," never an eyeballed bump.

### Source-of-truth & the per-element type inventory
- **Build a per-element type inventory before touching Figma.** → *Target:* every distinct
  text element (eyebrow, H1/H2/H3 per level, sub-heading, body-S/M/L, caption, label,
  link, button text, stat number, footer item) has one row with `{role, fs, lh, ls, tt,
  align, color}` scraped from the DOM. → *Verify:* `inspect-ch.js` (`eyebrows[]`,
  `headings[]`, `body[]` with `fs/fw/color/lh/ls/tt/ff`) ∪ `inspect-full.js` buckets; a
  role with no scraped row is unverified and may not be built. → *Prevents:* lesson 1 and
  an invented "Stadium scale."
- **Never read a size off a screenshot or off another Stadium page.** → *Target:* 100% of
  font sizes trace to a DOM `fontSize` value in *this* URL's scrape JSON. → *Verify:* each
  Figma text node's `fontSize` must equal a value present in this page's
  `inspect-ch.js`/`inspect-full.js` output; grep the JSON for the number. → *Prevents:*
  lesson 1, cross-page contamination.

### Font size — tolerance 0 (sizes are discrete)
- **Every text node's font size equals the scraped source px exactly.** → *Tolerance:*
  **0px** (sizes are discrete; "close" is a fail). Source px ÷ 16 = rem token, but the
  rendered px must round-trip to the source px. → *Verify:* per role, compare Figma
  `fontSize` against the matching `fs`; any `|figmaFs − domFs| > 0` fails. → *Prevents:*
  lesson 1, "re-rounded to the nearest Stadium token" drift.
- **Eyebrow vs sub-eyebrow distinction preserved.** → *Target:* if the source has both a
  section eyebrow (e.g. 16) and a nested sub-block eyebrow (e.g. 14), both sizes exist as
  distinct nodes. → *Verify:* `inspect-ch.js eyebrows[]` distinct `fs` count ≥ the build's.
  → *Prevents:* collapsing two type levels into one.
- **Heading *levels* keep their size ordering AND absolute values.** → *Target:* section
  headline, big/hero headline, sub-heading each match their own scraped `fs` (e.g.
  44/56/28). → *Verify:* map each `headings[]` row by text snippet to the built node; `fs`
  must match exactly. → *Prevents:* lesson 1 + flattened hierarchy.
- **HARD RULE — never raise a heading font size beyond its scraped value.** → *Tolerance:*
  a heading may be set to the **scraped px and no larger**; "snapping up" to 56 (or any
  token above source) is forbidden unless the source uses that size. → *Verify:* detector
  flags any heading whose `fontSize > domFs`. → *Prevents:* lesson 3 (heading bump
  overlapped its subhead and ran off-canvas).
- **If a size change is unavoidable, the heading+subhead cluster MUST be an auto-layout
  stack first.** → *Target:* before any `fontSize` edit, assert the parent is `layoutMode
  != "NONE"`; if absolute, auto-layout it first. → *Verify:* read parent `layoutMode`;
  resize is gated on `layoutMode ∈ {VERTICAL,HORIZONTAL}`. → *Prevents:* lesson 3.

### Line-height
- **Line-height matches the source within ±1px** (or computes from the unitless ratio). →
  *Verify:* `inspect-ch.js .lh`; set Figma `lineHeight` to `{value: domLhPx,
  unit:"PIXELS"}`; `|figmaLh − domLh| ≤ 1px`. → *Prevents:* a correct size with wrong
  leading that re-flows the block height (contributes to lesson 3 overlap).
- **Display headings keep their tight source leading, not Figma "Auto".** → *Target:*
  heading `lineHeight` is the explicit scraped px (e.g. 48.4 for 44px), never `AUTO`. →
  *Verify:* assert `lineHeight.unit !== "AUTO"` and equals scraped ±1px. → *Prevents:*
  Satoshi's default metrics inflating headline height and pushing content down.

### Letter-spacing (tracking)
- **Letter-spacing matches within ±0.2px.** Source `ls` like `-0.44px` (heads), `-0.16px`
  (eyebrow) reproduced as Figma `letterSpacing` in PIXELS. → *Verify:* `inspect-ch.js
  .ls`; convert em→px at the element's `fs`; flag `|figmaLs − domLs| > 0.2`. → *Prevents:*
  mis-tracked eyebrows/headlines wrapping differently (line-count break, lesson 3).
- **Eyebrow negative tracking is preserved, not zeroed.** → *Target:* if source eyebrow
  `ls < 0`, the build's is negative within ±0.2px. → *Verify:* `inspect-ch.js
  eyebrows[].ls` sign + magnitude. → *Prevents:* improvised tracking.

### Text-transform, text-align
- **Text-transform matches exactly.** → *Verify:* `inspect-ch.js eyebrows[].tt` /
  `textTransform`; Figma `textCase` = `UPPER` iff source `tt === "uppercase"` (and visible
  glyph case matches if the source uppercases in markup). → *Prevents:* an eyebrow
  rendered Title Case when the source is ALL CAPS.
- **Text-align matches per element (left/center/right/justify).** → *Verify:* compare
  source `getComputedStyle(el).textAlign` to Figma `textAlignHorizontal`
  (`LEFT/CENTER/RIGHT/JUSTIFIED`). → *Prevents:* centered headings where the source is
  left-aligned.

### Color of type (weight is the ONLY thing not matched)
- **Eyebrow color = heading color (monochrome) unless the source uses an accent.** →
  *Tolerance:* `ΔE00 < 2` against the scraped heading color of the same section. →
  *Verify:* compare `inspect-ch.js eyebrows[].color` to that section's `headings[].color`;
  if equal in the DOM, the Figma eyebrow fill must equal the heading fill. Only a real DOM
  accent may differ. → *Prevents:* imposing a purple/accent eyebrow the source doesn't have.
- **Body/grey text color matches within ΔE00 < 2.** → *Verify:* `inspect-ch.js
  body[].color`; sample the built fill, compute ΔE00 in Lab. → *Prevents:* a generic `#666`
  for the source's exact body grey.
- **Heading text color matches within ΔE00 < 2** (ink on light, white on dark). →
  *Verify:* `inspect-ch.js headings[].color` vs built fill. → *Prevents:* `#181818` vs
  `#000` drift and white-on-dark mismatches.
- **Weight is NOT matched — and that is the only exemption.** → *Target:* display = Satoshi
  Bold, UI/body = Overpass; the scraped `fontWeight` is intentionally ignored. Every OTHER
  property IS matched. → *Verify:* assert family ∈ {Satoshi, Overpass}; do NOT compare
  `fw`. → *Prevents:* "fixing" weight and breaking brand voice — and using the exemption as
  cover to skip size/ls/color.

### Copy-length / line-count parity (re-skin words are longer)
- **Re-skinned copy wraps to the SAME number of lines as the source, in the same container
  width.** → *Tolerance:* **Δlines = 0** for every heading and sub-heading; ±0 preferred
  for body, ±1 allowed for long paragraphs only if it does not change section height by
  >8px. → *Verify:* count rendered lines in the Figma node (height ÷ lineHeight) vs the
  source's rendered line count (`el.getClientRects().length`). → *Prevents:* lesson 3 —
  longer Stadium words wrap to an extra line, overlapping the subhead.
- **A heading that gains a line is re-copied or re-fit, never shrunk silently and never
  left overlapping.** → *Target:* if Δlines > 0, the fix is shorter copy or a wider
  auto-layout container — NOT an unrecorded font-size reduction. → *Verify:* after
  re-copy, re-run the line-count check AND the overlap detector. → *Prevents:* lessons 3 + 6.
- **Button / chip / nav label fits on one line within the source control width.** →
  *Tolerance:* 1 line, no truncation/ellipsis/wrap. → *Verify:* assert label node width ≤
  control inner width and line count == 1. → *Prevents:* clipped CTA labels (e.g. "Create
  reward order" overrunning a button sized for "Create order") — echoes lesson 4.
- **Stat / number-led copy keeps its single-line emphasis and exact size.** → *Tolerance:*
  1 line; `fs` exact. → *Verify:* `inspect-full.js` stat node `fs` + line count. →
  *Prevents:* a giant stat wrapping and losing the source's hierarchy moment.

### The deterministic type detector (run on EVERY changed section, not a sample)
```
load DOM = union(inspect-ch.js, inspect-full.js)   // {role, fs, lh, ls(px), tt, align, color}
for each figma text node N in section:
  m = matchRole(N, DOM)                              // by text snippet + role bucket
  if !m: fail("UNVERIFIED size/role — no DOM source row for", N.text)
  if N.fontSize        != m.fs               : fail("SIZE",  N.fontSize, m.fs)      // tol 0
  if N.role=="heading" && N.fontSize > m.fs  : fail("HEADING SIZE RAISED", N.text)  // lesson 3
  if abs(N.lineHeightPx - m.lh)     > 1      : fail("LINE-HEIGHT", N.lineHeightPx, m.lh)
  if abs(N.letterSpacingPx - m.ls)  > 0.2    : fail("LETTER-SPACING", N.ls, m.ls)
  if N.textCase != mapCase(m.tt)             : fail("TRANSFORM", N.textCase, m.tt)
  if N.align    != mapAlign(m.align)         : fail("ALIGN", N.align, m.align)
  if deltaE00(N.fill, m.color)      >= 2     : fail("COLOR", N.fill, m.color)
  if N.role=="eyebrow" && deltaE00(N.fill, sectionHeadingColor) >= 2 && !m.isAccent:
                                               fail("EYEBROW≠HEADING COLOR")
  if N.lineCount != m.srcLineCount           : fail("LINE-COUNT PARITY", N.lineCount, m.srcLineCount)
  // weight intentionally NOT checked
  // pre-edit guard: if about to change N.fontSize and parent.layoutMode=="NONE":
  //   fail("CLUSTER IS ABSOLUTE — auto-layout before resizing")   // lessons 3+6
report fails per section; ZERO fails required across ALL changed sections
```

### Type tolerance table
| Property | Source | Tolerance | Verify via |
|---|---|---|---|
| Font **size** | `fs` | **0px (exact)** | node `fontSize` == `fs` |
| Heading size **raise** | source `fs` | **never exceed** source | detector `fontSize > fs` |
| **Line-height** | `.lh` | **±1px** | node `lineHeight` px |
| **Letter-spacing** | `.ls` (→px) | **±0.2px** | node `letterSpacing` px |
| **Text-transform** | `.tt` | exact | `textCase` (`UPPER`/`NONE`) |
| **Text-align** | `getComputedStyle.textAlign` | exact | `textAlignHorizontal` |
| Eyebrow **color** | == heading color | **ΔE00 < 2** | fill vs section heading fill |
| Heading/body **color** | `.color` | **ΔE00 < 2** | Lab ΔE00 on sampled fill |
| **Line count** (re-skin) | source rendered lines | **Δ = 0** (±1 long body) | node height ÷ lh |
| **Weight** | (n/a) | **NOT matched** — Satoshi Bold / Overpass | family ∈ {Satoshi, Overpass} |

---

## Color, Fills, Gradients, Glows & Visual Treatments

**Intent.** Every fill, gradient, glow, shadow, border, and opacity is reproduced from a
**pixel-sampled and DOM-scraped** measurement of the live source — never eyeballed,
invented, or "Stadium-defaulted." A section's color is wrong until proven within tolerance
by a deterministic check; color is retained ONLY on real brand logos and product-UI
mockups (plus a per-page-documented brand-accent exception). Closes "built a light section
dark," "imposed Stadium purple," and "dropped the glow/shadow."

### C0 — Measurement protocol (applies to every criterion below)
- **Dual-source every color.** Capture BOTH (a) the DOM token via
  `inspect-ch.js`/`inspect-full.js` (`backgroundColor`, `background-image`, `box-shadow`,
  `border`, `opacity`, `color`) AND (b) a **rendered-pixel sample** from `cap.js` at a
  known coordinate. → **The pixel sample is authoritative when they disagree** (DOM tokens
  miss `background-image` overlays, pseudo-element glows, blended layers, image fills). →
  *Verify:* both logged into `.figma-tmp/<page>-color.json` per section. → *Prevents:* the
  "built a light section dark" trap where a DOM `background-color:#fff` hid a dark
  `background-image`, or vice-versa.
- **Color space + distance metric.** All comparisons use **CIEDE2000 (ΔE00)** in Lab, not
  raw hex/RGB equality and not ΔE76. → *Verify:* `diff.js` emits `deltaE00` per sample. →
  *Prevents:* passing visibly-off colors "close in hex," failing identical colors over
  rounding.
- **Sampling rule (avoid contaminated pixels).** Sample background from a **≥16×16px patch
  of empty section background** (no text/icon/image/border/gradient/glow within); take the
  **median**. For gradients, sample at documented stop coordinates (C2). → *Verify:*
  sampler logs patch origin + size + median; reject if patch variance σ > 3 ΔE00. →
  *Prevents:* false readings from antialiased edges or text bleed.
- **Sample at 1:1 render scale (1440).** Samples come from a 1440-wide capture at dpr 1; no
  downscaled thumbnail. → *Verify:* capture width == 1440 (±0). → *Prevents:* downscale-
  blended colors reading "close enough."

### C1 — Section background color (per section, no exceptions)
| Rule | Tolerance | Verify | Prevents |
|---|---|---|---|
| Solid bg matches the source at the rendered pixel | **ΔE00 < 2.0** vs pixel-median; AND DOM hex exact when flat | `diff.js` compares Figma-rendered patch vs `cap.js` patch at the same relative coords | "light section built dark"; wrong near-black |
| Near-black / near-white = exact source value | darks ΔE00 < **1.0** (`#000` vs `#0b0c10` ≈ ΔE 4); off-whites ΔE00 < **1.0** | sample + compare; never substitute `#fff`/`#000` for an off-white/near-black | `#000` vs `#0b0c10`, `#fff` vs `#f3f3f1` |
| Section bg sampled in **≥3 patches** (TL, center, BR) | all 3 within ΔE00 < 2.0 of each other and source | multi-patch sampler flags divergence | mistaking a gradiented section for flat |
| **No invented tint** | Lab `a*`,`b*` within **±1.5** of source's | compare a*/b* separately, not just ΔE | imposed purple/blue cast on a monochrome page |
| Every section sampled — **not a 2-section spot-check** | **100% of sections** have a logged ΔE00 < 2.0 row | `scan-ch.js` enumerates boundaries → one row per section; FAIL if `sampled < detected` | lesson 5 |

### C2 — Gradients (linear / radial / conic)
- **TYPE matches exactly** (`linear`/`radial`/`conic`). → *Verify:* `inspect-ch.js`
  `background-image` function name == build gradient type. → *Prevents:* faking a radial
  glow with a flat fill.
- **Stop COUNT matches** (exact integer). → *Verify:* `build.stops.length ===
  source.stops.length`. → *Prevents:* a 2-stop ramp for a 3-stop source.
- **Each stop COLOR within ΔE00 < 2.0**, in order; pixel-sample at the stop coordinate to
  confirm the rendered ramp. → *Prevents:* right shape, wrong colors.
- **Each stop POSITION within ±3% of the axis.** → *Verify:* parse explicit `%`;
  cross-check by sampling the midpoint hue-shift location ±3%. → *Prevents:* transition in
  the wrong place.
- **ANGLE within ±2°** (linear) / **ORIGIN within ±2% of frame W/H** (radial/conic). →
  *Verify:* DOM angle compared numerically; radial origin as % of the box; for missing
  origins, locate the **brightest pixel** and confirm (x%,y%) ±2%. → *Prevents:* wrong
  diagonal / glow centered instead of top-anchored.
- **Radial `shape`/`size` keyword** reproduced; rendered extent matched. → *Verify:* glow
  radius at the 50%-falloff isoline within **±4% of frame width**. → *Prevents:* glow too
  tight/wide.
- **Gradient overlay vs background-image stacking order** preserved. → *Verify:* DOM layer
  order == build layer order. → *Prevents:* an image rendering over its scrim.

```
src = parseBackgroundImage(domToken)         # {type, stops:[{color,pos}], angle|origin}
bld = parseFigmaGradient(node)
assert bld.type === src.type
assert bld.stops.length === src.stops.length
for i in range(len(src.stops)):
    assert deltaE00(bld.stops[i].color, src.stops[i].color) < 2.0
    assert abs(bld.stops[i].pos - src.stops[i].pos) <= 3.0
assert angleDelta(bld.angle, src.angle) <= 2.0
assert deltaE00(pixelSampleAtStop(buildPng,i), pixelSampleAtStop(srcPng,i)) < 2.5
```

### C3 — Glows / blooms (the dark-section depth treatment)
- **Presence parity (negative + positive).** A glow exists iff the source has one. →
  *Verify:* sample the darkest corner vs the glow hotspot; if source `ΔL* ≥ 4` build must
  reproduce a hotspot with `ΔL*` within **±1.5**; if source `ΔL* < 2` (flat), build must be
  flat (no added bloom). → *Prevents:* both "dropped the glow" and "added a glow to a plain
  dark section."
- **Glow COLOR (hue) within ΔE00 < 3.0** at the brightest pixel. → *Prevents:* navy glow
  rebuilt as purple.
- **Glow SIZE / radius within ±5% of section width** at the 50%-luma falloff isoline. →
  *Verify:* radial-profile script. → *Prevents:* pinpoint vs broad bloom mismatch.
- **Glow OPACITY / intensity** via hotspot-to-base luma delta `ΔL*` within **±1.5**. →
  *Prevents:* too strong/faint.
- **Glow PLACEMENT** (x%,y%) within **±2%** of source hotspot. → *Prevents:* top-anchored
  glow rebuilt centered.
- **Glow blur softness** diffuse, not hard-edged: luma gradient at the 50%-falloff isoline
  ≤ source's by **≤15%** steepness. → *Prevents:* a "solid ellipse" reading as a UI element.

### C4 — Box-shadows / drop-shadows
| Sub-property | Tolerance | Verify | Prevents |
|---|---|---|---|
| Offset-X / Offset-Y | **±1px** each | DOM `box-shadow` vs Figma `DROP_SHADOW` offset | flat card / wrong light direction |
| Blur radius | **±2px** | DOM blur vs Figma `radius` | too crisp/soft |
| Spread | **±1px** | DOM spread vs Figma `spread` | halo size wrong |
| Color | **ΔE00 < 2.0** AND alpha **±0.03** | parse rgba; compare separately | grey shadow where source is tinted |
| Layer COUNT (stacked) | exact integer | comma-list; each matched in order | dropping the 2nd ambient layer |
| Inset vs outset | exact boolean | DOM `inset` vs Figma `INNER_SHADOW` | inner rebuilt as outer |
| Present iff source has one | presence parity | source `none` → 0 Figma shadows | adding shadows the flat source lacks |

→ *Master verify:* `inspect-full.js` emits per-component `box-shadow`; `diff.js` matches
every layer. A **flat re-creation of a shadowed component fails the gate.** → *Prevents:*
"flat skeleton drained of richness."

### C5 — Borders / hairlines
- **Width within ±0.5px** (1px stays 1px; 2px stays 2px). → *Verify:* DOM `border-width` vs
  Figma stroke weight. → *Prevents:* "2px outlined button rebuilt as 1px," dividers vanishing.
- **Color ΔE00 < 2.0 and alpha ±0.03** (hairlines are often `rgba(0,0,0,0.08)`). →
  *Verify:* parse rgba. → *Prevents:* a too-dark divider reading as a rule.
- **Style + sides** match (`border-top` only vs all-sides; `solid`/`dashed`). → *Verify:*
  DOM per-side `border-*`. → *Prevents:* boxing an element the source only underlines.
- **Radius** per the component matrix within **±1px** (or **±0.5px** for ≤8px); pills:
  radius ≥ height/2. → *Verify:* DOM `border-radius` vs Figma `cornerRadius`. → *Prevents:*
  square-ish "pills," mismatched card rounding.
- **Hairline presence parity (both directions).** Every source divider reproduced; none
  added. → *Verify:* enumerate source `border`/`<hr>`/1px rules per section; 1:1 count. →
  *Prevents:* dropped dividers AND added rules.

### C6 — Opacity & blend
- **Element opacity within ±0.03.** → *Verify:* DOM `opacity` vs Figma node opacity. →
  *Prevents:* faded eyebrow/pattern rebuilt at full strength.
- **Fill alpha vs node opacity distinction.** A `rgba(...,.08)` fill is FILL alpha; a `0.6`
  element is NODE opacity — don't conflate (double-fades). → *Verify:* check both
  `backgroundColor` alpha and `opacity`; reproduce on the same channel. → *Prevents:*
  washed-out panels.
- **Blend mode** (`overlay`/`screen`/`multiply`) reproduced. → *Verify:* DOM blend vs Figma
  `blendMode`; if not native, sampled blended region ΔE00 < 3.0. → *Prevents:* a
  screen-blended glow rebuilt as opaque.
- **Noise / texture overlays** (the "fractal glass" hero) reproduced monotone and on the
  HERO only, not blanket-applied. → *Verify:* presence parity per section; texture contrast
  (local σ of luma) within **±20%** of source. → *Prevents:* flat hero OR texturing every
  dark section.

### C7 — "Keep colored ONLY brand logos + product-UI mockups" (documented accent exception)
- **Default desaturation rule.** Outside (a) real brand/channel logos and (b) product-UI
  inside mockups, **no element carries a saturated hue** unless the source does. →
  *Tolerance:* for every eyebrow, icon, link, button, divider, section bg, Lab chroma `C* =
  √(a*²+b*²)` ≤ **6** unless the matched source element's `C* > 6`. → *Verify:* chroma gate
  scans all non-logo/non-mockup nodes; flags any C* > 6 the source lacks. → *Prevents:*
  "imposed Stadium purple."
- **Brand logos retain source color** at full saturation. → *Verify:* logo's dominant hue
  ΔE00 < 5 vs source. → *Prevents:* greyscaling a colored partner logo.
- **Product-UI mockup interiors retain source colors.** → *Verify:* mockup region exempt
  from the chroma gate but still ΔE00 < 3 vs the source mockup's sampled colors. →
  *Prevents:* draining the mockup's realistic color.
- **Brand-accent exception is per-page DOCUMENTED.** Record in `<page>-color.json` as
  `{accent:"#hex", allowedOn:[...]}`; the chroma gate permits that exact accent (ΔE00 < 2)
  ONLY on listed elements. → *Verify:* gate reads the manifest; any accent use not in
  `allowedOn`, or hue ≠ documented accent, fails. → *Prevents:* silent inconsistent accent
  sprinkling.
- **Eyebrow color = heading color** unless the source's eyebrow has its own color. →
  *Tolerance:* ΔE00 < 2.0 when the source matches them. → *Prevents:* off-scheme accent
  eyebrows.

### C8 — Image / mockup fill integrity (the stale-fill trap)
- **No stale / blank / wrong image fill.** A reference or mockup frame must show its
  intended pixels. → *Verify:* sample 4 corners + center; if all ~equal AND ~neutral (σ < 2
  ΔE00 across the 5), flag as suspected blank/stale, force-re-set `fills` + re-screenshot. →
  *Prevents:* the documented "SHOPIFY·LIVE ref frame held a STALE/blank fill" → wrong-
  reference silent corruption.
- **scaleMode + crop** match the source's `background-size`/`object-fit` +
  `background-position`. → *Verify:* DOM token vs Figma `scaleMode` (FILL/FIT) + alignment;
  spot-compare crop edges. → *Prevents:* a `cover` photo rebuilt as `contain`.

### C9 — Bleed, seam & scrim treatments at section boundaries
- **Full-bleed vs contained fill.** → *Verify:* sample x=8px and x=1432px at the section's
  mid-height — both equal the section bg (bleed) or both equal the page bg (contained), per
  source. → *Prevents:* "unintended bleed"; panel fills leaking to the page edge.
- **Seam color transition** (hard edge vs fade vs rounded panel). → *Verify:* sample a 1px
  vertical column across the seam; the luma-step profile matches the source's within **±2
  sample positions**. → *Prevents:* a hard seam rebuilt as a fade.
- **Scrim over hero imagery** reproduced with matched opacity/gradient. → *Verify:* text-
  region luma over the image; contrast ratio vs source within **±10%**; per-breakpoint not
  desktop-only. → *Prevents:* the signed-desktop-only hero whose text failed contrast.

### C10 — Stringency / anti-cheat gates (run on EVERY changed section)
- **No bare "match" anywhere.** Every color/treatment row has a numeric ΔE00 / px / % / °
  tolerance + a logged measured value. → *Verify:* manifest schema validation fails any row
  missing `measured` + `tolerance` + `pass`. → *Prevents:* "looks close enough."
- **Programmatic over visual.** Where a property is in the DOM, the DOM-vs-Figma `diff.js`
  gate is mandatory and the pixel sample is the tiebreak. → *Verify:* `diff.js` exit 0
  required before color passes. → *Prevents:* over-claiming off a glance.
- **Coverage assertion.** `colorRowsLogged === sectionsDetected × (bg + each component
  variant)`; any section/component with 0 color rows = FAIL. → *Prevents:* lesson 5.
- **Negative color check.** No fill/gradient/glow/shadow/border/tint exists that the
  matched source element lacks. → *Verify:* orphan treatments fail. → *Prevents:* added
  richness.
- **Done is earned.** Color passes ONLY when every bg ΔE00 < 2, every gradient/glow/shadow/
  border/opacity gate green, chroma clean (or accent-justified), no stale fills, coverage ==
  100%. Until then report exact failing rows with measured values — never "color looks good."

**Per-page color manifest** (`.figma-tmp/<page>-color.json`):
```json
{ "accent": "#181818", "allowedOn": [],
  "sections": [
    {"name":"hero","bgDomToken":"#000000","bgPixelMedian":"#020203","deltaE00":0.7,
     "gradient":null,"glow":{"colorHex":"#1b2a4a","hotspotXY":[0.5,0.08],"radiusPctW":0.42,
       "deltaL":6.1},"texture":"monotone-noise","pass":true} ] }
```

---

## Composition, Z-order, Layout & Mockup Craft

**Intent.** Every section, row, column, divider, and floating/overlapping element
reproduces the *measured* composition of the live source — never an eyeballed
approximation. Failed by any one of: a self-chosen dimension, an improvised padding, an
absolute overlap off by more than tolerance, a 100px slab, a clipped mockup, or a "done"
claim without a passing detector log for every section.

### CO-A — The measured-ratio law (kills "proportions eyeballed", lesson 1)
- **Provenance gate.** Every composition number (section padT/padB, contentW, gutter, row
  gap, column width, card w×h, banner w×h, floating-element x/y) must trace to a line in
  `<page>-layout.json`/`<page>-full.json` or a measured crop of `<page>-ref.png`. →
  *Target:* 100% have a citation; 0 invented. → *Verify:* the build spec table has a
  `source` column; grep for blank/`"~"`/"chosen" — fail if any. → *Prevents:* lesson 1.
- **Ratio, not absolute, is the unit of comparison.** Convert each measured live value to a
  fraction of 1440 (or section height) and reproduce it. → *Target:* each reproduced
  fraction within ±4px re-multiplied (±0.28%). → *Verify:* `abs(buildRatio-srcRatio)*1440
  <= 4`. → *Prevents:* drift visible only side-by-side.
- **Aspect-ratio lock on every sized box.** → *Target:* `(w/h)` within ±1.5% of the live's.
  → *Verify:* `abs((bw/bh)/(sw/sh) - 1) <= 0.015`. → *Prevents:* the "square card" guess.
- **Banner / hero-media / full-width panel dimensions** are measured, never templated. →
  *Target:* w and h within ±4px ratio; aspect ±1.5%. → *Verify:* crop the banner from
  `<page>-ref.png`, read pixel w×h, compare. → *Prevents:* lesson 1 banner invention.

### CO-B — Section order & count (exact, zero tolerance)
- **Section count exact** (±0). → *Verify:* `scan-ch.js` → N runs; count top-level section
  frames; assert equal; cross-check `spec-*.json` length. → *Prevents:* dropped/merged/added
  beats.
- **Section order exact** (Kendall-tau = 1.0). → *Verify:* list build sections by `y` vs
  source by `from`; positional compare.
- **No added section** (negative check). → *Verify:* every build section maps to exactly one
  source brightness-run; an unmatched build section fails. → *Prevents:* dim-14 additions.
- **Section vertical extent ratio.** → *Target:* per-section `(h/pageH)` within ±2%. →
  *Verify:* `scan-ch` run heights vs build section heights as fractions. → *Prevents:* one
  section ballooning relative to neighbors.

### CO-C — The single grid (kills "no spacing system", lesson 2)
(Operationalized in full in the **Grid, Content Width, Gutters & Section Padding** section
above; the headline invariants restated: one content width page-wide ±2px; one gutter L==R
±1px; padding from a closed set ±2px, distinct-count ≤ source; content centered ±1px.)

### CO-D — Per-row column count, count & alignment (exact)
For each multi-column row read `rows[]`: `cols`, `gap`, `childW`, `justify`, `align`, cell
text-align.
- **Column count exact** (±0). → *Verify:* `rows[i].cols` vs build child count. →
  *Prevents:* 3-up rendered as 4-up.
- **Row gap exact** (±2px). → *Verify:* `itemSpacing` vs `gap`. → *Prevents:* improvised
  gaps.
- **Child width exact** (±4px ratio). → *Verify:* measured vs scrape.
- **`justify-content` reproduced** (`flex-start→MIN`, `center→CENTER`, `flex-end→MAX`,
  `space-between→SPACE_BETWEEN`, exact enum). → *Verify:* `rows[i].justify` vs
  `primaryAxisAlignItems`. → *Prevents:* even-grid where the source had space-between.
- **`align-items` reproduced** (exact enum vs `rows[i].align`). → *Verify:* vs
  `counterAxisAlignItems`. → *Prevents:* top-aligned cards rendered center-aligned.
- **`text-align` per cell reproduced** (exact). → *Verify:* `inspect-full` `textAlign` vs
  `textAlignHorizontal`. → *Prevents:* centered copy where the source is left-ragged.

### CO-E — Z-order, overlap & absolute positions of collage / floating elements
- **Z-order (paint order) exact.** → *Verify:* at each overlap region, sample a 6×6px patch
  at matched scale at the overlap centroid; the top element must be the same in both; build
  an ordered list of overlapping nodes by Figma child index and assert the relative order
  matches. → *Prevents:* a floating card hidden behind the mockup it should sit on.
- **Absolute position of every floating element** as a ratio of its parent. → *Target:*
  center `(cx/parentW, cy/parentH)` within ±4px of the live ratio. → *Verify:* measure on
  `<page>-ref.png` crop vs build node center. → *Prevents:* drift; lesson-1 eyeballed
  placement.
- **Overlap amount (bleed/inset) measured.** → *Target:* overlap depth within ±4px ratio. →
  *Verify:* compute the intersection rect on both source crop and build. → *Prevents:* a
  phone barely kissing vs deeply overlapping a panel.
- **Intentional asymmetry preserved.** → *Target:* cluster centroid offset from section
  center within ±4px ratio, same sign. → *Verify:* centroid-x of source content vs section
  center. → *Prevents:* flattening asymmetry into a symmetric grid.
- **No unintended bleed.** → *Target:* build element right edge ≤ contentW edge (±2px) unless
  source bleeds; if source bleeds, reproduce the extent ±4px. → *Verify:* for each non-bg
  node, `x ≥ gutterL-2 && x+w ≤ 1440-gutterR+2` unless flagged "source bleeds". →
  *Prevents:* lesson-6 unintended bleed.

### CO-F — Hairline dividers & whitespace
- **Divider presence is a count match** (±0). → *Verify:* scan `<page>-ref.png` for
  full-width 1–2px low-variance horizontal runs (row pixel std-dev < 6 across ≥80% of
  contentW); count; compare to build hairline nodes. → *Prevents:* missing/extra separators.
- **Divider weight ±0.5px** (1px unless source is 2px). → *Verify:* measure run thickness vs
  Figma `strokeWeight`.
- **Divider color ΔE00 < 2** vs the sampled source pixel. → *Verify:* sample the divider
  row's median RGB; compare in Lab.
- **Divider position ±4px ratio.** → *Verify:* matched-scale crop, measure y. → *Prevents:* a
  divider under the wrong sub-block.
- **Whitespace preserved (negative space is content).** → *Target:* each inter-block gap
  within ±4px; no element added into a source gap (negative check). → *Verify:* measure gap
  heights source vs build; assert no new node occupies a source-empty band. → *Prevents:*
  "tidying" by closing deliberate air.

### CO-G — Mockup content structure — detail-for-detail
- **Mockup type matches** (admin table / phone / terminal / chart / map / storefront /
  node-graph / video, exact). → *Verify:* classify the source crop; build must be the same
  archetype. → *Prevents:* swapping a real admin-table for a generic card.
- **Row/field/column COUNT inside the mockup matches** (±0 for ≤8, ±1 for >8). → *Verify:*
  count rows/fields in the source crop vs build nodes. → *Prevents:* a 6-row order table as
  3 rows.
- **Real chrome present** (window controls, tab bar, sidebar, search, status bar,
  breadcrumbs — whatever the source shows, ±0). → *Verify:* enumerate source chrome;
  checklist against build. → *Prevents:* a faceless panel for a real product UI.
- **No clipped mockup element** (lesson 4). → *Target:* 0 clipped children; the last
  row/column/button fully visible. → *Verify:* for every mockup frame, `child.x+child.w ≤
  frame.w` and `child.y+child.h ≤ frame.h` (±0); render at full res, confirm the
  rightmost/bottom control is whole. → *Prevents:* lessons 4 + 6.
- **Layering + shadow on mockups.** → *Target:* every mockup that casts a shadow has a
  drop-shadow within spec (offset ±2px, blur ±4px, color ΔE00 < 3); stacked layers
  reproduced. → *Verify:* `inspect-full.js` mockup shadow. → *Prevents:* flat re-creation of
  a layered scene.
- **Contained rounded panels for color** when the source does that. → *Target:* panel radius
  ±2px; gradient stops/positions per `inspect-full` `grad`; glow blur ±4px. → *Prevents:* a
  flat color block where the source has a contained gradient panel.
- **Real brand logos in node graphs / logo walls** as SVG, not text/circles. → *Target:*
  logo count exact; each is real vector geometry (≥1 `<path>` not a bare rect/circle). →
  *Prevents:* a node-graph of grey dots.
- **Video mockups get a play-button overlay** (real SVG, centered ±4px). → *Verify:* detect
  the source play affordance. → *Prevents:* a static image where the source signals video.
- **Mockup inner type/price/label fidelity** — re-skinned but structurally present (a price
  field stays a price field; a status pill stays a status pill; ±0). → *Verify:* crop-vs-crop
  checklist of inner labels. → *Prevents:* a stripped mockup with data removed.

### CO-H — Heading/subhead clusters must be unbreakable (lesson 3)
(Operationalized in the **Structural Integrity & Robustness** section, R2; restated: the
cluster is one `layoutMode=VERTICAL` auto-layout; no absolute heading/subhead; size changes
never bump an absolute cluster up; post-change the cluster bbox stays inside the section and
clear of the subhead.)

### CO-I — Matched-scale side-by-side requirement
- **Every comparison at matched scale.** Source and build crops resized to the SAME width
  before any visual judgment. → *Target:* both panels resized to identical width (`sbs.js`
  Wd, e.g. 470px). → *Verify:* `sbs.js`; never compare a 1440 crop against a 377 thumbnail. →
  *Prevents:* judging composition off the tiny full-page thumbnail.
- **Per-section crops, not whole-page.** → *Target:* one `sbs-*.png` per section cropped to
  its source `from/h`. → *Verify:* `sbs.js` pairs has one entry per section; crop heights
  match `scan-ch` runs. → *Prevents:* missing a broken section inside a long scroll.

### CO-K — Composition diff scorecard (per section; ALL columns must pass)
| Check | Tolerance | Source | Method |
|---|---|---|---|
| section index/order | exact | scan-ch order | positional compare |
| contentW | ±2px | layout.contentW | node width |
| gutterL/R | ±1px / ±2px cross-section | layout.gutter | node x |
| padT / padB | ±2px | layout.padT/padB | node pad |
| distinct padding count | ≤ source | layout (all secs) | Set.size |
| cols per row | exact | rows.cols | child count |
| row gap | ±2px | rows.gap | itemSpacing |
| child width | ±4px ratio | rows.childW | node w |
| justify enum | exact | rows.justify | primaryAxisAlign |
| align enum | exact | rows.align | counterAxisAlign |
| text-align | exact | full.textAlign | textAlignHorizontal |
| floating elt x/y | ±4px ratio | ref crop | center ratio |
| z-order pairs | exact | overlap sample | paint order |
| aspect ratio (each box) | ±1.5% | ref crop | w/h |
| divider count/weight/color/pos | ±0 / ±0.5px / ΔE00<2 / ±4px | crop scan | row scan |
| whitespace gaps | ±4px | ref crop | gap measure |
| mockup inner counts | ±0 (≤8) | crop | node count |
| no clip / slab / orphan / bleed | 0 each | tree scan | detectors |

→ *Verify:* all rows green for ALL sections. → *Prevents:* lesson 5.

---

## Structural Integrity & Robustness — the ROBUSTNESS GATE (gate 0)

**Intent.** A build can match every color, size, and token and still be *broken* — text
overlapping, a mockup clipped off-canvas, a button stuck as a 100px slab, a heading running
off the frame after a size bump. This category defines the **hard structural invariants**
that make a build *physically sound*, with **deterministic detectors** that scan EVERY node
of EVERY changed section and **fail the build on any violation** — no sampling, no "looks
fine." This is **gate 0** — it runs *before* the fidelity gates, because a structurally
broken comp can't be meaningfully compared side-by-side. Targets lessons 3, 4, 5, 6.

### Detector substrate (run once, feed all checks)
- **Build the node table first.** For the build column, dump every descendant via
  `use_figma` (a new `robustness.js`) into a flat array `N` of `{id, name, type, x, y, w, h,
  absX, absY, parentId, layoutMode, layoutPositioning, layoutSizingH, layoutSizingV,
  primaryAxisSizingMode, counterAxisSizingMode, itemSpacing, clipsContent, characters?}`
  using **absolute** bounding boxes (`node.absoluteBoundingBox`) so cross-parent geometry is
  comparable. → *Target:* 100% of visible nodes captured (assert `N.length` ≥ the section's
  child count from `get_metadata`). → *Verify:* assert no node has `absoluteBoundingBox ==
  null` except hidden/zero-opacity. → *Prevents:* judging structure off a screenshot.
- **Per-section partition.** Assign each node to a section by matching `absY` into the
  `scan-ch.js` bands. → *Target:* every node maps to exactly one section; 0 unassigned. →
  *Verify:* `unassigned.length === 0` (an unassigned node IS an orphan). → *Prevents:*
  orphaned nodes between sections.
- **No sampling rule.** The array MUST include **every section that changed** this session.
  → *Verify:* record `sectionsScanned` and assert it ⊇ `sectionsChanged`. → *Prevents:*
  lesson 5.

### R1 — NO text-node overlap (intra-section)
```
ix = min(a.x2,b.x2) - max(a.x1,b.x1)   // horizontal overlap px
iy = min(a.y2,b.y2) - max(a.y1,b.y1)   // vertical overlap px
OVERLAP if (iy > 2 && ix > 20)
```
- **No two visible text nodes in a section may intersect beyond a hairline.** → *Tolerance:*
  `iy ≤ 2px` OR `ix ≤ 20px` for every text pair; target 0 failing pairs. → *Verify:*
  double-loop text nodes per section; print every failing pair `{aName,bName,ix,iy}`. →
  *Prevents:* lesson 3 (heading snapped to 56 colliding with its subhead). The thresholds
  ignore sub-pixel rounding / inline kerning but catch a real stacked collision.
- **Strut sub-check (overlap waiting to happen):** for two stacked text nodes (`|a.x1−b.x1|
  < 8`), require `b.y1 − a.y2 ≥ 4px`. → *Prevents:* headings that clear by 1px now but
  overlap on the next reflow / size bump.

### R2 — heading / subhead / eyebrow clusters MUST be one vertical auto-layout
- **Every eyebrow + headline + subhead cluster is a single vertical AUTO-LAYOUT frame**
  (`layoutMode === "VERTICAL"`, `itemSpacing > 0`), with each member a **direct flow
  child** — never `layoutPositioning === "ABSOLUTE"` fixed-Y siblings. → *Tolerance:*
  `layoutMode==="VERTICAL"` AND `itemSpacing ≥ 4` AND each present member is a flow child;
  exact — any absolute member = FAIL. Assert `itemSpacing` equals the source eyebrow→heading
  / heading→sub rhythm (±2px). → *Prevents:* lesson 3 root cause — in an auto-layout a size
  change re-flows, so overlap is structurally impossible.
- **Resize-safety assertion (the bump test).** After ANY heading size change, re-run R1 on
  that section; accepted only if R1 still returns 0 overlaps. → *Prevents:* the "snap to 56
  broke the layout" regression.
- **Size-cap corollary.** If a cluster is not yet auto-layout (legacy), a heading may only be
  snapped to a token **≤ its original size**; snapping UP on an absolute cluster is forbidden
  until converted. → *Verify:* if `new > old` AND cluster not vertical-auto-layout → FAIL. →
  *Prevents:* the memory'd Agentic/Apps/Hyperdriven/Reliability off-canvas regression.

### R3 — NO clip / overflow (child exceeds clipping ancestor or canvas)
```
for node n with clipping ancestor C (or section frame S):
  overL = C.x1 - n.x1;  overR = n.x2 - C.x2
  overT = C.y1 - n.y1;  overB = n.y2 - C.y2
  CLIP if max(overL,overR,overT,overB) > 6
```
- **No node may exceed its nearest clipping ancestor or the section/canvas edge by >6px**
  unless on the declared intentional-bleed allowlist. → *Tolerance:* ≤6px (absorbs shadow/
  stroke spill; a real clip is tens of px); target 0. → *Verify:* report `{node, edge,
  overflowPx, ancestor}`. → *Prevents:* lesson 4 (1260→1200 clipped a mockup button).
- **Intentional-bleed allowlist is explicit.** A node bleeds only if it appears in a
  per-section `bleeds` list sourced from the DOM. → *Prevents:* excusing a real clip as
  "probably a bleed."
- **Right-edge mockup guard (the lesson-4 specific):** for every `mockup*`/`card*` node,
  assert `n.x2 ≤ contentRight + 6` where `contentRight = gutterL + contentW`. **Corollary:**
  never bulk-resize a content frame with absolutely-positioned children; reposition each
  child then re-run this guard. → *Prevents:* the admin-table button clip.

### R4 — NO 100px FIXED "slab" frames
```
SLAB if  (round(h)===100 && layoutSizingV==="FIXED" && layoutMode!="NONE")
      || (layoutMode!="NONE" && layoutSizingV==="FIXED"
          && abs(h - sumChildrenHeight - padT - padB) > 4)
```
- **No frame may sit at the default `h===100` FIXED**, and no FIXED auto-layout frame may
  have content height ≠ frame height by >4px. → *Tolerance:* 0 at h==100 FIXED; HUG-intended
  frames `|frameH − contentH| ≤ 4px`. → *Verify:* scan `N`; print `{name, h, contentH}`. →
  *Prevents:* lesson 6 / createFrame-hug bug.
- **Buttons / badges / tags / chips sub-check:** `layoutSizingV === "HUG"` AND `layoutSizingH
  ∈ {HUG, FILL}` (never FIXED unless the source pins a width). → *Prevents:* oversized/clipped
  control slabs.

### R5 — NO orphaned / disconnected nodes
```
Let CB = union bbox of the section's non-bg content nodes.
ORPHAN if  node not inside any section band
        || node.x1 > CB.x2+64 || node.x2 < CB.x1-64
        || node.y1 > CB.y2+80 || node.y2 < CB.y1-80
```
- **No node may sit far from its section's content cluster.** → *Tolerance:* within 64px (x)
  / 80px (y) of the section content bbox; target 0. → *Verify:* print `{name, dx, dy}`. →
  *Prevents:* lesson 6 / the "appended children land at y2098" defect. Thresholds clear
  generous padding but catch a node abandoned a row away.
- **Zero-area / 1×1 ghost sub-check:** flag `w < 2 || h < 2` (the `resize()`-locks-an-axis
  bug) excluding intentional hairlines on the divider allowlist. → *Prevents:* clipped nodes
  rendering 1×1 and vanishing.

### R6 — cards / badges / buttons in auto-layout with HUG
- **Every card, badge, button, chip, tag is an auto-layout frame** (`layoutMode !== "NONE"`)
  with HUG on hugging axes and uniform internal padding matching the source. → *Tolerance:*
  card padding within ±2px on all 4 sides; radius exact; no internal child overflowing
  (R3-internal, 0px for text, 6px shadow). → *Verify:* filter to card/control roles; assert
  auto-layout + padding + radius + R3-internal. → *Prevents:* lessons 6 + 4.
- **Card grid uniformity:** within one grid row, sibling cards share width ±2px and height
  ±4px (unless the source row is intentionally ragged). → *Prevents:* eyeballed per-card
  sizes producing a jagged grid (lessons 1/2).

### R7 — NO zero-gap header→content seam (and no accidental seam collisions)
```
gap = firstContent.y1 - headerCluster.y2
FAIL_SEAM if gap < 8
```
- **Header→content gap > 0 and matches the source rhythm.** → *Tolerance:* `gap ≥ 8px` AND
  within ±4px of the source spacing; target 0 sub-8 seams. → *Prevents:* lesson 6 zero-gap.
  (R1 catches overlap; R7 catches touching/too-tight even when not overlapping.)
- **Inter-section seam sanity:** adjacent section frames abut or gap, never overlap:
  `sectionB.y1 ≥ sectionA.y2 − 2`. → *Prevents:* an over-tall fixed section bleeding into the
  next.

### R8 — NO fixed-height frame clipping its last row
- **No FIXED/clipping frame may have content taller than its box** (R3 applied to a frame's
  own last child): `lastChild.y2 ≤ frame.y2 − padB`. → *Tolerance:* 0px past the inner edge
  for content; ≤6px for shadow. → *Verify:* compute `maxChild.y2 − (frame.y2 − padB)`. →
  *Prevents:* lesson 6 (last row clipped). Prefer HUG so this can't happen.

### Robustness audit report (fail-closed) — every counter must be 0
| Check | Detector | Pass threshold | Lesson |
|---|---|---|---|
| R1 text overlap | pairwise `ix>20 & iy>2` | `overlaps === 0` | 3 |
| R1 strut gap | stacked-pair `gap≥4` | `negGaps === 0` | 3 |
| R2 cluster auto-layout | heads not in vertical-AL / absolute | `looseHeads === 0` | 3 |
| R2 bump test | re-run R1 post size-change | `overlaps === 0` | 3 |
| R3 clip/overflow | box > clip/canvas edge +6, minus bleeds | `clips === 0` | 4,6 |
| R3 mockup right-edge | `x2 ≤ contentRight+6` | `mockClips === 0` | 4 |
| R4 slab (h==100 FIXED) | `h===100 & sizingV FIXED` + content-mismatch | `slabs === 0` | 6 |
| R5 orphan | outside band / >64x,>80y from CB | `orphans === 0` | 6 |
| R5 ghost 1×1 | `w<2 || h<2` (excl. hairlines) | `ghosts === 0` | 6 |
| R6 control auto-layout/HUG | role∈card/btn/badge not AL+HUG, pad off | `badControls === 0` | 4,6 |
| R6 grid uniformity | sibling card dim spread | `raggedRows === 0` | 1,2 |
| R7 header→content seam | `gap < 8` | `tightSeams === 0` | 6 |
| R7 inter-section overlap | `B.y1 < A.y2−2` | `secOverlaps === 0` | 6 |
| R8 last-row clip | `lastChild.y2 > frameBottom−padB` | `bottomClips === 0` | 6 |

- **Coverage assertion (anti-cheat):** print `sectionsScanned` and assert ⊇
  `sectionsChanged`. A run that didn't scan every changed section is a FAIL regardless of
  zero counters. → *Prevents:* lesson 5.
- **Determinism assertion:** all checks geometric/property-based; a non-zero counter lists
  **every** offending `{check, nodeName, nodeId, metric, box}` — never a count alone. →
  *Prevents:* "looks close enough."
- **Fail-closed:** the gate passes only when **all 14 counters === 0 AND coverage ⊇
  changed**.

---

## Re-skin Correctness & Negative Check

**Intent.** A 1:1 translation re-skins the source's *content* (Shopify commerce → Stadium
engagement) while reproducing its *structure* element-for-element: every source beat
survives the mapping, nothing the source lacks is invented, and no source vocabulary leaks
through. Closes dropping a source element, adding one the source never had, and leftover
source terms — all by deterministic census/grep, not eyeballing.

### RS-A — The canonical re-skin mapping (the ONLY allowed transforms)
| Source (Shopify) | Stadium target | Notes |
|---|---|---|
| selling / sell / commerce | engagement / engage | verb→verb, noun→noun |
| product(s) | reward(s) / gift(s) | one per page consistently (RS-B) |
| customer(s) / buyer(s) / shopper(s) | people / recipient(s) | |
| order(s) | reward order(s) | keep "order", prefix it |
| shipping / fulfillment | delivery | |
| store / shop (noun) | program(s) | |
| storefront | hub | |
| checkout | redemption | |
| cart | — (map per context; flag if no clean target) | logged decision |
| merchant | program owner / admin | |
| brand (Shopify-as-platform) | Stadium | platform self-reference only |

- **Every source text node maps via exactly one row or is an identity copy** (proper nouns,
  numerals, generic UI words). → *Target:* 100% trace to a row. → *Verify:* `mapping-log.json`
  keyed by `sectionId.nodeIndex` with `{src, tgt, rule}`; assert every `rule` ∈ table-keys ∪
  `{identity}`; any `adhoc`/null fails. → *Prevents:* reframing a beat under cover of re-skin.
- **Verb/noun POS preserved** (exact). → *Verify:* mapping-log records `srcPOS`/`tgtPOS`;
  "sell"(v)→"engagement"(n) fails, must be "engage"(v). → *Prevents:* garbled copy reading as
  a different beat.
- **One source term → one target per page** (0 collisions). → *Verify:* group by `src`; each
  has exactly one distinct `tgt`. → *Prevents:* inconsistent voice.

### RS-B — Per-section element census — source vs build (no dropped beat, no added element)
**Types counted** (per section, both sides): `eyebrow`, `headingL1/L2/L3`, `subhead`,
`bodyPara`, `listItem`, `button`, `link`, `chip/badge`, `card`, `icon`, `mockup`, `image`,
`divider`, `band/sub-block`, `control`, `stat`, `logo`, `inputField`, `footerColumn`,
`footerItem`, `socialIcon`.

- **Per-section, per-type census delta = 0** (exact, both directions). → *Verify:*
  `node census.js <url> > src-census.json` (DOM) and `census-figma.js` (build); `diff.js`
  asserts `srcCount[type] == buildCount[type]` for every section×type cell; any nonzero cell
  fails (d>0 = ADDED, d<0 = DROPPED). → *Prevents:* lesson 5 (drop) AND the added half of the
  negative check (dim 14).
- **The delta matrix is computed for EVERY section** (100%). → *Verify:* assert
  `len(buildSections) == len(srcSections)` first; one matrix row per source section, no
  `null`/"not-checked" cells. → *Prevents:* "spot-checked 2 of 6, declared cleared."
- **Heading LEVELS map 1:1 per level**, not just total count. → *Verify:* census buckets by
  font-size rank + tag; per-level equality. → *Prevents:* collapsing hierarchy.
- **Bands / sub-blocks** counted as their own type and matched. → *Prevents:* the "faithful
  skeleton" anti-pattern.
- **Controls** (carousel prev/play/next, toggles, tabs) counted individually per sub-type. →
  *Prevents:* dropping carousel chrome.
- **NEGATIVE: build has ZERO types/instances absent from the source** (`addedCount == 0`). →
  *Verify:* any cell where `buildCount > srcCount` fails; log `extras[]` (Stadium taglines,
  decorative chips, "trusted by" bands, extra CTA/card/section). → enforces dim 14.
- **No added SECTION** (count delta 0). → *Verify:* `scan-ch.js` source count == build
  frame count. → *Prevents:* added-section bloat.
- **No added CTA / button beyond the source's per-section count** (exact). → *Prevents:* the
  "add a second CTA" addition.
- **Copy-length / line-count parity per text node.** → *Tolerance:* line count ±0 headings,
  ±1 long body; list-item count exact; `abs(charLen_build/charLen_src − 1) ≤ 0.25`. →
  *Verify:* census records `lineCount` + `charLen`. → *Prevents:* re-skin copy changing the
  section's visual mass (ties to lesson 3).

```
for sec in union(srcSections, buildSections):
    assert sec in srcSections and sec in buildSections   # no added/missing section
    for t in ALL_TYPES:
        d = build[sec][t] - src[sec][t]
        if d != 0: FAIL(sec, t, d)        # d>0 = ADDED, d<0 = DROPPED
    for (s,b) in zip(sortedNodes(src[sec]), sortedNodes(build[sec])):
        assert s.type==b.type and s.level==b.level
        assert headings: s.lineCount==b.lineCount
PASS only if zero FAILs across ALL sections.
```

### RS-C — Leftover-source-term negative scan (grep gate)
**Denylist (case-insensitive, word-boundary):** `shopify, shop, storefront, buyer(s)?,
shopper(s)?, merchant(s)?, checkout, cart, POS, fulfillment, ship(ping)? (logistics sense),
sell|selling (platform-noun), product(s) (body copy), SKU, inventory, catalog(ue)? (product
sense), "add to cart", "your store"`. Whitelisted exceptions go in `term-exceptions.json`
with a reason (brand/proper nouns in real logos, code identifiers, a legal/footer string the
source shows verbatim).
- **Build text contains ZERO denylist terms** (hits = 0). → *Verify:* extract all build text
  (Figma `characters`) → `node leftover-scan.js`; print every `{sectionId, nodeId, term,
  snippet}`. → *Prevents:* "Shopify"/"storefront"/"buyers" leaking through.
- **LAYER NAMES scanned too** (0 hits in `node.name`). → *Verify:* same scan over names; a
  frame still named "Storefront card" fails even if its copy was re-skinned. → *Prevents:*
  stale structural naming.
- **Mockup-internal text re-skinned** (0 commerce strings in mockup labels). → *Verify:*
  include text nodes nested inside `mockup` containers; "Order #1024 — Shipped" → "Reward
  order #1024 — Delivered". → *Prevents:* the re-skin stopping at section copy.
- **Reverse check — every required Stadium term that SHOULD appear, does.** → *Verify:* from
  mapping-log, if "customer" occurred N times in the source section, "people/recipient"
  occurs in the build section (count ≥1, parity). → *Prevents:* a "fix" that deletes the term
  instead of mapping it.

### RS-D — Brand-voice register (bold/confident, not minimal-light)
- **Heading char-length stays within the source's mass band** (build `charLen` within −15% /
  +25% of source). → *Verify:* mapping-log ratio per heading. → *Prevents:* copying a
  benchmark's minimal-light style onto Stadium's bold personality.
- **No tone-words injected the source lacks** (no added superlatives/taglines; every build
  sentence maps to a source sentence — orphan build sentence = FAIL). → *Prevents:* the added
  half of dim 14.
- **Weight/size not used to fake confidence in place of structure.** → *Verify:* heading
  size per the DOM scrape, not bumped; cross-check the Typography never-raise rule. →
  *Prevents:* lesson 3 justified as "brand voice."

### RS-E — Sign-off ledger for this category (all five green)
1. `census-pass.json` — delta matrix, every section row present, zero nonzero cells.
2. `mapping-log.json` — 100% traced to a table rule (no `adhoc`), one-target-per-source,
   POS-preserved.
3. `leftover-scan` — 0 denylist hits in visible text, layer names, and mockup internals.
4. Reverse-term check — every mapped Stadium term present where its source term was.
5. Brand-voice charLen ratios within band; zero orphan build sentences.

---

## Per-section completeness checklist (with tolerances)

A section is complete only when **all** apply (every "match" carries its tolerance):

- [ ] Every heading **level** present (section eyebrow + headline + nested sub-block eyebrow
      + sub-heading) — count ±0
- [ ] Every sub-block / band present (incl. "discover/explore" + testimonial/stat bands) —
      census delta 0
- [ ] Subtext positioned where the source puts it — position ±4px ratio
- [ ] Every mockup is a **composed scene**, not a placeholder box — inner counts ±0 (≤8) /
      ±1 (>8), 0 clipped inner elements
- [ ] Every control present (carousel prev / play-pause / next; toggles) — count ±0
- [ ] Per-card eyebrows + multi-line headings where the source has them — count ±0
- [ ] Card / item **counts** match (incl. carousel peek) — ±0
- [ ] **Section order** matches (Kendall-tau 1.0); **nav/header** matches (logo, link
      set+order+count ±0, promo pill, right actions, height ±1px)
- [ ] **Z-order / overlap / exact positions** of collage + floating elements match — z-order
      exact, position ±4px ratio
- [ ] **Alignment** matches (text-align + align-items + justify per row) — exact enum
- [ ] **Hairline dividers** match (presence ±0, color ΔE00<2, weight ±0.5px, position ±4px);
      **whitespace** preserved (gaps ±4px, no added node in a source gap)
- [ ] **Copy length parity** — headings/lists wrap to the same line/item counts (Δ=0
      headings, ±1 long body)
- [ ] **Mockup content structure** mirrors the source's mockup (fields/rows/chrome ±0)
- [ ] **Icon shape** matches the source's actual icon geometry (stroke vs fill exact, width
      ±0.5px, size ±1px, color ΔE00<2)
- [ ] **Section seam treatment** matches (luma-step profile within ±2 sample positions)
- [ ] **Exact** section bg + gradient (from DOM) — bg ΔE00<2 (near-black/off-white <1.0);
      gradient type exact, stops ΔE00<2 + ±3%, angle ±2°
- [ ] **Eyebrow color = heading color** (ΔE00<2) unless the source uses an accent
- [ ] Icons are plain line icons in the source's color — **no colored tile/square** (chroma
      C*≤6 unless source has hue)
- [ ] Button color matches the source — ΔE00<2
- [ ] **Content width + side gutters** match (single page-wide value ±2px / ±1px)
- [ ] **Section top/bottom padding** matches this section — ±2px, from the closed set
- [ ] **Row / card grid gaps** match — ±1px, from the closed set
- [ ] **Card radius + padding** match — radius ±1px, padding ±2px
- [ ] **Button padding + radius + height** match — pad ±2px, radius exact (pill 9999),
      height ±1px per variant
- [ ] **Eyebrow→heading + heading→body spacing** match — ±2px
- [ ] **Every text element's font SIZE matches** (±0px); weight stays Stadium Satoshi Bold
- [ ] **Every component matches on EVERY property** — size (±2px, AR ±1.5%), padding (±2px),
      margin (±2px), radius (±1px), bg, border (±0.5px), **box-shadow** (offset ±1px / blur
      ±2px / color ΔE00<2), opacity (±0.03), color (ΔE00<2), gap (±1px)
- [ ] **Visual treatments** matched — shadows, 2px borders, blur glows, gradient
      stops/positions, opacities (all per their tolerances above)
- [ ] Footer: legal-links row + privacy toggle + locale selector + matching social count +
      column density — counts ±0
- [ ] **Structural integrity:** 0 overlaps, 0 clips, 0 100px slabs, 0 orphans, 0 zero-gap
      seams, 0 unintended bleed (R1–R8 all 0)
- [ ] **NEGATIVE CHECK — nothing ADDED that the source doesn't have** (no extra tagline,
      chips, cards, sections, beats; no added fill/gradient/glow/shadow/border/tint; no
      leftover source vocabulary)

---

## Component property matrix — every component matches on EVERY property

For **every distinct component** (button, card, chip/badge, input, icon, image, eyebrow,
heading, body, and every element inside a mockup) capture from `inspect-full.js` and match
**all** of these within tolerance:

| Property | Match | Tolerance | Verify |
|---|---|---|---|
| **Size** | width × height | **±2px each, AR ±1.5%** | node dims vs `full.size` |
| **Padding** | all 4 sides | **±2px** | node pad vs `full.pad` |
| **Margin** | top/bottom rhythm | **±2px** | stack itemSpacing vs `full.margin` |
| **Radius** | `border-radius` (pill = 9999) | **±1px / ±0.5px ≤8px; pill exact** | `cornerRadius` |
| **Background** | color **and** gradient | **ΔE00<2; gradient per C2** | sample + DOM |
| **Border** | width + color | **±0.5px width, color ΔE00<2, alpha ±0.03** | DOM vs stroke |
| **Box-shadow** | offset / blur / spread / color | **offset ±1px, blur ±2px, spread ±1px, color ΔE00<2 + alpha ±0.03, layer count exact** | `full.shadow` vs Figma |
| **Opacity** | element opacity | **±0.03** | DOM vs node opacity |
| **Color** | text / icon color | **ΔE00<2** | Lab ΔE00 on sampled fill |
| **Font** | size matched, weight = Stadium | **size ±0px, lh ±1px, ls ±0.2px; weight NOT matched** | per Typography |
| **Gap** | internal flex/grid gap | **±1px** | `itemSpacing` vs `full.gap` |

**Worked Channels values** (re-scrape per page):
- **Buttons** — pill (`radius 9999`); small `pad 8/20`, **h 44**; large `pad 12/24`, **h 56**;
  outlined = **2px** border; fs 16–18, fw 550; bg black / white / transparent-with-border.
- **Cards** — light `radius 16, pad 32, bg #f6f6f6`; dark `radius 12, pad 32, bg #131416`;
  tall channel card `radius 16, pad 23, 405×469`; internal **gap 24**.
- **Icons** — plain svg, `fill:none`, stroke `#000`/`#fff`/`#a1a1aa`, **strokeWidth 1**, sizes
  16/18/20/24 — **no tile/square, no fill color**.
- **Eyebrow** — fs **16**, fw 550, lh 16, ls −0.16, color = heading color, `margin-bottom 16`.
- **Headlines** — section **44** (lh 48.4, ls −0.44, mb 8) · big **56** · sub-heading **28**.
- **Chips/badges** — small pill, ~`pad 6-9 / 10-14`, radius full, border or tinted bg.

A flat re-creation of a treated component (shadow/border/blur/gradient/opacity dropped) is
**not** 1:1 (C4–C6).

---

## Verification Gates, Definition-of-Done & Anti-Over-Claiming

A page is *never* "done" because the build looks finished or because one score crossed a
threshold — it is done only after an **ordered, gated, mostly-deterministic** verification of
**every changed section** completes clean, and the **user** signs off on the side-by-sides.
This closes the loophole that broke the last session: spot-checking 2 sections, trusting a
score, and over-claiming "100% / cleared" while 4+ sections were broken.

### G0 — Entry preconditions (run before any gate)
- **Fresh artifacts only.** Every gate consumes a side-by-side captured *after* the last
  edit. → *Target:* capture mtime > last Figma write mtime for that section. → *Verify:*
  `sbs.js` writes timestamped crops; assert `mtime(crop) > lastEditMs`. → *Prevents:* lesson
  5 (declaring "cleared" off a stale screenshot).
- **The live SPEC exists and is current.** `<page>-tokens.json`, `<page>-layout.json`,
  `<page>-full.json`, `<page>-dims.json` present, same URL, same day. → *Verify:* each JSON
  has `{url, scrapedAt}`; assert equal URLs and `scrapedAt` within 24h. → *Prevents:* lessons
  1, 2.
- **Changed-section manifest is explicit.** `<page>-changed.json` lists **every** section
  touched this session; the gate set runs over this full list. → *Verify:* length ≥ count
  edited; reviewer cross-checks the edit log. → *Prevents:* lesson 5.

### The ordered gate set (G1 → G6, each blocking)
Gate 0 (Robustness) runs first; then G1→G6 **in order** — a failing gate **stops the
pipeline**. **Every gate runs over EVERY section in `changed.json`** (G6 also nav+footer).

| Gate | Name | Pass threshold | Method | Lesson |
|---|---|---|---|---|
| **G0** | Robustness (structural) | all 14 R-counters 0; coverage ⊇ changed | `node robustness.js` | 3, 4, 6 |
| **G1** | Property gate | `gaps == 0` AND `score == 100` for every section | `node diff.js` | 1, 2, 6 |
| **G2** | Measurement gate | every measured dim within tolerance (M9 table) | `node measure-gate.js` | 1, 2, 4 |
| **G3** | Layout gate | width/gutter/padding/gap/clip/slab clean (S7 table) | `node layout-gate.js` | 2, 4, 6 |
| **G4** | Scale-matched side-by-side | per-section proportion drift ≤ 2% at identical scale | `node sbs.js` + overlay | 1, 3 |
| **G5** | Completeness + census | `pctComplete ≥ 97` per section; census delta 0; leftover-scan 0 | completeness-audit + `census.js` + `leftover-scan.js` | 5, 14 |
| **G6** | Footer / nav parity | exact count + order; dims within G2 tolerance | `node diff.js --scope=chrome` | 4, 5 |

### G1 — Property gate (deterministic)
- **Run `diff.js` per section; require 0 gaps and a 100 score for ALL.** → *Target:*
  `gaps:0, score:100` on every section; **a single section at 99 fails the gate.** →
  *Verify:* `diff.js` exits non-zero if any section < 100; assert
  `Math.min(...sections.map(s=>s.score)) === 100`. → *Prevents:* lesson 5 (a 95-avg hiding a
  broken section); lessons 1/2.
- **No section may be absent from the diff.** → *Verify:* `setDiff(changed.ids,
  diff.reportedIds).length === 0`. → *Prevents:* silently skipping a section.

### G2 — Measurement gate
(The full M9 detector + per-dimension tolerance table above.) Headline additions:
- **Provenance rule: every dimension traces to a scraped live value** — 100% carry a
  `source` annotation; `measure-gate.js` flags any `INVENTED`; require 0. → *Prevents:*
  lesson 1.
- **Spacing-system consistency:** `distinct(buildPadT) === distinct(livePadT)` etc.; the live
  has ONE grid. → *Verify:* `measure-gate.js --histogram`. → *Prevents:* lesson 2.
- **De-scaling correctness:** normalize the build to the live's 1440 px width via a fiducial;
  reject if `|k-1| > 0.5%` without an explicit canvas-scale note. → *Prevents:* false "in
  tolerance" across different pixel spaces.

### G3 — Layout gate
(The full S7 LAYOUT GATE: width-single, gutter-single, reconcile, pad-trace, pad-cluster,
pad-type-consistency, gap-trace, gap-cluster, cols/childW, CLIP, SLAB, sum-fit, orphan,
bleed — exits non-zero on any violation, runs over all changed sections.)

### G4 — Scale-matched structural side-by-side
- **Scale-match rule.** Per section, scale live and build crops so the content-frame width is
  the same px in both. → *Target:* `liveContentPx === buildContentPx` within ±1px. →
  *Verify:* `sbs.js` computes both, scales build, asserts equality. → *Prevents:* lesson 1
  (drift hidden by different scales).
- **Proportion-drift measure (not eyeballed).** Each major element's bbox must align. →
  *Target:* per-element top/left/width/height delta ≤ 2% of section width. → *Verify:* `sbs.js
  --align` prints deltas. → *Prevents:* lesson 1.
- **Overlay diff at matched scale** (live 50% / build 50%), inspected at native section width
  ≥1400px — never a thumbnail. → *Prevents:* judging off the ~377px thumbnail.

### G5 — Completeness + census
- **Per-section completeness ≥ 97%**; the minimum-scoring section gates the page. → *Verify:*
  completeness-audit over fresh, scale-matched side-by-sides; `min(pct) ≥ 97`. → *Prevents:*
  faithful-skeleton pages.
- **Structural-beat exception:** 97% is NOT enough if a beat is missing — a missing
  sub-block/band/heading-level/control/mockup is an automatic FAIL regardless of %. →
  *Verify:* typed missing-list empty of structural types. → *Prevents:* a high % masking a
  dropped beat.
- **Census + leftover-scan:** RS-B delta 0 in both directions; RS-C 0 denylist hits. →
  *Verify:* `census.js`/`leftover-scan.js` exit 0. → *Prevents:* dropped/added beats and
  source-term leakage (dim 14).

### G6 — Footer / nav parity
- **Nav: exact link set, order, count** (±0). → *Verify:* `diff.js --scope=nav` ordered
  arrays. → *Prevents:* lesson 5 (chrome assumed fine).
- **Footer: columns, items-per-column, legal row, toggle, locale, social count** (all ±0;
  dims within G2 tolerance). → *Verify:* `diff.js --scope=footer`. → *Prevents:* footer drift.
- **Chrome geometry obeys G2** (nav height/padding, footer dims measured). → *Prevents:*
  lesson 1 in the chrome.

### Definition of Done (DoD) — exact, non-negotiable
A page is **DONE** only when **ALL** hold simultaneously:
1. `changed.json` covers **every** section edited this session.
2. **G0–G6 all pass over every section in `changed.json`** (G6 also nav+footer), each at its
   threshold, on **fresh** artifacts.
3. **No INVENTED dimensions** remain (G2 provenance) — every build number traces to a live
   scrape.
4. **All robustness detectors are 0** across every section (G0).
5. **Min per-section completeness ≥ 97% AND zero missing structural beats AND zero added
   elements** (G5).
6. **The USER has reviewed the scale-matched side-by-sides and signed off.** "Done" is the
   user's call — never the agent's.

> **Done is a conjunction, not an average.** Status is `min` over sections and `AND` over
> gates. One section at 96%, one INVENTED dimension, one overlap finding, or one missing beat
> = the **whole page is NOT done.**

### Anti-over-claiming rules (the language gate)
- **Never say "done / 100% / cleared / passes / looks good" from the build alone, or from a
  single score, while ANY gate is unrun or failing.** → *Verify:* before emitting any such
  word, confirm a green G0–G6 run exists for every changed section. → *Prevents:* lesson 5.
- **No sampling.** Verification covers **every** changed section; "checked a couple and
  they're fine" is prohibited. → *Verify:* the claim references `changed.json` count ==
  sections verified.
- **Scores are evidence, not verdicts.** A 98 authorizes "G1 passed, proceeding," not "done."
  Only the user's sign-off after G0–G6 + side-by-side authorizes "done."
- **Under-claim when uncertain.** If any detector is ambiguous, a fiducial unreliable, or an
  artifact may be stale → report **"NOT verified"** for that section, never "passes."
- **Report shape is mandatory.** Status is a per-section table — `section → {G0..G6} →
  PASS/FAIL/UNRUN` — plus the page verdict (`DONE` only if every cell PASS and user signed
  off). Prose like "all good" without the table is rejected.

### Hard stop conditions (halt and surface; do NOT proceed or claim)
- **STOP-A:** an artifact's mtime predates the last edit to that section → re-capture, restart
  gates for that section.
- **STOP-B:** any G2 dimension is `INVENTED` (no live source) → measure the live, replace, re-run G2.
- **STOP-C:** any G0 detector returns > 0 (overlap / clip / slab / orphan / rowclip / zero-gap
  / bleed) → fix structurally before any further claim. A heading size change is only
  permitted if the cluster is an auto-layout stack and G0 overlap+clip stay 0 (lesson 3); a
  content-width change must re-pass G0 clip on every absolutely-positioned mockup (lesson 4).
- **STOP-D:** any section in `changed.json` is missing from a gate's report → the gate didn't
  cover it; re-run over the full manifest.
- **STOP-E:** G5 reports a missing structural beat or an added element, even at ≥97% → not done.
- **STOP-F:** about to type "done/100%/cleared" but a green G0–G6 run for every changed
  section does not exist, or the user has not signed off → do not emit; report the per-section
  table instead.

> **Default to under-claiming.** When a gate cannot be run deterministically and the visual
> call is close, the correct output is **"NOT verified — needs side-by-side sign-off,"** never
> "done."

---

## Anti-patterns (don't repeat — folds in the 6 session failures)

- **Eyeballing screenshots** → wrong colors / gradients / weights. *(Scrape the DOM.)*
- **Choosing dimensions instead of measuring them** (cards 384×368, gaps 24, banner 1200×420)
  → side-by-side drift. **[Lesson 1]** *(Every number traces to a measured live element;
  M9/G2 fails INVENTED numbers.)*
- **No spacing system** — 33 distinct top + 30 bottom padding values, 1200-vs-1260 width split
  → improvised per section. **[Lesson 2]** *(One grid; padding from a closed set; S7 pad-cluster
  + width-single gates.)*
- **Bumping a heading size UP on an absolutely-positioned cluster** → heading overlaps its
  subhead and runs off-canvas. **[Lesson 3]** *(Heading+subhead is always an auto-layout
  vertical stack; never raise beyond scraped size; R2 bump test re-runs R1.)*
- **Bulk-resizing a content frame that holds absolute children** (1260→1200 clipped an admin
  "Create order" button) → clipped mockups. **[Lesson 4]** *(Re-measure and re-set each child;
  R3 clip detector runs after every width edit.)*
- **Over-claiming done** — spot-checked 2 sections, declared the page cleared while 4+ were
  broken. **[Lesson 5]** *(Every gate runs over every changed section; DoD is a conjunction +
  user sign-off; anti-over-claiming language gate.)*
- **Structural defects** — 100px FIXED slab frames, orphaned/disconnected nodes, fixed-height
  frames clipping their last row, zero-gap header→content, unintended bleed. **[Lesson 6]**
  *(R4 slab, R5 orphan, R8 last-row clip, R7 seam, R3 bleed — all must be 0.)*
- **Imposing Stadium purple** → source was monochrome. *(Chroma C*≤6 gate; follow source scheme.)*
- **Icons in colored squares** → source uses plain line icons.
- **Empty grey placeholder boxes** → source has composed mockups (inner counts ±0).
- **Dropping sub-blocks / bands / heading levels** → "faithful skeleton." *(Census delta 0.)*
- **Adding elements the source lacks** (extra tagline/chips/cards/sections/CTA/treatment) →
  breaks 1:1 too. *(Negative check; census `addedCount == 0`.)*
- **Reframing a section's purpose** (e.g. "online search" → "integrations") → not 1:1.
- **Leftover Shopify vocabulary** in copy, layer names, or mockup internals. *(Leftover-scan
  denylist, 0 hits.)*
- **Claiming "done" at ~65%** → always verify side-by-side first.

---

## Tooling reference (`.figma-tmp/`)

| Tool | Purpose |
|---|---|
| `cap.js <url> <out>` | full-page screenshot (playwright fullPage JPEG, 1440 wide, ×1) |
| `inspect-ch.js <url>` | DOM token scrape — colors, bgs, gradients, icon stroke/fill, type (`channel:'chrome'`) |
| `inspect-layout.js <url>` | DOM **layout** scrape — section padding, content width, gutters, row/grid gaps + cols + childW + justify + align, card radius/padding, button specs, heading rhythm |
| `inspect-full.js <url>` | DOM **per-component** scrape — every component's size/padding/margin/radius/bg/gradient/border/shadow/opacity/color/font/gap |
| `inspect-dims.js <url>` | DOM **dimension** scrape — per element `{key,sel,section,w,h,ar,wRatio,xRatio,objectFit,naturalAR}` (the proportion SPEC) **[new]** |
| `scan-ch.js <url>` | brightness scan → source section boundaries (`from`/`h`) |
| `sbs.js` | per-section **scale-matched** source-vs-build side-by-side + `--align`/`--overlay` |
| `diff.js` | deterministic property gate (G1) — color ΔE00, type, treatments; `--scope=nav/footer` for G6 |
| `measure-gate.js` | deterministic measurement gate (G2) — geometry vs `dims/layout/full`; `--histogram` **[new]** |
| `layout-gate.js` | deterministic layout gate (G3) — width/gutter/padding/gap/clip/slab/bleed **[new]** |
| `robustness.js` | deterministic robustness gate (G0) — absolute-bbox node table + R1–R8 detectors **[new]** |
| `census.js` / `census-figma.js` | per-section typed element census, source vs build (RS-B) **[new]** |
| `leftover-scan.js` | denylist grep over build text + layer names + mockup internals (RS-C) **[new]** |
| completeness-audit **workflow** | honest per-section `pctComplete` + missing-element list + rebuildSpec |

Required artifacts per page: `<page>-tokens.json`, `<page>-layout.json`, `<page>-full.json`,
`<page>-dims.json`, `<page>-color.json`, `<page>-mapping.json`, `<page>-changed.json`,
`src-census.json` + `census-figma` output, `census-pass.json`, `mapping-log.json`,
`term-exceptions.json`.

Requirements (verified present): `playwright-core` installed; system Chrome at
`C:/Program Files/Google/Chrome/Application/chrome.exe`. New scripts to add: `inspect-dims.js`,
`measure-gate.js`, `layout-gate.js`, `robustness.js`, `census.js`, `census-figma.js`,
`leftover-scan.js`.

---

## Verification gates summary (must all pass before "100%")

1. **G0 Robustness** — R1–R8 all 0 (no overlap/clip/slab/orphan/zero-gap/bleed), coverage ⊇
   changed sections.
2. **G1 Property** — `diff.js` 0 gaps + score 100 per section (color ΔE00<2, type, treatments
   vs DOM tokens), every changed section present.
3. **G2 Measurement** — `measure-gate.js` every dimension within tolerance, 0 INVENTED,
   spacing histograms match (the live's one grid), over the full changed set.
4. **G3 Layout** — `layout-gate.js` width-single/gutter-single/pad-cluster/gap/clip/slab/bleed
   clean.
5. **G4 Scale-matched side-by-side** — proportion drift ≤ 2% at identical scale; negative
   check passes (nothing added).
6. **G5 Completeness + census** — ≥97% per section, no missing structural beats, census delta
   0 both directions, leftover-scan 0.
7. **G6 Footer / nav parity** — counts ±0, order exact, dims within G2 tolerance.

Only when **all seven gates pass over every changed section AND the user signs off** do we
call a page a 100% 1:1. Done is a conjunction, not an average — never the agent's call.
