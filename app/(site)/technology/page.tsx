import type { Metadata } from "next";
import Link from "next/link";

import { BeginConsultation, Display, PageHero, Prose, Rail, Section, type Ground } from "@/components/ui";
import { technologyHref } from "@/lib/links";
import { TECHNOLOGY_CATEGORIES } from "@/sanity/lib/categories";
import { getClient } from "@/sanity/lib/client";
import { technologyQuery } from "@/sanity/lib/queries";
import type { TechnologyItem } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Technology, selected with purpose. We select technology according to the patient's anatomy, skin condition, goals and clinical needs.",
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
 * Every technology is a small card of equal size. Only the few signature
 * technologies with a dedicated page carry a link, so nothing competes for
 * attention as a hero.
 */
export default async function TechnologyPage() {
  const items = await getTechnology();
  const groups = TECHNOLOGY_CATEGORIES.map((category) => ({
    ...category,
    items: items.filter((item) => item.categories?.includes(category.value)),
  })).filter((group) => group.items.length > 0);

  // A technology can appear in more than one category. Only its first card
  // carries the id that /technology#slug links point to.
  const anchored = new Set<string>();

  return (
    <main className="flex-1 bg-brand-bone">
      <PageHero
        eyebrow="Technology"
        title="Technology, selected with purpose."
        lead="We don’t choose treatments because a technology is available. We select technology according to the patient’s anatomy, skin condition, goals and clinical needs."
      />

      {groups.length > 0 ? (
        <nav aria-label="Technology categories" className="border-b border-brand-gray-muted/20 bg-brand-bone">
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
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {group.items.map((item) => {
                const id = anchored.has(item.slug) ? undefined : item.slug;
                anchored.add(item.slug);
                return (
                  <li
                    key={item._id}
                    id={id}
                    className={`flex scroll-mt-28 flex-col border p-6 xl:scroll-mt-40 ${
                      item.dedicatedPage ? "border-brand-champagne-dark/60" : "border-brand-gray-muted/30"
                    }`}
                  >
                    <h3 className="text-lg font-normal tracking-[0.01em] text-brand-black">{item.name}</h3>
                    {item.purpose ? (
                      <p className="mt-3 text-[0.9rem] leading-[1.7] text-brand-gray-text">{item.purpose}</p>
                    ) : null}
                    {item.dedicatedPage ? (
                      <Link
                        href={technologyHref(item)}
                        className="mt-auto inline-flex min-h-11 items-end self-start border-b border-brand-champagne-dark pb-1.5 pt-6 text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark transition-colors hover:text-brand-black"
                      >
                        Discover {item.name}
                      </Link>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </Rail>
        );
      })}

      <Section ground={groups.length % 2 === 0 ? "bone" : "white"}>
        <Display ground={groups.length % 2 === 0 ? "bone" : "white"} className="max-w-3xl">
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
