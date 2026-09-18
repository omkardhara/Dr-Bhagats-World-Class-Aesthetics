import type { Metadata } from "next";
import Link from "next/link";

import Reveal from "@/components/Reveal";
import SanityPicture from "@/components/SanityPicture";
import {
  BeginConsultation,
  Eyebrow,
  PageHero,
  palette,
  Prose,
  Rail,
  Section,
  TextLink,
  type Ground,
} from "@/components/ui";
import { RESULT_CATEGORIES } from "@/sanity/lib/categories";
import { getClient } from "@/sanity/lib/client";
import { resultsQuery } from "@/sanity/lib/queries";
import type { Result, Testimonial } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Results",
  description:
    "Clinical results organised by concern: ageing, pigmentation, acne and scars, skin quality, body and hair. Photographs are published only with the patient's written consent.",
  alternates: { canonical: "/results" },
};

export const revalidate = 60;

type Data = {
  results: Result[];
  testimonials: Testimonial[];
  concerns: { _id: string; title: string; resultCategory?: string; slug: string }[];
};

async function getData(): Promise<Data> {
  try {
    const data = await getClient().fetch<Partial<Data> | null>(resultsQuery);
    return {
      results: data?.results ?? [],
      testimonials: data?.testimonials ?? [],
      concerns: data?.concerns ?? [],
    };
  } catch (error) {
    console.error("[results] Sanity fetch failed:", error);
    return { results: [], testimonials: [], concerns: [] };
  }
}

/**
 * A clinical results section: the photography leads and the patients' words
 * support it, as the doctors asked. The query returns only cases with recorded
 * consent, so an unconsented photograph cannot reach this page.
 */
export default async function ResultsPage() {
  const data = await getData();

  const groups = RESULT_CATEGORIES.map((category) => ({
    ...category,
    results: data.results.filter((r) => r.category === category.value),
    words: data.testimonials.filter((t) => t.category === category.value),
    concerns: data.concerns.filter((c) => c.resultCategory === category.value),
  })).filter((group) => group.results.length > 0 || group.words.length > 0);

  const general = data.testimonials.filter((t) => !t.category);
  const hasResults = data.results.length > 0;

  return (
    <main className="flex-1 bg-brand-bone">
      <PageHero
        eyebrow="Results"
        title="Results, organised by concern."
        lead="Every result begins with an assessment and a plan designed for one person."
      />

      <Section ground="bone">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Prose>
                Clinical photographs are taken under consistent conditions and published only with the
                written consent of the patient. What a treatment achieves depends on the individual:
                their skin, their anatomy and what was assessed at the outset.
              </Prose>
            </Reveal>
          </div>
          {groups.length > 0 ? (
            <nav aria-label="Results by concern" className="lg:col-span-4 lg:col-start-9">
              <Eyebrow>By concern</Eyebrow>
              <ul className="mt-5 flex flex-wrap gap-x-8">
                {groups.map((group) => (
                  <li key={group.value}>
                    <a
                      href={`#${group.value}`}
                      className="inline-flex min-h-11 items-center text-[0.9rem] text-brand-black transition-colors hover:text-brand-champagne-dark"
                    >
                      {group.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>
      </Section>

      {groups.map((group, groupIndex) => {
        const ground: Ground = groupIndex % 2 === 0 ? "white" : "bone";
        const p = palette(ground);

        return (
          <Rail key={group.value} id={group.value} ground={ground} title={group.label}>
            {group.results.length > 0 ? (
              <ul className="grid grid-cols-1 gap-16">
                {group.results.map((result) => (
                  <li key={result._id}>
                    <Reveal>
                      <div className="grid grid-cols-2 gap-3">
                        <figure>
                          <SanityPicture
                            image={result.before}
                            ratio="1/1"
                            width={900}
                            sizes="(min-width: 1024px) 30vw, 50vw"
                          />
                          <figcaption className={`mt-3 text-[0.65rem] uppercase tracking-widest ${p.body}`}>
                            Before
                          </figcaption>
                        </figure>
                        <figure>
                          <SanityPicture
                            image={result.after}
                            ratio="1/1"
                            width={900}
                            sizes="(min-width: 1024px) 30vw, 50vw"
                          />
                          <figcaption className={`mt-3 text-[0.65rem] uppercase tracking-widest ${p.body}`}>
                            After
                          </figcaption>
                        </figure>
                      </div>
                      {result.summary ? (
                        <p className={`mt-6 max-w-xl text-[0.95rem] leading-[1.8] ${p.body}`}>
                          {result.summary}
                        </p>
                      ) : null}
                      {result.concern ? (
                        <p className="mt-4">
                          <Link
                            href={`/concerns/${result.concern.slug}`}
                            className={`text-[1rem] transition-colors ${p.heading} hover:text-brand-champagne-dark`}
                          >
                            {result.concern.title}
                          </Link>
                        </p>
                      ) : null}
                      {result.technologies?.length ? (
                        <p className={`mt-2 text-[0.65rem] uppercase tracking-widest ${p.body}`}>
                          Technology used: {result.technologies.map((t) => t.name).join(", ")}
                        </p>
                      ) : null}
                    </Reveal>
                  </li>
                ))}
              </ul>
            ) : null}

            {group.concerns.length > 0 ? (
              <div className={group.results.length > 0 ? "mt-14" : ""}>
                <div className="flex flex-wrap gap-x-8">
                  {group.concerns.map((concern) => (
                    <TextLink key={concern._id} href={`/concerns/${concern.slug}`} ground={ground}>
                      {concern.title}
                    </TextLink>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Patients' words support the clinical result rather than leading it. */}
            {group.words.length > 0 ? (
              <div className="mt-16 border-t border-brand-gray-muted/30 pt-10">
                <Eyebrow ground={ground}>In patients&apos; words</Eyebrow>
                <ul className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2">
                  {group.words.map((testimonial, index) => (
                    <li key={testimonial._id}>
                      <Reveal index={index}>
                        <blockquote className={`text-[0.95rem] leading-[1.8] ${p.body}`}>
                          &ldquo;{testimonial.quote}&rdquo;
                        </blockquote>
                        <p className={`mt-4 text-[0.65rem] uppercase tracking-widest ${p.eyebrow}`}>
                          {testimonial.author}
                        </p>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Rail>
        );
      })}

      {general.length > 0 ? (
        <Section ground="black">
          <Eyebrow ground="black">In patients&apos; words</Eyebrow>
          <ul className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
            {general.map((testimonial, index) => (
              <li key={testimonial._id} className="border-t border-brand-gray-muted/25 pt-10">
                <Reveal index={index}>
                  <blockquote className="text-[1rem] leading-[1.8] text-brand-gray-muted">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <p className="mt-6 text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">
                    {testimonial.author}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section ground="bone">
        <p className="max-w-2xl text-[0.85rem] leading-[1.8] text-brand-gray-text">
          {hasResults
            ? "Results vary between individuals and depend on a personal assessment. Photographs are unretouched and published with the written consent of the patient."
            : "Clinical photographs are published here only with the written consent of the patient, alongside the concern each case was treated for."}
        </p>
      </Section>

      <BeginConsultation />
    </main>
  );
}
