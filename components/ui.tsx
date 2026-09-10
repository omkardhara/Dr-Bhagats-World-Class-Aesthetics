import Link from "next/link";
import type { ReactNode } from "react";

import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import { pad } from "@/lib/format";

/**
 * Shared editorial building blocks.
 *
 * Every colour pairing here was checked against WCAG AA for its ground:
 * gray-muted on black 7.54:1, gray-text on bone 4.50:1 and on white 4.81:1,
 * champagne-dark on bone 4.96:1 and on white 5.29:1. Pick the ground and the
 * palette follows, so a section cannot pair text with the wrong background.
 */

export type Ground = "black" | "bone" | "white";

const GROUND: Record<Ground, string> = {
  black: "bg-brand-black",
  bone: "bg-brand-bone",
  white: "bg-brand-white",
};

export function palette(ground: Ground) {
  return ground === "black"
    ? {
        heading: "text-brand-cream",
        body: "text-brand-gray-muted",
        eyebrow: "text-brand-champagne-light",
        rule: "border-brand-gray-muted/25",
        hover: "group-hover:text-brand-champagne-light",
      }
    : {
        heading: "text-brand-black",
        body: "text-brand-gray-text",
        eyebrow: "text-brand-champagne-dark",
        rule: "border-brand-gray-muted/30",
        hover: "group-hover:text-brand-champagne-dark",
      };
}

export function Section({
  ground = "bone",
  id,
  className = "",
  children,
}: {
  ground?: Ground;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-20 ${GROUND[ground]} ${className}`}>
      <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32">{children}</div>
    </section>
  );
}

export function Eyebrow({
  ground = "bone",
  className = "",
  children,
}: {
  ground?: Ground;
  className?: string;
  children: ReactNode;
}) {
  return (
    <p className={`text-[0.65rem] uppercase tracking-widest ${palette(ground).eyebrow} ${className}`}>
      {children}
    </p>
  );
}

export function Display({
  ground = "bone",
  as = "h2",
  className = "",
  children,
}: {
  ground?: Ground;
  as?: "h1" | "h2" | "h3";
  className?: string;
  children: ReactNode;
}) {
  const Tag = as;
  return (
    <Tag
      className={`text-3xl font-normal leading-[1.12] tracking-[0.01em] sm:text-4xl lg:text-5xl ${palette(ground).heading} ${className}`}
    >
      {children}
    </Tag>
  );
}

export function Prose({
  ground = "bone",
  className = "",
  children,
}: {
  ground?: Ground;
  className?: string;
  children: ReactNode;
}) {
  return (
    <p className={`max-w-2xl text-[1.05rem] font-normal leading-[1.8] ${palette(ground).body} ${className}`}>
      {children}
    </p>
  );
}

export function PrimaryLink({
  href,
  className = "",
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center bg-champagne-gradient-deep px-10 py-5 text-[0.7rem] font-medium uppercase tracking-widest text-brand-white transition-opacity hover:opacity-90 ${className}`}
    >
      {children}
    </Link>
  );
}

