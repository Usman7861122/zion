// Tiny theme store shared by every island on the page (no provider needed).
// Saved in localStorage under "zion-theme": "light" (default) | "dark" | "system".
export type Theme = 'light' | 'dark' | 'system';
const KEY = 'zion-theme';
const listeners = new Set<() => void>();

export const getTheme = (): Theme => {
  try { const v = localStorage.getItem(KEY); return v === 'dark' || v === 'system' ? v : 'light'; } catch { return 'light'; }
};
export const resolved = (t: Theme) => (t === 'system' ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : t);
export const apply = (t: Theme) => {
  const r = resolved(t);
  document.documentElement.classList.toggle('dark', r === 'dark');
  document.documentElement.style.colorScheme = r;
};
export const setTheme = (t: Theme) => {
  try { localStorage.setItem(KEY, t); } catch { /* storage blocked */ }
  apply(t);
  listeners.forEach((l) => l());
};
export const subscribe = (cb: () => void) => {
  listeners.add(cb);
  const mq = matchMedia('(prefers-color-scheme: dark)');
  const onSys = () => { if (getTheme() === 'system') { apply('system'); cb(); } };
  mq.addEventListener('change', onSys);
  return () => { listeners.delete(cb); mq.removeEventListener('change', onSys); };
};
