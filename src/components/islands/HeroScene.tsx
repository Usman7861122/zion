import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

type Props = { phone: string; phoneHref: string; bookingUrl: string };
const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Cinematic layered parallax, modeled on the Osmo "Parallax scrolling" component.
 * Back to front: 1 photo -> 2 glow -> 3 giant word -> 4 athlete -> fade to dark.
 * On scroll every layer slides down at a different speed (same numbers as the reference).
 */
export default function HeroParallax({ phone, phoneHref, bookingUrl }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const k = reduce ? 0 : 1;

  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', `${70 * k}%`]);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', `${55 * k}%`]);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', `${40 * k}%`]);
  const y4 = useTransform(scrollYProgress, [0, 1], ['0%', `${10 * k}%`]);

  // Mouse "3D" effect: each layer drifts by a different amount, the athlete also tilts.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });
  const bgX = useTransform(sx, [-0.5, 0.5], [18, -18]);
  const glowX = useTransform(sx, [-0.5, 0.5], [30, -30]);
  const wordX = useTransform(sx, [-0.5, 0.5], [-26, 26]);
  const wordY = useTransform(sy, [-0.5, 0.5], [-12, 12]);
  const athX = useTransform(sx, [-0.5, 0.5], [-48, 48]);
  const athTY = useTransform(sy, [-0.5, 0.5], [-14, 14]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-9, 9]);
  const rotX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  const rise = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, delay, ease } };

  return (
    <section
      id="hero"
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative isolate mt-[72px] h-[calc(100svh-72px)] min-h-[600px] overflow-hidden bg-forest-950 dark:bg-[#050b08] lg:mt-[120px] lg:h-[calc(100svh-120px)] lg:min-h-[680px]"
    >
      <h1 className="sr-only">Zion Physical Therapy. Personalized care. Real results.</h1>

      {/* 1. Photo */}
      <motion.div style={{ y: y1, x: bgX }} className="absolute -inset-x-[3%] -top-[10%] -z-30 h-[120%]" aria-hidden="true">
        <img src="/images/hero/gym-bg.webp" alt="" width="2400" height="1600" fetchPriority="high" decoding="async" className="size-full object-cover dark:brightness-[0.55] dark:saturate-50" />
        <div className="absolute inset-0 bg-forest-950/70 dark:bg-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,transparent,rgba(10,22,18,0.85)_75%)] dark:bg-[radial-gradient(ellipse_at_50%_25%,transparent,rgba(2,6,4,0.97)_70%)]" />
      </motion.div>

      {/* 2. Glow (the "moon") */}
      <motion.div style={{ y: y2, x: glowX }} className="absolute inset-0 -z-20" aria-hidden="true">
        <div className="absolute left-1/2 top-[18%] aspect-square w-[min(80vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(214,193,119,0.38),transparent)] dark:bg-[radial-gradient(closest-side,rgba(214,193,119,0.14),transparent)]" />
      </motion.div>

      {/* 3. Giant word */}
      <motion.div style={{ y: y3, x: wordX }} className="absolute inset-x-0 top-[22%] z-10 flex justify-center lg:top-[18%]" aria-hidden="true">
        <motion.p
          {...rise(0.1)}
          className="select-none whitespace-nowrap text-[30vw] font-extrabold uppercase leading-[0.85] tracking-tight text-cream-50 dark:text-cream-50/80 lg:text-[27vw] xl:text-[26rem]"
        >
          Zion
        </motion.p>
      </motion.div>

      {/* 4. Athlete */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex h-[58%] justify-center sm:h-[66%] lg:h-[80%]">
        <motion.img
          src="/images/hero/athlete-gym.webp"
          alt="Athlete training with dumbbells"
          width="1465" height="1178" decoding="async" fetchPriority="high"
          style={{ y: y4, x: athX, rotateY: rotY, rotateX: rotX, transformPerspective: 1100 }}
          className="h-full w-auto max-w-none drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)] dark:brightness-[0.82] dark:contrast-110"
          {...(reduce ? {} : { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 1.2, delay: 0.25, ease } })}
        />
      </div>

      {/* Fade to dark, like the reference */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-[34%] bg-gradient-to-t from-forest-950 via-forest-950/80 to-transparent dark:from-[#050b08] dark:via-[#050b08]/85" aria-hidden="true" />

      {/* Very little text */}
      <div className="absolute inset-x-0 bottom-0 z-30 pb-20 text-center lg:pb-12">
        <motion.p {...rise(0.5)} className="eyebrow-dark">Personalized Care · Real Results</motion.p>
        <motion.div {...rise(0.6)} className="mt-5 flex flex-col items-center justify-center gap-3 px-6 sm:flex-row">
          <a href={bookingUrl} className="btn-gold btn-book whitespace-nowrap">Book Appointment</a>
          <a href={phoneHref} className="btn-outline-light whitespace-nowrap">{phone}</a>
        </motion.div>
      </div>
    </section>
  );
}
