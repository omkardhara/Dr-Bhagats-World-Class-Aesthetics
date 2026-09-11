import JsonLd from "@/components/JsonLd";
import { BRAND, LOCATIONS, SITE_URL } from "@/lib/site";
import type { Doctor } from "@/sanity/lib/types";

/**
 * Physician nodes for the named clinicians. MedicalClinic describes the
 * business; Physician is what Google associates with a practitioner's name,
 * which is how patients search for a doctor-led practice.
 */
export default function DoctorSchema({ doctors }: { doctors: Doctor[] }) {
  if (doctors.length === 0) return null;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": doctors.map((doctor) => {
          const node: Record<string, unknown> = {
            "@type": "Physician",
            "@id": `${SITE_URL}/about#${doctor.slug}`,
            name: doctor.name,
            url: `${SITE_URL}/about#${doctor.slug}`,
            medicalSpecialty: "Dermatology",
            worksFor: { "@id": `${SITE_URL}/#organization` },
            workLocation: LOCATIONS.map((location) => ({ "@id": `${SITE_URL}/#${location.id}` })),
            affiliation: BRAND.legalName,
          };
          if (doctor.role) node.jobTitle = doctor.role;
          if (doctor.shortBio) node.description = doctor.shortBio;
          if (doctor.expertise?.length) node.knowsAbout = doctor.expertise;
          if (doctor.qualifications?.length) {
            node.alumniOf = doctor.qualifications.map((name) => ({
              "@type": "EducationalOrganization",
              name,
            }));
          }
          if (doctor.memberships?.length) node.memberOf = doctor.memberships;
          if (doctor.achievements?.length) node.award = doctor.achievements;
          return node;
        }),
      }}
    />
  );
}
