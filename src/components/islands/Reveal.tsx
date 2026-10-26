import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = { children: ReactNode; delay?: number; y?: number; className?: string };

/** Fades and lifts its content once when it scrolls into view. Respects reduced motion. */
export default function Reveal({ children, delay = 0, y = 28, className = '' }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
