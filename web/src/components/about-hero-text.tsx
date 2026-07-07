'use client';

import { MapPin } from 'lucide-react';
import type { ReactNode } from 'react';
import BlurText from '@/components/BlurText';
import FadeContent from '@/components/FadeContent';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

type AboutHeroTextProps = {
  title: string;
  subtitle: string;
  bio: string;
};

export function AboutHeroText({ title, subtitle, bio }: AboutHeroTextProps) {
  const reducedMotion = useReducedMotion();

  return (
    <>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
        About
      </p>
      {reducedMotion ? (
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          {title}
        </h1>
      ) : (
        <>
          <h1 className="sr-only">{title}</h1>
          <div
            aria-hidden
            className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl"
          >
            <BlurText
              text={title}
              className="!inline-flex font-display text-4xl font-bold md:text-5xl"
              delay={70}
              animateBy="words"
            />
          </div>
        </>
      )}
      <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="h-3.5 w-3.5 text-primary" />
        {subtitle}
      </p>
      {reducedMotion ? (
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {bio}
        </p>
      ) : (
        <FadeContent duration={0.9} threshold={0.15} className="mt-6 max-w-2xl">
          <p className="text-lg leading-relaxed text-muted-foreground">{bio}</p>
        </FadeContent>
      )}
    </>
  );
}
