import type { Metadata } from "next";

import Reveal from "@/components/Reveal";
import SanityPicture from "@/components/SanityPicture";
import { BeginConsultation, Eyebrow, PageHero, Prose, Rail, Section, TextLink } from "@/components/ui";
import { pad } from "@/lib/format";
import { EXPERIENCE_SHOTS } from "@/lib/shotList";
import { getClient } from "@/sanity/lib/client";
import { clinicQuery } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "The Dr Bhagat’s Experience",
  description:
    "From arrival to follow-up: how a visit to Dr Bhagat's unfolds, and what to expect at every stage of your care.",
  alternates: { canonical: "/experience" },
};

export const revalidate = 60;

/**
 * The experience itself, stage by stage. Not a facilities page: what happens,
 * in order, so a patient knows exactly how their care will unfold before they
 * ever walk in.
 */
const STAGES = [
  {
    title: "Arrival",
    body: "Both clinics are designed to be discreet. You are expected, your appointment time is held, and you are not asked to wait among a crowd.",
  },
  {
    title: "Reception",
    body: "A private welcome, and the paperwork kept brief. If this is your first visit, we ask about your medical history, your skin history and what has brought you in.",
  },
  {
    title: "Consultation",
    body: "An unhurried conversation with your dermatologist. You describe what you would like to change; the doctor listens before examining anything.",
  },
  {
    title: "Assessment",
    body: "Your skin and facial structure are examined, with clinical photography where it helps. The doctor explains what is actually happening, and what is driving the concern.",
  },
  {
    title: "Your plan",
    body: "What we recommend, why, in what order, and what it will take. Where treatment is not the right answer, we say so. Nothing is decided on the day if it is better decided after thought.",
  },
  {
    title: "Treatment",
    body: "Delivered by your doctor, with comfort and privacy planned for. You know before you begin what the session involves and how the following days are likely to feel.",
  },
  {
    title: "Aftercare",
    body: "Written aftercare, the skincare that supports the result, and a direct way to reach the clinic if anything concerns you.",
  },
  {
    title: "Follow-up",
    body: "A review at the point where the response can genuinely be judged, with photography for comparison. The plan is then refined, continued or paused.",
  },
];

async function getSettings(): Promise<SiteSettings | null> {
  try {
    const data = await getClient().fetch<{ settings: SiteSettings | null } | null>(clinicQuery);
    return data?.settings ?? null;
  } catch (error) {
    console.error("[experience] Sanity fetch failed:", error);
    return null;
  }
}

export default async function ExperiencePage() {
  const settings = await getSettings();

  return (
    <main className="flex-1 bg-brand-bone">
      <PageHero
        eyebrow="The Dr Bhagat’s Experience"
        title="From consultation to treatment to follow-up."
        lead="The care is dermatological. The experience around it is deliberate: private, unhurried, and the same whether you are here for a consultation or a course of treatment."
      />

      <SanityPicture
        image={settings?.clinicImage}
        brief={EXPERIENCE_SHOTS.arrival}
        ratio="21/9"
        width={2400}
        priority
        sizes="100vw"
      />

      <Section ground="bone">
        <ol className="grid grid-cols-1 gap-x-16 gap-y-14 md:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((stage, index) => (
            <li key={stage.title}>
              <Reveal index={index % 4}>
                <span className="block text-xs tracking-widest text-brand-champagne-dark">
                  {pad(index + 1)}
                </span>
                <span aria-hidden className="mt-6 block h-px w-full bg-champagne-gradient" />
                <h2 className="mt-8 text-xl font-normal leading-snug tracking-[0.01em] text-brand-black">
                  {stage.title}
                </h2>
                <p className="mt-5 text-[0.95rem] leading-[1.8] text-brand-gray-text">{stage.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Rail ground="white" title="What stays the same">
        <Reveal>
          <Prose ground="white">
            Two clinics, one standard of care. Whichever you visit, you are seen by a dermatologist,
            assessed before anything is recommended, and given a plan written for you rather than a
            treatment chosen from a list.
          </Prose>
        </Reveal>
        <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6">
          <TextLink href="/about#the-clinic" ground="white">
            See the clinics →
          </TextLink>
          <TextLink href="/contact" ground="white">
            Visit us →
          </TextLink>
        </div>
      </Rail>

      <Section ground="black">
        <Eyebrow ground="black">What we ask of you</Eyebrow>
        <p className="mt-8 max-w-2xl text-2xl font-normal leading-[1.4] text-brand-cream lg:text-3xl">
          Tell us what you would like to change, and give us the time to understand it properly.
        </p>
        <p className="mt-8 max-w-2xl text-[1rem] leading-[1.8] text-brand-gray-muted">
          The first appointment is a consultation, not a treatment. Some patients are treated the same
          day; others leave with a plan and a date. Both are a good outcome.
        </p>
      </Section>

      <BeginConsultation />
    </main>
  );
}
