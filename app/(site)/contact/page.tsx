import type { Metadata } from "next";
import Link from "next/link";

import ClinicDetails from "@/components/ClinicDetails";
import Reveal from "@/components/Reveal";
import SanityPicture from "@/components/SanityPicture";
import { PrimaryLink } from "@/components/ui";
import { pad } from "@/lib/format";
import { EXPERIENCE_SHOTS, SPACE_SHOTS } from "@/lib/shotList";
import { directionsHref, formatPhone, LOCATIONS, PHILOSOPHY_LINE, whatsappHref } from "@/lib/site";
import { getClient } from "@/sanity/lib/client";
import { clinicQuery } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Two clinics, in Goregaon East and Vashi. Begin with a consultation: what to expect, what happens after you enquire, and every way to reach us.",
  alternates: { canonical: "/contact" },
};

export const revalidate = 60;

/** What a patient can expect of the first appointment, before they book it. */
const EXPECT = [
  {
    title: "An unhurried conversation",
    body: "Time to describe what you would like to change, and for the doctor to examine your skin properly before saying anything about treatment.",
  },
  {
    title: "An assessment, not a sales conversation",
    body: "Your skin, facial structure and history are assessed. You are told what is actually happening, in plain language.",
  },
  {
    title: "A plan written for you",
    body: "What we recommend, why, in what order, and what it will involve - along with what we would not do, and why.",
  },
];

/** The doctors asked that a patient know exactly what follows an enquiry. */
const AFTER = [
  "We reply to confirm the clinic, the doctor and a time that suits you.",
  "We ask what you would like to improve, so the right dermatologist sees you.",
  "You receive what to expect, and anything to avoid before the appointment.",
  "After the consultation, your plan is confirmed in writing before anything is booked.",
];

async function getSettings(): Promise<SiteSettings | null> {
  try {
    const data = await getClient().fetch<{ settings: SiteSettings | null } | null>(clinicQuery);
    return data?.settings ?? null;
  } catch (error) {
    console.error("[contact] Sanity fetch failed:", error);
    return null;
  }
}

/**
 * The doctors' brief: not a map and a form, but the whole consultation journey
 * - what to expect, what happens after an enquiry, and each clinic in its own
 * right, with every confirmed way to reach it.
 */
export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <main className="flex-1 bg-brand-black">
      <section className="mx-auto w-full max-w-7xl px-6 pb-20 pt-40 lg:px-10 lg:pb-20 lg:pt-44">
        <p className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">
          {PHILOSOPHY_LINE}
        </p>
        <h1 className="mt-10 max-w-4xl text-4xl font-normal leading-[1.08] tracking-[0.01em] text-brand-cream sm:text-5xl lg:text-7xl">
          Begin with a consultation.
        </h1>
        <p className="mt-10 max-w-xl text-[1.1rem] leading-[1.8] text-brand-gray-muted">
          Every treatment at Dr Bhagat’s begins with an assessment. Your concerns, skin, facial
          structure and goals are considered before a personalised treatment plan is recommended.
        </p>
        <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-6">
          <PrimaryLink href="/book">Request a Consultation</PrimaryLink>
          {LOCATIONS.filter((location) => location.phone).map((location) => (
            <a
              key={location.id}
              href={`tel:${location.phone}`}
              className="inline-flex min-h-11 items-center text-[1rem] text-brand-cream transition-colors hover:text-brand-champagne-light"
            >
              {formatPhone(location.phone as string)}
              <span className="ml-3 text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">
                {location.name}
              </span>
            </a>
          ))}
          {LOCATIONS.filter((location) => location.whatsapp).map((location) => (
            <a
              key={`${location.id}-whatsapp`}
              href={whatsappHref(location.whatsapp as string)}
              className="inline-flex min-h-11 items-center text-[1rem] text-brand-cream transition-colors hover:text-brand-champagne-light"
            >
              WhatsApp {location.name}
            </a>
          ))}
        </div>
        <span aria-hidden className="mt-20 block h-px w-full bg-champagne-gradient" />
      </section>

      <SanityPicture
        image={settings?.clinicImage}
        brief={EXPERIENCE_SHOTS.reception}
        ratio="21/9"
        width={2400}
        priority
        sizes="100vw"
      />

      <section
        aria-labelledby="expect"
        className="mx-auto w-full max-w-7xl px-6 pb-20 pt-24 lg:px-10 lg:pt-28"
      >
        <h2 id="expect" className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">
          What to expect at your consultation
        </h2>
        <ul className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          {EXPECT.map((item, index) => (
            <li key={item.title}>
              <Reveal index={index}>
                <span aria-hidden className="block h-px w-full bg-champagne-gradient" />
                <h3 className="mt-8 text-xl font-normal leading-snug tracking-[0.01em] text-brand-cream">
                  {item.title}
                </h3>
                <p className="mt-5 text-[0.95rem] leading-[1.8] text-brand-gray-muted">{item.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="after"
        className="mx-auto w-full max-w-7xl border-t border-brand-gray-muted/25 px-6 py-20 lg:px-10"
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="after" className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">
              What happens after you enquire
            </h2>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {AFTER.map((step, index) => (
              <li
                key={step}
                className="flex gap-6 border-t border-brand-gray-muted/25 py-5 first:border-t-0 first:pt-0"
              >
                <Reveal index={index % 3}>
                  <span className="text-xs tracking-widest text-brand-champagne-dark">
                    {pad(index + 1)}
                  </span>
                </Reveal>
                <p className="text-[1.05rem] leading-[1.7] text-brand-cream/90">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Each clinic in its own right: what the visit is like, and how to reach it. */}
      <section
        aria-label="The clinics"
        className="mx-auto w-full max-w-7xl border-t border-brand-gray-muted/25 px-6 py-20 lg:px-10"
      >
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-10">
          {LOCATIONS.map((location, index) => (
            <div key={location.id}>
              <Reveal index={index}>
                <SanityPicture
                  image={null}
                  brief={SPACE_SHOTS.Architecture[index === 0 ? 0 : 1]}
                  ratio="4/3"
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="mb-10"
                />
                <h2 className="text-2xl font-normal tracking-[0.01em] text-brand-cream lg:text-3xl">
                  {location.name}
                </h2>
                <p className="mt-5 max-w-md text-[0.95rem] leading-[1.8] text-brand-gray-muted">
                  {location.id === "goregaon"
                    ? "Our Goregaon East clinic, over the ground and first floors, holds the consultation rooms and the full treatment suite."
                    : "Our Vashi clinic on Palm Beach Road serves patients across Navi Mumbai, with the same assessment, the same doctors and the same standard of care."}
                </p>
                <a
                  href={directionsHref(location)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex min-h-11 items-end border-b border-brand-champagne-dark pb-1.5 text-[0.65rem] uppercase tracking-widest text-brand-champagne-light transition-colors hover:text-brand-cream"
                >
                  Directions
                </a>
              </Reveal>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <ClinicDetails columns={2} />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl border-t border-brand-gray-muted/25 px-6 py-20 lg:px-10">
        <p className="max-w-2xl text-[1.05rem] leading-[1.8] text-brand-gray-muted">
          Prefer to see how a visit unfolds before you book?{" "}
          <Link
            href="/experience"
            className="text-brand-cream underline underline-offset-4 transition-colors hover:text-brand-champagne-light"
          >
            The Dr Bhagat’s Experience
          </Link>{" "}
          takes you through it, from arrival to follow-up.
        </p>
      </section>
    </main>
  );
}
