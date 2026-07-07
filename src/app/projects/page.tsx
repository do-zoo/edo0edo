import type { Metadata } from 'next';
import { ProjectCard } from '@/components/project-card';
import { getProjects } from '@/lib/sanity/fetch';

export const metadata: Metadata = {
  title: 'Projects | Edwar',
  description: 'A collection of projects I have worked on.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-8 py-12">
      <h1 className="text-4xl font-bold">Projects</h1>
      {projects.length === 0 ? (
        <p className="text-muted-foreground">Projects coming soon.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
