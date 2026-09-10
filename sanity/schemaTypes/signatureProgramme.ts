import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * A Dr Bhagat programme: a staged combination of modalities decided by the
 * doctor. Deliberately has no device field of its own - a programme is
 * defined by its clinical logic, not by the machine it happens to use.
 */
export const signatureProgramme = defineType({
  name: "signatureProgramme",
  title: "Signature Programme",
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
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 0 }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 2 }),
    defineField({ name: "forWhom", title: "Who it is for", type: "text", rows: 3 }),
    defineField({ name: "approach", title: "The approach", type: "text", rows: 6 }),
    defineField({
      name: "stages",
      title: "Stages",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
    }),
    defineField({
      name: "concerns",
      title: "Concerns",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "concern" }] })],
    }),
    defineField({
      name: "approaches",
      title: "Treatment approaches",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "treatmentApproach" }] })],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "summary", media: "image" } },
});
