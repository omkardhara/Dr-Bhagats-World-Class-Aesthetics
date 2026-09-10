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
    imageField("heroImage", "Homepage hero", "Full-bleed image behind the homepage hero."),
    imageField("philosophyImage", "Philosophy", "Shown beside the philosophy statement on the homepage."),
    imageField("clinicImage", "The Clinic", "Used for The Clinic on the homepage and at the top of its page."),
    imageField("consultationImage", "Consultation", "Shown on the booking page."),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
