"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import type { CoreService } from "@/sanity/lib/types";

/** Slow, weighted easing - avoids the springy feel of the default curve. */
const EASE = [0.22, 1, 0.36, 1] as const;

function useVariants(): { block: Variants; item: Variants } {
  const reduced = useReducedMotion();
  const rise = reduced ? 0 : 28;

  return {
    block: {
      hidden: { opacity: 0, y: rise },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: reduced ? 0 : 1.1, ease: EASE },
      },
    },
    item: {
      hidden: { opacity: 0, y: rise },
      show: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          duration: reduced ? 0 : 0.9,
          ease: EASE,
          delay: reduced ? 0 : index * 0.09,
        },
      }),
    },
  };
}

export default function ServicesEditorial({
  services,
}: {
  services: CoreService[];
}) {
  const { block, item } = useVariants();

  return (
    <div className="divide-y divide-brand-gray-muted/25">
      {services.map((service, serviceIndex) => (
        <motion.section
          key={service._id}
          variants={block}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-96px" }}
          className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32"
        >
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
            {/* Service title - stays with the reader while treatments scroll */}
            <header className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <span className="block text-xs font-light tracking-widest text-brand-champagne">
                  {String(serviceIndex + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-8 text-2xl font-light uppercase leading-snug tracking-widest text-brand-black lg:text-3xl">
                  {service.title}
                </h2>
                <span className="mt-8 block h-px w-16 bg-champagne-gradient" />
              </div>
            </header>

            <div className="lg:col-span-7 lg:col-start-6">
              {service.treatments && service.treatments.length > 0 ? (
                <ul>
                  {service.treatments.map((treatment, treatmentIndex) => (
                    <motion.li
                      key={treatment._id}
                      custom={treatmentIndex}
                      variants={item}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: "-64px" }}
                      className="border-t border-brand-gray-muted/30 py-10 first:border-t-0 first:pt-0"
                    >
                      <h3 className="text-lg font-light tracking-wide text-brand-black">
                        {treatment.name}
                      </h3>

                      {treatment.description ? (
                        <p className="mt-4 max-w-xl text-sm font-light leading-loose text-brand-gray-muted">
                          {treatment.description}
                        </p>
                      ) : null}

                      {treatment.machines && treatment.machines.length > 0 ? (
                        <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark">
                          {treatment.machines.map((machine, machineIndex) => (
                            <span
                              key={machine._id}
                              className="flex items-center gap-x-3"
                            >
                              {machineIndex > 0 ? (
                                <span
                                  aria-hidden
                                  className="h-3 w-px bg-brand-gray-muted/40"
                                />
                              ) : null}
                              {machine.name}
                            </span>
                          ))}
                        </p>
                      ) : null}
                    </motion.li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </motion.section>
      ))}
    </div>
  );
}
