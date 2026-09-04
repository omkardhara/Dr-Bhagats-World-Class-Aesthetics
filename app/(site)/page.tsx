import Link from "next/link";

import {
  ServicesPreview,
  Stats,
  Testimonials,
} from "@/components/HomeSections";
import EditorialImage from "@/components/EditorialImage";
import { BRAND } from "@/lib/site";
import { STOCK } from "@/lib/stockImages";
import { getClient } from "@/sanity/lib/client";
import {
  coreServicesQuery,
  featuredTestimonialsQuery,
} from "@/sanity/lib/queries";
import type { CoreService, Testimonial } from "@/sanity/lib/types";

export const revalidate = 60;

async function getHomeContent() {
  try {
    const client = getClient();
    const [services, testimonials] = await Promise.all([
      client.fetch<CoreService[]>(coreServicesQuery),
      client.fetch<Testimonial[]>(featuredTestimonialsQuery),
    ]);
    return { services, testimonials };
  } catch (error) {
    console.error("[home] Sanity fetch failed:", error);
    return { services: [], testimonials: [] };
  }
}

export default async function Home() {
  const { services, testimonials } = await getHomeContent();

  return (
    <main className="flex-1 bg-brand-white">
      <section className="bg-brand-black">
        <div className="mx-auto w-full max-w-7xl px-6 py-32 lg:px-10 lg:py-48">
          <p className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">
            Mumbai &amp; Navi Mumbai
          </p>
          <h1 className="mt-10 max-w-4xl text-4xl font-thin leading-[1.15] tracking-tight text-brand-cream sm:text-5xl lg:text-7xl">
            {BRAND.name}
          </h1>
          <p className="mt-10 max-w-xl text-sm font-light leading-loose text-brand-gray-muted">
            {/* PLACEHOLDER: replace with the practice's own positioning line. */}
            Medical aesthetics, dermatology and laser treatment, led by
            consultant dermatologists.
          </p>

          <div className="mt-16 flex flex-wrap items-center gap-10">
            <Link
              href="/book"
              className="bg-champagne-gradient px-10 py-5 text-[0.7rem] font-medium uppercase tracking-widest text-brand-white transition-opacity hover:opacity-90"
            >
              Book Consultation
            </Link>
            <Link
              href="/technology"
              className="border-b border-brand-champagne pb-2 text-[0.65rem] uppercase tracking-widest text-brand-champagne-light transition-colors hover:text-brand-cream"
            >
              Our technology
            </Link>
          </div>
        </div>
      </section>

      <Stats />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <EditorialImage fallback={STOCK.clinicalRoom} />
      </div>

      <ServicesPreview services={services} />
      <Testimonials items={testimonials} />
    </main>
  );
}
