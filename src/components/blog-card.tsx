import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { urlFor } from '@/lib/sanity/image';
import type { Post } from '@/lib/sanity/types';

export function BlogCard({ post }: { post: Post }) {
  const imageUrl = post.coverImage ? urlFor(post.coverImage) : null;
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug.current}`}>
      <Card className="overflow-hidden border-border transition-opacity hover:opacity-80">
        {imageUrl && (
          <div className="relative aspect-video">
            <Image src={imageUrl} alt={post.title} fill className="object-cover" />
          </div>
        )}
        <CardHeader>
          <p className="text-xs text-muted-foreground">{date}</p>
          <CardTitle className="text-lg">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{post.excerpt}</p>
          {post.tags && (
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
