import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSlug, getTitle } from '@/lib/sanity/helpers';
import { urlFor } from '@/lib/sanity/image';
import type { ProjectListItem } from '@/lib/sanity/types';

export function ProjectCard({ project }: { project: ProjectListItem }) {
  const slug = getSlug(project.slug);
  if (!slug) return null;

  const imageUrl = project.coverImage ? urlFor(project.coverImage) : null;
  const title = getTitle(project.title, 'Project');

  return (
    <Link href={`/projects/${slug}`}>
      <Card className="overflow-hidden border-border transition-opacity hover:opacity-80">
        {imageUrl && (
          <div className="relative aspect-video">
            <Image src={imageUrl} alt={title} fill className="object-cover" />
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{project.description}</p>
          {project.tags && (
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
