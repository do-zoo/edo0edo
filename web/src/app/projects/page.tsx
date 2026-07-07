import type { Metadata } from 'next';
import { AnimatedSection } from '@/components/animated-section';
import { ProjectCard } from '@/components/project-card';
import { SectionHeading } from '@/components/section-heading';
import { getProjects } from '@/lib/sanity/fetch';

export const metadata: Metadata = {
  title: 'Projects | Edwar',
  description: 'A collection of projects I have worked on.',
  alternates: {
    canonical: '/projects',
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-10 py-12 md:py-16">
      <AnimatedSection>
        <SectionHeading
          eyebrow="Portfolio"
          title="Projects"
          description="A collection of web applications, tools, and digital experiences I've built."
        />
      </AnimatedSection>
      {projects.length === 0 ? (
        <AnimatedSection delay={0.1}>
          <p className="text-muted-foreground">Projects coming soon.</p>
        </AnimatedSection>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:gap-8">
          {projects.map((project, index) => (
            <AnimatedSection key={project._id} delay={index * 0.08}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>
      )}
    </div>
  );
}
