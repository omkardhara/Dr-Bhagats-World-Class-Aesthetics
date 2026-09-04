import Link from "next/link";

import { getClient } from "@/sanity/lib/client";
import { concernsQuery } from "@/sanity/lib/queries";
import type { Concern, ConcernCategory } from "@/sanity/lib/types";

export const metadata = {
  title: "Concerns",
  description: "Find treatment by what you would like to address.",
};

export const revalidate = 60;

const CATEGORY_ORDER: ConcernCategory[] = ["skin", "face", "hair", "body"];
const CATEGORY_LABEL: Record<ConcernCategory, string> = {
  skin: "Skin",
  face: "Face",
  hair: "Hair",
  body: "Body",
};

async function getConcerns(): Promise<Concern[]> {
  try {
    return await getClient().fetch<Concern[]>(concernsQuery);
  } catch (error) {
    console.error("[concerns] Sanity fetch failed:", error);
    return [];
  }
}

export default async function ConcernsPage() {
  const concerns = await getConcerns();

  return (
    <main className="flex-1 bg-brand-bone">
      <section className="bg-brand-black">
        <div className="mx-auto w-full max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
          <p className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">
            Concerns
          </p>
          <h1 className="mt-10 max-w-3xl text-4xl font-normal leading-tight tracking-[0.01em] text-brand-white sm:text-5xl lg:text-6xl">
            Start with what you would like to address.
          </h1>
          <span className="mt-16 block h-px w-full bg-champagne-gradient" />
        </div>
      </section>

      <div className="divide-y divide-brand-gray-muted/25">
        {CATEGORY_ORDER.map((category) => {
          const inCategory = concerns.filter((c) => c.category === category);
          if (inCategory.length === 0) return null;

          return (
            <section
              key={category}
              className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32"
            >
              <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
                <header className="lg:col-span-4">
                  <div className="lg:sticky lg:top-32">
                    <h2 className="text-2xl font-normal uppercase tracking-widest text-brand-black lg:text-3xl">
                      {CATEGORY_LABEL[category]}
                    </h2>
                    <span className="mt-8 block h-px w-16 bg-champagne-gradient" />
                  </div>
                </header>

                <ul className="lg:col-span-7 lg:col-start-6">
                  {inCategory.map((concern) => (
                    <li
                      key={concern._id}
                      className="border-t border-brand-gray-muted/30 first:border-t-0"
                    >
                      <Link
                        href={`/concerns/${concern.slug}`}
                        className="group flex items-baseline justify-between gap-8 py-8 transition-colors"
                      >
                        <span className="text-lg font-normal tracking-wide text-brand-black transition-colors group-hover:text-brand-champagne-dark">
                          {concern.title}
                        </span>
                        <span
                          aria-hidden
                          className="text-[0.65rem] uppercase tracking-widest text-brand-gray-text transition-colors group-hover:text-brand-champagne"
                        >
                          View
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
