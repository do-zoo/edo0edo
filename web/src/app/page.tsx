import { ArrowUpRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import { AnimatedSection } from '@/components/animated-section';
import { ElectricCta } from '@/components/electric-cta';
import { HeroAvatar } from '@/components/hero-avatar';
import { HeroBackground } from '@/components/hero-background';
import { HeroHeadline } from '@/components/hero-headline';
import { ProjectCard } from '@/components/project-card';
import { SectionHeading } from '@/components/section-heading';
import { SkillGrid } from '@/components/skill-grid';
import { StatsSection } from '@/components/stats-section';
import { Button } from '@/components/ui/button';
import { about } from '@/data/about';
import { getFeaturedProjects } from '@/lib/sanity/fetch';

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="space-y-28 pb-12 md:space-y-32 md:pb-16">
      <section className="relative -mt-16 flex min-h-screen flex-col justify-center pt-16 pb-8 md:pb-12">
        <HeroBackground />

        <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <div className="max-w-2xl">
            <AnimatedSection delay={0}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3.5 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="font-mono text-xs font-medium text-primary">
                  Open to opportunities
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <HeroHeadline name={about.name} />
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <p className="mt-5 text-xl font-semibold text-foreground md:text-2xl">
                {about.title}
              </p>

              <p className="mt-2 flex items-center gap-1.5 text-sm text-foreground/60">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                {about.location}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="mt-5 text-base leading-relaxed text-foreground/65 md:text-lg">
                {about.bio}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="h-11 gap-2 px-6 text-sm font-semibold"
                >
                  <Link href={`mailto:${about.social.email}`}>
                    Get in Touch
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="h-11 border-foreground/20 bg-foreground/5 px-6 text-sm font-medium hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                >
                  <Link href="/projects">View All Works</Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.15} className="relative">
            <HeroAvatar name={about.name} src="/images/jpg/hero-avatar.jpg" />
          </AnimatedSection>
        </div>
      </section>

      {featuredProjects.length > 0 && (
        <AnimatedSection>
          <section>
            <SectionHeading
              eyebrow="Portfolio"
              title="Featured Projects"
              description="Selected work spanning web apps, tools, and digital experiences."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:gap-8">
              {featuredProjects.map((project, index) => (
                <AnimatedSection key={project._id} delay={index * 0.08}>
                  <ProjectCard project={project} />
                </AnimatedSection>
              ))}
            </div>
          </section>
        </AnimatedSection>
      )}

      <AnimatedSection>
        <section>
          <SectionHeading
            eyebrow="Overview"
            title="At a Glance"
            description="Numbers that reflect my commitment to quality work."
          />
          <StatsSection />
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section>
          <SectionHeading
            eyebrow="Expertise"
            title="What I Do"
            description="Technologies and tools I use to bring ideas to life."
          />
          <SkillGrid />
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <ElectricCta
          eyebrow="Collaboration"
          title="Let's Work Together"
          description="Have a project in mind? I'd love to hear about it and help you build something great."
        >
          <Button asChild size="lg" className="mt-8 gap-2">
            <Link href={`mailto:${about.social.email}`}>
              Send Me an Email
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </ElectricCta>
      </AnimatedSection>
    </div>
  );
}
