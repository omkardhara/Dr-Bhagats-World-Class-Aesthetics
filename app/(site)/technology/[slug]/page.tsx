import type { Metadata } from "next";
import { notFound } from "next/navigation";

import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import SanityPicture from "@/components/SanityPicture";
import { BeginConsultation, PageHero, Prose, Rail, Rows } from "@/components/ui";
import { SITE_URL } from "@/lib/site";
import { TECHNOLOGY_CATEGORIES } from "@/sanity/lib/categories";
import { getClient } from "@/sanity/lib/client";
import { machineBySlugQuery, machineSlugsQuery } from "@/sanity/lib/queries";
import type { Machine } from "@/sanity/lib/types";

export const revalidate = 60;

async function getMachine(slug: string): Promise<Machine | null> {
  try {
    return await getClient().fetch<Machine | null>(machineBySlugQuery, { slug });
  } catch (error) {
    console.error("[machine] Sanity fetch failed:", error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await getClient().fetch<string[]>(machineSlugsQuery);
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps<"/technology/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const machine = await getMachine(slug);
  if (!machine) return { title: "Technology" };
  return {
    title: machine.name,
    description: machine.purpose ?? machine.description,
    alternates: { canonical: `/technology/${machine.slug}` },
  };
}

/**
 * Device pages exist because patients search device names. They are framed
 * around where the device fits in a doctor's plan - concerns first - so a
 * visitor landing here is steered back to the clinical journey.
 */
export default async function MachinePage({ params }: PageProps<"/technology/[slug]">) {
  const { slug } = await params;
  const machine = await getMachine(slug);
  if (!machine) notFound();

  const category = TECHNOLOGY_CATEGORIES.find((c) => c.value === machine.category)?.label;
  const hasApproaches = Boolean(machine.approaches?.length);

  return (
    <main className="flex-1 bg-brand-bone">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalDevice",
          "@id": `${SITE_URL}/technology/${machine.slug}#device`,
          name: machine.name,
          description: machine.description,
          url: `${SITE_URL}/technology/${machine.slug}`,
        }}
      />

      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Technology", href: "/technology" },
          { label: machine.name, href: `/technology/${machine.slug}` },
        ]}
        title={machine.name}
        lead={machine.purpose}
      />

      <SanityPicture image={machine.image} ratio="21/9" width={2400} priority sizes="100vw" />

      <Rail ground="bone" index={1} title="Where it fits in a plan">
        <Reveal>
          <Prose>
            Like all our technology, {machine.name} is selected by the doctor as part of a personalised
            plan, following assessment. It supports the treatment; it does not define it.
          </Prose>
        </Reveal>
        {machine.concerns?.length ? (
          <div className="mt-10">
            <Rows
              items={machine.concerns.map((concern) => ({
                key: concern._id,
                title: concern.title,
                detail: concern.summary,
                href: `/concerns/${concern.slug}`,
              }))}
            />
          </div>
        ) : null}
      </Rail>

      {hasApproaches ? (
        <Rail ground="white" index={2} title="Treatment approaches">
          <Rows
            ground="white"
            items={(machine.approaches ?? []).map((approach) => ({
              key: approach._id,
              title: approach.title,
              href: `/treatment-approaches/${approach.slug}`,
            }))}
          />
        </Rail>
      ) : null}

      {machine.description ? (
        <Rail ground="bone" index={hasApproaches ? 3 : 2} title="About the technology">
          <Reveal>
            <Prose>{machine.description}</Prose>
            {category ? (
              <p className="mt-8 text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark">
                {category}
              </p>
            ) : null}
          </Reveal>
        </Rail>
      ) : null}

      <BeginConsultation />
    </main>
  );
}
