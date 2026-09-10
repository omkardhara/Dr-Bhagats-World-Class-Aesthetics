import type { Metadata } from "next";
import { notFound } from "next/navigation";

import JsonLd from "@/components/JsonLd";
import PortableTextBody from "@/components/PortableTextBody";
import SanityPicture from "@/components/SanityPicture";
import { BeginConsultation, PageHero, Rail, Rows, Section } from "@/components/ui";
import { formatDate } from "@/lib/format";
import { BRAND, SITE_URL } from "@/lib/site";
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
          {formatDate(article.publishedAt)} · {author}
        </p>
      </PageHero>

      <SanityPicture image={article.image} ratio="21/9" width={2400} priority sizes="100vw" />

      {article.body?.length ? (
        <Section ground="bone">
          <div className="max-w-3xl lg:ml-[33.333%]">
            <PortableTextBody value={article.body} />
          </div>
        </Section>
      ) : null}

      {article.concern ? (
        <Rail ground="white" title="Related concern">
          <Rows
            ground="white"
            items={[
              {
                key: article.concern.slug,
                title: article.concern.title,
                detail: (article.concern as { summary?: string }).summary,
                href: `/concerns/${article.concern.slug}`,
              },
            ]}
          />
        </Rail>
      ) : null}

      {article.others?.length ? (
        <Rail ground="bone" title="Further reading">
          <Rows
            items={article.others.map((other) => ({
              key: other._id,
              title: other.title,
              detail: other.excerpt,
              href: `/journal/${other.slug}`,
            }))}
          />
        </Rail>
      ) : null}

      <BeginConsultation />
    </main>
  );
}
