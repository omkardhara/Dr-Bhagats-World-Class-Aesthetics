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
/**
 * The technology portfolio. `dedicatedPage` technologies carry a full page
 * built around the doctors' six patient questions: what does it do, who is it
 * suitable for, what concerns can it address, how long is a session, what is
 * the downtime, and what can it be combined with - and when might it not be
 * chosen - with realistic expectations alongside. `perspective` gives the three
 * major lifting and tightening technologies more editorial depth.
 *
 * Written as what each technology allows the doctors to do, never as a
 * specification. Every clinical statement is a draft for the doctors to verify.
 */
export type SeedMachine = {
  name: string;
  /** In the doctors' categories; a technology may sit in more than one. */
  categories: TechnologyCategory[];
  /** Carries its own page, built from the fields below. */
  dedicatedPage: boolean;
  /** The one line on its card. */
  purpose: string;
  /** Internal technical note; not shown on the site. */
  description: string;
  whatItIs?: string;
  perspective?: string;
  whoMayBenefit?: string;
  helpsWith?: string[];
  sessionTime?: string;
  downtime?: string;
  expectations?: string;
  combinations?: string;
};

export const MACHINES: SeedMachine[] = [
  {
    name: "Thermage FLX",
    categories: ["energy-based", "lifting"],
    dedicatedPage: true,
    purpose:
      "Non-surgical skin tightening for the face, eyes and body.",
    description:
      "Monopolar radiofrequency platform with AccuREP technology for non-surgical skin tightening.",
    whatItIs:
      "Thermage FLX allows us to firm the skin without surgery or injections. It gently heats the deeper layers of the skin while protecting the surface, prompting the skin to rebuild and tighten its own collagen over the months that follow.",
    perspective:
      "Many patients who ask for a lift are in fact describing a loss of firmness. Thermage is selected when the assessment shows that the skin itself has lost its tension - and when that, rather than volume or deeper tissue descent, is the change that matters most to the face.",
    whoMayBenefit:
      "Patients with early to moderate laxity whose skin has begun to lose firmness, and who would prefer a gradual, natural change with little disruption. Where laxity is advanced or the deeper tissues have descended significantly, a different or combined approach is usually more appropriate.",
    helpsWith: [
      "Loss of firmness along the jawline and neck",
      "Crepey or loosening skin around the eyes",
      "Softening facial definition",
      "Crepey skin on the arms, abdomen or knees",
    ],
    sessionTime:
      "Usually a single session per area. A full face commonly takes around sixty to ninety minutes; the eyes or a smaller area take less, and body areas can take longer.",
    downtime:
      "Most patients return to their usual activities the same day. Mild redness or swelling can occur and usually settles within a day or two.",
    expectations:
      "Some firmness may be noticed early, but the main change develops gradually over two to six months as collagen remodels. The aim is firmer, better-supported skin - a refreshed look rather than a surgical lift.",
    combinations:
      "It is often combined with skin-quality treatment, or with ultrasound tightening of the deeper layers, planned in sequence rather than on the same day. It may not be chosen where laxity is advanced, where volume loss is the main issue, or where the skin surface needs attention first.",
  },
  {
    name: "Fotona SP Dynamis Max",
    categories: ["energy-based", "lasers"],
    dedicatedPage: true,
    purpose:
      "Laser treatment for texture, fine lines, pigmentation, acne and unwanted hair.",
    description:
      "Combined Nd:YAG and Er:YAG laser workstation for resurfacing, pigmentation and hair reduction.",
    whatItIs:
      "Fotona SP Dynamis Max allows us to perform several different laser treatments on one platform - from gentle skin rejuvenation to deeper resurfacing - with the settings chosen for each patient's skin. In practice it is used to refine texture, soften fine lines, treat pigmentation and acne, and reduce unwanted hair.",
    whoMayBenefit:
      "Patients whose plan calls for laser treatment of texture, fine lines, sun damage, acne or scarring, and those who need more than one laser effect within the same plan. The intensity is matched to the skin type, which matters particularly for darker skin.",
    helpsWith: [
      "Fine lines and uneven texture",
      "Sun damage and pigmentation",
      "Acne and acne scarring",
      "Enlarged pores and dull skin",
      "Early laxity, through gentle heating",
      "Unwanted hair",
    ],
    sessionTime:
      "From around twenty minutes for gentle treatments to about an hour for resurfacing, depending on the treatment chosen and the area.",
    downtime:
      "Depends on the treatment selected: none after gentle rejuvenation, and several days of redness and flaking after resurfacing. Your doctor will explain what to expect before treatment begins.",
    expectations:
      "Gentle treatments improve the skin gradually across a course; resurfacing produces a more visible change once the skin has recovered. The aim is healthier-looking skin, not a changed face.",
    combinations:
      "It is often combined with medical skincare, peels or microneedling within skin-quality and scar plans. It may not be chosen where the skin is inflamed, where recent sun exposure raises the risk of pigmentation, or where another treatment would achieve the same result more gently.",
  },
  {
    name: "Fotona StarWalker",
    categories: ["lasers"],
    dedicatedPage: true,
    purpose:
      "Laser treatment for sun spots, uneven tone, post-acne marks and tattoos.",
    description:
      "Q-switched Nd:YAG laser platform for pigment clearance, tattoo removal and laser toning.",
    whatItIs:
      "Fotona StarWalker allows us to treat unwanted pigment precisely. It breaks pigment into particles the body can clear, while leaving the surrounding skin largely undisturbed - which is why it can be used gently on Indian skin within a careful plan.",
    whoMayBenefit:
      "Patients with sun spots, freckling, uneven tone, post-acne marks or unwanted tattoos, once the type of pigmentation has been properly diagnosed. For melasma it is used cautiously, and only as part of a wider plan.",
    helpsWith: [
      "Sun spots and freckling",
      "Post-inflammatory pigmentation and acne marks",
      "Uneven tone and dullness",
      "Melasma, within a measured plan",
      "Unwanted tattoos",
    ],
    sessionTime:
      "Usually ten to thirty minutes, planned as a course. Toning sessions are short and gentle; treatment of individual marks or tattoos is more targeted.",
    downtime:
      "Toning usually involves none. More targeted treatment can leave temporary darkening or light crusting of the pigment, which settles over one to two weeks.",
    expectations:
      "Pigment typically lightens gradually over the course. Because pigmentation can return, maintenance and sun protection are part of the plan from the start.",
    combinations:
      "It is used alongside medical skincare and daily sun protection, and sometimes with peels or radiofrequency microneedling. It may not be chosen where pigmentation is inflamed or worsening, or where a gentler approach is safer for the skin.",
  },
  {
    name: "Ultraformer MPT",
    categories: ["energy-based", "lifting"],
    dedicatedPage: true,
    purpose:
      "Focused ultrasound to lift and tighten the deeper supporting layers.",
    description:
      "Micro-pulsed HIFU system delivering focused ultrasound to the deeper supporting layers of the face and body.",
    whatItIs:
      "Ultraformer MPT allows us to treat the deeper supporting layers of the face and neck without surgery. Focused ultrasound reaches the layers that hold the face up, encouraging them to tighten and remodel while the surface of the skin is left undisturbed.",
    perspective:
      "Ultraformer is chosen when the assessment shows that the supporting layers beneath the skin have begun to descend. It works at a depth that other non-surgical treatments do not reach - which is why it is so often one part of a plan rather than the whole of it.",
    whoMayBenefit:
      "Patients with early to moderate laxity along the jawline, neck or brow who would like lifting and tightening of the deeper tissues with little interruption to daily life. It is less suited to advanced laxity, or where the main concern is the skin surface.",
    helpsWith: [
      "Softening of the jawline and lower face",
      "Laxity beneath the chin and along the neck",
      "Heaviness around the brow and upper eyelids",
      "Loss of definition in the mid-face",
      "Selected areas on the body",
    ],
    sessionTime:
      "A full face and neck commonly takes around sixty to ninety minutes; smaller areas take less. Many patients need a single session, with maintenance considered later.",
    downtime:
      "Usually none beyond temporary redness. Mild tenderness, swelling or a feeling of tightness can last a few days.",
    expectations:
      "The change builds gradually over two to three months as the tissue remodels. Patients typically describe a firmer, more defined contour rather than a dramatic change.",
    combinations:
      "It is frequently paired with skin-quality or radiofrequency treatment, because the deeper layers and the skin surface age differently. It may not be chosen where laxity is advanced, where the skin is very thin, or where a minimally invasive approach such as Endolift is more appropriate.",
  },
  {
    name: "Sylfirm X",
    categories: ["energy-based", "lifting", "rejuvenation"],
    dedicatedPage: true,
    purpose:
      "Radiofrequency microneedling for skin remodelling, firmness and pigmentation.",
    description:
      "Dual-wave radiofrequency microneedling platform for pigmentation, vascular concerns and skin remodelling.",
    whatItIs:
      "Sylfirm X allows us to remodel the skin from within. Very fine needles deliver radiofrequency energy into the skin, stimulating collagen and firmness while also treating pigmentation, redness and texture. Within our lifting and tightening work, it is the technology that strengthens the quality and firmness of the skin itself.",
    whoMayBenefit:
      "Patients whose skin needs strengthening and remodelling - early laxity, crepey texture, scarring, or pigmentation that has not tolerated more aggressive treatment. Its measured approach makes it suitable for many Indian skin types.",
    helpsWith: [
      "Early laxity and loss of skin firmness",
      "Crepey or thinning skin",
      "Melasma and stubborn pigmentation",
      "Acne scarring and uneven texture",
      "Redness and visible vessels",
      "Enlarged pores",
    ],
    sessionTime:
      "Usually thirty to sixty minutes, including time for topical anaesthetic. It is typically planned as a course of sessions spaced several weeks apart.",
    downtime:
      "Redness and mild swelling for one to three days is usual, with a slightly rough texture as the skin recovers.",
    expectations:
      "Improvement is gradual and cumulative across the course, with firmer, smoother and more even skin developing over several months.",
    combinations:
      "It complements deeper lifting treatments such as ultrasound or Endolift by addressing the skin those treatments do not, and it is often part of pigmentation and scar programmes. It may not be chosen during active inflammation or infection, or where deeper laxity is the main concern.",
  },
  {
    name: "Endolift X",
    categories: ["lasers", "lifting"],
    dedicatedPage: true,
    purpose:
      "Minimally invasive laser tightening and definition beneath the skin.",
    description:
      "Minimally invasive endolaser using micro-optical fibres beneath the skin for tightening and localised fat reduction.",
    whatItIs:
      "Endolift X allows us to tighten and define from beneath the skin without surgery. A laser fibre finer than a needle is placed just under the skin, where it tightens the tissue and can reduce small areas of localised fat.",
    perspective:
      "Endolift sits between non-surgical tightening and surgery. It is selected when the assessment shows that definition along the lower face and neck is what matters most, and when a less invasive option is unlikely to achieve a result the patient would be happy with.",
    whoMayBenefit:
      "Patients who want more definition than surface treatments can offer, but who are not seeking surgery - particularly those with laxity or small pockets of fat along the lower face, jawline and neck. It is not prescribed simply because a patient asks for a lift.",
    helpsWith: [
      "Laxity along the jawline and lower face",
      "Jowling",
      "Fullness beneath the chin",
      "Loss of definition in the neck",
      "Selected areas on the body",
    ],
    sessionTime:
      "Performed by the doctor under local anaesthetic, usually in a single session of around thirty to sixty minutes, depending on the areas treated.",
    downtime:
      "Swelling and occasional bruising for several days is common, and a support garment may be advised. Most patients plan a quieter few days afterwards; the entry points are tiny and need no stitches.",
    expectations:
      "Some tightening may be seen early, with the result continuing to refine over three to six months. The aim is a more defined contour that still looks natural.",
    combinations:
      "It may be combined with skin-quality treatment or with non-surgical tightening elsewhere on the face. It may not be chosen where laxity is mild enough for non-invasive tightening, where it is too advanced for a non-surgical approach, or where volume loss rather than laxity is the main concern.",
  },
  {
    name: "GentleYAG",
    categories: ["lasers"],
    dedicatedPage: true,
    purpose:
      "Laser hair reduction suited to darker skin types.",
    description:
      "Long-pulse 1064 nm Nd:YAG laser with cryogen cooling, suited to hair reduction on darker skin types.",
    whatItIs:
      "GentleYAG allows us to reduce unwanted hair safely across a wide range of skin types. It reaches the hair follicle through more deeply pigmented skin, with cooling that protects the surface - which is why it is well suited to Indian skin.",
    whoMayBenefit:
      "Patients seeking long-term reduction of unwanted hair on the face or body, particularly those with darker skin types. Very fine, light or grey hair responds poorly to any laser.",
    helpsWith: [
      "Unwanted facial hair",
      "Underarms, arms and legs",
      "Back, chest and other body areas",
      "Ingrowing hairs and folliculitis",
    ],
    sessionTime:
      "From a few minutes for a small area to around an hour for larger areas, as a course of sessions spaced four to eight weeks apart.",
    downtime:
      "None in most cases. Redness and slight swelling around the follicles usually settles within a few hours.",
    expectations:
      "Hair reduces progressively over the course, because only hair in its active growth phase responds at each session. Laser reduces hair rather than removing it permanently, and occasional maintenance sessions are usual.",
    combinations:
      "Where unwanted hair growth suggests a hormonal cause, medical assessment runs alongside the course. It may not be chosen for very fine or light hair, over recently tanned skin, or where a hormonal cause needs addressing first.",
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
    description:
      "Electromagnetic muscle stimulation platform for body toning.",
  },
  {
    name: "Dermapen 4",
    categories: ["rejuvenation"],
    dedicatedPage: false,
    purpose: "Medical microneedling to stimulate collagen.",
    description:
      "Medical microneedling device with adjustable depth for collagen induction.",
  },
  {
    name: "SkinPen",
    categories: ["rejuvenation"],
    dedicatedPage: false,
    purpose: "Microneedling for texture and scarring.",
    description:
      "Microneedling device for controlled collagen induction.",
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
    description:
      "Oxygenation, exfoliation and infusion facial system.",
  },
  {
    name: "GFC",
    categories: ["regenerative"],
    dedicatedPage: false,
    purpose: "Growth factor concentrate, prepared from your own blood, for hair and skin.",
    description:
      "Autologous growth factor concentrate for hair and skin regeneration.",
  },
  {
    // Added at the doctors' request. Regulatory position to be confirmed before launch.
    name: "Exosomes",
    categories: ["regenerative"],
    dedicatedPage: false,
    purpose: "A regenerative treatment, used alongside in-clinic procedures.",
    description:
      "Exosome-based regenerative treatment for skin and hair.",
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
    description:
      "Precision cryotherapy device for benign lesions.",
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
  experience: string;
  understanding: string;
  assessment: string;
  approach: string;
  selection: string;
  expectations: string;
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
    experience:
      "You may notice that your face looks more tired than you feel, that your jawline has softened, or that skin which was once firm now feels looser or crepey. Often the change is hard to pin down - only that the face looks less defined than it did.",
    understanding:
      "Facial ageing is not a single change. Collagen and elastin decline, fat compartments shift and thin, bone support gradually recedes, and the skin itself alters with sun exposure and time. How these combine is individual, which is why two people of the same age can need entirely different approaches.",
    assessment:
      "We look at the whole face before any single feature: skin thickness and quality, where laxity sits and how much there is, volume distribution, muscle activity and facial proportions. We also discuss how you would like to look, your timeline, and what you are and are not comfortable with.",
    approach:
      "The aim is refinement, not change. Most plans combine treatments that work at different depths, from the quality of the skin to the support beneath it, sequenced over time rather than delivered at once. Just as important is knowing when not to treat, and when a lighter intervention will look more natural.",
    selection:
      "Facial ageing has several causes, and they combine differently in every face. Our assessment determines which changes are contributing most before any treatment is selected.",
    expectations:
      "Improvement is gradual and natural. Most patients see the change develop over several months, and the aim is a rested, refreshed face that is still recognisably yours.",
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
    experience:
      "You may notice patches of darker skin, marks that linger after acne, spots that have appeared with sun exposure, or a complexion that looks uneven and dull despite good skincare.",
    understanding:
      "Pigmentation can come from sun exposure, hormonal influences, inflammation after acne or injury, or conditions such as melasma, which tends to be persistent and can worsen with the wrong treatment. Darker skin types in particular need a careful, measured approach, because aggressive treatment can itself trigger further pigmentation.",
    assessment:
      "We identify the type and depth of the pigmentation, its likely triggers and your skin type, and look at what has and has not worked for you before. Melasma is assessed as a long-term condition to be managed, rather than a mark to be removed.",
    approach:
      "Plans usually combine medical skincare and sun protection with carefully selected in-clinic treatment, introduced gradually. The emphasis is on control and maintenance, and on avoiding the rebound that follows treatment too aggressive for the skin.",
    selection:
      "Pigmentation has different causes and patterns. Our assessment determines what is driving it before treatment is selected.",
    expectations:
      "Pigmentation usually improves gradually over months. Some types, particularly melasma, are managed rather than cured, so maintenance is part of the plan from the start.",
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
    experience:
      "You may be dealing with breakouts that keep returning, marks that remain after spots have healed, or scarring that changes the texture of your skin and how you feel about it.",
    understanding:
      "Active acne is a medical condition influenced by hormones, oil production, bacteria and inflammation. Scarring is its aftermath, and scars vary widely, from shallow changes in texture to deeper depressions, each responding to different treatment.",
    assessment:
      "We first establish whether acne is still active, because scar treatment works best once the skin is under control. We then assess the type, depth and distribution of scarring, alongside your skin type and any tendency to pigment.",
    approach:
      "Control comes before correction. Active acne is treated medically first; scarring is then addressed in stages, often combining treatments that resurface, remodel and lift scar tissue. Progress is reviewed between sessions and the plan adjusted.",
    selection:
      "Active acne and scarring need different treatment, in a particular order. Our assessment determines whether acne is still active, and what type of scarring is present, before treatment is selected.",
    expectations:
      "Acne can usually be brought under control with medical treatment. Scar treatment aims for meaningful improvement in texture over several months - not perfectly smooth skin.",
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
    experience:
      "Your skin may look dull or tired, feel rough or dehydrated, or show enlarged pores and uneven texture - even without lines or obvious ageing.",
    understanding:
      "Dullness, enlarged pores, uneven texture and dehydration are often the first changes people notice. They reflect the health of the skin barrier, cell turnover and collagen, and they respond best to consistent, well-judged care rather than occasional intensive treatment.",
    assessment:
      "We assess hydration, oil balance, pore size, texture, sensitivity and sun damage, and review your current skincare. Often the most valuable change is simplifying a routine rather than adding to it.",
    approach:
      "Plans combine medical skincare with treatment that renews the surface and stimulates collagen beneath it, paced to suit your skin. The goal is skin that looks healthy, without looking treated.",
    selection:
      "Texture, tone, hydration and firmness each have different causes. Our assessment identifies which of them matter most for your skin before treatment is selected.",
    expectations:
      "Some improvement can be seen within days; firmer, smoother skin develops over two to three months and is maintained with a simple routine.",
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
    experience:
      "You may feel that your eyes look tired, hollow or heavy - dark circles, bags, fine lines or hooding that make you look less rested than you are.",
    understanding:
      "Hollowing, dark circles, puffiness, fine lines and hooding can each make the eyes look tired, and they often occur together. Their causes differ, from volume loss and laxity to pigmentation and fluid, so a treatment that helps one can make another more noticeable.",
    assessment:
      "We look closely at what is producing the tired appearance: skin thickness and laxity, the tear trough, pigmentation, brow position and the surrounding face. This is an area where restraint and anatomical understanding matter most.",
    approach:
      "Treatment is conservative and carefully sequenced, often addressing skin quality and laxity before any volume. Where a non-surgical option is unlikely to give a result you would be happy with, we will say so.",
    selection:
      "Tired-looking eyes can be caused by volume loss, laxity, pigmentation or fluid, and treating the wrong one can make another more noticeable. Our assessment determines what is producing the change before treatment is selected.",
    expectations:
      "Treatment around the eyes is conservative and gradual. Where a non-surgical option is unlikely to give a result you would be happy with, we will tell you so.",
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
    experience:
      "You may feel that your jawline lacks definition, that your profile looks out of balance, or that one feature draws attention in a way you would like to soften.",
    understanding:
      "Facial contour is shaped by bone structure, fat, muscle and skin. Small changes in definition along the jawline, chin, cheeks or lips can change how balanced a face appears, which is exactly why they need to be judged carefully.",
    assessment:
      "We assess facial proportions, symmetry, profile and underlying structure, and discuss what you would like to change and why. The best contouring respects the individual face rather than following a trend.",
    approach:
      "A plan may combine volume restoration, subdermal tightening and muscle refinement, used sparingly and built up gradually, so that the result reads as a refined version of you.",
    selection:
      "Facial contour depends on structure, volume, muscle and skin. Our assessment looks at your proportions as a whole before deciding what, if anything, to change.",
    expectations:
      "Contouring changes are deliberately subtle and built up gradually. The intention is balance and definition, not a different face.",
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
    experience:
      "You may be noticing more hair on your pillow or in the shower, a widening parting, thinning at the crown, patches of hair loss, or a scalp that is itchy, flaky or oily.",
    understanding:
      "Thinning and hair loss can be driven by genetics, hormones, nutrition, stress, thyroid function, scalp conditions or autoimmune causes such as alopecia areata. Scalp health, from dandruff to excess oil, also affects how hair grows.",
    assessment:
      "As dermatologists, we assess the pattern of loss, the scalp itself and your medical history, and where appropriate request investigations, before recommending treatment. Treating hair loss without understanding its cause rarely gives lasting results.",
    approach:
      "Plans typically combine medical treatment with regenerative in-clinic therapy and follow-up over months, because hair responds slowly. Progress is tracked so the plan can be refined rather than simply repeated.",
    selection:
      "Hair loss has many possible causes. Our assessment - with investigations where they are needed - determines what is driving it before treatment is selected.",
    expectations:
      "Hair responds slowly. Reduced hair fall is usually noticed first; improvement in density is assessed over three to six months.",
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
    experience:
      "You may have areas of stubborn fat that persist despite diet and exercise, skin that has become loose, or cellulite that affects how clothes fit and feel.",
    understanding:
      "Stubborn areas of fat, loose skin and cellulite often persist despite diet and exercise. They differ in cause and depth, and each responds to different forms of treatment.",
    assessment:
      "We assess the areas you are concerned about, skin laxity, fat distribution and your overall goals, and are clear about what non-surgical body treatment can and cannot achieve.",
    approach:
      "A plan may combine treatment that reduces localised fat, tightens skin and improves texture, delivered as a course and reviewed along the way. We recommend body treatment only where it is likely to make a difference you will notice.",
    selection:
      "Fat, laxity and skin texture each respond to different treatment. Our assessment determines which are contributing, and whether non-surgical treatment is likely to help, before anything is selected.",
    expectations:
      "Non-surgical body treatment offers refinement for people close to a stable weight, not weight loss. Results develop gradually over a course of treatment.",
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
    experience:
      "You may be tired of shaving, waxing or threading, dealing with ingrowing hairs, or noticing unwanted hair growth that has increased over time.",
    understanding:
      "Laser hair reduction works by targeting pigment in the hair follicle. Skin tone, hair colour and hair thickness all affect which technology is safe and effective, which matters especially for darker skin types.",
    assessment:
      "We assess your skin type, your hair and any hormonal factors that can drive unwanted hair growth, before recommending a course of treatment.",
    approach:
      "Treatment is delivered as a series of sessions timed around the hair growth cycle, using settings chosen for your skin. Where a hormonal cause is suspected, we look at that too.",
    selection:
      "Skin type, hair colour and any hormonal factors all affect which treatment is safe and effective. Our assessment considers each before a course is planned.",
    expectations:
      "Hair reduces progressively over a course of sessions. Laser reduces hair rather than removing it permanently, and occasional maintenance is usual.",
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
  addresses: string[];
  considerations: string[];
  options: string;
  expectations: string;
  downtime: string;
  combinations: string;
  maintenance: string;
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
    addresses: [
      "Loss of firmness along the jawline and neck",
      "Fine lines and early wrinkles",
      "Volume loss through the mid-face",
      "Dull, crepey or tired-looking skin",
      "Softening facial definition",
    ],
    considerations: [
      "Skin quality and thickness",
      "Where laxity and volume loss sit",
      "Facial proportions and movement",
      "Downtime and timeline",
      "How results will be maintained",
    ],
    options:
      "Depending on your anatomy and your ageing pattern, a plan may involve lifting, tightening, collagen stimulation, skin-quality improvement or contour refinement - rarely all of them, and never decided before the assessment. Technology is one of the ways these are delivered, alongside injectable treatment and medical skincare.",
    expectations:
      "Change is gradual and cumulative. Most plans are judged over two to six months rather than after a single appointment, and the aim is that you look rested and well - not treated.",
    downtime:
      "Most treatments allow a return to normal activities the same day, with temporary redness or swelling. Minimally invasive tightening, or deeper resurfacing, usually needs a few quieter days, which we plan around your calendar.",
    combinations:
      "Combinations are useful because the face ages in layers: the deeper support, the firmness of the skin and the quality of its surface change separately. Treatments are sequenced rather than stacked, so each result can be assessed before the next step is decided.",
    maintenance:
      "Collagen-led results develop over months and are maintained with periodic review, good skincare and, where appropriate, occasional maintenance treatment. Ageing continues, so the plan is revisited over time.",
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
    addresses: [
      "Melasma",
      "Sun-induced pigmentation and sun spots",
      "Post-inflammatory pigmentation after acne or injury",
      "Uneven tone and dullness",
      "Unwanted tattoos",
    ],
    considerations: [
      "The type and depth of pigmentation",
      "Skin type and pigmentation risk",
      "Hormonal and sun-related triggers",
      "Previous treatments and reactions",
      "Long-term maintenance",
    ],
    options:
      "Treatment depends on the type of pigmentation and what drives it. It may include medical skincare, topical treatment, peels, laser toning or radiofrequency microneedling - introduced gradually, and always alongside sun protection.",
    expectations:
      "Pigmentation is managed rather than cured. Improvement is gradual over months, and some types, particularly melasma, need ongoing care to hold the result.",
    downtime:
      "Medical skincare and toning usually involve none. More targeted laser treatment can cause temporary darkening or flaking for one to two weeks.",
    combinations:
      "Combinations are useful when pigmentation has more than one cause, or when skin quality needs improving alongside it. In-clinic treatment is always combined with medical skincare and sun protection, and paused if the skin becomes irritated.",
    maintenance:
      "Maintenance is planned from the beginning, because pigmentation can return with sun, heat or hormonal change. Most patients continue with a skincare routine and periodic review.",
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
    addresses: [
      "Active acne",
      "Post-acne marks and pigmentation",
      "Rolling, boxcar and ice-pick scarring",
      "Textural change and enlarged pores",
      "Oily, congested skin",
    ],
    considerations: [
      "Whether acne is still active",
      "Scar type, depth and distribution",
      "Tendency to post-inflammatory pigmentation",
      "Downtime you can accommodate",
      "Skincare and maintenance",
    ],
    options:
      "Active acne is treated medically first. Scar treatment may then include microneedling, radiofrequency microneedling, laser resurfacing, peels or dermal fillers for selected scars - matched to the type of scarring rather than applied uniformly.",
    expectations:
      "Scar treatment aims for meaningful improvement in texture and evenness, not perfectly smooth skin. Progress is staged over several months and reviewed between sessions.",
    downtime:
      "Medical treatment involves none. Microneedling and radiofrequency microneedling cause redness for one to three days; laser resurfacing may need up to a week.",
    combinations:
      "Combinations are useful because most patients have more than one type of scar, and each responds to a different treatment. They are staged and spaced to allow the skin to recover between sessions.",
    maintenance:
      "Once scarring has improved, the focus is on keeping acne controlled so that new scarring does not form, with skincare and review.",
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
    addresses: [
      "Dullness and uneven tone",
      "Rough texture and enlarged pores",
      "Dehydration and a compromised barrier",
      "Early loss of elasticity",
      "Congestion and blemishes",
    ],
    considerations: [
      "Barrier health and sensitivity",
      "Hydration and oil balance",
      "Texture, pores and tone",
      "Your current skincare",
      "Sun exposure and lifestyle",
    ],
    options:
      "Plans usually combine medical skincare with in-clinic treatment such as medical facials, peels, microneedling, laser rejuvenation or regenerative treatment - paced to what your skin tolerates.",
    expectations:
      "Some improvement in brightness and texture can be seen within days; collagen-led changes in firmness and pores develop over two to three months.",
    downtime:
      "Most treatments involve little or none. Deeper resurfacing, where it is appropriate, needs a few quieter days.",
    combinations:
      "Combinations are useful because texture, tone, hydration and firmness respond to different treatments. Medical skincare forms the foundation, and in-clinic treatment is added to it rather than replacing it.",
    maintenance:
      "Skin quality is maintained rather than completed. A simple routine and periodic treatment hold the improvement over time.",
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
    addresses: [
      "Hair thinning and increased hair fall",
      "Patterned hair loss",
      "Patchy loss, including alopecia areata",
      "Scalp conditions such as dandruff",
      "Hair quality and breakage",
    ],
    considerations: [
      "The pattern and cause of hair loss",
      "Scalp health",
      "Medical history and investigations",
      "Nutritional and hormonal factors",
      "Realistic timelines",
    ],
    options:
      "Treatment is directed at the cause, and may include medical treatment, regenerative therapy such as growth factor concentrate, and scalp care. Investigations are requested where they will change the plan.",
    expectations:
      "Hair responds slowly. The first change is usually reduced hair fall; improvement in density is assessed at three to six months, with photography.",
    downtime:
      "Regenerative scalp treatment usually allows normal activity the same day, with mild tenderness for a day or so.",
    combinations:
      "Combinations are useful because medical treatment addresses the cause while in-clinic therapy supports the follicles. Both are reviewed together as the hair responds.",
    maintenance:
      "Many causes of hair loss are ongoing, so treatment continues in order to maintain the response, with periodic review.",
    modalities: ["Medical Treatment", "PRP & GFC"],
    concerns: ["Hair & Scalp"],
    technologies: ["GFC"],
  },
  {
    title: "Facial Contouring",
    summary: "Definition and balance, restored with a light and precise hand.",
    philosophy:
      "Contouring is about proportion. We make small, considered changes that bring features into balance, and would rather do slightly less than risk a result that looks overdone.",
    addresses: [
      "Jawline definition",
      "Chin projection and profile balance",
      "Cheek contour",
      "Lip proportion",
      "Fullness beneath the chin",
    ],
    considerations: [
      "Facial proportions and profile",
      "Underlying bone and fat structure",
      "Muscle activity",
      "Symmetry",
      "What you want to change, and why",
    ],
    options:
      "Depending on your proportions, a plan may involve volume restoration, refinement of muscle activity, or subdermal tightening such as Endolift - used sparingly and built up gradually.",
    expectations:
      "Changes are deliberately subtle and made over more than one visit. The intention is balance, not a change to the features you are recognised by.",
    downtime:
      "Injectable treatment may cause swelling or bruising for a few days. Subdermal tightening involves a quieter week.",
    combinations:
      "Combinations are useful because definition depends on skin quality and laxity as well as volume. We assess all three before deciding what, if anything, to change.",
    maintenance:
      "Injectable results last months rather than years and are maintained with review; tightening develops and holds over a longer period.",
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
    addresses: [
      "Localised fat that persists despite diet and exercise",
      "Loose or crepey skin on the body",
      "Cellulite",
      "Muscle tone",
      "Skin texture on the body",
    ],
    considerations: [
      "Areas of concern and fat distribution",
      "Skin laxity and texture",
      "Lifestyle and weight stability",
      "Expected timelines",
      "Whether hair reduction is also wanted",
    ],
    options:
      "Depending on the area and the concern, a plan may involve localised fat reduction, skin tightening or muscle toning, delivered as a course.",
    expectations:
      "Non-surgical body treatment suits people close to a stable weight who are looking for refinement, not weight loss. Results are gradual and best judged after the full course.",
    downtime:
      "Most body treatments allow normal activity straight away, with temporary redness, tenderness or firmness in the treated area.",
    combinations:
      "Combinations are useful when fat, laxity and tone all contribute to the concern. The order is decided at assessment.",
    maintenance:
      "Results are maintained with a stable weight and lifestyle, and occasional maintenance sessions where appropriate.",
    modalities: ["Body Contouring", "Radiofrequency Skin Tightening", "Laser Hair Reduction"],
    concerns: ["Body Contouring"],
    technologies: ["Venus Bliss Max", "Ultraformer MPT", "Endolift X", "Fotona StarFormer", "GentleYAG"],
  },
  {
    title: "Hair Removal",
    summary: "Long-term reduction of unwanted hair, with every setting chosen for your skin.",
    philosophy:
      "Laser hair reduction is a course of treatment rather than a single appointment, and the settings matter more than the platform. We select the wavelength and parameters for your skin type and hair, and where unwanted hair growth suggests a hormonal cause, we look into that too.",
    addresses: [
      "Unwanted facial hair",
      "Underarms, arms and legs",
      "Body areas including the back and chest",
      "Ingrowing hairs and folliculitis",
      "Hair growth with a hormonal cause",
    ],
    considerations: [
      "Skin type and hair colour",
      "The areas you would like treated",
      "Hormonal factors behind unwanted hair growth",
      "Previous hair removal and any reactions",
      "Timing around the hair growth cycle",
    ],
    options:
      "Laser hair reduction is delivered as a course, with the wavelength and settings chosen for your skin and hair. Where hormonal factors are suspected, medical assessment runs alongside.",
    expectations:
      "Laser reduces hair rather than removing it permanently. Hair becomes finer and sparser over the course, because only hair in its active growth phase responds at each session.",
    downtime:
      "None in most cases. Redness and slight swelling around the follicles settles within hours.",
    combinations:
      "Combinations are rarely needed, except where a hormonal cause of unwanted hair is treated medically alongside the laser course.",
    maintenance:
      "Occasional maintenance sessions are usual, particularly where hormonal factors are involved.",
    modalities: ["Laser Hair Reduction", "Medical Treatment"],
    concerns: ["Hair Removal"],
    technologies: ["GentleYAG", "Fotona SP Dynamis Max"],
  },
];

