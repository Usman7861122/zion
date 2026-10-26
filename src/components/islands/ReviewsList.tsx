import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { locationFilters, type Review } from '../../data/reviews';

const initials = (n: string) => n.split(' ').map((w) => w[0]).slice(0, 2).join('');
const ease = [0.22, 1, 0.36, 1] as const;

export default function ReviewsList({ reviews }: { reviews: Review[] }) {
  const f = 'all';
  const reduce = useReducedMotion();
  const list = f === 'all' ? reviews : reviews.filter((r) => r.locations?.includes(f as never));
  const count = (id: string) => (id === 'all' ? reviews.length : reviews.filter((r) => r.locations?.includes(id as never)).length);
  const featured = list.find((r) => r.featured);
  const rest = list.filter((r) => r !== featured);
  const label = locationFilters.find((x) => x.id === f)!.label;

  return (
    <>
      <div aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div key={f} initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: 0.4, ease }}>
            {featured && (
              <section className="section-y bg-cream-50" aria-label="Featured patient story">
                <div className="container-x">
                  <figure className="relative mx-auto grid max-w-6xl gap-6 overflow-hidden rounded-xl bg-forest-950 p-8 text-cream-50 sm:p-14 lg:grid-cols-[auto_1fr] lg:gap-14">
                    <span aria-hidden="true" className="select-none text-[9rem] leading-none text-gold-300 sm:text-[12rem] lg:-mt-6">“</span>
                    <div>
                      <p className="eyebrow-dark">A patient story{featured.source ? ' · Google review' : ''}</p>
                      <blockquote className="mt-5 text-xl font-light leading-relaxed sm:text-2xl">{featured.text}</blockquote>
                      <figcaption className="mt-8 flex items-center gap-4">
                        <span className="grid size-12 place-items-center rounded-full bg-gold-300 text-base font-semibold text-forest-950" aria-hidden="true">{initials(featured.name)}</span>
                        <span className="text-lg">{featured.name}</span>
                      </figcaption>
                    </div>
                  </figure>
                </div>
              </section>
            )}

            <section className={`bg-cream-100 pb-20 sm:pb-28 lg:pb-36 ${featured ? 'pt-20 sm:pt-28' : 'pt-16 sm:pt-20'}`}>
              <div className="container-x">
                <h2 className="mx-auto max-w-2xl text-center text-4xl sm:text-5xl">{f === 'all' ? 'Heard again and again: patient, kind, caring' : `Patients at ${label}`}</h2>
                {(
                  <ul className="mt-14 sm:columns-2 sm:gap-6 lg:columns-3">
                    {rest.map((r) => (
                      <li key={r.name} className="mb-6 break-inside-avoid">
                        <figure className="group rounded-xl border border-sand-300/70 bg-cream-50 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-500/70 hover:shadow-[0_30px_70px_-30px_rgba(16,33,27,0.4)] motion-reduce:hover:translate-y-0">
                          <div className="flex items-center justify-between gap-3">
                            <span aria-hidden="true" className="block text-6xl leading-none text-gold-500">“</span>
                          </div>
                          <blockquote className="mt-2 text-lg leading-relaxed text-forest-900">{r.text}</blockquote>
                          <figcaption className="mt-6 flex items-center gap-3 border-t border-sand-300/70 pt-5">
                            <span className="grid size-10 place-items-center rounded-full bg-forest-900 text-sm font-semibold text-gold-300 transition-colors group-hover:bg-gold-300 group-hover:text-forest-950" aria-hidden="true">{initials(r.name)}</span>
                            <span className="flex flex-col">
                              <span className="font-medium text-forest-900">{r.name}</span>
                              {r.source && <span className="text-xs text-ink-muted">Google review · 5 stars</span>}
                            </span>
                          </figcaption>
                        </figure>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-6 text-center"><a href="https://zionpt.com/testimonials/" className="link-arrow">See more reviews on our current site</a></p>
              </div>
            </section>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
