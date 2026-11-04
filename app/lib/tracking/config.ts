/* Consent + tracking configuration (single source of truth).

   MODES — set NEXT_PUBLIC_APP_ENV explicitly per deployment:
     development  (default)  local `npm run dev` / unset: no tags, no events
     staging                 pre-production deployment: Osano + analytics run, but
                             ONLY against STAGING ids/hosts you provide via env vars
     production              the live site

   Analytics (GTM, Clarity, HubSpot tracking, events) run in staging and production.
   In development nothing loads.

   Staging never falls back to production ids. The production defaults for the
   GTM container, Clarity project and HubSpot portal below are only used when
   NEXT_PUBLIC_APP_ENV=production; on staging each one must be set explicitly
   (NEXT_PUBLIC_GTM_ID, NEXT_PUBLIC_CLARITY_ID, NEXT_PUBLIC_HUBSPOT_PORTAL_ID) or
   that tool stays off. Likewise the hostname allow-list defaults to the live
   domains only in production; on staging set NEXT_PUBLIC_ANALYTICS_HOSTS to the
   staging domain.

   Two independent guards, because env vars are easy to misconfigure (a staging
   deployment built with production env vars would otherwise pollute live data):
     1. build-time  NEXT_PUBLIC_APP_ENV must be "production" or "staging"
     2. run-time    window.location.hostname must be in NEXT_PUBLIC_ANALYTICS_HOSTS
                    (a production build served from the staging host, or the other way
                    round, therefore sends nothing)
   Do NOT derive the mode from VERCEL_ENV: the staging site can itself be a
   Vercel "production" deployment (e.g. stadium-rho.vercel.app).

   The production IDs below are public identifiers that already ship in the HTML
   of bystadium.com, so defaults are safe to commit. */

export type AppEnv = "development" | "staging" | "production";

const rawEnv = process.env.NEXT_PUBLIC_APP_ENV;
const env: AppEnv =
  rawEnv === "production" || rawEnv === "staging" ? rawEnv : "development";

const list = (value: string | undefined, fallback: string) =>
  (value ?? fallback)
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

const isProd = env === "production";

export const TRACKING = {
  env,
  /** Build-time guard (analytics-capable deployments). Use isTrackingActive() for the full check. */
  enabled: env === "production" || env === "staging",
  /** Opt-in for local testing of the consent banner and Zendesk widget ONLY.
      Loads Osano + Zendesk in any mode; GTM, Clarity, HubSpot and all events
      stay off unless the deployment is staging/production on an allowed host. */
  widgetsPreview: process.env.NEXT_PUBLIC_WIDGETS_PREVIEW === "true",
  /** Marker.io QA widget: development only — off on staging and production.
      NEXT_PUBLIC_MARKER_ENABLED=true force-enables it (e.g. a design-review build). */
  markerEnabled:
    process.env.NEXT_PUBLIC_MARKER_ENABLED === "true" || env === "development",
  /** Dev aid: log every event to the console (as a dry run when inactive). */
  debug: process.env.NEXT_PUBLIC_TRACKING_DEBUG === "true",

  /** Hostnames on which analytics may run. Production defaults to the live domains;
      staging has NO default — set NEXT_PUBLIC_ANALYTICS_HOSTS to the staging domain.
      (NEXT_PUBLIC_PRODUCTION_HOSTS is still read as a fallback for existing setups.) */
  analyticsHosts: list(
    process.env.NEXT_PUBLIC_ANALYTICS_HOSTS ?? process.env.NEXT_PUBLIC_PRODUCTION_HOSTS,
    isProd ? "www.bystadium.com,bystadium.com" : "",
  ),

  osanoSrc:
    process.env.NEXT_PUBLIC_OSANO_SRC ??
    "https://cmp.osano.com/16COqgTbuKRHb45MG/8df580a7-8ae9-4872-8875-745de3a21f22/osano.js",

  /* GTM container. GA4, Google Ads, LinkedIn, Reddit and Microsoft Ads tags
     live INSIDE this container — do not hard-code them in the app. */
  gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? (isProd ? "GTM-KWGXDZ6" : ""),

  /* Empty = that tool stays off (never the production project on staging). */
  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID ?? (isProd ? "g5rwwcq46l" : ""),
  hubspotPortalId: process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID ?? (isProd ? "8084862" : ""),
  zendeskKey:
    process.env.NEXT_PUBLIC_ZENDESK_KEY ?? "6c3980f0-e15c-4628-a7e2-5b57deaeeaff",
  helpCenterUrl:
    process.env.NEXT_PUBLIC_HELP_CENTER_URL ?? "https://help.bystadium.com",
} as const;

/** The single gate for everything analytics. Client-only (needs the hostname). */
export function isTrackingActive(): boolean {
  if (!TRACKING.enabled || typeof window === "undefined") return false;
  return TRACKING.analyticsHosts.includes(window.location.hostname.toLowerCase());
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
