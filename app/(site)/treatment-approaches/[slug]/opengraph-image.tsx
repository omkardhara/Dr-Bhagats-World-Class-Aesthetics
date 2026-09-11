import { ogCard, OG_SIZE } from "@/lib/ogCard";
import { getClient } from "@/sanity/lib/client";
import { approachBySlugQuery } from "@/sanity/lib/queries";
import type { Approach } from "@/sanity/lib/types";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Treatment approach";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let approach: Approach | null = null;
  try {
    approach = await getClient().fetch<Approach | null>(approachBySlugQuery, { slug });
  } catch {
    // A generic card rather than a failed image route.
  }
  return ogCard({
    eyebrow: "Treatment approach",
    title: approach?.title ?? "Treatments",
    subtitle: approach?.summary,
  });
}
