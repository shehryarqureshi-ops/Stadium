---
name: figma-1to1-translation
description: Translate a live web page (e.g. a Shopify marketing page) into the Stadium Figma design system at 100% 1:1 fidelity, and audit/verify an existing build against its live source. Use whenever building, reworking, translating, comparing, or certifying a marketing page in Figma from a live URL — it scrapes the source DOM for the EXACT tokens (color, gradients, type sizes, layout, gutters, per-component properties), maps structure 1:1, builds section-by-section, and verifies side-by-side before claiming done. Covers the 14 static-desktop dimensions + 5 verification gates. Refine `criteria.md` as we learn.
---

# Figma 1:1 page translation

Translate a live page into the Stadium Figma system so every section AND every
component matches the source on **every measurable static-desktop property** —
re-skinned only in font (Satoshi/Overpass), copy (Stadium voice), and brand logos.
Read every value from the **DOM**, never from a screenshot, never from memory.

**Full criteria + checklist + worked values:** [criteria.md](criteria.md). Read it first.

> **Scope:** desktop (1440), static. Responsive (tablet 768 / mobile 375) and
> interaction (hover/focus/motion/video) are deferred until the static comp is certified.

## The 14 dimensions (all must match)
1. Page skeleton — section order/count, content width + gutters, container alignment, **seam treatment**
2. Nav/header — logo, link set+order+count, promo pill, right actions
3. Per-section structure — eyebrow→headline(line count)→subhead(placement); every sub-block + band; controls; CTAs
4. Composition/layout — section padding, columns, gaps, alignment, **z-order/overlap/positions**, dividers, whitespace
5. Component properties — size, padding, margin, radius, bg+gradient, border, **shadow**, opacity, color, gap (every component)
6. Typography — **font size matched**, weight=Stadium, line-height, letter-spacing, color, transform, align, **copy length**
7. Color scheme — exact bgs; eyebrow=heading color; body grey; icon/button colors; **follow source accent** (don't impose purple)
8. Gradients & glows — type, stops(colors+positions), angle/origin, glow size/blur/opacity/placement
9. Visual treatments — shadows, borders, blurs, opacities, radii, textures/noise
10. Icons — **icon shape (svg geometry)**, stroke/fill, stroke width, size, color, no tile/square unless source has one
11. Imagery/mockups — placeholder aspect/crop/count/position/rounding; **mockup content structure** mirrors source's
12. Exact counts — nav links, cards/row, slides+peek, dots, footer columns+items, social icons, feature columns, stats
13. Footer — brand block (tagline only if source has it), columns+items, legal links, privacy toggle, locale, social, copyright
14. **Negative check** — nothing ADDED that the source lacks (no extra tagline/chips/cards/sections/beats)

## Pipeline
0. **Locate** — find the page `cmp-*` frame in board `1865:9319`; note ref + build ids; get the live URL (in `spec-*.json`).
1. **Scrape (the SPEC)** — run all four, never skip:
   - `node scripts/cap.js "<url>" .figma-tmp/<page>-ref.png` — full-page image
   - `node scripts/inspect-ch.js "<url>"` — colors, bgs, gradients, icon stroke/fill, type sizes
   - `node scripts/inspect-layout.js "<url>"` — section padding, content width, gutters, gaps, card/button specs, rhythm
   - `node scripts/inspect-full.js "<url>"` — **every component's** full property set
2. **Map** — one row per source section: every element/level/sub-block/mockup/control/band + the exact tokens. Don't reframe a section's purpose.
3. **Build + COMPARE — section by section.** Build a section to the SPEC (composed mockups, exact bgs/gradients/sizes/spacing, colored only brand logos + product mockups). Then BEFORE the next section: screenshot the build section, crop it AND the matching source-crop region to the same width, view them side-by-side (or composite with `sbs`), and diff element-for-element — fix every mismatch to MATCH the source. The SPEC is a guide; the SOURCE CROP is the acceptance test. Do not advance until the pair matches.
4. **Property gate (autonomous, deterministic).** Extract the BUILD's node props via `use_figma` (mirror of `inspect-full`), write to `<page>-build-props.json`, then `node scripts/diff.js <build-props> <tokens> <layout>` → exact gap list + score. **Converge: extract → diff → auto-fix (recolor chromatic→mono, resize to source values, full-pill buttons, exact radii/padding/gutters) → re-diff, until score = 100.** Proven on Channels (82→100). No eyeballing — the machine has ground truth.
5. **Structural gate (LLM audit).** Side-by-sides (`scan` + `sbs`) + the completeness-audit workflow catch what the property diff can't (composition, mockup content, missing/extra beats, z-order). Fix worst-first with the builders; re-audit.
6. **Close gaps, re-verify.** Certify 1:1 only when the property gate = 100 AND the structural audit ≥ ~97 AND the 5 verification gates pass.

## 5 verification gates (before "100%")
1. Structure (+ nav, order, **negative check**) matches per section side-by-side
2. Treatment — colors/gradients/icons/buttons/**text sizes**/copy-length match the DOM tokens
3. Layout, spacing & **per-component properties** match `inspect-layout` + `inspect-full`
4. Completeness audit ≥ ~97% per section, no missing beats
5. Footer parity

## Hard rules (the failures these prevent)
- **THE BUILD IS COMPARISON-DRIVEN, not interpretation-driven. The source is the target you REPRODUCE, not a theme you riff on.** After building EACH section, crop the build section AND the matching source section, put them SIDE-BY-SIDE, and diff every element / position / size / treatment — then correct the build to MATCH before moving to the next section. "Understand the page, then make it from fresh" is THE failure mode (it caused ~7 QA rounds on Markets): with no side-by-side forcing function, gaps silently get filled with plausible inventions. The board's `cmp-*` frames already place SHOPIFY·LIVE beside STADIUM·BUILD for exactly this — use it. No section is done until its side-by-side matches.
- Scrape the DOM, don't eyeball.
- Follow the source's color scheme; don't impose Stadium purple.
- **Eyebrow mono-check applies to SECTION eyebrows only (uppercase, fs ≥ 13).** Product-UI / mockup-internal labels (fs ≤ 12 — currency pills, status chips, brand marks inside cards) legitimately keep color; the extractor must exclude them (fs ≥ 13 filter) or the diff false-positives. (International: a `#2f6bff` 11px "CAD" pill inside a reward card.)
- **Extractor must exclude ALL mockup-internal text from the eyebrow/heading checks** — skip any text whose ancestor chain (up to the build root) contains a frame with a visible `DROP_SHADOW` (every composed card/window/panel carries a shadow; real section eyebrows/headings never sit inside one). Without this, decorative mockup headlines (e.g. a 26px storefront-preview title) false-positive against the source heading scale. (Markets: "Stir. Steam. Sizzle. Serve." 26px inside the theme-builder preview.)
- No empty placeholder boxes — composed mockups only.
- Never drop a beat; never add one the source lacks. **When dividing a page into sections for analysis/build, enumerate EVERY sub-block — a tall section often contains more blocks than it first appears (Markets' dark showcase had 4 buyer blocks, not 3; the 4th "More ways…" collage was dropped and left an empty gap). Cross-check the heading inventory from `inspect-ch` against the blocks you built — every source H2/H3 must map to something.**
- Never claim "done" from the build alone — a page that *feels* done is ~65% complete. **Run the completeness-audit workflow before claiming a page done — eyeballing built sections cannot detect a source block with nothing built for it.**
- **Light vs dark: trust the rendered screenshot for section background, not a DOM gradient token.** A navy/dark gradient in the DOM may belong to a decorative/hidden/scroll-state element, not the section bg. PIXEL-SAMPLE the captured screenshot for the section's actual bg color. If DOM text reads `#ffffff` but the section bg samples LIGHT, the white text lives on a dark SUB-PANEL (e.g. a contained grey "more ways" panel) — do NOT make the whole section dark. (Markets "Build the best experience" is light `#f1f1ef`; I wrongly built it dark navy.)
- **One source section = one background.** Never split a single section into two stacked bands with different bg colors — it reads as two separate sections. Keep the bg unified across a section's sub-bands.
- **Removing a nested element is dangerous — target the SMALLEST matching frame, never an ancestor.** `findAll(frame that *contains* text X)` matches the whole row/section containing X too; removing that deletes far more than intended. Match the element's direct parent, and ALWAYS re-check row/child counts after any `.remove()`. (Deleting 2 tag pills accidentally deleted a whole 3-cell grid row.)
- **Negative check applies to small details too** — don't fabricate plan badges/tags/chips the source lacks; verify against the source crop before adding any.
- **Verify every mockup at HIGH RES by MEASURING — section-crop audits and full-page thumbnails miss rendered breaks (even a completeness-audit can score 88% while a section is visibly broken).** Recurring breaks to scan for: (a) autolayout **SLABS** — an element stuck ~100px because its sizing mode was locked FIXED before content (for fixed-width/hug-height set `primaryAxisSizingMode="FIXED"` + `counterAxisSizingMode="AUTO"`, then read back the measured height); (b) fixed-height cards/panels **CLIPPING** grown content (hug or size-to-fit; confirm the last row shows with a clean bottom edge); (c) **ORPHANED** nodes/pills with no connectors; (d) **zero gap** between a heading and the mockup beneath it (check the parent `itemSpacing`). Read the actual node dimensions, don't trust the eye on a downscaled crop.
- **Match the source's mockup GROUPING, not just its contents** — if the source shows two distinct side-by-side cards, build two separate cards; don't merge them into one overlapping collage cluster (Markets phone + price-list were one cluster, source has two cards). And a fixed-width node/card must either fit its text or bleed cleanly off the canvas edge — never clip text mid-box (the "Grand Depot" node cut its label mid-word).

## Tools
`scripts/cap.js` · `inspect-ch.js` · `inspect-layout.js` · `inspect-full.js` (all take `<url>`, use playwright-core
`channel:'chrome'`) · `scan-ch.js` (source section boundaries) · `sbs.js` (per-section side-by-side composite — edit
the offsets per page) · **`diff.js <build-props> <tokens> <layout>`** (deterministic source↔build property diff →
gap list + score; the autonomy keystone). The build-side extractor + auto-fix are `use_figma` routines (Figma plugin
context, not node). Plus a per-section completeness-audit **Workflow**. Requires playwright-core + system Chrome.

Building in Figma: load `figma-use` + `stadium-design-system` skills before `use_figma`. Content frame = source
content width (e.g. 1260) centered full-bleed → gutters fall out (e.g. 90); rows = exact `itemSpacing`; cards = exact
`cornerRadius` + padding; buttons = exact padding + full radius; `DROP_SHADOW` effects need `blendMode:"NORMAL"`.
