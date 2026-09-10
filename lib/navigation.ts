export type NavLink = { label: string; href: string };

/** Order specified by the doctors. Home is the logo. */
export const PRIMARY_NAV: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Your Concerns", href: "/concerns" },
  { label: "Treatment Approaches", href: "/treatment-approaches" },
  { label: "Technology", href: "/technology" },
  { label: "Results", href: "/results" },
  { label: "The Clinic", href: "/the-clinic" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_NAV: { title: string; links: NavLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Your Concerns", href: "/concerns" },
      { label: "Treatment Approaches", href: "/treatment-approaches" },
      { label: "Signature Programmes", href: "/signature-programmes" },
      { label: "Technology", href: "/technology" },
      { label: "Results", href: "/results" },
    ],
  },
  {
    title: "The practice",
    links: [
      { label: "About", href: "/about" },
      { label: "The Clinic", href: "/the-clinic" },
      { label: "Journal", href: "/journal" },
      { label: "Contact", href: "/contact" },
      { label: "Book a Consultation", href: "/book" },
    ],
  },
];
