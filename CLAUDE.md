@AGENTS.md

# Stadium — marketing website

Marketing site for Stadium ("global engagement infrastructure"). All designs
come from Figma via the Figma MCP server — never invent visual values; pull
them from the Figma file and record them in `design.md`.

## Stack

- Next.js 16.2.9, App Router (`app/`), TypeScript, React 19
- Tailwind CSS v4 (CSS-first config — no `tailwind.config`; theme lives in
  `@theme` blocks in `app/globals.css`)
- Fonts via `next/font`: Overpass (Google) for body/UI, Satoshi Bold (local,
  `app/fonts/`) for display headlines

## Conventions

- **`design.md` is the design source of truth.** Every design value (colors,
  font sizes, padding, margins, radii, shadows, breakpoints) must be recorded
  there AND defined as a Tailwind `@theme` token in `app/globals.css`.
  Components must use the token classes (e.g. `px-section-x-lg`,
  `text-display-md`, `rounded-button`) — no hardcoded pixel values in JSX.
- When implementing a new Figma section: fetch desktop + tablet + mobile
  frames, add any new tokens to `globals.css` + `design.md`, then build the
  component in `app/components/`.
- Breakpoint mapping: Figma mobile (375) = default, tablet (768) = `md:`,
  desktop (1440) = `lg:`.
- **All values in rem** (Figma px ÷ 16); no viewport-based root font-size
  scaling (tried and rejected). Never hardcode px except 1px hairlines;
  never size images by bare width/height attributes (use rem classes).
  See "Units" in design.md.
- **Above 1440 = Shopify-style centered container**: backgrounds full-bleed,
  content capped and centered (`max-w-content` 1200px inside full-bleed
  sections; `mx-auto w-full max-w-section` 1440px on white sections that
  carry their own padding). Every new section must follow this.
- Never edit source files with PowerShell Get-Content/Set-Content — Windows
  PowerShell reads BOM-less UTF-8 as ANSI and corrupts em dashes etc. into
  mojibake. Use the Edit tool or Node scripts.
- Figma file key: `XsE6IHFveJRTAuTS6kp87m`
- Exported Figma images go in `public/`, rendered with `next/image`.

## Commands

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run lint` — eslint
