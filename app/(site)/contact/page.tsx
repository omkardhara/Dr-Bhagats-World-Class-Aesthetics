import type { Metadata } from "next";

import Reveal from "@/components/Reveal";
import { PageHero, PrimaryLink, Rail, type Ground } from "@/components/ui";
import { formatPhone, LOCATIONS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Dr Bhagat's World Class Aesthetics in Goregaon East, Mumbai and Vashi, Navi Mumbai.",
  alternates: { canonical: "/contact" },
};

/**
 * Only details that are confirmed are rendered. A row with no value is left
 * out entirely rather than shown as "to be confirmed" - see lib/site.ts for the
 * fields still awaiting the clinic.
 */
export default function ContactPage() {
  return (
    <main className="flex-1 bg-brand-bone">
      <PageHero
        eyebrow="Contact"
        title="Two clinics, one standard."
        lead="Dr Bhagat’s World Class Aesthetics is in Goregaon East, Mumbai and Vashi, Navi Mumbai. Every plan begins with a consultation."
      />

      {LOCATIONS.map((location, index) => {
        const ground: Ground = index % 2 === 0 ? "bone" : "white";
        const rows = [
          location.phone
            ? { label: "Telephone", value: formatPhone(location.phone), href: `tel:${location.phone}` }
            : null,
          location.email
            ? { label: "Email", value: location.email, href: `mailto:${location.email}` }
            : null,
          location.openingHours ? { label: "Opening hours", value: location.openingHours.join(", ") } : null,
          location.mapsUrl ? { label: "Directions", value: "Open in Google Maps", href: location.mapsUrl } : null,
        ].filter((row): row is { label: string; value: string; href?: string } => row !== null);

        return (
          <Rail key={location.id} ground={ground} index={index + 1} title={location.name}>
            <Reveal>
              <address className="not-italic text-[1.1rem] leading-[1.8] text-brand-black">
                {location.streetAddress}
                <br />
                {location.locality}
                <br />
                {location.region} {location.postalCode}
              </address>

              {rows.length > 0 ? (
                <dl className="mt-12">
                  {rows.map((row) => (
                    <div key={row.label} className="border-t border-brand-gray-muted/30 py-6">
                      <dt className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark">
                        {row.label}
                      </dt>
                      <dd className="mt-3 text-[1rem] text-brand-black">
                        {row.href ? (
                          <a href={row.href} className="transition-colors hover:text-brand-champagne-dark">
                            {row.value}
                          </a>
                        ) : (
                          row.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              <div className="mt-12">
                <PrimaryLink href="/book">Book a Consultation</PrimaryLink>
              </div>
            </Reveal>
          </Rail>
        );
      })}
    </main>
  );
}
