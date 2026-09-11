import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * A Dr Bhagat's signature programme: a considered treatment strategy, not a
 * fixed protocol. Deliberately has no technology field - the doctors asked
 * that technologies are never listed under a programme, only that they "may be
 * selected according to individual assessment".
 *
 * All five render as sections of the single /signature page.
 */
export const signatureProgramme = defineType({
  name: "signatureProgramme",
  title: "Signature Programme",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      description: "For example: The Signature Lift",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortTitle",
      title: "Short title",
      description: "Used where space is limited, such as the homepage. For example: Signature Lift",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "Becomes the link to this programme’s section: /signature#slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 0 }),
    defineField({
      name: "tagline",
      title: "Tagline",
      description: "For example: A refined approach to facial ageing and laxity.",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Description",
      description: "Separate paragraphs with a blank line.",
      type: "text",
      rows: 10,
    }),
    defineField({
      name: "closing",
      title: "Closing line",
      description: "Set apart at the end of the section.",
      type: "text",
      rows: 2,
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
  preview: { select: { title: "title", subtitle: "tagline", media: "image" } },
});
