import { client, isSanityConfigured } from './client';
import {
  projectsQuery,
  projectBySlugQuery,
  featuredProjectsQuery,
  postsQuery,
  postBySlugQuery,
} from './queries';
import type { Project, Post } from './types';

async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!isSanityConfigured || !client) return null;
  try {
    return await client.fetch<T>(query, params, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return null;
  }
}

export async function getProjects(): Promise<Project[]> {
  const result = await sanityFetch<Project[]>(projectsQuery);
  return result ?? [];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return sanityFetch<Project>(projectBySlugQuery, { slug });
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const result = await sanityFetch<Project[]>(featuredProjectsQuery);
  return result ?? [];
}

export async function getPosts(): Promise<Post[]> {
  const result = await sanityFetch<Post[]>(postsQuery);
  return result ?? [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return sanityFetch<Post>(postBySlugQuery, { slug });
}
