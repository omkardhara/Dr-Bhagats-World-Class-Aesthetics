import Image from "next/image";
import Link from "next/link";

import Reveal from "@/components/Reveal";
import SanityPicture from "@/components/SanityPicture";
import {
  BeginConsultation,
  Display,
  Eyebrow,
  JourneySteps,
  PrimaryLink,
  Prose,
  Rows,
  Section,
  Statement,
  TextLink,
} from "@/components/ui";
import { formatDate, pad } from "@/lib/format";
import { programmeHref } from "@/lib/links";
import { LOCATIONS, PHILOSOPHY_LINE, PHILOSOPHY_TEXT, SUPPORTING_LINE, TAGLINE } from "@/lib/site";
import { RESULT_CATEGORIES, resultCategoryLabel, TECHNOLOGY_CATEGORIES } from "@/sanity/lib/categories";
import { getClient } from "@/sanity/lib/client";
import { imageProps } from "@/sanity/lib/image";
import { homeQuery } from "@/sanity/lib/queries";
import type {
  ArticleSummary,
  ConcernSummary,
  Doctor,
  ProgrammeSummary,
  SiteSettings,
  Testimonial,
} from "@/sanity/lib/types";

export const revalidate = 60;

type HomeData = {
  settings: SiteSettings | null;
  doctors: Doctor[];
  concerns: ConcernSummary[];
  programmes: ProgrammeSummary[];
  resultCategories: string[];
  testimonials: Testimonial[];
  articles: ArticleSummary[];
};

const EMPTY: HomeData = {
  settings: null,
  doctors: [],
  concerns: [],
  programmes: [],
  resultCategories: [],
  testimonials: [],
  articles: [],
};

async function getHome(): Promise<HomeData> {
  try {
    const data = await getClient().fetch<Partial<HomeData> | null>(homeQuery);
    return {
      settings: data?.settings ?? null,
      doctors: data?.doctors ?? [],
      concerns: data?.concerns ?? [],
      programmes: data?.programmes ?? [],
      resultCategories: data?.resultCategories ?? [],
      testimonials: data?.testimonials ?? [],
      articles: data?.articles ?? [],
    };
  } catch (error) {
    console.error("[home] Sanity fetch failed:", error);
    return EMPTY;
  }
}

const PRINCIPLES = ["The doctor decides.", "Technology supports.", "You receive a personalised plan."];

/**
 * The doctors' eleven-section homepage. A patient meets the practice, its
 * philosophy and its doctors, and their own concern, long before any
 * technology - which appears seventh, as supporting evidence.
 */
