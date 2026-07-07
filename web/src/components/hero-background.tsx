'use client';

import dynamic from 'next/dynamic';
import Noise from '@/components/Noise';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const Aurora = dynamic(() => import('@/components/Aurora'), { ssr: false });

export function HeroBackground() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="hero-background pointer-events-none absolute inset-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#14101c] via-[#0a0a0c] to-[#08080a]" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.07] via-background/50 to-accent/[0.08]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_50%_110%,rgba(139,92,246,0.18),transparent_65%)]" />

      {reducedMotion ? (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      ) : (
        <>
          <div className="absolute inset-0 opacity-80">
            <Aurora
              colorStops={['#f59e0b', '#8b5cf6', '#08080a']}
              amplitude={1.2}
              blend={0.95}
            />
          </div>
          <Noise patternAlpha={10} />
        </>
      )}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_30%_35%,rgba(139,92,246,0.14),transparent_60%)]" />
    </div>
  );
}
