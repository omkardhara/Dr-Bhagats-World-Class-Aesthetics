import type { Metadata } from "next";
import Link from "next/link";

import Reveal from "@/components/Reveal";
import {
  BeginConsultation,
  Display,
  Eyebrow,
  JourneySteps,
  PageHero,
  Rail,
  Rows,
  Section,
  TextLink,
} from "@/components/ui";
import { pad } from "@/lib/format";
import { programmeHref } from "@/lib/links";
import { PHILOSOPHY_LINE } from "@/lib/site";
import { getClient } from "@/sanity/lib/client";
import { approachesQuery } from "@/sanity/lib/queries";
import type { ApproachSummary, ProgrammeSummary } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Treatments",
  description:
    "The seven treatment approaches at Dr Bhagat's, and the Signature programmes. Every plan is designed for the individual after assessment.",
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

/**
 * The "Treatments" tab. The categories come first, as the doctors asked, with
 * the philosophy kept to a line: it is stated across the site already.
 */
export default async function TreatmentApproachesPage() {
  const { approaches, programmes } = await getData();

  return (
    <main className="flex-1 bg-brand-bone">
      <PageHero
        eyebrow="Treatments"
        title={PHILOSOPHY_LINE}
        lead="Each approach describes how the doctors think about a family of concerns. Every plan within it is designed for the individual."
      />

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
        <Rail ground="black" id="signature" title="The Dr Bhagat’s Signature">
          <Rows
            ground="black"
            items={programmes.map((programme) => ({
              key: programme._id,
              title: programme.title,
              detail: programme.tagline,
              href: programmeHref(programme.slug),
            }))}
          />
          <div className="mt-10">
            <TextLink href="/signature" ground="black">
              The Signature Approach
            </TextLink>
          </div>
        </Rail>
      ) : null}

      <Section ground="white">
        <Reveal>
          <Eyebrow ground="white">Our approach</Eyebrow>
          <Display ground="white" className="mt-8 max-w-3xl">
            Assess. Diagnose. Personalise. Treat. Refine.
          </Display>
        </Reveal>
        <JourneySteps ground="white" />
      </Section>

      <BeginConsultation />
    </main>
  );
}