/* ------------------------------------------------------------------ */
/* The Dr Bhagat's Signature — the doctors' own copy                   */
/* ------------------------------------------------------------------ */
/**
 * The signature programmes: Dr Bhagat's clinical philosophies, never packages.
 * Each makes three things explicit - what is assessed, how treatment is
 * personalised, and how it is sequenced through the same six stages: Assess,
 * Prioritise, Treat, Reassess, Refine, Maintain. No technologies are listed and
 * no prices appear.
 *
 * The tagline, description and closing line are the doctors' own words; the
 * structure beneath them is drafted for the doctors' sign-off.
 */
export type SeedProgramme = {
  title: string;
  shortTitle: string;
  slug: string;
  tagline: string;
  body: string[];
  closing?: string;
  forWhom: string;
  assessed: string[];
  personalisation: string;
  sequence: { title: string; description: string }[];
  objective: string;
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
    forWhom:
      "Patients noticing a softening jawline, a loss of definition, or skin that no longer feels firm, who would like a refreshed result rather than an obviously treated one.",
    assessed: [
      "The degree and pattern of laxity",
      "Facial proportions",
      "Skin quality",
      "Tissue descent",
      "Volume and fat distribution",
      "The degree of correction you would like",
    ],
    personalisation:
      "We determine which combination of lifting, tightening, collagen stimulation and refinement is appropriate for your face - and in what order. Two patients with the same concern rarely receive the same plan.",
    sequence: [
      {
        title:
          "Assess",
        description:
          "A full facial assessment, with photography, to understand what has changed and why.",
      },
      {
        title:
          "Prioritise",
        description:
          "Deciding which change matters most to your appearance, and addressing that first.",
      },
      {
        title:
          "Treat",
        description:
          "The first stage of treatment, usually directed at the deeper support or the firmness of the skin.",
      },
      {
        title:
          "Reassess",
        description:
          "Reviewing how the face has responded once the tissue has had time to remodel.",
      },
      {
        title:
          "Refine",
        description:
          "Where appropriate, further treatment to refine skin quality, contour or volume.",
      },
      {
        title:
          "Maintain",
        description:
          "A plan to maintain the result as the face continues to age.",
      },
    ],
    objective:
      "Definition and freshness restored, while the face remains recognisably your own.",
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
    closing:
      "Healthy-looking skin first. Aesthetic refinement follows.",
    forWhom:
      "Patients with dull, congested or uneven skin, and anyone who wants a strong foundation before or alongside other treatment.",
    assessed: [
      "Barrier health and sensitivity",
      "Texture, pores and tone",
      "Hydration and oil balance",
      "Pigmentation and sun damage",
      "Firmness and elasticity",
      "Your current skincare",
    ],
    personalisation:
      "We determine which aspects of skin quality matter most for you - texture, tone, hydration or firmness - and build treatment around them, at a pace your skin tolerates.",
    sequence: [
      {
        title:
          "Assess",
        description:
          "An assessment of your skin, your routine and your lifestyle.",
      },
      {
        title:
          "Prioritise",
        description:
          "Identifying whether the barrier, texture, tone or firmness needs attention first.",
      },
      {
        title:
          "Treat",
        description:
          "Medical skincare to prepare the skin, then in-clinic treatment introduced gradually.",
      },
      {
        title:
          "Reassess",
        description:
          "Reviewing how the skin has responded to the first treatments.",
      },
      {
        title:
          "Refine",
        description:
          "Adjusting treatment and skincare to the next priority.",
      },
      {
        title:
          "Maintain",
        description:
          "A simple routine and periodic treatment to hold the improvement.",
      },
    ],
    objective:
      "Skin that looks healthy and even, and stays that way.",
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
    forWhom:
      "Patients with melasma, sun damage, post-acne marks or uneven tone, particularly where previous treatment gave only temporary improvement.",
    assessed: [
      "The type and depth of pigmentation",
      "Its likely triggers - sun, heat, hormones or inflammation",
      "Your skin type and tendency to pigment",
      "How previous treatment behaved",
      "Daily sun exposure",
    ],
    personalisation:
      "We determine what is driving your pigmentation before any treatment is chosen, then select a combination of medical skincare, in-clinic treatment and technology that controls it without provoking more.",
    sequence: [
      {
        title:
          "Assess",
        description:
          "Diagnosing the type of pigmentation present, since melasma and post-inflammatory pigmentation behave differently.",
      },
      {
        title:
          "Prioritise",
        description:
          "Deciding whether calming the skin, clearing pigment or controlling a trigger comes first.",
      },
      {
        title:
          "Treat",
        description:
          "Stabilising the skin with medical care, then introducing in-clinic treatment gradually.",
      },
      {
        title:
          "Reassess",
        description:
          "Reviewing the response, and whether the skin is tolerating treatment.",
      },
      {
        title:
          "Refine",
        description:
          "Adjusting the intensity or approach as pigmentation clears.",
      },
      {
        title:
          "Maintain",
        description:
          "A long-term plan, because pigmentation can return.",
      },
    ],
    objective:
      "A clearer, more even complexion, and a plan that keeps it that way.",
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
    forWhom:
      "Patients with textural or depressed scarring and post-acne marks, including those whose acne is still active.",
    assessed: [
      "Whether acne is still active",
      "Scar type, depth and distribution",
      "Skin type and tendency to pigment",
      "Skin quality around the scars",
      "Previous treatment and how the skin responded",
      "The recovery time you can accommodate",
    ],
    personalisation:
      "We match each type of scarring to the treatment most likely to improve it, and decide how to combine and space those treatments for your skin.",
    sequence: [
      {
        title:
          "Assess",
        description:
          "Establishing whether acne is active, and mapping the types of scarring present.",
      },
      {
        title:
          "Prioritise",
        description:
          "Controlling active acne first, then deciding which scars to address first.",
      },
      {
        title:
          "Treat",
        description:
          "Staged treatment to resurface, remodel or lift scar tissue.",
      },
      {
        title:
          "Reassess",
        description:
          "Comparing progress with the starting photographs.",
      },
      {
        title:
          "Refine",
        description:
          "Adjusting the combination as the texture improves.",
      },
      {
        title:
          "Maintain",
        description:
          "Keeping acne controlled so new scarring does not form.",
      },
    ],
    objective:
      "Meaningful improvement in texture and evenness, and skin you feel comfortable in.",
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
    forWhom:
      "Patients with thinning, increased hair fall, patterned or patchy loss, or scalp conditions affecting the hair.",
    assessed: [
      "The pattern and duration of hair loss",
      "The condition of the scalp",
      "Medical history, including thyroid and nutritional factors",
      "Investigations, where they will change the plan",
      "Family history",
    ],
    personalisation:
      "We determine the cause of your hair loss before recommending treatment, then combine medical treatment, regenerative therapy and scalp care according to what that cause requires.",
    sequence: [
      {
        title:
          "Assess",
        description:
          "Examining the scalp and the pattern of loss, with investigations where appropriate.",
      },
      {
        title:
          "Prioritise",
        description:
          "Treating the underlying cause first, which protects the hair you still have.",
      },
      {
        title:
          "Treat",
        description:
          "Medical treatment, with regenerative therapy delivered as a course where helpful.",
      },
      {
        title:
          "Reassess",
        description:
          "Reviewing the response with photography at three to six months.",
      },
      {
        title:
          "Refine",
        description:
          "Adjusting the plan to how the hair has responded.",
      },
      {
        title:
          "Maintain",
        description:
          "Continuing treatment to hold the response.",
      },
    ],
    objective:
      "Denser, healthier hair, and a plan that maintains it.",
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
  {
    title: "Why every plan begins with a consultation",
    slug: "why-every-plan-begins-with-a-consultation",
    category: "approach",
    excerpt:
      "What happens during an assessment, and why it matters more than the treatment that follows.",
    publishedAt: "2026-09-01T09:00:00.000Z",
    paragraphs: [
      "The consultation is the most important appointment in any course of treatment. It is where a concern is properly understood, and where the difference between a good result and a disappointing one is usually decided.",
      "An assessment looks beyond the feature a patient is concerned about. With ageing, for instance, we consider skin quality, laxity, volume and proportion together, because treating one in isolation can make another more noticeable. With pigmentation, identifying the type and its triggers matters more than the strength of the treatment.",
      "We also want to understand the person: their medical history, what they have tried before, the downtime they can accommodate, and how they would like to look. A plan that suits someone's skin but not their life is unlikely to succeed.",
      "From there, we build a personalised plan, explain the reasoning behind it, and agree how progress will be reviewed. Treatment follows, and so does follow-up, because most concerns are best managed over time rather than in a single visit.",
      "Assess, diagnose, personalise, treat, refine. It is a simple sequence, and every part of it matters.",
    ],
  },
];

