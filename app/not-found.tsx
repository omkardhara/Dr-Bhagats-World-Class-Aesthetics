import Link from "next/link";

import { getClient } from "@/sanity/lib/client";
import { concernsQuery } from "@/sanity/lib/queries";
import type { Concern } from "@/sanity/lib/types";

export const metadata = { title: "Page not found" };

/** Common entry points, for someone who landed here from a retired URL. */
const SUGGESTED = [
  "acne",
  "hair-loss",
  "melasma",
  "acne-scars",
  "aging",
  "hyperpigmentation",
];

async function getSuggestions(): Promise<Concern[]> {
  try {
    const all = await getClient().fetch<Concern[]>(concernsQuery);
    const bySlug = new Map(all.map((c) => [c.slug, c]));
    return SUGGESTED.map((slug) => bySlug.get(slug)).filter(
      (c): c is Concern => Boolean(c)
    );
  } catch {
    return [];
  }
}

export default async function NotFound() {
  const suggestions = await getSuggestions();

  return (
    <main className="flex min-h-screen flex-1 items-center justify-center bg-brand-black px-6 py-32">
      <div className="w-full max-w-2xl">
        <p className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">
          404
        </p>
        <h1 className="mt-10 text-4xl font-normal leading-[1.15] tracking-[0.01em] text-brand-cream sm:text-5xl">
          This page has moved, or never existed.
        </h1>
        <p className="mt-8 max-w-md text-[0.95rem] font-normal leading-[1.75] text-brand-gray-muted">
          If you followed a link from the previous site, the page may now live
          somewhere else.
        </p>
        <div className="mt-16 flex flex-wrap items-center gap-10">
          <Link
            href="/"
            className="bg-champagne-gradient-deep px-10 py-5 text-[0.7rem] font-medium uppercase tracking-widest text-brand-white transition-opacity hover:opacity-90"
          >
            Home
          </Link>
          <Link
            href="/concerns"
            className="border-b border-brand-champagne pb-2 text-[0.65rem] uppercase tracking-widest text-brand-champagne-light transition-colors hover:text-brand-cream"
          >
            Browse concerns
          </Link>
        </div>

        {suggestions.length > 0 ? (
          <div className="mt-20 border-t border-brand-gray-muted/25 pt-10">
            <h2 className="text-[0.65rem] uppercase tracking-widest text-brand-champagne">
              Commonly looked for
            </h2>
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              {suggestions.map((concern) => (
                <li key={concern._id}>
                  <Link
                    href={`/concerns/${concern.slug}`}
                    className="border-b border-brand-gray-muted/40 pb-1 text-[0.95rem] font-normal text-brand-cream transition-colors hover:border-brand-champagne hover:text-brand-champagne-light"
                  >
                    {concern.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </main>
  );
}
