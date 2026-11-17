import type { Metadata } from "next";
import { notFound } from "next/navigation";

import DoctorProfile from "@/components/DoctorProfile";
import DoctorSchema from "@/components/DoctorSchema";
import { BeginConsultation, Section, TextLink } from "@/components/ui";
import { DOCTOR_PAGES, DOCTOR_SLUGS, doctorHref } from "@/lib/doctors";
import { shotListEnabled } from "@/lib/shotList";
import { getClient } from "@/sanity/lib/client";
import { doctorsQuery } from "@/sanity/lib/queries";
import type { Doctor } from "@/sanity/lib/types";

export const revalidate = 60;

// Only the two doctors have pages; any other slug is a 404.
export const dynamicParams = false;

async function getDoctors(): Promise<Doctor[]> {
  try {
    return await getClient().fetch<Doctor[]>(doctorsQuery);
  } catch (error) {
    console.error("[doctor] Sanity fetch failed:", error);
    return [];
  }
}

export function generateStaticParams() {
  return DOCTOR_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/doctors/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = DOCTOR_PAGES[slug];
  if (!page) return { title: "The Doctors" };
  return {
    // `absolute`: the approved title already carries the brand, so no suffix is added.
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: doctorHref(slug) },
    openGraph: { title: page.title, description: page.description, url: doctorHref(slug) },
  };
}

export default async function DoctorPage({ params }: PageProps<"/doctors/[slug]">) {
  const { slug } = await params;
  const [doctors, shots] = await Promise.all([getDoctors(), shotListEnabled()]);
  const doctor = doctors.find((entry) => entry.slug === slug);
  if (!doctor) notFound();

  const others = doctors.filter((entry) => entry.slug !== slug);

  return (
    <main className="flex-1 bg-brand-black pt-16 lg:pt-20">
      <DoctorSchema doctors={[doctor]} />
      <DoctorProfile doctor={doctor} flip={false} shots={shots} page />

      <Section ground="black" className="border-t border-brand-gray-muted/20">
        <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:gap-x-12">
          <TextLink href="/about#doctors" ground="black">
            Meet both doctors
          </TextLink>
          {others.map((other) => (
            <TextLink key={other._id} href={doctorHref(other.slug)} ground="black">
              {other.name}
            </TextLink>
          ))}
        </div>
      </Section>

      <BeginConsultation lead="Begin with a consultation grounded in dermatology, experience and precision." />
    </main>
  );
}
