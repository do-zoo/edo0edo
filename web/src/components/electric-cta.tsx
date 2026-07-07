'use client';

import type { ReactNode } from 'react';
import ElectricBorder from '@/components/ElectricBorder';
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

  const content = (
    <>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
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
    </>
  );

  if (reducedMotion) {
    return (
      <section
        className={cn(
          'relative overflow-hidden rounded-xl border border-border bg-card p-10 text-center md:p-14',
          className
        )}
      >
        {content}
      </section>
    );
  }

  return (
    <ElectricBorder color="#f59e0b" borderRadius={16} className={className}>
      <section className="relative overflow-hidden rounded-[inherit] bg-card p-10 text-center md:p-14">
        {content}
      </section>
    </ElectricBorder>
  );
}
