import type { Metadata } from "next";

import BookForm, { type ConcernOption } from "@/components/BookForm";
import ClinicDetails from "@/components/ClinicDetails";
import { PHILOSOPHY_LINE } from "@/lib/site";
import { getClient } from "@/sanity/lib/client";
import { concernsQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Tell us what you'd like to improve. Our team will help you schedule a consultation with the appropriate dermatologist.",
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

/** Where the header's Consult button leads: the request form, with each clinic's details beside it. */
export default async function BookPage() {
  const concerns = await getConcerns();

  return (
    <main className="flex-1 bg-brand-black">
      <section className="mx-auto w-full max-w-7xl px-6 pb-20 pt-40 lg:px-10 lg:pb-20 lg:pt-44">
        <p className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">{PHILOSOPHY_LINE}</p>
        <h1 className="mt-10 max-w-4xl text-4xl font-normal leading-[1.08] tracking-[0.01em] text-brand-cream sm:text-5xl lg:text-7xl">
          Book a Consultation
        </h1>
        <p className="mt-10 max-w-xl text-[1.1rem] leading-[1.8] text-brand-gray-muted">
          Tell us what you’d like to improve. Our team will help you schedule a consultation with the
          appropriate dermatologist.
        </p>
        <span aria-hidden className="mt-16 block h-px w-full bg-champagne-gradient" />
      </section>

      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-20 px-6 pb-28 lg:grid-cols-12 lg:px-10 lg:pb-28">
        <div className="lg:col-span-7">
          <BookForm concerns={concerns} />
        </div>

        <aside
          id="clinic-details"
          aria-labelledby="clinic-details-heading"
          className="scroll-mt-28 lg:col-span-4 lg:col-start-9"
        >
          <h2
            id="clinic-details-heading"
            className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-light"
          >
            The clinics
          </h2>
          <div className="mt-10">
            <ClinicDetails />
          </div>
        </aside>
      </section>
    </main>
  );
}
