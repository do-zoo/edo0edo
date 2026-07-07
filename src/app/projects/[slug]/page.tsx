import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PortableText } from '@/components/portable-text';
import { getProjectBySlug, getProjects } from '@/lib/sanity/fetch';
import { urlFor } from '@/lib/sanity/image';
import { creativeWorkJsonLd } from '@/lib/seo/json-ld';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} | Edwar`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const imageUrl = project.coverImage ? urlFor(project.coverImage) : null;
  const jsonLd = creativeWorkJsonLd({
    title: project.title,
    slug: project.slug.current,
    description: project.description,
    publishedAt: project.publishedAt,
    coverImageUrl: imageUrl || undefined,
    liveUrl: project.liveUrl,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="space-y-8 py-12">
        {imageUrl && (
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image src={imageUrl} alt={project.title} fill className="object-cover" />
          </div>
        )}
        <h1 className="text-4xl font-bold">{project.title}</h1>
        <p className="text-lg text-muted-foreground">{project.description}</p>
        {project.tags && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        )}
        <div className="flex gap-4">
          {project.liveUrl && (
            <Button asChild><Link href={project.liveUrl} target="_blank">Live Demo</Link></Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" asChild>
              <Link href={project.githubUrl} target="_blank">GitHub</Link>
            </Button>
          )}
        </div>
        {project.body && <PortableText value={project.body} />}
      </article>
    </>
  );
}
