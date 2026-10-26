import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type Loc = { name: string; area: string; lines: string[]; hss: boolean; image: string; maps: string };
type Props = { items: Loc[]; phone: string; phoneHref: string };
const ease = [0.22, 1, 0.36, 1] as const;
const embed = (l: Loc) => `https://www.google.com/maps?q=${encodeURIComponent(l.lines.join(', '))}&z=15&output=embed`;

export default function LocationAtlas({ items, phone, phoneHref }: Props) {
  const [open, setOpen] = useState(0);
  const [zoom, setZoom] = useState(false);
  const reduce = useReducedMotion();
  const cur = items[open];

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setZoom(false);
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [zoom]);

  return (
    <div className="relative rounded-2xl border border-forest-900/10 bg-cream-100 p-4 shadow-[0_40px_80px_-30px_rgba(16,33,27,0.25)] sm:p-6 lg:p-8">
      <div className="grid items-start gap-6 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
        {/* Toggle list */}
        <ul className="space-y-3">
          {items.map((l, i) => {
            const on = open === i;
            return (
              <li
                key={l.name}
                className={`relative overflow-hidden rounded-lg transition-all duration-500 ${on ? 'bg-cream-50 shadow-[0_18px_40px_-18px_rgba(16,33,27,0.35)] ring-1 ring-gold-500/40' : 'bg-cream-50/50 ring-1 ring-forest-900/10 hover:bg-cream-50 hover:shadow-[0_10px_28px_-16px_rgba(16,33,27,0.3)]'}`}
              >
                <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-1 origin-top bg-gold-500 transition-transform duration-500 ${on ? 'scale-y-100' : 'scale-y-0'}`} />
                <h3>
                  <button
                    type="button"
                    aria-expanded={on}
                    aria-controls={`atlas-panel-${i}`}
                    id={`atlas-btn-${i}`}
                    onClick={() => setOpen(i)}
                    className="group flex min-h-[44px] w-full items-center gap-4 px-5 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-gold-500 sm:gap-6 sm:px-7 sm:py-6"
                  >
                    <span className={`w-9 text-lg font-light tabular-nums transition-colors duration-500 ${on ? 'text-gold-700' : 'text-forest-900/40'}`}>{String(i + 1).padStart(2, '0')}</span>
                    <span className="flex-1">
                      <span className="eyebrow block">{l.area}</span>
                      <span className={`mt-1 block text-2xl transition-all duration-500 sm:text-3xl ${on ? 'font-normal' : 'font-light text-forest-900/60 group-hover:translate-x-1 group-hover:text-forest-900'}`}>{l.name}</span>
                    </span>
                    <span aria-hidden="true" className={`grid size-11 shrink-0 place-items-center rounded-lg border transition-all duration-500 ${on ? 'rotate-180 border-gold-500 bg-gold-500 text-cream-50 shadow-md' : 'border-forest-900/25 text-forest-900 group-hover:border-gold-500'}`}>
                      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      id={`atlas-panel-${i}`}
                      role="region"
                      aria-labelledby={`atlas-btn-${i}`}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.6, ease }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-7 pl-[4.5rem] sm:px-7 sm:pb-8 sm:pl-[5.75rem]">
                        <address className="text-lg not-italic text-ink-muted">
                          {l.lines.map((line) => <span key={line} className="block">{line}</span>)}
                        </address>
                        {l.hss && <p className="mt-4 inline-block rounded-md border border-gold-500/50 bg-gold-300/15 px-4 py-1.5 text-sm text-gold-700">HSS Rehabilitation Network location</p>}
                        <div className="mt-6 flex flex-wrap items-center gap-4">
                          <a href={l.maps} target="_blank" rel="noopener noreferrer" className="btn-primary">
                            Get directions<span className="sr-only"> to {l.name} (opens in a new tab)</span>
                          </a>
                          <a href={phoneHref} className="link-arrow">{phone} <span aria-hidden="true">→</span></a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        {/* Map + photo strip */}
        <div className="lg:sticky lg:top-36">
          <div className="relative overflow-hidden rounded-xl bg-sand-200 shadow-[0_30px_60px_-30px_rgba(16,33,27,0.45)] ring-1 ring-forest-900/10">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={cur.name}
                initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.7, ease }}
                className="aspect-[4/3.4] w-full"
              >
                <iframe
                  title={`Map of Zion Physical Therapy, ${cur.name}`}
                  src={embed(cur)}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="size-full border-0 [filter:saturate(0.85)_contrast(1.03)]"
                />
              </motion.div>
            </AnimatePresence>
            <div className="pointer-events-none absolute left-4 top-4 rounded-lg bg-forest-900/90 px-4 py-2 text-sm text-cream-50 shadow-lg backdrop-blur">
              <span className="text-gold-300">●</span> {cur.name}
            </div>
            <a href={cur.maps} target="_blank" rel="noopener noreferrer" className="absolute right-4 top-4 rounded-lg bg-cream-50 px-4 py-2 text-sm font-medium text-forest-900 shadow-lg transition hover:bg-gold-300">
              Open map <span className="sr-only">for {cur.name} (opens in a new tab)</span>↗
            </a>
          </div>

          {/* photo thumbnails */}
          <ul className="mt-4 grid grid-cols-4 gap-3">
            {items.map((l, i) => {
              const on = open === i;
              return (
                <li key={l.name}>
                  <button
                    type="button"
                    onClick={() => (on ? setZoom(true) : setOpen(i))}
                    aria-label={on ? `Enlarge photo of ${l.name}` : `Show ${l.name}`}
                    className={`group relative block aspect-square w-full overflow-hidden rounded-lg ring-2 transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 ${on ? 'ring-gold-500 shadow-lg' : 'opacity-70 ring-transparent hover:opacity-100'}`}
                  >
                    <img src={l.image} alt="" loading="lazy" decoding="async" className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    {on && (
                      <span aria-hidden="true" className="absolute inset-0 grid place-items-center bg-forest-950/35 text-cream-50 opacity-0 transition-opacity group-hover:opacity-100">
                        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-center text-sm text-ink-muted">Tap the highlighted photo to enlarge it.</p>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            role="dialog" aria-modal="true" aria-label={`Photo of ${cur.name}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-forest-950/90 p-4 backdrop-blur-sm"
            onClick={() => setZoom(false)}
          >
            <motion.img
              src={cur.image} alt={`Inside the ${cur.name} clinic`}
              initial={reduce ? false : { scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="max-h-[85vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
            />
            <button type="button" autoFocus onClick={() => setZoom(false)} aria-label="Close photo" className="absolute right-5 top-5 grid size-12 place-items-center rounded-lg bg-cream-50 text-forest-900 shadow-lg">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
