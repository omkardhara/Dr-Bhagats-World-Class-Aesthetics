import { defineField, defineType } from "sanity";

const imageField = (name: string, title: string, description: string) =>
  defineField({
    name,
    title,
    type: "image",
    description,
    options: { hotspot: true },
    fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
  });

/**
 * Singleton for site-wide imagery. Each slot is optional: sections are designed
 * to stand on their own, and gain photography when it is set here.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "heroImages",
      title: "Homepage banner",
      description:
        "The photographs that crossfade behind the homepage headline, in order. Three to five works best; one renders as a still image. Each needs space at the lower left, where the headline sits.",
      type: "array",
      of: [
        defineField({
          name: "slide",
          title: "Photograph",
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
        }),
      ],
      validation: (Rule) => Rule.max(5),
    }),
    imageField("heroImage", "Homepage hero (single)", "Used only when the banner above is empty."),
    imageField("philosophyImage", "Philosophy", "Shown beside the philosophy statement on the homepage."),
    imageField(
      "doctorsImage",
      "The doctors, together",
      "A large photograph of both doctors, opening The Doctors on the About page."
    ),
    imageField("clinicImage", "The Clinic", "Used for The Clinic on the homepage and within About."),
    imageField("consultationImage", "Consultation", "Shown on the booking page."),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
