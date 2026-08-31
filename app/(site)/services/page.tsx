import Link from "next/link";

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
        <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-champagne-light">
            Services
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl font-medium leading-tight tracking-tight text-brand-white sm:text-5xl lg:text-6xl">
            Considered treatment, not a menu.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-gray-muted">
            Every protocol is built around a diagnosis first, then the platform
            best suited to deliver it.
          </p>
          <div className="mt-10 h-px w-full bg-champagne-gradient" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        {services.length === 0 ? (
          <p className="text-brand-gray-muted">
            No services published yet. Add them in the{" "}
            <Link className="text-brand-champagne-dark underline" href="/studio">
              Studio
            </Link>
            .
          </p>
        ) : (
          <div className="flex flex-col gap-20">
            {services.map((service) => (
              <article key={service._id}>
                <header className="flex flex-col gap-4 border-b border-brand-gray-light pb-6">
                  <div className="h-1 w-12 bg-champagne-gradient" />
                  <h2 className="text-2xl font-medium tracking-tight text-brand-black sm:text-3xl">
                    {service.title}
                  </h2>
                </header>

                {service.treatments && service.treatments.length > 0 ? (
                  <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {service.treatments.map((treatment) => (
                      <div
                        key={treatment._id}
                        className="flex flex-col border border-brand-gray-light p-8 transition-colors hover:border-brand-champagne-light"
                      >
                        <h3 className="text-lg font-medium tracking-tight text-brand-black">
                          {treatment.name}
                        </h3>

                        {treatment.description ? (
                          <p className="mt-4 text-sm leading-relaxed text-brand-gray-muted">
                            {treatment.description}
                          </p>
                        ) : null}

                        {treatment.machines && treatment.machines.length > 0 ? (
                          <ul className="mt-6 flex flex-wrap gap-2 border-t border-brand-gray-light pt-6">
                            {treatment.machines.map((machine) => (
                              <li
                                key={machine._id}
                                className="rounded-full border border-brand-champagne-light px-3 py-1 text-xs text-brand-champagne-dark"
                              >
                                {machine.name}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
