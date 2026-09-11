import Image from "next/image";
import Link from "next/link";

import { FOOTER_NAV } from "@/lib/navigation";
import {
  BRAND,
  directionsHref,
  formatPhone,
  LOCATIONS,
  PHILOSOPHY_LINE,
  SOCIALS,
  TAGLINE,
  whatsappHref,
} from "@/lib/site";

const DETAIL_LINK =
  "inline-flex min-h-10 items-center text-[0.8rem] text-brand-cream transition-colors hover:text-brand-champagne-light";

/**
 * Contact details live here and on the booking page rather than in the main
 * navigation. Only confirmed details render; see lib/site.ts.
 */
export default function Footer() {
  return (
    <footer className="border-t border-brand-gray-muted/25 bg-brand-black">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Image
              src="/brand/logo-vertical-light.svg"
              alt={BRAND.name}
              width={144}
              height={95}
              className="h-20 w-auto"
            />
            <p className="mt-10 text-xl font-normal tracking-[0.01em] text-brand-cream">{TAGLINE}</p>
            <p className="mt-3 text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">
              {PHILOSOPHY_LINE}
            </p>
            <p className="mt-6 max-w-xs text-[0.8rem] leading-[1.7] text-brand-gray-muted">
              {BRAND.description}
            </p>
            <Link
              href="/book"
              className="mt-8 inline-flex min-h-11 items-end border-b border-brand-champagne pb-1.5 text-[0.65rem] uppercase tracking-widest text-brand-champagne-light transition-colors hover:text-brand-cream"
            >
              Book a Consultation
            </Link>
          </div>

          {FOOTER_NAV.map((group) => (
            <nav key={group.title} aria-label={group.title} className="lg:col-span-2">
              <p className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">
                {group.title}
              </p>
              <ul className="mt-5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-10 items-center text-[0.8rem] text-brand-gray-muted transition-colors hover:text-brand-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
            {LOCATIONS.map((location) => (
              <address key={location.id} className="not-italic">
                <p className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">
                  {location.name}
                </p>
                <p className="mt-5 text-[0.8rem] leading-[1.7] text-brand-gray-muted">
                  {location.streetAddress}
                  <br />
                  {location.locality}
                  <br />
                  {location.region} {location.postalCode}
                </p>
                {location.openingHours ? (
                  <p className="mt-3 text-[0.8rem] leading-[1.7] text-brand-gray-muted">
                    {location.openingHours.join(", ")}
                  </p>
                ) : null}
                <div className="mt-2 flex flex-wrap gap-x-6">
                  {location.phone ? (
                    <a href={`tel:${location.phone}`} className={DETAIL_LINK}>
                      {formatPhone(location.phone)}
                    </a>
                  ) : null}
                  {location.whatsapp ? (
                    <a href={whatsappHref(location.whatsapp)} className={DETAIL_LINK}>
                      WhatsApp
                    </a>
                  ) : null}
                  {location.email ? (
                    <a href={`mailto:${location.email}`} className={DETAIL_LINK}>
                      {location.email}
                    </a>
                  ) : null}
                  <a
                    href={directionsHref(location)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={DETAIL_LINK}
                  >
                    Directions
                  </a>
                </div>
              </address>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-brand-gray-muted/25 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.65rem] uppercase tracking-widest text-brand-gray-muted">
            &copy; {new Date().getFullYear()} {BRAND.legalName}
          </p>
          <ul className="flex gap-8">
            {Object.entries(SOCIALS).map(([name, href]) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center text-[0.65rem] uppercase tracking-widest text-brand-gray-muted transition-colors hover:text-brand-cream"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
