import {
  createImageUrlBuilder,
  type SanityImageSource,
} from '@sanity/image-url';
import { client, dataset, projectId } from './client';

const builder =
  client && projectId ? createImageUrlBuilder({ projectId, dataset }) : null;

export function urlFor(source: SanityImageSource) {
  if (!builder || !source) return '';
  return builder.image(source).width(800).height(600).fit('crop').url();
}
