import type { Metadata } from 'next';
import { BlogCard } from '@/components/blog-card';
import { getPosts } from '@/lib/sanity/fetch';

export const metadata: Metadata = {
  title: 'Blog | Edwar',
  description: 'Thoughts on web development, JavaScript, and building things.',
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="space-y-8 py-12">
      <h1 className="text-4xl font-bold">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-muted-foreground">Blog posts coming soon.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
