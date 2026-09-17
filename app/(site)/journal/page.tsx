import type { Metadata } from "next";
import Link from "next/link";

import Reveal from "@/components/Reveal";
import SanityPicture from "@/components/SanityPicture";
import { Eyebrow, PageHero, Section, TextLink } from "@/components/ui";
import { formatDate } from "@/lib/format";
import { JOURNAL_CATEGORIES, journalCategoryLabel } from "@/sanity/lib/categories";
import { getClient } from "@/sanity/lib/client";
import { journalQuery } from "@/sanity/lib/queries";
import type { ArticleSummary } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Thoughts on skin, ageing, aesthetics and the art of looking well, from the dermatologists at Dr Bhagat's.",
  alternates: { canonical: "/journal" },
};

export const revalidate = 60;

async function getArticles(): Promise<ArticleSummary[]> {
  try {
    return await getClient().fetch<ArticleSummary[]>(journalQuery);
  } catch (error) {
    console.error("[journal] Sanity fetch failed:", error);
    return [];
  }
}

function Meta({ article, className = "" }: { article: ArticleSummary; className?: string }) {
  return (
    <p className={`text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark ${className}`}>
      {article.category ? journalCategoryLabel(article.category) : "Journal"}
      <span className="text-brand-gray-text"> · {formatDate(article.publishedAt)}</span>
    </p>
  );
}

/**
 * Editorial rather than a blog: one article leads the page, and the rest run in
 * a rhythm of wide and paired entries so no two rows read the same. Categories
 * are present but quiet - they organise the writing without becoming a filter
 * bar across the top of the page.
 */
export default async function JournalPage({ searchParams }: PageProps<"/journal">) {
  const [articles, params] = await Promise.all([getArticles(), searchParams]);

  const requested = typeof params.category === "string" ? params.category : undefined;
  const used = JOURNAL_CATEGORIES.filter((category) =>
    articles.some((article) => article.category === category.value)
  );
  const active = used.some((category) => category.value === requested) ? requested : undefined;

  const shown = active ? articles.filter((article) => article.category === active) : articles;
  const featured = shown.find((article) => article.featured) ?? shown[0];
  const rest = shown.filter((article) => article._id !== featured?._id);

  // A wide entry, then a pair: the alternation is what keeps the page editorial.
  const rows: ArticleSummary[][] = [];
  for (let index = 0; index < rest.length; index += 3) {
    rows.push(rest.slice(index, index + 3));
  }

  return (
    <main className="flex-1 bg-brand-bone">
      <PageHero
        eyebrow="Journal"
        title="Thoughts on skin, ageing, aesthetics and the art of looking well."
      />

      {used.length > 1 ? (
        <nav aria-label="Journal categories" className="border-b border-brand-gray-muted/20 bg-brand-bone">
          <ul className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-x-8 px-6 py-4 lg:px-10">
            <li>
              <Link
                href="/journal"
                aria-current={active ? undefined : "page"}
                className={`inline-flex min-h-11 items-center text-[0.65rem] uppercase tracking-widest transition-colors hover:text-brand-black ${
                  active ? "text-brand-gray-text" : "text-brand-black"
                }`}
              >
                All
              </Link>
            </li>
            {used.map((category) => (
              <li key={category.value}>
                <Link
                  href={`/journal?category=${category.value}`}
                  aria-current={active === category.value ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center text-[0.65rem] uppercase tracking-widest transition-colors hover:text-brand-black ${
                    active === category.value ? "text-brand-black" : "text-brand-gray-text"
                  }`}
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      {featured ? (
        <Section ground="bone">
          <Reveal>
            <Link href={`/journal/${featured.slug}`} className="group block">
              <SanityPicture
                image={featured.image}
                ratio="21/9"
                width={2400}
                priority
                sizes="(min-width: 1024px) 80rem, 100vw"
                className="mb-14"
              />
              <Meta article={featured} />
              <h2 className="mt-8 max-w-5xl text-4xl font-normal leading-[1.08] tracking-[0.005em] text-brand-black transition-colors group-hover:text-brand-champagne-dark sm:text-5xl lg:text-6xl">
                {featured.title}
              </h2>
              {featured.excerpt ? (
                <p className="mt-10 max-w-2xl text-[1.15rem] leading-[1.8] text-brand-gray-text">
                  {featured.excerpt}
                </p>
              ) : null}
              <span className="mt-10 inline-flex min-h-11 items-end border-b border-brand-champagne-dark pb-1.5 text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark transition-colors group-hover:text-brand-black">
                Read the article
              </span>
            </Link>
          </Reveal>
        </Section>
      ) : null}

      {rows.map((row, rowIndex) => {
        const [wide, ...pair] = row;
        return (
          <Section
            key={wide._id}
            ground={rowIndex % 2 === 0 ? "white" : "bone"}
            className="border-t border-brand-gray-muted/20"
          >
            <Reveal>
              <Link href={`/journal/${wide.slug}`} className="group grid grid-cols-1 gap-10 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <Meta article={wide} />
                </div>
                <div className="lg:col-span-8">
                  <h2 className="text-3xl font-normal leading-[1.15] tracking-[0.005em] text-brand-black transition-colors group-hover:text-brand-champagne-dark lg:text-4xl">
                    {wide.title}
                  </h2>
                  {wide.excerpt ? (
                    <p className="mt-6 max-w-2xl text-[1.05rem] leading-[1.8] text-brand-gray-text">
                      {wide.excerpt}
                    </p>
                  ) : null}
                </div>
              </Link>
            </Reveal>

            {pair.length > 0 ? (
              <ul className="mt-20 grid grid-cols-1 gap-x-16 gap-y-16 md:grid-cols-2">
                {pair.map((article, index) => (
                  <li key={article._id} className="border-t border-brand-gray-muted/30 pt-10">
                    <Reveal index={index}>
                      <Link href={`/journal/${article.slug}`} className="group block">
                        <SanityPicture
                          image={article.image}
                          ratio="4/3"
                          sizes="(min-width: 768px) 40vw, 100vw"
                          className="mb-8"
                        />
                        <Meta article={article} />
                        <h3 className="mt-6 text-2xl font-normal leading-[1.25] tracking-[0.01em] text-brand-black transition-colors group-hover:text-brand-champagne-dark">
                          {article.title}
                        </h3>
                        {article.excerpt ? (
                          <p className="mt-4 text-[0.95rem] leading-[1.8] text-brand-gray-text">
                            {article.excerpt}
                          </p>
                        ) : null}
                      </Link>
                    </Reveal>
                  </li>
                ))}
              </ul>
            ) : null}
          </Section>
        );
      })}

      {/* Quiet, as the doctors asked: an invitation rather than a call to action. */}
      <Section ground="black">
        <div className="max-w-2xl">
          <Eyebrow ground="black">Your concern</Eyebrow>
          <p className="mt-8 text-2xl font-normal leading-[1.35] text-brand-cream lg:text-3xl">
            If something here sounds like your own skin, the next step is understanding what is
            actually happening.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
            <TextLink href="/concerns" ground="black">
              Explore your concerns →
            </TextLink>
            <TextLink href="/book" ground="black">
              Begin with a consultation →
            </TextLink>
          </div>
        </div>
      </Section>
    </main>
  );
}
