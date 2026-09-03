import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";
import { getClient } from "@/sanity/lib/client";
import {
  concernSlugsQuery,
  treatmentSlugsQuery,
} from "@/sanity/lib/queries";

const STATIC_ROUTES = [
  { path: "/", priority: 1 },
  { path: "/services", priority: 0.9 },
  { path: "/concerns", priority: 0.9 },
  { path: "/book", priority: 0.9 },
  { path: "/technology", priority: 0.8 },
  { path: "/contact", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/testimonials", priority: 0.6 },
] as const;

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ({ path, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: "monthly",
      priority,
    })
  );

  let concernSlugs: string[] = [];
  let treatmentSlugs: string[] = [];
  try {
    const client = getClient();
    [concernSlugs, treatmentSlugs] = await Promise.all([
      client.fetch<string[]>(concernSlugsQuery),
      client.fetch<string[]>(treatmentSlugsQuery),
    ]);
  } catch (error) {
    // A sitemap missing content pages is better than a failed build.
    console.error("[sitemap] Sanity fetch failed:", error);
  }

  return [
    ...staticEntries,
    ...concernSlugs.map((slug) => ({
      url: `${SITE_URL}/concerns/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...treatmentSlugs.map((slug) => ({
      url: `${SITE_URL}/services/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
