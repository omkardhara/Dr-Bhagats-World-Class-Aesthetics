/**
 * The doctors' own pages. Titles and descriptions are the approved SEO copy
 * (drbhagats_seo_meta_tags.xlsx, "Meta Tags" sheet), reproduced as written.
 */
export type DoctorPage = {
  /** Full title tag, used as written, without the site-wide suffix. */
  title: string;
  description: string;
  /** The page's h1. */
  heading: string;
  /** Descriptive alt text for the portrait. */
  portraitAlt: string;
};

export const DOCTOR_PAGES: Record<string, DoctorPage> = {
  "dr-priyam-bhagat": {
    title: "Dr Priyam Bhagat | Dermatologist in Mumbai",
    description:
      "MD Dermatology (KEM Hospital), gold medallist, University of Mumbai. Aesthetic dermatology, lasers and skin rejuvenation in Goregaon East and Vashi.",
    heading: "Dr Priyam Bhagat, Consultant Dermatologist",
    portraitAlt: "Dr Priyam Bhagat, Consultant Dermatologist in Mumbai",
  },
  "dr-kamlesh-bhagat": {
    title: "Dr Kamlesh Bhagat | Dermatologist & Dermatosurgeon",
    description:
      "MD Dermatology (KEM Hospital). Dermatosurgery, clinical diagnosis and aesthetic dermatology in Mumbai and Navi Mumbai.",
    heading: "Dr Kamlesh Bhagat, Consultant Dermatologist & Dermatosurgeon",
    portraitAlt: "Dr Kamlesh Bhagat, Consultant Dermatologist and Dermatosurgeon in Mumbai",
  },
};

export const DOCTOR_SLUGS = Object.keys(DOCTOR_PAGES);

export function doctorHref(slug: string): string {
  return `/doctors/${slug}`;
}

export function doctorPortraitAlt(slug: string, name: string): string {
  return DOCTOR_PAGES[slug]?.portraitAlt ?? `${name}, Consultant Dermatologist in Mumbai`;
}
