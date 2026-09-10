import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * How the doctors approach a family of concerns. Replaces the old
 * "core service" type, which listed procedures and read as a menu.
 */
export const treatmentApproach = defineType({
  name: "treatmentApproach",
  title: "Treatment Approach",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 0 }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 2 }),
    defineField({ name: "philosophy", title: "Philosophy", type: "text", rows: 5 }),
    defineField({
      name: "considerations",
      title: "What the doctor considers",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "modalities",
      title: "What a plan may include",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "treatment" }] })],
    }),
    defineField({
      name: "concerns",
      title: "Concerns addressed",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "concern" }] })],
    }),
    defineField({
      name: "technologies",
      title: "Technology that may be used",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "machine" }] })],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "summary", media: "image" } },
});
