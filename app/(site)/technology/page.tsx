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
  type Ground,
} from "@/components/ui";
import { technologyHref } from "@/lib/links";
import { TECHNOLOGY_CATEGORIES } from "@/sanity/lib/categories";
import { getClient } from "@/sanity/lib/client";
import { technologyQuery } from "@/sanity/lib/queries";
import type { TechnologyItem } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "The right technology for the right indication. At Dr Bhagat's, technology is organised by what it is chosen to treat, and selected after assessment.",
  alternates: { canonical: "/technology" },
};

export const revalidate = 60;

async function getTechnology(): Promise<TechnologyItem[]> {
  try {
    return await getClient().fetch<TechnologyItem[]>(technologyQuery);
  } catch (error) {
    console.error("[technology] Sanity fetch failed:", error);
    return [];
  }
}

/**
 * Technology organised by clinical indication rather than as a catalogue of
 * machines: the question a patient arrives with comes first, the platforms that
 * may answer it come second, and the doctors' reasons sit with them. A
 * technology appears under every indication it is genuinely selected for.
 */
export default async function TechnologyPage() {
  const items = await getTechnology();
  const groups = TECHNOLOGY_CATEGORIES.map((category) => ({
    ...category,
    items: items.filter((item) => item.categories?.includes(category.value)),
  })).filter((group) => group.items.length > 0);

  // A technology appears under several indications. Only its first appearance
  // carries the id that /technology#slug links point to.
  const anchored = new Set<string>();

  return (
    <main className="flex-1 bg-brand-bone">
      <PageHero
        eyebrow="Technology"
        title="The right technology for the right indication."
        lead="Technology is never the starting point. The concern is assessed, the strategy is decided, and only then is the platform chosen - which is why the same technology appears under more than one indication here, and why two patients asking for the same thing rarely receive the same treatment."
      />

      {groups.length > 0 ? (
        <nav aria-label="Indications" className="border-b border-brand-gray-muted/20 bg-brand-bone">
          <ul className="mx-auto flex w-full max-w-7xl flex-wrap gap-x-8 px-6 py-4 lg:px-10">
            {groups.map((group) => (
              <li key={group.value}>
                <a
                  href={`#${group.value}`}
                  className="inline-flex min-h-11 items-center text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark transition-colors hover:text-brand-black"
                >
                  {group.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      {groups.map((group, index) => {
        const ground: Ground = index % 2 === 0 ? "bone" : "white";
        return (
          <Rail key={group.value} id={group.value} ground={ground} title={group.label}>
            <Reveal>
              <p className="max-w-2xl text-[1.05rem] leading-[1.8] text-brand-gray-text">{group.note}</p>
            </Reveal>
            <ul className="mt-12">
              {group.items.map((item, itemIndex) => {
                const id = anchored.has(item.slug) ? undefined : item.slug;
                anchored.add(item.slug);
                return (
                  <li
                    key={`${group.value}-${item._id}`}
                    id={id}
                    className="scroll-mt-28 border-t border-brand-gray-muted/30 py-8 first:border-t-0 first:pt-0"
                  >
                    <Reveal index={itemIndex % 3}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                        <h3 className="text-xl font-normal tracking-[0.01em] text-brand-black lg:text-2xl">
                          {item.name}
                        </h3>
                        {item.dedicatedPage ? (
                          <Link
                            href={technologyHref(item)}
                            className="inline-flex min-h-11 items-center text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark transition-colors hover:text-brand-black"
                          >
                            How we use it
                          </Link>
                        ) : null}
                      </div>
                      {item.purpose ? (
                        <p className="mt-3 max-w-2xl text-[0.95rem] leading-[1.75] text-brand-gray-text">
                          {item.purpose}
                        </p>
                      ) : null}
                      {/* The doctors' own reason, so a platform never stands alone. */}
                      {item.whyWeUse ? (
                        <blockquote className="mt-5 max-w-2xl border-l border-brand-champagne-dark pl-6">
                          <p className="text-[0.95rem] leading-[1.8] text-brand-black">{item.whyWeUse}</p>
                          {item.whyWeUseBy ? (
                            <footer className="mt-3 text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark">
                              {item.whyWeUseBy}
                            </footer>
                          ) : null}
                        </blockquote>
                      ) : null}
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </Rail>
        );
      })}

      <Section ground={groups.length % 2 === 0 ? "bone" : "white"}>
        <Eyebrow ground={groups.length % 2 === 0 ? "bone" : "white"}>How we decide</Eyebrow>
        <Display ground={groups.length % 2 === 0 ? "bone" : "white"} className="mt-8 max-w-3xl">
          The doctor decides. Technology supports.
        </Display>
        <Prose ground={groups.length % 2 === 0 ? "bone" : "white"} className="mt-8">
          Knowing when a technology will not help is as much a part of clinical judgement as knowing
          when it will.
        </Prose>
        {/* The doctors' own statement of the site's strategic heart. */}
        <ul className="mt-14 max-w-3xl">
          {[
            "Machines are our tools.",
            "Clinical expertise is our product.",
            "The Dr Bhagat’s experience is our brand.",
          ].map((line) => (
            <li
              key={line}
              className="border-t border-brand-gray-muted/30 py-5 text-2xl font-normal tracking-[0.01em] text-brand-black"
            >
              {line}
            </li>
          ))}
        </ul>
      </Section>

      <BeginConsultation />
    </main>
  );
}
