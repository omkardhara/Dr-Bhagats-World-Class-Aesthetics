import { defineField, defineType } from "sanity";

import { RESULT_CATEGORIES } from "../lib/categories";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "quote",
      title: "Quote",
      description:
        "Use the patient's own words. Trim with an ellipsis rather than rewording.",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Concern category",
      description: "Leave empty for a general comment about the practice.",
      type: "string",
      options: { list: RESULT_CATEGORIES.map((c) => ({ title: c.label, value: c.value })) },
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      options: {
        list: [
          { title: "Google", value: "google" },
          { title: "Direct", value: "direct" },
        ],
      },
      initialValue: "google",
    }),
    defineField({
      name: "featured",
      title: "Feature on the homepage",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: { select: { title: "author", subtitle: "quote" } },
});
