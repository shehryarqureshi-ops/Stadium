"use client";

import { useEffect } from "react";

import {
  CONSENT_FOR,
  TRACKING,
  isTrackingActive,
  type OsanoCategory,
} from "../../lib/tracking/config";
import { pushToDataLayer } from "../../lib/tracking/dataLayer";

/* Bridges Osano (the CMP) to everything that needs to know about consent.

   1. Google Consent Mode v2 — mirrors Osano's choices into gtag('consent',
      'update', …) so GTM tags (GA4, Google Ads, LinkedIn, Reddit, Microsoft
      Ads) fire only for what the visitor accepted.
   2. Gated scripts — Microsoft Clarity and the HubSpot tracking code are not
      in the page at all until their category is accepted. If Osano never
      loads (blocked, offline) they simply never load: the safe failure mode.
   3. Footer links — "Cookie Preferences" opens Osano's preference centre and
      "Need Help?" opens the Zendesk widget (see app/components/PageClose.tsx,
      which links to #cookie-preferences / #need-help).

   Renders nothing. Mounted once from the root layout. */

type Consent = Partial<Record<string, "ACCEPT" | "DENY">>;

const accepted = (consent: Consent, category: OsanoCategory) =>
  consent[category] === "ACCEPT";

const state = { clarity: false, hubspot: false };

function appendScript(id: string, src: string, onload?: () => void) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  if (onload) script.onload = onload;
  document.head.appendChild(script);
}

/* ---- Microsoft Clarity (analytics category) ---------------------------- */
function loadClarity() {
  // Another loader (e.g. a tag inside GTM) already provided Clarity: don't double-load.
  if (window.clarity && !document.getElementById("clarity-js")) return;
  if (!window.clarity) {
    window.clarity = function (...args: unknown[]) {
      (window.clarity!.q = window.clarity!.q || []).push(args);
    } as NonNullable<Window["clarity"]>;
  }
  appendScript("clarity-js", `https://www.clarity.ms/tag/${TRACKING.clarityId}`);
}

/* ---- HubSpot tracking code (marketing category) ------------------------ */
function identifyHubSpot() {
  try {
    const raw = sessionStorage.getItem("auth");
    const email = raw ? (JSON.parse(raw) as { user?: { email?: string } }).user?.email : null;
    if (email) {
      window._hsq = window._hsq || [];
      window._hsq.push(["identify", { email }]);
    }
  } catch {
    /* storage unavailable or malformed: skip identify */
  }
}

function loadHubSpot() {
  window._hsp = window._hsp || [];
  window._hsp.push(["setAllowLinker", true]);
  appendScript(
    "hs-script-loader",
    `https://js.hs-scripts.com/${TRACKING.hubspotPortalId}.js`,
    identifyHubSpot,
  );
}

/* ---- Apply a consent snapshot ------------------------------------------ */
function applyConsent(consent: Consent) {
  // Development / staging / non-production host: never touch gtag, the
  // dataLayer or any tracking script. (Footer links below still work.)
  if (!isTrackingActive()) return;

  const grant = (category: OsanoCategory) =>
    accepted(consent, category) ? "granted" : "denied";

  // Google Consent Mode v2 (window.gtag is defined by the beforeInteractive snippet)
  window.gtag?.("consent", "update", {
    analytics_storage: grant("ANALYTICS"),
    ad_storage: grant("MARKETING"),
    ad_user_data: grant("MARKETING"),
    ad_personalization: grant("MARKETING"),
    personalization_storage: grant("PERSONALIZATION"),
  });

  // Lets GTM triggers react to consent without reading Osano directly.
  pushToDataLayer({
    event: "consent_update",
    consent_analytics: accepted(consent, "ANALYTICS"),
    consent_marketing: accepted(consent, "MARKETING"),
    consent_personalization: accepted(consent, "PERSONALIZATION"),
  });

  if (accepted(consent, CONSENT_FOR.clarity)) {
    if (!state.clarity) loadClarity();
    window.clarity?.("consent");
    state.clarity = true;
  } else if (state.clarity) {
    window.clarity?.("consent", false); // stop and clear Clarity cookies
    state.clarity = false;
  }

  if (accepted(consent, CONSENT_FOR.hubspot)) {
    if (!state.hubspot) loadHubSpot();
    else identifyHubSpot();
    state.hubspot = true;
  } else if (state.hubspot) {
    window._hsp?.push(["doNotTrack", { track: false }]); // stop and clear HubSpot cookies
    state.hubspot = false;
  }
}

/* ---- Footer link actions ------------------------------------------------ */
export function openCookiePreferences() {
  window.Osano?.cm?.showDrawer?.("osano-cm-dom-info-dialog-open");
}

export function openHelp() {
  const zE = window.zE;
  if (typeof zE === "function") {
    // Messenger and classic Web Widget use different commands; try both.
    try {
      zE("messenger", "open");
    } catch {
      /* not a Messenger snippet */
    }
    try {
      zE("webWidget", "open");
    } catch {
      /* not a classic Web Widget snippet */
    }
    return;
  }
  window.open(TRACKING.helpCenterUrl, "_blank", "noopener,noreferrer");
}

export default function ConsentManager() {
  useEffect(() => {
    let cancelled = false;
    let attempts = 0;
    let wired = false;

    const sync = () => {
      const consent = window.Osano?.cm?.getConsent?.();
      if (consent) applyConsent(consent);
    };

    const wire = () => {
      const cm = window.Osano?.cm;
      if (!cm || wired) return !!cm;
      wired = true;
      cm.addEventListener?.("osano-cm-initialized", sync);
      cm.addEventListener?.("osano-cm-consent-changed", sync);
      cm.addEventListener?.("osano-cm-consent-saved", sync);
      sync(); // Osano may already be initialised by the time we mount
      return true;
    };

    // Osano loads before hydration, but its API appears slightly later; poll briefly.
    const timer = window.setInterval(() => {
      attempts += 1;
      if (cancelled || wire() || attempts > 100) window.clearInterval(timer);
    }, 100);
    wire();

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a");
      if (!link) return;
      const href = link.getAttribute("href");
      if (href === "#cookie-preferences") {
        event.preventDefault();
        openCookiePreferences();
      } else if (href === "#need-help") {
        event.preventDefault();
        openHelp();
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
