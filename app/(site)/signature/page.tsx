import type { Metadata } from "next";

import Reveal from "@/components/Reveal";
import SanityPicture from "@/components/SanityPicture";
import { Eyebrow, PageHero, PrimaryLink, Prose, Section, Statement, TextLink } from "@/components/ui";
import { pad, paragraphs } from "@/lib/format";
import { getClient } from "@/sanity/lib/client";
import { programmesQuery } from "@/sanity/lib/queries";
import type { Programme } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "The Dr Bhagat's Signature",
  description:
    "The Dr Bhagat's Signature Approach: personalised by expertise, refined by experience. Five signature programmes, each a treatment strategy designed around the individual patient.",
  alternates: { canonical: "/signature" },
};

export const revalidate = 60;

/** The doctors' own introduction. */
const INTRODUCTION = [
  "No two faces age in exactly the same way. No two patients have the same skin, anatomy or expectations.",
  "Our Signature Treatments are not fixed protocols. They are carefully considered treatment strategies designed around the individual patient—combining our clinical experience with advanced technology to address what matters most to you.",
  "Sometimes the answer is one treatment. Sometimes it is a combination. And sometimes, the most appropriate recommendation is to wait.",
];

async function getProgrammes(): Promise<Programme[]> {
  try {
    return await getClient().fetch<Programme[]>(programmesQuery);
  } catch (error) {
    console.error("[signature] Sanity fetch failed:", error);
    return [];
  }
}

/**
 * Technologies are never listed under a programme. The patient reads how the
 * doctors think first, and discovers the technology only through a discreet
 * line - the doctors' explicit instruction, and what keeps the page luxurious.
 */
export default async function SignaturePage() {
  const programmes = await getProgrammes();

  return (
    <main className="flex-1 bg-brand-bone">
      <PageHero
        eyebrow="The Dr Bhagat’s Signature"
        title="The Dr Bhagat’s Signature Approach"
        lead="Personalised by expertise. Refined by experience."
      />

      <Section ground="bone">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-3xl font-normal leading-[1.15] tracking-[0.01em] text-brand-black sm:text-4xl">
                Personalised aesthetic medicine, shaped by experience.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal index={1}>
              {INTRODUCTION.map((paragraph) => (
                <Prose key={paragraph} className="mt-6 first:mt-0">
                  {paragraph}
                </Prose>
              ))}
              <Statement className="mt-12">The difference lies in the thinking behind the treatment.</Statement>
            </Reveal>
          </div>
        </div>
      </Section>

      {programmes.map((programme, index) => (
        <section
          key={programme._id}
          id={programme.slug}
          className="scroll-mt-24 border-t border-brand-gray-muted/30 bg-brand-bone xl:scroll-mt-36"
        >
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-12 lg:px-10 lg:py-32">
            <header className="lg:col-span-4">
              <div className="lg:sticky lg:top-32 xl:top-40">
                <span className="block text-xs tracking-widest text-brand-champagne-dark">{pad(index + 1)}</span>
                <h2 className="mt-6 text-2xl font-normal uppercase leading-snug tracking-widest text-brand-black lg:text-[1.65rem]">
                  {programme.title}
                </h2>
                <span aria-hidden className="mt-8 block h-px w-16 bg-champagne-gradient" />
              </div>
            </header>

            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal>
                {programme.tagline ? <Statement>{programme.tagline}</Statement> : null}
                <SanityPicture
                  image={programme.image}
                  ratio="16/9"
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="mt-12"
                />
                <div className="mt-10">
                  {paragraphs(programme.body).map((paragraph) => (
                    <Prose key={paragraph} className="mt-6 first:mt-0">
                      {paragraph}
                    </Prose>
                  ))}
                </div>
                {programme.closing ? (
                  <p className="mt-10 max-w-2xl border-l border-brand-champagne-dark pl-6 text-[1.15rem] leading-[1.7] text-brand-black">
                    {programme.closing}
                  </p>
                ) : null}
                <p className="mt-12 text-[0.85rem] leading-[1.7] text-brand-gray-text">
                  Technologies and treatments may be selected according to individual assessment.
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <div className="border-t border-brand-gray-muted/30 bg-brand-bone">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-16 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p className="max-w-xl text-[0.95rem] leading-[1.7] text-brand-gray-text">
            Every technology we use is chosen by the doctor, for a reason, after assessment.
          </p>
          <TextLink href="/technology">Explore our technology →</TextLink>
        </div>
      </div>

      {/* A large, quiet close in place of the usual consultation block. */}
      <section className="bg-brand-black">
        <div className="mx-auto w-full max-w-7xl px-6 py-40 lg:px-10 lg:py-56">
          <Reveal>
            <Eyebrow ground="black">Begin with a consultation</Eyebrow>
            <h2 className="mt-12 max-w-4xl text-5xl font-normal leading-[1.05] tracking-[0.01em] text-brand-cream sm:text-6xl lg:text-7xl">
              Your face. Your skin. Your plan.
            </h2>
            <p className="mt-14 max-w-xl text-[1.1rem] leading-[1.8] text-brand-gray-muted">
              There is no universal formula for looking your best.
            </p>
            <p className="mt-4 max-w-xl text-[1.1rem] leading-[1.8] text-brand-gray-muted">
              Your treatment should be as individual as you are.
            </p>
            <p className="mt-14 text-2xl font-normal tracking-[0.01em] text-brand-cream">
              Begin with a consultation.
            </p>
            <div className="mt-10">
              <PrimaryLink href="/book">Book a Consultation</PrimaryLink>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
