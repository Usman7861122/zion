import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ThemeSwitcher } from '../ui/theme-switcher';
import { ArrowUpRight, ChevronDown, Phone, X } from 'lucide-react';

type Child = { label: string; href: string; description?: string; image?: string };
type NavItem = { label: string; href: string; children?: Child[] };
type Props = { nav: NavItem[]; phone: string; phoneHref: string; bookingUrl: string };

// Photos for the card menu. Keyed by link address so the data in site.ts stays simple.
const photo: Record<string, string> = {
  '/about-us': '/images/real/gal-2.webp',
  '/team': '/images/real/gal-5.webp',
  '/services/orthopedic-physical-therapy': '/images/services/orthopedic.webp',
  '/services/dry-needling': '/images/svc/dry-needling-1.webp',
  '/services/womens-health': '/images/svc/womens-1.webp',
  '/services/mens-health': '/images/svc/mens-1.webp',
  '/services/ehlers-danlos-syndrome': '/images/svc/eds-1.webp',
  '/locations/upper-east-side': '/images/real/loc-east.webp',
  '/locations/upper-west-side': '/images/real/loc-west.webp',
  '/locations/jersey-city': '/images/real/loc-jersey.webp',
  '/locations/westport': '/images/real/loc-westport.webp',
};
const intro: Record<string, { title: string; text: string; cta: string }> = {
  About: { title: 'Get to know Zion', text: 'One-on-one care, led by doctors of physical therapy.', cta: 'About us' },
  Services: { title: 'Care that fits you', text: 'From sports injuries to pelvic health, every plan is built around you.', cta: 'All services' },
  Locations: { title: 'Find a clinic near you', text: 'Four clinics across Manhattan, New Jersey and Connecticut.', cta: 'All locations' },
};

