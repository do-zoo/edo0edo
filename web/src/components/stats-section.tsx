import { about } from '@/data/about';

const stats = [
  { label: 'Projects Done', value: about.stats.projects },
  { label: 'Experience', value: about.stats.experience },
  { label: 'Client Satisfaction', value: about.stats.satisfaction },
];

export function StatsSection() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            {stat.label}
          </p>
          <p className="mt-2 text-3xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
