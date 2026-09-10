import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import SanityPicture from "@/components/SanityPicture";
import { BeginConsultation, Eyebrow, PageHero, Prose, Rail, Rows, Section } from "@/components/ui";
import { SITE_URL } from "@/lib/site";
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
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps<"/concerns/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const concern = await getConcern(slug);
  if (!concern) return { title: "Your Concerns" };
  return {
    title: concern.title,
    description: concern.summary,
    alternates: { canonical: `/concerns/${concern.slug}` },
  };
}

/**
 * The page follows the patient journey literally: the concern is understood
 * and assessed first, the approach is described next, and technology is the
 * last thing introduced. Do not reorder these sections.
 */
export default async function ConcernPage({ params }: PageProps<"/concerns/[slug]">) {
  const { slug } = await params;
  const concern = await getConcern(slug);
  if (!concern) notFound();

  const url = `${SITE_URL}/concerns/${concern.slug}`;
  const faqs = concern.faqs ?? [];

  return (
    <main className="flex-1 bg-brand-bone">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "@id": `${url}#page`,
          url,
          name: concern.title,
          description: concern.summary,
          about: { "@type": "MedicalCondition", name: concern.title },
          publisher: { "@id": `${SITE_URL}/#organization` },
        }}
      />
      {faqs.length > 0 ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": `${url}#faq`,
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }}
        />
      ) : null}

      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Your Concerns", href: "/concerns" },
          { label: concern.title, href: `/concerns/${concern.slug}` },
        ]}
        title={concern.title}
        lead={concern.summary}
      />

      <SanityPicture image={concern.image} ratio="21/9" width={2400} priority sizes="100vw" />

      {concern.understanding ? (
        <Rail ground="bone" index={1} title="Understanding the concern">
          <Reveal>
            <Prose>{concern.understanding}</Prose>
          </Reveal>
        </Rail>
      ) : null}

      {concern.assessment ? (
        <Rail ground="white" index={2} title="How we assess it">
          <Reveal>
            <Prose ground="white">{concern.assessment}</Prose>
          </Reveal>
        </Rail>
      ) : null}

      {concern.approach ? (
        <Rail ground="bone" index={3} title="Our approach">
          <Reveal>
            <Prose>{concern.approach}</Prose>
            <p className="mt-10 max-w-xl border-l border-brand-champagne-dark pl-6 text-[0.95rem] leading-[1.8] text-brand-black">
              Every plan is personal. The programmes, approaches and technology below are options your
              doctor may draw on, decided after your assessment.
            </p>
          </Reveal>
        </Rail>
      ) : null}

      {concern.programmes?.length ? (
        <Rail ground="black" title="Signature programmes">
          <Rows
            ground="black"
            items={concern.programmes.map((programme) => ({
              key: programme._id,
              title: programme.title,
              detail: programme.summary,
              href: `/signature-programmes/${programme.slug}`,
            }))}
          />
        </Rail>
      ) : null}

      {concern.approaches?.length ? (
        <Rail ground="bone" title="Treatment approaches">
          <Rows
            items={concern.approaches.map((approach) => ({
              key: approach._id,
              title: approach.title,
              detail: approach.summary,
              href: `/treatment-approaches/${approach.slug}`,
            }))}
          />
        </Rail>
      ) : null}

      {concern.technologies?.length ? (
        <Rail ground="white" title="Technology that may be used">
          <Reveal>
            <Prose ground="white">
              Technology is selected by your doctor after assessment. It supports the plan; it is never
              the starting point.
            </Prose>
          </Reveal>
          <div className="mt-10">
            <Rows
              ground="white"
              items={concern.technologies.map((technology) => ({
                key: technology._id,
                title: technology.name,
                detail: technology.purpose,
                href: `/technology/${technology.slug}`,
              }))}
            />
          </div>
        </Rail>
      ) : null}

      {concern.relatedConditions?.length ? (
        <Rail ground="bone" title="Conditions we see">
          <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
            {concern.relatedConditions.map((condition) => (
              <li
                key={condition}
                className="border-t border-brand-gray-muted/30 py-5 text-[1.05rem] leading-[1.6] text-brand-black"
              >
                {condition}
              </li>
            ))}
          </ul>
        </Rail>
      ) : null}

      {faqs.length > 0 ? (
        <Rail ground="white" title="Questions">
          <dl>
            {faqs.map((faq) => (
              <div key={faq.question} className="border-t border-brand-gray-muted/30 py-8 first:border-t-0 first:pt-0">
                <dt className="text-[1.05rem] text-brand-black">{faq.question}</dt>
                <dd className="mt-4 max-w-xl text-[0.95rem] leading-[1.8] text-brand-gray-text">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </Rail>
      ) : null}

      {concern.others?.length ? (
        <Section ground="bone" className="border-t border-brand-gray-muted/20">
          <Eyebrow>Other concerns</Eyebrow>
          <ul className="mt-10 grid grid-cols-1 gap-x-12 sm:grid-cols-2 lg:grid-cols-4">
            {concern.others.map((other) => (
              <li key={other._id} className="border-t border-brand-gray-muted/30">
                <Link
                  href={`/concerns/${other.slug}`}
                  className="flex min-h-11 items-center py-5 text-[1rem] text-brand-black transition-colors hover:text-brand-champagne-dark"
                >
                  {other.title}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <BeginConsultation />
    </main>
  );
}
