import { getClient } from "@/sanity/lib/client";
import { testimonialsQuery } from "@/sanity/lib/queries";
import type { Testimonial } from "@/sanity/lib/types";

export const metadata = {
  title: "Patient Stories",
  description: "What patients say about the practice.",
  alternates: { canonical: "/testimonials" },
};

export const revalidate = 60;

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    return await getClient().fetch<Testimonial[]>(testimonialsQuery);
  } catch (error) {
    console.error("[testimonials] Sanity fetch failed:", error);
    return [];
  }
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <main className="flex-1 bg-brand-white">
      <section className="bg-brand-black">
        <div className="mx-auto w-full max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
          <p className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">
            Patient stories
          </p>
          <h1 className="mt-10 max-w-3xl text-4xl font-light leading-tight tracking-tight text-brand-white sm:text-5xl lg:text-6xl">
            In their words.
          </h1>
          <span className="mt-16 block h-px w-full bg-champagne-gradient" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        {testimonials.length === 0 ? (
          <p className="text-sm font-light text-brand-gray-muted">
            No patient stories published yet.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-x-16 gap-y-16 lg:grid-cols-2">
            {testimonials.map((testimonial) => (
              <li
                key={testimonial._id}
                className="border-t border-brand-gray-muted/30 pt-10"
              >
                <blockquote className="text-base font-light leading-loose text-brand-gray-muted">
                  {testimonial.quote}
                </blockquote>
                <p className="mt-8 text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark">
                  {testimonial.author}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
