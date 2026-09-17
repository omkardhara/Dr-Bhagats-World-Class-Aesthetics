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
 * The doctors are the authority of the practice, so the credentials are
 * structured rather than buried in prose: the degree and institution sit
 * directly beneath the name, and `foundations` renders as an academic record.
 *
 * Every field here must be verifiable against the doctor's own CV. Nothing is
 * filled in on their behalf, and any section left empty is hidden on the page
 * rather than shown as a gap.
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
      name: "degree",
      title: "Degree",
      description: "Shown directly beneath the name. For example: MD, Dermatology",
      type: "string",
      group: "profile",
    }),
    defineField({
      name: "institution",
      title: "Institution",
      description: "Where the degree was taken. For example: Seth GS Medical College & KEM Hospital, Mumbai",
      type: "string",
      group: "profile",
    }),
    defineField({
      name: "credential",
      title: "Honour",
      description: "An academic distinction, if any. For example: Gold Medallist · University of Mumbai",
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
      title: "Practice",
      description: "For example: Aesthetic & Cosmetic Dermatology | Laser & Energy-Based Medicine",
      type: "string",
      group: "profile",
    }),
    defineField({
      name: "position",
      title: "Position in the practice",
      description: "For example: Co-Founder",
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
      rows: 16,
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
    { ...list("expertise", "Areas of expertise"), group: "credentials" },
    defineField({
      name: "foundations",
      title: "Academic and professional foundations",
      description:
        "The academic record, shown as its own section. Each entry is a credential and where it is from.",
      type: "array",
      group: "credentials",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Credential",
              description: "For example: MD Dermatology, or Gold Medallist",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "detail",
              title: "Institution or detail",
              type: "string",
            }),
          ],
          preview: { select: { title: "title", subtitle: "detail" } },
        }),
      ],
    }),
    defineField({
      name: "practisingSince",
      title: "In practice since (year)",
      description: "Shown as years of experience, and stays correct every year.",
      type: "number",
      group: "credentials",
      validation: (Rule) => Rule.integer().min(1960).max(new Date().getFullYear()),
    }),
    { ...list("qualifications", "Qualifications and training"), group: "credentials" },
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
