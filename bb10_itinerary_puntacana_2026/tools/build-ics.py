#!/usr/bin/env python3
"""
BB10 Itinerary · build-ics.py
© 2026 Saaima Saleh. Licensed to Husna Vacations for use on husna.com only. All other rights reserved.

Writes one .ics file per itinerary item into ../ics/, named by the same id the page uses,
so "Add to calendar" can link to a real hosted file (iPhones open those straight into Calendar).
Run after changing data/itinerary.json:   python3 tools/build-ics.py
"""
import json, re, os, datetime, shutil

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
PAGE = 'https://husna.com/itinerary-beach-beyond-punta-cana-2026'

data = json.load(open(os.path.join(ROOT, 'data', 'itinerary.json')))
settings = json.load(open(os.path.join(ROOT, 'data', 'settings.json')))
off = settings.get('timezoneOffset', '-04:00')
sign = 1 if off[0] == '-' else -1
oh, om = map(int, off[1:].split(':'))

def slug(s):
    return re.sub(r'^-|-$', '', re.sub(r'[^a-z0-9]+', '-', str(s).lower()))

def mins(t):
    m = re.match(r'^(\d{1,2}):(\d{2})\s*(AM|PM)$', t or '', re.I)
    if not m: return None
    return (int(m[1]) % 12 + (12 if m[3].upper() == 'PM' else 0)) * 60 + int(m[2])

def stamp(dt):
    return dt.strftime('%Y%m%dT%H%M%SZ')

def utc(date, m):
    base = datetime.datetime.strptime(date, '%Y-%m-%d').replace(tzinfo=datetime.timezone.utc)
    return stamp(base + datetime.timedelta(minutes=m + sign * (oh * 60 + om)))

def clean(v):
    return re.sub(r'([,;\\])', r'\\\1', str(v or '')).replace('\n', '\\n')

out = os.path.join(ROOT, 'ics')
shutil.rmtree(out, ignore_errors=True); os.makedirs(out)
now = stamp(datetime.datetime.now(datetime.timezone.utc))
n = 0
for day in data['days']:
    seen = {}
    for it in day['items']:
        if 'heading' in it: continue
        iid = f"{day['id']}-{slug(it.get('start', ''))}-{slug(it['title'])}"
        while iid in seen: iid += '-2'
        seen[iid] = 1
        s = mins(it.get('start'))
        if s is None: continue
        e = mins(it.get('end')) if it.get('end') else s + 60
        if e <= s: e += 1440
        url = f"{PAGE}#itinerary/{day['id']}/{iid}"
        title = it['title']
        lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Husna Vacations//BB10 Itinerary//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
                 'BEGIN:VEVENT', f'UID:{iid}@bb10.husna.com', f'DTSTAMP:{now}',
                 f"DTSTART:{utc(day['date'], s)}", f"DTEND:{utc(day['date'], e)}", f'SUMMARY:{clean(title)}']
        if it.get('location'): lines.append(f"LOCATION:{clean(it['location'] + ', Nickelodeon Punta Cana')}")
        desc = '\n'.join(x for x in [it.get('note'), it.get('desc'), it.get('ages'), url] if x)
        lines += [f'DESCRIPTION:{clean(desc)}', f'URL:{url}', 'END:VEVENT', 'END:VCALENDAR']
        with open(os.path.join(out, iid + '.ics'), 'w', newline='') as f:
            f.write('\r\n'.join(lines) + '\r\n')
        n += 1
print(f'wrote {n} .ics files to {out}')
