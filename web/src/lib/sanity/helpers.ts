export function getSlug(
  slug: { current?: string } | null | undefined,
): string | null {
  return slug?.current ?? null;
}

export function getTitle(
  title: string | null | undefined,
  fallback: string,
): string {
  return title ?? fallback;
}

export function formatPublishedDate(
  publishedAt: string | null | undefined,
): string | null {
  if (!publishedAt) return null;

  return new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
