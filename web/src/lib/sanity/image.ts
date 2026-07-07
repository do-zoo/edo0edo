import {
  createImageUrlBuilder,
  type SanityImageSource,
} from '@sanity/image-url';
import { imageLoader } from 'next-sanity/image';
import { client, dataset, projectId } from './client';

const builder =
  client && projectId ? createImageUrlBuilder({ projectId, dataset }) : null;

type UrlForOptions = {
  width?: number;
  height?: number;
};

/** Base Sanity CDN URL for next/image with `sanityImageLoader`. */
export function urlFor(
  source: SanityImageSource,
  options?: UrlForOptions,
) {
  if (!builder || !source) return '';
  let image = builder.image(source).auto('format');
  if (options?.width) image = image.width(options.width);
  if (options?.height) image = image.height(options.height);
  if (options?.width && options?.height) image = image.fit('crop');
  return image.url();
}

/** Use with next/image when rendering Sanity cover images. */
export { imageLoader as sanityImageLoader };
