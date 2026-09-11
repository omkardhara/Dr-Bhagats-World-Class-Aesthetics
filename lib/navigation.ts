export type NavLink = { label: string; href: string };

/**
 * Order specified by the doctors. Contact is deliberately absent: contact
 * details live in the footer and on the booking page, so the one persistent
 * call to action is Book a Consultation.
 */
export const PRIMARY_NAV: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Your Concerns", href: "/concerns" },
  { label: "The Dr Bhagat’s Signature", href: "/signature" },
  { label: "Treatment Approaches", href: "/treatment-approaches" },
  { label: "Technology", href: "/technology" },
  { label: "Results", href: "/results" },
  { label: "The Clinic", href: "/the-clinic" },
  { label: "Journal", href: "/journal" },
];

export const FOOTER_NAV: { title: string; links: NavLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Your Concerns", href: "/concerns" },
      { label: "The Dr Bhagat’s Signature", href: "/signature" },
      { label: "Treatment Approaches", href: "/treatment-approaches" },
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
      { label: "Book a Consultation", href: "/book" },
    ],
  },
];
