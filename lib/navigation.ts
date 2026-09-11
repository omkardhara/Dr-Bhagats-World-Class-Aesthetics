export type NavLink = { label: string; href: string };

/**
 * The doctors' curated navigation: "About | Concerns | Treatments | Technology |
 * Journal | Contact | Consult". The logo is home, and Consult is the header's
 * call to action rather than a link in this list.
 *
 * Deliberately short. Doctors, philosophy and the clinic sit within About; the
 * Signature programmes within Treatments; Results is reached from the homepage.
 * No treatment, technology or category is exposed here - the site should feel
 * curated, never like a catalogue.
 */
export const PRIMARY_NAV: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Concerns", href: "/concerns" },
  { label: "Treatments", href: "/treatment-approaches" },
  { label: "Technology", href: "/technology" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_NAV: { title: string; links: NavLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Concerns", href: "/concerns" },
      { label: "Treatments", href: "/treatment-approaches" },
      { label: "The Dr Bhagat’s Signature", href: "/signature" },
      { label: "Technology", href: "/technology" },
      { label: "Results", href: "/results" },
    ],
  },
  {
    title: "The practice",
    links: [
      { label: "About", href: "/about" },
      { label: "Journal", href: "/journal" },
      { label: "Contact", href: "/contact" },
      { label: "Book a Consultation", href: "/book" },
    ],
  },
];
