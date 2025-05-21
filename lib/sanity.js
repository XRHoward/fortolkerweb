import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

const projectId = '7izj8dsr';
const dataset = 'production';
const apiVersion = '2023-05-03';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
