import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/Breadcrumbs";
import EditorialImage from "@/components/EditorialImage";
import { SITE_URL } from "@/lib/site";
import { stockForSlug } from "@/lib/stockImages";
import { getClient } from "@/sanity/lib/client";
import { imageProps } from "@/sanity/lib/image";
import { machineBySlugQuery, machineSlugsQuery } from "@/sanity/lib/queries";
import type { MachineDetail } from "@/sanity/lib/types";

export const revalidate = 60;

async function getMachine(slug: string): Promise<MachineDetail | null> {
  try {
    return await getClient().fetch<MachineDetail | null>(machineBySlugQuery, {
      slug,
    });
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
    description: machine.description,
    alternates: { canonical: `/technology/${machine.slug}` },
  };
}

export default async function MachinePage({
  params,
}: PageProps<"/technology/[slug]">) {
  const { slug } = await params;
  const machine = await getMachine(slug);

  if (!machine) notFound();

  return (
    <main className="flex-1 bg-brand-bone">
      {/* Device pages are what device-name searches land on, so name the
          platform explicitly rather than only the treatment it delivers. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalDevice",
            "@id": `${SITE_URL}/technology/${machine.slug}#device`,
            name: machine.name,
            description: machine.description,
            url: `${SITE_URL}/technology/${machine.slug}`,
          }),
        }}
      />

      <section className="bg-brand-black">
        <div className="mx-auto w-full max-w-7xl px-6 pb-28 pt-40 lg:px-10 lg:pb-40 lg:pt-56">
          <Breadcrumbs
            crumbs={[
              { label: "Home", href: "/" },
              { label: "Technology", href: "/technology" },
              { label: machine.name, href: `/technology/${machine.slug}` },
            ]}
          />
          <h1 className="mt-10 max-w-3xl text-4xl font-normal leading-tight tracking-[0.01em] text-brand-white sm:text-5xl lg:text-6xl">
            {machine.name}
          </h1>
          {machine.description ? (
            <p className="mt-8 max-w-xl text-[0.95rem] font-normal leading-[1.75] text-brand-gray-muted">
              {machine.description}
            </p>
          ) : null}
          <span className="mt-16 block h-px w-full bg-champagne-gradient" />
        </div>
      </section>

      <div className="pt-24 lg:pt-32">
        <EditorialImage
          fallback={stockForSlug(machine.slug)}
          sanity={imageProps(machine.image)}
          fullBleed
          ratio="21/9"
        />
      </div>

      <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          <header className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h2 className="text-2xl font-normal uppercase tracking-widest text-brand-black lg:text-3xl">
                What it delivers
              </h2>
              <span className="mt-8 block h-px w-16 bg-champagne-gradient" />
            </div>
          </header>

          <div className="lg:col-span-7 lg:col-start-6">
            {machine.treatments && machine.treatments.length > 0 ? (
              <ul>
                {machine.treatments.map((treatment) => (
                  <li
                    key={treatment._id}
                    className="border-t border-brand-gray-muted/30 py-8 first:border-t-0 first:pt-0"
                  >
                    <Link
                      href={`/services/${treatment.slug}`}
                      className="text-lg font-normal tracking-wide text-brand-black transition-colors hover:text-brand-champagne-dark"
                    >
                      {treatment.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[0.95rem] font-normal leading-[1.75] text-brand-gray-text">
                This platform is not yet mapped to a treatment.
              </p>
            )}

            {machine.pillars && machine.pillars.length > 0 ? (
              <div className="mt-20">
                <h2 className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark">
                  Part of
                </h2>
                <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-3">
                  {machine.pillars.map((pillar) => (
                    <li key={pillar._id}>
                      <span className="border-b border-brand-champagne-light pb-1 text-xs font-normal text-brand-champagne-dark">
                        {pillar.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <Link
              href="/book"
              className="mt-16 inline-block bg-champagne-gradient-deep px-10 py-5 text-[0.7rem] font-medium uppercase tracking-widest text-brand-white transition-opacity hover:opacity-90"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
