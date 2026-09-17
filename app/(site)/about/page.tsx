import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import DoctorSchema from "@/components/DoctorSchema";
import Reveal from "@/components/Reveal";
import SanityPicture from "@/components/SanityPicture";
import {
  BeginConsultation,
  Display,
  Eyebrow,
  PageHero,
  Prose,
  Section,
  Statement,
  TextLink,
  type Ground,
} from "@/components/ui";
import { paragraphs } from "@/lib/format";
import { technologyHref } from "@/lib/links";
import { directionsHref, LOCATIONS, PHILOSOPHY_LINE, PHILOSOPHY_TEXT, TAGLINE } from "@/lib/site";
import { getClient } from "@/sanity/lib/client";
import { clinicQuery, doctorsQuery } from "@/sanity/lib/queries";
import type { ClinicSpace, Doctor, SiteSettings, TeamMember } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "About",
  description:
    "Dermatology, grounded in medicine. Aesthetic medicine, refined through experience. Dr Priyam Bhagat and Dr Kamlesh V. Bhagat, both MD Dermatology from Seth GS Medical College & KEM Hospital, Mumbai.",
  alternates: { canonical: "/about" },
};

export const revalidate = 60;

/*
 * Page copy is the doctors' own, reproduced as written. A line marked `lead`
 * carries the argument and is set larger.
 *
 * The doctors asked that the credentials themselves create the authority: no
 * "leading", "renowned" or "world-class" anywhere on this page. Every
 * credential comes from the doctors and is theirs to verify against their CVs.
 */
type Line = { text: string; lead?: boolean };

const INTRODUCTION: Line[] = [
  {
    text: "Dr Bhagat’s World Class Aesthetics brings together two experienced dermatologists, advanced aesthetic medicine and a belief that the best results begin with understanding the individual.",
  },
  {
    text: "Founded by Dr Priyam Bhagat and Dr Kamlesh Bhagat, the practice has grown from a shared foundation in dermatology into a contemporary destination for skin and aesthetic care.",
  },
  { text: "Our approach is deliberately personal.", lead: true },
  {
    text: "We do not believe that every patient needs the same treatment, or that the latest technology is automatically the best choice. We begin by listening, assessing and understanding what the patient would like to improve.",
  },
  { text: "Only then do we decide how best to approach it.", lead: true },
  {
    text: "Sometimes that means one treatment. Sometimes it means combining different modalities. And sometimes, the most appropriate decision is to do less.",
  },
  {
    text: "For us, advanced technology is valuable because it expands what we can offer. But it is experience, judgement and precision that determine how it should be used.",
  },
  { text: "The goal is never to create a different face.", lead: true },
  { text: "It is to help each patient look fresh, balanced, confident and unmistakably themselves." },
];

const DOCTORS_INTRO: Line[] = [
  { text: "At Dr Bhagat’s, aesthetic medicine is built on a foundation of specialist dermatology." },
  {
    text: "Dr Priyam Bhagat and Dr Kamlesh Bhagat bring complementary expertise across clinical dermatology, aesthetic medicine, dermatosurgery, laser medicine, skin health and the management of facial ageing.",
  },
  {
    text: "Their practice has evolved with dermatology itself — from a strong foundation in medical and surgical dermatology to advanced laser, energy-based and aesthetic medicine.",
  },
  { text: "The technology may be sophisticated. The thinking behind it must be even more so.", lead: true },
];

const SHARED: Line[] = [
  {
    text: "Although Dr Priyam and Dr Kamlesh Bhagat have complementary areas of expertise, their approach to patient care is shared.",
  },
];

const DIAGNOSIS = [
  "A concern that appears cosmetic may have a deeper dermatological cause.",
  "Pigmentation may have several different origins.",
  "Hair loss requires diagnosis before treatment.",
  "Acne scars reflect the history and structure of the underlying acne.",
  "Facial ageing involves more than the skin alone.",
];

const DIFFERENCE: Line[] = [
  {
    text: "Aesthetic medicine is no longer simply about treating a wrinkle, a pigment spot or a change in contour.",
  },
  {
    text: "The more sophisticated the technology becomes, the more important the clinical decision behind it becomes.",
    lead: true,
  },
  {
    text: "Treatment begins by understanding the patient — not by selecting a procedure. We consider the skin, anatomy, history, concerns, expectations and the changes that have occurred over time.",
  },
  {
    text: "Because expertise is not measured by how many treatments can be performed. It is reflected in knowing which treatment matters, why it matters, and when it is better left alone.",
  },
];

