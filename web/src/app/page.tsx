import { ArrowUpRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import { ProjectCard } from '@/components/project-card';
import { SectionHeading } from '@/components/section-heading';
import { SkillGrid } from '@/components/skill-grid';
import { StatsSection } from '@/components/stats-section';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { about } from '@/data/about';
import { getFeaturedProjects } from '@/lib/sanity/fetch';

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="space-y-28 pb-12 md:space-y-32 md:pb-16">
      {/* Hero */}
      <section className="relative -mt-16 flex min-h-screen flex-col justify-center pt-16 pb-8 md:pb-12">
        <div
          className="pointer-events-none absolute -top-16 bottom-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden"
          aria-hidden
        >
          <div className="bg-grid absolute inset-0 opacity-25" />
          <div className="bg-noise absolute inset-0" />
          <div className="glow-orb -top-32 left-1/4 h-96 w-96 bg-primary/15" />
          <div className="glow-orb top-1/2 right-1/4 h-80 w-80 bg-accent/10" />
        </div>

        <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <div className="max-w-2xl">
            <div className="animate-fade-up mb-5 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3.5 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="font-mono text-xs font-medium text-primary">
                Open to opportunities
              </span>
            </div>

            <h1 className="animate-fade-up-delay-1 font-display font-bold leading-[1.05] tracking-tight">
              <span className="block text-4xl text-foreground/80 md:text-5xl">
                Hello, I&apos;m
              </span>
              <span className="text-gradient mt-1 block text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                {about.name}
              </span>
            </h1>

            <p className="animate-fade-up-delay-2 mt-5 text-xl font-semibold text-foreground md:text-2xl">
              {about.title}
            </p>

            <p className="animate-fade-up-delay-2 mt-2 flex items-center gap-1.5 text-sm text-foreground/60">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
              {about.location}
            </p>

            <p className="animate-fade-up-delay-3 mt-5 text-base leading-relaxed text-foreground/65 md:text-lg">
              {about.bio}
            </p>

            <div className="animate-fade-up-delay-4 mt-8 flex flex-wrap gap-3">
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
          </div>

          <div className="animate-fade-up-delay-2 relative flex justify-center lg:justify-end">
            <div className="absolute -inset-8 rounded-full bg-primary/20 blur-3xl" />
            <Avatar className="relative h-48 w-48 shadow-[0_0_48px_-8px] shadow-primary/40 ring-2 ring-primary/50 ring-offset-4 ring-offset-background after:hidden md:h-60 md:w-60 xl:h-72 xl:w-72">
              <AvatarImage
                src="/images/jpg/hero-avatar.jpg"
                alt={about.name}
                className="object-cover"
              />
              <AvatarFallback className="text-4xl font-display">
                {about.name[0]}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </section>

      {featuredProjects.length > 0 && (
        <section>
          <SectionHeading
            eyebrow="Portfolio"
            title="Featured Projects"
            description="Selected work spanning web apps, tools, and digital experiences."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionHeading
          eyebrow="Overview"
          title="At a Glance"
          description="Numbers that reflect my commitment to quality work."
        />
        <StatsSection />
      </section>

      <section>
        <SectionHeading
          eyebrow="Expertise"
          title="What I Do"
          description="Technologies and tools I use to bring ideas to life."
        />
        <SkillGrid />
      </section>

      <section className="gradient-border relative overflow-hidden p-10 text-center md:p-14">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
          aria-hidden
        />
        <div className="relative">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            Collaboration
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            Let&apos;s Work Together
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Have a project in mind? I&apos;d love to hear about it and help you
            build something great.
          </p>
          <Button asChild size="lg" className="mt-8 gap-2">
            <Link href={`mailto:${about.social.email}`}>
              Send Me an Email
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
