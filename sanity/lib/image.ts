import imageUrlBuilder from "@sanity/image-url";
import type { Image as SanityImageSource } from "sanity";

import { dataset, projectId } from "../env";

const builder = imageUrlBuilder({ projectId, dataset });

export type SanityImage = SanityImageSource & { alt?: string };

/**
 * Resolve a Sanity image to a CDN URL, or null when none is set.
 *
 * Returning null rather than a broken URL is what lets EditorialImage fall
 * back to the stock placeholder: pages work identically whether or not the
 * photography has been uploaded yet.
 */
export function imageProps(
  image: SanityImage | null | undefined,
  width = 1800
): { url: string; alt?: string } | null {
  if (!image?.asset) return null;
  return {
    url: builder.image(image).width(width).auto("format").quality(80).url(),
    alt: image.alt,
  };
}