const BELIEFS = [
  "Precision over excess.",
  "Personalisation over protocols.",
  "Refinement over transformation.",
  "Long-term results over quick fixes.",
];

const EXPERIENCE: Line[] = [
  { text: "A luxury medical experience is not simply about beautiful surroundings." },
  { text: "It is about being listened to.", lead: true },
  { text: "It is about privacy, attention to detail and confidence in the people caring for you." },
  {
    text: "Our clinic has been designed to bring together contemporary luxury, advanced medical technology and a calm, discreet environment.",
  },
  {
    text: "Every detail—from consultation to treatment to follow-up—is intended to make the experience feel considered and personal.",
  },
  { text: "Because ultimately, luxury in aesthetic medicine is not about having more." },
  { text: "It is about choosing better.", lead: true },
];

const LOCATION_LABEL: Record<string, string> = {
  goregaon: "Goregaon East",
  vashi: "Vashi, Navi Mumbai",
  both: "Both clinics",
};

function Lines({ lines, ground = "bone" }: { lines: Line[]; ground?: Ground }) {
  return (
    <div>
      {lines.map((line) =>
        line.lead ? (
          <Statement key={line.text} ground={ground} className="mt-10 first:mt-0">
            {line.text}
          </Statement>
        ) : (
          <Prose key={line.text} ground={ground} className="mt-6 first:mt-0">
            {line.text}
          </Prose>
        )
      )}
    </div>
  );
}

async function getDoctors(): Promise<Doctor[]> {
  try {
    return await getClient().fetch<Doctor[]>(doctorsQuery);
  } catch (error) {
    console.error("[about] Sanity fetch failed:", error);
    return [];
  }
}

type Clinic = { settings: SiteSettings | null; spaces: ClinicSpace[]; team: TeamMember[] };

