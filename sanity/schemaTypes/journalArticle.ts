import { defineArrayMember, defineField, defineType } from "sanity";

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
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
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
      type: "reference",
      to: [{ type: "concern" }],
    }),
    defineField({
      name: "image",
      title: "Image",
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
  preview: { select: { title: "title", subtitle: "publishedAt", media: "image" } },
});
