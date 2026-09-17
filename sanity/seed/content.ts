/**
 * Seed content for the concern-led information architecture.
 *
 * Structure and positioning follow the doctors' feedback of September 2026:
 * concern -> assessment -> personalised plan -> technology -> results.
 *
 * Sources:
 *  — The signature programme copy, the doctors' profiles and quotations, the
 *    technology categories and the brand language are the doctors' own, from
 *    their second round of feedback, and are reproduced as written.
 *  — Doctor training is from the retired finesseclinic.com site.
 *  — Modalities are drawn from that site's real treatment list.
 *  — Testimonials are verbatim excerpts of the Google reviews the practice
 *    already published. They are trimmed with ellipses, never reworded.
 *
 * The clinical explanations for each concern and approach, and the one-line
 * technology descriptions, are written deliberately without outcome claims,
 * session counts, prices or guarantees. They still need the doctors' clinical
 * sign-off before launch - see docs/CONTENT-REVIEW.md.
 */

import type { JournalCategory, ResultCategory, TechnologyCategory } from "../lib/categories";

export const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/* ------------------------------------------------------------------ */
/* Technology                                                          */
/* ------------------------------------------------------------------ */

export type SeedMachine = {
  name: string;
  /** In the doctors' categories; a technology may sit in more than one. */
  categories: TechnologyCategory[];
  /** Signature technologies only. Everything else is a card on /technology. */
  dedicatedPage: boolean;
  /** The one line on its card. */
  purpose: string;
  description: string;
};

export const MACHINES: SeedMachine[] = [
  {
    name: "Thermage FLX",
    categories: ["energy-based", "lifting"],
    dedicatedPage: true,
    purpose: "Monopolar radiofrequency for non-surgical skin tightening.",
    description:
      "Monopolar radiofrequency platform with AccuREP technology for non-surgical skin tightening.",
  },
  {
    name: "Fotona SP Dynamis Max",
    categories: ["energy-based", "lasers"],
    dedicatedPage: false,
    purpose: "A versatile laser workstation for resurfacing, pigmentation and hair reduction.",
    description:
      "Combined Nd:YAG and Er:YAG laser workstation for resurfacing, pigmentation and hair reduction.",
  },
  {
    name: "Fotona StarWalker",
    categories: ["lasers"],
    dedicatedPage: false,
    purpose: "A Q-switched laser for pigmentation, laser toning and tattoo removal.",
    description:
      "Q-switched Nd:YAG laser platform for pigment clearance, tattoo removal and laser toning.",
  },
  {
    name: "Ultraformer MPT",
    categories: ["energy-based", "lifting"],
    dedicatedPage: true,
    purpose: "Focused ultrasound for the deeper supporting layers of the face and body.",
    description:
      "Micro-pulsed HIFU system delivering focused ultrasound to the deeper supporting layers of the face and body.",
  },
  {
    name: "Sylfirm X",
    categories: ["energy-based", "lifting", "rejuvenation"],
    dedicatedPage: false,
    purpose: "Radiofrequency microneedling for pigmentation, scarring and skin remodelling.",
    description:
      "Dual-wave radiofrequency microneedling platform for pigmentation, vascular concerns and skin remodelling.",
  },
  {
    name: "Endolift X",
    categories: ["lasers", "lifting"],
    dedicatedPage: true,
    purpose: "A fine laser fibre beneath the skin, for tightening and definition along the lower face.",
    description:
      "Minimally invasive endolaser using micro-optical fibres beneath the skin for tightening and localised fat reduction.",
  },
  {
    name: "GentleYAG",
    categories: ["lasers"],
    dedicatedPage: false,
    purpose: "A long-pulse laser for hair reduction, with settings chosen for the skin type.",
    description:
      "Long-pulse 1064 nm Nd:YAG laser with cryogen cooling, suited to hair reduction on darker skin types.",
  },
  {
    name: "Venus Bliss Max",
    categories: ["energy-based"],
    dedicatedPage: false,
    purpose: "Body contouring, combining localised fat reduction with muscle toning.",
    description:
      "Body contouring platform pairing diode laser lipolysis with electromagnetic muscle stimulation.",
  },
  {
    name: "Fotona StarFormer",
    categories: ["energy-based"],
    dedicatedPage: false,
    purpose: "Electromagnetic muscle stimulation for body toning.",
    description: "Electromagnetic muscle stimulation platform for body toning.",
  },
  {
    name: "Dermapen 4",
    categories: ["rejuvenation"],
    dedicatedPage: false,
    purpose: "Medical microneedling to stimulate collagen.",
    description: "Medical microneedling device with adjustable depth for collagen induction.",
  },
  {
    name: "SkinPen",
    categories: ["rejuvenation"],
    dedicatedPage: false,
    purpose: "Microneedling for texture and scarring.",
    description: "Microneedling device for controlled collagen induction.",
  },
  {
    name: "Hydrafacial",
    categories: ["rejuvenation"],
    dedicatedPage: false,
    purpose: "Cleansing, exfoliation, extraction and hydration in a single treatment.",
    description:
      "Vortex-fusion system that cleanses, exfoliates, extracts and hydrates in a single treatment.",
  },
  {
    name: "OxyGeneo",
    categories: ["rejuvenation"],
    dedicatedPage: false,
    purpose: "An exfoliation, infusion and oxygenation facial.",
    description: "Oxygenation, exfoliation and infusion facial system.",
  },
  {
    name: "GFC",
    categories: ["regenerative"],
    dedicatedPage: false,
    purpose: "Growth factor concentrate, prepared from your own blood, for hair and skin.",
    description: "Autologous growth factor concentrate for hair and skin regeneration.",
  },
  {
    // Added at the doctors' request. Regulatory position to be confirmed before launch.
    name: "Exosomes",
    categories: ["regenerative"],
    dedicatedPage: false,
    purpose: "A regenerative treatment, used alongside in-clinic procedures.",
    description: "Exosome-based regenerative treatment for skin and hair.",
  },
  {
    name: "Plasmapen",
    categories: ["energy-based"],
    dedicatedPage: false,
    purpose: "Plasma energy for small lesions and delicate areas such as the eyelids.",
    description:
      "Plasma device for the treatment of small benign lesions and skin tightening in delicate areas.",
  },
  {
    // Fits none of the doctors' five categories, so it is held back from the page.
    name: "Cryopen",
    categories: [],
    dedicatedPage: false,
    purpose: "Precision cryotherapy for benign lesions such as warts and skin tags.",
    description: "Precision cryotherapy device for benign lesions.",
  },
];

/* ------------------------------------------------------------------ */
/* Modalities — what a plan may include                                */
/* ------------------------------------------------------------------ */

export type SeedModality = {
  name: string;
  description: string;
  machines: string[];
};

