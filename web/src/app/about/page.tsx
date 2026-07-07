import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeading } from '@/components/section-heading';
import { SkillGrid } from '@/components/skill-grid';
import { StatsSection } from '@/components/stats-section';
import { Button } from '@/components/ui/button';
import { about } from '@/data/about';
import { ArrowUpRight, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About | Edwar',
  description: about.bio,
};

export default function AboutPage() {
  return (
    <div className="space-y-20 py-12 md:space-y-24 md:py-16">
      <section>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
          About
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          About Me
        </h1>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          {about.title} · {about.location}
        </p>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {about.longBio}
        </p>
      </section>

      <section>
        <SectionHeading eyebrow="Overview" title="Stats" />
        <StatsSection />
      </section>

      <section>
        <SectionHeading
          eyebrow="Expertise"
          title="Skills"
          description="Technologies and tools I work with daily."
        />
        <SkillGrid />
      </section>

      <section className="gradient-border p-10 text-center">
        <h2 className="font-display text-2xl font-bold">
          Interested in working together?
        </h2>
        <p className="mt-3 text-muted-foreground">
          Drop me a line and let&apos;s discuss your next project.
        </p>
        <Button asChild size="lg" className="mt-6 gap-2">
          <Link href={`mailto:${about.social.email}`}>
            Get in Touch
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
