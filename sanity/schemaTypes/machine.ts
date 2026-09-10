import { defineField, defineType } from "sanity";

import { TECHNOLOGY_CATEGORIES } from "../lib/categories";

/**
 * A device in the technology portfolio. Framed as a tool the doctor selects,
 * so the field that matters most on the site is `purpose` - where it fits in a
 * plan - rather than its specification.
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
      title: "Clinical purpose",
      description: "Where this technology fits within a treatment plan.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "description",
      title: "Technical description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "category",
      title: "Clinical category",
      type: "string",
      options: { list: TECHNOLOGY_CATEGORIES.map((c) => ({ title: c.label, value: c.value })) },
    }),
    defineField({
      name: "featured",
      title: "Feature on the technology page",
      description: "Not every device needs equal prominence.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
  ],
  preview: { select: { title: "name", subtitle: "purpose", media: "image" } },
});
