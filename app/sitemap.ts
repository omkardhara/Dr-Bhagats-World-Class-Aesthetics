import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

const ROUTES = [
  { path: "/", priority: 1 },
  { path: "/technology", priority: 0.8 },
  { path: "/services", priority: 0.9 },
  { path: "/about", priority: 0.7 },
  { path: "/book", priority: 0.9 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
