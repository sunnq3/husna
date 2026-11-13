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
      { title: 'Special guests announcement',     date: 'Nov 7',  added: '2026-11-07', url: 'http://eepurl.com/CaUkaMZ1he' },
      { title: 'The Vassa Spa',                   date: 'Nov 1',  added: '2026-11-01', url: 'http://eepurl.com/JR2M6Ythip' },
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

    // FAQ (FAQ button). Rendered by JS and replaces whatever is pasted in WordPress. Edit here; no WordPress change needed.
    faq: [
      { q: 'Will the entire resort be exclusive to Husna guests?', a: 'Yes. Only Husna guests and resort staff will be present for December 19\u201324, 2026.' },
      { q: 'Do we have to pay for food?', a: 'No. All-you-can-eat halal is included at every restaurant, pop-up, caf\u00e9, buffet and snack bar. Specialty items like lobster, tomahawk, private beach dinners and custom cakes are extra.' },
      { q: 'Is it always halal or only for these dates?', a: 'Only for our dates, December 19\u201324, 2026. After that the resort returns to normal operations.' },
      { q: 'Are flights included?', a: 'No. Flights and airport transfers are not included.' },
      { q: 'Are the rates per night or for the whole stay?', a: 'They cover the entire 5 nights. They are not per-night rates.' },
      { q: 'What airport should I fly into?', a: 'Punta Cana International Airport (PUJ). Recommended arrival on December 19 is between 3:00 PM and 5:00 PM.' },
      { q: 'Is babysitting available?', a: 'Yes. $25 per hour for one child and $10 per hour for each additional child.' },
      { q: 'Is there a doctor at the resort?', a: 'Yes, there is a medical clinic on site. A doctor\u2019s consultation is $180, excluding medication, and the rate goes up outside normal hours (9 AM \u2013 6 PM). Depending on your travel insurance, the consultation may be covered, so keep your policy details handy.' },
      { q: 'Is it suitable for senior guests?', a: 'Absolutely, as long as they are mobile. Husna welcomes seniors every year.' },
      { q: 'Is there a private pool for sisters?', a: 'There are two main pools; the second is dedicated to sisters. Neither is fully enclosed, so not private enough to remove hijab.' },
      { q: 'Can we tip in USD?', a: 'Yes. USD tips are preferred and guests are encouraged to tip generously.' }
    ],

    // Vassa Spa panel (Vassa Spa tile), from the Nov 1 spa email. Built by JS; no WordPress change needed.
    spa: {
      email:    'madrian@nick-resorts.com',
      subject:  'Husna Group Spa Booking | HUSNA ID: ',
      menu:     'https://vassa.bitrix24.site/ndr/eng/',
      deadline: 'December 18, 2026',
      intro:    'Between the beach days and the family fun, there is time set aside just for you. The Vassa Spa at the resort has two Husna-only packages and dedicated ladies-only and men-only days.',
      offer:    { title: '20% off all spa menu services', sub: 'Book and pay by December 18, 2026. Every pre-booked treatment is also entered to win up to $150 off.' },
      packages: [
        { title: 'The Husna Spa Package', price: 'USD 470', meta: '4 treatments \u00b7 one guest',
          items: ['50-min Deep Tissue Massage', '50-min Vitamin C Facial', '50-min Citrus Scrub', 'Classic Pedicure'] },
        { title: 'The Mother & Daughter Escape', price: 'USD 450', meta: 'For two \u00b7 perfect for Mommy & Me Day',
          items: ['2 \u00d7 50-min Relaxing Massages', '2 \u00d7 25-min Refreshing Facials', '2 Classic Manicures'] }
      ],
      week: [
        ['2026-12-19', 'Open to everyone', '8 AM \u2013 7 PM'],
        ['2026-12-20', 'Ladies only (18+)', '8 AM \u2013 7 PM'],
        ['2026-12-21', 'Mommy & Me', '8 AM \u2013 7 PM \u00b7 ladies of all ages, under 18s with an adult'],
        ['2026-12-22', 'Men only, then ladies only (18+)', 'Men 8 AM \u2013 12 PM \u00b7 Ladies 1 \u2013 7 PM'],
        ['2026-12-23', 'Men only, then everyone', 'Men 8 AM \u2013 12 PM \u00b7 Everyone 12 \u2013 7 PM'],
        ['2026-12-24', 'Open to everyone', '8 AM \u2013 7 PM']
      ],
      steps: [
        'Choose a Husna package or browse the spa menu and price list.',
        'Email Milena Adrian Ponce at madrian@nick-resorts.com with \u201cHusna Group\u201d and your HUSNA ID number in the subject line.',
        'Share your treatments, preferred day and time, number of guests, and whether you would like a female or male therapist.'
      ],
      notes: [
        'The 20% discount only applies to spa menu services booked and paid by December 18, 2026.',
        'Arrive early to enjoy the hydrotherapy circuit included with your treatment, and bring modest swimwear.',
        'Changes need at least 24 hours\u2019 notice; late cancellations and no-shows may be charged.',
        'Let the spa know about any pregnancy, allergies or health conditions when you book.'
      ]
    },

    // Resort extras panel (Nickelodeon Extras tile). Built by JS; no WordPress change needed.
    extras: {
      email: 'jesantos@nick-resorts.com', subject: 'Husna Guest HS-1XXX/D26', emailUrl: 'http://eepurl.com/BPJ4-0xjDc',
      groups: [
        { name: 'Birthdays', items: [['Birthday cake', 'from $35'], ['SpongeBob cake', 'from $80'], ['Balloon arrangement', 'from $25'], ['Themed birthday package', 'from $200'], ['Pajama Jam character breakfast', '$70 adult \u00b7 $50 child']] },
        { name: 'Anniversaries & curated dining', items: [['Candlelight beach dinner', '$300 / couple'], ['Chef\u2019s table experience', '$70 adult \u00b7 $35 child']] },
        { name: 'Group & family experiences', items: [['TMNT pizza experience', '$40 adult \u00b7 $35 child'], ['Private sliming (up to 6)', '$59'], ['Family sunset BBQ', '$99 adult \u00b7 $55 child'], ['Private meet & greet', 'from $99'], ['Meet SpongeBob at Pineapple Villa', '$150']] },
        { name: 'Vacation treats', items: [['Floating breakfast', '$25 / adult'], ['Bali beds on the beach', 'from $80'], ['Special lobster dinner', 'from $59'], ['Premium cuts / tomahawk', 'from $70']] },
        { name: 'Babysitting', items: [['On-site, $25 per hour for one child, $10 per hour for each additional child.', '']] }
      ]
    },

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
        { name: 'Medical clinic', role: 'On site at the resort',
          for: ['Doctor\u2019s consultation $180, excluding medication', 'Open 9 AM \u2013 6 PM; higher rate outside these hours', 'May be covered by your travel insurance'],
          note: 'Ask the front desk or your building\u2019s Gazebo concierge to reach the clinic.',
          rows: [] },
        { name: 'Vassa Spa', role: 'Milena Adrian Ponce',
          for: ['All bookings & enquiries', 'Husna packages', '20% off when you book & pay by Dec 18'],
          note: 'Put \u201cHusna Group\u201d and your HUSNA ID in the subject line.',
          rows: [ { kind: 'email', label: 'Email', sub: 'madrian@nick-resorts.com', to: 'madrian@nick-resorts.com', subject: 'Husna Group Spa Booking | HUSNA ID: ' } ] },
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

  /* competitions tile → the itinerary's Sign-ups page (the WordPress markup has it disabled) · © 2026 Saaima Saleh */
  (function competitions(){
    const img = root.querySelector('.hh-tile img[data-src="competitions"]');
    const tile = img && img.closest('.hh-tile');
    if (!tile || !CONFIG.itinerary) return;
    const a = document.createElement('a');
    a.href = CONFIG.itinerary.replace(/\/?$/, '') + '#signups'; a.className = tile.className;
    a.innerHTML = tile.innerHTML; tile.replaceWith(a);
  })();

  /* panels the WordPress snippet may be missing (a paste that got cut short lost FAQ, Extras and Maps once):
     FAQ shell, Resort extras and Maps are (re)built here from CONFIG, so the snippet only has to carry the tiles · © 2026 Saaima Saleh */
  (function ensurePanels(){
    const esc = v => String(v).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const back = '<button class="hh-back" type="button" data-close aria-label="Back"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg></button>';
    const put = (id, html) => { const old = document.getElementById(id); if (old) old.outerHTML = html; else root.insertAdjacentHTML('beforeend', html); };
    if (!document.getElementById('hh-faq')) root.insertAdjacentHTML('beforeend', `
    <dialog class="hh-full hh-dlg" id="hh-faq" aria-labelledby="hh-faq-t">
      <div class="hh-full__head">${back}<div><span class="hh-eyebrow">Need help</span><h2 id="hh-faq-t">Frequently asked questions</h2></div></div>
      <div class="hh-dlg__body hh-faq" style="gap:0"></div>
    </dialog>`);
    const X = CONFIG.extras;
    if (X) put('hh-extras', `
    <dialog class="hh-full hh-dlg" id="hh-extras" aria-labelledby="hh-extras-t">
      <div class="hh-full__head">${back}<div><span class="hh-eyebrow">Not included</span><h2 id="hh-extras-t">Resort extras</h2></div></div>
      <div class="hh-dlg__body">
        <p class="hh-lead">Optional, paid separately. Email the resort to reserve. <a href="${X.emailUrl}" target="_blank" rel="noopener" style="color:var(--blue-deep);font-weight:400;white-space:nowrap">See the full email \u2197</a></p>
        ${X.groups.map(g => `<div class="hh-stack" style="gap:6px"><span class="hh-eyebrow">${esc(g.name)}</span><div class="hh-list">${g.items.map(([a, b]) => `<div><span>${esc(a)}</span>${b ? `<b>${esc(b)}</b>` : ''}</div>`).join('')}</div></div>`).join('')}
      </div>
      <div class="hh-full__cta">
        <a class="hh-btn hh-btn--primary" href="mailto:${X.email}?subject=${encodeURIComponent(X.subject)}">Email the resort to book</a>
        <span>Put your Husna ID (HS-1XXX/D26) in the subject line.</span>
      </div>
    </dialog>`);
    put('hh-maps', `
    <dialog class="hh-full hh-dlg hh-maps" id="hh-maps" aria-labelledby="hh-maps-t">
      <div class="hh-full__head">
        <button class="hh-x" type="button" data-close aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
        <h2 id="hh-maps-t">Resort maps</h2><span style="width:32px"></span>
      </div>
      <div class="hh-tabs" role="tablist" id="hh-map-tabs">
        <button type="button" role="tab" aria-selected="true" data-map="0">Map 1 \u00b7 Resort</button>
        <button type="button" role="tab" aria-selected="false" data-map="1">Map 2 \u00b7 Detail</button>
      </div>
      <div class="hh-zoom" id="hh-zoom"><img id="hh-map-img" alt="Resort map" draggable="false"></div>
      <div class="hh-full__cta">
        <a class="hh-btn hh-btn--outline" id="hh-map-full" href="#" target="_blank" rel="noopener" data-elementor-open-lightbox="no" data-elementor-lightbox-disable="true">Open full-size image</a>
        <span>Pinch or scroll to zoom \u00b7 drag to pan \u00b7 double-tap to reset</span>
      </div>
    </dialog>`);
    // tiles for these panels may also be missing their buttons: make sure each tile opens its panel
    [['extras', 'hh-extras'], ['maps', 'hh-maps']].forEach(([src, id]) => {
      const img = root.querySelector(`.hh-tile img[data-src="${src}"]`); const tile = img && img.closest('.hh-tile');
      if (tile && tile.tagName !== 'BUTTON') { const b = document.createElement('button'); b.type = 'button'; b.className = tile.className; b.dataset.open = id; b.innerHTML = tile.innerHTML; tile.replaceWith(b); }
    });
  })();

  /* FAQ: rendered from CONFIG.faq, replacing the pasted list · © 2026 Saaima Saleh */
  (function faq(){
    const list = root.querySelector('#hh-faq .hh-faq'); const F = CONFIG.faq;
    if (!list || !F || !F.length) return;
    const esc = v => String(v).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const chev = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>';
    list.innerHTML = F.map((f, i) => `<details name="hh-faq"${i ? '' : ' open'}><summary>${esc(f.q)}${chev}</summary><p>${esc(f.a)}</p></details>`).join('');
  })();

  /* Vassa Spa: panel built from CONFIG.spa · © 2026 Saaima Saleh */
  (function spa(){
    const P = CONFIG.spa; const img0 = root.querySelector('.hh-tile img[data-src="spa"]');
    const tile = img0 && img0.closest('.hh-tile'); if (!P || !tile) return;
    const esc = v => String(v).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const back = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>';
    const out = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>';
    const mail = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 7l9 6 9-6"/></svg>';
    const tick = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
    const DAYS = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
    const day = iso => { const d = new Date(iso + 'T12:00:00'); return { dow: DAYS[d.getDay()], n: d.getDate() }; };
    const mailto = `mailto:${P.email}?subject=${encodeURIComponent(P.subject)}`;
    const ext = 'target="_blank" rel="noopener" data-elementor-open-lightbox="no"';
    const linkify = t => esc(t).replace(/([\w.+-]+@[\w-]+\.[\w.-]+\w)/g, `<a href="${mailto}">$1</a>`);
    root.insertAdjacentHTML('beforeend', `
    <dialog class="hh-full hh-dlg hh-spa" id="hh-spa" aria-labelledby="hh-spa-t">
      <div class="hh-full__head">
        <button class="hh-back" type="button" data-close aria-label="Back">${back}</button>
        <div><span class="hh-eyebrow">Nickelodeon Resort</span><h2 id="hh-spa-t">Vassa Spa</h2></div>
      </div>
      <div class="hh-dlg__body">
        <div class="hh-spa__photo"><img src="${CONFIG.img.spa}" alt=""></div>
        <p class="hh-lead">${esc(P.intro)}</p>
        <div class="hh-offer"><span class="hh-eyebrow">Husna guest offer</span><b>${esc(P.offer.title)}</b><span>${esc(P.offer.sub)}</span></div>

        <span class="hh-eyebrow">Exclusive Husna packages</span>
        <div class="hh-pkgs">${P.packages.map(k => `
          <div class="hh-pkg">
            <div class="hh-pkg__head"><div><b>${esc(k.title)}</b><span>${esc(k.meta)}</span></div><em>${esc(k.price)}</em></div>
            <ul>${k.items.map(i => `<li>${tick}${esc(i)}</li>`).join('')}</ul>
            <a class="hh-btn hh-btn--outline" href="${mailto}">Book this package ${mail}</a>
          </div>`).join('')}
        </div>
        <p class="hh-exhelp">Prefer to choose your own? <a href="${P.menu}" ${ext}>See the full spa menu &amp; price list ↗</a></p>

        <span class="hh-eyebrow">Your spa week at a glance</span>
        <div class="hh-exbox">${P.week.map(([iso, who, when]) => { const d = day(iso); return `
          <div class="hh-when"><span class="hh-cal"><span>${d.dow}</span><b>${d.n}</b></span><span class="hh-when__t"><b>${esc(who)}</b><span>${esc(when)}</span></span></div>`; }).join('')}
        </div>

        <span class="hh-eyebrow">How to book</span>
        <ol class="hh-steps">${P.steps.map(t => `<li><span>${linkify(t)}</span></li>`).join('')}</ol>

        <span class="hh-eyebrow">Good to know</span>
        <ul class="hh-notes">${P.notes.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
        <p class="hh-exhelp">All spa enquiries and bookings go to Milena Adrian Ponce · <a href="${mailto}">${esc(P.email)}</a></p>
      </div>
      <div class="hh-full__cta">
        <a class="hh-btn hh-btn--primary" href="${mailto}">Email the spa to book ${mail}</a>
      </div>
    </dialog>`);
    const b = document.createElement('button');
    b.type = 'button'; b.className = tile.className; b.dataset.open = 'hh-spa';
    b.innerHTML = tile.innerHTML; tile.replaceWith(b);
    b.querySelector('.hh-tile__txt span').textContent = '20% off';
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
        ${g.rows && g.rows.length ? `<div class="hh-rows">${g.rows.map(row).join('')}</div>` : ''}
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
