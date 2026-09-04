/**
 * Permanent redirects from the retired finesseclinic.com URL structure.
 *
 * Paths are matched regardless of host, so these also catch stale inbound
 * links and any lingering internal reference. They become load-bearing once
 * finesseclinic.com is pointed at this project, which is what preserves the
 * practice's accumulated search equity through the rebrand.
 *
 * Source URLs were read from the old site's own navigation, not guessed.
 * Trailing slashes are handled by matching both forms in next.config.ts.
 */

export type Redirect = { from: string; to: string };

/** 30 concern pages. Slugs match unless the wording changed in the rebuild. */
export const CONCERN_REDIRECTS: Redirect[] = [
  { from: "/concern/skin/acne", to: "/concerns/acne" },
  { from: "/concern/skin/acne-scars", to: "/concerns/acne-scars" },
  { from: "/concern/skin/aging", to: "/concerns/aging" },
  { from: "/concern/skin/dry-skin", to: "/concerns/dry-skin" },
  { from: "/concern/skin/psoriasis", to: "/concerns/psoriasis" },
  { from: "/concern/skin/dermatitis", to: "/concerns/dermatitis" },
  { from: "/concern/skin/vitiligo", to: "/concerns/vitiligo" },
  { from: "/concern/skin/eye-bags", to: "/concerns/eye-bags" },
  { from: "/concern/skin/sun-damage", to: "/concerns/sun-damage" },
  { from: "/concern/skin/warts", to: "/concerns/warts" },

  { from: "/concern/face/eyebrow", to: "/concerns/eyebrow" },
  { from: "/concern/face/lips", to: "/concerns/lips" },
  { from: "/concern/face/dark-circles", to: "/concerns/dark-circles" },
  { from: "/concern/face/melasma", to: "/concerns/melasma" },
  { from: "/concern/face/hyperpigmentation", to: "/concerns/hyperpigmentation" },

  { from: "/concern/hair/hair-loss", to: "/concerns/hair-loss" },
  { from: "/concern/hair/dandruff", to: "/concerns/dandruff" },
  { from: "/concern/hair/alopecia-areata", to: "/concerns/alopecia-areata" },
  { from: "/concern/hair/dry-hair", to: "/concerns/dry-hair" },
  { from: "/concern/hair/greasy-hair", to: "/concerns/greasy-hair" },
  { from: "/concern/hair/over-damaged-hair", to: "/concerns/over-damaged-hair" },
  // Renamed from "Limp" for clarity.
  { from: "/concern/hair/limp", to: "/concerns/limp-hair" },

  { from: "/concern/body/full-body-contouring", to: "/concerns/full-body-contouring" },
  { from: "/concern/body/under-arm-fat", to: "/concerns/under-arm-fat" },
  { from: "/concern/body/chin-fat", to: "/concerns/chin-fat" },
  { from: "/concern/body/belly-fat", to: "/concerns/belly-fat" },
  { from: "/concern/body/body-contouring", to: "/concerns/body-contouring" },
  { from: "/concern/body/thigh-fat", to: "/concerns/thigh-fat" },
  { from: "/concern/body/cellulite", to: "/concerns/cellulite" },
  // Device name dropped from the concern title.
  { from: "/concern/body/fotona-tattoo-removal", to: "/concerns/tattoo-removal" },
];

/**
 * 26 treatment pages. The old site listed treatments by marketing name and the
 * new one groups them clinically, so several old URLs collapse onto one page.
 * Each points at the closest equivalent rather than defaulting to /services,
 * since a redirect to a generic index reads as a soft 404 to search engines.
 */
