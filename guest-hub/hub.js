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
    itinerary: 'https://husna.com/itinerary-beach-beyond-punta-cana-2026',
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
      { title: 'Itinerary',                       date: 'Oct 30', added: '2026-10-30', url: 'http://eepurl.com/LSYG02mGRL' },
      { title: 'Excursions',                      date: 'Oct 23', added: '2026-10-23', url: 'http://eepurl.com/E-79xxDOXN' },
      { title: 'Ilyas Mao announcement',          date: 'Oct 15', added: '2026-10-15', url: 'http://eepurl.com/83UH2NaGe5' },
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
    ],

    // Contact panel (Contact button): who to contact for what. Built by JS; no WordPress change needed.
    contacts: {
      intro: 'Sr. Iman and the Husna team are here before and during the trip. For everything else, here is who to ask.',
      groups: [
        { name: 'Sr. Iman', role: 'Husna guest services', star: true,
          rows: [ { kind: 'whatsapp', label: 'WhatsApp', sub: 'Fastest reply · +1 (734) 510-4886', to: '17345104886' },
                  { kind: 'call', label: 'Call', sub: '+1 (734) 510-4886', to: '+17345104886' },
                  { kind: 'sms', label: 'Text', sub: '+1 (734) 510-4886', to: '+17345104886' } ] },
        { name: 'Husna bookings', role: 'Your booking',
          for: ['Room requests', 'Extending your stay', 'Cancellations', 'Rollaways & cribs', 'Baby warmers', 'Adding a person'],
          rows: [ { kind: 'email', label: 'Email', sub: 'Nabila@husna.com', to: 'Nabila@husna.com', subject: 'Husna Guest – booking' } ] },
        { name: 'BRX', role: 'Excursions & transfers',
          for: ['Excursion pickup times', 'Excursion info', 'Airport transfers', 'Specialised transfers'],
          rows: [ { kind: 'whatsapp', label: 'WhatsApp', sub: '+1 (809) 501-1178', to: '18095011178' },
                  { kind: 'email', label: 'Email', sub: 'info@brx-services.com', to: 'info@brx-services.com', subject: 'Husna Guest – excursions & transfers' } ] },
        { name: 'Nickelodeon Resort', role: 'At the hotel',
          for: ['Babysitting', 'Life jackets', 'Strollers', 'Food & drink allergies', 'When the front desk isn\u2019t getting back to you'],
          note: 'For anything in your room (keys, A/C, towels), ask the front desk first.',
          rows: [ { kind: 'email', label: 'Email', sub: 'jesantos@nick-resorts.com', to: 'jesantos@nick-resorts.com', subject: 'Husna Guest' } ] },
        { name: 'Spa', role: 'Nickelodeon Resort',
          for: ['All bookings & enquiries'],
          rows: [ { kind: 'email', label: 'Email', sub: 'madrian@nick-resorts.com', to: 'madrian@nick-resorts.com', subject: 'Husna Guest – spa booking' } ] },
        { name: 'Husna programming', role: 'Activities & competitions',
          for: ['How to sign up', 'Prayers', 'Competitions'],
          rows: [ { kind: 'email', label: 'Email', sub: 'guests@husna.com', to: 'guests@husna.com', subject: 'Husna Guest – programming' } ] }
      ]
    },

    // Excursions panel (Excursions tile). Photos live in guest-hub/img/. Edit here; no WordPress change needed.
    excursions: {
      book:     'https://husnabrx.com/excursions/',
      whatsapp: 'https://wa.me/18095011178',
      intro:    'Pickup from the resort lobby. Tap one for dates and times.',
      items: [
        { id: 'cruise', title: 'Sunshine Cruise + Blue Hole', img: 'ex-cruise.jpg',
          line: 'Cenote swim, catamaran & snorkel', price: 'From $95',
          desc: 'Swim in Hoyo Azul, a cenote at the foot of a cliff, then sail the Cap Cana coast by catamaran, snorkel the reef and relax in a natural pool.',
          facts: 'Adults $129 · Kids 3–11 $95 · Under 3 free',
          when: [ ['2026-12-20', 'Pickup 7:45 AM · Resort lobby'], ['2026-12-22', 'Pickup 7:45 AM · Resort lobby'], ['2026-12-22', 'Pickup 12:30 PM · Resort lobby'] ],
          url: 'https://husnabrx.com/product/wild-on-lagoon-exclusive-to-husna-guests/' },
        { id: 'dolphins', title: 'Dolphin Swims', img: 'ex-dolphins.jpg', pos: '60% 40%',
          line: 'Three ways to swim with dolphins', price: '3 options',
          desc: 'From a gentle first encounter for little ones to a full hour with two dolphins. Kids swim with a paying adult.',
          facts: 'Watching is $30, paid on-site',
          when: [ ['2026-12-20', 'Pickup 1:30 PM · Resort lobby'] ],
          options: [
            { title: 'Dolphin Funtastic',  meta: '40 min · All ages',            url: 'https://husnabrx.com/product/dolphin-discovery-encounter-exclusive-to-husna-guests/' },
            { title: 'Dolphin Explorer',   meta: '50 min · Min. height 1.20 m',  url: 'https://husnabrx.com/product/dolphin-discovery-swim-adventure-exclusive-to-husna-guests/' },
            { title: 'Royal S Excellence', meta: '1 hour · Min. height 1.20 m',  url: 'https://husnabrx.com/product/dolphin-discovery-royal-swim-exclusive-to-husna-guests/' }
          ] },
        { id: 'ecopark', title: 'Eco Park', img: 'ex-ecopark.jpg',
          line: 'Animals, horse rides & rafting', price: 'Kids $45',
          desc: 'A full day for the little ones: feeding animals, milking cows, horse and donkey rides, kayaking, bamboo rafting and a visit to a traditional Dominican home.',
          facts: '5 hours · Kids 3–12 $45 · Under 2 free',
          when: [ ['2026-12-21', 'Pickup from 8:40 AM · Resort lobby'] ],
          url: 'https://husnabrx.com/product/mr-eco-park-exclusive-to-husna-guests/' },
        { id: 'horses', title: 'Beach Horses with Sister Sadaf', img: 'ex-horses.jpg', pos: '30% 25%',
          line: 'Beach ride at Rancho Caribeño', price: 'Ages 6+',
          desc: 'Ride along Punta Cana’s beaches with Sister Sadaf at Rancho Caribeño, a short drive from the resort, as the afternoon light settles over the water.',
          facts: '3 hours · Ages 6+ · Safety gear, guides & refreshments',
          when: [ ['2026-12-21', 'Pickup 4:00 PM · Resort lobby'] ],
          url: 'https://husnabrx.com/product/beach-horses/' }
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

  /* excursions: panel + one sheet per excursion, built from CONFIG.excursions · © 2026 Saaima Saleh */
  (function excursions(){
    const X = CONFIG.excursions; if (!X || !X.items) return;
    X.items = X.items.filter(it => !it.hidden); if (!X.items.length) return;
    const IMG = (document.currentScript && document.currentScript.src || 'https://sunnq3.github.io/husna/guest-hub/hub.js').replace(/[^/]*$/, '') + 'img/';
    const esc = v => String(v).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const ico = {
      x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
      back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
      chev: '<svg class="hh-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
      out: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>'
    };
    const DAYS = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
    const day = iso => { const d = new Date(iso + 'T12:00:00'); return { dow: DAYS[d.getDay()], n: d.getDate(),
      full: d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) }; };
    const ext = 'target="_blank" rel="noopener" data-elementor-open-lightbox="no"';

    const panel = `
    <dialog class="hh-full hh-dlg" id="hh-excursions" aria-labelledby="hh-excursions-t">
      <div class="hh-full__head">
        <button class="hh-back" type="button" data-close aria-label="Back">${ico.back}</button>
        <div><span class="hh-eyebrow">Husna exclusive</span><h2 id="hh-excursions-t">Excursions</h2></div>
      </div>
      <div class="hh-dlg__body">
        <p class="hh-lead">${esc(X.intro)}</p>
        <div class="hh-exlist">${X.items.map(it => `
          <button class="hh-exc" type="button" data-open="hh-ex-${it.id}">
            <img src="${IMG + it.img}" alt="" loading="lazy" style="object-position:${it.pos || '50% 50%'}">
            <span class="hh-exc__t"><b>${esc(it.title)}</b><span>${esc(it.line)}</span><em>${esc(it.price)}</em></span>
            ${ico.chev}
          </button>`).join('')}
        </div>
        <p class="hh-exhelp">Questions? <a href="${X.whatsapp}" ${ext}>WhatsApp BRX</a></p>
      </div>
      <div class="hh-full__cta">
        <a class="hh-btn hh-btn--primary" href="${X.book}" ${ext}>Book on husnabrx.com ${ico.out}</a>
      </div>
    </dialog>`;

    const sheet = it => `
    <dialog class="hh-sheet hh-dlg hh-exs" id="hh-ex-${it.id}" data-over aria-labelledby="hh-ex-${it.id}-t">
      <div class="hh-exs__photo">
        <img src="${IMG + it.img}" alt="" loading="lazy" style="object-position:${it.pos || '50% 50%'}">
        <button class="hh-x" type="button" data-close aria-label="Close">${ico.x}</button>
      </div>
      <div class="hh-dlg__body">
        <h2 id="hh-ex-${it.id}-t">${esc(it.title)}</h2>
        <p class="hh-lead">${esc(it.desc)}</p>
        <p class="hh-exs__facts">${esc(it.facts)}</p>
        <span class="hh-eyebrow">When</span>
        <div class="hh-exbox">${it.when.map(([iso, t]) => { const d = day(iso); return `
          <div class="hh-when"><span class="hh-cal"><span>${d.dow}</span><b>${d.n}</b></span><span class="hh-when__t"><b>${d.full}</b><span>${esc(t)}</span></span></div>`; }).join('')}
        </div>
        ${it.options ? `
        <span class="hh-eyebrow">Choose a swim</span>
        <div class="hh-exbox">${it.options.map(o => `
          <a class="hh-slot" href="${o.url}" ${ext}><span><b>${esc(o.title)}</b><span>${esc(o.meta)}</span></span><em>Book ↗</em></a>`).join('')}
        </div>` : `
        <a class="hh-btn hh-btn--primary" href="${it.url}" ${ext}>View &amp; book ${ico.out}</a>`}
      </div>
    </dialog>`;

    root.insertAdjacentHTML('beforeend', panel + X.items.map(sheet).join(''));

    // switch on the Excursions tile (the WordPress markup has it disabled)
    const img = root.querySelector('.hh-tile img[data-src="excursions"]');
    const tile = img && img.closest('.hh-tile');
    if (tile && tile.tagName !== 'BUTTON') {
      const b = document.createElement('button');
      b.type = 'button'; b.className = tile.className; b.dataset.open = 'hh-excursions';
      b.innerHTML = tile.innerHTML; tile.replaceWith(b);
    } else if (tile) { tile.removeAttribute('aria-disabled'); tile.dataset.open = 'hh-excursions'; }
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
     Driven by the URL hash (#faq, #excursions, #ex-horses …), so the phone's back button,
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
  // deep link: /guest-hub#faq, #excursions, #ex-horses
  if (byHash()) { const d = byHash(); history.replaceState(null, '', location.pathname + location.search); openDialog(d.id); }
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
