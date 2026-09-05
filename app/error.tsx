"use client";

import { useEffect } from "react";

/**
 * Route-level error boundary. Without this an unhandled error drops the
 * visitor onto Next's default screen, which carries none of the brand and
 * offers no way back.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[route error]", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-1 items-center justify-center bg-brand-black px-6 py-32">
      <div className="w-full max-w-2xl">
        <p className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">
          Something went wrong
        </p>
        <h1 className="mt-10 text-4xl font-normal leading-[1.15] tracking-[0.01em] text-brand-cream sm:text-5xl">
          This page could not be loaded.
        </h1>
        <p className="mt-8 max-w-md text-[0.95rem] font-normal leading-[1.75] text-brand-gray-muted">
          The problem has been logged. You can try again, or call the clinic
          directly if this is urgent.
        </p>
        <div className="mt-16 flex flex-wrap items-center gap-10">
          <button
            type="button"
            onClick={reset}
            className="bg-champagne-gradient-deep px-10 py-5 text-[0.7rem] font-medium uppercase tracking-widest text-brand-white transition-opacity hover:opacity-90"
          >
            Try again
          </button>
          <a
            href="/contact"
            className="border-b border-brand-champagne pb-2 text-[0.65rem] uppercase tracking-widest text-brand-champagne-light transition-colors hover:text-brand-cream"
          >
            Contact the clinic
          </a>
        </div>
      </div>
    </main>
  );
}
