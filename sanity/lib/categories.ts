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

/**
 * The technology page's categories, in the order the doctors specified. A
 * technology may belong to more than one - Thermage FLX is both energy-based
 * and a lifting technology - so machines hold an array of these values.
 */
export const TECHNOLOGY_CATEGORIES = [
  { value: "energy-based", label: "Energy-based technology" },
  { value: "lasers", label: "Lasers" },
  { value: "lifting", label: "Lifting & tightening" },
  { value: "rejuvenation", label: "Skin rejuvenation" },
  { value: "regenerative", label: "Regenerative dermatology" },
] as const;

export type TechnologyCategory = (typeof TECHNOLOGY_CATEGORIES)[number]["value"];

export function technologyCategoryLabel(value: string): string {
  return TECHNOLOGY_CATEGORIES.find((c) => c.value === value)?.label ?? "";
}

/**
 * Journal categories, kept deliberately quiet on the page: they organise the
 * writing without becoming a filter bar.
 */
export const JOURNAL_CATEGORIES = [
  { value: "ageing", label: "Ageing & Refinement" },
  { value: "skin", label: "Skin" },
  { value: "technology", label: "Technology & Treatment" },
  { value: "acne", label: "Acne & Scarring" },
  { value: "approach", label: "The Dr Bhagat’s Approach" },
] as const;

export type JournalCategory = (typeof JOURNAL_CATEGORIES)[number]["value"];

export function journalCategoryLabel(value: string | null | undefined): string {
  return JOURNAL_CATEGORIES.find((c) => c.value === value)?.label ?? "";
}
