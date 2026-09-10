import { ogCard, OG_SIZE } from "@/lib/ogCard";
import { getClient } from "@/sanity/lib/client";
import { journalBySlugQuery } from "@/sanity/lib/queries";
import type { Article } from "@/sanity/lib/types";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Journal";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let article: Article | null = null;
  try {
    article = await getClient().fetch<Article | null>(journalBySlugQuery, { slug });
  } catch {
    // A generic card rather than a failed image route.
  }
  return ogCard({
    eyebrow: "Journal",
    title: article?.title ?? "Journal",
    subtitle: article?.excerpt,
  });
}
