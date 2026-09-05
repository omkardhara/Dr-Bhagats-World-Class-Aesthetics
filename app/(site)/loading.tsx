/**
 * Shown while a segment streams in. Deliberately quiet - a spinner would be
 * louder than anything else on these pages.
 */
export default function Loading() {
  return (
    <main className="flex min-h-screen flex-1 items-center justify-center bg-brand-black">
      <span className="sr-only">Loading</span>
      <span className="h-px w-24 animate-pulse bg-champagne-gradient" aria-hidden />
    </main>
  );
}
