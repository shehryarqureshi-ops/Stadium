import Script from "next/script";
import { TRACKING } from "../../lib/tracking/config";

/* Marker.io visual-feedback widget (QA / design review).
   Loads in development and staging ONLY — never on the live production site,
   so customers don't see the feedback button. Project ID is a public
   identifier; override with NEXT_PUBLIC_MARKER_PROJECT_ID if needed. */
const MARKER_PROJECT_ID =
  process.env.NEXT_PUBLIC_MARKER_PROJECT_ID ?? "6ad1a477d58ca9070ea3b560";

export default function MarkerFeedback() {
  if (TRACKING.env === "production") return null;

  return (
    <>
      <Script id="marker-config" strategy="afterInteractive">
        {`window.markerConfig = { project: '${MARKER_PROJECT_ID}', source: 'snippet' };`}
      </Script>
      <Script id="marker-io" strategy="afterInteractive">
        {`!function(e,r,a){if(!e.__Marker){e.__Marker={};var t=[],n={__cs:t};["show","hide","isVisible","capture","cancelCapture","unload","reload","isExtensionInstalled","setReporter","clearReporter","setCustomData","on","off"].forEach(function(e){n[e]=function(){var r=Array.prototype.slice.call(arguments);r.unshift(e),t.push(r)}}),e.Marker=n;var s=r.createElement("script");s.async=1,s.src="https://edge.marker.io/latest/shim.js";var i=r.getElementsByTagName("script")[0];i.parentNode.insertBefore(s,i)}}(window,document);`}
      </Script>
    </>
  );
}
