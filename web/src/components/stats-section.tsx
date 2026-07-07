import { Briefcase, Clock, Star } from 'lucide-react';
import { StatValue } from '@/components/stat-value';
import { about } from '@/data/about';
import { getProjectCount } from '@/lib/sanity/fetch';
import {
  formatExperienceYears,
  formatProjectCount,
  getYearsOfExperience,
} from '@/lib/stats';

export async function StatsSection() {
  const projectCount = await getProjectCount();
  const experienceYears = getYearsOfExperience();

  const stats = [
    {
      label: 'Projects Done',
      value: formatProjectCount(projectCount),
      icon: Briefcase,
    },
    {
      label: 'Experience',
      value: formatExperienceYears(experienceYears),
      icon: Clock,
    },
    {
      label: 'Client Satisfaction',
      value: about.stats.satisfaction,
      icon: Star,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group rounded-xl border border-border/60 bg-card p-6 md:p-8 transition-all duration-300 hover:border-primary/30 hover:bg-card/80"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
              <stat.icon className="h-5 w-5" />
            </div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </p>
          </div>
          <StatValue
            value={stat.value}
            className="mt-4 block font-display text-4xl font-bold tracking-tight"
          />
        </div>
      ))}
    </div>
  );
}
