import { useState } from 'react';

type Post = { title: string; sub: string; excerpt: string; tag: string; date: string; image: string; alt: string; href: string };

/** Category pills filter the article cards. */
export default function BlogGrid({ posts }: { posts: Post[] }) {
  const tags = ['All', ...Array.from(new Set(posts.map((p) => p.tag)))];
  const [tag, setTag] = useState('All');
  const list = tag === 'All' ? posts : posts.filter((p) => p.tag === tag);
  return (
    <div>
      <ul className="flex flex-wrap gap-2" aria-label="Filter articles by topic">
        {tags.map((t) => {
          const on = t === tag;
          return (
            <li key={t}>
              <button type="button" aria-pressed={on} onClick={() => setTag(t)}
                className={`inline-flex min-h-11 items-center rounded-lg border px-5 text-[0.95rem] font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700 ${on ? 'border-forest-900 bg-forest-900 text-cream-50' : 'border-sand-300 text-forest-900 hover:border-forest-900'}`}>
                {t}
              </button>
            </li>
          );
        })}
      </ul>
      <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {list.map((p) => (
          <li key={p.href} className="flex">
            <article className="group relative flex w-full flex-col overflow-hidden rounded-xl border border-sand-300/70 bg-cream-50 transition-all duration-500 hover:-translate-y-2 hover:border-gold-500/70 hover:shadow-[0_30px_70px_-30px_rgba(16,33,27,0.45)] motion-reduce:hover:translate-y-0">
              <div className="relative aspect-[4/3] overflow-hidden bg-sand-200">
                <img src={p.image} alt={p.alt} width="800" height="600" loading="lazy" className="size-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-md bg-cream-50/95 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-forest-900">{p.tag}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                {p.date && <p className="text-sm text-ink-muted">{p.date}</p>}
                <h3 className="mt-2 text-2xl leading-snug text-forest-900 transition-colors group-hover:text-gold-700">
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0 after:content-['']">{p.title}<span className="sr-only"> (opens in a new tab)</span></a>
                </h3>
                <p className="mt-3 flex-1 text-ink-muted">{p.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-forest-900">Read article <span aria-hidden="true">→</span></span>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
