import { useState } from 'react';

type Shot = { src: string; alt: string; label: string };

/** Row of photos. The one under the mouse (or focus / tap) grows wide, the rest shrink. */
export default function ExpandGallery({ shots }: { shots: Shot[] }) {
  const [active, setActive] = useState(0);

  return (
    <ul className="flex h-[620px] w-full flex-col gap-2 sm:h-[480px] sm:flex-row sm:gap-3 lg:h-[540px]" onMouseLeave={() => setActive(0)}>
      {shots.map((s, i) => {
        const on = active === i;
        return (
          <li
            key={s.src}
            className={`relative min-h-0 min-w-0 overflow-hidden rounded-xl bg-forest-900 transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${on ? 'flex-[7_1_0%]' : 'flex-[1_1_0%]'}`}
            onMouseEnter={() => setActive(i)}
          >
            <button
              type="button"
              aria-label={`${s.label}. ${on ? 'Selected' : 'Show larger'}`}
              aria-pressed={on}
              onClick={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group absolute inset-0 block size-full cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-gold-300"
            >
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 size-full object-cover object-center transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${on ? 'scale-100 brightness-100' : 'scale-110 brightness-[0.7] group-hover:brightness-90'}`}
              />
              <span className={`absolute inset-0 bg-gradient-to-t from-forest-950/75 via-transparent to-transparent transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-0'}`} />
              <span className={`absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 transition-all duration-500 sm:p-7 ${on ? 'translate-y-0 opacity-100 delay-200' : 'translate-y-4 opacity-0'}`}>
                <span className="text-xl font-light text-cream-50 sm:text-3xl">{s.label}</span>
                <span className="shrink-0 text-sm tabular-nums text-cream-50/80">{String(i + 1).padStart(2, '0')} / {String(shots.length).padStart(2, '0')}</span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