export default function Header2({ nav, phone, phoneHref, bookingUrl }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [acc, setAcc] = useState<string | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open]);

  return (
    <header className={`group/header fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-forest-950/90 shadow-[0_1px_0_rgba(214,193,119,0.2)] backdrop-blur-md' : 'bg-gradient-to-b from-forest-950/80 to-transparent'}`}>
      <div className="container-x flex h-[76px] items-center justify-between gap-6 lg:h-[92px]">
        <a href="/home-2" aria-label="Zion Physical Therapy, home" className="shrink-0">
          <img src="/logos/zion-logo.png" alt="Zion Physical Therapy" width="500" height="130" className="h-11 w-auto lg:h-[3.4rem]" />
        </a>

        {/* Desktop menu: each item with children opens a card panel */}
        <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
          {nav.map((item) => (
            <div key={item.label} className="group">
              <a href={item.href} className="relative inline-flex min-h-11 items-center gap-1 rounded-lg px-3 text-[0.95rem] font-semibold tracking-wide text-cream-50 transition-colors hover:text-gold-300 group-focus-within:text-gold-300">
                {item.label}
                {item.children && <ChevronDown aria-hidden="true" className="size-3.5 text-gold-300 transition-transform duration-300 group-focus-within:rotate-180 group-hover:rotate-180" />}
                <span aria-hidden="true" className="absolute inset-x-3 bottom-1.5 h-px origin-left scale-x-0 bg-gold-300 transition-transform duration-300 group-hover:scale-x-100 group-focus-within:scale-x-100" />
              </a>

              {item.children && (
                <div className="invisible absolute inset-x-0 top-full z-10 translate-y-2 pt-2 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="container-x">
                    <div className="grid gap-5 rounded-2xl border border-sand-300/70 bg-cream-50 p-5 text-forest-900 shadow-[0_40px_80px_-24px_rgba(0,0,0,0.55)] lg:grid-cols-[17rem_1fr]">
                      {/* Intro card */}
                      <div className="flex flex-col justify-between rounded-xl bg-forest-900 p-6 text-cream-50">
                        <div>
                          <p className="eyebrow-dark">{item.label}</p>
                          <p className="mt-3 text-2xl font-light leading-tight">{intro[item.label]?.title}</p>
                          <p className="mt-3 text-sm leading-relaxed text-sand-200">{intro[item.label]?.text}</p>
                        </div>
                        <a href={item.href} className="btn-gold mt-6 !min-h-11 gap-2 !px-5">{intro[item.label]?.cta}<ArrowUpRight aria-hidden="true" className="size-4" /></a>
                      </div>
                      {/* Cards */}
                      <ul className={`grid gap-4 ${item.children.filter((c) => photo[c.href]).length > 4 ? 'sm:grid-cols-3' : item.children.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-4'}`}>
                        {item.children.filter((c) => photo[c.href]).map((c) => (
                          <li key={c.label}>
                            <a href={c.href} className="group/card block h-full rounded-xl border border-sand-300/60 bg-cream-100 p-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500 hover:shadow-lg focus-visible:border-gold-500">
                              <span className="block aspect-[16/10] overflow-hidden rounded-lg">
                                <img src={photo[c.href]} alt="" loading="lazy" width="480" height="300" className="size-full object-cover transition-transform duration-700 group-hover/card:scale-105" />
                              </span>
                              <span className="mt-3 flex items-start justify-between gap-2 px-1">
                                <span className="block text-[0.95rem] font-semibold leading-snug">{c.label}</span>
                                <ArrowUpRight aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-700 transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
                              </span>
                              {c.description && <span className="mt-1 block px-1 pb-1 text-sm leading-snug text-ink-muted">{c.description}</span>}
                            </a>
                          </li>
                        ))}
                        {item.children.filter((c) => photo[c.href]).length === 5 && (
                          <li>
                            <div className="flex h-full flex-col justify-between rounded-xl border border-gold-500/50 bg-forest-800 p-5 text-cream-50">
                              <div>
                                <p className="text-lg font-light leading-snug">Not sure which service you need?</p>
                                <p className="mt-2 text-sm leading-snug text-sand-200">Call us. A real person will help you choose.</p>
                              </div>
                              <a href={phoneHref} className="btn-outline-light mt-5 !min-h-11 gap-2 !px-4 whitespace-nowrap"><Phone aria-hidden="true" className="size-4" />{phone}</a>
                            </div>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a href={bookingUrl} className="btn-gold btn-book hidden !min-h-11 whitespace-nowrap !px-6 sm:inline-flex">Book Appointment</a>
          <ThemeSwitcher />
          <button type="button" className="inline-flex size-12 items-center justify-center rounded-lg text-cream-50 xl:hidden" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu-2" onClick={() => setOpen(true)}>
            <span className="relative block h-3.5 w-7" aria-hidden="true">
              <span className="absolute left-0 top-0 h-px w-full bg-current" />
              <span className="absolute left-0 top-1.5 h-px w-full bg-current" />
              <span className="absolute left-0 top-3 h-px w-full bg-current" />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <>
            <motion.button type="button" aria-label="Close menu" tabIndex={-1} onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-[60] cursor-default bg-forest-950/70 backdrop-blur-[2px] xl:hidden" />
            <motion.div
              id="mobile-menu-2" role="dialog" aria-modal="true" aria-label="Menu"
              initial={reduce ? { opacity: 0 } : { x: '100%' }} animate={reduce ? { opacity: 1 } : { x: 0 }} exit={reduce ? { opacity: 0 } : { x: '100%' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[88%] max-w-sm flex-col overflow-y-auto border-l border-gold-300/20 bg-forest-950 xl:hidden"
            >
              <div className="flex h-[76px] shrink-0 items-center justify-between px-5">
                <a href="/home-2" onClick={() => setOpen(false)} aria-label="Zion Physical Therapy, home"><img src="/logos/zion-logo.png" alt="Zion Physical Therapy" width="500" height="130" className="h-10 w-auto" /></a>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="inline-flex size-11 items-center justify-center rounded-lg border border-cream-50/20 text-cream-50 hover:border-gold-300 hover:text-gold-300"><X aria-hidden="true" className="size-5" /></button>
              </div>
              <nav aria-label="Mobile" className="flex flex-1 flex-col px-5 pb-6 pt-2">
                {nav.map((item) => {
                  const on = acc === item.label;
                  if (!item.children) return <a key={item.label} href={item.href} onClick={() => setOpen(false)} className="flex min-h-14 items-center border-b border-cream-50/10 text-xl font-light text-cream-50">{item.label}</a>;
                  return (
                    <div key={item.label} className="border-b border-cream-50/10">
                      <button type="button" aria-expanded={on} onClick={() => setAcc(on ? null : item.label)} className="flex min-h-14 w-full items-center justify-between text-xl font-light text-cream-50">
                        {item.label}
                        <ChevronDown aria-hidden="true" className={`size-5 text-gold-300 transition-transform duration-300 ${on ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                            <ul className="grid gap-3 pb-4">
                              {item.children.map((c) => (
                                <li key={c.label}>
                                  <a href={c.href} onClick={() => setOpen(false)} className="flex items-center gap-4 rounded-xl border border-cream-50/10 bg-forest-900 p-2.5 transition-colors hover:border-gold-300/50">
                                    {photo[c.href] && <img src={photo[c.href]} alt="" loading="lazy" width="96" height="72" className="size-16 shrink-0 rounded-lg object-cover" />}
                                    <span className="min-w-0"><span className="block font-semibold text-cream-50">{c.label}</span>{c.description && <span className="mt-0.5 block text-sm leading-snug text-sand-200">{c.description}</span>}</span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
                <div className="mt-4 flex items-center justify-between"><span className="text-sm uppercase tracking-[0.2em] text-sand-200">Theme</span><ThemeSwitcher /></div>
                <div className="mt-6 flex flex-col gap-3">
                  <a href={bookingUrl} onClick={() => setOpen(false)} className="btn-gold btn-book justify-center">Book Appointment</a>
                  <a href={phoneHref} className="btn-outline-light justify-center gap-2"><Phone aria-hidden="true" className="size-4" />{phone}</a>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
