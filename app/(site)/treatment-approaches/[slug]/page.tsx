import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import SanityPicture from "@/components/SanityPicture";
import { BeginConsultation, Eyebrow, PageHero, Prose, Rail, Rows, Section } from "@/components/ui";
import { formatDate } from "@/lib/format";
import { technologyHref } from "@/lib/links";
import { programmeHref } from "@/lib/links";
import { SITE_URL } from "@/lib/site";
import { journalCategoryLabel } from "@/sanity/lib/categories";
import { getClient } from "@/sanity/lib/client";
import { approachBySlugQuery, approachSlugsQuery } from "@/sanity/lib/queries";
import type { Approach } from "@/sanity/lib/types";

export const revalidate = 60;

async function getApproach(slug: string): Promise<Approach | null> {
  try {
    return await getClient().fetch<Approach | null>(approachBySlugQuery, { slug });
  } catch (error) {
    console.error("[approach] Sanity fetch failed:", error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await getClient().fetch<string[]>(approachSlugsQuery);
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps<"/treatment-approaches/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const approach = await getApproach(slug);
  if (!approach) return { title: "Treatments" };
  return {
    title: approach.title,
    description: approach.summary,
    alternates: { canonical: `/treatment-approaches/${approach.slug}` },
  };
}

function Detail({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-brand-gray-muted/30 py-8 first:border-t-0 first:pt-0">
      <h3 className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark">{title}</h3>
      <div className="mt-5">{children}</div>
    </div>
  );
}

/**
 * Concise and useful, in the order a patient reads it: what this addresses,
 * what the doctor weighs up, what a plan may include, and then the practical
 * questions - expectations, recovery and how treatments combine. Deliberately
 * no FAQ section.
 */
export default async function ApproachPage({ params }: PageProps<"/treatment-approaches/[slug]">) {
  const { slug } = await params;
  const approach = await getApproach(slug);
  if (!approach) notFound();

  const url = `${SITE_URL}/treatment-approaches/${approach.slug}`;

  return (
    <main className="flex-1 bg-brand-bone">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "@id": `${url}#page`,
          url,
          name: approach.title,
          description: approach.summary,
          publisher: { "@id": `${SITE_URL}/#organization` },
        }}
      />

      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Treatments", href: "/treatment-approaches" },
          { label: approach.title, href: `/treatment-approaches/${approach.slug}` },
        ]}
        title={approach.title}
        lead={approach.summary}
      />

      <SanityPicture image={approach.image} ratio="21/9" width={2400} priority sizes="100vw" />

      {approach.addresses?.length ? (
        <Rail ground="bone" index={1} title="What it can address">
          <ul className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
            {approach.addresses.map((item, index) => (
              <li key={item} className="border-t border-brand-gray-muted/30 py-5">
                <Reveal index={index % 2}>
                  <span className="text-[1.05rem] leading-[1.6] text-brand-black">{item}</span>
                </Reveal>
              </li>
            ))}
          </ul>
          {approach.philosophy ? (
            <Reveal>
              <Prose className="mt-12">{approach.philosophy}</Prose>
            </Reveal>
          ) : null}
        </Rail>
      ) : null}

      {approach.considerations?.length ? (
        <Rail ground="white" index={2} title="What your doctor considers">
          <Rows
            ground="white"
            items={approach.considerations.map((consideration) => ({
              key: consideration,
              title: consideration,
            }))}
          />
        </Rail>
      ) : null}

      {approach.modalities?.length ? (
        <Rail ground="bone" index={3} title="What a plan may include">
          <Reveal>
            <Prose>
              A plan draws on some of the following, in the combination and order your doctor
              recommends after assessment.
            </Prose>
          </Reveal>
          <div className="mt-10">
            <Rows
              items={approach.modalities.map((modality) => ({
                key: modality._id,
                title: modality.name,
                detail: modality.description,
              }))}
            />
          </div>
        </Rail>
      ) : null}

      {approach.expectations || approach.downtime || approach.combinations ? (
        <Rail ground="white" index={4} title="What to expect">
          {approach.expectations ? (
            <Detail title="Realistic expectations">
              <p className="max-w-xl text-[1rem] leading-[1.8] text-brand-gray-text">
                {approach.expectations}
              </p>
            </Detail>
          ) : null}
          {approach.downtime ? (
            <Detail title="Downtime and recovery">
              <p className="max-w-xl text-[1rem] leading-[1.8] text-brand-gray-text">
                {approach.downtime}
              </p>
            </Detail>
          ) : null}
          {approach.combinations ? (
            <Detail title="How treatments may be combined">
              <p className="max-w-xl text-[1rem] leading-[1.8] text-brand-gray-text">
                {approach.combinations}
              </p>
            </Detail>
          ) : null}
        </Rail>
      ) : null}

      {approach.programmes?.length ? (
        <Rail ground="black" title="The Dr Bhagat’s Signature">
          <Rows
            ground="black"
            items={approach.programmes.map((programme) => ({
              key: programme._id,
              title: programme.title,
              detail: programme.tagline,
              href: programmeHref(programme.slug),
            }))}
          />
        </Rail>
      ) : null}

      {approach.concerns?.length ? (
        <Rail ground="bone" title="Concerns this approach addresses">
          <Rows
            items={approach.concerns.map((concern) => ({
              key: concern._id,
              title: concern.title,
              detail: concern.summary,
              href: `/concerns/${concern.slug}`,
            }))}
          />
        </Rail>
      ) : null}

      {approach.technologies?.length ? (
        <Rail ground="white" title="Technology that may be used">
          <Reveal>
            <Prose ground="white">
              Technology is selected by your doctor after assessment, and only where it is clinically
              appropriate.
            </Prose>
          </Reveal>
          <div className="mt-10">
            <Rows
              ground="white"
              items={approach.technologies.map((technology) => ({
                key: technology._id,
                title: technology.name,
                detail: technology.purpose,
                href: technologyHref(technology),
              }))}
            />
          </div>
        </Rail>
      ) : null}

      {approach.articles?.length ? (
        <Section ground="bone" className="border-t border-brand-gray-muted/20">
          <Eyebrow>From the Journal</Eyebrow>
          <ul className="mt-12 grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2">
            {approach.articles.map((article, index) => (
              <li key={article._id} className="border-t border-brand-gray-muted/30 pt-8">
                <Reveal index={index}>
                  <Link href={`/journal/${article.slug}`} className="group block">
                    <span className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark">
                      {journalCategoryLabel(article.category) || "Journal"} ·{" "}
                      {formatDate(article.publishedAt)}
                    </span>
                    <h3 className="mt-5 text-xl font-normal leading-[1.3] tracking-[0.01em] text-brand-black transition-colors group-hover:text-brand-champagne-dark">
                      {article.title}
                    </h3>
                    {article.excerpt ? (
                      <p className="mt-4 text-[0.95rem] leading-[1.75] text-brand-gray-text">
                        {article.excerpt}
                      </p>
                    ) : null}
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <BeginConsultation />
    </main>
  );
}
