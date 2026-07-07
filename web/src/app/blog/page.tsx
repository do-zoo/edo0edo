import type { Metadata } from 'next';
import { AnimatedSection } from '@/components/animated-section';
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
      <AnimatedSection>
        <SectionHeading
          eyebrow="Writing"
          title="Blog"
          description="Thoughts on web development, JavaScript, and building things."
        />
      </AnimatedSection>
      {posts.length === 0 ? (
        <AnimatedSection delay={0.1}>
          <p className="text-muted-foreground">Blog posts coming soon.</p>
        </AnimatedSection>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:gap-8">
          {posts.map((post, index) => (
            <AnimatedSection key={post._id} delay={index * 0.08}>
              <BlogCard post={post} />
            </AnimatedSection>
          ))}
        </div>
      )}
    </div>
  );
}
