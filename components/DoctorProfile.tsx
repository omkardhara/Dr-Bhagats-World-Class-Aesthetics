import Link from "next/link";
import type { ReactNode } from "react";

import Reveal from "@/components/Reveal";
import SanityPicture from "@/components/SanityPicture";
import { Eyebrow, TextLink } from "@/components/ui";
import { DOCTOR_PAGES, doctorHref, doctorPortraitAlt } from "@/lib/doctors";
import { paragraphs } from "@/lib/format";
import { technologyHref } from "@/lib/links";
import { DOCTOR_SHOTS } from "@/lib/shotList";
import type { Doctor } from "@/sanity/lib/types";

/** Renders nothing when empty, so a profile never shows a heading without content. */
function Credential({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-t border-brand-gray-muted/25 py-8">
      <h3 className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">{title}</h3>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function CredentialList({ title, items }: { title: string; items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <Credential title={title}>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="text-[0.95rem] leading-[1.7] text-brand-cream/85">
            {item}
          </li>
        ))}
      </ul>
    </Credential>
  );
}

/**
 * Both doctors get the same layout and the same space; only the side the
 * portrait sits on alternates, so neither profile reads as the senior one.
 */
export default function DoctorProfile({
  doctor,
  flip,
  shots,
  page = false,
}: {
  doctor: Doctor;
  flip: boolean;
  shots: boolean;
  /** True on the doctor's own page: the name becomes the page's h1 and there is no link to itself. */
  page?: boolean;
}) {
  // In the shot-list preview the portrait layout is shown, with the brief in the frame.
  const hasPortrait = Boolean(doctor.portrait?.asset) || shots;
  const Heading = page ? "h1" : "h2";
  const years = doctor.practisingSince ? new Date().getFullYear() - doctor.practisingSince : null;

  const header = (
    <div>
      <Heading className="text-4xl font-normal leading-[1.04] tracking-[0.005em] text-brand-cream sm:text-5xl lg:text-6xl">
        {page ? (
          DOCTOR_PAGES[doctor.slug]?.heading ?? doctor.name
        ) : (
          <Link href={doctorHref(doctor.slug)} className="transition-colors hover:text-brand-champagne-light">
            {doctor.name}
          </Link>
        )}
      </Heading>
      {/* The positioning line: what this doctor is the authority on. */}
      {doctor.headline ? (
        <p className="mt-8 text-xl font-normal leading-[1.4] tracking-[0.01em] text-brand-champagne-light lg:text-2xl">
          {doctor.headline}
        </p>
      ) : null}
      {/* The qualification sits directly beneath the name, as the doctors asked. */}
      {doctor.degree ? (
        <p className="mt-8 text-xl font-normal tracking-[0.02em] text-brand-cream lg:text-2xl">
          {doctor.degree}
        </p>
      ) : null}
      {doctor.institution ? (
        <p className="mt-3 text-[1rem] leading-[1.6] text-brand-gray-muted">{doctor.institution}</p>
      ) : null}
      {doctor.credential ? (
        <p className="mt-3 text-[0.95rem] tracking-[0.02em] text-brand-champagne-light">
          {doctor.credential}
        </p>
      ) : null}
      {page ? null : (
        <TextLink href={doctorHref(doctor.slug)} ground="black" className="mt-10">
          Read {doctor.name}&rsquo;s full profile
        </TextLink>
      )}
      <span aria-hidden className="mt-10 block h-px w-16 bg-champagne-gradient" />
      {doctor.role ? (
        <p className="mt-10 text-[1.05rem] tracking-[0.01em] text-brand-cream">{doctor.role}</p>
      ) : null}
      {doctor.specialty ? (
        <p className="mt-2 text-[0.95rem] leading-[1.6] text-brand-gray-muted">{doctor.specialty}</p>
      ) : null}
      {doctor.domains?.length ? (
        <p className="mt-6 text-[0.65rem] uppercase leading-[2] tracking-widest text-brand-champagne-light">
          {doctor.domains.join(" · ")}
        </p>
      ) : null}
    </div>
  );

  return (
    <section id={doctor.slug} className="scroll-mt-24 border-t border-brand-gray-muted/20">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-28">
        {hasPortrait ? (
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-end">
            <div className={`lg:col-span-6 ${flip ? "lg:order-2 lg:col-start-7" : ""}`}>
              <Reveal>
                <SanityPicture
                  image={doctor.portrait ? { ...doctor.portrait, alt: doctorPortraitAlt(doctor.slug, doctor.name) } : doctor.portrait}
                  brief={DOCTOR_SHOTS[doctor.slug]}
                  ratio="3/4"
                  width={1600}
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </Reveal>
            </div>
            <div className={`lg:col-span-5 ${flip ? "lg:order-1" : "lg:col-start-8"}`}>
              <Reveal index={1}>{header}</Reveal>
            </div>
          </div>
        ) : (
          <Reveal>{header}</Reveal>
        )}

        <div className="mt-24 grid grid-cols-1 gap-16 lg:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {doctor.principle ? (
              <Reveal>
                <p className="mb-12 max-w-2xl border-l border-brand-champagne-dark pl-6 text-[1.3rem] leading-[1.5] text-brand-cream lg:text-[1.5rem]">
                  {doctor.principle}
                </p>
              </Reveal>
            ) : null}
            <Reveal>
              {paragraphs(doctor.biography).map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-6 max-w-2xl text-[1.05rem] leading-[1.85] text-brand-gray-muted first:mt-0"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>
            {/* How this doctor thinks, given the same space on both profiles. */}
            {doctor.perspective ? (
              <Reveal index={1}>
                <div className="mt-16 border-t border-brand-gray-muted/25 pt-12">
                  {doctor.perspectiveTitle ? (
                    <h3 className="text-2xl font-normal tracking-[0.01em] text-brand-cream">
                      {doctor.perspectiveTitle}
                    </h3>
                  ) : null}
                  {paragraphs(doctor.perspective).map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-6 max-w-2xl text-[1.05rem] leading-[1.85] text-brand-gray-muted"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {doctor.closing ? (
                    <p className="mt-10 max-w-2xl text-[1.15rem] leading-[1.7] text-brand-champagne-light">
                      {doctor.closing}
                    </p>
                  ) : null}
                </div>
              </Reveal>
            ) : null}
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <CredentialList title="Areas of expertise" items={doctor.expertise} />
            {years && years > 0 ? (
              <Credential title="Experience">
                <p className="text-[0.95rem] text-brand-cream/85">{years} years in practice</p>
              </Credential>
            ) : null}
            <CredentialList title="Conferences" items={doctor.conferences} />
            <CredentialList title="Publications" items={doctor.publications} />
            <CredentialList title="Awards" items={doctor.achievements} />
            {doctor.technologies?.length ? (
              <Credential title="Technologies">
                <ul className="flex flex-col gap-3">
                  {doctor.technologies.map((technology) => (
                    <li key={technology._id}>
                      <Link
                        href={technologyHref(technology)}
                        className="text-[0.95rem] text-brand-cream/85 transition-colors hover:text-brand-champagne-light"
                      >
                        {technology.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Credential>
            ) : null}
          </div>
        </div>

        {doctor.quote ? (
          <Reveal>
            <figure className="mt-24 border-t border-brand-gray-muted/25 pt-16 lg:mt-16 lg:pt-12">
              <Eyebrow ground="black">Philosophy</Eyebrow>
              <blockquote className="mt-10 max-w-4xl text-2xl font-normal leading-[1.35] tracking-[0.005em] text-brand-cream lg:text-[2.4rem] lg:leading-[1.25]">
                &ldquo;{doctor.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 text-[0.65rem] uppercase tracking-widest text-brand-gray-muted">
                {doctor.name}
              </figcaption>
            </figure>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
