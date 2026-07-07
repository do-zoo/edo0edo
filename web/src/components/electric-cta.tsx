'use client';

import type { ReactNode } from 'react';
import ShinyText from '@/components/ShinyText';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

type ElectricCtaProps = {
  eyebrow?: string;
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
};

export function ElectricCta({
  eyebrow,
  title,
  description,
  children,
  className,
}: ElectricCtaProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        'rounded-xl bg-gradient-to-br from-primary/30 via-border/50 to-accent/30 p-px',
        className
      )}
    >
      <section className="relative overflow-hidden rounded-[inherit] border border-transparent bg-card/80 p-10 text-center backdrop-blur-sm md:p-14">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-primary/8 blur-3xl"
          aria-hidden
        />
        <div className="relative">
          {eyebrow && (
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              {eyebrow}
            </p>
          )}
          {reducedMotion ? (
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              {title}
            </h2>
          ) : (
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              <ShinyText
                text={title}
                color="#f4f4f5"
                shineColor="#fbbf24"
                speed={3}
                className="font-display text-3xl font-bold md:text-4xl"
              />
            </h2>
          )}
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            {description}
          </p>
          {children}
        </div>
      </section>
    </div>
  );
}
