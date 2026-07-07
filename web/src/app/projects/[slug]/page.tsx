import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectDetail } from '@/components/project-detail';
import { getProjectBySlug, getProjectSlugs } from '@/lib/sanity/fetch';
import { getTitle } from '@/lib/sanity/helpers';
import { urlFor } from '@/lib/sanity/image';
import { creativeWorkJsonLd } from '@/lib/seo/json-ld';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${getTitle(project.title, 'Project')} | Edwar`,
    description: project.description ?? undefined,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const imageUrl = project.coverImage
    ? urlFor(project.coverImage, { width: 1200, height: 630 })
    : null;
  const jsonLd = creativeWorkJsonLd({
    title: project.title ?? 'Project',
    slug,
    description: project.description ?? '',
    publishedAt: project.publishedAt ?? new Date().toISOString(),
    coverImageUrl: imageUrl || undefined,
    liveUrl: project.liveUrl ?? undefined,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <ProjectDetail project={project} />
      </article>
    </>
  );
}
