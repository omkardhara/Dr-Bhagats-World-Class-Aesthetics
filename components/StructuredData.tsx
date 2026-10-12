import { BRAND, LOCATIONS, SITE_URL, SOCIALS } from "@/lib/site";

/**
 * MedicalClinic structured data, one node per location.
 *
 * Unconfirmed fields are omitted rather than guessed: Google cross-checks this
 * against the Google Business Profile listing, and a mismatched phone number or
 * invented opening hours actively harms local ranking.
 */
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const FULL = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/** "Mo-Sa" and "Fr-Su" become the days they stand for. */
function expandDays(range: string): string[] {
  return range.split(",").flatMap((part) => {
    const [from, to] = part.split("-");
    const start = DAYS.indexOf(from);
    if (start < 0) return [];
    if (!to) return [FULL[start]];
    const end = DAYS.indexOf(to);
    const days: string[] = [];
    for (let i = start; ; i = (i + 1) % 7) {
      days.push(FULL[i]);
      if (i === end) break;
    }
    return days;
  });
}

function clinicNodes() {
  return LOCATIONS.map((location) => {
    const node: Record<string, unknown> = {
      "@type": "MedicalClinic",
      "@id": `${SITE_URL}/#${location.id}`,
      name: `${BRAND.name} — ${location.name}`,
      legalName: BRAND.legalName,
      description: BRAND.description,
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        streetAddress: location.streetAddress,
        addressLocality: location.locality,
        addressRegion: location.region,
        postalCode: location.postalCode,
        addressCountry: location.country,
      },
      medicalSpecialty: "Dermatology",
      sameAs: Object.values(SOCIALS),
    };

    if (location.phone) node.telephone = location.phone;
    if (location.email) node.email = location.email;
    if (location.geo) {
      node.geo = {
        "@type": "GeoCoordinates",
        latitude: location.geo.latitude,
        longitude: location.geo.longitude,
      };
    }
    if (location.openingHours) {
      node.openingHours = location.openingHours;
      // The expanded form, which assistants and Google both read more reliably.
      node.openingHoursSpecification = location.openingHours.map((entry) => {
        const [days, hours] = entry.split(" ");
        const [opens, closes] = hours.split("-");
        return {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: expandDays(days),
          opens,
          closes,
        };
      });
    }
    if (location.whatsapp) {
      node.contactPoint = {
        "@type": "ContactPoint",
        contactType: "WhatsApp",
        telephone: location.whatsapp,
      };
    }
    node.areaServed = location.id === "vashi" ? "Navi Mumbai" : "Mumbai";
    node.availableService = {
      "@type": "MedicalProcedure",
      name: "Dermatology consultation",
      procedureType: "https://schema.org/NoninvasiveProcedure",
    };
    if (location.mapsUrl) node.hasMap = location.mapsUrl;

    return node;
  });
}

export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: BRAND.name,
        legalName: BRAND.legalName,
        description: BRAND.description,
        url: SITE_URL,
        sameAs: Object.values(SOCIALS),
        contactPoint: LOCATIONS.filter((location) => location.phone).map((location) => ({
          "@type": "ContactPoint",
          contactType: "Appointments",
          telephone: location.phone,
          areaServed: location.id === "vashi" ? "Navi Mumbai" : "Mumbai",
          availableLanguage: ["English", "Hindi", "Marathi"],
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: BRAND.name,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      ...clinicNodes(),
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Serialised from our own config, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
