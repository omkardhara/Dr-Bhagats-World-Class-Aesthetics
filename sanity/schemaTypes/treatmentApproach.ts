import { defineArrayMember, defineField, defineType } from "sanity";

const text = (name: string, title: string, description: string, rows = 4) =>
  defineField({ name, title, description, type: "text", rows });

/**
 * How the doctors approach a family of concerns. Replaces the old
 * "core service" type, which listed procedures and read as a menu.
 *
 * The page follows the doctors' order: what the approach addresses, what we
 * assess, the possible treatment options, realistic expectations, downtime,
 * when combinations are useful, then results and maintenance. Technology sits
 * inside the treatment options - it never becomes the strategy itself.
 */
export const treatmentApproach = defineType({
  name: "treatmentApproach",
  title: "Treatment Approach",
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
    text(
      "focus",
      "What sets this approach apart",
      "One sentence on the patient goal this approach is about, so it is never confused with its neighbours.",
      2
    ),
    defineField({
      name: "related",
      title: "Related approaches",
      description: "The approaches a patient may be weighing this one against, and when each is the better fit.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "approach",
              title: "Approach",
              type: "reference",
              to: [{ type: "treatmentApproach" }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "note", title: "When it is the better fit", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "approach.title", subtitle: "note" } },
        }),
      ],
    }),
    defineField({
      name: "addresses",
      title: "What concern does this approach address?",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "philosophy", title: "Philosophy", type: "text", rows: 4 }),
    defineField({
      name: "considerations",
      title: "What does the doctor assess?",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    text(
      "options",
      "What are the possible treatment options?",
      "The strategy in the patient's terms. Technology belongs inside this, not in place of it.",
      4
    ),
    text("expectations", "What should the patient realistically expect?", "No guarantees.", 4),
    text("downtime", "Downtime and recovery", "Specific and honest, where it is relevant.", 3),
    text("combinations", "When are combinations useful?", "The selection logic behind combining treatments.", 4),
    text("maintenance", "Results and maintenance", "How results develop, and how they are maintained.", 3),
    defineField({
      name: "modalities",
      title: "Treatments a plan may include",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "treatment" }] })],
    }),
    defineField({
      name: "concerns",
      title: "Concerns addressed",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "concern" }] })],
    }),
    defineField({
      name: "technologies",
      title: "Technology that may be used",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "machine" }] })],
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
