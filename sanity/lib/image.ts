import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image as SanityImageSource } from "sanity";

import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

export type SanityImage = SanityImageSource & { alt?: string };

/** The shapes a slot can ask for, as width ÷ height. */
export const RATIO: Record<string, number> = {
  "21/9": 21 / 9,
  "16/9": 16 / 9,
  "4/3": 4 / 3,
  "3/4": 3 / 4,
  "1/1": 1,
};

/**
 * Resolve a Sanity image to a CDN URL, or null when none is set.
 *
 * Returning null rather than a broken URL is what lets SanityPicture render
 * nothing at all: pages read as complete whether or not the clinic's own
 * photography has been uploaded yet. There is deliberately no stock fallback.
 *
 * Passing `ratio` asks Sanity for that exact shape, cropped around the hotspot
 * set in the Studio. This is what lets one photograph serve slots of different
 * shapes - a 3:4 portrait and a 21:9 banner from the same file - without a face
 * being cut off by a blind centre crop.
 */
export function imageProps(
  image: SanityImage | null | undefined,
  width = 1800,
  ratio?: keyof typeof RATIO | (string & {})
): { url: string; alt?: string } | null {
  if (!image?.asset) return null;
  const aspect = ratio ? RATIO[ratio] : undefined;
  let url = builder.image(image).width(width);
  if (aspect) url = url.height(Math.round(width / aspect)).fit("crop");
  return {
    url: url.auto("format").quality(80).url(),
    alt: image.alt,
  };
}
