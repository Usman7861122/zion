import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type Loc = { name: string; area: string; lines: string[]; hss: boolean; image: string; maps: string };
type Props = { items: Loc[]; phone: string; phoneHref: string };
const ease = [0.22, 1, 0.36, 1] as const;

export default function LocationToggle({ items, phone, phoneHref }: Props) {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();
  const d = reduce ? 0 : 0.6;

  return (
    <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-20">
      {/* Toggle list */}
      <ul className="border-t border-forest-900/15 lg:order-1">
        {items.map((l, i) => {
          const on = open === i;
          return (
            <li key={l.name} className="border-b border-forest-900/15">
              <h3>
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={`loc-panel-${i}`}
                  id={`loc-btn-${i}`}
                  onClick={() => setOpen(i)}
                  className="group flex min-h-[44px] w-full items-center gap-5 py-7 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500 sm:gap-8 sm:py-8"
                >
                  <span className={`w-10 text-lg font-light tabular-nums transition-colors duration-500 ${on ? 'text-gold-700' : 'text-forest-900/40'}`}>{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex-1">
                    <span className="eyebrow block">{l.area}</span>
                    <span className={`mt-1 block text-2xl transition-all duration-500 sm:text-4xl ${on ? 'translate-x-0 font-normal' : 'font-light text-forest-900/55 group-hover:translate-x-1 group-hover:text-forest-900'}`}>{l.name}</span>
                  </span>
                  <span aria-hidden="true" className={`grid size-11 shrink-0 place-items-center rounded-lg border transition-all duration-500 ${on ? 'rotate-180 border-gold-500 bg-gold-500 text-cream-50' : 'border-forest-900/25 text-forest-900 group-hover:border-gold-500'}`}>
                    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    id={`loc-panel-${i}`}
                    role="region"
                    aria-labelledby={`loc-btn-${i}`}
                    key="panel"
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: d, ease }}
                    className="overflow-hidden"
                  >
                    <div className="pb-9 pl-[3.75rem] sm:pl-[4.5rem]">
                      <address className="text-lg not-italic text-ink-muted">
                        {l.lines.map((line) => <span key={line} className="block">{line}</span>)}
                      </address>
                      {l.hss && <p className="mt-4 inline-block rounded-md border border-gold-500/50 px-4 py-1.5 text-sm text-gold-700">HSS Rehabilitation Network location</p>}
                      <div className="mt-6 flex flex-wrap items-center gap-4">
                        <a href={l.maps} target="_blank" rel="noopener noreferrer" className="btn-primary">
                          Get directions<span className="sr-only"> to {l.name} (opens in a new tab)</span>
                        </a>
                        <a href={phoneHref} className="link-arrow">{phone} <span aria-hidden="true">→</span></a>
                      </div>
                      {/* photo inside the panel on small screens */}
                      <div className="mt-7 aspect-square overflow-hidden rounded-xl lg:hidden">
                        <img src={l.image} alt={`Inside the ${l.name} clinic`} width="900" height="900" loading="lazy" decoding="async" className="size-full object-cover" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      {/* Photo (desktop) */}
      <div className="relative hidden aspect-square overflow-hidden rounded-xl bg-sand-200 lg:order-2 lg:block lg:sticky lg:top-40">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img
            key={items[open].image}
            src={items[open].image}
            alt={`Inside the ${items[open].name} clinic`}
            width="900" height="900" decoding="async"
            initial={reduce ? false : { opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.9, ease }}
            className="absolute inset-0 size-full object-cover"
          />
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950/55 via-transparent to-transparent" />
        <p className="absolute bottom-6 left-6 rounded-lg bg-cream-50/90 px-4 py-2 text-sm text-forest-900 backdrop-blur">{items[open].name}</p>
      </div>
    </div>
  );
}
