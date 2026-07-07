import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PortableText } from '@/components/portable-text';
import { Badge } from '@/components/ui/badge';
import { getPostBySlug, getPostSlugs } from '@/lib/sanity/fetch';
import { formatPublishedDate, getTitle } from '@/lib/sanity/helpers';
import { sanityImageLoader, urlFor } from '@/lib/sanity/image';
import { blogPostingJsonLd } from '@/lib/seo/json-ld';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${getTitle(post.title, 'Blog Post')} | Edwar`,
    description: post.excerpt ?? undefined,
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const title = getTitle(post.title, 'Blog Post');
  const imageUrl = post.coverImage ? urlFor(post.coverImage) : null;
  const date = formatPublishedDate(post.publishedAt);
  const jsonLd = blogPostingJsonLd({
    title: post.title ?? 'Untitled',
    slug,
    excerpt: post.excerpt ?? '',
    publishedAt: post.publishedAt ?? new Date().toISOString(),
    coverImageUrl: imageUrl || undefined,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="space-y-8 py-12 md:py-16">
        {imageUrl && (
          <div className="relative aspect-video overflow-hidden rounded-xl ring-1 ring-border/60">
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              loader={sanityImageLoader}
              className="object-cover"
            />
          </div>
        )}
        <div>
          <p className="font-mono text-xs text-primary">{date ?? 'Draft'}</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">
            {title}
          </h1>
        </div>
        {post.tags && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {post.body && <PortableText value={post.body} />}
      </article>
    </>
  );
}
