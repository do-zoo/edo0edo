'use client';

import BlurText from '@/components/BlurText';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

type AnimatedSectionHeadingProps = {
  title: string;
  className?: string;
};

export function AnimatedSectionHeading({
  title,
  className,
}: AnimatedSectionHeadingProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <span className={className}>{title}</span>;
  }

  return (
    <BlurText
      text={title}
      className={cn('!inline-flex font-display font-bold', className)}
      delay={60}
      animateBy="words"
      stepDuration={0.3}
    />
  );
}
