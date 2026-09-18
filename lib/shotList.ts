import { draftMode } from "next/headers";

/**
 * The photography shot list.
 *
 * Every image slot on the site carries a brief: what the photograph should
 * show, and how. Publicly an unset image still renders nothing - the layouts
 * are designed to read as complete without imagery. With the shot-list preview
 * switched on (/shot-list), the same slots render as labelled frames, so the
 * doctors and the photographer can see where each picture sits and plan the
 * shoot around it. The preview uses Next.js Draft Mode, so only the browser
 * that switched it on ever sees the frames.
 *
 * Nothing here is ever a patient or a result. People are the doctors, the team
 * or models with a signed release; before-and-after cases are clinical
 * photographs taken separately, with written consent.
 */

export type Brief = { title: string; direction: string };

export async function shotListEnabled(): Promise<boolean> {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    return false;
  }
}

export const FORMAT: Record<string, string> = {
  hero: "Full-bleed landscape, 16:9 or wider",
  "21/9": "21:9 wide landscape",
  "16/9": "16:9 landscape",
  "4/3": "4:3 landscape",
  "3/4": "3:4 portrait",
  "1/1": "Square",
};

/** The art direction every photograph shares. */
export const ART_DIRECTION = [
  "Natural daylight, or soft light that looks like it. No hard flash, no coloured gels.",
  "The brand palette in the frame: bone, warm white, black and champagne. Avoid bright colours and clutter.",
  "Editorial and unhurried: people caught mid-conversation or at ease, not smiling at the camera.",
  "Real skin. No heavy retouching, no smoothing filters.",
  "Models sign a release; no patient is photographed for the shoot. Before-and-after cases are clinical photographs, taken separately with written consent.",
  "Shoot every set-up both wide and tight, and landscape and portrait where possible, so each slot has options.",
];

export const SITE_SHOTS = {
  homeHero: {
    title: "The clinic, at its most atmospheric",
    direction:
      "The reception or a corridor in soft, low light - or a doctor seen at a distance. Keep the lower left deep and dark: the headline sits over it.",
  },
  homePhilosophy: {
    title: "A consultation in progress",
    direction:
      "Doctor and model in conversation across a desk, seen over the shoulder: hands, notes, a mirror. The feeling of listening, not selling.",
  },
  homeClinic: {
    title: "A treatment room, prepared",
    direction: "The bed made with fresh linen, a device at rest, morning light. No people.",
  },
  aboutDoctors: {
    title: "Both doctors together",
    direction:
      "Wide, in the clinic: walking or in conversation with each other rather than posed at the camera. Leave quiet space on one side.",
  },
  team: {
    title: "Team portrait",
    direction:
      "Each team member in the same light, background and framing as the doctors' portraits, so the set reads as one.",
  },
} satisfies Record<string, Brief>;

export const DOCTOR_SHOTS: Record<string, Brief> = {
  "dr-priyam-bhagat": {
    title: "Dr Priyam Bhagat - portrait",
    direction:
      "Environmental portrait in the clinic, three-quarter length, looking to camera with a natural expression. Same light and background as Dr Kamlesh's, so the two sit as a pair.",
  },
  "dr-kamlesh-bhagat": {
    title: "Dr Kamlesh V. Bhagat - portrait",
    direction:
      "Environmental portrait in the clinic, three-quarter length, looking to camera with a natural expression. Same light and background as Dr Priyam's, so the two sit as a pair.",
  },
};

export const CONCERN_SHOTS: Record<string, Brief> = {
  "facial-ageing": {
    title: "Facial ageing - the jawline in profile",
    direction: "A model in her forties or fifties in profile, soft side light along the jaw and neck. Rested, unretouched skin.",
  },
  pigmentation: {
    title: "Pigmentation - skin in daylight",
    direction: "A close crop of cheek and temple in gentle window light, or sunscreen being applied. Even and calm, never a 'before'.",
  },
  acne: {
    title: "Acne - the doctor examining skin",
    direction: "A doctor looking closely at a young adult model's skin with a dermatoscope or magnifying lamp. Focus on the care, not the condition.",
  },
  "skin-quality": {
    title: "Skin quality - texture and light",
    direction: "Macro skin texture with a soft sheen of hydration, or fingertips pressing a serum into the skin.",
  },
  eyes: {
    title: "Eyes - the periorbital area",
    direction: "A close crop of a mature model's eye area, eyes gently closed, in soft even light.",
  },
  "facial-contouring": {
    title: "Facial contouring - proportion and shadow",
    direction: "A profile against a dark ground, lit to show the line of chin, jaw and cheekbone.",
  },
  hair: {
    title: "Hair - the scalp, examined",
    direction: "A doctor examining a model's parting with a trichoscope, or hair falling naturally in window light.",
  },
  "body-contouring": {
    title: "Body - sculptural form",
    direction: "Shoulder, waist or back in soft, sculptural light. Tasteful, draped, no face.",
  },
  "hair-removal": {
    title: "Hair removal - smooth skin",
    direction: "An arm or leg in clean light, or the laser handpiece in use with protective eyewear visible.",
  },
};

