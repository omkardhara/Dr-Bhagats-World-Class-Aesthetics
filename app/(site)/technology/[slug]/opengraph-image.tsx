import { ogCard, OG_SIZE } from "@/lib/ogCard";
import { getClient } from "@/sanity/lib/client";
import { machineBySlugQuery } from "@/sanity/lib/queries";
import type { Machine } from "@/sanity/lib/types";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Technology";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let machine: Machine | null = null;
  try {
    machine = await getClient().fetch<Machine | null>(machineBySlugQuery, { slug });
  } catch {
    // A generic card rather than a failed image route.
  }
  return ogCard({
    eyebrow: "Technology, selected with purpose",
    title: machine?.name ?? "Technology",
    subtitle: machine?.purpose,
  });
}
