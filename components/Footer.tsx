import Link from "next/link";

import { BRAND, formatPhone, LOCATIONS, SOCIALS } from "@/lib/site";

const NAV = [
  { label: "Technology", href: "/technology" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Book Consultation", href: "/book" },
];

export default function Footer() {
  return (
    <footer className="border-t border-brand-gray-muted/25 bg-brand-black">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="text-sm font-light uppercase tracking-widest text-brand-cream">
              {BRAND.name}
            </p>
            <p className="mt-6 max-w-xs text-xs font-light leading-loose text-brand-gray-muted">
              {BRAND.description}
            </p>
          </div>

          {LOCATIONS.map((location) => (
            <address
              key={location.id}
              className="not-italic lg:col-span-3"
            >
              <p className="text-[0.65rem] uppercase tracking-widest text-brand-champagne">
                {location.name}
              </p>
              <p className="mt-6 text-xs font-light leading-loose text-brand-gray-muted">
                {location.streetAddress}
                <br />
                {location.locality}
                <br />
                {location.region} {location.postalCode}
              </p>
              {location.phone ? (
                <a
                  href={`tel:${location.phone}`}
                  className="mt-4 inline-block text-xs font-light text-brand-cream transition-colors hover:text-brand-champagne-light"
                >
                  {formatPhone(location.phone)}
                </a>
              ) : null}
            </address>
          ))}

          <nav className="lg:col-span-2" aria-label="Footer">
            <p className="text-[0.65rem] uppercase tracking-widest text-brand-champagne">
              Explore
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs font-light text-brand-gray-muted transition-colors hover:text-brand-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
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
                  className="text-[0.65rem] uppercase tracking-widest text-brand-gray-muted transition-colors hover:text-brand-champagne-light"
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
