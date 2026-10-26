import { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

type Item = { n: string; title: string; text: string; chips?: string[] };
const ease = [0.22, 1, 0.36, 1] as const;

function Row({ item, i, active, dim, onActive }: { item: Item; i: number; active: boolean; dim: boolean; onActive: (on: boolean) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const centered = useInView(ref, { margin: '-40% 0px -40% 0px' });
  const shown = useInView(ref, { once: true, margin: '-12% 0px' });

  const onMove = (e: React.PointerEvent<HTMLLIElement>) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const hot = active || (centered && !dim);
  const t = (d: number) => ({ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : d, ease });

  return (
    <li
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={(e) => e.pointerType === 'mouse' && onActive(true)}
      onPointerLeave={() => onActive(false)}
      className="group relative overflow-hidden"
      style={{ ['--mx' as string]: '50%', ['--my' as string]: '50%' }}
    >
      {/* top line draws in */}
      <motion.div
        className="absolute inset-x-0 top-0 h-px origin-left bg-cream-50/20"
        initial={{ scaleX: reduce ? 1 : 0 }}
        animate={{ scaleX: shown ? 1 : reduce ? 1 : 0 }}
        transition={t(0.05 * i)}
      />
      {/* mouse spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(420px circle at var(--mx) var(--my), rgba(214,193,119,0.14), transparent 65%)' }}
      />
      {/* fills in on hover */}
      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-cream-50/[0.03] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />

      <motion.div
        animate={{ opacity: hot || !dim ? 1 : 0.4 }}
        transition={{ duration: 0.5 }}
        className="relative grid gap-3 py-9 pr-2 sm:pr-6 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 sm:grid-cols-[4.5rem_1fr_auto] sm:gap-6 sm:py-11"
      >
        <motion.span
          initial={{ opacity: reduce ? 1 : 0, x: reduce ? 0 : -16 }}
          animate={shown ? { opacity: 1, x: 0 } : undefined}
          transition={t(0.1 + 0.05 * i)}
          className={`text-3xl font-light tabular-nums transition-colors duration-500 sm:text-4xl ${hot ? 'text-gold-300' : 'text-gold-400/70'} group-hover:text-gold-300`}
        >
          {item.n}
        </motion.span>

        <div>
          <div className="overflow-hidden pb-1">
            <motion.h3
              initial={{ y: reduce ? 0 : '110%' }}
              animate={shown ? { y: 0 } : undefined}
              transition={t(0.15 + 0.05 * i)}
              className="text-2xl font-normal sm:text-3xl"
            >
              {item.title}
            </motion.h3>
          </div>
          <motion.p
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 14 }}
            animate={shown ? { opacity: 1, y: 0 } : undefined}
            transition={t(0.3 + 0.05 * i)}
            className="mt-3 max-w-lg text-sand-200"
          >
            {item.text}
          </motion.p>
          {item.chips && (
            <ul className="mt-5 flex flex-wrap gap-3">
              {item.chips.map((c, ci) => (
                <motion.li
                  key={c}
                  initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.85 }}
                  animate={shown ? { opacity: 1, scale: 1 } : undefined}
                  transition={t(0.5 + ci * 0.1)}
                  className="rounded-md border border-gold-300/50 px-4 py-1.5 text-sm text-gold-300 transition-colors duration-300 hover:bg-gold-300 hover:text-forest-950"
                >
                  {c}
                </motion.li>
              ))}
            </ul>
          )}
        </div>

        {/* arrow button */}
        <a
          href="#contact"
          aria-label={`Ask about ${item.title}`}
          className="hidden size-14 shrink-0 items-center justify-center self-center rounded-lg border border-cream-50/25 text-cream-50 transition-all duration-500 hover:bg-gold-300 hover:text-forest-950 focus-visible:bg-gold-300 focus-visible:text-forest-950 group-hover:border-gold-300 sm:flex"
        >
          <svg viewBox="0 0 24 24" className="size-5 -rotate-45 transition-transform duration-500 group-hover:rotate-0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </motion.div>
    </li>
  );
}

export default function FocusList({ items }: { items: Item[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start 75%', 'end 40%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const orbY = useTransform(scrollYProgress, [0, 1], ['-20%', '40%']);

  return (
    <div ref={wrap} className="relative">
      {/* drifting gold glow behind the list */}
      {!reduce && (
        <motion.div
          aria-hidden="true"
          style={{ y: orbY }}
          className="pointer-events-none absolute -right-24 top-0 -z-10 aspect-square w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(214,193,119,0.16),transparent)] blur-2xl"
        />
      )}
      {/* scroll progress line */}
      <div aria-hidden="true" className="absolute -left-6 bottom-0 top-0 hidden w-px bg-cream-50/10 lg:block">
        <motion.div style={{ scaleY: reduce ? 1 : fill }} className="h-full w-px origin-top bg-gold-300" />
      </div>

      <ol className="border-b border-cream-50/20">
        {items.map((item, i) => (
          <Row
            key={item.n}
            item={item}
            i={i}
            active={hover === i}
            dim={hover !== null && hover !== i}
            onActive={(on) => setHover(on ? i : null)}
          />
        ))}
      </ol>
    </div>
  );
}
