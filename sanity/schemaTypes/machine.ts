import { defineArrayMember, defineField, defineType } from "sanity";

import { TECHNOLOGY_CATEGORIES } from "../lib/categories";

const text = (name: string, title: string, description: string, rows = 4) =>
  defineField({ name, title, description, type: "text", rows, group: "page" });

/**
 * A technology the doctor may select. On the site most are a small card on
 * /technology; those with `dedicatedPage` get a page of their own, built from
 * the fields below - what it is, what it helps with, who may benefit, what
 * treatment involves, downtime, and where it fits in a plan.
 *
 * The page is deliberately patient-facing and doctor-led. Nothing here should
 * read like manufacturer copy, and every clinical statement needs the doctors'
 * sign-off.
 */
export const machine = defineType({
  name: "machine",
  title: "Technology",
  type: "document",
  groups: [
    { name: "card", title: "Card", default: true },
    { name: "page", title: "Page" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "card",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "card",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "purpose",
      title: "Card line",
      description: "One short line, shown on its card. Where it fits in a plan, not a sales claim.",
      type: "text",
      rows: 2,
      group: "card",
      validation: (Rule) => Rule.max(140),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      description: "A technology with no category is not shown on the technology page.",
      type: "array",
      group: "card",
      of: [defineArrayMember({ type: "string" })],
      options: {
        list: TECHNOLOGY_CATEGORIES.map((c) => ({ title: c.label, value: c.value })),
        layout: "grid",
      },
    }),
    defineField({
      name: "dedicatedPage",
      title: "Give this technology its own page",
      description:
        "Reserve for the technologies that carry the practice. Everything else is a card.",
      type: "boolean",
      initialValue: false,
      group: "card",
    }),
    text("whatItIs", "What it is", "In plain language, without manufacturer claims.", 4),
    defineField({
      name: "helpsWith",
      title: "What it can help with",
      type: "array",
      group: "page",
      of: [defineArrayMember({ type: "string" })],
    }),
    text("whoMayBenefit", "Who may benefit", "Who it suits, and who it does not.", 4),
    text("whatItInvolves", "What treatment involves", "What actually happens in the room.", 5),
    text(
      "downtime",
      "Downtime and recovery",
      "Honest and specific. No promises, and no comparison with other clinics.",
      4
    ),
    text(
      "whereItFits",
      "Where it fits within a treatment plan",
      "How the doctor decides to use it, and what it is combined with.",
      5
    ),
    defineField({
      name: "description",
      title: "Technical description",
      description: "A short technical note, shown at the foot of the page.",
      type: "text",
      rows: 3,
      group: "page",
    }),
    defineField({
      name: "image",
      title: "Image",
      description: "The technology in a doctor’s hands, not a product shot.",
      type: "image",
      group: "page",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
  ],
  preview: { select: { title: "name", subtitle: "purpose", media: "image" } },
});
