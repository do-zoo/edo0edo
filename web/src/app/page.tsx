import Link from 'next/link';
import { ProjectCard } from '@/components/project-card';
import { SkillGrid } from '@/components/skill-grid';
import { StatsSection } from '@/components/stats-section';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { about } from '@/data/about';
import { getFeaturedProjects } from '@/lib/sanity/fetch';

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="space-y-24 py-12">
      <section className="flex min-h-[80vh] flex-col items-center justify-center text-center">
        <Avatar className="h-32 w-32">
          <AvatarImage src="/images/jpg/hero-avatar.jpg" alt={about.name} />
          <AvatarFallback>{about.name[0]}</AvatarFallback>
        </Avatar>
        <h1 className="mt-8 text-4xl font-bold tracking-tight md:text-5xl">
          Hello, I&apos;m {about.name}
        </h1>
        <p className="mt-2 text-xl text-muted-foreground">
          {about.title} based in {about.location}
        </p>
        <p className="mt-4 max-w-xl text-muted-foreground">{about.bio}</p>
        <div className="mt-8 flex gap-4">
          <Button asChild>
            <Link href={`mailto:${about.social.email}`}>Get in Touch</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link
              href={about.social.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              View All Works
            </Link>
          </Button>
        </div>
      </section>

      {featuredProjects.length > 0 && (
        <section>
          <h2 className="mb-8 text-2xl font-bold">Featured Projects</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-8 text-2xl font-bold">At a Glance</h2>
        <StatsSection />
      </section>

      <section>
        <h2 className="mb-8 text-2xl font-bold">What I Do</h2>
        <SkillGrid />
      </section>

      <section className="rounded-lg border border-border bg-muted p-12 text-center">
        <h2 className="text-2xl font-bold">Let&apos;s Work Together</h2>
        <p className="mt-4 text-muted-foreground">
          Have a project in mind? I&apos;d love to hear about it.
        </p>
        <Button asChild className="mt-6">
          <Link href={`mailto:${about.social.email}`}>Send Me an Email</Link>
        </Button>
      </section>
    </div>
  );
}
