'use client';

import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import SpotlightCard from '@/components/SpotlightCard';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { formatPublishedDate, getSlug, getTitle } from '@/lib/sanity/helpers';
import { urlFor } from '@/lib/sanity/image';
import type { PostListItem } from '@/lib/sanity/types';

export function BlogCard({ post }: { post: PostListItem }) {
  const reducedMotion = useReducedMotion();
  const slug = getSlug(post.slug);
  if (!slug) return null;

  const imageUrl = post.coverImage ? urlFor(post.coverImage) : null;
  const title = getTitle(post.title, 'Blog post');
  const date = formatPublishedDate(post.publishedAt);

  const card = (
    <Card className="card-hover h-full overflow-hidden bg-card ring-border/60">
      {imageUrl && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      )}
      <CardHeader>
        <p className="font-mono text-xs text-primary">{date ?? 'Draft'}</p>
        <CardTitle className="font-display text-lg transition-colors group-hover:text-primary">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {post.excerpt}
        </p>
        {post.tags && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-secondary/80 text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
          Read article <ArrowUpRight className="h-3 w-3" />
        </span>
      </CardContent>
    </Card>
  );

  return (
    <Link href={`/blog/${slug}`} className="group block">
      {reducedMotion ? (
        card
      ) : (
        <SpotlightCard
          spotlightColor="rgba(245, 158, 11, 0.25)"
          className="!rounded-xl !border-border !bg-card !p-0"
        >
          {card}
        </SpotlightCard>
      )}
    </Link>
  );
}
