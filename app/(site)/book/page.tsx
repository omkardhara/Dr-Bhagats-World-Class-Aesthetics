import type { Metadata } from "next";

import BookForm, { type ConcernOption } from "@/components/BookForm";
import { directionsHref, formatPhone, LOCATIONS, PHILOSOPHY_LINE, whatsappHref } from "@/lib/site";
import { getClient } from "@/sanity/lib/client";
import { concernsQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Begin with a consultation. Tell us what you'd like to improve, and our team will help you schedule a consultation with the appropriate dermatologist.",
  alternates: { canonical: "/book" },
};

export const revalidate = 60;

async function getConcerns(): Promise<ConcernOption[]> {
  try {
    const concerns = await getClient().fetch<{ title: string; slug: string }[]>(concernsQuery);
    return concerns.map(({ title, slug }) => ({ title, slug }));
  } catch (error) {
    console.error("[book] Sanity fetch failed:", error);
    return [];
  }
}

const DETAIL_LINK = "text-brand-cream transition-colors hover:text-brand-champagne-light";

/**
 * The booking page is also the contact page: the doctors asked that it never
 * read as a map and a contact form. Only confirmed details are shown; any
 * field still null in lib/site.ts is simply left out.
 */
export default async function BookPage() {
  const concerns = await getConcerns();

  return (
    <main className="flex-1 bg-brand-black">
      <section className="mx-auto w-full max-w-7xl px-6 pb-20 pt-40 lg:px-10 lg:pb-24 lg:pt-52">
        <p className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">{PHILOSOPHY_LINE}</p>
        <h1 className="mt-10 max-w-4xl text-4xl font-normal leading-[1.08] tracking-[0.01em] text-brand-cream sm:text-5xl lg:text-7xl">
          Begin with a consultation.
        </h1>
        <p className="mt-10 max-w-xl text-[1.1rem] leading-[1.8] text-brand-gray-muted">
          Tell us what you’d like to improve. Our team will help you schedule a consultation with the
          appropriate dermatologist.
        </p>
        <span aria-hidden className="mt-16 block h-px w-full bg-champagne-gradient" />
      </section>

      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-20 px-6 pb-28 lg:grid-cols-12 lg:px-10 lg:pb-40">
        <div className="lg:col-span-7">
          <BookForm concerns={concerns} />
        </div>

        <aside
          id="clinic-details"
          aria-labelledby="clinic-details-heading"
          className="scroll-mt-28 lg:col-span-4 lg:col-start-9 xl:scroll-mt-40"
        >
          <h2
            id="clinic-details-heading"
            className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-light"
          >
            The clinics
          </h2>

          <div className="mt-10 flex flex-col gap-14">
            {LOCATIONS.map((location) => {
              const rows = [
                location.phone
                  ? { label: "Phone", value: formatPhone(location.phone), href: `tel:${location.phone}` }
                  : null,
                location.whatsapp
                  ? { label: "WhatsApp", value: formatPhone(location.whatsapp), href: whatsappHref(location.whatsapp) }
                  : null,
                location.email
                  ? { label: "Email", value: location.email, href: `mailto:${location.email}` }
                  : null,
                location.openingHours
                  ? { label: "Opening hours", value: location.openingHours.join(", ") }
                  : null,
              ].filter((row): row is { label: string; value: string; href?: string } => row !== null);

              return (
                <address key={location.id} className="not-italic">
                  <p className="text-2xl font-normal tracking-[0.01em] text-brand-cream">{location.name}</p>
                  <dl className="mt-6">
                    <div className="border-t border-brand-gray-muted/25 py-5">
                      <dt className="text-[0.6rem] uppercase tracking-widest text-brand-gray-muted">Location</dt>
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
                        <dt className="text-[0.6rem] uppercase tracking-widest text-brand-gray-muted">{row.label}</dt>
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
        </aside>
      </section>
    </main>
  );
}
