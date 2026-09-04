/**
 * TEMPORARY STOCK PHOTOGRAPHY.
 *
 * Every image here is a licensed stock placeholder from Unsplash, standing in
 * until the clinic's own photoshoot is delivered. The Unsplash licence permits
 * commercial use without attribution, but these are not photographs of this
 * practice, its staff, its premises or its patients.
 *
 * Rules that must hold while these are in place:
 *
 *  - Never present them as the doctors. The portrait slots on /about stay as
 *    neutral placeholders rather than showing a stock face under a real name.
 *  - Never present them as patients, results, or before/after evidence. On a
 *    medical site that shifts from placeholder to misrepresentation.
 *  - Alt text describes the photograph, never claims it depicts this clinic.
 *
 * Delete this file once the real photography lands; images then come from
 * Sanity, where they can be changed without a deploy.
 */

export type StockImage = {
  src: string;
  /** Describes the photograph itself, making no claim about the practice. */
  alt: string;
  width: number;
  height: number;
};

const BASE = "/images/stock";

export const STOCK = {
  facialPeel: {
    src: `${BASE}/treatment-facial-peel.jpg`,
    alt: "A clinician applying a facial treatment",
    width: 1800,
    height: 1200,
  },
  skincare: {
    src: `${BASE}/treatment-skincare.jpg`,
    alt: "A facial skincare treatment in progress",
    width: 1800,
    height: 1197,
  },
  microneedling: {
    src: `${BASE}/treatment-microneedling.jpg`,
    alt: "A microneedling treatment in progress",
    width: 1800,
    height: 1200,
  },
  laser: {
    src: `${BASE}/treatment-laser.jpg`,
    alt: "A laser treatment being performed",
    width: 1800,
    height: 1350,
  },
  mask: {
    src: `${BASE}/treatment-mask.jpg`,
    alt: "A treatment mask applied to the face",
    width: 1800,
    height: 1200,
  },
  consultRoom: {
    src: `${BASE}/interior-consult-room.jpg`,
    alt: "A calm consulting room interior",
    width: 1800,
    height: 1197,
  },
  clinicalRoom: {
    src: `${BASE}/interior-clinical-room.jpg`,
    alt: "A clinical treatment room with equipment",
    width: 1800,
    height: 1200,
  },
  texturePlaster: {
    src: `${BASE}/texture-plaster-warm.jpg`,
    alt: "",
    width: 1800,
    height: 1200,
  },
  textureNeutral: {
    src: `${BASE}/texture-neutral.jpg`,
    alt: "",
    width: 1800,
    height: 1440,
  },
} as const satisfies Record<string, StockImage>;

export type StockKey = keyof typeof STOCK;

/** Stable pick per concern category, so a page looks the same on every visit. */
const BY_CATEGORY: Record<string, StockKey> = {
  skin: "facialPeel",
  face: "mask",
  hair: "consultRoom",
  body: "laser",
};

export function stockForCategory(category: string): StockImage {
  return STOCK[BY_CATEGORY[category] ?? "skincare"];
}

/**
 * Stable pick per treatment. Hashing the slug keeps the choice deterministic
 * across builds, so pages do not shuffle their imagery on every deploy.
 */
const TREATMENT_POOL: StockKey[] = [
  "skincare",
  "microneedling",
  "laser",
  "facialPeel",
  "clinicalRoom",
];

export function stockForSlug(slug: string): StockImage {
  let hash = 0;
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return STOCK[TREATMENT_POOL[hash % TREATMENT_POOL.length]];
}
