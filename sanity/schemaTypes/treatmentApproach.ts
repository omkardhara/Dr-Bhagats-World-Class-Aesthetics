import { defineArrayMember, defineField, defineType } from "sanity";

const text = (name: string, title: string, description: string, rows = 4) =>
  defineField({ name, title, description, type: "text", rows });

/**
 * How the doctors approach a family of concerns. Replaces the old
 * "core service" type, which listed procedures and read as a menu.
 *
 * The page carries concise, useful detail - what it addresses, what the doctor
 * considers, realistic expectations, downtime and how treatments combine -
 * rather than a long FAQ.
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
    defineField({ name: "philosophy", title: "Philosophy", type: "text", rows: 4 }),
    defineField({
      name: "addresses",
      title: "What it can address",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "considerations",
      title: "What the doctor considers",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    text(
      "expectations",
      "Realistic expectations",
      "What improvement looks like, and over what timescale. No guarantees.",
      4
    ),
    text("downtime", "Downtime and recovery", "Specific and honest, where it is relevant.", 4),
    text("combinations", "How treatments may be combined", "Why a plan layers or stages treatment.", 4),
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