async function getClinic(): Promise<Clinic> {
  try {
    const data = await getClient().fetch<Partial<Clinic> | null>(clinicQuery);
    return { settings: data?.settings ?? null, spaces: data?.spaces ?? [], team: data?.team ?? [] };
  } catch (error) {
    console.error("[about] Clinic fetch failed:", error);
    return { settings: null, spaces: [], team: [] };
  }
}

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
function DoctorProfile({ doctor, flip }: { doctor: Doctor; flip: boolean }) {
  const hasPortrait = Boolean(doctor.portrait?.asset);
  const years = doctor.practisingSince ? new Date().getFullYear() - doctor.practisingSince : null;

  const header = (
    <div>
      {doctor.position ? <Eyebrow ground="black">{doctor.position}</Eyebrow> : null}
      <h2 className="mt-8 text-4xl font-normal leading-[1.04] tracking-[0.005em] text-brand-cream sm:text-5xl lg:text-6xl">
        {doctor.name}
      </h2>
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
      <span aria-hidden className="mt-10 block h-px w-16 bg-champagne-gradient" />
      {doctor.role ? (
        <p className="mt-10 text-[1.05rem] tracking-[0.01em] text-brand-cream">{doctor.role}</p>
      ) : null}
      {doctor.specialty ? (
        <p className="mt-2 text-[0.95rem] leading-[1.6] text-brand-gray-muted">{doctor.specialty}</p>
      ) : null}
    </div>
  );

  return (
    <section id={doctor.slug} className="scroll-mt-24 border-t border-brand-gray-muted/20">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-36">
        {hasPortrait ? (
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-end">
            <div className={`lg:col-span-6 ${flip ? "lg:order-2 lg:col-start-7" : ""}`}>
              <Reveal>
                <SanityPicture
                  image={doctor.portrait}
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

        <div className="mt-24 grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
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
            <figure className="mt-24 border-t border-brand-gray-muted/25 pt-16">
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

export default async function AboutPage() {
  const [doctors, clinic] = await Promise.all([getDoctors(), getClinic()]);
  const withFoundations = doctors.filter((doctor) => doctor.foundations?.length);

  return (
    <main className="flex-1 bg-brand-bone">
      <DoctorSchema doctors={doctors} />

      <PageHero eyebrow="About Dr Bhagat’s" title="A legacy of dermatology. A future of aesthetics." />

      <Section ground="bone">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Eyebrow>About Dr Bhagat’s</Eyebrow>
              <Display className="mt-8">{TAGLINE}</Display>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <Lines lines={INTRODUCTION} />
            </Reveal>
          </div>
        </div>
      </Section>

      {doctors.length > 0 ? (
        <div id="doctors" className="scroll-mt-24 bg-brand-black">
          <div className="mx-auto w-full max-w-7xl px-6 pt-24 lg:px-10 lg:pt-32">
            <Reveal>
              <Eyebrow ground="black">The doctors</Eyebrow>
              <h2 className="mt-10 max-w-4xl text-3xl font-normal leading-[1.15] tracking-[0.005em] text-brand-cream sm:text-4xl lg:text-5xl">
                Dermatology, grounded in medicine. Aesthetic medicine, refined through experience.
              </h2>
              <p className="mt-10 text-[1.05rem] tracking-[0.01em] text-brand-champagne-light">
                Two dermatologists. Complementary expertise. One uncompromising standard of care.
              </p>
            </Reveal>
            <SanityPicture
              image={clinic.settings?.doctorsImage}
              ratio="21/9"
              width={2400}
              sizes="(min-width: 1024px) 80rem, 100vw"
              className="mt-16"
            />
            <div className="mt-16 max-w-3xl pb-8">
              <Reveal index={1}>
                <Lines lines={DOCTORS_INTRO} ground="black" />
              </Reveal>
            </div>
          </div>

          {doctors.map((doctor, index) => (
            <DoctorProfile key={doctor._id} doctor={doctor} flip={index % 2 === 1} />
          ))}
        </div>
      ) : null}

      <Section ground="white">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Display ground="white">Two perspectives. One standard of care.</Display>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal index={1}>
              <Lines lines={SHARED} ground="white" />
              <Statement ground="white" className="mt-10">
                Listen. Assess. Understand. Then treat.
              </Statement>
              <ul className="mt-12">
                {DIAGNOSIS.map((line) => (
                  <li
                    key={line}
                    className="border-t border-brand-gray-muted/30 py-5 text-[1.05rem] leading-[1.6] text-brand-black"
                  >
                    {line}
                  </li>
                ))}
              </ul>
              <Prose ground="white" className="mt-12">
                This is why the strength of the practice lies not simply in the range of treatments
                available, but in the dermatological expertise used to determine when and how those
                treatments should be used.
              </Prose>
              <Prose ground="white" className="mt-6">
                Modern aesthetic medicine gives us extraordinary possibilities. Clinical judgement
                determines which of those possibilities belong in your plan.
              </Prose>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* The academic record, set as a record rather than another paragraph. */}
      {withFoundations.length > 0 ? (
        <Section ground="bone" id="foundations">
          <Reveal>
            <Eyebrow>Academic &amp; professional foundations</Eyebrow>
            <Display className="mt-8 max-w-3xl">A foundation built on dermatology.</Display>
          </Reveal>
          <div className="mt-20 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            {withFoundations.map((doctor) => (
              <div key={doctor._id}>
                <h3 className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark">
                  {doctor.name}
                </h3>
                <dl className="mt-8">
                  {(doctor.foundations ?? []).map((entry) => (
                    <div
                      key={entry._key ?? entry.title}
                      className="border-t border-brand-gray-muted/30 py-6"
                    >
                      <dt className="text-[1.15rem] font-normal leading-[1.4] tracking-[0.01em] text-brand-black">
                        {entry.title}
                      </dt>
                      {entry.detail ? (
                        <dd className="mt-2 text-[0.95rem] leading-[1.7] text-brand-gray-text">
                          {entry.detail}
                        </dd>
                      ) : null}
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      <Section ground="black" id="philosophy">
        <Reveal>
          <Eyebrow ground="black">Our philosophy</Eyebrow>
          <h2 className="mt-10 max-w-5xl text-4xl font-normal leading-[1.08] tracking-[0.01em] text-brand-cream sm:text-6xl lg:text-7xl">
            {PHILOSOPHY_LINE}
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <p className="text-2xl font-normal leading-[1.4] text-brand-cream lg:col-span-5">
              {PHILOSOPHY_TEXT[0]}
            </p>
            <p className="max-w-2xl text-[1.15rem] leading-[1.8] text-brand-gray-muted lg:col-span-6 lg:col-start-7">
              {PHILOSOPHY_TEXT[1]}
            </p>
          </div>
        </Reveal>
      </Section>

      <Section ground="bone">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Eyebrow>The difference</Eyebrow>
              <Display className="mt-8">The Dr Bhagat’s difference</Display>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <Lines lines={DIFFERENCE} />
              <Prose className="mt-12">We believe in:</Prose>
              <ul className="mt-6">
                {BELIEFS.map((belief) => (
                  <li
                    key={belief}
                    className="border-t border-brand-gray-muted/30 py-5 text-2xl font-normal tracking-[0.01em] text-brand-black"
                  >
                    {belief}
                  </li>
                ))}
              </ul>
              <Prose className="mt-12">And above all:</Prose>
              <p className="mt-6 text-3xl font-normal leading-[1.2] tracking-[0.01em] text-brand-black lg:text-4xl">
                The doctor decides. Technology supports.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* The Clinic */}
      <Section ground="white" id="the-clinic">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Eyebrow ground="white">The Clinic</Eyebrow>
              <Display ground="white" className="mt-8">
                The experience
              </Display>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <Lines lines={EXPERIENCE} ground="white" />
            </Reveal>
            <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2">
              {LOCATIONS.map((location) => (
                <address key={location.id} className="border-t border-brand-gray-muted/30 pt-6 not-italic">
                  <p className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark">
                    {location.name}
                  </p>
                  <p className="mt-3 text-[0.9rem] leading-[1.7] text-brand-gray-text">
                    {location.streetAddress}, {location.locality} {location.postalCode}
                  </p>
                  <a
                    href={directionsHref(location)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex min-h-11 items-center text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark transition-colors hover:text-brand-black"
                  >
                    Directions
                  </a>
                </address>
              ))}
            </div>
            <div className="mt-10">
              <TextLink href="/contact" ground="white">
                Contact the clinic
              </TextLink>
            </div>
          </div>
        </div>
      </Section>

      {/* Spaces and team appear only once photographed; the query filters out spaces without images. */}
      {clinic.spaces.length > 0 || clinic.team.length > 0 ? (
        <Section ground="bone">
          {clinic.spaces.map((space) => (
            <div
              key={space._id}
              className="grid grid-cols-1 gap-12 border-t border-brand-gray-muted/30 py-16 first:border-t-0 first:pt-0 lg:grid-cols-12"
            >
              <div className="lg:col-span-4">
                <Reveal>
                  {space.location ? <Eyebrow>{LOCATION_LABEL[space.location]}</Eyebrow> : null}
                  <h3 className="mt-6 text-2xl font-normal uppercase tracking-widest text-brand-black">
                    {space.title}
                  </h3>
                  {space.description ? (
                    <p className="mt-6 text-[1rem] leading-[1.8] text-brand-gray-text">{space.description}</p>
                  ) : null}
                </Reveal>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
                {space.images.map((image, imageIndex) => (
                  <SanityPicture
                    key={`${space._id}-${imageIndex}`}
                    image={image}
                    ratio="4/3"
                    sizes="(min-width: 1024px) 35vw, 100vw"
                    className={imageIndex === 0 ? "sm:col-span-2" : ""}
                  />
                ))}
              </div>
            </div>
          ))}

          {clinic.team.length > 0 ? (
            <div className={clinic.spaces.length > 0 ? "border-t border-brand-gray-muted/30 pt-16" : ""}>
              <Eyebrow>The team</Eyebrow>
              <ul className="mt-12 grid grid-cols-2 gap-10 md:grid-cols-4">
                {clinic.team.map((member) => (
                  <li key={member._id}>
                    <SanityPicture
                      image={member.portrait}
                      ratio="3/4"
                      width={800}
                      sizes="(min-width: 768px) 25vw, 50vw"
                    />
                    <p className="mt-5 text-[1rem] text-brand-black">{member.name}</p>
                    {member.role ? (
                      <p className="mt-1 text-[0.65rem] uppercase tracking-widest text-brand-gray-text">
                        {member.role}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Section>
      ) : null}

      <Section ground="bone" className="border-t border-brand-gray-muted/20">
        <Reveal>
          <Eyebrow>Dr Bhagat’s World Class Aesthetics</Eyebrow>
          <p className="mt-8 text-5xl font-normal leading-[1.05] tracking-[0.01em] text-brand-black lg:text-7xl">
            {TAGLINE}
          </p>
        </Reveal>
      </Section>

      <BeginConsultation lead="Begin with a consultation grounded in dermatology, experience and precision." />
    </main>
  );
}
