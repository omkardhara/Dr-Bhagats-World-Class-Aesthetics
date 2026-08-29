import { defineArrayMember, defineField, defineType } from "sanity";

export const technologyPillar = defineType({
  name: "technologyPillar",
  title: "Technology Pillar",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "machines",
      title: "Machines",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "machine" }] })],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});
