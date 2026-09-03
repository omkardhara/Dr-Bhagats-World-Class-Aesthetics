import { BRAND, LOCATIONS, SITE_URL, SOCIALS } from "@/lib/site";

/**
 * MedicalClinic structured data, one node per location.
 *
 * Unconfirmed fields are omitted rather than guessed: Google cross-checks this
 * against the Google Business Profile listing, and a mismatched phone number or
 * invented opening hours actively harms local ranking.
 */
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
    if (location.openingHours) node.openingHours = location.openingHours;
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
        url: SITE_URL,
        sameAs: Object.values(SOCIALS),
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
