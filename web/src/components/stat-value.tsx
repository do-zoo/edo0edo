'use client';

import CountUp from '@/components/CountUp';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

type StatValueProps = {
  value: string;
  className?: string;
};

function parseStatValue(value: string) {
  const match = value.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { prefix: '', number: 0, suffix: value };
  }

  return {
    prefix: match[1],
    number: parseFloat(match[2]),
    suffix: match[3],
  };
}

export function StatValue({ value, className }: StatValueProps) {
  const reducedMotion = useReducedMotion();
  const { prefix, number, suffix } = parseStatValue(value);

  if (reducedMotion) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span className={className}>
      {prefix}
      <CountUp to={number} duration={2} />
      {suffix}
    </span>
  );
}