export default async function Home() {
  const home = await getHome();
  const hero = imageProps(home.settings?.heroImage, 2400);
  const hasClinicImage = Boolean(home.settings?.clinicImage?.asset);
  const resultCategories = RESULT_CATEGORIES.filter((c) => home.resultCategories.includes(c.value));

  return (
    <main className="flex-1 bg-brand-bone">
      {/* 01 — Hero: the practice, not a list of services. */}
      <section className="relative isolate flex min-h-[92vh] items-end overflow-hidden bg-brand-black">
        {hero ? (
          <>
            <Image src={hero.url} alt={hero.alt ?? ""} fill priority sizes="100vw" className="object-cover" />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/70 to-brand-black/25"
            />
          </>
        ) : (
          <div
            aria-hidden
            className="pointer-events-none absolute right-[-14vh] top-1/2 h-[92vh] w-[92vh] -translate-y-1/2 opacity-[0.06]"
          >
            <Image src="/brand/monogram-light.svg" alt="" fill sizes="92vh" className="object-contain" />
          </div>
        )}

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-24 pt-44 lg:px-10 lg:pb-32 xl:pt-56">
          <h1 className="text-4xl font-normal leading-[1.04] tracking-[0.005em] text-brand-cream sm:text-5xl lg:text-7xl xl:text-[5.5rem]">
            Dr Bhagat’s
            <br />
            World Class Aesthetics
          </h1>
          <p className="mt-10 text-2xl font-normal tracking-[0.01em] text-brand-champagne-light sm:text-3xl">
            {TAGLINE}
          </p>
          <p className="mt-6 max-w-xl text-[1.1rem] leading-[1.75] text-brand-cream/80">{SUPPORTING_LINE}</p>
          <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-6">
            <PrimaryLink href="/book">Book a Consultation</PrimaryLink>
            <TextLink href="/concerns" ground="black">
              What would you like to improve?
            </TextLink>
          </div>
        </div>
      </section>

      {/* 02 — Doctor-led philosophy */}
      <Section ground="bone">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>A doctor-led philosophy</Eyebrow>
              <Display className="mt-8">{PHILOSOPHY_LINE}</Display>
            </Reveal>
            <SanityPicture
              image={home.settings?.philosophyImage}
              ratio="4/3"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="mt-14"
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal index={1}>
              <Statement>{PHILOSOPHY_TEXT[0]}</Statement>
              <Prose className="mt-8">{PHILOSOPHY_TEXT[1]}</Prose>
              {/* The differentiator the doctors asked the site to communicate most strongly. */}
              <Prose className="mt-6">
                Our real difference is clinical judgement and experience: knowing which treatment to
                use, when to combine technologies, when not to use something at all, and how to build a
                long-term plan for each patient. Every face is different. Every treatment plan should be
                too.
              </Prose>
            </Reveal>
            <ul className="mt-14">
              {PRINCIPLES.map((line, index) => (
                <li key={line} className="border-t border-brand-gray-muted/30 py-6">
                  <Reveal index={index}>
                    <span className="text-2xl font-normal tracking-[0.01em] text-brand-black">{line}</span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 03 — The doctors */}
      {home.doctors.length > 0 ? (
        <Section ground="black">
          <Reveal>
            <Eyebrow ground="black">The doctors</Eyebrow>
            <Display ground="black" className="mt-8 max-w-4xl">
              {home.doctors.map((doctor) => doctor.name).join(" & ")}
            </Display>
            <Prose ground="black" className="mt-8">
              Two doctors. One standard of care.
            </Prose>
          </Reveal>
          <div className="mt-20 grid grid-cols-1 gap-16 md:grid-cols-2">
            {home.doctors.map((doctor, index) => (
              <Reveal key={doctor._id} index={index}>
                <article>
                  <SanityPicture
                    image={doctor.portrait}
                    ratio="3/4"
                    width={1200}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="mb-10"
                  />
                  <span aria-hidden className="block h-px w-16 bg-champagne-gradient" />
                  <h3 className="mt-8 text-3xl font-normal tracking-[0.01em] text-brand-cream">
                    {doctor.name}
                  </h3>
                  {doctor.role ? (
                    <Eyebrow ground="black" className="mt-4">
                      {doctor.role}
                      {doctor.specialty ? ` · ${doctor.specialty}` : ""}
                    </Eyebrow>
                  ) : null}
                  {doctor.shortBio ? (
                    <p className="mt-6 max-w-md text-[1rem] leading-[1.8] text-brand-gray-muted">
                      {doctor.shortBio}
                    </p>
                  ) : null}
                  <TextLink href={`/about#${doctor.slug}`} ground="black" className="mt-8">
                    Read profile
                  </TextLink>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      {/* 04 — Your concerns */}
      {home.concerns.length > 0 ? (
        <Section ground="bone">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <Eyebrow>Your concerns</Eyebrow>
              <Display className="mt-8">What would you like to improve?</Display>
            </Reveal>
            <TextLink href="/concerns">All concerns</TextLink>
          </div>
          <ul className="mt-20 grid grid-cols-1 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {home.concerns.map((concern, index) => (
              <li key={concern._id} className="border-t border-brand-gray-muted/30">
                <Reveal index={index % 3}>
                  <Link href={`/concerns/${concern.slug}`} className="group block py-10">
                    <span className="block text-xs tracking-widest text-brand-champagne-dark">
                      {pad(index + 1)}
                    </span>
                    <span className="mt-6 block text-xl font-normal tracking-[0.01em] text-brand-black transition-colors group-hover:text-brand-champagne-dark">
                      {concern.title}
                    </span>
                    {concern.summary ? (
                      <span className="mt-4 block text-[0.95rem] leading-[1.75] text-brand-gray-text">
                        {concern.summary}
                      </span>
                    ) : null}
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* 05 — Our approach */}
      <Section ground="white">
        <Reveal>
          <Eyebrow ground="white">Our approach</Eyebrow>
          <Display ground="white" className="mt-8 max-w-3xl">
            A plan, not a procedure.
          </Display>
          <Prose ground="white" className="mt-8">
            Every patient follows the same five steps. What happens within them is entirely personal.
          </Prose>
        </Reveal>
        <JourneySteps ground="white" />
        <div className="mt-16">
          <TextLink href="/treatment-approaches" ground="white">
            Our treatment approaches
          </TextLink>
        </div>
      </Section>

      {/* 06 — The Dr Bhagat's Signature */}
      {home.programmes.length > 0 ? (
        <Section ground="black">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow ground="black">The Dr Bhagat’s Signature</Eyebrow>
                <Display ground="black" className="mt-8">
                  Personalised by expertise. Refined by experience.
                </Display>
                <Prose ground="black" className="mt-8">
                  Our signature programmes are not fixed protocols. They are carefully considered
                  treatment strategies, designed around the individual patient.
                </Prose>
                <TextLink href="/signature" ground="black" className="mt-10">
                  The Signature Approach
                </TextLink>
              </Reveal>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Rows
                ground="black"
                size="lg"
                items={home.programmes.map((programme) => ({
                  key: programme._id,
                  title: programme.shortTitle ?? programme.title,
                  detail: programme.tagline,
                  href: programmeHref(programme.slug),
                }))}
              />
            </div>
          </div>
        </Section>
      ) : null}

      {/* 07 — Technology, as supporting evidence */}
      <Section ground="bone">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Technology</Eyebrow>
              <Display className="mt-8">Advanced technology, selected with purpose.</Display>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal index={1}>
              <Prose>
                We don’t choose treatments because a technology is available. We select technology
                according to the patient’s anatomy, skin condition, goals and clinical needs.
              </Prose>
              <p className="mt-8 text-[0.65rem] uppercase leading-[2] tracking-widest text-brand-champagne-dark">
                {TECHNOLOGY_CATEGORIES.map((category) => category.label).join(" · ")}
              </p>
              <div className="mt-10">
                <TextLink href="/technology">Explore our technology</TextLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 08 — Results, organised by concern */}
      {resultCategories.length > 0 || home.testimonials.length > 0 ? (
        <Section ground="white">
          <Reveal>
            <Eyebrow ground="white">Results</Eyebrow>
            <Display ground="white" className="mt-8 max-w-3xl">
              Results, organised by concern.
            </Display>
            <Prose ground="white" className="mt-8">
              Every result begins with an assessment and a plan designed for one person.
            </Prose>
          </Reveal>
          {resultCategories.length > 0 ? (
            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-2">
              {resultCategories.map((category) => (
                <li key={category.value}>
                  <TextLink href={`/results#${category.value}`} ground="white">
                    {category.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          ) : null}
          {home.testimonials.length > 0 ? (
            <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-3">
              {home.testimonials.map((testimonial, index) => (
                <Reveal key={testimonial._id} index={index}>
                  <figure className="border-t border-brand-gray-muted/30 pt-10">
                    <blockquote className="text-[1.05rem] leading-[1.8] text-brand-black">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-8 text-[0.65rem] uppercase tracking-widest text-brand-gray-text">
                      {testimonial.author}
                      {testimonial.category ? ` · ${resultCategoryLabel(testimonial.category)}` : ""}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          ) : null}
          <div className="mt-16">
            <TextLink href="/results" ground="white">
              Results by concern
            </TextLink>
          </div>
        </Section>
      ) : null}

      {/* 09 — The Clinic */}
      <Section ground="black">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className={hasClinicImage ? "lg:col-span-5" : "lg:col-span-8"}>
            <Reveal>
              <Eyebrow ground="black">The Clinic</Eyebrow>
              <Display ground="black" className="mt-8">
                A luxury medical experience.
              </Display>
              <Prose ground="black" className="mt-8">
                Luxury in aesthetic medicine is not about having more. It is about choosing better —
                being listened to, privacy, and attention to detail, in Goregaon East, Mumbai and
                Vashi, Navi Mumbai.
              </Prose>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {LOCATIONS.map((location) => (
                <address key={location.id} className="not-italic">
                  <p className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">
                    {location.name}
                  </p>
                  <p className="mt-3 text-[0.85rem] leading-[1.7] text-brand-gray-muted">
                    {location.streetAddress}, {location.locality} {location.postalCode}
                  </p>
                </address>
              ))}
            </div>
            <div className="mt-12">
              <TextLink href="/the-clinic" ground="black">
                The Clinic
              </TextLink>
            </div>
          </div>
          {hasClinicImage ? (
            <div className="lg:col-span-6 lg:col-start-7">
              <SanityPicture
                image={home.settings?.clinicImage}
                ratio="4/3"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          ) : null}
        </div>
      </Section>

      {/* 10 — Journal, only once there is something to read */}
      {home.articles.length > 0 ? (
        <Section ground="bone">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <Eyebrow>Journal</Eyebrow>
              <Display className="mt-8">Expert knowledge.</Display>
            </Reveal>
            <TextLink href="/journal">All articles</TextLink>
          </div>
          <ul className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3">
            {home.articles.map((article, index) => (
              <li key={article._id} className="border-t border-brand-gray-muted/30 pt-10">
                <Reveal index={index}>
                  <Link href={`/journal/${article.slug}`} className="group block">
                    <span className="block text-[0.65rem] uppercase tracking-widest text-brand-champagne-dark">
                      {formatDate(article.publishedAt)}
                    </span>
                    <span className="mt-6 block text-xl font-normal leading-[1.35] tracking-[0.01em] text-brand-black transition-colors group-hover:text-brand-champagne-dark">
                      {article.title}
                    </span>
                    {article.excerpt ? (
                      <span className="mt-4 block text-[0.95rem] leading-[1.75] text-brand-gray-text">
                        {article.excerpt}
                      </span>
                    ) : null}
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* 11 — Begin with a consultation */}
      <BeginConsultation />
    </main>
  );
}
