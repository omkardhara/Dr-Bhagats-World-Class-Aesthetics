import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image as SanityImageSource } from "sanity";

import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

export type SanityImage = SanityImageSource & { alt?: string };

/**
 * Resolve a Sanity image to a CDN URL, or null when none is set.
 *
 * Returning null rather than a broken URL is what lets SanityPicture render
 * nothing at all: pages read as complete whether or not the clinic's own
 * photography has been uploaded yet. There is deliberately no stock fallback.
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
