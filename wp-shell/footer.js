/* Stadium WordPress shell: footer behaviour.
   Vanilla JS, no dependencies. Runs in an IIFE and only touches the shadow root of
   #sdm-footer-host. Mirrors the footer part of app/components/PageClose.tsx and the
   footer handlers in app/components/tracking/ConsentManager.tsx.
   Re-generate with `node scripts/build-wp-shell.mjs` (see wp-shell/README.md). */
(function () {
  'use strict';

  var CFG = __SDM_CONFIG__;
  var host = document.getElementById('sdm-footer-host');
  if (!host || host.getAttribute('data-sdm-ready')) return;
  host.setAttribute('data-sdm-ready', '1');

  /* Declarative shadow DOM polyfill (older browsers, or HTML re-inserted via innerHTML) */
  var root = host.shadowRoot;
  if (!root) {
    var tpl = host.querySelector('template[shadowrootmode]');
    if (!tpl || !host.attachShadow) return;
    root = host.attachShadow({ mode: 'open' });
    root.appendChild(tpl.content.cloneNode(true));
    tpl.parentNode.removeChild(tpl);
  }

  /* Fonts: registered once for the whole page under unique "SDM …" family names. */
  if (!window.__sdmFonts && window.FontFace && document.fonts) {
    window.__sdmFonts = 1;
    CFG.fonts.forEach(function (f) {
      try {
        var desc = { weight: f.weight, style: f.style, display: 'swap' };
        if (f.range) desc.unicodeRange = f.range;
        document.fonts.add(new FontFace(f.family, 'url(' + f.src + ') format("woff2")', desc));
      } catch (e) { /* font unavailable: fall back to system font */ }
    });
  }

  function track(name, params) {
    try {
      if (CFG.prodHosts.indexOf(location.hostname.toLowerCase()) < 0) return; // never on staging/local
      var e = { event: name };
      for (var k in params) e[k] = params[k];
      (window.dataLayer = window.dataLayer || []).push(e);
    } catch (err) { /* never break the page for analytics */ }
  }

  /* "Cookie Preferences" -> Osano drawer. "Need Help?" -> Zendesk messenger, else the help center. */
  function openCookiePreferences() {
    var cm = window.Osano && window.Osano.cm;
    if (cm && cm.showDrawer) cm.showDrawer('osano-cm-dom-info-dialog-open');
  }
  function openHelp() {
    var zE = window.zE;
    if (typeof zE === 'function') {
      try { zE('messenger', 'open'); } catch (e) { /* not a Messenger snippet */ }
      try { zE('webWidget', 'open'); } catch (e) { /* not a classic Web Widget snippet */ }
      return;
    }
    window.open(CFG.helpUrl, '_blank', 'noopener,noreferrer');
  }

  root.addEventListener('click', function (ev) {
    var a = ev.target && ev.target.closest && ev.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href === '#cookie-preferences') { ev.preventDefault(); openCookiePreferences(); return; }
    if (href === '#need-help') { ev.preventDefault(); openHelp(); return; }
    if (href.charAt(0) === '#') return;
    var u;
    try { u = new URL(a.href, location.href); } catch (err) { return; }
    var p = {
      link_url: a.href,
      link_text: (a.getAttribute('aria-label') || a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80),
      link_location: 'footer'
    };
    if (href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) track('contact_click', p);
    else if (u.host === CFG.appHost) { p.link_domain = u.host; track('app_click', p); }
    else if (u.host !== location.host) { p.link_domain = u.host; track('outbound_click', p); }
    else track('nav_click', p);
  });
})();
