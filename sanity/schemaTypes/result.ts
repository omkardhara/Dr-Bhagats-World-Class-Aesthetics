import { defineArrayMember, defineField, defineType } from "sanity";

import { RESULT_CATEGORIES } from "../lib/categories";

/**
 * A before/after result, organised by the patient's concern.
 *
 * The consent field is required to be true before a result can be published,
 * and the site also refuses to render one without it. Clinical photographs are
 * special-category personal data; a missing record of consent should block
 * publication rather than rely on someone remembering.
 */
export const result = defineType({
  name: "result",
  title: "Result",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      description: "For the Studio only. Never shown on the site.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Concern category",
      type: "string",
      options: { list: RESULT_CATEGORIES.map((c) => ({ title: c.label, value: c.value })) },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "concern",
      title: "Concern",
      type: "reference",
      to: [{ type: "concern" }],
    }),
    defineField({
      name: "before",
      title: "Before",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "after",
      title: "After",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "Describe the concern and the plan. Avoid promising outcomes.",
    }),
    defineField({
      name: "technologies",
      title: "Technology used (shown secondarily)",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "machine" }] })],
    }),
    defineField({
      name: "consentConfirmed",
      title: "Written patient consent for publication is on file",
      type: "boolean",
      initialValue: false,
      validation: (Rule) =>
        Rule.custom((value) =>
          value === true ? true : "Consent must be confirmed before publishing."
        ),
    }),
    defineField({ name: "publishedAt", title: "Date", type: "date" }),
  ],
  preview: { select: { title: "title", subtitle: "category", media: "after" } },
});