export const MODALITIES: SeedModality[] = [
  {
    name: "Medical Treatment",
    description:
      "Prescription treatment and, where needed, investigations, directed by the dermatologist.",
    machines: [],
  },
  {
    name: "Laser Skin Resurfacing",
    description: "Controlled laser resurfacing to refine texture, fine lines and sun damage.",
    machines: ["Fotona SP Dynamis Max"],
  },
  {
    name: "Laser Toning",
    description: "Gentle, repeated laser treatment to even out tone and pigmentation.",
    machines: ["Fotona StarWalker"],
  },
  {
    name: "Medical Peels",
    description: "Peels selected by the doctor to renew the skin surface.",
    machines: [],
  },
  {
    name: "Hydrafacial & Medical Facials",
    description: "Medical-grade cleansing, exfoliation and hydration.",
    machines: ["Hydrafacial", "OxyGeneo"],
  },
  {
    name: "Microneedling & RF Microneedling",
    description:
      "Controlled micro-injury, with or without radiofrequency, to stimulate collagen and remodel scarring.",
    machines: ["Dermapen 4", "SkinPen", "Sylfirm X"],
  },
  {
    name: "Radiofrequency Skin Tightening",
    description: "Radiofrequency energy to tighten the skin and stimulate collagen.",
    machines: ["Thermage FLX"],
  },
  {
    name: "Ultrasound Skin Tightening",
    description: "Focused ultrasound delivered to the deeper supporting tissues.",
    machines: ["Ultraformer MPT"],
  },
  {
    name: "Subdermal Laser Tightening",
    description: "A fine laser fibre used beneath the skin to tighten and define.",
    machines: ["Endolift X"],
  },
  {
    name: "Dermal Fillers",
    description: "Precise restoration of volume and structure, and correction of certain scars.",
    machines: [],
  },
  {
    name: "Botulinum Toxin",
    description: "Softening of dynamic lines and refinement of facial muscle activity.",
    machines: [],
  },
  {
    name: "PRP & GFC",
    description:
      "Regenerative therapies prepared from the patient's own blood, used for hair and skin.",
    machines: ["GFC"],
  },
  {
    name: "Laser Hair Reduction",
    description: "Long-term reduction of unwanted hair, with settings selected for skin type.",
    machines: ["GentleYAG", "Fotona SP Dynamis Max"],
  },
  {
    name: "Body Contouring",
    description: "Non-surgical treatment to reduce localised fat and tone the body.",
    machines: ["Venus Bliss Max", "Fotona StarFormer", "Ultraformer MPT"],
  },
  {
    name: "Dermatosurgery",
    description: "Removal of moles, warts, skin tags and other benign lesions.",
    machines: ["Cryopen", "Plasmapen"],
  },
];

/* ------------------------------------------------------------------ */
/* Concerns — the primary structure of the site                        */
/* ------------------------------------------------------------------ */

export type SeedConcern = {
  title: string;
  slug: string;
  summary: string;
  understanding: string;
  assessment: string;
  approach: string;
  relatedConditions: string[];
  resultCategory: ResultCategory;
  programmes: string[];
  approaches: string[];
  technologies: string[];
};

