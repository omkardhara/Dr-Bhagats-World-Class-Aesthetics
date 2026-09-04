import Link from "next/link";

import TechnologyEditorial from "@/components/TechnologyEditorial";
import { getClient } from "@/sanity/lib/client";
import { technologyPillarsQuery } from "@/sanity/lib/queries";
import type { TechnologyPillar } from "@/sanity/lib/types";

export const metadata = {
  title: "Technology",
  description: "The platforms behind every protocol.",
};

export const revalidate = 60;

async function getPillars(): Promise<TechnologyPillar[]> {
  try {
    return await getClient().fetch<TechnologyPillar[]>(technologyPillarsQuery);
  } catch (error) {
    // Render the empty state rather than a 500, but never swallow the reason:
    // a silent [] is indistinguishable from an unpublished dataset.
    console.error("[technology] Sanity fetch failed:", error);
    return [];
  }
}

export default async function TechnologyPage() {
  const pillars = await getPillars();

  return (
    <main className="flex-1 bg-brand-bone">
      <section className="bg-brand-black">
        <div className="mx-auto w-full max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
          <p className="text-xs font-light uppercase tracking-widest text-brand-champagne-light">
            Technology
          </p>
          <h1 className="mt-10 max-w-3xl text-4xl font-normal leading-tight tracking-[0.01em] text-brand-white sm:text-5xl lg:text-6xl">
            Every result starts with the right platform.
          </h1>
          <p className="mt-8 max-w-xl text-[0.95rem] font-normal leading-[1.75] text-brand-gray-muted">
            Our technology is grouped into clinical pillars, each built around a
            defined set of medical-grade devices.
          </p>
          <span className="mt-16 block h-px w-full bg-champagne-gradient" />
        </div>
      </section>

      {pillars.length === 0 ? (
        <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <p className="text-[0.95rem] font-normal text-brand-gray-text">
            No technology pillars published yet. Add them in the{" "}
            <Link className="text-brand-champagne-dark underline" href="/studio">
              Studio
            </Link>
            .
          </p>
        </section>
      ) : (
        <TechnologyEditorial pillars={pillars} />
      )}
    </main>
  );
}
