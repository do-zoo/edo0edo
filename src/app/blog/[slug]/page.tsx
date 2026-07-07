import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { PortableText } from '@/components/portable-text';
import { getPostBySlug, getPosts } from '@/lib/sanity/fetch';
import { urlFor } from '@/lib/sanity/image';
import { blogPostingJsonLd } from '@/lib/seo/json-ld';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} | Edwar`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const imageUrl = post.coverImage ? urlFor(post.coverImage) : null;
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const jsonLd = blogPostingJsonLd({
    title: post.title,
    slug: post.slug.current,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    coverImageUrl: imageUrl || undefined,
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
            <Image src={imageUrl} alt={post.title} fill className="object-cover" />
          </div>
        )}
        <div>
          <p className="text-sm text-muted-foreground">{date}</p>
          <h1 className="mt-2 text-4xl font-bold">{post.title}</h1>
        </div>
        {post.tags && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        )}
        {post.body && <PortableText value={post.body} />}
      </article>
    </>
  );
}
