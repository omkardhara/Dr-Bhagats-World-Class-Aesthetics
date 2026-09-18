import { directionsHref, formatPhone, LOCATIONS, whatsappHref } from "@/lib/site";

const DETAIL_LINK =
  "inline-flex min-h-11 items-center text-brand-cream transition-colors hover:text-brand-champagne-light";

type Row = { label: string; value: string; href?: string };

/**
 * Each clinic's location, phone, WhatsApp, email and opening hours, on a black
 * ground. Shared by the Contact and booking pages. Only confirmed details are
 * shown: any field still null in lib/site.ts is simply left out.
 */
export default function ClinicDetails({ columns = 1 }: { columns?: 1 | 2 }) {
  return (
    <div className={`grid grid-cols-1 gap-14 ${columns === 2 ? "md:grid-cols-2 md:gap-16" : ""}`}>
      {LOCATIONS.map((location) => {
        const rows = [
          location.phone
            ? { label: "Phone", value: formatPhone(location.phone), href: `tel:${location.phone}` }
            : null,
          location.whatsapp
            ? { label: "WhatsApp", value: formatPhone(location.whatsapp), href: whatsappHref(location.whatsapp) }
            : null,
          location.email ? { label: "Email", value: location.email, href: `mailto:${location.email}` } : null,
          location.openingHours ? { label: "Opening hours", value: location.openingHours.join(", ") } : null,
        ].filter((row): row is Row => row !== null);

        return (
          <address key={location.id} className="not-italic">
            <p className="text-2xl font-normal tracking-[0.01em] text-brand-cream">{location.name}</p>
            <dl className="mt-6">
              <div className="border-t border-brand-gray-muted/25 py-5">
                <dt className="text-[0.65rem] uppercase tracking-widest text-brand-gray-muted">Location</dt>
                <dd className="mt-2 text-[0.9rem] leading-[1.7] text-brand-cream/85">
                  {location.streetAddress}, {location.locality}, {location.region} {location.postalCode}
                </dd>
                <dd className="mt-3 text-[0.8rem]">
                  <a
                    href={directionsHref(location)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${DETAIL_LINK} underline underline-offset-4`}
                  >
                    Directions
                  </a>
                </dd>
              </div>
              {rows.map((row) => (
                <div key={row.label} className="border-t border-brand-gray-muted/25 py-5">
                  <dt className="text-[0.65rem] uppercase tracking-widest text-brand-gray-muted">{row.label}</dt>
                  <dd className="mt-2 text-[0.95rem]">
                    {row.href ? (
                      <a href={row.href} className={DETAIL_LINK}>
                        {row.value}
                      </a>
                    ) : (
                      <span className="text-brand-cream/85">{row.value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </address>
        );
      })}
    </div>
  );
}
