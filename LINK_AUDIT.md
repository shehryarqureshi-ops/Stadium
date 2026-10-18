# Stadium — Link Audit (go-live)

Audited 2026-10-17: every `href`/CTA/link string in `app/` (source scan) **plus** the rendered HTML of all 39 routes (header, mega menus, footer, tabs). Every internal route and on-page anchor was checked against the real routes/ids; external URLs were probed for HTTP status.

**Status key**
- [x] **Fixed** — real destination now in the code
- [ ] **To be added** — an interim, non-broken link is in place; a real URL/asset is needed from the team
- [ ] **Missing/broken** — none remain in rendered pages

**Result:** 0 empty/`#` links and 0 dead internal routes/anchors across all 39 routes after fixes (re-crawled).

---

## 1. Header / mega menus
- [x] Engage menu "Popular" ×3 ("Branded Stores") — was `#` → `/swag`
- [ ] Engage menu "Latest at Stadium" (Global Engagement Report 2026) — was `#` → interim `/the-proof`; **needs report URL**
- [x] Proof menu "Case Studies" — was `#` → `bystadium.com/case-studies`
- [x] Proof menu "Reviews & Testimonials" — was `#` → `bystadium.com/reviews`
- [x] Proof menu "Learning Center" — was `#` → Notion learning center
- [x] Proof menu "Guides & Templates" — was `#` → `bystadium.com/resources`
- [x] Proof menu "Help Center" — was `#` → `help.bystadium.com/hc/en-us`
- (same data feeds the mobile nav, so fixed there too)

## 2. Footer (every page)
- [x] Logo — `#` → `/`
- [x] LinkedIn / YouTube / Instagram — `#` → official profiles (taken from the legacy footer)
- [x] Swagmagic / Snackmagic / Confetti brand marks — `#` → their sites
- [x] Kudos Program — `/kudos` (404) → `/recognition`
- [x] Giftable Moments — `/giftable-moments` (404) → `/gifting` *(judgement call; confirm)*
- [x] Custom Domain — `/custom-domain` (404) → `bystadium.com/custom-domain-setup-guide`
- [x] Company — `/company` (404) → `bystadium.com/about`
- [x] Careers — `/careers` (no route) → `bystadium.com/careers`
- [x] Reviews & Testimonials — `/reviews-and-testimonials` (404) → `bystadium.com/reviews`
- [x] Cookie Preferences / Need Help? — `#cookie-preferences`, `#need-help` are intentional; opened by JS (Osano / Zendesk, `ConsentManager.tsx`). No change.

## 3. Homepage `/`
- [x] Hero "Talk to sales" → `/book-a-call`; "Browse the catalog" → `/catalog`
- [x] Occasions "Book a demo", Redacted poster "Talk to sales" → `/book-a-call`
- [x] Teams tabs ×7 (`/marketing`, `/hr`, `/sales`, `/operations`, `/team-leaders`, `/finance`, `/c-suite`, all 404) → `/impact/*` (Operations → office-admins; Team Leaders and C-Suite → leadership)
- [x] Closing CTA ×2 → `/book-a-call`

## 4. Vertical pages
**/recognition** — [x] hero Talk to sales; Explore rewards → `/catalog#gifts` · [x] comparison + impact "book a demo" → `/book-a-call` · [x] offerings: Kudos → `/pricing`, Milestone/Incentives/Service Awards → `/catalog#gifts` *(judgement)* · [x] "See full pricing" → `/pricing` · [x] closing ×2
**/swag** — [x] hero ×2, comparison "Book a call", closing ×2, solution ×2 (→ `/book-a-call`, `/catalog#swag`) · [x] offerings ×6 (kits/on-demand/self-serve → `/catalog#swag`; stores/bulk/storage → `/book-a-call`) · [x] "Explore pricing" → `/pricing` · [ ] Explore cards ×3 (Playbook, Onboarding checklist → interim `bystadium.com/resources`; Fintech story → interim `/the-proof`) — **need real assets**
**/snacks** — [x] hero ×2, "Browse all 2,000+ snacks", solution ×2, closing ×2 → `/catalog#snacks` / `/book-a-call`
**/gifting** — [x] hero ×2, 6 solution cards (Automated → `/book-a-call`, rest `/catalog#gifts`), closing ×2
**/events** — [x] hero ×2, closing ×2 (→ `/book-a-call`, `/catalog#gifts`, `/catalog#experiences`). *Copy note: the hero button reads "Browse gifts" on the Events page.*
**/ways-to-engage** — [x] "Talk to sales" · [ ] "View case study" → interim `/the-proof`; **needs case study URL**
**/book-a-call** — [x] "Browse the catalog" → `/catalog`; "Help Center" `/help-center` (404) → `help.bystadium.com`
**/pricing** — [x] "Browse the catalog" → `/catalog`

## 5. Integrations / platform
All of these were `#`; interim target is the Help Center (`help.bystadium.com/hc/en-us`) until real URLs exist:
- [ ] `/integrations/api` — "View API docs" ×3 → **needs API docs URL**
- [ ] `/integrations/webhooks` — "View webhook documentation" ×3 → **needs docs URL**
- [ ] `/integrations/zapier` — "Set up on Zapier" ×3 → **needs Zapier listing/invite URL**
- [ ] `/integrations/security` — "Explore trust center" ×2 → **needs Trust Center URL**
- [ ] SSO documentation (`/integrations/sso`, `/integrations/security`) ×2 → **needs docs URL**
- [ ] `/integrations/browser-extension` — "Install extension" ×2 → **needs Chrome Web Store URL**
- [x] `/integrations/security` — "View subprocessors" → `bystadium.com/security-subprocessors`
- [ ] `/csr` — "Download statement" → interim `mailto:hi@bystadium.com?subject=Modern Slavery Statement`; **needs the PDF** (only a PNG preview exists)

## 6. Legal pages (MDX)
- [x] `/points-terms-of-use` — 9 links pointed at **dev.bystadium.com** → `www.bystadium.com` or relative routes
- [x] `/privacy-policy` — 3 root-relative links (`/security-subprocessors`, `/moments/…`, `/blog/…`) made absolute so they resolve outside WordPress
- [x] `/terms-of-use` — `http://` IP-policy link → `https://`

## 7. Verified OK (no change)
In-page anchors (`#main`, `#compare`, `#book-a-demo`, `#directory`, `#swag`, `#explore-by-team`, all legal TOC anchors) all have targets. All other external links return 200. Only `help.bystadium.com` (403) and `aboutads.info` (429) block curl, so please spot-check them in a browser.

## 8. Risks / not changed
- **Cutover risk:** many links point at WordPress paths on `www.bystadium.com` that are not in this app (about, careers, reviews, case-studies, resources, partnerships, custom-domain-setup-guide, security-subprocessors, case-overview/*, case-study/*, blog/*, moments/*, archived-terms-of-use, intellectual-property-policy). They return 200 today. Confirm those WP pages stay live at go-live.
- `/menu-lab` (internal lab page): "Skip to content" has no `#main` target. Keep it unindexed or remove it.
- Dead (unrendered) components still contain `#`: `GiftSolution`, `SwagCatalog`, `SwagOfferings`, `SwagWorkflow`, `SwagClosing`, `Recognition`. Consider deleting them.
- Fallbacks `href ?? "#"` / `href = "#"` remain in `EngageMenu`, `SiteHeader`, `ProofMenu`, `MegaMenu`. Nothing hits them today, but a future item without an href would silently become a dead link.
