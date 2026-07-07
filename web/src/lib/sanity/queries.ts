import { defineQuery } from 'next-sanity';

export const projectsQuery =
  defineQuery(`*[_type == "project"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  description,
  coverImage {
    asset->{
      _id,
      url,
      metadata { lqip, dimensions }
    },
    alt
  },
  tags,
  liveUrl,
  githubUrl,
  featured,
  publishedAt
}`);

export const projectBySlugQuery =
  defineQuery(`*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  coverImage {
    asset->{
      _id,
      url,
      metadata { lqip, dimensions }
    },
    alt
  },
  tags,
  liveUrl,
  githubUrl,
  featured,
  publishedAt,
  body
}`);

export const featuredProjectsQuery =
  defineQuery(`*[_type == "project" && featured == true] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  description,
  coverImage {
    asset->{
      _id,
      url,
      metadata { lqip, dimensions }
    },
    alt
  },
  tags,
  liveUrl,
  githubUrl,
  publishedAt
}`);

export const projectSlugsQuery =
  defineQuery(`*[_type == "project" && defined(slug.current)]{
  "slug": slug.current
}`);

export const postsQuery =
  defineQuery(`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  coverImage {
    asset->{
      _id,
      url,
      metadata { lqip, dimensions }
    },
    alt
  },
  tags,
  publishedAt
}`);

export const postBySlugQuery =
  defineQuery(`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  coverImage {
    asset->{
      _id,
      url,
      metadata { lqip, dimensions }
    },
    alt
  },
  tags,
  publishedAt,
  body
}`);

export const postSlugsQuery =
  defineQuery(`*[_type == "post" && defined(slug.current)]{
  "slug": slug.current
}`);
