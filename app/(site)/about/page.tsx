import type { Metadata } from "next";

import DoctorSchema from "@/components/DoctorSchema";
import Reveal from "@/components/Reveal";
import SanityPicture from "@/components/SanityPicture";
import {
  BeginConsultation,
  Display,
  Eyebrow,
  PageHero,
  Prose,
  Rail,
  Section,
} from "@/components/ui";
import { paragraphs } from "@/lib/format";
import { getClient } from "@/sanity/lib/client";
import { doctorsQuery } from "@/sanity/lib/queries";
import type { Doctor } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "About",
  description:
    "Dr Priyam Bhagat and Dr Kamlesh Bhagat, and the clinical philosophy behind a doctor-led aesthetic and dermatology practice.",
  alternates: { canonical: "/about" },
};

export const revalidate = 60;

/** Adapted from the practice's own account on its previous site. */
const ORIGIN =
  "Dr Priyam Bhagat and Dr Kamlesh Bhagat’s interest in dermatology grew from seeing people around them struggle with skin concerns during their formative years, and from witnessing the effect those concerns had on confidence and wellbeing. That experience shaped a practice built on listening first, and on finding the right solution for each person.";

const PRINCIPLES = [
  {
    title: "Assessment before treatment",
    body: "Every plan begins with understanding the concern, the skin and the person, before any treatment is discussed.",
  },
  {
    title: "A plan, not a procedure",
    body: "Treatments and technology are combined and sequenced to suit the individual, never chosen from a menu.",
  },
  {
    title: "Knowing when not to treat",
    body: "Clinical judgement includes recommending less, choosing a gentler route, or advising against treatment when it will not help.",
  },
  {
    title: "Care over time",
    body: "Plans are reviewed at follow-up and refined, with natural, lasting results as the aim.",
  },
];

async function getDoctors(): Promise<Doctor[]> {
  try {
    return await getClient().fetch<Doctor[]>(doctorsQuery);
  } catch (error) {
    console.error("[about] Sanity fetch failed:", error);
    return [];
  }
}

/** Renders nothing when empty, so a profile never shows a heading without content. */
function CredentialList({ title, items }: { title: string; items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="mt-12">
      <Eyebrow ground="black">{title}</Eyebrow>
      <ul className="mt-5">
        {items.map((item) => (
          <li
            key={item}
            className="border-t border-brand-gray-muted/25 py-4 text-[0.95rem] leading-[1.7] text-brand-cream/85"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function AboutPage() {
  const doctors = await getDoctors();

  return (
    <main className="flex-1 bg-brand-bone">
      <DoctorSchema doctors={doctors} />

      <PageHero
        eyebrow="About"
        title="The doctors behind Dr Bhagat’s."
        lead="Where dermatological expertise meets the art of aesthetics."
      />

      <Rail ground="bone" title="Our story">
        <Reveal>
          <Prose>{ORIGIN}</Prose>
          <Prose className="mt-6">
            Today, Dr Bhagat&apos;s World Class Aesthetics brings that principle to every patient: a
            doctor-led practice in which clinical expertise, rather than technology, defines the
            treatment.
          </Prose>
        </Reveal>
      </Rail>

      {doctors.map((doctor, index) => {
        const hasPortrait = Boolean(doctor.portrait?.asset);
        const flip = index % 2 === 1;

        return (
          <section
            key={doctor._id}
            id={doctor.slug}
            className="scroll-mt-20 border-t border-brand-gray-muted/20 bg-brand-black"
          >
            <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
              <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
                {hasPortrait ? (
                  <div className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
                    <Reveal>
                      <SanityPicture
                        image={doctor.portrait}
                        ratio="3/4"
                        width={1400}
                        sizes="(min-width: 1024px) 40vw, 100vw"
                      />
                    </Reveal>
                  </div>
                ) : null}

                <div
                  className={
                    hasPortrait
                      ? `lg:col-span-6 ${flip ? "lg:order-1" : "lg:col-start-7"}`
                      : "lg:col-span-8"
                  }
                >
                  <Reveal index={1}>
                    {doctor.role ? <Eyebrow ground="black">{doctor.role}</Eyebrow> : null}
                    <h2 className="mt-8 text-4xl font-normal leading-[1.1] tracking-[0.01em] text-brand-cream lg:text-5xl">
                      {doctor.name}
                    </h2>
                    <span aria-hidden className="mt-10 block h-px w-16 bg-champagne-gradient" />
                    <div className="mt-10">
                      {paragraphs(doctor.biography).map((paragraph) => (
                        <p
                          key={paragraph}
                          className="mt-6 max-w-2xl text-[1.05rem] leading-[1.85] text-brand-gray-muted first:mt-0"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    <CredentialList title="Training" items={doctor.qualifications} />
                    <CredentialList title="Areas of expertise" items={doctor.expertise} />
                    <CredentialList title="Memberships and affiliations" items={doctor.memberships} />
                    <CredentialList title="Achievements and publications" items={doctor.achievements} />
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <Rail ground="bone" title="Our clinical philosophy">
        <ul>
          {PRINCIPLES.map((principle, index) => (
            <li
              key={principle.title}
              className="border-t border-brand-gray-muted/30 py-8 first:border-t-0 first:pt-0"
            >
              <Reveal index={index}>
                <h3 className="text-xl font-normal tracking-[0.01em] text-brand-black">{principle.title}</h3>
                <p className="mt-4 max-w-xl text-[0.95rem] leading-[1.8] text-brand-gray-text">
                  {principle.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Rail>

      <Section ground="white">
        <Reveal>
          <Display ground="white" className="max-w-4xl">
            The doctor decides. Technology supports. You receive a personalised plan.
          </Display>
          <p className="mt-12 max-w-2xl text-[1.05rem] leading-[1.8] text-brand-gray-text">
            Machines are our tools. Clinical expertise is what we offer. The Dr Bhagat&apos;s experience
            is what you receive.
          </p>
        </Reveal>
      </Section>

      <BeginConsultation />
    </main>
  );
}