export const TREATMENT_REDIRECTS: Redirect[] = [
  { from: "/treatment/skin-rejuvenation/laser-skin-rejuvenation", to: "/services/laser-skin-resurfacing" },
  { from: "/treatment/skin-rejuvenation/skin-resurfacing", to: "/services/laser-skin-resurfacing" },
  { from: "/treatment/skin-rejuvenation/medical-peels", to: "/services/medical-facials-and-deep-cleansing" },
  { from: "/treatment/skin-rejuvenation/microdermabrasion", to: "/services/medical-facials-and-deep-cleansing" },
  { from: "/treatment/skin-rejuvenation/hydrafacial", to: "/services/medical-facials-and-deep-cleansing" },
  { from: "/treatment/skin-rejuvenation/laser-toning", to: "/services/pigmentation-and-tattoo-clearance" },

  { from: "/treatment/dermatosurgery/dermatosurgery-for-moles-warts-skintags", to: "/services/lesion-and-blemish-removal" },

  { from: "/treatment/hair-rejuvenation/hair-regrowth-with-peptides-growth-factors", to: "/services/hair-restoration-therapy" },
  { from: "/treatment/hair-rejuvenation/keravive-treatment", to: "/services/hair-restoration-therapy" },

  { from: "/treatment/acne-acne-scars/derma-filler-scars", to: "/services/acne-and-scar-revision" },
  { from: "/treatment/acne-acne-scars/fotona-acne-treatment", to: "/services/acne-and-scar-revision" },
  { from: "/treatment/acne-acne-scars/microneedling-rf", to: "/services/acne-and-scar-revision" },
  { from: "/treatment/acne-acne-scars/medical-chemical-peels", to: "/services/acne-and-scar-revision" },
  { from: "/treatment/acne-acne-scars/hydra-facial-medical-clean-up", to: "/services/medical-facials-and-deep-cleansing" },

  { from: "/treatment/antiaging-treatments/ultrasound-mpt-skin-tightening", to: "/services/skin-tightening-and-body-contouring" },
  { from: "/treatment/antiaging-treatments/laser-skin-tightening", to: "/services/skin-tightening-and-body-contouring" },
  { from: "/treatment/antiaging-treatments/radiofrequency", to: "/services/skin-tightening-and-body-contouring" },
  { from: "/treatment/antiaging-treatments/under-eye-bags", to: "/concerns/eye-bags" },
  { from: "/treatment/antiaging-treatments/dermal-fillers", to: "/services/volume-and-contour-restoration" },
  { from: "/treatment/antiaging-treatments/botulinum-toxin", to: "/services/muscle-relaxant-therapy" },
  { from: "/treatment/antiaging-treatments/prp-gfc", to: "/services/bio-remodelling-and-skin-boosters" },

  { from: "/treatment/pigmentation-scar/laser-medical-peels", to: "/services/pigmentation-and-tattoo-clearance" },
  { from: "/treatment/pigmentation-scar/laser-birth-mark-spot-reduction", to: "/services/pigmentation-and-tattoo-clearance" },
  { from: "/treatment/pigmentation-scar/derma-filler-for-scar-reduction", to: "/services/acne-and-scar-revision" },
  { from: "/treatment/pigmentation-scar/micro-needling-by-dermapen-nanopore", to: "/services/acne-and-scar-revision" },

  { from: "/treatment/hair-removal/laser-hair-removal", to: "/services/laser-hair-reduction" },
];

/** Old category landing pages. */
export const CATEGORY_REDIRECTS: Redirect[] = [
  { from: "/treatment/skin-rejuvenation", to: "/services" },
  { from: "/treatment/dermatosurgery", to: "/services" },
  { from: "/treatment/hair-rejuvenation", to: "/services/hair-restoration-therapy" },
  { from: "/treatment/acne-acne-scars", to: "/services/acne-and-scar-revision" },
  { from: "/treatment/antiaging-treatments", to: "/services" },
  { from: "/treatment/pigmentation-scar", to: "/services/pigmentation-and-tattoo-clearance" },
  { from: "/treatment/hair-removal", to: "/services/laser-hair-reduction" },
];

/** Standalone pages from the old site. */
export const PAGE_REDIRECTS: Redirect[] = [
  { from: "/contactus", to: "/contact" },
  { from: "/about-us", to: "/about" },
];

export const ALL_REDIRECTS: Redirect[] = [
  ...CONCERN_REDIRECTS,
  ...TREATMENT_REDIRECTS,
  ...CATEGORY_REDIRECTS,
  ...PAGE_REDIRECTS,
];
