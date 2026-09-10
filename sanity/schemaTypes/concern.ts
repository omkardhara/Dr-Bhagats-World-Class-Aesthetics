import { defineArrayMember, defineField, defineType } from "sanity";

import { RESULT_CATEGORIES } from "../lib/categories";

/**
 * A patient's concern: the primary way the site is organised.
 *
 * Field order mirrors the page, which mirrors the patient journey - the
 * concern is understood and assessed before any approach is described, and
 * technology is referenced last. Keep it that way when adding fields.
 */
export const concern = defineType({
  name: "concern",
  title: "Concern",
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
    defineField({
      name: "understanding",
      title: "Understanding the concern",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "assessment",
      title: "How we assess it",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "approach",
      title: "Our approach",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "relatedConditions",
      title: "Conditions we see",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "resultCategory",
      title: "Results category",
      type: "string",
      options: { list: RESULT_CATEGORIES.map((c) => ({ title: c.label, value: c.value })) },
    }),
    defineField({
      name: "programmes",
      title: "Signature programmes",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "signatureProgramme" }] })],
    }),
    defineField({
      name: "approaches",
      title: "Treatment approaches",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "treatmentApproach" }] })],
    }),
    defineField({
      name: "technologies",
      title: "Technology that may be used",
      description: "Shown last on the page, after the clinical explanation.",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "machine" }] })],
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      description: "Rendered as FAQPage structured data.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "question", type: "string" }),
            defineField({ name: "answer", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "question" } },
        }),
      ],
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
