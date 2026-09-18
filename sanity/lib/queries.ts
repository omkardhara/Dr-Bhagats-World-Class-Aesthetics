import { defineQuery } from "next-sanity";

/* Site ---------------------------------------------------------------- */

export const siteSettingsQuery = defineQuery(`
  *[_id == "siteSettings"][0]{ heroImage, philosophyImage, doctorsImage, clinicImage, consultationImage }
`);

/* Home ---------------------------------------------------------------- */

export const homeQuery = defineQuery(`{
  "settings": *[_id == "siteSettings"][0]{ heroImage, philosophyImage, clinicImage },
  "doctors": *[_type == "doctor"] | order(order asc){
    _id, name, degree, institution, credential, role, specialty, position, shortBio, portrait,
    "slug": slug.current
  },
  "concerns": *[_type == "concern"] | order(order asc){
    _id, title, summary, "slug": slug.current
  },
  "programmes": *[_type == "signatureProgramme"] | order(order asc){
    _id, title, shortTitle, tagline, "slug": slug.current
  },
  "resultCategories": array::unique(
    *[_type == "result" && consentConfirmed == true].category +
    *[_type == "testimonial" && defined(category)].category
  ),
  "testimonials": *[_type == "testimonial" && featured == true]{ _id, author, quote, category },
  "articles": *[_type == "journalArticle"] | order(publishedAt desc)[0...3]{
    _id, title, excerpt, category, publishedAt, "slug": slug.current
  }
}`);

/* Concerns ------------------------------------------------------------ */

export const concernsQuery = defineQuery(`
  *[_type == "concern"] | order(order asc){
    _id, title, summary, relatedConditions, "slug": slug.current
  }
`);

export const concernBySlugQuery = defineQuery(`
  *[_type == "concern" && slug.current == $slug][0]{
    _id, title, summary, experience, understanding, assessment, approach, selection, expectations,
    relatedConditions, resultCategory, image, faqs[]{ question, answer },
    "slug": slug.current,
    "programmes": programmes[]->{ _id, title, tagline, "slug": slug.current },
    "approaches": approaches[]->{ _id, title, summary, "slug": slug.current },
    "technologies": technologies[]->{ _id, name, purpose, dedicatedPage, "slug": slug.current },
    "articles": *[_type == "journalArticle" && concern._ref == ^._id] | order(publishedAt desc)[0...2]{
      _id, title, excerpt, category, publishedAt, "slug": slug.current
    },
    "others": *[_type == "concern" && slug.current != $slug] | order(order asc){
      _id, title, "slug": slug.current
    }
  }
`);

export const concernSlugsQuery = defineQuery(`
  *[_type == "concern" && defined(slug.current)].slug.current
`);

/* Treatment approaches ------------------------------------------------ */

export const approachesQuery = defineQuery(`{
  "approaches": *[_type == "treatmentApproach"] | order(order asc){
    _id, title, summary, "slug": slug.current,
    "concerns": concerns[]->{ _id, title, "slug": slug.current }
  },
  "programmes": *[_type == "signatureProgramme"] | order(order asc){
    _id, title, tagline, "slug": slug.current
  }
}`);

export const approachBySlugQuery = defineQuery(`
  *[_type == "treatmentApproach" && slug.current == $slug][0]{
    _id, title, summary, philosophy, considerations, image,
    addresses, options, expectations, downtime, combinations, maintenance,
    "slug": slug.current,
    "modalities": modalities[]->{ _id, name, description },
    "concerns": concerns[]->{ _id, title, summary, "slug": slug.current },
    "technologies": technologies[]->{ _id, name, purpose, dedicatedPage, "slug": slug.current },
    "programmes": *[_type == "signatureProgramme" && references(^._id)] | order(order asc){
      _id, title, tagline, "slug": slug.current
    },
    "articles": *[_type == "journalArticle" && approach._ref == ^._id] | order(publishedAt desc)[0...2]{
      _id, title, excerpt, category, publishedAt, "slug": slug.current
    }
  }
`);

export const approachSlugsQuery = defineQuery(`
  *[_type == "treatmentApproach" && defined(slug.current)].slug.current
`);

/* The Dr Bhagat's Signature ------------------------------------------- */

