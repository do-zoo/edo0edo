import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPublishedDate, getSlug, getTitle } from '@/lib/sanity/helpers';
import { urlFor } from '@/lib/sanity/image';
import type { PostListItem } from '@/lib/sanity/types';

export function BlogCard({ post }: { post: PostListItem }) {
  const slug = getSlug(post.slug);
  if (!slug) return null;

  const imageUrl = post.coverImage ? urlFor(post.coverImage) : null;
  const title = getTitle(post.title, 'Blog post');
  const date = formatPublishedDate(post.publishedAt);

  return (
    <Link href={`/blog/${slug}`}>
      <Card className="overflow-hidden border-border transition-opacity hover:opacity-80">
        {imageUrl && (
          <div className="relative aspect-video">
            <Image src={imageUrl} alt={title} fill className="object-cover" />
          </div>
        )}
        <CardHeader>
          <p className="text-xs text-muted-foreground">{date ?? 'Draft'}</p>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{post.excerpt}</p>
          {post.tags && (
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
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
