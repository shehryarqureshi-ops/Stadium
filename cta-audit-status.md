# CTA & link audit — status (checked 2026-11-25)

Source: “Stadium Pre-Launch Journey & CTA Audit” (audited 2026-11-20 against stadium-rho.vercel.app). Status = result of re-crawling every audited page on the current code.

## Pages (primary CTA)

| Area | Page | Audit said | Status now | Notes |
|---|---|---|---|---|
| Core funnel | Homepage | Working | Working | No change needed |
| Ways to Engage | Ways to Engage (hub) | Working | Working | No change needed |
| Ways to Engage | Recognition | Broken | Fixed in code | All CTAs resolve to /book-a-call or a real URL; the audited staging build is older than this code |
| Ways to Engage | Swag | Partial | Fixed in code | All CTAs resolve to /book-a-call or a real URL; the audited staging build is older than this code |
| Ways to Engage | Snacks | Broken | Fixed in code | All CTAs resolve to /book-a-call or a real URL; the audited staging build is older than this code |
| Ways to Engage | Gifting | Broken | Fixed in code | All CTAs resolve to /book-a-call or a real URL; the audited staging build is older than this code |
| Ways to Engage | Events | Partial | Fixed in code | All CTAs resolve to /book-a-call or a real URL; the audited staging build is older than this code |
| Impact by Team | Impact by Team (hub) | Working | Working | No change needed |
| Impact by Team | HR & People | Partial | Fixed in code | All CTAs resolve to /book-a-call or a real URL; the audited staging build is older than this code |
| Impact by Team | Marketing | Working | Working | No change needed |
| Impact by Team | Sales | Working | Working | No change needed |
| Impact by Team | Customer Experience | Working | Working | No change needed |
| Impact by Team | Leadership | Working | Working | No change needed |
| Impact by Team | Office Admins | Working | Working | No change needed |
| Impact by Team | Finance | Working | Working | No change needed |
| Purchase path | Pricing | Partial | Intentional — kept | Kept by decision (2026-11-25): in-page form (#book-a-demo) with the chosen package prefilled; header CTA goes to /book-a-call |
| Purchase path | Catalog | Working | Fixed now | All CTA labels now “Talk to sales”; destinations unchanged |
| Proof | The Proof | Working | Working | No change needed |

## Flagged links (70)

| Page | Link | Audit issue | Status now | Where it goes / notes |
|---|---|---|---|---|
| Recognition | Talk to sales (hero) | Broken -- placeholder with no destination | Fixed in code | → /book-a-call |
| Recognition | Explore rewards (hero) | Broken -- placeholder with no destination | Fixed in code | → /catalog#gifts |
| Recognition | Talk to sales (header) | Broken -- placeholder; the header CTA works on every other page | Fixed in code | → /book-a-call |
| Recognition | Login/sign up (header) | Broken -- placeholder with no destination | Fixed in code | → https://app.bystadium.com/shops/login |
| Recognition | Pricing (header) | Broken -- placeholder with no destination | Fixed in code | → /pricing |
| Recognition | Book a demo | Broken -- placeholder; also labeled 'Book a demo' not 'Talk to sales' | Fixed now | Inline link now reads “talk to sales” → /book-a-call |
| Recognition | TALK TO SALES (Why Stadium section) | Broken -- placeholder with no destination | Fixed in code | → /book-a-call |
| Recognition | Explore Kudos | Broken -- placeholder with no destination | Fixed in code | Renamed: now “Kudos Programs” → /recognition#kudos |
| Recognition | Talk to sales (closing) | Broken -- placeholder with no destination | Fixed in code | → /book-a-call |
| Recognition | Explore rewards (closing) | Broken -- placeholder with no destination | Fixed in code | → /catalog#gifts |
| Recognition | Get bulk pricing | Broken -- placeholder with no destination | Fixed in code | → /pricing |
| Recognition | Learn more | Broken -- placeholder with no destination | No longer on page | Not present in the current build |
| Recognition | Shop swag (featured) | Broken -- placeholder; every other page sends this to swagmagic.com | Fixed in code | → https://www.swagmagic.com/us-en/s/promotional-products/catalog |
| Recognition | Branded Stores (carousel x3) | Broken -- placeholder with no destination | No longer on page | Not present in the current build |
| Recognition | The Global Engagement Report 2026 | Broken -- placeholder with no destination | No longer on page | Not present in the current build |
| Swag | Browse the catalog (hero) | Broken -- placeholder with no destination | Fixed in code | → /catalog |
| Swag | Talk to sales (hero) | Broken -- placeholder with no destination | Fixed in code | → /book-a-call |
| Swag | Talk to sales (Run a swag program card) | Broken -- placeholder with no destination | Fixed in code | → /book-a-call |
| Swag | Shop Swagmagic (Order Swag Yourself) | Broken -- placeholder; should point to swagmagic.com | Fixed now | Now “Shop Swagmagic” → swagmagic.com catalog |
| Swag | Build a kit | Broken -- placeholder with no destination | No longer on page | Not present in the current build |
| Swag | Explore pricing (Stadium Passes) | Broken -- placeholder with no destination | Fixed in code | → /pricing |
| Swag | BOOK A CALL (comparison section) | Broken -- placeholder; also labeled 'Book a call' not 'Talk to sales' | Fixed in code | Cell reads “TALK TO SALES” → /book-a-call |
| Swag | Talk to sales (closing) | Broken -- placeholder with no destination | Fixed in code | → /book-a-call |
| Swag | Shop swag (closing) | Broken -- placeholder with no destination | Fixed in code | → https://www.swagmagic.com/us-en/s/promotional-products/catalog |
| Snacks | Browse the catalog (hero) | Broken -- placeholder with no destination | Fixed in code | → /catalog |
| Snacks | Build a box (hero) | Broken -- placeholder with no destination | Fixed in code | → https://www.snackmagic.com/dashboard/treats/R839965757/setup?modal=edit-treat-type-and-budget-modal |
| Snacks | Talk to sales (header) | Broken -- placeholder; the header CTA works on every other page | Fixed in code | → /book-a-call |
| Snacks | Login/sign up (header) | Broken -- placeholder with no destination | Fixed in code | → https://app.bystadium.com/shops/login |
| Snacks | Pricing (header) | Broken -- placeholder with no destination | Fixed in code | → /pricing |
| Snacks | Start a box | Broken -- placeholder with no destination | Fixed in code | Renamed: now “Start your order” → snackmagic.com/pricing |
| Snacks | Browse boxes | Broken -- placeholder with no destination | Fixed in code | → https://www.snackmagic.com/menu/curated-boxes |
| Snacks | Browse all 2000+ snacks | Broken -- placeholder with no destination | Fixed in code | → /snacks |
| Snacks | Build a box (closing) | Broken -- placeholder with no destination | Fixed in code | → https://www.snackmagic.com/dashboard/treats/R839965757/setup?modal=edit-treat-type-and-budget-modal |
| Snacks | Talk to sales (closing) | Broken -- placeholder with no destination | Fixed in code | → /book-a-call |
| Snacks | Learn more | Broken -- placeholder with no destination | No longer on page | Not present in the current build |
| Snacks | Get bulk pricing | Broken -- placeholder with no destination | Fixed in code | → /pricing |
| Snacks | Shop swag | Broken -- placeholder with no destination | Fixed in code | → https://www.swagmagic.com/us-en/s/promotional-products/catalog |
| Gifting | Talk to sales (header) | Broken -- placeholder; the header CTA works on every other page | Fixed in code | → /book-a-call |
| Gifting | Login/sign up (header) | Broken -- placeholder with no destination | Fixed in code | → https://app.bystadium.com/shops/login |
| Gifting | Pricing (header) | Broken -- placeholder with no destination | Fixed in code | → /pricing |
| Gifting | Talk to sales (hero) | Broken -- placeholder with no destination | Fixed in code | → /book-a-call |
| Gifting | Browse gifts (hero) | Broken -- placeholder with no destination | Fixed in code | → /catalog#gifts |
| Gifting | Explore HOLIDAY gifting | Broken -- placeholder with no destination | Fixed in code | → /catalog#gifts |
| Gifting | Learn more | Broken -- placeholder with no destination | No longer on page | Not present in the current build |
| Gifting | Shop swag | Broken -- placeholder with no destination | Fixed in code | → https://www.swagmagic.com/us-en/s/promotional-products/catalog |
| Gifting | Get bulk pricing (impact menus) | Broken -- placeholder with no destination | Fixed in code | → /pricing |
| Gifting | Talk to sales (closing) | Broken -- placeholder with no destination | Fixed in code | → /book-a-call |
| Gifting | Browse the catalog (closing) | Broken -- placeholder with no destination | Fixed in code | → /catalog |
| Gifting | Footer (Platform Features/Resources/About Us/Other) | Broken -- the entire footer is placeholders | Fixed in code | Footer links are real URLs (no # placeholders remain) |
| Events | Talk to sales (hero) | Broken -- placeholder with no destination | Fixed in code | → /book-a-call |
| Events | Browse gifts (hero) | Broken -- placeholder with no destination | No longer on page | Not present in the current build |
| Events | Shop swag (Featured) | Broken -- placeholder; should point to swagmagic.com | Fixed in code | → https://www.swagmagic.com/us-en/s/promotional-products/catalog |
| Events | Browse experiences (footer) | Broken -- placeholder with no destination | Fixed in code | → /catalog#experiences |
| Events | Talk to sales (footer) | Broken -- placeholder with no destination | Fixed in code | → /book-a-call |
| HR & People | Talk to sales (hero) | Broken -- placeholder with no destination | Fixed in code | → /book-a-call |
| HR & People | Talk to sales (footer) | Broken -- placeholder with no destination | Fixed in code | → /book-a-call |
| HR & People | Browse experiences (footer) | Broken -- placeholder with no destination | No longer on page | Not present in the current build |
| Pricing | Get started (Pay-as-you-go card) | Points to an on-page form not /book-a-call; also labeled 'Get started' not 'Talk to sales' | Intentional — kept | Kept by decision (2026-11-25): on-page form ?interestedPackage=Pay-as-you-go#book-a-demo |
| Pricing | Talk to sales (Shops Pass) | Points to an on-page form not /book-a-call | Intentional — kept | Kept by decision (2026-11-25): on-page form #book-a-demo |
| Pricing | Talk to sales (Swag Pass) | Points to an on-page form not /book-a-call | Intentional — kept | Kept by decision (2026-11-25): on-page form #book-a-demo |
| Pricing | Talk to sales (Engagement Pass) | Points to an on-page form not /book-a-call | Intentional — kept | Kept by decision (2026-11-25): on-page form #book-a-demo |
| Pricing | Talk to sales (Enterprise Pass) | Points to an on-page form not /book-a-call | Intentional — kept | Kept by decision (2026-11-25): on-page form #book-a-demo |
| Pricing | Talk to sales (package section) | Points to an on-page form not /book-a-call | Intentional — kept | Kept by decision (2026-11-25): on-page form #book-a-demo |
| Pricing | Talk to sales (closing) | Points to an on-page form not /book-a-call | Intentional — kept | Kept by decision (2026-11-25): on-page form #book-a-demo |
| Catalog | Book a call (hero) | Labeled 'Book a call' not 'Talk to sales' | Fixed now | Label is now “Talk to sales” → /book-a-call |
| Catalog | Book a call (Swag section) | Labeled 'Book a call' not 'Talk to sales' | Fixed now | Label is now “Talk to sales” → /book-a-call |
| Catalog | Book a call (Gifts section) | Labeled 'Book a call' not 'Talk to sales' | Fixed now | Label is now “Talk to sales” → /book-a-call |
| Catalog | Book a call (Snacks section) | Labeled 'Book a call' not 'Talk to sales' | Fixed now | Label is now “Talk to sales” → /book-a-call |
| Catalog | Book a call (Hosted Experiences) | Labeled 'Book a call' not 'Talk to sales' | Fixed now | Label is now “Talk to sales” → /book-a-call |
| Catalog | Book a demo (closing) | Labeled 'Book a demo' not 'Talk to sales' | Fixed now | Label is now “Talk to sales” → /book-a-call |

## Not code issues

| Item | Status |
|---|---|
| Links resolve to stadium-rho.vercel.app while canonicals are bystadium.com | Expected pre-launch: links are relative; canonicals are intentionally production. Share tags follow the host (see design.md). |
| Analytics / tracking on the way to /book-a-call | Not checked by the audit; needs Sourabh to confirm page by page. |

## The other 97 links (audit: "No issue") — re-verified 2026-11-25
Every link on the 17 audited pages, checked on the current code (181 unique destinations):
- 106 internal links → 33 routes, all return 200.
- 75 external links → all load; only linkedin.com/company/bystadium answers 403 to scripts (LinkedIn blocks bots; fine in a browser).
- Hash deep links (e.g. `/impact/hr#birthdays`, `/gifting#gift-stores`, `/events#learning-development`): the ids are set by client-side tabs/carousels, not in the HTML. Loaded a sample of 12 in a browser; each selected its tab and scrolled to the section.
- Same-page anchors `#swag`, `#compare`, `#book-a-demo`, `#explore-by-team` exist.
Not re-verified: external pages' own content, and analytics on the path to /book-a-call.
