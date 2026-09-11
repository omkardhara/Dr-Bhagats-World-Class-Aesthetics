/**
 * Permanent redirects.
 *
 * Two generations of retired URLs point into the concern-led structure:
 *
 *  1. The retired finesseclinic.com site, whose URLs were read from its own
 *     navigation. These carry its accumulated search equity once that domain
 *     points here.
 *  2. This site's own previous, technology-led structure: 30 granular concern
 *     pages, /services and its 12 treatment pages, and /testimonials.
 *
 * Each points at the closest equivalent page rather than a generic index,
 * since redirecting everything to a listing reads as a soft 404 to search
 * engines. Trailing slashes are handled by matching both forms in
 * next.config.ts.
 */

export type Redirect = { from: string; to: string };

/** The nine concern slugs that exist now. */
export const CONCERN_SLUGS = [
  "facial-ageing",
  "pigmentation",
  "acne",
  "skin-quality",
  "eyes",
  "facial-contouring",
  "hair",
  "body-contouring",
  "hair-removal",
] as const;

const MEDICAL = "/concerns#medical-dermatology";

/**
 * Where each of the previous 30 granular concerns now lives. Keyed by the old
 * slug, which appeared both on finesseclinic.com and on this site.
 */
const GRANULAR_CONCERNS: Record<string, string> = {
  acne: "/concerns/acne",
  "acne-scars": "/concerns/acne",
  aging: "/concerns/facial-ageing",
  "dry-skin": "/concerns/skin-quality",
  psoriasis: MEDICAL,
  dermatitis: MEDICAL,
  vitiligo: MEDICAL,
  warts: MEDICAL,
  "eye-bags": "/concerns/eyes",
  "dark-circles": "/concerns/eyes",
  eyebrow: "/concerns/eyes",
  "sun-damage": "/concerns/pigmentation",
  melasma: "/concerns/pigmentation",
  hyperpigmentation: "/concerns/pigmentation",
  "tattoo-removal": "/concerns/pigmentation",
  "fotona-tattoo-removal": "/concerns/pigmentation",
  lips: "/concerns/facial-contouring",
  "chin-fat": "/concerns/facial-contouring",
  "hair-loss": "/concerns/hair",
  dandruff: "/concerns/hair",
  "alopecia-areata": "/concerns/hair",
  "dry-hair": "/concerns/hair",
  "greasy-hair": "/concerns/hair",
  "over-damaged-hair": "/concerns/hair",
  limp: "/concerns/hair",
  "limp-hair": "/concerns/hair",
  "full-body-contouring": "/concerns/body-contouring",
  "under-arm-fat": "/concerns/body-contouring",
  "belly-fat": "/concerns/body-contouring",
  "body-contouring": "/concerns/body-contouring",
  "thigh-fat": "/concerns/body-contouring",
  cellulite: "/concerns/body-contouring",
};

const FINESSE_CONCERN_PATHS: [string, string][] = [
  ["skin", "acne"], ["skin", "acne-scars"], ["skin", "aging"], ["skin", "dry-skin"],
  ["skin", "psoriasis"], ["skin", "dermatitis"], ["skin", "vitiligo"],
  ["skin", "eye-bags"], ["skin", "sun-damage"], ["skin", "warts"],
  ["face", "eyebrow"], ["face", "lips"], ["face", "dark-circles"],
  ["face", "melasma"], ["face", "hyperpigmentation"],
  ["hair", "hair-loss"], ["hair", "dandruff"], ["hair", "alopecia-areata"],
  ["hair", "dry-hair"], ["hair", "greasy-hair"], ["hair", "over-damaged-hair"],
  ["hair", "limp"],
  ["body", "full-body-contouring"], ["body", "under-arm-fat"], ["body", "chin-fat"],
  ["body", "belly-fat"], ["body", "body-contouring"], ["body", "thigh-fat"],
  ["body", "cellulite"], ["body", "fotona-tattoo-removal"],
];

/** finesseclinic.com /concern/<category>/<slug> */
export const FINESSE_CONCERN_REDIRECTS: Redirect[] = FINESSE_CONCERN_PATHS.map(
  ([category, old]) => ({ from: `/concern/${category}/${old}`, to: GRANULAR_CONCERNS[old] })
);

/**
 * This site's own previous /concerns/<granular-slug> pages. Any old slug that
 * is also a current slug is skipped - redirecting it would loop.
 */
