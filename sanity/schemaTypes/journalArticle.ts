import { defineArrayMember, defineField, defineType } from "sanity";

import { JOURNAL_CATEGORIES } from "../lib/categories";

/**
 * The Journal is editorial, not a blog: one featured article leads the page,
 * and each piece carries the concern and treatment approach it relates to, so
 * a reader can move from reading to understanding their own concern.
 */
export const journalArticle = defineType({
  name: "journalArticle",
  title: "Journal Article",
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
      name: "excerpt",
      title: "Standfirst",
      description: "One or two sentences, shown under the title on the Journal page.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: JOURNAL_CATEGORIES.map((c) => ({ title: c.label, value: c.value })) },
    }),
    defineField({
      name: "featured",
      title: "Feature at the top of the Journal",
      description: "One article leads the page. The most recent featured article is used.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "Published",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "doctor",
      title: "Written by",
      type: "reference",
      to: [{ type: "doctor" }],
      description: "Leave empty to attribute the article to the practice.",
    }),
    defineField({
      name: "concern",
      title: "Related concern",
      description: "Offered quietly at the end of the article, as the next step for the reader.",
      type: "reference",
      to: [{ type: "concern" }],
    }),
    defineField({
      name: "approach",
      title: "Related treatment approach",
      type: "reference",
      to: [{ type: "treatmentApproach" }],
    }),
    defineField({
      name: "image",
      title: "Image",
      description: "The clinic's own photography. A featured article benefits most from one.",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
        }),
      ],
    }),
  ],
  orderings: [
    { title: "Newest", name: "publishedAt", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: { select: { title: "title", subtitle: "excerpt", media: "image" } },
});
