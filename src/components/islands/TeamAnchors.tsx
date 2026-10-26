import { useEffect, useState } from 'react';

type Item = { id: string; label: string; count: number };

/** Sticky pill bar. Each pill is a real #anchor link; JS only highlights the section on screen. */
export default function TeamAnchors({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0].id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let cur = items[0].id;
      for (const el of els) if (el.getBoundingClientRect().top <= line) cur = el.id;
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [items]);

  return (
    <nav aria-label="Team groups" className="sticky top-[72px] z-30 border-b border-sand-300/70 bg-cream-50/90 backdrop-blur-md lg:top-[120px]">
      <div className="container-x">
        <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 py-3 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:py-4">
          {items.map((i) => {
            const on = active === i.id;
            return (
              <li key={i.id} className="shrink-0">
                <a
                  href={`#${i.id}`}
                  aria-current={on ? 'true' : undefined}
                  className={`inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-lg border px-5 text-[0.95rem] font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700 ${on ? 'border-forest-900 bg-forest-900 text-cream-50' : 'border-sand-300 text-forest-900 hover:border-forest-900'}`}
                >
                  {i.label}
                  <span className={`text-xs tabular-nums ${on ? 'text-gold-300' : 'text-ink-muted'}`}>{i.count}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
