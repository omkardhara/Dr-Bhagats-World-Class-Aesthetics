import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * A space within the clinic, shown on The Clinic page. A space only appears
 * on the site once it has photography, so entries can be prepared in advance
 * without an empty frame ever reaching a visitor.
 */
export const clinicSpace = defineType({
  name: "clinicSpace",
  title: "Clinic Space",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 0 }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      options: {
        list: [
          { title: "Goregaon East", value: "goregaon" },
          { title: "Vashi", value: "vashi" },
          { title: "Both", value: "both" },
        ],
      },
      initialValue: "both",
    }),
    defineField({
      name: "images",
      title: "Photography",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
        }),
      ],
    }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "description", media: "images.0" } },
});
