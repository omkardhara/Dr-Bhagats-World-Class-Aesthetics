import type { Metadata } from "next";
import Link from "next/link";

import Reveal from "@/components/Reveal";
import { BeginConsultation, PageHero, Section } from "@/components/ui";
import { formatDate } from "@/lib/format";
import { BRAND } from "@/lib/site";
import { getClient } from "@/sanity/lib/client";
import { journalQuery } from "@/sanity/lib/queries";
import type { ArticleSummary } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Journal",
  description: "Insight on skin, ageing and treatment from Dr Bhagat's World Class Aesthetics.",
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

export default async function JournalPage() {
  const articles = await getArticles();

  return (
    <main className="flex-1 bg-brand-bone">
      <PageHero
        eyebrow="Journal"
        title="Considered perspectives."
        lead="Insight on skin, ageing and treatment from Dr Bhagat’s."
      />

      {articles.length > 0 ? (
        <Section ground="bone">
          <ul>
            {articles.map((article) => (
              <li key={article._id} className="border-t border-brand-gray-muted/30 first:border-t-0">
                <Reveal>
                  <Link
                    href={`/journal/${article.slug}`}
                    className="group grid grid-cols-1 gap-5 py-12 lg:grid-cols-12 lg:gap-12"
                  >
                    <span className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark lg:col-span-3 lg:pt-3">
                      {formatDate(article.publishedAt)}
                    </span>
                    <span className="lg:col-span-8 lg:col-start-5">
                      <span className="block text-2xl font-normal leading-[1.25] tracking-[0.01em] text-brand-black transition-colors group-hover:text-brand-champagne-dark lg:text-3xl">
                        {article.title}
                      </span>
                      {article.excerpt ? (
                        <span className="mt-4 block max-w-2xl text-[1rem] leading-[1.8] text-brand-gray-text">
                          {article.excerpt}
                        </span>
                      ) : null}
                      <span className="mt-5 block text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark">
                        {article.doctor?.name ?? BRAND.name}
                        {article.concern ? ` · ${article.concern.title}` : ""}
                      </span>
                    </span>
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
