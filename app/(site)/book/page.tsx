import type { Metadata } from "next";

import BookForm, { type ConcernOption } from "@/components/BookForm";
import { getClient } from "@/sanity/lib/client";
import { concernsQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Begin with a consultation. Your doctor will assess your concern and discuss a personalised plan with you.",
  alternates: { canonical: "/book" },
};

export const revalidate = 60;

async function getConcerns(): Promise<ConcernOption[]> {
  try {
    const concerns = await getClient().fetch<{ title: string; slug: string }[]>(concernsQuery);
    return concerns.map(({ title, slug }) => ({ title, slug }));
  } catch (error) {
    console.error("[book] Sanity fetch failed:", error);
    return [];
  }
}

export default async function BookPage() {
  const concerns = await getConcerns();

  return (
    // The navbar is fixed rather than in flow, so the top padding clears it.
    <main className="flex min-h-screen flex-1 items-center justify-center bg-brand-black px-6 pb-24 pt-40 lg:px-10 lg:pb-32 lg:pt-48">
      <BookForm concerns={concerns} />
    </main>
  );
}
