import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import JsonLd from "@/components/JsonLd";
import PortableTextBody from "@/components/PortableTextBody";
import Reveal from "@/components/Reveal";
import SanityPicture from "@/components/SanityPicture";
import { Eyebrow, PageHero, Section, TextLink } from "@/components/ui";
import { formatDate } from "@/lib/format";
import { BRAND, SITE_URL } from "@/lib/site";
import { journalCategoryLabel } from "@/sanity/lib/categories";
import { getClient } from "@/sanity/lib/client";
import { journalBySlugQuery, journalSlugsQuery } from "@/sanity/lib/queries";
import type { Article } from "@/sanity/lib/types";

export const revalidate = 60;

async function getArticle(slug: string): Promise<Article | null> {
  try {
    return await getClient().fetch<Article | null>(journalBySlugQuery, { slug });
  } catch (error) {
    console.error("[article] Sanity fetch failed:", error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await getClient().fetch<string[]>(journalSlugsQuery);
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Journal" };
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/journal/${article.slug}` },
    openGraph: { type: "article", publishedTime: article.publishedAt },
  };
}

/**
 * The article, then the journey the doctors asked for: article -> concern ->
 * treatment -> consultation, offered quietly. No consultation block is stacked
 * at the end of every piece.
 */
export default async function ArticlePage({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const url = `${SITE_URL}/journal/${article.slug}`;
  const author = article.doctor?.name ?? BRAND.name;

  return (
    <main className="flex-1 bg-brand-bone">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          "@id": `${url}#article`,
          headline: article.title,
          description: article.excerpt,
          articleSection: journalCategoryLabel(article.category) || undefined,
          datePublished: article.publishedAt,
          dateModified: article._updatedAt,
          mainEntityOfPage: url,
          author: article.doctor
            ? { "@type": "Person", name: article.doctor.name }
            : { "@id": `${SITE_URL}/#organization` },
          publisher: { "@id": `${SITE_URL}/#organization` },
        }}
      />

      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Journal", href: "/journal" },
          { label: article.title, href: `/journal/${article.slug}` },
        ]}
        title={article.title}
        lead={article.excerpt}
      >
        <p className="mt-10 text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">
          {journalCategoryLabel(article.category) || "Journal"} · {formatDate(article.publishedAt)} ·{" "}
          {author}
        </p>
      </PageHero>

      <SanityPicture image={article.image} ratio="21/9" width={2400} priority sizes="100vw" />

      {article.body?.length ? (
        <Section ground="bone">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <article className="lg:col-span-7 lg:col-start-4">
              <PortableTextBody value={article.body} />
            </article>
          </div>
        </Section>
      ) : null}

      {/* Where to go next, in the order the doctors described. */}
      {article.concern || article.approach ? (
        <Section ground="white" className="border-t border-brand-gray-muted/20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow ground="white">If this sounds familiar</Eyebrow>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              {article.concern ? (
                <Reveal>
                  <Link href={`/concerns/${article.concern.slug}`} className="group block">
                    <h2 className="text-2xl font-normal tracking-[0.01em] text-brand-black transition-colors group-hover:text-brand-champagne-dark lg:text-3xl">
                      {article.concern.title}
                    </h2>
                    {article.concern.summary ? (
                      <p className="mt-4 max-w-xl text-[1rem] leading-[1.8] text-brand-gray-text">
                        {article.concern.summary}
                      </p>
                    ) : null}
                  </Link>
                </Reveal>
              ) : null}
              <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6">
                {article.approach ? (
                  <TextLink href={`/treatment-approaches/${article.approach.slug}`} ground="white">
                    Explore the treatment →
                  </TextLink>
                ) : null}
                <TextLink href="/book" ground="white">
                  Begin with a consultation →
                </TextLink>
              </div>
            </div>
          </div>
        </Section>
      ) : null}

      {article.others?.length ? (
        <Section ground="bone" className="border-t border-brand-gray-muted/20">
          <Eyebrow>Further reading</Eyebrow>
          <ul className="mt-12 grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2">
            {article.others.map((other, index) => (
              <li key={other._id} className="border-t border-brand-gray-muted/30 pt-8">
                <Reveal index={index}>
                  <Link href={`/journal/${other.slug}`} className="group block">
                    <span className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark">
                      {journalCategoryLabel(other.category) || "Journal"}
                    </span>
                    <h3 className="mt-5 text-xl font-normal leading-[1.3] tracking-[0.01em] text-brand-black transition-colors group-hover:text-brand-champagne-dark">
                      {other.title}
                    </h3>
                    {other.excerpt ? (
                      <p className="mt-4 text-[0.95rem] leading-[1.75] text-brand-gray-text">
                        {other.excerpt}
                      </p>
                    ) : null}
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </main>
  );
}
