import type { PortableTextBlock } from '@portabletext/react';

export interface SanityImage {
  _type: 'image';
  asset: { _ref: string; _type: 'reference' };
}

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  coverImage?: SanityImage;
  tags?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  publishedAt: string;
  body?: PortableTextBlock[];
}

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  coverImage?: SanityImage;
  tags?: string[];
  publishedAt: string;
  body?: PortableTextBlock[];
}
