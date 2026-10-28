/* ============================================================
   BB10 Itinerary · Punta Cana 2026 · itinerary.js
   © 2026 Saaima Saleh. Licensed to Husna Vacations for use on husna.com only. All other rights reserved.
   Author: Saaima Saleh · Do not copy, redistribute or reuse without written permission.

   Content lives in data/*.json. This file only renders it.
   ============================================================ */
(function () {
  'use strict';

  const root = document.getElementById('husna-itin');
  if (!root || root.dataset.ready) return;
  root.dataset.ready = '1';

  const SCRIPT = document.currentScript && document.currentScript.src;
  const BASE = root.dataset.base || (SCRIPT ? SCRIPT.replace(/[^/]*$/, '') : '');
  const STAMP = Math.floor(Date.now() / 60000);          // fresh data every minute

  /* ---------- tiny helpers · © 2026 Saaima Saleh ---------- */
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = (s, c = root) => c.querySelector(s);
  const $$ = (s, c = root) => Array.from(c.querySelectorAll(s));
  const store = {
    get(k, d) { try { const v = localStorage.getItem('bb10-itin-' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('bb10-itin-' + k, JSON.stringify(v)); } catch (e) { } }
  };
  const slug = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const mins = t => {
    const m = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(t || ''); if (!m) return null;
    return (+m[1] % 12 + (/pm/i.test(m[3]) ? 12 : 0)) * 60 + +m[2];
  };
  const timeText = it => it.start ? (it.end ? `${it.start} – ${it.end}` : it.start) : '';
  const linkify = s => esc(s)
    .replace(/(https?:\/\/[^\s<]+[^\s<.,;:!?)])/g, '<a href="$1" target="_blank" rel="noopener">$1</a>')
    .replace(/([\w.+-]+@[\w-]+\.[\w.-]+\w)/g, '<a href="mailto:$1">$1</a>');

  const I = {
    back: '<path d="M15 6l-6 6 6 6"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    chev: '<path d="M6 9l6 6 6-6"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    arrow: '<path d="M7 17L17 7M9 7h8v8"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    pin: '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    people: '<circle cx="9" cy="8" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0M16 4.5a3.5 3.5 0 0 1 0 7M21 20a6 6 0 0 0-4.5-5.8"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    calAdd: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M12 13v5M9.5 15.5h5"/>',
    share: '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.6M8.2 13.2l7.6 4.6"/>',
    list: '<path d="M8 7h8M8 11h8M8 15h5"/><rect x="4" y="3" width="16" height="18" rx="3"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 1-1 1.7M12 17h.01"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    chat: '<path d="M4 20l1.4-4.2A8 8 0 1 1 8.6 19L4 20z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    girl: '<circle cx="12" cy="9" r="5"/><path d="M12 14v8M9 19h6"/>',
    boy: '<circle cx="10" cy="14" r="5"/><path d="M14 10l6-6M15 4h5v5"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>'
  };
  const svg = (n, sw = 2) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
  const STAR = '<span class="bi-star" aria-label="to be confirmed" title="To be confirmed">*</span>';
  const ICONS = {
    'flag-ps': '<svg class="bi-flag" viewBox="0 0 24 16" role="img" aria-label="Palestinian flag"><rect width="24" height="16" fill="#fff"/><rect width="24" height="5.33" fill="#000"/><rect y="10.67" width="24" height="5.33" fill="#007A3D"/><path d="M0 0l10 8-10 8z" fill="#CE1126"/></svg>',
    trophy: '<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 14v3M9 20h6M9 17h6"/>',
    palm:   '<path d="M12 21V9M12 9c-3-1-5-4-5-7 3 0 5 2 5 7zM12 9c3-1 5-4 5-7-3 0-5 2-5 7zM12 10c-4 0-7 1-9 3 3 0 6 1 9 4M12 10c4 0 7 1 9 3-3 0-6 1-9 4"/>',
    masks:  '<path d="M4 5c3 2 5 2 8 0 3 2 5 2 8 0v7a8 8 0 0 1-16 0z"/><path d="M8 11c.5-1 1.5-1 2 0M14 11c.5-1 1.5-1 2 0M9 15c1.5 1.5 4.5 1.5 6 0"/>',
    heart:  '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    star:   '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>'
  };
  const icon = it => {
    const k = it.icon || (it.flag ? 'flag-' + it.flag : ''); const v = ICONS[k];
    if (!v) return '';
    return v.startsWith('<svg') ? v : `<svg class="bi-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${v}</svg>`;
  };
  const flag = icon;
  const SHOW = /^The Husna Night Show:\s*/i;
  // title split for night shows: small label + the show name on its own line
  const titleHtml = it => SHOW.test(it.title)
    ? `<span class="bi-show__lbl">The Husna Night Show</span><span class="bi-show__name">${icon(it)}${esc(it.title.replace(SHOW, ''))}${it.tbc ? STAR : ''}</span>`
    : `${icon(it)}${esc(it.title)}${it.tbc ? STAR : ''}`;
  // themed ornaments for the night show cards (bottom-right, light brand blue).
  // Motion is driven by JavaScript (requestAnimationFrame) on data-a nodes: iPhones in Low Power Mode and
  // some Safari versions stop CSS/SVG-native animation, but a frame loop keeps running.
  //   data-a: tx | ty | rot | skew | beam   data-amp: amplitude   data-dur: ms   data-ph: phase 0-1   data-cx/cy: pivot
  const SVG = (cls, inner) => `<svg class="bi-orn bi-orn--${cls}" viewBox="0 0 120 60" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
  const STAR_P = (x, y, r) => `M${x} ${y - r}l${r * .33} ${r * .67}L${x + r} ${y}l-${r * .67} ${r * .33}L${x} ${y + r}l-${r * .33}-${r * .67}L${x - r} ${y}l${r * .67}-${r * .33}z`;
  const A = (a, amp, dur, ph = 0, extra = '') => `data-a="${a}" data-amp="${amp}" data-dur="${dur}" data-ph="${ph}" ${extra}`;
  const star = (x, y, r, dur, ph) => `<path d="${STAR_P(x, y, r)}" fill="currentColor" stroke="none" ${A('rot', 14, dur, ph, `data-cx="${x}" data-cy="${y}"`)}/>`;
  const ORNS = {
    waves: SVG('waves',
      `<path d="M-10 30c14-10 22-10 34-2s22 8 36-2 24-10 42-2 22 8 36-2" ${A('tx', 6, 5000, 0)}/>`
      + `<path d="M-10 42c12-8 20-8 30-1s20 7 32-1 22-9 40-1 20 7 32-1" opacity=".6" ${A('tx', 6, 6500, .5)}/>`
      + `<path d="M-10 54c14-10 22-10 34-2s22 8 36-2 24-10 42-2 22 8 36-2" opacity=".35" ${A('tx', 6, 8000, .25)}/>`),
    stars: SVG('stars', star(96, 16, 7, 3200, 0) + star(74, 30, 4, 4100, .3) + star(110, 36, 3, 3600, .6) + star(56, 14, 2.5, 4600, .2) + star(92, 48, 2.2, 3900, .75)),
    spotlight: SVG('spotlight',
      `<path d="M70 0L52 58h34z" fill="currentColor" stroke="none" ${A('beam', 10, 5000, 0, 'data-cx="70" data-cy="0"')}/>`
      + `<path d="M112 0L80 58h36z" fill="currentColor" stroke="none" ${A('beam', -10, 6000, .5, 'data-cx="112" data-cy="0"')}/>`
      + '<path d="M40 58h78" opacity=".5"/><circle cx="70" cy="2" r="2.2" fill="currentColor" stroke="none"/><circle cx="112" cy="2" r="2.2" fill="currentColor" stroke="none"/>'),
    hearts: SVG('hearts',
      `<path d="M96 44s-9-5.6-9-12.4a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.8-9 12.4-9 12.4z" ${A('ty', 2.5, 4200, 0)}/>`
      + `<path d="M72 36s-6-3.8-6-8.4a3.4 3.4 0 0 1 6-2 3.4 3.4 0 0 1 6 2c0 4.6-6 8.4-6 8.4z" opacity=".7" ${A('ty', 2.5, 5000, .4)}/>`
      + `<path d="M112 24s-4.4-2.8-4.4-6.2a2.5 2.5 0 0 1 4.4-1.5 2.5 2.5 0 0 1 4.4 1.5c0 3.4-4.4 6.2-4.4 6.2z" opacity=".55" ${A('ty', 2.5, 4600, .7)}/>`),
    flag: SVG('flag',
      '<path d="M70 58V6" opacity=".7"/><circle cx="70" cy="4" r="2" fill="currentColor" stroke="none"/>'
      + `<g ${A('skew', 1.5, 3400, 0)}>`
      + '<path d="M70 8c10-5 18 4 28 0s16-4 20 0v22c-4-4-12 0-20 4s-18-5-28 0z" fill="#fff" stroke="none"/>'
      + '<path d="M70 8c10-5 18 4 28 0s16-4 20 0v7.3c-4-4-12 0-20 4s-18-5-28 0z" fill="#231F20" stroke="none" opacity=".75"/>'
      + '<path d="M70 22.7c10-5 18 4 28 0s16-4 20 0V30c-4-4-12 0-20 4s-18-5-28 0z" fill="#007A3D" stroke="none" opacity=".8"/>'
      + '<path d="M70 8c10-5 18 4 28 0s16-4 20 0v22c-4-4-12 0-20 4s-18-5-28 0z"/>'
      + '<path d="M70 8l20 11-20 11z" fill="#CE1126" stroke="none"/>'
      + '</g>')
  };
  // the frame loop: only ornaments currently on screen are in `live`
  const live = new Set(); let raf = 0;
  const STILL = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function tick(now) {
    live.forEach(svg => svg.querySelectorAll('[data-a]').forEach(n => {
      const amp = +n.dataset.amp, dur = +n.dataset.dur, ph = +n.dataset.ph;
      const w = Math.sin((now / dur + ph) * Math.PI * 2);           // -1 … 1, eased by nature
      const v = amp * w, cx = n.dataset.cx || 0, cy = n.dataset.cy || 0;
      switch (n.dataset.a) {
        case 'tx':   n.setAttribute('transform', `translate(${v.toFixed(2)} 0)`); break;
        case 'ty':   n.setAttribute('transform', `translate(0 ${v.toFixed(2)})`); break;
        case 'skew': n.setAttribute('transform', `skewY(${v.toFixed(2)})`); break;
        case 'rot':  n.setAttribute('transform', `rotate(${v.toFixed(2)} ${cx} ${cy})`); n.setAttribute('opacity', (0.65 + 0.35 * w).toFixed(2)); break;
        case 'beam': n.setAttribute('transform', `rotate(${v.toFixed(2)} ${cx} ${cy})`); n.setAttribute('opacity', (0.16 + 0.06 * w).toFixed(3)); break;
      }
    }));
    raf = live.size ? requestAnimationFrame(tick) : 0;
  }
  const run = (el, on) => {
    const svg = el.querySelector('.bi-orn'); if (!svg || STILL) return;
    if (on) { live.add(svg); if (!raf) raf = requestAnimationFrame(tick); } else live.delete(svg);
  };
  const ornament = it => ORNS[{ palm: 'waves', trophy: 'stars', masks: 'spotlight', heart: 'hearts', 'flag-ps': 'flag' }[it.icon] || (it.ornament) || 'stars'] || ORNS.stars;

  /* ---------- state · © 2026 Saaima Saleh ---------- */
  let D = {};                 // loaded data
  let CAT = {};               // category id -> def
  const S = { view: 'itinerary', day: null, filters: store.get('filters', []), seg: 'men', topic: 'All', q: '' };

  /* ---------- load data · © 2026 Saaima Saleh ---------- */
  // styled inline so it looks right even before the stylesheet arrives
  const SMILEY = 'https://husna.com/wp-content/uploads/2026/09/smiley.png';
  root.innerHTML = '<style>@keyframes bi-spin{to{transform:rotate(360deg)}}</style>'
    + '<div class="bi-loading" aria-label="Loading" style="position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:#29A9DF">'
    + '<img src="' + SMILEY + '" alt="" style="width:76px;height:auto;animation:bi-spin 1.6s linear infinite"></div>';
  const files = ['settings', 'itinerary', 'signups', 'faq', 'contacts'];
  // the stylesheet is loaded separately; don't paint the page until it has applied (max 4s)
  const cssReady = new Promise(res => {
    const t0 = Date.now();
    (function poll(){ if (getComputedStyle(root).getPropertyValue('--bi-css').trim() === '1' || Date.now() - t0 > 4000) res(); else setTimeout(poll, 40); })();
  });
  Promise.all(files.map(f => fetch(`${BASE}data/${f}.json?v=${STAMP}`).then(r => { if (!r.ok) throw new Error(f); return r.json(); })).concat(cssReady))
    .then(res => { files.forEach((f, i) => D[f] = res[i]); init(); })
    .catch(() => { root.innerHTML = '<div class="bi-loading" style="min-height:100vh;display:flex;align-items:center;justify-content:center;color:#5B6770;font:14px system-ui,sans-serif">The itinerary couldn’t load. Please refresh the page.</div>'; });

  function init() {
    D.settings.categories.forEach(c => CAT[c.id] = c);
    S.filters = S.filters.filter(f => CAT[f]);
    D.days = D.itinerary.days;
    D.days.forEach((d, n) => {
      d.n = n + 1;
      const seen = {};
      d.items.forEach(it => {
        if (it.heading) return;
        let id = `${d.id}-${slug(it.start || '')}-${slug(it.title)}`;
        while (seen[id]) id += '-2';
        seen[id] = 1; it.id = id; it.day = d;
      });
    });
    const today = new Date(); const iso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    S.day = (D.days.find(d => d.date === iso) || D.days[0]).id;

    root.innerHTML = `
      <div class="bi-top" id="bi-top"></div>
      <main class="bi-main"><div class="bi-col" id="bi-main"></div></main>
      <nav class="bi-tabs" aria-label="Sections"><div class="bi-col">
        ${tab('itinerary', 'Itinerary', 'cal')}${tab('signups', 'Sign-ups', 'list')}${tab('faq', 'FAQ', 'help')}${tab('contact', 'Contact', 'phone')}
      </div></nav>
      <dialog class="bi-sheet" id="bi-sheet" aria-labelledby="bi-sheet-title"></dialog>
      <div class="bi-scrim" id="bi-scrim" hidden></div>
      <div class="bi-toast" id="bi-toast" role="status"></div>`;
    bind();
    route(false);
    window.addEventListener('popstate', () => route(true));
  }
  const tab = (v, label, ico) => `<button class="bi-tab" type="button" data-view="${v}">${svg(ico)}${label}</button>`;

  /* ---------- routing: #itinerary/sun, #itinerary/sun/<item>, #signups, #faq, #contact · © 2026 Saaima Saleh ---------- */
  function parseHash() {
    const h = decodeURIComponent(location.hash.replace(/^#/, '')).split('/');
    const view = ['signups', 'faq', 'contact'].includes(h[0]) ? h[0] : 'itinerary';
    return { view, day: view === 'itinerary' && D.days.some(d => d.id === h[1]) ? h[1] : null, item: view === 'itinerary' ? h[2] : null };
  }
  function route(fromPop) {
    const r = parseHash();
    const changed = r.view !== S.view || (r.day && r.day !== S.day);
    S.view = r.view; if (r.day) S.day = r.day;
    if (changed || !fromPop || !$('#bi-main').children.length) render();
    const sheet = $('#bi-sheet');
    if (r.item) { const it = findItem(r.item); if (it) openSheet(it, false); }
    else { pushedSheet = false; if (sheet.open) sheet.close(); }
  }
  function go(hash, push = true) {
    if (('#' + hash) === location.hash) return;
    history[push ? 'pushState' : 'replaceState'](null, '', '#' + hash);
  }
  const findItem = id => { for (const d of D.days) for (const it of d.items) if (it.id === id) return it; return null; };

  /* ---------- render · © 2026 Saaima Saleh ---------- */
  function render() {
    $$('.bi-tab').forEach(b => b.dataset.view === S.view ? b.setAttribute('aria-current', 'page') : b.removeAttribute('aria-current'));
    const titles = { itinerary: 'Itinerary', signups: 'Sign-ups', faq: 'FAQ', contact: 'Contact' };
    const head = `
      <header class="bi-head"><div class="bi-col">
        ${D.settings.hubUrl
          ? `<a class="bi-hub" href="${esc(D.settings.hubUrl)}" data-elementor-open-lightbox="no">${svg('back', 2.4)}Guest hub</a>`
          : `<button class="bi-hub" type="button" data-act="back">${svg('back', 2.4)}Back</button>`}
        <span class="bi-head__title">${titles[S.view]}</span>
        ${D.settings.wordmark ? `<img class="bi-head__logo" src="${esc(D.settings.wordmark)}" alt="Husna Vacations">` : '<span></span>'}
      </div></header>`;
    let top = head, main = '';
    if (S.view === 'itinerary') { top += topItinerary(); main = mainItinerary(); }
    if (S.view === 'signups') main = mainSignups();
    if (S.view === 'faq') { top += topFaq(); main = mainFaq(); }
    if (S.view === 'contact') main = mainContact();
    $('#bi-top').innerHTML = top;
    $('#bi-main').innerHTML = main;
    watchShows();
    window.scrollTo(0, Math.min(window.scrollY, root.offsetTop));
  }

  /* itinerary: toolbar · © 2026 Saaima Saleh */
  function topItinerary() {
    const day = D.days.find(d => d.id === S.day);
    const items = day.items.filter(i => !i.heading);
    const counts = {}; items.forEach(i => counts[i.cat] = (counts[i.cat] || 0) + 1);
    const on = S.filters.length > 0;
    const shown = on ? items.filter(i => S.filters.includes(i.cat)).length : items.length;
    const anyTbc = items.some(i => i.tbc);
    const cats = D.settings.categories;
    const pills = on
      ? cats.filter(c => S.filters.includes(c.id)).map(c => `<button class="bi-pill" type="button" data-act="unfilter" data-cat="${c.id}" style="--c:${c.color}" aria-label="Remove ${esc(c.label)} filter"><i class="bi-pill__dot"></i>${esc(c.label)}<span class="bi-pill__x">${svg('x', 4)}</span></button>`).join('') +
        `<button class="bi-pills__clear" type="button" data-act="clear">Clear</button>`
      : cats.map(c => `<button class="bi-pill" type="button" data-act="only" data-cat="${c.id}" style="--c:${c.color}" aria-label="Show only ${esc(c.label)}"><i class="bi-pill__dot"></i><span style="overflow:hidden;text-overflow:ellipsis">${esc(c.label)}</span></button>`).join('');
    return `
      <div class="bi-bar"><div class="bi-col">
        <div class="bi-controls">
          <label class="bi-ctl bi-ctl--day">${svg('cal')}<span class="bi-ctl__txt">${esc(day.short)}</span>${svg('chev', 2.4).replace('<svg', '<svg class="bi-chev"')}
            <select id="bi-day" aria-label="Choose a day">${D.days.map(d => `<option value="${d.id}"${d.id === S.day ? ' selected' : ''}>Day ${d.n} · ${esc(d.label)}</option>`).join('')}</select>
          </label>
          <button class="bi-ctl bi-ctl--filter${on ? ' is-on' : ''}" type="button" data-act="pop" aria-haspopup="true" aria-expanded="false" aria-controls="bi-pop">${svg('filter')}<span class="bi-ctl__txt">Filter</span>${on ? `<span class="bi-count">${S.filters.length}</span>` : ''}${svg('chev', 2.4).replace('<svg', '<svg class="bi-chev"')}</button>
          <div class="bi-pop" id="bi-pop" hidden role="group" aria-label="Filter by category">
            <div class="bi-pop__head"><span>Show</span><button class="bi-pop__clear" type="button" data-act="clear">Clear all</button></div>
            ${cats.map(c => `<button class="bi-check${S.filters.includes(c.id) ? ' is-on' : ''}" type="button" role="checkbox" aria-checked="${S.filters.includes(c.id)}" data-act="toggle" data-cat="${c.id}" style="--c:${c.color};--tint:${c.tint}"><span class="bi-check__box">${svg('check', 3.2)}</span><span class="bi-check__lbl">${esc(c.label)}</span><span class="bi-check__n">${counts[c.id] || 0}</span></button>`).join('')}
          </div>
        </div>
        <div class="bi-pills${on ? ' is-filtered' : ''}">${pills}</div>
      </div></div>
      <div class="bi-dayhead"><div class="bi-col">
        <h1>Day ${day.n} · ${esc(day.label)}</h1>
        <span class="bi-dayhead__meta">${on ? `${shown} of ${items.length}` : (anyTbc ? `${STAR} ${esc(D.settings.tbcLabel.toLowerCase())}` : `${items.length} items`)}</span>
      </div></div>`;
  }

  /* itinerary: list · © 2026 Saaima Saleh */
  // night show cards glow once as they scroll into view; their ornaments move only while on screen
  const glow = ('IntersectionObserver' in window) ? new IntersectionObserver(es => es.forEach(e => {
    e.target.classList.toggle('is-view', e.isIntersecting);
    if (e.isIntersecting) e.target.classList.add('is-lit');
    run(e.target, e.isIntersecting);
  }), { threshold: 0.5 }) : null;
  function watchShows(){ live.clear(); $$('.bi-item--show').forEach(el => { if (glow) glow.observe(el); else { el.classList.add('is-lit', 'is-view'); run(el, true); } }); }

  function mainItinerary() {
    const day = D.days.find(d => d.id === S.day);
    const on = S.filters.length > 0;
    const vis = it => !on || S.filters.includes(it.cat);
    let html = '';
    if (day.note && !on) html += `<div class="bi-daynote">${day.title ? `<b>${esc(day.title)}</b>` : ''}${esc(day.note)}</div>`;
    html += '<div class="bi-list">';
    let meal = null, count = 0;
    const close = () => { if (meal !== null) { html += meal.body ? `<section class="bi-meal" aria-label="${esc(meal.name)}"><div class="bi-meal__head"><span>${esc(meal.name)}</span><i></i></div>${meal.body}</section>` : ''; meal = null; } };
    day.items.forEach((it, i) => {
      if (it.heading) { close(); meal = { name: it.heading, body: '' }; return; }
      const inMeal = meal && it.cat === 'food';
      if (meal && !inMeal) close();
      if (!vis(it)) return;
      count++;
      const card = itemCard(it);
      if (meal) meal.body += card; else html += card;
    });
    close();
    html += '</div>';
    if (!count) html += `<div class="bi-empty">Nothing in these categories on this day.<br><button type="button" data-act="clear">Show everything</button></div>`;
    html += `<p class="bi-disclaimer">${esc(D.settings.disclaimer)}</p>`;
    return html;
  }

  function itemCard(it) {
    const c = CAT[it.cat] || CAT.husna;
    const meta = [it.location, it.ages].filter(Boolean).join(' · ');
    const L = itemLink(it);
    const show = it.highlight || /^The Husna Night Show/i.test(it.title);
    return `<article class="bi-item${show ? ' bi-item--show' : ''}" tabindex="0" data-item="${it.id}" style="--c:${c.color};--t:${c.text};--tint:${c.tint}" aria-label="${esc(timeText(it) + ', ' + it.title)}">
      ${show ? ornament(it) : ''}
      ${it.start ? `<span class="bi-chip">${esc(timeText(it))}</span>` : ''}
      <span class="bi-item__title">${titleHtml(it)}</span>
      ${meta ? `<span class="bi-item__meta">${esc(meta)}</span>` : ''}
      ${it.note ? `<span class="bi-item__note">${esc(it.note)}</span>` : ''}
      ${L ? linkTag(L, 'bi-linkrow', `<span>${esc(L.text)}</span>${svg(L.icon, 2.2)}`) : ''}
    </article>`;
  }

  /* resolve an item's link: settings.links[key], or a sign-up from signups.json · © 2026 Saaima Saleh */
  function itemLink(it) {
    if (it.signup) {
      const s = D.signups.competitions.find(x => x.id === it.signup);
      const l = (s && s.link) || {};
      return { text: l.text === 'Sign up' ? 'Sign-up form' : (l.text || 'Sign-up form'), url: l.url || '', icon: 'arrow' };
    }
    if (!it.link) return null;
    const l = D.settings.links[it.link]; if (!l) return null;
    if (l.email) {
      const day = it.day ? `${it.day.label}` : '';
      const body = (l.body || '').replace('{title}', it.title).replace('{day}', day).replace('{time}', it.start || '');
      return { text: l.text, url: `mailto:${l.email}?subject=${encodeURIComponent(l.subject || '')}&body=${encodeURIComponent(body)}`, icon: 'mail', mail: true };
    }
    return { text: l.text, url: l.url || '', icon: 'arrow' };
  }
  // empty url = a real-looking link that does nothing yet (paste the URL into the data file later)
  function linkTag(L, cls, inner) {
    if (!L.url) return `<a class="${cls}" role="link" aria-disabled="true" data-pending="1">${inner}</a>`;
    const ext = !L.mail && !/^(mailto|tel):/.test(L.url);
    return `<a class="${cls}" href="${esc(L.url)}"${ext ? ' target="_blank" rel="noopener"' : ''} data-elementor-open-lightbox="no">${inner}</a>`;
  }

  /* ---------- detail sheet · © 2026 Saaima Saleh ---------- */
  let lastFocus = null;
  function openSheet(it, push = true) {
    const sheet = $('#bi-sheet'); const c = CAT[it.cat] || CAT.husna; const L = itemLink(it);
    sheet.style.cssText = `--c:${c.color};--t:${c.text};--tint:${c.tint}`;
    sheet.innerHTML = `
      <span class="bi-sheet__grab"></span>
      <div class="bi-sheet__top">
        ${it.start ? `<span class="bi-chip">${esc(timeText(it))}</span>` : '<span></span>'}
        <span style="display:flex;align-items:center"><span class="bi-sheet__cat"><i></i>${esc(c.label)}</span>
        <button class="bi-close" type="button" data-act="close" aria-label="Close">${svg('x', 2.4)}</button></span>
      </div>
      <h2 id="bi-sheet-title">${titleHtml(it)}</h2>
      ${it.tbc ? `<span class="bi-tbc">${STAR.replace('bi-star', 'bi-star')} ${esc(D.settings.tbcLabel)}</span>` : ''}
      <ul class="bi-meta">
        <li>${svg('cal')}${esc(it.day.label)}${it.start ? ' · ' + esc(timeText(it)) : ''}</li>
        ${it.location ? `<li>${svg('pin')}${esc(it.location)}</li>` : ''}
        ${it.ages ? `<li>${svg('people')}${esc(it.ages)}</li>` : ''}
      </ul>
      ${it.note ? `<p class="bi-sheet__note">${esc(it.note)}</p>` : ''}
      ${L ? linkTag(L, 'bi-panel', `<span>${svg(L.mail ? 'mail' : 'list')}${esc(L.text)}</span>${svg(L.icon === 'mail' ? 'arrow' : L.icon, 2.2)}`) : ''}
      <div class="bi-sheet__acts">
        ${it.start ? `<button type="button" data-act="ics">${svg('calAdd')}Add to calendar</button>` : '<span></span>'}
        <button type="button" data-act="share">${svg('share')}Share</button>
      </div>`;
    sheet.dataset.item = it.id;
    if (push) { go(`itinerary/${it.day.id}/${it.id}`); pushedSheet = true; }
    if (!sheet.open) { lastFocus = document.activeElement; sheet.showModal(); sheet.scrollTop = 0; }
  }
  let pushedSheet = false;
  function closeSheet() {
    const sheet = $('#bi-sheet');
    if (parseHash().item) {
      if (pushedSheet) { pushedSheet = false; history.back(); return; }   // back button closes it too
      go(`itinerary/${S.day}`, false);                                    // opened from a shared link
    }
    if (sheet.open) sheet.close();
  }

  /* add to calendar (.ics) · © 2026 Saaima Saleh */
  /* add to calendar · © 2026 Saaima Saleh
     iPhone / iPad / Mac: open the hosted .ics for this item (Safari shows the event with an Add button).
     Everything else: open Google Calendar with the event filled in (opens the app on Android). */
  function ics(it) {
    const off = D.settings.timezoneOffset || '-04:00';
    const sign = off[0] === '-' ? 1 : -1; const [oh, om] = off.slice(1).split(':').map(Number);
    const stamp = d => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const utc = m => { const d = new Date(it.day.date + 'T00:00:00Z'); d.setUTCMinutes(m + sign * (oh * 60 + om)); return stamp(d); };
    const s = mins(it.start); let e = it.end ? mins(it.end) : s + 60;
    if (e <= s) e += 1440;
    const url = location.href.split('#')[0] + `#itinerary/${it.day.id}/${it.id}`;
    const apple = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent) && !window.MSStream;
    if (apple) { location.href = `${BASE}ics/${it.id}.ics`; return; }
    const q = new URLSearchParams({
      action: 'TEMPLATE', text: it.title, dates: `${utc(s)}/${utc(e)}`,
      details: [it.note, it.ages, url].filter(Boolean).join('\n'),
      location: it.location ? it.location + ', Nickelodeon Punta Cana' : 'Nickelodeon Punta Cana'
    });
    window.open('https://calendar.google.com/calendar/render?' + q.toString(), '_blank', 'noopener');
  }
  function share(it) {
    const url = location.href.split('#')[0] + `#itinerary/${it.day.id}/${it.id}`;
    const text = `${it.title} · ${it.day.label}${it.start ? ', ' + timeText(it) : ''}${it.location ? ' · ' + it.location : ''}`;
    if (navigator.share) { navigator.share({ title: it.title, text, url }).catch(() => { }); return; }
    const done = () => toast('Link copied');
    if (navigator.clipboard) navigator.clipboard.writeText(`${text}\n${url}`).then(done, done); else done();
  }
  let toastT;
  function toast(msg) { const t = $('#bi-toast'); t.textContent = msg; t.classList.add('is-on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('is-on'), 1800); }

  /* ---------- sign-ups · © 2026 Saaima Saleh ---------- */
  function mainSignups() {
    const SU = D.signups; const comps = SU.competitions;
    const dayLabel = id => { const d = D.days.find(x => x.id === id); return d ? d.short : ''; };
    const row = c => {
      const sub = [dayLabel(c.day), c.start, c.ages].filter(Boolean).join(' · ');
      const L = { text: (c.link && c.link.text) || 'Sign up', url: (c.link && c.link.url) || '', icon: 'arrow' };
      return `<div class="bi-row${c.full ? ' is-full' : ''}">
        <span class="bi-row__main"><span class="bi-row__title">${esc(c.title)}${c.tbc ? STAR : ''}</span>
          <span class="bi-row__sub">${esc(sub)}</span>
          ${c.location || c.note ? `<span class="bi-row__note">${esc([c.location, c.note].filter(Boolean).join(' · '))}</span>` : ''}</span>
        ${c.full ? '<span class="bi-full">Full</span>' : linkTag(L, 'bi-row__go', `${esc(L.text)}${svg('arrow', 2.4)}`)}
      </div>`;
    };
    const group = (label, list, ico, col) => list.length ? `<section>
        <div class="bi-ghead"><span class="bi-ghead__ico" style="--tint:${col.tint};--t:${col.text}">${svg(ico, 2.4)}</span><b>${esc(label)}</b><span>${list.length} ${list.length === 1 ? 'competition' : 'competitions'}</span></div>
        <div class="bi-card">${list.map(row).join('')}</div></section>` : '';
    const blue = CAT.husna, pink = CAT.women;
    const open = comps.filter(c => c.group === 'open');
    let body = '';
    if (S.seg === 'men') body = group('Men', comps.filter(c => c.group === 'men'), 'people', blue);
    if (S.seg === 'women') body = group('Women', comps.filter(c => c.group === 'women'), 'people', pink);
    if (S.seg === 'kids') body = group('Girls', comps.filter(c => c.group === 'kids' && (c.kids || []).includes('girls')), 'girl', pink) +
      group('Boys', comps.filter(c => c.group === 'kids' && (c.kids || []).includes('boys')), 'boy', blue);
    if (!body) body = '<div class="bi-empty">Competitions will be added here soon.</div>';
    return `<div class="bi-intro"><h1>${esc(SU.title)}</h1><p>${esc(SU.intro)}</p></div>
      <div class="bi-seg" role="tablist" aria-label="Competition groups">
        ${['men', 'women', 'kids'].map(k => `<button type="button" role="tab" data-act="seg" data-seg="${k}" aria-selected="${S.seg === k}">${{ men: 'Men', women: 'Women', kids: 'Kids' }[k]}</button>`).join('')}
      </div>
      <div class="bi-groups">${body}${group('Open to everyone', open, 'star', blue)}</div>`;
  }

  /* ---------- FAQ · © 2026 Saaima Saleh ---------- */
  function topFaq() {
    return `<div class="bi-bar"><div class="bi-col">
      <label class="bi-search">${svg('search')}<input id="bi-q" type="search" placeholder="Search questions" value="${esc(S.q)}" autocomplete="off"></label>
      <div class="bi-chips">${['All'].concat(D.faq.topics).map(t => `<button type="button" data-act="topic" data-topic="${esc(t)}" aria-pressed="${S.topic === t}">${esc(t)}</button>`).join('')}</div>
    </div></div>`;
  }
  function mainFaq() {
    const q = S.q.trim().toLowerCase();
    const list = D.faq.questions.filter(x => (S.topic === 'All' || x.topic === S.topic) && (!q || (x.q + ' ' + x.a.join(' ')).toLowerCase().includes(q)));
    if (!list.length) return '<div class="bi-empty">No questions match that search.</div>';
    return `<div class="bi-faq">${list.map((x, i) => `<details class="bi-q"${i === 0 && !q && S.topic === 'All' ? ' open' : ''}>
      <summary>${esc(x.q)}${svg('chev', 2.2)}</summary>
      <div class="bi-a">${answer(x.a)}</div></details>`).join('')}</div>`;
  }
  function answer(paras) {
    let out = '', ul = null;
    paras.forEach(p => {
      if (p.startsWith('- ')) { ul = (ul || '') + `<li>${linkify(p.slice(2))}</li>`; return; }
      if (ul) { out += `<ul>${ul}</ul>`; ul = null; }
      out += `<p>${linkify(p)}</p>`;
    });
    if (ul) out += `<ul>${ul}</ul>`;
    return out;
  }

  /* ---------- contact · © 2026 Saaima Saleh ---------- */
  function mainContact() {
    return `<div class="bi-intro"><h1>Contact</h1><p>Find the Husna team, or reach the right desk at the resort.</p></div>
      <div class="bi-contacts">${D.contacts.contacts.map(c => {
      const rows = [];
      if ('phone' in c) rows.push(linkTag({ text: 'Call', url: c.phone ? 'tel:' + c.phone.replace(/[^\d+]/g, '') : '', mail: true }, 'bi-linkrow', `<span>Call${c.phone ? ' · ' + esc(c.phone) : ''}</span>${svg('phone')}`));
      if ('whatsapp' in c) rows.push(linkTag({ text: 'WhatsApp', url: c.whatsapp ? 'https://wa.me/' + c.whatsapp.replace(/\D/g, '') : '' }, 'bi-linkrow', `<span>WhatsApp</span>${svg('chat')}`));
      if (c.email) rows.push(linkTag({ url: `mailto:${c.email}${c.subject ? '?subject=' + encodeURIComponent(c.subject) : ''}`, mail: true }, 'bi-linkrow', `<span>${esc(c.email)}</span>${svg('mail')}`));
      if ('url' in c) rows.push(linkTag({ url: c.url || '' }, 'bi-linkrow', `<span>${esc(c.urlText || 'Open link')}</span>${svg('arrow', 2.2)}`));
      return `<div class="bi-contact"><b>${esc(c.name)}${c.tbc ? STAR : ''}</b>${c.role ? `<span>${esc(c.role)}</span>` : ''}${c.note ? `<span>${esc(c.note)}</span>` : ''}${rows.join('')}</div>`;
    }).join('')}</div>`;
  }

  /* ---------- events · © 2026 Saaima Saleh ---------- */
  function setFilters(f, keepOpen) {
    S.filters = f; store.set('filters', f);
    render();
    if (keepOpen) openPop(); else closePop();
  }
  function openPop() { const p = $('#bi-pop'); if (!p) return; p.hidden = false; $('#bi-scrim').hidden = false; $('[data-act="pop"]').setAttribute('aria-expanded', 'true'); }
  function closePop() { const p = $('#bi-pop'); if (p) p.hidden = true; $('#bi-scrim').hidden = true; const b = $('[data-act="pop"]'); if (b) b.setAttribute('aria-expanded', 'false'); }

  function bind() {
    root.addEventListener('click', e => {
      const pend = e.target.closest('[data-pending]');
      if (pend) { e.preventDefault(); e.stopPropagation(); return; }
      if (e.target.closest('a[href]')) { e.stopPropagation(); return; }
      const el = e.target.closest('[data-act],[data-view],[data-item]');
      if (!el) return;
      if (el.dataset.view) {
        closePop();
        if (el.dataset.view === S.view) { window.scrollTo({ top: root.offsetTop, behavior: 'smooth' }); return; }
        go(el.dataset.view === 'itinerary' ? `itinerary/${S.day}` : el.dataset.view); route(false);
        window.scrollTo(0, root.offsetTop); return;
      }
      if (el.dataset.item && !el.dataset.act) { const it = findItem(el.dataset.item); if (it) openSheet(it); return; }
      const a = el.dataset.act, cat = el.dataset.cat;
      if (a === 'back') {
        if (S.view !== 'itinerary') { go(`itinerary/${S.day}`); route(false); return; }
        if (D.settings.hubUrl) location.href = D.settings.hubUrl; else history.back();
        return;
      }
      if (a === 'pop') { $('#bi-pop').hidden ? openPop() : closePop(); return; }
      if (a === 'toggle') { setFilters(S.filters.includes(cat) ? S.filters.filter(x => x !== cat) : S.filters.concat(cat), true); return; }
      if (a === 'only') { setFilters([cat]); return; }
      if (a === 'unfilter') { setFilters(S.filters.filter(x => x !== cat)); return; }
      if (a === 'clear') { setFilters([], !!$('#bi-pop') && !$('#bi-pop').hidden); return; }
      if (a === 'seg') { S.seg = el.dataset.seg; render(); return; }
      if (a === 'topic') { S.topic = el.dataset.topic; $('#bi-main').innerHTML = mainFaq(); $$('[data-act="topic"]').forEach(b => b.setAttribute('aria-pressed', b.dataset.topic === S.topic)); return; }
      if (a === 'close') { closeSheet(); return; }
      if (a === 'ics' || a === 'share') { const it = findItem($('#bi-sheet').dataset.item); if (it) (a === 'ics' ? ics : share)(it); return; }
    });
    root.addEventListener('keydown', e => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.bi-item')) { e.preventDefault(); const it = findItem(e.target.dataset.item); if (it) openSheet(it); }
      if (e.key === 'Escape' && $('#bi-pop') && !$('#bi-pop').hidden) closePop();
    });
    root.addEventListener('change', e => {
      if (e.target.id === 'bi-day') { S.day = e.target.value; go(`itinerary/${S.day}`, false); render(); window.scrollTo(0, root.offsetTop); }
    });
    root.addEventListener('input', e => {
      if (e.target.id === 'bi-q') { S.q = e.target.value; $('#bi-main').innerHTML = mainFaq(); }
    });
    $('#bi-scrim').addEventListener('click', closePop);
    const sheet = $('#bi-sheet');
    sheet.addEventListener('cancel', e => { e.preventDefault(); closeSheet(); });
    sheet.addEventListener('click', e => {
      if (e.target !== sheet) return;
      const r = sheet.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom || e.clientX < r.left || e.clientX > r.right) closeSheet();
    });
    sheet.addEventListener('close', () => { if (lastFocus && lastFocus.focus) lastFocus.focus(); });
  }
})();