export const CONCERNS: SeedConcern[] = [
  {
    title: "Facial Ageing & Skin Laxity",
    slug: "facial-ageing",
    summary:
      "Loss of firmness, volume and definition happens gradually, and differently for every face.",
    understanding:
      "Facial ageing is not a single change. Collagen and elastin decline, fat compartments shift and thin, bone support gradually recedes, and the skin itself alters with sun exposure and time. How these combine is individual, which is why two people of the same age can need entirely different approaches.",
    assessment:
      "We look at the whole face before any single feature: skin thickness and quality, where laxity sits and how much there is, volume distribution, muscle activity and facial proportions. We also discuss how you would like to look, your timeline, and what you are and are not comfortable with.",
    approach:
      "The aim is refinement, not change. Most plans combine treatments that work at different depths, from the quality of the skin to the support beneath it, sequenced over time rather than delivered at once. Just as important is knowing when not to treat, and when a lighter intervention will look more natural.",
    relatedConditions: [
      "Fine lines and wrinkles",
      "Loss of firmness",
      "Jawline and jowls",
      "Volume loss",
      "Neck laxity",
      "Sun-related ageing",
    ],
    resultCategory: "ageing",
    programmes: ["The Signature Lift", "The Signature Skin Quality Programme"],
    approaches: ["Facial Rejuvenation", "Skin Quality"],
    technologies: [
      "Thermage FLX",
      "Ultraformer MPT",
      "Endolift X",
      "Fotona SP Dynamis Max",
      "Sylfirm X",
    ],
  },
  {
    title: "Pigmentation & Melasma",
    slug: "pigmentation",
    summary:
      "Uneven tone has many causes. Identifying the right one matters more than the strength of the treatment.",
    understanding:
      "Pigmentation can come from sun exposure, hormonal influences, inflammation after acne or injury, or conditions such as melasma, which tends to be persistent and can worsen with the wrong treatment. Darker skin types in particular need a careful, measured approach, because aggressive treatment can itself trigger further pigmentation.",
    assessment:
      "We identify the type and depth of the pigmentation, its likely triggers and your skin type, and look at what has and has not worked for you before. Melasma is assessed as a long-term condition to be managed, rather than a mark to be removed.",
    approach:
      "Plans usually combine medical skincare and sun protection with carefully selected in-clinic treatment, introduced gradually. The emphasis is on control and maintenance, and on avoiding the rebound that follows treatment too aggressive for the skin.",
    relatedConditions: [
      "Melasma",
      "Sun spots and sun damage",
      "Post-acne marks",
      "Uneven skin tone",
      "Dark patches",
      "Unwanted tattoos",
    ],
    resultCategory: "pigmentation",
    programmes: ["The Signature Pigmentation Programme"],
    approaches: ["Pigmentation", "Skin Quality"],
    technologies: ["Fotona StarWalker", "Sylfirm X", "Fotona SP Dynamis Max"],
  },
  {
    title: "Acne & Acne Scars",
    slug: "acne",
    summary:
      "Active acne and the scarring it leaves are different problems, treated in a particular order.",
    understanding:
      "Active acne is a medical condition influenced by hormones, oil production, bacteria and inflammation. Scarring is its aftermath, and scars vary widely, from shallow changes in texture to deeper depressions, each responding to different treatment.",
    assessment:
      "We first establish whether acne is still active, because scar treatment works best once the skin is under control. We then assess the type, depth and distribution of scarring, alongside your skin type and any tendency to pigment.",
    approach:
      "Control comes before correction. Active acne is treated medically first; scarring is then addressed in stages, often combining treatments that resurface, remodel and lift scar tissue. Progress is reviewed between sessions and the plan adjusted.",
    relatedConditions: [
      "Active acne",
      "Acne marks",
      "Rolling and boxcar scars",
      "Ice-pick scars",
      "Oily, congested skin",
    ],
    resultCategory: "acne-scars",
    programmes: ["The Signature Acne Scar Programme"],
    approaches: ["Acne & Scarring", "Pigmentation"],
    technologies: ["Dermapen 4", "SkinPen", "Sylfirm X", "Fotona SP Dynamis Max", "Hydrafacial"],
  },
  {
    title: "Skin Quality, Texture & Pores",
    slug: "skin-quality",
    summary: "Healthy skin is the foundation every other treatment depends on.",
    understanding:
      "Dullness, enlarged pores, uneven texture and dehydration are often the first changes people notice. They reflect the health of the skin barrier, cell turnover and collagen, and they respond best to consistent, well-judged care rather than occasional intensive treatment.",
    assessment:
      "We assess hydration, oil balance, pore size, texture, sensitivity and sun damage, and review your current skincare. Often the most valuable change is simplifying a routine rather than adding to it.",
    approach:
      "Plans combine medical skincare with treatment that renews the surface and stimulates collagen beneath it, paced to suit your skin. The goal is skin that looks healthy, without looking treated.",
    relatedConditions: [
      "Dull or tired skin",
      "Enlarged pores",
      "Uneven texture",
      "Dehydration",
      "Dry skin",
      "Blemishes and skin tags",
    ],
    resultCategory: "skin-quality",
    programmes: ["The Signature Skin Quality Programme"],
    approaches: ["Skin Quality", "Facial Rejuvenation"],
    technologies: ["Hydrafacial", "OxyGeneo", "Dermapen 4", "SkinPen", "GFC"],
  },
  {
    title: "Eyes & Periorbital Ageing",
    slug: "eyes",
    summary:
      "The skin around the eyes is the thinnest on the face, and it asks for particular precision.",
    understanding:
      "Hollowing, dark circles, puffiness, fine lines and hooding can each make the eyes look tired, and they often occur together. Their causes differ, from volume loss and laxity to pigmentation and fluid, so a treatment that helps one can make another more noticeable.",
    assessment:
      "We look closely at what is producing the tired appearance: skin thickness and laxity, the tear trough, pigmentation, brow position and the surrounding face. This is an area where restraint and anatomical understanding matter most.",
    approach:
      "Treatment is conservative and carefully sequenced, often addressing skin quality and laxity before any volume. Where a non-surgical option is unlikely to give a result you would be happy with, we will say so.",
    relatedConditions: [
      "Dark circles",
      "Under-eye bags",
      "Hollowness",
      "Crow's feet",
      "Hooded upper lids",
      "Brow position",
    ],
    resultCategory: "ageing",
    programmes: ["The Signature Lift"],
    approaches: ["Facial Rejuvenation", "Skin Quality"],
    technologies: ["Thermage FLX", "Plasmapen", "Fotona SP Dynamis Max"],
  },
  {
    title: "Facial Contouring",
    slug: "facial-contouring",
    summary: "Proportion and balance, refined subtly and in harmony with your features.",
    understanding:
      "Facial contour is shaped by bone structure, fat, muscle and skin. Small changes in definition along the jawline, chin, cheeks or lips can change how balanced a face appears, which is exactly why they need to be judged carefully.",
    assessment:
      "We assess facial proportions, symmetry, profile and underlying structure, and discuss what you would like to change and why. The best contouring respects the individual face rather than following a trend.",
    approach:
      "A plan may combine volume restoration, subdermal tightening and muscle refinement, used sparingly and built up gradually, so that the result reads as a refined version of you.",
    relatedConditions: [
      "Jawline definition",
      "Chin",
      "Cheek contour",
      "Lips",
      "Double chin",
      "Masseter prominence",
    ],
    resultCategory: "ageing",
    programmes: ["The Signature Lift"],
    approaches: ["Facial Contouring", "Facial Rejuvenation"],
    technologies: ["Endolift X", "Ultraformer MPT"],
  },
  {
    title: "Hair & Scalp",
    slug: "hair",
    summary: "Hair loss has a cause. Treatment begins with finding it.",
    understanding:
      "Thinning and hair loss can be driven by genetics, hormones, nutrition, stress, thyroid function, scalp conditions or autoimmune causes such as alopecia areata. Scalp health, from dandruff to excess oil, also affects how hair grows.",
    assessment:
      "As dermatologists, we assess the pattern of loss, the scalp itself and your medical history, and where appropriate request investigations, before recommending treatment. Treating hair loss without understanding its cause rarely gives lasting results.",
    approach:
      "Plans typically combine medical treatment with regenerative in-clinic therapy and follow-up over months, because hair responds slowly. Progress is tracked so the plan can be refined rather than simply repeated.",
    relatedConditions: [
      "Hair thinning",
      "Hair fall",
      "Alopecia areata",
      "Dandruff",
      "Oily or dry scalp",
      "Damaged hair",
    ],
    resultCategory: "hair",
    programmes: ["The Signature Hair & Scalp Programme"],
    approaches: ["Hair & Scalp"],
    technologies: ["GFC"],
  },
  {
    title: "Body Contouring",
    slug: "body-contouring",
    summary:
      "Contour, firmness and skin quality on the body, approached with the same care as the face.",
    understanding:
      "Stubborn areas of fat, loose skin and cellulite often persist despite diet and exercise. They differ in cause and depth, and each responds to different forms of treatment.",
    assessment:
      "We assess the areas you are concerned about, skin laxity, fat distribution and your overall goals, and are clear about what non-surgical body treatment can and cannot achieve.",
    approach:
      "A plan may combine treatment that reduces localised fat, tightens skin and improves texture, delivered as a course and reviewed along the way. We recommend body treatment only where it is likely to make a difference you will notice.",
    relatedConditions: ["Abdomen", "Arms", "Thighs", "Chin and neck", "Loose skin", "Cellulite"],
    resultCategory: "body",
    programmes: [],
    approaches: ["Body"],
    technologies: ["Venus Bliss Max", "Ultraformer MPT", "Endolift X", "Fotona StarFormer"],
  },
  {
    title: "Hair Removal",
    slug: "hair-removal",
    summary: "Long-term hair reduction, with every setting chosen for your skin.",
    understanding:
      "Laser hair reduction works by targeting pigment in the hair follicle. Skin tone, hair colour and hair thickness all affect which technology is safe and effective, which matters especially for darker skin types.",
    assessment:
      "We assess your skin type, your hair and any hormonal factors that can drive unwanted hair growth, before recommending a course of treatment.",
    approach:
      "Treatment is delivered as a series of sessions timed around the hair growth cycle, using settings chosen for your skin. Where a hormonal cause is suspected, we look at that too.",
    relatedConditions: ["Face", "Underarms", "Arms and legs", "Body", "Hormonal hair growth"],
    resultCategory: "body",
    programmes: [],
    approaches: ["Hair Removal"],
    technologies: ["GentleYAG", "Fotona SP Dynamis Max"],
  },
];

/** Medical dermatology is acknowledged on the index rather than forced into an aesthetic concern. */
export const MEDICAL_DERMATOLOGY = ["Psoriasis", "Vitiligo", "Dermatitis", "Warts"];

/* ------------------------------------------------------------------ */
/* Treatment approaches                                                */
/* ------------------------------------------------------------------ */

export type SeedApproach = {
  title: string;
  summary: string;
  philosophy: string;
  considerations: string[];
  modalities: string[];
  concerns: string[];
  technologies: string[];
};

