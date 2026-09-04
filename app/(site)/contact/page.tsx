import Link from "next/link";

import { BRAND, formatPhone, LOCATIONS } from "@/lib/site";

export const metadata = {
  title: "Contact",
  description: "Clinic locations in Mumbai and Navi Mumbai.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="flex-1 bg-brand-bone">
      <section className="bg-brand-black">
        <div className="mx-auto w-full max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
          <p className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">
            Contact
          </p>
          <h1 className="mt-10 max-w-3xl text-4xl font-normal leading-tight tracking-[0.01em] text-brand-white sm:text-5xl lg:text-6xl">
            Two clinics, one standard.
          </h1>
          <p className="mt-8 max-w-xl text-[0.95rem] font-normal leading-[1.75] text-brand-gray-muted">
            {BRAND.name} operates in Goregaon East, Mumbai and Vashi, Navi
            Mumbai.
          </p>
          <span className="mt-16 block h-px w-full bg-champagne-gradient" />
        </div>
      </section>

      <div className="divide-y divide-brand-gray-muted/25">
        {LOCATIONS.map((location, index) => (
          <section
            key={location.id}
            className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32"
          >
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
              <header className="lg:col-span-4">
                <span className="block text-xs font-light tracking-widest text-brand-champagne-dark">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-8 text-2xl font-normal uppercase tracking-widest text-brand-black lg:text-3xl">
                  {location.name}
                </h2>
                <span className="mt-8 block h-px w-16 bg-champagne-gradient" />
              </header>

              <div className="lg:col-span-7 lg:col-start-6">
                <address className="not-italic text-[1.05rem] font-normal leading-[1.7] text-brand-gray-text">
                  {location.streetAddress}
                  <br />
                  {location.locality}
                  <br />
                  {location.region} {location.postalCode}
                </address>

                <dl className="mt-12">
                  <div className="border-t border-brand-gray-muted/30 py-6">
                    <dt className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark">
                      Telephone
                    </dt>
                    <dd className="mt-3 text-[0.95rem] font-normal text-brand-black">
                      {location.phone ? (
                        <a
                          href={`tel:${location.phone}`}
                          className="transition-colors hover:text-brand-champagne-dark"
                        >
                          {formatPhone(location.phone)}
                        </a>
                      ) : (
                        // TODO(client): supply the number for the new premises.
                        <span className="text-brand-gray-text">
                          To be confirmed
                        </span>
                      )}
                    </dd>
                  </div>

                  <div className="border-t border-brand-gray-muted/30 py-6">
                    <dt className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark">
                      Opening hours
                    </dt>
                    <dd className="mt-3 text-[0.95rem] font-normal text-brand-gray-text">
                      {location.openingHours
                        ? location.openingHours.join(", ")
                        : "To be confirmed"}
                    </dd>
                  </div>
                </dl>

                <Link
                  href="/book"
                  className="mt-12 inline-block bg-champagne-gradient-deep px-10 py-5 text-[0.7rem] font-medium uppercase tracking-widest text-brand-white transition-opacity hover:opacity-90"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
