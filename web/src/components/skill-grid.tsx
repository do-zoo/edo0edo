import { about } from '@/data/about';

export function SkillGrid() {
  return (
    <div className="flex flex-wrap gap-2">
      {about.skills.map((skill) => (
        <span
          key={skill}
          className="rounded-lg border border-border/60 bg-card px-4 py-2.5 font-mono text-sm text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
        >
          {skill}
        </span>
      ))}
    </div>
  );
}
