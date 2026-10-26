import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

export default function HssBadge({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 16 });
  const sy = useSpring(my, { stiffness: 120, damping: 16 });
  const rotY = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const rotX = useTransform(sy, [-0.5, 0.5], [8, -8]);

  const move = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const leave = () => { mx.set(0); my.set(0); };

  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className="relative mx-auto w-full max-w-md" style={{ perspective: 900 }}>
      {/* rotating gold ring */}
      {!reduce && (
        <motion.div aria-hidden="true" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute left-1/2 top-1/2 aspect-square w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gold-300/30" />
      )}
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(214,193,119,0.28),transparent)] blur-xl" />
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative rounded-2xl bg-cream-50 p-8 shadow-[0_50px_80px_-30px_rgba(0,0,0,0.65)] ring-1 ring-gold-300/40 sm:p-10"
      >
        <img src={src} alt="HSS Rehabilitation National Network, participating location" width="600" height="260" loading="lazy" decoding="async" className="mx-auto h-auto w-full" />
        <div className="mt-6 flex items-center justify-between border-t border-forest-900/10 pt-5 text-sm text-ink-muted">
          <span>Hospital for Special Surgery</span>
          <span className="rounded-md bg-gold-300/30 px-3 py-1 font-medium text-gold-700">Network member</span>
        </div>
      </motion.div>
    </div>
  );
}
