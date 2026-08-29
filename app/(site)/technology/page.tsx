import Link from "next/link";

import { getClient } from "@/sanity/lib/client";
import { technologyPillarsQuery } from "@/sanity/lib/queries";
import type { TechnologyPillar } from "@/sanity/lib/types";

export const metadata = {
  title: "Technology",
  description: "The platforms behind every protocol.",
};

// Re-fetch pillars at most once a minute.
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
    <main className="flex-1 bg-brand-white">
      {/* Hero */}
      <section className="bg-brand-black">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-champagne-light">
            Technology
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl font-medium leading-tight tracking-tight text-brand-white sm:text-5xl lg:text-6xl">
            Every result starts with the right platform.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-gray-muted">
            Our technology is grouped into clinical pillars, each built around a
            defined set of medical-grade devices.
          </p>
          <div className="mt-10 h-px w-full bg-champagne-gradient" />
        </div>
      </section>

      {/* Pillar grid */}
      <section className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        {pillars.length === 0 ? (
          <p className="text-brand-gray-muted">
            No technology pillars published yet. Add them in the{" "}
            <Link className="text-brand-champagne-dark underline" href="/studio">
              Studio
            </Link>
            .
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <article
                key={pillar._id}
                className="flex flex-col border border-brand-gray-light bg-brand-cream/40 p-8 transition-colors hover:border-brand-champagne-light"
              >
                <div className="h-1 w-12 bg-champagne-gradient" />

                <h2 className="mt-6 text-xl font-medium tracking-tight text-brand-black">
                  {pillar.title}
                </h2>

                {pillar.description ? (
                  <p className="mt-4 text-sm leading-relaxed text-brand-gray-muted">
                    {pillar.description}
                  </p>
                ) : null}

                {pillar.machines && pillar.machines.length > 0 ? (
                  <div className="mt-8 border-t border-brand-gray-light pt-6">
                    <p className="text-[0.65rem] uppercase tracking-[0.25em] text-brand-champagne-dark">
                      Platforms
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {pillar.machines.map((machine) => (
                        <li
                          key={machine._id}
                          className="rounded-full border border-brand-champagne-light px-3 py-1 text-xs text-brand-champagne-dark"
                        >
                          {machine.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
