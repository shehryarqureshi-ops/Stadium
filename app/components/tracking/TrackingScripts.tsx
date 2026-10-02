import Script from "next/script";

import { TRACKING } from "../../lib/tracking/config";

/* Server component rendered once from the root layout (app/layout.tsx).

   Only the pieces that must exist before hydration live here:
     1. consent-defaults — dataLayer + gtag stub with Google Consent Mode v2 set
                           to DENIED, before anything can read cookies.
                           Production builds only.
     2. osano            — the CMP. Loads in staging and production so the
                           consent flow can be tested; in development only
                           with NEXT_PUBLIC_WIDGETS_PREVIEW=true.

   GTM and Zendesk are injected on the client by TrackingLoader, and Clarity /
   HubSpot by ConsentManager, because those also check the runtime hostname.
   In development and staging NO analytics tag loads and NO event is sent
   (see app/lib/tracking/config.ts). */

const CONSENT_DEFAULTS = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  personalization_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
gtag('set', 'url_passthrough', true);
gtag('set', 'ads_data_redaction', true);
`;

export default function TrackingScripts() {
  return (
    <>
      {TRACKING.enabled && (
        <Script id="consent-defaults" strategy="beforeInteractive">
          {CONSENT_DEFAULTS}
        </Script>
      )}
      {(TRACKING.env !== "development" || TRACKING.widgetsPreview) && (
        <Script id="osano" src={TRACKING.osanoSrc} strategy="beforeInteractive" />
      )}
    </>
  );
}
