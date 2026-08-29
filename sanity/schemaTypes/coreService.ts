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
      name: "treatments",
      title: "Treatments",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "treatment" }] })],
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
