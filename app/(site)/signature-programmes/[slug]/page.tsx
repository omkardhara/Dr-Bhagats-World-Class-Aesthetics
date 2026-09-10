import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import SanityPicture from "@/components/SanityPicture";
import {
  BeginConsultation,
  Display,
  Eyebrow,
  PageHero,
  Prose,
  Rail,
  Rows,
  Section,
} from "@/components/ui";
import { pad } from "@/lib/format";
import { SITE_URL } from "@/lib/site";
import { getClient } from "@/sanity/lib/client";
import { programmeBySlugQuery, programmeSlugsQuery } from "@/sanity/lib/queries";
import type { Programme } from "@/sanity/lib/types";

export const revalidate = 60;

async function getProgramme(slug: string): Promise<Programme | null> {
  try {
    return await getClient().fetch<Programme | null>(programmeBySlugQuery, { slug });
  } catch (error) {
    console.error("[programme] Sanity fetch failed:", error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await getClient().fetch<string[]>(programmeSlugsQuery);
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps<"/signature-programmes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const programme = await getProgramme(slug);
  if (!programme) return { title: "Signature Programmes" };
  return {
    title: programme.title,
    description: programme.summary,
    alternates: { canonical: `/signature-programmes/${programme.slug}` },
  };
}

export default async function ProgrammePage({ params }: PageProps<"/signature-programmes/[slug]">) {
  const { slug } = await params;
  const programme = await getProgramme(slug);
  if (!programme) notFound();

  const url = `${SITE_URL}/signature-programmes/${programme.slug}`;

  return (
    <main className="flex-1 bg-brand-bone">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "@id": `${url}#page`,
          url,
          name: programme.title,
          description: programme.summary,
          publisher: { "@id": `${SITE_URL}/#organization` },
        }}
      />

      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Signature Programmes", href: "/signature-programmes" },
          { label: programme.title, href: `/signature-programmes/${programme.slug}` },
        ]}
        title={programme.title}
        lead={programme.summary}
      />

      <SanityPicture image={programme.image} ratio="21/9" width={2400} priority sizes="100vw" />

      {programme.forWhom ? (
        <Rail ground="bone" index={1} title="Who it is for">
          <Reveal>
            <Prose>{programme.forWhom}</Prose>
          </Reveal>
        </Rail>
      ) : null}

      {programme.approach ? (
        <Rail ground="white" index={2} title="The approach">
          <Reveal>
            <Prose ground="white">{programme.approach}</Prose>
          </Reveal>
        </Rail>
      ) : null}

      {programme.stages?.length ? (
        <Section ground="black">
          <Reveal>
            <Eyebrow ground="black">How the programme unfolds</Eyebrow>
            <Display ground="black" className="mt-8 max-w-3xl">
              A sequence, planned for you.
            </Display>
          </Reveal>
          <ol className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {programme.stages.map((stage, index) => (
              <li key={stage._key}>
                <Reveal index={index}>
                  <span className="block text-xs tracking-widest text-brand-champagne-light">
                    {pad(index + 1)}
                  </span>
                  <span aria-hidden className="mt-6 block h-px w-full bg-champagne-gradient" />
                  <h3 className="mt-8 text-xl font-normal tracking-[0.01em] text-brand-cream">
                    {stage.title}
                  </h3>
                  {stage.description ? (
                    <p className="mt-4 text-[0.95rem] leading-[1.75] text-brand-gray-muted">
                      {stage.description}
                    </p>
                  ) : null}
                </Reveal>
              </li>
            ))}
          </ol>
          <p className="mt-16 max-w-2xl text-[0.95rem] leading-[1.8] text-brand-gray-muted">
            Every programme is tailored after consultation, and not every patient needs every stage.
          </p>
        </Section>
      ) : null}

      {programme.concerns?.length ? (
        <Rail ground="bone" title="Concerns">
          <Rows
            items={programme.concerns.map((concern) => ({
              key: concern._id,
              title: concern.title,
              detail: concern.summary,
              href: `/concerns/${concern.slug}`,
            }))}
          />
        </Rail>
      ) : null}

      {programme.approaches?.length ? (
        <Rail ground="white" title="Treatment approaches">
          <Rows
            ground="white"
            items={programme.approaches.map((approach) => ({
              key: approach._id,
              title: approach.title,
              href: `/treatment-approaches/${approach.slug}`,
            }))}
          />
        </Rail>
      ) : null}

      {programme.others?.length ? (
        <Section ground="bone" className="border-t border-brand-gray-muted/20">
          <Eyebrow>Other programmes</Eyebrow>
          <ul className="mt-10 grid grid-cols-1 gap-x-12 sm:grid-cols-2">
            {programme.others.map((other) => (
              <li key={other._id} className="border-t border-brand-gray-muted/30">
                <Link
                  href={`/signature-programmes/${other.slug}`}
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
