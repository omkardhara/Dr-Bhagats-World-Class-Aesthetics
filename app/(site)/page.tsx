import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 bg-brand-cream p-24">
      <h1 className="text-4xl font-medium tracking-tight text-brand-black">
        Brand Site
      </h1>
      <p className="text-brand-gray-muted">
        Next.js App Router · TypeScript · Tailwind · Sanity Studio at{" "}
        <Link className="text-brand-champagne-dark underline" href="/studio">
          /studio
        </Link>
      </p>
      <div className="h-24 w-full max-w-xl rounded-lg bg-champagne-gradient" />
    </main>
  );
}
