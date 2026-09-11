import { defineArrayMember, defineField, defineType } from "sanity";

const list = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: "array",
    of: [defineArrayMember({ type: "string" })],
  });

/**
 * The doctors are central to the brand, and the About page is built around
 * them. Every credential field is optional and the page hides any section left
 * empty, so a profile can be strengthened as details are confirmed without a
 * half-finished heading ever appearing on the site. Nothing here should be
 * filled in unless the doctor has confirmed it.
 */
export const doctor = defineType({
  name: "doctor",
  title: "Doctor",
  type: "document",
  groups: [
    { name: "profile", title: "Profile", default: true },
    { name: "credentials", title: "Credentials" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "profile",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "profile",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "position",
      title: "Position in the practice",
      description: "For example: Co-Founder",
      type: "string",
      group: "profile",
    }),
    defineField({
      name: "role",
      title: "Title",
      description: "For example: Consultant Dermatologist",
      type: "string",
      group: "profile",
    }),
    defineField({
      name: "specialty",
      title: "Specialty",
      description: "For example: Aesthetic & Cosmetic Dermatology",
      type: "string",
      group: "profile",
    }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 0, group: "profile" }),
    defineField({
      name: "shortBio",
      title: "Short introduction",
      description: "One or two sentences, used on the homepage.",
      type: "text",
      rows: 3,
      group: "profile",
    }),
    defineField({
      name: "biography",
      title: "Biography",
      description: "Separate paragraphs with a blank line.",
      type: "text",
      rows: 14,
      group: "profile",
    }),
    defineField({
      name: "quote",
      title: "Philosophy",
      description: "A sentence in the doctor’s own words, shown as a quotation.",
      type: "text",
      rows: 2,
      group: "profile",
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      description: "A large professional portrait, 3:4.",
      type: "image",
      group: "profile",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    { ...list("qualifications", "Qualifications and training"), group: "credentials" },
    defineField({
      name: "practisingSince",
      title: "In practice since (year)",
      description: "Shown as years of experience, and stays correct every year.",
      type: "number",
      group: "credentials",
      validation: (Rule) => Rule.integer().min(1960).max(new Date().getFullYear()),
    }),
    { ...list("expertise", "Areas of expertise"), group: "credentials" },
    { ...list("conferences", "Conferences", "Presentations, faculty roles and invited talks."), group: "credentials" },
    { ...list("publications", "Publications"), group: "credentials" },
    { ...list("achievements", "Awards and honours"), group: "credentials" },
    defineField({
      name: "technologies",
      title: "Technologies",
      description: "Technologies this doctor works with.",
      type: "array",
      group: "credentials",
      of: [defineArrayMember({ type: "reference", to: [{ type: "machine" }] })],
    }),
    { ...list("memberships", "Memberships and affiliations"), group: "credentials" },
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "role", media: "portrait" } },
});