export const APPROACHES: SeedApproach[] = [
  {
    title: "Facial Rejuvenation",
    summary: "Restoring freshness, firmness and structure in a way that still looks like you.",
    philosophy:
      "Rejuvenation is rarely a single treatment. We think in layers, from the surface of the skin to the deeper support of the face, and decide which of them genuinely need attention. The result should be that people notice you look well, not that you have had something done.",
    considerations: [
      "Skin quality and thickness",
      "Where laxity and volume loss sit",
      "Facial proportions and movement",
      "Downtime and timeline",
      "How results will be maintained",
    ],
    modalities: [
      "Radiofrequency Skin Tightening",
      "Ultrasound Skin Tightening",
      "Subdermal Laser Tightening",
      "Laser Skin Resurfacing",
      "Microneedling & RF Microneedling",
      "Dermal Fillers",
      "Botulinum Toxin",
    ],
    concerns: ["Facial Ageing & Skin Laxity", "Eyes & Periorbital Ageing"],
    technologies: ["Thermage FLX", "Ultraformer MPT", "Endolift X", "Fotona SP Dynamis Max", "Sylfirm X"],
  },
  {
    title: "Pigmentation",
    summary: "Even, luminous skin, pursued patiently and safely.",
    philosophy:
      "Pigmentation rewards patience and punishes haste. We favour gradual, controlled improvement over aggressive treatment, and we plan for maintenance from the outset, because most pigmentation tends to return without it.",
    considerations: [
      "The type and depth of pigmentation",
      "Skin type and pigmentation risk",
      "Hormonal and sun-related triggers",
      "Previous treatments and reactions",
      "Long-term maintenance",
    ],
    modalities: [
      "Medical Treatment",
      "Laser Toning",
      "Medical Peels",
      "Microneedling & RF Microneedling",
      "Laser Skin Resurfacing",
    ],
    concerns: ["Pigmentation & Melasma", "Acne & Acne Scars"],
    technologies: ["Fotona StarWalker", "Sylfirm X", "Fotona SP Dynamis Max"],
  },
  {
    title: "Acne & Scarring",
    summary: "Calming active acne first, then restoring smoother, more even skin.",
    philosophy:
      "We treat acne as a medical condition before we treat it as a cosmetic one. Once the skin is stable, scars are addressed in stages, matching each type of scar to the treatment most likely to improve it, and reviewing progress as we go.",
    considerations: [
      "Whether acne is still active",
      "Scar type, depth and distribution",
      "Tendency to post-inflammatory pigmentation",
      "Downtime you can accommodate",
      "Skincare and maintenance",
    ],
    modalities: [
      "Medical Treatment",
      "Medical Peels",
      "Hydrafacial & Medical Facials",
      "Microneedling & RF Microneedling",
      "Laser Skin Resurfacing",
      "Dermal Fillers",
    ],
    concerns: ["Acne & Acne Scars"],
    technologies: ["Dermapen 4", "SkinPen", "Sylfirm X", "Fotona SP Dynamis Max", "Hydrafacial"],
  },
  {
    title: "Skin Quality",
    summary: "Healthier, clearer, more resilient skin, as the foundation for everything else.",
    philosophy:
      "Good skin quality makes every other treatment look better and last longer. We start with the barrier and the basics, then add treatment that renews and strengthens the skin at a pace it can tolerate.",
    considerations: [
      "Barrier health and sensitivity",
      "Hydration and oil balance",
      "Texture, pores and tone",
      "Your current skincare",
      "Sun exposure and lifestyle",
    ],
    modalities: [
      "Hydrafacial & Medical Facials",
      "Medical Peels",
      "Microneedling & RF Microneedling",
      "PRP & GFC",
      "Laser Toning",
      "Dermatosurgery",
    ],
    concerns: ["Skin Quality, Texture & Pores", "Facial Ageing & Skin Laxity"],
    technologies: ["Hydrafacial", "OxyGeneo", "Dermapen 4", "SkinPen", "GFC"],
  },
  {
    title: "Hair & Scalp",
    summary: "Understanding the cause of hair loss, then treating it over time.",
    philosophy:
      "Hair responds slowly, so treatment is a programme rather than an appointment. We combine medical management with regenerative therapy and track progress, so the plan evolves with your response.",
    considerations: [
      "The pattern and cause of hair loss",
      "Scalp health",
      "Medical history and investigations",
      "Nutritional and hormonal factors",
      "Realistic timelines",
    ],
    modalities: ["Medical Treatment", "PRP & GFC"],
    concerns: ["Hair & Scalp"],
    technologies: ["GFC"],
  },
  {
    title: "Facial Contouring",
    summary: "Definition and balance, restored with a light and precise hand.",
    philosophy:
      "Contouring is about proportion. We make small, considered changes that bring features into balance, and would rather do slightly less than risk a result that looks overdone.",
    considerations: [
      "Facial proportions and profile",
      "Underlying bone and fat structure",
      "Muscle activity",
      "Symmetry",
      "What you want to change, and why",
    ],
    modalities: [
      "Dermal Fillers",
      "Botulinum Toxin",
      "Subdermal Laser Tightening",
      "Ultrasound Skin Tightening",
    ],
    concerns: ["Facial Contouring", "Facial Ageing & Skin Laxity"],
    technologies: ["Endolift X", "Ultraformer MPT"],
  },
  {
    title: "Body",
    summary: "Contour, firmness and smoother skin, with honest expectations.",
    philosophy:
      "Non-surgical body treatment can make a real difference in the right person. We are clear about who is likely to benefit, combine treatments where that adds value, and deliver them as a reviewed course.",
    considerations: [
      "Areas of concern and fat distribution",
      "Skin laxity and texture",
      "Lifestyle and weight stability",
      "Expected timelines",
      "Whether hair reduction is also wanted",
    ],
    modalities: ["Body Contouring", "Radiofrequency Skin Tightening", "Laser Hair Reduction"],
    concerns: ["Body Contouring"],
    technologies: ["Venus Bliss Max", "Ultraformer MPT", "Endolift X", "Fotona StarFormer", "GentleYAG"],
  },
  {
    title: "Hair Removal",
    summary: "Long-term reduction of unwanted hair, with every setting chosen for your skin.",
    philosophy:
      "Laser hair reduction is a course of treatment rather than a single appointment, and the settings matter more than the platform. We select the wavelength and parameters for your skin type and hair, and where unwanted hair growth suggests a hormonal cause, we look into that too.",
    considerations: [
      "Skin type and hair colour",
      "The areas you would like treated",
      "Hormonal factors behind unwanted hair growth",
      "Previous hair removal and any reactions",
      "Timing around the hair growth cycle",
    ],
    modalities: ["Laser Hair Reduction", "Medical Treatment"],
    concerns: ["Hair Removal"],
    technologies: ["GentleYAG", "Fotona SP Dynamis Max"],
  },
];

/* ------------------------------------------------------------------ */
/* The Dr Bhagat's Signature — the doctors' own copy                   */
/* ------------------------------------------------------------------ */

export type SeedProgramme = {
  title: string;
  shortTitle: string;
  slug: string;
  tagline: string;
  body: string[];
  closing?: string;
  concerns: string[];
  approaches: string[];
};