export function TextLink({
  href,
  ground = "bone",
  className = "",
  children,
}: {
  href: string;
  ground?: Ground;
  className?: string;
  children: ReactNode;
}) {
  const colour =
    ground === "black"
      ? "border-brand-champagne text-brand-champagne-light hover:text-brand-cream"
      : "border-brand-champagne-dark text-brand-champagne-dark hover:text-brand-black";
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-end border-b pb-1.5 text-[0.65rem] uppercase tracking-widest transition-colors ${colour} ${className}`}
    >
      {children}
    </Link>
  );
}

export function PageHero({
  eyebrow,
  crumbs,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  crumbs?: Crumb[];
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-brand-black">
      <div className="mx-auto w-full max-w-7xl px-6 pb-24 pt-40 lg:px-10 lg:pb-32 lg:pt-52">
        {crumbs ? (
          <Breadcrumbs crumbs={crumbs} />
        ) : eyebrow ? (
          <Eyebrow ground="black">{eyebrow}</Eyebrow>
        ) : null}
        <h1 className="mt-10 max-w-4xl text-4xl font-normal leading-[1.1] tracking-[0.01em] text-brand-cream sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {lead ? (
          <p className="mt-8 max-w-2xl text-[1.05rem] font-normal leading-[1.8] text-brand-gray-muted">
            {lead}
          </p>
        ) : null}
        {children}
        <span aria-hidden className="mt-16 block h-px w-full bg-champagne-gradient" />
      </div>
    </section>
  );
}

/** Two columns: a sticky title rail on the left, content on the right. */
export function Rail({
  ground = "bone",
  id,
  index,
  title,
  children,
}: {
  ground?: Ground;
  id?: string;
  /** Numbers a sequence of sections, e.g. the stages of a concern page. */
  index?: number;
  title: string;
  children: ReactNode;
}) {
  const p = palette(ground);
  return (
    <Section ground={ground} id={id}>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <header className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            {index !== undefined ? (
              <span className={`block text-xs tracking-widest ${p.eyebrow}`}>{pad(index)}</span>
            ) : null}
            <h2
              className={`${index !== undefined ? "mt-6" : ""} text-2xl font-normal uppercase leading-snug tracking-widest lg:text-[1.65rem] ${p.heading}`}
            >
              {title}
            </h2>
            <span aria-hidden className="mt-8 block h-px w-16 bg-champagne-gradient" />
          </div>
        </header>
        <div className="lg:col-span-7 lg:col-start-6">{children}</div>
      </div>
    </Section>
  );
}

export type RowItem = {
  key: string;
  title: string;
  href?: string;
  detail?: string;
  meta?: string;
};

/** Hairline-divided rows. No cards, no boxes. */
export function Rows({
  ground = "bone",
  items,
  size = "md",
}: {
  ground?: Ground;
  items: RowItem[];
  size?: "md" | "lg";
}) {
  const p = palette(ground);
  const titleSize = size === "lg" ? "text-2xl lg:text-3xl" : "text-xl";

  return (
    <ul>
      {items.map((item, index) => {
        const body = (
          <>
            <span className="flex-1">
              <span
                className={`block ${titleSize} font-normal tracking-[0.01em] transition-colors ${p.heading} ${item.href ? p.hover : ""}`}
              >
                {item.title}
              </span>
              {item.detail ? (
                <span className={`mt-3 block max-w-xl text-[0.95rem] leading-[1.75] ${p.body}`}>
                  {item.detail}
                </span>
              ) : null}
              {item.meta ? (
                <span className={`mt-4 block text-[0.65rem] uppercase leading-[2] tracking-widest ${p.eyebrow}`}>
                  {item.meta}
                </span>
              ) : null}
            </span>
            {item.href ? (
              <span
                aria-hidden
                className={`shrink-0 text-[0.65rem] uppercase tracking-widest transition-colors ${p.body} ${p.hover}`}
              >
                View
              </span>
            ) : null}
          </>
        );

        return (
          <li key={item.key} className={`border-t ${p.rule} first:border-t-0`}>
            <Reveal index={index}>
              {item.href ? (
                <Link href={item.href} className="group flex items-baseline justify-between gap-8 py-8">
                  {body}
                </Link>
              ) : (
                <div className="flex items-baseline justify-between gap-8 py-8">{body}</div>
              )}
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}

export const JOURNEY = [
  {
    title: "Assessment",
    description:
      "An unhurried consultation with your doctor to understand your concern, your skin and your goals.",
  },
  {
    title: "Personalised plan",
    description:
      "A treatment strategy designed for you, explaining what we recommend, why, and in what order.",
  },
  {
    title: "Treatment",
    description:
      "Delivered with precision, using the treatments and technology your plan calls for.",
  },
  {
    title: "Follow-up",
    description: "Progress is reviewed and the plan refined, with long-term results in mind.",
  },
];

export function JourneySteps({ ground = "white" }: { ground?: Ground }) {
  const p = palette(ground);
  return (
    <ol className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
      {JOURNEY.map((step, index) => (
        <li key={step.title}>
          <Reveal index={index}>
            <span className={`block text-xs tracking-widest ${p.eyebrow}`}>{pad(index + 1)}</span>
            <span aria-hidden className="mt-6 block h-px w-full bg-champagne-gradient" />
            <h3 className={`mt-8 text-xl font-normal tracking-[0.01em] ${p.heading}`}>{step.title}</h3>
            <p className={`mt-4 text-[0.95rem] leading-[1.75] ${p.body}`}>{step.description}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

export function BeginConsultation({
  title = "Begin with a consultation.",
  lead = "Every plan starts with understanding. Book a consultation with Dr Priyam Bhagat or Dr Kamlesh Bhagat.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <Section ground="black" className="border-t border-brand-gray-muted/20">
      <Reveal>
        <div className="max-w-3xl">
          <Eyebrow ground="black">Book a Consultation</Eyebrow>
          <Display ground="black" className="mt-8">
            {title}
          </Display>
          <Prose ground="black" className="mt-8">
            {lead}
          </Prose>
          <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-6">
            <PrimaryLink href="/book">Book a Consultation</PrimaryLink>
            <TextLink href="/contact" ground="black">
              Contact the clinic
            </TextLink>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
