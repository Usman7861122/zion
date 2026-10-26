import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ListenButton } from '../ui/listen-button';
import { ThemeSwitcher } from '../ui/theme-switcher';
import { Activity, Baby, Bone, ChevronDown, HeartPulse, Info, LayoutGrid, MapPin, Phone, Syringe, Users, X } from 'lucide-react';

type Child = { label: string; href: string; icon?: string; description?: string };
type NavItem = { label: string; href: string; children?: Child[] };
type Props = { nav: NavItem[]; phone: string; phoneHref: string; bookingUrl: string };

const icons: Record<string, typeof Info> = { info: Info, users: Users, bone: Bone, syringe: Syringe, baby: Baby, heart: HeartPulse, activity: Activity, grid: LayoutGrid, pin: MapPin };
const Icon = ({ name }: { name?: string }) => {
  const C = (name && icons[name]) || Info;
  return <C aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.6} />;
};

export default function Header({ nav, phone, phoneHref, bookingUrl }: Props) {
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
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-forest-900/95 shadow-[0_1px_0_rgba(214,193,119,0.25)] backdrop-blur' : 'bg-forest-900'}`}>
      <div className="hidden border-b border-cream-50/10 bg-forest-950 text-[0.8rem] text-sand-200 lg:block">
        <div className="container-x flex h-9 items-center justify-between">
          <span>One-on-one care with a Doctor of Physical Therapy · Manhattan · Jersey City · Westport</span>
          <a href={phoneHref} className="font-semibold tracking-wide text-gold-300 hover:text-cream-50">{phone}</a>
        </div>
      </div>

      <div className="container-x flex h-[72px] items-center justify-between gap-6 lg:h-[84px]">
        <a href="/" aria-label="Zion Physical Therapy, home" className="shrink-0">
          <img src="/logos/zion-logo.png" alt="Zion Physical Therapy" width="500" height="130" className="h-10 w-auto lg:h-12" />
        </a>

        {/* Desktop menu */}
        <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
          {nav.map((item) => (
            <div key={item.label} className="group relative">
              <a href={item.href} className="inline-flex min-h-11 items-center gap-1 rounded-lg px-3.5 text-[0.95rem] font-semibold tracking-wide text-cream-50 transition-colors hover:bg-forest-800 hover:text-gold-300 group-focus-within:text-gold-300">
                {item.label}
                {item.children && <ChevronDown aria-hidden="true" className="size-3.5 text-gold-300 transition-transform duration-300 group-focus-within:rotate-180 group-hover:rotate-180" />}
              </a>
              {item.children && (
                <div className="invisible absolute left-1/2 top-full z-10 w-[22rem] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <ul className="rounded-xl border border-gold-300/25 bg-forest-900 p-2.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
                    {item.children.map((c) => (
                      <li key={c.label}>
                        <a href={c.href} className="group/i flex select-none gap-4 rounded-lg p-3 leading-none transition-colors hover:bg-forest-800 focus-visible:bg-forest-800">
                          <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-gold-300/30 text-gold-300 transition-colors group-hover/i:bg-gold-300 group-hover/i:text-forest-900"><Icon name={c.icon} /></span>
                          <span className="min-w-0">
                            <span className="block text-[0.95rem] font-semibold text-cream-50">{c.label}</span>
                            {c.description && <span className="mt-1.5 block text-sm leading-snug text-sand-200">{c.description}</span>}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ListenButton className="hidden sm:inline-flex" />
          <a href={bookingUrl} className="btn-gold btn-book hidden !min-h-11 whitespace-nowrap !px-6 sm:inline-flex">Book Appointment</a>
          <ThemeSwitcher />
          <button type="button" className="inline-flex size-12 items-center justify-center rounded-lg text-cream-50 xl:hidden" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}>
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
              id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu"
              initial={reduce ? { opacity: 0 } : { x: '100%' }} animate={reduce ? { opacity: 1 } : { x: 0 }} exit={reduce ? { opacity: 0 } : { x: '100%' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[88%] max-w-sm flex-col overflow-y-auto border-l border-gold-300/20 bg-forest-900 xl:hidden"
            >
              <div className="flex h-[72px] shrink-0 items-center justify-between px-5">
                <a href="/" onClick={() => setOpen(false)} aria-label="Zion Physical Therapy, home"><img src="/logos/zion-logo.png" alt="Zion Physical Therapy" width="500" height="130" className="h-9 w-auto" /></a>
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
                            <ul className="pb-3">
                              {item.children.map((c) => (
                                <li key={c.label}>
                                  <a href={c.href} onClick={() => setOpen(false)} className="flex gap-4 rounded-lg p-3 transition-colors hover:bg-forest-800">
                                    <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-gold-300/30 text-gold-300"><Icon name={c.icon} /></span>
                                    <span className="min-w-0"><span className="block font-semibold text-cream-50">{c.label}</span>{c.description && <span className="mt-1 block text-sm leading-snug text-sand-200">{c.description}</span>}</span>
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
                <div className="mt-6 flex items-center justify-between border-t border-cream-50/10 pt-5"><ListenButton showLabel /></div>
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
