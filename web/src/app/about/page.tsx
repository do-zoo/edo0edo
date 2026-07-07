import type { Metadata } from 'next';
import Link from 'next/link';
import { AboutHeroText } from '@/components/about-hero-text';
import { AnimatedSection } from '@/components/animated-section';
import { ElectricCta } from '@/components/electric-cta';
import { SectionHeading } from '@/components/section-heading';
import { SkillGrid } from '@/components/skill-grid';
import { StatsSection } from '@/components/stats-section';
import { Button } from '@/components/ui/button';
import { about } from '@/data/about';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About | Edwar',
  description: about.bio,
};

export default function AboutPage() {
  return (
    <div className="space-y-20 py-12 md:space-y-24 md:py-16">
      <AnimatedSection>
        <section>
          <AboutHeroText
            title="About Me"
            subtitle={`${about.title} · ${about.location}`}
            bio={about.longBio}
          />
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <section>
          <SectionHeading eyebrow="Overview" title="Stats" />
          <StatsSection />
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <section>
          <SectionHeading
            eyebrow="Expertise"
            title="Skills"
            description="Technologies and tools I work with daily."
          />
          <SkillGrid />
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <ElectricCta
          title="Interested in working together?"
          description="Drop me a line and let's discuss your next project."
        >
          <Button asChild size="lg" className="mt-6 gap-2">
            <Link href={`mailto:${about.social.email}`}>
              Get in Touch
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </ElectricCta>
      </AnimatedSection>
    </div>
  );
}
