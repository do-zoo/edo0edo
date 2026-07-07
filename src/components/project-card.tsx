import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { urlFor } from '@/lib/sanity/image';
import type { Project } from '@/lib/sanity/types';

export function ProjectCard({ project }: { project: Project }) {
  const imageUrl = project.coverImage ? urlFor(project.coverImage) : null;

  return (
    <Link href={`/projects/${project.slug.current}`}>
      <Card className="overflow-hidden border-border transition-opacity hover:opacity-80">
        {imageUrl && (
          <div className="relative aspect-video">
            <Image src={imageUrl} alt={project.title} fill className="object-cover" />
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-lg">{project.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{project.description}</p>
          {project.tags && (
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
