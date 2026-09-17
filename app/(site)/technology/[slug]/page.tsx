import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import SanityPicture from "@/components/SanityPicture";
import { BeginConsultation, Eyebrow, PageHero, Prose, Rail, Rows, Section } from "@/components/ui";
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
    description: machine.whatItIs ?? machine.purpose ?? machine.description,
    alternates: { canonical: `/technology/${machine.slug}` },
  };
}

/**
 * A page for a technology that carries the practice, written patient-facing:
 * what it is, what it helps with, who may benefit, what treatment involves,
 * downtime, and where it fits within a plan. Every other technology redirects
 * to its card on /technology.
 */
export default async function MachinePage({ params }: PageProps<"/technology/[slug]">) {
  const { slug } = await params;
  const machine = await getMachine(slug);
  if (!machine) notFound();
  if (!machine.dedicatedPage) permanentRedirect(`/technology#${machine.slug}`);

  const categories = (machine.categories ?? []).map(technologyCategoryLabel).filter(Boolean);

  return (
    <main className="flex-1 bg-brand-bone">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalDevice",
          "@id": `${SITE_URL}/technology/${machine.slug}#device`,
          name: machine.name,
          description: machine.whatItIs ?? machine.description,
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

      {machine.whatItIs ? (
        <Rail ground="bone" index={1} title="What it is">
          <Reveal>
            <Prose>{machine.whatItIs}</Prose>
            {categories.length > 0 ? (
              <p className="mt-8 text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark">
                {categories.join(" · ")}
              </p>
            ) : null}
          </Reveal>
        </Rail>
      ) : null}

      {machine.helpsWith?.length ? (
        <Rail ground="white" index={2} title="What it can help with">
          <ul>
            {machine.helpsWith.map((item, index) => (
              <li key={item} className="border-t border-brand-gray-muted/30 py-5 first:border-t-0 first:pt-0">
                <Reveal index={index}>
                  <span className="text-[1.1rem] leading-[1.6] text-brand-black">{item}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </Rail>
      ) : null}

      {machine.whoMayBenefit ? (
        <Rail ground="bone" index={3} title="Who may benefit">
          <Reveal>
            <Prose>{machine.whoMayBenefit}</Prose>
          </Reveal>
        </Rail>
      ) : null}

      {machine.whatItInvolves ? (
        <Rail ground="white" index={4} title="What treatment involves">
          <Reveal>
            <Prose ground="white">{machine.whatItInvolves}</Prose>
          </Reveal>
        </Rail>
      ) : null}

      {machine.downtime ? (
        <Rail ground="bone" index={5} title="Downtime and recovery">
          <Reveal>
            <Prose>{machine.downtime}</Prose>
            <p className="mt-8 text-[0.85rem] leading-[1.7] text-brand-gray-text">
              Recovery varies with the settings chosen for you. Your doctor will tell you what to
              expect before treatment begins.
            </p>
          </Reveal>
        </Rail>
      ) : null}

      {machine.whereItFits ? (
        <Rail ground="white" index={6} title="Where it fits in a plan">
          <Reveal>
            <Prose ground="white">{machine.whereItFits}</Prose>
          </Reveal>
          {machine.concerns?.length ? (
            <div className="mt-12">
              <Eyebrow ground="white">Concerns it is used within</Eyebrow>
              <div className="mt-6">
                <Rows
                  ground="white"
                  items={machine.concerns.map((concern) => ({
                    key: concern._id,
                    title: concern.title,
                    detail: concern.summary,
                    href: `/concerns/${concern.slug}`,
                  }))}
                />
              </div>
            </div>
          ) : null}
        </Rail>
      ) : null}

      {machine.approaches?.length ? (
        <Rail ground="bone" title="Treatment approaches">
          <Rows
            items={machine.approaches.map((approach) => ({
              key: approach._id,
              title: approach.title,
              href: `/treatment-approaches/${approach.slug}`,
            }))}
          />
        </Rail>
      ) : null}

      {machine.description ? (
        <Section ground="white" className="border-t border-brand-gray-muted/20">
          <Eyebrow ground="white">Technical note</Eyebrow>
          <p className="mt-6 max-w-2xl text-[0.95rem] leading-[1.8] text-brand-gray-text">
            {machine.description}
          </p>
        </Section>
      ) : null}

      <BeginConsultation />
    </main>
  );
}
