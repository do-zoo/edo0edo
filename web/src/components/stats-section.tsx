import { Briefcase, Clock, Star } from 'lucide-react';
import { about } from '@/data/about';

const stats = [
  {
    label: 'Projects Done',
    value: about.stats.projects,
    icon: Briefcase,
  },
  {
    label: 'Experience',
    value: about.stats.experience,
    icon: Clock,
  },
  {
    label: 'Client Satisfaction',
    value: about.stats.satisfaction,
    icon: Star,
  },
];

export function StatsSection() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group rounded-xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:bg-card/80"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
              <stat.icon className="h-5 w-5" />
            </div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </p>
          </div>
          <p className="mt-4 font-display text-4xl font-bold tracking-tight">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