export const APPROACH_SHOTS: Record<string, Brief> = {
  "facial-rejuvenation": {
    title: "Facial Rejuvenation - looking rested",
    direction: "A mature model at ease, three-quarter face, soft light. Rested and well, not 'done'.",
  },
  "facial-contouring": {
    title: "Facial Contouring - the assessment",
    direction: "A doctor studying a model's profile, a hand lightly at the jaw. Proportion being considered, not changed.",
  },
  "skin-quality": {
    title: "Skin Quality - skin at its best",
    direction: "Luminous skin in close-up, or a medical facial in progress with the model at rest.",
  },
  pigmentation: {
    title: "Pigmentation - patience and protection",
    direction: "A model in dappled shade with a wide-brimmed hat, or the clinic's standardised photography set-up.",
  },
  "acne-and-scarring": {
    title: "Acne & Scarring - control, then repair",
    direction: "A doctor examining skin under a magnifying lamp, the model calm and the light clinical but warm.",
  },
  "hair-and-scalp": {
    title: "Hair & Scalp - treatment over time",
    direction: "A scalp treatment in progress: gloved hands, a parted section of hair. No face needed.",
  },
  "hair-removal": {
    title: "Hair Removal - the course of treatment",
    direction: "The laser handpiece gliding over a leg, the cooling tip visible, protective eyewear in frame.",
  },
  body: {
    title: "Body - refinement",
    direction: "A body treatment in progress, the model draped and at ease. No face.",
  },
};

export function technologyShot(name: string): Brief {
  return {
    title: `${name} - in the treatment room`,
    direction: `The ${name} platform styled in a treatment room, lit as part of a medical environment rather than a showroom. Also a close detail of the handpiece.`,
  };
}

export const PROGRAMME_SHOTS: Record<string, Brief> = {
  "signature-lift": {
    title: "The Signature Lift",
    direction: "The doctor's hands at a mature model's jawline during assessment. Precise, gentle, unhurried.",
  },
  "skin-quality-programme": {
    title: "The Signature Skin Quality Programme",
    direction: "Skin at rest after treatment, dewy and calm, in morning light.",
  },
  "pigmentation-programme": {
    title: "The Signature Pigmentation Programme",
    direction: "A still life: sunscreen, a hat, soft shade. Protection as a daily ritual.",
  },
  "acne-scar-programme": {
    title: "The Signature Acne Scar Programme",
    direction: "Doctor and model reviewing a skin-analysis image on screen together.",
  },
  "hair-and-scalp-programme": {
    title: "The Signature Hair & Scalp Programme",
    direction: "Hair in natural movement and light, seen from behind or in profile.",
  },
};

export const ARTICLE_SHOTS: Record<string, Brief> = {
  "architecture-of-facial-ageing": {
    title: "Journal - The architecture of facial ageing",
    direction: "A sculptural profile study in raking light, showing the structure beneath the skin.",
  },
  "tightening-lifting-and-skin-quality": {
    title: "Journal - Tightening, lifting and skin quality",
    direction: "Three layers in one frame: texture, contour, light. A close, editorial face crop.",
  },
  "pigmentation-is-not-one-problem": {
    title: "Journal - Pigmentation is not one problem",
    direction: "Skin in natural light with gentle variation of tone; calm and matter-of-fact.",
  },
  "when-a-laser-is-the-right-answer": {
    title: "Journal - When a laser is the right answer",
    direction: "A laser platform at rest, the doctor's hand on the handpiece, deciding.",
  },
  "refreshed-not-done": {
    title: "Journal - Refreshed, not done",
    direction: "A model laughing naturally, mid-conversation. Well, not treated.",
  },
  "knowing-when-not-to-treat": {
    title: "Journal - Knowing when not to treat",
    direction: "A consultation moment: the doctor listening, pen down.",
  },
  "skin-quality-the-quiet-foundation": {
    title: "Journal - Skin quality, the quiet foundation",
    direction: "A bathroom-shelf still life of a simple skincare routine in soft daylight.",
  },
  "why-every-plan-begins-with-a-consultation": {
    title: "Journal - Why every plan begins with a consultation",
    direction: "The consultation room: two chairs, a desk, a mirror, a notebook. Waiting, unhurried.",
  },
};

/** Three frames per clinic space: the first runs wide, the next two in a pair. */
export const SPACE_SHOTS: Record<string, [Brief, Brief, Brief]> = {
  Architecture: [
    { title: "Architecture - the entrance", direction: "The facade and entrance of each clinic, Goregaon and Vashi, in the best light of the day." },
    { title: "Architecture - arrival", direction: "The approach and the door, a sense of discretion." },
    { title: "Architecture - interior lines", direction: "A corridor or a detail of the interior architecture." },
  ],
  Reception: [
    { title: "Reception - the welcome", direction: "The reception desk and waiting area, wide, with no one waiting." },
    { title: "Reception - seating", direction: "A chair, a side table, flowers or books." },
    { title: "Reception - at work", direction: "A team member greeting a model at the desk, seen from behind." },
  ],
  "Consultation rooms": [
    { title: "Consultation room - wide", direction: "The room as a whole: desk, chairs, mirror, natural light." },
    { title: "Consultation room - in conversation", direction: "Doctor and model talking; faces turned to each other, not to camera." },
    { title: "Consultation room - the assessment", direction: "Skin analysis, a dermatoscope, notes being made." },
  ],
  "Treatment rooms": [
    { title: "Treatment room - prepared", direction: "The room ready for a patient: bed, linen, device at rest." },
    { title: "Treatment room - in use", direction: "A treatment in progress on a model, gloved hands and eyewear." },
    { title: "Treatment room - comfort", direction: "A blanket, a pillow, dimmed light." },
  ],
  Details: [
    { title: "Details - texture", direction: "Materials and finishes: stone, fabric, the brand's champagne tones." },
    { title: "Details - instruments", direction: "Instruments laid out with precision on a tray." },
    { title: "Details - the brand", direction: "Signage, stationery or the monogram, subtly placed." },
  ],
  Technology: [
    { title: "Technology - the platforms", direction: "Two or three platforms together, integrated into the room." },
    { title: "Technology - handpiece", direction: "A close detail of a handpiece or applicator." },
    { title: "Technology - in the doctor's hands", direction: "The doctor setting parameters on a screen." },
  ],
};
