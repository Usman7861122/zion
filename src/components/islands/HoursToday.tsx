import { useEffect, useState } from 'react';

type Day = { day: string; open?: string; close?: string };

const fmt = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return `${((h + 11) % 12) + 1}${m ? ':' + String(m).padStart(2, '0') : ''} ${h < 12 ? 'AM' : 'PM'}`;
};
const mins = (t: string) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };

/** Opening hours. The row for today is highlighted, using the clinic's own time zone. */
export default function HoursToday({ hours, timezone }: { hours: Day[]; timezone: string }) {
  const [now, setNow] = useState<{ idx: number; min: number } | null>(null);

  useEffect(() => {
    const tick = () => {
      const parts = new Intl.DateTimeFormat('en-US', { timeZone: timezone, weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
      const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
      const idx = hours.findIndex((d) => d.day === get('weekday'));
      setNow({ idx, min: (Number(get('hour')) % 24) * 60 + Number(get('minute')) });
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, [hours, timezone]);

  let status: { open: boolean; text: string } | null = null;
  if (now && now.idx >= 0) {
    const d = hours[now.idx];
    if (d.open && d.close && now.min >= mins(d.open) && now.min < mins(d.close)) status = { open: true, text: `Open now · closes at ${fmt(d.close)}` };
    else {
      let next = '';
      for (let i = 0; i < 7; i++) {
        const j = (now.idx + i) % 7, n = hours[j];
        if (!n.open) continue;
        if (i === 0 && now.min >= mins(n.open)) continue;
        next = `${i === 0 ? 'today' : i === 1 ? 'tomorrow' : n.day} at ${fmt(n.open)}`;
        break;
      }
      status = { open: false, text: `Closed now${next ? ` · opens ${next}` : ''}` };
    }
  }

  return (
    <div>
      <p aria-live="polite" className={`inline-flex min-h-8 items-center gap-2 rounded-md px-3 py-1 text-sm font-medium ${status ? (status.open ? 'bg-forest-900 text-gold-300' : 'bg-sand-200 text-forest-900') : 'invisible'}`}>
        <span aria-hidden="true" className={`size-2 rounded-full ${status?.open ? 'bg-gold-300' : 'bg-forest-900/40'}`} />
        {status?.text ?? 'Checking hours'}
      </p>
      <ul className="mt-6 border-t border-forest-900/15">
        {hours.map((d, i) => {
          const today = now?.idx === i;
          return (
            <li key={d.day} aria-current={today ? 'date' : undefined} className={`flex items-center justify-between gap-4 border-b border-forest-900/15 px-3 py-4 transition-colors ${today ? 'rounded-lg bg-gold-300/25' : ''}`}>
              <span className="flex items-center gap-3 text-lg text-forest-900">
                {d.day}
                {today && <span className="rounded-md bg-forest-900 px-2 py-0.5 text-xs font-medium uppercase tracking-[0.14em] text-gold-300">Today</span>}
              </span>
              <span className={`text-lg tabular-nums ${d.open ? 'text-forest-900' : 'text-ink-muted'}`}>{d.open && d.close ? `${fmt(d.open)} – ${fmt(d.close)}` : 'Closed'}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
