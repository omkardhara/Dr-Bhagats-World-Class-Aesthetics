import type { Metadata } from "next";
import Link from "next/link";

import Reveal from "@/components/Reveal";
import {
  BeginConsultation,
  Display,
  Eyebrow,
  JourneySteps,
  PageHero,
  Prose,
  Rail,
  Rows,
  Section,
} from "@/components/ui";
import { pad } from "@/lib/format";
import { getClient } from "@/sanity/lib/client";
import { approachesQuery } from "@/sanity/lib/queries";
import type { ApproachSummary, ProgrammeSummary } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Treatment Approaches",
  description:
    "Considered treatment, not a menu. How the doctors approach each family of concerns, with every plan designed for the individual.",
  alternates: { canonical: "/treatment-approaches" },
};

export const revalidate = 60;

async function getData(): Promise<{ approaches: ApproachSummary[]; programmes: ProgrammeSummary[] }> {
  try {
    const data = await getClient().fetch<{
      approaches: ApproachSummary[] | null;
      programmes: ProgrammeSummary[] | null;
    }>(approachesQuery);
    return { approaches: data.approaches ?? [], programmes: data.programmes ?? [] };
  } catch (error) {
    console.error("[approaches] Sanity fetch failed:", error);
    return { approaches: [], programmes: [] };
  }
}

export default async function TreatmentApproachesPage() {
  const { approaches, programmes } = await getData();

  return (
    <main className="flex-1 bg-brand-bone">
      <PageHero
        eyebrow="Treatment Approaches"
        title="Considered treatment, not a menu."
        lead="We don’t organise care around procedures. Each approach describes how the doctors think about a family of concerns, and every plan within it is personal."
      />

      <Section ground="white">
        <Reveal>
          <Eyebrow ground="white">The patient journey</Eyebrow>
          <Display ground="white" className="mt-8 max-w-3xl">
            Concern, assessment, plan, technology.
          </Display>
          <Prose ground="white" className="mt-8">
            Technology comes last, because it should. The doctor first understands the concern, then
            decides what will genuinely help.
          </Prose>
        </Reveal>
        <JourneySteps ground="white" />
      </Section>

      <Section ground="bone">
        <ul>
          {approaches.map((approach, index) => (
            <li key={approach._id} className="border-t border-brand-gray-muted/30 first:border-t-0">
              <Reveal>
                <Link
                  href={`/treatment-approaches/${approach.slug}`}
                  className="group grid grid-cols-1 gap-5 py-12 lg:grid-cols-12 lg:gap-12"
                >
                  <span className="text-xs tracking-widest text-brand-champagne-dark lg:col-span-1 lg:pt-3">
                    {pad(index + 1)}
                  </span>
                  <span className="text-2xl font-normal leading-[1.2] tracking-[0.01em] text-brand-black transition-colors group-hover:text-brand-champagne-dark lg:col-span-5 lg:text-3xl">
                    {approach.title}
                  </span>
                  <span className="lg:col-span-5 lg:col-start-8">
                    {approach.summary ? (
                      <span className="block text-[1rem] leading-[1.8] text-brand-gray-text">
                        {approach.summary}
                      </span>
                    ) : null}
                    {approach.concerns?.length ? (
                      <span className="mt-5 block text-[0.65rem] uppercase leading-[2] tracking-widest text-brand-champagne-dark">
                        For {approach.concerns.map((concern) => concern.title).join(" · ")}
                      </span>
                    ) : null}
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {programmes.length > 0 ? (
        <Rail ground="black" title="Signature programmes">
          <Rows
            ground="black"
            items={programmes.map((programme) => ({
              key: programme._id,
              title: programme.title,
              detail: programme.summary,
              href: `/signature-programmes/${programme.slug}`,
            }))}
          />
        </Rail>
      ) : null}

      <BeginConsultation />
    </main>
  );
}
