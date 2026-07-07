'use client';

import BlurText from '@/components/BlurText';
import GradientText from '@/components/GradientText';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

type HeroHeadlineProps = {
  name: string;
};

export function HeroHeadline({ name }: HeroHeadlineProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <h1 className="font-display font-bold leading-[1.05] tracking-tight">
        <span className="block text-4xl text-foreground/80 md:text-5xl">
          Hello, I&apos;m
        </span>
        <span className="text-gradient mt-1 block text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          {name}
        </span>
      </h1>
    );
  }

  return (
    <>
      <h1 className="sr-only">Hello, I&apos;m {name}</h1>
      <div
        aria-hidden
        className="font-display font-bold leading-[1.05] tracking-tight"
      >
        <BlurText
          text="Hello, I'm"
          className="text-4xl text-foreground/80 md:text-5xl font-display font-bold !flex"
          delay={80}
          stepDuration={0.3}
        />
        <GradientText
          colors={['#fbbf24', '#f59e0b', '#fcd34d', '#a78bfa']}
          className="mt-1 block !mx-0 !max-w-none text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl"
        >
          {name}
        </GradientText>
      </div>
    </>
  );
}
