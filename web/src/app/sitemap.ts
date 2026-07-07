import type { MetadataRoute } from 'next';
import { getPosts, getProjects } from '@/lib/sanity/fetch';
import { getSlug } from '@/lib/sanity/helpers';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://edo0edo.me';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const projects = await getProjects();
  const projectRoutes: MetadataRoute.Sitemap = projects.flatMap((project) => {
    const slug = getSlug(project.slug);
    if (!slug) return [];

    return [
      {
        url: `${baseUrl}/projects/${slug}`,
        lastModified: project.publishedAt
          ? new Date(project.publishedAt)
          : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
    ];
  });

  const posts = await getPosts();
  const postRoutes: MetadataRoute.Sitemap = posts.flatMap((post) => {
    const slug = getSlug(post.slug);
    if (!slug) return [];

    return [
      {
        url: `${baseUrl}/blog/${slug}`,
        lastModified: post.publishedAt
          ? new Date(post.publishedAt)
          : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
    ];
  });

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