export const PROGRAMMES: SeedProgramme[] = [
  {
    title: "The Signature Lift",
    shortTitle: "Signature Lift",
    slug: "signature-lift",
    tagline: "A refined approach to facial ageing and laxity.",
    body: [
      "Facial ageing is rarely caused by one thing. Our approach looks at skin quality, laxity, collagen, facial contours and the individual pattern of ageing before determining the appropriate treatment strategy.",
      "Depending on the patient, this may involve lifting, tightening, collagen stimulation, skin-quality treatments or a combination of modalities.",
    ],
    closing:
      "The objective is not to change your face. It is to restore definition and freshness while keeping it recognisably yours.",
    concerns: ["Facial Ageing & Skin Laxity", "Eyes & Periorbital Ageing", "Facial Contouring"],
    approaches: ["Facial Rejuvenation", "Facial Contouring"],
  },
  {
    title: "The Signature Skin Quality Programme",
    shortTitle: "Skin Quality",
    slug: "skin-quality-programme",
    tagline: "Because beautiful skin is the foundation of every aesthetic result.",
    body: [
      "Texture, pores, pigmentation, hydration, firmness and collagen all contribute to the way skin looks and feels.",
      "Our approach combines medical skincare and appropriate in-clinic treatments to improve the overall quality of the skin rather than chasing one isolated concern.",
    ],
    closing: "Healthy-looking skin first. Aesthetic refinement follows.",
    concerns: ["Skin Quality, Texture & Pores", "Facial Ageing & Skin Laxity"],
    approaches: ["Skin Quality"],
  },
  {
    title: "The Signature Pigmentation Programme",
    shortTitle: "Pigmentation",
    slug: "pigmentation-programme",
    tagline: "A long-term approach to clearer, more even skin.",
    body: [
      "Pigmentation is not always simply a problem of excess pigment.",
      "Melasma, sun exposure, inflammation and individual skin behaviour can all play a role. Our approach begins by understanding the type and cause of pigmentation before selecting the appropriate combination of medical treatment, skincare and technology.",
    ],
    closing:
      "The aim is not simply to remove pigment. It is to manage the skin intelligently over time.",
    concerns: ["Pigmentation & Melasma"],
    approaches: ["Pigmentation", "Skin Quality"],
  },
  {
    title: "The Signature Acne Scar Programme",
    shortTitle: "Acne Scars",
    slug: "acne-scar-programme",
    tagline: "Because every scar has a history—and a different structure.",
    body: [
      "Acne scars vary considerably in their depth, shape and underlying changes.",
      "We assess the type of scarring, skin quality, pigmentation and any ongoing acne before creating a treatment strategy. Depending on the individual, different technologies and techniques may be combined or staged over time.",
    ],
    closing:
      "The goal is meaningful improvement in texture and confidence—not unrealistic perfection.",
    concerns: ["Acne & Acne Scars"],
    approaches: ["Acne & Scarring"],
  },
  {
    title: "The Signature Hair & Scalp Programme",
    shortTitle: "Hair",
    slug: "hair-and-scalp-programme",
    tagline: "A personalised approach to healthier hair.",
    body: [
      "Hair loss and thinning have many possible causes. A meaningful treatment plan begins with understanding what is driving the problem rather than simply treating the symptom.",
      "Our approach combines medical assessment with appropriate treatments and long-term scalp and hair care according to individual needs.",
    ],
    concerns: ["Hair & Scalp"],
    approaches: ["Hair & Scalp"],
  },
];

/* ------------------------------------------------------------------ */
/* Doctors — the doctors' own copy                                     */
/* ------------------------------------------------------------------ */
/**
 * The doctors' profiles. Every credential came from the doctors and must be
 * verified against their CVs before launch: nothing here is inferred, and the
 * page hides any field left empty. Both trained in Dermatology at Seth GS
 * Medical College and King Edward Memorial Hospital, Mumbai.
 */
export type SeedDoctor = {
  name: string;
  slug: string;
  degree: string;
  institution: string;
  credential?: string;
  role: string;
  specialty: string;
  position: string;
  order: number;
  shortBio: string;
  biography: string[];
  quote: string;
  expertise: string[];
  foundations: { title: string; detail?: string }[];
};

const KEM = "Seth GS Medical College & KEM Hospital, Mumbai";

