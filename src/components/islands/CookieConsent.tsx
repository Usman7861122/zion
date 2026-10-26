import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';

// Stores the visitor's choice in localStorage (key below) and a first-party cookie.
// Other scripts (analytics, ads) should listen for the `zion:consent` event or read window.zionConsent before they load.
const KEY = 'zion-cookie-consent';
const VERSION = 1;
type Choice = { necessary: true; preferences: boolean; analytics: boolean; marketing: boolean; v: number; at: string };
const CATS: { id: 'preferences' | 'analytics' | 'marketing'; title: string; text: string }[] = [
  { id: 'preferences', title: 'Preferences', text: 'Remember choices such as your preferred clinic or form details, so the site feels familiar when you return.' },
  { id: 'analytics', title: 'Analytics', text: 'Help us understand which pages are useful, so we can improve the site. Data is grouped and does not name you.' },
  { id: 'marketing', title: 'Marketing', text: 'Let us measure our ads and show you relevant information about Zion Physical Therapy on other sites.' },
];

const read = (): Choice | null => {
  try { const v = JSON.parse(localStorage.getItem(KEY) || 'null'); return v && v.v === VERSION ? v : null; } catch { return null; }
};
const write = (c: Choice) => {
  try { localStorage.setItem(KEY, JSON.stringify(c)); } catch { /* storage blocked */ }
  try { document.cookie = `${KEY}=${encodeURIComponent(`p${+c.preferences}a${+c.analytics}m${+c.marketing}`)}; path=/; max-age=15552000; SameSite=Lax`; } catch { /* ignore */ }
  (window as any).zionConsent = c;
  window.dispatchEvent(new CustomEvent('zion:consent', { detail: c }));
};

export default function CookieConsent() {
  const [banner, setBanner] = useState(false);
  const [panel, setPanel] = useState(false);
  const [prefs, setPrefs] = useState({ preferences: false, analytics: false, marketing: false });
  const reduce = useReducedMotion();
  const first = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const c = read();
    if (c) { (window as any).zionConsent = c; setPrefs({ preferences: c.preferences, analytics: c.analytics, marketing: c.marketing }); }
    else setBanner(true);
    const open = () => { const cc = read(); if (cc) setPrefs({ preferences: cc.preferences, analytics: cc.analytics, marketing: cc.marketing }); setPanel(true); };
    window.addEventListener('zion:open-cookie-settings', open);
    return () => window.removeEventListener('zion:open-cookie-settings', open);
  }, []);

  useEffect(() => {
    if (!panel) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setPanel(false);
    window.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    first.current?.focus();
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [panel]);

  const save = useCallback((p: { preferences: boolean; analytics: boolean; marketing: boolean }) => {
    write({ necessary: true, ...p, v: VERSION, at: new Date().toISOString() });
    setPrefs(p); setBanner(false); setPanel(false);
  }, []);

  const ease = [0.22, 1, 0.36, 1] as const;
  return (
    <>
      <AnimatePresence>
        {banner && !panel && (
          <motion.section
            role="region" aria-label="Cookie notice"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }} transition={{ duration: 0.5, ease }}
            className="fixed bottom-[4.75rem] left-4 right-4 z-[55] rounded-xl border border-gold-300/30 bg-forest-900 p-5 text-cream-50 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] sm:left-6 sm:right-auto sm:max-w-md lg:bottom-6"
          >
            <p className="text-lg font-normal">We value your privacy</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-sand-200">We use cookies to keep the site working and, with your OK, to remember your choices and understand how the site is used. Read our <a href="/privacy-policy" className="underline decoration-gold-300 underline-offset-4 hover:text-gold-300">Privacy Policy</a>.</p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <button type="button" onClick={() => save({ preferences: true, analytics: true, marketing: true })} className="btn-gold !min-h-11 flex-1 justify-center !px-5">Accept all</button>
              <button type="button" onClick={() => save({ preferences: false, analytics: false, marketing: false })} className="btn-outline-light !min-h-11 flex-1 justify-center !px-5">Reject all</button>
            </div>
            <button type="button" onClick={() => setPanel(true)} className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-lg text-sm font-semibold tracking-wide text-gold-300 hover:text-cream-50">Customize</button>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {panel && (
          <motion.div className="fixed inset-0 z-[80] grid place-items-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <button type="button" aria-label="Close cookie settings" tabIndex={-1} onClick={() => setPanel(false)} className="absolute inset-0 cursor-default bg-forest-950/75 backdrop-blur-[2px]" />
            <motion.div
              role="dialog" aria-modal="true" aria-labelledby="cookie-title"
              initial={reduce ? false : { opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.4, ease }}
              className="relative flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-gold-300/30 bg-forest-900 text-cream-50 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 border-b border-cream-50/10 p-6">
                <div>
                  <h2 id="cookie-title" className="text-2xl sm:text-3xl">Cookie settings</h2>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-sand-200">Choose which cookies you allow. You can change this at any time from the footer.</p>
                </div>
                <button ref={first} type="button" onClick={() => setPanel(false)} aria-label="Close" className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-cream-50/20 hover:border-gold-300 hover:text-gold-300"><X aria-hidden="true" className="size-5" /></button>
              </div>

              <div className="overflow-y-auto p-6">
                <ul className="space-y-4">
                  <li className="rounded-xl border border-cream-50/10 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-semibold">Strictly necessary</p>
                      <span className="rounded-md border border-gold-300/40 px-2.5 py-1 text-xs uppercase tracking-wider text-gold-300">Always on</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-sand-200">Needed for security, forms and basic site features. These cannot be switched off.</p>
                  </li>
                  {CATS.map((c) => (
                    <li key={c.id} className="rounded-xl border border-cream-50/10 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <label htmlFor={`ck-${c.id}`} className="font-semibold">{c.title}</label>
                        <button
                          id={`ck-${c.id}`} type="button" role="switch" aria-checked={prefs[c.id]}
                          onClick={() => setPrefs((p) => ({ ...p, [c.id]: !p[c.id] }))}
                          className={`relative h-8 w-14 shrink-0 rounded-full border transition-colors duration-300 ${prefs[c.id] ? 'border-gold-300 bg-gold-300' : 'border-cream-50/30 bg-forest-800'}`}
                        >
                          <span className="sr-only">{prefs[c.id] ? 'On' : 'Off'}</span>
                          <span aria-hidden="true" className={`absolute top-1/2 size-6 -translate-y-1/2 rounded-full transition-all duration-300 ${prefs[c.id] ? 'left-[1.75rem] bg-forest-900' : 'left-1 bg-sand-200'}`} />
                        </button>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-sand-200">{c.text}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-2 border-t border-cream-50/10 p-6 sm:flex-row">
                <button type="button" onClick={() => save(prefs)} className="btn-gold !min-h-11 flex-1 justify-center">Save my choices</button>
                <button type="button" onClick={() => save({ preferences: true, analytics: true, marketing: true })} className="btn-outline-light !min-h-11 flex-1 justify-center">Accept all</button>
                <button type="button" onClick={() => save({ preferences: false, analytics: false, marketing: false })} className="btn-outline-light !min-h-11 flex-1 justify-center">Reject all</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
