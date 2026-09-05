import { defineQuery } from "next-sanity";

export const technologyPillarsQuery = defineQuery(`
  *[_type == "technologyPillar"] | order(title asc) {
    _id,
    title,
    description,
    "machines": machines[]->{ _id, name, description, "slug": slug.current }
  }
`);

export const coreServicesQuery = defineQuery(`
  *[_type == "coreService"] | order(title asc) {
    _id,
    title,
    "treatments": treatments[]->{
      _id,
      name,
      description,
      "slug": slug.current,
      "machines": machines[]->{ _id, name }
    }
  }
`);

export const concernsQuery = defineQuery(`
  *[_type == "concern"] | order(category asc, title asc) {
    _id, title, category, summary,
    "slug": slug.current
  }
`);

export const concernBySlugQuery = defineQuery(`
  *[_type == "concern" && slug.current == $slug][0] {
    _id, title, category, summary, description, image,
    "slug": slug.current,
    faqs[]{ question, answer },
    "treatments": treatments[]->{
      _id, name, description,
      "slug": slug.current,
      "machines": machines[]->{ _id, name }
    }
  }
`);

export const concernSlugsQuery = defineQuery(`
  *[_type == "concern" && defined(slug.current)].slug.current
`);

/** Slug plus last edit time, for sitemap lastModified. */
export const sitemapEntriesQuery = defineQuery(`{
  "concerns": *[_type == "concern" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
  "treatments": *[_type == "treatment" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
  "machines": *[_type == "machine" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
  "latest": *[defined(_updatedAt)] | order(_updatedAt desc)[0]._updatedAt
}`);

export const doctorsQuery = defineQuery(`
  *[_type == "doctor"] | order(order asc) {
    _id, name, role, qualifications, bio, portrait,
    "slug": slug.current
  }
`);

export const featuredTestimonialsQuery = defineQuery(`
  *[_type == "testimonial" && featured == true] | order(date desc) {
    _id, author, quote, date, source
  }
`);

export const testimonialsQuery = defineQuery(`
  *[_type == "testimonial"] | order(date desc) {
    _id, author, quote, date, source
  }
`);

export const treatmentBySlugQuery = defineQuery(`
  *[_type == "treatment" && slug.current == $slug][0] {
    _id, name, description, image,
    "slug": slug.current,
    "machines": machines[]->{ _id, name, description, "slug": slug.current },
    "service": *[_type == "coreService" && references(^._id)][0]{
      _id, title, "slug": slug.current
    },
    "concerns": *[_type == "concern" && references(^._id)] | order(title asc) {
      _id, title, category, "slug": slug.current
    }
  }
`);

export const treatmentSlugsQuery = defineQuery(`
  *[_type == "treatment" && defined(slug.current)].slug.current
`);

export const machineBySlugQuery = defineQuery(`
  *[_type == "machine" && slug.current == $slug][0] {
    _id, name, description, image,
    "slug": slug.current,
    "pillars": *[_type == "technologyPillar" && references(^._id)] | order(title asc) {
      _id, title, "slug": slug.current
    },
    "treatments": *[_type == "treatment" && references(^._id)] | order(name asc) {
      _id, name, "slug": slug.current
    }
  }
`);

export const machineSlugsQuery = defineQuery(`
  *[_type == "machine" && defined(slug.current)].slug.current
`);

export const machinesQuery = defineQuery(`
  *[_type == "machine"] | order(name asc) {
    _id, name, description, "slug": slug.current
  }
`);
