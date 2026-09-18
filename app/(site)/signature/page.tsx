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
    "The Dr Bhagat's Signature Approach: personalised by expertise, refined by experience. Five programmes, each with its own assessment and sequence, designed around the individual patient.",
  alternates: { canonical: "/signature" },
};

export const revalidate = 60;

/** Every programme moves through the same six stages; only what happens within them differs. */
const STAGES = ["Assess", "Prioritise", "Treat", "Reassess", "Refine", "Maintain"];

/** The doctors' own introduction. */
const INTRODUCTION = [
  "No two faces age in exactly the same way. No two patients have the same skin, anatomy or expectations.",
  "Our Signature Treatments are not fixed protocols. They are carefully considered treatment strategies designed around the individual patient—combining our clinical experience with advanced technology to address what matters most to you.",
  "Sometimes the answer is one treatment. Sometimes it is a combination. And sometimes, the most appropriate recommendation is to wait.",
];

function Detail({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-brand-gray-muted/30 py-8">
      <h3 className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark">{title}</h3>
      <div className="mt-5">{children}</div>
    </div>
  );
}

/**
 * Each programme is a clinical philosophy, never a package: what is assessed,
 * how treatment is personalised, and how it moves through the same six stages.
 * Technologies are never listed under a programme, and no prices appear.
 */
export default async function SignaturePage() {
  let programmes: Programme[] = [];
  try {
    programmes = await getClient().fetch<Programme[]>(programmesQuery);
  } catch (error) {
    console.error("[signature] Sanity fetch failed:", error);
  }

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

      <section className="border-t border-brand-gray-muted/30 bg-brand-white">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <Eyebrow ground="white">The same clinical sequence, for every programme</Eyebrow>
          <ol className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
            {STAGES.map((stage, index) => (
              <li key={stage}>
                <span className="block text-xs tracking-widest text-brand-champagne-dark">{pad(index + 1)}</span>
                <span aria-hidden className="mt-4 block h-px w-full bg-champagne-gradient" />
                <span className="mt-5 block text-xl font-normal tracking-[0.01em] text-brand-black">{stage}</span>
              </li>
            ))}
          </ol>
          <p className="mt-12 max-w-2xl text-[0.98rem] leading-[1.8] text-brand-gray-text">
            Treatment happens in stages rather than all at once. Each stage is reviewed before the next is
            decided, and what happens within it is specific to you.
          </p>
        </div>
      </section>

      {programmes.map((programme, index) => (
        <section
          key={programme._id}
          id={programme.slug}
          className="scroll-mt-24 border-t border-brand-gray-muted/30 bg-brand-bone"
        >
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-12 lg:px-10 lg:py-32">
            <header className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <span className="block text-xs tracking-widest text-brand-champagne-dark">{pad(index + 1)}</span>
                <h2 className="mt-6 text-2xl font-normal uppercase leading-snug tracking-widest text-brand-black lg:text-[1.65rem]">
                  {programme.title}
                </h2>
                <span aria-hidden className="mt-8 block h-px w-16 bg-champagne-gradient" />
                {programme.objective ? (
                  <p className="mt-8 max-w-xs text-[0.95rem] leading-[1.75] text-brand-gray-text">
                    {programme.objective}
                  </p>
                ) : null}
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
              </Reveal>

              <div className="mt-14">
                {programme.forWhom ? (
                  <Detail title="Who it is for">
                    <p className="max-w-xl text-[1rem] leading-[1.8] text-brand-gray-text">
                      {programme.forWhom}
                    </p>
                  </Detail>
                ) : null}

                {programme.assessed?.length ? (
                  <Detail title="What is assessed">
                    <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                      {programme.assessed.map((item) => (
                        <li key={item} className="py-2 text-[1rem] leading-[1.6] text-brand-black">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Detail>
                ) : null}

                {programme.personalisation ? (
                  <Detail title="How treatment is personalised">
                    <p className="max-w-xl text-[1.05rem] leading-[1.8] text-brand-black">
                      {programme.personalisation}
                    </p>
                  </Detail>
                ) : null}

                {programme.sequence?.length ? (
                  <Detail title="How the programme is sequenced">
                    <ol className="flex flex-col gap-8">
                      {programme.sequence.map((stage, stageIndex) => (
                        <li key={stage._key} className="grid grid-cols-[2.5rem_1fr] gap-4">
                          <span className="pt-1 text-xs tracking-widest text-brand-champagne-dark">
                            {pad(stageIndex + 1)}
                          </span>
                          <span>
                            <span className="block text-[1.1rem] leading-[1.5] text-brand-black">
                              {stage.title}
                            </span>
                            {stage.description ? (
                              <span className="mt-2 block max-w-xl text-[0.95rem] leading-[1.8] text-brand-gray-text">
                                {stage.description}
                              </span>
                            ) : null}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </Detail>
                ) : null}

              </div>

              {programme.closing ? (
                <p className="mt-12 max-w-2xl border-l border-brand-champagne-dark pl-6 text-[1.15rem] leading-[1.7] text-brand-black">
                  {programme.closing}
                </p>
              ) : null}

              <p className="mt-12 text-[0.85rem] leading-[1.7] text-brand-gray-text">
                Technologies and treatments may be selected according to individual assessment.
              </p>
            </div>
          </div>
        </section>
      ))}

      <div className="border-t border-brand-gray-muted/30 bg-brand-bone">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10">
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
