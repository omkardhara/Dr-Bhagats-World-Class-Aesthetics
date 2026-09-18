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
  Section,
  TextLink,
} from "@/components/ui";
import { pad } from "@/lib/format";
import { getClient } from "@/sanity/lib/client";
import { concernsQuery } from "@/sanity/lib/queries";
import type { ConcernSummary } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Your Concerns",
  description:
    "Start with what you would like to improve. Your doctor assesses your concern and designs a personalised treatment plan.",
  alternates: { canonical: "/concerns" },
};

export const revalidate = 60;

async function getConcerns(): Promise<ConcernSummary[]> {
  try {
    return await getClient().fetch<ConcernSummary[]>(concernsQuery);
  } catch (error) {
    console.error("[concerns] Sanity fetch failed:", error);
    return [];
  }
}

export default async function ConcernsPage() {
  const concerns = await getConcerns();

  return (
    <main className="flex-1 bg-brand-bone">
      <PageHero
        eyebrow="Your Concerns"
        title="What would you like to improve?"
        lead="Start with your concern. Your doctor will assess what is happening, and design a treatment plan around you."
      />

      <Section ground="bone">
        {/* The rows carry their own padding, so the list is pulled flush with the section. */}
        <ul className="lg:-my-10">
          {concerns.map((concern, index) => (
            <li key={concern._id} className="border-t border-brand-gray-muted/30 first:border-t-0">
              <Reveal>
                <Link
                  href={`/concerns/${concern.slug}`}
                  className="group grid grid-cols-1 gap-5 py-12 lg:grid-cols-12 lg:gap-12 lg:py-10"
                >
                  <span className="text-xs tracking-widest text-brand-champagne-dark lg:col-span-1 lg:pt-3">
                    {pad(index + 1)}
                  </span>
                  <span className="text-2xl font-normal leading-[1.2] tracking-[0.01em] text-brand-black transition-colors group-hover:text-brand-champagne-dark lg:col-span-5 lg:text-3xl">
                    {concern.title}
                  </span>
                  <span className="lg:col-span-5 lg:col-start-8">
                    {concern.summary ? (
                      <span className="block text-[1rem] leading-[1.8] text-brand-gray-text">
                        {concern.summary}
                      </span>
                    ) : null}
                    {concern.relatedConditions?.length ? (
                      <span className="mt-5 block text-[0.65rem] uppercase leading-[2] tracking-widest text-brand-champagne-dark">
                        {concern.relatedConditions.join(" · ")}
                      </span>
                    ) : null}
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section ground="white">
        <Reveal>
          <Eyebrow ground="white">How it works</Eyebrow>
          <Display ground="white" className="mt-8 max-w-3xl">
            From your concern to a personal plan.
          </Display>
        </Reveal>
        <JourneySteps ground="white" />
      </Section>

      <Rail ground="bone" id="medical-dermatology" title="Medical dermatology">
        <Reveal>
          <Prose>
            Alongside aesthetic care, the doctors treat medical skin and hair conditions, including
            psoriasis, vitiligo, dermatitis and warts.
          </Prose>
          <div className="mt-10">
            <TextLink href="/book">Book a consultation</TextLink>
          </div>
        </Reveal>
      </Rail>

      <BeginConsultation />
    </main>
  );
}