export const DOCTORS: SeedDoctor[] = [
  {
    name: "Dr Priyam Bhagat",
    slug: "dr-priyam-bhagat",
    degree: "MD, Dermatology",
    institution: KEM,
    credential: "Gold Medallist \u00b7 University of Mumbai",
    role: "Consultant Dermatologist",
    specialty: "Aesthetic & Cosmetic Dermatology | Laser & Energy-Based Medicine",
    position: "Co-Founder",
    order: 0,
    shortBio:
      "A dermatologist with a distinguished academic foundation and extensive experience in aesthetic and cosmetic dermatology.",
    biography: [
      "Dr Priyam Bhagat is a dermatologist with a distinguished academic foundation and extensive experience in aesthetic and cosmetic dermatology.",
      "She completed her MD in Dermatology at Seth GS Medical College and King Edward Memorial Hospital, Mumbai, graduating as a Gold Medallist of the University of Mumbai, following an MBBS in which she achieved eight distinctions \u2014 an academic record that reflects the depth of her medical training.",
      "Her specialisation in aesthetic dermatology has been complemented by advanced international training in cosmetic and aesthetic dermatology and laser medicine, including professional exposure in the United States.",
      "She has also worked extensively with Dr Leslie Baumann, gaining exposure to advanced approaches to cosmetic dermatology, skin assessment and the science of skin ageing.",
      "A member of the American Academy of Dermatology, Dr Bhagat has participated as a speaker and presenter at dermatology conferences and has presented scientific work involving challenging dermatological cases.",
      "Her clinical practice today lies at the intersection of dermatology and aesthetic medicine, with particular expertise in skin ageing, pigmentation, laser treatments, advanced non-surgical rejuvenation and the use of energy-based technologies to improve skin quality and facial appearance.",
      "Her approach is grounded in an understanding that aesthetic treatment should enhance rather than override individuality.",
    ],
    quote:
      "The best aesthetic results are not about creating a different face. They are about understanding what has changed and refining it with precision.",
    expertise: [
      "Skin Ageing & Facial Rejuvenation",
      "Pigmentation & Melasma",
      "Laser & Energy-Based Treatments",
      "Advanced Non-Surgical Rejuvenation",
      "Skin Quality & Texture",
      "Facial Contouring",
    ],
    foundations: [
      { title: "MD Dermatology", detail: KEM },
      { title: "Gold Medallist", detail: "University of Mumbai" },
      { title: "Eight Distinctions", detail: "MBBS" },
      { title: "Member", detail: "American Academy of Dermatology" },
      { title: "International Training", detail: "Cosmetic & aesthetic dermatology, laser medicine" },
      { title: "International Clinical Exposure", detail: "Dr Leslie Baumann, USA" },
      { title: "Conference Speaker & Presenter", detail: "Dermatology and scientific meetings" },
    ],
  },
  {
    name: "Dr Kamlesh V. Bhagat",
    slug: "dr-kamlesh-bhagat",
    degree: "MD, Dermatology",
    institution: KEM,
    role: "Consultant Dermatologist & Dermatosurgeon",
    specialty: "Clinical & Aesthetic Dermatology",
    position: "Co-Founder",
    order: 1,
    shortBio:
      "A dermatologist and dermatosurgeon with extensive clinical experience across medical, surgical and aesthetic dermatology.",
    biography: [
      "Dr Kamlesh V. Bhagat is a dermatologist and dermatosurgeon with extensive clinical experience across medical dermatology, dermatosurgery, hair and scalp disorders, acne, pigmentation, paediatric dermatology and aesthetic medicine.",
      "He completed his postgraduate training in Dermatology at Seth GS Medical College and King Edward Memorial Hospital, Mumbai, one of India\u2019s foremost academic medical institutions.",
      "His clinical experience encompasses the diagnosis and management of complex dermatological conditions as well as a broad range of dermatosurgical procedures.",
      "His practice includes the management of hair and scalp disorders, acne, pigmentation and other challenging dermatological conditions, alongside aesthetic and procedural dermatology.",
      "His continuing professional development has included specialised training in aesthetic dermatology, botulinum toxin, dermal fillers and laser medicine, together with ongoing participation in professional conferences, workshops and advanced training programmes.",
      "Alongside clinical practice, Dr Bhagat has been involved in research and development of newer dermatological formulations and has presented his work at professional conferences and scientific meetings.",
      "His clinical experience has also included consultancy in hospital and paediatric multispecialty settings, giving his practice a broad perspective across different dermatological conditions and patient groups.",
      "Today, he combines the diagnostic discipline of clinical dermatology with the possibilities offered by modern aesthetic medicine.",
    ],
    quote:
      "Every treatment should have a reason behind it. Good dermatology begins with understanding why the concern is there.",
    expertise: [
      "Clinical Dermatology",
      "Dermatosurgery",
      "Hair & Scalp Disorders",
      "Acne & Pigmentation",
      "Paediatric Dermatology",
      "Aesthetic Dermatology",
    ],
    foundations: [
      { title: "MD Dermatology", detail: KEM },
      { title: "Dermatology & Dermatosurgery", detail: "Advanced clinical experience" },
      {
        title: "Specialised Training",
        detail: "Aesthetic dermatology, botulinum toxin, dermal fillers, lasers",
      },
      { title: "Research & Development", detail: "Dermatological formulations" },
      { title: "Hospital & Clinical Consultancy", detail: "Adult and paediatric dermatology" },
      { title: "Conference Speaker & Presenter", detail: "Dermatology and professional meetings" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Testimonials — verbatim excerpts                                    */
/* ------------------------------------------------------------------ */

export type SeedTestimonial = {
  author: string;
  quote: string;
  category?: ResultCategory;
  featured?: boolean;
};

export const TESTIMONIALS: SeedTestimonial[] = [
  {
    author: "Beryl Menezes",
    quote: "Very impressed with the personalized consultation and the results.",
    featured: true,
  },
  {
    author: "Kalyani Chetan Paranjpe",
    quote:
      "My skin was scarred and had pimples on it but Dr suggested medicines that work wonders. Unlike others, Dr Priyam and Dr Kamlesh do not rush but they hear you out and prescribe only the necessary medicines.",
    category: "acne-scars",
    featured: true,
  },
  {
    author: "Niket Rawkar",
    quote:
      "I also liked the nature of Dr. Kamlesh and Dr Priyam; they both are very humble and give enough time to listen and resolve our queries while consulting.",
    category: "pigmentation",
    featured: true,
  },
  {
    author: "Supriya Bane",
    quote:
      "The clinic ambience and doctor is very understanding. They understand what's the issue till the core and treat accordingly.",
  },
  {
    author: "Anuja Rane",
    quote:
      "It's been more than 8 years I am consulting Dr Priyam… Her accurate diagnosis and expertise have helped me feel confident and happy.",
    category: "skin-quality",
  },
  {
    author: "Prasad Parulekar",
    quote:
      "Her advice and laser treatment also helped me get rid of dark spots and pigmentations. She is always very energetic and listens to the patients carefully.",
    category: "pigmentation",
  },
  {
    author: "Neha Kaikini",
    quote:
      "I had a bad hair fall… Since I started taking treatment and medicines from Dr. Priyam I found it so effective that it reduced a lot.",
    category: "hair",
  },
  {
    author: "Milind Dhonde",
    quote:
      "Dr. Priyam is a splendid doctor with years of experience and expertise in dermatology, while also being super empathetic with all her patients.",
  },
];

/* ------------------------------------------------------------------ */
/* The Clinic                                                          */
/* ------------------------------------------------------------------ */

/** Spaces render on the site only once photographed, so these can be prepared now. */
export const CLINIC_SPACES = [
  {
    title: "Architecture",
    description: "A contemporary, discreet setting, designed for calm from the moment you arrive.",
  },
  {
    title: "Reception",
    description: "A calm, private welcome, and a considered start to every visit.",
  },
  {
    title: "Consultation rooms",
    description: "Private rooms for unhurried assessment and conversation with your doctor.",
  },
  {
    title: "Treatment rooms",
    description: "Clinical spaces prepared for precision, comfort and privacy.",
  },
  {
    title: "Details",
    description: "The small, considered details of a private medical environment.",
  },
  {
    title: "Technology",
    description:
      "Selected platforms, integrated into a medical environment rather than displayed as a showroom.",
  },
];

/* ------------------------------------------------------------------ */
/* Journal                                                             */
/* ------------------------------------------------------------------ */
/**
 * The Journal, in the doctors' own words: editorial rather than blog, never a
 * catalogue of machines, and never repeating the practice's philosophy - that
 * belongs in the tone. Each article carries the concern and approach a reader
 * may want to explore next, so the journey runs article -> concern ->
 * treatment -> consultation.
 *
 * A paragraph beginning "## " becomes a subheading.
 */
export type SeedArticle = {
  title: string;
  /** Keeps an article's address stable if its title changes. */
  slug: string;
  category: JournalCategory;
  featured?: boolean;
  excerpt: string;
  publishedAt: string;
  concern?: string;
  approach?: string;
  paragraphs: string[];
};

export const ARTICLES: SeedArticle[] = [
  {
    title: "Beyond Wrinkles: Understanding the Architecture of Facial Ageing",
    slug: "architecture-of-facial-ageing",
    category: "ageing",
    featured: true,
    excerpt:
      "Wrinkles are only one part of the picture. The face changes at several levels, and understanding which change matters is what makes treatment precise.",
    publishedAt: "2026-09-16T09:00:00.000Z",
    concern: "Facial Ageing & Skin Laxity",
    approach: "Facial Rejuvenation",
    paragraphs: [
      "When people talk about facial ageing, wrinkles are usually the first thing they mention.",
      "But wrinkles are only one part of the picture.",
      "The face changes at several levels as we age. Skin gradually loses collagen and elasticity. Texture and pigmentation can change. Fat compartments alter in volume and position. Supporting tissues become less resilient. Contours that once appeared sharp and defined may gradually soften.",
      "The result is not simply \u201cmore wrinkles\u201d.",
      "It is a change in the architecture of the face.",
      "## Why this matters",
      "One of the things we see repeatedly in clinic is that people of exactly the same age can have completely different concerns.",
      "One person may notice a softer jawline. Another may feel that her skin looks crepey or less luminous. Someone else may be troubled primarily by pigmentation or a tired appearance.",
      "Their treatment plans should not be the same.",
      "This is why looking at one wrinkle in isolation can sometimes miss what is actually creating the overall impression of ageing.",
      "## Working with the different layers",
      "Modern aesthetic medicine gives us the ability to address different aspects of ageing with considerable precision.",
      "Energy-based treatments can stimulate collagen and tissue remodelling. Certain technologies can improve laxity and contour. Laser and resurfacing treatments can address texture and pigmentation. Injectable treatments, when appropriate, can restore or rebalance selected areas.",
      "The important part is understanding which change is contributing most to the patient\u2019s concern.",
      "## A younger face is not the objective",
      "We do not want to erase every sign of age.",
      "Expression, individuality and facial character are what make a face recognisable and attractive.",
      "The goal is often subtler: skin that looks healthier, contours that appear more defined, and a face that looks rested and harmonious.",
      "When facial ageing is understood as a whole rather than as a collection of individual wrinkles, treatment becomes much more nuanced.",
      "And that is where modern aesthetic medicine becomes particularly interesting.",
    ],
  },
  {
    title: "The Difference Between Tightening, Lifting and Improving Skin Quality",
    slug: "tightening-lifting-and-skin-quality",
    category: "technology",
    excerpt:
      "It is one of the most common questions in consultation \u2014 and the word lift means very different things to different patients.",
    publishedAt: "2026-09-15T09:00:00.000Z",
    concern: "Facial Ageing & Skin Laxity",
    approach: "Facial Rejuvenation",
    paragraphs: [
      "\u201cWill this treatment lift my face?\u201d",
      "It is one of the most common questions we hear in consultation.",
      "The difficulty is that the word lift can mean very different things to different people.",
      "A patient may actually be describing laxity, loss of definition, crepey skin, reduced elasticity or a change in facial contour.",
      "Tightening, lifting and improving skin quality are related \u2014 but they are not interchangeable.",
      "## Tightening",
      "Skin tightening generally refers to improving firmness and reducing the appearance of laxity.",
      "Depending on the patient\u2019s anatomy and degree of laxity, treatments using radiofrequency, ultrasound, laser energy and other technologies may be considered to stimulate tissue remodelling and improve firmness.",
      "The changes are often gradual, as the skin responds biologically over time.",
      "## Lifting",
      "A visible lift involves more than the surface of the skin.",
      "It can relate to tissue support, contour and the relationship between different structures of the face.",
      "For carefully selected patients, minimally invasive procedures such as Endolift may be considered when the clinical objective includes addressing laxity and improving definition.",
      "It is not, however, a treatment that should be prescribed simply because someone asks for a \u201clift\u201d.",
      "## Skin quality",
      "Sometimes the face does not need lifting at all.",
      "It needs better skin.",
      "Dullness, uneven pigmentation, enlarged pores, rough texture and reduced elasticity can make a face look tired even when there is little significant laxity.",
      "In these cases, improving skin quality may create a much more noticeable improvement than attempting to alter facial contour.",
      "## So which treatment is right?",
      "This is why the consultation is important.",
      "A patient concerned about a softening jawline may require a very different approach from someone whose main concern is crepey skin. Someone with pigmentation may need an entirely different treatment strategy.",
      "There is no single procedure that is right for every face.",
      "The more useful question is: what has changed, and which change would make the greatest difference?",
      "Once that is understood, the technology becomes much easier to choose.",
    ],
  },
  {
    title: "Pigmentation Is Not One Problem",
    slug: "pigmentation-is-not-one-problem",
    category: "skin",
    excerpt:
      "Melasma, post-inflammatory pigmentation and sun-induced pigmentation can look similar to the patient, but they behave very differently.",
    publishedAt: "2026-09-14T09:00:00.000Z",
    concern: "Pigmentation & Melasma",
    approach: "Pigmentation",
    paragraphs: [
      "\u201cCan you remove my pigmentation?\u201d",
      "It sounds like a straightforward question.",
      "In dermatology, however, pigmentation is rarely quite that simple.",
      "Melasma, post-inflammatory pigmentation, sun-induced pigmentation and other pigmentary conditions can look similar to the patient but behave very differently.",
      "That is why treatment should begin with identifying what kind of pigmentation we are dealing with.",
      "## Why pigmentation can be difficult",
      "Pigment production can be influenced by ultraviolet and visible light, inflammation, hormones and individual skin biology.",
      "Some pigmentation responds relatively quickly to treatment. Other conditions, particularly those prone to recurrence, require a longer-term approach.",
      "This is especially relevant in Indian skin, where post-inflammatory pigmentation can develop easily after inflammation or injury.",
      "An aggressive approach is therefore not always the most effective one.",
      "## Treatment is often a process",
      "Depending on the diagnosis, treatment may include skincare, sun protection, topical medications, chemical peels and selected laser or other energy-based procedures.",
      "The choice depends on the type and depth of pigment, the patient\u2019s skin and how the condition has behaved in the past.",
      "The objective is not simply to make pigment disappear as quickly as possible.",
      "It is to improve the complexion without creating unnecessary inflammation, and to establish a strategy that helps maintain the improvement.",
      "## When clearer skin changes the whole face",
      "Pigmentation can be surprisingly powerful in the way we perceive the face.",
      "When uneven areas become less prominent, the complexion can appear brighter, smoother and healthier. Skin can look more luminous without changing a single facial feature.",
      "That is why successful pigmentation treatment is not simply about removing brown patches.",
      "It is about restoring a more even, clear and confident appearance to the skin.",
      "And because pigmentation can recur, the most successful treatment plan is usually one that considers both improvement and maintenance.",
    ],
  },
  {
    title: "When a Laser Is the Right Answer \u2014 and When It Isn\u2019t",
    slug: "when-a-laser-is-the-right-answer",
    category: "technology",
    excerpt:
      "An advanced laser practice is not about having sophisticated equipment. It is about knowing when a laser is actually the right treatment.",
    publishedAt: "2026-09-12T09:00:00.000Z",
    concern: "Skin Quality, Texture & Pores",
    approach: "Skin Quality",
    paragraphs: [
      "Lasers have transformed modern dermatology.",
      "With the right wavelength, parameters and technique, laser energy can be used to address concerns ranging from pigmentation and unwanted hair to vascular lesions, textural changes and selected signs of ageing.",
      "But an advanced laser practice is not simply about having sophisticated equipment.",
      "It is about knowing when a laser is actually the right treatment.",
      "## Precision begins with diagnosis",
      "Different wavelengths interact with tissue in different ways.",
      "The target may be pigment, blood vessels, water or another specific component of the skin. The treatment therefore has to be selected according to the clinical objective, the patient\u2019s skin type and the response we want to achieve.",
      "The same technology can produce very different outcomes depending on how it is used.",
      "## Sometimes another approach is better",
      "A patient with significant laxity may benefit more from a treatment designed to stimulate tightening or remodelling.",
      "Someone with active inflammation may need the underlying condition controlled before an energy-based procedure is considered.",
      "A patient with a compromised skin barrier may need to restore the skin first.",
      "And sometimes two complementary approaches can achieve more than either treatment alone.",
      "This is why simply asking, \u201cWhich laser do you have?\u201d is less useful than asking, \u201cWhat are we trying to improve?\u201d",
      "## What makes laser treatment so valuable",
      "When appropriately selected, laser treatment offers something particularly important: precision.",
      "It allows us to target specific concerns while carefully considering the surrounding tissue and the patient\u2019s individual skin.",
      "For the right indication, that precision can translate into meaningful improvement without changing the character of the face.",
      "The technology may be sophisticated. But the real expertise lies in knowing when to use it, how to use it and when not to use it.",
    ],
  },
  {
    title: "The Difference Between Looking Refreshed and Looking Done",
    slug: "refreshed-not-done",
    category: "ageing",
    excerpt:
      "The best aesthetic results are not necessarily the most obvious ones. Expression, proportion and movement are what make a face recognisable.",
    publishedAt: "2026-09-10T09:00:00.000Z",
    concern: "Facial Ageing & Skin Laxity",
    approach: "Facial Rejuvenation",
    paragraphs: [
      "Most people who come to an aesthetic clinic do not want to look like someone else.",
      "They want to look like themselves \u2014 just fresher. More rested. More luminous. Perhaps a little more defined.",
      "That distinction is important because the best aesthetic results are not necessarily the most obvious ones.",
      "## The face has to remain a face",
      "Expression, proportion and movement are fundamental to how we recognise one another.",
      "A treatment that changes too much can alter those qualities.",
      "A more refined approach considers what needs improvement while protecting the features that make the person distinctive.",
      "Sometimes that means improving skin rather than adding volume. Sometimes it means addressing laxity or contour. Sometimes treating pigmentation or texture creates a greater improvement than changing facial shape at all.",
      "## Improvement can be cumulative",
      "Modern aesthetic medicine does not always need to produce one dramatic change.",
      "For many patients, a series of carefully selected treatments over time can create a more natural result.",
      "Skin quality can be improved. Collagen stimulation can be encouraged. Laxity can be addressed where appropriate. Pigmentation can be brought under better control.",
      "Each improvement contributes to the overall impression.",
      "## The result should belong to you",
      "One of the nicest compliments after a treatment is not: \u201cYour face looks different.\u201d",
      "It is: \u201cYou look really good. Have you been on holiday?\u201d",
      "There may be no single obvious explanation. The skin looks healthier. The face appears fresher. The contours are a little more defined.",
      "But the person is still completely recognisable.",
      "That quietness is not an absence of treatment. It is often the sign of well-judged treatment.",
    ],
  },
  {
    title: "The Art of Knowing When Not to Treat",
    slug: "knowing-when-not-to-treat",
    category: "approach",
    excerpt:
      "There is always another treatment that can be offered. The more difficult clinical decision is knowing when a patient does not need one.",
    publishedAt: "2026-09-08T09:00:00.000Z",
    paragraphs: [
      "There is always another treatment that can be offered.",
      "The more difficult \u2014 and more important \u2014 clinical decision is knowing when a patient does not need one.",
      "Aesthetic medicine gives us remarkable possibilities, but the availability of a procedure does not automatically make it appropriate.",
      "## Sometimes the answer is not yet",
      "A patient may come in wanting to treat a concern that is better addressed first through skincare or management of an underlying skin condition.",
      "Someone else may have expectations that a procedure cannot realistically deliver.",
      "And occasionally, a feature that bothers a patient is not something that needs correcting at all.",
      "These are conversations worth having.",
      "## Good aesthetic medicine includes boundaries",
      "Every procedure has indications, limitations and potential risks.",
      "Understanding those limitations is part of being able to recommend a treatment responsibly.",
      "This becomes particularly important when several technologies appear capable of addressing the same concern.",
      "The decision should come down to what is likely to produce a meaningful benefit for that individual \u2014 not simply what is available.",
      "## And when treatment is appropriate",
      "That is when modern aesthetic medicine becomes exciting.",
      "For the right patient, carefully selected laser treatments, radiofrequency, ultrasound, minimally invasive procedures and regenerative approaches can create significant improvements in skin quality, firmness, texture or contour.",
      "But the treatment should have a clear reason for being there.",
      "The objective is not to accumulate procedures. It is to identify the change that matters, choose an appropriate way to address it, and allow the result to remain harmonious with the person.",
      "Sometimes the most valuable thing a doctor can say is: \u201cYou don\u2019t need that.\u201d",
      "And when treatment is genuinely appropriate, the recommendation carries much greater meaning.",
    ],
  },
  {
    title: "Skin Quality: The Quiet Foundation of a Beautiful Face",
    slug: "skin-quality-the-quiet-foundation",
    category: "skin",
    excerpt:
      "Luminosity, texture, elasticity, firmness, evenness. Youthfulness is not simply the absence of wrinkles.",
    publishedAt: "2026-09-05T09:00:00.000Z",
    concern: "Skin Quality, Texture & Pores",
    approach: "Skin Quality",
    paragraphs: [
      "There was a time when aesthetic conversations were dominated by wrinkles.",
      "Today, patients are increasingly interested in something more fundamental: the quality of their skin.",
      "Luminosity. Texture. Elasticity. Firmness. Evenness. The way light reflects from the skin.",
      "These characteristics can influence how youthful, rested and healthy the entire face appears.",
      "## Why skin quality matters",
      "A face can have relatively few wrinkles and still look tired if the skin is dull, uneven, rough or lax.",
      "Conversely, improving skin quality can make the entire face appear fresher without changing its proportions.",
      "This is one reason why modern aesthetic dermatology has moved beyond simply treating individual lines.",
      "We increasingly think about the skin as a living tissue that can be supported, protected and stimulated over time.",
      "## Building better skin takes time",
      "Collagen does not appear overnight.",
      "Many treatments designed to improve skin quality work by stimulating biological processes that develop gradually.",
      "Depending on the patient\u2019s concerns, this may include laser treatments, radiofrequency microneedling, resurfacing procedures, regenerative approaches or carefully selected combinations.",
      "The right choice depends on the skin \u2014 not on the popularity of a particular treatment.",
      "## The pleasure of gradual improvement",
      "There is something particularly elegant about an aesthetic result that develops quietly.",
      "The skin becomes smoother. Pigmentation becomes more even. Texture improves. The complexion becomes more luminous.",
      "The face simply begins to look healthier.",
      "Nobody needs to know exactly why.",
      "Youthfulness is not simply the absence of wrinkles. It is the impression of healthy, resilient, luminous skin that still looks completely like you.",
    ],
  },
];

