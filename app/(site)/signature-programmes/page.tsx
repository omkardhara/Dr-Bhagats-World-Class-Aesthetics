import type { Metadata } from "next";
import Link from "next/link";

import Reveal from "@/components/Reveal";
import { BeginConsultation, PageHero, Section } from "@/components/ui";
import { pad } from "@/lib/format";
import { getClient } from "@/sanity/lib/client";
import { programmesQuery } from "@/sanity/lib/queries";
import type { ProgrammeSummary } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Signature Programmes",
  description:
    "The Dr Bhagat programmes: treatment concepts that combine different modalities, planned and sequenced by the doctor for each patient.",
  alternates: { canonical: "/signature-programmes" },
};

export const revalidate = 60;

async function getProgrammes(): Promise<ProgrammeSummary[]> {
  try {
    return await getClient().fetch<ProgrammeSummary[]>(programmesQuery);
  } catch (error) {
    console.error("[programmes] Sanity fetch failed:", error);
    return [];
  }
}

export default async function ProgrammesPage() {
  const programmes = await getProgrammes();

  return (
    <main className="flex-1 bg-brand-bone">
      <PageHero
        eyebrow="Signature Programmes"
        title="The Dr Bhagat programmes."
        lead="Treatment concepts built around clinical expertise. Each combines different modalities, planned and sequenced by the doctor for the individual patient."
      />

      <Section ground="bone">
        <ul>
          {programmes.map((programme, index) => (
            <li key={programme._id} className="border-t border-brand-gray-muted/30 first:border-t-0">
              <Reveal>
                <Link
                  href={`/signature-programmes/${programme.slug}`}
                  className="group grid grid-cols-1 gap-5 py-12 lg:grid-cols-12 lg:gap-12"
                >
                  <span className="text-xs tracking-widest text-brand-champagne-dark lg:col-span-1 lg:pt-3">
                    {pad(index + 1)}
                  </span>
                  <span className="text-2xl font-normal leading-[1.2] tracking-[0.01em] text-brand-black transition-colors group-hover:text-brand-champagne-dark lg:col-span-5 lg:text-3xl">
                    {programme.title}
                  </span>
                  <span className="lg:col-span-5 lg:col-start-8">
                    {programme.summary ? (
                      <span className="block text-[1rem] leading-[1.8] text-brand-gray-text">
                        {programme.summary}
                      </span>
                    ) : null}
                    {programme.forWhom ? (
                      <span className="mt-4 block text-[0.9rem] leading-[1.75] text-brand-gray-text">
                        {programme.forWhom}
                      </span>
                    ) : null}
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <BeginConsultation />
    </main>
  );
}
