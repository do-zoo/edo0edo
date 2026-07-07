'use client';

import dynamic from 'next/dynamic';
import Noise from '@/components/Noise';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const Aurora = dynamic(() => import('@/components/Aurora'), { ssr: false });

export function HeroBackground() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute -top-16 bottom-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden"
      aria-hidden
    >
      {reducedMotion ? (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      ) : (
        <>
          <div className="absolute inset-0">
            <Aurora
              colorStops={['#f59e0b', '#8b5cf6', '#08080a']}
              amplitude={0.8}
              blend={0.6}
            />
          </div>
          <Noise patternAlpha={10} />
        </>
      )}
    </div>
  );
}
