# BB10 Itinerary · Punta Cana 2026

© 2026 Saaima Saleh. Licensed to Husna Vacations for use on husna.com only. All other rights reserved.

The Beach & Beyond 10 guest itinerary (Nickelodeon Punta Cana, Dec 19 – 24, 2026).

- **Live files:** https://sunnq3.github.io/husna/bb10_itinerary_puntacana_2026/
- **WordPress:** paste `itinerary-wordpress.html` into one Elementor HTML widget on an Elementor Canvas page. That's the only time WordPress is touched.
- **Updates:** edit the files in `data/` and push. Data changes show on the page within about a minute; style or script changes within about 5–10 minutes.

## Where things live

| File | What it controls |
|---|---|
| `data/itinerary.json` | Every day and every item, in the order shown. One item per line. |
| `data/signups.json` | The Sign-ups page: competitions grouped Open / Men / Women / Kids (Girls, Boys), with sign-up links. |
| `data/faq.json` | FAQ questions, answers and topic chips. |
| `data/contacts.json` | The Contact page. |
| `data/settings.json` | Category names and colours, shared links (BRX, waiver, spa, booking email), disclaimer, hub link, logo. |
| `itinerary.css` / `itinerary.js` | Look and behaviour. No content in here. |

### Itinerary item fields

```json
{"start": "4:00 PM", "end": "6:00 PM", "title": "3 Point Shoot Out Contest", "cat": "husna",
 "location": "Basketball Court", "ages": "Ages 13+", "note": "…", "link": "excursions", "signup": "three-point", "tbc": true}
```

- `cat`: `husna`, `nick`, `food`, `women`, `sliming`, `hours` (Open Hours)
- `tbc: true` puts a red star on the item and "To be confirmed" in its detail sheet
- `link`: a key from `settings.json → links` (e.g. `excursions`, `waiver`, `nickEmail`, `spa`, `dinnerApp`)
- `signup`: an `id` from `signups.json`. The itinerary item and the Sign-ups page share that one URL
- `{"heading": "Lunch"}` starts a meal group; the food items right after it sit inside it
- Any link with an empty `url` still shows as a link. Paste the URL in and it works

Email links (`nickEmail`) open the guest's mail app with the address, subject "Husna Guest" and a short message (event, day, time) filled in.

## Decisions made when converting the Excel (Oct 19, 2026; updated Oct 26 from the commented copy)

Left off the guest page: "Notes for Nick" and "Task" columns, dark-blue and red rows (volunteer meetings, booth shifts, set-up, show run-sheet), the Friday Dec 18 team tab, Team Info, ATTN Overview, Sheet4.

Red star (to be confirmed):
- Sunday 10:45 Morning Session (sheet says TBC for the title). Holistically Muslim stays Tue & Wed; removed from Mon (red row). The three pre-show slots are now named (Harmony & Noor / Kids Game Show / Nasheed Karaoke) and no longer starred
- Baba's Village, Illusion Show, Up Close & Personal (teen program), Kids Table Tennis Tournament (yellow)
- The Husna Night Show: Newlywed Show (Sun) and Grand Finale (Wed, time in red)
- BRX Excursions Table (cells say 8 AM – 6 PM, text says 7 AM – 7 PM)
- Men's Fastest Swimmer Contest (location Infinity Pool taken from Sheet4)
- It's Pizza Time (Sun) and Meet & Greet Santiago of the Seas (sheet: confirm)
- Isha · Second Jama'ah (Sat) and Husna Table (Thu): location TBD

Wording: "Ladies" → "Women" everywhere (Ladies Only Pool → Women's Pool); "Sisters' Move N Improve" kept (business name). Club Nick → Nickelodeon Place. Sweetery filed under Food. Night show titles from the Night Shows tab, then from the Oct 26 sheet (Mon: Giveback Night with HCI; Tue: Theatrical Night). Sunday's Sunshine Cruise kept at 7:45 AM (the sheet blanked the time; the Oct 23 email says 7:45). Oct 28 edits doc: Fitness Center hours rewritten (Sun/Mon: all 6–8 AM, women 8 AM–7 PM, men 7–10 PM; Tue/Wed: all 6–8 AM & 7–11 PM, men 8 AM–12 PM, women 1–7 PM) and the separate women-only / men-only fitness slots dropped; Move N Improve now Sunday only; Morning Session (TBC) on Sun, Tue, Wed; night shows Sat Welcome to Dominican Tropical Beach Party, Mon Theatrical Night, Tue Palestine Night (Giveback Night with HCI dropped), Wed Harmony & Noor 8:30 then Grand Finale 9–10 PM; Up Close & Personal removed.

Not on any day yet (from ATTN Overview): Ustadh Ubaydullah Evans' spiritual sessions, Under the Stars, Marriage Retreat sessions, Super Hijabi.

Placeholders waiting for links: competition sign-up forms, spa booking, dinner app, on-site team phone / WhatsApp, (hub link set to https://husna.com/beach-beyond-punta-cana-2026-dashboard/).
