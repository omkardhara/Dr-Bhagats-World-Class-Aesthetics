import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * A patient-facing problem ("acne", "hair loss"), as opposed to the
 * clinician-facing treatment that addresses it. This is how patients search,
 * so concerns are the primary entry point for organic traffic.
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
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Skin", value: "skin" },
          { title: "Face", value: "face" },
          { title: "Hair", value: "hair" },
          { title: "Body", value: "body" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
    defineField({ name: "description", title: "Description", type: "text", rows: 6 }),
    defineField({
      name: "treatments",
      title: "Treatments",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "treatment" }] })],
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
  ],
  preview: { select: { title: "title", subtitle: "category" } },
});
