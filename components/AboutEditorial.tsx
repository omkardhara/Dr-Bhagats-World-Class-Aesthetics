"use client";

import { motion } from "framer-motion";

import {
  useEditorialMotion,
  VIEWPORT_ITEM,
} from "@/components/editorialMotion";

/**
 * PLACEHOLDER CONTENT.
 *
 * Every entry below is scaffolding. This is a real medical practice, so the
 * history, dates and claims must come from the clinic - none of it is invented
 * here beyond obviously neutral phrasing. Replace before publishing.
 */
type Entry =
  | { kind: "prose"; era: string; body: string[] }
  | { kind: "image"; caption: string };

const ENTRIES: Entry[] = [
  {
    kind: "prose",
    era: "The beginning",
    body: [
      "Placeholder. Describe how the practice started, and what it set out to do differently.",
      "A second paragraph for the founding intent, in the clinic's own words.",
    ],
  },
  { kind: "image", caption: "Portrait — placeholder" },
  {
    kind: "prose",
    era: "The practice today",
    body: [
      "Placeholder. Describe the practice as it stands: who it treats, and the standard it holds itself to.",
    ],
  },
  { kind: "image", caption: "Interior — placeholder" },
  {
    kind: "prose",
    era: "The standard",
    body: [
      "Placeholder. Describe how technology is selected, and why devices are retired.",
      "A closing paragraph on the result the practice is aiming for.",
    ],
  },
];

export default function AboutEditorial() {
  const { item } = useEditorialMotion();

  return (
    <div className="flex flex-col gap-32 lg:gap-40">
      {ENTRIES.map((entry, index) =>
        entry.kind === "image" ? (
          <motion.figure
            key={`image-${index}`}
            custom={0}
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT_ITEM}
          >
            {/* Structural placeholder — swap for the clinic's photography. */}
            <div
              role="img"
              aria-label={entry.caption}
              className="aspect-[3/4] w-full bg-brand-gray-dark"
            />
            <figcaption className="mt-6 text-[0.65rem] uppercase tracking-widest text-brand-gray-muted">
              {entry.caption}
            </figcaption>
          </motion.figure>
        ) : (
          <motion.section
            key={`prose-${index}`}
            custom={0}
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT_ITEM}
          >
            <h2 className="text-[0.65rem] uppercase tracking-widest text-brand-champagne">
              {entry.era}
            </h2>
            <div className="mt-10 flex flex-col gap-8">
              {entry.body.map((paragraph, paragraphIndex) => (
                <p
                  key={paragraphIndex}
                  className="max-w-xl text-base font-light leading-loose text-brand-cream/80"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.section>
        )
      )}
    </div>
  );
}
