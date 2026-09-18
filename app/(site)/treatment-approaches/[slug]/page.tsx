import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import SanityPicture from "@/components/SanityPicture";
import { APPROACH_SHOTS } from "@/lib/shotList";
import { BeginConsultation, Eyebrow, PageHero, Prose, Rail, Rows, Section } from "@/components/ui";
import { formatDate, pad } from "@/lib/format";
import { programmeHref, technologyHref } from "@/lib/links";
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

/**
 * One of eight approaches, each organised around the patient's goal: concern,
 * assessment, personalised strategy, and only then technology. Every page opens
 * with its focus - what sets it apart from its neighbours - and closes by
 * pointing to the approaches a patient may be weighing it against, then the
 * next in the sequence, so the eight read as one philosophy.
 *
 * The doctors' order: 01 what the approach addresses, 02 what we assess,
 * 03 the possible treatment options, then 04 expectations, 05 downtime,
 * 06 when combinations are useful and 07 results and maintenance, before
 * 08 booking. Technology appears inside the treatment options - it is never
 * the strategy itself.
 */
export default async function ApproachPage({ params }: PageProps<"/treatment-approaches/[slug]">) {
  const { slug } = await params;
  const approach = await getApproach(slug);
  if (!approach) notFound();

  const url = `${SITE_URL}/treatment-approaches/${approach.slug}`;

  const sequence = approach.sequence ?? [];
  const position = sequence.findIndex((item) => item._id === approach._id);
  const next = position >= 0 && sequence.length > 1 ? sequence[(position + 1) % sequence.length] : null;
  const related = (approach.related ?? []).filter(
    (item): item is { _key: string; note?: string; approach: NonNullable<typeof item.approach> } =>
      Boolean(item.approach)
  );

  const outlook = [
    { title: "What should you realistically expect?", body: approach.expectations },
    { title: "Downtime and recovery", body: approach.downtime },
    { title: "When are combinations useful?", body: approach.combinations },
    { title: "Results and maintenance", body: approach.maintenance },
  ].filter((item): item is { title: string; body: string } => Boolean(item.body));

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
      >
        {position >= 0 ? (
          <p className="mt-10 text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">
            Treatment approach {pad(position + 1)} of {pad(sequence.length)}
          </p>
        ) : null}
      </PageHero>

      <SanityPicture
        image={approach.image}
        brief={APPROACH_SHOTS[approach.slug]}
        ratio="21/9"
        width={2400}
        priority
        sizes="100vw"
      />

      {approach.focus ? (
        <Section ground="white">
          <Reveal>
            <Eyebrow ground="white">What this approach is about</Eyebrow>
            <p className="mt-8 max-w-4xl text-2xl font-normal leading-[1.4] tracking-[0.01em] text-brand-black lg:text-3xl">
              {approach.focus}
            </p>
          </Reveal>
        </Section>
      ) : null}

      {approach.addresses?.length ? (
        <Rail ground="bone" index={1} title="What this approach addresses">
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
        <Rail ground="white" index={2} title="What we assess">
          <Rows
            ground="white"
            items={approach.considerations.map((consideration) => ({
              key: consideration,
              title: consideration,
            }))}
          />
        </Rail>
      ) : null}

      {approach.options || approach.modalities?.length ? (
        <Rail ground="bone" index={3} title="Possible treatment options">
          {approach.options ? (
            <Reveal>
              <Prose>{approach.options}</Prose>
            </Reveal>
          ) : null}
          {approach.modalities?.length ? (
            <div className="mt-12">
              <Eyebrow>What a plan may include</Eyebrow>
              <div className="mt-6">
                <Rows
                  items={approach.modalities.map((modality) => ({
                    key: modality._id,
                    title: modality.name,
                    detail: modality.description,
                  }))}
                />
              </div>
            </div>
          ) : null}
          {/* Technology sits inside the treatment strategy, never in place of it. */}
          {approach.technologies?.length ? (
            <div className="mt-12">
              <Eyebrow>Technology that may be used within the plan</Eyebrow>
              <p className="mt-4 max-w-xl text-[0.9rem] leading-[1.7] text-brand-gray-text">
                Selected by your doctor after assessment, and only where it is clinically appropriate.
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-8">
                {approach.technologies.map((technology) => (
                  <li key={technology._id}>
                    <Link
                      href={technologyHref(technology)}
                      className="inline-flex min-h-11 items-center text-[1rem] text-brand-black transition-colors hover:text-brand-champagne-dark"
                    >
                      {technology.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Rail>
      ) : null}

      {outlook.length > 0 ? (
        <Section ground="white">
          <ul className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-x-16">
            {outlook.map((item, index) => (
              <li key={item.title}>
                <Reveal index={index % 2}>
                  <span className="block text-xs tracking-widest text-brand-champagne-dark">
                    {pad(index + 4)}
                  </span>
                  <span aria-hidden className="mt-6 block h-px w-full bg-champagne-gradient" />
                  <h2 className="mt-8 text-xl font-normal leading-snug tracking-[0.01em] text-brand-black">
                    {item.title}
                  </h2>
                  <p className="mt-5 max-w-xl text-[0.98rem] leading-[1.8] text-brand-gray-text">
                    {item.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {related.length > 0 ? (
        <Rail ground="bone" title="If this is not quite your concern">
          <Rows
            items={related.map((item) => ({
              key: item._key,
              title: item.approach.title,
              detail: item.note,
              href: `/treatment-approaches/${item.approach.slug}`,
            }))}
          />
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

      {next ? (
        <nav aria-label="Next treatment approach" className="border-t border-brand-gray-muted/20 bg-brand-bone">
          <Link
            href={`/treatment-approaches/${next.slug}`}
            className="group mx-auto flex w-full max-w-7xl items-baseline justify-between gap-8 px-6 py-14 lg:px-10"
          >
            <span>
              <span className="block text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark">
                Next approach · {pad(((position + 1) % sequence.length) + 1)}
              </span>
              <span className="mt-4 block text-2xl font-normal tracking-[0.01em] text-brand-black transition-colors group-hover:text-brand-champagne-dark lg:text-3xl">
                {next.title}
              </span>
            </span>
            <span aria-hidden className="text-brand-champagne-dark">
              →
            </span>
          </Link>
        </nav>
      ) : null}

      <BeginConsultation />
    </main>
  );
}
