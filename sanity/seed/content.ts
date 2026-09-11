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

import type { ResultCategory, TechnologyCategory } from "../lib/categories";

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
    categories: ["energy-based", "rejuvenation"],
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
    approaches: ["Body"],
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
    concerns: ["Body Contouring", "Hair Removal"],
    technologies: ["Venus Bliss Max", "Ultraformer MPT", "Endolift X", "Fotona StarFormer", "GentleYAG"],
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

export type SeedDoctor = {
  name: string;
  position: string;
  role: string;
  specialty: string;
  order: number;
  shortBio: string;
  biography: string[];
  quote: string;
  qualifications: string[];
  expertise: string[];
};

const TRAINING = [
  "Seth GS Medical College and King Edward Memorial Hospital, Mumbai",
  "American Academy of Aesthetic Medicine",
  "University of Miami",
];

export const DOCTORS: SeedDoctor[] = [
  {
    name: "Dr Priyam Bhagat",
    position: "Co-Founder",
    role: "Consultant Dermatologist",
    specialty: "Aesthetic & Cosmetic Dermatology",
    order: 0,
    shortBio:
      "Dr Priyam Bhagat has developed her practice around the intersection of dermatology and aesthetic medicine, with a particular interest in skin ageing, pigmentation, lasers and advanced non-surgical rejuvenation.",
    biography: [
      "Dr Priyam Bhagat has developed her practice around the intersection of dermatology and aesthetic medicine, with a particular interest in skin ageing, pigmentation, lasers and advanced non-surgical rejuvenation.",
      "Her approach has been shaped by years of seeing patients with the same concern but very different underlying needs.",
      "A request for “lifting”, for example, may actually be about skin quality, laxity, changing contours or a combination of factors. Pigmentation may have several contributing causes. And sometimes what a patient thinks they need is not what they actually need.",
      "This is why she places considerable importance on the consultation.",
      "For Dr Bhagat, aesthetic medicine is not about following trends or performing the most treatments possible. It is about understanding the individual face and making thoughtful decisions about what will genuinely improve it.",
      "Her aesthetic philosophy is centred on refinement rather than transformation—preserving individuality while helping patients look healthier, fresher and more confident.",
    ],
    quote: "I believe the best results are the ones that enhance a person without changing who they are.",
    qualifications: TRAINING,
    expertise: ["Skin ageing", "Pigmentation", "Lasers", "Advanced non-surgical rejuvenation"],
  },
  {
    name: "Dr Kamlesh Bhagat",
    position: "Co-Founder",
    role: "Consultant Dermatologist",
    specialty: "Clinical & Aesthetic Dermatology",
    order: 1,
    shortBio:
      "Dr Kamlesh Bhagat brings extensive experience in dermatology and aesthetic medicine, with an approach grounded in careful assessment and long-term patient care.",
    biography: [
      "Dr Kamlesh Bhagat brings extensive experience in dermatology and aesthetic medicine, with an approach grounded in careful assessment and long-term patient care.",
      "His philosophy is straightforward: before deciding how to treat a concern, understand why it is there.",
      "Whether the patient is seeking help with ageing, pigmentation, acne, hair concerns or skin health, he believes that treatment should be guided by the individual’s clinical needs rather than by a particular procedure or technology.",
      "He combines the principles of dermatology with the possibilities offered by modern aesthetic medicine, while maintaining a strong emphasis on appropriate treatment and realistic expectations.",
      "For Dr Bhagat, good aesthetic medicine is as much about judgement as intervention.",
      "Knowing what will help is important.",
      "Knowing when something is unnecessary is equally important.",
    ],
    quote: "A good treatment plan should have a reason behind every decision.",
    qualifications: TRAINING,
    expertise: ["Clinical dermatology", "Aesthetic dermatology", "Long-term patient care"],
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

export type SeedArticle = {
  title: string;
  excerpt: string;
  publishedAt: string;
  paragraphs: string[];
};

/** Written in the practice's voice from the doctors' own stated philosophy; no clinical claims. */
export const ARTICLES: SeedArticle[] = [
  {
    title: "Considered treatment, not a menu",
    excerpt: "Why we begin with the person in front of us, not with a list of procedures.",
    publishedAt: "2026-09-10T09:00:00.000Z",
    paragraphs: [
      "Many aesthetic clinics present their services as a menu: a list of devices and procedures from which the patient is expected to choose. It is a familiar format, and it puts the most important decision in the wrong hands.",
      "A patient rarely arrives wanting a particular machine. They arrive with a concern: skin that looks tired, pigmentation that keeps returning, scarring that affects their confidence, hair that is thinning. The right question is not which treatment they would like, but what is actually happening, and what would genuinely help.",
      "At Dr Bhagat's, that question is answered by the doctor. Every plan begins with an assessment of the skin, the face or the body, and a conversation about goals, expectations and what the patient is comfortable with. Only then do we decide which treatments are appropriate, in which combination and in what order.",
      "Sometimes that means combining several treatments. Sometimes it means doing less than a patient expected. And sometimes it means advising against treatment altogether. That judgement — knowing what to use, when to combine, and when not to treat — is what we believe patients should expect from a medical practice.",
      "Every face is different. Every treatment plan should be too.",
    ],
  },
  {
    title: "Why every plan begins with a consultation",
    excerpt:
      "What happens during an assessment, and why it matters more than the treatment that follows.",
    publishedAt: "2026-09-08T09:00:00.000Z",
    paragraphs: [
      "The consultation is the most important appointment in any course of treatment. It is where a concern is properly understood, and where the difference between a good result and a disappointing one is usually decided.",
      "An assessment looks beyond the feature a patient is concerned about. With ageing, for instance, we consider skin quality, laxity, volume and proportion together, because treating one in isolation can make another more noticeable. With pigmentation, identifying the type and its triggers matters more than the strength of the treatment.",
      "We also want to understand the person: their medical history, what they have tried before, the downtime they can accommodate, and how they would like to look. A plan that suits someone's skin but not their life is unlikely to succeed.",
      "From there, we build a personalised plan, explain the reasoning behind it, and agree how progress will be reviewed. Treatment follows, and so does follow-up, because most concerns are best managed over time rather than in a single visit.",
      "Assess, diagnose, personalise, treat, refine. It is a simple sequence, and every part of it matters.",
    ],
  },
  {
    title: "Technology, selected with purpose",
    excerpt: "Our technology is a strength. It is never the starting point.",
    publishedAt: "2026-09-05T09:00:00.000Z",
    paragraphs: [
      "Dr Bhagat's has invested in an extensive portfolio of laser, energy-based and regenerative technology. It allows us to treat a wide range of concerns with precision, and we are proud of it.",
      "But a device is a tool, not a treatment plan. The same technology can be right for one patient and wrong for another, depending on their skin type, their anatomy, the nature of their concern and their goals. Darker skin types, for example, often call for a more measured choice of laser and settings.",
      "Having a range of technology means we never have to fit a patient to the equipment we happen to own. The doctor chooses what the assessment calls for, combines treatments where that adds value, and adjusts the approach as the skin responds.",
      "Knowing when not to use a technology is as important as knowing when to use it. Clinical judgement, rather than the machine, is what makes the difference.",
    ],
  },
];
