import { useEffect, useId, useState, useSyncExternalStore, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { MonitorIcon, MoonStarIcon, SunIcon } from 'lucide-react';
import { getTheme, setTheme, subscribe, type Theme } from '../../lib-theme';

// Adapted from the shadcn "theme-switcher-1" block. This project is Astro (not Next), so it uses our own tiny
// theme store instead of next-themes, and framer-motion (the same library as "motion/react", already installed).
const OPTIONS: { value: Theme; label: string; icon: ReactNode }[] = [
  { value: 'system', label: 'system', icon: <MonitorIcon aria-hidden="true" /> },
  { value: 'light', label: 'light', icon: <SunIcon aria-hidden="true" /> },
  { value: 'dark', label: 'dark', icon: <MoonStarIcon aria-hidden="true" /> },
];

export function ThemeSwitcher({ className = '' }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const id = useId();
  const theme = useSyncExternalStore(subscribe, getTheme, () => 'light' as Theme);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-9 w-[7.5rem]" />;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
      role="radiogroup" aria-label="Color theme"
      className={`inline-flex items-center overflow-hidden rounded-full bg-forest-950 p-0.5 ring-1 ring-inset ring-gold-300/40 ${className}`}
    >
      {OPTIONS.map((o) => {
        const active = theme === o.value;
        return (
          <button
            key={o.value} type="button" role="radio" aria-checked={active} aria-label={`Switch to ${o.label} theme`} title={`${o.label[0].toUpperCase()}${o.label.slice(1)}`}
            onClick={() => setTheme(o.value)}
            className={`relative flex size-9 items-center justify-center rounded-full transition-colors [&_svg]:size-4 ${active ? 'text-gold-300' : 'text-sand-200/60 hover:text-cream-50'}`}
          >
            {o.icon}
            {active && <motion.span layoutId={`theme-option-${id}`} transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }} className="absolute inset-0 rounded-full border border-gold-300/70 bg-gold-300/10" />}
          </button>
        );
      })}
    </motion.div>
  );
}
