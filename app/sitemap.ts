import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";
import { getClient } from "@/sanity/lib/client";
import { sitemapEntriesQuery } from "@/sanity/lib/queries";

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

type Entry = { slug: string; _updatedAt: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let data: {
    concerns: Entry[];
    treatments: Entry[];
    machines: Entry[];
    latest: string | null;
  } | null = null;

  try {
    data = await getClient().fetch(sitemapEntriesQuery);
  } catch (error) {
    // A sitemap missing content pages beats a failed build.
    console.error("[sitemap] Sanity fetch failed:", error);
  }

  // Static pages have no per-page edit history, so they inherit the most
  // recent content change rather than claiming "now" on every crawl.
  const fallback = data?.latest ? new Date(data.latest) : new Date();

  const section = (items: Entry[] | undefined, prefix: string, priority: number) =>
    (items ?? []).map((item) => ({
      url: `${SITE_URL}${prefix}/${item.slug}`,
      lastModified: new Date(item._updatedAt),
      changeFrequency: "monthly" as const,
      priority,
    }));

  return [
    ...STATIC_ROUTES.map(({ path, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: fallback,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...section(data?.concerns, "/concerns", 0.7),
    ...section(data?.treatments, "/services", 0.7),
    ...section(data?.machines, "/technology", 0.6),
  ];
}
