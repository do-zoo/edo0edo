import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SkillGrid } from '@/components/skill-grid';
import { StatsSection } from '@/components/stats-section';
import { about } from '@/data/about';

export const metadata: Metadata = {
  title: 'About | Edwar',
  description: about.bio,
};

export default function AboutPage() {
  return (
    <div className="space-y-16 py-12">
      <section>
        <h1 className="text-4xl font-bold">About Me</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{about.longBio}</p>
        <p className="mt-4 text-muted-foreground">
          {about.title} · {about.location}
        </p>
      </section>

      <section>
        <h2 className="mb-8 text-2xl font-bold">Stats</h2>
        <StatsSection />
      </section>

      <section>
        <h2 className="mb-8 text-2xl font-bold">Skills</h2>
        <SkillGrid />
      </section>

      <section className="text-center">
        <Button asChild>
          <Link href={`mailto:${about.social.email}`}>Get in Touch</Link>
        </Button>
      </section>
    </div>
  );
}
