import { defineArrayMember, defineField, defineType } from "sanity";

export const coreService = defineType({
  name: "coreService",
  title: "Core Service",
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
      name: "treatments",
      title: "Treatments",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "treatment" }] })],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Describe the image for screen readers.",
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
