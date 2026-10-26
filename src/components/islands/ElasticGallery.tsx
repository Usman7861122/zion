import { useState } from 'react';

type Item = { id: string; title: string; category: string; src: string; alt: string; w: number; h: number };

export default function ElasticGallery({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id ?? '');

  return (
    <div className="flex h-[520px] w-full flex-col gap-3 md:h-[560px] md:flex-row md:gap-3 lg:h-[640px]">
      {items.map((item, i) => {
        const on = active === item.id;
        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={on}
            aria-label={`${item.title}. ${item.category}`}
            onMouseEnter={() => setActive(item.id)}
            onFocus={() => setActive(item.id)}
            onClick={() => setActive(item.id)}
            className={[
              'group relative min-h-0 min-w-0 cursor-pointer overflow-hidden rounded-3xl bg-forest-900 text-left',
              'transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500',
              on ? 'flex-[4]' : 'flex-[1]',
            ].join(' ')}
          >
            <img
              src={item.src}
              alt={item.alt}
              width={item.w}
              height={item.h}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 size-full object-cover transition-transform duration-1000 ${on ? 'scale-100' : 'scale-110'}`}
            />
            <div className={`absolute inset-0 bg-forest-950/60 transition-opacity duration-500 group-hover:bg-forest-950/45 ${on ? 'opacity-0' : 'opacity-100'}`} />
            <div className={`absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/15 to-transparent transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-0'}`} />

            {/* Active content */}
            <div className={`absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 transition-all duration-500 md:p-8 ${on ? 'translate-y-0 opacity-100 delay-200' : 'translate-y-10 opacity-0'}`}>
              <span className="w-fit rounded-md border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white backdrop-blur-md md:text-xs">
                {item.category}
              </span>
              <span className="text-2xl font-light leading-tight text-white md:text-3xl">{item.title}</span>
            </div>

            {/* Inactive label */}
            <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 bottom-5 md:bottom-8 ${on ? 'scale-50 opacity-0' : 'opacity-100 delay-500'}`}>
              <span className="hidden whitespace-nowrap text-base font-semibold uppercase tracking-widest text-white [writing-mode:vertical-rl] md:block">{item.title}</span>
              <span className="block text-sm font-semibold text-white md:hidden">{String(i + 1).padStart(2, '0')} · {item.title}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
