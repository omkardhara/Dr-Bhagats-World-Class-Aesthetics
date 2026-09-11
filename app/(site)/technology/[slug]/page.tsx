import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import SanityPicture from "@/components/SanityPicture";
import { BeginConsultation, PageHero, Prose, Rail, Rows } from "@/components/ui";
import { SITE_URL } from "@/lib/site";
import { technologyCategoryLabel } from "@/sanity/lib/categories";
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

/** Only signature technologies are prerendered; see `dedicatedPage` on the schema. */
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
  if (!machine?.dedicatedPage) return { title: "Technology" };
  return {
    title: machine.name,
    description: machine.purpose ?? machine.description,
    alternates: { canonical: `/technology/${machine.slug}` },
  };
}

/**
 * A dedicated page, reserved for the few signature technologies. Every other
 * technology is a card on /technology, so its old page address redirects to
 * that card rather than presenting it as a hero of its own.
 */
export default async function MachinePage({ params }: PageProps<"/technology/[slug]">) {
  const { slug } = await params;
  const machine = await getMachine(slug);
  if (!machine) notFound();
  if (!machine.dedicatedPage) permanentRedirect(`/technology#${machine.slug}`);

  const categories = (machine.categories ?? []).map(technologyCategoryLabel).filter(Boolean);
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
            Like all our technology, {machine.name} is selected by the doctor after assessment, as one
            part of a personalised plan. It supports the treatment; it does not define it.
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

      {machine.description ? (
        <Rail ground="white" index={2} title="About the technology">
          <Reveal>
            <Prose ground="white">{machine.description}</Prose>
            {categories.length > 0 ? (
              <p className="mt-8 text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark">
                {categories.join(" · ")}
              </p>
            ) : null}
          </Reveal>
        </Rail>
      ) : null}

      {hasApproaches ? (
        <Rail ground="bone" title="Treatment approaches">
          <Rows
            items={(machine.approaches ?? []).map((approach) => ({
              key: approach._id,
              title: approach.title,
              href: `/treatment-approaches/${approach.slug}`,
            }))}
          />
        </Rail>
      ) : null}

      <BeginConsultation />
    </main>
  );
}
