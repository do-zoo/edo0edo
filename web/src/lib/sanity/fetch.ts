import type { QueryParams } from 'next-sanity';
import { client, isSanityConfigured } from './client';
import {
  featuredProjectsQuery,
  postBySlugQuery,
  postSlugsQuery,
  postsQuery,
  projectBySlugQuery,
  projectSlugsQuery,
  projectsQuery,
} from './queries';
import type { Post, PostListItem, Project, ProjectListItem } from './types';

type FetchOptions = {
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
  useCdn?: boolean;
};

async function sanityFetch<T>(
  query: string,
  { params = {}, revalidate = 60, tags = [], useCdn = true }: FetchOptions = {},
): Promise<T | null> {
  if (!isSanityConfigured || !client) return null;

  try {
    return await client.withConfig({ useCdn }).fetch<T>(query, params, {
      next: {
        revalidate: tags.length ? false : revalidate,
        tags,
      },
    });
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return null;
  }
}

export async function getProjects(): Promise<ProjectListItem[]> {
  const result = await sanityFetch<ProjectListItem[]>(projectsQuery, {
    tags: ['project'],
  });
  return result ?? [];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return sanityFetch<Project>(projectBySlugQuery, {
    params: { slug },
    tags: ['project', `project:${slug}`],
  });
}

export async function getFeaturedProjects(): Promise<ProjectListItem[]> {
  const result = await sanityFetch<ProjectListItem[]>(featuredProjectsQuery, {
    tags: ['project'],
  });
  return result ?? [];
}

export async function getProjectSlugs(): Promise<string[]> {
  const result = await sanityFetch<Array<{ slug: string }>>(projectSlugsQuery, {
    useCdn: false,
    revalidate: false,
  });
  return result?.map((item) => item.slug) ?? [];
}

export async function getPosts(): Promise<PostListItem[]> {
  const result = await sanityFetch<PostListItem[]>(postsQuery, {
    tags: ['post'],
  });
  return result ?? [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return sanityFetch<Post>(postBySlugQuery, {
    params: { slug },
    tags: ['post', `post:${slug}`],
  });
}

export async function getPostSlugs(): Promise<string[]> {
  const result = await sanityFetch<Array<{ slug: string }>>(postSlugsQuery, {
    useCdn: false,
    revalidate: false,
  });
  return result?.map((item) => item.slug) ?? [];
}
