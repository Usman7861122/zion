import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion';

type Item = { label: string; school: string; detail: string };

/** Vertical timeline. The gold line draws as you scroll, and each step lights up when the line reaches it. */
export default function TimelineScroll({ items }: { items: Item[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const [marks, setMarks] = useState<number[]>(items.map(() => 0));
  const [active, setActive] = useState(reduce ? items.length : 0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 55%'] });
  const grow = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  useEffect(() => {
    const measure = () => {
      const ol = ref.current;
      if (!ol) return;
      const h = ol.offsetHeight || 1;
      setMarks(Array.from(ol.children).filter((c) => c.tagName === 'LI').map((li) => (((li as HTMLElement).offsetTop + 16) / h)));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useMotionValueEvent(grow, 'change', (v) => {
    if (reduce) return;
    setActive(marks.filter((m) => v >= m - 0.02).length);
  });

  return (
    <ol ref={ref} className="relative mt-12">
      <span aria-hidden="true" className="absolute bottom-2 left-[11px] top-2 w-px bg-gold-300/15" />
      <motion.span
        aria-hidden="true"
        className="absolute bottom-2 left-[11px] top-2 w-px origin-top bg-gradient-to-b from-gold-300 via-gold-300 to-gold-300/60"
        style={{ scaleY: reduce ? 1 : grow }}
      />
      {items.map((e, i) => {
        const on = i < active;
        return (
          <li key={e.school} className="relative pb-10 pl-12 last:pb-0">
            <span
              aria-hidden="true"
              className={`absolute left-0 top-1 grid size-6 place-items-center rounded-full border bg-forest-900 transition-all duration-500 ${on ? 'scale-100 border-gold-300 shadow-[0_0_0_6px_rgba(214,193,119,0.12)]' : 'scale-90 border-gold-300/30'}`}
            >
              <span className={`size-2 rounded-full transition-all duration-500 ${on ? 'bg-gold-300' : 'bg-gold-300/25'}`} />
            </span>
            <div className={`transition-all duration-700 ease-out ${on ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-30'} motion-reduce:translate-y-0 motion-reduce:opacity-100`}>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-300">{e.label}</p>
              <h3 className="mt-2 text-2xl text-cream-50">{e.school}</h3>
              <p className="mt-2 text-sand-200">{e.detail}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
