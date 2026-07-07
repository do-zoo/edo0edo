import { about } from '@/data/about';

const SITE_URL = 'https://edo0edo.me';
const AVATAR_URL = `${SITE_URL}/images/jpg/hero-avatar.jpg`;

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: about.name,
    url: SITE_URL,
    image: {
      '@type': 'ImageObject',
      contentUrl: AVATAR_URL,
      license: `${SITE_URL}/license`,
      acquireLicensePage: `${SITE_URL}/image-usage`,
      creditText: 'Edo0Edo Studio',
      creator: { '@type': 'Person', name: 'Edo' },
      copyrightNotice: 'Edo',
    },
    jobTitle: 'Web Developer',
    worksFor: { '@type': 'Organization', name: 'Freelance' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jakarta',
      addressCountry: 'Indonesia',
    },
    description:
      'Professional Web Developer based in Jakarta, Indonesia. Specializing in modern websites and web applications.',
    sameAs: [
      about.social.github,
      about.social.linkedin,
      about.social.instagram,
    ],
  };
}

export function reviewJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: 'Isa J.P Simanjuntak',
      url: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7138236835821977600',
    },
    publisher: { '@type': 'Organization', name: 'LinkedIn' },
    datePublished: '2024-03-31',
    description:
      'It was a pleasure working with Edwar. Fast response, can provide the best input and can apply web ideas with maximum results 👍🔥 Excellent!',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
      worstRating: '1',
    },
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: 'Edo Web Development',
      url: SITE_URL,
      image: {
        '@type': 'ImageObject',
        contentUrl: AVATAR_URL,
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Jakarta',
        addressLocality: 'Jakarta',
        addressCountry: 'ID',
        postalCode: '11320',
      },
      telephone: '+62-851-5735-8266',
      priceRange: '$$',
      description:
        'Professional freelance web development service based in Jakarta, Indonesia.',
    },
  };
}

export function blogPostingJsonLd(post: {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt?: string;
  modifiedAt?: string;
  coverImageUrl?: string;
}) {
  const jsonLd: {
    '@context': 'https://schema.org';
    '@type': 'BlogPosting';
    headline: string;
    description: string;
    url: string;
    image?: string;
    author: { '@type': 'Person'; name: string; url: string };
    mainEntityOfPage: string;
    publisher: { '@type': 'Person'; name: string; url: string };
    inLanguage: string;
    datePublished?: string;
    dateModified?: string;
  } = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${post.slug}`,
    image: post.coverImageUrl,
    author: { '@type': 'Person', name: about.name, url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    publisher: {
      '@type': 'Person',
      name: about.name,
      url: SITE_URL,
    },
    inLanguage: 'en',
  };

  if (post.publishedAt) jsonLd.datePublished = post.publishedAt;
  if (post.modifiedAt) jsonLd.dateModified = post.modifiedAt;

  return jsonLd;
}

export function creativeWorkJsonLd(project: {
  title: string;
  slug: string;
  description: string;
  publishedAt?: string;
  modifiedAt?: string;
  coverImageUrl?: string;
  liveUrl?: string;
}) {
  const jsonLd: {
    '@context': 'https://schema.org';
    '@type': 'CreativeWork';
    name: string;
    description: string;
    url: string;
    image?: string;
    author: { '@type': 'Person'; name: string; url: string };
    mainEntityOfPage: string;
    inLanguage: string;
    datePublished?: string;
    dateModified?: string;
    sameAs?: string;
  } = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: `${SITE_URL}/projects/${project.slug}`,
    image: project.coverImageUrl,
    author: { '@type': 'Person', name: about.name, url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/projects/${project.slug}`,
    inLanguage: 'en',
  };

  if (project.publishedAt) jsonLd.datePublished = project.publishedAt;
  if (project.modifiedAt) jsonLd.dateModified = project.modifiedAt;
  if (project.liveUrl) jsonLd.sameAs = project.liveUrl;

  return jsonLd;
}
