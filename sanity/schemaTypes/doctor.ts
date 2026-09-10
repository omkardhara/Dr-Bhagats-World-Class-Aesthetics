import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * The doctors are central to the brand. Every list field is optional and the
 * About page hides any section left empty, so a profile can be strengthened
 * incrementally without a half-finished heading ever appearing on the site.
 */
export const doctor = defineType({
  name: "doctor",
  title: "Doctor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 0 }),
    defineField({
      name: "shortBio",
      title: "Short introduction",
      description: "One or two sentences, used on the homepage.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "biography",
      title: "Biography",
      description: "Separate paragraphs with a blank line.",
      type: "text",
      rows: 10,
    }),
    defineField({
      name: "qualifications",
      title: "Training",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "expertise",
      title: "Areas of expertise",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "memberships",
      title: "Memberships and affiliations",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "achievements",
      title: "Achievements, publications and faculty roles",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "role", media: "portrait" } },
});
