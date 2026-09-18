import type { Metadata } from "next";

import ClinicDetails from "@/components/ClinicDetails";
import { PrimaryLink } from "@/components/ui";
import { PHILOSOPHY_LINE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Begin with a consultation. Tell us what you'd like to improve, and our team will help you schedule a consultation with the appropriate dermatologist.",
  alternates: { canonical: "/contact" },
};

/**
 * Written to the doctors' brief: not a map and a contact form, but an
 * invitation to begin with a consultation, followed by every way to reach
 * each clinic.
 */
export default function ContactPage() {
  return (
    <main className="flex-1 bg-brand-black">
      <section className="mx-auto w-full max-w-7xl px-6 pb-20 pt-40 lg:px-10 lg:pb-20 lg:pt-44">
        <p className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">{PHILOSOPHY_LINE}</p>
        <h1 className="mt-10 max-w-4xl text-4xl font-normal leading-[1.08] tracking-[0.01em] text-brand-cream sm:text-5xl lg:text-7xl">
          Begin with a consultation.
        </h1>
        <p className="mt-10 max-w-xl text-[1.1rem] leading-[1.8] text-brand-gray-muted">
          Tell us what you’d like to improve. Our team will help you schedule a consultation with the
          appropriate dermatologist.
        </p>
        <div className="mt-14">
          <PrimaryLink href="/book">Book Consultation</PrimaryLink>
        </div>
        <span aria-hidden className="mt-20 block h-px w-full bg-champagne-gradient" />
      </section>

      <section
        aria-label="The clinics"
        className="mx-auto w-full max-w-7xl px-6 pb-28 lg:px-10 lg:pb-28"
      >
        <ClinicDetails columns={2} />
      </section>
    </main>
  );
}
