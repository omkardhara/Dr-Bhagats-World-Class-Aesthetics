import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import SanityPicture from "@/components/SanityPicture";
import { CONCERN_SHOTS } from "@/lib/shotList";
import {
  BeginConsultation,
  Eyebrow,
  PageHero,
  Prose,
  Rail,
  Rows,
  Section,
  TextLink,
} from "@/components/ui";
import { formatDate } from "@/lib/format";
import { programmeHref, technologyHref } from "@/lib/links";
import { SITE_URL } from "@/lib/site";
import { journalCategoryLabel } from "@/sanity/lib/categories";
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
 * The doctors' flow, followed literally: the concern, understanding, how we
 * assess it, your treatment approach, possible treatments and technologies,
 * results and expectations, then a consultation. The concern always comes
 * before the technology - do not reorder these sections.
 */
export default async function ConcernPage({ params }: PageProps<"/concerns/[slug]">) {
  const { slug } = await params;
  const concern = await getConcern(slug);
  if (!concern) notFound();

  const url = `${SITE_URL}/concerns/${concern.slug}`;
  const faqs = concern.faqs ?? [];
  const hasOptions = Boolean(
    concern.programmes?.length || concern.approaches?.length || concern.technologies?.length
  );

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
          { label: "Concerns", href: "/concerns" },
          { label: concern.title, href: `/concerns/${concern.slug}` },
        ]}
        title={concern.title}
        lead={concern.summary}
      />

      <SanityPicture
        image={concern.image}
        brief={CONCERN_SHOTS[concern.slug]}
        ratio="21/9"
        width={2400}
        priority
        sizes="100vw"
      />

      {concern.experience || concern.relatedConditions?.length ? (
        <Rail ground="bone" index={1} title="The concern">
          {concern.experience ? (
            <Reveal>
              <Prose>{concern.experience}</Prose>
            </Reveal>
          ) : null}
          {concern.relatedConditions?.length ? (
            <div className={concern.experience ? "mt-12" : ""}>
              <Eyebrow>What patients often describe</Eyebrow>
              <ul className="mt-6 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                {concern.relatedConditions.map((condition) => (
                  <li
                    key={condition}
                    className="border-t border-brand-gray-muted/30 py-4 text-[1.02rem] leading-[1.6] text-brand-black"
                  >
                    {condition}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Rail>
      ) : null}

      {concern.understanding ? (
        <Rail ground="white" index={2} title="Understanding">
          <Reveal>
            <Prose ground="white">{concern.understanding}</Prose>
          </Reveal>
        </Rail>
      ) : null}

      {concern.assessment ? (
        <Rail ground="bone" index={3} title="How we assess it">
          <Reveal>
            <Prose>{concern.assessment}</Prose>
          </Reveal>
        </Rail>
      ) : null}

      {concern.approach ? (
        <Rail ground="white" index={4} title="Your treatment approach">
          <Reveal>
            <Prose ground="white">{concern.approach}</Prose>
          </Reveal>
        </Rail>
      ) : null}

      {/* Only now are treatments and technology introduced. */}
      {hasOptions ? (
        <Rail ground="bone" index={5} title="Possible treatments and technologies">
          {concern.selection ? (
            <Reveal>
              <p className="max-w-xl border-l border-brand-champagne-dark pl-6 text-[1.05rem] leading-[1.75] text-brand-black">
                {concern.selection}
              </p>
            </Reveal>
          ) : null}

          {concern.programmes?.length ? (
            <div className="mt-12">
              <Eyebrow>The Dr Bhagat’s Signature</Eyebrow>
              <div className="mt-4">
                <Rows
                  items={concern.programmes.map((programme) => ({
                    key: programme._id,
                    title: programme.title,
                    detail: programme.tagline,
                    href: programmeHref(programme.slug),
                  }))}
                />
              </div>
            </div>
          ) : null}

          {concern.approaches?.length ? (
            <div className="mt-12">
              <Eyebrow>Treatment approaches</Eyebrow>
              <div className="mt-4">
                <Rows
                  items={concern.approaches.map((approach) => ({
                    key: approach._id,
                    title: approach.title,
                    detail: approach.summary,
                    href: `/treatment-approaches/${approach.slug}`,
                  }))}
                />
              </div>
            </div>
          ) : null}

          {concern.technologies?.length ? (
            <div className="mt-12">
              <Eyebrow>Technology that may be used</Eyebrow>
              <p className="mt-4 max-w-xl text-[0.9rem] leading-[1.7] text-brand-gray-text">
                Selected by your doctor after assessment. It supports the plan; it is never the
                starting point.
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-8">
                {concern.technologies.map((technology) => (
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

      {concern.expectations ? (
        <Rail ground="white" index={6} title="Results and expectations">
          <Reveal>
            <Prose ground="white">{concern.expectations}</Prose>
            <div className="mt-12">
              <TextLink href="/book" ground="white">
                Book a consultation →
              </TextLink>
            </div>
          </Reveal>
        </Rail>
      ) : null}

      {faqs.length > 0 ? (
        <Rail ground="bone" title="Questions">
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

      {concern.articles?.length ? (
        <Section ground="bone" className="border-t border-brand-gray-muted/20">
          <Eyebrow>From the Journal</Eyebrow>
          <ul className="mt-12 grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2">
            {concern.articles.map((article, index) => (
              <li key={article._id} className="border-t border-brand-gray-muted/30 pt-8">
                <Reveal index={index}>
                  <Link href={`/journal/${article.slug}`} className="group block">
                    <span className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark">
                      {journalCategoryLabel(article.category) || "Journal"} ·{" "}
                      {formatDate(article.publishedAt)}
                    </span>
                    <h2 className="mt-5 text-xl font-normal leading-[1.3] tracking-[0.01em] text-brand-black transition-colors group-hover:text-brand-champagne-dark">
                      {article.title}
                    </h2>
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
