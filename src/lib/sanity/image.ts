import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';
import type { SanityImage } from './types';

const builder = client ? imageUrlBuilder(client) : null;

export function urlFor(source: SanityImage) {
  if (!builder) return '';
  return builder.image(source).width(800).height(600).url();
}
