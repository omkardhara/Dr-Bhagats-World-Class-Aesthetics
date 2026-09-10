import type { Metadata } from "next";
import { notFound } from "next/navigation";

import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import SanityPicture from "@/components/SanityPicture";
import { BeginConsultation, PageHero, Prose, Rail, Rows } from "@/components/ui";
import { SITE_URL } from "@/lib/site";
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
  if (!approach) return { title: "Treatment Approaches" };
  return {
    title: approach.title,
    description: approach.summary,
    alternates: { canonical: `/treatment-approaches/${approach.slug}` },
  };
}

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
          { label: "Treatment Approaches", href: "/treatment-approaches" },
          { label: approach.title, href: `/treatment-approaches/${approach.slug}` },
        ]}
        title={approach.title}
        lead={approach.summary}
      />

      <SanityPicture image={approach.image} ratio="21/9" width={2400} priority sizes="100vw" />

      {approach.philosophy ? (
        <Rail ground="bone" index={1} title="Our philosophy">
          <Reveal>
            <Prose>{approach.philosophy}</Prose>
          </Reveal>
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

      {approach.programmes?.length ? (
        <Rail ground="black" title="Signature programmes">
          <Rows
            ground="black"
            items={approach.programmes.map((programme) => ({
              key: programme._id,
              title: programme.title,
              detail: programme.summary,
              href: `/signature-programmes/${programme.slug}`,
            }))}
          />
        </Rail>
      ) : null}

      {approach.concerns?.length ? (
        <Rail ground="white" title="Concerns this approach addresses">
          <Rows
            ground="white"
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
        <Rail ground="bone" title="Technology that may be used">
          <Reveal>
            <Prose>
              Technology is selected by your doctor after assessment, and only where it is clinically
              appropriate.
            </Prose>
          </Reveal>
          <div className="mt-10">
            <Rows
              items={approach.technologies.map((technology) => ({
                key: technology._id,
                title: technology.name,
                detail: technology.purpose,
                href: `/technology/${technology.slug}`,
              }))}
            />
          </div>
        </Rail>
      ) : null}

      <BeginConsultation />
    </main>
  );
}
