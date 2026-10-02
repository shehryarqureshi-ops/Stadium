"use client";

import { useEffect } from "react";

import { TRACKING, isTrackingActive } from "../../lib/tracking/config";

/* Injects Google Tag Manager (production only) and the Zendesk widget
   (production, or anywhere with NEXT_PUBLIC_WIDGETS_PREVIEW=true).

   Runs on the client so it can check the real hostname (see isTrackingActive):
   on localhost, on staging, or on a build that was given production env vars
   by mistake but is served from a non-production host, nothing is injected.

   GA4, Google Ads, LinkedIn, Reddit and Microsoft Ads tags all live inside the
   GTM container and obey Consent Mode, so none of them fire before the visitor
   consents. Renders nothing. Mounted once from the root layout. */

function injectScript(id: string, src: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

export default function TrackingLoader() {
  useEffect(() => {
    const active = isTrackingActive();
    if (!active && !TRACKING.widgetsPreview) return;

    // Google Tag Manager (same bootstrap as Google's snippet) — production only
    if (active) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      injectScript(
        "gtm",
        `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(TRACKING.gtmId)}`,
      );
    }

    // Zendesk help widget: load when the browser is idle so it never competes
    // with first paint or interaction.
    const loadZendesk = () =>
      injectScript(
        "ze-snippet",
        `https://static.zdassets.com/ekr/snippet.js?key=${encodeURIComponent(TRACKING.zendeskKey)}`,
      );
    if (typeof window.requestIdleCallback === "function") {
      const handle = window.requestIdleCallback(loadZendesk, { timeout: 5000 });
      return () => window.cancelIdleCallback(handle);
    }
    const timer = window.setTimeout(loadZendesk, 3000);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