export const programmesQuery = defineQuery(`
  *[_type == "signatureProgramme"] | order(order asc){
    _id, title, shortTitle, tagline, body, closing, image, "slug": slug.current,
    forWhom, assessed, personalisation, objective,
    sequence[]{ _key, title, description }
  }
`);

/* Technology ---------------------------------------------------------- */

/** Uncategorised technologies are held back from the page until a category is chosen. */
export const technologyQuery = defineQuery(`
  *[_type == "machine" && count(categories) > 0] | order(name asc){
    _id, name, purpose, categories, dedicatedPage, "slug": slug.current
  }
`);

export const machineBySlugQuery = defineQuery(`
  *[_type == "machine" && slug.current == $slug][0]{
    _id, name, purpose, description, categories, dedicatedPage, image,
    whatItIs, perspective, whoMayBenefit, helpsWith, sessionTime, downtime, expectations, combinations,
    "slug": slug.current,
    "concerns": *[_type == "concern" && references(^._id)] | order(order asc){
      _id, title, summary, "slug": slug.current
    },
    "approaches": *[_type == "treatmentApproach" && references(^._id)] | order(order asc){
      _id, title, "slug": slug.current
    }
  }
`);

/** Only technologies with a dedicated page are prerendered or listed in the sitemap. */
export const machineSlugsQuery = defineQuery(`
  *[_type == "machine" && dedicatedPage == true && defined(slug.current)].slug.current
`);

/* Doctors, results, clinic, journal ----------------------------------- */

export const doctorsQuery = defineQuery(`
  *[_type == "doctor"] | order(order asc){
    _id, name, degree, institution, credential, role, specialty, position,
    shortBio, biography, quote, practisingSince, expertise,
    foundations[]{ _key, title, detail },
    qualifications, conferences, publications, achievements, memberships,
    portrait, "slug": slug.current,
    "technologies": technologies[]->{ _id, name, dedicatedPage, "slug": slug.current }
  }
`);

export const resultsQuery = defineQuery(`{
  "results": *[_type == "result" && consentConfirmed == true] | order(publishedAt desc){
    _id, category, summary, before, after,
    "concern": concern->{ title, "slug": slug.current },
    "technologies": technologies[]->{ name, "slug": slug.current }
  },
  "testimonials": *[_type == "testimonial"]{ _id, author, quote, category },
  "concerns": *[_type == "concern"] | order(order asc){
    _id, title, resultCategory, "slug": slug.current
  }
}`);

export const clinicQuery = defineQuery(`{
  "settings": *[_id == "siteSettings"][0]{ doctorsImage, clinicImage },
  "spaces": *[_type == "clinicSpace" && count(images) > 0] | order(order asc){
    _id, title, description, location, images
  },
  "team": *[_type == "teamMember"] | order(order asc){ _id, name, role, portrait }
}`);

/* Journal -------------------------------------------------------------- */

export const journalQuery = defineQuery(`
  *[_type == "journalArticle"] | order(publishedAt desc){
    _id, title, excerpt, category, featured, publishedAt, image, "slug": slug.current,
    "concern": concern->{ title, "slug": slug.current },
    "doctor": doctor->{ name }
  }
`);

export const journalBySlugQuery = defineQuery(`
  *[_type == "journalArticle" && slug.current == $slug][0]{
    _id, title, excerpt, category, publishedAt, image, body, _updatedAt,
    "slug": slug.current,
    "concern": concern->{ title, summary, "slug": slug.current },
    "approach": approach->{ title, summary, "slug": slug.current },
    "doctor": doctor->{ name, role },
    "others": *[_type == "journalArticle" && slug.current != $slug] | order(publishedAt desc)[0...2]{
      _id, title, excerpt, category, publishedAt, "slug": slug.current
    }
  }
`);

export const journalSlugsQuery = defineQuery(`
  *[_type == "journalArticle" && defined(slug.current)].slug.current
`);

/* Sitemap ------------------------------------------------------------- */

export const sitemapEntriesQuery = defineQuery(`{
  "concerns": *[_type == "concern" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
  "approaches": *[_type == "treatmentApproach" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
  "machines": *[_type == "machine" && dedicatedPage == true && defined(slug.current)]{ "slug": slug.current, _updatedAt },
  "articles": *[_type == "journalArticle" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
  "latest": *[defined(_updatedAt) && !(_type match "system.*")] | order(_updatedAt desc)[0]._updatedAt
}`);
