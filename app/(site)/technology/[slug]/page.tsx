import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import SanityPicture from "@/components/SanityPicture";
import { technologyShot } from "@/lib/shotList";
import { BeginConsultation, Eyebrow, PageHero, Prose, Rail, Rows, Section } from "@/components/ui";
import { pad } from "@/lib/format";
import { SITE_URL } from "@/lib/site";
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
    description: machine.whatItIs ?? machine.purpose,
    alternates: { canonical: `/technology/${machine.slug}` },
  };
}

/**
 * Each page answers the doctors' six patient questions in their order: what
 * does it do, who is it suitable for, what concerns can it address, how long
 * is a session, what is the downtime, and what can it be combined with - and
 * when might it not be chosen - with realistic expectations alongside.
 *
 * It reads as "what this technology allows us to do, and how the doctors
 * decide when it is appropriate". There is deliberately no specification
 * section. Technologies without a dedicated page redirect to their card.
 */
export default async function MachinePage({ params }: PageProps<"/technology/[slug]">) {
  const { slug } = await params;
  const machine = await getMachine(slug);
  if (!machine) notFound();
  if (!machine.dedicatedPage) permanentRedirect(`/technology#${machine.slug}`);

  const practical = [
    { title: "How long is a session?", body: machine.sessionTime },
    { title: "What is the downtime and recovery?", body: machine.downtime },
    { title: "What should you expect?", body: machine.expectations },
  ].filter((item): item is { title: string; body: string } => Boolean(item.body));

  return (
    <main className="flex-1 bg-brand-bone">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalDevice",
          "@id": `${SITE_URL}/technology/${machine.slug}#device`,
          name: machine.name,
          description: machine.whatItIs,
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
      >
        <p className="mt-10 max-w-xl text-[0.9rem] leading-[1.7] text-brand-champagne-light">
          Selected by your doctor after assessment, as one part of a personalised plan.
        </p>
      </PageHero>

      <SanityPicture
        image={machine.image}
        brief={technologyShot(machine.name)}
        ratio="21/9"
        width={2400}
        priority
        sizes="100vw"
      />

      {machine.whatItIs ? (
        <Rail ground="bone" index={1} title="What does it do?">
          <Reveal>
            <Prose>{machine.whatItIs}</Prose>
          </Reveal>
          {/* Editorial depth for the major lifting and tightening technologies. */}
          {machine.perspective ? (
            <Reveal>
              <div className="mt-12 border-l border-brand-champagne-dark pl-6">
                <Eyebrow>How we decide</Eyebrow>
                <p className="mt-4 max-w-xl text-[1.1rem] leading-[1.75] text-brand-black">
                  {machine.perspective}
                </p>
              </div>
            </Reveal>
          ) : null}
        </Rail>
      ) : null}

      {machine.whyWeUse ? (
        <Section ground="black">
          <Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <Eyebrow ground="black">Why we use it</Eyebrow>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <blockquote className="text-2xl font-normal leading-[1.4] tracking-[0.005em] text-brand-cream lg:text-3xl">
                  {machine.whyWeUse}
                </blockquote>
                {machine.whyWeUseBy ? (
                  <p className="mt-8 text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">
                    {machine.whyWeUseBy}
                  </p>
                ) : null}
              </div>
            </div>
          </Reveal>
        </Section>
      ) : null}

      {machine.whoMayBenefit ? (
        <Rail ground="white" index={2} title="Who is it suitable for?">
          <Reveal>
            <Prose ground="white">{machine.whoMayBenefit}</Prose>
          </Reveal>
        </Rail>
      ) : null}

      {machine.considerWhen?.length || machine.notWhen?.length ? (
        <Rail ground="bone" title={`Is ${machine.name} right for you?`}>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10">
            {machine.considerWhen?.length ? (
              <div>
                <Eyebrow>May be considered when</Eyebrow>
                <ul className="mt-6">
                  {machine.considerWhen.map((item, index) => (
                    <li key={item} className="border-t border-brand-gray-muted/30 py-4">
                      <Reveal index={index % 3}>
                        <span className="text-[1rem] leading-[1.6] text-brand-black">{item}</span>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {machine.notWhen?.length ? (
              <div>
                <Eyebrow>May not be appropriate when</Eyebrow>
                <ul className="mt-6">
                  {machine.notWhen.map((item, index) => (
                    <li key={item} className="border-t border-brand-gray-muted/30 py-4">
                      <Reveal index={index % 3}>
                        <span className="text-[1rem] leading-[1.6] text-brand-gray-text">{item}</span>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <p className="mt-10 max-w-2xl text-[0.85rem] leading-[1.7] text-brand-gray-text">
            This is decided at assessment, not in advance. Suitability depends on your anatomy, your
            skin and what you would like to change.
          </p>
        </Rail>
      ) : null}

      {machine.helpsWith?.length ? (
        <Rail ground="white" index={3} title="What concerns can it address?">
          <ul className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
            {machine.helpsWith.map((item, index) => (
              <li key={item} className="border-t border-brand-gray-muted/30 py-5">
                <Reveal index={index % 2}>
                  <span className="text-[1.05rem] leading-[1.6] text-brand-black">{item}</span>
                </Reveal>
              </li>
            ))}
          </ul>
          {machine.concerns?.length ? (
            <div className="mt-14">
              <Eyebrow ground="white">Start with the concern</Eyebrow>
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

      {practical.length > 0 ? (
        <Section ground="bone">
          <ul className="grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-10">
            {practical.map((item, index) => (
              <li key={item.title}>
                <Reveal index={index}>
                  <span className="block text-xs tracking-widest text-brand-champagne-dark">
                    {pad(index + 4)}
                  </span>
                  <span aria-hidden className="mt-6 block h-px w-full bg-champagne-gradient" />
                  <h2 className="mt-8 text-xl font-normal leading-snug tracking-[0.01em] text-brand-black">
                    {item.title}
                  </h2>
                  <p className="mt-5 text-[0.98rem] leading-[1.8] text-brand-gray-text">{item.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-14 max-w-2xl text-[0.85rem] leading-[1.7] text-brand-gray-text">
            Every patient is different. Your doctor will explain what to expect for your own treatment
            before it begins.
          </p>
        </Section>
      ) : null}

      {machine.combinations ? (
        <Rail ground="white" index={7} title="Combinations, and when it may not be chosen">
          <Reveal>
            <Prose ground="white">{machine.combinations}</Prose>
          </Reveal>
        </Rail>
      ) : null}

      {machine.approaches?.length ? (
        <Rail ground="bone" title="Treatment approaches">
          <Rows
            ground="bone"
            items={machine.approaches.map((approach) => ({
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
