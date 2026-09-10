import Link from "next/link";

import { getClient } from "@/sanity/lib/client";
import { concernsQuery } from "@/sanity/lib/queries";
import type { ConcernSummary } from "@/sanity/lib/types";

export const metadata = { title: "Page not found" };

async function getConcerns(): Promise<ConcernSummary[]> {
  try {
    return await getClient().fetch<ConcernSummary[]>(concernsQuery);
  } catch {
    return [];
  }
}

export default async function NotFound() {
  const concerns = await getConcerns();

  return (
    <main className="flex min-h-screen flex-1 items-center justify-center bg-brand-black px-6 py-32">
      <div className="w-full max-w-2xl">
        <p className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">404</p>
        <h1 className="mt-10 text-4xl font-normal leading-[1.15] tracking-[0.01em] text-brand-cream sm:text-5xl">
          This page has moved, or never existed.
        </h1>
        <p className="mt-8 max-w-md text-[0.95rem] font-normal leading-[1.75] text-brand-gray-muted">
          The site is now organised around what you would like to improve. You may find what you were
          looking for below.
        </p>
        <div className="mt-16 flex flex-wrap items-center gap-10">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center bg-champagne-gradient-deep px-10 py-5 text-[0.7rem] font-medium uppercase tracking-widest text-brand-white transition-opacity hover:opacity-90"
          >
            Home
          </Link>
          <Link
            href="/concerns"
            className="inline-flex min-h-11 items-end border-b border-brand-champagne pb-1.5 text-[0.65rem] uppercase tracking-widest text-brand-champagne-light transition-colors hover:text-brand-cream"
          >
            Your concerns
          </Link>
        </div>

        {concerns.length > 0 ? (
          <div className="mt-20 border-t border-brand-gray-muted/25 pt-10">
            <h2 className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">
              What would you like to improve?
            </h2>
            <ul className="mt-6 flex flex-wrap gap-x-8">
              {concerns.map((concern) => (
                <li key={concern._id}>
                  <Link
                    href={`/concerns/${concern.slug}`}
                    className="inline-flex min-h-11 items-center text-[0.95rem] text-brand-cream transition-colors hover:text-brand-champagne-light"
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
