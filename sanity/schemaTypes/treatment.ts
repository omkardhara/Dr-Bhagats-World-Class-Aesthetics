import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * A modality that a treatment plan may include. Modalities have no public
 * page of their own: they appear inside a treatment approach, which is what
 * keeps the site from reading as a menu of procedures.
 */
export const treatment = defineType({
  name: "treatment",
  title: "Modality",
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
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({
      name: "machines",
      title: "Technology",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "machine" }] })],
    }),
  ],
  preview: { select: { title: "name", subtitle: "description" } },
});
