'use client';

import GlareHover from '@/components/GlareHover';
import { about } from '@/data/about';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function SkillGrid() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="flex flex-wrap gap-2">
      {about.skills.map((skill) => {
        const pill = (
          <span className="rounded-lg border border-border/60 bg-card px-4 py-2.5 font-mono text-sm text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary">
            {skill}
          </span>
        );

        if (reducedMotion) {
          return <span key={skill}>{pill}</span>;
        }

        return (
          <GlareHover
            key={skill}
            width="auto"
            height="auto"
            background="transparent"
            borderRadius="0.5rem"
            borderColor="transparent"
            glareColor="#f59e0b"
            glareOpacity={0.25}
            glareSize={180}
            className="!h-auto !w-auto !cursor-default !border-0 !bg-transparent"
            style={{ width: 'auto', height: 'auto' }}
          >
            {pill}
          </GlareHover>
        );
      })}
    </div>
  );
}
