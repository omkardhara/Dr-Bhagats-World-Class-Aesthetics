import { ogCard, OG_SIZE } from "@/lib/ogCard";
import { getClient } from "@/sanity/lib/client";
import { concernBySlugQuery } from "@/sanity/lib/queries";
import type { Concern } from "@/sanity/lib/types";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Your concern";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let concern: Concern | null = null;
  try {
    concern = await getClient().fetch<Concern | null>(concernBySlugQuery, { slug });
  } catch {
    // A generic card rather than a failed image route.
  }
  return ogCard({
    eyebrow: "Your concern",
    title: concern?.title ?? "Your Concerns",
    subtitle: concern?.summary,
  });
}
