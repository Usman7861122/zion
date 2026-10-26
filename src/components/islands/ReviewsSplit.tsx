import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

type T = { name: string; text: string };
const ease = [0.22, 1, 0.36, 1] as const;

export default function TestimonialsSplit({ items, photo }: { items: T[]; photo: string }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const go = (n: number) => setI((n + items.length) % items.length);
  const t = items[i];
  const initial = t.name.trim().charAt(0).toUpperCase();

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-7%', '7%']);
  const cardY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [24, -24]);

  useEffect(() => {
    if (reduce || paused) return;
    const id = setTimeout(() => setI((n) => (n + 1) % items.length), 9000);
    return () => clearTimeout(id);
  }, [i, paused, reduce, items.length]);

  return (
    <div ref={wrap} className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
      {/* Photo */}
      <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
        <div aria-hidden="true" className="absolute -left-4 -top-4 size-full rounded-xl border border-gold-700/30 sm:-left-6 sm:-top-6" />
        <div className="relative aspect-square overflow-hidden rounded-xl bg-forest-800 shadow-[0_50px_90px_-35px_rgba(16,33,27,0.55)]">
          <motion.img
            src={photo}
            alt="A smiling therapist guiding an older patient through a shoulder stretch"
            width="1600" height="1600" loading="lazy" decoding="async"
            style={{ y: imgY }}
            className="absolute inset-x-0 -top-[7%] h-[114%] w-full object-cover object-[35%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/55 via-transparent to-transparent" />
        </div>
        <motion.div
          style={{ y: cardY }}
          className="absolute -bottom-7 right-4 flex items-center gap-4 rounded-lg border border-cream-50/15 bg-forest-900/90 px-5 py-4 shadow-2xl backdrop-blur-md sm:-right-6"
        >
          <span>
            <span className="block text-xl tracking-wider text-gold-300" role="img" aria-label="5 out of 5 stars"><span aria-hidden="true">★★★★★</span></span>
            <span className="mt-1 block text-sm text-sand-200">Five-star patient reviews</span>
          </span>
        </motion.div>
      </div>

      {/* Reviews */}
      <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} className="relative pt-8 lg:pt-0">
        <svg aria-hidden="true" viewBox="0 0 64 48" className="absolute right-0 top-0 h-16 w-20 text-gold-700/20 sm:h-24 sm:w-32"><path fill="currentColor" d="M0 48V28C0 12 8 2 24 0l2 8C18 10 14 15 14 22h12v26H0zm38 0V28C38 12 46 2 62 0l2 8c-8 2-12 7-12 14h12v26H38z" /></svg>
        <div className="relative">
          <p className="eyebrow">What our clients say</p>
          <h2 className="mt-5 max-w-md text-balance text-4xl text-forest-900 sm:text-5xl">Trusted by people like you</h2>

          <div className="mt-10 min-h-[17rem] sm:min-h-[15rem]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                initial={reduce ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
                transition={{ duration: 0.5, ease }}
              >
                <blockquote className="text-xl font-light leading-relaxed text-forest-900 sm:text-2xl">“{t.text}”</blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span aria-hidden="true" className="grid size-12 place-items-center rounded-full bg-forest-900 text-lg font-semibold text-gold-300">{initial}</span>
                  <span>
                    <span className="block text-sm font-semibold uppercase tracking-[0.22em] text-gold-700">{t.name}</span>
                    <span className="mt-1 block text-sm text-ink-muted">Patient review</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center gap-6">
            <button type="button" onClick={() => go(i - 1)} aria-label="Previous review" className="grid size-12 place-items-center rounded-lg border border-forest-900/30 text-forest-900 transition-colors hover:border-forest-900 hover:bg-forest-900 hover:text-cream-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500">←</button>
            <button type="button" onClick={() => go(i + 1)} aria-label="Next review" className="grid size-12 place-items-center rounded-lg border border-forest-900/30 text-forest-900 transition-colors hover:border-forest-900 hover:bg-forest-900 hover:text-cream-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500">→</button>
            <div className="flex flex-1 items-center gap-2">
              {items.map((_, k) => (
                <button key={k} type="button" onClick={() => setI(k)} aria-label={`Show review ${k + 1}`} aria-current={k === i} className="group grid h-6 flex-1 items-center">
                  <span className="relative block h-px w-full bg-forest-900/20">
                    <span className={`absolute inset-y-0 left-0 block h-px bg-gold-700 transition-all duration-500 ${k === i ? 'w-full' : 'w-0'}`} />
                  </span>
                </button>
              ))}
            </div>
            <span className="text-sm tabular-nums text-ink-muted">{String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
