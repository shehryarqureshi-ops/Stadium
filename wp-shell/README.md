# WordPress header + footer shell

Static, self-contained versions of the Next.js site's header and footer, for the
WordPress pages that stay on WordPress (blog, case studies, …). Generated from the
real React components, so they cannot drift from them.

```
node scripts/build-wp-shell.mjs        # or: npm run build:wp-shell
```

Output (`wp-shell/dist/`):

| File | What |
| --- | --- |
| `header.html` / `header.php` | header + mobile menu + mega-menus + account menu + its script. Identical files, pick the extension you need (no PHP inside). |
| `footer.html` / `footer.php` | footer + its script |
| `preview.html` | both on a page with deliberately hostile "WordPress" CSS, for testing |

Images and fonts are copied to `public/wp-shell/`, so deploying the Next site serves them
(default URL base `https://www.bystadium.com/wp-shell`). **Deploy the Next site before (or with)
the WordPress change, otherwise images/fonts 404.**

## Installing in WordPress

1. Put `header.php` content right after `<body>` / `wp_body_open()` in the (child) theme's
   `header.php`, and `footer.php` content before `wp_footer()` in `footer.php`.
2. Elementor Pro Theme Builder header/footer templates override the theme files: unpublish them
   (or remove their display conditions) or the shell will not show.
3. Tracking is NOT in the shell. Consent defaults → Osano → GTM must load in `<head>` in that order
   (functions.php / `wp_head`). The shell only pushes click events to `window.dataLayer` on
   production hostnames.
4. Always edit the generator or the source components, never the generated files.

## How it works (so it can be re-run after header changes)

1. `npm run build` (development mode: no analytics), start the site, open it in headless Chrome.
2. Capture the rendered `<header>` from `/ways-to-engage` (that page forces the solid white header,
   the only state WordPress pages get) and the `<footer>` from `/swag`.
3. Stateful mega-menus (Impact, Catalog) swap content on hover through React state: every hover
   state is captured and embedded; `header.js` shows the right one.
4. The signed-in account menu is captured by mocking `/api/auth/session`; `header.js` clones it
   and fills in name/email/avatar.
5. The compiled Tailwind CSS is cut down to the classes those pieces use plus the classes
   `header.js` toggles (listed in the `@tw-classes` block at the top of `header.js`).
6. Everything is wrapped in a **declarative Shadow DOM** (`<template shadowrootmode>`), so WordPress/
   Elementor CSS cannot touch the shell and the shell's CSS cannot touch the page. `:host` resets
   every inherited property with `!important` (inner `!important` beats the page's `!important`).
   Fonts are registered with the FontFace API under unique names (`SDM Overpass`, `SDM satoshi`):
   `@font-face` does not work inside shadow DOM, and unique names cannot clash with theme fonts.
7. rem is converted to px by default so a WordPress `html { font-size }` rule cannot resize the
   shell (`--rem` keeps rem). Media queries keep rem.
8. `header.js` / `footer.js` (vanilla ES5, IIFE) are inlined. They mirror
   `SiteHeader.tsx`, `AccountMenu.tsx`, `hooks/useAuth.ts` and the footer handlers.

## When you change the header or footer

* Markup / styling only: just re-run the generator.
* **Behaviour** (new menu interaction, new state): also change `wp-shell/header.js` or `footer.js`
  by hand, they are not generated. If you add a Tailwind class that the script toggles at runtime,
  add it to the `@tw-classes` list.
* New/renamed mega-menu or nav item: the generator fails loudly (`NAV_KEYS`, `KEYS`,
  `STATEFUL_PANES`) so nothing ships half-updated.

## Options

`--asset-base <url>` (default `https://www.bystadium.com/wp-shell`) · `--site-base <url>` (link
prefix, default `https://www.bystadium.com`, `""` = relative) · `--skip-build` · `--port <n>` ·
`--rem` · `--chrome <path>` (or `CHROME_PATH`).

To test before the Next site is deployed on the final domain, generate with
`--asset-base https://stadium-rho.vercel.app/wp-shell`.

## Testing locally

Serve `wp-shell/dist/preview.html` and `public/wp-shell` from one static server (generate with
`--asset-base http://localhost:PORT/<mount>`). The preview page's CSS is hostile on purpose
(62.5% root font size, `div { font-size: 30px !important; color: red !important }`,
`a { color: hotpink !important }`): the shell must look unchanged.

## Known limits

* GTM link-click triggers cannot see inside shadow DOM; the shell pushes `nav_click`, `app_click`,
  `outbound_click` and `contact_click` itself (production hostnames only).
* Only the solid white header exists on WordPress (no transparent over-hero state). A spacer keeps
  page content below the fixed header; the admin bar offset is handled for logged-in editors.
* Fonts and images come from the Next site's `public/wp-shell/`, so that site must be deployed.
* Login state uses the same `sessionStorage` key (`auth`) as the Next site and the old WordPress script.
