/* Origins used in page metadata.

   SITE_URL   — the production origin. Canonical links always use it (also on staging), so a
                staging copy never competes with the live page in search.
   SHARE_ORIGIN — the origin the *share* tags resolve against (og:url, og:image, twitter:image,
                via `metadataBase`). Social crawlers must be able to fetch the image from the host
                that was shared, so on staging this is the staging domain, not production.

   SHARE_ORIGIN resolution (first match wins):
     1. NEXT_PUBLIC_SHARE_ORIGIN                    explicit override, e.g. https://staging.example.com
     2. staging (NEXT_PUBLIC_APP_ENV=staging)       https://<first host in NEXT_PUBLIC_ANALYTICS_HOSTS>
     3. otherwise                                   SITE_URL

   Kept free of imports so it can be unit-checked with plain node. */

const trim = (u: string) => u.replace(/\/$/, "");

export const SITE_URL = trim(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bystadium.com");

const stagingHost =
  process.env.NEXT_PUBLIC_APP_ENV === "staging"
    ? (process.env.NEXT_PUBLIC_ANALYTICS_HOSTS ?? "")
        .split(",")
        .map((h) => h.trim())
        .filter(Boolean)[0]
    : undefined;

export const SHARE_ORIGIN = trim(
  process.env.NEXT_PUBLIC_SHARE_ORIGIN ?? (stagingHost ? `https://${stagingHost}` : SITE_URL),
);
