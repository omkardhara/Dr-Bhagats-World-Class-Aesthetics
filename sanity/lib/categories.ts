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
  {
    value: "lifting",
    label: "Facial lifting & rejuvenation",
    note: "Which technology is chosen depends on where the change sits: the skin's own firmness, the deeper support, or the contour beneath it.",
  },
  {
    value: "pigmentation",
    label: "Pigmentation",
    note: "The type and depth of pigment, and the skin type it sits in, decide which wavelength is appropriate - and how gently it is used.",
  },
  {
    value: "skin-quality",
    label: "Skin quality & texture",
    note: "Texture, pores, hydration and radiance respond to different treatments, layered over time rather than delivered at once.",
  },
  {
    value: "acne-scarring",
    label: "Acne & scarring",
    note: "Active acne is settled first. Scar treatment is then matched to the type of scar, which is rarely only one.",
  },
  {
    value: "hair-scalp",
    label: "Hair & scalp",
    note: "In-clinic treatment supports the follicles while the cause of the hair loss is treated medically.",
  },
  {
    value: "hair-removal",
    label: "Hair removal",
    note: "The wavelength and settings are chosen for the skin type and the hair, which matters most in darker skin.",
  },
  {
    value: "body",
    label: "Body & contour",
    note: "Fat, laxity and skin texture contribute differently in each patient, so the order of treatment is decided at assessment.",
  },
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
