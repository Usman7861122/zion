import { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Group } from '../../data/team';

const ease = [0.22, 1, 0.36, 1] as const;

export default function TeamGroups({ groups }: { groups: Group[] }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const uid = useId();
  const g = groups[i];
  const cols = g.members.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2';

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const n = (i + (e.key === 'ArrowRight' ? 1 : groups.length - 1)) % groups.length;
    setI(n);
    document.getElementById(`${uid}-tab-${n}`)?.focus();
  };

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-16">
      {/* Left: category list */}
      <div className="min-w-0 lg:sticky lg:top-32 lg:self-start">
        <div role="tablist" aria-label="Team groups" onKeyDown={onKey} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
          {groups.map((x, n) => {
            const on = n === i;
            return (
              <button
                key={x.id} id={`${uid}-tab-${n}`} role="tab" type="button" aria-selected={on} aria-controls={`${uid}-panel`} tabIndex={on ? 0 : -1}
                onClick={() => setI(n)}
                className={`group relative flex shrink-0 items-center justify-between gap-4 whitespace-nowrap rounded-lg border px-5 py-3 text-base transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700 lg:rounded-none lg:border-0 lg:border-b lg:border-sand-300/70 lg:bg-transparent lg:px-0 lg:py-5 lg:text-2xl ${on ? 'border-forest-900 bg-forest-900 text-cream-50 lg:text-forest-900' : 'border-sand-300 bg-cream-50 text-ink-muted hover:text-forest-900 lg:text-ink-muted'}`}
              >
                <span className="flex items-center gap-4">
                  <span className={`hidden text-sm tabular-nums lg:inline ${on ? 'text-gold-700' : 'text-ink-muted/70'}`}>{String(n + 1).padStart(2, '0')}</span>
                  {x.label}
                </span>
                <span className="hidden items-center gap-3 lg:flex">
                  <span className="text-sm text-ink-muted">{x.members.length}</span>
                  <span aria-hidden="true" className={`block h-px bg-gold-500 transition-all duration-500 ${on ? 'w-10' : 'w-0 group-hover:w-5'}`} />
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-8 hidden max-w-xs text-ink-muted lg:block" aria-live="polite">{g.blurb}</p>
        <a href="https://zionpt.com/staff/" className="link-arrow mt-8 hidden lg:inline-flex">See the full team</a>
        <div className="relative mt-12 hidden overflow-hidden rounded-xl bg-forest-900 p-8 text-cream-50 lg:block">
          <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute -right-10 -top-10 size-44 rotate-[8deg] text-gold-300 opacity-[0.1]"><path fill="currentColor" d="M50 4 L61.8 36.5 L96.4 37.8 L69.2 59.2 L78.6 92.5 L50 73.5 L21.4 92.5 L30.8 59.2 L3.6 37.8 L38.2 36.5 Z" /></svg>
          <p className="relative text-sm uppercase tracking-[0.18em] text-gold-300">One-on-one care</p>
          <p className="relative mt-3 text-2xl font-light leading-snug">40 minutes with a doctor of physical therapy. Every visit.</p>
          <a href="tel:+12123538693" className="btn-gold relative mt-6">Call (212) 353-8693</a>
        </div>
      </div>

      {/* Right: members */}
      <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${i}`} className="relative min-w-0">
        <AnimatePresence mode="wait">
          <motion.ul
            key={g.id}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease }}
            className={`grid gap-6 sm:grid-cols-2 ${cols}`}
          >
            {g.members.map((m, n) => (
              <li key={m.name} className="flex">
                <article className="group flex w-full flex-col rounded-xl border border-sand-300/70 bg-cream-50 p-3 transition-shadow duration-500 hover:shadow-[0_24px_60px_-30px_rgba(16,33,27,0.35)] sm:p-4">
                  <div className="relative">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-sand-200">
                      <img src={m.photo} alt={`Portrait of ${m.name}`} loading="lazy" decoding="async" width="800" height="1000" className="size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest-950/50 to-transparent" />
                      <span className="absolute left-4 top-4 rounded-md bg-cream-50/90 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-forest-900">{g.id === 'leadership' ? 'Leadership' : g.short}</span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col px-2 pb-2 pt-6 sm:px-3"><div className="flex flex-wrap items-center gap-x-3 gap-y-2"><h3 className="text-2xl text-forest-900">{m.name}</h3>{m.creds.length > 0 && (
                    <ul className="flex flex-wrap gap-1.5" aria-label="Credentials">
                      {m.creds.map((c) => (
                        <li key={c} className="rounded-md border border-sand-300 px-2.5 py-0.5 text-xs text-forest-800">{c}</li>
                      ))}
                    </ul>
                  )}</div>
                  <p className="mt-1 text-sm font-medium uppercase tracking-[0.12em] text-gold-700">{m.role}</p>
                  <p className="mt-4 flex-1 text-ink-muted">{m.bio}</p>
                  </div>
                </article>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
        <a href="https://zionpt.com/staff/" className="link-arrow mt-12 inline-flex lg:hidden">See the full team</a>
      </div>
    </div>
  );
}
