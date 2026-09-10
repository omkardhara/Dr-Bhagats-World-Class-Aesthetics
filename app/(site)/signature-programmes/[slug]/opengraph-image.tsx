import { ogCard, OG_SIZE } from "@/lib/ogCard";
import { getClient } from "@/sanity/lib/client";
import { programmeBySlugQuery } from "@/sanity/lib/queries";
import type { Programme } from "@/sanity/lib/types";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Signature programme";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let programme: Programme | null = null;
  try {
    programme = await getClient().fetch<Programme | null>(programmeBySlugQuery, { slug });
  } catch {
    // A generic card rather than a failed image route.
  }
  return ogCard({
    eyebrow: "Signature programme",
    title: programme?.title ?? "Signature Programmes",
    subtitle: programme?.summary,
  });
}
