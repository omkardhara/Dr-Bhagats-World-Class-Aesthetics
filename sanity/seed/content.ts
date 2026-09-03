/**
 * Seed content for the concern, doctor and testimonial types.
 *
 * Concerns and doctor credentials are carried over from the retired
 * finesseclinic.com site, so they reflect the practice rather than invention.
 * Concern summaries are placeholder and need clinical review before launch.
 *
 * Testimonials are real Google reviews the clinic already published on its
 * previous site. Verify they should carry over to the new brand.
 */

export type SeedConcern = {
  title: string;
  category: "skin" | "face" | "hair" | "body";
  /** Slugs of treatments (from seedSanity.ts) that address this concern. */
  treatments?: string[];
};

/** All 30 concerns from the previous site's navigation. */
export const CONCERNS: SeedConcern[] = [
  // Skin
  { title: "Acne", category: "skin", treatments: ["Acne & Scar Revision", "Medical Facials & Deep Cleansing"] },
  { title: "Acne Scars", category: "skin", treatments: ["Acne & Scar Revision", "Laser Skin Resurfacing"] },
  { title: "Aging", category: "skin", treatments: ["Skin Tightening & Body Contouring", "Bio-Remodelling & Skin Boosters"] },
  { title: "Dry Skin", category: "skin", treatments: ["Medical Facials & Deep Cleansing"] },
  { title: "Psoriasis", category: "skin" },
  { title: "Dermatitis", category: "skin" },
  { title: "Vitiligo", category: "skin" },
  { title: "Eye Bags", category: "skin", treatments: ["Skin Tightening & Body Contouring"] },
  { title: "Sun Damage", category: "skin", treatments: ["Pigmentation & Tattoo Clearance", "Laser Skin Resurfacing"] },
  { title: "Warts", category: "skin", treatments: ["Lesion & Blemish Removal"] },

  // Face
  { title: "Eyebrow", category: "face", treatments: ["Laser Hair Reduction"] },
  { title: "Lips", category: "face", treatments: ["Volume & Contour Restoration"] },
  { title: "Dark Circles", category: "face", treatments: ["Bio-Remodelling & Skin Boosters"] },
  { title: "Melasma", category: "face", treatments: ["Pigmentation & Tattoo Clearance"] },
  { title: "Hyperpigmentation", category: "face", treatments: ["Pigmentation & Tattoo Clearance"] },

  // Hair
  { title: "Hair Loss", category: "hair", treatments: ["Hair Restoration Therapy"] },
  { title: "Dandruff", category: "hair" },
  { title: "Alopecia Areata", category: "hair", treatments: ["Hair Restoration Therapy"] },
  { title: "Dry Hair", category: "hair" },
  { title: "Greasy Hair", category: "hair" },
  { title: "Over Damaged Hair", category: "hair" },
  { title: "Limp Hair", category: "hair" },

  // Body
  { title: "Full Body Contouring", category: "body", treatments: ["Skin Tightening & Body Contouring"] },
  { title: "Under Arm Fat", category: "body", treatments: ["Skin Tightening & Body Contouring"] },
  { title: "Chin Fat", category: "body", treatments: ["Thread & Subdermal Lifting"] },
  { title: "Belly Fat", category: "body", treatments: ["Skin Tightening & Body Contouring"] },
  { title: "Body Contouring", category: "body", treatments: ["Skin Tightening & Body Contouring"] },
  { title: "Thigh Fat", category: "body", treatments: ["Skin Tightening & Body Contouring"] },
  { title: "Cellulite", category: "body", treatments: ["Skin Tightening & Body Contouring"] },
  { title: "Tattoo Removal", category: "body", treatments: ["Pigmentation & Tattoo Clearance"] },
];

export type SeedDoctor = {
  name: string;
  role: string;
  qualifications: string[];
  bio: string;
  order: number;
};

export const DOCTORS: SeedDoctor[] = [
  {
    name: "Dr. Kamlesh Bhagat",
    role: "Consultant Dermatologist and Aesthetic Physician",
    qualifications: [
      "Seth GS Medical College and King Edward Memorial Hospital, Mumbai",
      "American Academy of Aesthetic Medicine",
      "University of Miami",
    ],
    bio: "Placeholder biography. Dr. Kamlesh Bhagat trained at Seth GS Medical College and King Edward Memorial Hospital in Mumbai, and pursued further training with the American Academy of Aesthetic Medicine and the University of Miami. Replace with the practice's own account.",
    order: 0,
  },
  {
    name: "Dr. Priyam Bhagat",
    role: "Consultant Dermatologist and Aesthetic Physician",
    qualifications: [
      "Seth GS Medical College and King Edward Memorial Hospital, Mumbai",
      "American Academy of Aesthetic Medicine",
      "University of Miami",
    ],
    bio: "Placeholder biography. Dr. Priyam Bhagat trained at Seth GS Medical College and King Edward Memorial Hospital in Mumbai, and pursued further training with the American Academy of Aesthetic Medicine and the University of Miami. Replace with the practice's own account.",
    order: 1,
  },
];

export type SeedTestimonial = {
  author: string;
  quote: string;
  date: string;
  featured?: boolean;
};

/** Carried over from the previous site. Verify before publishing. */
export const TESTIMONIALS: SeedTestimonial[] = [
  {
    author: "Anuja Rane",
    quote:
      "I have undergone most of the procedures related to skin and hair. Accurate diagnosis and expertise have helped me feel confident and happy. The entire staff is compassionate, professional and considerate, and the clinic is well equipped and spotlessly clean.",
    date: "2023-02-02",
    featured: true,
  },
  {
    author: "Kalyani Chetan Paranjpe",
    quote:
      "I have been with the clinic for over five years and love the way they handle their patients. Unlike others, they do not rush; they hear you out and prescribe only what is necessary. They are prompt on the phone as well, easing patients during urgency.",
    date: "2023-06-02",
    featured: true,
  },
  {
    author: "Prasad Parulekar",
    quote:
      "Treatment helped me get rid of dark spots and pigmentation. Always energetic and listens to patients carefully. They have the latest laser equipment and a large facility, and getting appointments is easy through the front desk.",
    date: "2023-02-02",
    featured: true,
  },
  {
    author: "Neha Kaikini",
    quote:
      "I had bad hair fall. Since starting treatment here I found it so effective that it reduced to almost nil. The staff is very good and the ambience is excellent.",
    date: "2023-08-02",
  },
  {
    author: "Niket Rawkar",
    quote:
      "I visited for a pigmentation problem and it cleared within a month. Both doctors are humble and give enough time to listen and resolve queries during consultation.",
    date: "2022-12-02",
  },
  {
    author: "Milind Dhonde",
    quote:
      "Brilliant skin and hair solutions. Years of experience and expertise in dermatology, while also being empathetic with all patients. If you are looking for a result-oriented clinic, this is the best place.",
    date: "2023-01-02",
  },
];
