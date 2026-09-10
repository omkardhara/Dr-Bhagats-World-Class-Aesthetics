import type { Metadata } from "next";

import Reveal from "@/components/Reveal";
import SanityPicture from "@/components/SanityPicture";
import {
  Display,
  Eyebrow,
  PageHero,
  palette,
  PrimaryLink,
  Section,
  type Ground,
} from "@/components/ui";
import { formatPhone, LOCATIONS } from "@/lib/site";
import { getClient } from "@/sanity/lib/client";
import { clinicQuery } from "@/sanity/lib/queries";
import type { ClinicSpace, SiteSettings, TeamMember } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "The Clinic",
  description:
    "Dr Bhagat's World Class Aesthetics in Goregaon East, Mumbai and Vashi, Navi Mumbai: a private, calm and precise medical environment.",
  alternates: { canonical: "/the-clinic" },
};

export const revalidate = 60;

const PRINCIPLES = [
  {
    title: "Privacy",
    body: "Consultations and treatment take place privately, with discretion throughout your visit.",
  },
  {
    title: "Time",
    body: "Consultations are unhurried, so there is time to understand your concern and explain your options.",
  },
  {
    title: "Precision",
    body: "Treatment is delivered by a trained clinical team, to plans set by the doctors.",
  },
  {
    title: "Continuity",
    body: "Your plan is reviewed at follow-up and refined over time.",
  },
];

const LOCATION_LABEL: Record<string, string> = {
  goregaon: "Goregaon East",
  vashi: "Vashi, Navi Mumbai",
  both: "Both clinics",
};

type Data = { settings: SiteSettings | null; spaces: ClinicSpace[]; team: TeamMember[] };

async function getData(): Promise<Data> {
  try {
    const data = await getClient().fetch<Partial<Data> | null>(clinicQuery);
    return { settings: data?.settings ?? null, spaces: data?.spaces ?? [], team: data?.team ?? [] };
  } catch (error) {
    console.error("[clinic] Sanity fetch failed:", error);
    return { settings: null, spaces: [], team: [] };
  }
}

export default async function ClinicPage() {
  const { settings, spaces, team } = await getData();

  return (
    <main className="flex-1 bg-brand-bone">
      <PageHero
        eyebrow="The Clinic"
        title="A private, calm and precise environment."
        lead="Two clinics, in Goregaon East, Mumbai and Vashi, Navi Mumbai, designed around privacy, comfort and clinical precision."
      />

      <SanityPicture image={settings?.clinicImage} ratio="21/9" width={2400} priority sizes="100vw" />

      <Section ground="bone">
        <Reveal>
          <Eyebrow>The experience</Eyebrow>
          <Display className="mt-8 max-w-3xl">A medical environment, never a showroom.</Display>
        </Reveal>
        <ul className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((principle, index) => (
            <li key={principle.title}>
              <Reveal index={index}>
                <span aria-hidden className="block h-px w-full bg-champagne-gradient" />
                <h2 className="mt-8 text-xl font-normal tracking-[0.01em] text-brand-black">{principle.title}</h2>
                <p className="mt-4 text-[0.95rem] leading-[1.75] text-brand-gray-text">{principle.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* Spaces only appear once photographed; the query filters out any without images. */}
      {spaces.map((space, index) => {
        const ground: Ground = index % 2 === 0 ? "white" : "bone";
        const p = palette(ground);
        return (
          <Section key={space._id} ground={ground}>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <Reveal>
                  {space.location ? <Eyebrow ground={ground}>{LOCATION_LABEL[space.location]}</Eyebrow> : null}
                  <h2 className={`mt-6 text-2xl font-normal uppercase tracking-widest ${p.heading}`}>
                    {space.title}
                  </h2>
                  {space.description ? (
                    <p className={`mt-6 text-[1rem] leading-[1.8] ${p.body}`}>{space.description}</p>
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
          </Section>
        );
      })}

      {team.length > 0 ? (
        <Section ground="bone">
          <Eyebrow>The team</Eyebrow>
          <ul className="mt-12 grid grid-cols-2 gap-10 md:grid-cols-4">
            {team.map((member) => (
              <li key={member._id}>
                <SanityPicture image={member.portrait} ratio="3/4" width={800} sizes="(min-width: 768px) 25vw, 50vw" />
                <p className="mt-5 text-[1rem] text-brand-black">{member.name}</p>
                {member.role ? (
                  <p className="mt-1 text-[0.65rem] uppercase tracking-widest text-brand-gray-text">{member.role}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section ground="black">
        <Eyebrow ground="black">Locations</Eyebrow>
        <div className="mt-12 grid grid-cols-1 gap-16 md:grid-cols-2">
          {LOCATIONS.map((location) => (
            <Reveal key={location.id}>
              <address className="not-italic">
                <h2 className="text-3xl font-normal tracking-[0.01em] text-brand-cream">{location.name}</h2>
                <span aria-hidden className="mt-8 block h-px w-16 bg-champagne-gradient" />
                <p className="mt-8 text-[1rem] leading-[1.8] text-brand-gray-muted">
                  {location.streetAddress}
                  <br />
                  {location.locality}
                  <br />
                  {location.region} {location.postalCode}
                </p>
                {location.phone ? (
                  <a
                    href={`tel:${location.phone}`}
                    className="mt-4 inline-flex min-h-11 items-center text-[1rem] text-brand-cream transition-colors hover:text-brand-champagne-light"
                  >
                    {formatPhone(location.phone)}
                  </a>
                ) : null}
              </address>
            </Reveal>
          ))}
        </div>
        <div className="mt-16">
          <PrimaryLink href="/book">Book a Consultation</PrimaryLink>
        </div>
      </Section>
    </main>
  );
}
