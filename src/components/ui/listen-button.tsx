import { useEffect, useRef, useState } from 'react';
import { PauseIcon, SquareIcon, Volume2Icon } from 'lucide-react';

// "Listen to this page": reads the main content aloud with the voice built into the browser (Web Speech API).
// Free, no server. Blind visitors who use a screen reader keep using their own tool; this helps everyone else who prefers to listen.
type State = 'idle' | 'playing' | 'paused';

function collect(): string[] {
  const root = document.querySelector('main') ?? document.body;
  const out: string[] = [];
  root.querySelectorAll<HTMLElement>('h1,h2,h3,h4,p,li,blockquote,summary,address').forEach((el) => {
    if (el.closest('[aria-hidden="true"],nav,footer,script,style,[data-no-listen]')) return;
    if (el.querySelector('p,li,h1,h2,h3,h4') && !/^H[1-4]$/.test(el.tagName)) return; // read the inner items instead
    const t = (el.innerText || '').replace(/\s+/g, ' ').trim();
    if (t.length > 1) out.push(/[.!?:]$/.test(t) ? t : t + '.');
  });
  // keep long text in small pieces: some browsers stop long speech after about 15 seconds
  return out.flatMap((t) => t.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g)?.map((s) => s.trim()).filter(Boolean) ?? [t]);
}

export function ListenButton({ className = '', showLabel = false }: { className?: string; showLabel?: boolean }) {
  const [supported, setSupported] = useState(false);
  const [state, setState] = useState<State>('idle');
  const run = useRef(0);

  useEffect(() => {
    setSupported('speechSynthesis' in window);
    const stop = () => window.speechSynthesis?.cancel();
    window.addEventListener('pagehide', stop);
    return () => { window.removeEventListener('pagehide', stop); stop(); };
  }, []);
  if (!supported) return null;

  const start = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const parts = collect();
    if (!parts.length) return;
    const id = ++run.current;
    const voices = synth.getVoices();
    const voice = voices.find((v) => /^en[-_]US/i.test(v.lang) && /natural|google|samantha|aria|jenny/i.test(v.name)) ?? voices.find((v) => /^en/i.test(v.lang));
    let i = 0;
    const next = () => {
      if (id !== run.current) return;
      if (i >= parts.length) { setState('idle'); return; }
      const u = new SpeechSynthesisUtterance(parts[i++]);
      u.lang = 'en-US'; u.rate = 0.95; if (voice) u.voice = voice;
      u.onend = next; u.onerror = (e) => { if (e.error !== 'interrupted' && e.error !== 'canceled') setState('idle'); };
      synth.speak(u);
    };
    setState('playing'); next();
  };
  const stop = () => { run.current++; window.speechSynthesis.cancel(); setState('idle'); };
  const toggle = () => {
    const synth = window.speechSynthesis;
    if (state === 'idle') start();
    else if (state === 'playing') { synth.pause(); setState('paused'); }
    else { synth.resume(); setState('playing'); }
  };

  const label = state === 'idle' ? 'Listen to this page' : state === 'playing' ? 'Pause reading' : 'Resume reading';
  return (
    <div className={`inline-flex items-center gap-1 ${className}`} data-no-listen>
      <button type="button" onClick={toggle} aria-label={label} title={label}
        className={`relative inline-flex h-11 items-center justify-center gap-2 rounded-full border border-gold-300/40 text-cream-50 transition-colors hover:border-gold-300 hover:text-gold-300 ${showLabel ? 'px-4' : 'w-11'} ${state === 'playing' ? 'border-gold-300 text-gold-300' : ''}`}>
        {state === 'playing' ? <PauseIcon aria-hidden="true" className="size-[1.1rem]" /> : <Volume2Icon aria-hidden="true" className="size-[1.1rem]" />}
        {showLabel && <span className="text-sm font-semibold">{state === 'idle' ? 'Listen' : state === 'playing' ? 'Pause' : 'Resume'}</span>}
        {state === 'playing' && <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full border border-gold-300/50" />}
      </button>
      {state !== 'idle' && (
        <button type="button" onClick={stop} aria-label="Stop reading" title="Stop reading" className="inline-flex size-11 items-center justify-center rounded-full border border-cream-50/25 text-cream-50 hover:border-gold-300 hover:text-gold-300">
          <SquareIcon aria-hidden="true" className="size-4" />
        </button>
      )}
      <span className="sr-only" role="status" aria-live="polite">{state === 'playing' ? 'Reading the page' : state === 'paused' ? 'Paused' : ''}</span>
    </div>
  );
}
