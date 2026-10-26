import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type T = { name: string; text: string };

export default function Testimonials({ items }: { items: T[] }) {
  const [i, setI] = useState(0);
  const go = (n: number) => setI((n + items.length) % items.length);
  const t = items[i];

  return (
    <div>
      <div className="relative min-h-[22rem] sm:min-h-[19rem]" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="flex justify-center gap-1 text-gold-300" role="img" aria-label="5 out of 5 stars">
              {'★★★★★'.split('').map((s, k) => <span key={k} aria-hidden="true" className="text-xl">{s}</span>)}
            </div>
            <blockquote className="mt-8 text-2xl font-light leading-snug text-cream-50 sm:text-[2rem]">“{t.text}”</blockquote>
            <figcaption className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-gold-300">{t.name}</figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button type="button" onClick={() => go(i - 1)} aria-label="Previous review" className="grid size-12 place-items-center rounded-lg border border-cream-50/30 text-cream-50 transition-colors hover:border-gold-300 hover:text-gold-300">←</button>
        <div className="flex gap-2">
          {items.map((_, k) => (
            <button key={k} type="button" onClick={() => setI(k)} aria-label={`Show review ${k + 1}`} aria-current={k === i} className="grid size-6 place-items-center">
              <span className={`block h-px transition-all duration-300 ${k === i ? 'w-8 bg-gold-300' : 'w-4 bg-cream-50/40'}`} />
            </button>
          ))}
        </div>
        <button type="button" onClick={() => go(i + 1)} aria-label="Next review" className="grid size-12 place-items-center rounded-lg border border-cream-50/30 text-cream-50 transition-colors hover:border-gold-300 hover:text-gold-300">→</button>
      </div>
    </div>
  );
}
