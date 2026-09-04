import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import EditorialImage from "@/components/EditorialImage";
import { stockForSlug } from "@/lib/stockImages";
import { imageProps } from "@/sanity/lib/image";
import { getClient } from "@/sanity/lib/client";
import { treatmentBySlugQuery, treatmentSlugsQuery } from "@/sanity/lib/queries";
import type { TreatmentDetail } from "@/sanity/lib/types";

export const revalidate = 60;

async function getTreatment(slug: string): Promise<TreatmentDetail | null> {
  try {
    return await getClient().fetch<TreatmentDetail | null>(
      treatmentBySlugQuery,
      { slug }
    );
  } catch (error) {
    console.error("[treatment] Sanity fetch failed:", error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await getClient().fetch<string[]>(treatmentSlugsQuery);
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const treatment = await getTreatment(slug);
  if (!treatment) return { title: "Treatment" };

  return {
    title: treatment.name,
    description: treatment.description,
    alternates: { canonical: `/services/${treatment.slug}` },
  };
}

export default async function TreatmentPage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const treatment = await getTreatment(slug);

  if (!treatment) notFound();

  return (
    <main className="flex-1 bg-brand-bone">
      <section className="bg-brand-black">
        <div className="mx-auto w-full max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
          <Link
            href="/services"
            className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-light transition-colors hover:text-brand-cream"
          >
            {treatment.service?.title ?? "Services"}
          </Link>
          <h1 className="mt-10 max-w-3xl text-4xl font-normal leading-tight tracking-[0.01em] text-brand-white sm:text-5xl lg:text-6xl">
            {treatment.name}
          </h1>
          {treatment.description ? (
            <p className="mt-8 max-w-xl text-[0.95rem] font-normal leading-[1.75] text-brand-gray-muted">
              {treatment.description}
            </p>
          ) : null}
          <span className="mt-16 block h-px w-full bg-champagne-gradient" />
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-6 pt-24 lg:px-10 lg:pt-32">
        <EditorialImage
          fallback={stockForSlug(treatment.slug)}
          sanity={imageProps(treatment.image)}
        />
      </div>

      <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          <header className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h2 className="text-2xl font-normal uppercase tracking-widest text-brand-black lg:text-3xl">
                Platforms
              </h2>
              <span className="mt-8 block h-px w-16 bg-champagne-gradient" />
            </div>
          </header>

          <div className="lg:col-span-7 lg:col-start-6">
            {treatment.machines && treatment.machines.length > 0 ? (
              <ul>
                {treatment.machines.map((machine) => (
                  <li
                    key={machine._id}
                    className="border-t border-brand-gray-muted/30 py-10 first:border-t-0 first:pt-0"
                  >
                    <h3 className="text-[0.7rem] uppercase tracking-widest text-brand-champagne-dark">
                      {machine.name}
                    </h3>
                    {machine.description ? (
                      <p className="mt-4 max-w-xl text-[0.95rem] font-normal leading-[1.75] text-brand-gray-text">
                        {machine.description}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[0.95rem] font-normal leading-[1.75] text-brand-gray-text">
                This treatment is delivered without a device platform.
              </p>
            )}

            {treatment.concerns && treatment.concerns.length > 0 ? (
              <div className="mt-20">
                <h2 className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark">
                  Addresses
                </h2>
                <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-3">
                  {treatment.concerns.map((concern) => (
                    <li key={concern._id}>
                      <Link
                        href={`/concerns/${concern.slug}`}
                        className="border-b border-brand-champagne-light pb-1 text-xs font-light text-brand-champagne-dark transition-colors hover:text-brand-black"
                      >
                        {concern.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <Link
              href="/book"
              className="mt-16 inline-block bg-champagne-gradient-deep px-10 py-5 text-[0.7rem] font-medium uppercase tracking-widest text-brand-white transition-opacity hover:opacity-90"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
