import { BRAND, LOCATIONS, SITE_URL } from "@/lib/site";
import type { Doctor } from "@/sanity/lib/types";

/**
 * Physician nodes for the named clinicians.
 *
 * MedicalClinic alone describes the business; Physician is what Google
 * associates with a practitioner's name, which is how patients search for a
 * doctor-led practice. Each is tied to the clinic via worksFor.
 */
export default function DoctorSchema({ doctors }: { doctors: Doctor[] }) {
  if (doctors.length === 0) return null;

  const data = {
    "@context": "https://schema.org",
    "@graph": doctors.map((doctor) => {
      const node: Record<string, unknown> = {
        "@type": "Physician",
        "@id": `${SITE_URL}/about#${doctor.slug}`,
        name: doctor.name,
        url: `${SITE_URL}/about`,
        medicalSpecialty: "Dermatology",
        worksFor: { "@id": `${SITE_URL}/#organization` },
        // Both clinics; the schema carries no per-doctor location split.
        workLocation: LOCATIONS.map((location) => ({
          "@id": `${SITE_URL}/#${location.id}`,
        })),
        affiliation: BRAND.legalName,
      };
      if (doctor.role) node.jobTitle = doctor.role;
      if (doctor.bio) node.description = doctor.bio;
      if (doctor.qualifications?.length) {
        node.alumniOf = doctor.qualifications.map((q) => ({
          "@type": "EducationalOrganization",
          name: q,
        }));
      }
      return node;
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