export const LEGACY_CONCERN_REDIRECTS: Redirect[] = Object.entries(GRANULAR_CONCERNS)
  .filter(([old]) => !(CONCERN_SLUGS as readonly string[]).includes(old))
  .map(([old, to]) => ({ from: `/concerns/${old}`, to }));

const A = (slug: string) => `/treatment-approaches/${slug}`;

/** finesseclinic.com /treatment/<category>/<slug> */
export const FINESSE_TREATMENT_REDIRECTS: Redirect[] = [
  { from: "/treatment/skin-rejuvenation/laser-skin-rejuvenation", to: A("facial-rejuvenation") },
  { from: "/treatment/skin-rejuvenation/skin-resurfacing", to: A("skin-quality") },
  { from: "/treatment/skin-rejuvenation/medical-peels", to: A("skin-quality") },
  { from: "/treatment/skin-rejuvenation/microdermabrasion", to: A("skin-quality") },
  { from: "/treatment/skin-rejuvenation/hydrafacial", to: A("skin-quality") },
  { from: "/treatment/skin-rejuvenation/laser-toning", to: A("pigmentation") },
  { from: "/treatment/dermatosurgery/dermatosurgery-for-moles-warts-skintags", to: A("skin-quality") },
  { from: "/treatment/hair-rejuvenation/hair-regrowth-with-peptides-growth-factors", to: A("hair-and-scalp") },
  { from: "/treatment/hair-rejuvenation/keravive-treatment", to: A("hair-and-scalp") },
  { from: "/treatment/acne-acne-scars/derma-filler-scars", to: A("acne-and-scarring") },
  { from: "/treatment/acne-acne-scars/fotona-acne-treatment", to: A("acne-and-scarring") },
  { from: "/treatment/acne-acne-scars/microneedling-rf", to: A("acne-and-scarring") },
  { from: "/treatment/acne-acne-scars/medical-chemical-peels", to: A("acne-and-scarring") },
  { from: "/treatment/acne-acne-scars/hydra-facial-medical-clean-up", to: A("acne-and-scarring") },
  { from: "/treatment/antiaging-treatments/ultrasound-mpt-skin-tightening", to: A("facial-rejuvenation") },
  { from: "/treatment/antiaging-treatments/laser-skin-tightening", to: A("facial-rejuvenation") },
  { from: "/treatment/antiaging-treatments/radiofrequency", to: A("facial-rejuvenation") },
  { from: "/treatment/antiaging-treatments/under-eye-bags", to: "/concerns/eyes" },
  { from: "/treatment/antiaging-treatments/dermal-fillers", to: A("facial-rejuvenation") },
  { from: "/treatment/antiaging-treatments/botulinum-toxin", to: A("facial-rejuvenation") },
  { from: "/treatment/antiaging-treatments/prp-gfc", to: A("skin-quality") },
  { from: "/treatment/pigmentation-scar/laser-medical-peels", to: A("pigmentation") },
  { from: "/treatment/pigmentation-scar/laser-birth-mark-spot-reduction", to: A("pigmentation") },
  { from: "/treatment/pigmentation-scar/derma-filler-for-scar-reduction", to: A("acne-and-scarring") },
  { from: "/treatment/pigmentation-scar/micro-needling-by-dermapen-nanopore", to: A("acne-and-scarring") },
  { from: "/treatment/hair-removal/laser-hair-removal", to: "/concerns/hair-removal" },

  { from: "/treatment/skin-rejuvenation", to: A("skin-quality") },
  { from: "/treatment/dermatosurgery", to: A("skin-quality") },
  { from: "/treatment/hair-rejuvenation", to: A("hair-and-scalp") },
  { from: "/treatment/acne-acne-scars", to: A("acne-and-scarring") },
  { from: "/treatment/antiaging-treatments", to: A("facial-rejuvenation") },
  { from: "/treatment/pigmentation-scar", to: A("pigmentation") },
  { from: "/treatment/hair-removal", to: "/concerns/hair-removal" },
];

