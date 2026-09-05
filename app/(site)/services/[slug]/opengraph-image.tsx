import { ogCard, OG_SIZE } from "@/lib/ogCard";
import { getClient } from "@/sanity/lib/client";
import { treatmentBySlugQuery } from "@/sanity/lib/queries";
import type { TreatmentDetail } from "@/sanity/lib/types";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Treatment";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let treatment: TreatmentDetail | null = null;
  try {
    treatment = await getClient().fetch<TreatmentDetail | null>(
      treatmentBySlugQuery,
      { slug }
    );
  } catch {
    // Generic card rather than a failed image route.
  }

  return ogCard({
    eyebrow: treatment?.service?.title ?? "Treatment",
    title: treatment?.name ?? "Treatments",
    subtitle: treatment?.description,
  });
}
