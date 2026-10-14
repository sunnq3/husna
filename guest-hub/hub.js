/* ============================================================
   BB10 Guest Hub · hub.js
   © 2026 Saaima Saleh. Licensed to Husna Vacations for use on husna.com only. All other rights reserved.
   Author: Saaima Saleh · Do not copy, redistribute or reuse without written permission.
   ============================================================ */
(function(){
  'use strict';

  const CONFIG = {
    tripStart: '2026-12-19',          // first day (local)
    tripEnd:   '2026-12-24',          // last day (local)
    whatsapp:  'https://chat.whatsapp.com/ILGjPYSuBoB8Q4hQZzDvs9',
    itinerary: '#',                   // put the itinerary page URL here when it exists
    img: {                           
      hero:       'https://husna.com/wp-content/uploads/2026/09/hero.jpg',
      wordmark:   'https://husna.com/wp-content/uploads/2026/09/wordmark-white.png',
      smiley:     'https://husna.com/wp-content/uploads/2026/09/smiley.png',
      emails:     'https://husna.com/wp-content/uploads/2026/09/th-emails.jpg',
      transfers:  'https://husna.com/wp-content/uploads/2026/09/th-transfers.jpg',
      checklist:  'https://husna.com/wp-content/uploads/2026/09/th-checklist.jpg',
      maps:       'https://husna.com/wp-content/uploads/2026/09/th-maps.jpg',
      extras:     'https://husna.com/wp-content/uploads/2026/09/th-extras.jpg',
      spa:        'https://husna.com/wp-content/uploads/2026/09/th-spa.jpg',
      excursions: 'https://husna.com/wp-content/uploads/2026/09/th-excursions.jpg',
      competitions:'https://husna.com/wp-content/uploads/2026/09/th-competitions.jpg',   // upload assets/th-competitions.jpg
      map1:       'https://husna.com/wp-content/uploads/2026/09/Nickelodeon-Map-1-of-2-1.png',   // Nickelodeon Map - 1 of 2
      map2:       'https://husna.com/wp-content/uploads/2026/09/Nickelodeon-Map-2-of-2.png'    // Nickelodeon Map - 2 of 2
    },
    // Newest first. "added" drives the NEW badge. Optional "until" hides the row after that date.
    emails: [
      { title: 'HCI fundraising update',          date: 'Oct 8',  added: '2026-10-08', url: 'http://eepurl.com/SNtZZfRH2Z' },
      { title: 'Guest reveal – Amin Davis',       date: 'Sep 27', added: '2026-09-27', url: 'http://eepurl.com/QDy9ZfOyTx' },
      { title: 'Resort add-ons',                  date: 'Sep 24', added: '2026-09-24', url: 'http://eepurl.com/BPJ4-0xjDc' },
      { title: 'Airport transfers',               date: 'Sep 22', added: '2026-09-22', url: 'http://eepurl.com/DIjYnB7aB6' },
      { title: 'Referral campaign',               date: 'Sep 20', added: '2026-09-20', url: 'http://eepurl.com/dYz9xs1l1Q' },
      { title: 'Discover Punta Cana',             date: 'Sep 18', added: '2026-09-18', url: 'http://eepurl.com/ih1pmerln1' },
      { title: '4 AI prompts to book your flights', date: 'Sep 17', added: '2026-09-17', url: 'http://eepurl.com/ioq0yVmImQ' },
      { title: 'Travel insurance',                date: 'Sep 17', added: '2026-09-17', url: 'http://eepurl.com/ICnFLOV5R8' },
      { title: 'Who is coming with you to Punta Cana?', date: 'Sep 11', added: '2026-09-11', url: 'http://eepurl.com/wOC62d9CQ_' },
      { title: 'Early arrival & late departure',  date: 'Sep 4',  added: '2026-09-04', url: 'http://eepurl.com/Hf8EmHG_Ps' },
      { title: 'Welcome to Beach & Beyond 10',    date: 'Aug 20', added: '2026-08-20', url: 'http://eepurl.com/g_yoOcaoBU' }
    ]
  };


  const root = document.getElementById('husna-hub');
  if (!root) return;
  const $  = (s, c = root) => c.querySelector(s);
  const $$ = (s, c = root) => Array.from(c.querySelectorAll(s));

  /* images & links from CONFIG · © 2026 Saaima Saleh */
  $$('img[data-src]').forEach(el => { const v = CONFIG.img[el.dataset.src]; if (v) el.src = v; });
  $$('a[data-href]').forEach(el => { const v = CONFIG[el.dataset.href]; if (v) el.href = v; });

  /* countdown · © 2026 Saaima Saleh */
  (function countdown(){
    const num = $('#hh-days'), b = $('#hh-days-b'), s = $('#hh-days-s');
    const today = new Date(); today.setHours(0,0,0,0);
    const start = new Date(CONFIG.tripStart + 'T00:00:00');
    const end   = new Date(CONFIG.tripEnd   + 'T00:00:00');
    const day   = 864e5;
    const toStart = Math.round((start - today) / day);
    const total   = Math.round((end - start) / day) + 1;
    if (toStart > 0)       { num.textContent = toStart; b.textContent = toStart === 1 ? 'day' : 'days'; s.textContent = 'to go'; }
    else if (today <= end) { num.textContent = 1 - toStart; b.textContent = 'day'; s.textContent = 'of ' + total; }
    else                   { num.textContent = total; b.textContent = 'days'; s.textContent = 'of memories'; }
  })();

  /* emails list + NEW badge · © 2026 Saaima Saleh */
  (function emails(){
    const list = $('#hh-email-list'), badge = $('#hh-email-badge');
    const LS = 'hh_bb10_last_visit';
    let lastVisit = null;
    try { lastVisit = localStorage.getItem(LS); } catch(e){}
    const todayISO = new Date().toISOString().slice(0,10);
    const live = CONFIG.emails.filter(e => !e.until || e.until >= todayISO);
    const isNew = e => lastVisit && e.added > lastVisit;
    const newCount = live.filter(isNew).length;

    list.innerHTML = live.map(e => `
      <a href="${e.url}" target="_blank" rel="noopener" class="${isNew(e) ? 'is-new' : ''}">
        <span class="hh-email__t"><b>${e.title}</b>${e.date ? `<span>${e.date}</span>` : ''}</span>
        ${isNew(e)
          ? '<span class="hh-badge">NEW</span>'
          : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>'}
      </a>`).join('');

    if (newCount > 0) { badge.textContent = newCount + ' NEW'; badge.hidden = false; }
    else if (!lastVisit) { badge.textContent = live.length + ' SENT'; badge.hidden = false; }

    // mark as seen once the sheet is opened
    $('#hh-emails').addEventListener('hh:open', () => {
      try { localStorage.setItem(LS, todayISO); } catch(e){}
      badge.hidden = true;
    }, { once: true });
    // first ever visit: still record it so next time "NEW" works
    if (!lastVisit) { try { localStorage.setItem(LS, todayISO); } catch(e){} }
  })();

  /* dialogs: open / close / back button · © 2026 Saaima Saleh */
  const dialogs = $$('dialog');
  let openDlg = null;

  function openDialog(id){
    const d = document.getElementById(id);
    if (!d || d.open) return;
    if (openDlg) closeDialog(openDlg, true);
    openDlg = d;
    d.showModal();
    d.dispatchEvent(new Event('hh:open'));
    d.querySelector('.hh-dlg__body')?.scrollTo(0,0);
    history.pushState({ hh: id }, '', '#' + id.replace('hh-',''));
  }
  function closeDialog(d, silent){
    if (!d || !d.open) return;
    d.close();
    if (d === openDlg) openDlg = null;
    if (!silent && history.state && history.state.hh === d.id) history.back();
  }
  root.addEventListener('click', e => {
    const o = e.target.closest('[data-open]');
    if (o) { e.preventDefault(); openDialog(o.dataset.open); return; }
    const c = e.target.closest('[data-close]');
    if (c) { e.preventDefault(); closeDialog(c.closest('dialog')); return; }
  });
  dialogs.forEach(d => {
    // click on backdrop closes
    d.addEventListener('click', e => { if (e.target === d) closeDialog(d); });
    // Escape (native) → keep history in sync
    d.addEventListener('cancel', e => { e.preventDefault(); closeDialog(d); });
  });
  window.addEventListener('popstate', () => {
    if (openDlg) { openDlg.close(); openDlg = null; }
    else if (history.state && history.state.hh) openDialog(history.state.hh);
  });
  // deep link: /guest-hub#faq
  if (location.hash) {
    const id = 'hh-' + location.hash.slice(1);
    if (document.getElementById(id)) { history.replaceState(null, '', location.pathname); openDialog(id); }
  }
  // lock page scroll while a dialog is open
  const lock = () => document.documentElement.style.overflow = dialogs.some(d => d.open) ? 'hidden' : '';
  dialogs.forEach(d => { d.addEventListener('close', lock); d.addEventListener('hh:open', lock); });

  /* maps: tabs + pinch / drag / wheel zoom · © 2026 Saaima Saleh */
  (function maps(){
    const maps = [CONFIG.img.map1, CONFIG.img.map2];
    const img = $('#hh-map-img'), stage = $('#hh-zoom'), full = $('#hh-map-full');
    const tabs = $$('#hh-map-tabs [role=tab]');
    let s = 1, x = 0, y = 0;
    const apply = () => img.style.transform = `translate(${x}px,${y}px) scale(${s})`;
    const reset = () => { s = 1; x = 0; y = 0; apply(); };
    function show(i){
      tabs.forEach((t, j) => t.setAttribute('aria-selected', String(i === j)));
      img.src = maps[i]; full.href = maps[i]; reset();
    }
    tabs.forEach(t => t.addEventListener('click', () => show(+t.dataset.map)));
    // bypass any theme/Elementor lightbox that intercepts image links
    full.addEventListener('click', e => { e.preventDefault(); e.stopImmediatePropagation(); window.open(full.href, '_blank', 'noopener'); }, true);
    $('#hh-maps').addEventListener('hh:open', () => show(0));

    const pts = new Map(); let startDist = 0, startS = 1, lastX = 0, lastY = 0, lastTap = 0;
    const clamp = () => { s = Math.min(6, Math.max(1, s)); if (s === 1) { x = 0; y = 0; } };
    stage.addEventListener('pointerdown', e => {
      stage.setPointerCapture(e.pointerId); pts.set(e.pointerId, e);
      if (pts.size === 1) { lastX = e.clientX; lastY = e.clientY;
        const now = Date.now(); if (now - lastTap < 300) { reset(); } lastTap = now; }
      if (pts.size === 2) { const [a, b] = [...pts.values()]; startDist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY); startS = s;
        const r = stage.getBoundingClientRect(); px = (a.clientX + b.clientX) / 2 - r.left; py = (a.clientY + b.clientY) / 2 - r.top; }
    });
    let px = 0, py = 0;
    const zoomTo = (ns) => { ns = Math.min(6, Math.max(1, ns)); const k = ns / s; x = px - (px - x) * k; y = py - (py - y) * k; s = ns; };
    stage.addEventListener('pointermove', e => {
      if (!pts.has(e.pointerId)) return; pts.set(e.pointerId, e);
      if (pts.size === 1) { x += e.clientX - lastX; y += e.clientY - lastY; lastX = e.clientX; lastY = e.clientY; }
      else if (pts.size === 2) { const [a, b] = [...pts.values()]; const d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY); zoomTo(startS * (d / startDist)); }
      clamp(); apply();
    });
    const up = e => { pts.delete(e.pointerId); };
    stage.addEventListener('pointerup', up); stage.addEventListener('pointercancel', up);
    stage.addEventListener('wheel', e => { e.preventDefault(); const r = stage.getBoundingClientRect(); px = e.clientX - r.left; py = e.clientY - r.top; zoomTo(s * (e.deltaY < 0 ? 1.12 : 0.9)); clamp(); apply(); }, { passive: false });
  })();

  /* expiry: hide anything with data-until in the past · © 2026 Saaima Saleh */
  const today = new Date().toISOString().slice(0,10);
  $$('[data-until]').forEach(el => { if (el.dataset.until < today) el.hidden = true; });

})();
