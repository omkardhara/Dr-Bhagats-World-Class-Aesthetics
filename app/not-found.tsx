import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
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
      </div>
    </main>
  );
}
