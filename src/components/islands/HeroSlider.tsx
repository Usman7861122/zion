import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Phone, Play } from 'lucide-react';

type Props = { phone: string; phoneHref: string; bookingUrl: string };

// 3 slides: each has its own photo and its own 2-3 changing words.
const slides = [
  { img: '/images/h2/balance.webp', pos: '50% 30%', label: 'Mobility', words: 'move freely', alt: 'Woman in a warrior yoga pose on a wooden deck among pine trees' },
  { img: '/images/h2/strength.webp', pos: '38% 18%', label: 'Strength', words: 'get stronger', alt: 'Woman training with a kettlebell in a gym' },
  { img: '/images/h2/performance.webp', pos: '58% 12%', label: 'Performance', words: 'train harder', alt: 'Male athlete doing a one-arm dumbbell row' },
];
const DURATION = 6500;
const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroSlider({ phone, phoneHref, bookingUrl }: Props) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hold, setHold] = useState(false);
  const go = useCallback((n: number) => setI((n + slides.length) % slides.length), []);
  const auto = playing && !hold && !reduce;

  useEffect(() => {
    if (!auto) return;
    const t = setTimeout(() => go(i + 1), DURATION);
    return () => clearTimeout(t);
  }, [auto, i, go]);

  return (
    <section
      id="hero" aria-roledescription="carousel" aria-label="Zion Physical Therapy highlights"
      onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)} onBlur={() => setHold(false)}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-forest-950"
    >
      {/* Photos (right side on desktop, fading into the dark on the left) */}
      <div className="absolute inset-y-0 right-0 -z-10 w-full lg:w-[72%] lg:[mask-image:linear-gradient(to_right,transparent,#000_38%)]" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.img
            key={i} src={slides[i].img} alt="" width="2000" height="1333"
            fetchPriority={i === 0 ? 'high' : 'auto'} decoding="async"
            initial={{ opacity: 0, scale: reduce ? 1 : 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.1, ease: 'easeInOut' }, scale: { duration: 8, ease: 'easeOut' } }}
            style={{ objectPosition: slides[i].pos }}
            className="absolute inset-0 size-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-forest-950/40" />
        <div className="absolute inset-0 bg-forest-950/45 lg:bg-forest-950/15" />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-forest-950 via-forest-950/70 to-transparent lg:via-forest-950/30" aria-hidden="true" />

      {/* Text */}
      <div className="container-x relative flex flex-1 items-center pb-48 pt-32 lg:pb-36 lg:pt-40">
        <div className="max-w-2xl">
          <motion.p initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="eyebrow-dark">
            Manhattan · Jersey City · Westport
          </motion.p>

          <h1 className="mt-5 text-[2.6rem] font-light leading-[1.05] tracking-tight text-cream-50 sm:text-6xl lg:text-[4.4rem]">
            <span className="sr-only">Physical therapy in Manhattan, Jersey City and Westport, built to help you move freely, get stronger and train harder</span>
            <span aria-hidden="true">
              <motion.span initial={reduce ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease }} className="block">Physical therapy built to help you</motion.span>
              <span className="relative mt-1 block h-[1.18em] overflow-hidden text-gold-300">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={i} className="absolute inset-x-0 top-0 block whitespace-nowrap italic"
                    initial={reduce ? { opacity: 0 } : { y: '110%', opacity: 0, filter: 'blur(6px)' }}
                    animate={reduce ? { opacity: 1 } : { y: '0%', opacity: 1, filter: 'blur(0px)' }}
                    exit={reduce ? { opacity: 0 } : { y: '-110%', opacity: 0, filter: 'blur(6px)' }}
                    transition={{ duration: 0.6, ease }}
                  >
                    {slides[i].words}.
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </h1>

          <motion.h2 initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease }} className="mt-6 max-w-xl text-lg font-normal leading-relaxed text-sand-200 sm:text-xl">
            One-on-one care with a Doctor of Physical Therapy for orthopedic, sports and pelvic health.
          </motion.h2>

          <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45, ease }} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={bookingUrl} className="btn-gold btn-book whitespace-nowrap">Book Appointment</a>
            <a href={phoneHref} className="btn-outline-light gap-2 whitespace-nowrap"><Phone aria-hidden="true" className="size-4" />{phone}</a>
          </motion.div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-sm text-sand-200">
            {['17+ years of experience', 'Doctor-led, one-on-one', 'In person and online'].map((t) => (
              <li key={t} className="flex items-center gap-2"><span aria-hidden="true" className="size-1.5 rounded-full bg-gold-300" />{t}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Slide controls */}
      <div className="container-x absolute inset-x-0 bottom-0 z-10 pb-20 lg:pb-10">
        <div className="flex items-end justify-between gap-6">
          <div role="tablist" aria-label="Choose a slide" className="grid min-w-0 max-w-xl flex-1 grid-cols-3 gap-3">
            {slides.map((s, n) => (
              <button key={s.label} type="button" role="tab" aria-selected={n === i} aria-label={`Slide ${n + 1}: ${s.label}`} onClick={() => go(n)} className="group text-left">
                <span className={`block text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${n === i ? 'text-gold-300' : 'text-sand-300 group-hover:text-cream-50'}`}>
                  <span className="mr-2 text-[0.7rem]">0{n + 1}</span><span className="hidden sm:inline">{s.label}</span>
                </span>
                <span className="mt-3 block h-0.5 w-full overflow-hidden rounded-full bg-cream-50/20">
                  <span
                    key={n === i ? `on-${i}-${auto}` : 'off'}
                    className="block h-full origin-left rounded-full bg-gold-300"
                    style={n === i ? { animation: auto ? `hero-fill ${DURATION}ms linear forwards` : undefined, transform: auto ? undefined : 'scaleX(1)' } : { transform: 'scaleX(0)' }}
                  />
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause slideshow' : 'Play slideshow'} className="inline-flex size-11 items-center justify-center rounded-full border border-cream-50/30 text-cream-50 transition-colors hover:border-gold-300 hover:text-gold-300">
              {playing ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
            </button>
            <button type="button" onClick={() => go(i - 1)} aria-label="Previous slide" className="hidden sm:inline-flex size-11 items-center justify-center rounded-full border border-cream-50/30 text-cream-50 transition-colors hover:border-gold-300 hover:text-gold-300"><ChevronLeft aria-hidden="true" className="size-5" /></button>
            <button type="button" onClick={() => go(i + 1)} aria-label="Next slide" className="hidden sm:inline-flex size-11 items-center justify-center rounded-full border border-cream-50/30 text-cream-50 transition-colors hover:border-gold-300 hover:text-gold-300"><ChevronRight aria-hidden="true" className="size-5" /></button>
          </div>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">Slide {i + 1} of {slides.length}: {slides[i].alt}</p>
    </section>
  );
}
