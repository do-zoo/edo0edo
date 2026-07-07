'use client';

import type { ReactNode } from 'react';
import AnimatedContent from '@/components/AnimatedContent';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  direction?: 'vertical' | 'horizontal';
};

export function AnimatedSection({
  children,
  className,
  delay = 0,
  distance = 60,
  direction = 'vertical',
}: AnimatedSectionProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <AnimatedContent
      className={cn(className)}
      delay={delay}
      distance={distance}
      direction={direction}
      duration={0.7}
      threshold={0.15}
    >
      {children}
    </AnimatedContent>
  );
}
