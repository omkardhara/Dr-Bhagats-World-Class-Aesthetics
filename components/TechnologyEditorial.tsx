"use client";

import { motion } from "framer-motion";

import {
  useEditorialMotion,
  VIEWPORT_BLOCK,
  VIEWPORT_ITEM,
} from "@/components/editorialMotion";
import type { TechnologyPillar } from "@/sanity/lib/types";

export default function TechnologyEditorial({
  pillars,
}: {
  pillars: TechnologyPillar[];
}) {
  const { block, item } = useEditorialMotion();

  return (
    <div className="divide-y divide-brand-gray-muted/25">
      {pillars.map((pillar, pillarIndex) => (
        <motion.section
          key={pillar._id}
          variants={block}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_BLOCK}
          className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32"
        >
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
            <header className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <span className="block text-xs font-light tracking-widest text-brand-champagne">
                  {String(pillarIndex + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-8 text-2xl font-light uppercase leading-snug tracking-widest text-brand-black lg:text-3xl">
                  {pillar.title}
                </h2>
                <span className="mt-8 block h-px w-16 bg-champagne-gradient" />
              </div>
            </header>

            <div className="lg:col-span-7 lg:col-start-6">
              {pillar.description ? (
                <motion.p
                  custom={0}
                  variants={item}
                  initial="hidden"
                  whileInView="show"
                  viewport={VIEWPORT_ITEM}
                  className="max-w-xl text-base font-light leading-loose text-brand-gray-muted"
                >
                  {pillar.description}
                </motion.p>
              ) : null}

              {pillar.machines && pillar.machines.length > 0 ? (
                <ul className="mt-16">
                  {pillar.machines.map((machine, machineIndex) => (
                    <motion.li
                      key={machine._id}
                      custom={machineIndex + 1}
                      variants={item}
                      initial="hidden"
                      whileInView="show"
                      viewport={VIEWPORT_ITEM}
                      className="border-t border-brand-gray-muted/30 py-10"
                    >
                      <h3 className="text-[0.7rem] uppercase tracking-widest text-brand-champagne-dark">
                        {machine.name}
                      </h3>
                      {machine.description ? (
                        <p className="mt-4 max-w-xl text-sm font-light leading-loose text-brand-gray-muted">
                          {machine.description}
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
