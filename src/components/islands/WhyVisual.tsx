import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export default function WhyVisual({ src, years }: { src: string; years: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%']);
  const cardY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [30, -30]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-forest-800">
        <motion.img
          src={src}
          alt="Therapist gently supporting a patient's knee during a one-on-one session"
          width="1600" height="1067" loading="lazy" decoding="async"
          style={{ y: imgY }}
          className="absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/50 via-transparent to-transparent" />
      </div>
      <motion.div
        style={{ y: cardY }}
        className="absolute -bottom-6 left-4 right-4 rounded-lg border border-cream-50/15 bg-forest-900/90 p-5 backdrop-blur-md sm:left-auto sm:right-[-1.5rem] sm:w-72"
      >
        <p className="text-5xl font-light text-gold-300">{years}+</p>
        <p className="mt-1 text-sm text-sand-200">years of one-on-one care, with a Doctor of Physical Therapy at every visit.</p>
      </motion.div>
    </div>
  );
}
