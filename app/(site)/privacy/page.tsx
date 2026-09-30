import type { Metadata } from "next";

import { PageHero, Rail, Section } from "@/components/ui";
import { BRAND, LOCATIONS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Dr Bhagat's World Class Aesthetics collects, uses and protects the information you share when you enquire or attend the clinic.",
  alternates: { canonical: "/privacy" },
};

/**
 * A plain-language privacy notice. Drafted for the doctors and their adviser to
 * confirm before launch: the enquiry form asks about health concerns, which is
 * sensitive personal data under India's DPDP Act, 2023.
 */
const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "What we collect",
    body: [
      "When you enquire through this website, we collect the name, contact details and the description of your concern that you choose to give us. Nothing on the form is required beyond what we need in order to reply.",
      "When you attend the clinic, we collect the medical and clinical information necessary for your care, including your history, examination findings and, where relevant, clinical photographs.",
      "This website does not use advertising or tracking cookies.",
    ],
  },
  {
    title: "Why we collect it",
    body: [
      "To reply to your enquiry and arrange a consultation with the appropriate dermatologist.",
      "To provide clinical care, and to keep the medical records that providing it requires.",
      "To meet our obligations as registered medical practitioners.",
    ],
  },
  {
    title: "Health information",
    body: [
      "Information about your skin, hair or health is sensitive. It is seen only by the doctors and the clinic staff involved in your care, and it is never sold, shared for marketing, or passed to any third party except where the law requires it or where you ask us to.",
    ],
  },
  {
    title: "Clinical photographs",
    body: [
      "Clinical photographs are part of your medical record and are taken to assess your progress.",
      "They are never published, shown to another patient or used in any material without your separate, written consent. Consent is specific, and you may withdraw it at any time.",
    ],
  },
  {
    title: "How long we keep it",
    body: [
      "Medical records are retained for the period required of a medical practice in India. Enquiries that do not lead to an appointment are kept only as long as they are needed to respond.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "You may ask us what information we hold about you, ask for it to be corrected, or ask us to erase information we no longer need to keep. Write to us at either clinic and we will respond.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="flex-1 bg-brand-bone">
      <PageHero
        eyebrow="Privacy"
        title="Your information, and how we handle it."
        lead="What you tell us about your skin is medical information. This explains what we collect, why, who sees it, and what you can ask of us."
      />

      {SECTIONS.map((section, index) => (
        <Rail
          key={section.title}
          ground={index % 2 === 0 ? "bone" : "white"}
          index={index + 1}
          title={section.title}
        >
          {section.body.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-6 max-w-2xl text-[1.05rem] leading-[1.85] text-brand-gray-text first:mt-0"
            >
              {paragraph}
            </p>
          ))}
        </Rail>
      ))}

      <Section ground="black">
        <p className="text-[0.65rem] uppercase tracking-widest text-brand-champagne-light">
          Contact us about your information
        </p>
        <p className="mt-8 max-w-2xl text-[1.05rem] leading-[1.8] text-brand-gray-muted">
          {BRAND.legalName}, {LOCATIONS[0].streetAddress}, {LOCATIONS[0].locality},{" "}
          {LOCATIONS[0].region} {LOCATIONS[0].postalCode}.
        </p>
      </Section>
    </main>
  );
}
