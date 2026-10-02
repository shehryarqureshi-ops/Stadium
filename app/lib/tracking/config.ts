/* Consent + tracking configuration (single source of truth).

   MODES — set NEXT_PUBLIC_APP_ENV explicitly per deployment:
     development  (default)  local `npm run dev` / unset
     staging                 any pre-production deployment
     production              the live site ONLY

   Analytics fire ONLY in production. In development and staging no tag
   loads (GTM, Clarity, HubSpot, Zendesk), nothing is pushed to the dataLayer,
   and no event reaches GA4, ad platforms or HubSpot.

   Two independent guards, because env vars are easy to misconfigure (a staging
   deployment built with production env vars would otherwise pollute live data):
     1. build-time  NEXT_PUBLIC_APP_ENV must be "production"
     2. run-time    window.location.hostname must be in NEXT_PUBLIC_PRODUCTION_HOSTS
   Do NOT derive the mode from VERCEL_ENV: the staging site can itself be a
   Vercel "production" deployment (e.g. stadium-rho.vercel.app).

   The IDs below are public identifiers that already ship in the HTML of
   bystadium.com, so defaults are safe to commit. */

export type AppEnv = "development" | "staging" | "production";

const rawEnv = process.env.NEXT_PUBLIC_APP_ENV;
const env: AppEnv =
  rawEnv === "production" || rawEnv === "staging" ? rawEnv : "development";

const list = (value: string | undefined, fallback: string) =>
  (value ?? fallback)
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

export const TRACKING = {
  env,
  /** Build-time guard. Use isTrackingActive() for the full check. */
  enabled: env === "production",
  /** Opt-in for local testing of the consent banner and Zendesk widget ONLY.
      Loads Osano + Zendesk in any mode; GTM, Clarity, HubSpot and all events
      stay off outside production. */
  widgetsPreview: process.env.NEXT_PUBLIC_WIDGETS_PREVIEW === "true",
  /** Dev aid: log every event to the console (as a dry run when inactive). */
  debug: process.env.NEXT_PUBLIC_TRACKING_DEBUG === "true",

  /** Hostnames on which analytics may run. Add the final domain here. */
  productionHosts: list(
    process.env.NEXT_PUBLIC_PRODUCTION_HOSTS,
    "www.bystadium.com,bystadium.com",
  ),

  osanoSrc:
    process.env.NEXT_PUBLIC_OSANO_SRC ??
    "https://cmp.osano.com/16COqgTbuKRHb45MG/8df580a7-8ae9-4872-8875-745de3a21f22/osano.js",

  /* GTM container. GA4, Google Ads, LinkedIn, Reddit and Microsoft Ads tags
     live INSIDE this container — do not hard-code them in the app. */
  gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-KWGXDZ6",

  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID ?? "g5rwwcq46l",
  hubspotPortalId: process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID ?? "8084862",
  zendeskKey:
    process.env.NEXT_PUBLIC_ZENDESK_KEY ?? "6c3980f0-e15c-4628-a7e2-5b57deaeeaff",
  helpCenterUrl:
    process.env.NEXT_PUBLIC_HELP_CENTER_URL ?? "https://help.bystadium.com",
} as const;

/** The single gate for everything analytics. Client-only (needs the hostname). */
export function isTrackingActive(): boolean {
  if (!TRACKING.enabled || typeof window === "undefined") return false;
  return TRACKING.productionHosts.includes(window.location.hostname.toLowerCase());
}

/** Osano consent categories (as returned by Osano.cm.getConsent()). */
export type OsanoCategory =
  | "ESSENTIAL"
  | "ANALYTICS"
  | "MARKETING"
  | "PERSONALIZATION"
  | "OPT_OUT";

/** Which Osano category must be ACCEPTed before each script may load. */
export const CONSENT_FOR = {
  clarity: "ANALYTICS",
  hubspot: "MARKETING",
} as const satisfies Record<string, OsanoCategory>;
