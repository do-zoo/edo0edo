import type { Metadata } from 'next';
import { BlogCard } from '@/components/blog-card';
import { SectionHeading } from '@/components/section-heading';
import { getPosts } from '@/lib/sanity/fetch';

export const metadata: Metadata = {
  title: 'Blog | Edwar',
  description: 'Thoughts on web development, JavaScript, and building things.',
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="space-y-10 py-12 md:py-16">
      <SectionHeading
        eyebrow="Writing"
        title="Blog"
        description="Thoughts on web development, JavaScript, and building things."
      />
      {posts.length === 0 ? (
        <p className="text-muted-foreground">Blog posts coming soon.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:gap-8">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
