import { defineArrayMember, defineField, defineType } from "sanity";

import { TECHNOLOGY_CATEGORIES } from "../lib/categories";

/**
 * A technology the doctor may select. On the site most are a small card on
 * /technology; only those with `dedicatedPage` get a page of their own, so the
 * portfolio never reads as a row of competing sales pages.
 */
export const machine = defineType({
  name: "machine",
  title: "Technology",
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
    defineField({
      name: "purpose",
      title: "Card line",
      description: "One short line, shown on its card. Where it fits in a plan, not a sales claim.",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.max(140),
    }),
    defineField({
      name: "description",
      title: "Technical description",
      description: "Shown only on a dedicated page.",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "categories",
      title: "Categories",
      description: "A technology with no category is not shown on the technology page.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: {
        list: TECHNOLOGY_CATEGORIES.map((c) => ({ title: c.label, value: c.value })),
        layout: "grid",
      },
    }),
    defineField({
      name: "dedicatedPage",
      title: "Give this technology its own page",
      description:
        "Reserve for signature technologies. Everything else is a card on the technology page.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "image",
      title: "Image",
      description: "Used on a dedicated page. Show the technology in a doctor’s hands, not as a product shot.",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
  ],
  preview: { select: { title: "name", subtitle: "purpose", media: "image" } },
});
