import type { Metadata } from "next";
import Link from "next/link";

import Reveal from "@/components/Reveal";
import {
  BeginConsultation,
  Display,
  Eyebrow,
  PageHero,
  Prose,
  Rail,
  Section,
} from "@/components/ui";
import { TECHNOLOGY_CATEGORIES } from "@/sanity/lib/categories";
import { getClient } from "@/sanity/lib/client";
import { technologyQuery } from "@/sanity/lib/queries";
import type { TechnologyItem } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Advanced technology, selected with purpose. Each platform is chosen according to the patient's anatomy, skin, condition and goals.",
  alternates: { canonical: "/technology" },
};

export const revalidate = 60;

const CRITERIA = [
  {
    title: "Your anatomy and skin type",
    body: "Skin tone, thickness and structure determine which technologies are safe and effective for you.",
  },
  {
    title: "The clinical problem",
    body: "Different concerns, and different depths of the same concern, call for different tools.",
  },
  {
    title: "Your goals and downtime",
    body: "The plan reflects the result you want and the recovery you can accommodate.",
  },
  {
    title: "Safety",
    body: "Each platform is used within its established clinical role, at settings chosen for the individual.",
  },
];

async function getTechnology(): Promise<TechnologyItem[]> {
  try {
    return await getClient().fetch<TechnologyItem[]>(technologyQuery);
  } catch (error) {
    console.error("[technology] Sanity fetch failed:", error);
    return [];
  }
}

export default async function TechnologyPage() {
  const items = await getTechnology();
  const featured = items.filter((item) => item.featured);
  const groups = TECHNOLOGY_CATEGORIES.map((category) => ({
    ...category,
    items: items.filter((item) => item.category === category.value),
  })).filter((group) => group.items.length > 0);

  return (
    <main className="flex-1 bg-brand-bone">
      <PageHero
        eyebrow="Technology"
        title="Advanced technology, selected with purpose."
        lead="Our technology is a genuine strength. It is never the starting point."
      />

      <Rail ground="bone" index={1} title="How we select technology">
        <Reveal>
          <Prose>
            We invest in technology so that we have the right tool for each patient, rather than
            fitting each patient to a tool. The choice always follows the assessment.
          </Prose>
        </Reveal>
        <ul className="mt-12">
          {CRITERIA.map((criterion, index) => (
            <li key={criterion.title} className="border-t border-brand-gray-muted/30 py-8">
              <Reveal index={index}>
                <h3 className="text-xl font-normal tracking-[0.01em] text-brand-black">{criterion.title}</h3>
                <p className="mt-3 max-w-xl text-[0.95rem] leading-[1.8] text-brand-gray-text">
                  {criterion.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Rail>

      <Rail ground="white" index={2} title="Knowing when not to">
        <Reveal>
          <Prose ground="white">
            Knowing when a technology will not help, or when a simpler approach will serve you better,
            is as much a part of clinical judgement as knowing when it will.
          </Prose>
        </Reveal>
      </Rail>

      {featured.length > 0 ? (
        <Section ground="black">
          <Reveal>
            <Eyebrow ground="black">Selected platforms</Eyebrow>
            <Display ground="black" className="mt-8 max-w-3xl">
              Tools in the hands of the doctor.
            </Display>
          </Reveal>
          <ul className="mt-20 grid grid-cols-1 gap-x-16 md:grid-cols-2">
            {featured.map((item, index) => (
              <li key={item._id} className="border-t border-brand-gray-muted/25 py-10">
                <Reveal index={index % 2}>
                  <Link href={`/technology/${item.slug}`} className="group block">
                    <span className="block text-2xl font-normal tracking-[0.01em] text-brand-cream transition-colors group-hover:text-brand-champagne-light">
                      {item.name}
                    </span>
                    {item.purpose ? (
                      <span className="mt-4 block text-[0.95rem] leading-[1.8] text-brand-gray-muted">
                        {item.purpose}
                      </span>
                    ) : null}
                  </Link>
                  {item.concerns?.length ? (
                    <p className="mt-6 text-[0.65rem] uppercase leading-[2] tracking-widest text-brand-champagne-light">
                      Within plans for {item.concerns.map((concern) => concern.title).join(" · ")}
                    </p>
                  ) : null}
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {groups.length > 0 ? (
        <Rail ground="bone" title="The wider portfolio">
          {groups.map((group) => (
            <div
              key={group.value}
              className="border-t border-brand-gray-muted/30 py-8 first:border-t-0 first:pt-0"
            >
              <Eyebrow>{group.label}</Eyebrow>
              <ul className="mt-4 flex flex-wrap gap-x-8">
                {group.items.map((item) => (
                  <li key={item._id}>
                    <Link
                      href={`/technology/${item.slug}`}
                      className="inline-flex min-h-11 items-center text-[1.05rem] text-brand-black transition-colors hover:text-brand-champagne-dark"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Rail>
      ) : null}

      <BeginConsultation />
    </main>
  );
}
