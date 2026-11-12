/* ============================================================
   WCG 2027 Guest Hub · hub.js · Winter Classic Getaway, Muskoka
   © 2026 Saaima Saleh. Licensed to Husna Vacations for use on husna.com only. All other rights reserved.
   Author: Saaima Saleh · Do not copy, redistribute or reuse without written permission.
   ============================================================ */
(function(){
  'use strict';

  /* images live next to this file in img/ (GitHub Pages), so nothing needs uploading to WordPress */
  const IMG = (document.currentScript && document.currentScript.src || 'https://sunnq3.github.io/husna/wcg2027-guest-hub/hub.js').replace(/[^/]*$/, '') + 'img/';

  const CONFIG = {
    tripStart: '2027-01-29',          // first day (local) · Fri
    tripEnd:   '2027-01-31',          // last day (local) · Sun
    whatsapp:  'https://chat.whatsapp.com/LgHd5DUl8w25hNKFY9pBAG',
    itinerary: '',                    // leave empty until the itinerary page exists; the button disables itself
    img: {
      wordmark:   IMG + 'wordmark-blue.png',
      archMain:   IMG + 'arch-pavilion.jpg',
      archL:      IMG + 'arch-snowkid.jpg',
      archR:      IMG + 'arch-village.jpg',
      smiley:     'https://husna.com/wp-content/uploads/2026/09/smiley.png',
      emails:     IMG + 'feat-moon.jpg',
      packing:    IMG + 'th-packing.jpg',
      waiver:     IMG + 'th-waiver.jpg',
      map:        IMG + 'th-map.jpg',
      activities: IMG + 'th-activities.jpg',
      dining:     IMG + 'th-dining.jpg',
      app:        IMG + 'th-app.jpg'
    },
    // Newest first. "added" drives the NEW badge. Optional "until" hides the row after that date.
    // Fill from the WCG2027 Email Campaign sheet as emails go out:
    // { title: 'Welcome to Winter Classic Getaway', date: 'Nov 14', added: '2026-11-14', url: 'http://eepurl.com/…' },
    emails: [
    ],

    // Contact panel (Contact button): who to contact for what. Built by JS; no WordPress change needed.
    contacts: {
      intro: 'Sr. Iman and the Husna team are here before and during the trip.',
      groups: [
        { name: 'Sr. Iman Khan', role: 'Husna guest services', star: true,
          rows: [ { kind: 'whatsapp', label: 'WhatsApp', sub: 'Fastest reply · +1 (734) 510-4886', to: '17345104886' },
                  { kind: 'call', label: 'Call', sub: '+1 (734) 510-4886', to: '+17345104886' },
                  { kind: 'sms', label: 'Text', sub: '+1 (734) 510-4886', to: '+17345104886' },
                  { kind: 'email', label: 'Email', sub: 'info@husna.com', to: 'info@husna.com', subject: 'Winter Classic Getaway 2027' } ] }
      ]
    },

    // Packing guide (Packing tile). Checked items persist on the guest's phone. Edit here; no WordPress change needed.
    packing: {
      note: 'Don’t worry if you’ve forgotten something — there are plenty of shops nearby in town.',
      groups: [
        { name: 'Essentials', items: [
          ['Cash & credit cards', 'You’ll need a credit card at check-in'],
          ['Food & drink cooler'],
          ['Pre-made / quick meals', 'If you’re cooking at your lodge'],
          ['Snacks & drinks'],
          ['Indoor clothing', 'For 3 days'],
          ['Slippers'],
          ['Qur’an, duas, books', 'Digital recommended'],
          ['Travel prayer mat']
        ]},
        { name: 'Winter, sports & activities gear', items: [
          ['Coat & snowpants'],
          ['Hat, gloves, scarf'],
          ['Waterproof boots'],
          ['Thermal clothing & undergarments'],
          ['Modest swimwear'],
          ['Travel shampoo & conditioner', 'For use in change rooms'],
          ['Waterproof slippers', 'For poolside'],
          ['Life jackets'],
          ['Wet bags'],
          ['Sleds'],
          ['Personal ski & snowboard gear', 'Rentals also available'],
          ['Helmets', 'Required to be on the ice'],
          ['Hockey sticks']
        ]},
        { name: 'Toiletries', items: [
          ['Istinja bottle'],
          ['Oral hygiene products'],
          ['Baby toiletries'],
          ['Sunscreen'],
          ['Deodorant'],
          ['Contact lens solution & case'],
          ['Moisturizing skincare & lip balm', 'For the dry climate'],
          ['Feminine hygiene products'],
          ['Hair products & accessories'],
          ['Makeup'],
          ['Nail cutter']
        ]},
        { name: 'Health & safety', items: [
          ['Prescription medication'],
          ['OTC medications', 'Cold & flu, allergy, anti-nausea'],
          ['Supplements'],
          ['Epi-pen']
        ]},
        { name: 'Tech', items: [
          ['Phone, headphones & charger'],
          ['Portable battery pack'],
          ['Camera, memory card & charger'],
          ['eReaders, laptop']
        ]}
      ]
    }
  };


  const root = document.getElementById('husna-hub');
  if (!root) return;
  const $  = (s, c = root) => c.querySelector(s);
  const $$ = (s, c = root) => Array.from(c.querySelectorAll(s));

  /* coming back from another page: browsers re-focus the link you tapped, which left it looking pressed */
  const unfocus = () => { const a = document.activeElement; if (a && a !== document.body && root.contains(a)) a.blur(); };
  window.addEventListener('pageshow', unfocus); unfocus();
  root.addEventListener('click', e => { const a = e.target.closest('a.hh-btn'); if (a) setTimeout(() => a.blur(), 0); });
  let kb = false;
  window.addEventListener('keydown', e => { if (e.key === 'Tab') kb = true; });
  window.addEventListener('pointerdown', () => { kb = false; });
  root.addEventListener('focusin', e => { if (!kb && e.target.closest && e.target.closest('a.hh-btn')) e.target.blur(); });

  /* images & links from CONFIG · © 2026 Saaima Saleh */
  $$('img[data-src]').forEach(el => { const v = CONFIG.img[el.dataset.src]; if (v) el.src = v; });
  $$('a[data-href]').forEach(el => {
    const v = CONFIG[el.dataset.href];
    if (v) { el.href = v; return; }
    /* no destination yet (itinerary before launch): show it, but quietly off */
    el.removeAttribute('href'); el.removeAttribute('target');
    el.setAttribute('aria-disabled', 'true');
    const s = el.querySelector('svg'); if (s) s.remove();
    el.insertAdjacentHTML('beforeend', '<span style="font-size:10px;font-weight:500;letter-spacing:1px;text-transform:uppercase;opacity:.7">soon</span>');
  });

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
    const LS = 'hh_wcg27_last_visit';
    let lastVisit = null;
    try { lastVisit = localStorage.getItem(LS); } catch(e){}
    const todayISO = new Date().toISOString().slice(0,10);
    const live = CONFIG.emails.filter(e => !e.until || e.until >= todayISO);
    const isNew = e => lastVisit && e.added > lastVisit;
    const newCount = live.filter(isNew).length;

    if (!live.length) {
      list.innerHTML = '<div class="hh-emails__empty">Emails will appear here as they’re sent — watch this space.</div>';
      return;
    }

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

  /* packing guide: checklist built from CONFIG.packing; checks persist per phone · © 2026 Saaima Saleh */
  (function packing(){
    const P = CONFIG.packing, body = $('#hh-pack-body');
    if (!P || !body) return;
    const esc = v => String(v).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const LS = 'hh_wcg27_packing';
    let done = {};
    try { done = JSON.parse(localStorage.getItem(LS) || '{}') || {}; } catch(e){}
    const save = () => { try { localStorage.setItem(LS, JSON.stringify(done)); } catch(e){} };
    const key = t => t.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const tick = '<span class="hh-check__box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg></span>';

    body.innerHTML = `
      <p class="hh-packnote">${esc(P.note)} Tap items to check them off — your list is saved on this phone.</p>
      ${P.groups.map(g => `
        <span class="hh-eyebrow">${esc(g.name)}</span>
        <div class="hh-checks">${g.items.map(([t, sub]) => `
          <button class="hh-check" type="button" data-k="${key(t)}" aria-pressed="${done[key(t)] ? 'true' : 'false'}">
            ${tick}<span class="hh-check__t"><b>${esc(t)}</b>${sub ? `<span>${esc(sub)}</span>` : ''}</span>
          </button>`).join('')}
        </div>`).join('')}
      <button class="hh-packreset" type="button" id="hh-pack-reset">Reset my list</button>`;

    body.addEventListener('click', e => {
      const c = e.target.closest('.hh-check');
      if (c) {
        const k = c.dataset.k, on = c.getAttribute('aria-pressed') !== 'true';
        c.setAttribute('aria-pressed', String(on));
        if (on) done[k] = 1; else delete done[k];
        save(); return;
      }
      if (e.target.closest('#hh-pack-reset')) {
        done = {}; save();
        $$('.hh-check', body).forEach(b => b.setAttribute('aria-pressed', 'false'));
      }
    });
  })();

  /* contact: who to contact for what, built from CONFIG.contacts (replaces the pasted sheet) · © 2026 Saaima Saleh */
  (function contacts(){
    const C = CONFIG.contacts, old = document.getElementById('hh-contact');
    if (!C || !C.groups || !old) return;
    const esc = v => String(v).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const ico = {
      back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
      chev: '<svg class="hh-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
      whatsapp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.4A8 8 0 1 1 21 12z"/></svg>',
      call: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
      sms: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M8 10h8M8 14h5"/></svg>',
      email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 7l9 6 9-6"/></svg>'
    };
    const href = r => r.kind === 'whatsapp' ? 'https://wa.me/' + r.to
      : r.kind === 'call' ? 'tel:' + r.to : r.kind === 'sms' ? 'sms:' + r.to
      : 'mailto:' + r.to + (r.subject ? '?subject=' + encodeURIComponent(r.subject) : '');
    const ext = r => r.kind === 'whatsapp' ? ' target="_blank" rel="noopener" data-elementor-open-lightbox="no"' : '';
    const row = r => `<a href="${href(r)}"${ext(r)}><span class="hh-ico">${ico[r.kind] || ico.email}</span><span class="hh-row__t"><b>${esc(r.label)}</b><span>${esc(r.sub)}</span></span>${ico.chev}</a>`;
    const group = g => `
      <section class="hh-cg${g.star ? ' hh-cg--star' : ''}">
        <div class="hh-cg__head"><span class="hh-eyebrow">${esc(g.role)}</span><h3>${esc(g.name)}</h3></div>
        ${g.for ? `<ul class="hh-cg__for">${g.for.map(f => `<li>${esc(f)}</li>`).join('')}</ul>` : ''}
        ${g.note ? `<p class="hh-cg__note">${esc(g.note)}</p>` : ''}
        <div class="hh-rows">${g.rows.map(row).join('')}</div>
      </section>`;
    old.outerHTML = `
    <dialog class="hh-full hh-dlg hh-contactp" id="hh-contact" aria-labelledby="hh-contact-t">
      <div class="hh-full__head">
        <button class="hh-back" type="button" data-close aria-label="Back">${ico.back}</button>
        <div><span class="hh-eyebrow">Who to contact</span><h2 id="hh-contact-t">Contact</h2></div>
      </div>
      <div class="hh-dlg__body">
        <p class="hh-lead">${esc(C.intro)}</p>
        ${C.groups.map(group).join('')}
      </div>
    </dialog>`;
  })();

  /* dialogs: open / close / back button · © 2026 Saaima Saleh
     Driven by the URL hash (#faq, #packing, #dining …), so the phone's back button,
     the ‹ arrow and the X all agree. A sheet marked data-over opens on top of a panel. */
  const dialogs = $$('dialog');
  let openDlg = null;
  const stack = [];                                   // open dialogs, bottom to top
  const slug = d => d.id.replace(/^hh-/, '');
  const byHash = () => { const id = 'hh-' + location.hash.slice(1); return location.hash.length > 1 ? document.getElementById(id) : null; };
  let ignorePop = 0;

  function show(d){
    if (d.open) return;
    if (!('over' in d.dataset)) while (stack.length) hide(stack[stack.length - 1]);
    stack.push(d); openDlg = d;
    d.showModal();
    d.dispatchEvent(new Event('hh:open'));
    d.querySelector('.hh-dlg__body')?.scrollTo(0,0);
  }
  function hide(d){
    if (!d.open) return;
    d.close();
    const i = stack.indexOf(d); if (i > -1) stack.splice(i, 1);
    openDlg = stack[stack.length - 1] || null;
  }
  function openDialog(id){
    const d = document.getElementById(id);
    if (!d || d.open) return;
    show(d);
    if (location.hash !== '#' + slug(d)) history.pushState({ hh: id }, '', '#' + slug(d));
  }
  function closeDialog(d){
    if (!d || !d.open) return;
    hide(d);
    // we put this dialog's hash in the URL: step back so the URL matches what's on screen
    if (location.hash === '#' + slug(d)) { ignorePop++; history.back(); }
  }
  // make what's open match the URL (back / forward / swipe)
  function sync(){
    const want = byHash();
    if (want && want.open) { while (stack[stack.length - 1] !== want) hide(stack[stack.length - 1]); return; }
    if (want) { show(want); return; }
    while (stack.length) hide(stack[stack.length - 1]);
  }
  window.addEventListener('popstate', () => { if (ignorePop > 0) { ignorePop--; sync(); return; } sync(); });
  window.addEventListener('hashchange', sync);

  root.addEventListener('click', e => {
    const o = e.target.closest('[data-open]');
    if (o) { e.preventDefault(); openDialog(o.dataset.open); return; }
    const c = e.target.closest('[data-close]');
    if (c) { e.preventDefault(); closeDialog(c.closest('dialog')); return; }
  });
  dialogs.forEach(d => {
    d.addEventListener('click', e => { if (e.target === d) closeDialog(d); });            // backdrop
    d.addEventListener('cancel', e => { e.preventDefault(); closeDialog(d); });           // Escape
  });
  // deep link: /winter-classic-hub#faq, #packing, #dining
  if (byHash()) { const d = byHash(); history.replaceState(null, '', location.pathname + location.search); openDialog(d.id); }
  // lock page scroll while a dialog is open
  const lock = () => document.documentElement.style.overflow = dialogs.some(d => d.open) ? 'hidden' : '';
  dialogs.forEach(d => { d.addEventListener('close', lock); d.addEventListener('hh:open', lock); });

  /* map: load the embed only when the panel first opens (keeps the page itself light) · © 2026 Saaima Saleh */
  (function lazymap(){
    const box = $('#hh-map-embed'); if (!box) return;
    $('#hh-map').addEventListener('hh:open', () => {
      box.innerHTML = '<iframe src="https://www.google.com/maps?q=Deerhurst+Resort,+1235+Deerhurst+Dr,+Huntsville,+ON&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Map to Deerhurst Resort"></iframe>';
    }, { once: true });
  })();

  /* expiry: hide anything with data-until in the past · © 2026 Saaima Saleh */
  const today = new Date().toISOString().slice(0,10);
  $$('[data-until]').forEach(el => { if (el.dataset.until < today) el.hidden = true; });

})();
