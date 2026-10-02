/* Stadium WordPress shell: header behaviour.
   Vanilla JS, no dependencies, no globals except the guard flags below. Runs
   inside an IIFE and only touches the shadow root of #sdm-header-host, so it
   cannot clash with the WordPress theme, Elementor, jQuery or any plugin.

   Mirrors app/components/SiteHeader.tsx + AccountMenu.tsx + hooks/useAuth.ts
   (solid-bar state only: WordPress pages always get the white header).
   If you change the behaviour in those React files, change it here too and
   re-run `node scripts/build-wp-shell.mjs` (see wp-shell/README.md).

   @tw-classes (class names this script toggles at runtime; the generator keeps
   their CSS even though they are not in the server-rendered markup)
   rotate-180 opacity-100 opacity-0 pointer-events-none transition-colors
   duration-300 hidden block grid-rows-[1fr] grid-rows-[0fr]
   translate-y-[0.4375rem] rotate-45 -translate-y-[0.4375rem] -rotate-45
   @end */
(function () {
  'use strict';

  var CFG = __SDM_CONFIG__;
  var host = document.getElementById('sdm-header-host');
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

  var q = function (s, r) { return (r || root).querySelector(s); };
  var qa = function (s, r) { return Array.prototype.slice.call((r || root).querySelectorAll(s)); };

  /* Fonts: registered once for the whole page under unique family names ("SDM …"),
     so they can never override a font the WordPress theme loads. */
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
  /* rem builds only: the design expects a 16px root font size. */
  try {
    if (CFG.units !== 'rem') throw 0;
    var rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
    if (rootPx && Math.abs(rootPx - 16) > 0.5 && window.console) {
      console.warn('[stadium shell] root font-size is ' + rootPx + 'px, this rem build expects 16px; rebuild without --rem');
    }
  } catch (e) { /* ignore */ }

  /* ---------- analytics (production hosts only; nothing fires on staging/local) ---------- */
  function track(name, params) {
    try {
      if (CFG.prodHosts.indexOf(location.hostname.toLowerCase()) < 0) return;
      var e = { event: name };
      for (var k in params) e[k] = params[k];
      (window.dataLayer = window.dataLayer || []).push(e);
    } catch (err) { /* never break the page for analytics */ }
  }
  root.addEventListener('click', function (ev) {
    var a = ev.target && ev.target.closest && ev.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.charAt(0) === '#') return;
    var u;
    try { u = new URL(a.href, location.href); } catch (err) { return; }
    var p = {
      link_url: a.href,
      link_text: (a.getAttribute('aria-label') || a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80),
      link_location: 'header'
    };
    if (href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) track('contact_click', p);
    else if (u.host === CFG.appHost) { p.link_domain = u.host; track('app_click', p); }
    else if (u.host !== location.host) { p.link_domain = u.host; track('outbound_click', p); }
    else track('nav_click', p);
  });

  /* ---------- desktop mega-menu ---------- */
  var KEYS = ['engage', 'impact', 'proof', 'catalog'];
  var header = q('[data-sdm="header"]');
  var scrim = q('[data-sdm="scrim"]');
  var panel = q('#engage-menu');
  var panelWrap = panel && panel.querySelector(':scope > div'); // (first child is the inline <style>)
  var viewport = q('.engage-viewport');
  var panes = qa('.menu-pane');
  var triggers = qa('[data-sdm-trigger]');
  var active = null, last = 'engage', anim = false, animTimer = null, heights = [];

  function render() {
    var open = active !== null;
    var shown = active || last;
    if (panel) {
      panel.setAttribute('aria-hidden', String(!open));
      panel.classList.toggle('pointer-events-none', !open);
      if (panelWrap) panelWrap.classList.toggle('engage-open', open);
    }
    if (scrim) {
      scrim.classList.toggle('opacity-100', open);
      scrim.classList.toggle('opacity-0', !open);
      scrim.classList.toggle('pointer-events-none', !open);
    }
    if (header) {
      header.classList.toggle('transition-colors', !open);
      header.classList.toggle('duration-300', !open);
    }
    triggers.forEach(function (t) {
      var on = t.getAttribute('data-sdm-trigger') === active;
      t.setAttribute('aria-expanded', String(on));
      var svg = t.querySelector('svg');
      if (svg) svg.classList.toggle('rotate-180', on);
    });
    panes.forEach(function (p, i) {
      var on = KEYS[i] === shown;
      p.classList.toggle('menu-pane--on', on);
      p.setAttribute('aria-hidden', String(!on));
    });
    if (viewport) {
      viewport.classList.toggle('is-animating', anim);
      var h = heights[KEYS.indexOf(shown)];
      if (h) viewport.style.height = h + 'px';
    }
  }
  function openMenu(key) {
    var wasOpen = active !== null;
    active = key; last = key;
    if (wasOpen) { anim = true; }
    else {
      anim = false;
      clearTimeout(animTimer);
      animTimer = setTimeout(function () { anim = true; render(); }, 60);
    }
    render();
  }
  function closeMenu() { if (active === null) return; active = null; render(); }

  triggers.forEach(function (t) {
    var key = t.getAttribute('data-sdm-trigger');
    t.addEventListener('mouseenter', function () { openMenu(key); });
    if (t.tagName === 'BUTTON') {
      t.addEventListener('click', function () { if (active === key) closeMenu(); else openMenu(key); });
    }
  });
  qa('[data-sdm-plain]').forEach(function (a) { a.addEventListener('mouseenter', closeMenu); });
  if (header) header.addEventListener('mouseleave', closeMenu);
  if (scrim) scrim.addEventListener('click', closeMenu);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* Impact and Catalog swap their content when you hover/focus a rail item; every state is in the markup */
  function showVariant(group, i) {
    qa(':scope > [data-sdm-variant]', group).forEach(function (v) {
      v.hidden = v.getAttribute('data-sdm-variant') !== String(i);
    });
    measure();
  }
  qa('[data-sdm-tab]').forEach(function (item) {
    var group = item.closest('[data-sdm-variants]');
    var i = item.getAttribute('data-sdm-tab');
    ['mouseenter', 'focus', 'click'].forEach(function (ev) {
      item.addEventListener(ev, function () { showVariant(group, i); });
    });
  });

  function measure() {
    var hs = panes.map(function (p) { return p.offsetHeight; });
    if (hs.some(function (h) { return h > 0; })) { heights = hs; render(); }
  }
  measure();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  window.addEventListener('resize', measure);

  /* ---------- mobile menu ---------- */
  var burger = q('button[aria-controls="site-menu"]');
  var mobile = q('#site-menu');
  var sectionBtns = qa('button[aria-controls^="site-menu-"]');
  function setSection(id) {
    sectionBtns.forEach(function (b) {
      var on = b.getAttribute('aria-controls') === id;
      b.setAttribute('aria-expanded', String(on));
      var svg = b.querySelector('svg');
      if (svg) svg.classList.toggle('rotate-180', on);
      var body = q('#' + b.getAttribute('aria-controls'));
      if (body) {
        body.classList.toggle('grid-rows-[1fr]', on);
        body.classList.toggle('grid-rows-[0fr]', !on);
      }
    });
  }
  function setMobile(open) {
    if (!burger || !mobile) return;
    mobile.classList.toggle('hidden', !open);
    mobile.classList.toggle('block', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    var bars = burger.children;
    if (bars.length === 3) {
      bars[0].classList.toggle('translate-y-[0.4375rem]', open);
      bars[0].classList.toggle('rotate-45', open);
      bars[1].classList.toggle('opacity-0', open);
      bars[2].classList.toggle('-translate-y-[0.4375rem]', open);
      bars[2].classList.toggle('-rotate-45', open);
    }
    setSection(null); // fresh panel on every open/close, like the Next site
  }
  if (burger && mobile) {
    burger.addEventListener('click', function () { setMobile(mobile.classList.contains('hidden')); });
    sectionBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        var id = b.getAttribute('aria-controls');
        setSection(b.getAttribute('aria-expanded') === 'true' ? null : id);
      });
    });
    mobile.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('a[href]')) setMobile(false);
    });
  }

  /* ---------- WordPress admin bar offset (logged-in editors only) ---------- */
  var bar = document.getElementById('wpadminbar');
  if (bar) {
    var offset = function () {
      var b = bar.getBoundingClientRect();
      host.style.setProperty('--sdm-offset', Math.max(0, b.bottom) + 'px');
      if (header) header.style.setProperty('--sdm-offset', Math.max(0, b.bottom) + 'px');
    };
    offset();
    window.addEventListener('scroll', offset, { passive: true });
    window.addEventListener('resize', offset);
  }

  /* ---------- auth: Login/sign up <-> account menu (mirrors hooks/useAuth.ts) ---------- */
  var CACHE_KEY = 'auth', CACHE_TTL = 5 * 60 * 1000;
  var logins = qa('[data-sdm-login]');
  var accounts = []; // { login, menu }

  function readCache() {
    try {
      var raw = sessionStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      var o = JSON.parse(raw);
      var user = o.user || (o.email ? { email: o.email } : null); // Next shape or the old WordPress shape
      if (!user || !user.email || typeof o.expires_at !== 'number') return null;
      return Date.now() < o.expires_at ? user : null;
    } catch (e) { return null; }
  }
  function writeCache(user) {
    try {
      if (user) sessionStorage.setItem(CACHE_KEY, JSON.stringify({ user: user, email: user.email, expires_at: Date.now() + CACHE_TTL }));
      else sessionStorage.removeItem(CACHE_KEY);
    } catch (e) { /* storage unavailable */ }
  }
  function logout() {
    var uid = authUser && authUser.uid;
    writeCache(null);
    var p = new URLSearchParams({ returnTo: location.href });
    if (uid) p.set('uid', uid);
    location.href = CFG.appUrl + '/auth/logout?' + p.toString();
  }
  function initials(u) {
    if (u.firstName && u.lastName) return (u.firstName[0] + u.lastName[0]).toUpperCase();
    return (u.firstName || u.email).slice(0, 2).toUpperCase();
  }
  function fill(menu, u) {
    var full = [u.firstName, u.lastName].filter(Boolean).join(' ');
    var short = u.firstName || u.email.split('@')[0];
    var walker = document.createTreeWalker(menu, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = walker.nextNode())) {
      var t = n.nodeValue;
      if (t.indexOf('Zzfirst Zzlast') > -1) n.nodeValue = full || short;
      else if (t.indexOf('zzemail@example.invalid') > -1) n.nodeValue = u.email;
      else if (t.trim() === 'Zzfirst') n.nodeValue = short;
      else if (t.trim() === 'ZZ') n.nodeValue = initials(u);
    }
    if (!full) { // no full name: drop the (empty) name line, as the React component does
      qa('p', menu).forEach(function (p) { if (/Zzfirst|^\s*$/.test(p.textContent)) p.parentNode.removeChild(p); });
    }
    if (u.avatarUrl) {
      var badge = menu.querySelector('span.rounded-full');
      if (badge) {
        var img = document.createElement('img');
        img.src = u.avatarUrl; img.alt = '';
        img.className = 'size-10 shrink-0 rounded-full object-cover';
        badge.parentNode.replaceChild(img, badge);
      }
    }
  }
  function wireMenu(menu, desktop) {
    var btn = menu.querySelector('button[aria-expanded][aria-controls]');
    var panelEl = btn && q('#' + btn.getAttribute('aria-controls'), menu);
    if (!btn || !panelEl) return;
    var chevron = btn.querySelector(':scope > svg');
    function set(open) {
      btn.setAttribute('aria-expanded', String(open));
      panelEl.hidden = !open;
      if (chevron) chevron.classList.toggle('rotate-180', !open); // account chevron points the other way
    }
    set(false);
    btn.addEventListener('click', function () { set(panelEl.hidden); });
    if (desktop) {
      document.addEventListener('mousedown', function (e) {
        if (!panelEl.hidden && e.composedPath().indexOf(menu) < 0) set(false);
      });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
    }
    var out = menu.querySelector('button:not([aria-expanded])');
    if (out && /logout/i.test(out.textContent)) out.addEventListener('click', logout);
  }
  var authUser = null;
  function applyAuth(user) {
    authUser = user;
    if (user) {
      if (accounts.length) return;
      logins.forEach(function (el) {
        var desktop = el.getAttribute('data-sdm-login') === 'desktop';
        var t = q('template[data-sdm-tpl="account-' + (desktop ? 'desktop' : 'mobile') + '"]');
        if (!t) return;
        var menu = t.content.firstElementChild.cloneNode(true);
        fill(menu, user);
        el.parentNode.replaceChild(menu, el);
        wireMenu(menu, desktop);
        accounts.push({ login: el, menu: menu });
      });
    } else {
      accounts.forEach(function (a) { a.menu.parentNode.replaceChild(a.login, a.menu); });
      accounts = [];
      logins.forEach(function (el) {
        el.classList.remove('invisible');
        el.removeAttribute('aria-hidden');
        el.removeAttribute('tabindex');
      });
    }
  }
  function fetchSessionUser() {
    return fetch(CFG.sessionUrl, { credentials: 'include', mode: 'cors', cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { return (d && d.user) || null; })
      .catch(function () { return null; });
  }
  function profileFromSession(u) {
    var parts = (u.name || '').split(' ');
    return {
      email: u.email || '',
      firstName: u.firstName || u.given_name || parts[0] || undefined,
      lastName: u.lastName || u.family_name || parts.slice(1).join(' ') || undefined,
      avatarUrl: u.avatarUrl || u.picture
    };
  }
  function fetchProfile(u) {
    var fallback = profileFromSession(u);
    if (!u.access_token) return Promise.resolve(fallback);
    return fetch(CFG.graphqlUrl, {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + u.access_token, 'Content-Type': 'application/json', 'x-workspace': 'my-space' },
      body: JSON.stringify({
        query: 'mutation CreateSession($input: SessionCreateInput!) { createSession(input: $input) { uid user { avatarUrl firstName lastName email } } }',
        variables: { input: { userAgent: navigator.userAgent } }
      })
    }).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) {
      var s = j && j.data && j.data.createSession;
      if (!s || !s.user) return fallback;
      return {
        email: s.user.email || fallback.email, firstName: s.user.firstName || fallback.firstName,
        lastName: s.user.lastName || fallback.lastName, avatarUrl: s.user.avatarUrl || fallback.avatarUrl, uid: s.uid
      };
    }).catch(function () { return fallback; });
  }
  if (logins.length) {
    var cached = readCache();
    if (cached) applyAuth(cached); // optimistic, corrected below
    fetchSessionUser().then(function (su) {
      if (!su) { writeCache(null); applyAuth(null); return; }
      var cachedNow = readCache();
      var p = cachedNow && cachedNow.email === su.email ? Promise.resolve(cachedNow) : fetchProfile(su);
      p.then(function (u) { writeCache(u); if (!accounts.length) applyAuth(u); });
    });
  }
})();
