"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { APP_URL } from "../../../hooks/useAuth";
import { TRACKING, isTrackingActive } from "../../lib/tracking/config";
import {
  pushToDataLayer,
  trackEvent,
  type TrackParams,
} from "../../lib/tracking/dataLayer";

/* Site-wide analytics events, pushed to the dataLayer (GTM decides what to do
   with them, after consent). Mounted once from the root layout. Renders nothing.

   Events:
     virtual_page_view  every client-side navigation (NOT the first load — GTM's
                        own page-view trigger covers that, so no double count)
     outbound_click     links to other domains
     app_click          links to the Stadium app (app.bystadium.com)
     contact_click      mailto: / tel: links
     nav_click          links inside the header, footer or menus
     cta_click          button-styled links in page content
     video_play         <video controls> or <video data-track-video>
     scroll_depth       25 / 50 / 75 / 90 % once per page view
   Plus anything marked up by hand:
     <a data-track-event="signup_click" data-track-plan="team">
       → { event: "signup_click", plan: "team", link_url, link_text }

   Page and form events with fixed names (book-a-call-form-submitted,
   call-booked) are fired from BookACallForm.tsx through trackEvent. */

const APP_HOST = (() => {
  try {
    return new URL(APP_URL).host;
  } catch {
    return "app.bystadium.com";
  }
})();

function snake(key: string) {
  return key.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
}

function textOf(el: Element) {
  return (el.getAttribute("aria-label") || el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 80);
}

function locationOf(el: Element) {
  if (el.closest("footer")) return "footer";
  if (el.closest("header, nav, [role='menu'], [role='dialog']")) return "header";
  return "main";
}

function explicitParams(el: Element): { event: string; params: TrackParams } | null {
  const host = el.closest<HTMLElement>("[data-track-event]");
  if (!host) return null;
  const params: TrackParams = {};
  for (const [key, value] of Object.entries(host.dataset)) {
    if (key === "trackEvent" || !key.startsWith("track")) continue;
    params[snake(key.slice(5).replace(/^[A-Z]/, (c) => c.toLowerCase()))] = value;
  }
  return { event: host.dataset.trackEvent as string, params };
}

function handleClick(event: MouseEvent) {
  const target = event.target as Element | null;
  if (!target?.closest) return;

  const explicit = explicitParams(target);
  const link = target.closest<HTMLAnchorElement>("a[href]");
  const base: TrackParams = {};
  if (link) {
    base.link_url = link.href;
    base.link_text = textOf(link);
  } else {
    const control = target.closest("button, [role='button']");
    if (control) base.link_text = textOf(control);
  }

  if (explicit) {
    trackEvent(explicit.event, { ...base, ...explicit.params });
    return;
  }
  if (!link) return;

  const href = link.getAttribute("href") ?? "";
  if (href === "#" || href.startsWith("#cookie-") || href === "#need-help") return;

  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    trackEvent("contact_click", { ...base, link_type: href.startsWith("tel:") ? "tel" : "mailto" });
    return;
  }

  let url: URL;
  try {
    url = new URL(link.href, window.location.href);
  } catch {
    return;
  }

  if (url.host === APP_HOST) {
    trackEvent("app_click", { ...base, link_domain: url.host, link_location: locationOf(link) });
  } else if (url.host !== window.location.host) {
    trackEvent("outbound_click", { ...base, link_domain: url.host, link_location: locationOf(link) });
  } else if (locationOf(link) !== "main") {
    trackEvent("nav_click", { ...base, link_location: locationOf(link) });
  } else if (/\b(rounded-button|text-button)/.test(link.className)) {
    trackEvent("cta_click", { ...base, link_location: "main" });
  }
}

function handlePlay(event: Event) {
  const video = event.target;
  if (!(video instanceof HTMLVideoElement)) return;
  if (!video.controls && video.dataset.trackVideo === undefined) return; // skip decorative loops
  const src = video.currentSrc || video.src || "";
  trackEvent("video_play", {
    video_title: video.getAttribute("aria-label") || video.title || src.split("/").pop(),
    video_url: src,
  });
}

export default function AnalyticsListeners() {
  const pathname = usePathname();
  const firstRender = useRef(true);
  const fired = useRef(new Set<number>());

  // Route changes → virtual page views (skip the initial load).
  useEffect(() => {
    fired.current = new Set();
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    pushToDataLayer({
      event: "virtual_page_view",
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  // Clicks and video plays (delegated: no per-component wiring needed).
  useEffect(() => {
    // Inactive (dev / staging): attach nothing, unless debugging dry runs.
    if (!isTrackingActive() && !TRACKING.debug) return;
    document.addEventListener("click", handleClick);
    document.addEventListener("play", handlePlay, true); // media events don't bubble
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("play", handlePlay, true);
    };
  }, []);

  // Scroll depth, once per threshold per page view.
  useEffect(() => {
    if (!isTrackingActive() && !TRACKING.debug) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const doc = document.documentElement;
        const scrollable = doc.scrollHeight - window.innerHeight;
        if (scrollable <= 0) return;
        const percent = (window.scrollY / scrollable) * 100;
        for (const threshold of [25, 50, 75, 90]) {
          if (percent >= threshold && !fired.current.has(threshold)) {
            fired.current.add(threshold);
            trackEvent("scroll_depth", { percent: threshold, page_path: window.location.pathname });
          }
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
