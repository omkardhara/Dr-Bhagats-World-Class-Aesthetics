"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import {
  useEditorialMotion,
  VIEWPORT_ITEM,
} from "@/components/editorialMotion";
import type { Doctor } from "@/sanity/lib/types";

export type DoctorWithPortrait = Doctor & {
  portraitUrl?: string | null;
  portraitAlt?: string | null;
};

/**
 * PLACEHOLDER: the practice narrative is scaffolding. This is a real medical
 * practice, so its history and claims must come from the clinic. Doctor
 * records are real and edited in the Studio.
 */
const NARRATIVE = [
  {
    era: "The practice",
    body: [
      "Placeholder. Describe the practice as it stands today: who it treats, and the standard it holds itself to.",
    ],
  },
  {
    era: "The standard",
    body: [
      "Placeholder. Describe how technology is selected, and why devices are retired.",
    ],
  },
];

export default function AboutEditorial({
  doctors,
}: {
  doctors: DoctorWithPortrait[];
}) {
  const { item } = useEditorialMotion();

  return (
    <div className="flex flex-col gap-32 lg:gap-40">
      {doctors.map((doctor) => (
        <motion.section
          key={doctor._id}
          custom={0}
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ITEM}
        >
          {doctor.portraitUrl ? (
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-brand-gray-dark">
              <Image
                src={doctor.portraitUrl}
                alt={doctor.portraitAlt ?? `Portrait of ${doctor.name}`}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          ) : (
            /* Neutral placeholder on purpose. A stock face here would be a
               fabricated likeness of a named, real clinician. */
            <div
              role="img"
              aria-label={`Portrait of ${doctor.name} — awaiting photography`}
              className="flex aspect-[3/4] w-full items-end bg-brand-gray-dark p-8"
            >
              <span className="text-[0.6rem] uppercase tracking-widest text-brand-gray-muted">
                Awaiting portrait
              </span>
            </div>
          )}
          <h2 className="mt-10 text-2xl font-normal tracking-wide text-brand-cream">
            {doctor.name}
          </h2>
          {doctor.role ? (
            <p className="mt-4 text-[0.65rem] uppercase tracking-widest text-brand-champagne">
              {doctor.role}
            </p>
          ) : null}
          {doctor.bio ? (
            <p className="mt-8 max-w-xl text-[1.05rem] font-normal leading-[1.7] text-brand-cream/80">
              {doctor.bio}
            </p>
          ) : null}
          {doctor.qualifications && doctor.qualifications.length > 0 ? (
            <ul className="mt-10">
              {doctor.qualifications.map((qualification) => (
                <li
                  key={qualification}
                  className="border-t border-brand-gray-muted/30 py-4 text-[0.8rem] font-normal leading-[1.7] text-brand-gray-muted"
                >
                  {qualification}
                </li>
              ))}
            </ul>
          ) : null}
        </motion.section>
      ))}

      {NARRATIVE.map((entry) => (
        <motion.section
          key={entry.era}
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
            {entry.body.map((paragraph, index) => (
              <p
                key={index}
                className="max-w-xl text-[1.05rem] font-normal leading-[1.7] text-brand-cream/80"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </motion.section>
      ))}
    </div>
  );
}
