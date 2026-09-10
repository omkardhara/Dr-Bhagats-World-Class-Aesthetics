/**
 * Results are grouped by what the patient came in with, not by the technology
 * used. Shared by the schema, the seed and the pages so the labels can never
 * drift apart.
 */
export const RESULT_CATEGORIES = [
  { value: "ageing", label: "Ageing" },
  { value: "pigmentation", label: "Pigmentation" },
  { value: "acne-scars", label: "Acne & Scars" },
  { value: "skin-quality", label: "Skin Quality" },
  { value: "body", label: "Body" },
  { value: "hair", label: "Hair" },
] as const;

export type ResultCategory = (typeof RESULT_CATEGORIES)[number]["value"];

export function resultCategoryLabel(value: string | null | undefined): string {
  return RESULT_CATEGORIES.find((c) => c.value === value)?.label ?? "";
}

/** Devices are grouped by clinical role, never by marketing theme. */
export const TECHNOLOGY_CATEGORIES = [
  { value: "laser", label: "Laser platforms" },
  { value: "tightening", label: "Energy-based lifting and contouring" },
  { value: "regenerative", label: "Regenerative and remodelling" },
  { value: "skin-health", label: "Skin health" },
  { value: "dermatosurgery", label: "Precision dermatosurgery" },
] as const;

export type TechnologyCategory = (typeof TECHNOLOGY_CATEGORIES)[number]["value"];
