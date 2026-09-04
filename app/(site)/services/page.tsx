import Link from "next/link";

import ServicesEditorial from "@/components/ServicesEditorial";
import { getClient } from "@/sanity/lib/client";
import { coreServicesQuery } from "@/sanity/lib/queries";
import type { CoreService } from "@/sanity/lib/types";

export const metadata = {
  title: "Services",
  description: "Clinical services, treatment by treatment.",
};

export const revalidate = 60;

async function getServices(): Promise<CoreService[]> {
  try {
    return await getClient().fetch<CoreService[]>(coreServicesQuery);
  } catch (error) {
    console.error("[services] Sanity fetch failed:", error);
    return [];
  }
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main className="flex-1 bg-brand-white">
      <section className="bg-brand-black">
        <div className="mx-auto w-full max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
          <p className="text-xs font-light uppercase tracking-widest text-brand-champagne-light">
            Services
          </p>
          <h1 className="mt-10 max-w-3xl text-4xl font-light leading-tight tracking-tight text-brand-white sm:text-5xl lg:text-6xl">
            Considered treatment, not a menu.
          </h1>
          <p className="mt-8 max-w-xl text-sm font-light leading-loose text-brand-gray-muted">
            Every protocol begins with a diagnosis, then the platform best
            suited to deliver it.
          </p>
          <span className="mt-16 block h-px w-full bg-champagne-gradient" />
        </div>
      </section>

      {services.length === 0 ? (
        <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <p className="text-sm font-light text-brand-gray-text">
            No services published yet. Add them in the{" "}
            <Link className="text-brand-champagne-dark underline" href="/studio">
              Studio
            </Link>
            .
          </p>
        </section>
      ) : (
        <ServicesEditorial services={services} />
      )}
    </main>
  );
}