/** This site's previous /services structure and testimonials page. */
export const LEGACY_SITE_REDIRECTS: Redirect[] = [
  { from: "/services", to: "/treatment-approaches" },
  { from: "/services/laser-skin-resurfacing", to: A("skin-quality") },
  { from: "/services/laser-hair-reduction", to: "/concerns/hair-removal" },
  { from: "/services/pigmentation-and-tattoo-clearance", to: A("pigmentation") },
  { from: "/services/skin-tightening-and-body-contouring", to: A("facial-rejuvenation") },
  { from: "/services/bio-remodelling-and-skin-boosters", to: A("skin-quality") },
  { from: "/services/thread-and-subdermal-lifting", to: A("facial-contouring") },
  { from: "/services/volume-and-contour-restoration", to: A("facial-contouring") },
  { from: "/services/muscle-relaxant-therapy", to: A("facial-rejuvenation") },
  { from: "/services/medical-facials-and-deep-cleansing", to: A("skin-quality") },
  { from: "/services/acne-and-scar-revision", to: A("acne-and-scarring") },
  { from: "/services/hair-restoration-therapy", to: A("hair-and-scalp") },
  { from: "/services/lesion-and-blemish-removal", to: A("skin-quality") },
  { from: "/testimonials", to: "/results" },
];

/**
 * The individual programme pages became sections of the one Signature page.
 * The hair programme was renamed from Hair Restoration to Hair & Scalp.
 */
export const SIGNATURE_REDIRECTS: Redirect[] = [
  { from: "/signature-programmes", to: "/signature" },
  { from: "/signature-programmes/signature-lift", to: "/signature#signature-lift" },
  { from: "/signature-programmes/skin-quality-programme", to: "/signature#skin-quality-programme" },
  { from: "/signature-programmes/pigmentation-programme", to: "/signature#pigmentation-programme" },
  { from: "/signature-programmes/acne-scar-programme", to: "/signature#acne-scar-programme" },
  { from: "/signature-programmes/hair-restoration-programme", to: "/signature#hair-and-scalp-programme" },
];

/**
 * Technologies renamed to their brands' own spelling. Pages for the others
 * without a dedicated page redirect to their card from the page itself, since
 * that depends on content rather than on a fixed list.
 */
export const TECHNOLOGY_REDIRECTS: Redirect[] = [
  { from: "/technology/gentle-yag", to: "/technology#gentleyag" },
  { from: "/technology/oxygeno", to: "/technology#oxygeneo" },
];

/** The Clinic now sits within About, as the doctors asked. */
export const PAGE_REDIRECTS: Redirect[] = [
  { from: "/the-clinic", to: "/about#the-clinic" },
  { from: "/contactus", to: "/contact" },
  { from: "/about-us", to: "/about" },
];

export const ALL_REDIRECTS: Redirect[] = [
  ...FINESSE_CONCERN_REDIRECTS,
  ...LEGACY_CONCERN_REDIRECTS,
  ...FINESSE_TREATMENT_REDIRECTS,
  ...LEGACY_SITE_REDIRECTS,
  ...SIGNATURE_REDIRECTS,
  ...TECHNOLOGY_REDIRECTS,
  ...PAGE_REDIRECTS,
];

/**
 * A 308 for every technology without a dedicated page, pointing at its card.
 *
 * The technology page also redirects these itself, but a redirect thrown while
 * a page is streaming can only be sent as a 200 with a meta refresh. Resolving
 * them here, when the config loads, gives a real permanent redirect. It reads
 * the CMS at build time, so switching a technology's dedicated page on or off
 * takes effect at the next deploy; until then the page-level redirect covers it.
 *
 * A failed request returns no redirects rather than failing the build.
 */
export async function fetchTechnologyCardRedirects(): Promise<Redirect[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token = process.env.SANITY_API_READ_TOKEN;
  if (!projectId) return [];

  const query = encodeURIComponent(
    `*[_type == "machine" && dedicatedPage != true && defined(slug.current)].slug.current`
  );
  try {
    const response = await fetch(
      `https://${projectId}.api.sanity.io/v2024-10-01/data/query/${dataset}?query=${query}`,
      { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    );
    if (!response.ok) return [];
    const { result } = (await response.json()) as { result?: string[] };
    return (result ?? []).map((slug) => ({ from: `/technology/${slug}`, to: `/technology#${slug}` }));
  } catch {
    return [];
  }
}

/** Catch-alls for anything else under the retired trees. */
export const CATCH_ALL_REDIRECTS: Redirect[] = [
  { from: "/concern/:path*", to: "/concerns" },
  { from: "/treatment/:path*", to: "/treatment-approaches" },
  { from: "/services/:path*", to: "/treatment-approaches" },
  { from: "/signature-programmes/:path*", to: "/signature" },
];
