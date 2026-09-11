/**
 * Single source of truth for business identity, locations and contact details.
 *
 * These values feed the footer, the booking page and the LocalBusiness
 * structured data. Google cross-checks structured data against the Google
 * Business Profile listing, so anything here must match GBP exactly.
 *
 * TODO(client): fields marked `null` are unconfirmed and are omitted from the
 * rendered output rather than guessed. They must be supplied before launch.
 */

// `||`, not `??`: a variable set to an empty string must fall back too, or
// every absolute URL (metadataBase, canonicals, sitemap) becomes invalid.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.drbhagats.com";

export const BRAND = {
  name: "Dr Bhagat's World Class Aesthetics",
  legalName: "DR BHAGAT'S WORLD CLASS AESTHETICS LLP",
  shortName: "Dr Bhagat's",
  /** Retired brand. Retained only for redirect mapping and schema history. */
  formerName: "Finesse Skin and Laser Clinic",
  description:
    "A doctor-led aesthetic and dermatology practice in Mumbai and Navi Mumbai.",
} as const;

/** Primary brand line, chosen by the doctors. */
export const TAGLINE = "Expertise, Elevated.";

export const SUPPORTING_LINE =
  "Where dermatological expertise meets the art of aesthetics.";

/**
 * The guiding principle, recurring across the site. Revised by the doctors from
 * "Considered treatment, not a menu."
 */
export const PHILOSOPHY_LINE = "Considered care. Never a menu.";

export const PHILOSOPHY_TEXT = [
  "We don’t believe in one treatment for everyone.",
  "We believe in understanding the individual, identifying what needs to change, and choosing the right combination of treatments to achieve refined, natural results.",
] as const;

export type Location = {
  id: string;
  name: string;
  streetAddress: string;
  locality: string;
  region: string;
  postalCode: string;
  country: string;
  /** TODO(client): confirm. The Goregaon premises have moved. */
  phone: string | null;
  /** TODO(client): WhatsApp Business number, in international format. */
  whatsapp: string | null;
  email: string | null;
  mapsUrl: string | null;
  /** TODO(client): opening hours, in schema.org format e.g. "Mo-Sa 10:00-19:00". */
  openingHours: string[] | null;
  geo: { latitude: number; longitude: number } | null;
};

export const LOCATIONS: Location[] = [
  {
    id: "goregaon",
    name: "Goregaon East",
    streetAddress:
      "H RishabhRaj Serenity Decks, Shop No. 2 and Office No. 102, Sauran CHSL",
    locality: "Goregaon East, Mumbai",
    region: "Maharashtra",
    postalCode: "400063",
    country: "IN",
    // Premises have changed; the previous number is not carried over.
    phone: null,
    whatsapp: null,
    email: null,
    mapsUrl: null,
    openingHours: null,
    geo: null,
  },
  {
    id: "vashi",
    name: "Vashi, Navi Mumbai",
    streetAddress:
      "Ground Floor, Plot No. 19 and 20, Satra Plaza, Shop No. 63, Palm Beach Road, Sector 19D",
    locality: "Vashi, Navi Mumbai",
    region: "Maharashtra",
    postalCode: "400703",
    country: "IN",
    // TODO(client): confirm this survived the rebrand.
    phone: "+912240048149",
    whatsapp: null,
    email: null,
    mapsUrl: null,
    openingHours: null,
    geo: null,
  },
];

export const SOCIALS = {
  instagram: "https://www.instagram.com/finesselaserskinclinic/",
  facebook: "https://www.facebook.com/profile.php?id=100091663637045",
} as const;

/** Formats a phone number for display: +912240048149 -> +91 22 4004 8149 */
export function formatPhone(phone: string): string {
  const match = phone.match(/^\+(\d{2})(\d{2})(\d{4})(\d{4})$/);
  return match
    ? `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`
    : phone;
}

/**
 * Directions to a clinic. Uses the Google Business Profile link once supplied;
 * until then, a Maps search for the confirmed street address.
 */
export function directionsHref(location: Location): string {
  if (location.mapsUrl) return location.mapsUrl;
  const address = `${location.streetAddress}, ${location.locality}, ${location.region} ${location.postalCode}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

/** A wa.me link needs digits only. */
export function whatsappHref(number: string): string {
  return `https://wa.me/${number.replace(/\D/g, "")}`;
}
