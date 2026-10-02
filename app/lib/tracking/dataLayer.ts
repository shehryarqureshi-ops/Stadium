import { TRACKING, isTrackingActive } from "./config";

/* Typed access to the third-party globals we touch. */
type OsanoConsent = Partial<Record<string, "ACCEPT" | "DENY">>;
type OsanoCm = {
  getConsent?: () => OsanoConsent;
  addEventListener?: (event: string, cb: (...args: unknown[]) => void) => void;
  showDrawer?: (id: string) => void;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    Osano?: { cm?: OsanoCm };
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
    _hsq?: unknown[];
    _hsp?: unknown[];
    zE?: (...args: unknown[]) => void;
  }
}

export type TrackParams = Record<string, string | number | boolean | null | undefined>;

/* Never let personal data reach the dataLayer, and from there GA4 / ad
   platforms (it breaches Google's terms and our privacy policy). Leads reach
   HubSpot through the form's own API call, not through analytics. */
const PII_KEY =
  /(^|_)(e?mail|phone|first_?name|last_?name|full_?name|name|additionalinfo|message|address|password|token)(_|$)|^company$/i;
const EMAIL_VALUE = /[^\s@]+@[^\s@]+\.[^\s@]+/;

export function sanitizeParams(params: TrackParams): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    if (PII_KEY.test(key)) continue;
    if (typeof value === "string" && EMAIL_VALUE.test(value)) continue;
    out[key] = typeof value === "string" ? value.slice(0, 200) : value;
  }
  return out;
}

/* The one place events leave the app. In development and staging (or on any
   host that is not a production host) this is a no-op: nothing is pushed, so
   no tag can fire. Set NEXT_PUBLIC_TRACKING_DEBUG=true to see what WOULD be
   sent as a console dry run. */
export function pushToDataLayer(entry: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (!isTrackingActive()) {
    if (TRACKING.debug) {
      console.log(`[tracking] dry run (env=${TRACKING.env}, not sent)`, entry);
    }
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(entry);
  if (TRACKING.debug) console.log("[tracking] dataLayer.push", entry);
}

/** Fire an analytics event. GTM tags decide where it goes, after consent. */
export function trackEvent(event: string, params: TrackParams = {}) {
  pushToDataLayer({ event, ...sanitizeParams(params) });
}
