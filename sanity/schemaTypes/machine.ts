import { defineArrayMember, defineField, defineType } from "sanity";

import { TECHNOLOGY_CATEGORIES } from "../lib/categories";

const text = (name: string, title: string, description: string, rows = 4) =>
  defineField({ name, title, description, type: "text", rows, group: "page" });

/**
 * A technology the doctor may select. On the site most are a small card on
 * /technology; those with `dedicatedPage` get a page of their own.
 *
 * Each page answers the doctors' six patient questions, in their order: what
 * does it do, who is it suitable for, what concerns can it address, how long
 * is a session, what is the downtime, and what can it be combined with - and
 * when might it not be chosen. Realistic expectations sit alongside.
 *
 * Written as "what this technology allows us to do, and how the doctors decide
 * when it is appropriate" - never as a specification sheet. Do not lead with
 * wavelength, depth or energy unless it explains why it suits a patient.
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
      description: "One short line, shown on its card. What it allows the doctors to do, not a sales claim.",
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
      description: "Reserve for the technologies that carry the practice. Everything else is a card.",
      type: "boolean",
      initialValue: false,
      group: "card",
    }),
    text("whatItIs", "What does it do?", "What it allows the doctors to do, in plain language.", 4),
    text(
      "perspective",
      "How we decide",
      "Optional, for the major technologies: when the doctors choose it, and why.",
      4
    ),
    text("whoMayBenefit", "Who is it suitable for?", "Who it suits, and who it does not.", 4),
    defineField({
      name: "helpsWith",
      title: "What concerns can it address?",
      type: "array",
      group: "page",
      of: [defineArrayMember({ type: "string" })],
    }),
    text("sessionTime", "How long is a session?", "Session length and how many sessions are usual.", 3),
    text("downtime", "What is the downtime and recovery?", "Honest and specific. No promises.", 3),
    text("expectations", "What to expect", "Realistic expectations and the timescale of change.", 3),
    text(
      "combinations",
      "What can it be combined with, and when might it not be chosen?",
      "The selection logic: combinations, and when another approach is better.",
      4
    ),
    defineField({
      name: "description",
      title: "Technical note",
      description: "Internal reference only. Not shown on the site.",
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
