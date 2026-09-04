import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import EditorialImage from "@/components/EditorialImage";
import { SITE_URL } from "@/lib/site";
import { stockForCategory } from "@/lib/stockImages";
import { getClient } from "@/sanity/lib/client";
import { concernBySlugQuery, concernSlugsQuery } from "@/sanity/lib/queries";
import type { Concern } from "@/sanity/lib/types";

export const revalidate = 60;

async function getConcern(slug: string): Promise<Concern | null> {
  try {
    return await getClient().fetch<Concern | null>(concernBySlugQuery, { slug });
  } catch (error) {
    console.error("[concern] Sanity fetch failed:", error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await getClient().fetch<string[]>(concernSlugsQuery);
    return slugs.map((slug) => ({ slug }));
  } catch {
    // Fall back to on-demand rendering rather than failing the build.
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps<"/concerns/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const concern = await getConcern(slug);
  if (!concern) return { title: "Concern" };

  return {
    title: concern.title,
    description:
      concern.summary ?? `Treatment options for ${concern.title.toLowerCase()}.`,
    alternates: { canonical: `/concerns/${concern.slug}` },
  };
}

export default async function ConcernPage({
  params,
}: PageProps<"/concerns/[slug]">) {
  const { slug } = await params;
  const concern = await getConcern(slug);

  if (!concern) notFound();

  const faqs = concern.faqs ?? [];

  return (
    <main className="flex-1 bg-brand-white">
      {faqs.length > 0 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "@id": `${SITE_URL}/concerns/${concern.slug}#faq`,
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            }),
          }}
        />
      ) : null}

      <section className="bg-brand-black">
        <div className="mx-auto w-full max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
          <Link
            href="/concerns"
            className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-light transition-colors hover:text-brand-cream"
          >
            {concern.category} concerns
          </Link>
          <h1 className="mt-10 max-w-3xl text-4xl font-light leading-tight tracking-tight text-brand-white sm:text-5xl lg:text-6xl">
            {concern.title}
          </h1>
          {concern.summary ? (
            <p className="mt-8 max-w-xl text-sm font-light leading-loose text-brand-gray-muted">
              {concern.summary}
            </p>
          ) : null}
          <span className="mt-16 block h-px w-full bg-champagne-gradient" />
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-6 pt-24 lg:px-10 lg:pt-32">
        <EditorialImage fallback={stockForCategory(concern.category)} />
      </div>

      <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          <header className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h2 className="text-2xl font-light uppercase tracking-widest text-brand-black lg:text-3xl">
                How we treat it
              </h2>
              <span className="mt-8 block h-px w-16 bg-champagne-gradient" />
            </div>
          </header>

          <div className="lg:col-span-7 lg:col-start-6">
            {concern.description ? (
              <p className="max-w-xl text-base font-light leading-loose text-brand-gray-text">
                {concern.description}
              </p>
            ) : (
              <p className="max-w-xl text-base font-light leading-loose text-brand-gray-text">
                {/* PLACEHOLDER: needs clinical copy per concern. */}
                Clinical detail for this concern has not been written yet.
              </p>
            )}

            {concern.treatments && concern.treatments.length > 0 ? (
              <ul className="mt-16">
                {concern.treatments.map((treatment) => (
                  <li
                    key={treatment._id}
                    className="border-t border-brand-gray-muted/30 py-10"
                  >
                    <h3 className="text-lg font-light tracking-wide text-brand-black">
                      {treatment.slug ? (
                        <Link
                          href={`/services/${treatment.slug}`}
                          className="transition-colors hover:text-brand-champagne-dark"
                        >
                          {treatment.name}
                        </Link>
                      ) : (
                        treatment.name
                      )}
                    </h3>
                    {treatment.description ? (
                      <p className="mt-4 max-w-xl text-sm font-light leading-loose text-brand-gray-text">
                        {treatment.description}
                      </p>
                    ) : null}
                    {treatment.machines && treatment.machines.length > 0 ? (
                      <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark">
                        {treatment.machines.map((machine, index) => (
                          <span key={machine._id} className="flex items-center gap-x-3">
                            {index > 0 ? (
                              <span aria-hidden className="h-3 w-px bg-brand-gray-muted/40" />
                            ) : null}
                            {machine.name}
                          </span>
                        ))}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : null}

            {faqs.length > 0 ? (
              <div className="mt-20">
                <h2 className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark">
                  Questions
                </h2>
                <dl className="mt-10">
                  {faqs.map((faq) => (
                    <div
                      key={faq.question}
                      className="border-t border-brand-gray-muted/30 py-8"
                    >
                      <dt className="text-base font-light text-brand-black">
                        {faq.question}
                      </dt>
                      <dd className="mt-4 max-w-xl text-sm font-light leading-loose text-brand-gray-text">
                        {faq.answer}
                      </dd>
                    </div>
                  ))}
                </dl>
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
