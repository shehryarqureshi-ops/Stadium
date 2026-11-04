"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { TRACKING } from "../../lib/tracking/config";

/* Marker.io visual-feedback widget (QA / design review).
   Loads in development ONLY — it is off on staging and on the live site, so
   neither stakeholders testing staging nor customers see the feedback button.
   Set NEXT_PUBLIC_MARKER_ENABLED=true to force it on for a review build
   (see TRACKING.markerEnabled). Project ID is a public identifier; override
   with NEXT_PUBLIC_MARKER_PROJECT_ID if needed. */
const MARKER_PROJECT_ID =
  process.env.NEXT_PUBLIC_MARKER_PROJECT_ID ?? "6ad1a477d58ca9070ea3b560";

/* The widget's bundle is ~200 KB of script that costs ~0.6 s of main-thread time, so it only loads once
   the visitor does something (first pointer / key / touch / scroll), never during the initial load. */
const WAKE_EVENTS = ["pointerdown", "pointermove", "keydown", "touchstart", "scroll"] as const;

export default function MarkerFeedback() {
  const [awake, setAwake] = useState(false);

  useEffect(() => {
    const wake = () => {
      WAKE_EVENTS.forEach((e) => window.removeEventListener(e, wake));
      setAwake(true);
    };
    WAKE_EVENTS.forEach((e) => window.addEventListener(e, wake, { once: true, passive: true }));
    return () => WAKE_EVENTS.forEach((e) => window.removeEventListener(e, wake));
  }, []);

  if (!TRACKING.markerEnabled || !awake) return null;

  return (
    <>
      <Script id="marker-config" strategy="lazyOnload">
        {`window.markerConfig = { project: '${MARKER_PROJECT_ID}', source: 'snippet' };`}
      </Script>
      <Script id="marker-io" strategy="lazyOnload">
        {`!function(e,r,a){if(!e.__Marker){e.__Marker={};var t=[],n={__cs:t};["show","hide","isVisible","capture","cancelCapture","unload","reload","isExtensionInstalled","setReporter","clearReporter","setCustomData","on","off"].forEach(function(e){n[e]=function(){var r=Array.prototype.slice.call(arguments);r.unshift(e),t.push(r)}}),e.Marker=n;var s=r.createElement("script");s.async=1,s.src="https://edge.marker.io/latest/shim.js";var i=r.getElementsByTagName("script")[0];i.parentNode.insertBefore(s,i)}}(window,document);`}
      </Script>
    </>
  );
}
