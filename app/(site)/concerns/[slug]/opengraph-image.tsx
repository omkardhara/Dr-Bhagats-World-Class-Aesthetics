import { ogCard, OG_SIZE } from "@/lib/ogCard";
import { getClient } from "@/sanity/lib/client";
import { concernBySlugQuery } from "@/sanity/lib/queries";
import type { Concern } from "@/sanity/lib/types";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Concern";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let concern: Concern | null = null;
  try {
    concern = await getClient().fetch<Concern | null>(concernBySlugQuery, {
      slug,
    });
  } catch {
    // Fall through to a generic card rather than failing the image route.
  }

  return ogCard({
    eyebrow: concern?.category ? `${concern.category} concern` : "Concern",
    title: concern?.title ?? "Concerns",
    subtitle: concern?.summary,
  });
}
