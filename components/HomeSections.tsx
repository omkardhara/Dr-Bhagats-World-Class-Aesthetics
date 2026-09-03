"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import {
  useEditorialMotion,
  VIEWPORT_BLOCK,
  VIEWPORT_ITEM,
} from "@/components/editorialMotion";
import type { CoreService, Testimonial } from "@/sanity/lib/types";

/**
 * PLACEHOLDER: these figures came from the retired site and are unverified
 * against current records. Confirm before launch - they are trust claims.
 */
const STATS = [
  { value: "21", label: "Years of practice" },
  { value: "100,000+", label: "Treatments delivered" },
  { value: "4.5★", label: "Google rating" },
  { value: "32+", label: "Trained team members" },
];

export function Stats() {
  const { block, item } = useEditorialMotion();

  return (
    <motion.section
      variants={block}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_BLOCK}
      className="border-t border-brand-gray-muted/25 bg-brand-white"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-12 px-6 py-24 lg:grid-cols-4 lg:px-10 lg:py-32">
        {STATS.map((stat, index) => (
          <motion.div
            key={stat.label}
            custom={index}
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT_ITEM}
          >
            <p className="text-3xl font-thin tracking-tight text-brand-black lg:text-4xl">
              {stat.value}
            </p>
            <p className="mt-4 text-[0.65rem] uppercase tracking-widest text-brand-gray-muted">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export function ServicesPreview({ services }: { services: CoreService[] }) {
  const { block, item } = useEditorialMotion();

  if (services.length === 0) return null;

  return (
    <motion.section
      variants={block}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_BLOCK}
      className="border-t border-brand-gray-muted/25 bg-brand-white"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          <header className="lg:col-span-4">
            <p className="text-[0.65rem] uppercase tracking-widest text-brand-champagne">
              What we do
            </p>
            <h2 className="mt-8 text-2xl font-light uppercase leading-snug tracking-widest text-brand-black lg:text-3xl">
              Core Services
            </h2>
            <span className="mt-8 block h-px w-16 bg-champagne-gradient" />
          </header>

          <ul className="lg:col-span-7 lg:col-start-6">
            {services.map((service, index) => (
              <motion.li
                key={service._id}
                custom={index}
                variants={item}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT_ITEM}
                className="border-t border-brand-gray-muted/30 py-10 first:border-t-0 first:pt-0"
              >
                <h3 className="text-lg font-light tracking-wide text-brand-black">
                  {service.title}
                </h3>
                {service.treatments && service.treatments.length > 0 ? (
                  <p className="mt-4 text-sm font-light leading-loose text-brand-gray-muted">
                    {service.treatments.map((t) => t.name).join(" · ")}
                  </p>
                ) : null}
              </motion.li>
            ))}
          </ul>
        </div>

        <Link
          href="/services"
          className="mt-16 inline-block border-b border-brand-champagne pb-2 text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark transition-colors hover:text-brand-black"
        >
          All services
        </Link>
      </div>
    </motion.section>
  );
}

export function Testimonials({ items }: { items: Testimonial[] }) {
  const { block, item } = useEditorialMotion();

  if (items.length === 0) return null;

  return (
    <motion.section
      variants={block}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_BLOCK}
      className="bg-brand-black"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <p className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">
          In their words
        </p>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          {items.map((testimonial, index) => (
            <motion.figure
              key={testimonial._id}
              custom={index}
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_ITEM}
            >
              <blockquote className="text-sm font-light leading-loose text-brand-cream/80">
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-8 text-[0.65rem] uppercase tracking-widest text-brand-gray-muted">
                {testimonial.author}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
